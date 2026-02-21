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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: '#1a1b26', color: '#c0caf5', minHeight: '100vh' }}>
        <Navbar />
        <main>{children}</main>
        <footer style={{ borderTop: '1px solid #292e42', padding: '2rem', textAlign: 'center', color: '#7aa2c8', fontSize: '0.875rem', marginTop: '4rem' }}>
          <span style={{ color: '#bb9af7', fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' }}>RuneGraph</span>
          {' '}— Inscribe. Invoke. Trust. · Open Source
        </footer>
      </body>
    </html>
  )
}
