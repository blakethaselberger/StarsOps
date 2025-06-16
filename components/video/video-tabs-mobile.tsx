"use client"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Video,
  Bookmark,
  Users,
  Share,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface VideoTabsMobileProps {
  selectedTab: string
  onTabChange: (tab: string) => void
  videoCounts?: {
    all: number
    bookmarked: number
    myVideos: number
    shared: number
    recent: number
  }
}

const tabs = [
  { id: "all", label: "All Videos", icon: Video },
  { id: "bookmarked", label: "Bookmarked", icon: Bookmark },
  { id: "my-videos", label: "My Videos", icon: Users },
  { id: "shared", label: "Shared", icon: Share },
  { id: "recent", label: "Recent", icon: Clock }
]

export function VideoTabsMobile({ 
  selectedTab, 
  onTabChange,
  videoCounts = {
    all: 0,
    bookmarked: 0,
    myVideos: 0,
    shared: 0,
    recent: 0
  }
}: VideoTabsMobileProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const getTabCount = (tabId: string) => {
    switch (tabId) {
      case 'all':
        return videoCounts.all
      case 'bookmarked':
        return videoCounts.bookmarked
      case 'my-videos':
        return videoCounts.myVideos
      case 'shared':
        return videoCounts.shared
      case 'recent':
        return videoCounts.recent
      default:
        return 0
    }
  }

  return (
    <div className="md:hidden relative bg-white border-b border-gray-200">
      {/* Left Arrow */}
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white/90 shadow-md"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white/90 shadow-md"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Tabs Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide px-4 py-2 gap-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          const count = getTabCount(tab.id)
          const isActive = selectedTab === tab.id

          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-shrink-0 h-9 px-3 gap-2 transition-all",
                isActive 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
              {count > 0 && (
                <Badge 
                  variant={isActive ? "secondary" : "outline"}
                  className={cn(
                    "ml-1 h-5 px-1.5 min-w-[20px] text-xs",
                    isActive 
                      ? "bg-blue-500 text-white border-0" 
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {count}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>

      {/* Tab Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{
            width: '20%',
            transform: `translateX(${tabs.findIndex(t => t.id === selectedTab) * 100}%)`
          }}
        />
      </div>
    </div>
  )
}

// Mobile Tab Content Wrapper
export function VideoTabContent({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={cn("md:hidden", className)}>
      {children}
    </div>
  )
}
