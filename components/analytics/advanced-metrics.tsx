"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for team strengths
const teamStrengthsData = [
  { category: "Offense", value: 85 },
  { category: "Defense", value: 78 },
  { category: "Goaltending", value: 92 },
  { category: "Special Teams", value: 75 },
  { category: "Physicality", value: 88 },
  { category: "Speed", value: 82 },
]

// Mock data for team comparison
const teamComparisonData = [
  {
    category: "Goals For",
    "St. Louis Blues": 85,
    "League Average": 75,
  },
  {
    category: "Goals Against",
    "St. Louis Blues": 78,
    "League Average": 75,
  },
  {
    category: "Power Play %",
    "St. Louis Blues": 92,
    "League Average": 80,
  },
  {
    category: "Penalty Kill %",
    "St. Louis Blues": 75,
    "League Average": 78,
  },
  {
    category: "Faceoff %",
    "St. Louis Blues": 88,
    "League Average": 82,
  },
  {
    category: "Shots For",
    "St. Louis Blues": 82,
    "League Average": 80,
  },
]

export function AdvancedMetrics() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="team-strengths">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <TabsList className="w-full grid grid-cols-2 h-auto gap-2 bg-transparent">
            <TabsTrigger
              value="team-strengths"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium"
            >
              Team Strengths
            </TabsTrigger>
            <TabsTrigger
              value="league-comparison"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium"
            >
              League Comparison
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="team-strengths" className="pt-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-b from-slate-50 to-white pb-4">
              <CardTitle className="text-lg font-bold text-primary">Team Strengths Analysis</CardTitle>
              <CardDescription className="text-gray-800 font-medium">
                Breakdown of team performance by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={teamStrengthsData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: "#1f2937" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#1f2937" }} />
                    <Radar name="St. Louis Blues" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="league-comparison" className="pt-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="bg-gradient-to-b from-slate-50 to-white pb-4">
              <CardTitle className="text-lg font-bold text-primary">League Comparison</CardTitle>
              <CardDescription className="text-gray-800 font-medium">
                Team performance compared to league average
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={teamComparisonData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: "#1f2937" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#1f2937" }} />
                    <Radar
                      name="St. Louis Blues"
                      dataKey="St. Louis Blues"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="League Average"
                      dataKey="League Average"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Corsi For %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53.2%</div>
            <p className="text-xs text-gray-700">Rank: 7th in NHL</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Expected Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189.5</div>
            <p className="text-xs text-gray-700">Rank: 5th in NHL</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">PDO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.012</div>
            <p className="text-xs text-gray-700">Rank: 9th in NHL</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
