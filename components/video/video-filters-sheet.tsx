"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface VideoFiltersSheetProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedLeague: string
  setSelectedLeague: (value: string) => void
  selectedGameType: string
  setSelectedGameType: (value: string) => void
  activeFiltersCount: number
  onClearFilters: () => void
}

export function VideoFiltersSheet({
  searchQuery,
  setSearchQuery,
  selectedLeague,
  setSelectedLeague,
  selectedGameType,
  setSelectedGameType,
  activeFiltersCount,
  onClearFilters
}: VideoFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filter Videos</SheetTitle>
          <SheetDescription>
            Refine your video search with filters
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="mobile-search" className="text-sm font-medium">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="mobile-search"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* League Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">League</Label>
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger>
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
          <div className="space-y-2">
            <Label className="text-sm font-medium">Type</Label>
            <Select value={selectedGameType} onValueChange={setSelectedGameType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Regular Season">Regular Season</SelectItem>
                <SelectItem value="Playoffs">Playoffs</SelectItem>
                <SelectItem value="Analysis">Analysis</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Date Range</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="season">This Season</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={onClearFilters}
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
