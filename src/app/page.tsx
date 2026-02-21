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

        {/* ── Live Example: Deep Research ── */}
        <div style={{ marginTop: '3.5rem', background: '#16161e', border: '1px solid #2e3452', borderRadius: '14px', padding: '1.75rem 2rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: '#c9a8ff', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>Live Example</span>
            <span style={{ color: '#2e3452' }}>·</span>
            <span style={{ fontSize: '1rem', color: '#e2e8ff', fontWeight: 700, fontFamily: "'Cinzel', serif" }}>🔬 Deep Research</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.75rem', color: '#a8d878', background: 'rgba(168,216,120,0.08)', border: '1px solid rgba(168,216,120,0.25)', padding: '2px 10px', borderRadius: '20px' }}>Trust Score 91</span>
              <span style={{ fontSize: '0.75rem', color: '#9aa4d2', background: 'rgba(154,164,210,0.08)', border: '1px solid rgba(154,164,210,0.2)', padding: '2px 10px', borderRadius: '20px' }}>7 skills</span>
            </div>
          </div>

          {/* SVG Graph */}
          <div style={{ overflowX: 'auto' }}>
            <svg width="800" height="490" viewBox="0 0 800 490" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '0 auto' }}>
              <defs>
                <marker id="arr-blue"   markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#8ab4ff" opacity="0.7"/></marker>
                <marker id="arr-green"  markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#a8d878" opacity="0.7"/></marker>
                <marker id="arr-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#c9a8ff" opacity="0.7"/></marker>
                <filter id="glow-purple"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>

              {/* Edges: User Input → 3 APIs */}
              <path d="M 400 82 C 400 112 165 118 165 147" stroke="#8ab4ff" strokeWidth="1.5" fill="none" strokeOpacity="0.55" strokeDasharray="5 3" markerEnd="url(#arr-blue)"/>
              <path d="M 400 82 L 400 147" stroke="#8ab4ff" strokeWidth="1.5" fill="none" strokeOpacity="0.55" strokeDasharray="5 3" markerEnd="url(#arr-blue)"/>
              <path d="M 400 82 C 400 112 635 118 635 147" stroke="#8ab4ff" strokeWidth="1.5" fill="none" strokeOpacity="0.55" strokeDasharray="5 3" markerEnd="url(#arr-blue)"/>

              {/* Edges: 3 APIs → Claude */}
              <path d="M 165 229 C 165 255 400 250 400 272" stroke="#a8d878" strokeWidth="1.5" fill="none" strokeOpacity="0.55" strokeDasharray="5 3" markerEnd="url(#arr-green)"/>
              <path d="M 400 229 L 400 272" stroke="#a8d878" strokeWidth="1.5" fill="none" strokeOpacity="0.55" strokeDasharray="5 3" markerEnd="url(#arr-green)"/>
              <path d="M 635 229 C 635 255 400 250 400 272" stroke="#a8d878" strokeWidth="1.5" fill="none" strokeOpacity="0.55" strokeDasharray="5 3" markerEnd="url(#arr-green)"/>

              {/* Edges: Claude → 2 Outputs */}
              <path d="M 400 354 C 400 378 280 378 280 395" stroke="#c9a8ff" strokeWidth="1.5" fill="none" strokeOpacity="0.55" strokeDasharray="5 3" markerEnd="url(#arr-purple)"/>
              <path d="M 400 354 C 400 378 520 378 520 395" stroke="#c9a8ff" strokeWidth="1.5" fill="none" strokeOpacity="0.55" strokeDasharray="5 3" markerEnd="url(#arr-purple)"/>

              {/* Node: User Input */}
              <rect x="330" y="0" width="140" height="82" rx="10" fill="#1e2030" stroke="#8ab4ff" strokeOpacity="0.4" strokeWidth="1.5"/>
              <text x="400" y="26" textAnchor="middle" fontSize="18">📝</text>
              <text x="400" y="47" textAnchor="middle" fill="#e2e8ff" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">User Input</text>
              <text x="400" y="63" textAnchor="middle" fill="#8ab4ff" fontSize="9" letterSpacing="1.5" fontFamily="JetBrains Mono, monospace">INPUT</text>
              <text x="400" y="77" textAnchor="middle" fill="#9aa4d2" fontSize="9" fontFamily="Inter, sans-serif">research query</text>

              {/* Node: Perplexity */}
              <rect x="95" y="147" width="140" height="82" rx="10" fill="#1e2030" stroke="#a8d878" strokeOpacity="0.35" strokeWidth="1.5"/>
              <text x="165" y="173" textAnchor="middle" fontSize="18">🔍</text>
              <text x="165" y="194" textAnchor="middle" fill="#e2e8ff" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">Perplexity</text>
              <text x="165" y="210" textAnchor="middle" fill="#a8d878" fontSize="9" letterSpacing="1.5" fontFamily="JetBrains Mono, monospace">API</text>
              <text x="165" y="224" textAnchor="middle" fill="#9aa4d2" fontSize="9" fontFamily="Inter, sans-serif">web search</text>

              {/* Node: arXiv */}
              <rect x="330" y="147" width="140" height="82" rx="10" fill="#1e2030" stroke="#a8d878" strokeOpacity="0.35" strokeWidth="1.5"/>
              <text x="400" y="173" textAnchor="middle" fontSize="18">📚</text>
              <text x="400" y="194" textAnchor="middle" fill="#e2e8ff" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">arXiv Search</text>
              <text x="400" y="210" textAnchor="middle" fill="#a8d878" fontSize="9" letterSpacing="1.5" fontFamily="JetBrains Mono, monospace">API</text>
              <text x="400" y="224" textAnchor="middle" fill="#9aa4d2" fontSize="9" fontFamily="Inter, sans-serif">academic papers</text>

              {/* Node: Exa */}
              <rect x="565" y="147" width="140" height="82" rx="10" fill="#1e2030" stroke="#a8d878" strokeOpacity="0.35" strokeWidth="1.5"/>
              <text x="635" y="173" textAnchor="middle" fontSize="18">🌐</text>
              <text x="635" y="194" textAnchor="middle" fill="#e2e8ff" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">Exa Search</text>
              <text x="635" y="210" textAnchor="middle" fill="#a8d878" fontSize="9" letterSpacing="1.5" fontFamily="JetBrains Mono, monospace">API</text>
              <text x="635" y="224" textAnchor="middle" fill="#9aa4d2" fontSize="9" fontFamily="Inter, sans-serif">semantic search</text>

              {/* Node: Claude Analyze — glowing center */}
              <g filter="url(#glow-purple)">
                <rect x="310" y="272" width="180" height="82" rx="10" fill="#1e2030" stroke="#c9a8ff" strokeOpacity="0.65" strokeWidth="2"/>
                <text x="400" y="298" textAnchor="middle" fontSize="18">🧠</text>
                <text x="400" y="319" textAnchor="middle" fill="#e2e8ff" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">Claude Analyze</text>
                <text x="400" y="335" textAnchor="middle" fill="#c9a8ff" fontSize="9" letterSpacing="1.5" fontFamily="JetBrains Mono, monospace">LLM</text>
                <text x="400" y="349" textAnchor="middle" fill="#9aa4d2" fontSize="9" fontFamily="Inter, sans-serif">synthesize · rank · cite</text>
              </g>

              {/* Node: Notion */}
              <rect x="210" y="395" width="140" height="82" rx="10" fill="#1e2030" stroke="#ffb07a" strokeOpacity="0.35" strokeWidth="1.5"/>
              <text x="280" y="421" textAnchor="middle" fontSize="18">📓</text>
              <text x="280" y="442" textAnchor="middle" fill="#e2e8ff" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">Notion Page</text>
              <text x="280" y="458" textAnchor="middle" fill="#ffb07a" fontSize="9" letterSpacing="1.5" fontFamily="JetBrains Mono, monospace">OUTPUT</text>
              <text x="280" y="472" textAnchor="middle" fill="#9aa4d2" fontSize="9" fontFamily="Inter, sans-serif">full research report</text>

              {/* Node: Slack */}
              <rect x="450" y="395" width="140" height="82" rx="10" fill="#1e2030" stroke="#ffb07a" strokeOpacity="0.35" strokeWidth="1.5"/>
              <text x="520" y="421" textAnchor="middle" fontSize="18">💬</text>
              <text x="520" y="442" textAnchor="middle" fill="#e2e8ff" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">Slack Notify</text>
              <text x="520" y="458" textAnchor="middle" fill="#ffb07a" fontSize="9" letterSpacing="1.5" fontFamily="JetBrains Mono, monospace">OUTPUT</text>
              <text x="520" y="472" textAnchor="middle" fill="#9aa4d2" fontSize="9" fontFamily="Inter, sans-serif">team summary</text>

              {/* Layer labels */}
              <text x="12" y="45" fill="#9aa4d2" fontSize="9" letterSpacing="1" fontFamily="JetBrains Mono, monospace">TRIGGER</text>
              <text x="12" y="192" fill="#9aa4d2" fontSize="9" letterSpacing="1" fontFamily="JetBrains Mono, monospace">GATHER</text>
              <text x="12" y="316" fill="#9aa4d2" fontSize="9" letterSpacing="1" fontFamily="JetBrains Mono, monospace">THINK</text>
              <text x="12" y="440" fill="#9aa4d2" fontSize="9" letterSpacing="1" fontFamily="JetBrains Mono, monospace">DELIVER</text>
            </svg>
          </div>

          {/* Caption */}
          <p style={{ margin: '1rem 0 0', fontSize: '0.875rem', color: '#9aa4d2', lineHeight: 1.65 }}>
            One query fans out to 3 parallel sources — Perplexity, arXiv, Exa — all funneling into Claude for synthesis, then delivered simultaneously as a full Notion report <span style={{ color: '#c9a8ff' }}>and</span> a Slack team summary.
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
