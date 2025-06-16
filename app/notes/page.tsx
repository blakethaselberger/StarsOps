"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MeetingNotes } from "@/components/notes/meeting-notes"
import { MeetingNotesDialog } from "@/components/notes/meeting-notes-dialog"
import { PlayerNotes } from "@/components/notes/player-notes"
import { DraftNotes } from "@/components/notes/draft-notes"
import { Plus } from "lucide-react"
import { Search } from "@/components/ui/search"
import { PageHeader } from "@/components/ui/page-header"
import { PageLayout, PageSection } from "@/components/ui/page-layout"

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <PageLayout>
      <PageHeader
        title="Meeting Notes"
        description="Collaborative notes and discussions"
        action={
          <MeetingNotesDialog mode="add">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-10 md:h-11">
              <Plus className="mr-2 h-4 w-4" />
              <span className="text-sm md:text-base">New Note</span>
            </Button>
          </MeetingNotesDialog>
        }
      />
      
      <PageSection>
        <Search
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 md:h-11"
        />
        <Tabs defaultValue="all" className="w-full">
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <TabsList className="w-max md:w-auto flex gap-1">
            <TabsTrigger value="all" className="text-xs md:text-sm px-3 md:px-4 whitespace-nowrap">
              All Notes
            </TabsTrigger>
            <TabsTrigger value="players" className="text-xs md:text-sm px-3 md:px-4 whitespace-nowrap">
              Player Notes
            </TabsTrigger>
            <TabsTrigger value="meetings" className="text-xs md:text-sm px-3 md:px-4 whitespace-nowrap">
              Meeting Notes
            </TabsTrigger>
            <TabsTrigger value="draft" className="text-xs md:text-sm px-3 md:px-4 whitespace-nowrap">
              Draft Prep
            </TabsTrigger>
          </TabsList>
        </div>
          <TabsContent value="all" className="mt-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3 md:pb-4 p-4 md:p-6 bg-gradient-to-r from-slate-50 to-blue-50/30">
                <CardTitle className="text-base md:text-lg">All Notes</CardTitle>
                <CardDescription className="text-xs md:text-sm">All notes across categories</CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <MeetingNotes searchQuery={searchQuery} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="players" className="mt-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3 md:pb-4 p-4 md:p-6 bg-gradient-to-r from-slate-50 to-green-50/30">
                <CardTitle className="text-base md:text-lg">Player Notes</CardTitle>
                <CardDescription className="text-xs md:text-sm">Notes specific to players</CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <PlayerNotes searchQuery={searchQuery} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="meetings" className="mt-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3 md:pb-4 p-4 md:p-6 bg-gradient-to-r from-slate-50 to-purple-50/30">
                <CardTitle className="text-base md:text-lg">Meeting Notes</CardTitle>
                <CardDescription className="text-xs md:text-sm">Notes from team meetings</CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <MeetingNotes searchQuery={searchQuery} category="meeting" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="draft" className="mt-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3 md:pb-4 p-4 md:p-6 bg-gradient-to-r from-slate-50 to-orange-50/30">
                <CardTitle className="text-base md:text-lg">Draft Preparation</CardTitle>
                <CardDescription className="text-xs md:text-sm">Notes related to draft strategy</CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <DraftNotes searchQuery={searchQuery} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageSection>
    </PageLayout>
  )
}
