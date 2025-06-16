"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Edit, FileText, Share2, Printer, Star, Clock, ArrowUpRight } from "lucide-react"

interface Report {
  id: number
  title: string
  type: string
  subject: string
  subjectType: string
  date: string
  author: string
  authorAvatar?: string
  authorInitials: string
  rating: string | null
  tags: string[]
  content?: {
    summary: string
    strengths: string[]
    weaknesses: string[]
    recommendation: string
    notes: string
  }
}

interface ReportDetailDialogProps {
  report: Report | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReportDetailDialog({ report, open, onOpenChange }: ReportDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!report) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Mock content for the report if not provided
  const reportContent = report.content || {
    summary:
      "This report provides a comprehensive evaluation of the subject based on recent performance, statistical analysis, and direct observation. The assessment covers technical skills, tactical awareness, physical attributes, and mental aspects.",
    strengths: [
      "Exceptional skating ability with great edge work and acceleration",
      "High hockey IQ with excellent vision and anticipation",
      "Strong defensive positioning and stick work",
      "Leadership qualities both on and off the ice",
    ],
    weaknesses: [
      "Needs to improve shot power and accuracy",
      "Could be more physical in board battles",
      "Occasional lapses in concentration during long shifts",
    ],
    recommendation:
      "Recommended for further consideration. Subject shows significant potential and would be a valuable addition to the organization.",
    notes:
      "Follow-up evaluation scheduled for next month to assess progress on identified areas for improvement. Video analysis session recommended with development coaches.",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200/60">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <FileText className="h-5 w-5" />
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900">{report.title}</DialogTitle>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
              </Badge>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(report.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={report.authorAvatar || "/placeholder.svg"} alt={report.author} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs">
                    {report.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <span>{report.author}</span>
              </div>
              {report.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="font-medium">{report.rating}</span>
                </div>
              )}
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="overview" className="flex-1 sm:flex-none">
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" className="flex-1 sm:flex-none">
                Details
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1 sm:flex-none">
                History
              </TabsTrigger>
              <TabsTrigger value="related" className="flex-1 sm:flex-none">
                Related
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-6">
          <TabsContent value="overview" className="mt-0 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">{reportContent.summary}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Subject Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-slate-500">Name</div>
                    <div className="text-slate-900">{report.subject}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Type</div>
                    <div className="text-slate-900">{report.subjectType}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Tags</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {report.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    View Subject Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {reportContent.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-slate-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {reportContent.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                        <span className="text-slate-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{reportContent.recommendation}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{reportContent.notes}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-64 text-slate-500">
                  Detailed report information would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-64 text-slate-500">
                  Report history and revisions would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-64 text-slate-500">
                  Related reports and documents would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>

        <div className="sticky bottom-0 flex justify-between items-center p-4 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button
              size="sm"
              className="gap-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
