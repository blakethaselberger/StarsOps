"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface PlayerTableProps {
  position?: string
  searchQuery?: string
}

export function PlayerTable({ position, searchQuery = "" }: PlayerTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredPlayers = players
    .filter((player) => !position || player.position === position)
    .filter(
      (player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.number.toString().includes(searchQuery) ||
        player.position.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

  return (
    <>
      <div className="rounded-lg border border-slate-200/60 bg-white/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 hover:bg-gradient-to-r hover:from-slate-100 hover:to-blue-100/50">
              <TableHead className="w-[80px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("number")}
                  className="flex items-center gap-1 p-0 font-semibold text-slate-700 hover:text-slate-900 hover:bg-transparent"
                >
                  #
                  {sortColumn === "number" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-blue-600" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 p-0 font-semibold text-slate-700 hover:text-slate-900 hover:bg-transparent"
                >
                  Name
                  {sortColumn === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-blue-600" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="font-semibold text-slate-700">Position</TableHead>
              <TableHead className="font-semibold text-slate-700">Age</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">Rating</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player, index) => (
              <TableRow
                key={player.id}
                className={`cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 border-b border-slate-100/60 ${index % 2 === 0 ? "bg-white/30" : "bg-slate-50/30"
                  }`}
                onClick={() => setSelectedPlayer(player)}
              >
                <TableCell className="font-semibold text-slate-900">{player.number}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-2 ring-blue-100 ring-offset-1">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-semibold">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-slate-900">{player.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`border-slate-200/60 ${player.position === "Forward"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : player.position === "Defense"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                  >
                    {player.position}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-700 font-medium">{player.age}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 font-semibold"
                  >
                    {player.rating}
                  </Badge>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PlayerDrawer player={selectedPlayer} open={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />
    </>
  )
}
