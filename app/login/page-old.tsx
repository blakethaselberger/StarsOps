"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface FormErrors {
  email?: string
  password?: string
  credentials?: string
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loginSuccess, setLoginSuccess] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Check credentials
    if (email === "coach@bluesops.com" && password === "test1234") {
      setLoginSuccess(true)
      // In a real app, you'd redirect to dashboard
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    } else {
      setErrors({ credentials: "Incorrect email or password" })
    }

    setIsLoading(false)
  }

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value)
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: undefined }))
      }
    } else {
      setPassword(value)
      if (errors.password) {
        setErrors(prev => ({ ...prev, password: undefined }))
      }
    }
    
    // Clear credentials error when user starts typing
    if (errors.credentials) {
      setErrors(prev => ({ ...prev, credentials: undefined }))
    }
  }

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back!</h2>
              <p className="text-slate-600">Successfully logged into BluesOps</p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Redirecting to dashboard...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            {/* Hockey Puck SVG */}
            <svg 
              className="h-10 w-10 text-white" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="12" cy="12" rx="10" ry="6" fill="currentColor" opacity="0.9"/>
              <ellipse cx="12" cy="10" rx="8" ry="4" fill="currentColor"/>
              <ellipse cx="12" cy="8" rx="6" ry="2" fill="currentColor" opacity="0.7"/>
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              BluesOps
            </h1>
            <p className="text-slate-600">Hockey Operations Platform</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <h2 className="text-xl font-semibold text-center text-slate-900">
              Sign in to your account
            </h2>
            <p className="text-sm text-slate-600 text-center">
              Access your hockey operations dashboard
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={cn(
                    "h-11 bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20",
                    errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={cn(
                      "h-11 bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 pr-10",
                      errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    )}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Credentials Error */}
              {errors.credentials && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">
                    {errors.credentials}
                  </p>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-slate-600 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
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
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-center">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                  Demo Credentials
                </h4>
                <div className="space-y-1 text-sm text-slate-600">
                  <p><strong>Email:</strong> coach@bluesops.com</p>
                  <p><strong>Password:</strong> test1234</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("coach@bluesops.com")
                    setPassword("test1234")
                  }}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                  disabled={isLoading}
                >
                  Click to auto-fill
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          <p>© 2025 BluesOps. Internal hockey operations platform.</p>
        </div>
      </div>
    </div>
  )
}
