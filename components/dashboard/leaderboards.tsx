"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { Trophy, Medal } from "lucide-react"

const MOCK_LEADERS = [
    { id: 1, name: "MasterFisher", catches: 154, favorite: "🦈", avatar: "🐱" },
    { id: 2, name: "PezEspada", catches: 132, favorite: "🐋", avatar: "🦊" },
    { id: 3, name: "NemoPro", catches: 98, favorite: "🐠", avatar: "🐶" },
    { id: 4, name: "HookLord", catches: 76, favorite: "🐟", avatar: "🦝" },
    { id: 5, name: "SeaQueen", catches: 45, favorite: "🐙", avatar: "🐸" },
]

export function Leaderboards() {
    const { t } = useLanguage()

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                {MOCK_LEADERS.map((leader, index) => (
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
                                {leader.avatar === "dog" ? "🐶" :
                                    leader.avatar === "raccoon" ? "🦝" :
                                        leader.avatar === "fox" ? "🦊" :
                                            leader.avatar === "frog" ? "🐸" :
                                                leader.avatar === "bear" ? "🐻" : "🐱"}
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
