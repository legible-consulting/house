import { notFound, redirect } from "next/navigation";
import { prospectById, touchesOf } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import {
  CHANNELS,
  DEAL_SIZES,
  LANGUAGES,
  LINES,
  SERVICES,
  SIZES,
  UUID_RE,
  canGoReady,
  canWrite,
  missingForReady,
  nextMoves,
  slugOf,
  today,
} from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { Shell } from "../../_shell";
import { checkHandoffPr, logTouch, moveStatus, readyForJamie, saveProspect } from "./actions";

// One prospect: the facts, the touches, the move, and "Ready for Jamie", which opens the
// handoff PR on the house and keeps its link here. Read-only for every salesman but the
// sourcer, and for everyone once handed off.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Search;
};

const Options = ({ list }: { list: readonly string[] }) => (
  <>
    <option value="">—</option>
    {list.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ))}
  </>
);

export default async function ProspectPage({ params, searchParams }: Props) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();
  const p = await prospectById(id);
  if (!p) notFound();
  const [touches, { error, note }] = await Promise.all([touchesOf(id), flash(searchParams)]);

  const write = canWrite(p, user);
  const moves = nextMoves(p, user);
  const missing = missingForReady(p);
  const slug = p.slug ?? slugOf(p.company);
  const slugLocked = Boolean(p.pr_url) || p.status === "ready for Jamie" || p.status === "handed off";
  const canTouch = write && p.status !== "ready for Jamie" && p.status !== "lost";

  return (
    <Shell user={user} current="/pool">
      <p>
        <a href="/pool">← Pool</a>
      </p>
      <h2>{p.company}</h2>
      <p className="muted">
        Status: <b>{p.status}</b> · sourced by {p.sourced_by} · added {p.added} · updated {p.updated}
        {p.next_action && <> · next action {p.next_action}</>}
        {p.pr_url && (
          <>
            {" "}
            · handoff PR: <a href={p.pr_url}>{p.pr_url}</a>
          </>
        )}
        {p.record && (
          <>
            {" "}
            · record: <code>{p.record}</code>
          </>
        )}
      </p>
      {!write && (
        <p className="muted">
          {p.status === "handed off"
            ? "Handed off: the client folder is the record now."
            : "Read-only: only the sourcer and Jamie write this row."}
        </p>
      )}
      {error && <p className="error">{error}</p>}
      {note && <p className="muted">{note}</p>}
      {p.lost_reason && <p>Lost: {p.lost_reason}</p>}

      <h3>Facts</h3>
      <form action={saveProspect}>
        <input type="hidden" name="id" value={p.id} />
        <fieldset className="grid" disabled={!write}>
          <label>
            Company <input name="company" defaultValue={p.company} required />
          </label>
          <label>
            Slug{" "}
            <input name="slug" defaultValue={slug} disabled={slugLocked} pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={40} />
          </label>
          <label>
            Contact <input name="contact_name" defaultValue={p.contact_name} />
          </label>
          <label>
            Role <input name="role" defaultValue={p.role} />
          </label>
          <label>
            Email <input type="email" name="email" defaultValue={p.email} />
          </label>
          <label>
            Phone <input name="phone" defaultValue={p.phone} placeholder="+351 …" />
          </label>
          <label>
            Website <input type="url" name="website" defaultValue={p.website} />
          </label>
          <label>
            Country <input name="country" defaultValue={p.country} placeholder="PT, BE, GB" maxLength={2} />
          </label>
          <label>
            Language{" "}
            <select name="language" defaultValue={p.language}>
              <Options list={LANGUAGES} />
            </select>
          </label>
          <label>
            Line{" "}
            <select name="line" defaultValue={p.line}>
              <Options list={LINES} />
            </select>
          </label>
          <label>
            Size{" "}
            <select name="size" defaultValue={p.size}>
              <Options list={SIZES} />
            </select>
          </label>
          <label>
            Service{" "}
            <select name="service" defaultValue={p.service}>
              <Options list={SERVICES} />
            </select>
          </label>
          <label>
            Deal size{" "}
            <select name="deal_size" defaultValue={p.deal_size}>
              <Options list={DEAL_SIZES} />
            </select>
          </label>
          <label>
            Source <input name="source" defaultValue={p.source} required />
          </label>
          <label>
            Next action <input type="date" name="next_action" defaultValue={p.next_action ?? ""} />
          </label>
          <label className="wide">
            Ask <textarea name="ask" rows={3} defaultValue={p.ask} placeholder="what they asked for, in your words" />
          </label>
          <label className="wide">
            Notes <textarea name="notes" rows={3} defaultValue={p.notes} />
          </label>
          <div>
            <button>Save</button>
          </div>
        </fieldset>
      </form>

      <h3>Touches</h3>
      {touches.length === 0 ? (
        <p className="muted">No touch logged.</p>
      ) : (
        <div className="wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Channel</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {touches.map((t) => (
                <tr key={t.id}>
                  <td>{t.touched_on}</td>
                  <td>{t.channel}</td>
                  <td>{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {canTouch && (
        <form action={logTouch} className="inline">
          <input type="hidden" name="id" value={p.id} />
          <input type="date" name="touched_on" defaultValue={today()} required />
          <select name="channel">
            {CHANNELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input name="note" placeholder="what was said" />
          <button>Log a touch</button>
        </form>
      )}

      {moves.length > 0 && (
        <>
          <h3>Move</h3>
          <form action={moveStatus} className="inline">
            <input type="hidden" name="id" value={p.id} />
            <select name="status">
              {moves.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <input name="lost_reason" placeholder="the reason, when lost" />
            <button>Move</button>
          </form>
          {p.status === "new" && p.touches === 0 && user.role !== "jamie" && (
            <p className="muted">contacted needs one logged touch.</p>
          )}
        </>
      )}

      {write && canGoReady(p) && (
        <>
          <h3>Ready for Jamie</h3>
          <p className="muted">
            Opens one PR on legible-consulting/house that creates <code>clients/{slug}/record.md</code> at stage
            prospect from this row. Jamie merges; &quot;Check the PR&quot; then moves the row to handed off.
          </p>
          {missing.length > 0 && <p className="error">Fill first: {missing.join(", ")}.</p>}
          <form action={readyForJamie} className="inline">
            <input type="hidden" name="id" value={p.id} />
            <button disabled={missing.length > 0}>Ready for Jamie</button>
          </form>
        </>
      )}

      {p.status === "ready for Jamie" && p.pr_url && (
        <>
          <h3>Handoff</h3>
          <p className="muted">
            Merged: the row moves to handed off and names its record. Closed without a merge: the row returns to{" "}
            {p.previous_status ?? "replied"}.
          </p>
          <form action={checkHandoffPr} className="inline">
            <input type="hidden" name="id" value={p.id} />
            <button>Check the PR</button>
          </form>
        </>
      )}
    </Shell>
  );
}
