import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MeetingNotesDialog } from "./meeting-notes-dialog"
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"

interface MeetingNotesProps {
  searchQuery?: string
  category?: string
}

const notes = [
  {
    id: 1,
    title: "Pre-Game Strategy Meeting - Chicago Blackhawks",
    content:
      "Discussed defensive strategies against Chicago's top line. Need to focus on limiting their zone entries and maintaining pressure in the neutral zone.",
    author: "Coach Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "CJ",
    date: "March 12, 2024",
    category: "meeting",
    tags: ["Strategy", "Pre-Game"],
  },
  {
    id: 2,
    title: "Player Development - Robert Thomas",
    content:
      "Robert has shown significant improvement in faceoff percentage. Working on his defensive positioning in the defensive zone.",
    author: "Skills Coach Davis",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SD",
    date: "March 10, 2024",
    category: "player",
    tags: ["Development", "Forward"],
  },
  {
    id: 3,
    title: "Draft Strategy Meeting",
    content:
      "Identified key prospects to target in the upcoming draft. Focus on defensemen with strong skating abilities and offensive upside.",
    author: "GM Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "GS",
    date: "March 8, 2024",
    category: "draft",
    tags: ["Draft", "Strategy"],
  },
  {
    id: 4,
    title: "Post-Game Analysis - Minnesota Wild",
    content:
      "Reviewed game footage against Minnesota. Power play needs improvement - too static and predictable. Penalty kill was effective.",
    author: "Video Coach Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "VW",
    date: "March 5, 2024",
    category: "meeting",
    tags: ["Analysis", "Post-Game"],
  },
  {
    id: 5,
    title: "Goaltending Review - Jordan Binnington",
    content:
      "Jordan has been showing excellent positioning and rebound control. Working on puck handling behind the net to improve transitions.",
    author: "Goalie Coach Martinez",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "GM",
    date: "March 3, 2024",
    category: "player",
    tags: ["Goaltending", "Development"],
  },
]

export function MeetingNotes({ searchQuery = "", category }: MeetingNotesProps) {
  const filteredNotes = notes
    .filter((note) => !category || note.category === category)
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.author.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div className="space-y-3 md:space-y-4">
      {filteredNotes.map((note) => (
        <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 p-4 md:p-6">
            <div className="flex-1 min-w-0">
              <MeetingNotesDialog note={note} mode="view">
                <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer text-sm md:text-base line-clamp-2">
                  {note.title}
                </h3>
              </MeetingNotesDialog>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mt-1">
                <span>{note.date}</span>
                <span>•</span>
                <span className="truncate">{note.author}</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <MeetingNotesDialog note={note} mode="view">
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                </MeetingNotesDialog>
                <MeetingNotesDialog note={note} mode="edit">
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Note
                  </DropdownMenuItem>
                </MeetingNotesDialog>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Note
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <MeetingNotesDialog note={note} mode="view">
              <p className="text-xs md:text-sm line-clamp-3 hover:text-foreground/90 transition-colors">
                {note.content}
              </p>
            </MeetingNotesDialog>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 md:p-6 pt-0">
            <div className="flex gap-1 md:gap-2 flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5 md:h-6 md:w-6">
                <AvatarImage src={note.avatar || "/placeholder.svg"} alt={note.author} />
                <AvatarFallback className="text-xs">{note.initials}</AvatarFallback>
              </Avatar>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
