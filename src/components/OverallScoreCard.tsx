import type { OverallBreakdown } from '@/lib/safety'
import { StatBar } from '@/components/StatBar'

interface OverallScoreCardProps {
  overall: OverallBreakdown
}

function overallLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  return 'Caution'
}

function overallColor(score: number): string {
  if (score >= 80) return '#a8d878'
  if (score >= 60) return '#c9a8ff'
  if (score >= 40) return '#ffb07a'
  return '#ff8fa0'
}

export default function OverallScoreCard({ overall }: OverallScoreCardProps) {
  const label = overallLabel(overall.total)
  const color = overallColor(overall.total)

  return (
    <section style={{ background: '#1e2030', border: `1px solid ${color}30`, borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.6 }} />
      <h2 style={{ margin: '0 0 1.25rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8ab4e0', fontWeight: 600 }}>Overall Score</h2>

      <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
        <div style={{ fontSize: '3.4rem', fontWeight: 900, color, fontFamily: "'Cinzel', serif", lineHeight: 1, textShadow: `0 0 30px ${color}50` }}>
          {overall.total}
        </div>
        <div style={{ fontSize: '0.78rem', color, marginTop: '0.35rem', fontWeight: 600, letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ marginTop: '0.75rem', height: '6px', background: '#1a1b26', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overall.total}%`, background: `linear-gradient(90deg, ${color}66, ${color})`, borderRadius: '3px', boxShadow: `0 0 10px ${color}66` }} />
        </div>
      </div>

      <div style={{ borderTop: '1px solid #292e42', paddingTop: '1rem' }}>
        <StatBar label={overall.utility.label}       score={overall.utility.score}       max={overall.utility.max}       color={color} />
        <StatBar label={overall.safety.label}        score={overall.safety.score}        max={overall.safety.max}        color={color} />
        <StatBar label={overall.maturity.label}      score={overall.maturity.score}      max={overall.maturity.max}      color={color} />
        <StatBar label={overall.transparency.label}  score={overall.transparency.score}  max={overall.transparency.max}  color={color} />
      </div>
    </section>
  )
}
