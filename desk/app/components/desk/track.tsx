import { STEPS, stepOf, type Pr } from "@/lib/work";
import { cn } from "@/lib/utils";

// A walk through ordered steps (desk/app/DESIGN.md, rule 5): one hairline segment per step,
// filled up to the current step, and the current step's name beside them in mono meta. A
// reader hears "Step 2 of 5, build". The deal's stages (stage-track.tsx) and the ticket's
// steps (StepTrack below) and a lesson of the course (/sell/<key>) draw through it. A name
// longer than the width left is cut with an ellipsis; a reader still hears it whole. `lg` is
// for the ticket page: segments 24 px wide and 2 px tall.

export function Track({
  steps,
  at,
  name,
  unit = "Step",
  strong = false,
  size = "sm",
  className,
}: {
  steps: readonly string[];
  at: number; // the current step's index; steps up to it are filled
  name?: string; // the words beside the track; the step's name when absent
  unit?: string; // the reader's word: "Step 2 of 5"
  strong?: boolean; // the name in 600: the step waits on Jamie
  size?: "sm" | "lg";
  className?: string;
}) {
  const words = name ?? steps[at] ?? "";
  return (
    <span
      role="img"
      aria-label={`${unit} ${at + 1} of ${steps.length}, ${words}`}
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span aria-hidden="true" className={cn("flex shrink-0 items-center", size === "lg" ? "gap-1" : "gap-0.5")}>
        {steps.map((s, j) => (
          <span
            key={s}
            className={cn(size === "lg" ? "h-0.5 w-6" : "h-px w-3", j <= at ? "bg-foreground" : "bg-border")}
          />
        ))}
      </span>
      <span aria-hidden="true" className={cn("min-w-0 truncate font-mono text-meta", strong && "font-semibold")}>
        {words}
      </span>
    </span>
  );
}

// The words of a pull request's step, with the act when it is Jamie's: "spec · your tick",
// "ready · your tick", "merge · yours".
export function stepWords(pr: Pr): string {
  const step = stepOf(pr);
  if (pr.waiting === "merge") return `${step} · yours`;
  if (pr.waiting) return `${step} · your tick`;
  return step;
}

// A ticket's track through its pull request's five steps.
export function StepTrack({ pr, size, className }: { pr: Pr; size?: "sm" | "lg"; className?: string }) {
  const step = stepOf(pr);
  const at = step === "done" ? STEPS.length - 1 : STEPS.indexOf(step);
  return (
    <Track
      steps={STEPS}
      at={at}
      name={stepWords(pr)}
      strong={pr.waiting !== null}
      size={size}
      className={className}
    />
  );
}
