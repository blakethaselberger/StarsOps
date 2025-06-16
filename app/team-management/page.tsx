"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Users,
    Shield,
    Activity,
    Plus,
    Edit3,
    Trash2,
    Save,
    RotateCcw,
    AlertTriangle,
    Target,
    Layers
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/ui/page-header"
import { PageLayout, PageSection } from "@/components/ui/page-layout"

interface Player {
    id: string
    name: string
    position: string
    jersey: number
    status: 'active' | 'injured' | 'scratch'
    line?: number
    unit?: string
}

interface LineCombo {
    id: string
    name: string
    players: Player[]
    type: 'forward' | 'defense' | 'powerplay' | 'penalty-kill'
}

const mockPlayers: Player[] = [
    { id: '1', name: 'Jordan Kyrou', position: 'RW', jersey: 25, status: 'active' },
    { id: '2', name: 'Pavel Buchnevich', position: 'LW', jersey: 89, status: 'active' },
    { id: '3', name: 'Ryan O\'Reilly', position: 'C', jersey: 90, status: 'active' },
    { id: '4', name: 'Colton Parayko', position: 'D', jersey: 55, status: 'active' },
    { id: '5', name: 'Nick Leddy', position: 'D', jersey: 4, status: 'active' },
    { id: '6', name: 'Justin Faulk', position: 'D', jersey: 72, status: 'injured' },
    { id: '7', name: 'Brandon Saad', position: 'LW', jersey: 20, status: 'active' },
    { id: '8', name: 'Robert Thomas', position: 'C', jersey: 18, status: 'active' },
]

const mockLineCombos: LineCombo[] = [
    {
        id: '1',
        name: 'Line 1',
        type: 'forward',
        players: [
            { id: '2', name: 'Pavel Buchnevich', position: 'LW', jersey: 89, status: 'active' },
            { id: '8', name: 'Robert Thomas', position: 'C', jersey: 18, status: 'active' },
            { id: '1', name: 'Jordan Kyrou', position: 'RW', jersey: 25, status: 'active' },
        ]
    },
    {
        id: '2',
        name: 'Top Pair',
        type: 'defense',
        players: [
            { id: '4', name: 'Colton Parayko', position: 'D', jersey: 55, status: 'active' },
            { id: '5', name: 'Nick Leddy', position: 'D', jersey: 4, status: 'active' },
        ]
    }
]

export default function TeamManagementPage() {
    const [lineCombos, setLineCombos] = useState<LineCombo[]>(mockLineCombos)
    const [players] = useState<Player[]>(mockPlayers)
    const [isEditing, setIsEditing] = useState(false)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800'
            case 'injured': return 'bg-red-100 text-red-800'
            case 'scratch': return 'bg-yellow-100 text-yellow-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'injured': return <AlertTriangle className="h-3 w-3" />
            case 'scratch': return <RotateCcw className="h-3 w-3" />
            default: return null
        }
    }

    return (
        <PageLayout>
            <PageHeader
                title="Team Management"
                description="Manage line combinations, depth charts, and team structure"
                action={
                    <div className="flex items-center gap-3">
                        <Button
                            variant={isEditing ? "destructive" : "outline"}
                            onClick={() => setIsEditing(!isEditing)}
                            className="sm:w-auto"
                        >
                            {isEditing ? (
                                <>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Cancel
                                </>
                            ) : (
                                <>
                                    <Edit3 className="mr-2 h-4 w-4" />
                                    Edit Mode
                                </>
                            )}
                        </Button>
                        {isEditing && (
                            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        )}
                    </div>
                }
            />
            
            <PageSection>

            <Tabs defaultValue="lines" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="lines" className="flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        Line Combos
                    </TabsTrigger>
                    <TabsTrigger value="depth" className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Depth Chart
                    </TabsTrigger>
                    <TabsTrigger value="status" className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Player Status
                    </TabsTrigger>
                    <TabsTrigger value="coaching" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Coaching Staff
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="lines" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Forward Lines */}
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-blue-600" />
                                        Forward Lines
                                    </CardTitle>
                                    {isEditing && (
                                        <Button size="sm" variant="outline">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Line
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {lineCombos.filter(line => line.type === 'forward').map((line) => (
                                    <div key={line.id} className="p-4 bg-slate-50 rounded-lg border">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-slate-900">{line.name}</h4>
                                            {isEditing && (
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="ghost">
                                                        <Edit3 className="h-3 w-3" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost">
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {line.players.map((player) => (
                                                <div key={player.id} className="text-center p-2 bg-white rounded border">
                                                    <div className="text-xs text-slate-500 mb-1">{player.position}</div>
                                                    <div className="font-medium text-sm">{player.name}</div>
                                                    <div className="text-xs text-slate-600">#{player.jersey}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Defense Pairs */}
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-blue-600" />
                                        Defense Pairs
                                    </CardTitle>
                                    {isEditing && (
                                        <Button size="sm" variant="outline">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Pair
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {lineCombos.filter(line => line.type === 'defense').map((line) => (
                                    <div key={line.id} className="p-4 bg-slate-50 rounded-lg border">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-slate-900">{line.name}</h4>
                                            {isEditing && (
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="ghost">
                                                        <Edit3 className="h-3 w-3" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost">
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {line.players.map((player) => (
                                                <div key={player.id} className="text-center p-2 bg-white rounded border">
                                                    <div className="text-xs text-slate-500 mb-1">{player.position}</div>
                                                    <div className="font-medium text-sm">{player.name}</div>
                                                    <div className="text-xs text-slate-600">#{player.jersey}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="depth" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-600" />
                                Depth Chart Overview
                            </CardTitle>
                            <p className="text-sm text-slate-600">
                                Drag and drop players to reorganize depth chart positions
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-slate-500">
                                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Depth chart management coming soon</p>
                                <p className="text-sm">Interactive drag-and-drop interface</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="status" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-blue-600" />
                                Player Status Tracker
                            </CardTitle>
                            <p className="text-sm text-slate-600">
                                Track injuries, scratches, and availability
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {players.map((player) => (
                                    <div key={player.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="font-medium">{player.name}</div>
                                            <Badge variant="outline" className="text-xs">
                                                {player.position} • #{player.jersey}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge className={cn("text-xs flex items-center gap-1", getStatusColor(player.status))}>
                                                {getStatusIcon(player.status)}
                                                {player.status}
                                            </Badge>
                                            {isEditing && (
                                                <Select defaultValue={player.status}>
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="injured">Injured</SelectItem>
                                                        <SelectItem value="scratch">Scratch</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="coaching" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-blue-600" />
                                Coaching Staff & Roles
                            </CardTitle>
                            <p className="text-sm text-slate-600">
                                Manage coaching assignments and practice groups
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-slate-500">
                                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Coaching staff management coming soon</p>
                                <p className="text-sm">Role assignments and practice group organization</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            </PageSection>
        </PageLayout>
    )
}
