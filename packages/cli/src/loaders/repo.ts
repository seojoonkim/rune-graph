import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "fs";
import os from "os";
import path from "path";

const REPO_URL = "https://github.com/seojoonkim/rune-hub.git";
const CACHE_DIR = path.join(
  process.env.XDG_CACHE_HOME || path.join(os.homedir(), ".cache"),
  "rune-hub",
  "repo",
);

export interface SkillPackage {
  id: string;
  name: string;
  vendor: string;
  emoji: string;
  tagline: string;
  description: string;
  category: string;
  installCmd: string;
  docsUrl: string;
  actionIds: string[];
  downloads?: number;
  stars?: number;
  version?: string;
  verified?: boolean;
}

export interface SkillNode {
  id: string;
  label: string;
  category: "input" | "api" | "llm" | "output";
}

export interface SkillEdge {
  source: string;
  target: string;
  label: string;
  rune?: string;
}

export interface Rune {
  id: string;
  slug: string;
  name: string;
  purpose: string;
  category: string;
  emoji: string;
  useCase: string;
  description?: string;
  nodes: SkillNode[];
  edges: SkillEdge[];
}

function parseValue(rawValue: string): unknown {
  const trimmed = rawValue.trim();
  if (trimmed.length === 0) {
    return "";
  }

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return trimmed;
}

function parseFrontmatter(content: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = content.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") {
    return result;
  }

  let currentArrayKey: string | null = null;

  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index] || "";
    const trimmed = line.trim();

    if (trimmed === "---") {
      break;
    }

    if (trimmed.length === 0) {
      continue;
    }

    if (currentArrayKey && line.startsWith("  - ")) {
      const item = parseValue(line.slice(4));
      const currentValue = result[currentArrayKey];
      if (Array.isArray(currentValue) && typeof item === "string") {
        currentValue.push(item);
      }
      continue;
    }

    currentArrayKey = null;

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    if (rawValue.length === 0) {
      result[key] = [];
      currentArrayKey = key;
      continue;
    }

    result[key] = parseValue(rawValue);
  }

  return result;
}

function toStringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toOptionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function toOptionalBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function ensureRepoCache(): string {
  mkdirSync(path.dirname(CACHE_DIR), { recursive: true });

  const gitDir = path.join(CACHE_DIR, ".git");
  if (existsSync(gitDir)) {
    try {
      execSync("git pull --ff-only", {
        cwd: CACHE_DIR,
        stdio: "ignore",
      });
    } catch {}

    return CACHE_DIR;
  }

  try {
    execSync(`git clone --depth=1 --filter=blob:none --sparse ${REPO_URL} ${CACHE_DIR}`, {
      stdio: "ignore",
    });
    execSync("git sparse-checkout set skill-packages skills runes", {
      cwd: CACHE_DIR,
      stdio: "ignore",
    });
  } catch {}

  return CACHE_DIR;
}

export function loadSkillPackages(): SkillPackage[] {
  const repoDir = ensureRepoCache();
  const skillPackagesDir = path.join(repoDir, "skill-packages");
  if (!existsSync(skillPackagesDir)) {
    return [];
  }

  const directories = readdirSync(skillPackagesDir).filter((entry) => {
    const entryPath = path.join(skillPackagesDir, entry);
    return statSync(entryPath).isDirectory();
  });

  const skillPackages: SkillPackage[] = [];

  for (const directory of directories) {
    const filePath = path.join(skillPackagesDir, directory, "SKILL.md");
    if (!existsSync(filePath)) {
      continue;
    }

    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = parseFrontmatter(fileContent);
    const id = toStringValue(frontmatter.name);
    if (id.length === 0) {
      continue;
    }

    skillPackages.push({
      id,
      name: toStringValue(frontmatter.displayName),
      vendor: toStringValue(frontmatter.vendor),
      emoji: toStringValue(frontmatter.emoji),
      tagline: toStringValue(frontmatter.tagline),
      description: toStringValue(frontmatter.description),
      category: toStringValue(frontmatter.category),
      installCmd: `rune skill add ${id}`,
      docsUrl: toStringValue(frontmatter.docsUrl),
      actionIds: toStringArray(frontmatter.skills),
      downloads: toOptionalNumber(frontmatter.downloads),
      stars: toOptionalNumber(frontmatter.stars),
      version: toStringValue(frontmatter.version) || undefined,
      verified: toOptionalBoolean(frontmatter.verified),
    });
  }

  return skillPackages;
}

export function loadRunes(): Rune[] {
  const repoDir = ensureRepoCache();
  const runesDir = path.join(repoDir, "runes");
  if (!existsSync(runesDir)) {
    return [];
  }

  const directories = readdirSync(runesDir).filter((entry) => {
    const entryPath = path.join(runesDir, entry);
    return statSync(entryPath).isDirectory();
  });

  const runes: Rune[] = [];

  for (const directory of directories) {
    const filePath = path.join(runesDir, directory, "RUNE.json");
    if (!existsSync(filePath)) {
      continue;
    }

    const fileContent = readFileSync(filePath, "utf8");
    runes.push(JSON.parse(fileContent) as Rune);
  }

  return runes;
}
