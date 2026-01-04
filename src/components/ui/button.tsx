import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const BUTTON_STYLES = {
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.97]",
  ].join(" "),

  // Neumorphic shadows with 3 layers: outer shadow + top highlight + bottom dark edge
  shadows: {
    raised: [
      "shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.1)]",
      "hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.15)]",
      "hover:scale-[1.02]",
    ].join(" "),

    inset: [
      "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]",
      "active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]",
    ].join(" "),

    flat: "hover:scale-[1.02]",
  }
} as const

const buttonVariants = cva(
  BUTTON_STYLES.base,
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-br from-[color-mix(in_srgb,var(--accent-primary)_100%,white_10%)] to-[color-mix(in_srgb,var(--accent-secondary)_100%,white_10%)]",
          "text-white",
          "rounded-2xl",
          BUTTON_STYLES.shadows.raised,
        ].join(" "),

        secondary: [
          "bg-gradient-to-br from-[color-mix(in_srgb,var(--bg-secondary)_100%,white_5%)] to-[color-mix(in_srgb,var(--bg-secondary)_100%,black_5%)]",
          "text-foreground",
          "rounded-2xl",
          "border border-border",
          BUTTON_STYLES.shadows.raised,
        ].join(" "),

        outline: [
          "bg-transparent",
          "text-foreground",
          "rounded-2xl",
          "border-2 border-border",
          "hover:bg-accent/10",
          BUTTON_STYLES.shadows.flat,
        ].join(" "),

        ghost: [
          "bg-transparent",
          "text-foreground",
          "rounded-xl",
          "hover:bg-accent/10",
          BUTTON_STYLES.shadows.flat,
        ].join(" "),

        link: [
          "text-primary",
          "underline-offset-4 hover:underline",
          "h-auto p-0",
        ].join(" "),

        destructive: [
          "bg-gradient-to-br from-red-600 to-red-700",
          "text-white",
          "rounded-2xl",
          BUTTON_STYLES.shadows.raised,
        ].join(" "),
      },

      size: {
        default: "h-11 px-6 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-xl gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-14 rounded-2xl px-8 text-base has-[>svg]:px-6",
        icon: "size-11 rounded-2xl",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-14 rounded-2xl",
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
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
