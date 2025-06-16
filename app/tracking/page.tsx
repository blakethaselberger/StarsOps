"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle, EnhancedCardDescription } from "@/components/ui/enhanced-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity, Download, Filter, Plus, TrendingUp, Users, Zap } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"
import { PageHeader } from "@/components/ui/page-header"
import { PageLayout, PageSection } from "@/components/ui/page-layout"

const trackingData = [
    { date: "Oct", speed: 28.5, distance: 5.2, acceleration: 4.1 },
    { date: "Nov", speed: 29.1, distance: 5.4, acceleration: 4.3 },
    { date: "Dec", speed: 30.2, distance: 5.8, acceleration: 4.5 },
    { date: "Jan", speed: 29.8, distance: 5.6, acceleration: 4.4 },
    { date: "Feb", speed: 31.1, distance: 6.1, acceleration: 4.7 },
    { date: "Mar", speed: 30.5, distance: 5.9, acceleration: 4.6 },
]

const playerStats = [
    { name: "Connor McDavid", avgSpeed: 31.2, maxSpeed: 39.1, distance: 6.4, efficiency: 92 },
    { name: "Nathan MacKinnon", avgSpeed: 30.8, maxSpeed: 38.7, distance: 6.2, efficiency: 89 },
    { name: "Jordan Kyrou", avgSpeed: 30.1, maxSpeed: 37.9, distance: 5.9, efficiency: 87 },
    { name: "Pavel Buchnevich", avgSpeed: 28.9, maxSpeed: 36.2, distance: 5.7, efficiency: 85 },
]

export default function TrackingPage() {
    const [selectedPlayer, setSelectedPlayer] = useState("all")
    const [dateRange, setDateRange] = useState("season")

    return (
        <PageLayout>
            <PageHeader
                title="Player Tracking"
                description="Advanced player movement and performance tracking data"
            />
            
            <PageSection>

            {/* Filters - Desktop */}
            <EnhancedCard className="hidden md:block">
                <EnhancedCardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="player-select" className="text-sm font-medium text-slate-700">Player</Label>
                            <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select player" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Players</SelectItem>
                                    <SelectItem value="mcdavid">Connor McDavid</SelectItem>
                                    <SelectItem value="mackinnon">Nathan MacKinnon</SelectItem>
                                    <SelectItem value="kyrou">Jordan Kyrou</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="date-range" className="text-sm font-medium text-slate-700">Date Range</Label>
                            <Select value={dateRange} onValueChange={setDateRange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="season">Full Season</SelectItem>
                                    <SelectItem value="month">Last Month</SelectItem>
                                    <SelectItem value="week">Last Week</SelectItem>
                                    <SelectItem value="game">Last Game</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="metric" className="text-sm font-medium text-slate-700">Metric</Label>
                            <Select defaultValue="speed">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select metric" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="speed">Speed</SelectItem>
                                    <SelectItem value="distance">Distance</SelectItem>
                                    <SelectItem value="acceleration">Acceleration</SelectItem>
                                    <SelectItem value="efficiency">Efficiency</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button className="w-full">
                                <Filter className="mr-2 h-4 w-4" />
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </EnhancedCardContent>
            </EnhancedCard>

            {/* Filters - Mobile */}
            <div className="md:hidden space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                        <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="Select player" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Players</SelectItem>
                            <SelectItem value="mcdavid">Connor McDavid</SelectItem>
                            <SelectItem value="mackinnon">Nathan MacKinnon</SelectItem>
                            <SelectItem value="kyrou">Jordan Kyrou</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="season">Full Season</SelectItem>
                            <SelectItem value="month">Last Month</SelectItem>
                            <SelectItem value="week">Last Week</SelectItem>
                            <SelectItem value="game">Last Game</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <Select defaultValue="speed">
                        <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="Select metric" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="speed">Speed</SelectItem>
                            <SelectItem value="distance">Distance</SelectItem>
                            <SelectItem value="acceleration">Acceleration</SelectItem>
                            <SelectItem value="efficiency">Efficiency</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="h-9 text-sm">
                        <Filter className="mr-2 h-3.5 w-3.5" />
                        Apply
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                <EnhancedCard variant="elevated">
                    <EnhancedCardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-xs md:text-sm text-slate-600 mb-1">Avg Speed</p>
                                <p className="text-lg md:text-2xl font-bold text-blue-600">29.8 km/h</p>
                                <p className="text-xs text-green-600 font-medium hidden md:block">+2.1% from last month</p>
                            </div>
                            <div className="p-2 md:p-3 rounded-lg bg-blue-50">
                                <Zap className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                            </div>
                        </div>
                    </EnhancedCardContent>
                </EnhancedCard>

                <EnhancedCard variant="elevated">
                    <EnhancedCardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-xs md:text-sm text-slate-600 mb-1">Distance</p>
                                <p className="text-lg md:text-2xl font-bold text-green-600">5.9 km</p>
                                <p className="text-xs text-green-600 font-medium hidden md:block">+0.3 from last game</p>
                            </div>
                            <div className="p-2 md:p-3 rounded-lg bg-green-50">
                                <Activity className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                            </div>
                        </div>
                    </EnhancedCardContent>
                </EnhancedCard>

                <EnhancedCard variant="elevated">
                    <EnhancedCardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-xs md:text-sm text-slate-600 mb-1">Acceleration</p>
                                <p className="text-lg md:text-2xl font-bold text-orange-600">4.6 m/s²</p>
                                <p className="text-xs text-orange-600 font-medium hidden md:block">Peak performance</p>
                            </div>
                            <div className="p-2 md:p-3 rounded-lg bg-orange-50">
                                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
                            </div>
                        </div>
                    </EnhancedCardContent>
                </EnhancedCard>

                <EnhancedCard variant="elevated">
                    <EnhancedCardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-xs md:text-sm text-slate-600 mb-1">Efficiency</p>
                                <p className="text-lg md:text-2xl font-bold text-blue-600">88%</p>
                                <p className="text-xs text-blue-600 font-medium hidden md:block">Above league avg</p>
                            </div>
                            <div className="p-2 md:p-3 rounded-lg bg-blue-50">
                                <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                            </div>
                        </div>
                    </EnhancedCardContent>
                </EnhancedCard>
            </div>

            {/* Charts and Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <EnhancedCard variant="elevated">
                    <EnhancedCardHeader>
                        <EnhancedCardTitle>Performance Trends</EnhancedCardTitle>
                        <EnhancedCardDescription>Speed, distance, and acceleration over time</EnhancedCardDescription>
                    </EnhancedCardHeader>
                    <EnhancedCardContent className="p-3 md:p-6">
                        <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
                            <LineChart data={trackingData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Line type="monotone" dataKey="speed" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2 }} />
                                <Line type="monotone" dataKey="distance" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} />
                                <Line type="monotone" dataKey="acceleration" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </EnhancedCardContent>
                </EnhancedCard>

                <EnhancedCard variant="elevated">
                    <EnhancedCardHeader>
                        <EnhancedCardTitle>Player Leaderboard</EnhancedCardTitle>
                        <EnhancedCardDescription>Top performers by tracking metrics</EnhancedCardDescription>
                    </EnhancedCardHeader>
                    <EnhancedCardContent className="p-3 md:p-6">
                        <div className="space-y-3 md:space-y-4">
                            {playerStats.map((player, index) => (
                                <div key={player.name} className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs md:text-sm font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm md:text-base text-slate-900">{player.name}</p>
                                            <p className="text-xs md:text-sm text-slate-600">{player.avgSpeed} km/h avg</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs md:text-sm">
                                            {player.efficiency}% efficient
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </EnhancedCardContent>
                </EnhancedCard>
            </div>

            {/* Data Table */}
            <EnhancedCard variant="elevated">
                <EnhancedCardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <EnhancedCardTitle>Detailed Tracking Data</EnhancedCardTitle>
                            <EnhancedCardDescription>Comprehensive performance metrics</EnhancedCardDescription>
                        </div>
                        <Button variant="outline" className="hidden md:flex">
                            <Download className="mr-2 h-4 w-4" />
                            Export Data
                        </Button>
                        <Button variant="outline" size="sm" className="md:hidden">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </EnhancedCardHeader>
                <EnhancedCardContent className="p-3 md:p-6">
                    <div className="overflow-x-auto -mx-3 md:mx-0">
                        <table className="w-full text-xs md:text-sm">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left p-2 md:p-3 font-medium text-slate-700 whitespace-nowrap">Player</th>
                                    <th className="text-left p-2 md:p-3 font-medium text-slate-700 whitespace-nowrap">Avg Speed</th>
                                    <th className="text-left p-2 md:p-3 font-medium text-slate-700 whitespace-nowrap hidden sm:table-cell">Max Speed</th>
                                    <th className="text-left p-2 md:p-3 font-medium text-slate-700 whitespace-nowrap">Distance</th>
                                    <th className="text-left p-2 md:p-3 font-medium text-slate-700 whitespace-nowrap">Efficiency</th>
                                    <th className="text-left p-2 md:p-3 font-medium text-slate-700 whitespace-nowrap hidden md:table-cell">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playerStats.map((player) => (
                                    <tr key={player.name} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-2 md:p-3 font-medium text-slate-900 whitespace-nowrap">{player.name}</td>
                                        <td className="p-2 md:p-3 text-slate-600 whitespace-nowrap">{player.avgSpeed} km/h</td>
                                        <td className="p-2 md:p-3 text-slate-600 whitespace-nowrap hidden sm:table-cell">{player.maxSpeed} km/h</td>
                                        <td className="p-2 md:p-3 text-slate-600 whitespace-nowrap">{player.distance} km</td>
                                        <td className="p-2 md:p-3">
                                            <Badge variant={player.efficiency > 85 ? "default" : "secondary"} className="text-xs">
                                                {player.efficiency}%
                                            </Badge>
                                        </td>
                                        <td className="p-2 md:p-3 hidden md:table-cell">
                                            <Progress value={player.efficiency} className="w-16" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </EnhancedCardContent>
            </EnhancedCard>
            </PageSection>
        </PageLayout>
    )
}
