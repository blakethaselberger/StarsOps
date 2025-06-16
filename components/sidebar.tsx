"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  Settings,
  Users,
  Video,
  FileSpreadsheet,
  Activity,
  ChevronDown,
  ChevronRight,
  Shield,
  Wrench,
  Calculator,
  Target,
  LineChart,
  MessageSquare,
  Lightbulb,
  Layers
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState, useEffect, useMemo, memo } from "react"

const navGroups = [
  {
    title: "Core",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: Home,
      },
      {
        title: "Player Database",
        href: "/players",
        icon: Users,
      },
      {
        title: "Reports",
        href: "/scouting",
        icon: FileText,
      },
      {
        title: "Analytics Hub",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        title: "Video Analysis",
        href: "/video",
        icon: Video,
      },
    ]
  },
  {
    title: "Operations",
    items: [
      {
        title: "Player Tracking",
        href: "/tracking",
        icon: Activity,
      },
      {
        title: "Meeting Notes",
        href: "/notes",
        icon: FileText,
      },
    ]
  },
  {
    title: "Tools & Simulations",
    items: [
      {
        title: "Tools",
        href: "/tools",
        icon: Wrench,
      },
      {
        title: "Feature Requests",
        href: "/feature-requests",
        icon: Lightbulb,
      },
    ]
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ]
  }
]

interface SidebarProps {
  isOpen?: boolean
  className?: string
  isCollapsed?: boolean
  onNavigate?: () => void
}

// Memoize the nav item component to prevent unnecessary re-renders
const NavItem = memo(({ item, pathname, isCollapsed, onNavigate }: { 
  item: { title: string; href: string; icon: any }; 
  pathname: string; 
  isCollapsed: boolean;
  onNavigate?: () => void;
}) => {
  const isActive = pathname === item.href;
  
  if (isCollapsed) {
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "transition-all duration-200 text-left relative group/item",
              "h-12 w-12 p-0 justify-center",
              isActive && [
                "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50 shadow-sm",
                "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-blue-600 before:rounded-r-full"
              ],
              !isActive && [
                "hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50 hover:text-slate-900 hover:shadow-sm",
                "hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:bottom-0 hover:before:w-0.5 hover:before:bg-blue-300 hover:before:rounded-r-full hover:before:transition-all hover:before:duration-200"
              ]
            )}
            asChild
          >
            <Link 
              href={item.href}
              onClick={() => {
                // Close sidebar on mobile when navigating
                if (onNavigate && window.innerWidth < 1024) {
                  onNavigate();
                }
              }}
            >
              <item.icon
                className={cn(
                  "transition-all duration-200 flex-shrink-0 h-5 w-5",
                  isActive ? "text-blue-600" : "text-slate-600 group-hover/item:text-slate-700",
                )}
              />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="transition-all duration-200"
          sideOffset={10}
        >
          <span className="font-medium">{item.title}</span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "transition-all duration-200 text-left relative group/item w-full",
            "justify-start gap-3 h-10 px-3 ml-2",
            isActive && [
              "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50 shadow-sm",
              "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-blue-600 before:rounded-r-full"
            ],
            !isActive && [
              "hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50 hover:text-slate-900 hover:shadow-sm",
              "hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:bottom-0 hover:before:w-0.5 hover:before:bg-blue-300 hover:before:rounded-r-full hover:before:transition-all hover:before:duration-200"
            ]
          )}
          asChild
        >
          <Link 
            href={item.href}
            onClick={() => {
              // Close sidebar on mobile when navigating
              if (onNavigate && window.innerWidth < 1024) {
                onNavigate();
              }
            }}
          >
            <item.icon
              className={cn(
                "transition-all duration-200 flex-shrink-0 h-4 w-4",
                isActive ? "text-blue-600" : "text-slate-600 group-hover/item:text-slate-700",
              )}
            />
            <span className="font-medium text-sm truncate">
              {item.title}
            </span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="transition-all duration-200"
        sideOffset={10}
      >
        <span className="font-medium">{item.title}</span>
      </TooltipContent>
    </Tooltip>
  );
});

NavItem.displayName = 'NavItem';

export function Sidebar({ isOpen = true, className, isCollapsed = false, onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Core', 'Operations'])

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleGroup = useMemo(() => (groupTitle: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupTitle)
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    )
  }, [])

  return (
    <div
      className={cn(
        "relative flex flex-col border-r border-slate-200/60 bg-gradient-to-b from-white via-blue-50/30 to-slate-50/80 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:border-gray-800 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300 ease-in-out h-full group",
        // Desktop sizing with collapse functionality
        isCollapsed ? "lg:w-16 lg:min-w-16" : "lg:w-64 lg:min-w-64",
        // Mobile sizing - always full width in sheet
        "w-full lg:relative",
        "transform-gpu overflow-hidden", // Use GPU for smoother animations
        className
      )}
    >
      {/* Header with Logo */}
      <div className={cn(
        "flex items-center border-b border-slate-200/60 dark:border-gray-800 transition-all duration-300 bg-gradient-to-r from-white via-blue-50/20 to-white",
        isCollapsed ? "h-14 md:h-16 px-2 justify-center" : "h-14 md:h-16 px-6"
      )}>
        <Link
          href="/"
          className={cn(
            "flex items-center gap-4 font-semibold transition-all duration-300 group",
            isCollapsed && "lg:justify-center lg:gap-0"
          )}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/st-louis-blues.svg"
              alt="St. Louis Blues"
              className={cn(
                "object-contain transition-all duration-300 relative z-10 drop-shadow-lg group-hover:scale-110 group-hover:drop-shadow-xl",
                isCollapsed ? "h-10 w-10" : "h-12 w-12"
              )}
            />
          </div>
          <div className={cn(
            "flex flex-col transition-all duration-300",
            isCollapsed && "lg:opacity-0 lg:w-0 lg:overflow-hidden lg:absolute"
          )}>
            <span className="text-2xl font-black tracking-tight">
              <span className="text-[#003087]">Blues</span>
              <span className="text-[#FCB514]">Ops</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase -mt-1">
              Hockey Operations
            </span>
          </div>
        </Link>
      </div>
      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <TooltipProvider>
          <div className={cn(
            "flex flex-col gap-2 transition-all duration-300",
            isCollapsed ? "px-2" : "px-3"
          )}>
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                {!isCollapsed && (
                  <Collapsible
                    open={expandedGroups.includes(group.title)}
                    onOpenChange={() => toggleGroup(group.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between h-8 px-2 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50/50"
                      >
                        <span className="truncate">{group.title}</span>
                        {expandedGroups.includes(group.title) ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1">
                      {group.items.map((item) => (
                        <NavItem key={item.href} item={item} pathname={pathname} isCollapsed={false} onNavigate={onNavigate} />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* Collapsed view - show all items as icons */}
                {isCollapsed && group.items.map((item) => (
                  <NavItem key={item.href} item={item} pathname={pathname} isCollapsed={true} onNavigate={onNavigate} />
                ))}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </ScrollArea>

      {/* Footer - User info */}
      <div className={cn(
        "border-t border-slate-200/60 dark:border-gray-800 p-3 transition-all duration-300",
        isCollapsed && "lg:px-2"
      )}>
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer",
          isCollapsed && "lg:justify-center lg:gap-0"
        )}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm">
            JD
          </div>
          <div className={cn(
            "flex-1 min-w-0 transition-all duration-300",
            isCollapsed && "lg:opacity-0 lg:w-0 lg:overflow-hidden"
          )}>
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Coach</p>
          </div>
        </div>
      </div>
    </div>
  )
}
