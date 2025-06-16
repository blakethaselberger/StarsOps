"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Shield, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Award,
  Clock,
  Activity,
  BarChart3,
  Trophy
} from "lucide-react"
import { cn } from "@/lib/utils"

interface GoalieStat {
  name: string
  games: number
  wins: number
  losses: number
  otl: number
  gaa: number
  svPct: number
  shutouts: number
  saves: number
  shotsAgainst: number
  minutesPlayed: number
  qualityStarts: number
  reallyBadStarts: number
}

const goalieStats: GoalieStat[] = [
  {
    name: "Jordan Binnington",
    games: 42,
    wins: 24,
    losses: 14,
    otl: 4,
    gaa: 2.84,
    svPct: 0.913,
    shutouts: 3,
    saves: 1089,
    shotsAgainst: 1193,
    minutesPlayed: 2456,
    qualityStarts: 26,
    reallyBadStarts: 4
  },
  {
    name: "Joel Hofer",
    games: 18,
    wins: 10,
    losses: 6,
    otl: 2,
    gaa: 2.65,
    svPct: 0.918,
    shutouts: 1,
    saves: 456,
    shotsAgainst: 497,
    minutesPlayed: 1034,
    qualityStarts: 12,
    reallyBadStarts: 2
  }
]

export function GoalieStatsMobile() {
  const getPerformanceColor = (svPct: number) => {
    if (svPct >= 0.920) return "text-green-600 bg-green-50"
    if (svPct >= 0.910) return "text-blue-600 bg-blue-50"
    if (svPct >= 0.900) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getGAAColor = (gaa: number) => {
    if (gaa <= 2.50) return "text-green-600"
    if (gaa <= 3.00) return "text-blue-600"
    if (gaa <= 3.50) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-4 -mx-2 md:mx-0">
      {/* Mobile View - Card Layout */}
      <div className="md:hidden space-y-4 px-2">
        {goalieStats.map((goalie) => {
          const winPercentage = (goalie.wins / goalie.games) * 100
          const qsPercentage = (goalie.qualityStarts / goalie.games) * 100
          
          return (
            <Card key={goalie.name} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-gray-200">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">
                        {goalie.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base font-semibold">{goalie.name}</CardTitle>
                      <p className="text-xs text-gray-500">{goalie.games} Games Played</p>
                    </div>
                  </div>
                  <Badge className={cn("text-xs", getPerformanceColor(goalie.svPct))}>
                    {(goalie.svPct * 100).toFixed(1)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Record */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Record</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{goalie.wins}-{goalie.losses}-{goalie.otl}</span>
                    <Badge variant="outline" className="text-xs">
                      {winPercentage.toFixed(0)}% Win
                    </Badge>
                  </div>
                </div>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">GAA</span>
                    </div>
                    <p className={cn("text-lg font-bold", getGAAColor(goalie.gaa))}>
                      {goalie.gaa.toFixed(2)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">Save %</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      .{(goalie.svPct * 1000).toFixed(0)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">Shutouts</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{goalie.shutouts}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">Saves</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{goalie.saves}</p>
                  </div>
                </div>

                {/* Quality Starts */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600">Quality Starts</span>
                    <span className="text-xs text-gray-500">{goalie.qualityStarts}/{goalie.games}</span>
                  </div>
                  <Progress value={qsPercentage} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">QS%: {qsPercentage.toFixed(0)}%</span>
                    <span className="text-red-500">RBS: {goalie.reallyBadStarts}</span>
                  </div>
                </div>

                {/* Workload */}
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-900">Minutes</span>
                  </div>
                  <span className="text-sm font-bold text-blue-900">
                    {Math.floor(goalie.minutesPlayed / 60)}:{(goalie.minutesPlayed % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Desktop View - Table Layout */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium text-sm text-gray-600">Goalie</th>
                <th className="text-center p-2 font-medium text-sm text-gray-600">GP</th>
                <th className="text-center p-2 font-medium text-sm text-gray-600">Record</th>
                <th className="text-center p-2 font-medium text-sm text-gray-600">GAA</th>
                <th className="text-center p-2 font-medium text-sm text-gray-600">SV%</th>
                <th className="text-center p-2 font-medium text-sm text-gray-600">SO</th>
                <th className="text-center p-2 font-medium text-sm text-gray-600">Saves</th>
                <th className="text-center p-2 font-medium text-sm text-gray-600">QS</th>
                <th className="text-center p-2 font-medium text-sm text-gray-600">RBS</th>
              </tr>
            </thead>
            <tbody>
              {goalieStats.map((goalie) => (
                <tr key={goalie.name} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="text-xs">
                          {goalie.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{goalie.name}</span>
                    </div>
                  </td>
                  <td className="text-center p-2">{goalie.games}</td>
                  <td className="text-center p-2">{goalie.wins}-{goalie.losses}-{goalie.otl}</td>
                  <td className="text-center p-2">
                    <span className={cn("font-medium", getGAAColor(goalie.gaa))}>
                      {goalie.gaa.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center p-2">
                    <Badge className={cn("text-xs", getPerformanceColor(goalie.svPct))}>
                      {(goalie.svPct * 100).toFixed(1)}%
                    </Badge>
                  </td>
                  <td className="text-center p-2">{goalie.shutouts}</td>
                  <td className="text-center p-2">{goalie.saves}</td>
                  <td className="text-center p-2">{goalie.qualityStarts}</td>
                  <td className="text-center p-2 text-red-600">{goalie.reallyBadStarts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
