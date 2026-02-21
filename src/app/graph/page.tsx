import { FullGraph } from '@/components/graph/FullGraph'

export default function GraphPage() {
  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#E2E2E8', marginBottom: '0.5rem', fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>Full Skill Relationship Graph</h1>
        <p style={{ color: '#888', lineHeight: 1.6 }}>
          Explore the full skill ecosystem at a glance. Toggle categories or focus on Hub Skills to compress the flow.
        </p>
      </div>

      <FullGraph />
    </div>
  )
}
