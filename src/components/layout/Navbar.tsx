'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/runes',    label: 'Runes' },
  { href: '/skills',   label: 'Skills' },
  { href: '/strategy', label: 'Strategy' },
]

export function Navbar() {
  const path = usePathname()
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1rem 2rem',
      borderBottom: '1px solid #292e42',
      background: 'rgba(10,10,15,0.97)',
      backdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 50,
      boxShadow: '0 1px 0 #16161e, 0 4px 20px rgba(0,0,0,0.4)',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}>
        {/* RuneGraph SVG mark: hexagon + inner graph nodes */}
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rg-grad" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c9a8ff"/>
              <stop offset="100%" stopColor="#8ab4ff"/>
            </linearGradient>
          </defs>
          {/* Hexagon outline */}
          <polygon
            points="13,1.5 22.6,7 22.6,19 13,24.5 3.4,19 3.4,7"
            stroke="url(#rg-grad)" strokeWidth="1.4" fill="none" strokeLinejoin="round"
          />
          {/* Inner cross lines (graph / rune feel) */}
          <line x1="13" y1="1.5"  x2="13" y2="24.5" stroke="#c9a8ff" strokeWidth="0.8" opacity="0.3"/>
          <line x1="3.4" y1="7"   x2="22.6" y2="19" stroke="#c9a8ff" strokeWidth="0.8" opacity="0.3"/>
          <line x1="22.6" y1="7"  x2="3.4"  y2="19" stroke="#c9a8ff" strokeWidth="0.8" opacity="0.3"/>
          {/* Center node */}
          <circle cx="13" cy="13" r="2.2" fill="url(#rg-grad)"/>
          {/* Corner nodes */}
          <circle cx="13"   cy="1.5"  r="1.2" fill="#c9a8ff" opacity="0.7"/>
          <circle cx="22.6" cy="7"    r="1.2" fill="#8ab4ff" opacity="0.7"/>
          <circle cx="22.6" cy="19"   r="1.2" fill="#8ab4ff" opacity="0.7"/>
          <circle cx="13"   cy="24.5" r="1.2" fill="#c9a8ff" opacity="0.7"/>
          <circle cx="3.4"  cy="19"   r="1.2" fill="#c9a8ff" opacity="0.7"/>
          <circle cx="3.4"  cy="7"    r="1.2" fill="#c9a8ff" opacity="0.7"/>
        </svg>
        <span style={{
          fontFamily: "'Cinzel', serif",
          fontWeight: 700,
          color: '#c9a8ff',
          fontSize: '1.05rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textShadow: '0 0 18px rgba(201,168,255,0.35)',
        }}>RuneGraph</span>
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {links.map(l => {
          const active = path.startsWith(l.href)
          return (
            <Link key={l.href} href={l.href} style={{
              padding: '0.4rem 0.85rem', borderRadius: '6px', textDecoration: 'none',
              fontSize: '0.825rem', fontWeight: 600,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: active ? '#bb9af7' : '#9aa4d2',
              background: active ? 'rgba(187,154,247,0.12)' : 'transparent',
              border: active ? '1px solid rgba(187,154,247,0.35)' : '1px solid transparent',
              transition: 'all 0.15s',
              boxShadow: active ? '0 0 10px rgba(187,154,247,0.15)' : 'none',
            }}>{l.label}</Link>
          )
        })}
      </div>

      {/* GitHub */}
      <a href="https://github.com/seojoonkim/rune-graph" target="_blank" rel="noreferrer"
        style={{ fontSize: '0.78rem', color: '#8ab4e0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        GitHub
      </a>
    </nav>
  )
}
