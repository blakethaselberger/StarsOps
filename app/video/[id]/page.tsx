"use client"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    SkipBack,
    SkipForward,
    Settings,
    MessageCircle,
    Share,
    Download,
    Bookmark,
    ThumbsUp,
    ThumbsDown,
    Clock,
    AtSign,
    Send,
    MoreHorizontal,
    Tag,
    Calendar,
    Eye,
    ArrowLeft,
    Fullscreen,
    Keyboard,
    Heart,
    Laugh,
    Lightbulb
} from "lucide-react"
import Link from "next/link"

interface Comment {
    id: string
    author: string
    avatar: string
    content: string
    timestamp: string
    videoTimestamp?: string
    likes: number
    replies: Reply[]
    tags: string[]
    createdAt: string
}

interface Reply {
    id: string
    author: string
    avatar: string
    content: string
    createdAt: string
    tags: string[]
}

interface VideoData {
    id: string
    title: string
    description: string
    duration: string
    uploadedBy: string
    uploadDate: string
    views: number
    likes: number
    dislikes: number
    tags: string[]
    league: string
    teams: string
    gameType: string
    videoUrl: string
}

// Mock data
const videoData: VideoData = {
    id: "1",
    title: "Blues vs Blackhawks - Power Play Analysis",
    description: "Comprehensive breakdown of the Blues power play units against Chicago. Focus on puck movement, positioning, and scoring opportunities. Key plays highlighted throughout the video with tactical analysis.",
    duration: "12:34",
    uploadedBy: "Coach Mike Smith",
    uploadDate: "March 15, 2024",
    views: 1247,
    likes: 89,
    dislikes: 3,
    tags: ["Power Play", "Blues", "Blackhawks", "Analysis", "NHL"],
    league: "NHL",
    teams: "STL vs CHI",
    gameType: "Regular Season",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
}

const comments: Comment[] = [
    {
        id: "1",
        author: "David Park",
        avatar: "/placeholder-user.jpg",
        content: "Great analysis of the power play setup. The way Parayko creates space at 2:15 is textbook.",
        timestamp: "2:15",
        videoTimestamp: "2:15",
        likes: 12,
        replies: [
            {
                id: "1-1",
                author: "Lisa Wong",
                avatar: "/placeholder-user.jpg",
                content: "@David Park Absolutely! His positioning really opens up the shooting lanes.",
                createdAt: "2 hours ago",
                tags: ["David Park"]
            }
        ],
        tags: [],
        createdAt: "3 hours ago"
    },
    {
        id: "2",
        author: "Alex Thompson",
        avatar: "/placeholder-user.jpg",
        content: "The puck movement sequence starting at 4:32 shows exactly what we've been working on in practice.",
        timestamp: "4:32",
        videoTimestamp: "4:32",
        likes: 8,
        replies: [],
        tags: [],
        createdAt: "1 hour ago"
    }
]

const teamMembers = [
    { id: "1", name: "Coach Mike Smith", role: "Head Coach" },
    { id: "2", name: "David Park", role: "Assistant Coach" },
    { id: "3", name: "Lisa Wong", role: "Video Analyst" },
    { id: "4", name: "Alex Thompson", role: "Player Development" },
    { id: "5", name: "Jordan Kyrou", role: "Player" },
    { id: "6", name: "Pavel Buchnevich", role: "Player" },
]

// Timeline markers for key events
const timelineMarkers = [
    { time: 35, type: "goal", label: "Goal - Kyrou", color: "bg-green-500" },
    { time: 78, type: "penalty", label: "Penalty - 2min", color: "bg-red-500" },
    { time: 135, type: "powerplay", label: "Power Play Start", color: "bg-blue-500" },
    { time: 155, type: "analysis", label: "Key Play", color: "bg-blue-500" },
    { time: 210, type: "substitution", label: "Line Change", color: "bg-yellow-500" },
    { time: 272, type: "analysis", label: "Defensive Setup", color: "bg-blue-500" },
]

export default function VideoPlayerPage() {
    const params = useParams()
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState(1)
    const [quality, setQuality] = useState("1080p")
    const [newComment, setNewComment] = useState("")
    const [selectedTimestamp, setSelectedTimestamp] = useState("")
    const [taggedUsers, setTaggedUsers] = useState<string[]>([])
    const [showUserSuggestions, setShowUserSuggestions] = useState(false)
    const [activeTab, setActiveTab] = useState("comments")
    const [showAnnotations, setShowAnnotations] = useState(false)
    const [isPictureInPicture, setIsPictureInPicture] = useState(false)
    const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default behavior when video controls should handle the key
            if (e.target === document.body || (e.target as HTMLElement).tagName === 'VIDEO') {
                switch (e.code) {
                    case 'Space':
                        e.preventDefault()
                        togglePlay()
                        break
                    case 'ArrowLeft':
                        e.preventDefault()
                        seekTo(currentTime - 5)
                        break
                    case 'ArrowRight':
                        e.preventDefault()
                        seekTo(currentTime + 5)
                        break
                    case 'ArrowUp':
                        e.preventDefault()
                        setVolume(Math.min(1, volume + 0.1))
                        break
                    case 'ArrowDown':
                        e.preventDefault()
                        setVolume(Math.max(0, volume - 0.1))
                        break
                    case 'KeyM':
                        e.preventDefault()
                        setIsMuted(!isMuted)
                        break
                    case 'KeyF':
                        e.preventDefault()
                        // Toggle fullscreen logic would go here
                        break
                    case 'Comma':
                        e.preventDefault()
                        skipFrames(-1)
                        break
                    case 'Period':
                        e.preventDefault()
                        skipFrames(1)
                        break
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [currentTime, volume, isMuted, isPlaying])

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const seekTo = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time
        }
    }

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            // Add comment logic here
            console.log("New comment:", newComment, "at", selectedTimestamp, "tagging:", taggedUsers)
            setNewComment("")
            setSelectedTimestamp("")
            setTaggedUsers([])
        }
    }

    const handleTimestampClick = (timestamp: string) => {
        const [minutes, seconds] = timestamp.split(':').map(Number)
        const timeInSeconds = minutes * 60 + seconds
        seekTo(timeInSeconds)
    }

    const getCurrentTimestamp = () => {
        return formatTime(currentTime)
    }

    const handleUserTag = (userName: string) => {
        setTaggedUsers([...taggedUsers, userName])
        setNewComment(newComment + `@${userName} `)
        setShowUserSuggestions(false)
    }

    const handlePlaybackSpeedChange = (speed: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speed
            setPlaybackSpeed(speed)
        }
    }

    const skipFrames = (frames: number) => {
        if (videoRef.current) {
            const frameRate = 30 // Assuming 30fps
            const timeSkip = frames / frameRate
            videoRef.current.currentTime += timeSkip
        }
    }

    const togglePictureInPicture = async () => {
        if (videoRef.current) {
            try {
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture()
                    setIsPictureInPicture(false)
                } else {
                    await videoRef.current.requestPictureInPicture()
                    setIsPictureInPicture(true)
                }
            } catch (error) {
                console.error("PiP not supported or failed:", error)
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Back Navigation */}
            <div className="flex items-center gap-4">
                <Link href="/video">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Video Library
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Player Section */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Video Player */}
                    <EnhancedCard variant="elevated" className="overflow-hidden">
                        <div className="relative bg-black aspect-video">
                            <video
                                ref={videoRef}
                                className="w-full h-full"
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                poster="/placeholder.jpg"
                            >
                                <source src={videoData.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Keyboard Shortcuts Help Panel */}
                            {showKeyboardHelp && (
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
                                    <div className="bg-white rounded-lg p-6 max-w-md">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowKeyboardHelp(false)}
                                            >
                                                ×
                                            </Button>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Play/Pause</span>
                                                <kbd className="bg-slate-100 px-2 py-1 rounded">Space</kbd>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Seek backward/forward</span>
                                                <div className="space-x-1">
                                                    <kbd className="bg-slate-100 px-2 py-1 rounded">←</kbd>
                                                    <kbd className="bg-slate-100 px-2 py-1 rounded">→</kbd>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Volume up/down</span>
                                                <div className="space-x-1">
                                                    <kbd className="bg-slate-100 px-2 py-1 rounded">↑</kbd>
                                                    <kbd className="bg-slate-100 px-2 py-1 rounded">↓</kbd>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Frame by frame</span>
                                                <div className="space-x-1">
                                                    <kbd className="bg-slate-100 px-2 py-1 rounded">,</kbd>
                                                    <kbd className="bg-slate-100 px-2 py-1 rounded">.</kbd>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Mute/Unmute</span>
                                                <kbd className="bg-slate-100 px-2 py-1 rounded">M</kbd>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Fullscreen</span>
                                                <kbd className="bg-slate-100 px-2 py-1 rounded">F</kbd>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Video Controls Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                {/* Progress Bar with Timeline Markers */}
                                <div className="mb-4 relative">
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 0}
                                        value={currentTime}
                                        onChange={(e) => seekTo(Number(e.target.value))}
                                        className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer slider relative z-10"
                                    />

                                    {/* Timeline Markers */}
                                    <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none">
                                        {timelineMarkers.map((marker, index) => {
                                            const position = (marker.time / (duration || 1)) * 100
                                            return (
                                                <div
                                                    key={index}
                                                    className={`absolute w-2 h-2 rounded-full ${marker.color} transform -translate-x-1/2 cursor-pointer pointer-events-auto`}
                                                    style={{ left: `${position}%`, top: '-2px' }}
                                                    title={`${formatTime(marker.time)} - ${marker.label}`}
                                                    onClick={() => seekTo(marker.time)}
                                                />
                                            )
                                        })}
                                    </div>

                                    {/* Current time indicator */}
                                    <div className="flex justify-between text-xs text-white/80 mt-1">
                                        <span>{formatTime(currentTime)}</span>
                                        <span className="text-xs">Speed: {playbackSpeed}x</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Control Buttons */}
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={togglePlay}
                                            className="text-white hover:bg-white/20"
                                        >
                                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => seekTo(currentTime - 10)}
                                            className="text-white hover:bg-white/20"
                                            title="Rewind 10s"
                                        >
                                            <SkipBack className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => skipFrames(-1)}
                                            className="text-white hover:bg-white/20 text-xs px-2"
                                            title="Previous Frame"
                                        >
                                            ◀|
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => skipFrames(1)}
                                            className="text-white hover:bg-white/20 text-xs px-2"
                                            title="Next Frame"
                                        >
                                            |▶
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => seekTo(currentTime + 10)}
                                            className="text-white hover:bg-white/20"
                                            title="Forward 10s"
                                        >
                                            <SkipForward className="h-4 w-4" />
                                        </Button>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsMuted(!isMuted)}
                                                className="text-white hover:bg-white/20"
                                            >
                                                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                            </Button>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={isMuted ? 0 : volume}
                                                onChange={(e) => setVolume(Number(e.target.value))}
                                                className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>

                                        <span className="text-sm">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-white hover:bg-white/20"
                                                >
                                                    <Settings className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                                                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                                                    <DropdownMenuItem
                                                        key={speed}
                                                        onClick={() => handlePlaybackSpeedChange(speed)}
                                                        className={playbackSpeed === speed ? "bg-blue-50" : ""}
                                                    >
                                                        {speed}x {speed === 1 && "(Normal)"}
                                                    </DropdownMenuItem>
                                                ))}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel>Quality</DropdownMenuLabel>
                                                {["360p", "720p", "1080p"].map((q) => (
                                                    <DropdownMenuItem
                                                        key={q}
                                                        onClick={() => setQuality(q)}
                                                        className={quality === q ? "bg-blue-50" : ""}
                                                    >
                                                        {q} {q === "1080p" && "(HD)"}
                                                    </DropdownMenuItem>
                                                ))}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => setShowAnnotations(!showAnnotations)}>
                                                    {showAnnotations ? "Hide" : "Show"} Annotations
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setShowKeyboardHelp(true)}>
                                                    <Keyboard className="mr-2 h-4 w-4" />
                                                    Keyboard Shortcuts
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={togglePictureInPicture}
                                            className="text-white hover:bg-white/20"
                                            title="Picture in Picture"
                                        >
                                            <Maximize className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-white hover:bg-white/20"
                                        >
                                            <Fullscreen className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </EnhancedCard>

                    {/* Video Info */}
                    <EnhancedCard>
                        <EnhancedCardContent className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900 mb-2">{videoData.title}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            {videoData.views.toLocaleString()} views
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {videoData.uploadDate}
                                        </span>
                                        <Badge variant="secondary">{videoData.league}</Badge>
                                        <Badge variant="outline">{videoData.gameType}</Badge>
                                    </div>
                                </div>

                                {/* Timeline Legend */}
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <h3 className="text-sm font-semibold text-slate-900 mb-2">Timeline Markers</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span>Goals</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <span>Penalties</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span>Power Plays</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span>Key Analysis</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <span>Line Changes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src="/placeholder-user.jpg" />
                                            <AvatarFallback>MS</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-slate-900">{videoData.uploadedBy}</p>
                                            <p className="text-sm text-slate-600">Video Analyst</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <ThumbsUp className="mr-2 h-4 w-4" />
                                            {videoData.likes}
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <ThumbsDown className="mr-2 h-4 w-4" />
                                            {videoData.dislikes}
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Share className="mr-2 h-4 w-4" />
                                            Share
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Bookmark className="mr-2 h-4 w-4" />
                                            Save
                                        </Button>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-200">
                                    <p className="text-slate-700 leading-relaxed">{videoData.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {videoData.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </EnhancedCardContent>
                    </EnhancedCard>
                </div>

                {/* Comments and Discussion Section */}
                <div className="space-y-6">
                    <EnhancedCard variant="elevated">
                        <EnhancedCardHeader>
                            <EnhancedCardTitle>Discussion</EnhancedCardTitle>
                        </EnhancedCardHeader>

                        <EnhancedCardContent className="p-0">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <div className="px-6 pt-6">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="comments">Comments</TabsTrigger>
                                        <TabsTrigger value="notes">Notes</TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="comments" className="p-6 pt-4">
                                    {/* Add Comment */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Clock className="h-4 w-4" />
                                            <span>Current time: {getCurrentTimestamp()}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedTimestamp(getCurrentTimestamp())}
                                                className="text-blue-600 hover:text-blue-700"
                                            >
                                                Add timestamp
                                            </Button>
                                        </div>

                                        {selectedTimestamp && (
                                            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                                                <Badge variant="default" className="bg-blue-600">
                                                    {selectedTimestamp}
                                                </Badge>
                                                <span className="text-sm text-blue-700">Comment will be linked to this timestamp</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedTimestamp("")}
                                                    className="text-blue-600 hover:text-blue-700 ml-auto"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        )}

                                        <div className="relative">
                                            <Textarea
                                                placeholder="Add a comment... Use @ to tag team members"
                                                value={newComment}
                                                onChange={(e) => {
                                                    setNewComment(e.target.value)
                                                    if (e.target.value.endsWith('@')) {
                                                        setShowUserSuggestions(true)
                                                    }
                                                }}
                                                className="min-h-[80px] resize-none"
                                            />

                                            {showUserSuggestions && (
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                                                    {teamMembers.map((member) => (
                                                        <button
                                                            key={member.id}
                                                            onClick={() => handleUserTag(member.name)}
                                                            className="w-full text-left p-3 hover:bg-slate-50 flex items-center gap-3"
                                                        >
                                                            <Avatar className="h-6 w-6">
                                                                <AvatarFallback className="text-xs">
                                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-sm font-medium">{member.name}</p>
                                                                <p className="text-xs text-slate-600">{member.role}</p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowUserSuggestions(!showUserSuggestions)}
                                                    className="text-slate-600"
                                                >
                                                    <AtSign className="mr-2 h-4 w-4" />
                                                    Tag
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-slate-600"
                                                >
                                                    <Tag className="mr-2 h-4 w-4" />
                                                    Add Tag
                                                </Button>
                                            </div>
                                            <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                                                <Send className="mr-2 h-4 w-4" />
                                                Comment
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Comments List */}
                                    <div className="space-y-4">
                                        {comments.map((comment) => (
                                            <div key={comment.id} className="border-b border-slate-100 pb-4 last:border-b-0">
                                                <div className="flex gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={comment.avatar} />
                                                        <AvatarFallback>
                                                            {comment.author.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-sm text-slate-900">{comment.author}</span>
                                                            <span className="text-xs text-slate-500">{comment.createdAt}</span>
                                                            {comment.videoTimestamp && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleTimestampClick(comment.videoTimestamp!)}
                                                                    className="text-blue-600 hover:text-blue-700 p-1 h-auto"
                                                                >
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {comment.videoTimestamp}
                                                                    </Badge>
                                                                </Button>
                                                            )}
                                                        </div>

                                                        <p className="text-sm text-slate-700">{comment.content}</p>

                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-1">
                                                                <Button variant="ghost" size="sm" className="text-slate-600 h-auto p-1">
                                                                    <ThumbsUp className="mr-1 h-3 w-3" />
                                                                    {comment.likes}
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="text-slate-600 h-auto p-1" title="Like">
                                                                    ❤️
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="text-slate-600 h-auto p-1" title="Insightful">
                                                                    💡
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="text-slate-600 h-auto p-1" title="Funny">
                                                                    😄
                                                                </Button>
                                                            </div>
                                                            <Button variant="ghost" size="sm" className="text-slate-600 h-auto p-1">
                                                                Reply
                                                            </Button>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="sm" className="h-auto p-1">
                                                                        <MoreHorizontal className="h-3 w-3" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                                    <DropdownMenuItem>Report</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>

                                                        {/* Replies */}
                                                        {comment.replies.length > 0 && (
                                                            <div className="mt-4 space-y-3 border-l-2 border-slate-100 pl-4">
                                                                {comment.replies.map((reply) => (
                                                                    <div key={reply.id} className="flex gap-3">
                                                                        <Avatar className="h-6 w-6">
                                                                            <AvatarImage src={reply.avatar} />
                                                                            <AvatarFallback className="text-xs">
                                                                                {reply.author.split(' ').map(n => n[0]).join('')}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <div className="flex-1">
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium text-xs text-slate-900">{reply.author}</span>
                                                                                <span className="text-xs text-slate-500">{reply.createdAt}</span>
                                                                            </div>
                                                                            <p className="text-xs text-slate-700 mt-1">{reply.content}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="notes" className="p-6 pt-4">
                                    <div className="text-center py-8 text-slate-500">
                                        <MessageCircle className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                                        <p>Personal notes for this video will appear here</p>
                                        <Button variant="outline" className="mt-4">
                                            Add Note
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </EnhancedCardContent>
                    </EnhancedCard>
                </div>
            </div>
        </div>
    )
}
