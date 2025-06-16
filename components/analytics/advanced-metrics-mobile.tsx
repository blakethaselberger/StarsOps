"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Zap,
  Target,
  Users,
  BarChart3,
  Info,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdvancedStat {
  category: string
  stats: {
    name: string
    value: string | number
    rank?: number
    percentile?: number
    trend?: "up" | "down" | "neutral"
    description?: string
  }[]
}

const advancedStats: AdvancedStat[] = [
  {
    category: "Possession Metrics",
    stats: [
      { name: "Corsi For %", value: "52.3%", rank: 8, percentile: 75, trend: "up", description: "Shot attempt differential at 5v5" },
      { name: "Fenwick For %", value: "51.8%", rank: 10, percentile: 68, trend: "up", description: "Unblocked shot attempt differential" },
      { name: "Expected Goals For %", value: "53.1%", rank: 6, percentile: 80, trend: "up", description: "Quality-adjusted shot differential" },
      { name: "High Danger Chances For %", value: "54.2%", rank: 5, percentile: 84, trend: "up", description: "High danger scoring chance share" },
    ]
  },
  {
    category: "Special Teams Analytics",
    stats: [
      { name: "PP Goals/60", value: "8.42", rank: 7, percentile: 77, trend: "up", description: "Power play goals per 60 minutes" },
      { name: "PK Save %", value: "87.3%", rank: 12, percentile: 60, trend: "down", description: "Penalty kill save percentage" },
      { name: "PP Shot Generation", value: "62.4", rank: 9, percentile: 70, trend: "neutral", description: "Shots per 60 on power play" },
      { name: "Net PP%", value: "8.7%", rank: 4, percentile: 87, trend: "up", description: "PP% minus PK% against" },
    ]
  },
  {
    category: "Player Impact",
    stats: [
      { name: "Goals Above Replacement", value: "42.3", rank: 11, percentile: 64, trend: "up", description: "Total team GAR" },
      { name: "Wins Above Replacement", value: "8.7", rank: 10, percentile: 67, trend: "up", description: "Total team WAR" },
      { name: "Average Game Score", value: "0.68", rank: 8, percentile: 73, trend: "neutral", description: "Average player game score" },
      { name: "Team Shooting Talent", value: "+2.1%", rank: 6, percentile: 80, trend: "up", description: "Shooting % above expected" },
    ]
  }
]

export function AdvancedMetricsMobile() {
  const [selectedCategory, setSelectedCategory] = useState("Possession Metrics")
  const [expandedStat, setExpandedStat] = useState<string | null>(null)

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 80) return "bg-green-500"
    if (percentile >= 60) return "bg-blue-500"
    if (percentile >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getTrendIcon = (trend?: string) => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-green-600" />
    if (trend === "down") return <TrendingDown className="h-3 w-3 text-red-600" />
    return <Activity className="h-3 w-3 text-gray-400" />
  }

  return (
    <div className="space-y-4 -mx-2 md:mx-0">
      {/* Mobile Category Selector */}
      <div className="md:hidden px-2">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
          {advancedStats.map((category) => (
            <Button
              key={category.category}
              variant={selectedCategory === category.category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.category)}
              className="flex-shrink-0 h-8 text-xs"
            >
              {category.category}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Stats Display */}
      <div className="md:hidden px-2">
        {advancedStats
          .filter(cat => cat.category === selectedCategory)
          .map((category) => (
            <div key={category.category} className="space-y-2">
              {category.stats.map((stat) => (
                <Card 
                  key={stat.name}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setExpandedStat(expandedStat === stat.name ? null : stat.name)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-1">
                          {getTrendIcon(stat.trend)}
                          <span className="font-medium text-sm">{stat.name}</span>
                        </div>
                        {expandedStat !== stat.name && (
                          <Info className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{stat.value}</span>
                        {stat.rank && (
                          <Badge variant="outline" className="text-xs">
                            #{stat.rank}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Percentile Bar */}
                    {stat.percentile !== undefined && (
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={cn("absolute left-0 top-0 h-full transition-all duration-500", getPercentileColor(stat.percentile))}
                          style={{ width: `${stat.percentile}%` }}
                        />
                      </div>
                    )}

                    {/* Expanded Details */}
                    {expandedStat === stat.name && (
                      <div className="mt-3 pt-3 border-t space-y-2">
                        {stat.description && (
                          <p className="text-xs text-gray-600">{stat.description}</p>
                        )}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {stat.rank && (
                            <div>
                              <span className="text-gray-500">NHL Rank:</span>
                              <span className="ml-1 font-medium">#{stat.rank}/32</span>
                            </div>
                          )}
                          {stat.percentile !== undefined && (
                            <div>
                              <span className="text-gray-500">Percentile:</span>
                              <span className="ml-1 font-medium">{stat.percentile}th</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
      </div>

      {/* Desktop View with Tabs */}
      <div className="hidden md:block">
        <Tabs defaultValue={advancedStats[0].category} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            {advancedStats.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {advancedStats.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.stats.map((stat) => (
                  <Card key={stat.name}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          {getTrendIcon(stat.trend)}
                          {stat.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">{stat.value}</span>
                          {stat.rank && (
                            <Badge variant="outline" className="text-xs">
                              #{stat.rank}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {stat.description && (
                        <p className="text-xs text-gray-600 mb-3">{stat.description}</p>
                      )}
                      {stat.percentile !== undefined && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Performance</span>
                            <span>{stat.percentile}th percentile</span>
                          </div>
                          <Progress value={stat.percentile} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Mobile Summary Card */}
      <div className="md:hidden px-2">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-gray-600">Top Percentile Stats</p>
                <p className="font-bold text-green-600">5 metrics</p>
              </div>
              <div>
                <p className="text-gray-600">Average Percentile</p>
                <p className="font-bold text-blue-600">71st</p>
              </div>
              <div>
                <p className="text-gray-600">Trending Up</p>
                <p className="font-bold text-green-600">8 metrics</p>
              </div>
              <div>
                <p className="text-gray-600">NHL Rank Avg</p>
                <p className="font-bold text-blue-600">#9</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
