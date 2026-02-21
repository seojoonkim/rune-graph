import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'RuneGraph — Inscribe. Invoke. Trust.',
  description: 'AI Agent Skill Orchestration Marketplace. See how skills connect. Build what matters.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: '#1a1b26', color: '#dde4fc', minHeight: '100vh' }}>
        <Navbar />
        <main>{children}</main>
        <footer className="rg-footer" style={{ borderTop: '1px solid #292e42', textAlign: 'center', color: '#8ab4e0', fontSize: '0.875rem' }}>
          <span style={{ color: '#bb9af7', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '0.06em' }}>RuneGraph</span>
          {' '}— Inscribe. Invoke. Trust. · Open Source
        </footer>
      </body>
    </html>
  )
}
