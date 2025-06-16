"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        // Clear authentication
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')

        // Small delay to ensure state updates before redirect
        setTimeout(() => {
            router.push('/login')
        }, 500)
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-blue-100/20">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-slate-600">Signing out...</p>
            </div>
        </div>
    )
}
