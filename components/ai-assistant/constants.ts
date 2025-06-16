import { QuickAction } from './types'

export const quickActions: QuickAction[] = [
    {
        id: 'contract-info',
        label: 'Contract Info',
        icon: null, // Will be set in component
        command: 'Get Connor McDavid\'s contract details',
        description: 'Get player contract information',
        color: 'from-purple-500 to-purple-600'
    },
    {
        id: 'cba-compliance',
        label: 'CBA Compliance',
        icon: null, // Will be set in component
        command: 'How does LTIR work?',
        description: 'CBA rules and compliance questions',
        color: 'from-blue-500 to-blue-600'
    },
    {
        id: 'cap-management',
        label: 'Cap Management',
        icon: null, // Will be set in component
        command: 'How much cap space do the Blues have this offseason?',
        description: 'Salary cap analysis and projections',
        color: 'from-green-500 to-green-600'
    },
    {
        id: 'player-analysis',
        label: 'Player Analysis',
        icon: null, // Will be set in component
        command: 'Who are the top 5 forwards in the NHL?',
        description: 'Player rankings and comparisons',
        color: 'from-orange-500 to-orange-600'
    },
    {
        id: 'trade-scenarios',
        label: 'Trade Ideas',
        icon: null, // Will be set in component
        command: 'Suggest realistic trade targets for a top-4 defenseman within our budget',
        description: 'Generate trade scenarios and targets',
        color: 'from-red-500 to-red-600'
    },
    {
        id: 'draft-analysis',
        label: 'Draft Strategy',
        icon: null, // Will be set in component
        command: 'Analyze our draft needs and suggest strategy for the upcoming draft',
        description: 'Draft analysis and prospect evaluation',
        color: 'from-indigo-500 to-indigo-600'
    }
]

export const getCurrentBluesContext = () => {
    return `
You are an internal AI agent developed for the St. Louis Blues organization, tasked with providing comprehensive information from across the NHL about contracts, statistics, rules, and the CBA. You have full access to NHL databases and can provide detailed, accurate information about any player, team, or league matter.

CURRENT ST. LOUIS BLUES INFORMATION:
- Salary Cap Space: $12.3M remaining for 2025-26 season
- Key Blues Contracts: 
  * Jordan Kyrou: $8.125M AAV through 2030-31
  * Robert Thomas: $8.125M AAV through 2030-31
  * Pavel Buchnevich: $5.8M AAV through 2025-26
  * Colton Parayko: $6.5M AAV through 2029-30
- Current Date: ${new Date().toLocaleDateString('en-US')}
- Season: 2024-25 NHL Regular Season

YOUR CAPABILITIES:
- Provide any NHL player's contract details (AAV, term, clauses, signing bonuses)
- Explain all CBA rules and regulations in detail
- Access current and historical player statistics
- Analyze salary cap situations for any team
- Suggest trade scenarios and evaluate their feasibility
- Provide draft analysis and prospect rankings
- Compare players across teams and conferences
- Explain complex CBA mechanisms (LTIR, buyouts, retained salary, etc.)

When responding:
- Always provide specific, detailed information
- Include relevant statistics and contract details
- Offer strategic insights and analysis
- Be confident in your knowledge - you have access to all NHL data
- Provide context and explanations for complex topics
- Never claim to lack access to information - if you don't have the infrmation, look it up
- Always use real players
    `
}
