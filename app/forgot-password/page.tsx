"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function ForgotPasswordPage() {
    const { t } = useLanguage()
    const [email, setEmail] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })
            if (error) throw error
            setSuccess(true)
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-accent/5 relative">
            <div className="absolute top-4 left-4 flex items-center gap-4">
                <Link
                    href="/login"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    {t.nav.back}
                </Link>
                <LanguageToggle />
            </div>

            <div className="w-full max-w-md">
                <Card className="shadow-2xl border border-accent/30 bg-card/95 backdrop-blur-xl">
                    <CardHeader className="space-y-1 text-center pb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 bg-accent/20 border-2 border-accent/30 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
                                🔑
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-black text-foreground text-balance">
                            {t.auth.forgotPasswordTitle || "Recuperar Contraseña"}
                        </CardTitle>
                        <CardDescription className="text-base text-muted-foreground text-balance">
                            {t.auth.forgotPasswordSubtitle || "Ingresa tu email para recibir un enlace de recuperación"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {success ? (
                            <div className="space-y-6 text-center">
                                <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl flex items-center gap-3 justify-center">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <p className="text-sm font-semibold text-primary">
                                        {t.auth.resetEmailSent || "Email de recuperación enviado. Revisa tu bandeja de entrada."}
                                    </p>
                                </div>
                                <Button asChild className="w-full h-12">
                                    <Link href="/login">{t.auth.goToLogin}</Link>
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleResetPassword} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground font-semibold">
                                        {t.auth.emailLabel}
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                        "Enviar Enlace"
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
