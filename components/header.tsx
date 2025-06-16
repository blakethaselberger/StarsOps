"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Calendar, Check, ChevronRight, PanelLeft, Plus, SearchIcon, Users, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  toggleSidebar: () => void
  sidebarOpen: boolean
  isCollapsed?: boolean
  toggleCollapse?: () => void
}

export function Header({ toggleSidebar, sidebarOpen, isCollapsed, toggleCollapse }: HeaderProps) {
  const router = useRouter()
  const [showSearch, setShowSearch] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [searchValue, setSearchValue] = useState("")

  const handleLogout = () => {
    router.push('/logout')
  }

  const notifications = [
    {
      id: 1,
      title: "New scouting report",
      description: "Alex Johnson added a new scouting report for Ryan O'Reilly",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Meeting reminder",
      description: "Draft strategy meeting starts in 30 minutes",
      time: "25 minutes ago",
      unread: true,
    },
    {
      id: 3,
      title: "Player status update",
      description: "Jordan Binnington has been cleared to play",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 4,
      title: "Analytics report ready",
      description: "Monthly performance analytics report is now available",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 5,
      title: "System update",
      description: "The system will be updated tonight at 2:00 AM",
      time: "Yesterday",
      unread: false,
    },
  ]

  const markAllRead = () => {
    setNotificationCount(0)
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 md:h-16 items-center border-b border-slate-200/60 bg-gradient-to-r from-white via-blue-50/30 to-blue-100/20 backdrop-blur-sm px-3 sm:px-4 md:px-6 shadow-[var(--shadow-subtle)]"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(241,245,249,0.8) 50%, rgba(243,244,246,0.9) 100%)'
      }}>
      <TooltipProvider>
        <div className="flex items-center gap-2 md:gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden mr-1 md:mr-2 transition-all duration-200 ease-in-out hover:bg-slate-100/80 hover:scale-105 h-9 w-9 md:h-10 md:w-10"
              >
                <PanelLeft className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"}`} />
                <span className="sr-only">{sidebarOpen ? "Close sidebar" : "Open sidebar"}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}</TooltipContent>
          </Tooltip>

          {/* Desktop Collapse Button */}
          {toggleCollapse && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCollapse}
                  className="hidden lg:flex mr-1 md:mr-2 transition-all duration-200 ease-in-out hover:bg-slate-100/80 hover:scale-105 h-9 w-9 md:h-10 md:w-10"
                >
                  <PanelLeft className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
                  <span className="sr-only">{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</TooltipContent>
            </Tooltip>
          )}

          {/* Brand logo/text for mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <img
              src="/st-louis-blues.svg"
              alt="Blues Logo"
              className="h-6 w-6 md:h-7 md:w-7 object-contain drop-shadow-sm"
            />
            <div className="flex flex-col">
              <h1 className="text-base font-black tracking-tight leading-none">
                <span className="text-[#003087]">Blues</span>
                <span className="text-[#FCB514]">Ops</span>
              </h1>
              <span className="text-[8px] text-slate-500 font-medium tracking-wider uppercase -mt-0.5">
                Hockey Operations
              </span>
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="ml-auto flex items-center gap-1">
          {showSearch ? (
            <div className="relative w-32 sm:w-48 md:w-64">
              <Input
                placeholder="Search..."
                className="pr-8 border-slate-200/60 bg-white/80 backdrop-blur-sm focus:border-blue-300 focus:ring-blue-200 text-xs sm:text-sm h-8 md:h-9"
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={() => setShowSearch(false)}
              />
              <SearchIcon className="absolute right-2 top-1/2 h-3 w-3 md:h-4 md:w-4 -translate-y-1/2 text-slate-400" />
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(true)}
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:scale-105 transition-all duration-200 h-8 w-8 md:h-9 md:w-9"
                >
                  <SearchIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
          )}

          {/* Hide these buttons on mobile to save space */}
          <div className="hidden sm:flex items-center gap-1 md:gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:scale-105 transition-all duration-200 h-8 w-8 md:h-9 md:w-9"
                >
                  <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="sr-only">Calendar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Calendar</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:scale-105 transition-all duration-200 h-8 w-8 md:h-9 md:w-9"
                >
                  <Users className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="sr-only">Team</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Team</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:scale-105 transition-all duration-200 h-8 w-8 md:h-9 md:w-9"
                >
                  <Plus className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="sr-only">Create</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Create New</TooltipContent>
            </Tooltip>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:scale-105 transition-all duration-200 h-8 w-8 md:h-9 md:w-9"
              >
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 md:h-4 md:w-4 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-[8px] md:text-[9px] font-medium text-white shadow-sm animate-pulse-glow">
                    {notificationCount}
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 md:w-80 shadow-soft border-slate-200/60">
              <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-slate-50 to-blue-50/50">
                <h3 className="font-semibold text-slate-900 text-sm md:text-base">Notifications</h3>
                {notificationCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-blue-600 hover:text-blue-700"
                    onClick={markAllRead}
                  >
                    <Check className="mr-1 h-3 w-3" />
                    Mark all as read
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-[250px] md:max-h-[300px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex cursor-pointer items-start gap-3 md:gap-4 p-3 md:p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50 ${notification.unread
                      ? "bg-gradient-to-r from-blue-50/50 to-indigo-50/30 border-l-2 border-blue-400"
                      : ""
                      }`}
                  >
                    <div
                      className={`mt-1 h-2 w-2 rounded-full transition-all duration-200 ${notification.unread ? "bg-blue-500 shadow-sm" : "bg-transparent"
                        }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-900 text-sm truncate">{notification.title}</p>
                        <span className="text-xs text-slate-500 ml-2 flex-shrink-0">{notification.time}</span>
                      </div>
                      <p className="mt-1 text-xs md:text-sm text-slate-600 line-clamp-2">{notification.description}</p>
                    </div>
                    <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-slate-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 text-center bg-gradient-to-r from-slate-50 to-blue-50/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden sm:block mx-1 md:mx-2 h-4 md:h-6 w-px bg-slate-300/60" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-slate-400 hover:text-slate-500 hover:bg-slate-100/80 transition-all duration-200 h-8 w-8 md:h-9 md:w-9 cursor-not-allowed"
                disabled
              >
                <Moon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Dark mode (Coming Soon)</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Dark Mode - Coming Soon</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-0 rounded-full hover:scale-105 transition-all duration-200 h-8 w-8 md:h-9 md:w-9 p-0"
              >
                <Avatar className="h-7 w-7 md:h-8 md:w-8 ring-2 ring-blue-500/20 ring-offset-1 hover:ring-blue-500/40 transition-all duration-200">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-[10px] md:text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 md:w-56 shadow-soft border-slate-200/60">
              <div className="flex flex-col space-y-1 p-3 bg-gradient-to-r from-slate-50 to-blue-50/50">
                <p className="text-sm font-semibold leading-none text-slate-900">John Doe</p>
                <p className="text-xs font-normal leading-none text-slate-600">Head Scout</p>
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-500">john.doe@blues.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                Settings
              </DropdownMenuItem>
              {/* Mobile-only items */}
              <div className="sm:hidden">
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                  <Users className="mr-2 h-4 w-4" />
                  Team
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50 cursor-not-allowed opacity-50"
                  disabled
                >
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark Mode</span>
                  <span className="ml-auto text-xs text-slate-400">Coming Soon</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                onClick={handleLogout}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
    </header>
  )
}
