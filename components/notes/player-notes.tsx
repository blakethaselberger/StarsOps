import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"

interface PlayerNotesProps {
  searchQuery?: string
}

const notes = [
  {
    id: 1,
    title: "Player Development - Robert Thomas",
    content:
      "Robert has shown significant improvement in faceoff percentage. Working on his defensive positioning in the defensive zone.",
    author: "Skills Coach Davis",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SD",
    date: "March 10, 2024",
    player: "Robert Thomas",
    tags: ["Development", "Forward"],
  },
  {
    id: 2,
    title: "Goaltending Review - Jordan Binnington",
    content:
      "Jordan has been showing excellent positioning and rebound control. Working on puck handling behind the net to improve transitions.",
    author: "Goalie Coach Martinez",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "GM",
    date: "March 3, 2024",
    player: "Jordan Binnington",
    tags: ["Goaltending", "Development"],
  },
  {
    id: 3,
    title: "Injury Update - Torey Krug",
    content:
      "Torey is progressing well in his recovery. Started light skating sessions. Estimated return in 2-3 weeks pending medical clearance.",
    author: "Medical Staff",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MS",
    date: "March 1, 2024",
    player: "Torey Krug",
    tags: ["Injury", "Recovery"],
  },
  {
    id: 4,
    title: "Performance Review - Jordan Kyrou",
    content:
      "Jordan's speed continues to be his greatest asset. Need to work on consistency in the defensive zone and board battles.",
    author: "Coach Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "CJ",
    date: "February 28, 2024",
    player: "Jordan Kyrou",
    tags: ["Performance", "Forward"],
  },
  {
    id: 5,
    title: "Development Plan - Jake Neighbours",
    content:
      "Jake is showing great progress in his physical play. Working on his shot release and creating more scoring opportunities.",
    author: "Development Coach",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DC",
    date: "February 25, 2024",
    player: "Jake Neighbours",
    tags: ["Development", "Forward"],
  },
]

export function PlayerNotes({ searchQuery = "" }: PlayerNotesProps) {
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.player.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      {filteredNotes.map((note) => (
        <Card key={note.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <h3 className="font-semibold">{note.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{note.date}</span>
                <span>•</span>
                <span>{note.author}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{note.content}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant="default">{note.player}</Badge>
              {note.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={note.avatar || "/placeholder.svg"} alt={note.author} />
                <AvatarFallback>{note.initials}</AvatarFallback>
              </Avatar>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
