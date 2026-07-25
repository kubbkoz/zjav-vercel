import React from "react"
import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: '--font-space-grotesk'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'ZJAV_ — Prototyp webu ZADARMO do 24 hodín',
  description: 'Chcete viac zákazníkov? Zviditeľníme vaše podnikanie. Nezáväzný náhľad webu zadarmo, hotový web do 7 dní. Rýchle a spoľahlivé weby na mieru.',
  generator: 'v0.app',
}

export const viewport = {
  themeColor: '#06080D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sk" className="bg-background">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
