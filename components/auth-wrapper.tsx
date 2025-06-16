"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthWrapperProps {
    children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            if (typeof window !== 'undefined') {
                const authStatus = localStorage.getItem('isAuthenticated')
                if (authStatus === 'true') {
                    setIsAuthenticated(true)
                } else {
                    router.push('/login')
                }
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-slate-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null // Will redirect to login
    }

    return <>{children}</>
}
