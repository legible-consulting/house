// Clears the person's data from the pool rows nobody worked for 12 months
// (01-prospecting/legitimate-interest.md §5). A row at `new`, `contacted` or `lost` whose last
// touch, or its `added` date when it has no touch, is older than 12 months loses `contact_name`,
// `email`, `phone`, `website`, `ask` and `notes`. It keeps `company`, `country`, `line`,
// `source`, the reason and the dates. Its touches keep their dates and lose their notes. The
// no-contact list (the table suppressions) is not touched: a no outlives the row's data (§4).
// Usage, from desk/app, with DATABASE_URL in the environment (the Neon console's connection
// string for legible-desk):
//   node scripts/pool-purge.mjs        prints what it would clear and changes nothing
//   node scripts/pool-purge.mjs --yes  clears it
// Jamie runs it by hand from the laptop, not on a timer. It prints field names, never their
// values. The dates stay as they are, `updated` too, so a cleared row is not cleared again.
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set: the Neon console, project legible-desk, connection string.");
const yes = process.argv.slice(2).includes("--yes");
const sql = neon(url);

const FIELDS = ["contact_name", "email", "phone", "website", "ask", "notes"];

// The ids of the rows the rule covers, as SQL, for the report and for both writes: the writes
// read the rule again, so a row touched after the report is left alone.
const stale = `
  select p.id from prospects p left join touches t on t.prospect = p.id
  where p.status in ('new', 'contacted', 'lost')
  group by p.id
  having coalesce(max(t.touched_on), p.created_at::date) < (current_date - interval '12 months')::date`;

const rows = await sql.query(
  `select p.id, p.company, p.status,
     coalesce((select max(touched_on) from touches where prospect = p.id), p.created_at::date)::text as last,
     array_remove(array[${FIELDS.map((f) => `case when p.${f} <> '' then '${f}' end`).join(", ")}], null) as fields,
     (select count(*)::int from touches where prospect = p.id and note <> '') as notes
   from prospects p where p.id in (${stale}) order by last, p.company`,
);
const due = rows.filter((r) => r.fields.length > 0 || r.notes > 0);

if (!due.length) {
  console.log("Nothing to clear: no row at new, contacted or lost has data older than 12 months.");
  process.exit(0);
}
for (const r of due) {
  const notes = r.notes ? `, ${r.notes} touch note${r.notes === 1 ? "" : "s"}` : "";
  console.log(`${r.last}  ${r.status.padEnd(9)}  ${r.company}  (${r.id}): ${r.fields.join(", ") || "no field"}${notes}`);
}
if (!yes) {
  console.log(`\n${due.length} row${due.length === 1 ? "" : "s"} to clear. Nothing is changed. Run again with --yes to clear.`);
  process.exit(0);
}
const [cleared, touches] = await sql.transaction([
  sql.query(
    `update prospects set ${FIELDS.map((f) => `${f} = ''`).join(", ")}
     where id in (${stale}) and (${FIELDS.map((f) => `${f} <> ''`).join(" or ")}) returning id`,
  ),
  sql.query(`update touches set note = '' where note <> '' and prospect in (${stale}) returning id`),
]);
console.log(`\nCleared ${cleared.length} row${cleared.length === 1 ? "" : "s"} and ${touches.length} touch note${touches.length === 1 ? "" : "s"}.`);
