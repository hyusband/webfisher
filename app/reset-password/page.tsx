"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Lock, Loader2, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { toast } from "sonner"

export default function ResetPasswordPage() {
    const { t } = useLanguage()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError(t.auth.passwordsMatchError)
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            // Mock: in a real implementation you would send the token from the URL and the new password
            // to an API endpoint like /api/auth/reset-password-confirm
            toast.success(t.nav.logout === "Cerrar sesión" ? "Contraseña actualizada con éxito (Mock)" : "Password updated successfully (Mock)")
            router.push("/login")
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-accent/5 relative">
            <div className="w-full max-w-md">
                <Card className="shadow-2xl border border-accent/30 bg-card/95 backdrop-blur-xl">
                    <CardHeader className="space-y-1 text-center pb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 bg-accent/20 border-2 border-accent/30 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
                                🛡️
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-black text-foreground text-balance">
                            {t.auth.resetPasswordTitle || "Nueva Contraseña"}
                        </CardTitle>
                        <CardDescription className="text-base text-muted-foreground text-balance">
                            {t.auth.resetPasswordSubtitle || "Ingresa tu nueva contraseña para recuperar el acceso"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdatePassword} className="space-y-5">
                            <div className="space-y-2 text-left">
                                <Label htmlFor="password" title="password" className="text-foreground font-semibold">
                                    {t.auth.newPasswordLabel || "Nueva Contraseña"}
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 border-accent/30 focus:border-accent bg-background/50 h-12"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <Label htmlFor="confirmPassword" title="confirmPassword" className="text-foreground font-semibold">
                                    {t.auth.repeatPasswordLabel}
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-10 border-accent/30 focus:border-accent bg-background/50 h-12"
                                    />
                                </div>
                            </div>
                            {error && (
                                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
                                    <p className="text-sm font-semibold text-destructive-foreground">{error}</p>
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 text-lg shadow-2xl"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : (
                                    t.settings.changePasswordBtn
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
