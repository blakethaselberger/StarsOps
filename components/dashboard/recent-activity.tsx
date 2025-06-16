import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    action: "added a new scouting report for",
    target: "Alex Johnson",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Lee",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SL",
    },
    action: "updated analytics for",
    target: "Team Defense",
    time: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    action: "scheduled a meeting about",
    target: "Draft Strategy",
    time: "Yesterday",
  },
  {
    id: 4,
    user: {
      name: "Lisa Wong",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LW",
    },
    action: "commented on",
    target: "Stu Miller's performance",
    time: "Yesterday",
  },
  {
    id: 5,
    user: {
      name: "David Park",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DP",
    },
    action: "uploaded new video analysis for",
    target: "Power Play Strategy",
    time: "2 days ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-5">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
