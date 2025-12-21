"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Lock, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-context"

interface SettingsFormProps {
    initialUsername: string
    initialAvatar?: string
    initialFavoriteFish?: string
}

const AVATARS = [
    { id: "cat", icon: "🐱", name: "Gato / Cat" },
    { id: "dog", icon: "🐶", name: "Perro / Dog" },
    { id: "raccoon", icon: "🦝", name: "Mapache / Raccoon" },
    { id: "fox", icon: "🦊", name: "Zorro / Fox" },
    { id: "frog", icon: "🐸", name: "Rana / Frog" },
    { id: "bear", icon: "🐻", name: "Oso / Bear" },
]

const FISH_OPTIONS = [
    { id: "bass", name: "Percha / Bass", icon: "🐟" },
    { id: "salmon", name: "Salmón / Salmon", icon: "🍣" },
    { id: "shark", name: "Tiburón / Shark", icon: "🦈" },
    { id: "goldfish", name: "Pez Dorado / Goldfish", icon: "🐠" },
    { id: "whale", name: "Ballena / Whale", icon: "🐋" },
]

export function SettingsForm({ initialUsername, initialAvatar, initialFavoriteFish }: SettingsFormProps) {
    const { t, language } = useLanguage()
    const [username, setUsername] = useState(initialUsername)
    const [avatar, setAvatar] = useState(initialAvatar || "cat")
    const [favoriteFish, setFavoriteFish] = useState(initialFavoriteFish || "")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const supabase = createClient()

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const forbiddenUsernames = ["test", "admin", "help", "helpop", "staff", "moderator", "owner"]
        if (forbiddenUsernames.includes(username.toLowerCase())) {
            toast.error(t.auth.forbiddenUsernameError)
            setLoading(false)
            return
        }

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("No user found")

            // Update auth metadata
            const { error: authError } = await supabase.auth.updateUser({
                data: {
                    username: username,
                    avatar_url: avatar
                }
            })

            if (authError) throw authError

            // Update profiles table
            const { error: profileError } = await supabase
                .from("profiles")
                .update({
                    username: username,
                    avatar_url: avatar,
                    favorite_fish: favoriteFish
                })
                .eq("id", user.id)

            if (profileError) {
                console.error("Profile update error:", profileError)
            }

            toast.success(language === "es" ? "Perfil actualizado" : "Profile updated successfully")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!password) return
        if (password !== confirmPassword) {
            toast.error(language === "es" ? "Las contraseñas no coinciden" : "Passwords do not match")
            return
        }

        setPasswordLoading(true)
        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            toast.success(language === "es" ? "Contraseña actualizada" : "Password updated successfully")
            setPassword("")
            setConfirmPassword("")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setPasswordLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <Card className="border-primary/20 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle>{t.settings.profile}</CardTitle>
                            <CardDescription>{t.settings.profileDesc}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="space-y-2 text-left">
                            <Label htmlFor="username" className="text-foreground font-semibold ml-1">
                                {t.settings.newUsername}
                            </Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-background/50 border-primary/20 focus:border-primary transition-all h-12"
                                placeholder="PescadorEjemplo"
                            />
                        </div>

                        <div className="space-y-3 text-left">
                            <Label className="text-foreground font-semibold ml-1">{t.settings.avatarLabel}</Label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {AVATARS.map((av) => (
                                    <button
                                        key={av.id}
                                        type="button"
                                        onClick={() => setAvatar(av.id)}
                                        className={`w-full aspect-square text-3xl flex items-center justify-center rounded-xl border-2 transition-all ${avatar === av.id
                                            ? "border-primary bg-primary/20 shadow-lg scale-110"
                                            : "border-border bg-background/50 hover:border-primary/50"
                                            }`}
                                        title={av.name}
                                    >
                                        {av.icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 text-left">
                            <Label htmlFor="favoriteFish" className="text-foreground font-semibold ml-1">
                                {t.settings.favoriteFishLabel}
                            </Label>
                            <select
                                id="favoriteFish"
                                value={favoriteFish}
                                onChange={(e) => setFavoriteFish(e.target.value)}
                                className="w-full h-12 px-4 rounded-md border border-primary/20 bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                            >
                                <option value="">{t.settings.selectFish}</option>
                                {FISH_OPTIONS.map((fish) => (
                                    <option key={fish.id} value={fish.id}>
                                        {fish.icon} {fish.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 font-bold text-lg shadow-lg shadow-primary/20"
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <CheckCircle2 className="mr-2 h-5 w-5" />
                            )}
                            {t.settings.updateBtn}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card className="border-accent/20 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                            <Lock className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                            <CardTitle>{t.settings.security}</CardTitle>
                            <CardDescription>{t.settings.securityDesc}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="space-y-4 pb-2">
                            <div className="space-y-2 text-left">
                                <Label htmlFor="passwordNew" className="text-foreground font-semibold ml-1">
                                    {t.settings.newPassword}
                                </Label>
                                <Input
                                    id="passwordNew"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-background/50 border-accent/20 focus:border-accent transition-all h-12"
                                />
                            </div>
                            <div className="space-y-2 text-left">
                                <Label htmlFor="confirmPassword" className="text-foreground font-semibold ml-1">
                                    {t.settings.confirmPassword}
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-background/50 border-accent/20 focus:border-accent transition-all h-12"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={passwordLoading || !password}
                            className="w-full h-12 font-bold text-lg bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                        >
                            {passwordLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Lock className="mr-2 h-5 w-5" />
                            )}
                            {t.settings.changePasswordBtn}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
