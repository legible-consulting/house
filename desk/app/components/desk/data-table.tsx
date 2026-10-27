import type { ReactNode } from "react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Empty } from "./empty";

// One table, two readings. From md it is a real table in a scroll container: the header
// sticks to the top of the container, and the first column sticks to the left when the table
// is wider than its container. Below md each row is a card with a hairline under it: the
// header is read by a screen reader only, the `title` cell spans the card, the `meta` cells
// sit on one line under it in mono, and every other cell shows its column's label above its
// value. A `hide` cell is for the desk only. An `action` cell is the row's trailing control
// at every width: the last cell from md, the foot of the card on the phone, on the trailing
// edge and above the card's link. When a row has a link, the whole card is its target on the
// phone; from md the title is. No rows renders the empty pattern, never an
// empty row.

type Phone = "title" | "show" | "meta" | "hide" | "action";

export interface Column<Row> {
  key: string;
  label: string;
  align?: "start" | "end"; // end: a figure, right-aligned in mono
  phone?: Phone; // the cell's place in the card; show by default
  className?: string; // on the cell
  cell: (row: Row) => ReactNode;
}

const PHONE: Record<Phone, string> = {
  title: "max-md:order-first max-md:block max-md:basis-full",
  meta: "max-md:-order-1 max-md:block max-md:font-mono max-md:text-meta max-md:text-muted-foreground",
  show: "max-md:block max-md:basis-full max-md:before:block max-md:before:font-mono max-md:before:text-micro max-md:before:uppercase max-md:before:tracking-eyebrow max-md:before:text-muted-foreground max-md:before:content-[attr(data-label)]",
  hide: "max-md:hidden",
  action: "max-md:relative max-md:z-10 max-md:order-last max-md:ml-auto max-md:block md:w-px md:text-right",
};

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  href,
  empty,
  className,
}: {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  href?: (row: Row) => string | undefined; // the row's link: the title is its text
  empty: ReactNode; // one sentence: what is absent and what writes it
  className?: string;
}) {
  if (rows.length === 0) return <Empty className={className}>{empty}</Empty>;
  return (
    <div className={cn("w-full md:relative md:max-h-[75dvh] md:overflow-auto", className)}>
      <table className="w-full border-separate border-spacing-0 text-ui max-md:block">
        <TableHeader className="max-md:sr-only">
          <TableRow>
            {columns.map((c, i) => (
              <TableHead
                key={c.key}
                data-numeric={c.align === "end" ? "" : undefined}
                className={cn(i === 0 && "md:sticky md:left-0 md:z-20")}
              >
                {c.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="max-md:block">
          {rows.map((row) => {
            const to = href?.(row);
            return (
              <TableRow
                key={rowKey(row)}
                className="max-md:relative max-md:flex max-md:h-auto max-md:flex-wrap max-md:items-baseline max-md:gap-x-3 max-md:gap-y-1 max-md:border-b max-md:py-3 md:bg-background"
              >
                {columns.map((c, i) => {
                  const phone = c.phone ?? "show";
                  const value = c.cell(row);
                  return (
                    <TableCell
                      key={c.key}
                      data-label={c.label}
                      data-numeric={c.align === "end" ? "" : undefined}
                      className={cn(
                        "max-md:border-0 max-md:p-0 max-md:text-left max-md:whitespace-normal",
                        PHONE[phone],
                        i === 0 && "md:sticky md:left-0 md:bg-inherit",
                        c.className,
                      )}
                    >
                      {phone === "title" && to ? (
                        <a href={to} className="max-md:font-semibold max-md:after:absolute max-md:after:inset-0 md:hover:underline">
                          {value}
                        </a>
                      ) : phone === "title" ? (
                        <span className="max-md:font-semibold">{value}</span>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </table>
    </div>
  );
}
