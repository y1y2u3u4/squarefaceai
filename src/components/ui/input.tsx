import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "h-11 w-full min-w-0 px-4 py-2.5 text-base md:text-sm",
        "rounded-2xl border border-border/50",
        "bg-gradient-to-br from-[color-mix(in_srgb,var(--bg-secondary)_100%,black_2%)] to-[color-mix(in_srgb,var(--bg-secondary)_100%,black_5%)]",
        "text-foreground placeholder:text-muted-foreground",
        "transition-all duration-200 outline-none",

        // Neumorphic inset shadow
        "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]",

        // Focus state
        "focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
        "focus:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.12)]",

        // Selection
        "selection:bg-primary selection:text-primary-foreground",

        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        // File input
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",

        // Invalid state
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",

        className
      )}
      {...props}
    />
  )
}

export { Input }
