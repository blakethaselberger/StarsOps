import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportsTable } from "@/components/reports/reports-table"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Users, Target, BarChart3, Layers, Video } from "lucide-react"
import { AddReportDialog } from "@/components/reports/add-report-dialog"
import { PageHeader } from "@/components/ui/page-header"
import { PageLayout } from "@/components/ui/page-layout"
import { ScrollableTabs } from "@/components/ui/scrollable-tabs"

export default function ReportsPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Reports"
        description="View and manage all team reports"
        action={
          <AddReportDialog>
            <Button className="sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 h-11 touch-target">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Report
            </Button>
          </AddReportDialog>
        }
      />

      <Tabs defaultValue="all" className="space-y-4 md:space-y-6">
        {/* Mobile Report Type Selector */}
        <div className="md:hidden">
          <ScrollableTabs showScrollButtons>
            <TabsList className="bg-white border shadow-sm p-1 flex gap-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-sm rounded-md px-3 py-2 font-medium text-xs whitespace-nowrap"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="scouting"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-sm rounded-md px-3 py-2 font-medium text-xs whitespace-nowrap"
              >
                Scouting
              </TabsTrigger>
              <TabsTrigger
                value="free-agent"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-sm rounded-md px-3 py-2 font-medium text-xs whitespace-nowrap"
              >
                Free Agent
              </TabsTrigger>
              <TabsTrigger
                value="trade"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-sm rounded-md px-3 py-2 font-medium text-xs whitespace-nowrap"
              >
                Trade
              </TabsTrigger>
              <TabsTrigger
                value="internal"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-sm rounded-md px-3 py-2 font-medium text-xs whitespace-nowrap"
              >
                Internal
              </TabsTrigger>
              <TabsTrigger
                value="analytical"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-sm rounded-md px-3 py-2 font-medium text-xs whitespace-nowrap"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="organizational"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-sm rounded-md px-3 py-2 font-medium text-xs whitespace-nowrap"
              >
                Organizational
              </TabsTrigger>
              <TabsTrigger
                value="game"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-sm rounded-md px-3 py-2 font-medium text-xs whitespace-nowrap"
              >
                Game
              </TabsTrigger>
            </TabsList>
          </ScrollableTabs>
        </div>

        {/* Desktop Report Type Selector */}
        <div className="hidden md:block bg-white rounded-lg p-1 shadow-sm border overflow-hidden">
          <TabsList className="w-full h-auto gap-1 bg-transparent grid grid-cols-4 lg:grid-cols-8">
            <TabsTrigger
              value="all"
              className="tab-trigger data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium text-xs md:text-sm lg:col-span-1"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="scouting"
              className="tab-trigger data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium text-xs md:text-sm lg:col-span-1"
            >
              Scouting
            </TabsTrigger>
            <TabsTrigger
              value="free-agent"
              className="tab-trigger data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium text-xs md:text-sm lg:col-span-1"
            >
              <span className="md:hidden">Free</span>
              <span className="hidden md:inline">Free Agent</span>
            </TabsTrigger>
            <TabsTrigger
              value="trade"
              className="tab-trigger data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium text-xs md:text-sm lg:col-span-1"
            >
              Trade
            </TabsTrigger>
            <TabsTrigger
              value="internal"
              className="tab-trigger data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium text-xs md:text-sm lg:col-span-1"
            >
              Internal
            </TabsTrigger>
            <TabsTrigger
              value="analytical"
              className="tab-trigger data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium text-xs md:text-sm lg:col-span-1"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="organizational"
              className="tab-trigger data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium text-xs md:text-sm lg:col-span-1"
            >
              <span className="md:hidden">Org</span>
              <span className="hidden md:inline">Organizational</span>
            </TabsTrigger>
            <TabsTrigger
              value="game"
              className="tab-trigger data-[state=active]:bg-blue-50 data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-md py-2 font-medium text-xs md:text-sm lg:col-span-1"
            >
              Game
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-4 md:mt-6">
          <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <CardTitle className="text-slate-900 text-base md:text-lg">All Reports</CardTitle>
              </div>
              <CardDescription className="text-slate-600 text-xs md:text-sm">View all reports across categories</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ReportsTable type="all" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scouting" className="mt-4 md:mt-6">
          <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <CardTitle className="text-slate-900 text-base md:text-lg">Scouting Reports</CardTitle>
              </div>
              <CardDescription className="text-slate-600 text-xs md:text-sm">
                Evaluations of prospects and potential draft picks
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ReportsTable type="scouting" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="free-agent" className="mt-4 md:mt-6">
          <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <CardTitle className="text-slate-900 text-base md:text-lg">Free Agent Reports</CardTitle>
              </div>
              <CardDescription className="text-slate-600 text-xs md:text-sm">
                Assessments of upcoming and available free agents
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ReportsTable type="free-agent" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trade" className="mt-4 md:mt-6">
          <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <CardTitle className="text-slate-900 text-base md:text-lg">Trade Target Reports</CardTitle>
              </div>
              <CardDescription className="text-slate-600 text-xs md:text-sm">Evaluations of potential trade acquisitions</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ReportsTable type="trade" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="internal" className="mt-4 md:mt-6">
          <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <CardTitle className="text-slate-900 text-base md:text-lg">Internal Player Reports</CardTitle>
              </div>
              <CardDescription className="text-slate-600 text-xs md:text-sm">
                Detailed assessments of current roster players
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ReportsTable type="internal" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytical" className="mt-4 md:mt-6">
          <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <CardTitle className="text-slate-900 text-base md:text-lg">Analytical Reports</CardTitle>
              </div>
              <CardDescription className="text-slate-600 text-xs md:text-sm">
                Data-driven analysis and statistical evaluations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ReportsTable type="analytical" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizational" className="mt-4 md:mt-6">
          <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <CardTitle className="text-slate-900 text-base md:text-lg">Organizational Reports</CardTitle>
              </div>
              <CardDescription className="text-slate-600 text-xs md:text-sm">
                Depth charts and organizational planning documents
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ReportsTable type="organizational" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="game" className="mt-4 md:mt-6">
          <Card className="gradient-card shadow-soft border-slate-200/60 hover:shadow-glow transition-all duration-200">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/60 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <CardTitle className="text-slate-900 text-base md:text-lg">Game Reports</CardTitle>
              </div>
              <CardDescription className="text-slate-600 text-xs md:text-sm">
                Pre-game and post-game analysis and evaluations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ReportsTable type="game" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
