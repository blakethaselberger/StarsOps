"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react"

const notes = [
  {
    id: 1,
    user: {
      name: "Mike Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MW",
      role: "Head Coach",
    },
    content:
      "Just finished reviewing game tape from last night. Defense needs to tighten up on zone entries. @Robert Thomas showed great improvement on faceoffs.",
    timestamp: "10:32 AM",
    tags: ["Game Analysis", "Defense"],
    mentions: ["Robert Thomas"],
    likes: 3,
    comments: 2,
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
      role: "Analytics",
    },
    content:
      "Updated the power play analysis dashboard with last night's data. We're now at 24.3% efficiency, up from 22.1% last month. @David Park check this out for your video session.",
    timestamp: "Yesterday",
    tags: ["Analytics", "Power Play"],
    mentions: ["David Park"],
    likes: 5,
    comments: 1,
  },
  {
    id: 3,
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      role: "GM",
    },
    content:
      "Team meeting scheduled for tomorrow at 10:00 AM to discuss trade deadline strategy. All scouts and coaches please attend. @Front Office",
    timestamp: "Yesterday",
    tags: ["Meeting", "Trade Deadline"],
    mentions: ["Front Office"],
    likes: 8,
    comments: 4,
  },
]

export function SystemNotes() {
  const [newNote, setNewNote] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Input
            placeholder="Share a note with the team..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-xs text-muted-foreground">
              <button className="hover:text-blue-600">@Mention</button>
              <button className="hover:text-blue-600">#Tag</button>
            </div>
            <Button size="sm" disabled={!newNote.trim()}>
              Post
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {notes.map((note) => (
          <div key={note.id} className="space-y-3 border-b border-gray-100 pb-6 dark:border-gray-800">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={note.user.avatar || "/placeholder.svg"} alt={note.user.name} />
                <AvatarFallback>{note.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{note.user.name}</span>
                  <span className="text-xs text-muted-foreground">• {note.user.role}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{note.timestamp}</span>
                </div>
                <p className="mt-1 text-sm">
                  {note.content.split(/(@[A-Za-z\s]+)/).map((part, i) => {
                    if (part.startsWith("@")) {
                      return (
                        <span key={i} className="font-medium text-blue-600">
                          {part}
                        </span>
                      )
                    }
                    return part
                  })}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 flex gap-4">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-600">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{note.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-600">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{note.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-600">
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
