import { Command } from "commander";
import { ensureRepoCache, loadSkillPackages, loadRunes } from "./loaders/repo.js";
import type { Rune, SkillPackage } from "./loaders/repo.js";

const RUNE_SLUG_WIDTH = 20;
const RUNE_NAME_WIDTH = 24;
const RUNE_CATEGORY_WIDTH = 18;

const SKILL_ID_WIDTH = 20;
const SKILL_NAME_WIDTH = 24;
const SKILL_VENDOR_WIDTH = 16;

let RUNES: Rune[] = [];
let SKILL_PACKAGES: SkillPackage[] = [];
let dataLoaded = false;

function ensureData(): void {
  if (dataLoaded) {
    return;
  }

  ensureRepoCache();
  RUNES = loadRunes();
  SKILL_PACKAGES = loadSkillPackages();
  dataLoaded = true;
}

function formatCell(value: string, width: number): string {
  if (value.length > width) {
    return value.slice(0, width - 1) + "…";
  }
  return value.padEnd(width, " ");
}

function printRunesList(): void {
  ensureData();

  for (const rune of RUNES) {
    const line = [
      `  ${rune.emoji}`,
      formatCell(rune.slug, RUNE_SLUG_WIDTH),
      formatCell(rune.name, RUNE_NAME_WIDTH),
      formatCell(rune.category, RUNE_CATEGORY_WIDTH),
      `${rune.nodes.length} nodes`,
    ].join("  ");

    console.log(line);
  }
}

function printRuneDetail(slug: string): void {
  ensureData();

  const rune = RUNES.find((entry) => entry.slug === slug);

  if (!rune) {
    console.error(`Rune not found: ${slug}`);
    process.exit(1);
  }

  console.log(`${rune.emoji} ${rune.name}`);
  console.log(`Category: ${rune.category}`);
  console.log(`Purpose: ${rune.purpose}`);
  console.log(`Use case: ${rune.useCase}`);
  console.log("");
  console.log(`Pipeline (${rune.nodes.length} nodes):`);
  for (const node of rune.nodes) {
    console.log(`  [${node.category}]   ${node.label}`);
  }
  console.log("");
  console.log(`Connections (${rune.edges.length} edges):`);
  for (const edge of rune.edges) {
    console.log(`  ${edge.source} -> ${edge.target}  (${edge.label})`);
  }
}

function printSkillsList(): void {
  ensureData();

  for (const skill of SKILL_PACKAGES) {
    const line = [
      `  ${skill.emoji}`,
      formatCell(skill.id, SKILL_ID_WIDTH),
      formatCell(skill.name, SKILL_NAME_WIDTH),
      formatCell(skill.vendor, SKILL_VENDOR_WIDTH),
      skill.category,
    ].join("  ");

    console.log(line);
  }
}

function printSkillDetail(id: string): void {
  ensureData();

  const skill = SKILL_PACKAGES.find((entry) => entry.id === id);

  if (!skill) {
    console.error(`Skill package not found: ${id}`);
    process.exit(1);
  }

  console.log(`${skill.emoji} ${skill.name}`);
  console.log(`Vendor: ${skill.vendor}`);
  console.log(`Tagline: ${skill.tagline}`);
  console.log(`Category: ${skill.category}`);
  console.log(`Install: ${skill.installCmd}`);
  console.log("Actions:");
  for (const actionId of skill.actionIds) {
    console.log(`  - ${actionId}`);
  }
  console.log(`Docs: ${skill.docsUrl}`);
}

export function cli(): void {
  const program = new Command();

  program
    .name("rune-hub")
    .description("Explore RuneHub runes and skills from the terminal")
    .showHelpAfterError();

  program
    .command("runes")
    .description("List all runes")
    .action(printRunesList)
    .command("show")
    .description("Show rune details by slug")
    .argument("<slug>", "Rune slug")
    .action(printRuneDetail);

  program
    .command("skills")
    .description("List all skill packages")
    .action(printSkillsList)
    .command("show")
    .description("Show skill package details by id")
    .argument("<id>", "Skill package id")
    .action(printSkillDetail);

  if (process.argv.slice(2).length === 0) {
    program.outputHelp();
    return;
  }

  program.parse(process.argv);
}
