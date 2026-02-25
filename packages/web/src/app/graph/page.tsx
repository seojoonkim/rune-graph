import { FullGraph } from '@/components/graph/FullGraph'
import { loadRunes, buildFullGraph, buildHubSkills, CATEGORY_COLORS } from '@/lib/loader'

export default async function GraphPage() {
  const runes = await loadRunes()
  const fullGraph = buildFullGraph(runes)
  const hubSkills = buildHubSkills(runes)

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#dde4fc', marginBottom: '0.5rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em' }}>Full Skill Relationship Graph</h1>
        <p style={{ color: '#ccd4ee', lineHeight: 1.6 }}>
          Explore the full skill ecosystem at a glance. Toggle categories or focus on Hub Skills to compress the flow.
        </p>
      </div>

      <FullGraph fullGraph={fullGraph} categoryColors={CATEGORY_COLORS} runes={runes} hubSkills={hubSkills} />
    </div>
  )
}
