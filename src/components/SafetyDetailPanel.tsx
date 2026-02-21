'use client'

import { useState } from 'react'
import { StatBar } from '@/components/StatBar'
import type { SafetyBreakdown, ScoreReason } from '@/lib/safety'

interface SafetyDetailPanelProps {
  safety: SafetyBreakdown
  reasons: ScoreReason[]
  sColor: string
  sLabel: string
}

const BREAKDOWN_EXPLANATIONS = [
  {
    label: 'Provider Trust',
    what: 'Reputation and trust of the integration provider.',
    range: '0–30',
    higher: 'Well-known providers with stable security practices.',
    lower: 'Unknown providers or less-documented services.',
  },
  {
    label: 'Action Safety',
    what: 'Risk level of what the skill does with connected systems.',
    range: '0–30',
    higher: 'Read-only or non-destructive actions.',
    lower: 'Write/delete operations or high-impact writes.',
  },
  {
    label: 'Data Sensitivity',
    what: 'Whether the skill may move sensitive information.',
    range: '0–25',
    higher: 'Public data or low-risk payloads.',
    lower: 'Financial, health, or personally sensitive payloads.',
  },
  {
    label: 'Reversibility',
    what: 'How recoverable the action is after it runs.',
    range: '0–15',
    higher: 'Non-persistent or reversible operations.',
    lower: 'Permanent, irreversible effects.',
  },
]

export default function SafetyDetailPanel({ safety, reasons, sColor, sLabel }: SafetyDetailPanelProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section style={{ background: '#1e2030', border: `1px solid ${sColor}30`, borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${sColor}, transparent)`, opacity: 0.6 }} />
      <h2 style={{ margin: '0 0 1.25rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8ab4e0', fontWeight: 600 }}>Safety Score</h2>

      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, color: sColor, fontFamily: "'Cinzel', serif", lineHeight: 1, textShadow: `0 0 30px ${sColor}50` }}>
          {safety.total}
        </div>
        <div style={{ fontSize: '0.78rem', color: sColor, marginTop: '0.35rem', fontWeight: 600, letterSpacing: '0.05em' }}>{sLabel}</div>
        <div style={{ marginTop: '0.75rem', height: '6px', background: '#1a1b26', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${safety.total}%`, background: `linear-gradient(90deg, ${sColor}66, ${sColor})`, borderRadius: '3px', boxShadow: `0 0 10px ${sColor}66` }} />
        </div>
      </div>

      <div style={{ borderTop: '1px solid #292e42', paddingTop: '1rem' }}>
        <StatBar label={safety.providerTrust.label}   score={safety.providerTrust.score}   max={safety.providerTrust.max}   color={sColor} />
        <StatBar label={safety.actionRisk.label}      score={safety.actionRisk.score}      max={safety.actionRisk.max}      color={sColor} />
        <StatBar label={safety.dataSensitivity.label} score={safety.dataSensitivity.score} max={safety.dataSensitivity.max} color={sColor} />
        <StatBar label={safety.reversibility.label}   score={safety.reversibility.score}   max={safety.reversibility.max}   color={sColor} />
      </div>

      <button
        type="button"
        onClick={() => setExpanded(prev => !prev)}
        style={{
          marginTop: '0.9rem',
          width: '100%',
          border: `1px solid ${sColor}35`,
          color: '#d6deff',
          background: `${sColor}15`,
          borderRadius: '6px',
          padding: '0.52rem 0.75rem',
          fontSize: '0.76rem',
          fontFamily: "'JetBrains Mono', monospace",
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {expanded ? '▼ Hide calculation' : '▶ How is this calculated?'}
      </button>

      {expanded && (
        <div style={{ marginTop: '0.85rem' }}>
          <div style={{ marginBottom: '0.7rem', border: '1px solid #292e42', borderRadius: '7px', overflow: 'hidden', background: '#16161e' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem', color: '#ccd4ee' }}>
              <thead>
                <tr style={{ background: '#1c2136', color: '#9fb2de' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.65rem', borderBottom: '1px solid #2a2f47', fontWeight: 600 }}>Dimension</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.65rem', borderBottom: '1px solid #2a2f47', fontWeight: 600 }}>What it measures</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.65rem', borderBottom: '1px solid #2a2f47', fontWeight: 600 }}>Score Range</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.65rem', borderBottom: '1px solid #2a2f47', fontWeight: 600 }}>Higher / Lower</th>
                </tr>
              </thead>
              <tbody>
                {BREAKDOWN_EXPLANATIONS.map((item, i) => (
                  <tr key={item.label}>
                    <td style={{ padding: '0.5rem 0.65rem', borderBottom: i === BREAKDOWN_EXPLANATIONS.length - 1 ? undefined : '1px solid #282e47', color: '#dde4fc', fontFamily: "'JetBrains Mono', monospace'" }}>{item.label}</td>
                    <td style={{ padding: '0.5rem 0.65rem', borderBottom: i === BREAKDOWN_EXPLANATIONS.length - 1 ? undefined : '1px solid #282e47', color: '#c8d2ec' }}>{item.what}</td>
                    <td style={{ padding: '0.5rem 0.65rem', borderBottom: i === BREAKDOWN_EXPLANATIONS.length - 1 ? undefined : '1px solid #282e47', color: '#aab4d9', fontFamily: "'JetBrains Mono', monospace'" }}>{item.range}</td>
                    <td style={{ padding: '0.5rem 0.65rem', borderBottom: i === BREAKDOWN_EXPLANATIONS.length - 1 ? undefined : '1px solid #282e47', color: '#b7c2e0', lineHeight: 1.35 }}>
                      <div>Higher: {item.higher}</div>
                      <div style={{ marginTop: '0.15rem' }}>Lower: {item.lower}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reasons.length > 0 && (
            <div style={{ marginTop: '0.9rem', padding: '0.8rem 0.9rem', borderRadius: '7px', background: '#191d2f', border: '1px solid #422d39' }}>
              <div style={{ marginBottom: '0.55rem', color: '#ff9e88', fontSize: '0.78rem', fontWeight: 600 }}>⚠ Why some scores are low</div>
              <ul style={{ margin: 0, paddingLeft: '1rem', color: '#c8d2ec', fontSize: '0.73rem', lineHeight: 1.45 }}>
                {reasons.map((reason, i) => (
                  <li key={`${reason.dimension}-${i}`} style={{ marginBottom: '0.4rem' }}>
                    {reason.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
