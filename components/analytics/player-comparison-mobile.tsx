"use client"

import { useState } from "react"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, TrendingUp, TrendingDown, Minus, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { players } from "@/data/players"

// Filter only forwards and defensemen
const skaters = players.filter((player) => player.position !== "Goalie")

// Quick comparison presets
const presets = [
  { id: "top-scorers", label: "Top Scorers", icon: TrendingUp, players: ["1", "2"] },
  { id: "defensemen", label: "Top Defensemen", icon: Users, players: ["5", "6"] },
  { id: "power-play", label: "Power Play", icon: Zap, players: ["1", "3"] },
]

interface StatData {
  name: string
  player1: number
  player2: number
  unit?: string
}

export function PlayerComparisonMobile() {
  const [player1, setPlayer1] = useState(skaters[0].id)
  const [player2, setPlayer2] = useState(skaters[1].id)
  const [expandedStat, setExpandedStat] = useState<string | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  const selectedPlayer1 = skaters.find((p) => p.id === player1)
  const selectedPlayer2 = skaters.find((p) => p.id === player2)

  // Mock data for comparison with more stats
  const comparisonData: StatData[] = [
    { name: "Goals", player1: 24, player2: 18 },
    { name: "Assists", player1: 38, player2: 45 },
    { name: "Points", player1: 62, player2: 63 },
    { name: "Plus/Minus", player1: 15, player2: -8 },
    { name: "PIM", player1: 42, player2: 36, unit: "min" },
    { name: "Shots", player1: 186, player2: 142 },
    { name: "Shooting %", player1: 12.9, player2: 12.7, unit: "%" },
    { name: "TOI/Game", player1: 18.5, player2: 16.2, unit: "min" },
  ]

  const handlePresetSelect = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId)
    if (preset) {
      setPlayer1(preset.players[0])
      setPlayer2(preset.players[1])
      setSelectedPreset(presetId)
    }
  }

  const getStatComparison = (stat: StatData) => {
    const diff = stat.player1 - stat.player2
    if (Math.abs(diff) < 0.1) return { icon: Minus, color: "text-gray-500" }
    if (diff > 0) return { icon: TrendingUp, color: "text-green-600" }
    return { icon: TrendingDown, color: "text-red-600" }
  }

  const getPlayerInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('')
  }

  return (
    <div className="space-y-4 -mx-2 md:mx-0">
      {/* Quick Presets - Mobile Only */}
      <div className="md:hidden px-2">
        <p className="text-xs font-medium text-gray-600 mb-2">Quick Comparisons</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
          {presets.map((preset) => {
            const Icon = preset.icon
            return (
              <Button
                key={preset.id}
                variant={selectedPreset === preset.id ? "default" : "outline"}
                size="sm"
                onClick={() => handlePresetSelect(preset.id)}
                className="flex-shrink-0 h-8 text-xs"
              >
                <Icon className="h-3 w-3 mr-1" />
                {preset.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Player Selection */}
      <div className="space-y-3 px-2 md:px-0">
        {/* Player 1 */}
        <Card className="border-2 border-blue-200 bg-blue-50/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-blue-400">
                <AvatarImage src={`/placeholder-user.jpg`} />
                <AvatarFallback className="bg-blue-500 text-white font-bold">
                  {selectedPlayer1 ? getPlayerInitials(selectedPlayer1.name) : "P1"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 mb-1">Player 1</p>
                <Select value={player1} onValueChange={(value) => { setPlayer1(value); setSelectedPreset(null); }}>
                  <SelectTrigger className="h-9 bg-white border-blue-200">
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    {skaters.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{player.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {player.position}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Player 2 */}
        <Card className="border-2 border-green-200 bg-green-50/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-green-400">
                <AvatarImage src={`/placeholder-user.jpg`} />
                <AvatarFallback className="bg-green-500 text-white font-bold">
                  {selectedPlayer2 ? getPlayerInitials(selectedPlayer2.name) : "P2"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 mb-1">Player 2</p>
                <Select value={player2} onValueChange={(value) => { setPlayer2(value); setSelectedPreset(null); }}>
                  <SelectTrigger className="h-9 bg-white border-green-200">
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    {skaters.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{player.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {player.position}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile-Optimized Stats Display */}
      <div className="md:hidden space-y-2 px-2">
        {comparisonData.map((stat) => {
          const comparison = getStatComparison(stat)
          const Icon = comparison.icon
          const player1Percentage = stat.player1 / (stat.player1 + stat.player2) * 100
          
          return (
            <Card 
              key={stat.name} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setExpandedStat(expandedStat === stat.name ? null : stat.name)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{stat.name}</span>
                    <Icon className={cn("h-4 w-4", comparison.color)} />
                  </div>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 text-gray-400 transition-transform",
                      expandedStat === stat.name && "rotate-180"
                    )}
                  />
                </div>
                
                {/* Visual Bar Comparison */}
                <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${player1Percentage}%` }}
                  />
                  <div 
                    className="absolute right-0 top-0 h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${100 - player1Percentage}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <span className="text-xs font-bold text-white">
                      {stat.player1}{stat.unit || ''}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {stat.player2}{stat.unit || ''}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedStat === stat.name && (
                  <div className="mt-3 pt-3 border-t space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">{selectedPlayer1?.name}</span>
                      <span className="font-medium text-blue-600">
                        {stat.player1}{stat.unit || ''}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">{selectedPlayer2?.name}</span>
                      <span className="font-medium text-green-600">
                        {stat.player2}{stat.unit || ''}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs pt-1">
                      <span className="text-gray-600">Difference</span>
                      <span className={cn("font-medium", comparison.color)}>
                        {stat.player1 > stat.player2 ? '+' : ''}{(stat.player1 - stat.player2).toFixed(1)}{stat.unit || ''}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Desktop Chart (hidden on mobile) */}
      <div className="hidden md:block h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={comparisonData.slice(0, 5)} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" tick={{ fill: "#1f2937" }} />
            <YAxis tick={{ fill: "#1f2937" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            />
            <Bar dataKey="player1" fill="#3b82f6" name={selectedPlayer1?.name || "Player 1"} radius={[4, 4, 0, 0]} />
            <Bar dataKey="player2" fill="#10b981" name={selectedPlayer2?.name || "Player 2"} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
