import { Children, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// A stat tile: the figure in mono, the label under it. It is a link when it filters a list.
export function Stat({
  value,
  label,
  href,
  className,
}: {
  value: ReactNode;
  label: ReactNode;
  href?: string;
  className?: string;
}) {
  const tile = (
    <Card size="sm" className={cn("h-full", href && "transition-colors hover:bg-accent", className)}>
      <CardContent>
        <div className="font-mono text-figure tabular-nums">{value}</div>
        <div className="text-ui text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
  return href ? (
    <a href={href} className="block h-full rounded-lg">
      {tile}
    </a>
  ) : (
    tile
  );
}

// A grid of tiles: two columns on the phone, four from sm, seven from lg where there are seven.
export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  const seven = Children.count(children) === 7;
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", seven && "lg:grid-cols-7", className)}>
      {Children.map(children, (tile) => (
        <li>{tile}</li>
      ))}
    </ul>
  );
}
