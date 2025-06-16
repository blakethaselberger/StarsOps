"use client"

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useSidebar } from "@/app/providers"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { ClientSidebar } from "@/components/client-sidebar"
import { ClientHeader } from "@/components/client-header"
import dynamic from "next/dynamic"

// Only dynamically import the AI chatbot as it's not critical for initial page load
const AIChatbotEnhanced = dynamic(() => import("@/components/ai-assistant/ai-chatbot-enhanced").then((mod) => mod.AIChatbotEnhanced), {
    ssr: false
})

interface LayoutWrapperProps {
    children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
    const { isOpen, toggle } = useSidebar()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Check auth status
        const authStatus = localStorage.getItem('isAuthenticated')
        const isAuth = authStatus === 'true'
        setIsAuthenticated(isAuth)
        setHasCheckedAuth(true)

        // If not authenticated and not on login/logout page, redirect to login
        if (!isAuth && pathname !== '/login' && pathname !== '/logout') {
            router.push('/login')
        }
    }, [pathname, router])

    useEffect(() => {
        // Check localStorage for saved collapse state
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebar-collapsed')
            if (saved) {
                setIsCollapsed(JSON.parse(saved))
            }
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed))
        }
    }, [isCollapsed])

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    // Show a minimal loading state while checking auth
    if (!hasCheckedAuth) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-blue-100/20">
                <div className="animate-pulse">
                    <img
                        src="/st-louis-blues.svg"
                        alt="Blues Logo"
                        className="h-12 w-12 object-contain opacity-50"
                    />
                </div>
            </div>
        )
    }

    // If not authenticated or on login/logout pages, show page without layout wrapper
    if (!isAuthenticated || pathname === '/logout' || pathname === '/login') {
        return <>{children}</>
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-blue-100/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Desktop Sidebar - Hidden on mobile */}
            <div className="hidden lg:block">
                <ClientSidebar isCollapsed={isCollapsed} />
            </div>

            {/* Mobile Sidebar - Sheet overlay */}
            <Sheet open={isOpen} onOpenChange={toggle}>
                <SheetContent side="left" className="p-0 w-64 lg:hidden bg-white/95 backdrop-blur-sm">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <ClientSidebar isCollapsed={false} />
                </SheetContent>
            </Sheet>

            <div className="flex flex-col flex-1 overflow-hidden min-w-0">
                <ClientHeader isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
                <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 lg:p-8 relative">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent pointer-events-none opacity-50"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }} />
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>
            </div>

            {/* AI Chatbot - Available on all pages */}
            <AIChatbotEnhanced />
        </div>
    )
}
