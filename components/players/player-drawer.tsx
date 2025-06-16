"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PlayerStats } from "@/components/players/player-stats"
import { PlayerNotes } from "@/components/players/player-notes"
import { PlayerAnalytics } from "@/components/players/player-analytics"
import { PlayerContract } from "@/components/players/player-contract"
import { PlayerReports } from "@/components/players/player-reports"
import { X, Edit } from "lucide-react"

interface PlayerDrawerProps {
  player: any
  open: boolean
  onClose: () => void
}

export function PlayerDrawer({ player, open, onClose }: PlayerDrawerProps) {
  if (!player) return null

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-4xl overflow-y-auto p-0 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b p-4 pb-3 bg-background">
          <SheetHeader className="space-y-0">
            <SheetTitle className="text-2xl font-bold">Player Profile</SheetTitle>
          </SheetHeader>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>

        <div>
          <div className="bg-blue-600 p-6 text-white">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <Avatar className="h-28 w-28 border-4 border-white/80">
                <AvatarImage
                  src={player.avatar || "/placeholder.svg?height=112&width=112&query=hockey player"}
                  alt={player.name}
                />
                <AvatarFallback className="text-3xl bg-white/20 text-white font-bold">
                  {player.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold">{player.name}</h2>
                  <p className="text-lg text-white/90 font-medium">
                    #{player.number} • {player.position}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-transparent px-3 py-1 text-sm">
                    {player.status}
                  </Badge>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-transparent px-3 py-1 text-sm">
                    Age: {player.age}
                  </Badge>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-transparent px-3 py-1 text-sm">
                    Rating: {player.rating}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="gap-2 bg-white/20 border-transparent text-white hover:bg-white/30">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="w-full bg-slate-100 dark:bg-slate-800 rounded-md p-1 mb-6">
                <TabsTrigger
                  value="stats"
                  className="rounded-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  Stats
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="rounded-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="contract"
                  className="rounded-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  Contract
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="rounded-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  Reports
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="rounded-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  Notes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stats" className="space-y-4">
                <PlayerStats player={player} />
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <PlayerAnalytics player={player} />
              </TabsContent>
              <TabsContent value="contract" className="space-y-4">
                <PlayerContract player={player} />
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <PlayerReports player={player} />
              </TabsContent>
              <TabsContent value="notes" className="space-y-4">
                <PlayerNotes player={player} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
