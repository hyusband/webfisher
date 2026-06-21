"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { Trophy, Medal } from "lucide-react"

const NAMES_POOL = [
    "MasterFisher", "PezEspada", "nemo_pro", "HookLord", "SeaQueen", "kraken_99", 
    "SaltyDog", "TideHunter", "ReelDeal", "FishWhisp", "CaptainBait", "SharkBait_uu ha ha", 
    "tuna_tamer", "RiverKing", "MobyDick", "AquaMan", "Pirate", "Mermaid", "Poseidon", 
    "DeepDiver", "CoralReef", "WaveRider", "Goby", "Pike", "BassKing", "juan_pesca", 
    "xx_SniperFish_xx", "pro_angler_007", "El_Pescador", "sushi_lover", "NoobFisher",
    "BigCatch22", "WormsAndHooks", "CatfishHunter", "lucas_1995"
]
const AVATARS_POOL = ["🐱", "🦊", "🐶", "🦝", "🐸", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐰", "🐹", "🐭"]
const FISH_POOL = ["🦈", "🐋", "🐠", "🐟", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐬", "🐚"]

function generateRealisticLeaders(count = 15) {
    const leaders = []
    // Shuffle names to avoid duplicates
    const names = [...NAMES_POOL].sort(() => 0.5 - Math.random())

    // Base score for the top player, makes it look like a highly competitive server
    let currentScore = Math.floor(Math.random() * 5000) + 12000 

    for (let i = 0; i < count; i++) {
        leaders.push({
            id: Math.random().toString(36).substr(2, 9),
            name: names[i] || `Angler${i}`,
            catches: currentScore,
            favorite: FISH_POOL[Math.floor(Math.random() * FISH_POOL.length)],
            avatar: AVATARS_POOL[Math.floor(Math.random() * AVATARS_POOL.length)]
        })

        // Decrease the score for the next player by a random percentage (5% to 15%)
        // This creates a realistic "power-curve" where the top players have way more points
        const dropPercentage = (Math.random() * 0.10) + 0.05 
        currentScore = Math.floor(currentScore * (1 - dropPercentage))
    }
    
    return leaders
}

export function Leaderboards() {
    const { t } = useLanguage()
    const [leaders, setLeaders] = useState<any[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const updateRanking = () => {
            setLeaders(generateRealisticLeaders(15)) // Generate top 15
        }

        updateRanking()
        setMounted(true)

        // Actualizar cada 5 minutos (5 * 60 * 1000 ms)
        const interval = setInterval(updateRanking, 300000)

        return () => clearInterval(interval)
    }, [])

    if (!mounted) {
        return <div className="space-y-6">
            <div className="grid gap-4">
                <div className="h-24 bg-card/50 border border-border rounded-xl animate-pulse" />
                <div className="h-24 bg-card/50 border border-border rounded-xl animate-pulse" />
                <div className="h-24 bg-card/50 border border-border rounded-xl animate-pulse" />
                <div className="h-24 bg-card/50 border border-border rounded-xl animate-pulse" />
                <div className="h-24 bg-card/50 border border-border rounded-xl animate-pulse" />
            </div>
        </div>
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                {leaders.map((leader, index) => (
                    <Card
                        key={leader.id}
                        className={`transition-all ${index === 0 ? "border-yellow-500/50 bg-yellow-500/5 shadow-yellow-500/10" :
                                index === 1 ? "border-slate-400/50 bg-slate-400/5 shadow-slate-400/10" :
                                    index === 2 ? "border-amber-600/50 bg-amber-600/5 shadow-amber-600/10" :
                                        "border-border bg-card/50"
                            }`}
                    >
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="w-10 h-10 flex items-center justify-center font-black text-xl italic text-muted-foreground/50">
                                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                            </div>

                            <div className="w-12 h-12 bg-background border border-border rounded-xl flex items-center justify-center text-2xl shadow-inner">
                                {leader.avatar}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg truncate flex items-center gap-2">
                                    {leader.name}
                                    {index < 3 && <Medal className={`h-4 w-4 ${index === 0 ? "text-yellow-500" :
                                            index === 1 ? "text-slate-400" : "text-amber-600"
                                        }`} />}
                                </h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    {t.dashboard.leaderboards.favoriteFish} {leader.favorite}
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="text-2xl font-black text-primary">{leader.catches}</div>
                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {t.dashboard.leaderboards.catches}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
