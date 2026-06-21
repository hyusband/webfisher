"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/lib/translations"

type Language = "es" | "en"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: typeof translations.es
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("es")

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language
        if (savedLang && (savedLang === "es" || savedLang === "en")) {
            setLanguageState(savedLang)
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language || navigator.languages?.[0] || ""
            if (browserLang.toLowerCase().startsWith("es")) {
                setLanguageState("es")
            } else {
                // If it's anything else (English, French, etc), default to English
                setLanguageState("en")
            }
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
    }

    const t = translations[language]

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
