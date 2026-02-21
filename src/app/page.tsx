import Link from 'next/link'
import { RUNES, FULL_GRAPH } from '@/data/runes'
import { RuneCard } from '@/components/ui/RuneCard'

export default function Home() {
  const stats = [
    { value: RUNES.length,              label: 'Runes' },
    { value: FULL_GRAPH.nodes.length,   label: 'Skills' },
    { value: FULL_GRAPH.edges.length,   label: 'Connections' },
    { value: '∞',                        label: 'Possibilities' },
  ]

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '7rem 2rem 5rem', position: 'relative', overflow: 'hidden', minHeight: '580px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* BG image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero-forge.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 30%', zIndex: 0 }} />
        {/* Dark overlay: top-heavy so text stays readable */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,27,38,0.82) 0%, rgba(26,27,38,0.6) 45%, rgba(26,27,38,0.92) 100%)', zIndex: 1 }} />
        {/* Subtle purple center glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(187,154,247,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 2 }} />

        {/* Hero content — above overlays */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(187,154,247,0.12)', border: '1px solid rgba(187,154,247,0.35)', borderRadius: '100px', padding: '0.35rem 1.1rem', fontSize: '0.78rem', color: '#bb9af7', marginBottom: '2rem', letterSpacing: '0.05em', backdropFilter: 'blur(4px)' }}>
            🔮 Open Source · Free Forever
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 1.25rem', fontFamily: "'Cinzel', serif", textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            <span style={{ color: '#c0caf5' }}>Inscribe.</span>{' '}
            <span style={{ color: '#bb9af7', textShadow: '0 0 40px rgba(187,154,247,0.6)' }}>Invoke.</span>{' '}
            <span style={{ color: '#ff9e64', textShadow: '0 0 40px rgba(255,158,100,0.5)' }}>Trust.</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#a9b1d6', maxWidth: '500px', margin: '0 auto 1rem', lineHeight: 1.7 }}>
            See how AI skills connect. Build verified workflows. Share with the world.
          </p>
          <p style={{ fontSize: '0.85rem', color: '#565f89', marginBottom: '2.5rem', fontStyle: 'italic' }}>
            Skills are ingredients · Runes are recipes · Graph is the map
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/runes" style={{
              padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #9d7cd8, #bb9af7)',
              color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700,
              fontSize: '0.95rem', boxShadow: '0 0 28px rgba(187,154,247,0.5)',
              fontFamily: "'Cinzel', serif", letterSpacing: '0.05em',
            }}>
              Explore Runes →
            </Link>
            <Link href="/skills" style={{
              padding: '0.8rem 2rem', background: 'rgba(26,27,38,0.6)',
              color: '#bb9af7', border: '1px solid rgba(187,154,247,0.45)',
              borderRadius: '8px', textDecoration: 'none', fontWeight: 600,
              fontSize: '0.95rem', backdropFilter: 'blur(4px)',
            }}>
              Browse Skills
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '3rem', padding: '2rem', flexWrap: 'wrap', borderTop: '1px solid #1f2335', borderBottom: '1px solid #1f2335', background: '#16161e' }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#bb9af7', fontFamily: "'Cinzel', serif" }}>{s.value}</div>
            <div style={{ fontSize: '0.7rem', color: '#565f89', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── What is a Rune? ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#bb9af7', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>The Core Concept</p>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#c0caf5', marginBottom: '0.75rem', fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>What is a Rune?</h2>
        <p style={{ textAlign: 'center', color: '#7982a9', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
          A Rune is a verified, composable AI workflow — a recipe that chains multiple skills into one reliable, repeatable action.
        </p>

        {/* 3 concept cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(187,154,247,0.12)', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(187,154,247,0.2)' }}>
          {[
            { emoji: '🧪', label: 'Skill', accent: '#7aa2f7', title: 'The Ingredient', desc: 'A single, atomic capability — like web-search, llm-summarize, or slack-notify. Skills do one thing well.' },
            { emoji: '🔮', label: 'Rune',  accent: '#bb9af7', title: 'The Recipe',     desc: 'A verified multi-skill workflow — skills chained in sequence or parallel, with Trust Score security.' },
            { emoji: '🗺',  label: 'Graph', accent: '#ff9e64', title: 'The Map',        desc: 'A visual map of how all skills connect — see which skills are reused, discover dependencies, find your next build.' },
          ].map(item => (
            <div key={item.label} style={{ background: '#16161e', padding: '2rem 1.75rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.emoji}</div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: item.accent, textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 700, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{item.label}</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#c0caf5', marginBottom: '0.6rem', fontFamily: "'Cinzel', serif" }}>{item.title}</div>
              <p style={{ color: '#565f89', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#3b4261', fontSize: '0.78rem', marginTop: '2rem', fontStyle: 'italic', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
          Think npm for AI workflows — but every package is security-verified before it ships.
        </p>
      </section>

      {/* ── Featured Runes ── */}
      <section style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#c0caf5', margin: 0, fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>Featured Runes</h2>
          <Link href="/runes" style={{ color: '#bb9af7', textDecoration: 'none', fontSize: '0.82rem', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>View all {RUNES.length} →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {RUNES.slice(0, 12).map(r => <RuneCard key={r.id} rune={r} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        {/* Market BG */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero-market.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,27,38,0.95) 0%, rgba(26,27,38,0.78) 50%, rgba(26,27,38,0.97) 100%)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#c0caf5', marginBottom: '0.75rem', fontFamily: "'Cinzel', serif", textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>Browse the Skills Registry</h2>
          <p style={{ color: '#7982a9', marginBottom: '2rem', fontSize: '0.9rem' }}>{FULL_GRAPH.nodes.length} real-world skills powering {RUNES.length} Runes</p>
          <Link href="/skills" style={{ padding: '0.75rem 2rem', background: 'rgba(187,154,247,0.15)', color: '#bb9af7', border: '1px solid rgba(187,154,247,0.4)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontFamily: "'Cinzel', serif", letterSpacing: '0.05em', backdropFilter: 'blur(4px)' }}>
            View All Skills →
          </Link>
        </div>
      </section>
    </div>
  )
}
