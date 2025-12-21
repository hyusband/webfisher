"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { sendDiscordNotification } from "@/lib/discord-webhook"
import { useLanguage } from "@/components/language-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function VerificarEmailPage() {
  const { t } = useLanguage()

  useEffect(() => {
    const logVerification = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await sendDiscordNotification(
          user.user_metadata?.username || "Usuario",
          user.email || "Sin email",
          undefined,
          "Verificación"
        )
      }
    }
    logVerification()
  }, [])

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
              <div className="w-24 h-24 bg-primary/20 border-2 border-primary/30 rounded-2xl flex items-center justify-center shadow-2xl">
                <Mail className="h-12 w-12 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-black text-foreground text-balance">{t.auth.verifyTitle}</CardTitle>
            <CardDescription className="text-base text-muted-foreground text-balance">
              {t.auth.verifySubtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/30 border border-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-bold">1</span>
                </div>
                <p className="text-sm text-foreground text-balance">
                  {t.auth.verifyStep1}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/30 border border-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-bold">2</span>
                </div>
                <p className="text-sm text-foreground text-balance">
                  {t.auth.verifyStep2}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/30 border border-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-sm font-bold">!</span>
                </div>
                <p className="text-sm text-foreground text-balance">
                  {t.auth.verifyStep3}
                </p>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg shadow-2xl"
            >
              <Link href="/login">{t.auth.goToLogin}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
