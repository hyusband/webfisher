"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { useLanguage } from "@/components/language-context"

export const Partners = () => {
    const { t } = useLanguage()

    const partners = [
        {
            name: "2ang15",
            platform: "TikTok",
            url: "https://www.tiktok.com/@2ang15",
            avatar: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f2c7a7a5a8a1c9a1a8a1c9a1a8a1c9a1~c5_100x100.jpeg?x-expires=1735232400&x-signature=...",
            description: "TikToker & Gamer"
        },
        {
            name: "maluko.rs",
            platform: "TikTok",
            url: "https://www.tiktok.com/@maluko.rs",
            avatar: "", // Placeholder
            description: "TikToker & Gamer"
        },
    ]

    return (
        <section className="container mx-auto px-4 py-16">
            <ScrollReveal>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t.partners.title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t.partners.description}
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {partners.map((partner, index) => (
                    <ScrollReveal key={partner.name} delay={index * 0.1}>
                        <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-all shadow-lg hover:shadow-2xl text-center block"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all"></div>
                                <div className="relative w-24 h-24 rounded-full border-4 border-primary/20 overflow-hidden bg-muted flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                                    👤
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-1">@{partner.name}</h3>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
                                {partner.platform}
                            </p>
                            <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                Ver Perfil
                            </div>
                        </a>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    )
}
