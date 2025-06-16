"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface PlayerAnalyticsProps {
  player: any
}

export function PlayerAnalytics({ player }: PlayerAnalyticsProps) {
  // Mock analytics data
  const radarData =
    player.position === "Goalie"
      ? [
          { attribute: "Save %", value: 85 },
          { attribute: "High Danger", value: 78 },
          { attribute: "Rebound Control", value: 92 },
          { attribute: "Puck Handling", value: 65 },
          { attribute: "Positioning", value: 88 },
          { attribute: "Recovery", value: 82 },
        ]
      : player.position === "Defense"
        ? [
            { attribute: "Offense", value: 65 },
            { attribute: "Defense", value: 90 },
            { attribute: "Physicality", value: 85 },
            { attribute: "Skating", value: 75 },
            { attribute: "Hockey IQ", value: 82 },
            { attribute: "Shot", value: 70 },
          ]
        : [
            { attribute: "Offense", value: 88 },
            { attribute: "Defense", value: 65 },
            { attribute: "Physicality", value: 72 },
            { attribute: "Skating", value: 85 },
            { attribute: "Hockey IQ", value: 80 },
            { attribute: "Shot", value: 92 },
          ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Player Skill Breakdown</CardTitle>
          <CardDescription>Performance metrics across key attributes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="attribute" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name={player.name} dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Advanced Metrics</CardTitle>
            <CardDescription>Detailed performance analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {player.position === "Goalie" ? (
                <>
                  <div>
                    <dt className="text-muted-foreground">Goals Saved Above Expected</dt>
                    <dd className="text-2xl font-bold">12.4</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">High Danger Save %</dt>
                    <dd className="text-2xl font-bold">.856</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Low Danger Save %</dt>
                    <dd className="text-2xl font-bold">.975</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Rebound Control Rating</dt>
                    <dd className="text-2xl font-bold">8.7</dd>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <dt className="text-muted-foreground">Corsi For %</dt>
                    <dd className="text-2xl font-bold">56.2%</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Expected Goals</dt>
                    <dd className="text-2xl font-bold">18.5</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Zone Entries</dt>
                    <dd className="text-2xl font-bold">142</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Scoring Chances</dt>
                    <dd className="text-2xl font-bold">86</dd>
                  </div>
                </>
              )}
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Comparable Players</CardTitle>
            <CardDescription>Similar player profiles based on analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&query=player${i}`} />
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Comparable Player {i}</p>
                    <p className="text-xs text-muted-foreground">
                      {player.position} • {Math.floor(Math.random() * 10) + 25} years old
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {Math.floor(Math.random() * 20) + 80}% match
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
