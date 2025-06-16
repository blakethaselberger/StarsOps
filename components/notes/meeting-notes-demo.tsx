import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MeetingNotesDialog } from "@/components/notes/meeting-notes-dialog"
import { Eye, FileText, Plus } from "lucide-react"

const sampleNote = {
    id: 1,
    title: "Pre-Game Strategy Meeting - Chicago Blackhawks",
    content: "Discussed defensive strategies against Chicago's top line. Need to focus on limiting their zone entries and maintaining pressure in the neutral zone. Key points covered:\n\n1. Neutral zone positioning\n2. Forecheck pressure\n3. Power play adjustments\n4. Line matching strategies",
    author: "Coach Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "CJ",
    date: "March 12, 2024",
    category: "strategy",
    priority: "high" as const,
    tags: ["Strategy", "Pre-Game", "Defense"],
    attendees: ["Coach Johnson", "Assistant Coach Miller", "Video Coach Wilson", "Captain O'Reilly"],
    actionItems: [
        "Review neutral zone entry footage with defensive pairs",
        "Practice forecheck drills in tomorrow's session",
        "Adjust power play formation for better puck movement",
        "Meet with leadership group before game"
    ]
}

export function MeetingNotesDemo() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Meeting Notes Dialog Demo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        This demo showcases the meeting notes popup interface with different modes.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <MeetingNotesDialog mode="add">
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Note
                            </Button>
                        </MeetingNotesDialog>

                        <MeetingNotesDialog note={sampleNote} mode="view">
                            <Button variant="outline" className="w-full">
                                <Eye className="mr-2 h-4 w-4" />
                                View Sample Note
                            </Button>
                        </MeetingNotesDialog>

                        <MeetingNotesDialog note={sampleNote} mode="edit">
                            <Button variant="secondary" className="w-full">
                                <FileText className="mr-2 h-4 w-4" />
                                Edit Sample Note
                            </Button>
                        </MeetingNotesDialog>
                    </div>

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                        <h3 className="font-semibold mb-2">Features:</h3>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Three modes: Add, View, and Edit</li>
                            <li>• Tabbed interface for organized data entry</li>
                            <li>• Support for tags, attendees, and action items</li>
                            <li>• Priority levels with color coding</li>
                            <li>• Responsive design following your theme</li>
                            <li>• Seamless integration with existing components</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
