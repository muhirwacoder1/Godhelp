import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

import { MobileNav } from "@/components/mobile-nav"
import { LanguageProvider } from "@/context/language-context"
import { TTSProvider } from "@/context/tts-context"
import { FloatingReadAloudButton } from "@/components/read-aloud-button"
import { AutoTTSContainer } from "@/hooks/use-auto-tts"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "GodHelp - Health Dashboard",
  description: "Modern mobile health monitoring for foot pressure and vital signs",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <TTSProvider>
              <div className="flex h-screen bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F0F4F8]">

              
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden bg-transparent">
                {/* Mobile Interface - Now visible on all screens */}
                <MobileNav />
                
                {/* Page Content */}
                <div className="flex-1 overflow-auto pb-32">
                  <AutoTTSContainer>
                    {children}
                  </AutoTTSContainer>
                </div>
              </div>
              
              {/* Floating Read Aloud Button */}
              <FloatingReadAloudButton />
            </div>
            </TTSProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

