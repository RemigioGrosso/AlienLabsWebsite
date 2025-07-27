import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alien Labs - Creative Technology Company',
  description: 'Alien Labs is a creative technology company showcasing innovative projects and team personality through social media integration.',
  keywords: ['creative technology', 'innovation', 'projects', 'team', 'social media'],
  authors: [{ name: 'Alien Labs' }],
  creator: 'Alien Labs',
  openGraph: {
    title: 'Alien Labs - Creative Technology Company',
    description: 'Alien Labs is a creative technology company showcasing innovative projects and team personality through social media integration.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alien Labs - Creative Technology Company',
    description: 'Alien Labs is a creative technology company showcasing innovative projects and team personality through social media integration.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1a2e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black font-win95 text-earthy-light h-screen overflow-hidden crt-monitor">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 win95-button z-50"
        >
          Skip to main content
        </a>
        
        {/* Windows 95 Desktop Layout - Simple */}
        <div className="h-screen w-screen bg-black overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}