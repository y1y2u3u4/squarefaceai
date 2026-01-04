import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-full px-3 py-1 text-xs font-semibold",
    "w-fit whitespace-nowrap shrink-0",
    "[&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none",
    "transition-all duration-200 overflow-hidden",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border border-transparent",
          "bg-gradient-to-br from-[color-mix(in_srgb,var(--accent-primary)_100%,white_10%)] to-[color-mix(in_srgb,var(--accent-secondary)_100%,white_10%)]",
          "text-white",
          "shadow-[0_2px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "[a&]:hover:shadow-[0_3px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "[a&]:hover:scale-105",
        ].join(" "),

        secondary: [
          "border border-border/50",
          "bg-gradient-to-br from-[color-mix(in_srgb,var(--bg-secondary)_100%,white_5%)] to-[color-mix(in_srgb,var(--bg-secondary)_100%,black_5%)]",
          "text-foreground",
          "shadow-[0_2px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "[a&]:hover:shadow-[0_3px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "[a&]:hover:scale-105",
        ].join(" "),

        destructive: [
          "border border-transparent",
          "bg-gradient-to-br from-red-600 to-red-700",
          "text-white",
          "shadow-[0_2px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "[a&]:hover:shadow-[0_3px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "[a&]:hover:scale-105",
        ].join(" "),

        outline: [
          "border-2 border-border",
          "bg-transparent",
          "text-foreground",
          "[a&]:hover:bg-accent/10",
          "[a&]:hover:scale-105",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
