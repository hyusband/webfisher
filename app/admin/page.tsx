"use client"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { Users, Shield, MessageSquare, Loader2 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
    const { t } = useLanguage()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await fetch("/api/user/profile")
                if (!res.ok) {
                    window.location.href = "/login"
                    return
                }
                const data = await res.json()
                if (!data.profile?.is_admin) {
                   // Or handle non-admin, e.g., redirect to dashboard
                }
            } catch (e) {
                window.location.href = "/login"
                return
            }

            // Mock users for the dashboard
            setUsers([
                { id: 1, username: "MasterFisher", email: "master@fish.com", joined: "2025-12-10" },
                { id: 2, username: "NemoPro", email: "nemo@sea.com", joined: "2025-12-12" },
                { id: 3, username: "PescadorNovato", email: "novato@test.com", joined: "2025-12-15" },
            ])
            setLoading(false)
        }
        checkAdmin()
    }, [])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                            <Shield className="h-6 w-6 text-red-500" />
                        </div>
                        <span className="font-black text-xl tracking-tighter uppercase text-red-500">Admin Control</span>
                    </div>
                    <Button asChild variant="outline" className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800">
                        <Link href="/dashboard">{t.nav.back}</Link>
                    </Button>
                </div>
            </nav>

            <div className="container mx-auto p-8 max-w-6xl">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card className="bg-slate-900 border-slate-800 text-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">{t.dashboard.admin.totalUsers}</CardTitle>
                            <Users className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold">1,284</div>
                            <p className="text-xs text-green-500">+12% from last week</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 text-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">{t.dashboard.admin.reviewPosts}</CardTitle>
                            <MessageSquare className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold">42</div>
                            <p className="text-xs text-yellow-500">Requires attention</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 text-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">{t.dashboard.admin.serverStatus}</CardTitle>
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold uppercase">Stable</div>
                            <p className="text-xs text-slate-500">All systems operational</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-slate-900 border-slate-800 text-slate-100 overflow-hidden">
                    <CardHeader className="border-b border-slate-800 bg-slate-900/50">
                        <CardTitle>{t.dashboard.admin.userTable}</CardTitle>
                        <CardDescription className="text-slate-500">{t.dashboard.admin.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase font-bold">
                                    <tr>
                                        <th className="py-4 px-6">{t.dashboard.user}</th>
                                        <th className="py-4 px-6">{t.dashboard.email}</th>
                                        <th className="py-4 px-6">{t.dashboard.memberSince}</th>
                                        <th className="py-4 px-6 text-right">{t.dashboard.admin.actions}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-200">{u.username}</td>
                                            <td className="py-4 px-6 text-slate-400">{u.email}</td>
                                            <td className="py-4 px-6 text-slate-500 text-sm">{u.joined}</td>
                                            <td className="py-4 px-6 text-right">
                                                <Button size="sm" variant="destructive" className="bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30">
                                                    {t.dashboard.admin.ban}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
