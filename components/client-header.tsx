"use client"

import { Header } from "@/components/header"
import { useSidebar } from "@/app/providers"

interface ClientHeaderProps {
  isCollapsed?: boolean
  toggleCollapse?: () => void
}

export function ClientHeader({ isCollapsed, toggleCollapse }: ClientHeaderProps) {
  const { isOpen, toggle } = useSidebar()
  return <Header toggleSidebar={toggle} sidebarOpen={isOpen} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
}
