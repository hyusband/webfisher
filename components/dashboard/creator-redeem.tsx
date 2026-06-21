"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { Gift, CheckCircle2, AlertCircle } from "lucide-react"

export const CreatorRedeem = () => {
    const [code, setCode] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")
    const { t } = useLanguage()
    const handleRedeem = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!code || status === "loading") return

        setStatus("loading")

        try {
            const res = await fetch("/api/creator/redeem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || t.dashboard.creatorRedeem.error)
            }

            setStatus("success")
            setMessage(t.dashboard.creatorRedeem.success)
            setCode("")
        } catch (error: any) {
            setStatus("error")
            setMessage(error.message || t.dashboard.creatorRedeem.error)
        }
    }

    return (
        <Card className="shadow-xl border-primary/20 bg-card/90 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Gift className="h-24 w-24" />
            </div>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Gift className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{t.dashboard.creatorRedeem.title}</CardTitle>
                        <CardDescription>{t.dashboard.creatorRedeem.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRedeem} className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder={t.dashboard.creatorRedeem.placeholder}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="bg-muted/50 font-bold uppercase"
                            disabled={status === "loading" || status === "success"}
                        />
                        <Button
                            type="submit"
                            disabled={!code || status === "loading" || status === "success"}
                            className="font-bold whitespace-nowrap"
                        >
                            {status === "loading" ? t.dashboard.creatorRedeem.loading : t.dashboard.creatorRedeem.button}
                        </Button>
                    </div>

                    {status === "success" && (
                        <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-xl border border-green-500/20 animate-in fade-in zoom-in duration-300">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-bold text-sm">{message}</span>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20 animate-in shake duration-300">
                            <AlertCircle className="h-5 w-5" />
                            <span className="font-bold text-sm">{message}</span>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}
