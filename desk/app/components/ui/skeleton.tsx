import { cn } from "cn"

// The loading state: the `--muted` fill and no shimmer (breakdown, Motion rule 6).
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" className={cn("rounded-md bg-muted", className)} {...props} />
}

export { Skeleton }
