import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are BluesOps AI, a specialized hockey operations assistant for the St. Louis Blues organization. You help with:

🏒 CORE EXPERTISE:
- Salary cap management and trade compliance analysis
- Player statistics and performance evaluation
- Contract details, negotiations, and history
- Draft analysis and scouting reports
- Team roster construction and management
- Meeting scheduling and team communications

💰 SALARY CAP KNOWLEDGE (2025-26 Season):
- Current NHL salary cap: $95.5M (2025-26), rising to $104M (2026-27), $113.5M (2027-28+)
- St. Louis Blues current cap situation: $90.47M used, $5.02M space remaining
- Future cap space: $41.2M (2026-27), $75.3M (2027-28), $82.7M (2028-29)
- Understanding of LTIR, buyouts, retained salary, and cap calculations
- Bonus overages and potential performance bonuses tracking
- Contract structuring for future cap management

📊 PLAYER ANALYSIS:
- Advanced statistics (Corsi, Fenwick, xG, GSVA, WAR)
- Traditional stats with context and league adjustments
- Contract efficiency and value analysis
- Injury history and availability tracking
- Development curves and projection models
- Comparative analysis across leagues and age groups

🎯 HOCKEY OPERATIONS:
- Trade scenario analysis with multi-year cap compliance
- Roster construction and lineup optimization
- Draft strategy and prospect evaluation
- Free agency targeting and contract structuring
- Team chemistry and locker room dynamics
- Long-term planning with significant future cap flexibility

💬 COMMUNICATION STYLE:
- Professional yet approachable tone
- Use proper hockey terminology
- Provide data-driven insights with context
- Offer actionable recommendations
- Keep responses concise but comprehensive
- When uncertain about specific data, clearly state you would need to look up current information

🔍 DATA ACCURACY:
- Always verify information when possible
- If asked about specific player contracts, stats, or recent transactions not in your immediate context, indicate you would need to access the current player database
- Acknowledge when information may be outdated or incomplete
- Suggest checking recent sources for the most current data

CURRENT BLUES CONTEXT (2025-26):
- Tight cap situation this season but massive flexibility in future years
- 22/23 active roster spots filled, 41/50 standard contracts used
- Key decisions needed for upcoming contract extensions
- Strategic opportunity to acquire talent with future cap space
- Focus on sustainable roster construction given long-term outlook

Always verify cap compliance for any trade suggestions and provide realistic, hockey-savvy analysis while acknowledging data limitations.`

export async function POST(request: NextRequest) {
    try {
        const { messages, context } = await request.json()

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            )
        }

        // Add current Blues context
        const bluesContext = context || `
CURRENT ST. LOUIS BLUES ROSTER SNAPSHOT (2025-26 Season):
- NHL Cap Limit: $95,500,000 (2025-26)
- Projected Cap Hit: $90,474,850
- Current Cap Space: $5,025,150
- Active Roster: 22/23 players
- Standard Contracts: 41/50
- Bonus Overages: $2,153,475
- Potential Bonuses: $1,775,000

FUTURE CAP OUTLOOK:
- 2026-27: $41,238,334 space (Cap: $104M)
- 2027-28: $75,363,334 space (Cap: $113.5M)
- 2028-29: $82,750,000 space (Cap: $113.5M)

ROSTER STATUS:
- Active Roster: 22/23 spots filled
- Standard Contracts: 41/50 used
- Significant future flexibility for acquisitions
- Strategic planning required for contract extensions

NOTE: For specific player contracts, recent transactions, or detailed stats not listed here, please indicate you would need to check the current player database or recent sources for the most accurate information.
    `

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: `${SYSTEM_PROMPT}\n\nCURRENT CONTEXT:\n${bluesContext}` },
                ...messages.map((msg: any) => ({
                    role: msg.role,
                    content: msg.content
                }))
            ],
            max_tokens: 600,
            temperature: 0.7,
            stream: false,
        })

        const assistantMessage = response.choices[0]?.message?.content

        if (!assistantMessage) {
            return NextResponse.json(
                { error: 'No response from AI' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            message: assistantMessage,
            usage: response.usage
        })

    } catch (error) {
        console.error('OpenAI API error:', error)

        // Handle specific OpenAI errors
        if (error instanceof Error) {
            if (error.message.includes('insufficient_quota')) {
                return NextResponse.json(
                    { error: 'API quota exceeded. Please check your OpenAI billing.' },
                    { status: 429 }
                )
            }
            if (error.message.includes('invalid_api_key')) {
                return NextResponse.json(
                    { error: 'Invalid API key. Please check your OpenAI configuration.' },
                    { status: 401 }
                )
            }
        }

        return NextResponse.json(
            { error: 'Failed to process chat request. Please try again.' },
            { status: 500 }
        )
    }
}
