import Link from 'next/link'
import { FullGraph } from '@/components/graph/FullGraph'
import { loadRunes, buildFullGraph, buildHubSkills, CATEGORY_COLORS } from '@/lib/loader'

export default async function RunesGraphPage() {
  const runes = await loadRunes()
  const fullGraph = buildFullGraph(runes)
  const hubSkills = buildHubSkills(runes)

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 0.5rem' }}>Runes Graph</h1>
      <p style={{ color: '#ccd4ee', lineHeight: 1.6, marginTop: 0 }}>
        Runes에 포함된 전체 노드를 집약한 전역 그래프입니다. <Link href="/graph" style={{ color: '#bb9af7' }}>기본 그래프 페이지</Link>와 동일한 뷰입니다.
      </p>
      <FullGraph fullGraph={fullGraph} categoryColors={CATEGORY_COLORS} runes={runes} hubSkills={hubSkills} />
    </div>
  )
}
