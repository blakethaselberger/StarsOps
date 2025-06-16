"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlayerDrawer } from "@/components/players/player-drawer"
import { players } from "@/data/players"

interface PlayerCardsProps {
  position?: string
  searchQuery?: string
}

export function PlayerCards({ position, searchQuery = "" }: PlayerCardsProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)

  const filteredPlayers = players
    .filter((player) => !position || player.position === position)
    .filter(
      (player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.number.toString().includes(searchQuery) ||
        player.position.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const getPositionGradient = (position: string) => {
    switch (position) {
      case "Forward":
        return "from-emerald-500 to-emerald-600"
      case "Defense":
        return "from-amber-500 to-amber-600"
      case "Goalie":
        return "from-blue-500 to-blue-600"
      default:
        return "from-blue-500 to-blue-600"
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-visible">
        {filteredPlayers.map((player) => (
          <Card
            key={player.id}
            className="cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-glow hover:scale-105 border-slate-200/60 group"
            onClick={() => setSelectedPlayer(player)}
          >
            <CardContent className="p-0">
              <div className={`h-32 bg-gradient-to-r ${getPositionGradient(player.position)} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge
                    variant="outline"
                    className="bg-white/90 text-slate-700 border-white/50 backdrop-blur-sm font-semibold"
                  >
                    #{player.number}
                  </Badge>
                </div>
              </div>
              <div className="relative px-4 pb-4">
                <Avatar className="absolute -top-8 h-16 w-16 border-4 border-white shadow-lg ring-2 ring-blue-100">
                  <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                  <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="pt-10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{player.name}</h3>
                      <p className="text-sm text-slate-600 font-medium">{player.position}</p>
                    </div>
                    <Badge
                      variant={player.status === "Active" ? "default" : "outline"}
                      className={
                        player.status === "Active"
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                          : "border-slate-200/60 text-slate-600"
                      }
                    >
                      {player.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-lg p-3 border border-slate-200/60">
                      <p className="text-slate-600 font-medium">Age</p>
                      <p className="font-bold text-slate-900 text-lg">{player.age}</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-lg p-3 border border-slate-200/60">
                      <p className="text-slate-600 font-medium">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500 fill-current" />
                        <p className="font-bold text-slate-900 text-lg">{player.rating}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50/30 p-3">
              <div className="flex w-full items-center justify-between">
                <p className="text-xs text-slate-600 font-medium">Last updated: 3 days ago</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-gradient-to-r hover:from-slate-100 hover:to-blue-100/50 transition-all duration-200"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="shadow-soft border-slate-200/60">
                    <DropdownMenuLabel className="text-slate-900 font-semibold">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                      Edit Player
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                      Add Note
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Remove Player
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <PlayerDrawer player={selectedPlayer} open={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />
    </>
  )
}
