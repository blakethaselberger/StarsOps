"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "@/components/ui/search"

const videos = [
  {
    id: 1,
    title: "Game Highlights: Blues vs. Blackhawks",
    date: "March 15, 2024",
    duration: "10:24",
    type: "Game",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 2,
    title: "Player Analysis: Jordan Binnington",
    date: "March 12, 2024",
    duration: "8:15",
    type: "Analysis",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 3,
    title: "Power Play Breakdown",
    date: "March 10, 2024",
    duration: "12:37",
    type: "Analysis",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 4,
    title: "Game Highlights: Blues vs. Wild",
    date: "March 8, 2024",
    duration: "9:42",
    type: "Game",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 5,
    title: "Prospect Spotlight: Michael Johnson",
    date: "March 5, 2024",
    duration: "7:18",
    type: "Scouting",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 6,
    title: "Defensive Zone Coverage",
    date: "March 3, 2024",
    duration: "15:22",
    type: "Analysis",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
]

export function VideoLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videoType, setVideoType] = useState("all")

  const filteredVideos = videos.filter(
    (video) =>
      (videoType === "all" || video.type === videoType) &&
      video.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Search placeholder="Search videos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Select value={videoType} onValueChange={setVideoType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Videos</SelectItem>
            <SelectItem value="Game">Games</SelectItem>
            <SelectItem value="Analysis">Analysis</SelectItem>
            <SelectItem value="Scouting">Scouting</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => (
          <div key={video.id} className="group overflow-hidden rounded-lg border bg-card">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <Badge className="absolute right-2 top-2">{video.type}</Badge>
            </div>
            <div className="p-3">
              <h3 className="font-medium">{video.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{video.date}</span>
                <span>{video.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
