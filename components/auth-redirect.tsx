"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthRedirectProps {
    children: React.ReactNode
}

export function AuthRedirect({ children }: AuthRedirectProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            if (typeof window !== 'undefined') {
                const authStatus = localStorage.getItem('isAuthenticated')

                if (authStatus === 'true') {
                    setIsAuthenticated(true)
                    // If already authenticated and on login page, redirect to dashboard
                    if (pathname === '/login') {
                        router.push('/')
                        return
                    }
                } else {
                    setIsAuthenticated(false)
                    // Only redirect if not already on login page
                    if (pathname !== '/login') {
                        router.push('/login')
                        return
                    }
                }
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [router, pathname])

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-blue-100/20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-slate-600">Loading...</p>
                </div>
            </div>
        )
    }

    // If on login page, always render (regardless of auth status)
    if (pathname === '/login') {
        return <>{children}</>
    }

    // If not authenticated and not on login page, don't render anything (will redirect)
    if (!isAuthenticated) {
        return null
    }

    // If authenticated and not on login page, render children
    return <>{children}</>
}
