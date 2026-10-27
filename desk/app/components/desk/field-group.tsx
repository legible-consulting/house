import { cloneElement, isValidElement, useId, type ReactNode } from "react";
import { Field as FieldBase, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

// A field: the label, one control, a hint and an error. The control gets an id, so the label
// names it, and `aria-describedby` wires the hint and the error to it, so a reader hears them
// with the control. `full` spans the row of a FieldGroup. The caller puts `autocomplete`,
// `inputmode` and `enterkeyhint` on the control where they apply.
interface ControlProps {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
}

export function Field({
  label,
  hint,
  error,
  full = false,
  className,
  children,
}: {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  full?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const control = isValidElement<ControlProps>(children) ? children : null;
  const controlId = control?.props.id ?? id;
  const describedBy = [control?.props["aria-describedby"], hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <FieldBase data-invalid={error ? true : undefined} className={cn(full && "sm:col-span-full", className)}>
      <FieldLabel htmlFor={controlId}>{label}</FieldLabel>
      {control
        ? cloneElement(control, {
            id: controlId,
            "aria-describedby": describedBy,
            "aria-invalid": error ? true : control.props["aria-invalid"],
          })
        : children}
      {hint && <FieldDescription id={hintId}>{hint}</FieldDescription>}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </FieldBase>
  );
}

// A group of fields: a fieldset with a mono micro uppercase legend, one column below sm, two
// from sm, three from lg. `disabled` disables every control in it.
export function FieldGroup({
  legend,
  disabled,
  className,
  children,
}: {
  legend?: ReactNode;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset disabled={disabled} className={cn("grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {legend && (
        <legend className="mb-2 font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">{legend}</legend>
      )}
      {children}
    </fieldset>
  );
}

// The end of a form: one primary button, full width below sm, spanning the group's row.
export function FieldActions({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-3 sm:col-span-full sm:flex-row sm:items-center max-sm:*:w-full", className)}>
      {children}
    </div>
  );
}
