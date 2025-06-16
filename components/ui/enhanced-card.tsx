"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const enhancedCardVariants = {
    default: "bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300",
    elevated: "bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-200/60 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-large)] transform hover:-translate-y-1 transition-all duration-300",
    interactive: "bg-gradient-to-br from-white via-blue-50/20 to-blue-100/20 backdrop-blur-sm border border-blue-200/40 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] hover:border-blue-300/60 transition-all duration-300 cursor-pointer",
    glass: "bg-white/10 backdrop-blur-lg border border-white/20 shadow-[var(--shadow-subtle)] hover:bg-white/20 transition-all duration-300",
}

const enhancedCardSizes = {
    sm: "p-3 rounded-lg",
    md: "p-4 sm:p-6 rounded-xl",
    lg: "p-6 sm:p-8 rounded-2xl",
}

export interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: keyof typeof enhancedCardVariants
    size?: keyof typeof enhancedCardSizes
    gradient?: boolean
    glow?: boolean
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
    ({ className, variant = "default", size = "md", gradient, glow, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden",
                    enhancedCardVariants[variant],
                    enhancedCardSizes[size],
                    gradient && "bg-[var(--gradient-surface)]",
                    glow && "shadow-[var(--shadow-glow)]",
                    className
                )}
                {...props}
            />
        )
    }
)
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props} />
))
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl sm:text-2xl font-bold leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent",
            className
        )}
        {...props}
    />
))
EnhancedCardTitle.displayName = "EnhancedCardTitle"

const EnhancedCardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm sm:text-base text-gray-600 leading-relaxed", className)}
        {...props}
    />
))
EnhancedCardDescription.displayName = "EnhancedCardDescription"

const EnhancedCardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4", className)} {...props} />
))
EnhancedCardContent.displayName = "EnhancedCardContent"

const EnhancedCardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center pt-4 border-t border-gray-100", className)} {...props} />
))
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export {
    EnhancedCard,
    EnhancedCardHeader,
    EnhancedCardFooter,
    EnhancedCardTitle,
    EnhancedCardDescription,
    EnhancedCardContent,
}
