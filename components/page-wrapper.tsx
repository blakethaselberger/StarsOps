import { ReactNode } from "react"

interface PageWrapperProps {
    title: string
    description?: string
    children: ReactNode
    headerAction?: ReactNode
}

export function PageWrapper({
    title,
    description,
    children,
    headerAction
}: PageWrapperProps) {
    return (
        <div className="space-y-6">
            {/* Consistent page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>
                {headerAction && (
                    <div className="flex-shrink-0">
                        {headerAction}
                    </div>
                )}
            </div>

            {/* Page content */}
            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
}
