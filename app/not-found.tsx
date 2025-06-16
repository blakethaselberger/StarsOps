"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-blue-100/20 flex items-center justify-center p-4">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent pointer-events-none opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src="/st-louis-blues.svg"
            alt="Blues Logo"
            className="h-16 w-16 object-contain drop-shadow-sm"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-black tracking-tight leading-none">
              <span className="text-[#003087]">Blues</span>
              <span className="text-[#FCB514]">Ops</span>
            </h1>
            <span className="text-xs text-slate-500 font-medium tracking-wider uppercase">
              Hockey Operations
            </span>
          </div>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h2 className="text-9xl font-black text-slate-200 mb-4">404</h2>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h3>
          <p className="text-slate-600 max-w-md mx-auto">
            Looks like this page went to the penalty box. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="gap-2 border-slate-300 hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Button
            asChild
            className="gap-2 bg-[#003087] hover:bg-[#002570] text-white"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-4">Quick Links:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/players" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              Players
            </Link>
            <Link href="/analytics" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              Analytics
            </Link>
            <Link href="/video" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              Video Analysis
            </Link>
            <Link href="/scouting" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              Scouting
            </Link>
            <Link href="/notes" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              Meeting Notes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
