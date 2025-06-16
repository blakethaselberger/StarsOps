"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  Filter, 
  Search, 
  X,
  Calendar,
  Trophy,
  Video,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoFiltersMobileProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedLeague: string
  setSelectedLeague: (league: string) => void
  selectedGameType: string
  setSelectedGameType: (type: string) => void
  onClose?: () => void
}

export function VideoFiltersMobile({
  searchQuery,
  setSearchQuery,
  selectedLeague,
  setSelectedLeague,
  selectedGameType,
  setSelectedGameType,
  onClose
}: VideoFiltersMobileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery)
  const [tempLeague, setTempLeague] = useState(selectedLeague)
  const [tempGameType, setTempGameType] = useState(selectedGameType)

  const activeFiltersCount = [
    selectedLeague !== "all",
    selectedGameType !== "all",
    searchQuery !== ""
  ].filter(Boolean).length

  const applyFilters = () => {
    setSearchQuery(tempSearchQuery)
    setSelectedLeague(tempLeague)
    setSelectedGameType(tempGameType)
    setIsOpen(false)
    onClose?.()
  }

  const resetFilters = () => {
    setTempSearchQuery("")
    setTempLeague("all")
    setTempGameType("all")
    setSearchQuery("")
    setSelectedLeague("all")
    setSelectedGameType("all")
  }

  const quickFilters = [
    { label: "Recent", icon: Calendar, action: () => {} },
    { label: "Game Highlights", icon: Trophy, action: () => setTempGameType("Regular Season") },
    { label: "Analysis", icon: Video, action: () => setTempGameType("Analysis") },
    { label: "Training", icon: Users, action: () => setTempGameType("Training") }
  ]

  return (
    <>
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Button and Quick Filters */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="h-9 px-3 border-gray-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-2 h-5 px-1.5 bg-blue-100 text-blue-700"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
              <SheetHeader className="pb-4">
                <SheetTitle className="flex items-center justify-between">
                  <span>Filter Videos</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs text-gray-500"
                  >
                    Reset all
                  </Button>
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-6">
                {/* Search in Sheet */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Title, tags, or teams..."
                      value={tempSearchQuery}
                      onChange={(e) => setTempSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* League Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">League</Label>
                  <Select value={tempLeague} onValueChange={setTempLeague}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Leagues" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Leagues</SelectItem>
                      <SelectItem value="NHL">NHL</SelectItem>
                      <SelectItem value="AHL">AHL</SelectItem>
                      <SelectItem value="ECHL">ECHL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Game Type Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Video Type</Label>
                  <Select value={tempGameType} onValueChange={setTempGameType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Regular Season">Regular Season</SelectItem>
                      <SelectItem value="Playoffs">Playoffs</SelectItem>
                      <SelectItem value="Analysis">Analysis</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Tactical">Tactical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Date Range</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="season">This Season</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick Filter Chips */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Quick Filters</Label>
                  <div className="flex flex-wrap gap-2">
                    {quickFilters.map((filter) => {
                      const Icon = filter.icon
                      return (
                        <Button
                          key={filter.label}
                          variant="outline"
                          size="sm"
                          onClick={filter.action}
                          className="h-8 text-xs"
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {filter.label}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                <Button 
                  onClick={applyFilters}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Active Filter Badges */}
          <div className="flex gap-2 overflow-x-auto">
            {selectedLeague !== "all" && (
              <Badge 
                variant="secondary" 
                className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 whitespace-nowrap"
              >
                {selectedLeague}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedLeague("all")}
                />
              </Badge>
            )}
            {selectedGameType !== "all" && (
              <Badge 
                variant="secondary" 
                className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 whitespace-nowrap"
              >
                {selectedGameType}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedGameType("all")}
                />
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {quickFilters.map((filter) => {
            const Icon = filter.icon
            return (
              <Button
                key={filter.label}
                variant="outline"
                size="sm"
                onClick={filter.action}
                className="flex-shrink-0 h-8 text-xs border-gray-200"
              >
                <Icon className="h-3 w-3 mr-1" />
                {filter.label}
              </Button>
            )
          })}
        </div>
      </div>
    </>
  )
}
