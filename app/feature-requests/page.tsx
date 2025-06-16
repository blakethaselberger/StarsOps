"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Lightbulb,
    Plus,
    Filter,
    Search,
    Clock,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    User,
    Calendar,
    MessageSquare,
    TrendingUp,
    Bug,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/ui/page-header"
import { PageLayout, PageSection } from "@/components/ui/page-layout"

interface FeatureRequest {
    id: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    status: 'submitted' | 'under-review' | 'in-development' | 'completed' | 'rejected'
    category: 'feature' | 'bug' | 'improvement'
    submittedBy: string
    submittedDate: string
    role: string
    votes: number
    comments: number
}

const mockRequests: FeatureRequest[] = [
    {
        id: '1',
        title: 'Advanced Player Comparison Tool',
        description: 'Add ability to compare multiple players side-by-side with advanced metrics visualization',
        priority: 'high',
        status: 'in-development',
        category: 'feature',
        submittedBy: 'John Smith',
        submittedDate: '2024-01-15',
        role: 'Scout',
        votes: 12,
        comments: 5
    },
    {
        id: '2',
        title: 'Mobile App for Game Day Tracking',
        description: 'Develop mobile application for real-time game tracking and note-taking',
        priority: 'medium',
        status: 'under-review',
        category: 'feature',
        submittedBy: 'Sarah Johnson',
        submittedDate: '2024-01-20',
        role: 'Coach',
        votes: 8,
        comments: 3
    },
    {
        id: '3',
        title: 'Fix Export Function in Reports',
        description: 'Excel export is failing for reports with more than 1000 rows',
        priority: 'high',
        status: 'submitted',
        category: 'bug',
        submittedBy: 'Mike Davis',
        submittedDate: '2024-01-25',
        role: 'Analyst',
        votes: 15,
        comments: 8
    },
    {
        id: '4',
        title: 'Draft Board Improvements',
        description: 'Add drag-and-drop functionality and better filtering options',
        priority: 'medium',
        status: 'completed',
        category: 'improvement',
        submittedBy: 'Lisa Wilson',
        submittedDate: '2023-12-10',
        role: 'GM Assistant',
        votes: 6,
        comments: 2
    }
]

export default function FeatureRequestsPage() {
    const [requests] = useState<FeatureRequest[]>(mockRequests)
    const [filteredRequests, setFilteredRequests] = useState<FeatureRequest[]>(mockRequests)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [priorityFilter, setPriorityFilter] = useState<string>("all")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // New request form state
    const [newRequest, setNewRequest] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category: 'feature'
    })

    const getStatusBadge = (status: string) => {
        const styles = {
            'submitted': 'bg-blue-100 text-blue-800',
            'under-review': 'bg-yellow-100 text-yellow-800',
            'in-development': 'bg-purple-100 text-purple-800',
            'completed': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800'
        }
        return <Badge className={styles[status as keyof typeof styles]}>{status.replace('-', ' ')}</Badge>
    }

    const getPriorityBadge = (priority: string) => {
        const styles = {
            'low': 'bg-gray-100 text-gray-800',
            'medium': 'bg-yellow-100 text-yellow-800',
            'high': 'bg-red-100 text-red-800'
        }
        return <Badge variant="outline" className={styles[priority as keyof typeof styles]}>{priority}</Badge>
    }

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'feature': return <Lightbulb className="h-4 w-4" />
            case 'bug': return <Bug className="h-4 w-4" />
            case 'improvement': return <TrendingUp className="h-4 w-4" />
            default: return <Lightbulb className="h-4 w-4" />
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'submitted': return <Clock className="h-4 w-4" />
            case 'under-review': return <AlertCircle className="h-4 w-4" />
            case 'in-development': return <Zap className="h-4 w-4" />
            case 'completed': return <CheckCircle className="h-4 w-4" />
            case 'rejected': return <AlertCircle className="h-4 w-4" />
            default: return <Clock className="h-4 w-4" />
        }
    }

    const handleSubmitRequest = () => {
        // Here you would typically submit to an API
        console.log('Submitting request:', newRequest)
        setIsDialogOpen(false)
        setNewRequest({
            title: '',
            description: '',
            priority: 'medium',
            category: 'feature'
        })
    }

    const stats = {
        total: requests.length,
        submitted: requests.filter(r => r.status === 'submitted').length,
        inProgress: requests.filter(r => ['under-review', 'in-development'].includes(r.status)).length,
        completed: requests.filter(r => r.status === 'completed').length
    }

    return (
        <PageLayout>
            <PageHeader
                title="Feature Requests"
                description="Submit ideas, report bugs, and track development progress"
                action={
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Submit Request
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                                <DialogTitle>Submit New Feature Request</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Brief description of your request..."
                                        value={newRequest.title}
                                        onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Provide detailed information about your request..."
                                        className="min-h-[100px]"
                                        value={newRequest.description}
                                        onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select value={newRequest.category} onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="feature">New Feature</SelectItem>
                                                <SelectItem value="improvement">Improvement</SelectItem>
                                                <SelectItem value="bug">Bug Report</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="priority">Priority</Label>
                                        <Select value={newRequest.priority} onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSubmitRequest}>
                                        Submit Request
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                }
            />
            
            <PageSection>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Lightbulb className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total}</p>
                                <p className="text-xs text-slate-600">Total Requests</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Clock className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.submitted}</p>
                                <p className="text-xs text-slate-600">Awaiting Review</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Zap className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.inProgress}</p>
                                <p className="text-xs text-slate-600">In Progress</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.completed}</p>
                                <p className="text-xs text-slate-600">Completed</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search requests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="submitted">Submitted</SelectItem>
                                    <SelectItem value="under-review">Under Review</SelectItem>
                                    <SelectItem value="in-development">In Development</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Priority</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[130px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="feature">Features</SelectItem>
                                    <SelectItem value="bug">Bugs</SelectItem>
                                    <SelectItem value="improvement">Improvements</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Requests List */}
            <div className="space-y-4">
                {requests.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            {getCategoryIcon(request.category)}
                                            <h3 className="font-semibold text-slate-900">{request.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(request.status)}
                                            {getPriorityBadge(request.priority)}
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600">{request.description}</p>

                                    <div className="flex items-center gap-6 text-xs text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            {request.submittedBy} ({request.role})
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(request.submittedDate).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="h-3 w-3" />
                                            {request.votes} votes
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageSquare className="h-3 w-3" />
                                            {request.comments} comments
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    <div className="flex items-center gap-1 text-slate-400">
                                        {getStatusIcon(request.status)}
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            </PageSection>
        </PageLayout>
    )
}
