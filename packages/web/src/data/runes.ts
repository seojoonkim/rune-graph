export type SkillCategory = 'input' | 'api' | 'llm' | 'output';

export interface SkillNode {
  id: string;
  label: string;
  category: SkillCategory;
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

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  input: '#34d399',
  api: '#60a5fa',
  llm: '#a78bfa',
  output: '#f472b6',
}

// ═══════════════════════════════════════════════════════════════
// 30 RUNES — 10 Updated Originals + 20 New
// ═══════════════════════════════════════════════════════════════

const BASE_RUNES: Rune[] = [
  // ── 1. Morning Brief (v3 — 11 nodes, 3-input · dual-LLM · 3-output) ───
  {
    id: 'rune-morning-brief',
    slug: 'morning-brief',
    name: 'Morning Brief',
    purpose: 'Use when you want to wake up already informed — schedule conflicts, blocked PRs, headlines, and market moves synthesized into a 3-minute brief, delivered to Slack, Telegram, and Notion automatically.',
    category: 'Productivity',
    emoji: '🌅',
    useCase: 'Wake up to a 3-minute brief that already knows your schedule conflicts, blocked PRs, market moves, and relevant headlines — delivered to Slack, Telegram, and archived to Notion for future reference.',
    nodes: [
      { id: 'gcal-list-events',  label: 'Google Calendar',   category: 'input'  },
      { id: 'gmail-fetch',       label: 'Gmail Inbox',        category: 'input'  },
      { id: 'github-issues',     label: 'GitHub Issues',      category: 'input'  },
      { id: 'claude-triage',     label: 'Claude Triage',      category: 'llm'    },
      { id: 'brave-search',      label: 'Brave News Search',  category: 'api'    },
      { id: 'openweather-fetch', label: 'OpenWeatherMap',     category: 'api'    },
      { id: 'market-pulse',      label: 'Market Pulse',       category: 'api'    },
      { id: 'claude-compose',    label: 'Claude Compose',     category: 'llm'    },
      { id: 'slack-post',        label: 'Slack Post',         category: 'output' },
      { id: 'telegram-send',     label: 'Telegram Send',      category: 'output' },
      { id: 'notion-append',     label: 'Notion Archive',     category: 'output' },
    ],
    edges: [
      { source: 'gcal-list-events',  target: 'claude-triage',   label: 'schedule'        },
      { source: 'gmail-fetch',       target: 'claude-triage',   label: 'emails'          },
      { source: 'github-issues',     target: 'claude-triage',   label: 'dev tasks'       },
      { source: 'claude-triage',     target: 'claude-compose',  label: 'priority matrix' },
      { source: 'brave-search',      target: 'claude-compose',  label: 'headlines'       },
      { source: 'openweather-fetch', target: 'claude-compose',  label: 'weather'         },
      { source: 'market-pulse',      target: 'claude-compose',  label: 'market'          },
      { source: 'claude-compose',    target: 'slack-post',      label: 'team brief'      },
      { source: 'claude-compose',    target: 'telegram-send',   label: 'mobile push'     },
      { source: 'claude-compose',    target: 'notion-append',   label: 'archive'         },
    ],
  },

  // ── 2. Deep Research (updated) ─────────────────────────────
  {
    id: 'rune-deep-research',
    slug: 'deep-research',
    name: 'Deep Research',
    purpose: 'Use when you need to go deep on any topic fast — web, arXiv, and semantic search synthesized into a structured report in under 60 seconds.',
    category: 'Research',
    emoji: '🔬',
    useCase: 'Research any topic thoroughly with sources from the web, arXiv, and Wikipedia, then get a structured report.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'perplexity-search', label: 'Perplexity Search', category: 'api' },
      { id: 'arxiv-search', label: 'arXiv Search Papers', category: 'api' },
      { id: 'exa-search', label: 'Exa Semantic Search', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'perplexity-search', label: 'research query' },
      { source: 'user-input', target: 'arxiv-search', label: 'research query' },
      { source: 'user-input', target: 'exa-search', label: 'research query' },
      { source: 'perplexity-search', target: 'claude-analyze', label: 'web results' },
      { source: 'arxiv-search', target: 'claude-analyze', label: 'papers' },
      { source: 'exa-search', target: 'claude-analyze', label: 'semantic results' },
      { source: 'claude-analyze', target: 'notion-write', label: 'research report' },
    ],
  },

  // ── 3. Blog Forge (updated) ────────────────────────────────
  {
    id: 'rune-blog-forge',
    slug: 'blog-forge',
    name: 'Blog Forge',
    purpose: 'Use when you want to turn a rough topic idea into a fully researched, SEO-optimized blog post — without writing a single word yourself.',
    category: 'Content',
    emoji: '📝',
    useCase: 'Turn a simple topic into a fully researched, SEO-optimized blog post ready for publishing on WordPress or Ghost.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'brave-search', label: 'Brave Web Search', category: 'api' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'dalle3-generate', label: 'DALL-E 3 Generate Image', category: 'llm' },
      { id: 'wordpress-publish', label: 'WordPress Publish Post', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'brave-search', label: 'topic' },
      { source: 'brave-search', target: 'claude-draft', label: 'research data' },
      { source: 'user-input', target: 'claude-draft', label: 'topic + tone' },
      { source: 'claude-draft', target: 'dalle3-generate', label: 'image prompt' },
      { source: 'claude-draft', target: 'wordpress-publish', label: 'blog post' },
      { source: 'dalle3-generate', target: 'wordpress-publish', label: 'featured image' },
    ],
  },

  // ── 4. Code Sentinel (updated) ─────────────────────────────
  {
    id: 'rune-code-sentinel',
    slug: 'code-sentinel',
    name: 'Code Sentinel',
    purpose: 'Use when you want AI code review on every GitHub PR — bugs, security holes, and style issues caught and posted as comments automatically.',
    category: 'DevOps',
    emoji: '🛡️',
    useCase: 'Get instant AI-powered code reviews on every GitHub PR with actionable feedback posted as comments.',
    nodes: [
      { id: 'github-list-prs', label: 'GitHub List PRs', category: 'input' },
      { id: 'github-get-diff', label: 'GitHub Get Diff', category: 'input' },
      { id: 'eslint-check', label: 'ESLint Check', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'github-post-comment', label: 'GitHub Post PR Comment', category: 'output' },
    ],
    edges: [
      { source: 'github-list-prs', target: 'github-get-diff', label: 'PR reference' },
      { source: 'github-get-diff', target: 'eslint-check', label: 'code diff' },
      { source: 'github-get-diff', target: 'claude-analyze', label: 'code diff' },
      { source: 'eslint-check', target: 'claude-analyze', label: 'lint results' },
      { source: 'claude-analyze', target: 'github-post-comment', label: 'review feedback' },
    ],
  },

  // ── 5. Data Insight (updated) ──────────────────────────────
  {
    id: 'rune-data-insight',
    slug: 'data-insight',
    name: 'Data Insight',
    purpose: 'Analyze spreadsheet or database data and generate visual insights with AI interpretation.',
    category: 'Analytics',
    emoji: '📊',
    useCase: 'Connect to Google Sheets or BigQuery, analyze trends, and get plain-English insights posted to Slack.',
    nodes: [
      { id: 'gsheets-read', label: 'Google Sheets Read', category: 'input' },
      { id: 'bigquery-query', label: 'BigQuery Run Query', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'gsheets-read', target: 'claude-analyze', label: 'spreadsheet data' },
      { source: 'bigquery-query', target: 'claude-analyze', label: 'query results' },
      { source: 'claude-analyze', target: 'gsheets-write', label: 'analysis tables' },
      { source: 'claude-analyze', target: 'slack-post', label: 'insight summary' },
    ],
  },

  // ── 6. Support Sage (updated) ──────────────────────────────
  {
    id: 'rune-support-sage',
    slug: 'support-sage',
    name: 'Support Sage',
    purpose: 'Auto-classify and draft replies for customer support tickets using AI.',
    category: 'Customer Support',
    emoji: '🧙',
    useCase: 'Triage Zendesk tickets automatically — classify urgency, draft responses, and escalate critical issues.',
    nodes: [
      { id: 'zendesk-list-tickets', label: 'Zendesk List Tickets', category: 'input' },
      { id: 'claude-classify', label: 'Claude Classify', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'zendesk-reply', label: 'Zendesk Reply Ticket', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'zendesk-list-tickets', target: 'claude-classify', label: 'tickets' },
      { source: 'claude-classify', target: 'claude-draft', label: 'classified tickets' },
      { source: 'claude-draft', target: 'zendesk-reply', label: 'draft reply' },
      { source: 'claude-classify', target: 'slack-post', label: 'escalation alerts' },
    ],
  },

  // ── 7. Social Pulse (updated) ──────────────────────────────
  {
    id: 'rune-social-pulse',
    slug: 'social-pulse',
    name: 'Social Pulse',
    purpose: 'Monitor brand mentions and sentiment across Twitter, Reddit, and news sources.',
    category: 'Marketing',
    emoji: '📡',
    useCase: 'Track what people are saying about your brand across social media and get a daily sentiment report.',
    nodes: [
      { id: 'twitter-search', label: 'Twitter/X Search', category: 'input' },
      { id: 'brave-search', label: 'Brave Web Search', category: 'api' },
      { id: 'hackernews-fetch', label: 'Hacker News Fetch', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'twitter-search', target: 'claude-analyze', label: 'tweets' },
      { source: 'brave-search', target: 'claude-analyze', label: 'news mentions' },
      { source: 'hackernews-fetch', target: 'claude-analyze', label: 'HN discussions' },
      { source: 'claude-analyze', target: 'notion-write', label: 'sentiment report' },
      { source: 'claude-analyze', target: 'slack-post', label: 'pulse summary' },
    ],
  },

  // ── 8. Inbox Zero (updated) ────────────────────────────────
  {
    id: 'rune-inbox-zero',
    slug: 'inbox-zero',
    name: 'Inbox Zero',
    purpose: 'Automatically triage, categorize, and draft replies for email overload.',
    category: 'Productivity',
    emoji: '📨',
    useCase: 'Let AI classify your Gmail inbox, draft quick replies, and label everything so you hit inbox zero daily.',
    nodes: [
      { id: 'gmail-fetch', label: 'Gmail Fetch Emails', category: 'input' },
      { id: 'claude-classify', label: 'Claude Classify', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'gmail-label', label: 'Gmail Apply Label', category: 'api' },
      { id: 'gmail-send', label: 'Gmail Send Email', category: 'output' },
    ],
    edges: [
      { source: 'gmail-fetch', target: 'claude-classify', label: 'unread emails' },
      { source: 'claude-classify', target: 'gmail-label', label: 'category labels' },
      { source: 'claude-classify', target: 'claude-draft', label: 'needs-reply emails' },
      { source: 'claude-draft', target: 'gmail-send', label: 'draft replies' },
    ],
  },

  // ── 9. Alpha Watch (updated) ───────────────────────────────
  {
    id: 'rune-alpha-watch',
    slug: 'alpha-watch',
    name: 'Alpha Watch',
    purpose: 'Use when you need real-time crypto intelligence — price moves, whale transactions, and DeFi yield shifts delivered as alerts the moment they happen.',
    category: 'Finance',
    emoji: '🐺',
    useCase: 'Get real-time alerts on crypto price movements, whale transactions, and DeFi yield opportunities.',
    nodes: [
      { id: 'coingecko-price', label: 'CoinGecko Get Price', category: 'api' },
      { id: 'defillama-tvl', label: 'DeFiLlama Get TVL', category: 'api' },
      { id: 'etherscan-txns', label: 'Etherscan Get Transactions', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'telegram-send', label: 'Telegram Send Message', category: 'output' },
    ],
    edges: [
      { source: 'coingecko-price', target: 'claude-analyze', label: 'price data' },
      { source: 'defillama-tvl', target: 'claude-analyze', label: 'TVL changes' },
      { source: 'etherscan-txns', target: 'claude-analyze', label: 'whale txns' },
      { source: 'claude-analyze', target: 'telegram-send', label: 'alpha alert' },
    ],
  },

  // ── 10. Standup Sync (updated) ─────────────────────────────
  {
    id: 'rune-standup-sync',
    slug: 'standup-sync',
    name: 'Standup Sync',
    purpose: 'Auto-generate daily standup updates from GitHub activity, Linear issues, and Slack messages.',
    category: 'DevOps',
    emoji: '🤝',
    useCase: 'Never write a standup again — let AI compile your commits, tickets, and messages into a standup post.',
    nodes: [
      { id: 'github-list-prs', label: 'GitHub List PRs', category: 'input' },
      { id: 'linear-fetch-issues', label: 'Linear Fetch Issues', category: 'input' },
      { id: 'slack-fetch', label: 'Slack Read Channel', category: 'input' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'github-list-prs', target: 'claude-summarize', label: 'PR activity' },
      { source: 'linear-fetch-issues', target: 'claude-summarize', label: 'ticket updates' },
      { source: 'slack-fetch', target: 'claude-summarize', label: 'discussion context' },
      { source: 'claude-summarize', target: 'slack-post', label: 'standup update' },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // 20 NEW RUNES
  // ══════════════════════════════════════════════════════════════

  // ── 11. Release Radar ──────────────────────────────────────
  {
    id: 'rune-release-radar',
    slug: 'release-radar',
    name: 'Release Radar',
    purpose: 'Monitor GitHub releases for tracked repositories and notify the team with changelogs.',
    category: 'DevOps',
    emoji: '📡',
    useCase: 'Stay on top of dependency updates and framework releases with auto-generated changelog summaries in Slack.',
    nodes: [
      { id: 'github-list-releases', label: 'GitHub List Releases', category: 'input' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
      { id: 'discord-post', label: 'Discord Send Message', category: 'output' },
    ],
    edges: [
      { source: 'github-list-releases', target: 'claude-summarize', label: 'release notes' },
      { source: 'claude-summarize', target: 'slack-post', label: 'changelog summary' },
      { source: 'claude-summarize', target: 'discord-post', label: 'changelog summary' },
    ],
  },

  // ── 12. Vuln Sentinel ──────────────────────────────────────
  {
    id: 'rune-vuln-sentinel',
    slug: 'vuln-sentinel',
    name: 'Vuln Sentinel',
    purpose: 'Scan code for vulnerabilities across multiple security tools and generate a unified security report.',
    category: 'Security',
    emoji: '🔐',
    useCase: 'Run Snyk, SonarQube, and VirusTotal scans and get a single prioritized security report with remediation advice.',
    nodes: [
      { id: 'snyk-scan', label: 'Snyk Vulnerability Scan', category: 'api' },
      { id: 'sonarqube-scan', label: 'SonarQube Code Analysis', category: 'api' },
      { id: 'virustotal-scan', label: 'VirusTotal Scan', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'github-create-issue', label: 'GitHub Create Issue', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'snyk-scan', target: 'claude-analyze', label: 'dependency vulns' },
      { source: 'sonarqube-scan', target: 'claude-analyze', label: 'code issues' },
      { source: 'virustotal-scan', target: 'claude-analyze', label: 'malware results' },
      { source: 'claude-analyze', target: 'github-create-issue', label: 'critical issues' },
      { source: 'claude-analyze', target: 'slack-post', label: 'security report' },
    ],
  },

  // ── 13. Price Hawk ─────────────────────────────────────────
  {
    id: 'rune-price-hawk',
    slug: 'price-hawk',
    name: 'Price Hawk',
    purpose: 'Monitor competitor prices against your Shopify catalog and alert on significant changes.',
    category: 'E-Commerce',
    emoji: '🦅',
    useCase: 'Track competitor pricing daily, compare against your Shopify products, and get alerts when prices shift.',
    nodes: [
      { id: 'shopify-list-products', label: 'Shopify List Products', category: 'input' },
      { id: 'apify-scraper', label: 'Apify Web Scraper', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'shopify-list-products', target: 'claude-analyze', label: 'your prices' },
      { source: 'apify-scraper', target: 'claude-analyze', label: 'competitor prices' },
      { source: 'claude-analyze', target: 'gsheets-write', label: 'price comparison' },
      { source: 'claude-analyze', target: 'slack-post', label: 'price alerts' },
    ],
  },

  // ── 14. Learn Forge ────────────────────────────────────────
  {
    id: 'rune-learn-forge',
    slug: 'learn-forge',
    name: 'Learn Forge',
    purpose: 'Convert articles, PDFs, or audio content into study flashcards for spaced repetition.',
    category: 'Education',
    emoji: '🎓',
    useCase: 'Paste any article or upload a PDF, and get Anki-compatible flashcards generated by AI.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'pdf-parse', label: 'PDF Parse', category: 'api' },
      { id: 'whisper-transcribe', label: 'Whisper Transcribe Audio', category: 'llm' },
      { id: 'claude-extract', label: 'Claude Extract Data', category: 'llm' },
      { id: 'anki-export', label: 'Anki Export Deck', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'claude-extract', label: 'article text' },
      { source: 'pdf-parse', target: 'claude-extract', label: 'parsed PDF' },
      { source: 'whisper-transcribe', target: 'claude-extract', label: 'transcript' },
      { source: 'claude-extract', target: 'anki-export', label: 'flashcards' },
    ],
  },

  // ── 15. Wellness Log ───────────────────────────────────────
  {
    id: 'rune-wellness-log',
    slug: 'wellness-log',
    name: 'Wellness Log',
    purpose: 'Aggregate sleep and health data from wearables, generate insights, and log to a journal.',
    category: 'Healthcare',
    emoji: '💚',
    useCase: 'Combine Oura Ring sleep data with Apple Health metrics to get daily AI wellness insights in Notion.',
    nodes: [
      { id: 'oura-sleep', label: 'Oura Ring Sleep Data', category: 'input' },
      { id: 'apple-health-fetch', label: 'Apple Health Fetch', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'oura-sleep', target: 'claude-analyze', label: 'sleep data' },
      { source: 'apple-health-fetch', target: 'claude-analyze', label: 'health metrics' },
      { source: 'claude-analyze', target: 'notion-write', label: 'wellness journal' },
    ],
  },

  // ── 16. Contract Guard ─────────────────────────────────────
  {
    id: 'rune-contract-guard',
    slug: 'contract-guard',
    name: 'Contract Guard',
    purpose: 'Parse contracts, extract key clauses, flag risks, and prepare for signing.',
    category: 'Legal',
    emoji: '⚖️',
    useCase: 'Upload a PDF contract, get AI analysis of risky clauses and obligations, then send via DocuSign if approved.',
    nodes: [
      { id: 'pdf-parse', label: 'PDF Parse', category: 'api' },
      { id: 'claude-extract', label: 'Claude Extract Data', category: 'llm' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
      { id: 'docusign-send', label: 'DocuSign Send Envelope', category: 'output' },
    ],
    edges: [
      { source: 'pdf-parse', target: 'claude-extract', label: 'contract text' },
      { source: 'claude-extract', target: 'claude-analyze', label: 'extracted clauses' },
      { source: 'claude-analyze', target: 'notion-write', label: 'risk report' },
      { source: 'claude-analyze', target: 'docusign-send', label: 'approved contract' },
    ],
  },

  // ── 17. Talent Scout ───────────────────────────────────────
  {
    id: 'rune-talent-scout',
    slug: 'talent-scout',
    name: 'Talent Scout',
    purpose: 'Source, enrich, and rank candidates from LinkedIn profiles for open positions.',
    category: 'HR',
    emoji: '🔎',
    useCase: 'Scrape LinkedIn profiles, parse resumes with AI, rank candidates by fit, and push top picks to HubSpot.',
    nodes: [
      { id: 'linkedin-scrape', label: 'LinkedIn Profile Scrape', category: 'api' },
      { id: 'pdf-parse', label: 'PDF Parse', category: 'api' },
      { id: 'claude-score', label: 'Claude Score & Rank', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
      { id: 'hubspot-create-contact', label: 'HubSpot Create Contact', category: 'output' },
    ],
    edges: [
      { source: 'linkedin-scrape', target: 'claude-score', label: 'profile data' },
      { source: 'pdf-parse', target: 'claude-score', label: 'resume data' },
      { source: 'claude-score', target: 'gsheets-write', label: 'ranked candidates' },
      { source: 'claude-score', target: 'hubspot-create-contact', label: 'top candidates' },
    ],
  },

  // ── 18. Campaign Pulse ─────────────────────────────────────
  {
    id: 'rune-campaign-pulse',
    slug: 'campaign-pulse',
    name: 'Campaign Pulse',
    purpose: 'Aggregate ad performance from Google and Meta, analyze with AI, and generate optimization recommendations.',
    category: 'Marketing',
    emoji: '📣',
    useCase: 'Pull Google Ads and Meta Ads data together, get AI analysis of what is working, and export optimization tips.',
    nodes: [
      { id: 'google-ads-fetch', label: 'Google Ads Fetch Report', category: 'input' },
      { id: 'meta-ads-fetch', label: 'Meta Ads Fetch Report', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'google-ads-fetch', target: 'claude-analyze', label: 'Google Ads data' },
      { source: 'meta-ads-fetch', target: 'claude-analyze', label: 'Meta Ads data' },
      { source: 'claude-analyze', target: 'gsheets-write', label: 'performance report' },
      { source: 'claude-analyze', target: 'slack-post', label: 'optimization tips' },
    ],
  },

  // ── 19. UX Audit ───────────────────────────────────────────
  {
    id: 'rune-ux-audit',
    slug: 'ux-audit',
    name: 'UX Audit',
    purpose: 'Capture screenshots of web pages, analyze UX and accessibility with AI vision, and report findings.',
    category: 'Design',
    emoji: '🎨',
    useCase: 'Screenshot any website, get GPT-4o Vision analysis for accessibility and UX issues, with a report saved to Notion.',
    nodes: [
      { id: 'screenshot-capture', label: 'Screenshot Capture', category: 'input' },
      { id: 'gpt4o-vision', label: 'GPT-4o Vision', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'screenshot-capture', target: 'gpt4o-vision', label: 'page screenshot' },
      { source: 'gpt4o-vision', target: 'claude-draft', label: 'UX findings' },
      { source: 'claude-draft', target: 'notion-write', label: 'audit report' },
    ],
  },

  // ── 20. Pod Notes ──────────────────────────────────────────
  {
    id: 'rune-pod-notes',
    slug: 'pod-notes',
    name: 'Pod Notes',
    purpose: 'Transcribe podcast episodes and generate structured show notes for publishing.',
    category: 'Media',
    emoji: '🎙️',
    useCase: 'Fetch a podcast episode from RSS, transcribe with Whisper, generate show notes, and draft on Substack.',
    nodes: [
      { id: 'podcast-rss-fetch', label: 'Podcast RSS Fetch', category: 'input' },
      { id: 'whisper-transcribe', label: 'Whisper Transcribe Audio', category: 'llm' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'substack-draft', label: 'Substack Create Draft', category: 'output' },
    ],
    edges: [
      { source: 'podcast-rss-fetch', target: 'whisper-transcribe', label: 'audio file' },
      { source: 'whisper-transcribe', target: 'claude-summarize', label: 'transcript' },
      { source: 'claude-summarize', target: 'claude-draft', label: 'key points' },
      { source: 'claude-draft', target: 'substack-draft', label: 'show notes post' },
    ],
  },

  // ── 21. Deal Engine ────────────────────────────────────────
  {
    id: 'rune-deal-engine',
    slug: 'deal-engine',
    name: 'Deal Engine',
    purpose: 'Source leads, enrich with company data, score with AI, and push qualified leads to CRM.',
    category: 'Sales',
    emoji: '💼',
    useCase: 'Find leads on Apollo, enrich with Clearbit, AI-score for fit, and auto-create deals in HubSpot CRM.',
    nodes: [
      { id: 'apollo-search', label: 'Apollo People Search', category: 'api' },
      { id: 'clearbit-enrich', label: 'Clearbit Enrich Company', category: 'api' },
      { id: 'claude-score', label: 'Claude Score & Rank', category: 'llm' },
      { id: 'hubspot-create-contact', label: 'HubSpot Create Contact', category: 'output' },
      { id: 'hubspot-update-deal', label: 'HubSpot Update Deal', category: 'output' },
    ],
    edges: [
      { source: 'apollo-search', target: 'clearbit-enrich', label: 'lead data' },
      { source: 'clearbit-enrich', target: 'claude-score', label: 'enriched profile' },
      { source: 'claude-score', target: 'hubspot-create-contact', label: 'qualified leads' },
      { source: 'claude-score', target: 'hubspot-update-deal', label: 'deal score' },
    ],
  },

  // ── 22. Trip Planner ───────────────────────────────────────
  {
    id: 'rune-trip-planner',
    slug: 'trip-planner',
    name: 'Trip Planner',
    purpose: 'Plan a complete trip itinerary with flights, hotels, and local attractions.',
    category: 'Travel',
    emoji: '✈️',
    useCase: 'Enter a destination and dates, get flight options from Skyscanner, hotels from Booking.com, and a full AI itinerary.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'skyscanner-search', label: 'Skyscanner Search Flights', category: 'api' },
      { id: 'booking-search', label: 'Booking.com Search Hotels', category: 'api' },
      { id: 'google-maps-places', label: 'Google Maps Places', category: 'api' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'skyscanner-search', label: 'dates + destination' },
      { source: 'user-input', target: 'booking-search', label: 'dates + destination' },
      { source: 'user-input', target: 'google-maps-places', label: 'destination' },
      { source: 'skyscanner-search', target: 'claude-draft', label: 'flight options' },
      { source: 'booking-search', target: 'claude-draft', label: 'hotel options' },
      { source: 'google-maps-places', target: 'claude-draft', label: 'attractions' },
      { source: 'claude-draft', target: 'notion-write', label: 'trip itinerary' },
    ],
  },

  // ── 23. Meta Coach ─────────────────────────────────────────
  {
    id: 'rune-meta-coach',
    slug: 'meta-coach',
    name: 'Meta Coach',
    purpose: 'Analyze gaming performance stats and generate strategy improvement tips.',
    category: 'Gaming',
    emoji: '🎮',
    useCase: 'Pull your Steam or Riot Games stats, get AI-powered strategy advice, and share tips to Discord.',
    nodes: [
      { id: 'steam-player-stats', label: 'Steam Player Stats', category: 'input' },
      { id: 'riot-match-history', label: 'Riot Games Match History', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'discord-post', label: 'Discord Send Message', category: 'output' },
    ],
    edges: [
      { source: 'steam-player-stats', target: 'claude-analyze', label: 'game stats' },
      { source: 'riot-match-history', target: 'claude-analyze', label: 'match data' },
      { source: 'claude-analyze', target: 'claude-draft', label: 'analysis' },
      { source: 'claude-draft', target: 'discord-post', label: 'strategy tips' },
    ],
  },

  // ── 24. Habit Loop ─────────────────────────────────────────
  {
    id: 'rune-habit-loop',
    slug: 'habit-loop',
    name: 'Habit Loop',
    purpose: 'Track daily habits with streak counting and AI-generated reflections.',
    category: 'Personal',
    emoji: '🔄',
    useCase: 'Check in daily, maintain streaks, and get personalized AI reflections on your progress in a Notion journal.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'streak-tracker', label: 'Streak Tracker', category: 'api' },
      { id: 'claude-reflect', label: 'Claude Reflect', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'streak-tracker', label: 'daily check-in' },
      { source: 'streak-tracker', target: 'claude-reflect', label: 'streak data' },
      { source: 'claude-reflect', target: 'notion-write', label: 'journal entry' },
    ],
  },

  // ── 25. Traffic Watch ──────────────────────────────────────
  {
    id: 'rune-traffic-watch',
    slug: 'traffic-watch',
    name: 'Traffic Watch',
    purpose: 'Detect anomalies in Google Analytics traffic and explain them with AI.',
    category: 'Analytics',
    emoji: '🚦',
    useCase: 'Automatically detect traffic spikes or drops in GA4, get AI explanations, and receive Slack alerts.',
    nodes: [
      { id: 'ga4-fetch', label: 'Google Analytics 4 Fetch', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
    ],
    edges: [
      { source: 'ga4-fetch', target: 'claude-analyze', label: 'traffic data' },
      { source: 'claude-analyze', target: 'slack-post', label: 'anomaly alert' },
      { source: 'claude-analyze', target: 'gsheets-write', label: 'anomaly log' },
    ],
  },

  // ── 26. Churn Shield ───────────────────────────────────────
  {
    id: 'rune-churn-shield',
    slug: 'churn-shield',
    name: 'Churn Shield',
    purpose: 'Predict customer churn by combining support interactions with billing data.',
    category: 'Customer Success',
    emoji: '🛡️',
    useCase: 'Combine Intercom engagement events with Stripe MRR data, predict churn risk, and flag at-risk accounts in CRM.',
    nodes: [
      { id: 'intercom-fetch-events', label: 'Intercom Fetch Events', category: 'input' },
      { id: 'stripe-get-mrr', label: 'Stripe Get MRR', category: 'input' },
      { id: 'claude-predict', label: 'Claude Predict', category: 'llm' },
      { id: 'hubspot-update-deal', label: 'HubSpot Update Deal', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'intercom-fetch-events', target: 'claude-predict', label: 'user events' },
      { source: 'stripe-get-mrr', target: 'claude-predict', label: 'MRR data' },
      { source: 'claude-predict', target: 'hubspot-update-deal', label: 'churn risk flag' },
      { source: 'claude-predict', target: 'slack-post', label: 'churn alert' },
    ],
  },

  // ── 27. Smart Home Brief ───────────────────────────────────
  {
    id: 'rune-smart-home-brief',
    slug: 'smart-home-brief',
    name: 'Smart Home Brief',
    purpose: 'Create a spoken morning briefing from smart home sensors, weather, and calendar.',
    category: 'IoT',
    emoji: '🏠',
    useCase: 'Wake up to an AI-narrated briefing that covers your home status, weather, and schedule via ElevenLabs TTS.',
    nodes: [
      { id: 'homeassistant-states', label: 'Home Assistant Get States', category: 'input' },
      { id: 'openweather-fetch', label: 'OpenWeatherMap Fetch', category: 'api' },
      { id: 'gcal-list-events', label: 'Google Calendar List Events', category: 'input' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'elevenlabs-tts', label: 'ElevenLabs Text-to-Speech', category: 'output' },
    ],
    edges: [
      { source: 'homeassistant-states', target: 'claude-summarize', label: 'sensor data' },
      { source: 'openweather-fetch', target: 'claude-summarize', label: 'weather' },
      { source: 'gcal-list-events', target: 'claude-summarize', label: 'schedule' },
      { source: 'claude-summarize', target: 'elevenlabs-tts', label: 'morning brief text' },
    ],
  },

  // ── 28. Doc Forge ──────────────────────────────────────────
  {
    id: 'rune-doc-forge',
    slug: 'doc-forge',
    name: 'Doc Forge',
    purpose: 'Auto-generate documentation from a GitHub repository by scanning code and comments.',
    category: 'Documentation',
    emoji: '📚',
    useCase: 'Point at a GitHub repo, scan the codebase, and auto-generate a README and API documentation.',
    nodes: [
      { id: 'github-scan-repo', label: 'GitHub Scan Repository', category: 'input' },
      { id: 'claude-extract', label: 'Claude Extract Data', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'github-create-issue', label: 'GitHub Create Issue', category: 'output' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'github-scan-repo', target: 'claude-extract', label: 'code files' },
      { source: 'claude-extract', target: 'claude-draft', label: 'extracted docs' },
      { source: 'claude-draft', target: 'github-create-issue', label: 'doc PR suggestion' },
      { source: 'claude-draft', target: 'notion-write', label: 'API documentation' },
    ],
  },

  // ── 29. Rank Tracker ───────────────────────────────────────
  {
    id: 'rune-rank-tracker',
    slug: 'rank-tracker',
    name: 'Rank Tracker',
    purpose: 'Monitor SEO rankings and backlinks, identify content gaps, and generate improvement reports.',
    category: 'SEO',
    emoji: '📈',
    useCase: 'Combine SEMrush ranking data with Ahrefs backlink analysis to find content gaps and SEO opportunities.',
    nodes: [
      { id: 'semrush-fetch', label: 'SEMrush Fetch Rankings', category: 'input' },
      { id: 'ahrefs-fetch', label: 'Ahrefs Fetch Backlinks', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
    ],
    edges: [
      { source: 'semrush-fetch', target: 'claude-analyze', label: 'ranking data' },
      { source: 'ahrefs-fetch', target: 'claude-analyze', label: 'backlink data' },
      { source: 'claude-analyze', target: 'claude-draft', label: 'content gaps' },
      { source: 'claude-draft', target: 'gsheets-write', label: 'SEO report' },
    ],
  },

  // ── 30. Rival Watch ────────────────────────────────────────
  {
    id: 'rune-rival-watch',
    slug: 'rival-watch',
    name: 'Rival Watch',
    purpose: 'Use when you need to know what competitors are building, saying, and launching — before you see it in the news. Auto-generated battlecards, always fresh.',
    category: 'Competitive Intel',
    emoji: '🕵️',
    useCase: 'Crawl competitor websites, track their Twitter, monitor Product Hunt launches, and get AI-generated battlecards.',
    nodes: [
      { id: 'firecrawl-scrape', label: 'Firecrawl Scrape Page', category: 'api' },
      { id: 'twitter-search', label: 'Twitter/X Search', category: 'input' },
      { id: 'producthunt-fetch', label: 'Product Hunt Fetch', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'firecrawl-scrape', target: 'claude-analyze', label: 'competitor pages' },
      { source: 'twitter-search', target: 'claude-analyze', label: 'competitor tweets' },
      { source: 'producthunt-fetch', target: 'claude-analyze', label: 'new launches' },
      { source: 'claude-analyze', target: 'claude-draft', label: 'competitive analysis' },
      { source: 'claude-draft', target: 'notion-write', label: 'battlecard' },
    ],
  },

  {
    id: 'rune-customer-support-triage',
    slug: 'customer-support-triage',
    name: 'Customer Support Triage',
    purpose: 'Classify Zendesk tickets with Claude and route responses to Slack and email.',
    category: 'Customer Support',
    emoji: '🎧',
    useCase: 'Automatically route Zendesk tickets based on intent, with Slack or email follow-up.',
    nodes: [
      { id: 'zendesk-get-ticket', label: 'Zendesk Get Ticket', category: 'input' },
      { id: 'claude-classify', label: 'Claude Classify', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
      { id: 'sendgrid-send', label: 'SendGrid Send Email', category: 'output' },
    ],
    edges: [
      { source: 'zendesk-get-ticket', target: 'claude-classify', label: 'ticket content' },
      { source: 'claude-classify', target: 'slack-post', label: 'route to Slack' },
      { source: 'claude-classify', target: 'sendgrid-send', label: 'route to email' },
    ],
  },
  {
    id: 'rune-ecommerce-order-pipeline',
    slug: 'ecommerce-order-pipeline',
    name: 'E-commerce Order Pipeline',
    purpose: 'Handle new Shopify orders through inventory checks, charging, and confirmation notifications.',
    category: 'E-Commerce',
    emoji: '🛍️',
    useCase: 'Automatically validate inventory, charge through PayPal, confirm by email, and log to Notion.',
    nodes: [
      { id: 'shopify-order', label: 'Shopify Order', category: 'input' },
      { id: 'shopify-inventory', label: 'Shopify Check Inventory', category: 'api' },
      { id: 'paypal-create-order', label: 'PayPal Create Order', category: 'api' },
      { id: 'sendgrid-send', label: 'SendGrid Send Email', category: 'output' },
      { id: 'notion-create-page', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'shopify-order', target: 'shopify-inventory', label: 'check inventory' },
      { source: 'shopify-inventory', target: 'paypal-create-order', label: 'create payment' },
      { source: 'paypal-create-order', target: 'sendgrid-send', label: 'order confirmation' },
      { source: 'shopify-order', target: 'notion-create-page', label: 'order record' },
    ],
  },
  {
    id: 'rune-social-media-blast',
    slug: 'social-media-blast',
    name: 'Social Media Blast',
    purpose: 'Generate social posts with Claude and publish across multiple channels.',
    category: 'Marketing',
    emoji: '🚀',
    useCase: 'Draft campaign copy with Claude then publish to Instagram, LinkedIn, and Twitter.',
    nodes: [
      { id: 'claude-draft', label: 'Claude Draft', category: 'llm' },
      { id: 'instagram-post', label: 'Instagram Post', category: 'output' },
      { id: 'linkedin-post', label: 'LinkedIn Post', category: 'output' },
      { id: 'twitter-x-tweet', label: 'Twitter/X Tweet', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'claude-draft', target: 'instagram-post', label: 'instagram copy' },
      { source: 'claude-draft', target: 'linkedin-post', label: 'linkedin copy' },
      { source: 'claude-draft', target: 'twitter-x-tweet', label: 'tweet copy' },
      { source: 'claude-draft', target: 'slack-post', label: 'approval request' },
    ],
  },
  {
    id: 'rune-devops-incident-response',
    slug: 'devops-incident-response',
    name: 'DevOps Incident Response',
    purpose: 'Detect Sentry errors, create PagerDuty alerts, and summarize context in Slack.',
    category: 'DevOps',
    emoji: '🚨',
    useCase: 'Automate incident triage from Sentry into PagerDuty and Slack with Claude analysis.',
    nodes: [
      { id: 'sentry-get-issues', label: 'Sentry Get Issues', category: 'input' },
      { id: 'pagerduty-trigger', label: 'PagerDuty Trigger Incident', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'sentry-get-issues', target: 'pagerduty-trigger', label: 'incident alert' },
      { source: 'sentry-get-issues', target: 'claude-analyze', label: 'error context' },
      { source: 'claude-analyze', target: 'slack-post', label: 'incident summary' },
    ],
  },
  {
    id: 'rune-sales-crm-enrichment',
    slug: 'sales-crm-enrichment',
    name: 'Sales CRM Enrichment',
    purpose: 'Create Salesforce leads from LinkedIn profiles and personalize outreach with Claude.',
    category: 'Sales',
    emoji: '🤝',
    useCase: 'Capture leads from LinkedIn and push enriched Salesforce records plus SendGrid draft messages.',
    nodes: [
      { id: 'linkedin-profile', label: 'LinkedIn Profile', category: 'input' },
      { id: 'salesforce-create-lead', label: 'Salesforce Create Lead', category: 'api' },
      { id: 'claude-draft', label: 'Claude Draft', category: 'llm' },
      { id: 'sendgrid-send', label: 'SendGrid Send Email', category: 'output' },
    ],
    edges: [
      { source: 'linkedin-profile', target: 'salesforce-create-lead', label: 'lead data' },
      { source: 'salesforce-create-lead', target: 'claude-draft', label: 'lead context' },
      { source: 'claude-draft', target: 'sendgrid-send', label: 'personalized outreach' },
    ],
  },
  {
    id: 'rune-hr-onboarding',
    slug: 'hr-onboarding',
    name: 'HR Onboarding',
    purpose: 'Trigger payroll setup, Slack notifications, calendar events, and handoff notes for new hires.',
    category: 'HR',
    emoji: '🎉',
    useCase: 'Onboard greenhouse hires by setting up Gusto payroll, Slack, calendar, and documentation.',
    nodes: [
      { id: 'greenhouse-candidate', label: 'Greenhouse Candidate', category: 'input' },
      { id: 'gusto-employee', label: 'Gusto Create Employee', category: 'api' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
      { id: 'gcal-create-event', label: 'Google Calendar Create Event', category: 'output' },
      { id: 'notion-create-page', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'greenhouse-candidate', target: 'gusto-employee', label: 'onboard employee' },
      { source: 'greenhouse-candidate', target: 'slack-post', label: 'welcome message' },
      { source: 'greenhouse-candidate', target: 'gcal-create-event', label: 'orientation event' },
      { source: 'greenhouse-candidate', target: 'notion-create-page', label: 'onboarding handbook' },
    ],
  },
  {
    id: 'rune-content-research-digest',
    slug: 'content-research-digest',
    name: 'Content Research Digest',
    purpose: 'Pull research from news and academic sources, synthesize with AI, and save in Notion.',
    category: 'Research',
    emoji: '🧠',
    useCase: 'Generate a research digest from news headlines and papers in one Notion page.',
    nodes: [
      { id: 'news-top-headlines', label: 'NewsAPI Top Headlines', category: 'input' },
      { id: 'semantic-scholar-search', label: 'Semantic Scholar Search', category: 'api' },
      { id: 'arxiv-search', label: 'arXiv Search Papers', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-create-page', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'news-top-headlines', target: 'claude-analyze', label: 'headlines' },
      { source: 'semantic-scholar-search', target: 'claude-analyze', label: 'academic results' },
      { source: 'arxiv-search', target: 'claude-analyze', label: 'paper results' },
      { source: 'claude-analyze', target: 'notion-create-page', label: 'research digest' },
    ],
  },
  {
    id: 'rune-financial-reconciliation',
    slug: 'financial-reconciliation',
    name: 'Financial Reconciliation',
    purpose: 'Match Stripe webhook events with QuickBooks and flag anomalies with AI.',
    category: 'Finance',
    emoji: '🧾',
    useCase: 'Detect billing mismatches and notify teams automatically in Slack.',
    nodes: [
      { id: 'stripe-webhook', label: 'Stripe Webhook', category: 'input' },
      { id: 'quickbooks-create-invoice', label: 'QuickBooks Create Invoice', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'stripe-webhook', target: 'quickbooks-create-invoice', label: 'invoice sync' },
      { source: 'quickbooks-create-invoice', target: 'claude-analyze', label: 'reconciliation data' },
      { source: 'claude-analyze', target: 'slack-post', label: 'anomaly alert' },
    ],
  },
  {
    id: 'rune-security-incident-triage',
    slug: 'security-incident-triage',
    name: 'Security Incident Triage',
    purpose: 'Combine monitoring signals and escalate critical issues automatically.',
    category: 'Security',
    emoji: '🛡️',
    useCase: 'Use Datadog and Sentry context to risk-score incidents and trigger PagerDuty/Slack.',
    nodes: [
      { id: 'datadog-query-metric', label: 'Datadog Query Metric', category: 'input' },
      { id: 'sentry-get-issues', label: 'Sentry Get Issues', category: 'input' },
      { id: 'claude-classify', label: 'Claude Classify', category: 'llm' },
      { id: 'pagerduty-trigger', label: 'PagerDuty Trigger', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'datadog-query-metric', target: 'claude-classify', label: 'observability metrics' },
      { source: 'sentry-get-issues', target: 'claude-classify', label: 'error context' },
      { source: 'claude-classify', target: 'pagerduty-trigger', label: 'critical incidents' },
      { source: 'claude-classify', target: 'slack-post', label: 'triage summary' },
    ],
  },
  {
    id: 'rune-video-summary-pipeline',
    slug: 'video-summary-pipeline',
    name: 'Video Summary Pipeline',
    purpose: 'Turn Loom recordings into concise summaries and distribute them internally.',
    category: 'Media',
    emoji: '🎬',
    useCase: 'Transcribe Loom videos with Whisper, summarize with Claude, then share in Slack and Notion.',
    nodes: [
      { id: 'loom-get-video', label: 'Loom Get Video', category: 'input' },
      { id: 'whisper-transcribe', label: 'Whisper Transcribe', category: 'api' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'notion-create-page', label: 'Notion Create Page', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'loom-get-video', target: 'whisper-transcribe', label: 'media input' },
      { source: 'whisper-transcribe', target: 'claude-summarize', label: 'transcript' },
      { source: 'claude-summarize', target: 'notion-create-page', label: 'meeting notes' },
      { source: 'claude-summarize', target: 'slack-post', label: 'team brief' },
    ],
  },
  {
    id: 'rune-competitor-intelligence',
    slug: 'competitor-intelligence',
    name: 'Competitor Intelligence',
    purpose: 'Scrape competitors and analyze intelligence before writing a report.',
    category: 'Competitive Intel',
    emoji: '🕵️',
    useCase: 'Fetch news and scraped data, analyze with Claude, and write a structured report to Google Sheets.',
    nodes: [
      { id: 'brave-search', label: 'Brave Search', category: 'input' },
      { id: 'firecrawl-scrape', label: 'Firecrawl Scrape', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'google-sheets-append', label: 'Google Sheets Append', category: 'output' },
    ],
    edges: [
      { source: 'brave-search', target: 'firecrawl-scrape', label: 'search targets' },
      { source: 'firecrawl-scrape', target: 'claude-analyze', label: 'scraped content' },
      { source: 'claude-analyze', target: 'google-sheets-append', label: 'intelligence report' },
    ],
  },
  {
    id: 'rune-github-pr-review',
    slug: 'github-pr-review',
    name: 'GitHub PR Review',
    purpose: 'Run Claude over PRs, post AI review feedback, and notify via Slack.',
    category: 'DevOps',
    emoji: '🧪',
    useCase: 'Convert manual PR reviews into consistent AI-assisted quality checks.',
    nodes: [
      { id: 'github-pr-read', label: 'GitHub PR Read', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'github-pr-comment', label: 'GitHub Comment', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'github-pr-read', target: 'claude-analyze', label: 'PR diff' },
      { source: 'claude-analyze', target: 'github-pr-comment', label: 'code feedback' },
      { source: 'claude-analyze', target: 'slack-post', label: 'review status' },
    ],
  },
  {
    id: 'rune-podcast-to-blog',
    slug: 'podcast-to-blog',
    name: 'Podcast To Blog',
    purpose: 'Convert podcast episodes into drafted blog posts.',
    category: 'Content',
    emoji: '🎙️',
    useCase: 'Fetch podcast episodes, transcribe with Whisper, then draft blog content with Claude.',
    nodes: [
      { id: 'spotify-search', label: 'Spotify Search', category: 'input' },
      { id: 'whisper-transcribe', label: 'Whisper Transcribe', category: 'api' },
      { id: 'claude-draft', label: 'Claude Draft', category: 'llm' },
      { id: 'notion-create-page', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'spotify-search', target: 'whisper-transcribe', label: 'episode audio' },
      { source: 'whisper-transcribe', target: 'claude-draft', label: 'transcript' },
      { source: 'claude-draft', target: 'notion-create-page', label: 'blog draft' },
    ],
  },
  {
    id: 'rune-lead-scoring-pipeline',
    slug: 'lead-scoring-pipeline',
    name: 'Lead Scoring Pipeline',
    purpose: 'Fetch HubSpot leads, score with AI, and sync score updates into Salesforce.',
    category: 'Sales',
    emoji: '🎯',
    useCase: 'Improve pipeline quality by auto-scoring leads and flagging top leads in Slack.',
    nodes: [
      { id: 'hubspot-fetch', label: 'HubSpot Fetch', category: 'input' },
      { id: 'claude-classify', label: 'Claude Classify', category: 'llm' },
      { id: 'salesforce-update-record', label: 'Salesforce Update Record', category: 'api' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'hubspot-fetch', target: 'claude-classify', label: 'lead details' },
      { source: 'claude-classify', target: 'salesforce-update-record', label: 'scoring metadata' },
      { source: 'salesforce-update-record', target: 'slack-post', label: 'high-score alert' },
    ],
  },
  {
    id: 'rune-e-learning-quiz-gen',
    slug: 'e-learning-quiz-gen',
    name: 'E-learning Quiz Generator',
    purpose: 'Generate quizzes from topic research and track generated items.',
    category: 'Education',
    emoji: '🧩',
    useCase: 'Search a topic, draft quiz content with Claude, share in Discord, and log in Airtable.',
    nodes: [
      { id: 'brave-search', label: 'Brave Search', category: 'input' },
      { id: 'claude-draft', label: 'Claude Draft', category: 'llm' },
      { id: 'discord-post', label: 'Discord Post Message', category: 'output' },
      { id: 'airtable-create-record', label: 'Airtable Create Record', category: 'output' },
    ],
    edges: [
      { source: 'brave-search', target: 'claude-draft', label: 'quiz topic' },
      { source: 'claude-draft', target: 'discord-post', label: 'quiz publish' },
      { source: 'claude-draft', target: 'airtable-create-record', label: 'quiz tracking' },
    ],
  },
  {
    id: 'rune-crypto-price-monitor',
    slug: 'crypto-price-monitor',
    name: 'Crypto Price Monitor',
    purpose: 'Monitor token prices and explain trends with AI.',
    category: 'Finance',
    emoji: '🪙',
    useCase: 'Track CoinGecko price changes and send AI summaries to Telegram.',
    nodes: [
      { id: 'coingecko-price', label: 'CoinGecko Get Price', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'telegram-send', label: 'Telegram Send Message', category: 'output' },
    ],
    edges: [
      { source: 'coingecko-price', target: 'claude-analyze', label: 'price feed' },
      { source: 'claude-analyze', target: 'telegram-send', label: 'trend alert' },
    ],
  },
  {
    id: 'rune-local-business-monitor',
    slug: 'local-business-monitor',
    name: 'Local Business Monitor',
    purpose: 'Analyze place reviews for sentiment and deliver summaries to Slack and Notion.',
    category: 'Marketing',
    emoji: '🏙️',
    useCase: 'Capture local sentiment from Google reviews and summarize trends for teams.',
    nodes: [
      { id: 'places-reviews', label: 'Google Places Reviews', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
      { id: 'notion-create-page', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'places-reviews', target: 'claude-analyze', label: 'review text' },
      { source: 'claude-analyze', target: 'slack-post', label: 'sentiment summary' },
      { source: 'claude-analyze', target: 'notion-create-page', label: 'weekly report' },
    ],
  },
  {
    id: 'rune-contract-signing-workflow',
    slug: 'contract-signing-workflow',
    name: 'Contract Signing Workflow',
    purpose: 'Extract key terms from docusign statuses and publish legal log entries.',
    category: 'Legal',
    emoji: '✍️',
    useCase: 'Extract and summarize contract terms after DocuSign status updates.',
    nodes: [
      { id: 'docusign-status', label: 'Docusign Status', category: 'input' },
      { id: 'claude-extract', label: 'Claude Extract', category: 'llm' },
      { id: 'notion-create-page', label: 'Notion Create Page', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'docusign-status', target: 'claude-extract', label: 'signed docs' },
      { source: 'claude-extract', target: 'notion-create-page', label: 'contract terms' },
      { source: 'notion-create-page', target: 'slack-post', label: 'contract log update' },
    ],
  },
  {
    id: 'rune-multilingual-content',
    slug: 'multilingual-content',
    name: 'Multilingual Content',
    purpose: 'Translate and normalize content across translation engines, then dispatch for delivery.',
    category: 'Localization',
    emoji: '🌍',
    useCase: 'Run parallel translations through DeepL and Google then aggregate in Sheets for editors.',
    nodes: [
      { id: 'brave-search', label: 'Brave Search', category: 'input' },
      { id: 'deepl-translate', label: 'DeepL Translate', category: 'api' },
      { id: 'google-translate-text', label: 'Google Translate Text', category: 'api' },
      { id: 'google-sheets-append', label: 'Google Sheets Append', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'brave-search', target: 'deepl-translate', label: 'source content' },
      { source: 'brave-search', target: 'google-translate-text', label: 'source content' },
      { source: 'deepl-translate', target: 'google-sheets-append', label: 'deepl output' },
      { source: 'google-translate-text', target: 'google-sheets-append', label: 'google output' },
      { source: 'google-sheets-append', target: 'slack-post', label: 'delivery summary' },
    ],
  },
  {
    id: 'rune-db-etl-pipeline',
    slug: 'db-etl-pipeline',
    name: 'DB ETL Pipeline',
    purpose: 'Query PostgreSQL, summarize transformation logic, and push cleaned data summaries to Sheets.',
    category: 'Data',
    emoji: '⚙️',
    useCase: 'Run SQL extraction, transform insights with Claude, then report completion in Slack.',
    nodes: [
      { id: 'pg-query', label: 'Postgres Query', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'google-sheets-append', label: 'Google Sheets Append', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'pg-query', target: 'claude-analyze', label: 'raw dataset' },
      { source: 'claude-analyze', target: 'google-sheets-append', label: 'transformed output' },
      { source: 'google-sheets-append', target: 'slack-post', label: 'etl complete' },
    ],
  },
  {
    id: 'rune-cloud-cost-reporter',
    slug: 'cloud-cost-reporter',
    name: 'Cloud Cost Reporter',
    purpose: 'Compile Lambda invocation data and generate a weekly cost report.',
    category: 'DevOps',
    emoji: '💰',
    useCase: 'Poll Lambda, summarize cost trends with Claude, and post results to Slack and Sheets.',
    nodes: [
      { id: 'lambda-invoke', label: 'Lambda Invoke', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
      { id: 'google-sheets-append', label: 'Google Sheets Append', category: 'output' },
    ],
    edges: [
      { source: 'lambda-invoke', target: 'claude-analyze', label: 'cost data' },
      { source: 'claude-analyze', target: 'slack-post', label: 'weekly report' },
      { source: 'claude-analyze', target: 'google-sheets-append', label: 'cost log' },
    ],
  },
  {
    id: 'rune-social-listening',
    slug: 'social-listening',
    name: 'Social Listening',
    purpose: 'Track Twitter/X and Reddit signals and save sentiment analysis to PostHog and Slack.',
    category: 'Marketing',
    emoji: '📡',
    useCase: 'Collect social mentions from multiple sources, score sentiment with Claude, then store to PostHog.',
    nodes: [
      { id: 'twitter-x-search', label: 'Twitter/X Search', category: 'input' },
      { id: 'reddit-fetch-top', label: 'Reddit Fetch Top', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'posthog-capture', label: 'PostHog Capture', category: 'api' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'twitter-x-search', target: 'claude-analyze', label: 'tweet threads' },
      { source: 'reddit-fetch-top', target: 'claude-analyze', label: 'reddit posts' },
      { source: 'claude-analyze', target: 'posthog-capture', label: 'sentiment metrics' },
      { source: 'claude-analyze', target: 'slack-post', label: 'social digest' },
    ],
  },
  {
    id: 'rune-influencer-roi',
    slug: 'influencer-roi',
    name: 'Influencer ROI',
    purpose: 'Measure influencer campaign performance and sync lead updates.',
    category: 'Marketing',
    emoji: '📈',
    useCase: 'Analyze Instagram insights with Claude and push outcomes into HubSpot.',
    nodes: [
      { id: 'instagram-insights', label: 'Instagram Insights', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'hubspot-update', label: 'HubSpot Update', category: 'api' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'instagram-insights', target: 'claude-analyze', label: 'campaign performance' },
      { source: 'claude-analyze', target: 'hubspot-update', label: 'crm updates' },
      { source: 'claude-analyze', target: 'slack-post', label: 'roi report' },
    ],
  },
  {
    id: 'rune-smart-home-briefing',
    slug: 'smart-home-briefing',
    name: 'Smart Home Briefing',
    purpose: 'Create morning summaries from home and weather inputs and send by Telegram.',
    category: 'IoT',
    emoji: '🏠',
    useCase: 'Aggregate Home Assistant and weather signals into a concise briefing.',
    nodes: [
      { id: 'home-assistant-state', label: 'Home Assistant Sensor State', category: 'input' },
      { id: 'openweather-fetch', label: 'OpenWeatherMap Fetch', category: 'input' },
      { id: 'claude-draft', label: 'Claude Draft', category: 'llm' },
      { id: 'telegram-send', label: 'Telegram Send Message', category: 'output' },
    ],
    edges: [
      { source: 'home-assistant-state', target: 'claude-draft', label: 'sensor data' },
      { source: 'openweather-fetch', target: 'claude-draft', label: 'weather data' },
      { source: 'claude-draft', target: 'telegram-send', label: 'morning brief' },
    ],
  },
  {
    id: 'rune-research-paper-digest',
    slug: 'research-paper-digest',
    name: 'Research Paper Digest',
    purpose: 'Combine arXiv and Semantic Scholar into concise AI-generated summaries.',
    category: 'Research',
    emoji: '🧪',
    useCase: 'Pull papers by topic and produce digest entries in Notion with Slack alerts.',
    nodes: [
      { id: 'arxiv-search', label: 'arXiv Search', category: 'input' },
      { id: 's2-search', label: 'Semantic Scholar Search', category: 'api' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'notion-create-page', label: 'Notion Create Page', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'arxiv-search', target: 'claude-summarize', label: 'papers' },
      { source: 's2-search', target: 'claude-summarize', label: 'citations' },
      { source: 'claude-summarize', target: 'notion-create-page', label: 'research digest' },
      { source: 'claude-summarize', target: 'slack-post', label: 'digest alert' },
    ],
  },
  {
    id: 'rune-churn-prediction',
    slug: 'churn-prediction',
    name: 'Churn Prediction',
    purpose: 'Predict customer churn likelihood from usage events and update CRM flags.',
    category: 'Analytics',
    emoji: '📉',
    useCase: 'Score churn risk from Amplitude events and flag leads in Salesforce and Intercom.',
    nodes: [
      { id: 'amplitude-events', label: 'Amplitude Track', category: 'input' },
      { id: 'claude-classify', label: 'Claude Classify', category: 'llm' },
      { id: 'salesforce-update-record', label: 'Salesforce Update Record', category: 'api' },
      { id: 'intercom-send-message', label: 'Intercom Send Message', category: 'output' },
    ],
    edges: [
      { source: 'amplitude-events', target: 'claude-classify', label: 'behavior signals' },
      { source: 'claude-classify', target: 'salesforce-update-record', label: 'churn risk score' },
      { source: 'claude-classify', target: 'intercom-send-message', label: 'retention outreach' },
    ],
  },
  {
    id: 'rune-multilingual-support',
    slug: 'multilingual-support',
    name: 'Multilingual Support',
    purpose: 'Translate tickets, draft AI responses, and send back localized replies.',
    category: 'Customer Support',
    emoji: '🈯',
    useCase: 'Auto-handle multilingual Zendesk tickets with detect, draft, and back-translate flow.',
    nodes: [
      { id: 'zendesk-get-ticket', label: 'Zendesk Get Ticket', category: 'input' },
      { id: 'deepl-detect', label: 'DeepL Detect Language', category: 'api' },
      { id: 'claude-draft', label: 'Claude Draft', category: 'llm' },
      { id: 'deepl-translate', label: 'DeepL Translate', category: 'api' },
      { id: 'zendesk-update-ticket', label: 'Zendesk Update Ticket', category: 'output' },
    ],
    edges: [
      { source: 'zendesk-get-ticket', target: 'deepl-detect', label: 'ticket text' },
      { source: 'deepl-detect', target: 'claude-draft', label: 'detected language' },
      { source: 'claude-draft', target: 'deepl-translate', label: 'draft response' },
      { source: 'deepl-translate', target: 'zendesk-update-ticket', label: 'localized response' },
    ],
  },
  {
    id: 'rune-code-security-scan',
    slug: 'code-security-scan',
    name: 'Code Security Scan',
    purpose: 'Scan push events for security issues and create alerts automatically.',
    category: 'Security',
    emoji: '🧯',
    useCase: 'Analyze GitHub push events with Claude and create Sentry alerts plus Slack notices.',
    nodes: [
      { id: 'github-push-event', label: 'GitHub Push Event', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'sentry-create-alert', label: 'Sentry Create Alert', category: 'api' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'github-push-event', target: 'claude-analyze', label: 'code diff' },
      { source: 'claude-analyze', target: 'sentry-create-alert', label: 'security finding' },
      { source: 'claude-analyze', target: 'slack-post', label: 'security update' },
    ],
  },
  {
    id: 'rune-app-review-monitor',
    slug: 'app-review-monitor',
    name: 'App Review Monitor',
    purpose: 'Track reviews across Google Places and Yelp and produce sentiment insights.',
    category: 'Marketing',
    emoji: '⭐',
    useCase: 'Collect app reviews from multiple sources, summarize sentiment, and notify Slack/Notion.',
    nodes: [
      { id: 'places-reviews', label: 'Google Places Reviews', category: 'input' },
      { id: 'yelp-reviews', label: 'Yelp Reviews', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-create-page', label: 'Notion Create Page', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'places-reviews', target: 'claude-analyze', label: 'google reviews' },
      { source: 'yelp-reviews', target: 'claude-analyze', label: 'yelp reviews' },
      { source: 'claude-analyze', target: 'notion-create-page', label: 'app review digest' },
      { source: 'claude-analyze', target: 'slack-post', label: 'review insights' },
    ],
  },
  {
    id: 'rune-real-estate-deal-pipeline',
    slug: 'real-estate-deal-pipeline',
    name: 'Real Estate Deal Pipeline',
    purpose: 'Use location intelligence for deal analysis and route documentation actions.',
    category: 'Sales',
    emoji: '🏡',
    useCase: 'Generate market analysis from place data, then trigger DocuSign and Wise handoff actions.',
    nodes: [
      { id: 'gmaps-places', label: 'Google Maps Places', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'docusign-send', label: 'DocuSign Send Envelope', category: 'output' },
      { id: 'wise-transfer', label: 'Wise Transfer', category: 'output' },
    ],
    edges: [
      { source: 'gmaps-places', target: 'claude-analyze', label: 'location context' },
      { source: 'claude-analyze', target: 'docusign-send', label: 'offer preparation' },
      { source: 'claude-analyze', target: 'wise-transfer', label: 'funding instruction' },
    ],
  },

  // ── Content Machine ──────────────────────────────────────────
  {
    id: 'rune-content-machine',
    slug: 'content-machine',
    name: 'Content Machine',
    purpose: 'Use when you\'re spending 10+ hours/week on content production — wake up to a full week of posts, newsletters, and scripts generated overnight in your brand voice.',
    category: 'Content',
    emoji: '✍️',
    useCase: 'Wake up to a complete content calendar: 14 posts, 2 newsletters, 3 scripts — all in your voice. Review and publish.',
    description: 'Monitors X, Reddit, and RSS for trending topics in your niche, generates content in a custom brand voice profile, creates visuals, and queues everything across platforms. Built for creators spending 10+ hours/week on production.',
    nodes: [
      { id: 'rss-scraper',      label: 'RSS / Reddit Scraper', category: 'input'  },
      { id: 'x-trends',         label: 'X Trends Monitor',     category: 'input'  },
      { id: 'brand-voice',      label: 'Brand Voice Profile',  category: 'api'    },
      { id: 'claude-write',     label: 'Claude Write Content', category: 'llm'    },
      { id: 'dalle-thumbnails', label: 'DALL·E Thumbnails',    category: 'api'    },
      { id: 'buffer-schedule',  label: 'Buffer Schedule',      category: 'output' },
      { id: 'telegram-preview', label: 'Telegram Preview',     category: 'output' },
    ],
    edges: [
      { source: 'rss-scraper',      target: 'claude-write',     label: 'trending topics' },
      { source: 'x-trends',         target: 'claude-write',     label: 'viral signals' },
      { source: 'brand-voice',      target: 'claude-write',     label: 'voice context' },
      { source: 'claude-write',     target: 'dalle-thumbnails', label: 'visual brief' },
      { source: 'claude-write',     target: 'buffer-schedule',  label: 'posts queue' },
      { source: 'dalle-thumbnails', target: 'buffer-schedule',  label: 'visuals' },
      { source: 'buffer-schedule',  target: 'telegram-preview', label: 'weekly summary' },
    ],
  },

  // ── Health Coach ─────────────────────────────────────────────
  {
    id: 'rune-health-coach',
    slug: 'health-coach',
    name: 'Health Coach',
    purpose: 'Use when you want to snap a meal photo and instantly know calories, macros, and get your dinner plan and grocery order adjusted automatically.',
    category: 'Health',
    emoji: '💪',
    useCase: 'Snap a photo of your lunch. 10 seconds later: calories counted, macros tracked, dinner plan adjusted, groceries ordered if needed.',
    description: 'Vision model reads food photos, tracks macros against goals, generates weekly meal plans, orders groceries via delivery API, syncs Apple Health data. Choose your coach persona: supportive mentor or savage roaster. People quit apps — they don\'t quit their coach.',
    nodes: [
      { id: 'vision-food',      label: 'Vision Food Recognition', category: 'input'  },
      { id: 'apple-health',     label: 'Apple Health Sync',       category: 'input'  },
      { id: 'claude-coach',     label: 'Claude Coach LLM',        category: 'llm'    },
      { id: 'instacart-api',    label: 'Grocery Delivery API',    category: 'api'    },
      { id: 'meal-planner',     label: 'Meal Plan Generator',     category: 'api'    },
      { id: 'whatsapp-coach',   label: 'WhatsApp Coach Reply',    category: 'output' },
    ],
    edges: [
      { source: 'vision-food',    target: 'claude-coach',   label: 'food data' },
      { source: 'apple-health',   target: 'claude-coach',   label: 'biometrics' },
      { source: 'claude-coach',   target: 'meal-planner',   label: 'goal context' },
      { source: 'meal-planner',   target: 'instacart-api',  label: 'shopping list' },
      { source: 'claude-coach',   target: 'whatsapp-coach', label: 'coaching message' },
    ],
  },

  // ── RPG Life System ──────────────────────────────────────────
  {
    id: 'rune-rpg-life',
    slug: 'rpg-life',
    name: 'RPG Life System',
    purpose: 'Use when you want life to feel like a game — log gym, reading, or deep work and watch your character level up with XP, streaks, and a shareable character sheet.',
    category: 'Productivity',
    emoji: '🎮',
    useCase: '"Done with gym" → +30 Strength XP. Hit Level 20 Intelligence after a 6-month streak. Real life with a progress bar.',
    description: 'Gamifies productivity with 5 life stats (Intelligence, Strength, Discipline, Social, Creativity). Daily quests, XP rewards, streak tracking, and a character dashboard. Insane viral potential — people screenshot their character sheets.',
    nodes: [
      { id: 'task-input',       label: 'Task / Message Input',   category: 'input'  },
      { id: 'streak-tracker',   label: 'Streak Tracker DB',      category: 'api'    },
      { id: 'claude-rpg',       label: 'Claude Quest Engine',    category: 'llm'    },
      { id: 'xp-calculator',    label: 'XP Calculator',          category: 'api'    },
      { id: 'dashboard-update', label: 'Character Dashboard',    category: 'output' },
      { id: 'telegram-quest',   label: 'Telegram Quest Notify',  category: 'output' },
    ],
    edges: [
      { source: 'task-input',       target: 'claude-rpg',       label: 'completed task' },
      { source: 'streak-tracker',   target: 'claude-rpg',       label: 'streak context' },
      { source: 'claude-rpg',       target: 'xp-calculator',    label: 'task category' },
      { source: 'xp-calculator',    target: 'dashboard-update', label: 'XP delta' },
      { source: 'xp-calculator',    target: 'telegram-quest',   label: 'level up alert' },
    ],
  },

  // ── Autonomous Dev Team ──────────────────────────────────────
  {
    id: 'rune-dev-team',
    slug: 'dev-team',
    name: 'Autonomous Dev Team',
    purpose: 'Use when you want to describe a product in plain English and get a live deployed URL back — sub-agents handle architecture, coding, testing, and deployment.',
    category: 'Engineering',
    emoji: '🤖',
    useCase: '"Build a SaaS dashboard with Stripe billing" → sub-agent picks boilerplate → builds → tests → deploys → sends live URL.',
    description: 'Orchestrates Codex, Claude Code, and Cursor sub-agents with pre-loaded boilerplates for every project type. Reads errors, fixes bugs, redeploys automatically. Built for non-technical founders, indie hackers, and agencies.',
    nodes: [
      { id: 'spec-input',       label: 'Product Spec Input',     category: 'input'  },
      { id: 'claude-architect', label: 'Claude Architect',       category: 'llm'    },
      { id: 'codex-agent',      label: 'Codex Sub-Agent',        category: 'api'    },
      { id: 'boilerplate-repo', label: 'Boilerplate Repo',       category: 'api'    },
      { id: 'test-runner',      label: 'Test Runner',            category: 'api'    },
      { id: 'vercel-deploy',    label: 'Vercel Deploy',          category: 'output' },
      { id: 'slack-live-url',   label: 'Slack Live URL',         category: 'output' },
    ],
    edges: [
      { source: 'spec-input',       target: 'claude-architect', label: 'requirements' },
      { source: 'claude-architect', target: 'boilerplate-repo', label: 'template pick' },
      { source: 'boilerplate-repo', target: 'codex-agent',      label: 'starter code' },
      { source: 'codex-agent',      target: 'test-runner',      label: 'built code' },
      { source: 'test-runner',      target: 'vercel-deploy',    label: 'tests passed' },
      { source: 'vercel-deploy',    target: 'slack-live-url',   label: 'live URL' },
    ],
  },

  // ── SEO Empire Builder ────────────────────────────────────────
  {
    id: 'rune-seo-empire',
    slug: 'seo-empire',
    name: 'SEO Empire Builder',
    purpose: 'Use when you want SEO running on autopilot 24/7 — keyword research, content publishing, backlink outreach, and performance reporting while you sleep.',
    category: 'Marketing',
    emoji: '📈',
    useCase: 'Wake up to: "3 backlinks acquired. 12 keywords hit page 1. 4 articles published. Weekly report attached."',
    description: 'Runs full-cycle SEO autonomously: keyword clustering, programmatic content, direct CMS publishing, personalized outreach emails, and performance tracking via Search Console. Built for SEO agencies and affiliate marketers who know SEO is a game of volume and consistency.',
    nodes: [
      { id: 'semrush-api',      label: 'SEMrush Keyword API',    category: 'input'  },
      { id: 'gsc-monitor',      label: 'Search Console Monitor', category: 'input'  },
      { id: 'claude-seo',       label: 'Claude SEO Strategist',  category: 'llm'    },
      { id: 'cms-publish',      label: 'CMS Auto-Publish',       category: 'output' },
      { id: 'outreach-email',   label: 'Backlink Outreach Email',category: 'output' },
      { id: 'slack-seo-report', label: 'Slack Weekly Report',    category: 'output' },
    ],
    edges: [
      { source: 'semrush-api',   target: 'claude-seo',       label: 'keyword data' },
      { source: 'gsc-monitor',   target: 'claude-seo',       label: 'performance data' },
      { source: 'claude-seo',    target: 'cms-publish',      label: 'content + strategy' },
      { source: 'claude-seo',    target: 'outreach-email',   label: 'link targets' },
      { source: 'cms-publish',   target: 'slack-seo-report', label: 'published count' },
      { source: 'outreach-email',target: 'slack-seo-report', label: 'links acquired' },
    ],
  },
];

const buildHubSkills = (runes: Rune[]) => {
  const useMap = new Map<string, number>();
  for (const rune of runes) {
    const seen = new Set<string>();
    for (const node of rune.nodes) {
      if (seen.has(node.id)) {
        continue
      }
      seen.add(node.id)
      useMap.set(node.id, (useMap.get(node.id) ?? 0) + 1)
    }
  }

  return Array.from(useMap.entries())
    .sort((a, b) => b[1] - a[1])
    .filter(([, count]) => count >= 2)
    .slice(0, 24)
    .map(([id]) => id);
}

export const RUNES: Rune[] = BASE_RUNES.map((rune) => ({
  ...rune,
  description: rune.description ?? rune.purpose,
}));

export const HUB_SKILLS = buildHubSkills(RUNES);

export const runes = RUNES;

function buildFullGraph() {
  const nodeMap = new Map<string, SkillNode>();
  const allEdges: SkillEdge[] = [];

  for (const rune of RUNES) {
    for (const node of rune.nodes) {
      if (!nodeMap.has(node.id)) {
        nodeMap.set(node.id, node);
      }
    }
    for (const edge of rune.edges) {
      allEdges.push({ ...edge, rune: rune.slug });
    }
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges: allEdges,
  };
}

export const FULL_GRAPH = buildFullGraph();
