'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/runes',        label: 'Runes' },
  { href: '/skills',       label: 'Skills' },
  { href: '/runes/build',  label: 'Build' },
  { href: '/strategy',     label: 'Strategy' },
]

export function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="rg-navbar" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}
        onClick={() => setOpen(false)}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <defs>
            <linearGradient id="rg-grad" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c9a8ff"/>
              <stop offset="100%" stopColor="#8ab4ff"/>
            </linearGradient>
          </defs>
          {/* Hexagon border */}
          <polygon points="13,1.5 22.6,7 22.6,19 13,24.5 3.4,19 3.4,7"
            stroke="url(#rg-grad)" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
          {/* Static dim half-lines (base) */}
          <line x1="13"   y1="1.5"  x2="13"   y2="13"   stroke="#c9a8ff" strokeWidth="0.7" opacity="0.15"/>
          <line x1="13"   y1="24.5" x2="13"   y2="13"   stroke="#c9a8ff" strokeWidth="0.7" opacity="0.15"/>
          <line x1="22.6" y1="7"    x2="13"   y2="13"   stroke="#c9a8ff" strokeWidth="0.7" opacity="0.15"/>
          <line x1="3.4"  y1="19"   x2="13"   y2="13"   stroke="#c9a8ff" strokeWidth="0.7" opacity="0.15"/>
          <line x1="22.6" y1="19"   x2="13"   y2="13"   stroke="#c9a8ff" strokeWidth="0.7" opacity="0.15"/>
          <line x1="3.4"  y1="7"    x2="13"   y2="13"   stroke="#c9a8ff" strokeWidth="0.7" opacity="0.15"/>
          {/* Animated spark half-lines — all converge to center simultaneously */}
          <line x1="13"   y1="1.5"  x2="13"   y2="13"   stroke="#c9a8ff" strokeWidth="1.2" className="rg-logo-spark"/>
          <line x1="13"   y1="24.5" x2="13"   y2="13"   stroke="#c9a8ff" strokeWidth="1.2" className="rg-logo-spark"/>
          <line x1="22.6" y1="7"    x2="13"   y2="13"   stroke="#8ab4ff" strokeWidth="1.2" className="rg-logo-spark"/>
          <line x1="3.4"  y1="19"   x2="13"   y2="13"   stroke="#8ab4ff" strokeWidth="1.2" className="rg-logo-spark"/>
          <line x1="22.6" y1="19"   x2="13"   y2="13"   stroke="#8ab4ff" strokeWidth="1.2" className="rg-logo-spark"/>
          <line x1="3.4"  y1="7"    x2="13"   y2="13"   stroke="#c9a8ff" strokeWidth="1.2" className="rg-logo-spark"/>
          {/* Center glow halo */}
          <circle cx="13" cy="13" r="3.5" fill="none" stroke="#c9a8ff" strokeWidth="0.8" className="rg-logo-halo"/>
          {/* Center dot */}
          <circle cx="13" cy="13" r="2.2" fill="url(#rg-grad)" className="rg-logo-center-dot"/>
          {/* Vertex nodes */}
          <circle cx="13"   cy="1.5"  r="1.2" fill="#c9a8ff" opacity="0.7"/>
          <circle cx="22.6" cy="7"    r="1.2" fill="#8ab4ff" opacity="0.7"/>
          <circle cx="22.6" cy="19"   r="1.2" fill="#8ab4ff" opacity="0.7"/>
          <circle cx="13"   cy="24.5" r="1.2" fill="#c9a8ff" opacity="0.7"/>
          <circle cx="3.4"  cy="19"   r="1.2" fill="#c9a8ff" opacity="0.7"/>
          <circle cx="3.4"  cy="7"    r="1.2" fill="#c9a8ff" opacity="0.7"/>
        </svg>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#c9a8ff',
          fontSize: '1.1rem', letterSpacing: '0.06em', textTransform: 'uppercase',
          textShadow: '0 0 18px rgba(201,168,255,0.35)',
        }}>RuneHub</span>
      </Link>

      {/* Desktop nav links */}
      <div className={`rg-nav-links${open ? ' open' : ''}`}>
        {links.map(l => {
          const active = path === l.href
            || (l.href === '/runes' && path.startsWith('/runes') && path !== '/runes/build' && !path.startsWith('/runes/build'))
            || (l.href !== '/runes' && l.href !== '/runes/build' && path.startsWith(l.href))
            || (l.href === '/runes/build' && path === '/runes/build')
          return (
            <Link key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding: '0.4rem 0.85rem', borderRadius: '6px', textDecoration: 'none',
                fontSize: '0.825rem', fontWeight: 600,
                fontFamily: "'Inter', -apple-system, sans-serif",
                color: active ? '#bb9af7' : '#9aa4d2',
                background: active ? 'rgba(187,154,247,0.12)' : 'transparent',
                border: active ? '1px solid rgba(187,154,247,0.3)' : 'none',
                transition: 'all 0.15s',
                boxShadow: 'none',
              }}
            >{l.label}</Link>
          )
        })}
      </div>

      {/* Right side: GitHub + hamburger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <a href="https://github.com/seojoonkim/rune-hub" target="_blank" rel="noreferrer"
          style={{ fontSize: '0.78rem', color: '#8ab4e0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: "'Inter', sans-serif" }}>
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          <span className="rg-github-text">GitHub</span>
        </a>

        {/* Hamburger — shown only on mobile via CSS */}
        <button
          className="rg-hamburger"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  )
}
