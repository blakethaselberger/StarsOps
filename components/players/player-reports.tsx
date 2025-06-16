"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, FileText, Eye, Download, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

interface PlayerReportsProps {
  player: any
}

export function PlayerReports({ player }: PlayerReportsProps) {
  const [reportType, setReportType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock reports data
  const reports = [
    {
      id: 1,
      title: "Pre-Season Evaluation",
      type: "scouting",
      author: "Mike Johnson",
      authorRole: "Head Scout",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "September 15, 2023",
      summary: "Shows excellent skating ability and puck handling. Vision on the ice is above average.",
      rating: 4.5,
      tags: ["Pre-Season", "Technical"],
    },
    {
      id: 2,
      title: "Mid-Season Performance Review",
      type: "performance",
      author: "Sarah Chen",
      authorRole: "Analytics Director",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "January 8, 2024",
      summary:
        "Consistent performance in high-pressure situations. Shooting percentage has improved by 3.2% compared to last season.",
      rating: 4.0,
      tags: ["Mid-Season", "Performance"],
    },
    {
      id: 3,
      title: "Injury Assessment",
      type: "medical",
      author: "Dr. Robert Lee",
      authorRole: "Team Physician",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "February 22, 2024",
      summary: "Lower body injury fully healed. Cleared for full contact practice and game play.",
      rating: null,
      tags: ["Medical", "Injury"],
    },
    {
      id: 4,
      title: "Contract Negotiation Notes",
      type: "management",
      author: "Lisa Wong",
      authorRole: "Assistant GM",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "March 5, 2024",
      summary: "Player is seeking term over AAV. Comparable contracts suggest market value of $5.5-6.0M per year.",
      rating: null,
      tags: ["Contract", "Negotiation"],
    },
    {
      id: 5,
      title: "Playoff Performance Analysis",
      type: "performance",
      author: "David Miller",
      authorRole: "Video Coach",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "May 12, 2024",
      summary:
        "Elevated play during playoffs. Particularly effective on the power play with 4 goals and 6 assists in 12 games.",
      rating: 4.8,
      tags: ["Playoffs", "Special Teams"],
    },
  ]

  const filteredReports = reports
    .filter((report) => reportType === "all" || report.type === reportType)
    .filter(
      (report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.author.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>,
      )
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          <path fill="white" d="M12 17.27V2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
        </svg>,
      )
    }

    // Empty stars
    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="h-5 w-5 text-slate-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>,
      )
    }

    return stars
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold">Associated Reports</h2>
          <p className="text-muted-foreground">
            {reports.length} reports available for {player.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-10 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex rounded-md border bg-slate-50">
            <Button
              variant={reportType === "all" ? "secondary" : "ghost"}
              className="rounded-r-none"
              onClick={() => setReportType("all")}
            >
              All
            </Button>
            <Button
              variant={reportType === "scouting" ? "secondary" : "ghost"}
              className="rounded-none"
              onClick={() => setReportType("scouting")}
            >
              Scouting
            </Button>
            <Button
              variant={reportType === "performance" ? "secondary" : "ghost"}
              className="rounded-none"
              onClick={() => setReportType("performance")}
            >
              Performance
            </Button>
            <Button
              variant={reportType === "medical" ? "secondary" : "ghost"}
              className="rounded-none"
              onClick={() => setReportType("medical")}
            >
              Medical
            </Button>
            <Button
              variant={reportType === "management" ? "secondary" : "ghost"}
              className="rounded-l-none"
              onClick={() => setReportType("management")}
            >
              Management
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <Card key={report.id} className="border border-slate-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">{report.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        <span>{report.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.rating && (
                        <div className="flex items-center gap-1">
                          <div className="flex">{renderStars(report.rating)}</div>
                          <span className="ml-1 font-medium">{report.rating}</span>
                        </div>
                      )}
                      <div className="flex gap-1">
                        {report.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="border-slate-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm">{report.summary}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={report.authorAvatar || "/placeholder.svg"} alt={report.author} />
                        <AvatarFallback>
                          {report.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{report.author}</p>
                        <p className="text-xs text-muted-foreground">{report.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center border border-slate-200">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-1 text-lg font-medium">No reports found</h3>
            <p className="text-sm text-muted-foreground">
              There are no {reportType !== "all" ? reportType : ""} reports available for this player.
            </p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setReportType("all")}>
              View all reports
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
