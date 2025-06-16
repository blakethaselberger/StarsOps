"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Play,
  Clock,
  Eye,
  MessageCircle,
  Bookmark,
  Share,
  Download,
  MoreVertical,
  Star,
  Calendar,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoCardMobileProps {
  video: {
    id: string
    title: string
    thumbnail: string
    duration: string
    date: string
    league: string
    teams: string
    gameType: string
    tags: string[]
    views: number
    comments: number
    isBookmarked: boolean
    uploadedBy: string
  }
  view?: "grid" | "list"
}

export function VideoCardMobile({ video, view = "grid" }: VideoCardMobileProps) {
  const [isBookmarked, setIsBookmarked] = useState(video.isBookmarked)

  const getGameTypeColor = (type: string) => {
    switch (type) {
      case 'Analysis':
        return 'bg-blue-500'
      case 'Training':
        return 'bg-green-500'
      case 'Development':
        return 'bg-purple-500'
      case 'Tactical':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `Check out this video: ${video.title}`,
        url: `/video/${video.id}`
      })
    }
  }

  if (view === "list") {
    return (
      <Link href={`/video/${video.id}`}>
        <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-gray-200">
          <CardContent className="p-0">
            <div className="flex gap-3">
              {/* Thumbnail */}
              <div className="relative w-32 h-20 bg-gray-200 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Play className="h-4 w-4 text-white fill-current" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 py-2 pr-3">
                <h3 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                  <span>{video.teams}</span>
                  <span>•</span>
                  <span>{video.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={cn("text-xs h-5 px-1.5 text-white", getGameTypeColor(video.gameType))}>
                      {video.gameType}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-0.5">
                        <Eye className="h-3 w-3" />
                        {video.views}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <MessageCircle className="h-3 w-3" />
                        {video.comments}
                      </span>
                    </div>
                  </div>
                  {isBookmarked && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <div className="relative group">
      <Link href={`/video/${video.id}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 border-gray-200">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-gray-200">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            
            {/* Duration */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded z-20">
              {video.duration}
            </div>

            {/* Game Type Badge */}
            <div className="absolute top-2 left-2 z-20">
              <Badge className={cn("text-xs text-white", getGameTypeColor(video.gameType))}>
                {video.gameType}
              </Badge>
            </div>

            {/* Bookmark Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-20 h-8 w-8 bg-black/20 hover:bg-black/40"
              onClick={handleBookmark}
            >
              <Star className={cn(
                "h-4 w-4 transition-all",
                isBookmarked ? "text-yellow-400 fill-current" : "text-white"
              )} />
            </Button>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-all duration-200">
                <Play className="h-6 w-6 text-white fill-current" />
              </div>
            </div>

            {/* Placeholder Background */}
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
          </div>

          {/* Content */}
          <CardContent className="p-3">
            <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
              {video.title}
            </h3>

            {/* Meta Info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Calendar className="h-3 w-3" />
                <span>{video.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Users className="h-3 w-3" />
                <span>{video.teams}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {video.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs h-5 px-1.5">
                  {tag}
                </Badge>
              ))}
              {video.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs h-5 px-1.5">
                  +{video.tags.length - 2}
                </Badge>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.views}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {video.comments}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleBookmark}>
                    <Bookmark className="mr-2 h-4 w-4" />
                    {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Uploader */}
            <div className="text-xs text-gray-500 mt-2">
              by {video.uploadedBy}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
