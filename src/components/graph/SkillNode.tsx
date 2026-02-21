'use client'
import { Handle, Position } from 'reactflow'
import { CATEGORY_COLORS, HUB_SKILLS, type SkillCategory } from '@/data/runes'

const CATEGORY_ICONS: Record<SkillCategory, string> = {
  input: '⬇️',
  api: '🔌',
  llm: '🧠',
  output: '⬆️',
}

interface SkillNodeData {
  label: string
  category: SkillCategory
  isHub?: boolean
}

export function SkillNode({ data, id }: { data: SkillNodeData; id: string }) {
  const color = CATEGORY_COLORS[data.category]
  const isHub = HUB_SKILLS.includes(id)

  return (
    <div style={{
      background: '#1e2030',
      border: `1.5px solid ${color}`,
      borderRadius: '8px',
      padding: '8px 12px',
      minWidth: '120px',
      textAlign: 'center',
      boxShadow: isHub ? `0 0 16px ${color}55` : `0 0 6px ${color}22`,
      position: 'relative',
    }}>
      <Handle type="target" position={Position.Left} style={{ background: color, border: 'none', width: 8, height: 8 }} />
      <div style={{ fontSize: '0.7rem', color, fontWeight: 600, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {CATEGORY_ICONS[data.category]} {data.category}
      </div>
      <div style={{ fontSize: '0.8rem', color: '#dde4fc', fontWeight: 500 }}>{data.label}</div>
      {isHub && <div style={{ position: 'absolute', top: -6, right: -6, fontSize: '0.6rem', background: color, color: '#000', borderRadius: '4px', padding: '1px 4px', fontWeight: 700 }}>HUB</div>}
      <Handle type="source" position={Position.Right} style={{ background: color, border: 'none', width: 8, height: 8 }} />
    </div>
  )
}
