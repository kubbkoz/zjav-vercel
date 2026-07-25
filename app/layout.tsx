import React from "react"
import type { Metadata } from 'next'
import { Inter, Oxanium, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const oxanium = Oxanium({ 
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: '--font-oxanium',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false, // not critical path
});

const siteUrl = 'https://zjav.sk'
const siteName = 'ZJAV_'
const title = 'ZJAV_ — Prototyp webu ZADARMO do 24 hodín'
const description = 'Chcete viac zákazníkov? Zviditeľníme vaše podnikanie. Nezáväzný náhľad webu zadarmo, hotový web do 7 dní. Rýchle a spoľahlivé weby na mieru.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    'tvorba webstránok',
    'webstránky na mieru',
    'tvorba e-shopu',
    'Shopware 6',
    'Next.js web',
    'firemný web Slovensko',
    'web zadarmo',
    'web do 7 dní',
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  category: 'technology',
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    url: siteUrl,
    siteName,
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.png',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport = {
  themeColor: '#06080D',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      image: `${siteUrl}/opengraph-image`,
      description,
      email: 'hello@zjav.sk',
      telephone: '+421918564238',
      areaServed: {
        '@type': 'Country',
        name: 'Slovensko',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Suchá Hora 143',
        addressLocality: 'Suchá Hora',
        addressCountry: 'SK',
      },
      identifier: {
        '@type': 'PropertyValue',
        name: 'IČO',
        value: '50532596',
      },
      sameAs: ['https://github.com/kubbkoz'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'sk-SK',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sk" className="bg-background">
      <head suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body className={`${inter.variable} ${oxanium.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
