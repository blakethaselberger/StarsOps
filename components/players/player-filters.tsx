"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Filter, ChevronDown, ChevronUp, Calendar, MapPin, Target, TrendingUp, User, Ruler, Trophy, BarChart, Award, Bookmark, X } from "lucide-react"
import { useState } from "react"

export interface PlayerFilters {
    // Player Attributes
    position: string
    status: string
    shoots: string
    nationality: string
    league: string
    team: string
    // Age & Physical
    ageMin: string
    ageMax: string
    heightMin: string
    heightMax: string
    weightMin: string
    weightMax: string
    // Draft & Contract
    draftYear: string
    draftRound: string
    contractStatus: string
    contractExpiryMin: string
    contractExpiryMax: string
    salaryMin: string
    salaryMax: string
    // Performance
    gamesPlayedMin: string
    gamesPlayedMax: string
    goalsMin: string
    goalsMax: string
    assistsMin: string
    assistsMax: string
    pointsMin: string
    pointsMax: string
    // Advanced
    rating: string
    playerStyle: string
    yearsInLeagueMin: string
    yearsInLeagueMax: string
    draftEligible: string
}

interface PlayerFiltersProps {
    filters: PlayerFilters
    setFilters: (filters: PlayerFilters) => void
    isAdvancedOpen: boolean
    setIsAdvancedOpen: (open: boolean) => void
    resetFilters: () => void
}

export function AdvancedPlayerFilters({
    filters,
    setFilters,
    isAdvancedOpen,
    setIsAdvancedOpen,
    resetFilters
}: PlayerFiltersProps) {
    const [openSections, setOpenSections] = useState({
        player: true,
        physical: false,
        draft: false,
        performance: false,
        advanced: false
    })

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    // Count active filters
    const getActiveFilterCount = () => {
        return Object.entries(filters).filter(([key, value]) =>
            value !== "" && value !== "all"
        ).length
    }

    const activeFilterCount = getActiveFilterCount()

    const clearSpecificFilter = (filterKey: keyof PlayerFilters) => {
        setFilters({ ...filters, [filterKey]: filterKey.includes('Min') || filterKey.includes('Max') ? "" : "all" })
    }

    const getActiveFilters = () => {
        return Object.entries(filters)
            .filter(([key, value]) => value !== "" && value !== "all")
            .map(([key, value]) => ({ key, value }))
    }

    return (
        <div className="space-y-4">
            <Button
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                variant="outline"
                className="w-full justify-between hover:bg-blue-50 border-blue-200"
            >
                <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Advanced Filters
                    {activeFilterCount > 0 && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                            {activeFilterCount}
                        </Badge>
                    )}
                </span>
                {isAdvancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {isAdvancedOpen && (
                <div className="space-y-4">
                    {/* Active Filters Display */}
                    {activeFilterCount > 0 && (
                        <Card className="gradient-card shadow-soft border-blue-200/60">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-medium text-slate-700">Active Filters</h4>
                                    <Button
                                        onClick={resetFilters}
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    >
                                        Clear All
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {getActiveFilters().map(({ key, value }) => (
                                        <Badge
                                            key={key}
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-700 text-xs flex items-center gap-1"
                                        >
                                            {key}: {value}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-blue-900"
                                                onClick={() => clearSpecificFilter(key as keyof PlayerFilters)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Player Attributes Section */}
                    <Collapsible open={openSections.player} onOpenChange={() => toggleSection('player')}>
                        <Card className="gradient-card shadow-soft border-slate-200/60 overflow-hidden">
                            <CollapsibleTrigger asChild>
                                <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 border-b border-blue-200/60 cursor-pointer hover:from-blue-100 hover:to-indigo-100/50 transition-all duration-200 group">
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        <span className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                                <Target className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <span className="font-semibold text-slate-800">Player Attributes</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                                                Basic Info
                                            </Badge>
                                            {openSections.player ?
                                                <ChevronUp className="h-4 w-4 text-blue-600 group-hover:text-blue-700" /> :
                                                <ChevronDown className="h-4 w-4 text-blue-600 group-hover:text-blue-700" />
                                            }
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent className="space-y-4 p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Position</Label>
                                            <Select value={filters.position} onValueChange={(value) => setFilters({ ...filters, position: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Positions" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Positions</SelectItem>
                                                    <SelectItem value="Center">Center</SelectItem>
                                                    <SelectItem value="Left Wing">Left Wing</SelectItem>
                                                    <SelectItem value="Right Wing">Right Wing</SelectItem>
                                                    <SelectItem value="Defense">Defense</SelectItem>
                                                    <SelectItem value="Goalie">Goalie</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Status</Label>
                                            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Statuses" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Statuses</SelectItem>
                                                    <SelectItem value="Active">Active</SelectItem>
                                                    <SelectItem value="Injured">Injured</SelectItem>
                                                    <SelectItem value="Prospect">Prospect</SelectItem>
                                                    <SelectItem value="Retired">Retired</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Shoots</Label>
                                            <Select value={filters.shoots} onValueChange={(value) => setFilters({ ...filters, shoots: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All</SelectItem>
                                                    <SelectItem value="Left">Left</SelectItem>
                                                    <SelectItem value="Right">Right</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Nationality</Label>
                                            <Select value={filters.nationality} onValueChange={(value) => setFilters({ ...filters, nationality: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Countries" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Countries</SelectItem>
                                                    <SelectItem value="Canada">Canada</SelectItem>
                                                    <SelectItem value="USA">USA</SelectItem>
                                                    <SelectItem value="Sweden">Sweden</SelectItem>
                                                    <SelectItem value="Finland">Finland</SelectItem>
                                                    <SelectItem value="Russia">Russia</SelectItem>
                                                    <SelectItem value="Czech Republic">Czech Republic</SelectItem>
                                                    <SelectItem value="Germany">Germany</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">League</Label>
                                            <Select value={filters.league} onValueChange={(value) => setFilters({ ...filters, league: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Leagues" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Leagues</SelectItem>
                                                    <SelectItem value="NHL">NHL</SelectItem>
                                                    <SelectItem value="OHL">OHL</SelectItem>
                                                    <SelectItem value="WHL">WHL</SelectItem>
                                                    <SelectItem value="QMJHL">QMJHL</SelectItem>
                                                    <SelectItem value="NCAA">NCAA</SelectItem>
                                                    <SelectItem value="USHL">USHL</SelectItem>
                                                    <SelectItem value="SHL">SHL</SelectItem>
                                                    <SelectItem value="Liiga">Liiga</SelectItem>
                                                    <SelectItem value="KHL">KHL</SelectItem>
                                                    <SelectItem value="Czech Extraliga">Czech Extraliga</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                Team
                                            </Label>
                                            <Input
                                                placeholder="Search team..."
                                                value={filters.team}
                                                onChange={(e) => setFilters({ ...filters, team: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    {/* Physical Attributes Section */}
                    <Collapsible open={openSections.physical} onOpenChange={() => toggleSection('physical')}>
                        <Card className="gradient-card shadow-soft border-slate-200/60 overflow-hidden">
                            <CollapsibleTrigger asChild>
                                <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50/50 border-b border-purple-200/60 cursor-pointer hover:from-purple-100 hover:to-pink-100/50 transition-all duration-200 group">
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        <span className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                                <Ruler className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <span className="font-semibold text-slate-800">Physical Attributes</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                                                Size & Age
                                            </Badge>
                                            {openSections.physical ?
                                                <ChevronUp className="h-4 w-4 text-purple-600 group-hover:text-purple-700" /> :
                                                <ChevronDown className="h-4 w-4 text-purple-600 group-hover:text-purple-700" />
                                            }
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent className="space-y-4 p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Age Range
                                            </Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filters.ageMin}
                                                    onChange={(e) => setFilters({ ...filters, ageMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filters.ageMax}
                                                    onChange={(e) => setFilters({ ...filters, ageMax: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Height Range (cm)</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filters.heightMin}
                                                    onChange={(e) => setFilters({ ...filters, heightMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filters.heightMax}
                                                    onChange={(e) => setFilters({ ...filters, heightMax: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Weight Range (lbs)</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filters.weightMin}
                                                    onChange={(e) => setFilters({ ...filters, weightMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filters.weightMax}
                                                    onChange={(e) => setFilters({ ...filters, weightMax: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    {/* Draft & Contract Info Section */}
                    <Collapsible open={openSections.draft} onOpenChange={() => toggleSection('draft')}>
                        <Card className="gradient-card shadow-soft border-slate-200/60 overflow-hidden">
                            <CollapsibleTrigger asChild>
                                <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-teal-50/50 border-b border-emerald-200/60 cursor-pointer hover:from-emerald-100 hover:to-teal-100/50 transition-all duration-200 group">
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        <span className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                                                <Trophy className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <span className="font-semibold text-slate-800">Draft & Contract Info</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                                                Financial
                                            </Badge>
                                            {openSections.draft ?
                                                <ChevronUp className="h-4 w-4 text-emerald-600 group-hover:text-emerald-700" /> :
                                                <ChevronDown className="h-4 w-4 text-emerald-600 group-hover:text-emerald-700" />
                                            }
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent className="space-y-4 p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Draft Year</Label>
                                            <Input
                                                type="number"
                                                placeholder="e.g. 2020"
                                                value={filters.draftYear}
                                                onChange={(e) => setFilters({ ...filters, draftYear: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Draft Round</Label>
                                            <Select value={filters.draftRound} onValueChange={(value) => setFilters({ ...filters, draftRound: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Any Round" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Any Round</SelectItem>
                                                    <SelectItem value="1">1st Round</SelectItem>
                                                    <SelectItem value="2">2nd Round</SelectItem>
                                                    <SelectItem value="3">3rd Round</SelectItem>
                                                    <SelectItem value="4">4th Round</SelectItem>
                                                    <SelectItem value="5">5th Round</SelectItem>
                                                    <SelectItem value="6">6th Round</SelectItem>
                                                    <SelectItem value="7">7th Round</SelectItem>
                                                    <SelectItem value="undrafted">Undrafted</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Contract Status</Label>
                                            <Select value={filters.contractStatus} onValueChange={(value) => setFilters({ ...filters, contractStatus: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All</SelectItem>
                                                    <SelectItem value="Signed">Signed</SelectItem>
                                                    <SelectItem value="RFA">RFA</SelectItem>
                                                    <SelectItem value="UFA">UFA</SelectItem>
                                                    <SelectItem value="Entry Level">Entry Level</SelectItem>
                                                    <SelectItem value="Prospect">Prospect</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Contract Expiry Range</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="From"
                                                    value={filters.contractExpiryMin}
                                                    onChange={(e) => setFilters({ ...filters, contractExpiryMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="To"
                                                    value={filters.contractExpiryMax}
                                                    onChange={(e) => setFilters({ ...filters, contractExpiryMax: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Salary Range ($M)</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="Min"
                                                    value={filters.salaryMin}
                                                    onChange={(e) => setFilters({ ...filters, salaryMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="Max"
                                                    value={filters.salaryMax}
                                                    onChange={(e) => setFilters({ ...filters, salaryMax: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    {/* Performance Statistics Section */}
                    <Collapsible open={openSections.performance} onOpenChange={() => toggleSection('performance')}>
                        <Card className="gradient-card shadow-soft border-slate-200/60 overflow-hidden">
                            <CollapsibleTrigger asChild>
                                <CardHeader className="pb-4 bg-gradient-to-r from-orange-50 to-amber-50/50 border-b border-orange-200/60 cursor-pointer hover:from-orange-100 hover:to-amber-100/50 transition-all duration-200 group">
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        <span className="flex items-center gap-3">
                                            <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                                                <BarChart className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <span className="font-semibold text-slate-800">Performance Statistics</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                                                Stats
                                            </Badge>
                                            {openSections.performance ?
                                                <ChevronUp className="h-4 w-4 text-orange-600 group-hover:text-orange-700" /> :
                                                <ChevronDown className="h-4 w-4 text-orange-600 group-hover:text-orange-700" />
                                            }
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent className="space-y-4 p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Games Played Range</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filters.gamesPlayedMin}
                                                    onChange={(e) => setFilters({ ...filters, gamesPlayedMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filters.gamesPlayedMax}
                                                    onChange={(e) => setFilters({ ...filters, gamesPlayedMax: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Goals Range</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filters.goalsMin}
                                                    onChange={(e) => setFilters({ ...filters, goalsMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filters.goalsMax}
                                                    onChange={(e) => setFilters({ ...filters, goalsMax: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Assists Range</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filters.assistsMin}
                                                    onChange={(e) => setFilters({ ...filters, assistsMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filters.assistsMax}
                                                    onChange={(e) => setFilters({ ...filters, assistsMax: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Points Range</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filters.pointsMin}
                                                    onChange={(e) => setFilters({ ...filters, pointsMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filters.pointsMax}
                                                    onChange={(e) => setFilters({ ...filters, pointsMax: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    {/* Advanced Attributes Section */}
                    <Collapsible open={openSections.advanced} onOpenChange={() => toggleSection('advanced')}>
                        <Card className="gradient-card shadow-soft border-slate-200/60 overflow-hidden">
                            <CollapsibleTrigger asChild>
                                <CardHeader className="pb-4 bg-gradient-to-r from-indigo-50 to-blue-50/50 border-b border-indigo-200/60 cursor-pointer hover:from-indigo-100 hover:to-blue-100/50 transition-all duration-200 group">
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        <span className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                                                <Award className="h-5 w-5 text-indigo-600" />
                                            </div>
                                            <span className="font-semibold text-slate-800">Advanced Attributes</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs">
                                                Analytics
                                            </Badge>
                                            {openSections.advanced ?
                                                <ChevronUp className="h-4 w-4 text-indigo-600 group-hover:text-indigo-700" /> :
                                                <ChevronDown className="h-4 w-4 text-indigo-600 group-hover:text-indigo-700" />
                                            }
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent className="space-y-4 p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4" />
                                                Rating
                                            </Label>
                                            <Select value={filters.rating} onValueChange={(value) => setFilters({ ...filters, rating: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Ratings" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Ratings</SelectItem>
                                                    <SelectItem value="A+">A+ (Elite)</SelectItem>
                                                    <SelectItem value="A">A (Top Tier)</SelectItem>
                                                    <SelectItem value="A-">A- (High End)</SelectItem>
                                                    <SelectItem value="B+">B+ (Above Average)</SelectItem>
                                                    <SelectItem value="B">B (Average)</SelectItem>
                                                    <SelectItem value="B-">B- (Below Average)</SelectItem>
                                                    <SelectItem value="C+">C+ (Depth)</SelectItem>
                                                    <SelectItem value="C">C (Prospect)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Player Style</Label>
                                            <Select value={filters.playerStyle} onValueChange={(value) => setFilters({ ...filters, playerStyle: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Styles" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Styles</SelectItem>
                                                    <SelectItem value="Elite Scorer">Elite Scorer</SelectItem>
                                                    <SelectItem value="Power Forward">Power Forward</SelectItem>
                                                    <SelectItem value="Playmaker">Playmaker</SelectItem>
                                                    <SelectItem value="Two-Way Forward">Two-Way Forward</SelectItem>
                                                    <SelectItem value="Sniper">Sniper</SelectItem>
                                                    <SelectItem value="Defensive Forward">Defensive Forward</SelectItem>
                                                    <SelectItem value="Puck-Moving Defenseman">Puck-Moving Defenseman</SelectItem>
                                                    <SelectItem value="Stay-at-Home Defenseman">Stay-at-Home Defenseman</SelectItem>
                                                    <SelectItem value="Offensive Defenseman">Offensive Defenseman</SelectItem>
                                                    <SelectItem value="Butterfly Goalie">Butterfly Goalie</SelectItem>
                                                    <SelectItem value="Hybrid Goalie">Hybrid Goalie</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Years in League</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filters.yearsInLeagueMin}
                                                    onChange={(e) => setFilters({ ...filters, yearsInLeagueMin: e.target.value })}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filters.yearsInLeagueMax}
                                                    onChange={(e) => setFilters({ ...filters, yearsInLeagueMax: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Draft Eligible</Label>
                                            <Select value={filters.draftEligible} onValueChange={(value) => setFilters({ ...filters, draftEligible: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All</SelectItem>
                                                    <SelectItem value="true">Draft Eligible</SelectItem>
                                                    <SelectItem value="false">Not Draft Eligible</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                        <Button
                            onClick={resetFilters}
                            variant="outline"
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        >
                            Clear All Filters
                        </Button>
                        <Button
                            onClick={() => setIsAdvancedOpen(false)}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        >
                            Apply Filters
                        </Button>
                        <Button
                            variant="outline"
                            className="border-green-200 text-green-700 hover:bg-green-50"
                        >
                            <Bookmark className="h-4 w-4 mr-2" />
                            Save Filter Preset
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
