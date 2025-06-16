"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
    DollarSign,
    Users,
    FileText,
    AlertCircle,
    Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    type: 'user' | 'assistant' | 'error'
    content: string
    timestamp: Date
    actions?: Array<{
        type: 'cap-check' | 'player-stats' | 'create-meeting' | 'send-email' | 'contract-lookup'
        data?: any
    }>
}

interface QuickAction {
    id: string
    label: string
    icon: React.ReactNode
    command: string
    description: string
}

const quickActions: QuickAction[] = [
    {
        id: 'cap-check',
        label: 'Cap Analysis',
        icon: <Calculator className="h-4 w-4" />,
        command: 'Can we afford to trade for Connor McDavid at $12.5M? What would we need to send back?',
        description: 'Analyze salary cap implications of trades'
    },
    {
        id: 'player-stats',
        label: 'Player Stats',
        icon: <TrendingUp className="h-4 w-4" />,
        command: 'Compare Jordan Kyrou\'s stats to other top-6 wingers this season',
        description: 'Get detailed player performance analysis'
    },
    {
        id: 'contract-info',
        label: 'Contract Analysis',
        icon: <DollarSign className="h-4 w-4" />,
        command: 'What are the best value contracts on our roster? Who should we prioritize for extensions?',
        description: 'Analyze contract values and extensions'
    },
    {
        id: 'trade-scenarios',
        label: 'Trade Ideas',
        icon: <Users className="h-4 w-4" />,
        command: 'Suggest realistic trade targets for a top-4 defenseman within our budget',
        description: 'Generate trade scenarios and targets'
    },
    {
        id: 'draft-analysis',
        label: 'Draft Strategy',
        icon: <FileText className="h-4 w-4" />,
        command: 'Analyze our draft needs and suggest strategy for the upcoming draft',
        description: 'Draft analysis and prospect evaluation'
    },
    {
        id: 'roster-optimization',
        label: 'Roster Help',
        icon: <Users className="h-4 w-4" />,
        command: 'How can we optimize our lineup for better cap efficiency and performance?',
        description: 'Roster construction and optimization'
    }
]

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'assistant',
            content: "Hi! I'm your BluesOps AI assistant. I can help you with salary cap checks, player statistics, contract information, scheduling meetings, and more. What would you like to know?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen, isMinimized])

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        const currentInput = inputValue
        setInputValue("")
        setIsTyping(true)

        try {
            // Convert messages to OpenAI format
            const chatMessages = messages.map(msg => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.content
            }))

            // Add the current user message
            chatMessages.push({
                role: 'user',
                content: currentInput
            })

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: chatMessages,
                    context: getCurrentBluesContext()
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to get response from AI')
            }

            const data = await response.json()

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: data.message,
                timestamp: new Date(),
                actions: generateActions(currentInput)
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('Chat error:', error)
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'error',
                content: error instanceof Error ? error.message : 'Failed to get response from AI assistant. Please try again.',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsTyping(false)
        }
    }

    const getCurrentBluesContext = () => {
        return `
ST. LOUIS BLUES CAP SITUATION (2025-26 Season):

CURRENT SEASON (2025-26):
- NHL Cap Limit: $95,500,000
- Projected Cap Hit: $90,474,850
- Current Cap Space: $5,025,150
- Active Roster: 22/23 players
- Standard Contracts: 41/50
- Bonus Overages: $2,153,475
- Potential Bonuses: $1,775,000

FUTURE PROJECTIONS:
2026-27: Cap Space $41,238,334 (Cap Limit: $104,000,000)
2027-28: Cap Space $75,363,334 (Cap Limit: $113,500,000)  
2028-29: Cap Space $82,750,000 (Cap Limit: $113,500,000)

KEY INSIGHTS:
- Current Date: ${new Date().toLocaleDateString()}
- Season: 2025-26 NHL Regular Season
- Team: St. Louis Blues
- Cap situation is very tight this year but opens up significantly in future years
- Major decisions needed for upcoming RFA/UFA signings
- Excellent position for future acquisitions starting 2026-27

ROSTER COMPOSITION:
- Active roster slots available: 1
- Contract slots available: 9
- LTIR Pool: Not currently used
- Retained salary arrangements: Active

IMPORTANT: When asked about specific player contracts, current stats, or detailed roster information not provided here, please indicate that you would need to access the player database or current sources, as roster information changes frequently during the season.
    `
    }

    const generateActions = (input: string): Message['actions'] => {
        const lowerInput = input.toLowerCase()
        const actions: Message['actions'] = []

        if (lowerInput.includes('cap') || lowerInput.includes('trade')) {
            actions.push({ type: 'cap-check' })
        }
        if (lowerInput.includes('stats')) {
            actions.push({ type: 'player-stats' })
        }
        if (lowerInput.includes('contract')) {
            actions.push({ type: 'contract-lookup' })
        }
        if (lowerInput.includes('meeting')) {
            actions.push({ type: 'create-meeting' })
        }
        if (lowerInput.includes('email')) {
            actions.push({ type: 'send-email' })
        }

        return actions.length > 0 ? actions : undefined
    }

    const handleQuickAction = (action: QuickAction) => {
        setInputValue(action.command)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50 border-0"
                size="icon"
                style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Bot className="h-6 w-6 text-white drop-shadow-sm" />
            </Button>
        )
    }

    return (
        <Card
            className={cn(
                "fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] backdrop-blur-xl bg-white/95 shadow-2xl border-slate-200/60 z-50 transition-all duration-300 ring-1 ring-slate-200/20",
                isMinimized ? "h-16" : "h-[600px] max-h-[calc(100vh-3rem)]"
            )}
            style={{
                boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)',
            }}
        >
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/80 to-blue-100/60 border-b border-slate-200/60 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-8 w-8 ring-2 ring-blue-200/50">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                                    <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
                        </div>
                        <div>
                            <CardTitle className="text-sm font-semibold text-slate-900">BluesOps AI</CardTitle>
                            <p className="text-xs text-slate-600">Hockey Operations Assistant</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="h-8 w-8 hover:bg-blue-100/70 transition-colors duration-200"
                        >
                            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-8 w-8 hover:bg-blue-100/70 transition-colors duration-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[calc(600px-5rem)]">
                    {/* Quick Actions */}
                    <div className="p-4 border-b bg-gradient-to-r from-slate-50/80 to-blue-50/40 backdrop-blur-sm">
                        <p className="text-xs font-medium text-slate-700 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Quick Actions
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {quickActions.slice(0, 6).map((action) => (
                                <Button
                                    key={action.id}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuickAction(action)}
                                    className="h-8 text-xs justify-start bg-white/70 hover:bg-blue-50/80 border-slate-200/60 hover:border-blue-300/60 transition-all duration-200 hover:shadow-sm backdrop-blur-sm"
                                    title={action.description}
                                >
                                    <span className="text-blue-600">{action.icon}</span>
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
                                        <Avatar className="h-6 w-6 mt-1">
                                            <AvatarFallback className="bg-blue-600 text-white text-xs">
                                                <Bot className="h-3 w-3" />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div
                                        className={cn(
                                            "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                                            message.type === 'user'
                                                ? "bg-blue-600 text-white"
                                                : message.type === 'error'
                                                    ? "bg-red-100 text-red-800 border border-red-200"
                                                    : "bg-slate-100 text-slate-900"
                                        )}
                                    >
                                        {message.type === 'error' && (
                                            <div className="flex items-center gap-2 mb-1">
                                                <AlertCircle className="h-4 w-4" />
                                                <span className="font-medium text-xs">Error</span>
                                            </div>
                                        )}
                                        <p>{message.content}</p>
                                        {message.actions && (
                                            <div className="flex gap-2 mt-2 flex-wrap">
                                                {message.actions.map((action, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="text-xs bg-white/20 hover:bg-white/30 cursor-pointer"
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
                                        <Avatar className="h-6 w-6 mt-1">
                                            <AvatarFallback className="bg-slate-600 text-white text-xs">
                                                <User className="h-3 w-3" />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 justify-start">
                                    <Avatar className="h-6 w-6 mt-1">
                                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                                            <Bot className="h-3 w-3" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="bg-slate-100 rounded-lg px-3 py-2">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-4 border-t bg-gradient-to-r from-white to-blue-50/30 backdrop-blur-sm">
                        <div className="flex gap-2">
                            <Input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about cap space, player stats, contracts..."
                                className="flex-1 border-slate-200/60 bg-white/80 backdrop-blur-sm focus:border-blue-300 focus:ring-blue-200 transition-all duration-200"
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-sm hover:shadow-md transition-all duration-200"
                                size="icon"
                            >
                                {isTyping ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}
