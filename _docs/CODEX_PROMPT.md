# Build RuneHub — AI Skill Orchestration Marketplace

Read PLAN.md and STRATEGY.md first. Then build the complete Next.js project.

## Setup
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install reactflow framer-motion zustand next-mdx-remote gray-matter @tailwindcss/typography
```

## What to build

### 1. Data Layer: `/src/data/runes.ts`
Export typed data for all 10 Runes with full node/edge JSON (from PLAN.md).
Each rune: id, name, slug, purpose, skills, nodes[], edges[], useCase.

### 2. Theme: Dark RPG (Obsidian #0A0A0F, Arcane Purple #8B5CF6, Ember Gold #F59E0B)
Edit tailwind.config.ts to add custom colors.

### 3. Components
- `SkillNode.tsx` — custom React Flow node: category-colored border glow, skill label, category icon
- `DataEdge.tsx` — animated edge with label, shows data flow direction
- `PipelineGraph.tsx` — React Flow graph for individual Rune pipeline
- `FullGraph.tsx` — full 41-node graph with minimap, zoom, category filter sidebar
- `RuneCard.tsx` — card showing rune name, purpose, skill count, category tags
- `GlowCard.tsx` — dark card with purple glow border on hover

### 4. Pages

**`/` (page.tsx)** — Landing
- Hero: "Inscribe. Invoke. Trust." in large text, purple glow
- Tagline: "See how skills connect. Build what matters."
- Mini interactive graph demo (5 nodes from morning-brief)
- "10 Runes · 41 Skills · Open Source · Free Forever" stats bar
- CTA buttons: "Explore Runes" → /runes, "View Graph" → /graph

**`/runes` (runes/page.tsx)** — Catalog
- Grid of 10 RuneCards
- Category filter (All, Productivity, Research, Content, Dev, Data, Support, Social, Email, Finance, Team)

**`/runes/[slug]` (runes/[slug]/page.tsx)** — Detail
- Rune header (name, purpose, tags)
- PipelineGraph showing the rune's skill connections
- Skill list with category badges
- Use case section

**`/graph` (graph/page.tsx)** — Full Graph Explorer
- Full React Flow graph with ALL 41 nodes and 42 edges
- Left sidebar: category filter checkboxes (Input/API/LLM/Output) with colored dots
- Node colors: Input=#3B82F6, API=#10B981, LLM=#8B5CF6, Output=#F59E0B
- Click node → right panel shows: which Runes use this skill
- Minimap in bottom right
- "Hub Skills" highlight mode button (highlights llm-summarize, llm-classify)

**`/strategy` (strategy/page.tsx)** — render STRATEGY.md as markdown

**`/about` (about/page.tsx)** — simple page with mission + roadmap

### 5. Navigation
Dark navbar: RuneHub logo (🔮), links to Runes | Graph | Strategy | About
Purple active link indicator, hover glow effect.

### 6. Deploy prep
Add `.gitignore`, update `README.md` with project description.

## Visual style
- Background: #0A0A0F (near black)
- Cards: #13131A with #2A2A35 border
- Text: #E2E2E8
- Accent: #8B5CF6 (purple glow)
- Graph edges: animated dashed purple lines
- Node border glows match category color
- Font: system-ui (no external fonts needed)

## Important
- Make it look polished and impressive, not just functional
- The /graph page is the HERO feature — make it beautiful
- Every page should feel like a dark RPG UI
- All data is in /src/data/runes.ts — no backend needed
- TypeScript strict mode

When done, run: git add -A && git commit -m "feat: complete RuneHub v0.1" && git push
Then: openclaw system event --text "Done: RuneHub built and pushed to GitHub" --mode now
