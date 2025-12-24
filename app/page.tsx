"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download, Users, Fish, Trophy, Gamepad2 } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useLanguage } from "@/components/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { DOWNLOAD_CONFIG } from "@/lib/constants"
import { Partners } from "@/components/home/partners"


export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-2xl shadow-lg border-2 border-primary/20">
              🐱
            </div>
            <span className="text-xl font-bold text-foreground">WEBFISHER</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Link href="/login">{t.nav.login}</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              <Link href="/registro">{t.nav.register}</Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="right" className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-500/30">
              <Gamepad2 className="h-3.5 w-3.5" />
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight text-balance">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-6 py-5 shadow-2xl h-auto"
              >
                <Link href={DOWNLOAD_CONFIG.url} download>
                  <Download className="mr-2 h-5 w-5" />
                  {t.hero.download}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-foreground hover:bg-primary/10 font-bold text-base px-6 py-5 bg-transparent h-auto"
              >
                <Link href="/registro">{t.hero.createAccount}</Link>
              </Button>
            </div>

            <div className="flex items-center gap-5 pt-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-xs">
                  ✓
                </div>
                <span className="font-semibold text-green-400 text-sm">{t.hero.features[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-xs">
                  ✓
                </div>
                <span className="font-semibold text-sm">{t.hero.features[1]}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                  ✓
                </div>
                <span className="font-semibold text-sm">{t.hero.features[2]}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative">
              <div className="aspect-video bg-card rounded-2xl shadow-2xl overflow-hidden border border-border flex items-center justify-center">
                <video
                  src="/Webfisher Release Trailer.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-8 text-balance">{t.gameplay.title}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="aspect-video bg-card rounded-xl overflow-hidden border border-border shadow-xl mb-6 max-w-4xl mx-auto flex items-center justify-center">
            <img
              src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3146520/ss_70029d85f6aef4143b58a55b27824c278e14cbd9.1920x1080.jpg?t=1728673229"
              alt="WEBFISHER Gameplay"
              className="w-full h-full object-cover"
            />
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <ScrollReveal direction="right" delay={0.3}>
            <div className="aspect-video bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3146520/ss_8f5fe32a52b871c584f11416baf40634d17e72ee.1920x1080.jpg?t=1728673229"
                alt="WEBFISHER Screenshot"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.4}>
            <div className="aspect-video bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3146520/ss_d1fdc753a7dc005896e239ea5ea055618a744bb6.1920x1080.jpg?t=1728673229"
                alt="WEBFISHER Screenshot 2"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-8 text-balance">
            {t.whyPlay.title}
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal delay={0.1}>
            <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all shadow-lg hover:shadow-2xl h-full text-left">
              <div className="w-12 h-12 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center mb-4">
                <Fish className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t.whyPlay.feature1.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.whyPlay.feature1.desc}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-card rounded-2xl p-6 border border-border hover:border-accent/50 transition-all shadow-lg hover:shadow-2xl h-full text-left">
              <div className="w-12 h-12 bg-accent/20 border border-accent/30 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t.whyPlay.feature2.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.whyPlay.feature2.desc}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all shadow-lg hover:shadow-2xl h-full text-left">
              <div className="w-12 h-12 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t.whyPlay.feature3.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.whyPlay.feature3.desc}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <ScrollReveal direction="none">
          <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border border-primary/30 rounded-3xl p-10 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
              {t.cta.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto text-balance">
              {t.cta.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 shadow-2xl h-auto"
              >
                <Link href={DOWNLOAD_CONFIG.url} download>
                  <Download className="mr-2 h-5 w-5" />
                  {t.hero.download}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-foreground hover:bg-primary/10 font-bold text-lg px-8 py-6 bg-transparent h-auto"
              >
                <Link href="/registro">{t.cta.button}</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Partners />

      <footer className="border-t border-border bg-card/50 backdrop-blur-xl mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p className="font-semibold text-sm">WEBFISHER - Un juego de pesca relajante y social</p>
          <p className="text-xs mt-1">Desarrollado por lamedeveloper</p>
        </div>
      </footer>
    </div>
  )
}
