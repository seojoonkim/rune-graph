import type { Skill } from '@/data/skills-registry'

// Safety Score: 0-100 (higher = safer)
// Breakdown: Provider Trust + Action Risk + Data Sensitivity + Reversibility

export const TIER1_SERVICES = ['Gmail', 'Google Calendar', 'Google Sheets', 'Google Docs', 'Slack', 'GitHub', 'Microsoft', 'Outlook', 'Notion', 'Stripe', 'Anthropic', 'OpenAI', 'Google', 'Cloudflare']
export const TIER2_SERVICES = ['Discord', 'Telegram', 'Jira', 'Linear', 'Airtable', 'Supabase', 'Vercel', 'HubSpot', 'Zendesk', 'Intercom', 'Shopify', 'Twilio', 'SendGrid', 'Mailchimp']

const WRITE_KEYWORDS = ['send', 'post', 'create', 'publish', 'write', 'update', 'delete', 'remove', 'deploy', 'submit', 'push', 'execute', 'run', 'trigger']
export const SENSITIVE_SERVICES = ['Stripe', 'Plaid', 'Coinbase', 'Binance', 'QuickBooks', 'Xero', 'Apple Health', 'Google Fit', 'Oura', 'OpenFDA', 'DocuSign']

export interface SafetyBreakdown {
  total: number
  providerTrust:    { score: number; max: number; label: string }
  actionRisk:       { score: number; max: number; label: string }
  dataSensitivity:  { score: number; max: number; label: string }
  reversibility:    { score: number; max: number; label: string }
}

export interface OverallBreakdown {
  total: number
  utility:         { score: number; max: number; label: string }
  safety:          { score: number; max: number; label: string }
  maturity:        { score: number; max: number; label: string }
  transparency:    { score: number; max: number; label: string }
}

export interface ScoreReason {
  dimension: 'providerTrust' | 'actionRisk' | 'dataSensitivity' | 'reversibility'
  message: string
}

export function getSafetyScore(skill: Skill): SafetyBreakdown {
  const idLower = skill.id.toLowerCase()
  const labelLower = skill.label.toLowerCase()
  const serviceName = skill.service

  // 1. Provider Trust (0-30)
  let providerTrust = 15
  if (TIER1_SERVICES.some(s => serviceName.includes(s))) providerTrust = 28
  else if (TIER2_SERVICES.some(s => serviceName.includes(s))) providerTrust = 22
  else if (skill.category === 'llm') providerTrust = 25 // LLMs are known providers

  // 2. Action Risk (0-30): read = safer, write = riskier
  const isWrite = WRITE_KEYWORDS.some(w => idLower.includes(w) || labelLower.includes(w))
  let actionRisk = isWrite ? 15 : 27
  if (skill.category === 'input') actionRisk = Math.max(actionRisk, 22) // reads are safer
  if (idLower.includes('delete') || idLower.includes('remove')) actionRisk = 8
  if (idLower.includes('fetch') || idLower.includes('read') || idLower.includes('get') || idLower.includes('list') || idLower.includes('search')) actionRisk = 27

  // 3. Data Sensitivity (0-25)
  let dataSensitivity = 18
  if (SENSITIVE_SERVICES.some(s => serviceName.includes(s))) dataSensitivity = 8
  if (skill.category === 'llm') dataSensitivity = 15 // data passes through LLM
  if (idLower.includes('health') || idLower.includes('medical') || idLower.includes('fda')) dataSensitivity = 7
  if (idLower.includes('public') || idLower.includes('search') || idLower.includes('news') || idLower.includes('weather')) dataSensitivity = 24

  // 4. Reversibility (0-15)
  let reversibility = 10
  if (isWrite && (idLower.includes('delete') || idLower.includes('remove'))) reversibility = 4
  else if (isWrite) reversibility = 8
  else reversibility = 14 // reads are fully reversible

  const total = Math.min(100, providerTrust + actionRisk + dataSensitivity + reversibility)

  return {
    total,
    providerTrust:   { score: providerTrust,  max: 30, label: 'Provider Trust' },
    actionRisk:      { score: actionRisk,      max: 30, label: 'Action Safety' },
    dataSensitivity: { score: dataSensitivity, max: 25, label: 'Data Sensitivity' },
    reversibility:   { score: reversibility,   max: 15, label: 'Reversibility' },
  }
}

export function safetyColor(score: number): string {
  if (score >= 80) return '#9ece6a'   // green
  if (score >= 60) return '#bb9af7'   // purple
  if (score >= 40) return '#ff9e64'   // orange
  return '#f7768e'                    // red
}

export function safetyLabel(score: number): string {
  if (score >= 80) return 'High Safety'
  if (score >= 60) return 'Moderate'
  if (score >= 40) return 'Caution'
  return 'High Risk'
}

export function getOverallScore(skill: Skill, usedInRunesCount: number): OverallBreakdown {
  const serviceName = skill.service

  const baseUtility = skill.category === 'llm' ? 20 : skill.category === 'api' ? 18 : 15
  const utilityBoost = Math.min(usedInRunesCount * 2, 10)
  const utilityScore = Math.min(30, baseUtility + utilityBoost)
  const utility = {
    score: utilityScore,
    max: 30,
    label: 'Utility',
  }

  const safetyRaw = Math.round(getSafetyScore(skill).total * 0.3)
  const safety = {
    score: safetyRaw,
    max: 30,
    label: 'Safety',
  }

  const maturityScore = TIER1_SERVICES.some(s => serviceName.includes(s))
    ? 18
    : TIER2_SERVICES.some(s => serviceName.includes(s))
      ? 14
      : 10
  const maturity = {
    score: maturityScore,
    max: 20,
    label: 'Maturity',
  }

  const transparencyScore =
    skill.category === 'input' ? 18 :
    skill.category === 'api' ? 14 :
    skill.category === 'llm' ? 12 : 10
  const transparency = {
    score: transparencyScore,
    max: 20,
    label: 'Transparency',
  }

  const total = Math.min(
    100,
    utility.score + safety.score + maturity.score + transparency.score
  )

  return {
    total,
    utility,
    safety,
    maturity,
    transparency,
  }
}

export function getSafetyReasons(skill: Skill): ScoreReason[] {
  const breakdown = getSafetyScore(skill)
  const reasons: ScoreReason[] = []

  if (breakdown.providerTrust.score < 20) {
    reasons.push({
      dimension: 'providerTrust',
      message: 'Provider trust is below threshold, likely because the service is not a recognized or well-documented provider.',
    })
  }

  if (breakdown.actionRisk.score < 15) {
    reasons.push({
      dimension: 'actionRisk',
      message: 'Action risk is elevated because the skill performs write or delete operations with higher potential impact.',
    })
  }

  if (breakdown.dataSensitivity.score < 12) {
    reasons.push({
      dimension: 'dataSensitivity',
      message: 'Data sensitivity is low due to handling financial, health, or other high-risk personal data.',
    })
  }

  if (breakdown.reversibility.score < 8) {
    reasons.push({
      dimension: 'reversibility',
      message: 'Reversibility is limited, so the action is harder to undo after execution.',
    })
  }

  return reasons
}
