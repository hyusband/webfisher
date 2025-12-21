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
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/dashboard")
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
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          {t.nav.back}
        </Link>
        <LanguageToggle />
      </div>

      <div className="w-full max-w-md">
        < Card className="shadow-2xl border border-accent/30 bg-card/95 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-accent/20 border-2 border-accent/30 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
                🎣
              </div>
            </div>
            <CardTitle className="text-3xl font-black text-foreground text-balance">{t.auth.loginTitle}</CardTitle>
            <CardDescription className="text-base text-muted-foreground text-balance">
              {t.auth.loginSubtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
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
                  className="border-accent/30 focus:border-accent bg-background/50 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-semibold">
                  {t.auth.passwordLabel}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t.auth.passwordPlaceholder}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-accent/30 focus:border-accent bg-background/50 h-12"
                />
                <div className="flex justify-end pr-1">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    {t.auth.forgotPassword}
                  </Link>
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
                {isLoading ? t.auth.loggingIn : t.auth.loginBtn}
              </Button>
              <div className="text-center text-sm pt-2">
                <span className="text-muted-foreground">{t.auth.noAccount} </span>
                <Link
                  href="/registro"
                  className="font-bold text-accent hover:text-accent/80 underline underline-offset-4"
                >
                  {t.auth.registerLink}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
