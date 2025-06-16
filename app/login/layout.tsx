import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sign In - StarsOps",
    description: "Sign in to your StarsOps account",
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
