"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "@/components/ui/search"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Download, MoreHorizontal, FileText, Filter } from "lucide-react"
import { ReportDetailDialog } from "./report-detail-dialog"

interface ReportsTableProps {
  type: string
}

// Mock reports data
const reportsData = [
  {
    id: 1,
    title: "Michael Johnson - Draft Prospect Evaluation",
    type: "scouting",
    subject: "Michael Johnson",
    subjectType: "Prospect",
    date: "2024-03-10",
    author: "John Smith",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "JS",
    rating: "A-",
    tags: ["Draft", "Defense", "NCAA"],
    content: {
      summary:
        "Michael Johnson is a standout defenseman from the University of Minnesota with excellent skating ability and hockey IQ. He demonstrates strong defensive awareness and has shown significant improvement in his offensive contributions this season.",
      strengths: [
        "Elite skating with exceptional mobility and edge work",
        "High hockey IQ with excellent positioning and anticipation",
        "Strong first pass and transition game",
        "Physical presence with good size (6'2\", 195 lbs)",
      ],
      weaknesses: [
        "Shot could use more power and accuracy",
        "Occasionally overcommits on offensive rushes",
        "Decision-making can be rushed under heavy forechecking pressure",
      ],
      recommendation:
        "Highly recommended for draft consideration in the late first round. Has top-4 defenseman potential with proper development.",
      notes:
        "Follow-up evaluation scheduled before NCAA tournament. Development path should include focus on shot mechanics and defensive zone coverage against elite talent.",
    },
  },
  {
    id: 2,
    title: "Alex Williams - OHL Forward Analysis",
    type: "scouting",
    subject: "Alex Williams",
    subjectType: "Prospect",
    date: "2024-03-08",
    author: "Sarah Johnson",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "SJ",
    rating: "B+",
    tags: ["Junior", "Forward", "OHL"],
  },
  {
    id: 3,
    title: "Thomas Wilson - Goalie Prospect Evaluation",
    type: "scouting",
    subject: "Thomas Wilson",
    subjectType: "Prospect",
    date: "2024-03-05",
    author: "Mike Wilson",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "MW",
    rating: "A",
    tags: ["European", "Goalie", "SHL"],
  },
  {
    id: 4,
    title: "Ryan O'Reilly - Contract Extension Analysis",
    type: "internal",
    subject: "Ryan O'Reilly",
    subjectType: "Player",
    date: "2024-03-12",
    author: "Lisa Wong",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "LW",
    rating: null,
    tags: ["Contract", "Forward", "Veteran"],
  },
  {
    id: 5,
    title: "Jordan Binnington - Performance Analysis",
    type: "internal",
    subject: "Jordan Binnington",
    subjectType: "Player",
    date: "2024-03-09",
    author: "David Miller",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "DM",
    rating: null,
    tags: ["Performance", "Goalie"],
  },
  {
    id: 6,
    title: "John Tavares - Free Agent Assessment",
    type: "free-agent",
    subject: "John Tavares",
    subjectType: "Free Agent",
    date: "2024-03-15",
    author: "Mike Johnson",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "MJ",
    rating: "A",
    tags: ["UFA", "Forward", "Elite"],
  },
  {
    id: 7,
    title: "Seth Jones - Trade Target Analysis",
    type: "trade",
    subject: "Seth Jones",
    subjectType: "Trade Target",
    date: "2024-03-14",
    author: "Sarah Chen",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "SC",
    rating: "A-",
    tags: ["Defense", "Top-4", "Contract"],
  },
  {
    id: 8,
    title: "Power Play Efficiency Report - Q1 2024",
    type: "analytical",
    subject: "Team",
    subjectType: "Special Teams",
    date: "2024-03-11",
    author: "Alex Thompson",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "AT",
    rating: null,
    tags: ["Special Teams", "Analytics", "Quarterly"],
  },
  {
    id: 9,
    title: "Defensive Prospect Pipeline Assessment",
    type: "organizational",
    subject: "Organization",
    subjectType: "Depth Chart",
    date: "2024-03-07",
    author: "Robert Lee",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "RL",
    rating: null,
    tags: ["Depth", "Defense", "Development"],
  },
  {
    id: 10,
    title: "Chicago Blackhawks Pre-Game Analysis",
    type: "game",
    subject: "Chicago Blackhawks",
    subjectType: "Opponent",
    date: "2024-03-13",
    author: "James Wilson",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    authorInitials: "JW",
    rating: null,
    tags: ["Pre-Game", "Division Rival", "Special Teams"],
  },
]

export function ReportsTable({ type }: ReportsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState<(typeof reportsData)[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredReports = reportsData
    .filter((report) => type === "all" || report.type === type)
    .filter(
      (report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )

  const handleReportClick = (report: (typeof reportsData)[0]) => {
    setSelectedReport(report)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      <div className="rounded-md border border-slate-200/60 bg-white/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 hover:bg-gradient-to-r hover:from-slate-100 hover:to-blue-100/50">
              <TableHead className="font-semibold text-slate-700">Report</TableHead>
              <TableHead className="font-semibold text-slate-700">Type</TableHead>
              <TableHead className="font-semibold text-slate-700">Date</TableHead>
              <TableHead className="font-semibold text-slate-700">Author</TableHead>
              <TableHead className="font-semibold text-slate-700">Rating</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <TableRow
                  key={report.id}
                  className={`transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 border-b border-slate-100/60 ${
                    index % 2 === 0 ? "bg-white/30" : "bg-slate-50/30"
                  } cursor-pointer`}
                  onClick={() => handleReportClick(report)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{report.title}</div>
                        <div className="text-xs text-slate-500">
                          {report.subject} • {report.subjectType}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-200/60 bg-blue-100 text-blue-700 border-blue-200">
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-700 font-medium">{report.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={report.authorAvatar || "/placeholder.svg"} alt={report.author} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold">
                          {report.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{report.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {report.rating ? (
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 font-semibold"
                      >
                        {report.rating}
                      </Badge>
                    ) : (
                      <span className="text-slate-500 text-sm">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReportClick(report)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-slate-100 hover:to-blue-100/50 transition-all duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="shadow-soft border-slate-200/60">
                          <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                            Edit Report
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                            Share Report
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                            Print Report
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            Delete Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileText className="h-8 w-8 text-slate-400" />
                    <div className="text-lg font-medium text-slate-900">No reports found</div>
                    <div className="text-sm text-slate-500">
                      {searchQuery ? "Try adjusting your search query" : "No reports available for this category"}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ReportDetailDialog report={selectedReport} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
