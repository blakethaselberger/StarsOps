"use client"

import { useEffect, useState } from "react"
import { PlayerTableEnhanced } from "./player-table-enhanced"
import { PlayerMobileCards } from "./player-mobile-cards"
import { Player } from "@/data/players-data"

interface PlayerListResponsiveProps {
    players: Player[]
}

export function PlayerListResponsive({ players }: PlayerListResponsiveProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768) // md breakpoint
        }

        // Check on mount
        checkScreenSize()

        // Add event listener
        window.addEventListener('resize', checkScreenSize)

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    // Show mobile cards on small screens, table on larger screens
    if (isMobile) {
        return <PlayerMobileCards players={players} />
    }

    return <PlayerTableEnhanced players={players} />
}
