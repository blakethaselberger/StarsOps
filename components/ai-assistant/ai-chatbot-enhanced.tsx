"use client"

import { useState, useRef, useEffect } from "react"
import { Message, DockPosition } from './types'
import { getCurrentBluesContext } from './constants'
import { AIChatbotMobile } from './ai-chatbot-mobile'
import { AIChatbotDesktop } from './ai-chatbot-desktop'

export function AIChatbotEnhanced() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [dockPosition, setDockPosition] = useState<DockPosition>('bottom-right')
    const [isMobile, setIsMobile] = useState(false)

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'assistant',
            content: "Welcome to BluesOps AI. I'm an internal agent developed for the St. Louis Blues organization with comprehensive access to NHL contracts, statistics, CBA rules, and league-wide data. I can provide detailed information about any player, team, or league matter. How can I assist you today?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inactivityTimer = useRef<NodeJS.Timeout>()

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Auto-hide functionality
    useEffect(() => {
        const resetInactivityTimer = () => {
            if (inactivityTimer.current) {
                clearTimeout(inactivityTimer.current)
            }

            // Auto-minimize after 2 minutes of inactivity
            inactivityTimer.current = setTimeout(() => {
                if (isOpen && !isMinimized && !isMobile) {
                    setIsMinimized(true)
                }
            }, 120000) // 2 minutes
        }

        // Reset timer on user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
        events.forEach(event => {
            document.addEventListener(event, resetInactivityTimer, true)
        })

        resetInactivityTimer()

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, resetInactivityTimer, true)
            })
            if (inactivityTimer.current) {
                clearTimeout(inactivityTimer.current)
            }
        }
    }, [isOpen, isMinimized, isMobile])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

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

    const handleQuickAction = (action: any) => {
        setInputValue(action.command)
    }

    // Mobile version
    if (isMobile) {
        return (
            <AIChatbotMobile
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                messages={messages}
                inputValue={inputValue}
                setInputValue={setInputValue}
                isTyping={isTyping}
                handleSendMessage={handleSendMessage}
                handleQuickAction={handleQuickAction}
            />
        )
    }

    // Desktop version
    return (
        <AIChatbotDesktop
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
            dockPosition={dockPosition}
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isTyping={isTyping}
            handleSendMessage={handleSendMessage}
            handleQuickAction={handleQuickAction}
        />
    )
}
