# Stub: Every vendored component reads the tokens, and the six the patterns need are added

- feature-slug: primitives
- epic: desk-restyle
- sequence: 2 of 11
- depends-on: tokens-and-fonts
- complexity: medium
- priority: P1

## Problem

The ten components in `components/ui/` carry shadcn's default classes: their own heights, radii and greys. The patterns of stub 3 need a drawer, a field, a toggle group, an empty state, a skeleton and a tooltip, and none is vendored.

## Proposed change

Restyle the ten vendored components against the tokens, changing classes and not behaviour. Add the six from the shadcn registry into `components/ui/` and restyle them the same way.

## Acceptance criteria

- [ ] The ten vendored components are restyled as the table in Notes says. Classes change; behaviour and props do not.
- [ ] `drawer`, `field`, `toggle-group`, `empty`, `skeleton` and `tooltip` are added with `npx shadcn@latest add <name>` into `components/ui/` and restyled against the tokens. `kbd` only if a shortcut appears. Nothing else is added.
- [ ] Every existing page still renders on the preview. Buttons, inputs and tables show the new heights and hairlines at 390 and 1440, light and dark. A focused control shows the inset outline.
- [ ] `check.yml` is green.

## Out of scope

- The patterns built from these: stub 3.
- Any page change.

## Notes

| Component | Change |
|---|---|
| `button` | heights from `--row` and `--control-sm`; `rounded-md`; press deepens the colour (`active:` one step down the ramp), no translate; one primary per view |
| `badge` | becomes the base of the status tag (stub 3); the filled variants are not used for state |
| `card` | hairline, `rounded-lg`, no shadow; `size="sm"` for a stat tile |
| `input`, `textarea`, `native-select` | height from `--row`; `--input` hairline; `text-body` (16 px on touch); `rounded-md`; `aria-invalid` draws `--destructive` |
| `label` | `text-ui`, 500 |
| `table` | header cells mono micro uppercase `--muted-foreground`; body rows `--grid-row` tall with a hairline under each; numeric cells right-aligned mono; a sticky header inside its scroll container |
| `alert` | the flash base: hairline, soft fill, icon, `role` from the variant |
| `separator` | `--border` |

The added ones: `drawer` (Base UI Drawer: the phone's bottom sheet, swipe to dismiss, snap points), `field` (label, control, description, error wired with `aria-describedby`), `toggle-group` (Base UI Toggle Group: segmented filters), `empty` (the empty state), `skeleton` (the loading state: the `--muted` fill, no shimmer), `tooltip` (Base UI Tooltip, desktop only, never the only place a label lives).

Read first: the breakdown, `desk/app/components.json`, `desk/app/components/ui/*.tsx`, `desk/app/app/globals.css` (as stub 1 left it), and the shadcn registry's page for each added component.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/primitives.md, then the files its Notes name. Do what it says. One branch, one pull request to main under 600 lines, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
