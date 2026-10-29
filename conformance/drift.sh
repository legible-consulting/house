#!/usr/bin/env bash
# drift.sh
# A live repo: does its default branch track the latest blueprint tag, and are its answers true
# on the platform. A dormant repo: is it archived. Every repo: which Claude and agent assets does
# it carry. Writes desk/estate/drift-<date>.md. Reads the local lane (fetch only), the GitHub API
# (archived flag), and the Vercel and Neon APIs (GET only). Changes no client repo and nothing
# on any platform. The contract is conformance/CONTEXT.md.
#
# The platform tokens come from the shell, one per Vercel team and one per Neon organisation:
# VERCEL_TOKEN_<TEAM> and NEON_API_KEY_<ORG>. <TEAM> and <ORG> are the repo's `vercel:` and
# `neon:` values in desk/mani.yaml, in capitals, with each other character as `_`. No value of a
# token or of a Vercel variable is printed: a database URL leaves jq as its host only.
set -euo pipefail

house="$(cd "$(dirname "$0")/.." && pwd)"
blueprint="https://github.com/legible-consulting/blueprint.git"
assets=(.claude CLAUDE.md AGENTS.md .mcp.json .icm .opencode opencode.jsonc .cursor .github/copilot-instructions.md)
vercel_api="https://api.vercel.com"
neon_api="https://console.neon.tech/api/v2"
us=$'\x1f' # the field separator of the tables read here: not whitespace, so an empty field stays

tag="$(git ls-remote --tags --refs "$blueprint" 'v*' | sed 's#.*refs/tags/##' | sort -V | tail -n1)"
[ -n "$tag" ] || { echo "blueprint has no v* tag yet; nothing to conform to" >&2; exit 1; }

date="$(date +%F)"
out="$house/desk/estate/drift-${date}.md"
mkdir -p "$(dirname "$out")"

# The name of the shell variable that holds a token: <prefix>_<VALUE>.
tokvar() { # <prefix> <value>
  printf '%s_%s' "$1" "$(printf '%s' "$2" | tr '[:lower:]' '[:upper:]' | tr -c 'A-Z0-9' '_')"
}

# One GET. Prints the body and returns 0 on 2xx. Prints "HTTP <code>" and returns 1 otherwise.
# The token goes to curl in a file that only this user reads, never on a command line.
get() { # <url> <token>
  local cfg resp code
  cfg="$(mktemp)"
  {
    printf 'url = "%s"\n' "$1"
    printf 'header = "Authorization: Bearer %s"\n' "$2"
    printf 'header = "Accept: application/json"\n'
    printf 'write-out = "\\n%%{http_code}"\nmax-time = 60\nsilent\n'
  } > "$cfg"
  if ! resp="$(curl --config "$cfg")"; then rm -f "$cfg"; printf 'curl failed'; return 1; fi
  rm -f "$cfg"
  code="${resp##*$'\n'}"
  case "$code" in
    2??) printf '%s' "${resp%$'\n'*}" ;;
    *) printf 'HTTP %s' "$code"; return 1 ;;
  esac
}

vget() { # <path>, with vtoken and vteam set by the caller
  local sep='?'
  case "$1" in *\?*) sep='&' ;; esac
  get "${vercel_api}$1${sep}slug=${vteam}" "$vtoken"
}

# Neon's project list, "<id>\t<name>" per project, read once per organisation in a run. An org id
# (`org-…`) goes to the API as org_id, so a personal key reads the organisation too.
declare -A neon_lists=()
neon_err=""
neon_load() { # <org> <key>
  local body q=""
  [ -z "${neon_lists[$1]+x}" ] || return 0
  case "$1" in org-*) q="&org_id=$1" ;; esac
  body="$(get "${neon_api}/projects?limit=400${q}" "$2")" || { neon_err="$body"; return 1; }
  neon_lists[$1]="$(printf '%s' "$body" | jq -r '.projects[] | [.id, .name] | @tsv')"
}

# The host of a database URL, without Neon's `-pooler`, so a pooled and a direct URL compare equal.
jq_host='def host: (capture("://[^@/]*@(?<h>[^/:?]+)").h // "") | sub("-pooler"; "");'

has_line() { grep -qxF -- "$1" <<<"$2"; } # <line> <text>

# The Platform cell of one live repo, in the global `plat`: `backed`, or each answer the platform
# does not back, "; " between them. Reads the globals of the loop below: repo, path, ref, answers,
# vteam, norg, vt_name, nt_name.
platform() {
  local uat db slug envmd envrows want_vercel=0 vtoken="" ntoken="" vprojects="" vnames=""
  local lines=()
  uat="$(printf '%s\n' "$answers" | yq '.uat // false')"
  db="$(printf '%s\n' "$answers" | yq '.database // "none"')"
  slug="$(printf '%s\n' "$answers" | yq '.slug // ""')"
  envmd="$(git -C "$path" show "${ref}:.icm/environments.md" 2>/dev/null || true)"

  # The first table of .icm/environments.md: environment, Vercel project, database.
  envrows=""
  if [ -n "$envmd" ]; then
    envrows="$(printf '%s\n' "$envmd" | awk -F'|' -v OFS="$us" '
      /^\|/ {
        for (i = 2; i < NF; i++) { c[i] = $i; gsub(/^[ \t]+|[ \t]+$/, "", c[i]) }
        if (!h) {
          for (i = 2; i < NF; i++) {
            l = tolower(c[i])
            if (l == "environment") e = i
            if (l == "vercel project") v = i
            if (l == "database") d = i
          }
          h = 1; next
        }
        if (c[2] ~ /^:?-+:?$/) next
        t = 1
        print c[e], c[v], c[d]
        next
      }
      t { exit }')"
  fi

  [ "$uat" != "true" ] || want_vercel=1
  [ -z "$envrows" ] || want_vercel=1

  # Vercel: the projects linked to the repository.
  if [ "$want_vercel" = 1 ]; then
    if [ -z "$vteam" ]; then
      lines+=("no \`vercel:\` team in \`desk/mani.yaml\`: Vercel not read")
      want_vercel=0
    elif vtoken="${!vt_name:-}"; [ -z "$vtoken" ]; then
      lines+=("no \`${vt_name}\` in the shell: Vercel not read")
      want_vercel=0
    else
      local body
      if body="$(vget "/v10/projects?repoUrl=$(jq -rn --arg u "https://github.com/${repo}" '$u | @uri')&limit=100")"; then
        vprojects="$(printf '%s' "$body" | jq -r --arg r "$repo" '[.projects[]
            | select(((.link.org // "") + "/" + (.link.repo // "") | ascii_downcase) == ($r | ascii_downcase))]
            | sort_by(.name) | .[] | [.id, .name] | @tsv')"
        vnames="$(cut -f2 <<<"$vprojects" | sed '/^$/d')"
        [ -n "$vprojects" ] || lines+=("no Vercel project in \`${vteam}\` is linked to the repository")
      else
        lines+=("Vercel projects of \`${vteam}\` not read: ${body}")
        want_vercel=0
      fi
    fi
  fi

  # uat: each linked project has the custom environment `uat`.
  if [ "$uat" = "true" ] && [ "$want_vercel" = 1 ] && [ -n "$vprojects" ]; then
    local id name envs
    while IFS=$'\t' read -r id name; do
      if envs="$(vget "/v9/projects/${id}/custom-environments")"; then
        jq -e 'any(.environments[]?; .slug == "uat")' >/dev/null <<<"$envs" \
          || lines+=("\`${name}\` has no \`uat\` environment")
      else
        lines+=("\`${name}\`: custom environments not read: ${envs}")
      fi
    done <<<"$vprojects"
  fi

  # .icm/environments.md: its Vercel project cells and the linked projects are one set.
  if [ -n "$envrows" ] && [ "$want_vercel" = 1 ]; then
    local env cell dbcell tnames="" n
    while IFS="$us" read -r env cell dbcell; do
      cell="${cell//\`/}"
      case "$cell" in
        "" | *"<"*">"*) lines+=("\`.icm/environments.md\` names no Vercel project on its ${env} row") ;;
        *) tnames+="${cell}"$'\n' ;;
      esac
    done <<<"$envrows"
    tnames="$(printf '%s' "$tnames" | sed '/^$/d' | sort -u)"
    while IFS= read -r n; do
      [ -n "$n" ] || continue
      has_line "$n" "$vnames" || lines+=("\`${n}\` is in \`.icm/environments.md\` and not linked to the repository")
    done <<<"$tnames"
    while IFS= read -r n; do
      [ -n "$n" ] || continue
      has_line "$n" "$tnames" || lines+=("\`${n}\` is linked to the repository and not in \`.icm/environments.md\`")
    done <<<"$vnames"
  fi

  # Neon: the projects the answers name exist. .icm/environments.md names them when it names a
  # Neon project; else the convention of the blueprint's .icm/database/CONTEXT.md.
  local want="" prod_project="" prod_hosts=""
  if [ "$db" = "neon" ]; then
    if [ -n "$envrows" ]; then
      want="$(cut -d"$us" -f3 <<<"$envrows" | grep -o 'Neon project `[^`]*`' | sed 's/.*`\(.*\)`/\1/' | sort -u || true)"
      prod_project="$(awk -F"$us" 'tolower($1) == "production" { print $3 }' <<<"$envrows" \
        | grep -o 'Neon project `[^`]*`' | sed -n '1s/.*`\(.*\)`/\1/p' || true)"
    fi
    if [ -z "$want" ]; then
      want="$slug"
      [ "$uat" != "true" ] || want+=$'\n'"uat-${slug}"
      prod_project="$slug"
    fi
    if [ -z "$norg" ]; then
      lines+=("no \`neon:\` organisation in \`desk/mani.yaml\`: Neon not read")
    elif ntoken="${!nt_name:-}"; [ -z "$ntoken" ]; then
      lines+=("no \`${nt_name}\` in the shell: Neon not read")
    elif ! neon_load "$norg" "$ntoken"; then
      lines+=("Neon projects of \`${norg}\` not read: ${neon_err}")
    else
      local list p pid eps
      list="${neon_lists[$norg]}"
      while IFS= read -r p; do
        [ -n "$p" ] || continue
        has_line "$p" "$(cut -f2 <<<"$list")" || lines+=("no Neon project \`${p}\`")
      done <<<"$want"
      pid="$(awk -F'\t' -v n="$prod_project" '$2 == n { print $1; exit }' <<<"$list")"
      if [ -n "$pid" ]; then
        if eps="$(get "${neon_api}/projects/${pid}/endpoints" "$ntoken")"; then
          prod_hosts="$(jq -r '.endpoints[].host | sub("-pooler"; "")' <<<"$eps")"
        else
          lines+=("Neon endpoints of \`${prod_project}\` not read: ${eps}")
        fi
      fi
    fi
  fi

  # neon and uat: Preview's DATABASE_URL on each linked project is not production's. Production's
  # hosts are each endpoint of the production Neon project, and the Production DATABASE_URL of
  # the same Vercel project.
  if [ "$db" = "neon" ] && [ "$uat" = "true" ] && [ "$want_vercel" = 1 ] && [ -n "$vprojects" ]; then
    local id name envs vars eid targets one hosts prod pre unread reads
    while IFS=$'\t' read -r id name; do
      if ! envs="$(vget "/v10/projects/${id}/env")"; then
        lines+=("\`${name}\`: variables not read: ${envs}")
        continue
      fi
      vars="$(jq -r '.envs[] | select(.key == "DATABASE_URL")
          | [.id, ([.target[]? | select(. == "production" or . == "preview")] | join(","))] | @tsv' <<<"$envs")"
      hosts=""
      unread=0
      while IFS=$'\t' read -r eid targets; do
        [ -n "$eid" ] && [ -n "$targets" ] || continue
        if one="$(vget "/v1/projects/${id}/env/${eid}")"; then
          one="$(jq -r "${jq_host} (.value // \"\") | if . == \"\" then \"\" else host end" <<<"$one")"
        else
          one=""
        fi
        if [ -z "$one" ]; then
          case ",${targets}," in *,preview,*) unread=1 ;; esac
          continue
        fi
        hosts+="${targets}"$'\t'"${one}"$'\n'
      done <<<"$vars"
      prod="$(printf '%s\n%s\n' "$prod_hosts" "$(awk -F'\t' '$1 ~ /production/ { print $2 }' <<<"$hosts")" | sed '/^$/d' | sort -u)"
      pre="$(awk -F'\t' '$1 ~ /preview/ { print $2 }' <<<"$hosts" | sed '/^$/d' | sort -u)"
      [ "$unread" = 0 ] || lines+=("\`${name}\`: a Preview \`DATABASE_URL\` is sensitive or not read: not compared")
      [ -n "$pre" ] || continue
      if [ -z "$prod" ]; then
        lines+=("\`${name}\`: production's database host is not known: Preview not compared")
        continue
      fi
      reads=0
      while IFS= read -r one; do
        if has_line "$one" "$prod"; then reads=1; fi
      done <<<"$pre"
      [ "$reads" = 0 ] || lines+=("**Preview reads production** on \`${name}\`")
    done <<<"$vprojects"
  fi

  plat="backed"
  if [ "${#lines[@]}" -gt 0 ]; then
    plat="${lines[0]}"
    local l
    for l in "${lines[@]:1}"; do plat+="; ${l}"; done
  fi
  return 0
}

rows=""
drifted=0
while IFS="$us" read -r name path url tags vteam norg; do
  path="${path/#\~/$HOME}"
  repo="$(printf '%s' "$url" | sed -E 's#^https://github.com/##; s#\.git$##')"
  vt_name="$(tokvar VERCEL_TOKEN "$vteam")"
  nt_name="$(tokvar NEON_API_KEY "$norg")"
  if [ ! -d "$path/.git" ]; then
    rows+="| \`${repo}\` (${name}, ${tags}) | — | no local clone at \`${path}\` | — | — |"$'\n'
    drifted=$((drifted + 1))
    continue
  fi
  git -C "$path" fetch -q origin </dev/null
  ref="$(git -C "$path" symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null || echo origin/main)"
  off=0
  plat="—"
  case ",${tags}," in
    *,dormant,*)
      archived="$(gh api "repos/${repo}" --jq .archived 2>/dev/null </dev/null || echo unknown)"
      tracks="—"
      if [ "$archived" = "true" ]; then drift="archived"; else drift="not archived: archive it"; off=1; fi
      ;;
    *)
      if answers="$(git -C "$path" show "${ref}:.copier-answers.yml" 2>/dev/null)"; then
        tracks="$(printf '%s\n' "$answers" | yq '._commit')"
        if [ "$tracks" = "$tag" ]; then drift="current"; else drift="behind: \`copier update\`"; off=1; fi
        platform </dev/null
        [ "$plat" = "backed" ] || off=1
      else
        tracks="—"
        drift="not adopted: add \`.copier-answers.yml\`"
        off=1
      fi
      ;;
  esac
  drifted=$((drifted + off))
  found=""
  for a in "${assets[@]}"; do
    git -C "$path" cat-file -e "${ref}:${a}" 2>/dev/null && found+="\`${a}\` "
  done
  rows+="| \`${repo}\` (${name}, ${tags}) | ${tracks} | ${drift} | ${plat} | ${found:-none} |"$'\n'
done < <(yq -r '.projects | to_entries[] | [.key, .value.path, .value.url, (.value.tags | join(",")), (.value.vercel // ""), (.value.neon // "")] | join("'"$us"'")' "$house/desk/mani.yaml")

cat > "$out" <<EOF
---
title: Estate drift ${date}
kind: estate
date: ${date}
blueprint: ${tag}
drifted: ${drifted}
---
# Estate drift — ${date}

Every repo in \`desk/mani.yaml\`. A live repo's default branch is read against blueprint
\`${tag}\`, and its answers are read against Vercel and Neon. A dormant repo is read for its
archived flag. A live repo conforms when Drift says \`current\` and Platform says \`backed\`
(\`conformance/CONTEXT.md\`). A repo behind the tag gets one PR from \`conform.sh\`, opened with
\`gh pr create\`; the merge is Jamie's. A Platform line is fixed on the platform, by the repo's
setup stubs or a triage stub: this run changes nothing there.
Claude and agent assets are listed for the human check that each one is still used.

| Repo | Tracks | Drift | Platform | Claude and agent assets |
|---|---|---|---|---|
${rows}
EOF
echo "$out"
