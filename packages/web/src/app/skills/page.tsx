import { loadSkillPackages, loadSkills, loadRunes } from '@/lib/loader'
import SkillsPageClient from './SkillsPageClient'

export default async function SkillsPage() {
  const [skillPackages, skillsRegistry, runes] = await Promise.all([
    loadSkillPackages(),
    loadSkills(),
    loadRunes(),
  ])

  return (
    <SkillsPageClient
      skillPackages={skillPackages}
      skillsRegistry={skillsRegistry}
      runes={runes}
    />
  )
}
