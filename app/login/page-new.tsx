"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"

// Custom Hockey Puck Icon
const HockeyPuck = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10 text-white"
    >
        <ellipse cx="12" cy="12" rx="8" ry="3" />
        <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(45 12 12)" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
)

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Validation
        if (!email) {
            setError("Please enter your email.")
            setIsLoading(false)
            return
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email.")
            setIsLoading(false)
            return
        }

        if (!password) {
            setError("Please enter your password.")
            setIsLoading(false)
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.")
            setIsLoading(false)
            return
        }

        // Check demo credentials
        if (email === "coach@bluesops.com" && password === "test1234") {
            // Simulate loading
            setTimeout(() => {
                setIsLoading(false)
                // Store auth state and redirect to dashboard
                localStorage.setItem("isAuthenticated", "true")
                router.push("/")
            }, 1500)
        } else {
            setTimeout(() => {
                setError("Incorrect email or password.")
                setIsLoading(false)
            }, 1500)
        }
    }

    const handleDemoFill = () => {
        setEmail("coach@bluesops.com")
        setPassword("test1234")
        setError("")
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo and Header */}
                <div className="text-center space-y-4">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <HockeyPuck />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                            BluesOps
                        </h1>
                        <p className="text-slate-600">Hockey Operations Platform</p>
                    </div>
                </div>

                {/* Login Form */}
                <Card className="border-slate-200 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1 text-center pb-6">
                        <CardTitle className="text-2xl font-semibold text-slate-900">
                            Sign in to your account
                        </CardTitle>
                        <CardDescription className="text-slate-600">
                            Access your hockey operations dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-slate-900">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-slate-900">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <Alert className="border-red-200 bg-red-50">
                                    <AlertDescription className="text-red-700 text-sm">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Remember Me and Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                                        Remember me
                                    </Label>
                                </div>
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                    disabled={isLoading}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg transition-all duration-200"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="space-y-3 pt-4 border-t border-slate-200">
                            <div className="text-center">
                                <h4 className="text-sm font-medium text-slate-900 mb-2">Demo Credentials</h4>
                                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg">
                                    <p><strong>Email:</strong> coach@bluesops.com</p>
                                    <p><strong>Password:</strong> test1234</p>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDemoFill}
                                    className="mt-3 text-xs border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                                    disabled={isLoading}
                                >
                                    Click to auto-fill
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center text-xs text-slate-500">
                    © 2025 BluesOps. Internal hockey operations platform.
                </div>
            </div>
        </div>
    )
}
