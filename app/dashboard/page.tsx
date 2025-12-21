"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Settings,
  LogOut,
  Download,
  Mail,
  Shield,
  Trophy,
  Image as ImageIcon
} from "lucide-react"
import Link from "next/link"
import { SettingsForm } from "@/components/dashboard/settings-form"
import { useLanguage } from "@/components/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { Fishdex } from "@/components/dashboard/fishdex"
import { Leaderboards } from "@/components/dashboard/leaderboards"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { t, language } = useLanguage()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = "/login"
        return
      }
      setUser(user)

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
      setProfile(profile)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-bounce text-5xl">🎣</div>
    </div>
  )

  const displayName = profile?.username || user?.user_metadata?.username || "Pescador"

  // Achievements data
  const achievements = [
    { title: t.dashboard.achievementsList.noviceAnglerTitle, desc: t.dashboard.achievementsList.noviceAnglerDesc, completed: true },
    { title: t.dashboard.achievementsList.collectorTitle, desc: t.dashboard.achievementsList.collectorDesc, completed: false },
    { title: t.dashboard.achievementsList.citySharkTitle, desc: t.dashboard.achievementsList.citySharkDesc, completed: false },
    { title: t.dashboard.achievementsList.rodMasterTitle, desc: t.dashboard.achievementsList.rodMasterDesc, completed: false }
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-2xl shadow-lg border-2 border-primary/20">
              🐱
            </div>
            <span className="text-xl font-extrabold text-foreground hidden sm:block tracking-tighter uppercase">Webfisher</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="font-bold border-red-500/20 text-muted-foreground hover:text-red-500 hover:bg-red-500/5"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t.nav.logout}
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <TabsList className="bg-muted/50 p-1 rounded-2xl inline-flex w-auto min-w-full md:min-w-0">
              <TabsTrigger value="overview" className="gap-2 px-6">
                <User className="h-4 w-4" />
                {t.nav.overview}
              </TabsTrigger>
              <TabsTrigger value="fishdex" className="gap-2 px-6">
                <span className="text-lg">🐟</span>
                {t.dashboard.tabs.fishdex}
              </TabsTrigger>
              <TabsTrigger value="gallery" className="gap-2 px-6">
                <ImageIcon className="h-4 w-4" />
                {t.dashboard.tabs.gallery}
              </TabsTrigger>
              <TabsTrigger value="leaderboards" className="gap-2 px-6">
                <Trophy className="h-4 w-4" />
                {t.dashboard.tabs.ranking}
              </TabsTrigger>
              {profile?.is_admin && (
                <TabsTrigger value="admin" className="gap-2 px-6 text-red-500">
                  <Shield className="h-4 w-4" />
                  {t.dashboard.tabs.admin}
                </TabsTrigger>
              )}
              <TabsTrigger value="settings" className="gap-2 px-6">
                <Settings className="h-4 w-4" />
                {t.nav.settings}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Profile Overview */}
              <Card className="shadow-2xl border border-primary/30 bg-card/95 backdrop-blur-xl overflow-hidden text-center">
                <div className="bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border-b border-primary/30 p-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 bg-primary/30 border-2 border-primary rounded-2xl flex items-center justify-center text-5xl shadow-2xl relative">
                      {profile?.avatar_url === "dog" ? "🐶" :
                        profile?.avatar_url === "raccoon" ? "🦝" :
                          profile?.avatar_url === "fox" ? "🦊" :
                            profile?.avatar_url === "frog" ? "🐸" :
                              profile?.avatar_url === "bear" ? "🐻" : "🐱"}
                      <div className="absolute -bottom-2 -right-2 bg-background border border-primary p-1 rounded-full text-sm">
                        🎣
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-4xl font-black text-foreground mb-2">
                    {t.dashboard.welcome.replace('{name}', displayName)}
                  </CardTitle>
                  <p className="text-muted-foreground font-medium">{t.dashboard.subtitle}</p>
                </div>
                <CardContent className="p-8 space-y-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border/50">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <span className="font-bold text-muted-foreground">{t.dashboard.user}</span>
                      </div>
                      <span className="font-black text-foreground">{displayName}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border/50">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="font-bold text-muted-foreground">{t.dashboard.email}</span>
                      </div>
                      <span className="font-black text-foreground truncate max-w-[180px]">{user?.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements & Download Section */}
              <div className="space-y-8">
                <Card className="shadow-xl border-accent/20 bg-card/90">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Trophy className="h-6 w-6 text-accent" />
                      <div>
                        <CardTitle>{t.dashboard.achievements}</CardTitle>
                        <CardDescription>{t.dashboard.achievementsDesc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.title}
                          className={`p-4 rounded-xl border transition-all ${achievement.completed
                            ? "bg-accent/10 border-accent/30 shadow-inner"
                            : "bg-muted/30 border-border opacity-50"
                            }`}
                        >
                          <div className="text-2xl mb-2">{achievement.completed ? "🏆" : "🔒"}</div>
                          <div className={`font-black text-sm ${achievement.completed ? "text-accent" : "text-muted-foreground"}`}>
                            {achievement.title}
                          </div>
                          {achievement.completed && (
                            <div className="text-[10px] font-bold text-accent/70 uppercase pt-1">
                              {t.dashboard.achievementsList.completed}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Download className="h-32 w-32" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-black">{t.dashboard.downloadTitle}</CardTitle>
                    <CardDescription className="text-blue-100">{t.dashboard.downloadDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button asChild className="w-full bg-white text-blue-700 hover:bg-blue-50 h-12 font-black text-lg rounded-xl shadow-lg">
                      <a href="/download/WebFisher_x86 2.1.1.msi" download>
                        <Download className="mr-2 h-5 w-5" />
                        {t.dashboard.downloadBtn}
                      </a>
                    </Button>
                    <p className="text-[10px] text-blue-200 text-center font-bold uppercase tracking-widest">{t.dashboard.syncStats}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Fishing Zone Banner */}
            <div className="mt-8 relative h-48 rounded-3xl overflow-hidden group shadow-2xl">
              <img
                src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3146520/ss_8f5fe32a52b871c584f11416baf40634d17e72ee.1920x1080.jpg?t=1728673229"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Fishing"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-black text-white mb-2">{t.dashboard.fishingZone}</h3>
                <p className="text-blue-200 font-medium mb-4">{t.dashboard.fishingZoneDesc}</p>
                <div className="flex items-center gap-2 text-white/80 font-bold bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/20">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  {t.dashboard.fishingWait}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fishdex" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Fishdex caughtIds={["bass", "salmon", "shark"]} />
          </TabsContent>

          <TabsContent value="gallery" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center py-20 space-y-6 bg-card/30 rounded-3xl border border-dashed border-primary/30">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <ImageIcon className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{t.dashboard.gallery.title}</h3>
                <p className="text-muted-foreground">{t.dashboard.gallery.shareDesc}</p>
              </div>
              <Button asChild size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20">
                <Link href="/gallery">{t.dashboard.gallery.goGallery}</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="leaderboards" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Leaderboards />
          </TabsContent>

          {profile?.is_admin && (
            <TabsContent value="admin" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center py-20 space-y-6 bg-red-500/5 rounded-3xl border border-dashed border-red-500/30">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-10 w-10 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{t.dashboard.admin.title}</h3>
                  <p className="text-muted-foreground">{t.dashboard.admin.subtitle}</p>
                </div>
                <Button asChild size="lg" variant="destructive" className="rounded-full px-8 shadow-xl shadow-red-500/20">
                  <Link href="/admin">Enter Admin Zone</Link>
                </Button>
              </div>
            </TabsContent>
          )}

          <TabsContent value="settings" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SettingsForm
              initialUsername={displayName}
              initialAvatar={profile?.avatar_url || "cat"}
              initialFavoriteFish={profile?.favorite_fish || ""}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
