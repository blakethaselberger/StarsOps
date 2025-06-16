import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Player } from "@/data/players-data"
import { useRouter } from "next/navigation"

interface PlayerTableEnhancedProps {
    players: Player[]
}

export function PlayerTableEnhanced({ players }: PlayerTableEnhancedProps) {
    const router = useRouter()

    const handlePlayerClick = (playerId: number) => {
        router.push(`/players/${playerId}`)
    }

    return (
        <div className="rounded-lg border border-slate-200/60 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50/50">
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Age/Physical</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Draft Info</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Contract</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="w-12"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {players.map((player) => (
                        <TableRow
                            key={player.id}
                            className="hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group"
                            onClick={() => handlePlayerClick(player.id)}
                        >
                            <TableCell className="font-medium">{player.number}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-blue-200 transition-all">
                                        <AvatarImage src={`/players/${player.name.toLowerCase().replace(' ', '-')}.jpg`} />
                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-medium">
                                            {player.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-sm group-hover:text-blue-700 transition-colors flex items-center gap-2">
                                            {player.name}
                                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="text-xs text-slate-500 flex items-center gap-2">
                                            <span>{player.nationality}</span>
                                            <span>•</span>
                                            <span>{player.shoots} Shot</span>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="border-blue-200 text-blue-700 text-xs">
                                    {player.position}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                                <div>
                                    <div className="font-medium">{player.age} years</div>
                                    <div className="text-xs text-slate-500">{player.height}, {player.weight}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">
                                <div>
                                    <div className="font-medium">{player.team}</div>
                                    <div className="text-xs text-slate-500">{player.league}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">
                                <div>
                                    {player.draftYear ? (
                                        <>
                                            <div className="font-medium text-xs">{player.draftYear} Draft</div>
                                            <div className="text-xs text-slate-500">
                                                Round {player.draftRound}, #{player.draftOverall}
                                            </div>
                                        </>
                                    ) : (
                                        <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 bg-orange-50">
                                            Undrafted
                                        </Badge>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">
                                <div>
                                    <div className="font-medium">{player.points} pts</div>
                                    <div className="text-xs text-slate-500">
                                        {player.goals}G {player.assists}A ({player.gamesPlayed}GP)
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">
                                <div>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "text-xs mb-1",
                                            player.contract === "Signed" && "border-green-200 text-green-700 bg-green-50",
                                            player.contract === "RFA" && "border-blue-200 text-blue-700 bg-blue-50",
                                            player.contract === "UFA" && "border-orange-200 text-orange-700 bg-orange-50",
                                            player.contract === "Entry Level" && "border-purple-200 text-purple-700 bg-purple-50"
                                        )}
                                    >
                                        {player.contract}
                                    </Badge>
                                    <div className="text-xs text-slate-500">
                                        {player.salary} (Exp: {player.contractExpiry})
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "font-semibold text-xs",
                                        player.rating.startsWith('A') && "border-green-300 text-green-700 bg-green-50",
                                        player.rating.startsWith('B') && "border-blue-300 text-blue-700 bg-blue-50",
                                        player.rating.startsWith('C') && "border-orange-300 text-orange-700 bg-orange-50"
                                    )}
                                >
                                    {player.rating}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="shadow-soft border-slate-200/60">
                                        <DropdownMenuItem
                                            className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handlePlayerClick(player.id)
                                            }}
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            View Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                                            Edit Player
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                                            View Stats
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {players.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                    No players found matching your criteria
                </div>
            )}
        </div>
    )
}
