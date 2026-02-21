interface StatBarProps {
  label: string
  score: number
  max: number
  color: string
}

export function StatBar({ label, score, max, color }: StatBarProps) {
  const safeMax = Math.max(1, max)
  const pct = Math.max(0, Math.min(100, Math.round((score / safeMax) * 100)))
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#bac4e0' }}>{label}</span>
        <span style={{ fontSize: '0.78rem', color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
          {score}/{max}
        </span>
      </div>
      <div style={{ height: '6px', background: '#1a1b26', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: '3px',
            boxShadow: `0 0 8px ${color}55`,
            transition: 'width 0.6s ease-out',
          }}
        />
      </div>
    </div>
  )
}
