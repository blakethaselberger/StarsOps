"use client"

import { Card, CardContent } from "@/components/ui/card"
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TeamOverview } from "@/components/dashboard/team-overview"
import { Button } from "@/components/ui/button"
import {
  PlusCircle,
  Calendar,
  DollarSign,
  ClipboardList,
  MessageSquare,
  TrendingUp,
  Users,
  Trophy,
  Target,
} from "lucide-react"
import { SystemNotes } from "@/components/dashboard/system-notes"
import { useToast } from "@/lib/use-toast"
import { PageHeader } from "@/components/ui/page-header"
import { PageLayout, PageSection } from "@/components/ui/page-layout"

export default function Dashboard() {
  const { toast } = useToast()

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature is currently under development and will be available soon.`,
    })
  }

  return (
    <PageLayout>
      <PageHeader
        title="Good morning, John"
        description="Here's what's happening with the Blues today"
      />

      {/* Quick action cards */}
      <PageSection>
        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Button
          variant="outline"
          className="h-auto flex-col items-start gap-2 p-4 md:p-6 justify-start text-left border-slate-200/60 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 hover:scale-105 hover:shadow-soft group min-h-[120px] md:min-h-[140px]"
          onClick={() => showComingSoon("Scouting Reports")}
        >
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200">
            <PlusCircle className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div className="font-semibold text-slate-900 text-sm md:text-base">Add Scouting Report</div>
          <div className="text-xs md:text-sm text-slate-600">Create a new player evaluation</div>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col items-start gap-2 p-4 md:p-6 justify-start text-left border-slate-200/60 hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 hover:scale-105 hover:shadow-soft group min-h-[120px] md:min-h-[140px]"
          onClick={() => showComingSoon("Free Agents")}
        >
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all duration-200">
            <ClipboardList className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div className="font-semibold text-slate-900 text-sm md:text-base">View Free Agents</div>
          <div className="text-xs md:text-sm text-slate-600">Upcoming free agents list</div>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col items-start gap-2 p-4 md:p-6 justify-start text-left border-slate-200/60 hover:border-amber-300 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-200 hover:scale-105 hover:shadow-soft group min-h-[120px] md:min-h-[140px]"
          onClick={() => showComingSoon("Cap Analysis")}
        >
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white group-hover:from-amber-600 group-hover:to-amber-700 transition-all duration-200">
            <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div className="font-semibold text-slate-900 text-sm md:text-base">Cap Summary</div>
          <div className="text-xs md:text-sm text-slate-600">Current salary cap situation</div>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col items-start gap-2 p-4 md:p-6 justify-start text-left border-slate-200/60 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-200 hover:scale-105 hover:shadow-soft group min-h-[120px] md:min-h-[140px]"
          onClick={() => showComingSoon("Meeting Scheduler")}
        >
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200">
            <Calendar className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div className="font-semibold text-slate-900 text-sm md:text-base">Schedule Meeting</div>
          <div className="text-xs md:text-sm text-slate-600">Set up internal team meeting</div>
        </Button>
        </div>
      </PageSection>

      <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-none md:flex md:justify-start">
          <TabsTrigger value="overview" className="text-xs md:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs md:text-sm">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-xs md:text-sm">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <EnhancedCard variant="elevated" className="group">
              <EnhancedCardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm font-medium text-slate-600">Total Players</p>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">42</div>
                    <p className="text-xs text-emerald-600 font-medium">+2 from last month</p>
                  </div>
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-[var(--shadow-soft)]">
                    <Users className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>
              </EnhancedCardContent>
            </EnhancedCard>

            <EnhancedCard variant="elevated" className="group">
              <EnhancedCardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm font-medium text-slate-600">Scouting Reports</p>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">128</div>
                    <p className="text-xs text-emerald-600 font-medium">+14 from last month</p>
                  </div>
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all duration-300 shadow-[var(--shadow-soft)]">
                    <Target className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>
              </EnhancedCardContent>
            </EnhancedCard>

            <Card className="metric-card shadow-soft hover:shadow-glow transition-all duration-200 hover:scale-105 group">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm font-medium text-slate-600">Upcoming Games</p>
                    <div className="text-2xl md:text-3xl font-bold text-slate-900">6</div>
                    <p className="text-xs text-slate-600">Next: Chicago Blackhawks</p>
                  </div>
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white group-hover:from-amber-600 group-hover:to-amber-700 transition-all duration-200">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card shadow-soft hover:shadow-glow transition-all duration-200 hover:scale-105 group">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm font-medium text-slate-600">Team Rating</p>
                    <div className="text-2xl md:text-3xl font-bold text-slate-900">A-</div>
                    <p className="text-xs text-emerald-600 font-medium">+2 points from last month</p>
                  </div>
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-200">
                    <Trophy className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-7">
            <Card className="lg:col-span-4 gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
              <CardContent className="p-4 md:p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">Team Overview</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600">Performance metrics for the current season</p>
                </div>
                <div className="h-[250px] md:h-[350px]">
                  <TeamOverview />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
              <CardContent className="p-4 md:p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">Recent Activity</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600">Latest updates and changes</p>
                </div>
                <div>
                  <RecentActivity />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System-wide notes feed */}
          <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-slate-900">System Notes</h3>
                  </div>
                  <p className="text-sm text-slate-600">Team-wide communication and updates</p>
                </div>
                <Button
                  size="sm"
                  className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-sm"
                  onClick={() => showComingSoon("Note Creation")}
                >
                  <MessageSquare className="h-4 w-4" />
                  New Note
                </Button>
              </div>
              <SystemNotes />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="gradient-card shadow-soft border-slate-200/60">
            <CardContent className="p-6">
              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Analytics Dashboard</h3>
                <p className="text-sm text-slate-600">Detailed team and player analytics</p>
              </div>
              <div className="h-96 flex items-center justify-center border-t border-slate-200/60 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-lg">
                <p className="text-slate-500">Analytics content will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="gradient-card shadow-soft border-slate-200/60">
            <CardContent className="p-6">
              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Reports</h3>
                <p className="text-sm text-slate-600">Generated reports and summaries</p>
              </div>
              <div className="h-96 flex items-center justify-center border-t border-slate-200/60 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-lg">
                <p className="text-slate-500">Reports content will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
