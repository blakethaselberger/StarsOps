"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, List, Grid, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdvancedPlayerFilters } from "@/components/players/player-filters"
import { PlayerTableEnhanced } from "@/components/players/player-table-enhanced"
import { players, getLeagueIcon, type Player } from "@/data/players-data"
import { PageWrapper } from "@/components/page-wrapper"

export default function PlayersPage() {
    const [viewMode, setViewMode] = useState<"table" | "cards">("table")
    const [searchTerm, setSearchTerm] = useState("")
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

    // Advanced filter states
    const [filters, setFilters] = useState({
        // Player Attributes
        position: "all",
        status: "all",
        shoots: "all",
        nationality: "all",
        league: "all",
        team: "",
        // Age & Physical
        ageMin: "",
        ageMax: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        // Draft & Contract
        draftYear: "",
        draftRound: "all",
        contractStatus: "all",
        contractExpiryMin: "",
        contractExpiryMax: "",
        salaryMin: "",
        salaryMax: "",
        // Performance
        gamesPlayedMin: "",
        gamesPlayedMax: "",
        goalsMin: "",
        goalsMax: "",
        assistsMin: "",
        assistsMax: "",
        pointsMin: "",
        pointsMax: "",
        // Advanced
        rating: "all",
        playerStyle: "all",
        yearsInLeagueMin: "",
        yearsInLeagueMax: "",
        draftEligible: "all",
    })

    // Group players by league
    const playersByLeague = (players || []).reduce((acc, player) => {
        if (!acc[player.league]) {
            acc[player.league] = []
        }
        acc[player.league].push(player)
        return acc
    }, {} as Record<string, Player[]>)

    const resetFilters = () => {
        setFilters({
            position: "all",
            status: "all",
            shoots: "all",
            nationality: "all",
            league: "all",
            team: "",
            ageMin: "",
            ageMax: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            draftYear: "",
            draftRound: "all",
            contractStatus: "all",
            contractExpiryMin: "",
            contractExpiryMax: "",
            salaryMin: "",
            salaryMax: "",
            gamesPlayedMin: "",
            gamesPlayedMax: "",
            goalsMin: "",
            goalsMax: "",
            assistsMin: "",
            assistsMax: "",
            pointsMin: "",
            pointsMax: "",
            rating: "all",
            playerStyle: "all",
            yearsInLeagueMin: "",
            yearsInLeagueMax: "",
            draftEligible: "all",
        })
        setSearchTerm("")
    }

    const filterPlayers = (leaguePlayers: Player[]) => {
        return leaguePlayers.filter(player => {
            // Basic search
            const matchesSearch = searchTerm === "" ||
                player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.birthplace.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.nationality.toLowerCase().includes(searchTerm.toLowerCase())

            // Player Attributes
            const matchesPosition = filters.position === "all" || player.position === filters.position
            const matchesStatus = filters.status === "all" || player.status === filters.status
            const matchesShoots = filters.shoots === "all" || player.shoots === filters.shoots
            const matchesNationality = filters.nationality === "all" || player.nationality === filters.nationality
            const matchesLeague = filters.league === "all" || player.league === filters.league
            const matchesTeam = !filters.team || player.team.toLowerCase().includes(filters.team.toLowerCase())

            // Age & Physical
            const matchesAge = (!filters.ageMin || player.age >= parseInt(filters.ageMin)) &&
                (!filters.ageMax || player.age <= parseInt(filters.ageMax))
            const matchesHeight = (!filters.heightMin || player.heightCm >= parseInt(filters.heightMin)) &&
                (!filters.heightMax || player.heightCm <= parseInt(filters.heightMax))
            const matchesWeight = (!filters.weightMin || player.weightLbs >= parseInt(filters.weightMin)) &&
                (!filters.weightMax || player.weightLbs <= parseInt(filters.weightMax))

            // Draft & Contract
            const matchesDraftYear = !filters.draftYear ||
                (player.draftYear && player.draftYear.toString() === filters.draftYear)
            const matchesDraftRound = filters.draftRound === "all" ||
                (filters.draftRound === "undrafted" && !player.draftRound) ||
                (player.draftRound && player.draftRound.toString() === filters.draftRound)
            const matchesContractStatus = filters.contractStatus === "all" || player.contract === filters.contractStatus
            const matchesContractExpiry = (!filters.contractExpiryMin || player.contractExpiry >= parseInt(filters.contractExpiryMin)) &&
                (!filters.contractExpiryMax || player.contractExpiry <= parseInt(filters.contractExpiryMax))
            const matchesSalary = (!filters.salaryMin || player.salaryValue >= parseFloat(filters.salaryMin)) &&
                (!filters.salaryMax || player.salaryValue <= parseFloat(filters.salaryMax))

            // Performance
            const matchesGamesPlayed = (!filters.gamesPlayedMin || player.gamesPlayed >= parseInt(filters.gamesPlayedMin)) &&
                (!filters.gamesPlayedMax || player.gamesPlayed <= parseInt(filters.gamesPlayedMax))
            const matchesGoals = (!filters.goalsMin || player.goals >= parseInt(filters.goalsMin)) &&
                (!filters.goalsMax || player.goals <= parseInt(filters.goalsMax))
            const matchesAssists = (!filters.assistsMin || player.assists >= parseInt(filters.assistsMin)) &&
                (!filters.assistsMax || player.assists <= parseInt(filters.assistsMax))
            const matchesPoints = (!filters.pointsMin || player.points >= parseInt(filters.pointsMin)) &&
                (!filters.pointsMax || player.points <= parseInt(filters.pointsMax))

            // Advanced
            const matchesRating = filters.rating === "all" || player.rating === filters.rating
            const matchesPlayerStyle = filters.playerStyle === "all" || player.playerStyle === filters.playerStyle
            const matchesYearsInLeague = (!filters.yearsInLeagueMin || player.yearsInLeague >= parseInt(filters.yearsInLeagueMin)) &&
                (!filters.yearsInLeagueMax || player.yearsInLeague <= parseInt(filters.yearsInLeagueMax))
            const matchesDraftEligible = filters.draftEligible === "all" ||
                (filters.draftEligible === "true" && player.draftEligible) ||
                (filters.draftEligible === "false" && !player.draftEligible)

            return matchesSearch &&
                matchesPosition && matchesStatus && matchesShoots && matchesNationality && matchesLeague && matchesTeam &&
                matchesAge && matchesHeight && matchesWeight &&
                matchesDraftYear && matchesDraftRound && matchesContractStatus && matchesContractExpiry && matchesSalary &&
                matchesGamesPlayed && matchesGoals && matchesAssists && matchesPoints &&
                matchesRating && matchesPlayerStyle && matchesYearsInLeague && matchesDraftEligible
        })
    }

    return (
        <PageWrapper
            title="Player Database"
            description="Comprehensive player information, stats, and analytics"
            headerAction={
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Player
                </Button>
            }
        >
            {/* View controls and search */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex border border-slate-200 rounded-lg p-1">
                        <Button
                            variant={viewMode === "table" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("table")}
                            className={cn(
                                "h-8 px-3",
                                viewMode === "table" && "bg-blue-600 text-white"
                            )}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "cards" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("cards")}
                            className={cn(
                                "h-8 px-3",
                                viewMode === "cards" && "bg-blue-600 text-white"
                            )}
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search players by name, team, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-slate-200/60 bg-white/80 backdrop-blur-sm focus:border-blue-300 focus:ring-blue-200 transition-all duration-200"
                    />
                </div>

                <AdvancedPlayerFilters
                    filters={filters}
                    setFilters={setFilters}
                    isAdvancedOpen={isAdvancedOpen}
                    setIsAdvancedOpen={setIsAdvancedOpen}
                    resetFilters={resetFilters}
                />
            </div>

            <Tabs defaultValue="NHL" className="space-y-4">
                <div className="bg-white rounded-lg p-1 shadow-sm border overflow-hidden">
                    <TabsList className="w-full h-auto gap-1 bg-transparent grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                        {Object.keys(playersByLeague).map((league) => (
                            <TabsTrigger
                                key={league}
                                value={league}
                                className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium text-xs md:text-sm"
                            >
                                <span className="flex items-center gap-2">
                                    <span>{getLeagueIcon(league)}</span>
                                    <span className="font-medium">{league}</span>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                        {filterPlayers(playersByLeague[league]).length}
                                    </Badge>
                                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {Object.entries(playersByLeague).map(([league, leaguePlayers]) => (
                    <TabsContent key={league} value={league}>
                        <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
                            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{getLeagueIcon(league)}</span>
                                    <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                                    <CardTitle className="text-slate-900 text-base md:text-lg">{league} Players</CardTitle>
                                </div>
                                <p className="text-slate-600 text-xs md:text-sm">
                                    Showing {filterPlayers(leaguePlayers).length} of {leaguePlayers.length} players
                                </p>
                            </CardHeader>
                            <CardContent>
                                <PlayerTableEnhanced players={filterPlayers(leaguePlayers)} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </PageWrapper>
    )
}
