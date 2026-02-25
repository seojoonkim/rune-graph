# RuneHub

Open-source registry of composable AI skill graphs (Runes). Browse, build, and share automation pipelines made from modular skill packages.

## Structure

```
rune-hub/
├── skill-packages/   # 139 service bundles (Gmail, Slack, ...) — SKILL.json
├── skills/           # 228 atomic operations (gmail-fetch, slack-post, ...) — SKILL.md
├── runes/            # 65 skill graphs (inbox-zero, morning-brief, ...) — RUNE.json
├── packages/
│   ├── web/          # Next.js frontend
│   └── cli/          # @rune-hub/cli
└── _docs/            # Architecture decisions
```

## Getting Started

```bash
bun install
bun run dev
```

Open http://localhost:3000.

## CLI

```bash
# dev (no build needed)
bun run dev:cli -- runes
bun run dev:cli -- runes show inbox-zero
bun run dev:cli -- skills
bun run dev:cli -- skills show gmail

# or build first, then run
bun run build:cli
node packages/cli/dist/index.js runes
```
