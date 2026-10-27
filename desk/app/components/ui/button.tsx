import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Heights from the tokens: `--control` for a button, `--control-sm` for a small one, `--row`
// for one that fills a list row. The focus outline is the global inset one (globals.css), so
// no ring here. A press deepens the colour one step and never moves the button.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-ui whitespace-nowrap transition-colors duration-100 select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        outline:
          "border-input bg-transparent text-foreground hover:bg-accent active:bg-muted aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] active:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_10%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "bg-transparent text-foreground hover:bg-accent active:bg-muted aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive text-background hover:bg-[color-mix(in_oklch,var(--destructive),var(--primary)_8%)] active:bg-[color-mix(in_oklch,var(--destructive),var(--primary)_16%)]",
        link: "text-primary underline-offset-3 hover:underline",
      },
      size: {
        default:
          "h-control gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-control-sm gap-1 px-2 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-control-sm gap-1 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-row gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        icon: "size-control",
        "icon-xs": "size-control-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-control-sm",
        "icon-lg": "size-row",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
