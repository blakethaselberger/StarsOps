"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

interface PlayerNotesProps {
  player: any
}

export function PlayerNotes({ player }: PlayerNotesProps) {
  const [newNote, setNewNote] = useState("")
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Showed excellent positioning during the game against Chicago. His anticipation of plays has improved significantly since last season.",
      author: "Coach Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "CJ",
      date: "March 10, 2024",
      tags: ["Game Performance", "Positioning"],
    },
    {
      id: 2,
      text: "Met with player to discuss contract extension possibilities. He's interested in a long-term deal with the team.",
      author: "GM Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "GS",
      date: "February 28, 2024",
      tags: ["Contract", "Meeting"],
    },
    {
      id: 3,
      text: "Training session focused on improving shot accuracy. Player showed great work ethic and made noticeable improvements by the end of the session.",
      author: "Skills Coach Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SD",
      date: "February 15, 2024",
      tags: ["Training", "Development"],
    },
  ])

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const newNoteObj = {
      id: notes.length + 1,
      text: newNote,
      author: "You",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "YO",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      tags: ["New Note"],
    }

    setNotes([newNoteObj, ...notes])
    setNewNote("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Add Note</CardTitle>
          <CardDescription>Add a new note about {player.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your notes here..."
            className="min-h-32"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Badge variant="outline">Game</Badge>
            <Badge variant="outline">Training</Badge>
            <Badge variant="outline">Meeting</Badge>
            <Badge variant="outline">+ Add Tag</Badge>
          </div>
          <Button onClick={handleAddNote}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </CardFooter>
      </Card>
      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={note.avatar || "/placeholder.svg"} alt={note.author} />
                    <AvatarFallback>{note.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-medium">{note.author}</CardTitle>
                    <CardDescription className="text-xs">{note.date}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  {note.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{note.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
