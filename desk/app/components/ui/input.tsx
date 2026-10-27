import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

// A control: `--control` tall, the `--input` hairline, the body step (16 px on touch, so a
// phone does not zoom the field). The focus outline is the global inset one.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-control w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 text-body transition-colors file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-ui file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
