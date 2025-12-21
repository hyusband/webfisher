"use client"

import { useLanguage } from "@/components/language-context"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
        >
            <Languages className="h-4 w-4" />
            <span className="font-bold uppercase text-[10px] bg-primary/20 px-1.5 py-0.5 rounded text-primary">
                {language}
            </span>
        </Button>
    )
}
