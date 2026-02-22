'use client'
import { Handle, Position } from 'reactflow'
import { CATEGORY_COLORS, HUB_SKILLS, type SkillCategory } from '@/data/runes'

// Game-style category icons
const CATEGORY_ICONS: Record<SkillCategory, string> = {
  input:  '▼',
  api:    '⚡',
  llm:    '◈',
  output: '▲',
}

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  input:  'INPUT',
  api:    'API',
  llm:    'LLM',
  output: 'OUTPUT',
}

// HUB nodes get legendary gold treatment
const HUB_COLOR = '#ffd060'

interface SkillNodeData {
  label: string
  category: SkillCategory
}

export function SkillNode({ data, id }: { data: SkillNodeData; id: string }) {
  const baseColor = CATEGORY_COLORS[data.category]
  const isHub = HUB_SKILLS.includes(id)
  const color = isHub ? HUB_COLOR : baseColor

  return (
    <div style={{
      background: `linear-gradient(145deg, #0f1018, #161824)`,
      border: `2px solid ${color}cc`,
      borderRadius: '9px',
      width: '168px',
      padding: '8px 10px 9px',
      textAlign: 'center',
      boxShadow: isHub
        ? `0 0 24px ${HUB_COLOR}66, 0 0 48px ${HUB_COLOR}22, inset 0 0 14px ${HUB_COLOR}10`
        : `0 0 12px ${color}33, inset 0 0 8px ${color}08`,
      position: 'relative',
    }}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: color, border: `2px solid #0f1018`, width: 10, height: 10 }}
      />

      {/* HUB badge — gold crown style */}
      {isHub && (
        <div style={{
          position: 'absolute',
          top: 4, right: 5,
          fontSize: '0.6rem',
          background: `linear-gradient(135deg, #ffd060, #ffb020)`,
          color: '#0d0e17',
          borderRadius: '3px',
          padding: '1px 5px',
          fontWeight: 900,
          letterSpacing: '0.06em',
          lineHeight: 1.4,
          boxShadow: '0 0 6px #ffd06066',
        }}>
          ✦ HUB
        </div>
      )}

      {/* Category row */}
      <div style={{
        fontSize: '0.72rem',
        color,
        fontWeight: 800,
        letterSpacing: '0.1em',
        marginBottom: '5px',
        paddingRight: isHub ? '28px' : '0',
        textAlign: isHub ? 'left' : 'center',
        fontFamily: "'JetBrains Mono', monospace",
        display: 'flex',
        alignItems: 'center',
        justifyContent: isHub ? 'flex-start' : 'center',
        gap: '4px',
      }}>
        <span style={{ fontSize: '0.7rem' }}>{CATEGORY_ICONS[data.category]}</span>
        <span>{CATEGORY_LABELS[data.category]}</span>
      </div>

      {/* Node label */}
      <div style={{
        fontSize: '0.85rem',
        color: '#f4f7ff',
        fontWeight: 700,
        lineHeight: 1.35,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
        textShadow: `0 0 8px ${color}44`,
      }}>
        {data.label}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: color, border: `2px solid #0f1018`, width: 10, height: 10 }}
      />
    </div>
  )
}
