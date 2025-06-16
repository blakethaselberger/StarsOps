import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"

interface DraftNotesProps {
  searchQuery?: string
}

const notes = [
  {
    id: 1,
    title: "Draft Strategy Meeting",
    content:
      "Identified key prospects to target in the upcoming draft. Focus on defensemen with strong skating abilities and offensive upside.",
    author: "GM Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "GS",
    date: "March 8, 2024",
    tags: ["Strategy", "Planning"],
  },
  {
    id: 2,
    title: "Prospect Evaluation - Michael Johnson",
    content:
      "Michael Johnson (D) shows excellent skating and puck-moving abilities. Right-handed shot with good size (6'2\", 190 lbs). Projected late first round.",
    author: "Head Scout",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "HS",
    date: "March 5, 2024",
    tags: ["Prospect", "Defense"],
  },
  {
    id: 3,
    title: "Prospect Evaluation - Alex Williams",
    content:
      "Alex Williams (F) is a skilled center with high hockey IQ. Good faceoff skills and playmaking ability. Size is a concern (5'10\", 175 lbs). Projected early second round.",
    author: "European Scout",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ES",
    date: "March 3, 2024",
    tags: ["Prospect", "Forward"],
  },
  {
    id: 4,
    title: "Draft Pick Analysis",
    content:
      "Current draft position: 18th overall. Analyzing potential trade-up scenarios if a top-10 prospect falls. Also considering trading down for additional picks if our targets are gone.",
    author: "GM Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "GS",
    date: "February 28, 2024",
    tags: ["Analysis", "Strategy"],
  },
  {
    id: 5,
    title: "Prospect Evaluation - Thomas Wilson",
    content:
      "Thomas Wilson (G) is a technically sound goaltender with good size (6'3\", 200 lbs). Strong positioning and rebound control. Projected mid-second round.",
    author: "Goalie Scout",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "GS",
    date: "February 25, 2024",
    tags: ["Prospect", "Goalie"],
  },
]

export function DraftNotes({ searchQuery = "" }: DraftNotesProps) {
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.author.toLowerCase().includes(searchQuery.toLowerCase()),
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
