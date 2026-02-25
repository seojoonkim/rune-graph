export default function AboutPage() {
  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '4rem 2rem 5rem' }}>

      {/* Header */}
      <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', color: '#bb9af7', marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>ABOUT</p>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#dde4fc', margin: '0 0 1.25rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        Built for the Skill Era.
      </h1>
      <p style={{ fontSize: '1.05rem', color: '#9aa4d2', lineHeight: 1.75, maxWidth: '640px', marginBottom: '3.5rem' }}>
        RuneHub is an open marketplace for verified AI workflows. We make it possible to go from idea to running automation in one command — with full transparency into what runs, what it costs, and what it touches.
      </p>

      {/* Why we built it */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#dde4fc', fontSize: '1.1rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 0.875rem' }}>Why we built it</h2>
        <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, margin: '0 0 1rem' }}>
          AI workflows are powerful on paper. In practice, the gap between "here's a great prompt" and "this runs reliably every morning" is enormous. Most people never cross it — not because they lack the idea, but because setup is brutal.
        </p>
        <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
          RuneHub closes that gap. Every Rune is a pre-built, verified pipeline — Skills wired together, dependencies resolved, auth configured, Trust Score attached. One command to install. Same result every run.
        </p>
      </section>

      {/* Principles */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#dde4fc', fontSize: '1.1rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 1.25rem' }}>What we believe</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { accent: '#bb9af7', title: 'Transparency first', body: 'Every Rune declares its permission scope, service access, and token cost upfront. No surprises at runtime.' },
            { accent: '#34d399', title: 'Open by default', body: 'The entire Rune and Skill registry is free to browse and install. We make money when our optimization saves you money — not by locking the catalog.' },
            { accent: '#ff9e64', title: 'Reproducibility matters', body: 'An AI workflow that works once but not twice is a prototype. Runes are built to run the same way every time — deterministic by design.' },
            { accent: '#7aa2f7', title: 'Lower the barrier', body: '95% of people who discover AI automation never ship it. We exist to change that ratio.' },
          ].map(p => (
            <div key={p.title} style={{ display: 'flex', gap: '1rem', padding: '1rem 1.25rem', background: '#16161e', borderRadius: '10px', border: `1px solid ${p.accent}18` }}>
              <div style={{ width: '3px', borderRadius: '2px', background: p.accent, flexShrink: 0, alignSelf: 'stretch' }} />
              <div>
                <div style={{ color: p.accent, fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>{p.title}</div>
                <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open source */}
      <section>
        <h2 style={{ color: '#dde4fc', fontSize: '1.1rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 0.875rem' }}>Open source</h2>
        <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, margin: '0 0 1.25rem' }}>
          RuneHub is open source. The registry, the Rune schema, and the Skills catalog are all public. Fork it, extend it, publish your own Runes.
        </p>
        <a
          href="https://github.com/seojoonkim/rune-hub"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', background: 'rgba(187,154,247,0.08)', border: '1px solid rgba(187,154,247,0.3)', borderRadius: '8px', color: '#bb9af7', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}
        >
          View on GitHub ›
        </a>
      </section>

    </div>
  )
}
