import { CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Game vs. Chicago Blackhawks",
    date: "March 15, 2024",
    type: "game",
    location: "Home",
  },
  {
    id: 2,
    title: "Pre-game Strategy Meeting",
    date: "March 15, 2024",
    type: "meeting",
    location: "Conference Room A",
  },
  {
    id: 3,
    title: "Game vs. Minnesota Wild",
    date: "March 18, 2024",
    type: "game",
    location: "Away",
  },
  {
    id: 4,
    title: "Scouting Review",
    date: "March 20, 2024",
    type: "meeting",
    location: "Video Room",
  },
  {
    id: 5,
    title: "Game vs. Nashville Predators",
    date: "March 22, 2024",
    type: "game",
    location: "Home",
  },
]

export function UpcomingEvents() {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground">
                {event.date} • {event.location}
              </p>
            </div>
          </div>
          <Badge variant={event.type === "game" ? "default" : "outline"}>
            {event.type === "game" ? "Game" : "Meeting"}
          </Badge>
        </div>
      ))}
    </div>
  )
}
