# RuneGraph 프로젝트 계획서

> AI 에이전트 스킬 오케스트레이션 마켓플레이스
> 슬로건: "Inscribe. Invoke. Trust."

---

## 임무 1: 10개 Rune 상세 스펙

---

### 1. `morning-brief` — 개인 생산성 (아침 브리핑)

**목적:** 매일 아침 날씨·일정·뉴스를 종합해 음성 브리핑 생성

**스킬:** weather-api, calendar-fetch, news-headlines, llm-summarize, tts-speak

**파이프라인:** weather-api + calendar-fetch + news-headlines → llm-summarize → tts-speak

**활용 예시:** 기상 후 "오늘 브리핑 해줘" → 날씨(12°C, 비), 일정(회의 2건), 주요 뉴스 3건을 자연스러운 음성으로 전달

```json
{
  "nodes": [
    {"id": "weather-api", "label": "Weather API", "category": "api"},
    {"id": "calendar-fetch", "label": "Calendar Fetch", "category": "api"},
    {"id": "news-headlines", "label": "News Headlines", "category": "api"},
    {"id": "llm-summarize", "label": "LLM Summarize", "category": "llm"},
    {"id": "tts-speak", "label": "TTS Speak", "category": "output"}
  ],
  "edges": [
    {"source": "weather-api", "target": "llm-summarize", "label": "weather data"},
    {"source": "calendar-fetch", "target": "llm-summarize", "label": "events"},
    {"source": "news-headlines", "target": "llm-summarize", "label": "headlines"},
    {"source": "llm-summarize", "target": "tts-speak", "label": "briefing text"}
  ]
}
```

---

### 2. `deep-research` — 리서치 자동화

**목적:** 키워드로 웹 리서치 → 요약 → Notion에 저장

**스킬:** web-search, web-scrape, llm-summarize, notion-save

**파이프라인:** web-search → web-scrape → llm-summarize → notion-save

**활용 예시:** "AI agent framework 트렌드 조사해줘" → 상위 10개 결과 스크래핑 → 핵심 인사이트 요약 → Notion DB에 자동 저장

```json
{
  "nodes": [
    {"id": "web-search", "label": "Web Search", "category": "api"},
    {"id": "web-scrape", "label": "Web Scrape", "category": "api"},
    {"id": "llm-summarize", "label": "LLM Summarize", "category": "llm"},
    {"id": "notion-save", "label": "Notion Save", "category": "output"}
  ],
  "edges": [
    {"source": "web-search", "target": "web-scrape", "label": "urls"},
    {"source": "web-scrape", "target": "llm-summarize", "label": "raw content"},
    {"source": "llm-summarize", "target": "notion-save", "label": "summary"}
  ]
}
```

---

### 3. `blog-forge` — 콘텐츠 생성

**목적:** 키워드에서 SEO 최적화된 블로그 포스트 자동 생성

**스킬:** keyword-research, llm-outline, llm-draft, image-gen, markdown-export

**파이프라인:** keyword-research → llm-outline → llm-draft → image-gen(병렬) → markdown-export

**활용 예시:** "Next.js 15 새 기능" 키워드 → 롱테일 키워드 분석 → 아웃라인 → 3000자 초안 → 대표 이미지 생성 → MD 파일 출력

```json
{
  "nodes": [
    {"id": "keyword-research", "label": "Keyword Research", "category": "api"},
    {"id": "llm-outline", "label": "LLM Outline", "category": "llm"},
    {"id": "llm-draft", "label": "LLM Draft", "category": "llm"},
    {"id": "image-gen", "label": "Image Generate", "category": "llm"},
    {"id": "markdown-export", "label": "Markdown Export", "category": "output"}
  ],
  "edges": [
    {"source": "keyword-research", "target": "llm-outline", "label": "keywords"},
    {"source": "llm-outline", "target": "llm-draft", "label": "outline"},
    {"source": "llm-draft", "target": "markdown-export", "label": "draft text"},
    {"source": "llm-draft", "target": "image-gen", "label": "image prompt"},
    {"source": "image-gen", "target": "markdown-export", "label": "image url"}
  ]
}
```

---

### 4. `code-sentinel` — 코드 리뷰 자동화

**목적:** PR diff를 분석해 보안·성능·스타일 이슈를 리포트

**스킬:** github-diff, llm-code-review, eslint-check, slack-notify

**파이프라인:** github-diff → llm-code-review + eslint-check(병렬) → slack-notify

**활용 예시:** PR 올라오면 → diff 추출 → LLM이 로직/보안 리뷰 + ESLint 정적분석 → Slack에 리뷰 결과 알림

```json
{
  "nodes": [
    {"id": "github-diff", "label": "GitHub Diff", "category": "api"},
    {"id": "llm-code-review", "label": "LLM Code Review", "category": "llm"},
    {"id": "eslint-check", "label": "ESLint Check", "category": "api"},
    {"id": "slack-notify", "label": "Slack Notify", "category": "output"}
  ],
  "edges": [
    {"source": "github-diff", "target": "llm-code-review", "label": "diff text"},
    {"source": "github-diff", "target": "eslint-check", "label": "changed files"},
    {"source": "llm-code-review", "target": "slack-notify", "label": "review comments"},
    {"source": "eslint-check", "target": "slack-notify", "label": "lint results"}
  ]
}
```

---

### 5. `data-insight` — 데이터 파이프라인

**목적:** CSV 업로드 → 자동 분석 → 차트 + 인사이트 리포트

**스킬:** csv-parse, python-analyze, chart-gen, llm-interpret, pdf-export

**파이프라인:** csv-parse → python-analyze → chart-gen + llm-interpret(병렬) → pdf-export

**활용 예시:** 매출 CSV 업로드 → 통계 분석 → 트렌드 차트 생성 + "전월 대비 12% 성장" 인사이트 → PDF 리포트

```json
{
  "nodes": [
    {"id": "csv-parse", "label": "CSV Parse", "category": "input"},
    {"id": "python-analyze", "label": "Python Analyze", "category": "api"},
    {"id": "chart-gen", "label": "Chart Generate", "category": "output"},
    {"id": "llm-interpret", "label": "LLM Interpret", "category": "llm"},
    {"id": "pdf-export", "label": "PDF Export", "category": "output"}
  ],
  "edges": [
    {"source": "csv-parse", "target": "python-analyze", "label": "parsed data"},
    {"source": "python-analyze", "target": "chart-gen", "label": "stats"},
    {"source": "python-analyze", "target": "llm-interpret", "label": "stats"},
    {"source": "chart-gen", "target": "pdf-export", "label": "chart images"},
    {"source": "llm-interpret", "target": "pdf-export", "label": "insight text"}
  ]
}
```

---

### 6. `support-sage` — 고객 지원 자동화

**목적:** 고객 문의를 분류하고 FAQ 매칭 또는 에스컬레이션

**스킬:** ticket-ingest, llm-classify, faq-search, llm-reply-draft, zendesk-update

**파이프라인:** ticket-ingest → llm-classify → faq-search → llm-reply-draft → zendesk-update

**활용 예시:** "결제가 안 돼요" 티켓 → 카테고리: billing → FAQ에서 유사 답변 검색 → 맞춤 답변 초안 → Zendesk에 내부 노트로 등록

```json
{
  "nodes": [
    {"id": "ticket-ingest", "label": "Ticket Ingest", "category": "input"},
    {"id": "llm-classify", "label": "LLM Classify", "category": "llm"},
    {"id": "faq-search", "label": "FAQ Search", "category": "api"},
    {"id": "llm-reply-draft", "label": "LLM Reply Draft", "category": "llm"},
    {"id": "zendesk-update", "label": "Zendesk Update", "category": "output"}
  ],
  "edges": [
    {"source": "ticket-ingest", "target": "llm-classify", "label": "ticket text"},
    {"source": "llm-classify", "target": "faq-search", "label": "category + intent"},
    {"source": "faq-search", "target": "llm-reply-draft", "label": "matched FAQs"},
    {"source": "llm-reply-draft", "target": "zendesk-update", "label": "draft reply"}
  ]
}
```

---

### 7. `social-pulse` — 소셜 미디어 관리

**목적:** 트렌드 감지 → 포스트 생성 → 멀티 플랫폼 예약 발행

**스킬:** trend-monitor, llm-copywrite, image-gen, twitter-post, linkedin-post

**파이프라인:** trend-monitor → llm-copywrite → image-gen → twitter-post + linkedin-post(병렬)

**활용 예시:** AI 관련 트렌드 감지 → 플랫폼별 톤에 맞는 카피 생성 → 대표 이미지 생성 → Twitter/LinkedIn 동시 예약 발행

```json
{
  "nodes": [
    {"id": "trend-monitor", "label": "Trend Monitor", "category": "api"},
    {"id": "llm-copywrite", "label": "LLM Copywrite", "category": "llm"},
    {"id": "image-gen", "label": "Image Generate", "category": "llm"},
    {"id": "twitter-post", "label": "Twitter Post", "category": "output"},
    {"id": "linkedin-post", "label": "LinkedIn Post", "category": "output"}
  ],
  "edges": [
    {"source": "trend-monitor", "target": "llm-copywrite", "label": "trend data"},
    {"source": "llm-copywrite", "target": "image-gen", "label": "image prompt"},
    {"source": "llm-copywrite", "target": "twitter-post", "label": "tweet text"},
    {"source": "llm-copywrite", "target": "linkedin-post", "label": "post text"},
    {"source": "image-gen", "target": "twitter-post", "label": "image"},
    {"source": "image-gen", "target": "linkedin-post", "label": "image"}
  ]
}
```

---

### 8. `inbox-zero` — 이메일 관리 자동화

**목적:** 이메일 분류 → 중요도 판단 → 자동 답장 초안 + 요약

**스킬:** gmail-fetch, llm-classify, llm-reply-draft, llm-summarize, gmail-draft

**파이프라인:** gmail-fetch → llm-classify → llm-reply-draft(중요) / llm-summarize(일반) → gmail-draft

**활용 예시:** 읽지 않은 메일 30통 → 긴급 3통에 답장 초안 생성 → 나머지 27통 3줄 요약 → Gmail 임시저장함에 초안 등록

```json
{
  "nodes": [
    {"id": "gmail-fetch", "label": "Gmail Fetch", "category": "api"},
    {"id": "llm-classify", "label": "LLM Classify", "category": "llm"},
    {"id": "llm-reply-draft", "label": "LLM Reply Draft", "category": "llm"},
    {"id": "llm-summarize", "label": "LLM Summarize", "category": "llm"},
    {"id": "gmail-draft", "label": "Gmail Draft", "category": "output"}
  ],
  "edges": [
    {"source": "gmail-fetch", "target": "llm-classify", "label": "emails"},
    {"source": "llm-classify", "target": "llm-reply-draft", "label": "urgent emails"},
    {"source": "llm-classify", "target": "llm-summarize", "label": "normal emails"},
    {"source": "llm-reply-draft", "target": "gmail-draft", "label": "reply draft"},
    {"source": "llm-summarize", "target": "gmail-draft", "label": "summary digest"}
  ]
}
```

---

### 9. `alpha-watch` — 금융/투자 모니터링

**목적:** 포트폴리오 자산 가격 모니터링 → 이상 감지 → 알림

**스킬:** market-data, portfolio-fetch, llm-analyze, alert-rules, telegram-notify

**파이프라인:** market-data + portfolio-fetch → llm-analyze → alert-rules → telegram-notify

**활용 예시:** BTC 10% 급등 감지 → 포트폴리오 영향도 분석 → "BTC +10.2%, 포트폴리오 +3.4%, 리밸런싱 권고" → Telegram 알림

```json
{
  "nodes": [
    {"id": "market-data", "label": "Market Data", "category": "api"},
    {"id": "portfolio-fetch", "label": "Portfolio Fetch", "category": "api"},
    {"id": "llm-analyze", "label": "LLM Analyze", "category": "llm"},
    {"id": "alert-rules", "label": "Alert Rules", "category": "api"},
    {"id": "telegram-notify", "label": "Telegram Notify", "category": "output"}
  ],
  "edges": [
    {"source": "market-data", "target": "llm-analyze", "label": "price data"},
    {"source": "portfolio-fetch", "target": "llm-analyze", "label": "holdings"},
    {"source": "llm-analyze", "target": "alert-rules", "label": "analysis"},
    {"source": "alert-rules", "target": "telegram-notify", "label": "triggered alerts"}
  ]
}
```

---

### 10. `standup-sync` — 팀 협업 요약

**목적:** Slack 채널 + GitHub + Jira에서 팀 활동 수집 → 데일리 스탠드업 요약

**스킬:** slack-history, github-activity, jira-updates, llm-summarize, slack-notify

**파이프라인:** slack-history + github-activity + jira-updates → llm-summarize → slack-notify

**활용 예시:** 매일 오전 9시 → 어제 Slack 대화 + GitHub 커밋/PR + Jira 상태변경 수집 → "어제 팀 성과: PR 5건 머지, 이슈 3건 완료" 요약 → #standup 채널에 자동 포스팅

```json
{
  "nodes": [
    {"id": "slack-history", "label": "Slack History", "category": "api"},
    {"id": "github-activity", "label": "GitHub Activity", "category": "api"},
    {"id": "jira-updates", "label": "Jira Updates", "category": "api"},
    {"id": "llm-summarize", "label": "LLM Summarize", "category": "llm"},
    {"id": "slack-notify", "label": "Slack Notify", "category": "output"}
  ],
  "edges": [
    {"source": "slack-history", "target": "llm-summarize", "label": "messages"},
    {"source": "github-activity", "target": "llm-summarize", "label": "commits/PRs"},
    {"source": "jira-updates", "target": "llm-summarize", "label": "issue changes"},
    {"source": "llm-summarize", "target": "slack-notify", "label": "standup summary"}
  ]
}
```

---

## 임무 2: 전체 통합 그래프

### 허브 스킬 (재사용성 TOP)

| 스킬 | 사용 Rune 수 | 역할 |
|------|------------|------|
| **llm-summarize** | 5 (morning-brief, deep-research, inbox-zero, standup-sync + 기타) | 핵심 허브. 거의 모든 파이프라인의 중간 처리 담당 |
| **llm-classify** | 3 (support-sage, inbox-zero, + 변형) | 입력 분류/라우팅의 핵심 |
| **llm-reply-draft** | 2 (support-sage, inbox-zero) | 텍스트 응답 생성 |
| **image-gen** | 2 (blog-forge, social-pulse) | 비주얼 콘텐츠 생성 |
| **slack-notify** | 2 (code-sentinel, standup-sync) | 팀 알림 출력 |

### 클러스터 분류

| 클러스터 | 색상 | 포함 스킬 |
|---------|------|----------|
| **Input** (입력/수집) | `#3B82F6` (Blue) | csv-parse, ticket-ingest, gmail-fetch, calendar-fetch |
| **API** (외부 서비스) | `#10B981` (Green) | weather-api, web-search, web-scrape, github-diff, eslint-check, market-data, portfolio-fetch, trend-monitor, keyword-research, faq-search, alert-rules, python-analyze, slack-history, github-activity, jira-updates |
| **LLM** (AI 처리) | `#8B5CF6` (Purple) | llm-summarize, llm-classify, llm-code-review, llm-interpret, llm-reply-draft, llm-copywrite, llm-analyze, llm-outline, llm-draft |
| **Output** (결과 전달) | `#F59E0B` (Amber) | tts-speak, notion-save, slack-notify, zendesk-update, twitter-post, linkedin-post, gmail-draft, telegram-notify, pdf-export, chart-gen, markdown-export, image-gen |

### 전체 통합 그래프 JSON

```json
{
  "nodes": [
    {"id": "weather-api", "label": "Weather API", "category": "api"},
    {"id": "calendar-fetch", "label": "Calendar Fetch", "category": "input"},
    {"id": "news-headlines", "label": "News Headlines", "category": "api"},
    {"id": "web-search", "label": "Web Search", "category": "api"},
    {"id": "web-scrape", "label": "Web Scrape", "category": "api"},
    {"id": "keyword-research", "label": "Keyword Research", "category": "api"},
    {"id": "github-diff", "label": "GitHub Diff", "category": "api"},
    {"id": "eslint-check", "label": "ESLint Check", "category": "api"},
    {"id": "csv-parse", "label": "CSV Parse", "category": "input"},
    {"id": "python-analyze", "label": "Python Analyze", "category": "api"},
    {"id": "ticket-ingest", "label": "Ticket Ingest", "category": "input"},
    {"id": "faq-search", "label": "FAQ Search", "category": "api"},
    {"id": "trend-monitor", "label": "Trend Monitor", "category": "api"},
    {"id": "gmail-fetch", "label": "Gmail Fetch", "category": "input"},
    {"id": "market-data", "label": "Market Data", "category": "api"},
    {"id": "portfolio-fetch", "label": "Portfolio Fetch", "category": "api"},
    {"id": "alert-rules", "label": "Alert Rules", "category": "api"},
    {"id": "slack-history", "label": "Slack History", "category": "api"},
    {"id": "github-activity", "label": "GitHub Activity", "category": "api"},
    {"id": "jira-updates", "label": "Jira Updates", "category": "api"},
    {"id": "llm-summarize", "label": "LLM Summarize", "category": "llm"},
    {"id": "llm-classify", "label": "LLM Classify", "category": "llm"},
    {"id": "llm-code-review", "label": "LLM Code Review", "category": "llm"},
    {"id": "llm-interpret", "label": "LLM Interpret", "category": "llm"},
    {"id": "llm-reply-draft", "label": "LLM Reply Draft", "category": "llm"},
    {"id": "llm-copywrite", "label": "LLM Copywrite", "category": "llm"},
    {"id": "llm-analyze", "label": "LLM Analyze", "category": "llm"},
    {"id": "llm-outline", "label": "LLM Outline", "category": "llm"},
    {"id": "llm-draft", "label": "LLM Draft", "category": "llm"},
    {"id": "image-gen", "label": "Image Generate", "category": "output"},
    {"id": "tts-speak", "label": "TTS Speak", "category": "output"},
    {"id": "notion-save", "label": "Notion Save", "category": "output"},
    {"id": "slack-notify", "label": "Slack Notify", "category": "output"},
    {"id": "zendesk-update", "label": "Zendesk Update", "category": "output"},
    {"id": "twitter-post", "label": "Twitter Post", "category": "output"},
    {"id": "linkedin-post", "label": "LinkedIn Post", "category": "output"},
    {"id": "gmail-draft", "label": "Gmail Draft", "category": "output"},
    {"id": "telegram-notify", "label": "Telegram Notify", "category": "output"},
    {"id": "pdf-export", "label": "PDF Export", "category": "output"},
    {"id": "chart-gen", "label": "Chart Generate", "category": "output"},
    {"id": "markdown-export", "label": "Markdown Export", "category": "output"}
  ],
  "edges": [
    {"source": "weather-api", "target": "llm-summarize", "label": "weather data", "rune": "morning-brief"},
    {"source": "calendar-fetch", "target": "llm-summarize", "label": "events", "rune": "morning-brief"},
    {"source": "news-headlines", "target": "llm-summarize", "label": "headlines", "rune": "morning-brief"},
    {"source": "llm-summarize", "target": "tts-speak", "label": "briefing text", "rune": "morning-brief"},
    {"source": "web-search", "target": "web-scrape", "label": "urls", "rune": "deep-research"},
    {"source": "web-scrape", "target": "llm-summarize", "label": "raw content", "rune": "deep-research"},
    {"source": "llm-summarize", "target": "notion-save", "label": "summary", "rune": "deep-research"},
    {"source": "keyword-research", "target": "llm-outline", "label": "keywords", "rune": "blog-forge"},
    {"source": "llm-outline", "target": "llm-draft", "label": "outline", "rune": "blog-forge"},
    {"source": "llm-draft", "target": "markdown-export", "label": "draft text", "rune": "blog-forge"},
    {"source": "llm-draft", "target": "image-gen", "label": "image prompt", "rune": "blog-forge"},
    {"source": "image-gen", "target": "markdown-export", "label": "image url", "rune": "blog-forge"},
    {"source": "github-diff", "target": "llm-code-review", "label": "diff text", "rune": "code-sentinel"},
    {"source": "github-diff", "target": "eslint-check", "label": "changed files", "rune": "code-sentinel"},
    {"source": "llm-code-review", "target": "slack-notify", "label": "review comments", "rune": "code-sentinel"},
    {"source": "eslint-check", "target": "slack-notify", "label": "lint results", "rune": "code-sentinel"},
    {"source": "csv-parse", "target": "python-analyze", "label": "parsed data", "rune": "data-insight"},
    {"source": "python-analyze", "target": "chart-gen", "label": "stats", "rune": "data-insight"},
    {"source": "python-analyze", "target": "llm-interpret", "label": "stats", "rune": "data-insight"},
    {"source": "chart-gen", "target": "pdf-export", "label": "chart images", "rune": "data-insight"},
    {"source": "llm-interpret", "target": "pdf-export", "label": "insight text", "rune": "data-insight"},
    {"source": "ticket-ingest", "target": "llm-classify", "label": "ticket text", "rune": "support-sage"},
    {"source": "llm-classify", "target": "faq-search", "label": "category", "rune": "support-sage"},
    {"source": "faq-search", "target": "llm-reply-draft", "label": "matched FAQs", "rune": "support-sage"},
    {"source": "llm-reply-draft", "target": "zendesk-update", "label": "draft reply", "rune": "support-sage"},
    {"source": "trend-monitor", "target": "llm-copywrite", "label": "trend data", "rune": "social-pulse"},
    {"source": "llm-copywrite", "target": "image-gen", "label": "image prompt", "rune": "social-pulse"},
    {"source": "llm-copywrite", "target": "twitter-post", "label": "tweet text", "rune": "social-pulse"},
    {"source": "llm-copywrite", "target": "linkedin-post", "label": "post text", "rune": "social-pulse"},
    {"source": "image-gen", "target": "twitter-post", "label": "image", "rune": "social-pulse"},
    {"source": "image-gen", "target": "linkedin-post", "label": "image", "rune": "social-pulse"},
    {"source": "gmail-fetch", "target": "llm-classify", "label": "emails", "rune": "inbox-zero"},
    {"source": "llm-classify", "target": "llm-reply-draft", "label": "urgent emails", "rune": "inbox-zero"},
    {"source": "llm-classify", "target": "llm-summarize", "label": "normal emails", "rune": "inbox-zero"},
    {"source": "llm-reply-draft", "target": "gmail-draft", "label": "reply draft", "rune": "inbox-zero"},
    {"source": "llm-summarize", "target": "gmail-draft", "label": "summary digest", "rune": "inbox-zero"},
    {"source": "market-data", "target": "llm-analyze", "label": "price data", "rune": "alpha-watch"},
    {"source": "portfolio-fetch", "target": "llm-analyze", "label": "holdings", "rune": "alpha-watch"},
    {"source": "llm-analyze", "target": "alert-rules", "label": "analysis", "rune": "alpha-watch"},
    {"source": "alert-rules", "target": "telegram-notify", "label": "triggered alerts", "rune": "alpha-watch"},
    {"source": "slack-history", "target": "llm-summarize", "label": "messages", "rune": "standup-sync"},
    {"source": "github-activity", "target": "llm-summarize", "label": "commits/PRs", "rune": "standup-sync"},
    {"source": "jira-updates", "target": "llm-summarize", "label": "issue changes", "rune": "standup-sync"},
    {"source": "llm-summarize", "target": "slack-notify", "label": "standup summary", "rune": "standup-sync"}
  ]
}
```

---

## 임무 3: 기술 스택 결정

### 1. 그래프 시각화 라이브러리

| 라이브러리 | 장점 | 단점 |
|-----------|------|------|
| **React Flow** | React 네이티브, 노드/엣지 커스텀 쉬움, 인터랙션 우수, 미니맵/줌 내장 | 대규모 그래프(1000+) 성능 한계 |
| D3.js | 완전한 자유도, 모든 시각화 가능 | 러닝커브 높음, React 통합 번거로움 |
| Cytoscape.js | 그래프 이론 알고리즘 내장, 대규모 처리 | React 통합 약함, 스타일링 제한 |
| vis-network | 빠른 프로토타이핑 | 커스텀 어려움, 유지보수 불안 |

**✅ 최종 추천: React Flow**

이유:
- Next.js/React 생태계 완벽 호환
- 노드를 커스텀 React 컴포넌트로 만들 수 있어 → 스킬 카드 디자인 자유도 극대화
- 엣지 라벨, 애니메이션 엣지(데이터 흐름 표현) 기본 지원
- 41개 노드 규모에서 성능 문제 없음
- 미니맵, 줌, 패닝 내장 → 통합 그래프 탐색에 적합

### 2. 페이지 구조

```
/                    → 메인 랜딩 (히어로 + 인터랙티브 그래프 데모)
/runes               → 10개 Rune 카탈로그 (카드 그리드)
/runes/[slug]        → 개별 Rune 상세 (파이프라인 그래프 + 스킬 설명)
/graph               → 전체 스킬 관계 통합 그래프 (필터/검색 가능)
/skills              → 스킬 사전 (전체 스킬 목록 + 어떤 Rune에서 쓰이는지)  ← 추가 제안
/strategy            → 전략 문서
/about               → RuneGraph 소개 + 로드맵  ← 추가 제안
```

### 3. 디자인 방향

**색상 팔레트 (다크 RPG 테마)**

| 용도 | 색상 | HEX |
|------|------|-----|
| 배경 (딥 다크) | Obsidian | `#0A0A0F` |
| 카드/서피스 | Dark Slate | `#13131A` |
| 보더/서브텍스트 | Ash | `#2A2A35` |
| 주 텍스트 | Moonlight | `#E2E2E8` |
| 액센트 (Rune 글로우) | Arcane Purple | `#8B5CF6` |
| 액센트 보조 | Ember Gold | `#F59E0B` |
| 성공/API | Verdant | `#10B981` |
| 링크/Input | Frost Blue | `#3B82F6` |

**그래프 노드 색상 (카테고리)**

| 카테고리 | 색상 | 의미 |
|---------|------|------|
| input | `#3B82F6` (Frost Blue) | 데이터 유입 |
| api | `#10B981` (Verdant Green) | 외부 서비스 호출 |
| llm | `#8B5CF6` (Arcane Purple) | AI 처리 (핵심) |
| output | `#F59E0B` (Ember Gold) | 결과 출력 |

**UI 톤:**
- 다크 모드 온리 (라이트 모드 없음)
- 그래프 엣지에 글로우 애니메이션 (데이터 흐름 느낌)
- RPG 스킬트리 느낌의 노드 디자인 (둥근 아이콘 + 글로우 보더)
- 폰트: JetBrains Mono (코드/기술), Inter (본문)

### 4. 페이지별 컴포넌트 구조

```
app/
├── layout.tsx                    # 글로벌 레이아웃 (네비게이션 + 푸터)
├── page.tsx                      # / 랜딩
│   ├── HeroSection              # 슬로건 + CTA
│   ├── GraphDemo                # 인터랙티브 미니 그래프 (React Flow)
│   ├── RuneShowcase             # 인기 Rune 3개 프리뷰
│   └── StatsBar                 # "41 Skills · 10 Runes · ∞ Possibilities"
│
├── runes/
│   ├── page.tsx                  # /runes 카탈로그
│   │   ├── RuneGrid             # 카드 그리드 (10개)
│   │   ├── RuneCard             # 개별 카드 (이름, 목적, 스킬 수)
│   │   └── CategoryFilter       # 카테고리 필터 탭
│   │
│   └── [slug]/
│       └── page.tsx              # /runes/[slug] 상세
│           ├── RuneHeader        # 이름, 목적, 메타데이터
│           ├── PipelineGraph     # React Flow 파이프라인 시각화
│           ├── SkillList         # 사용 스킬 상세 카드
│           └── UseCaseSection    # 활용 예시
│
├── graph/
│   └── page.tsx                  # /graph 통합 그래프
│       ├── FullGraph             # React Flow 전체 그래프
│       ├── GraphControls         # 필터, 검색, 줌 컨트롤
│       ├── MiniMap               # React Flow 미니맵
│       ├── NodeDetail            # 클릭 시 노드 상세 사이드패널
│       └── ClusterLegend         # 카테고리별 색상 범례
│
├── skills/
│   └── page.tsx                  # /skills 스킬 사전
│       ├── SkillTable            # 전체 스킬 테이블
│       └── SkillDetail           # 스킬별 사용 Rune 목록
│
├── strategy/
│   └── page.tsx                  # /strategy 전략 문서
│       └── MarkdownRenderer      # MDX 렌더링
│
├── about/
│   └── page.tsx                  # /about 소개
│       ├── Mission               # 미션 스테이트먼트
│       └── Roadmap               # 로드맵 타임라인
│
└── components/
    ├── graph/
    │   ├── SkillNode.tsx         # 커스텀 React Flow 노드
    │   ├── DataEdge.tsx          # 커스텀 엣지 (글로우 애니메이션)
    │   └── GraphWrapper.tsx      # React Flow 래퍼 (공통 설정)
    ├── ui/
    │   ├── GlowCard.tsx          # 글로우 보더 카드
    │   ├── RuneBadge.tsx         # Rune 이름 배지
    │   └── CategoryTag.tsx       # 카테고리 태그 (색상)
    └── layout/
        ├── Navbar.tsx            # 상단 네비게이션
        └── Footer.tsx            # 푸터
```

**핵심 라이브러리:**
- `reactflow` — 그래프 시각화
- `framer-motion` — 페이지 전환 + UI 애니메이션
- `tailwindcss` — 스타일링
- `next-mdx-remote` — 전략 문서 MDX 렌더링
- `zustand` — 그래프 상태 관리 (필터, 선택된 노드 등)
