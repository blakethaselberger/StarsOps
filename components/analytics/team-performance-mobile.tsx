"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Trophy, 
  Users, 
  Zap,
  Shield,
  Activity,
  BarChart3,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamStat {
  label: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
  icon: React.ElementType
  color: string
  progress?: number
  rank?: number
  description?: string
}

const teamStats: TeamStat[] = [
  {
    label: "Points",
    value: 68,
    change: 5,
    trend: "up",
    icon: Trophy,
    color: "text-yellow-600 bg-yellow-50",
    progress: 68,
    rank: 3,
    description: "3rd in Central Division"
  },
  {
    label: "Goals For",
    value: 186,
    change: 12,
    trend: "up",
    icon: Target,
    color: "text-green-600 bg-green-50",
    progress: 75,
    rank: 8,
    description: "8th in NHL"
  },
  {
    label: "Goals Against",
    value: 164,
    change: -8,
    trend: "down",
    icon: Shield,
    color: "text-blue-600 bg-blue-50",
    progress: 82,
    rank: 5,
    description: "5th best defense"
  },
  {
    label: "Power Play %",
    value: "24.3%",
    change: 2.1,
    trend: "up",
    icon: Zap,
    color: "text-purple-600 bg-purple-50",
    progress: 24.3,
    rank: 11,
    description: "11th in NHL"
  },
  {
    label: "Penalty Kill %",
    value: "81.2%",
    change: -1.3,
    trend: "down",
    icon: Users,
    color: "text-orange-600 bg-orange-50",
    progress: 81.2,
    rank: 14,
    description: "14th in NHL"
  },
  {
    label: "Win Streak",
    value: 4,
    trend: "up",
    icon: Activity,
    color: "text-indigo-600 bg-indigo-50",
    description: "W-W-W-W"
  }
]

export function TeamPerformanceMobile() {
  return (
    <div className="space-y-4 -mx-2 md:mx-0">
      {/* Quick Stats Grid - Mobile */}
      <div className="md:hidden grid grid-cols-2 gap-3 px-2">
        {teamStats.slice(0, 4).map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className={cn("p-2 rounded-lg", stat.color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {stat.trend && (
                    <Badge 
                      variant={stat.trend === "up" ? "default" : "secondary"}
                      className={cn(
                        "text-xs px-1.5 py-0.5",
                        stat.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}
                    >
                      {stat.trend === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {Math.abs(stat.change || 0)}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                {stat.rank && (
                  <p className="text-xs text-gray-500 mt-1">#{stat.rank} NHL</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed Stats List - Mobile */}
      <div className="md:hidden space-y-2 px-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Detailed Performance</h3>
        {teamStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", stat.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    {stat.change && (
                      <div className={cn(
                        "flex items-center gap-1 text-xs",
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      )}>
                        {stat.trend === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {Math.abs(stat.change)}
                      </div>
                    )}
                  </div>
                </div>
                {stat.progress !== undefined && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Performance</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Games - Mobile */}
      <div className="md:hidden px-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Last 5 Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {["W", "W", "W", "W", "L"].map((result, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                      result === "W" 
                        ? "bg-green-100 text-green-700" 
                        : result === "L" 
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {result}
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">4-1-0</p>
                <p className="text-xs text-gray-500">80% Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop View - Hidden on Mobile */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {teamStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </CardTitle>
                  <div className={cn("p-2 rounded-lg", stat.color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.change && (
                    <Badge 
                      variant={stat.trend === "up" ? "default" : "secondary"}
                      className={cn(
                        "text-xs",
                        stat.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}
                    >
                      {stat.trend === "up" ? "+" : ""}{stat.change}
                    </Badge>
                  )}
                </div>
                {stat.description && (
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                )}
                {stat.progress !== undefined && (
                  <Progress value={stat.progress} className="h-2 mt-3" />
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
