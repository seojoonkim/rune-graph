// ─────────────────────────────────────────────────────────────────────────────
// LAYER 1: Action — a single, atomic API operation within a Skill
// (previously called "Skill" — renamed to align with OpenClaw/ClawHub conventions)
// ─────────────────────────────────────────────────────────────────────────────
export interface Action {
  id: string;
  label: string;
  category: 'input' | 'api' | 'llm' | 'output';
  service: string;        // which Skill Package this action belongs to
  description: string;
  docsUrl: string;
  icon: string;
  author?: { name: string; url?: string };
  downloads?: number;
  stars?: number;
  version?: string;
}

// Backwards-compatible alias so existing code that imports `Skill` still compiles
export type Skill = Action;

// ─────────────────────────────────────────────────────────────────────────────
// LAYER 2: SkillPackage — a service-level capability module (installable unit)
// Matches what OpenClaw/ClawHub mean by "Skill":
//   a curated, documented bundle of actions for a specific service,
//   with usage instructions for the agent (SKILL.md equivalent)
// Install: `rune skill add <id>`
// ─────────────────────────────────────────────────────────────────────────────
export type SkillCategory =
  | 'ai'             // LLM providers, AI models
  | 'communication'  // email, chat, messaging
  | 'productivity'   // calendar, notes, docs, tasks
  | 'dev'            // version control, CI/CD, code review
  | 'data'           // spreadsheets, databases, analytics
  | 'finance'        // payments, banking, crypto
  | 'marketing'      // ads, CRM, social media
  | 'iot'            // hardware, sensors, smart home
  | 'media'          // audio, video, images
  | 'utility';       // scrapers, parsers, webhooks

export interface SkillPackage {
  id: string;           // slug used in rune skill add (e.g. "gmail")
  name: string;         // display name (e.g. "Gmail")
  vendor: string;       // company / project (e.g. "Google")
  emoji: string;
  tagline: string;      // one-line description
  description: string;  // longer description
  category: SkillCategory;
  installCmd: string;   // e.g. "rune skill add gmail"
  docsUrl: string;
  actionIds: string[];  // Action ids from SKILLS_REGISTRY
  downloads?: number;
  stars?: number;
  version?: string;
  verified?: boolean;   // official RuneHub team package
}

export const SKILL_PACKAGES: SkillPackage[] = [
  // ── AI Models ──────────────────────────────────────────────────────────────
  {
    id: 'claude', name: 'Claude', vendor: 'Anthropic', emoji: '🧠',
    tagline: 'Summarize, analyze, draft, classify and reason over any text.',
    description: 'Access Anthropic\'s Claude models for text generation, summarization, classification, data extraction, and complex reasoning. The most widely used LLM skill in the RuneHub ecosystem.',
    category: 'ai', installCmd: 'rune skill add claude',
    docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models',
    actionIds: ['claude-summarize', 'claude-analyze', 'claude-draft', 'claude-classify', 'claude-extract'],
    downloads: 284000, stars: 4820, version: '3.0.0', verified: true,
  },
  {
    id: 'openai', name: 'OpenAI', vendor: 'OpenAI', emoji: '🤖',
    tagline: 'GPT-4o text & vision, Whisper transcription, DALL-E image generation.',
    description: 'Full OpenAI API coverage — GPT-4o for multimodal reasoning, Whisper for audio transcription, DALL-E 3 for image generation, and text embeddings.',
    category: 'ai', installCmd: 'rune skill add openai',
    docsUrl: 'https://platform.openai.com/docs/overview',
    actionIds: ['gpt4o-vision', 'whisper-transcribe', 'dalle3-generate'],
    downloads: 195000, stars: 3650, version: '2.1.0', verified: true,
  },
  {
    id: 'google-gemini', name: 'Gemini', vendor: 'Google', emoji: '✨',
    tagline: 'Google\'s multimodal AI for text, vision, and code tasks.',
    description: 'Use Google Gemini for multimodal generation, code assistance, and long-context reasoning with up to 1M token context windows.',
    category: 'ai', installCmd: 'rune skill add google-gemini',
    docsUrl: 'https://ai.google.dev/docs',
    actionIds: ['gemini-generate', 'gemini-vision'],
    downloads: 87000, stars: 1920, version: '1.5.0', verified: true,
  },
  {
    id: 'perplexity', name: 'Perplexity', vendor: 'Perplexity AI', emoji: '🔮',
    tagline: 'Real-time web-grounded search and answer synthesis.',
    description: 'Use Perplexity\'s online models to get up-to-date, web-grounded answers with citations. Ideal for research pipelines that require current information.',
    category: 'ai', installCmd: 'rune skill add perplexity',
    docsUrl: 'https://docs.perplexity.ai/',
    actionIds: ['perplexity-search', 'perplexity-ask'],
    downloads: 64000, stars: 1340, version: '1.2.0',
  },
  {
    id: 'elevenlabs', name: 'ElevenLabs', vendor: 'ElevenLabs', emoji: '🔊',
    tagline: 'Hyper-realistic text-to-speech and voice cloning.',
    description: 'Convert text to natural-sounding speech with ElevenLabs. Supports voice cloning, multilingual output, and real-time streaming audio.',
    category: 'ai', installCmd: 'rune skill add elevenlabs',
    docsUrl: 'https://docs.elevenlabs.io/',
    actionIds: ['elevenlabs-tts'],
    downloads: 42000, stars: 980, version: '1.0.0',
  },

  // ── Communication ──────────────────────────────────────────────────────────
  {
    id: 'gmail', name: 'Gmail', vendor: 'Google', emoji: '📧',
    tagline: 'Fetch, send, and label emails via the Gmail API.',
    description: 'Full Gmail integration — read inbox with query filters, send transactional emails, and manage labels. Requires Google OAuth.',
    category: 'communication', installCmd: 'rune skill add gmail',
    docsUrl: 'https://developers.google.com/gmail/api',
    actionIds: ['gmail-fetch', 'gmail-send', 'gmail-label'],
    downloads: 265000, stars: 4070, version: '1.0.0', verified: true,
  },
  {
    id: 'slack', name: 'Slack', vendor: 'Slack', emoji: '💬',
    tagline: 'Post messages, read channels, and reply in threads.',
    description: 'Post messages to Slack channels, read recent messages, reply in threads, and send DMs. The most common output action in RuneHub Runes.',
    category: 'communication', installCmd: 'rune skill add slack',
    docsUrl: 'https://api.slack.com/',
    actionIds: ['slack-post', 'slack-fetch', 'slack-thread-reply'],
    downloads: 147000, stars: 3010, version: '1.2.0', verified: true,
  },
  {
    id: 'telegram', name: 'Telegram', vendor: 'Telegram', emoji: '✈️',
    tagline: 'Send and receive messages via Telegram Bot API.',
    description: 'Integrate with Telegram bots — send messages, receive updates, and build conversational interfaces for Rune notifications.',
    category: 'communication', installCmd: 'rune skill add telegram',
    docsUrl: 'https://core.telegram.org/bots/api',
    actionIds: ['telegram-send', 'telegram-fetch'],
    downloads: 63000, stars: 1580, version: '1.0.0', verified: true,
  },
  {
    id: 'discord', name: 'Discord', vendor: 'Discord', emoji: '🎮',
    tagline: 'Send and read messages in Discord channels via bot or webhook.',
    description: 'Post messages to Discord channels via webhook or bot, and read channel history. Great for dev teams and community notifications.',
    category: 'communication', installCmd: 'rune skill add discord',
    docsUrl: 'https://discord.com/developers/docs/intro',
    actionIds: ['discord-post', 'discord-fetch'],
    downloads: 82000, stars: 1920, version: '1.1.0', verified: true,
  },
  {
    id: 'outlook', name: 'Outlook', vendor: 'Microsoft', emoji: '📬',
    tagline: 'Fetch and send emails via Microsoft Outlook / Exchange.',
    description: 'Microsoft 365 email integration — read inbox, send email, and manage folders via Microsoft Graph API.',
    category: 'communication', installCmd: 'rune skill add outlook',
    docsUrl: 'https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview',
    actionIds: ['outlook-fetch', 'outlook-send'],
    downloads: 141000, stars: 1840, version: '1.0.0', verified: true,
  },

  // ── Productivity ───────────────────────────────────────────────────────────
  {
    id: 'google-calendar', name: 'Google Calendar', vendor: 'Google', emoji: '📅',
    tagline: 'List events, create new ones, and query free/busy slots.',
    description: 'Read and write Google Calendar — list upcoming events, create new appointments, and check availability across multiple calendars.',
    category: 'productivity', installCmd: 'rune skill add google-calendar',
    docsUrl: 'https://developers.google.com/calendar/api',
    actionIds: ['gcal-list-events', 'gcal-create-event', 'gcal-find-free'],
    downloads: 98000, stars: 2100, version: '1.0.0', verified: true,
  },
  {
    id: 'notion', name: 'Notion', vendor: 'Notion', emoji: '📓',
    tagline: 'Read pages, create content, and query databases in Notion.',
    description: 'Full Notion integration — read page content, create new pages, and query databases with filters. Popular for storing Rune outputs as structured knowledge.',
    category: 'productivity', installCmd: 'rune skill add notion',
    docsUrl: 'https://developers.notion.com/',
    actionIds: ['notion-read', 'notion-write', 'notion-db-query'],
    downloads: 112000, stars: 2840, version: '2.0.0', verified: true,
  },
  {
    id: 'google-sheets', name: 'Google Sheets', vendor: 'Google', emoji: '📊',
    tagline: 'Read and write spreadsheet data via the Sheets API.',
    description: 'Read rows from and append data to Google Sheets. Commonly used for logging Rune outputs, analytics dashboards, and lightweight databases.',
    category: 'productivity', installCmd: 'rune skill add google-sheets',
    docsUrl: 'https://developers.google.com/sheets/api',
    actionIds: ['gsheets-read', 'gsheets-write'],
    downloads: 87000, stars: 1760, version: '1.0.0', verified: true,
  },
  {
    id: 'linear', name: 'Linear', vendor: 'Linear', emoji: '📐',
    tagline: 'Create and fetch issues in Linear project management.',
    description: 'Integrate with Linear for issue tracking — create new issues with labels and priorities, and fetch existing issues with filters for Rune-based automations.',
    category: 'productivity', installCmd: 'rune skill add linear',
    docsUrl: 'https://developers.linear.app/docs/',
    actionIds: ['linear-create-issue', 'linear-fetch-issues'],
    downloads: 45000, stars: 1020, version: '1.0.0',
  },

  // ── Dev ────────────────────────────────────────────────────────────────────
  {
    id: 'github', name: 'GitHub', vendor: 'GitHub (Microsoft)', emoji: '🐙',
    tagline: 'List PRs, get diffs, post comments, and create issues.',
    description: 'Comprehensive GitHub automation — list and review pull requests, fetch code diffs, post PR comments, create issues, and monitor releases. Essential for DevOps Runes.',
    category: 'dev', installCmd: 'rune skill add github',
    docsUrl: 'https://docs.github.com/en/rest',
    actionIds: ['github-list-prs', 'github-get-diff', 'github-post-comment', 'github-create-issue', 'github-list-releases', 'github-scan-repo'],
    downloads: 178000, stars: 3940, version: '2.0.0', verified: true,
  },
  {
    id: 'gitlab', name: 'GitLab', vendor: 'GitLab', emoji: '🦊',
    tagline: 'Create MRs, manage pipelines, and post comments in GitLab.',
    description: 'GitLab CI/CD and issue management — create merge requests, trigger pipelines, and post review comments via the GitLab REST API.',
    category: 'dev', installCmd: 'rune skill add gitlab',
    docsUrl: 'https://docs.gitlab.com/ee/api/',
    actionIds: ['gitlab-create-mr', 'gitlab-get-pipeline'],
    downloads: 52000, stars: 870, version: '1.0.0',
  },
  {
    id: 'jira', name: 'Jira', vendor: 'Atlassian', emoji: '🔷',
    tagline: 'Create and fetch Jira tickets and update sprint boards.',
    description: 'Jira Software integration — create issues, update statuses, query sprint boards, and link issues to PRs in DevOps pipelines.',
    category: 'dev', installCmd: 'rune skill add jira',
    docsUrl: 'https://developer.atlassian.com/cloud/jira/platform/rest/v3/',
    actionIds: ['jira-create-issue', 'jira-fetch-issues'],
    downloads: 68000, stars: 1120, version: '1.1.0',
  },

  // ── Data ───────────────────────────────────────────────────────────────────
  {
    id: 'brave-search', name: 'Brave Search', vendor: 'Brave', emoji: '🦁',
    tagline: 'Privacy-first web search API with no tracking.',
    description: 'Search the web with Brave\'s independent index — no tracking, no filter bubbles. Returns clean results ideal for LLM research pipelines.',
    category: 'data', installCmd: 'rune skill add brave-search',
    docsUrl: 'https://brave.com/search/api/',
    actionIds: ['brave-search'],
    downloads: 93000, stars: 2180, version: '1.0.0', verified: true,
  },
  {
    id: 'firecrawl', name: 'Firecrawl', vendor: 'Firecrawl', emoji: '🔥',
    tagline: 'Scrape any web page into clean Markdown for LLMs.',
    description: 'Convert any URL into clean, structured Markdown or JSON — handles JavaScript-heavy sites, bypasses bot protection, and extracts structured data.',
    category: 'data', installCmd: 'rune skill add firecrawl',
    docsUrl: 'https://docs.firecrawl.dev/',
    actionIds: ['firecrawl-scrape', 'firecrawl-crawl'],
    downloads: 71000, stars: 1860, version: '1.3.0',
  },
  {
    id: 'exa', name: 'Exa', vendor: 'Exa.ai', emoji: '🌐',
    tagline: 'Neural search engine for semantic and similarity-based retrieval.',
    description: 'Exa\'s neural search finds semantically similar content — better than keyword search for LLM research pipelines. Returns full-page content.',
    category: 'data', installCmd: 'rune skill add exa',
    docsUrl: 'https://docs.exa.ai/',
    actionIds: ['exa-search'],
    downloads: 38000, stars: 940, version: '1.0.0',
  },
  {
    id: 'openweather', name: 'OpenWeatherMap', vendor: 'OpenWeather', emoji: '⛅',
    tagline: 'Current weather conditions and forecasts for any location.',
    description: 'Real-time and forecast weather data for any city or coordinates — temperature, precipitation, wind, UV index. No-friction API with generous free tier.',
    category: 'data', installCmd: 'rune skill add openweather',
    docsUrl: 'https://openweathermap.org/api',
    actionIds: ['openweather-fetch'],
    downloads: 84000, stars: 1420, version: '1.0.0', verified: true,
  },

  // ── Finance ────────────────────────────────────────────────────────────────
  {
    id: 'stripe', name: 'Stripe', vendor: 'Stripe', emoji: '💳',
    tagline: 'Query revenue, subscriptions, invoices, and customers.',
    description: 'Read-only Stripe data access — pull MRR, subscription metrics, customer data, and invoice history for financial analytics Runes.',
    category: 'finance', installCmd: 'rune skill add stripe',
    docsUrl: 'https://docs.stripe.com/api',
    actionIds: ['stripe-get-mrr', 'stripe-list-customers', 'stripe-get-invoice', 'stripe-list-charges'],
    downloads: 76000, stars: 1640, version: '1.0.0', verified: true,
  },
  {
    id: 'coingecko', name: 'CoinGecko', vendor: 'CoinGecko', emoji: '🦎',
    tagline: 'Real-time and historical cryptocurrency price data.',
    description: 'Free crypto market data — current prices, market caps, volume, and historical OHLCV for thousands of tokens across all chains.',
    category: 'finance', installCmd: 'rune skill add coingecko',
    docsUrl: 'https://www.coingecko.com/api/documentation',
    actionIds: ['coingecko-price', 'coingecko-market-chart'],
    downloads: 47000, stars: 1090, version: '1.0.0',
  },

  // ── Marketing / CRM ────────────────────────────────────────────────────────
  {
    id: 'hubspot', name: 'HubSpot', vendor: 'HubSpot', emoji: '🤝',
    tagline: 'Create contacts, update deals, and log CRM activity.',
    description: 'HubSpot CRM automation — create and update contacts, manage deals and pipelines, log activities, and sync lead data from other Rune inputs.',
    category: 'marketing', installCmd: 'rune skill add hubspot',
    docsUrl: 'https://developers.hubspot.com/docs/api/overview',
    actionIds: ['hubspot-create-contact', 'hubspot-update-deal'],
    downloads: 58000, stars: 1110, version: '1.0.0',
  },
  {
    id: 'twitter-x', name: 'Twitter / X', vendor: 'X Corp', emoji: '𝕏',
    tagline: 'Search tweets, post updates, and monitor brand mentions.',
    description: 'Twitter/X API v2 integration — search by query or hashtag, post tweets, and fetch user timelines for social monitoring Runes.',
    category: 'marketing', installCmd: 'rune skill add twitter-x',
    docsUrl: 'https://developer.twitter.com/en/docs/twitter-api',
    actionIds: ['twitter-search', 'twitter-post', 'twitter-user-tweets'],
    downloads: 61000, stars: 1280, version: '1.0.0',
  },

  // ── IoT / Home ─────────────────────────────────────────────────────────────
  {
    id: 'home-assistant', name: 'Home Assistant', vendor: 'Home Assistant', emoji: '🏠',
    tagline: 'Read sensor states and control smart home devices.',
    description: 'Connect to a local Home Assistant instance — read entity states (temperature, motion, energy), trigger automations, and control smart home devices.',
    category: 'iot', installCmd: 'rune skill add home-assistant',
    docsUrl: 'https://developers.home-assistant.io/docs/api/rest/',
    actionIds: ['homeassistant-states', 'homeassistant-call-service'],
    downloads: 29000, stars: 780, version: '1.0.0',
  },

  // ── Media ──────────────────────────────────────────────────────────────────
  {
    id: 'youtube', name: 'YouTube', vendor: 'Google', emoji: '▶️',
    tagline: 'Fetch video metadata, transcripts, and channel data.',
    description: 'YouTube Data API — fetch video details, channel statistics, search results, and captions for media monitoring and content analysis Runes.',
    category: 'media', installCmd: 'rune skill add youtube',
    docsUrl: 'https://developers.google.com/youtube/v3',
    actionIds: ['youtube-fetch-video', 'youtube-list-channel'],
    downloads: 53000, stars: 1120, version: '1.0.0',
  },

  // ── Utility ────────────────────────────────────────────────────────────────
  {
    id: 'firecrawl-pdf', name: 'PDF Parser', vendor: 'Open Source', emoji: '📄',
    tagline: 'Extract clean text and metadata from PDF documents.',
    description: 'Parse PDF files to extract readable text, tables, and metadata. Essential utility for document processing Runes working with contracts, reports, and whitepapers.',
    category: 'utility', installCmd: 'rune skill add pdf-parser',
    docsUrl: 'https://www.npmjs.com/package/pdf-parse',
    actionIds: ['pdf-parse'],
    downloads: 38000, stars: 640, version: '1.0.0',
  },
  {
    id: 'webhook', name: 'Webhook', vendor: 'Open Standard', emoji: '🔗',
    tagline: 'Trigger Runes from incoming HTTP webhooks.',
    description: 'Accept incoming HTTP POST requests to trigger Rune pipelines. Supports any event source — GitHub webhooks, Stripe events, Typeform submissions, etc.',
    category: 'utility', installCmd: 'rune skill add webhook',
    docsUrl: 'https://en.wikipedia.org/wiki/Webhook',
    actionIds: ['webhook-trigger'],
    downloads: 94000, stars: 1680, version: '1.0.0', verified: true,
  },
  {
    id: 'cohere', name: 'Cohere Command', vendor: 'Cohere', emoji: '🌊', tagline: 'Enterprise-grade LLM for search, summarization, and classification.', description: 'Cohere Command and Embed models for enterprise NLP tasks — text generation, semantic search, and classification at scale.', category: 'ai', installCmd: 'rune skill add cohere', docsUrl: 'https://docs.cohere.com', actionIds: ['cohere-generate', 'cohere-embed', 'cohere-classify', 'cohere-rerank'], downloads: 52000, stars: 980, version: '1.2.0', verified: true,
  },
  {
    id: 'mistral', name: 'Mistral AI', vendor: 'Mistral AI', emoji: '💨', tagline: 'Fast, open-weight LLMs — Mistral 7B to Mixtral 8x22B.', description: 'Mistral AI models including Mistral 7B, Mixtral MoE, and Mistral Large for efficient, high-quality text generation.', category: 'ai', installCmd: 'rune skill add mistral', docsUrl: 'https://docs.mistral.ai', actionIds: ['mistral-generate', 'mistral-chat', 'mistral-embed'], downloads: 41000, stars: 860, version: '1.0.0', verified: true,
  },
  {
    id: 'groq', name: 'Groq', vendor: 'Groq', emoji: '⚡', tagline: 'Blazing-fast LLM inference — 500+ tokens/second.', description: 'Groq LPU inference engine for ultra-fast Llama and Mixtral inference. Ideal for latency-sensitive AI pipelines.', category: 'ai', installCmd: 'rune skill add groq', docsUrl: 'https://console.groq.com/docs', actionIds: ['groq-chat', 'groq-stream'], downloads: 38000, stars: 720, version: '1.1.0', verified: true,
  },
  {
    id: 'deepseek', name: 'DeepSeek', vendor: 'DeepSeek', emoji: '🔭', tagline: 'Powerful open-source LLMs for code and reasoning.', description: 'DeepSeek models including DeepSeek Coder and DeepSeek V2 for code generation, math reasoning, and general tasks.', category: 'ai', installCmd: 'rune skill add deepseek', docsUrl: 'https://platform.deepseek.com/docs', actionIds: ['deepseek-chat', 'deepseek-coder'], downloads: 29000, stars: 640, version: '1.0.0', verified: false,
  },
  {
    id: 'ollama', name: 'Ollama', vendor: 'Ollama', emoji: '🦙', tagline: 'Run LLMs locally — Llama, Mistral, Phi, Gemma.', description: 'Run open-source large language models locally with Ollama. Supports Llama 3, Mistral, Phi-3, Gemma, and 100+ models.', category: 'ai', installCmd: 'rune skill add ollama', docsUrl: 'https://ollama.com/docs', actionIds: ['ollama-generate', 'ollama-chat', 'ollama-pull'], downloads: 67000, stars: 1540, version: '2.0.0', verified: false,
  },
  {
    id: 'replicate', name: 'Replicate', vendor: 'Replicate', emoji: '🎨', tagline: 'Run AI models in the cloud — images, video, audio.', description: 'Run thousands of open-source AI models via API — Stable Diffusion, ControlNet, LLaVA, Whisper, and more.', category: 'ai', installCmd: 'rune skill add replicate', docsUrl: 'https://replicate.com/docs', actionIds: ['replicate-image-gen', 'replicate-video-gen', 'replicate-upscale'], downloads: 44000, stars: 1120, version: '1.3.0', verified: true,
  },
  {
    id: 'stability-ai', name: 'Stable Diffusion', vendor: 'Stability AI', emoji: '🖼️', tagline: 'State-of-the-art image generation via Stability API.', description: 'Stability AI API for image generation, inpainting, upscaling, and control with Stable Diffusion XL and SD3.', category: 'ai', installCmd: 'rune skill add stability-ai', docsUrl: 'https://platform.stability.ai/docs', actionIds: ['sd-text-to-image', 'sd-image-to-image', 'sd-inpaint', 'sd-upscale'], downloads: 36000, stars: 890, version: '2.1.0', verified: true,
  },
  {
    id: 'together-ai', name: 'Together AI', vendor: 'Together AI', emoji: '🤝', tagline: 'Run and fine-tune open-source models at scale.', description: 'Together AI platform for running 100+ open-source models with fast inference, fine-tuning, and embeddings.', category: 'ai', installCmd: 'rune skill add together-ai', docsUrl: 'https://docs.together.ai', actionIds: ['together-chat', 'together-embed', 'together-finetune'], downloads: 18000, stars: 430, version: '1.0.0', verified: false,
  },
  {
    id: 'fireworks-ai', name: 'Fireworks AI', vendor: 'Fireworks AI', emoji: '🎆', tagline: 'Fastest open-model inference for production AI.', description: 'Fireworks AI delivers the fastest inference for Llama, Mixtral, and other open models with compound AI system support.', category: 'ai', installCmd: 'rune skill add fireworks-ai', docsUrl: 'https://docs.fireworks.ai', actionIds: ['fireworks-chat', 'fireworks-function-call'], downloads: 14000, stars: 310, version: '1.0.0', verified: false,
  },
  {
    id: 'zoom', name: 'Zoom', vendor: 'Zoom', emoji: '📹', tagline: 'Create meetings, get transcripts, and manage participants.', description: 'Zoom Meetings API for scheduling meetings, getting recordings, transcripts, and managing participants programmatically.', category: 'communication', installCmd: 'rune skill add zoom', docsUrl: 'https://developers.zoom.us/docs', actionIds: ['zoom-create-meeting', 'zoom-get-recording', 'zoom-get-transcript'], downloads: 31000, stars: 620, version: '1.0.0', verified: true,
  },
  {
    id: 'microsoft-teams', name: 'Microsoft Teams', vendor: 'Microsoft', emoji: '💼', tagline: 'Post messages, create channels, and manage meetings.', description: 'Microsoft Teams API for sending messages to channels, creating meetings, posting cards, and managing team workflows.', category: 'communication', installCmd: 'rune skill add microsoft-teams', docsUrl: 'https://learn.microsoft.com/en-us/microsoftteams/platform', actionIds: ['teams-send-message', 'teams-create-meeting', 'teams-post-card'], downloads: 28000, stars: 540, version: '1.1.0', verified: true,
  },
  {
    id: 'whatsapp-business', name: 'WhatsApp Business', vendor: 'Meta', emoji: '💬', tagline: 'Send templates, media, and interactive messages via WhatsApp.', description: 'WhatsApp Business API for sending approved template messages, images, documents, and interactive buttons to customers.', category: 'communication', installCmd: 'rune skill add whatsapp-business', docsUrl: 'https://developers.facebook.com/docs/whatsapp', actionIds: ['whatsapp-send-text', 'whatsapp-send-template', 'whatsapp-send-media'], downloads: 24000, stars: 480, version: '1.2.0', verified: true,
  },
  {
    id: 'intercom', name: 'Intercom', vendor: 'Intercom', emoji: '💭', tagline: 'Create conversations, send messages, and manage users.', description: 'Intercom customer messaging platform API for creating conversations, sending messages, managing contacts, and tagging users.', category: 'communication', installCmd: 'rune skill add intercom', docsUrl: 'https://developers.intercom.com', actionIds: ['intercom-create-conversation', 'intercom-send-message', 'intercom-tag-user'], downloads: 19000, stars: 380, version: '1.0.0', verified: true,
  },
  {
    id: 'zendesk', name: 'Zendesk', vendor: 'Zendesk', emoji: '🎫', tagline: 'Create tickets, update status, and manage support queues.', description: 'Zendesk Support API for creating tickets, updating status, adding comments, and routing support conversations.', category: 'communication', installCmd: 'rune skill add zendesk', docsUrl: 'https://developer.zendesk.com/api-reference', actionIds: ['zendesk-create-ticket', 'zendesk-update-ticket', 'zendesk-get-ticket', 'zendesk-add-comment'], downloads: 26000, stars: 510, version: '1.1.0', verified: true,
  },
  {
    id: 'freshdesk', name: 'Freshdesk', vendor: 'Freshworks', emoji: '🌿', tagline: 'Manage support tickets and customer conversations.', description: 'Freshdesk API for creating and updating support tickets, adding notes, managing agents, and automating workflows.', category: 'communication', installCmd: 'rune skill add freshdesk', docsUrl: 'https://developers.freshdesk.com/api', actionIds: ['freshdesk-create-ticket', 'freshdesk-update-ticket', 'freshdesk-reply'], downloads: 14000, stars: 290, version: '1.0.0', verified: false,
  },
  {
    id: 'twilio', name: 'Twilio', vendor: 'Twilio', emoji: '📞', tagline: 'Send SMS, make calls, and manage phone numbers.', description: 'Twilio Communications API for sending SMS, making voice calls, WhatsApp messages, and managing phone numbers.', category: 'communication', installCmd: 'rune skill add twilio', docsUrl: 'https://www.twilio.com/docs', actionIds: ['twilio-sms', 'twilio-call', 'twilio-whatsapp'], downloads: 72000, stars: 1380, version: '2.0.0', verified: true,
  },
  {
    id: 'sendgrid', name: 'SendGrid', vendor: 'Twilio', emoji: '📤', tagline: 'Send transactional and marketing emails at scale.', description: 'SendGrid email API for transactional emails, marketing campaigns, email templates, and delivery analytics.', category: 'communication', installCmd: 'rune skill add sendgrid', docsUrl: 'https://docs.sendgrid.com', actionIds: ['sendgrid-send', 'sendgrid-template', 'sendgrid-track'], downloads: 58000, stars: 1100, version: '1.5.0', verified: true,
  },
  {
    id: 'mailchimp', name: 'Mailchimp', vendor: 'Intuit', emoji: '🐒', tagline: 'Send campaigns, manage lists, and track email performance.', description: 'Mailchimp API for managing subscriber lists, sending email campaigns, creating automations, and tracking performance.', category: 'communication', installCmd: 'rune skill add mailchimp', docsUrl: 'https://mailchimp.com/developer', actionIds: ['mailchimp-send-campaign', 'mailchimp-add-subscriber', 'mailchimp-get-stats'], downloads: 35000, stars: 670, version: '1.2.0', verified: true,
  },
  {
    id: 'brevo', name: 'Brevo', vendor: 'Brevo', emoji: '🟢', tagline: 'Email, SMS, and WhatsApp marketing automation.', description: 'Brevo (formerly Sendinblue) API for transactional email, SMS marketing, WhatsApp campaigns, and contact management.', category: 'communication', installCmd: 'rune skill add brevo', docsUrl: 'https://developers.brevo.com', actionIds: ['brevo-send-email', 'brevo-send-sms', 'brevo-add-contact'], downloads: 21000, stars: 420, version: '1.0.0', verified: false,
  },
  {
    id: 'line', name: 'Line', vendor: 'LY Corporation', emoji: '💚', tagline: 'Send messages and rich content via Line Messaging API.', description: 'Line Messaging API for sending text, images, buttons, carousels, and flex messages to users and groups.', category: 'communication', installCmd: 'rune skill add line', docsUrl: 'https://developers.line.biz/en/docs', actionIds: ['line-send-message', 'line-push', 'line-multicast'], downloads: 11000, stars: 220, version: '1.0.0', verified: false,
  },
  {
    id: 'airtable', name: 'Airtable', vendor: 'Airtable', emoji: '📋', tagline: 'Read, create, and update records in Airtable bases.', description: 'Airtable API for creating and updating records, querying views, managing linked records, and building database-driven automations.', category: 'productivity', installCmd: 'rune skill add airtable', docsUrl: 'https://airtable.com/developers/web/api/introduction', actionIds: ['airtable-get-record', 'airtable-create-record', 'airtable-update-record', 'airtable-list-records'], downloads: 48000, stars: 960, version: '1.3.0', verified: true,
  },
  {
    id: 'asana', name: 'Asana', vendor: 'Asana', emoji: '🦋', tagline: 'Create tasks, update projects, and track deadlines.', description: 'Asana project management API for creating tasks, assigning owners, updating statuses, and tracking project progress.', category: 'productivity', installCmd: 'rune skill add asana', docsUrl: 'https://developers.asana.com/docs', actionIds: ['asana-create-task', 'asana-update-task', 'asana-get-project'], downloads: 32000, stars: 640, version: '1.1.0', verified: true,
  },
  {
    id: 'monday', name: 'Monday.com', vendor: 'Monday.com', emoji: '📅', tagline: 'Manage boards, items, and automations in Monday.com.', description: 'Monday.com API for creating and updating board items, managing columns, triggering automations, and tracking work progress.', category: 'productivity', installCmd: 'rune skill add monday', docsUrl: 'https://developer.monday.com', actionIds: ['monday-create-item', 'monday-update-item', 'monday-get-board'], downloads: 27000, stars: 530, version: '1.0.0', verified: true,
  },
  {
    id: 'trello', name: 'Trello', vendor: 'Atlassian', emoji: '📌', tagline: 'Create cards, move lists, and manage Trello boards.', description: 'Trello API for creating cards, moving items across lists, adding labels, and managing board workflows.', category: 'productivity', installCmd: 'rune skill add trello', docsUrl: 'https://developer.atlassian.com/cloud/trello', actionIds: ['trello-create-card', 'trello-move-card', 'trello-add-label'], downloads: 29000, stars: 580, version: '1.0.0', verified: true,
  },
  {
    id: 'clickup', name: 'ClickUp', vendor: 'ClickUp', emoji: '✅', tagline: 'Create tasks, update statuses, and manage ClickUp spaces.', description: 'ClickUp API for creating tasks with rich properties, managing sprints, updating statuses, and syncing across tools.', category: 'productivity', installCmd: 'rune skill add clickup', docsUrl: 'https://clickup.com/api', actionIds: ['clickup-create-task', 'clickup-update-status', 'clickup-get-list'], downloads: 22000, stars: 440, version: '1.0.0', verified: false,
  },
  {
    id: 'todoist', name: 'Todoist', vendor: 'Doist', emoji: '✔️', tagline: 'Add tasks, set priorities, and sync with Todoist.', description: 'Todoist API for adding tasks with due dates and priorities, completing tasks, and managing projects.', category: 'productivity', installCmd: 'rune skill add todoist', docsUrl: 'https://developer.todoist.com/rest/v2', actionIds: ['todoist-add-task', 'todoist-complete-task', 'todoist-get-tasks'], downloads: 18000, stars: 360, version: '1.0.0', verified: false,
  },
  {
    id: 'confluence', name: 'Confluence', vendor: 'Atlassian', emoji: '📖', tagline: 'Create and update Confluence pages and spaces.', description: 'Atlassian Confluence API for creating pages, updating content, searching spaces, and managing documentation.', category: 'productivity', installCmd: 'rune skill add confluence', docsUrl: 'https://developer.atlassian.com/cloud/confluence', actionIds: ['confluence-create-page', 'confluence-update-page', 'confluence-search'], downloads: 24000, stars: 480, version: '1.1.0', verified: true,
  },
  {
    id: 'miro', name: 'Miro', vendor: 'Miro', emoji: '🗺️', tagline: 'Create boards, sticky notes, and connectors in Miro.', description: 'Miro collaboration board API for creating boards, adding sticky notes, shapes, connectors, and managing team workshops.', category: 'productivity', installCmd: 'rune skill add miro', docsUrl: 'https://developers.miro.com', actionIds: ['miro-create-board', 'miro-add-sticky', 'miro-add-shape'], downloads: 16000, stars: 320, version: '1.0.0', verified: false,
  },
  {
    id: 'figma', name: 'Figma', vendor: 'Figma', emoji: '🎨', tagline: 'Fetch designs, export assets, and comment on Figma files.', description: 'Figma API for retrieving design files, exporting assets as PNG/SVG, reading component properties, and posting comments.', category: 'productivity', installCmd: 'rune skill add figma', docsUrl: 'https://www.figma.com/developers/api', actionIds: ['figma-get-file', 'figma-export-asset', 'figma-post-comment'], downloads: 20000, stars: 400, version: '1.0.0', verified: true,
  },
  {
    id: 'google-docs', name: 'Google Docs', vendor: 'Google', emoji: '📝', tagline: 'Create, read, and update Google Docs documents.', description: 'Google Docs API for creating documents, inserting text, reading content, and formatting document sections.', category: 'productivity', installCmd: 'rune skill add google-docs', docsUrl: 'https://developers.google.com/docs/api', actionIds: ['gdocs-create', 'gdocs-insert-text', 'gdocs-read'], downloads: 41000, stars: 820, version: '1.2.0', verified: true,
  },
  {
    id: 'vercel', name: 'Vercel', vendor: 'Vercel', emoji: '▲', tagline: 'Deploy projects, manage domains, and check build status.', description: 'Vercel API for triggering deployments, managing project environment variables, checking build status, and managing domains.', category: 'dev', installCmd: 'rune skill add vercel', docsUrl: 'https://vercel.com/docs/rest-api', actionIds: ['vercel-deploy', 'vercel-get-deployment', 'vercel-set-env'], downloads: 44000, stars: 880, version: '1.1.0', verified: true,
  },
  {
    id: 'railway', name: 'Railway', vendor: 'Railway', emoji: '🚂', tagline: 'Deploy apps, manage services, and monitor Railway projects.', description: 'Railway API for deploying applications, managing services, setting environment variables, and viewing deployment logs.', category: 'dev', installCmd: 'rune skill add railway', docsUrl: 'https://docs.railway.app/reference/public-api', actionIds: ['railway-deploy', 'railway-get-service', 'railway-set-variable'], downloads: 21000, stars: 430, version: '1.0.0', verified: false,
  },
  {
    id: 'cloudflare', name: 'Cloudflare', vendor: 'Cloudflare', emoji: '🔶', tagline: 'Manage DNS, Workers, KV, and Pages deployments.', description: 'Cloudflare API for managing DNS records, deploying Workers, using KV/D1/R2 storage, and managing Pages projects.', category: 'dev', installCmd: 'rune skill add cloudflare', docsUrl: 'https://developers.cloudflare.com/api', actionIds: ['cf-dns-update', 'cf-worker-deploy', 'cf-kv-put', 'cf-purge-cache'], downloads: 38000, stars: 760, version: '1.2.0', verified: true,
  },
  {
    id: 'aws-s3', name: 'AWS S3', vendor: 'Amazon', emoji: '🪣', tagline: 'Upload, download, and manage files in AWS S3 buckets.', description: 'AWS S3 API for uploading objects, generating presigned URLs, listing buckets, and managing file lifecycle policies.', category: 'dev', installCmd: 'rune skill add aws-s3', docsUrl: 'https://docs.aws.amazon.com/s3', actionIds: ['s3-upload', 's3-download', 's3-presign', 's3-list'], downloads: 92000, stars: 1840, version: '2.0.0', verified: true,
  },
  {
    id: 'aws-lambda', name: 'AWS Lambda', vendor: 'Amazon', emoji: 'λ', tagline: 'Invoke and manage AWS Lambda functions.', description: 'AWS Lambda API for invoking functions, managing event source mappings, and monitoring function execution.', category: 'dev', installCmd: 'rune skill add aws-lambda', docsUrl: 'https://docs.aws.amazon.com/lambda', actionIds: ['lambda-invoke', 'lambda-update-code', 'lambda-get-logs'], downloads: 68000, stars: 1360, version: '2.0.0', verified: true,
  },
  {
    id: 'docker-hub', name: 'Docker Hub', vendor: 'Docker', emoji: '🐋', tagline: 'Pull images, push builds, and manage repositories.', description: 'Docker Hub API for searching images, managing repositories, pulling manifests, and triggering automated builds.', category: 'dev', installCmd: 'rune skill add docker-hub', docsUrl: 'https://docs.docker.com/docker-hub/api/latest', actionIds: ['docker-pull', 'docker-push', 'docker-tag'], downloads: 54000, stars: 1080, version: '1.0.0', verified: true,
  },
  {
    id: 'circleci', name: 'CircleCI', vendor: 'CircleCI', emoji: '⭕', tagline: 'Trigger pipelines and monitor build status.', description: 'CircleCI API for triggering pipelines, checking workflow status, rerunning failed jobs, and fetching build artifacts.', category: 'dev', installCmd: 'rune skill add circleci', docsUrl: 'https://circleci.com/docs/api/v2', actionIds: ['circleci-trigger', 'circleci-get-workflow', 'circleci-rerun'], downloads: 22000, stars: 440, version: '1.0.0', verified: false,
  },
  {
    id: 'datadog', name: 'Datadog', vendor: 'Datadog', emoji: '🐕', tagline: 'Query metrics, send events, and manage monitors.', description: 'Datadog API for querying time-series metrics, sending custom events, creating monitors, and managing dashboards.', category: 'dev', installCmd: 'rune skill add datadog', docsUrl: 'https://docs.datadoghq.com/api', actionIds: ['datadog-query-metric', 'datadog-send-event', 'datadog-create-monitor'], downloads: 34000, stars: 680, version: '1.1.0', verified: true,
  },
  {
    id: 'sentry', name: 'Sentry', vendor: 'Sentry', emoji: '🔍', tagline: 'Fetch issues, manage alerts, and track error rates.', description: 'Sentry error tracking API for fetching issues, managing alert rules, resolving errors, and tracking release health.', category: 'dev', installCmd: 'rune skill add sentry', docsUrl: 'https://docs.sentry.io/api', actionIds: ['sentry-get-issues', 'sentry-resolve-issue', 'sentry-create-alert'], downloads: 41000, stars: 820, version: '1.0.0', verified: true,
  },
  {
    id: 'pagerduty', name: 'PagerDuty', vendor: 'PagerDuty', emoji: '🚨', tagline: 'Trigger incidents, escalate, and manage on-call schedules.', description: 'PagerDuty API for creating and resolving incidents, managing escalation policies, and viewing on-call schedules.', category: 'dev', installCmd: 'rune skill add pagerduty', docsUrl: 'https://developer.pagerduty.com/api-reference', actionIds: ['pagerduty-trigger', 'pagerduty-resolve', 'pagerduty-get-oncall'], downloads: 28000, stars: 560, version: '1.1.0', verified: true,
  },
  {
    id: 'grafana', name: 'Grafana', vendor: 'Grafana Labs', emoji: '📊', tagline: 'Query panels, annotate graphs, and manage dashboards.', description: 'Grafana API for querying dashboard panels, creating annotations, managing data sources, and alerting.', category: 'dev', installCmd: 'rune skill add grafana', docsUrl: 'https://grafana.com/docs/grafana/latest/developers/http_api', actionIds: ['grafana-query', 'grafana-annotate', 'grafana-alert'], downloads: 26000, stars: 520, version: '1.0.0', verified: false,
  },
  {
    id: 'new-relic', name: 'New Relic', vendor: 'New Relic', emoji: '🔵', tagline: 'Query APM metrics, create alerts, and manage dashboards.', description: 'New Relic observability platform API for querying NRQL data, creating alert conditions, and managing dashboards.', category: 'dev', installCmd: 'rune skill add new-relic', docsUrl: 'https://docs.newrelic.com/docs/apis', actionIds: ['newrelic-query', 'newrelic-alert', 'newrelic-deploy'], downloads: 19000, stars: 380, version: '1.0.0', verified: false,
  },
  {
    id: 'postgresql', name: 'PostgreSQL', vendor: 'PostgreSQL Global Group', emoji: '🐘', tagline: 'Execute queries, insert rows, and manage schemas.', description: 'PostgreSQL database skill for executing SQL queries, inserting and updating rows, managing schemas, and running transactions.', category: 'data', installCmd: 'rune skill add postgresql', docsUrl: 'https://www.postgresql.org/docs', actionIds: ['pg-query', 'pg-insert', 'pg-update', 'pg-transaction'], downloads: 86000, stars: 1720, version: '2.0.0', verified: true,
  },
  {
    id: 'mysql', name: 'MySQL', vendor: 'Oracle', emoji: '🐬', tagline: 'Run SQL queries and manage MySQL databases.', description: 'MySQL connector for executing SELECT, INSERT, UPDATE, DELETE queries, managing schemas, and running stored procedures.', category: 'data', installCmd: 'rune skill add mysql', docsUrl: 'https://dev.mysql.com/doc', actionIds: ['mysql-query', 'mysql-insert', 'mysql-update'], downloads: 74000, stars: 1480, version: '2.0.0', verified: true,
  },
  {
    id: 'mongodb', name: 'MongoDB', vendor: 'MongoDB Inc.', emoji: '🍃', tagline: 'Query documents, aggregate data, and manage collections.', description: 'MongoDB Atlas API for querying documents, inserting records, running aggregation pipelines, and managing collections.', category: 'data', installCmd: 'rune skill add mongodb', docsUrl: 'https://www.mongodb.com/docs/drivers', actionIds: ['mongo-find', 'mongo-insert', 'mongo-aggregate', 'mongo-update'], downloads: 79000, stars: 1580, version: '2.0.0', verified: true,
  },
  {
    id: 'redis', name: 'Redis', vendor: 'Redis Ltd.', emoji: '♦️', tagline: 'Get/set keys, manage queues, and pub/sub messaging.', description: 'Redis skill for get/set/del operations, pub/sub messaging, stream processing, sorted sets, and cache management.', category: 'data', installCmd: 'rune skill add redis', docsUrl: 'https://redis.io/docs', actionIds: ['redis-get', 'redis-set', 'redis-publish', 'redis-lpush'], downloads: 81000, stars: 1620, version: '2.0.0', verified: true,
  },
  {
    id: 'supabase', name: 'Supabase', vendor: 'Supabase', emoji: '⚡', tagline: 'Query Postgres, use auth, and subscribe to realtime changes.', description: 'Supabase API for querying Postgres tables, managing users with Auth, uploading to Storage, and listening to realtime changes.', category: 'data', installCmd: 'rune skill add supabase', docsUrl: 'https://supabase.com/docs', actionIds: ['supabase-select', 'supabase-insert', 'supabase-auth', 'supabase-storage-upload'], downloads: 53000, stars: 1060, version: '1.3.0', verified: true,
  },
  {
    id: 'pinecone', name: 'Pinecone', vendor: 'Pinecone', emoji: '🌲', tagline: 'Upsert and query vectors for semantic search and RAG.', description: 'Pinecone vector database for upserting embeddings, querying by similarity, and building retrieval-augmented generation pipelines.', category: 'data', installCmd: 'rune skill add pinecone', docsUrl: 'https://docs.pinecone.io', actionIds: ['pinecone-upsert', 'pinecone-query', 'pinecone-delete'], downloads: 39000, stars: 780, version: '1.2.0', verified: true,
  },
  {
    id: 'weaviate', name: 'Weaviate', vendor: 'Weaviate B.V.', emoji: '🔮', tagline: 'Store objects with vectors and run GraphQL semantic queries.', description: 'Weaviate open-source vector database for storing objects with embeddings, running semantic queries, and building RAG pipelines.', category: 'data', installCmd: 'rune skill add weaviate', docsUrl: 'https://weaviate.io/developers/weaviate', actionIds: ['weaviate-add', 'weaviate-query', 'weaviate-near-text'], downloads: 21000, stars: 420, version: '1.0.0', verified: false,
  },
  {
    id: 'qdrant', name: 'Qdrant', vendor: 'Qdrant', emoji: '🎯', tagline: 'High-performance vector search with filtering.', description: 'Qdrant vector database for high-performance similarity search, filtered queries, and embedding-based retrieval.', category: 'data', installCmd: 'rune skill add qdrant', docsUrl: 'https://qdrant.tech/documentation', actionIds: ['qdrant-upsert', 'qdrant-search', 'qdrant-filter'], downloads: 17000, stars: 340, version: '1.0.0', verified: false,
  },
  {
    id: 'dropbox', name: 'Dropbox', vendor: 'Dropbox', emoji: '📦', tagline: 'Upload, download, share, and manage Dropbox files.', description: 'Dropbox API for uploading and downloading files, creating shared links, managing folders, and syncing file metadata.', category: 'data', installCmd: 'rune skill add dropbox', docsUrl: 'https://www.dropbox.com/developers/documentation', actionIds: ['dropbox-upload', 'dropbox-download', 'dropbox-share', 'dropbox-list'], downloads: 36000, stars: 720, version: '1.1.0', verified: true,
  },
  {
    id: 'google-drive', name: 'Google Drive', vendor: 'Google', emoji: '🗂️', tagline: 'Upload, download, share, and manage Drive files.', description: 'Google Drive API for uploading and downloading files, managing permissions, creating folders, and searching Drive content.', category: 'data', installCmd: 'rune skill add google-drive', docsUrl: 'https://developers.google.com/drive', actionIds: ['gdrive-upload', 'gdrive-download', 'gdrive-share', 'gdrive-list'], downloads: 52000, stars: 1040, version: '1.2.0', verified: true,
  },
  {
    id: 'cloudinary', name: 'Cloudinary', vendor: 'Cloudinary', emoji: '☁️', tagline: 'Upload, transform, and deliver images and videos.', description: 'Cloudinary media management API for uploading assets, applying transformations, optimizing images, and managing CDN delivery.', category: 'data', installCmd: 'rune skill add cloudinary', docsUrl: 'https://cloudinary.com/documentation', actionIds: ['cloudinary-upload', 'cloudinary-transform', 'cloudinary-optimize'], downloads: 44000, stars: 880, version: '1.1.0', verified: true,
  },
  {
    id: 'paypal', name: 'PayPal', vendor: 'PayPal', emoji: '🅿️', tagline: 'Create payments, capture orders, and manage refunds.', description: 'PayPal REST API for creating payment orders, capturing charges, processing refunds, and managing subscriptions.', category: 'finance', installCmd: 'rune skill add paypal', docsUrl: 'https://developer.paypal.com/api/rest', actionIds: ['paypal-create-order', 'paypal-capture', 'paypal-refund'], downloads: 47000, stars: 940, version: '2.0.0', verified: true,
  },
  {
    id: 'square', name: 'Square', vendor: 'Block Inc.', emoji: '⬛', tagline: 'Process payments, manage inventory, and access orders.', description: 'Square API for processing card payments, managing catalog inventory, creating orders, and accessing customer data.', category: 'finance', installCmd: 'rune skill add square', docsUrl: 'https://developer.squareup.com/docs', actionIds: ['square-charge', 'square-refund', 'square-catalog'], downloads: 31000, stars: 620, version: '1.1.0', verified: true,
  },
  {
    id: 'quickbooks', name: 'QuickBooks', vendor: 'Intuit', emoji: '📒', tagline: 'Sync invoices, expenses, and accounting data.', description: 'QuickBooks Online API for creating invoices, recording expenses, managing customers, and syncing accounting data.', category: 'finance', installCmd: 'rune skill add quickbooks', docsUrl: 'https://developer.intuit.com/app/developer/qbo/docs', actionIds: ['qb-create-invoice', 'qb-record-expense', 'qb-get-report'], downloads: 26000, stars: 520, version: '1.0.0', verified: true,
  },
  {
    id: 'xero', name: 'Xero', vendor: 'Xero', emoji: '🟦', tagline: 'Create invoices, sync bank feeds, and manage accounts.', description: 'Xero accounting API for creating invoices, reconciling bank transactions, managing contacts, and generating financial reports.', category: 'finance', installCmd: 'rune skill add xero', docsUrl: 'https://developer.xero.com/documentation', actionIds: ['xero-invoice', 'xero-bank-sync', 'xero-contact'], downloads: 19000, stars: 380, version: '1.0.0', verified: true,
  },
  {
    id: 'plaid', name: 'Plaid', vendor: 'Plaid', emoji: '🏦', tagline: 'Link bank accounts and access transaction data.', description: 'Plaid financial data API for linking bank accounts, fetching transaction history, checking balances, and verifying account ownership.', category: 'finance', installCmd: 'rune skill add plaid', docsUrl: 'https://plaid.com/docs', actionIds: ['plaid-link', 'plaid-transactions', 'plaid-balance'], downloads: 33000, stars: 660, version: '1.1.0', verified: true,
  },
  {
    id: 'wise', name: 'Wise', vendor: 'Wise', emoji: '💸', tagline: 'Send international transfers and check exchange rates.', description: 'Wise (formerly TransferWise) API for creating multi-currency transfers, checking exchange rates, and managing recipient accounts.', category: 'finance', installCmd: 'rune skill add wise', docsUrl: 'https://docs.wise.com/api-docs', actionIds: ['wise-transfer', 'wise-rate', 'wise-account'], downloads: 16000, stars: 320, version: '1.0.0', verified: true,
  },
  {
    id: 'salesforce', name: 'Salesforce', vendor: 'Salesforce', emoji: '☁️', tagline: 'Query, create, and update Salesforce CRM records.', description: 'Salesforce CRM API for querying with SOQL, creating leads and opportunities, updating account data, and managing workflows.', category: 'marketing', installCmd: 'rune skill add salesforce', docsUrl: 'https://developer.salesforce.com/docs/apis', actionIds: ['sf-query', 'sf-create-lead', 'sf-update-record', 'sf-create-opportunity'], downloads: 58000, stars: 1160, version: '2.0.0', verified: true,
  },
  {
    id: 'pipedrive', name: 'Pipedrive', vendor: 'Pipedrive', emoji: '🔁', tagline: 'Manage deals, contacts, and pipeline stages.', description: 'Pipedrive CRM API for creating deals, updating pipeline stages, managing contacts, and tracking sales activities.', category: 'marketing', installCmd: 'rune skill add pipedrive', docsUrl: 'https://developers.pipedrive.com/docs/api/v1', actionIds: ['pipedrive-deal', 'pipedrive-contact', 'pipedrive-activity'], downloads: 22000, stars: 440, version: '1.0.0', verified: false,
  },
  {
    id: 'zoho-crm', name: 'Zoho CRM', vendor: 'Zoho', emoji: '🐘', tagline: 'Manage leads, contacts, and deals in Zoho CRM.', description: 'Zoho CRM API for creating leads, converting to contacts, managing deals, and running module-specific operations.', category: 'marketing', installCmd: 'rune skill add zoho-crm', docsUrl: 'https://www.zoho.com/crm/developer/docs', actionIds: ['zoho-create-lead', 'zoho-update-deal', 'zoho-get-contact'], downloads: 17000, stars: 340, version: '1.0.0', verified: false,
  },
  {
    id: 'attio', name: 'Attio', vendor: 'Attio', emoji: '🔮', tagline: 'Manage CRM records, notes, and tasks in Attio.', description: 'Attio next-gen CRM API for managing records, creating notes, handling tasks, and building data-driven relationship workflows.', category: 'marketing', installCmd: 'rune skill add attio', docsUrl: 'https://developers.attio.com/reference', actionIds: ['attio-create-record', 'attio-add-note', 'attio-update-attribute'], downloads: 9000, stars: 180, version: '1.0.0', verified: false,
  },
  {
    id: 'convertkit', name: 'Kit (ConvertKit)', vendor: 'ConvertKit', emoji: '✉️', tagline: 'Manage subscribers, sequences, and email broadcasts.', description: 'ConvertKit email marketing API for managing subscribers, creating sequences, sending broadcasts, and tracking conversions.', category: 'marketing', installCmd: 'rune skill add convertkit', docsUrl: 'https://developers.kit.com/docs', actionIds: ['ck-add-subscriber', 'ck-tag-subscriber', 'ck-broadcast'], downloads: 14000, stars: 280, version: '1.0.0', verified: false,
  },
  {
    id: 'klaviyo', name: 'Klaviyo', vendor: 'Klaviyo', emoji: '📧', tagline: 'Send flows, manage lists, and track e-commerce events.', description: 'Klaviyo email and SMS marketing API for managing lists, triggering flows, sending campaigns, and tracking e-commerce purchase events.', category: 'marketing', installCmd: 'rune skill add klaviyo', docsUrl: 'https://developers.klaviyo.com', actionIds: ['klaviyo-track', 'klaviyo-add-to-list', 'klaviyo-send-campaign'], downloads: 26000, stars: 520, version: '1.1.0', verified: true,
  },
  {
    id: 'activecampaign', name: 'ActiveCampaign', vendor: 'ActiveCampaign', emoji: '⚡', tagline: 'Add contacts, trigger automations, and send emails.', description: 'ActiveCampaign API for creating contacts, triggering automation workflows, sending campaigns, and managing deals.', category: 'marketing', installCmd: 'rune skill add activecampaign', docsUrl: 'https://developers.activecampaign.com/reference', actionIds: ['ac-add-contact', 'ac-trigger-automation', 'ac-send-email'], downloads: 18000, stars: 360, version: '1.0.0', verified: false,
  },
  {
    id: 'instagram', name: 'Instagram', vendor: 'Meta', emoji: '📸', tagline: 'Publish posts, fetch insights, and manage comments.', description: 'Instagram Graph API for publishing photos and reels, fetching account insights, managing comments, and monitoring hashtags.', category: 'marketing', installCmd: 'rune skill add instagram', docsUrl: 'https://developers.facebook.com/docs/instagram-api', actionIds: ['instagram-post', 'instagram-insights', 'instagram-comments'], downloads: 36000, stars: 720, version: '1.2.0', verified: true,
  },
  {
    id: 'facebook', name: 'Facebook', vendor: 'Meta', emoji: '👤', tagline: 'Post to pages, fetch insights, and manage ads.', description: 'Facebook Graph API for posting to Pages, fetching post insights, managing ads, and reading Page analytics.', category: 'marketing', installCmd: 'rune skill add facebook', docsUrl: 'https://developers.facebook.com/docs/graph-api', actionIds: ['fb-page-post', 'fb-insights', 'fb-ad-create'], downloads: 42000, stars: 840, version: '1.2.0', verified: true,
  },
  {
    id: 'tiktok', name: 'TikTok', vendor: 'ByteDance', emoji: '🎵', tagline: 'Post videos, fetch analytics, and manage TikTok content.', description: 'TikTok Business API for uploading videos, fetching account analytics, managing creator content, and tracking performance.', category: 'marketing', installCmd: 'rune skill add tiktok', docsUrl: 'https://developers.tiktok.com', actionIds: ['tiktok-post', 'tiktok-analytics', 'tiktok-comments'], downloads: 24000, stars: 480, version: '1.0.0', verified: false,
  },
  {
    id: 'linkedin', name: 'LinkedIn', vendor: 'Microsoft', emoji: '💼', tagline: 'Post updates, fetch profile data, and manage company pages.', description: 'LinkedIn API for posting articles and updates, fetching profile data, managing company page content, and tracking engagement.', category: 'marketing', installCmd: 'rune skill add linkedin', docsUrl: 'https://learn.microsoft.com/en-us/linkedin', actionIds: ['linkedin-post', 'linkedin-profile', 'linkedin-company'], downloads: 31000, stars: 620, version: '1.1.0', verified: true,
  },
  {
    id: 'reddit', name: 'Reddit', vendor: 'Reddit Inc.', emoji: '🔴', tagline: 'Submit posts, fetch top threads, and manage subreddits.', description: 'Reddit API for submitting posts and comments, fetching top threads, searching subreddits, and moderating content.', category: 'marketing', installCmd: 'rune skill add reddit', docsUrl: 'https://www.reddit.com/dev/api', actionIds: ['reddit-submit', 'reddit-fetch-top', 'reddit-search'], downloads: 21000, stars: 420, version: '1.0.0', verified: false,
  },
  {
    id: 'bluesky', name: 'Bluesky', vendor: 'Bluesky PBLLC', emoji: '🦋', tagline: 'Post to Bluesky and fetch AT Protocol data.', description: 'Bluesky AT Protocol API for posting to the social network, fetching feeds, managing follows, and building decentralized social workflows.', category: 'marketing', installCmd: 'rune skill add bluesky', docsUrl: 'https://docs.bsky.app', actionIds: ['bsky-post', 'bsky-fetch-feed', 'bsky-follow'], downloads: 11000, stars: 220, version: '1.0.0', verified: false,
  },
  {
    id: 'bamboo-hr', name: 'BambooHR', vendor: 'BambooHR', emoji: '🎋', tagline: 'Get employee data, track time off, and manage onboarding.', description: 'BambooHR API for fetching employee profiles, tracking time-off requests, managing onboarding tasks, and syncing HR data.', category: 'productivity', installCmd: 'rune skill add bamboo-hr', docsUrl: 'https://documentation.bamboohr.com/docs', actionIds: ['bamboo-get-employee', 'bamboo-time-off', 'bamboo-onboarding'], downloads: 13000, stars: 260, version: '1.0.0', verified: false,
  },
  {
    id: 'gusto', name: 'Gusto', vendor: 'Gusto', emoji: '💰', tagline: 'Run payroll, manage employees, and sync compensation data.', description: 'Gusto payroll API for running payroll, managing employee compensation, tracking benefits, and syncing HR records.', category: 'productivity', installCmd: 'rune skill add gusto', docsUrl: 'https://docs.gusto.com', actionIds: ['gusto-run-payroll', 'gusto-employee', 'gusto-benefits'], downloads: 11000, stars: 220, version: '1.0.0', verified: false,
  },
  {
    id: 'greenhouse', name: 'Greenhouse', vendor: 'Greenhouse Software', emoji: '🌱', tagline: 'Manage job postings, candidates, and hiring stages.', description: 'Greenhouse ATS API for creating job postings, managing candidate pipelines, scheduling interviews, and tracking hiring metrics.', category: 'productivity', installCmd: 'rune skill add greenhouse', docsUrl: 'https://developers.greenhouse.io', actionIds: ['greenhouse-job', 'greenhouse-candidate', 'greenhouse-interview'], downloads: 10000, stars: 200, version: '1.0.0', verified: false,
  },
  {
    id: 'auth0', name: 'Auth0', vendor: 'Okta', emoji: '🔐', tagline: 'Manage users, tokens, and authentication flows.', description: 'Auth0 identity platform API for managing users, issuing tokens, configuring MFA, and managing authentication rules.', category: 'dev', installCmd: 'rune skill add auth0', docsUrl: 'https://auth0.com/docs/api', actionIds: ['auth0-create-user', 'auth0-get-token', 'auth0-reset-password'], downloads: 46000, stars: 920, version: '1.2.0', verified: true,
  },
  {
    id: 'okta', name: 'Okta', vendor: 'Okta', emoji: '🔑', tagline: 'Provision users, manage groups, and control SSO.', description: 'Okta identity management API for provisioning users, managing groups, configuring SSO applications, and auditing sign-ins.', category: 'dev', installCmd: 'rune skill add okta', docsUrl: 'https://developer.okta.com/docs/reference', actionIds: ['okta-create-user', 'okta-assign-group', 'okta-deactivate-user'], downloads: 34000, stars: 680, version: '1.1.0', verified: true,
  },
  {
    id: 'google-analytics', name: 'Google Analytics', vendor: 'Google', emoji: '📈', tagline: 'Fetch traffic reports, events, and conversion data.', description: 'Google Analytics 4 API for fetching traffic reports, custom event data, user behavior, and e-commerce conversion metrics.', category: 'data', installCmd: 'rune skill add google-analytics', docsUrl: 'https://developers.google.com/analytics/devguides/reporting', actionIds: ['ga-report', 'ga-event', 'ga-audience'], downloads: 61000, stars: 1220, version: '2.0.0', verified: true,
  },
  {
    id: 'mixpanel', name: 'Mixpanel', vendor: 'Mixpanel', emoji: '🔀', tagline: 'Track events, build funnels, and analyze user behavior.', description: 'Mixpanel analytics API for tracking user events, building conversion funnels, analyzing retention, and segmenting cohorts.', category: 'data', installCmd: 'rune skill add mixpanel', docsUrl: 'https://developer.mixpanel.com/reference', actionIds: ['mixpanel-track', 'mixpanel-funnel', 'mixpanel-retention'], downloads: 33000, stars: 660, version: '1.0.0', verified: true,
  },
  {
    id: 'amplitude', name: 'Amplitude', vendor: 'Amplitude', emoji: '📉', tagline: 'Track user actions, analyze funnels, and measure retention.', description: 'Amplitude product analytics API for tracking user events, building behavioral funnels, and measuring product engagement.', category: 'data', installCmd: 'rune skill add amplitude', docsUrl: 'https://www.docs.developers.amplitude.com', actionIds: ['amplitude-track', 'amplitude-identify', 'amplitude-chart'], downloads: 27000, stars: 540, version: '1.0.0', verified: true,
  },
  {
    id: 'posthog', name: 'PostHog', vendor: 'PostHog', emoji: '🦔', tagline: 'Open-source analytics — events, feature flags, session replay.', description: 'PostHog product analytics for capturing events, managing feature flags, session recordings, and A/B testing.', category: 'data', installCmd: 'rune skill add posthog', docsUrl: 'https://posthog.com/docs/api', actionIds: ['posthog-capture', 'posthog-feature-flag', 'posthog-identify'], downloads: 19000, stars: 380, version: '1.0.0', verified: false,
  },
  {
    id: 'google-maps', name: 'Google Maps', vendor: 'Google', emoji: '🗺️', tagline: 'Geocode addresses, get directions, and search nearby places.', description: 'Google Maps Platform API for geocoding, reverse geocoding, directions, distance matrix, and places search.', category: 'utility', installCmd: 'rune skill add google-maps', docsUrl: 'https://developers.google.com/maps', actionIds: ['gmaps-geocode', 'gmaps-directions', 'gmaps-places', 'gmaps-distance'], downloads: 73000, stars: 1460, version: '2.0.0', verified: true,
  },
  {
    id: 'mapbox', name: 'Mapbox', vendor: 'Mapbox', emoji: '📍', tagline: 'Geocode locations, get directions, and build custom maps.', description: 'Mapbox API for geocoding addresses, generating directions, isochrones, and creating custom map styles.', category: 'utility', installCmd: 'rune skill add mapbox', docsUrl: 'https://docs.mapbox.com/api', actionIds: ['mapbox-geocode', 'mapbox-directions', 'mapbox-isochrone'], downloads: 31000, stars: 620, version: '1.0.0', verified: false,
  },
  {
    id: 'calendly', name: 'Calendly', vendor: 'Calendly', emoji: '📆', tagline: 'Create scheduling links and fetch booked meetings.', description: 'Calendly scheduling API for creating event type links, fetching scheduled meetings, managing availability, and canceling bookings.', category: 'productivity', installCmd: 'rune skill add calendly', docsUrl: 'https://developer.calendly.com', actionIds: ['calendly-get-events', 'calendly-cancel', 'calendly-create-link'], downloads: 23000, stars: 460, version: '1.0.0', verified: true,
  },
  {
    id: 'cal-com', name: 'Cal.com', vendor: 'Cal.com', emoji: '📅', tagline: 'Open-source scheduling — book, reschedule, cancel meetings.', description: 'Cal.com open-source scheduling API for creating booking links, fetching meetings, managing event types, and handling reschedules.', category: 'productivity', installCmd: 'rune skill add cal-com', docsUrl: 'https://cal.com/docs/api-reference', actionIds: ['calcom-book', 'calcom-cancel', 'calcom-availability'], downloads: 16000, stars: 320, version: '1.0.0', verified: false,
  },
  {
    id: 'docusign', name: 'DocuSign', vendor: 'DocuSign', emoji: '✍️', tagline: 'Send envelopes for signature and track signing status.', description: 'DocuSign eSignature API for creating and sending envelopes, tracking signing status, downloading signed documents, and managing templates.', category: 'utility', installCmd: 'rune skill add docusign', docsUrl: 'https://developers.docusign.com/docs', actionIds: ['docusign-send', 'docusign-status', 'docusign-download'], downloads: 28000, stars: 560, version: '1.1.0', verified: true,
  },
  {
    id: 'deepl', name: 'DeepL', vendor: 'DeepL SE', emoji: '🌍', tagline: 'Translate text into 30+ languages with high accuracy.', description: 'DeepL Translation API for translating text and documents into 30+ languages with industry-leading accuracy.', category: 'utility', installCmd: 'rune skill add deepl', docsUrl: 'https://www.deepl.com/docs-api', actionIds: ['deepl-translate', 'deepl-detect', 'deepl-document'], downloads: 44000, stars: 880, version: '1.2.0', verified: true,
  },
  {
    id: 'google-translate', name: 'Google Translate', vendor: 'Google', emoji: '🌐', tagline: 'Translate text and detect language with Google NMT.', description: 'Google Cloud Translation API for translating text between 100+ languages and auto-detecting source language.', category: 'utility', installCmd: 'rune skill add google-translate', docsUrl: 'https://cloud.google.com/translate/docs', actionIds: ['gtranslate-text', 'gtranslate-detect', 'gtranslate-batch'], downloads: 57000, stars: 1140, version: '2.0.0', verified: true,
  },
  {
    id: 'arxiv', name: 'arXiv', vendor: 'Cornell University', emoji: '📚', tagline: 'Search and fetch research papers from arXiv.', description: 'arXiv API for searching academic papers by keyword, category, or author, and fetching abstracts and PDF links.', category: 'utility', installCmd: 'rune skill add arxiv', docsUrl: 'https://arxiv.org/help/api', actionIds: ['arxiv-search', 'arxiv-fetch', 'arxiv-category'], downloads: 21000, stars: 420, version: '1.0.0', verified: false,
  },
  {
    id: 'pubmed', name: 'PubMed', vendor: 'NCBI / NIH', emoji: '🔬', tagline: 'Search biomedical literature from the PubMed database.', description: 'PubMed Entrez API for searching biomedical research papers, fetching abstracts, and retrieving MeSH metadata.', category: 'utility', installCmd: 'rune skill add pubmed', docsUrl: 'https://www.ncbi.nlm.nih.gov/home/develop/api.shtml', actionIds: ['pubmed-search', 'pubmed-fetch', 'pubmed-citations'], downloads: 14000, stars: 280, version: '1.0.0', verified: false,
  },
  {
    id: 'semantic-scholar', name: 'Semantic Scholar', vendor: 'Allen Institute for AI', emoji: '🎓', tagline: 'Search AI research papers with citation context.', description: 'Semantic Scholar API for searching academic papers, fetching citation data, author profiles, and related research.', category: 'utility', installCmd: 'rune skill add semantic-scholar', docsUrl: 'https://api.semanticscholar.org', actionIds: ['s2-search', 's2-paper', 's2-citations'], downloads: 12000, stars: 240, version: '1.0.0', verified: false,
  },
  {
    id: 'news-api', name: 'NewsAPI', vendor: 'NewsAPI.org', emoji: '📰', tagline: 'Fetch top headlines and search news articles worldwide.', description: 'NewsAPI for fetching top headlines, searching articles by keyword, filtering by source/country, and tracking news topics.', category: 'utility', installCmd: 'rune skill add news-api', docsUrl: 'https://newsapi.org/docs', actionIds: ['news-top-headlines', 'news-search', 'news-sources'], downloads: 37000, stars: 740, version: '1.0.0', verified: false,
  },
  {
    id: 'ethereum', name: 'Ethereum', vendor: 'Ethereum Foundation', emoji: '💎', tagline: 'Read on-chain data, send transactions, and call contracts.', description: 'Ethereum JSON-RPC API for reading balances, fetching transactions, calling smart contracts, and monitoring events.', category: 'finance', installCmd: 'rune skill add ethereum', docsUrl: 'https://ethereum.org/en/developers/docs/apis/json-rpc', actionIds: ['eth-balance', 'eth-transaction', 'eth-contract-call'], downloads: 44000, stars: 880, version: '2.0.0', verified: false,
  },
  {
    id: 'solana', name: 'Solana', vendor: 'Solana Foundation', emoji: '◎', tagline: 'Read accounts, send SOL, and interact with Solana programs.', description: 'Solana Web3.js API for reading account data, sending SOL transfers, interacting with programs, and monitoring transactions.', category: 'finance', installCmd: 'rune skill add solana', docsUrl: 'https://solana.com/docs/rpc', actionIds: ['sol-balance', 'sol-transfer', 'sol-program'], downloads: 32000, stars: 640, version: '1.1.0', verified: false,
  },
  {
    id: 'alchemy', name: 'Alchemy', vendor: 'Alchemy', emoji: '⚗️', tagline: 'Enhanced Ethereum/Polygon APIs with NFT and webhook support.', description: 'Alchemy Web3 platform for enhanced Ethereum APIs, NFT data, mempool monitoring, and blockchain webhooks.', category: 'finance', installCmd: 'rune skill add alchemy', docsUrl: 'https://docs.alchemy.com', actionIds: ['alchemy-nft', 'alchemy-transfers', 'alchemy-webhook'], downloads: 21000, stars: 420, version: '1.0.0', verified: false,
  },
  {
    id: 'shopify', name: 'Shopify', vendor: 'Shopify Inc.', emoji: '🛍️', tagline: 'Manage products, orders, and customers in Shopify.', description: 'Shopify Admin API for managing products, processing orders, updating inventory, managing customers, and syncing store data.', category: 'marketing', installCmd: 'rune skill add shopify', docsUrl: 'https://shopify.dev/docs/api/admin-rest', actionIds: ['shopify-product', 'shopify-order', 'shopify-customer', 'shopify-inventory'], downloads: 54000, stars: 1080, version: '2.0.0', verified: true,
  },
  {
    id: 'woocommerce', name: 'WooCommerce', vendor: 'Automattic', emoji: '🛒', tagline: 'Manage WordPress store products, orders, and customers.', description: 'WooCommerce REST API for managing products, processing orders, updating inventory, and managing customer accounts.', category: 'marketing', installCmd: 'rune skill add woocommerce', docsUrl: 'https://woocommerce.github.io/woocommerce-rest-api-docs', actionIds: ['woo-product', 'woo-order', 'woo-customer'], downloads: 38000, stars: 760, version: '1.1.0', verified: false,
  },
  {
    id: 'qr-code', name: 'QR Code', vendor: 'QRServer.com', emoji: '🔲', tagline: 'Generate QR codes from URLs, text, or data.', description: 'QR code generation API for creating scannable QR codes from URLs, text, and binary data with customizable styling.', category: 'utility', installCmd: 'rune skill add qr-code', docsUrl: 'https://goqr.me/api', actionIds: ['qr-generate', 'qr-from-url', 'qr-custom'], downloads: 28000, stars: 560, version: '1.0.0', verified: false,
  },
  {
    id: 'ip-geolocation', name: 'IP Geolocation', vendor: 'ipapi.co', emoji: '📍', tagline: 'Lookup location, timezone, and ASN from an IP address.', description: 'IP geolocation API for getting country, city, timezone, ISP, and ASN data from any IP address.', category: 'utility', installCmd: 'rune skill add ip-geolocation', docsUrl: 'https://ipapi.co/api', actionIds: ['ip-lookup', 'ip-bulk', 'ip-reverse'], downloads: 22000, stars: 440, version: '1.0.0', verified: false,
  },
  {
    id: 'currency-api', name: 'Currency Exchange', vendor: 'exchangerate-api.com', emoji: '💱', tagline: 'Get live exchange rates for 170+ currencies.', description: 'Currency exchange rate API for live rates, historical data, and currency conversion across 170+ currencies.', category: 'utility', installCmd: 'rune skill add currency-api', docsUrl: 'https://www.exchangerate-api.com/docs', actionIds: ['currency-rate', 'currency-convert', 'currency-history'], downloads: 31000, stars: 620, version: '1.0.0', verified: false,
  },
  {
    id: 'google-places', name: 'Google Places', vendor: 'Google', emoji: '📌', tagline: 'Search places, fetch details, and get reviews.', description: 'Google Places API for searching nearby places, fetching business details, reviews, hours, and geocoding.', category: 'utility', installCmd: 'rune skill add google-places', docsUrl: 'https://developers.google.com/maps/documentation/places', actionIds: ['places-search', 'places-details', 'places-reviews'], downloads: 49000, stars: 980, version: '2.0.0', verified: true,
  },
  {
    id: 'yelp', name: 'Yelp', vendor: 'Yelp', emoji: '⭐', tagline: 'Search businesses and fetch reviews from Yelp.', description: 'Yelp Fusion API for searching businesses by category and location, fetching reviews, and getting business details.', category: 'utility', installCmd: 'rune skill add yelp', docsUrl: 'https://docs.developer.yelp.com', actionIds: ['yelp-search', 'yelp-reviews', 'yelp-details'], downloads: 26000, stars: 520, version: '1.0.0', verified: false,
  },
  {
    id: 'twitch', name: 'Twitch', vendor: 'Amazon/Twitch', emoji: '💜', tagline: 'Get streams, clips, and channel data from Twitch.', description: 'Twitch Helix API for fetching live streams, getting top games, managing channel info, and subscribing to EventSub webhooks.', category: 'media', installCmd: 'rune skill add twitch', docsUrl: 'https://dev.twitch.tv/docs/api', actionIds: ['twitch-streams', 'twitch-clips', 'twitch-eventsub'], downloads: 20000, stars: 400, version: '1.0.0', verified: true,
  },
  {
    id: 'spotify', name: 'Spotify', vendor: 'Spotify', emoji: '🎧', tagline: 'Fetch tracks, control playback, and manage playlists.', description: 'Spotify Web API for searching tracks, fetching audio features, controlling playback, and managing user playlists.', category: 'media', installCmd: 'rune skill add spotify', docsUrl: 'https://developer.spotify.com/documentation/web-api', actionIds: ['spotify-search', 'spotify-play', 'spotify-playlist'], downloads: 39000, stars: 780, version: '1.1.0', verified: true,
  },
  {
    id: 'mux', name: 'Mux', vendor: 'Mux', emoji: '🎬', tagline: 'Manage video assets, streams, and playback.', description: 'Mux video API for uploading video assets, creating live streams, generating thumbnails, and managing playback.', category: 'media', installCmd: 'rune skill add mux', docsUrl: 'https://docs.mux.com', actionIds: ['mux-upload', 'mux-stream', 'mux-thumbnail'], downloads: 17000, stars: 340, version: '1.0.0', verified: false,
  },
  {
    id: 'loom', name: 'Loom', vendor: 'Atlassian', emoji: '🎥', tagline: 'Fetch recordings, generate transcripts, and share links.', description: 'Loom video messaging API for fetching recordings, generating transcripts, getting shareable links, and managing workspaces.', category: 'media', installCmd: 'rune skill add loom', docsUrl: 'https://support.loom.com/hc/en-us/articles/360002208537', actionIds: ['loom-get-video', 'loom-transcript', 'loom-share'], downloads: 14000, stars: 280, version: '1.0.0', verified: false,
  },
  {
    id: 'notion-ai', name: 'Notion AI', vendor: 'Notion', emoji: '✨', tagline: 'Use Notion AI to summarize, translate, and improve pages.', description: 'Notion AI capabilities via API for summarizing page content, translating to other languages, and improving writing quality.', category: 'ai', installCmd: 'rune skill add notion-ai', docsUrl: 'https://developers.notion.com', actionIds: ['notion-ai-summarize', 'notion-ai-translate', 'notion-ai-improve'], downloads: 22000, stars: 440, version: '1.0.0', verified: false,
  },
  {
    id: 'segment', name: 'Segment', vendor: 'Twilio', emoji: '🧩', tagline: 'Track events and manage customer data pipelines.', description: 'Segment CDP for tracking user events, managing customer data, syncing to destinations, and building data pipelines.', category: 'data', installCmd: 'rune skill add segment', docsUrl: 'https://segment.com/docs/connections/sources/catalog/libraries/server', actionIds: ['segment-track', 'segment-identify', 'segment-group'], downloads: 28000, stars: 560, version: '1.1.0', verified: true,
  },
  {
    id: 'shopify-storefront', name: 'Shopify Storefront', vendor: 'Shopify Inc.', emoji: '🏪', tagline: 'Query products and checkout via Shopify Storefront API.', description: 'Shopify Storefront GraphQL API for querying products, managing carts, and building headless commerce experiences.', category: 'marketing', installCmd: 'rune skill add shopify-storefront', docsUrl: 'https://shopify.dev/docs/api/storefront', actionIds: ['storefront-products', 'storefront-cart', 'storefront-checkout'], downloads: 21000, stars: 420, version: '1.0.0', verified: false,
  },
  {
    id: 'braintree', name: 'Braintree', vendor: 'PayPal', emoji: '🌿', tagline: 'Process payments and manage subscriptions via Braintree.', description: 'Braintree payment gateway for processing credit cards, managing recurring subscriptions, and handling payment disputes.', category: 'finance', installCmd: 'rune skill add braintree', docsUrl: 'https://developer.paypal.com/braintree/docs', actionIds: ['braintree-charge', 'braintree-subscription', 'braintree-refund'], downloads: 19000, stars: 380, version: '1.0.0', verified: false,
  },
];

export const SKILLS_REGISTRY: Skill[] = [
  // ── Communication (20) ──────────────────────────────────────
  { id: 'gmail-fetch', label: 'Gmail Fetch Emails', category: 'input', service: 'Gmail', description: 'Fetch emails from a Gmail inbox using label or query filters.', docsUrl: 'https://developers.google.com/gmail/api', icon: '📧', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 125000, stars: 1840 },
  { id: 'gmail-send', label: 'Gmail Send Email', category: 'output', service: 'Gmail', description: 'Send an email via Gmail SMTP or API.', docsUrl: 'https://developers.google.com/gmail/api', icon: '📧', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 98000, stars: 1450 },
  { id: 'gmail-label', label: 'Gmail Apply Label', category: 'api', service: 'Gmail', description: 'Apply or remove labels on Gmail messages.', docsUrl: 'https://developers.google.com/gmail/api', icon: '🏷️', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 42000, stars: 780 },
  { id: 'outlook-fetch', label: 'Outlook Fetch Emails', category: 'input', service: 'Outlook', description: 'Fetch emails from a Microsoft Outlook mailbox.', docsUrl: 'https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview', icon: '📬', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 79000, stars: 980 },
  { id: 'outlook-send', label: 'Outlook Send Email', category: 'output', service: 'Outlook', description: 'Send an email through Microsoft Outlook.', docsUrl: 'https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview', icon: '📬', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 62000, stars: 860 },
  { id: 'slack-post', label: 'Slack Post Message', category: 'output', service: 'Slack', description: 'Post a message to a Slack channel or thread.', docsUrl: 'https://api.slack.com/methods/chat.postMessage', icon: '💬', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 54000, stars: 1120 },
  { id: 'slack-fetch', label: 'Slack Read Channel', category: 'input', service: 'Slack', description: 'Read recent messages from a Slack channel.', docsUrl: 'https://api.slack.com/methods/conversations.history', icon: '💬', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 50000, stars: 980 },
  { id: 'discord-post', label: 'Discord Send Message', category: 'output', service: 'Discord', description: 'Send a message to a Discord channel via webhook or bot.', docsUrl: 'https://discord.com/developers/docs/resources/webhook', icon: '🎮', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 43000, stars: 920 },
  { id: 'discord-fetch', label: 'Discord Read Channel', category: 'input', service: 'Discord', description: 'Fetch recent messages from a Discord channel.', docsUrl: 'https://discord.com/developers/docs/resources/channel', icon: '🎮', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 39000, stars: 700 },
  { id: 'telegram-send', label: 'Telegram Send Message', category: 'output', service: 'Telegram', description: 'Send a message via Telegram Bot API.', docsUrl: 'https://core.telegram.org/bots/api', icon: '✈️', author: { name: 'RuneHub Team', url: 'https://runehub.dev' }, version: '1.0.0', downloads: 24000, stars: 610 },
  { id: 'telegram-fetch', label: 'Telegram Get Updates', category: 'input', service: 'Telegram', description: 'Fetch incoming messages from a Telegram bot.', docsUrl: 'https://core.telegram.org/bots/api', icon: '✈️' },
  { id: 'whatsapp-send', label: 'WhatsApp Send Message', category: 'output', service: 'WhatsApp', description: 'Send a message via WhatsApp Business API.', docsUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api', icon: '📱' },
  { id: 'teams-post', label: 'Teams Post Message', category: 'output', service: 'Microsoft Teams', description: 'Post a message to a Microsoft Teams channel.', docsUrl: 'https://learn.microsoft.com/en-us/graph/api/chatmessage-post', icon: '👥' },
  { id: 'teams-fetch', label: 'Teams Read Channel', category: 'input', service: 'Microsoft Teams', description: 'Read messages from a Microsoft Teams channel.', docsUrl: 'https://learn.microsoft.com/en-us/graph/api/chatmessage-list', icon: '👥' },
  { id: 'linear-create-issue', label: 'Linear Create Issue', category: 'output', service: 'Linear', description: 'Create a new issue in a Linear project.', docsUrl: 'https://developers.linear.app/docs/graphql/working-with-the-graphql-api', icon: '📐' },
  { id: 'linear-fetch-issues', label: 'Linear Fetch Issues', category: 'input', service: 'Linear', description: 'Fetch issues from Linear with filters.', docsUrl: 'https://developers.linear.app/docs/graphql/working-with-the-graphql-api', icon: '📐' },
  { id: 'slack-thread-reply', label: 'Slack Thread Reply', category: 'output', service: 'Slack', description: 'Reply to a specific Slack thread.', docsUrl: 'https://api.slack.com/methods/chat.postMessage', icon: '🧵' },
  { id: 'sendgrid-send', label: 'SendGrid Send Email', category: 'output', service: 'SendGrid', description: 'Send a transactional email via SendGrid API.', docsUrl: 'https://docs.sendgrid.com/api-reference/mail-send/mail-send', icon: '📤' },
  { id: 'resend-send', label: 'Resend Send Email', category: 'output', service: 'Resend', description: 'Send a transactional email via Resend API.', docsUrl: 'https://resend.com/docs/api-reference/emails/send-email', icon: '📤' },
  { id: 'intercom-send', label: 'Intercom Send Message', category: 'output', service: 'Intercom', description: 'Send an in-app or email message via Intercom.', docsUrl: 'https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Messages/createMessage', icon: '💭' },

  // ── Scheduling & Calendar (10) ──────────────────────────────
  { id: 'gcal-list-events', label: 'Google Calendar List Events', category: 'input', service: 'Google Calendar', description: 'List upcoming events from a Google Calendar.', docsUrl: 'https://developers.google.com/calendar/api/v3/reference/events/list', icon: '📅' },
  { id: 'gcal-create-event', label: 'Google Calendar Create Event', category: 'output', service: 'Google Calendar', description: 'Create a new event on Google Calendar.', docsUrl: 'https://developers.google.com/calendar/api/v3/reference/events/insert', icon: '📅' },
  { id: 'calendly-list', label: 'Calendly List Bookings', category: 'input', service: 'Calendly', description: 'List scheduled events from Calendly.', docsUrl: 'https://developer.calendly.com/api-docs', icon: '🗓️' },
  { id: 'calendly-create', label: 'Calendly Create Link', category: 'output', service: 'Calendly', description: 'Generate a one-off scheduling link on Calendly.', docsUrl: 'https://developer.calendly.com/api-docs', icon: '🗓️' },
  { id: 'calcom-list', label: 'Cal.com List Bookings', category: 'input', service: 'Cal.com', description: 'List bookings from Cal.com.', docsUrl: 'https://cal.com/docs/enterprise-features/api', icon: '📆' },
  { id: 'calcom-create', label: 'Cal.com Create Booking', category: 'output', service: 'Cal.com', description: 'Create a new booking slot via Cal.com API.', docsUrl: 'https://cal.com/docs/enterprise-features/api', icon: '📆' },
  { id: 'luma-list', label: 'Luma List Events', category: 'input', service: 'Luma', description: 'List upcoming events from a Luma calendar.', docsUrl: 'https://docs.lu.ma/reference/list-events', icon: '🎪' },
  { id: 'luma-create', label: 'Luma Create Event', category: 'output', service: 'Luma', description: 'Create a new event on Luma.', docsUrl: 'https://docs.lu.ma/reference/create-event', icon: '🎪' },
  { id: 'cron-schedule', label: 'Cron Schedule Job', category: 'api', service: 'Cron', description: 'Schedule a recurring job with cron expression.', docsUrl: 'https://cron.com/', icon: '⏰' },
  { id: 'gcal-find-free', label: 'Google Calendar Free/Busy', category: 'api', service: 'Google Calendar', description: 'Query free/busy availability across calendars.', docsUrl: 'https://developers.google.com/calendar/api/v3/reference/freebusy/query', icon: '🕐' },

  // ── Docs & Knowledge (15) ──────────────────────────────────
  { id: 'notion-read', label: 'Notion Read Page', category: 'input', service: 'Notion', description: 'Read content from a Notion page or database.', docsUrl: 'https://developers.notion.com/reference/retrieve-a-page', icon: '📓' },
  { id: 'notion-write', label: 'Notion Create Page', category: 'output', service: 'Notion', description: 'Create or update a page in Notion.', docsUrl: 'https://developers.notion.com/reference/create-a-page', icon: '📓' },
  { id: 'notion-db-query', label: 'Notion Query Database', category: 'input', service: 'Notion', description: 'Query a Notion database with filters and sorts.', docsUrl: 'https://developers.notion.com/reference/post-database-query', icon: '📓' },
  { id: 'confluence-read', label: 'Confluence Read Page', category: 'input', service: 'Confluence', description: 'Read content from a Confluence wiki page.', docsUrl: 'https://developer.atlassian.com/cloud/confluence/rest/v2/intro/', icon: '📖' },
  { id: 'confluence-write', label: 'Confluence Write Page', category: 'output', service: 'Confluence', description: 'Create or update a Confluence wiki page.', docsUrl: 'https://developer.atlassian.com/cloud/confluence/rest/v2/intro/', icon: '📖' },
  { id: 'gdocs-read', label: 'Google Docs Read', category: 'input', service: 'Google Docs', description: 'Read content from a Google Doc.', docsUrl: 'https://developers.google.com/docs/api/reference/rest', icon: '📄' },
  { id: 'gdocs-write', label: 'Google Docs Write', category: 'output', service: 'Google Docs', description: 'Append or update content in a Google Doc.', docsUrl: 'https://developers.google.com/docs/api/reference/rest', icon: '📄' },
  { id: 'wordpress-publish', label: 'WordPress Publish Post', category: 'output', service: 'WordPress', description: 'Publish a new blog post on WordPress.', docsUrl: 'https://developer.wordpress.org/rest-api/reference/posts/', icon: '🌐' },
  { id: 'substack-draft', label: 'Substack Create Draft', category: 'output', service: 'Substack', description: 'Create a draft post on Substack via automation.', docsUrl: 'https://substack.com/', icon: '✉️' },
  { id: 'ghost-publish', label: 'Ghost Publish Post', category: 'output', service: 'Ghost', description: 'Publish a new post via Ghost Admin API.', docsUrl: 'https://ghost.org/docs/admin-api/', icon: '👻' },
  { id: 'medium-publish', label: 'Medium Publish Story', category: 'output', service: 'Medium', description: 'Publish a story on Medium via API.', docsUrl: 'https://github.com/Medium/medium-api-docs', icon: '✍️' },
  { id: 'coda-read', label: 'Coda Read Doc', category: 'input', service: 'Coda', description: 'Read rows or content from a Coda document.', docsUrl: 'https://coda.io/developers/apis/v1', icon: '📋' },
  { id: 'coda-write', label: 'Coda Write Row', category: 'output', service: 'Coda', description: 'Insert or update rows in a Coda table.', docsUrl: 'https://coda.io/developers/apis/v1', icon: '📋' },
  { id: 'obsidian-read', label: 'Obsidian Read Note', category: 'input', service: 'Obsidian', description: 'Read a markdown note from an Obsidian vault.', docsUrl: 'https://obsidian.md/', icon: '🗿' },
  { id: 'obsidian-write', label: 'Obsidian Write Note', category: 'output', service: 'Obsidian', description: 'Create or append to a note in Obsidian vault.', docsUrl: 'https://obsidian.md/', icon: '🗿' },

  // ── Search & Research (15) ──────────────────────────────────
  { id: 'brave-search', label: 'Brave Web Search', category: 'api', service: 'Brave Search', description: 'Search the web using Brave Search API.', docsUrl: 'https://brave.com/search/api/', icon: '🦁' },
  { id: 'perplexity-search', label: 'Perplexity Search', category: 'api', service: 'Perplexity', description: 'AI-powered web search via Perplexity API.', docsUrl: 'https://docs.perplexity.ai/', icon: '🔮' },
  { id: 'exa-search', label: 'Exa Semantic Search', category: 'api', service: 'Exa.ai', description: 'Neural search for finding similar content via Exa.', docsUrl: 'https://docs.exa.ai/', icon: '🧠' },
  { id: 'google-search', label: 'Google Custom Search', category: 'api', service: 'Google', description: 'Search the web using Google Custom Search JSON API.', docsUrl: 'https://developers.google.com/custom-search/v1/overview', icon: '🔍' },
  { id: 'bing-search', label: 'Bing Web Search', category: 'api', service: 'Microsoft Bing', description: 'Search the web using Bing Search API.', docsUrl: 'https://learn.microsoft.com/en-us/bing/search-apis/bing-web-search/', icon: '🔎' },
  { id: 'arxiv-search', label: 'arXiv Search Papers', category: 'api', service: 'arXiv', description: 'Search for academic papers on arXiv.', docsUrl: 'https://info.arxiv.org/help/api/index.html', icon: '📚' },
  { id: 'pubmed-search', label: 'PubMed Search', category: 'api', service: 'PubMed', description: 'Search biomedical literature on PubMed.', docsUrl: 'https://www.ncbi.nlm.nih.gov/books/NBK25501/', icon: '🏥' },
  { id: 'wikipedia-search', label: 'Wikipedia Lookup', category: 'api', service: 'Wikipedia', description: 'Fetch article summaries from Wikipedia.', docsUrl: 'https://www.mediawiki.org/wiki/API:Main_page', icon: '📖' },
  { id: 'firecrawl-scrape', label: 'Firecrawl Scrape Page', category: 'api', service: 'Firecrawl', description: 'Scrape and parse a web page into structured markdown.', docsUrl: 'https://docs.firecrawl.dev/', icon: '🔥' },
  { id: 'firecrawl-crawl', label: 'Firecrawl Crawl Site', category: 'api', service: 'Firecrawl', description: 'Crawl an entire website and extract content.', docsUrl: 'https://docs.firecrawl.dev/', icon: '🔥' },
  { id: 'apify-scraper', label: 'Apify Web Scraper', category: 'api', service: 'Apify', description: 'Run an Apify actor to scrape web data.', docsUrl: 'https://docs.apify.com/api/v2', icon: '🕷️' },
  { id: 'producthunt-fetch', label: 'Product Hunt Fetch', category: 'input', service: 'Product Hunt', description: 'Fetch trending products from Product Hunt.', docsUrl: 'https://api.producthunt.com/v2/docs', icon: '🚀' },
  { id: 'hackernews-fetch', label: 'Hacker News Fetch', category: 'input', service: 'Hacker News', description: 'Fetch top stories from Hacker News.', docsUrl: 'https://github.com/HackerNews/API', icon: '🟠' },
  { id: 'clearbit-enrich', label: 'Clearbit Enrich Company', category: 'api', service: 'Clearbit', description: 'Enrich a company or person profile with Clearbit data.', docsUrl: 'https://dashboard.clearbit.com/docs', icon: '🏢' },
  { id: 'apollo-search', label: 'Apollo People Search', category: 'api', service: 'Apollo.io', description: 'Search for leads and contacts on Apollo.io.', docsUrl: 'https://apolloio.github.io/apollo-api-docs/', icon: '🎯' },

  // ── AI/LLM Processing (20) ─────────────────────────────────
  { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm', service: 'Claude', description: 'Summarize long text into concise key points using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '🤖' },
  { id: 'claude-classify', label: 'Claude Classify', category: 'llm', service: 'Claude', description: 'Classify text into predefined categories using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '🏷️' },
  { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm', service: 'Claude', description: 'Generate a written draft from a prompt using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '✏️' },
  { id: 'claude-extract', label: 'Claude Extract Data', category: 'llm', service: 'Claude', description: 'Extract structured data from unstructured text using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '🔬' },
  { id: 'claude-translate', label: 'Claude Translate', category: 'llm', service: 'Claude', description: 'Translate text between languages using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '🌍' },
  { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm', service: 'Claude', description: 'Perform deep analysis on data or text using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '🧪' },
  { id: 'claude-generate-code', label: 'Claude Generate Code', category: 'llm', service: 'Claude', description: 'Generate code from natural language instructions using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '💻' },
  { id: 'gpt4o-analyze', label: 'GPT-4o Analyze', category: 'llm', service: 'OpenAI', description: 'Analyze text or images using GPT-4o multimodal capabilities.', docsUrl: 'https://platform.openai.com/docs/models/gpt-4o', icon: '🧠' },
  { id: 'gpt4o-vision', label: 'GPT-4o Vision', category: 'llm', service: 'OpenAI', description: 'Analyze images and screenshots using GPT-4o vision.', docsUrl: 'https://platform.openai.com/docs/guides/vision', icon: '👁️' },
  { id: 'gemini-analyze', label: 'Gemini Analyze', category: 'llm', service: 'Google Gemini', description: 'Analyze content using Google Gemini model.', docsUrl: 'https://ai.google.dev/docs', icon: '♊' },
  { id: 'perplexity-answer', label: 'Perplexity Answer', category: 'llm', service: 'Perplexity', description: 'Get a sourced answer to a question via Perplexity.', docsUrl: 'https://docs.perplexity.ai/', icon: '🔮' },
  { id: 'dalle3-generate', label: 'DALL-E 3 Generate Image', category: 'llm', service: 'OpenAI', description: 'Generate an image from a text prompt using DALL-E 3.', docsUrl: 'https://platform.openai.com/docs/guides/images', icon: '🎨' },
  { id: 'flux-generate', label: 'Flux Generate Image', category: 'llm', service: 'Black Forest Labs', description: 'Generate an image using the Flux model.', docsUrl: 'https://docs.bfl.ml/', icon: '🖼️' },
  { id: 'whisper-transcribe', label: 'Whisper Transcribe Audio', category: 'llm', service: 'OpenAI', description: 'Transcribe audio to text using OpenAI Whisper.', docsUrl: 'https://platform.openai.com/docs/guides/speech-to-text', icon: '🎤' },
  { id: 'elevenlabs-tts', label: 'ElevenLabs Text-to-Speech', category: 'output', service: 'ElevenLabs', description: 'Convert text to natural-sounding speech via ElevenLabs.', docsUrl: 'https://elevenlabs.io/docs/api-reference/text-to-speech', icon: '🔊' },
  { id: 'deepl-translate', label: 'DeepL Translate', category: 'api', service: 'DeepL', description: 'Translate text between languages using DeepL API.', docsUrl: 'https://developers.deepl.com/docs', icon: '🌐' },
  { id: 'stable-diffusion-gen', label: 'Stable Diffusion Generate', category: 'llm', service: 'Stability AI', description: 'Generate an image using Stable Diffusion.', docsUrl: 'https://platform.stability.ai/docs/api-reference', icon: '🎨' },
  { id: 'claude-score', label: 'Claude Score & Rank', category: 'llm', service: 'Claude', description: 'Score and rank items based on criteria using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '📊' },
  { id: 'claude-predict', label: 'Claude Predict', category: 'llm', service: 'Claude', description: 'Make predictions from historical data patterns using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '🔮' },
  { id: 'claude-reflect', label: 'Claude Reflect', category: 'llm', service: 'Claude', description: 'Generate personal reflections and insights using Claude.', docsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models', icon: '💭' },

  // ── Dev & Code (20) ────────────────────────────────────────
  { id: 'github-list-prs', label: 'GitHub List PRs', category: 'input', service: 'GitHub', description: 'List open pull requests for a GitHub repository.', docsUrl: 'https://docs.github.com/en/rest/pulls/pulls', icon: '🐙' },
  { id: 'github-get-diff', label: 'GitHub Get Diff', category: 'input', service: 'GitHub', description: 'Fetch the diff of a pull request or commit.', docsUrl: 'https://docs.github.com/en/rest/commits/commits', icon: '🐙' },
  { id: 'github-create-issue', label: 'GitHub Create Issue', category: 'output', service: 'GitHub', description: 'Create a new issue on a GitHub repository.', docsUrl: 'https://docs.github.com/en/rest/issues/issues', icon: '🐛' },
  { id: 'github-list-releases', label: 'GitHub List Releases', category: 'input', service: 'GitHub', description: 'List releases for a GitHub repository.', docsUrl: 'https://docs.github.com/en/rest/releases/releases', icon: '🏷️' },
  { id: 'github-scan-repo', label: 'GitHub Scan Repository', category: 'input', service: 'GitHub', description: 'Scan a GitHub repository for file structure and code.', docsUrl: 'https://docs.github.com/en/rest/repos/contents', icon: '📂' },
  { id: 'github-post-comment', label: 'GitHub Post PR Comment', category: 'output', service: 'GitHub', description: 'Post a review comment on a GitHub pull request.', docsUrl: 'https://docs.github.com/en/rest/pulls/comments', icon: '💬' },
  { id: 'gitlab-list-mrs', label: 'GitLab List MRs', category: 'input', service: 'GitLab', description: 'List merge requests for a GitLab project.', docsUrl: 'https://docs.gitlab.com/ee/api/merge_requests.html', icon: '🦊' },
  { id: 'sentry-list-issues', label: 'Sentry List Issues', category: 'input', service: 'Sentry', description: 'Fetch unresolved error issues from Sentry.', docsUrl: 'https://docs.sentry.io/api/events/list-a-projects-issues/', icon: '🐞' },
  { id: 'pagerduty-trigger', label: 'PagerDuty Trigger Alert', category: 'output', service: 'PagerDuty', description: 'Trigger an incident alert on PagerDuty.', docsUrl: 'https://developer.pagerduty.com/api-reference/', icon: '🚨' },
  { id: 'vercel-deploy', label: 'Vercel Trigger Deploy', category: 'api', service: 'Vercel', description: 'Trigger a deployment on Vercel via deploy hook.', docsUrl: 'https://vercel.com/docs/rest-api', icon: '▲' },
  { id: 'snyk-scan', label: 'Snyk Vulnerability Scan', category: 'api', service: 'Snyk', description: 'Scan dependencies for known vulnerabilities using Snyk.', docsUrl: 'https://docs.snyk.io/snyk-api', icon: '🛡️' },
  { id: 'sonarqube-scan', label: 'SonarQube Code Analysis', category: 'api', service: 'SonarQube', description: 'Run static code analysis using SonarQube.', docsUrl: 'https://docs.sonarsource.com/sonarqube/latest/extension-guide/web-api/', icon: '📡' },
  { id: 'semgrep-scan', label: 'Semgrep SAST Scan', category: 'api', service: 'Semgrep', description: 'Run static analysis security testing with Semgrep rules.', docsUrl: 'https://semgrep.dev/docs/', icon: '🔒' },
  { id: 'jira-create-issue', label: 'Jira Create Issue', category: 'output', service: 'Jira', description: 'Create a new issue in a Jira project.', docsUrl: 'https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/', icon: '📋' },
  { id: 'jira-fetch-issues', label: 'Jira Fetch Issues', category: 'input', service: 'Jira', description: 'Fetch issues from Jira with JQL query.', docsUrl: 'https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/', icon: '📋' },
  { id: 'docker-build', label: 'Docker Build Image', category: 'api', service: 'Docker', description: 'Build a Docker image from a Dockerfile.', docsUrl: 'https://docs.docker.com/engine/api/', icon: '🐳' },
  { id: 'railway-deploy', label: 'Railway Deploy', category: 'api', service: 'Railway', description: 'Deploy a service on Railway.', docsUrl: 'https://docs.railway.app/reference/public-api', icon: '🚂' },
  { id: 'eslint-check', label: 'ESLint Check', category: 'api', service: 'ESLint', description: 'Run ESLint linting on JavaScript/TypeScript code.', docsUrl: 'https://eslint.org/docs/latest/integrate/nodejs-api', icon: '📏' },
  { id: 'virustotal-scan', label: 'VirusTotal Scan', category: 'api', service: 'VirusTotal', description: 'Scan a file or URL for malware using VirusTotal.', docsUrl: 'https://docs.virustotal.com/reference/overview', icon: '🦠' },
  { id: 'linear-update-issue', label: 'Linear Update Issue', category: 'output', service: 'Linear', description: 'Update status or fields on an existing Linear issue.', docsUrl: 'https://developers.linear.app/docs/graphql/working-with-the-graphql-api', icon: '📐' },

  // ── Data & Analytics (15) ──────────────────────────────────
  { id: 'gsheets-read', label: 'Google Sheets Read', category: 'input', service: 'Google Sheets', description: 'Read data from a Google Sheets spreadsheet.', docsUrl: 'https://developers.google.com/sheets/api/reference/rest', icon: '📊' },
  { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output', service: 'Google Sheets', description: 'Write or append data to a Google Sheets spreadsheet.', docsUrl: 'https://developers.google.com/sheets/api/reference/rest', icon: '📊' },
  { id: 'airtable-read', label: 'Airtable Read Records', category: 'input', service: 'Airtable', description: 'Read records from an Airtable base.', docsUrl: 'https://airtable.com/developers/web/api/introduction', icon: '📇' },
  { id: 'airtable-write', label: 'Airtable Create Record', category: 'output', service: 'Airtable', description: 'Create or update records in an Airtable base.', docsUrl: 'https://airtable.com/developers/web/api/introduction', icon: '📇' },
  { id: 'supabase-query', label: 'Supabase Query', category: 'api', service: 'Supabase', description: 'Query a Supabase PostgreSQL database.', docsUrl: 'https://supabase.com/docs/reference/javascript/select', icon: '⚡' },
  { id: 'supabase-insert', label: 'Supabase Insert', category: 'output', service: 'Supabase', description: 'Insert rows into a Supabase table.', docsUrl: 'https://supabase.com/docs/reference/javascript/insert', icon: '⚡' },
  { id: 'bigquery-query', label: 'BigQuery Run Query', category: 'api', service: 'BigQuery', description: 'Run a SQL query on Google BigQuery.', docsUrl: 'https://cloud.google.com/bigquery/docs/reference/rest', icon: '🏔️' },
  { id: 'snowflake-query', label: 'Snowflake Run Query', category: 'api', service: 'Snowflake', description: 'Execute a SQL query on Snowflake.', docsUrl: 'https://docs.snowflake.com/en/developer-guide/sql-api/reference', icon: '❄️' },
  { id: 'mixpanel-query', label: 'Mixpanel Query Events', category: 'input', service: 'Mixpanel', description: 'Query event analytics data from Mixpanel.', docsUrl: 'https://developer.mixpanel.com/reference/overview', icon: '📈' },
  { id: 'amplitude-query', label: 'Amplitude Query', category: 'input', service: 'Amplitude', description: 'Query user analytics data from Amplitude.', docsUrl: 'https://www.docs.developers.amplitude.com/analytics/apis/', icon: '📈' },
  { id: 'ga4-fetch', label: 'Google Analytics 4 Fetch', category: 'input', service: 'Google Analytics', description: 'Fetch analytics data from Google Analytics 4.', docsUrl: 'https://developers.google.com/analytics/devguides/reporting/data/v1', icon: '📊' },
  { id: 'segment-track', label: 'Segment Track Event', category: 'api', service: 'Segment', description: 'Send a track event to Segment.', docsUrl: 'https://segment.com/docs/connections/sources/catalog/libraries/server/http-api/', icon: '📡' },
  { id: 'datadog-query', label: 'Datadog Query Metrics', category: 'input', service: 'Datadog', description: 'Query infrastructure metrics from Datadog.', docsUrl: 'https://docs.datadoghq.com/api/latest/', icon: '🐶' },
  { id: 'grafana-query', label: 'Grafana Query Dashboard', category: 'input', service: 'Grafana', description: 'Query dashboard data from Grafana.', docsUrl: 'https://grafana.com/docs/grafana/latest/developers/http_api/', icon: '📉' },
  { id: 'newrelic-query', label: 'New Relic NRQL Query', category: 'input', service: 'New Relic', description: 'Run a NRQL query on New Relic data.', docsUrl: 'https://docs.newrelic.com/docs/apis/nerdgraph/examples/nerdgraph-nrql-tutorial/', icon: '🔭' },

  // ── Finance & Payments (15) ────────────────────────────────
  { id: 'stripe-list-charges', label: 'Stripe List Charges', category: 'input', service: 'Stripe', description: 'List recent charges from a Stripe account.', docsUrl: 'https://docs.stripe.com/api/charges/list', icon: '💳' },
  { id: 'stripe-get-mrr', label: 'Stripe Get MRR', category: 'input', service: 'Stripe', description: 'Calculate monthly recurring revenue from Stripe subscriptions.', docsUrl: 'https://docs.stripe.com/api/subscriptions/list', icon: '💰' },
  { id: 'stripe-create-invoice', label: 'Stripe Create Invoice', category: 'output', service: 'Stripe', description: 'Create and send an invoice via Stripe.', docsUrl: 'https://docs.stripe.com/api/invoices/create', icon: '🧾' },
  { id: 'paddle-list-txns', label: 'Paddle List Transactions', category: 'input', service: 'Paddle', description: 'List transactions from a Paddle account.', docsUrl: 'https://developer.paddle.com/api-reference/transactions/list-transactions', icon: '🏓' },
  { id: 'quickbooks-report', label: 'QuickBooks Get Report', category: 'input', service: 'QuickBooks', description: 'Generate a financial report from QuickBooks.', docsUrl: 'https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account', icon: '📒' },
  { id: 'xero-report', label: 'Xero Get Report', category: 'input', service: 'Xero', description: 'Fetch a financial report from Xero.', docsUrl: 'https://developer.xero.com/documentation/api/accounting/reports', icon: '📒' },
  { id: 'plaid-get-txns', label: 'Plaid Get Transactions', category: 'input', service: 'Plaid', description: 'Fetch bank transactions via Plaid.', docsUrl: 'https://plaid.com/docs/api/products/transactions/', icon: '🏦' },
  { id: 'coingecko-price', label: 'CoinGecko Get Price', category: 'api', service: 'CoinGecko', description: 'Fetch cryptocurrency prices from CoinGecko.', docsUrl: 'https://docs.coingecko.com/reference/introduction', icon: '🦎' },
  { id: 'defillama-tvl', label: 'DeFiLlama Get TVL', category: 'api', service: 'DeFiLlama', description: 'Fetch total value locked for DeFi protocols.', docsUrl: 'https://defillama.com/docs/api', icon: '🦙' },
  { id: 'binance-ticker', label: 'Binance Get Ticker', category: 'api', service: 'Binance', description: 'Fetch real-time price ticker from Binance.', docsUrl: 'https://binance-docs.github.io/apidocs/spot/en/', icon: '📈' },
  { id: 'coinbase-price', label: 'Coinbase Get Price', category: 'api', service: 'Coinbase', description: 'Get current crypto price from Coinbase.', docsUrl: 'https://docs.cdp.coinbase.com/', icon: '🪙' },
  { id: 'etherscan-txns', label: 'Etherscan Get Transactions', category: 'api', service: 'Etherscan', description: 'Fetch Ethereum transactions for an address.', docsUrl: 'https://docs.etherscan.io/', icon: '⟠' },
  { id: 'stripe-list-subs', label: 'Stripe List Subscriptions', category: 'input', service: 'Stripe', description: 'List active subscriptions from Stripe.', docsUrl: 'https://docs.stripe.com/api/subscriptions/list', icon: '🔄' },
  { id: 'wise-convert', label: 'Wise Currency Convert', category: 'api', service: 'Wise', description: 'Get exchange rates and convert currency via Wise.', docsUrl: 'https://docs.wise.com/', icon: '💱' },
  { id: 'mercury-balance', label: 'Mercury Get Balance', category: 'input', service: 'Mercury', description: 'Fetch account balance from Mercury banking.', docsUrl: 'https://docs.mercury.com/reference/accounts', icon: '🏦' },

  // ── E-Commerce (10) ────────────────────────────────────────
  { id: 'shopify-list-products', label: 'Shopify List Products', category: 'input', service: 'Shopify', description: 'List products from a Shopify store.', docsUrl: 'https://shopify.dev/docs/api/admin-rest/2024-01/resources/product', icon: '🛍️' },
  { id: 'shopify-list-orders', label: 'Shopify List Orders', category: 'input', service: 'Shopify', description: 'List recent orders from a Shopify store.', docsUrl: 'https://shopify.dev/docs/api/admin-rest/2024-01/resources/order', icon: '📦' },
  { id: 'shopify-update-inventory', label: 'Shopify Update Inventory', category: 'api', service: 'Shopify', description: 'Update inventory levels for Shopify products.', docsUrl: 'https://shopify.dev/docs/api/admin-rest/2024-01/resources/inventorylevel', icon: '📦' },
  { id: 'shopify-create-product', label: 'Shopify Create Product', category: 'output', service: 'Shopify', description: 'Create a new product in a Shopify store.', docsUrl: 'https://shopify.dev/docs/api/admin-rest/2024-01/resources/product', icon: '🛍️' },
  { id: 'woocommerce-list-orders', label: 'WooCommerce List Orders', category: 'input', service: 'WooCommerce', description: 'List recent orders from a WooCommerce store.', docsUrl: 'https://woocommerce.github.io/woocommerce-rest-api-docs/', icon: '🛒' },
  { id: 'amazon-list-orders', label: 'Amazon Seller List Orders', category: 'input', service: 'Amazon Seller', description: 'List orders from Amazon Seller Central.', docsUrl: 'https://developer-docs.amazon.com/sp-api/', icon: '📦' },
  { id: 'ebay-list-items', label: 'eBay List Items', category: 'input', service: 'eBay', description: 'List active items from eBay seller account.', docsUrl: 'https://developer.ebay.com/develop/apis', icon: '🏷️' },
  { id: 'klaviyo-send-campaign', label: 'Klaviyo Send Campaign', category: 'output', service: 'Klaviyo', description: 'Trigger an email campaign via Klaviyo.', docsUrl: 'https://developers.klaviyo.com/en/reference/api_overview', icon: '📧' },
  { id: 'shopify-get-analytics', label: 'Shopify Get Analytics', category: 'input', service: 'Shopify', description: 'Fetch store analytics and sales data from Shopify.', docsUrl: 'https://shopify.dev/docs/api/admin-rest', icon: '📊' },
  { id: 'shopify-competitor-price', label: 'Shopify Price Monitor', category: 'api', service: 'Shopify', description: 'Monitor and compare product prices across stores.', docsUrl: 'https://shopify.dev/docs/api/admin-rest', icon: '💲' },

  // ── Marketing & Social (20) ────────────────────────────────
  { id: 'twitter-post', label: 'Twitter/X Post Tweet', category: 'output', service: 'Twitter/X', description: 'Post a tweet on Twitter/X.', docsUrl: 'https://developer.x.com/en/docs/x-api', icon: '🐦' },
  { id: 'twitter-fetch-timeline', label: 'Twitter/X Fetch Timeline', category: 'input', service: 'Twitter/X', description: 'Fetch recent tweets from a user timeline.', docsUrl: 'https://developer.x.com/en/docs/x-api', icon: '🐦' },
  { id: 'twitter-search', label: 'Twitter/X Search', category: 'input', service: 'Twitter/X', description: 'Search tweets by keyword or hashtag.', docsUrl: 'https://developer.x.com/en/docs/x-api', icon: '🐦' },
  { id: 'linkedin-post', label: 'LinkedIn Post', category: 'output', service: 'LinkedIn', description: 'Publish a post on LinkedIn.', docsUrl: 'https://learn.microsoft.com/en-us/linkedin/marketing/', icon: '💼' },
  { id: 'linkedin-scrape', label: 'LinkedIn Profile Scrape', category: 'api', service: 'LinkedIn', description: 'Scrape public LinkedIn profile data via proxy.', docsUrl: 'https://nubela.co/proxycurl/docs', icon: '💼' },
  { id: 'instagram-post', label: 'Instagram Post', category: 'output', service: 'Instagram', description: 'Publish a photo or reel on Instagram via Graph API.', docsUrl: 'https://developers.facebook.com/docs/instagram-api/', icon: '📸' },
  { id: 'tiktok-fetch', label: 'TikTok Fetch Videos', category: 'input', service: 'TikTok', description: 'Fetch video data from a TikTok account.', docsUrl: 'https://developers.tiktok.com/doc/research-api/', icon: '🎵' },
  { id: 'youtube-fetch', label: 'YouTube Fetch Videos', category: 'input', service: 'YouTube', description: 'Fetch video metadata from YouTube Data API.', docsUrl: 'https://developers.google.com/youtube/v3', icon: '📺' },
  { id: 'youtube-upload', label: 'YouTube Upload Video', category: 'output', service: 'YouTube', description: 'Upload a video to YouTube.', docsUrl: 'https://developers.google.com/youtube/v3/docs/videos/insert', icon: '📺' },
  { id: 'canva-generate', label: 'Canva Generate Design', category: 'api', service: 'Canva', description: 'Generate a design using Canva Connect API.', docsUrl: 'https://www.canva.dev/docs/connect/', icon: '🎨' },
  { id: 'mailchimp-send', label: 'Mailchimp Send Campaign', category: 'output', service: 'Mailchimp', description: 'Send an email campaign via Mailchimp.', docsUrl: 'https://mailchimp.com/developer/marketing/api/', icon: '🐵' },
  { id: 'hubspot-create-contact', label: 'HubSpot Create Contact', category: 'output', service: 'HubSpot', description: 'Create or update a contact in HubSpot CRM.', docsUrl: 'https://developers.hubspot.com/docs/api/crm/contacts', icon: '🟠' },
  { id: 'hubspot-update-deal', label: 'HubSpot Update Deal', category: 'output', service: 'HubSpot', description: 'Update a deal in HubSpot CRM pipeline.', docsUrl: 'https://developers.hubspot.com/docs/api/crm/deals', icon: '🟠' },
  { id: 'semrush-fetch', label: 'SEMrush Fetch Rankings', category: 'input', service: 'SEMrush', description: 'Fetch keyword ranking data from SEMrush.', docsUrl: 'https://developer.semrush.com/api/', icon: '📊' },
  { id: 'ahrefs-fetch', label: 'Ahrefs Fetch Backlinks', category: 'input', service: 'Ahrefs', description: 'Fetch backlink data from Ahrefs.', docsUrl: 'https://docs.ahrefs.com/', icon: '🔗' },
  { id: 'google-ads-fetch', label: 'Google Ads Fetch Report', category: 'input', service: 'Google Ads', description: 'Fetch campaign performance report from Google Ads.', docsUrl: 'https://developers.google.com/google-ads/api/docs/start', icon: '📢' },
  { id: 'meta-ads-fetch', label: 'Meta Ads Fetch Report', category: 'input', service: 'Meta Ads', description: 'Fetch ad campaign data from Meta Ads Manager.', docsUrl: 'https://developers.facebook.com/docs/marketing-apis/', icon: '📢' },
  { id: 'facebook-post', label: 'Facebook Post', category: 'output', service: 'Facebook', description: 'Publish a post on a Facebook page.', docsUrl: 'https://developers.facebook.com/docs/pages-api/', icon: '👍' },
  { id: 'hubspot-fetch-deals', label: 'HubSpot Fetch Deals', category: 'input', service: 'HubSpot', description: 'Fetch deals from HubSpot CRM pipeline.', docsUrl: 'https://developers.hubspot.com/docs/api/crm/deals', icon: '🟠' },
  { id: 'hubspot-fetch-contacts', label: 'HubSpot Fetch Contacts', category: 'input', service: 'HubSpot', description: 'Fetch contacts from HubSpot CRM.', docsUrl: 'https://developers.hubspot.com/docs/api/crm/contacts', icon: '🟠' },

  // ── Media & Content (10) ───────────────────────────────────
  { id: 'youtube-dl', label: 'YouTube Download Audio', category: 'api', service: 'yt-dlp', description: 'Download audio from a YouTube video using yt-dlp.', docsUrl: 'https://github.com/yt-dlp/yt-dlp', icon: '⬇️' },
  { id: 'ffmpeg-convert', label: 'FFmpeg Convert Media', category: 'api', service: 'FFmpeg', description: 'Convert or process media files using FFmpeg.', docsUrl: 'https://ffmpeg.org/documentation.html', icon: '🎬' },
  { id: 'podcast-rss-fetch', label: 'Podcast RSS Fetch', category: 'input', service: 'RSS', description: 'Fetch and parse a podcast RSS feed for episodes.', docsUrl: 'https://www.rssboard.org/rss-specification', icon: '🎙️' },
  { id: 'spotify-fetch', label: 'Spotify Fetch Playlist', category: 'input', service: 'Spotify', description: 'Fetch playlist or track data from Spotify.', docsUrl: 'https://developer.spotify.com/documentation/web-api', icon: '🎵' },
  { id: 'spotify-now-playing', label: 'Spotify Now Playing', category: 'input', service: 'Spotify', description: 'Get currently playing track from Spotify.', docsUrl: 'https://developer.spotify.com/documentation/web-api', icon: '🎵' },
  { id: 'apple-podcasts-search', label: 'Apple Podcasts Search', category: 'api', service: 'Apple Podcasts', description: 'Search for podcasts via Apple Podcasts API.', docsUrl: 'https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/', icon: '🎧' },
  { id: 'substack-fetch', label: 'Substack Fetch Posts', category: 'input', service: 'Substack', description: 'Fetch recent posts from a Substack publication.', docsUrl: 'https://substack.com/', icon: '✉️' },
  { id: 'canva-export', label: 'Canva Export Design', category: 'api', service: 'Canva', description: 'Export a Canva design to PNG/PDF.', docsUrl: 'https://www.canva.dev/docs/connect/', icon: '🖼️' },
  { id: 'cloudinary-upload', label: 'Cloudinary Upload', category: 'api', service: 'Cloudinary', description: 'Upload and transform images via Cloudinary.', docsUrl: 'https://cloudinary.com/documentation/upload_images', icon: '☁️' },
  { id: 'rss-fetch', label: 'RSS Feed Fetch', category: 'input', service: 'RSS', description: 'Fetch and parse any RSS/Atom feed.', docsUrl: 'https://www.rssboard.org/rss-specification', icon: '📡' },

  // ── Customer Support (10) ──────────────────────────────────
  { id: 'zendesk-list-tickets', label: 'Zendesk List Tickets', category: 'input', service: 'Zendesk', description: 'List open support tickets from Zendesk.', docsUrl: 'https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/', icon: '🎫' },
  { id: 'zendesk-create-ticket', label: 'Zendesk Create Ticket', category: 'output', service: 'Zendesk', description: 'Create a new support ticket in Zendesk.', docsUrl: 'https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/', icon: '🎫' },
  { id: 'zendesk-reply', label: 'Zendesk Reply Ticket', category: 'output', service: 'Zendesk', description: 'Add a reply to an existing Zendesk ticket.', docsUrl: 'https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_comments/', icon: '🎫' },
  { id: 'intercom-list-convos', label: 'Intercom List Conversations', category: 'input', service: 'Intercom', description: 'List conversations from Intercom inbox.', docsUrl: 'https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/listConversations', icon: '💬' },
  { id: 'intercom-fetch-events', label: 'Intercom Fetch Events', category: 'input', service: 'Intercom', description: 'Fetch user events and activities from Intercom.', docsUrl: 'https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Data-Events/listDataEvents', icon: '💬' },
  { id: 'freshdesk-list-tickets', label: 'Freshdesk List Tickets', category: 'input', service: 'Freshdesk', description: 'List support tickets from Freshdesk.', docsUrl: 'https://developers.freshdesk.com/api/', icon: '🎟️' },
  { id: 'helpscout-list', label: 'HelpScout List Conversations', category: 'input', service: 'HelpScout', description: 'List conversations from HelpScout mailbox.', docsUrl: 'https://developer.helpscout.com/mailbox-api/', icon: '🆘' },
  { id: 'typeform-fetch', label: 'Typeform Fetch Responses', category: 'input', service: 'Typeform', description: 'Fetch form responses from Typeform.', docsUrl: 'https://www.typeform.com/developers/', icon: '📝' },
  { id: 'crisp-list', label: 'Crisp List Conversations', category: 'input', service: 'Crisp', description: 'List chat conversations from Crisp.', docsUrl: 'https://docs.crisp.chat/references/rest-api/v1/', icon: '💬' },
  { id: 'drift-list', label: 'Drift List Conversations', category: 'input', service: 'Drift', description: 'List chatbot conversations from Drift.', docsUrl: 'https://devdocs.drift.com/docs/', icon: '💬' },

  // ── Healthcare & Wellness (8) ──────────────────────────────
  { id: 'oura-sleep', label: 'Oura Ring Sleep Data', category: 'input', service: 'Oura Ring', description: 'Fetch sleep data from Oura Ring API.', docsUrl: 'https://cloud.ouraring.com/v2/docs', icon: '💍' },
  { id: 'oura-activity', label: 'Oura Ring Activity Data', category: 'input', service: 'Oura Ring', description: 'Fetch daily activity data from Oura Ring.', docsUrl: 'https://cloud.ouraring.com/v2/docs', icon: '💍' },
  { id: 'apple-health-fetch', label: 'Apple Health Fetch', category: 'input', service: 'Apple Health', description: 'Fetch health metrics from Apple Health via shortcuts.', docsUrl: 'https://developer.apple.com/health-fitness/', icon: '❤️' },
  { id: 'google-fit-fetch', label: 'Google Fit Fetch', category: 'input', service: 'Google Fit', description: 'Fetch fitness data from Google Fit.', docsUrl: 'https://developers.google.com/fit/rest', icon: '🏃' },
  { id: 'whoop-fetch', label: 'Whoop Fetch Recovery', category: 'input', service: 'Whoop', description: 'Fetch recovery and strain data from Whoop.', docsUrl: 'https://developer.whoop.com/api', icon: '💪' },
  { id: 'garmin-fetch', label: 'Garmin Fetch Activity', category: 'input', service: 'Garmin', description: 'Fetch activity data from Garmin Connect.', docsUrl: 'https://developer.garmin.com/gc-developer-program/overview/', icon: '⌚' },
  { id: 'cronometer-fetch', label: 'Cronometer Fetch Nutrition', category: 'input', service: 'Cronometer', description: 'Fetch daily nutrition data from Cronometer.', docsUrl: 'https://cronometer.com/', icon: '🥗' },
  { id: 'openfda-search', label: 'OpenFDA Drug Search', category: 'api', service: 'OpenFDA', description: 'Search drug information from FDA open data.', docsUrl: 'https://open.fda.gov/apis/', icon: '💊' },

  // ── Legal & Compliance (6) ─────────────────────────────────
  { id: 'docusign-send', label: 'DocuSign Send Envelope', category: 'output', service: 'DocuSign', description: 'Send a document for e-signature via DocuSign.', docsUrl: 'https://developers.docusign.com/docs/esign-rest-api/', icon: '✍️' },
  { id: 'hellosign-send', label: 'HelloSign Send Request', category: 'output', service: 'HelloSign', description: 'Send a signature request via HelloSign.', docsUrl: 'https://developers.hellosign.com/docs/overview/', icon: '✍️' },
  { id: 'pandadoc-create', label: 'PandaDoc Create Document', category: 'output', service: 'PandaDoc', description: 'Create and send a document via PandaDoc.', docsUrl: 'https://developers.pandadoc.com/', icon: '🐼' },
  { id: 'sec-edgar-search', label: 'SEC EDGAR Search Filings', category: 'api', service: 'SEC EDGAR', description: 'Search SEC EDGAR for company filings.', docsUrl: 'https://www.sec.gov/search#/q=&dateRange=custom', icon: '🏛️' },
  { id: 'uspto-search', label: 'USPTO Patent Search', category: 'api', service: 'USPTO', description: 'Search for patents via USPTO API.', docsUrl: 'https://developer.uspto.gov/', icon: '📜' },
  { id: 'lexisnexis-search', label: 'LexisNexis Search', category: 'api', service: 'LexisNexis', description: 'Search legal documents on LexisNexis.', docsUrl: 'https://www.lexisnexis.com/en-us/professional/api/', icon: '⚖️' },

  // ── IoT & Smart Home (8) ──────────────────────────────────
  { id: 'homeassistant-states', label: 'Home Assistant Get States', category: 'input', service: 'Home Assistant', description: 'Get entity states from Home Assistant.', docsUrl: 'https://developers.home-assistant.io/docs/api/rest/', icon: '🏠' },
  { id: 'homeassistant-call', label: 'Home Assistant Call Service', category: 'api', service: 'Home Assistant', description: 'Call a service on Home Assistant (e.g. turn on light).', docsUrl: 'https://developers.home-assistant.io/docs/api/rest/', icon: '🏠' },
  { id: 'mqtt-publish', label: 'MQTT Publish Message', category: 'output', service: 'MQTT', description: 'Publish a message to an MQTT topic.', docsUrl: 'https://mqtt.org/mqtt-specification/', icon: '📡' },
  { id: 'hue-control', label: 'Philips Hue Control', category: 'api', service: 'Philips Hue', description: 'Control Philips Hue smart lights.', docsUrl: 'https://developers.meethue.com/develop/get-started-2/', icon: '💡' },
  { id: 'openweather-fetch', label: 'OpenWeatherMap Fetch', category: 'api', service: 'OpenWeatherMap', description: 'Fetch current weather and forecast data.', docsUrl: 'https://openweathermap.org/api', icon: '🌤️' },
  { id: 'purpleair-fetch', label: 'PurpleAir Fetch AQI', category: 'api', service: 'PurpleAir', description: 'Fetch air quality index from PurpleAir sensor.', docsUrl: 'https://api.purpleair.com/', icon: '🌬️' },
  { id: 'influxdb-query', label: 'InfluxDB Query', category: 'api', service: 'InfluxDB', description: 'Query time-series data from InfluxDB.', docsUrl: 'https://docs.influxdata.com/influxdb/v2/api/', icon: '📈' },
  { id: 'nest-fetch', label: 'Nest Thermostat Fetch', category: 'input', service: 'Google Nest', description: 'Fetch thermostat data from Google Nest.', docsUrl: 'https://developers.google.com/nest/device-access', icon: '🌡️' },

  // ── Security (8) ───────────────────────────────────────────
  { id: 'shodan-search', label: 'Shodan Search', category: 'api', service: 'Shodan', description: 'Search for internet-connected devices on Shodan.', docsUrl: 'https://developer.shodan.io/api', icon: '🔍' },
  { id: 'hibp-check', label: 'HaveIBeenPwned Check', category: 'api', service: 'HaveIBeenPwned', description: 'Check if an email has been in a data breach.', docsUrl: 'https://haveibeenpwned.com/API/v3', icon: '🔓' },
  { id: 'cve-search', label: 'CVE NVD Search', category: 'api', service: 'NIST NVD', description: 'Search the CVE National Vulnerability Database.', docsUrl: 'https://nvd.nist.gov/developers/vulnerabilities', icon: '🛡️' },
  { id: 'crowdstrike-alert', label: 'CrowdStrike Get Alerts', category: 'input', service: 'CrowdStrike', description: 'Fetch threat alerts from CrowdStrike Falcon.', docsUrl: 'https://falcon.crowdstrike.com/documentation/', icon: '🦅' },
  { id: 'snyk-list-vulns', label: 'Snyk List Vulnerabilities', category: 'input', service: 'Snyk', description: 'List known vulnerabilities from Snyk database.', docsUrl: 'https://docs.snyk.io/snyk-api', icon: '🛡️' },
  { id: 'sonarqube-issues', label: 'SonarQube List Issues', category: 'input', service: 'SonarQube', description: 'List code quality issues from SonarQube.', docsUrl: 'https://docs.sonarsource.com/sonarqube/latest/extension-guide/web-api/', icon: '📡' },
  { id: 'semgrep-results', label: 'Semgrep Get Results', category: 'input', service: 'Semgrep', description: 'Fetch scan results from Semgrep Cloud.', docsUrl: 'https://semgrep.dev/docs/', icon: '🔒' },
  { id: 'virustotal-report', label: 'VirusTotal Get Report', category: 'api', service: 'VirusTotal', description: 'Get a scan report from VirusTotal.', docsUrl: 'https://docs.virustotal.com/reference/overview', icon: '🦠' },

  // ── Travel (6) ─────────────────────────────────────────────
  { id: 'skyscanner-search', label: 'Skyscanner Search Flights', category: 'api', service: 'Skyscanner', description: 'Search for flights using Skyscanner API.', docsUrl: 'https://developers.skyscanner.net/docs/intro', icon: '✈️' },
  { id: 'google-flights-search', label: 'Google Flights Search', category: 'api', service: 'Google Flights', description: 'Search for flights via Google Flights.', docsUrl: 'https://developers.google.com/travel', icon: '✈️' },
  { id: 'booking-search', label: 'Booking.com Search Hotels', category: 'api', service: 'Booking.com', description: 'Search hotels and accommodations on Booking.com.', docsUrl: 'https://developers.booking.com/', icon: '🏨' },
  { id: 'tripadvisor-search', label: 'TripAdvisor Search', category: 'api', service: 'TripAdvisor', description: 'Search for attractions and restaurants on TripAdvisor.', docsUrl: 'https://tripadvisor-content-api.readme.io/', icon: '🗺️' },
  { id: 'google-maps-directions', label: 'Google Maps Directions', category: 'api', service: 'Google Maps', description: 'Get directions and travel time from Google Maps.', docsUrl: 'https://developers.google.com/maps/documentation/directions', icon: '🗺️' },
  { id: 'google-maps-places', label: 'Google Maps Places', category: 'api', service: 'Google Maps', description: 'Search for places and points of interest.', docsUrl: 'https://developers.google.com/maps/documentation/places/web-service', icon: '📍' },

  // ── Gaming (5) ─────────────────────────────────────────────
  { id: 'steam-player-stats', label: 'Steam Player Stats', category: 'input', service: 'Steam', description: 'Fetch player game stats from Steam Web API.', docsUrl: 'https://developer.valvesoftware.com/wiki/Steam_Web_API', icon: '🎮' },
  { id: 'riot-match-history', label: 'Riot Games Match History', category: 'input', service: 'Riot Games', description: 'Fetch match history from Riot Games API.', docsUrl: 'https://developer.riotgames.com/apis', icon: '⚔️' },
  { id: 'battlenet-profile', label: 'Battle.net Profile', category: 'input', service: 'Battle.net', description: 'Fetch player profile from Battle.net API.', docsUrl: 'https://develop.battle.net/documentation', icon: '🎮' },
  { id: 'twitch-stream', label: 'Twitch Get Stream', category: 'input', service: 'Twitch', description: 'Get live stream data from Twitch API.', docsUrl: 'https://dev.twitch.tv/docs/api/', icon: '📺' },
  { id: 'twitch-clip', label: 'Twitch Create Clip', category: 'output', service: 'Twitch', description: 'Create a clip from a Twitch stream.', docsUrl: 'https://dev.twitch.tv/docs/api/reference/#create-clip', icon: '✂️' },

  // ── Utility (bonus to reach ~200) ──────────────────────────
  { id: 'pdf-parse', label: 'PDF Parse', category: 'api', service: 'pdf-parse', description: 'Extract text content from a PDF document.', docsUrl: 'https://www.npmjs.com/package/pdf-parse', icon: '📄' },
  { id: 'json-transform', label: 'JSON Transform', category: 'api', service: 'jq', description: 'Transform JSON data with jq-like expressions.', docsUrl: 'https://stedolan.github.io/jq/manual/', icon: '🔧' },
  { id: 'webhook-trigger', label: 'Webhook Trigger', category: 'input', service: 'Webhook', description: 'Receive incoming data via HTTP webhook.', docsUrl: 'https://en.wikipedia.org/wiki/Webhook', icon: '🔗' },
  { id: 'user-input', label: 'User Text Input', category: 'input', service: 'RuneHub', description: 'Accept free-form text input from the user.', docsUrl: 'https://runehub.dev/', icon: '⌨️' },
  { id: 'screenshot-capture', label: 'Screenshot Capture', category: 'input', service: 'Puppeteer', description: 'Capture a screenshot of a web page using Puppeteer.', docsUrl: 'https://pptr.dev/', icon: '📸' },
  { id: 'anki-export', label: 'Anki Export Deck', category: 'output', service: 'Anki', description: 'Export flashcards to Anki-compatible format.', docsUrl: 'https://docs.ankiweb.net/', icon: '🃏' },
  { id: 'streak-tracker', label: 'Streak Tracker', category: 'api', service: 'RuneHub', description: 'Track daily streaks and habit completion.', docsUrl: 'https://runehub.dev/', icon: '🔥' },
];
