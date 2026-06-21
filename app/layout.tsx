import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { LanguageProvider } from "@/components/language-context"
import { Toaster } from "sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WEBFISHER - Únete a la aventura",
  description: "Juego de pesca relajante y social. Crea tu cuenta y empieza a pescar.",
  generator: "v0.app",
  metadataBase: new URL("https://webfisher.online"), // Replace with actual URL if known
  openGraph: {
    title: "WEBFISHER - Únete a la aventura",
    description: "Multiplayer chatroom-focused fishing game! Relax and fish.",
    url: "https://webfisher.online",
    siteName: "WEBFISHER",
    images: [
      {
        url: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3146520/capsule_617x353.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WEBFISHER - Únete a la aventura",
    description: "Relax and fish on the web!",
    images: ["https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3146520/capsule_617x353.jpg"],
  },
  icons: {
    icon: "/image.png",
    apple: "/image.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <Toaster position="top-center" richColors />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
