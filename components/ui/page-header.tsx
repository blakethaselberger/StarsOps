"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card"

interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "card" | "gradient"
  className?: string
}

export function PageHeader({
  title,
  description,
  action,
  variant = "default",
  className
}: PageHeaderProps) {
  const content = (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-blue-600">
          {title}
        </h1>
        {description && (
          <p className="text-slate-900 text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-3">
          {action}
        </div>
      )}
    </div>
  )

  if (variant === "card") {
    return (
      <EnhancedCard variant="elevated" className={cn("border-slate-200/60", className)}>
        <EnhancedCardContent className="p-6 md:p-8">
          {content}
        </EnhancedCardContent>
      </EnhancedCard>
    )
  }

  if (variant === "gradient") {
    return (
      <div className={cn(
        "bg-gradient-to-r from-white to-blue-50/30 rounded-xl p-6 md:p-8 shadow-soft border border-slate-200/60",
        className
      )}>
        {content}
      </div>
    )
  }

  return (
    <div className={cn("", className)}>
      {content}
    </div>
  )
}
