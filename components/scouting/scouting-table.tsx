"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "@/components/ui/search"

const scoutingReports = [
  {
    id: 1,
    playerName: "Michael Johnson",
    position: "Defense",
    team: "Michigan State",
    league: "NCAA",
    date: "2024-03-10",
    scout: "John Smith",
    rating: "A-",
  },
  {
    id: 2,
    playerName: "Alex Williams",
    position: "Center",
    team: "London Knights",
    league: "OHL",
    date: "2024-03-08",
    scout: "Sarah Johnson",
    rating: "B+",
  },
  {
    id: 3,
    playerName: "Thomas Wilson",
    position: "Goalie",
    team: "Frolunda HC",
    league: "SHL",
    date: "2024-03-05",
    scout: "Mike Wilson",
    rating: "A",
  },
  {
    id: 4,
    playerName: "David Chen",
    position: "Left Wing",
    team: "Boston College",
    league: "NCAA",
    date: "2024-03-03",
    scout: "Lisa Chen",
    rating: "B",
  },
  {
    id: 5,
    playerName: "Ryan Miller",
    position: "Defense",
    team: "USNTDP",
    league: "USHL",
    date: "2024-03-01",
    scout: "David Park",
    rating: "B+",
  },
]

export function ScoutingTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReports = scoutingReports.filter(
    (report) =>
      report.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.scout.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <Search placeholder="Search reports..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>League</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Scout</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.playerName}</TableCell>
                <TableCell>{report.position}</TableCell>
                <TableCell>{report.team}</TableCell>
                <TableCell>{report.league}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.scout}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.rating.startsWith("A")
                        ? "default"
                        : report.rating.startsWith("B")
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {report.rating}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
