export interface Message {
    id: string
    type: 'user' | 'assistant' | 'error'
    content: string
    timestamp: Date
    actions?: Array<{
        type: 'cap-check' | 'player-stats' | 'create-meeting' | 'send-email' | 'contract-lookup'
        data?: any
    }>
}

export interface QuickAction {
    id: string
    label: string
    icon: React.ReactNode
    command: string
    description: string
    color: string
}

export interface Position {
    x: number
    y: number
}

export type DockPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'floating'
