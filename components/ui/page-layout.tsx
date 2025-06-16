"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn("space-y-6 md:space-y-8", className)}>
      {children}
    </div>
  )
}

interface PageSectionProps {
  children: React.ReactNode
  className?: string
}

export function PageSection({ children, className }: PageSectionProps) {
  return (
    <div className={cn("space-y-4 md:space-y-6", className)}>
      {children}
    </div>
  )
}
