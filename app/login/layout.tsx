import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sign In - BluesOps",
    description: "Sign in to your BluesOps account",
}

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-blue-100/20">
            {children}
        </div>
    )
}
