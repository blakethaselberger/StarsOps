import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableIcon } from "lucide-react"

interface PlayerStatsProps {
  player: any
}

export function PlayerStats({ player }: PlayerStatsProps) {
  // Mock stats based on position
  const stats =
    player.position === "Goalie"
      ? [
          { season: "2023-2024", team: "STL", gp: 45, w: 28, l: 14, otl: 3, sv: 0.921, gaa: 2.34 },
          { season: "2022-2023", team: "STL", gp: 52, w: 32, l: 16, otl: 4, sv: 0.915, gaa: 2.48 },
          { season: "2021-2022", team: "STL", gp: 49, w: 30, l: 15, otl: 4, sv: 0.912, gaa: 2.51 },
        ]
      : [
          { season: "2023-2024", team: "STL", gp: 72, g: 24, a: 38, pts: 62, pim: 42, plusMinus: 15 },
          { season: "2022-2023", team: "STL", gp: 78, g: 28, a: 45, pts: 73, pim: 36, plusMinus: 22 },
          { season: "2021-2022", team: "STL", gp: 76, g: 22, a: 41, pts: 63, pim: 44, plusMinus: 18 },
        ]

  return (
    <div className="space-y-6">
      <Card className="border border-slate-200">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TableIcon className="h-5 w-5 text-blue-600" />
            <CardTitle>Career Statistics</CardTitle>
          </div>
          <CardDescription>Regular season statistics by year</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-100">
                  <TableHead className="w-[100px] font-semibold">Season</TableHead>
                  <TableHead className="w-[80px] font-semibold">Team</TableHead>
                  <TableHead className="w-[60px] font-semibold">GP</TableHead>
                  {player.position === "Goalie" ? (
                    <>
                      <TableHead className="w-[60px] font-semibold">W</TableHead>
                      <TableHead className="w-[60px] font-semibold">L</TableHead>
                      <TableHead className="w-[60px] font-semibold">OTL</TableHead>
                      <TableHead className="w-[60px] font-semibold">SV%</TableHead>
                      <TableHead className="w-[60px] font-semibold">GAA</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead className="w-[60px] font-semibold">G</TableHead>
                      <TableHead className="w-[60px] font-semibold">A</TableHead>
                      <TableHead className="w-[60px] font-semibold">PTS</TableHead>
                      <TableHead className="w-[60px] font-semibold">PIM</TableHead>
                      <TableHead className="w-[60px] font-semibold">+/-</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.map((stat, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <TableCell className="font-medium">{stat.season}</TableCell>
                    <TableCell className="font-medium text-blue-600">{stat.team}</TableCell>
                    <TableCell>{stat.gp}</TableCell>
                    {player.position === "Goalie" ? (
                      <>
                        <TableCell>{stat.w}</TableCell>
                        <TableCell>{stat.l}</TableCell>
                        <TableCell>{stat.otl}</TableCell>
                        <TableCell className="font-medium">{stat.sv}</TableCell>
                        <TableCell className="font-medium">{stat.gaa}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{stat.g}</TableCell>
                        <TableCell>{stat.a}</TableCell>
                        <TableCell className="font-medium">{stat.pts}</TableCell>
                        <TableCell>{stat.pim}</TableCell>
                        <TableCell
                          className={
                            stat.plusMinus > 0
                              ? "text-emerald-600 font-medium"
                              : stat.plusMinus < 0
                                ? "text-red-600 font-medium"
                                : ""
                          }
                        >
                          {stat.plusMinus > 0 ? `+${stat.plusMinus}` : stat.plusMinus}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="space-y-1">
              <dt className="text-xs font-medium text-muted-foreground">Birthdate</dt>
              <dd className="font-semibold">May 12, 1996</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-muted-foreground">Birthplace</dt>
              <dd className="font-semibold">Toronto, ON, Canada</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-muted-foreground">Height</dt>
              <dd className="font-semibold">6'2" / 188 cm</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-muted-foreground">Weight</dt>
              <dd className="font-semibold">195 lbs / 88 kg</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
