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
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,27,38,0.92) 0%, rgba(26,27,38,0.78) 45%, rgba(26,27,38,0.97) 100%)', zIndex: 1 }} />
        {/* Subtle purple center glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(187,154,247,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 2 }} />

        {/* Hero content — above overlays */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(187,154,247,0.12)', border: '1px solid rgba(187,154,247,0.35)', borderRadius: '100px', padding: '0.35rem 1.1rem', fontSize: '0.75rem', color: '#bb9af7', marginBottom: '2rem', letterSpacing: '0.05em', backdropFilter: 'blur(4px)' }}>
            🔮 Open Source
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 1.25rem', fontFamily: "'Cinzel', serif", textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}>
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
              fontFamily: "'Cinzel', serif", letterSpacing: '0.05em',
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
      <section style={{ display: 'flex', justifyContent: 'center', gap: '3rem', padding: '2rem', flexWrap: 'wrap', borderTop: '1px solid #1f2335', borderBottom: '1px solid #1f2335', background: '#16161e' }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#bb9af7', fontFamily: "'Cinzel', serif" }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#8ab4e0', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── What is a Rune? ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}>

          {/* Left: image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '340px', height: '340px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(187,154,247,0.3)', boxShadow: '0 0 60px rgba(187,154,247,0.18), 0 0 120px rgba(187,154,247,0.07)', flexShrink: 0 }}>
              <img src="/images/hero-hand-orb.jpg" alt="Rune Orb" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 45%, rgba(26,27,38,0.55) 100%)' }} />
            </div>
          </div>

          {/* Right: text + cards */}
          <div>
            <p style={{ fontSize: '0.75rem', color: '#bb9af7', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem', marginTop: 0 }}>The Core Concept</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', marginBottom: '1rem', marginTop: 0, fontFamily: "'Cinzel', serif", letterSpacing: '0.03em', lineHeight: 1.2 }}>
              What is a Rune?
            </h2>
            <p style={{ color: '#c8d2ec', fontSize: '1rem', marginBottom: '2rem', marginTop: 0, lineHeight: 1.75, maxWidth: '480px' }}>
              A Rune is a verified, composable AI workflow — a recipe that chains multiple skills into one reliable, repeatable action.
            </p>

            {/* 3 concept rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { emoji: '🧪', label: 'Skill',  accent: '#7aa2f7', title: 'The Ingredient', desc: 'A single, atomic capability — web-search, llm-summarize, slack-notify. Skills do one thing well.' },
                { emoji: '🔮', label: 'Rune',   accent: '#bb9af7', title: 'The Recipe',      desc: 'A verified multi-skill workflow — chained in sequence or parallel, with Trust Score security.' },
                { emoji: '🛡',  label: 'Trust',  accent: '#ff9e64', title: 'The Guarantee',  desc: 'Every Rune carries a Trust Score. Know exactly what services it touches and how safe each action is.' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.1rem', background: '#16161e', border: `1px solid ${item.accent}20`, borderRadius: '10px' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.emoji}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: item.accent, textTransform: 'uppercase', fontWeight: 700 }}>{item.label}</span>
                      <span style={{ color: '#dde4fc', fontWeight: 700, fontSize: '1rem', fontFamily: "'Cinzel', serif" }}>{item.title}</span>
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

        {/* ── Live Example Pipeline ── */}
        <div style={{ marginTop: '3.5rem', background: '#16161e', border: '1px solid #2e3452', borderRadius: '14px', padding: '1.75rem 2rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: '#c9a8ff', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>Live Example</span>
            <span style={{ color: '#2e3452' }}>·</span>
            <span style={{ fontSize: '1rem', color: '#e2e8ff', fontWeight: 700, fontFamily: "'Cinzel', serif" }}>☀ Morning Brief</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#a8d878', background: 'rgba(168,216,120,0.08)', border: '1px solid rgba(168,216,120,0.25)', padding: '2px 10px', borderRadius: '20px', flexShrink: 0 }}>
              Trust Score 87
            </span>
          </div>

          {/* Pipeline */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: '0', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {[
              { icon: '📧', name: 'Gmail Fetch',     service: 'Gmail',   cat: 'INPUT',  color: '#8ab4ff', desc: 'Fetch unread emails from last 24h' },
              { icon: '🧠', name: 'LLM Summarize',   service: 'Claude',  cat: 'LLM',    color: '#c9a8ff', desc: 'Extract key threads & action items' },
              { icon: '📊', name: 'Sheets Log',       service: 'G Sheets',cat: 'API',    color: '#a8d878', desc: 'Append daily summary to tracker' },
              { icon: '💬', name: 'Slack Notify',     service: 'Slack',   cat: 'OUTPUT', color: '#ffb07a', desc: 'Post briefing to #daily channel' },
            ].map((node, i, arr) => (
              <div key={node.name} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? '1 1 auto' : undefined }}>
                {/* Node card */}
                <div style={{
                  background: '#1e2030',
                  border: `1px solid ${node.color}30`,
                  borderRadius: '10px',
                  padding: '1rem 1.1rem',
                  minWidth: '140px',
                  boxShadow: `0 0 18px ${node.color}10`,
                  flexShrink: 0,
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{node.icon}</div>
                  <div style={{ fontSize: '0.875rem', color: '#e2e8ff', fontWeight: 700, marginBottom: '0.2rem' }}>{node.name}</div>
                  <div style={{ fontSize: '0.68rem', color: node.color, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.4rem' }}>{node.cat}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9aa4d2', lineHeight: 1.4 }}>{node.desc}</div>
                  {/* Service badge */}
                  <div style={{ marginTop: '0.6rem', display: 'inline-block', fontSize: '0.65rem', color: node.color, background: `${node.color}10`, border: `1px solid ${node.color}25`, padding: '1px 7px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                    {node.service}
                  </div>
                </div>

                {/* Arrow connector (between nodes) */}
                {i < arr.length - 1 && (
                  <div style={{ flex: 1, minWidth: '2rem', maxWidth: '3.5rem', display: 'flex', alignItems: 'center', position: 'relative', padding: '0 2px' }}>
                    <div style={{ width: '100%', height: '1.5px', background: `linear-gradient(90deg, ${node.color}60, ${arr[i+1].color}60)` }} />
                    <div style={{ position: 'absolute', right: 0, width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `7px solid ${arr[i+1].color}80` }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Caption */}
          <p style={{ margin: '1.25rem 0 0', fontSize: '0.875rem', color: '#9aa4d2', lineHeight: 1.6 }}>
            Every morning: fetches unread emails → AI extracts key threads & todos → logs summary to Sheets → pings your Slack with the briefing. <span style={{ color: '#c9a8ff' }}>One Rune. Zero manual work.</span>
          </p>
        </div>
      </section>

      {/* ── Featured Runes ── */}
      <section style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dde4fc', margin: 0, fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>Featured Runes</h2>
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dde4fc', marginBottom: '0.75rem', fontFamily: "'Cinzel', serif", textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>Browse the Skills Registry</h2>
          <p style={{ color: '#c8d2ec', marginBottom: '2rem', fontSize: '1rem' }}>{FULL_GRAPH.nodes.length} real-world skills powering {RUNES.length} Runes</p>
          <Link href="/skills" style={{ padding: '0.75rem 2rem', background: 'rgba(187,154,247,0.15)', color: '#bb9af7', border: '1px solid rgba(187,154,247,0.4)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontFamily: "'Cinzel', serif", letterSpacing: '0.05em', backdropFilter: 'blur(4px)' }}>
            View All Skills →
          </Link>
        </div>
      </section>
    </div>
  )
}
