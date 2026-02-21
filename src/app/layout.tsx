import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'RuneGraph — Inscribe. Invoke. Trust.',
  description: 'AI Agent Skill Orchestration Marketplace. See how skills connect. Build what matters.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: '#0A0A0F', color: '#E2E2E8', minHeight: '100vh' }}>
        <Navbar />
        <main>{children}</main>
        <footer style={{ borderTop: '1px solid #2A2A35', padding: '2rem', textAlign: 'center', color: '#555', fontSize: '0.875rem', marginTop: '4rem' }}>
          <span style={{ color: '#8B5CF6', fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' }}>RuneGraph</span>
          {' '}— Inscribe. Invoke. Trust. · Open Source · Free Forever
        </footer>
      </body>
    </html>
  )
}
