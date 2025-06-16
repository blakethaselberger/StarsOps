"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
    Send,
    Bot,
    User,
    AlertCircle,
    Loader2,
    Sparkles,
    Brain,
    Calculator,
    BarChart3,
    DollarSign,
    Users,
    Target,
    Shield
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Message, QuickAction } from './types'
import { quickActions as baseQuickActions } from './constants'

interface AIChatbotMobileProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    messages: Message[]
    inputValue: string
    setInputValue: (value: string) => void
    isTyping: boolean
    handleSendMessage: () => void
    handleQuickAction: (action: QuickAction) => void
}

// Add icons to quick actions
const getQuickActionsWithIcons = (): QuickAction[] => {
    const iconMap: Record<string, React.ReactNode> = {
        'contract-info': <DollarSign className="h-4 w-4" />,
        'cba-compliance': <Shield className="h-4 w-4" />,
        'cap-management': <Calculator className="h-4 w-4" />,
        'player-analysis': <BarChart3 className="h-4 w-4" />,
        'trade-scenarios': <Users className="h-4 w-4" />,
        'draft-analysis': <Target className="h-4 w-4" />
    }
    
    return baseQuickActions.map(action => ({
        ...action,
        icon: iconMap[action.id] || null
    }))
}

export function AIChatbotMobile({
    isOpen,
    setIsOpen,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    handleSendMessage,
    handleQuickAction
}: AIChatbotMobileProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const sheetContentRef = useRef<HTMLDivElement>(null)
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const [viewportHeight, setViewportHeight] = useState(0)
    const quickActions = getQuickActionsWithIcons()

    // Handle viewport and keyboard detection
    useEffect(() => {
        if (!isOpen) return

        const updateViewportHeight = () => {
            if (window.visualViewport) {
                const vh = window.visualViewport.height
                setViewportHeight(vh)
                
                // Calculate keyboard height
                const windowHeight = window.innerHeight
                const keyboardH = windowHeight - vh
                setKeyboardHeight(keyboardH)
            }
        }

        // Initial setup
        updateViewportHeight()

        // Listen for viewport changes
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', updateViewportHeight)
            window.visualViewport.addEventListener('scroll', updateViewportHeight)
        }

        // Fallback for older browsers
        window.addEventListener('resize', updateViewportHeight)

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', updateViewportHeight)
                window.visualViewport.removeEventListener('scroll', updateViewportHeight)
            }
            window.removeEventListener('resize', updateViewportHeight)
        }
    }, [isOpen])

    // Prevent body scroll when chat is open
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('chat-open')
            // Store current scroll position
            const scrollY = window.scrollY
            document.body.style.top = `-${scrollY}px`
        } else {
            document.body.classList.remove('chat-open')
            // Restore scroll position
            const scrollY = document.body.style.top
            document.body.style.top = ''
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1)
            }
        }

        return () => {
            document.body.classList.remove('chat-open')
            document.body.style.top = ''
        }
    }, [isOpen])

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleInputFocus = () => {
        // Prevent zoom on iOS
        if (inputRef.current) {
            inputRef.current.style.fontSize = '16px'
        }
        
        // Scroll to bottom after a short delay to ensure keyboard is shown
        setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
            }
        }, 300)
    }

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50 border border-white/20"
                        size="icon"
                    >
                        <Sparkles className="h-6 w-6 text-white" />
                    </Button>
                </SheetTrigger>
                <SheetContent 
                    ref={sheetContentRef}
                    side="bottom" 
                    className="p-0 flex flex-col fixed inset-x-0 bottom-0"
                    style={{ 
                        height: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
                        maxHeight: '100vh',
                        transition: 'height 0.3s ease-in-out'
                    }}
                >
                    {/* Fixed Header */}
                    <SheetHeader className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Brain className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <SheetTitle className="text-base font-semibold text-white">BluesOps AI</SheetTitle>
                                <p className="text-xs text-blue-100">Your Hockey Operations Assistant</p>
                            </div>
                        </div>
                    </SheetHeader>

                    {/* Messages Area - Scrollable */}
                    <div 
                        className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-white"
                        style={{
                            paddingBottom: keyboardHeight > 0 ? '20px' : '0',
                            transition: 'padding-bottom 0.3s ease-in-out'
                        }}
                    >
                        {/* Quick Actions */}
                        <div className="p-4 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
                            <p className="text-xs font-medium text-slate-700 mb-3">Quick Actions</p>
                            <div className="grid grid-cols-2 gap-2">
                                {quickActions.slice(0, 4).map((action) => (
                                    <Button
                                        key={action.id}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleQuickAction(action)}
                                        className={cn(
                                            "h-10 text-xs justify-start bg-gradient-to-r text-white border-0",
                                            action.color
                                        )}
                                    >
                                        {action.icon}
                                        <span className="ml-2 truncate">{action.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3",
                                        message.type === 'user' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    {message.type === 'assistant' && (
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                                            <Bot className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                    <div
                                        className={cn(
                                            "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                                            message.type === 'user'
                                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                                : message.type === 'error'
                                                    ? "bg-red-50 text-red-800 border border-red-200"
                                                    : "bg-white shadow-sm border border-slate-200"
                                        )}
                                    >
                                        {message.type === 'error' && (
                                            <div className="flex items-center gap-2 mb-1">
                                                <AlertCircle className="h-4 w-4" />
                                                <span className="font-medium text-xs">Error</span>
                                            </div>
                                        )}
                                        <p className="leading-relaxed">{message.content}</p>
                                    </div>
                                    {message.type === 'user' && (
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center shrink-0">
                                            <User className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 justify-start">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                        <Bot className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="bg-white shadow-sm border border-slate-200 rounded-2xl px-4 py-3">
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Fixed Input Area */}
                    <div 
                        className="shrink-0 p-4 bg-white border-t shadow-lg" 
                        style={{ 
                            paddingBottom: `calc(1rem + env(safe-area-inset-bottom))`,
                            position: 'relative',
                            zIndex: 50
                        }}
                    >
                        <div className="flex gap-2">
                            <Input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onFocus={handleInputFocus}
                                placeholder="Ask about cap space, player stats..."
                                className="flex-1 h-12 px-4 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-full text-base"
                                style={{ fontSize: '16px' }} // Prevent zoom on iOS
                                inputMode="text"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                size="icon"
                            >
                                {isTyping ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Send className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
