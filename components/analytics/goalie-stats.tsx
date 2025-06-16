"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { players } from "@/data/players"

// Filter only goalies
const goalies = players.filter((player) => player.position === "Goalie")

// Mock data for save percentages
const savePercentageData = [
  { name: "Saved", value: 92.1 },
  { name: "Goals Against", value: 7.9 },
]

const COLORS = ["#3b82f6", "#ef4444"]

export function GoalieStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="bg-gradient-to-b from-slate-50 to-white pb-4">
            <CardTitle className="text-lg font-bold text-primary">Save Percentage Breakdown</CardTitle>
            <CardDescription className="text-gray-800 font-medium">
              Average save percentage for team goalies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={savePercentageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {savePercentageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="bg-gradient-to-b from-slate-50 to-white pb-4">
            <CardTitle className="text-lg font-bold text-primary">Goalie Performance Metrics</CardTitle>
            <CardDescription className="text-gray-800 font-medium">Key statistics for team goalies</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-gray-800">Goalie</TableHead>
                  <TableHead className="font-semibold text-gray-800 tabular-nums">GP</TableHead>
                  <TableHead className="font-semibold text-gray-800 tabular-nums">W</TableHead>
                  <TableHead className="font-semibold text-gray-800 tabular-nums">L</TableHead>
                  <TableHead className="font-semibold text-gray-800 tabular-nums">SV%</TableHead>
                  <TableHead className="font-semibold text-gray-800 tabular-nums">GAA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goalies.map((goalie) => (
                  <TableRow key={goalie.id}>
                    <TableCell className="font-medium text-gray-800">{goalie.name}</TableCell>
                    <TableCell className="tabular-nums">{Math.floor(Math.random() * 20) + 30}</TableCell>
                    <TableCell className="tabular-nums">{Math.floor(Math.random() * 15) + 15}</TableCell>
                    <TableCell className="tabular-nums">{Math.floor(Math.random() * 10) + 5}</TableCell>
                    <TableCell className="tabular-nums">{(Math.random() * 0.05 + 0.9).toFixed(3)}</TableCell>
                    <TableCell className="tabular-nums">{(Math.random() * 1 + 1.8).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="bg-gradient-to-b from-slate-50 to-white pb-4">
          <CardTitle className="text-lg font-bold text-primary">Situational Save Percentages</CardTitle>
          <CardDescription className="text-gray-800 font-medium">
            Save percentages in different game situations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-gray-800">Goalie</TableHead>
                <TableHead className="font-semibold text-gray-800 tabular-nums">Even Strength</TableHead>
                <TableHead className="font-semibold text-gray-800 tabular-nums">Power Play</TableHead>
                <TableHead className="font-semibold text-gray-800 tabular-nums">Penalty Kill</TableHead>
                <TableHead className="font-semibold text-gray-800 tabular-nums">High Danger</TableHead>
                <TableHead className="font-semibold text-gray-800 tabular-nums">Low Danger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goalies.map((goalie) => (
                <TableRow key={goalie.id}>
                  <TableCell className="font-medium text-gray-800">{goalie.name}</TableCell>
                  <TableCell className="tabular-nums">{(Math.random() * 0.05 + 0.91).toFixed(3)}</TableCell>
                  <TableCell className="tabular-nums">{(Math.random() * 0.1 + 0.85).toFixed(3)}</TableCell>
                  <TableCell className="tabular-nums">{(Math.random() * 0.08 + 0.87).toFixed(3)}</TableCell>
                  <TableCell className="tabular-nums">{(Math.random() * 0.15 + 0.8).toFixed(3)}</TableCell>
                  <TableCell className="tabular-nums">{(Math.random() * 0.05 + 0.94).toFixed(3)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
