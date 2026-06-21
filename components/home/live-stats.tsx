"use client"

import { useState, useEffect } from "react"
import { Users, Fish } from "lucide-react"

export function LiveStats() {
    const [players, setPlayers] = useState(124)
    const [catches, setCatches] = useState(4521)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        
        // Randomize initial values a bit so it's different on each load
        const basePlayers = Math.floor(Math.random() * 50) + 100
        const baseCatches = Math.floor(Math.random() * 1000) + 4000
        
        setPlayers(basePlayers)
        setCatches(baseCatches)

        // Simulate people joining and leaving every few seconds
        const playersInterval = setInterval(() => {
            setPlayers(prev => {
                const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
                return Math.max(80, prev + change) // keep it above 80
            })
        }, 3000)

        // Simulate new catches every second or two
        const catchesInterval = setInterval(() => {
            setCatches(prev => prev + Math.floor(Math.random() * 3) + 1) // +1 to +3 catches
        }, 2000)

        return () => {
            clearInterval(playersInterval)
            clearInterval(catchesInterval)
        }
    }, [])

    if (!mounted) return null

    return (
        <div className="bg-primary/10 border-b border-primary/20 text-foreground py-2 px-4 text-xs font-bold flex justify-center items-center gap-6 md:gap-12 overflow-hidden whitespace-nowrap">
            <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-500 uppercase tracking-wider">Servidores Online</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-foreground">{players.toLocaleString()}</span> pescadores activos
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                <Fish className="h-4 w-4 text-accent" />
                ¡<span className="text-foreground">{catches.toLocaleString()}</span> peces capturados hoy!
            </div>
        </div>
    )
}
