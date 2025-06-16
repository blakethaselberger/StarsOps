"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    X,
    Send,
    Minimize2,
    Maximize2,
    Bot,
    User,
    Calculator,
    TrendingUp,
    Calendar,
    Mail,
    FileText,
    AlertCircle,
    Loader2,
    Sparkles,
    Brain,
    BarChart3,
    DollarSign,
    Users,
    Target,
    Shield
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Message, QuickAction, DockPosition } from './types'
import { quickActions as baseQuickActions } from './constants'

interface AIChatbotDesktopProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    isMinimized: boolean
    setIsMinimized: (minimized: boolean) => void
    dockPosition: DockPosition
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

export function AIChatbotDesktop({
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    dockPosition,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    handleSendMessage,
    handleQuickAction
}: AIChatbotDesktopProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const quickActions = getQuickActionsWithIcons()

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const getPositionClasses = () => {
        if (dockPosition === 'floating') return ''

        const positions = {
            'bottom-right': 'bottom-6 right-6',
            'bottom-left': 'bottom-6 left-6',
            'top-right': 'top-6 right-6',
            'top-left': 'top-6 left-6'
        }
        return positions[dockPosition] || positions['bottom-right']
    }

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50",
                    "backdrop-blur-sm border border-white/20 group",
                    getPositionClasses()
                )}
                size="icon"
            >
                <Sparkles className="h-7 w-7 text-white group-hover:scale-110 transition-transform" />
            </Button>
        )
    }

    return (
        <Card
            className={cn(
                "fixed w-[420px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl shadow-2xl border-0 z-50 transition-all duration-300",
                "ring-1 ring-black/5 rounded-2xl overflow-hidden",
                isMinimized ? "h-16" : "h-[650px] max-h-[calc(100vh-3rem)]",
                getPositionClasses()
            )}
        >
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base font-semibold text-white">BluesOps AI</CardTitle>
                            <p className="text-xs text-blue-100">Hockey Operations Assistant</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="h-8 w-8 hover:bg-white/20 text-white"
                        >
                            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-8 w-8 hover:bg-white/20 text-white"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[calc(650px-5rem)] bg-gradient-to-b from-slate-50 to-white">
                    {/* Quick Actions */}
                    <div className="p-4 bg-white/80 backdrop-blur-sm border-b">
                        <p className="text-xs font-medium text-slate-700 mb-3">Quick Actions</p>
                        <div className="grid grid-cols-3 gap-2">
                            {quickActions.slice(0, 6).map((action) => (
                                <Button
                                    key={action.id}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuickAction(action)}
                                    className={cn(
                                        "h-9 text-xs justify-start bg-gradient-to-r text-white border-0 hover:opacity-90 transition-opacity",
                                        action.color
                                    )}
                                    title={action.description}
                                >
                                    {action.icon}
                                    <span className="ml-1 truncate">{action.label}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
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
                                        {message.actions && (
                                            <div className="flex gap-2 mt-3 flex-wrap">
                                                {message.actions.map((action, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer transition-colors"
                                                    >
                                                        {action.type === 'cap-check' && <Calculator className="h-3 w-3 mr-1" />}
                                                        {action.type === 'player-stats' && <TrendingUp className="h-3 w-3 mr-1" />}
                                                        {action.type === 'contract-lookup' && <FileText className="h-3 w-3 mr-1" />}
                                                        {action.type === 'create-meeting' && <Calendar className="h-3 w-3 mr-1" />}
                                                        {action.type === 'send-email' && <Mail className="h-3 w-3 mr-1" />}
                                                        {action.type.replace('-', ' ')}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
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
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-4 border-t bg-white/90 backdrop-blur-sm">
                        <div className="flex gap-2">
                            <Input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about cap space, player stats, contracts..."
                                className="flex-1 h-11 px-4 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-full"
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
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
                </CardContent>
            )}
        </Card>
    )
}
