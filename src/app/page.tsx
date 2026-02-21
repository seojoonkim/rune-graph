import Link from 'next/link'
import { RUNES, FULL_GRAPH } from '@/data/runes'
import { SKILLS_REGISTRY, SKILL_PACKAGES } from '@/data/skills-registry'
import { RuneCard } from '@/components/ui/RuneCard'
import { MorningBriefGraph } from '@/components/graph/MorningBriefGraph'

export default function Home() {
  const stats = [
    { value: RUNES.length,              label: 'Runes' },
    { value: SKILL_PACKAGES.length,     label: 'Skills' },
    { value: SKILLS_REGISTRY.length,    label: 'Actions' },
    { value: FULL_GRAPH.edges.length,   label: 'Connections' },
  ]

  return (
    <div>
      {/* ── Hero ── */}
      <section className="rg-hero">
        {/* BG image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero-forge.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 30%', zIndex: 0 }} />
        {/* Dark overlay: top-heavy so text stays readable */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,27,38,0.92) 0%, rgba(26,27,38,0.78) 45%, rgba(26,27,38,0.97) 100%)', zIndex: 1 }} />
        {/* Subtle purple center glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(187,154,247,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 2 }} />

        {/* Hero content — above overlays */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(187,154,247,0.12)', border: '1px solid rgba(187,154,247,0.35)', borderRadius: '100px', padding: '0.35rem 1.1rem', fontSize: '0.75rem', color: '#bb9af7', marginBottom: '2rem', letterSpacing: '-0.01em', backdropFilter: 'blur(4px)' }}>
            🔮 Open Source
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 1.25rem', fontFamily: "'Outfit', sans-serif", textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}>
            <span style={{ color: '#dde4fc' }}>Inscribe.</span>{' '}
            <span style={{ color: '#bb9af7', textShadow: '0 0 40px rgba(187,154,247,0.6)' }}>Invoke.</span>{' '}
            <span style={{ color: '#ff9e64', textShadow: '0 0 40px rgba(255,158,100,0.5)' }}>Trust.</span>
          </h1>

          <p style={{ fontSize: '1.125rem', color: '#ccd4ee', maxWidth: '500px', margin: '0 auto 1rem', lineHeight: 1.7 }}>
            See how AI skills connect. Build verified workflows. Share with the world.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#8ab4e0', marginBottom: '2.5rem' }}>
            Skills are ingredients · Runes are recipes · Graph is the map
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/runes" style={{
              padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #9d7cd8, #bb9af7)',
              color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700,
              fontSize: '1rem', boxShadow: '0 0 28px rgba(187,154,247,0.5)',
              fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em',
            }}>
              Explore Runes →
            </Link>
            <Link href="/skills" style={{
              padding: '0.8rem 2rem', background: 'rgba(26,27,38,0.6)',
              color: '#bb9af7', border: '1px solid rgba(187,154,247,0.45)',
              borderRadius: '8px', textDecoration: 'none', fontWeight: 600,
              fontSize: '1rem', backdropFilter: 'blur(4px)',
            }}>
              Browse Skills
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="rg-stats-row">
        {stats.map(s => (
          <div key={s.label} className="rg-stat-item">
            <div className="rg-stat-value">{s.value}</div>
            <div className="rg-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── What is a Rune? ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }} className="rg-what-section">
        <div className="rg-two-col">

          {/* Left: image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="rg-hero-circle" style={{ position: 'relative', border: '2px solid rgba(187,154,247,0.3)', boxShadow: '0 0 60px rgba(187,154,247,0.18), 0 0 120px rgba(187,154,247,0.07)' }}>
              <img src="/images/hero-hand-orb.jpg" alt="Rune Orb" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 45%, rgba(26,27,38,0.55) 100%)' }} />
            </div>
          </div>

          {/* Right: text + cards */}
          <div>
            <p style={{ fontSize: '0.75rem', color: '#bb9af7', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem', marginTop: 0 }}>The Core Concept</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', marginBottom: '1rem', marginTop: 0, fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              What is a Rune?
            </h2>
            <p style={{ color: '#c8d2ec', fontSize: '1rem', marginBottom: '2rem', marginTop: 0, lineHeight: 1.75, maxWidth: '480px' }}>
              A Rune is a verified, composable AI workflow — a recipe that chains multiple skills into one reliable, repeatable action.
            </p>

            {/* 3 concept rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { emoji: '🧪', label: 'Skill',  accent: '#7aa2f7', title: 'The Ingredient', desc: 'An installable service capability — gmail, slack, github. Each skill packages all actions for that service with agent-ready instructions.' },
                { emoji: '🔮', label: 'Rune',   accent: '#bb9af7', title: 'The Recipe',      desc: 'A verified multi-skill workflow — chained in sequence or parallel, with Trust Score security.' },
                { emoji: '🔐',  label: 'Trust',  accent: '#ff9e64', title: 'The Guarantee',  desc: 'Every Rune carries a Trust Score. Know exactly what services it touches and how safe each action is.' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.1rem', background: '#16161e', border: `1px solid ${item.accent}20`, borderRadius: '10px' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.emoji}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: item.accent, textTransform: 'uppercase', fontWeight: 700 }}>{item.label}</span>
                      <span style={{ color: '#dde4fc', fontWeight: 700, fontSize: '1rem', fontFamily: "'Outfit', sans-serif" }}>{item.title}</span>
                    </div>
                    <p style={{ color: '#8ab4e0', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ color: '#9aa4d2', fontSize: '0.875rem', marginTop: '1.5rem', marginBottom: 0 }}>
              Think npm for AI workflows — but every package is security-verified.
            </p>
          </div>
        </div>

        {/* ── Live Example: Morning Brief ── */}
        <div style={{ marginTop: '3.5rem', background: '#16161e', border: '1px solid #2e3452', borderRadius: '14px', padding: '1.75rem 2rem' }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: '#c9a8ff', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>Live Example</span>
            <span style={{ color: '#2e3452' }}>·</span>
            <span style={{ fontSize: '1rem', color: '#e2e8ff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>🌅 Morning Brief</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', flexShrink: 0, alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#a8d878', background: 'rgba(168,216,120,0.08)', border: '1px solid rgba(168,216,120,0.25)', padding: '2px 10px', borderRadius: '20px' }}>Trust Score 87</span>
              <span style={{ fontSize: '0.72rem', color: '#9aa4d2', background: 'rgba(154,164,210,0.08)', border: '1px solid rgba(154,164,210,0.2)', padding: '2px 10px', borderRadius: '20px' }}>8 skills</span>
              <span style={{ fontSize: '0.72rem', color: '#bb9af7', background: 'rgba(187,154,247,0.08)', border: '1px solid rgba(187,154,247,0.2)', padding: '2px 10px', borderRadius: '20px' }}>Dual LLM</span>
            </div>
          </div>

          {/* Pipeline stage legend */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { dot: '#34d399', label: 'INPUT — Calendar · Email' },
              { dot: '#a78bfa', label: 'LLM 1 — Prioritize' },
              { dot: '#60a5fa', label: 'API — News · Weather' },
              { dot: '#a78bfa', label: 'LLM 2 — Compose' },
              { dot: '#f472b6', label: 'OUTPUT — Slack · Telegram' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: '0.72rem', color: '#748ab8', fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Animated graph */}
          <div style={{ overflowX: 'auto' }}>
            <MorningBriefGraph />
          </div>

          {/* Caption */}
          <p style={{ margin: '1.25rem 0 0', fontSize: '0.875rem', color: '#9aa4d2', lineHeight: 1.65 }}>
            Two LLM passes for depth — <span style={{ color: '#a78bfa' }}>Claude Prioritize</span> ranks your calendar + inbox, then{' '}
            <span style={{ color: '#a78bfa' }}>Claude Compose</span> merges priorities with live headlines and weather into a polished brief,{' '}
            delivered simultaneously to <span style={{ color: '#f472b6' }}>Slack</span> and <span style={{ color: '#f472b6' }}>Telegram</span>.
          </p>
        </div>
      </section>

      {/* ── Featured Runes ── */}
      <section className="rg-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
          <h2 className="rg-section-h2">Featured Runes</h2>
          <Link href="/runes" style={{ color: '#bb9af7', textDecoration: 'none', fontSize: '0.875rem' }}>View all {RUNES.length} →</Link>
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dde4fc', marginBottom: '0.75rem', fontFamily: "'Outfit', sans-serif", textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>Browse the Skills Registry</h2>
          <p style={{ color: '#c8d2ec', marginBottom: '2rem', fontSize: '1rem' }}>{SKILL_PACKAGES.length} skills · {SKILLS_REGISTRY.length} actions · {RUNES.length} Runes</p>
          <Link href="/skills" style={{ padding: '0.75rem 2rem', background: 'rgba(187,154,247,0.15)', color: '#bb9af7', border: '1px solid rgba(187,154,247,0.4)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em', backdropFilter: 'blur(4px)' }}>
            View All Skills →
          </Link>
        </div>
      </section>
    </div>
  )
}
