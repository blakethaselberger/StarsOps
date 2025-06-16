"use client"

import * as React from "react"
import { useState } from "react"
import { CalendarDays, Clock, Edit, Eye, FileText, Plus, Save, Tags, Trash2, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface MeetingNote {
    id?: number
    title: string
    content: string
    author: string
    avatar?: string
    initials: string
    date: string
    category: string
    tags: string[]
    priority?: "low" | "medium" | "high"
    attendees?: string[]
    actionItems?: string[]
}

interface MeetingNotesDialogProps {
    children: React.ReactNode
    note?: MeetingNote
    mode?: "view" | "add" | "edit"
}

const categories = [
    { value: "meeting", label: "Team Meeting" },
    { value: "strategy", label: "Strategy Session" },
    { value: "player", label: "Player Development" },
    { value: "draft", label: "Draft Planning" },
    { value: "analysis", label: "Game Analysis" },
    { value: "coaching", label: "Coaching Staff" },
    { value: "management", label: "Management" },
]

const priorityColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export function MeetingNotesDialog({ children, note, mode = "add" }: MeetingNotesDialogProps) {
    const [open, setOpen] = useState(false)
    const [currentMode, setCurrentMode] = useState(mode)
    const [formData, setFormData] = useState<MeetingNote>({
        title: note?.title || "",
        content: note?.content || "",
        author: note?.author || "Current User",
        initials: note?.initials || "CU",
        date: note?.date || new Date().toLocaleDateString(),
        category: note?.category || "meeting",
        tags: note?.tags || [],
        priority: note?.priority || "medium",
        attendees: note?.attendees || [],
        actionItems: note?.actionItems || [],
        ...note,
    })
    const [tagInput, setTagInput] = useState("")
    const [attendeeInput, setAttendeeInput] = useState("")
    const [actionItemInput, setActionItemInput] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log("Saving note:", formData)
        setOpen(false)
    }

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }))
            setTagInput("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const addAttendee = () => {
        if (attendeeInput.trim() && !formData.attendees?.includes(attendeeInput.trim())) {
            setFormData(prev => ({
                ...prev,
                attendees: [...(prev.attendees || []), attendeeInput.trim()]
            }))
            setAttendeeInput("")
        }
    }

    const removeAttendee = (attendeeToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            attendees: prev.attendees?.filter(attendee => attendee !== attendeeToRemove) || []
        }))
    }

    const addActionItem = () => {
        if (actionItemInput.trim() && !formData.actionItems?.includes(actionItemInput.trim())) {
            setFormData(prev => ({
                ...prev,
                actionItems: [...(prev.actionItems || []), actionItemInput.trim()]
            }))
            setActionItemInput("")
        }
    }

    const removeActionItem = (itemToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            actionItems: prev.actionItems?.filter(item => item !== itemToRemove) || []
        }))
    }

    const getDialogTitle = () => {
        switch (currentMode) {
            case "view":
                return "Meeting Note Details"
            case "edit":
                return "Edit Meeting Note"
            default:
                return "Add New Meeting Note"
        }
    }

    const getDialogDescription = () => {
        switch (currentMode) {
            case "view":
                return "View meeting note details and related information"
            case "edit":
                return "Update meeting note information and details"
            default:
                return "Create a new meeting note with details and action items"
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                {getDialogTitle()}
                            </DialogTitle>
                            <DialogDescription className="mt-1">
                                {getDialogDescription()}
                            </DialogDescription>
                        </div>
                        {currentMode === "view" && (
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentMode("edit")}
                                    className="flex items-center gap-1"
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogHeader>

                {currentMode === "view" ? (
                    <div className="space-y-6">
                        {/* Note Header */}
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold">{formData.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <CalendarDays className="h-4 w-4" />
                                                {formData.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                {formData.author}
                                            </div>
                                            {formData.priority && (
                                                <Badge className={priorityColors[formData.priority]}>
                                                    {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={formData.avatar} alt={formData.author} />
                                        <AvatarFallback>{formData.initials}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium">Content</Label>
                                        <p className="mt-2 text-sm leading-relaxed">{formData.content}</p>
                                    </div>

                                    {formData.tags.length > 0 && (
                                        <div>
                                            <Label className="text-sm font-medium">Tags</Label>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {formData.tags.map((tag) => (
                                                    <Badge key={tag} variant="outline">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Attendees */}
                        {formData.attendees && formData.attendees.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h4 className="font-medium flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Attendees ({formData.attendees.length})
                                    </h4>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.attendees.map((attendee) => (
                                            <Badge key={attendee} variant="secondary">
                                                {attendee}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Action Items */}
                        {formData.actionItems && formData.actionItems.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h4 className="font-medium flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Action Items ({formData.actionItems.length})
                                    </h4>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {formData.actionItems.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm">
                                                <span className="text-muted-foreground">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ) : (
                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="actions">Actions</TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleSubmit}>
                            <TabsContent value="basic" className="space-y-4 py-4">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="Enter meeting note title..."
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.value} value={cat.value}>
                                                            {cat.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="priority">Priority</Label>
                                            <Select
                                                value={formData.priority}
                                                onValueChange={(value: "low" | "medium" | "high") => setFormData(prev => ({ ...prev, priority: value }))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="low">Low Priority</SelectItem>
                                                    <SelectItem value="medium">Medium Priority</SelectItem>
                                                    <SelectItem value="high">High Priority</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="content">Content *</Label>
                                        <Textarea
                                            id="content"
                                            placeholder="Enter detailed meeting notes..."
                                            value={formData.content}
                                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                            className="min-h-[120px]"
                                            required
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="details" className="space-y-4 py-4">
                                <div className="grid gap-4">
                                    {/* Tags */}
                                    <div className="grid gap-2">
                                        <Label>Tags</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add a tag..."
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                            />
                                            <Button type="button" onClick={addTag} size="sm">
                                                <Tags className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {formData.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.tags.map((tag) => (
                                                    <Badge key={tag} variant="outline" className="cursor-pointer" onClick={() => removeTag(tag)}>
                                                        {tag} ×
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Attendees */}
                                    <div className="grid gap-2">
                                        <Label>Attendees</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add attendee name..."
                                                value={attendeeInput}
                                                onChange={(e) => setAttendeeInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAttendee())}
                                            />
                                            <Button type="button" onClick={addAttendee} size="sm">
                                                <User className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {formData.attendees && formData.attendees.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.attendees.map((attendee) => (
                                                    <Badge key={attendee} variant="secondary" className="cursor-pointer" onClick={() => removeAttendee(attendee)}>
                                                        {attendee} ×
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="actions" className="space-y-4 py-4">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label>Action Items</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add action item..."
                                                value={actionItemInput}
                                                onChange={(e) => setActionItemInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActionItem())}
                                            />
                                            <Button type="button" onClick={addActionItem} size="sm">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {formData.actionItems && formData.actionItems.length > 0 && (
                                            <div className="space-y-2 mt-2">
                                                {formData.actionItems.map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                                                        <span className="text-sm">{item}</span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeActionItem(item)}
                                                            className="h-6 w-6 p-0"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <DialogFooter className="mt-6">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700">
                                    <Save className="mr-2 h-4 w-4" />
                                    {currentMode === "edit" ? "Update Note" : "Save Note"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Tabs>
                )}
            </DialogContent>
        </Dialog>
    )
}
