export default function StrategyPage() {
  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#E2E2E8', marginBottom: '0.5rem', fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>
          RuneGraph Strategy
        </h1>
        <p style={{ color: '#777', marginTop: 0, lineHeight: 1.7, fontSize: '1rem' }}>
          A three-axis strategy for product design, community growth, and technical excellence in AI skill orchestration.
        </p>
      </div>

      {[
        {
          title: '1) Product Strategy',
          items: [
            'Build the graph explorer before the runtime — let users understand skill relationships intuitively before writing a single line of YAML.',
            'Launch single Rune templates first, expanding through real-world use cases: email triage, research automation, content generation, infra alerts.',
            'Provide "easy to read" views and "easy to copy" documentation alongside the graph editor — lower the barrier to first use.',
          ],
        },
        {
          title: '2) Go-to-Market Strategy',
          items: [
            'Maintain open-source principles while offering deployable real-world templates and certified stack guides developers can trust.',
            'Become the shared language between developers, product teams, and ops — standardize the node dictionary (input/process/output) across all roles.',
            'Operate an official template registry with search, categorization, and community ratings to surface the highest-quality Runes.',
          ],
        },
        {
          title: '3) Technical Strategy',
          items: [
            'Extend skill schemas to standard JSON-LD format to ensure interoperability across LLMs, APIs, and event schemas.',
            'Connect execution traces (meta logs) with graph version history to strengthen debugging and audit capabilities.',
            'Eliminate dark patterns by explicitly documenting each skill\'s responsibilities, input/output contracts, failure modes, and cost estimates.',
          ],
        },
        {
          title: '4) Community & Ecosystem',
          items: [
            'Founding Smiths program — first 100 contributors receive Rune Lord status, permanent recognition, and governance voting rights.',
            'Mana Points economy — earn MP through skill reviews, Rune publishing, bug reports, and community contributions.',
            'Monthly Rune Forge challenges — themed community sprints to build and verify Runes in specific domains.',
          ],
        },
      ].map((section, i) => (
        <section key={i} style={{ marginBottom: '1.25rem', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '12px', padding: '1.25rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
          {/* Corner brackets */}
          <div style={{ position: 'absolute', top: 6, left: 6, width: 10, height: 10, borderTop: '1.5px solid #8B5CF6', borderLeft: '1.5px solid #8B5CF6', opacity: 0.4 }} />
          <div style={{ position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderTop: '1.5px solid #8B5CF6', borderRight: '1.5px solid #8B5CF6', opacity: 0.4 }} />
          <h2 style={{ color: '#E2E2E8', marginTop: 0, fontFamily: "'Cinzel', serif", fontSize: '1.1rem', letterSpacing: '0.03em' }}>{section.title}</h2>
          <ul style={{ paddingLeft: '1.25rem', color: '#888', lineHeight: 1.85, marginTop: '0.75rem', marginBottom: 0 }}>
            {section.items.map((item, j) => (
              <li key={j} style={{ marginBottom: '0.4rem', fontSize: '0.95rem' }}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      {/* Roadmap */}
      <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '12px', padding: '1.25rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 6, left: 6, width: 10, height: 10, borderTop: '1.5px solid #F59E0B', borderLeft: '1.5px solid #F59E0B', opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderTop: '1.5px solid #F59E0B', borderRight: '1.5px solid #F59E0B', opacity: 0.4 }} />
        <h2 style={{ color: '#E2E2E8', marginTop: 0, fontFamily: "'Cinzel', serif", fontSize: '1.1rem', letterSpacing: '0.03em' }}>Roadmap (90 Days)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
          {[
            { q: 'Q1', color: '#3B82F6', items: ['Search & filter UX', 'Skill tag quality', 'Trust Score v1'] },
            { q: 'Q2', color: '#8B5CF6', items: ['Graph versioning', 'Import / Export', 'Team collaboration'] },
            { q: 'Q3', color: '#F59E0B', items: ['Runbook generator', 'Execution log viewer', 'Template validation pipeline'] },
          ].map(({ q, color, items }) => (
            <div key={q} style={{ background: '#0F0F15', border: `1px solid ${color}30`, borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color, fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.6rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>{q}</div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#777', fontSize: '0.875rem', lineHeight: 1.7 }}>
                {items.map(it => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
