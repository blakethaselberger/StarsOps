"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, MapPin, Ruler, Trophy, Target, BarChart, DollarSign, FileText, Video, Activity, User, MessageSquare, Stethoscope, TrendingUp, ChevronRight, FileSignature } from "lucide-react"
import { players, type Player } from "@/data/players-data"
import { cn } from "@/lib/utils"
import { PageLayout } from "@/components/ui/page-layout"

export default function PlayerDetailPage() {
    const params = useParams()
    const router = useRouter()
    const playerId = parseInt(params.id as string)

    const player = players.find(p => p.id === playerId)

    if (!player) {
        return (
            <PageLayout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 sm:p-8">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Player Not Found</h1>
                    <p className="text-sm sm:text-base text-slate-600 mb-6 text-center">The player you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push('/players')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Players
                    </Button>
                </div>
            </PageLayout>
        )
    }

    const getPositionColor = (position: string) => {
        switch (position) {
            case 'Center':
            case 'Left Wing':
            case 'Right Wing':
                return 'bg-red-100 text-red-700 border-red-200'
            case 'Defense':
                return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'Goalie':
                return 'bg-purple-100 text-purple-700 border-purple-200'
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    const getContractColor = (contract: string) => {
        switch (contract) {
            case 'Signed':
                return 'bg-green-100 text-green-700 border-green-200'
            case 'RFA':
                return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'UFA':
                return 'bg-orange-100 text-orange-700 border-orange-200'
            case 'Entry Level':
                return 'bg-purple-100 text-purple-700 border-purple-200'
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    const getRatingColor = (rating: string) => {
        if (rating.startsWith('A')) return 'text-green-600 bg-green-50 border-green-200'
        if (rating.startsWith('B')) return 'text-blue-600 bg-blue-50 border-blue-200'
        if (rating.startsWith('C')) return 'text-orange-600 bg-orange-50 border-orange-200'
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }

    return (
        <PageLayout>
            <div className="flex flex-col gap-4 sm:gap-6">
                {/* Mobile-optimized Header */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/players')}
                        className="w-fit border-blue-200 text-blue-700 hover:bg-blue-50 h-9 text-sm"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Players
                    </Button>
                    
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Player Profile</h1>
                        <p className="text-sm sm:text-base text-slate-600">Detailed information for {player.name}</p>
                    </div>
                </div>

                {/* Mobile-optimized Player Header Card */}
                <Card className="gradient-card shadow-soft border-slate-200/60 overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                            {/* Avatar - Centered on mobile */}
                            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-white shadow-lg">
                                <AvatarImage src={`/players/${player.name.toLowerCase().replace(' ', '-')}.jpg`} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl sm:text-2xl font-bold">
                                    {player.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            
                            {/* Player Info - Centered on mobile */}
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mb-3">
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{player.name}</h2>
                                    <Badge className="text-base sm:text-lg px-3 py-1 bg-blue-600 text-white">
                                        #{player.number}
                                    </Badge>
                                </div>
                                
                                {/* Position and Team Info */}
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
                                    <Badge 
                                        variant="outline" 
                                        className={cn("text-xs sm:text-sm", getPositionColor(player.position))}
                                    >
                                        {player.position}
                                    </Badge>
                                    <span className="text-sm sm:text-base text-slate-600">
                                        {player.team} • {player.league}
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "font-semibold text-xs sm:text-sm",
                                            getRatingColor(player.rating)
                                        )}
                                    >
                                        {player.rating} Rating
                                    </Badge>
                                </div>
                                
                                {/* Player Details Grid - Mobile optimized */}
                                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                                        <span>{player.age} years old</span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                                        <span>{player.nationality}</span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                                        <Ruler className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                                        <span>{player.height}, {player.weight}</span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                                        <Target className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                                        <span>{player.shoots} Shot</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Mobile-optimized Tabs */}
                <Tabs defaultValue="performance" className="space-y-4 sm:space-y-6">
                    <TabsList className="w-full h-auto bg-slate-50 p-1 rounded-lg overflow-x-auto flex-nowrap">
                        <div className="flex gap-1 min-w-full sm:grid sm:grid-cols-4 lg:grid-cols-8">
                            <TabsTrigger 
                                value="performance" 
                                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white whitespace-nowrap px-3 py-2 text-xs sm:text-sm"
                            >
                                <BarChart className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Performance</span>
                                <span className="sm:hidden">Stats</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="contracts" 
                                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white whitespace-nowrap px-3 py-2 text-xs sm:text-sm"
                            >
                                <FileSignature className="h-3 w-3 sm:h-4 sm:w-4" />
                                Contracts
                            </TabsTrigger>
                            <TabsTrigger 
                                value="analytics" 
                                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white whitespace-nowrap px-3 py-2 text-xs sm:text-sm"
                            >
                                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                                Analytics
                            </TabsTrigger>
                            <TabsTrigger 
                                value="scouting" 
                                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white whitespace-nowrap px-3 py-2 text-xs sm:text-sm"
                            >
                                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                                Scouting
                            </TabsTrigger>
                            <TabsTrigger 
                                value="video" 
                                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white whitespace-nowrap px-3 py-2 text-xs sm:text-sm"
                            >
                                <Video className="h-3 w-3 sm:h-4 sm:w-4" />
                                Video
                            </TabsTrigger>
                            <TabsTrigger 
                                value="gamelogs" 
                                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white whitespace-nowrap px-3 py-2 text-xs sm:text-sm"
                            >
                                <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Game Logs</span>
                                <span className="sm:hidden">Games</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="medical" 
                                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white whitespace-nowrap px-3 py-2 text-xs sm:text-sm"
                            >
                                <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4" />
                                Medical
                            </TabsTrigger>
                            <TabsTrigger 
                                value="notes" 
                                className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white whitespace-nowrap px-3 py-2 text-xs sm:text-sm"
                            >
                                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                                Notes
                            </TabsTrigger>
                        </div>
                    </TabsList>

                    {/* Performance Tab - Mobile Optimized */}
                    <TabsContent value="performance" className="space-y-4 sm:space-y-6">
                        {/* Performance Stats - Full width on mobile */}
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Performance Statistics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                                        <div className="text-xl sm:text-2xl font-bold text-blue-600">{player.points}</div>
                                        <div className="text-xs sm:text-sm text-slate-600">Points</div>
                                    </div>
                                    <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                                        <div className="text-xl sm:text-2xl font-bold text-blue-600">{player.goals}</div>
                                        <div className="text-xs sm:text-sm text-slate-600">Goals</div>
                                    </div>
                                    <div className="text-center p-3 sm:p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="text-xl sm:text-2xl font-bold text-slate-600">{player.assists}</div>
                                        <div className="text-xs sm:text-sm text-slate-600">Assists</div>
                                    </div>
                                    <div className="text-center p-3 sm:p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="text-xl sm:text-2xl font-bold text-slate-600">{player.gamesPlayed}</div>
                                        <div className="text-xs sm:text-sm text-slate-600">Games Played</div>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                                        <span>Plus/Minus:</span>
                                        <span className={cn(
                                            "font-medium",
                                            player.plusMinus > 0 ? "text-green-600" : player.plusMinus < 0 ? "text-red-600" : "text-slate-600"
                                        )}>
                                            {player.plusMinus > 0 ? '+' : ''}{player.plusMinus}
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                                        <span>PIM:</span>
                                        <span className="font-medium">{player.penaltyMinutes}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Draft Info */}
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Draft Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                {player.draftYear ? (
                                    <div className="space-y-2 text-xs sm:text-sm">
                                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                                            <span>Draft Year:</span>
                                            <span className="font-medium">{player.draftYear}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                                            <span>Round:</span>
                                            <span className="font-medium">{player.draftRound}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                                            <span>Overall Pick:</span>
                                            <span className="font-medium">#{player.draftOverall}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                                            <span>Drafted By:</span>
                                            <span className="font-medium">{player.draftTeam}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <Badge variant="outline" className="border-slate-200 text-slate-700 bg-slate-50">
                                        Undrafted
                                    </Badge>
                                )}
                            </CardContent>
                        </Card>

                        {/* Additional Info - Mobile Optimized */}
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Player Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-2 text-sm">Personal Information</h4>
                                        <div className="space-y-2 text-xs sm:text-sm">
                                            <div className="flex justify-between p-2 bg-slate-50 rounded">
                                                <span>Birthplace:</span>
                                                <span className="font-medium text-right">{player.birthplace}</span>
                                            </div>
                                            <div className="flex justify-between p-2 bg-slate-50 rounded">
                                                <span>Birth Year:</span>
                                                <span className="font-medium">{player.birthYear}</span>
                                            </div>
                                            <div className="flex justify-between p-2 bg-slate-50 rounded">
                                                <span>Height:</span>
                                                <span className="font-medium">{player.heightCm} cm</span>
                                            </div>
                                            <div className="flex justify-between p-2 bg-slate-50 rounded">
                                                <span>Weight:</span>
                                                <span className="font-medium">{player.weightLbs} lbs</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-2 text-sm">Career Information</h4>
                                        <div className="space-y-2 text-xs sm:text-sm">
                                            <div className="flex justify-between p-2 bg-slate-50 rounded">
                                                <span>Player Style:</span>
                                                <span className="font-medium">{player.playerStyle}</span>
                                            </div>
                                            <div className="flex justify-between p-2 bg-slate-50 rounded">
                                                <span>Years in League:</span>
                                                <span className="font-medium">{player.yearsInLeague}</span>
                                            </div>
                                            <div className="flex justify-between p-2 bg-slate-50 rounded">
                                                <span>Draft Eligible:</span>
                                                <Badge variant={player.draftEligible ? "default" : "secondary"} className="bg-blue-100 text-blue-700 text-xs">
                                                    {player.draftEligible ? "Yes" : "No"}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between p-2 bg-slate-50 rounded">
                                                <span>Status:</span>
                                                <Badge variant="outline" className="border-blue-200 text-blue-700 text-xs">
                                                    {player.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-2 text-sm">Previous Leagues</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {player.previousLeagues.map((league: string, index: number) => (
                                                <Badge key={index} variant="outline" className="text-xs border-slate-200 text-slate-600">
                                                    {league}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Contracts Tab */}
                    <TabsContent value="contracts" className="space-y-4 sm:space-y-6">
                        {/* Current Contract */}
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <FileSignature className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Current Contract
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                                        <span className="text-sm font-medium">Contract Status</span>
                                        <Badge
                                            variant="outline"
                                            className={cn("text-sm", getContractColor(player.contract))}
                                        >
                                            {player.contract}
                                        </Badge>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                                        <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-slate-600">Annual Salary:</span>
                                            <span className="font-semibold text-slate-900">{player.salary}</span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-slate-600">Contract Expires:</span>
                                            <span className="font-semibold text-slate-900">{player.contractExpiry}</span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-slate-600">Cap Hit:</span>
                                            <span className="font-semibold text-slate-900">{player.salary}</span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-slate-600">NTC/NMC:</span>
                                            <span className="font-semibold text-slate-900">None</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contract History */}
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Contract History
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="space-y-3">
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium text-sm">Current Contract</p>
                                                <p className="text-xs text-slate-600">2023-2025</p>
                                            </div>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                Active
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-slate-600">Total Value:</span>
                                                <span className="font-medium ml-1">$10.5M</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-600">AAV:</span>
                                                <span className="font-medium ml-1">{player.salary}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 opacity-75">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium text-sm">Entry Level Contract</p>
                                                <p className="text-xs text-slate-600">2020-2023</p>
                                            </div>
                                            <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                                                Expired
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-slate-600">Total Value:</span>
                                                <span className="font-medium ml-1">$2.775M</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-600">AAV:</span>
                                                <span className="font-medium ml-1">$925K</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Salary Breakdown */}
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Salary Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Base Salary</span>
                                            <span className="font-medium">$3,000,000</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Signing Bonus</span>
                                            <span className="font-medium">$500,000</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-3 border-t border-slate-200">
                                        <div className="flex justify-between text-sm font-semibold">
                                            <span>Total Annual</span>
                                            <span>{player.salary}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Other tabs with mobile-optimized placeholder content */}
                    <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Advanced Analytics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="text-center py-8 sm:py-12">
                                    <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-4" />
                                    <p className="text-sm sm:text-base text-slate-600">Advanced analytics coming soon</p>
                                    <p className="text-xs sm:text-sm text-slate-500">Corsi/Fenwick, xG, shot maps, and more</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="scouting" className="space-y-4 sm:space-y-6">
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Scouting Reports
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="text-center py-8 sm:py-12">
                                    <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-4" />
                                    <p className="text-sm sm:text-base text-slate-600">Scouting reports coming soon</p>
                                    <p className="text-xs sm:text-sm text-slate-500">Internal reports, rating matrix, and evaluations</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="video" className="space-y-4 sm:space-y-6">
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Video className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Video Hub
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="text-center py-8 sm:py-12">
                                    <Video className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-4" />
                                    <p className="text-sm sm:text-base text-slate-600">Video hub coming soon</p>
                                    <p className="text-xs sm:text-sm text-slate-500">Game clips, tagged highlights, and analysis</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="gamelogs" className="space-y-4 sm:space-y-6">
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Game Logs
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="text-center py-8 sm:py-12">
                                    <Activity className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-4" />
                                    <p className="text-sm sm:text-base text-slate-600">Game logs coming soon</p>
                                    <p className="text-xs sm:text-sm text-slate-500">Per-game stats with detailed breakdowns</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="medical" className="space-y-4 sm:space-y-6">
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Medical & Injury History
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="text-center py-8 sm:py-12">
                                    <Stethoscope className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-4" />
                                    <p className="text-sm sm:text-base text-slate-600">Medical history coming soon</p>
                                    <p className="text-xs sm:text-sm text-slate-500">Injury timeline, rehab notes, and availability</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notes" className="space-y-4 sm:space-y-6">
                        <Card className="gradient-card shadow-soft border-slate-200/60">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Internal Notes & Comments
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="text-center py-8 sm:py-12">
                                    <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-4" />
                                    <p className="text-sm sm:text-base text-slate-600">Notes system coming soon</p>
                                    <p className="text-xs sm:text-sm text-slate-500">Staff notes, scout comments, and evaluations</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </PageLayout>
    )
}
