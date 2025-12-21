"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { Heart, Upload, MessageSquare, ArrowLeft, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

const MOCK_POSTS = [
    { id: 1, user: "MasterFisher", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800", caption: "¡Atrapé mi primer tiburón! 🦈", likes: 24, avatar: "🐱" },
    { id: 2, user: "NemoPro", image: "https://images.unsplash.com/photo-1524704659690-3f7a3fe41ea2?q=80&w=800", caption: "Relajándome en el muelle... 🌊", likes: 12, avatar: "🐶" },
    { id: 3, user: "SeaQueen", image: "https://images.unsplash.com/photo-1504470695779-75300268aa0e?q=80&w=800", caption: "Lugar secreto encontrado ✨", likes: 45, avatar: "🦊" },
]

export default function GalleryPage() {
    const { t } = useLanguage()
    const [posts] = useState(MOCK_POSTS)

    return (
        <div className="min-h-screen bg-background pb-20">
            <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-xl shadow-lg">
                            🎣
                        </div>
                        <span className="text-xl font-extrabold text-foreground hidden sm:block uppercase tracking-tighter">Webfisher Gallery</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <LanguageToggle />
                        <Button asChild variant="ghost" className="font-bold text-muted-foreground hover:text-foreground">
                            <Link href="/dashboard" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-foreground mb-2 flex items-center gap-4">
                            <span className="text-primary"><ImageIcon className="h-10 w-10" /></span>
                            {t.dashboard.gallery.title}
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            {t.dashboard.gallery.desc}
                        </p>
                    </div>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl shadow-primary/20 h-14 px-8">
                        <Upload className="mr-2 h-5 w-5" />
                        {t.dashboard.gallery.uploadBtn}
                    </Button>
                </div>

                <div className="grid gap-12">
                    {posts.map((post) => (
                        <Card key={post.id} className="border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-primary/5 transition-all group">
                            <CardHeader className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/20 border-2 border-primary/30 rounded-full flex items-center justify-center text-2xl shadow-lg">
                                        {post.avatar === "dog" ? "🐶" : post.avatar === "fox" ? "🦊" : "🐱"}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">{post.user}</h3>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold font-mono">{t.dashboard.gallery.anglerLevel} 24</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="aspect-video relative overflow-hidden bg-muted">
                                    <img
                                        src={post.image}
                                        alt={post.caption}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-6 space-y-4">
                                    <p className="text-xl font-medium text-foreground leading-relaxed">
                                        {post.caption}
                                    </p>
                                    <div className="flex items-center gap-6 pt-2 border-t border-border/50">
                                        <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group/btn">
                                            <div className="p-2 bg-muted rounded-full group-hover/btn:bg-red-500/10">
                                                <Heart className="h-5 w-5 group-hover/btn:fill-current" />
                                            </div>
                                            <span className="font-bold">{post.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/btn">
                                            <div className="p-2 bg-muted rounded-full group-hover/btn:bg-primary/10">
                                                <MessageSquare className="h-5 w-5" />
                                            </div>
                                            <span className="font-bold">8</span>
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
