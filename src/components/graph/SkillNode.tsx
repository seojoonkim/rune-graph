'use client'
import { Handle, Position } from 'reactflow'
import { CATEGORY_COLORS, HUB_SKILLS, type SkillCategory } from '@/data/runes'

const CATEGORY_ICONS: Record<SkillCategory, string> = {
  input:  '⬇',
  api:    '⬡',
  llm:    '●',
  output: '⬆',
}

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  input:  'INPUT',
  api:    'API',
  llm:    'LLM',
  output: 'OUTPUT',
}

interface SkillNodeData {
  label: string
  category: SkillCategory
}

export function SkillNode({ data, id }: { data: SkillNodeData; id: string }) {
  const color = CATEGORY_COLORS[data.category]
  const isHub = HUB_SKILLS.includes(id)

  return (
    <div style={{
      background: '#1e2030',
      border: `1.8px solid ${color}`,
      borderRadius: '9px',
      // Fixed width so column spacing is predictable; text wraps inside
      width: '168px',
      padding: '8px 10px 9px',
      textAlign: 'center',
      boxShadow: isHub
        ? `0 0 18px ${color}55, inset 0 0 10px ${color}0a`
        : `0 0 6px ${color}22`,
      position: 'relative',
    }}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: color, border: `2px solid #1e2030`, width: 9, height: 9 }}
      />

      {/* HUB badge — inside top-right corner to avoid clip */}
      {isHub && (
        <div style={{
          position: 'absolute',
          top: 4, right: 5,
          fontSize: '0.55rem',
          background: color,
          color: '#0d0e17',
          borderRadius: '3px',
          padding: '1px 4px',
          fontWeight: 800,
          letterSpacing: '0.04em',
          lineHeight: 1.4,
        }}>
          HUB
        </div>
      )}

      {/* Category row */}
      <div style={{
        fontSize: '0.65rem',
        color,
        fontWeight: 700,
        letterSpacing: '0.08em',
        marginBottom: '5px',
        // If HUB badge present, shift right slightly to avoid overlap
        paddingRight: isHub ? '22px' : '0',
        textAlign: isHub ? 'left' : 'center',
        fontFamily: "'JetBrains Mono', monospace",
        display: 'flex',
        alignItems: 'center',
        justifyContent: isHub ? 'flex-start' : 'center',
        gap: '3px',
      }}>
        <span style={{ fontSize: '0.6rem' }}>{CATEGORY_ICONS[data.category]}</span>
        <span>{CATEGORY_LABELS[data.category]}</span>
      </div>

      {/* Label — wraps to 2 lines */}
      <div style={{
        fontSize: '0.78rem',
        color: '#e2e8ff',
        fontWeight: 600,
        lineHeight: 1.35,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
      }}>
        {data.label}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: color, border: `2px solid #1e2030`, width: 9, height: 9 }}
      />
    </div>
  )
}
