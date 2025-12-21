"use client"

import { FISH_DATA, type Fish } from "@/lib/fish-data"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface FishdexProps {
    caughtIds: string[]
}

const RARITY_COLORS = {
    common: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    uncommon: "bg-green-500/20 text-green-400 border-green-500/30",
    rare: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    epic: "bg-purple-500/20 text-purple-400 border-purple-400/30",
    legendary: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30 animate-pulse",
}

export function Fishdex({ caughtIds }: FishdexProps) {
    const { language, t } = useLanguage()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredFish = FISH_DATA.filter((fish) => {
        const name = language === "es" ? fish.name_es : fish.name_en
        return name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder={t.dashboard.fishdex.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-card/50 border-primary/20"
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredFish.map((fish) => {
                    const isCaught = caughtIds.includes(fish.id)
                    const name = language === "es" ? fish.name_es : fish.name_en
                    const description = language === "es" ? fish.description_es : fish.description_en

                    return (
                        <Card
                            key={fish.id}
                            className={`overflow-hidden transition-all duration-300 ${isCaught
                                    ? "border-primary/50 shadow-lg hover:scale-105"
                                    : "opacity-40 grayscale blur-[1px] hover:blur-0 hover:grayscale-0 hover:opacity-60"
                                }`}
                        >
                            <div className="p-4 flex flex-col items-center text-center space-y-2">
                                <div className="text-5xl mb-2">{isCaught ? fish.icon : "❓"}</div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-sm line-clamp-1">{isCaught ? name : "???"}</h3>
                                    {isCaught && (
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${RARITY_COLORS[fish.rarity]}`}>
                                            {fish.rarity.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                {isCaught && (
                                    <p className="text-[10px] text-muted-foreground line-clamp-2 mt-2">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
