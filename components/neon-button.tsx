"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NeonButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function NeonButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled,
}: NeonButtonProps) {
  const variants = {
    primary: "bg-accent hover:bg-accent/80 text-accent-foreground border-accent hover:shadow-accent/50",
    secondary:
      "bg-secondary hover:bg-secondary/80 text-secondary-foreground border-secondary hover:shadow-secondary/50",
    accent: "bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <Button
      className={cn(
        "font-bold tracking-wide transition-all duration-300 border-2",
        "hover:shadow-lg hover:scale-105 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
