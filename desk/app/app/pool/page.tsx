import { redirect } from "next/navigation";
import { allProspects } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import { LANGUAGES, today } from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { Shell } from "../_shell";
import { addProspect } from "./actions";

// The pool: every row, for Jamie and every salesman (S1: one owner per row, all read it, so
// two salesmen never approach one company). Add a row here; the rest is on the row's page.
export const dynamic = "force-dynamic";

export default async function Pool({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const [rows, { error }] = await Promise.all([allProspects(), flash(searchParams)]);
  const now = today();
  const open = (s: string) => s !== "handed off" && s !== "lost";
  return (
    <Shell user={user} current="/pool">
      <h2>Pool</h2>
      {error && <p className="error">{error}</p>}
      <div className="wrap">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Sourced by</th>
              <th>Next action</th>
              <th>Touches</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="muted">
                  No prospects yet.
                </td>
              </tr>
            )}
            {rows.map((p) => (
              <tr key={p.id}>
                <td>
                  <a href={`/pool/${p.id}`}>{p.company}</a>
                </td>
                <td>{[p.contact_name, p.email || p.phone].filter(Boolean).join(" · ")}</td>
                <td>{p.status}</td>
                <td>{p.sourced_by}</td>
                <td className={p.next_action && p.next_action <= now && open(p.status) ? "due" : undefined}>
                  {p.next_action ?? ""}
                </td>
                <td>{p.touches}</td>
                <td>{p.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted">
        {rows.length} prospects. A red next action is due. You write the rows you sourced; the others are read-only.
      </p>

      <h3>Add a prospect</h3>
      <form action={addProspect} className="grid">
        <label>
          Company <input name="company" required />
        </label>
        <label>
          Source <input name="source" required placeholder="who referred, which event, which list" />
        </label>
        <label>
          Contact <input name="contact_name" />
        </label>
        <label>
          Email <input type="email" name="email" />
        </label>
        <label>
          Phone <input name="phone" placeholder="+351 …" />
        </label>
        <label>
          Country <input name="country" placeholder="PT, BE, GB" maxLength={2} />
        </label>
        <label>
          Language{" "}
          <select name="language" defaultValue="">
            <option value="">—</option>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="wide">
          Notes <textarea name="notes" rows={2} />
        </label>
        <div>
          <button>Add</button>
        </div>
      </form>
    </Shell>
  );
}
