import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, ChevronRight, TrendingUp, Calendar, DollarSign, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Player } from "@/data/players-data"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface PlayerMobileCardsProps {
    players: Player[]
}

export function PlayerMobileCards({ players }: PlayerMobileCardsProps) {
    const router = useRouter()
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

    const handlePlayerClick = (playerId: number) => {
        router.push(`/players/${playerId}`)
    }

    const toggleExpanded = (playerId: number, e: React.MouseEvent) => {
        e.stopPropagation()
        setExpandedCards(prev => {
            const newSet = new Set(prev)
            if (newSet.has(playerId)) {
                newSet.delete(playerId)
            } else {
                newSet.add(playerId)
            }
            return newSet
        })
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
                return 'bg-green-100 text-green-700'
            case 'RFA':
                return 'bg-blue-100 text-blue-700'
            case 'UFA':
                return 'bg-orange-100 text-orange-700'
            case 'Entry Level':
                return 'bg-purple-100 text-purple-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const getRatingColor = (rating: string) => {
        if (rating.startsWith('A')) return 'text-green-600'
        if (rating.startsWith('B')) return 'text-blue-600'
        if (rating.startsWith('C')) return 'text-orange-600'
        return 'text-gray-600'
    }

    return (
        <div className="space-y-3">
            {players.map((player) => {
                const isExpanded = expandedCards.has(player.id)
                
                return (
                    <Card 
                        key={player.id} 
                        className="overflow-hidden border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <CardContent className="p-0">
                            {/* Main Content - Always Visible */}
                            <div 
                                className="p-4 cursor-pointer"
                                onClick={() => handlePlayerClick(player.id)}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Player Avatar */}
                                    <Avatar className="h-14 w-14 ring-2 ring-slate-100">
                                        <AvatarImage src={`/players/${player.name.toLowerCase().replace(' ', '-')}.jpg`} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold">
                                            {player.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Player Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-base text-slate-900 truncate flex items-center gap-2">
                                                    <span className="text-slate-500 text-sm">#{player.number}</span>
                                                    {player.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge 
                                                        variant="outline" 
                                                        className={cn("text-xs", getPositionColor(player.position))}
                                                    >
                                                        {player.position}
                                                    </Badge>
                                                    <span className="text-xs text-slate-500">{player.team}</span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-1">
                                                <span className={cn("font-bold text-lg", getRatingColor(player.rating))}>
                                                    {player.rating}
                                                </span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={(e) => {
                                                            e.stopPropagation()
                                                            handlePlayerClick(player.id)
                                                        }}>
                                                            View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>Edit Player</DropdownMenuItem>
                                                        <DropdownMenuItem>View Stats</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-3 gap-2 mt-3">
                                            <div className="text-center p-2 bg-slate-50 rounded-lg">
                                                <p className="text-xs text-slate-500">Age</p>
                                                <p className="font-semibold text-sm">{player.age}</p>
                                            </div>
                                            <div className="text-center p-2 bg-slate-50 rounded-lg">
                                                <p className="text-xs text-slate-500">Points</p>
                                                <p className="font-semibold text-sm">{player.points}</p>
                                            </div>
                                            <div className="text-center p-2 bg-slate-50 rounded-lg">
                                                <p className="text-xs text-slate-500">GP</p>
                                                <p className="font-semibold text-sm">{player.gamesPlayed}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expand/Collapse Button */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-3 h-8 text-xs text-slate-600"
                                    onClick={(e) => toggleExpanded(player.id, e)}
                                >
                                    <ChevronRight className={cn(
                                        "h-3 w-3 mr-1 transition-transform",
                                        isExpanded && "rotate-90"
                                    )} />
                                    {isExpanded ? 'Show Less' : 'Show More Details'}
                                </Button>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-3">
                                    {/* Physical Stats */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-slate-500">Physical:</span>
                                        <span className="font-medium">{player.height}, {player.weight}</span>
                                        <span className="text-slate-400">•</span>
                                        <span className="font-medium">{player.shoots} Shot</span>
                                    </div>

                                    {/* Performance Stats */}
                                    <div className="bg-white rounded-lg p-3 border border-slate-200/60">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Trophy className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm font-medium text-slate-700">Season Stats</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div>
                                                <p className="text-xs text-slate-500">Goals</p>
                                                <p className="font-semibold">{player.goals}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">Assists</p>
                                                <p className="font-semibold">{player.assists}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">+/-</p>
                                                <p className="font-semibold">{player.plusMinus}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contract Info */}
                                    <div className="bg-white rounded-lg p-3 border border-slate-200/60">
                                        <div className="flex items-center gap-2 mb-2">
                                            <DollarSign className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm font-medium text-slate-700">Contract</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Badge className={cn("text-xs", getContractColor(player.contract))}>
                                                    {player.contract}
                                                </Badge>
                                                <p className="text-xs text-slate-500 mt-1">{player.salary}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-slate-500">Expires</p>
                                                <p className="text-sm font-medium">{player.contractExpiry}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Draft Info */}
                                    {player.draftYear && (
                                        <div className="bg-white rounded-lg p-3 border border-slate-200/60">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Calendar className="h-4 w-4 text-slate-500" />
                                                <span className="text-sm font-medium text-slate-700">Draft</span>
                                            </div>
                                            <p className="text-sm">
                                                {player.draftYear} - Round {player.draftRound}, Pick {player.draftOverall}
                                            </p>
                                        </div>
                                    )}

                                    {/* Additional Info */}
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>{player.birthplace}</span>
                                        <span>{player.nationality}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )
            })}
            
            {players.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p className="text-sm">No players found matching your criteria</p>
                </div>
            )}
        </div>
    )
}
