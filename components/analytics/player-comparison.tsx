"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { players } from "@/data/players"

// Filter only forwards and defensemen
const skaters = players.filter((player) => player.position !== "Goalie")

export function PlayerComparison() {
  const [player1, setPlayer1] = useState(skaters[0].id)
  const [player2, setPlayer2] = useState(skaters[1].id)

  const selectedPlayer1 = skaters.find((p) => p.id === player1)
  const selectedPlayer2 = skaters.find((p) => p.id === player2)

  // Mock data for comparison
  const comparisonData = [
    {
      name: "Goals",
      [selectedPlayer1?.name || "Player 1"]: 24,
      [selectedPlayer2?.name || "Player 2"]: 18,
    },
    {
      name: "Assists",
      [selectedPlayer1?.name || "Player 1"]: 38,
      [selectedPlayer2?.name || "Player 2"]: 45,
    },
    {
      name: "Points",
      [selectedPlayer1?.name || "Player 1"]: 62,
      [selectedPlayer2?.name || "Player 2"]: 63,
    },
    {
      name: "Plus/Minus",
      [selectedPlayer1?.name || "Player 1"]: 15,
      [selectedPlayer2?.name || "Player 2"]: 8,
    },
    {
      name: "PIM",
      [selectedPlayer1?.name || "Player 1"]: 42,
      [selectedPlayer2?.name || "Player 2"]: 36,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border shadow-sm bg-white">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Player 1</label>
              <Select value={player1} onValueChange={(value) => setPlayer1(value)}>
                <SelectTrigger className="border-slate-200 text-gray-800">
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {skaters.map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name} - {player.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm bg-white">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">Player 2</label>
              <Select value={player2} onValueChange={(value) => setPlayer2(value)}>
                <SelectTrigger className="border-slate-200 text-gray-800">
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {skaters.map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name} - {player.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
            <Legend />
            <Bar
              dataKey={selectedPlayer1?.name || "Player 1"}
              fill="#3b82f6"
              name={selectedPlayer1?.name || "Player 1"}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey={selectedPlayer2?.name || "Player 2"}
              fill="#10b981"
              name={selectedPlayer2?.name || "Player 2"}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
