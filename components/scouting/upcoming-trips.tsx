import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"

const trips = [
  {
    id: 1,
    location: "Ann Arbor, MI",
    venue: "Yost Ice Arena",
    date: "March 18-20, 2024",
    purpose: "NCAA Tournament",
    scout: "John Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JS",
    teams: ["Michigan", "Minnesota", "Boston University", "North Dakota"],
  },
  {
    id: 2,
    location: "Stockholm, Sweden",
    venue: "Hovet Arena",
    date: "March 25-28, 2024",
    purpose: "SHL Playoffs",
    scout: "Sarah Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SJ",
    teams: ["Frolunda HC", "Skelleftea AIK", "Lulea HF"],
  },
  {
    id: 3,
    location: "London, ON",
    venue: "Budweiser Gardens",
    date: "April 2-4, 2024",
    purpose: "OHL Playoffs",
    scout: "Mike Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MW",
    teams: ["London Knights", "Windsor Spitfires", "Kitchener Rangers"],
  },
]

export function UpcomingTrips() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <Card key={trip.id} className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{trip.location}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3" />
                  <span>{trip.venue}</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                {trip.purpose}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="mb-4 flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{trip.date}</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Teams to Scout:</h4>
              <div className="flex flex-wrap gap-2">
                {trip.teams.map((team) => (
                  <Badge key={team} variant="outline">
                    {team}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={trip.avatar || "/placeholder.svg"} alt={trip.scout} />
                  <AvatarFallback>{trip.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{trip.scout}</span>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
