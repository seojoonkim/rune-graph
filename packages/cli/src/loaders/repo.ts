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
    const filePath = path.join(skillPackagesDir, directory, "SKILL.json");
    if (!existsSync(filePath)) {
      continue;
    }
    const fileContent = readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);
    const id = typeof data.name === "string" ? data.name : "";
    if (id.length === 0) {
      continue;
    }
    skillPackages.push({
      id,
      name: data.displayName ?? "",
      vendor: data.vendor ?? "",
      emoji: data.emoji ?? "",
      tagline: data.tagline ?? "",
      description: data.description ?? "",
      category: data.category ?? "",
      installCmd: `rune skill add ${id}`,
      docsUrl: data.docsUrl ?? "",
      actionIds: Array.isArray(data.skills) ? data.skills : [],
      downloads: typeof data.downloads === "number" ? data.downloads : undefined,
      stars: typeof data.stars === "number" ? data.stars : undefined,
      version: typeof data.version === "string" ? data.version : undefined,
      verified: typeof data.verified === "boolean" ? data.verified : undefined,
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
