"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Search } from "@/components/ui/search"

const trackingData = [
  {
    id: 1,
    playerName: "Ryan O'Reilly",
    position: "Forward",
    gamesTracked: 25,
    avgSpeed: 28.4,
    topSpeed: 34.2,
    distanceCovered: 7.8,
    zoneEntries: 142,
    puckPossession: 12.5,
  },
  {
    id: 2,
    playerName: "Jordan Kyrou",
    position: "Forward",
    gamesTracked: 25,
    avgSpeed: 30.1,
    topSpeed: 36.8,
    distanceCovered: 8.2,
    zoneEntries: 168,
    puckPossession: 10.8,
  },
  {
    id: 3,
    playerName: "Robert Thomas",
    position: "Forward",
    gamesTracked: 23,
    avgSpeed: 29.2,
    topSpeed: 35.1,
    distanceCovered: 7.9,
    zoneEntries: 156,
    puckPossession: 14.2,
  },
  {
    id: 4,
    playerName: "Colton Parayko",
    position: "Defense",
    gamesTracked: 25,
    avgSpeed: 27.5,
    topSpeed: 33.6,
    distanceCovered: 7.2,
    zoneEntries: 78,
    puckPossession: 18.4,
  },
  {
    id: 5,
    playerName: "Justin Faulk",
    position: "Defense",
    gamesTracked: 24,
    avgSpeed: 26.8,
    topSpeed: 32.9,
    distanceCovered: 7.0,
    zoneEntries: 65,
    puckPossession: 17.6,
  },
]

const speedData = [
  {
    name: "O'Reilly",
    avgSpeed: 28.4,
    topSpeed: 34.2,
  },
  {
    name: "Kyrou",
    avgSpeed: 30.1,
    topSpeed: 36.8,
  },
  {
    name: "Thomas",
    avgSpeed: 29.2,
    topSpeed: 35.1,
  },
  {
    name: "Parayko",
    avgSpeed: 27.5,
    topSpeed: 33.6,
  },
  {
    name: "Faulk",
    avgSpeed: 26.8,
    topSpeed: 32.9,
  },
]

export function TrackingData() {
  const [searchQuery, setSearchQuery] = useState("")
  const [positionFilter, setPositionFilter] = useState("all")

  const filteredData = trackingData.filter(
    (player) =>
      (positionFilter === "all" || player.position === positionFilter) &&
      player.playerName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Skating Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.4 km/h</div>
            <p className="text-xs text-muted-foreground">Team average across all players</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.6 km</div>
            <p className="text-xs text-muted-foreground">Per game average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Zone Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">121.8</div>
            <p className="text-xs text-muted-foreground">Per game average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Puck Possession</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.7 min</div>
            <p className="text-xs text-muted-foreground">Per game average</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Speed Comparison</CardTitle>
          <CardDescription>Average and top speeds by player</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={speedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgSpeed" name="Avg Speed (km/h)" fill="#3b82f6" />
                <Bar dataKey="topSpeed" name="Top Speed (km/h)" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="Forward">Forwards</SelectItem>
              <SelectItem value="Defense">Defense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Games</TableHead>
                <TableHead>Avg Speed</TableHead>
                <TableHead>Top Speed</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Zone Entries</TableHead>
                <TableHead>Puck Possession</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.playerName}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.gamesTracked}</TableCell>
                  <TableCell>{player.avgSpeed} km/h</TableCell>
                  <TableCell>{player.topSpeed} km/h</TableCell>
                  <TableCell>{player.distanceCovered} km</TableCell>
                  <TableCell>{player.zoneEntries}</TableCell>
                  <TableCell>{player.puckPossession} min</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
