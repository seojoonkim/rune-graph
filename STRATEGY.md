# RuneHub 전략 종합 리포트
> 작성일: 2026-02-21 | 작성: Sano 🌱 | 4대 LLM 2라운드 리서치 + 그래프 비전 통합

---

## 목차

1. [브랜드 & 포지셔닝](#1-브랜드--포지셔닝)
2. [캐치프레이즈](#2-캐치프레이즈)
3. [비즈니스 개념 — 완전 무료](#3-비즈니스-개념--완전-무료)
4. [킬러피처: 스킬 관계 그래프](#4-킬러피처-스킬-관계-그래프)
5. [기술 아키텍처](#5-기술-아키텍처)
6. [GTM & 마케팅 전략](#6-gtm--마케팅-전략)
7. [개발자 플라이휠](#7-개발자-플라이휠)
8. [경쟁 분석 & 차별점](#8-경쟁-분석--차별점)
9. [타 마켓 스킬 포팅 — 법적 검토](#9-타-마켓-스킬-포팅--법적-검토)
10. [지금 당장 TOP 5 액션](#10-지금-당장-top-5-액션)

---

## 1. 브랜드 & 포지셔닝

### 브랜드명: RuneHub

**도메인:** `runehub.com` ✅ (가용 확인 — `.com` `.ai` `.io` 전부 가용)

> `.com` 확보 가능 — 이전 모든 후보(runedex, runehub, runestore 등)는 `.ai`만 가용이었음. 이것만으로도 RuneHub는 차원이 다른 선택.

### 4대 LLM 도메인 대결 누적 결과

| 후보 | 최고점 | .com | 결론 |
|------|--------|------|------|
| **runehub** | — | ✅ | 🏆 **최종 선택** |
| runedex | 46/50 | ❌ | 차점 후보 |
| runehub | 41/50 | ❌ | 탈락 (ClawHub 구조 동일) |
| runestore | 41/50 | ❌ | 탈락 (GPT Store 아류) |
| runebase | 40/50 | ❌ | 탈락 |

**RuneHub 선택 이유:**
- `.com` 확보 가능 — 신뢰도·기억성에서 `.ai`와 차원이 다름
- Graph = 스킬 관계 시각화가 **플랫폼의 핵심 킬러피처**. 이름이 곧 제품
- Knowledge Graph, Social Graph 연상 — 테크 감각 있는 개발자에게 즉시 와닿음
- Rune들이 서로 연결되고 조합되는 세계관과 정확히 맞음

### 핵심 컨셉

```
스킬(Skill)    = 재료 (노드)
Rune          = 레시피 (스킬들을 잇는 검증된 워크플로우)
Graph         = 모든 Rune과 스킬의 관계망 (시각화)
RuneHub     = 검증된 Rune의 관계 그래프 마켓플레이스
```

**포지셔닝:**
> "ClawHub이 npm이라면, RuneHub는 Verified App Store + 스킬 관계 지도"

### 네이밍 구조

```
RuneHub   = 마켓플레이스 (발견·탐색·거래)
RuneSmith   = 제작 도구 CLI (나중에 분리 브랜드로)
Rune Smith  = 개발자 등급명 (커뮤니티 내)
```

---

## 2. 캐치프레이즈

### 🏆 메인 슬로건: **"Inscribe. Invoke. Trust."**

- 3단어, 기억하기 쉬움
- RPG 세계관(새기다 → 발동) + 비즈니스 핵심(신뢰) 동시에 담음
- 한국어: "새기다. 발동하다. 신뢰하다."

### 서브 슬로건 (맥락별 활용)

| 상황 | 슬로건 |
|------|--------|
| 랜딩 히어로 | "The Spell Book for AI Agents" |
| 그래프 강조 | "See how skills connect. Build what matters." |
| 보안 강조 | "Every Rune, Verified." |
| 설명/교육용 | "Skills are ingredients. Runes are recipes. Graph is the map." |
| 개발자 도발 | "Don't just install skills. Orchestrate them." |
| 한국 시장 | "룬을 새기다. 연결을 발견하다." |

---

## 3. 비즈니스 개념 — 완전 무료

### 철학: 오픈 생태계

RuneHub는 **완전 무료 오픈 플랫폼**이다.

```
모든 Rune — 무료
모든 스킬 — 무료
모든 그래프 탐색 — 무료
모든 퍼블리시 — 무료
API 접근 — 무료
```

**왜 무료인가?**
- 개발자 생태계는 진입장벽 0에서 폭발적으로 성장한다 (npm, pip, homebrew 모두 무료)
- Trust Graph 데이터 자체가 장기적 자산 — 사용자가 많을수록 데이터 가치 상승
- 먼저 생태계를 지배하고, 수익화는 나중에

### RuneHub가 해결하는 진짜 문제 (3계층)

1. **신뢰 부재** — AI 스킬 생태계에 검증 체계 없음. ClawHub 보안 사고가 증명
2. **조합의 어려움 (Composability Gap)** — 스킬은 많지만 엮는 건 전적으로 사용자 몫
3. **발견성 (Discoverability)** — 수만 개 중 검증된 것을 찾기 어렵고, **어떤 스킬이 어떤 스킬과 잘 맞는지 알 수 없음** ← 그래프가 이걸 해결

---

## 4. 킬러피처: 스킬 관계 그래프

### 왜 그래프인가

기존 마켓플레이스(ClawHub, GPT Store)는 스킬을 **목록**으로 보여준다.
RuneHub는 스킬을 **관계망**으로 보여준다.

```
목록 뷰: [weather-api] [tts-speak] [llm-summarize] [email-sender] ...
그래프 뷰: weather-api ──→ llm-summarize ──→ tts-speak
                                          ↘→ email-sender
```

### 그래프가 주는 가치

| 문제 | 목록 뷰 | 그래프 뷰 |
|------|---------|----------|
| "이 스킬과 잘 맞는 스킬은?" | ❌ 모름 | ✅ 엣지로 즉시 확인 |
| "내 Rune 어디서 병목이?" | ❌ 모름 | ✅ 노드 연결 수로 파악 |
| "허브 스킬(재사용성 높은 것)은?" | ❌ 모름 | ✅ 중심성 분석으로 발견 |
| "이 Rune이 저 Rune과 호환?" | ❌ 모름 | ✅ 공유 노드 시각화 |

### 그래프 노드 분류

| 카테고리 | 색상 | 예시 스킬 |
|---------|------|----------|
| `input` | 🔵 Blue | web-scraper, file-reader, rss-feed, user-input |
| `api` | 🟣 Purple | weather-api, stock-api, news-api, translate-api |
| `llm` | 🟡 Yellow | llm-summarize, llm-classify, llm-extract, llm-generate |
| `transform` | 🟠 Orange | csv-parser, json-formatter, text-cleaner, image-resize |
| `output` | 🟢 Green | email-sender, tts-speak, slack-notify, file-writer, db-insert |
| `storage` | 🔴 Red | vector-store, cache-get, db-query, notion-writer |

### Rune Score (그래프 기반 품질 지표)

```
Rune Score = 설치수×0.3 + 보안점수×0.3 + 리뷰평점×0.2 + 활성도×0.2
```

그래프에서 허브 스킬(많은 Rune이 공유하는 스킬)은 **Hub Score**도 별도 표시.

---

## 5. 기술 아키텍처

### 5.1 Rune 포맷 표준: `rune.yaml` v0.1

```yaml
rune: "0.1"
id: "morning-brief"
version: "1.0.0"
name: "아침 브리핑 Rune"
author: "smith:alice"
license: "MIT"

skills:
  - id: "weather-api"
    version: ">=2.0.0"
    permissions: ["network:api.openweathermap.org"]
  - id: "news-rss"
    version: "^1.0.0"
    permissions: ["network:feeds.bbcnews.com"]
  - id: "llm-summarize"
    version: "*"
    permissions: ["model:invoke"]
  - id: "tts-speak"
    version: "^1.0.0"
    permissions: ["audio:output"]

pipeline:
  - parallel:
      - step: get_weather
        skill: "weather-api"
        input: { location: "{{ input.location }}" }
        output: weather
      - step: get_news
        skill: "news-rss"
        input: { feed: "{{ input.news_feed }}" }
        output: news

  - step: summarize
    skill: "llm-summarize"
    input:
      text: "날씨: {{ weather.summary }}\n뉴스: {{ news.headlines }}"
    output: brief

  - step: speak
    skill: "tts-speak"
    input: { text: "{{ brief.text }}" }
    on_error: skip

returns:
  summary: "{{ brief.text }}"
```

### 5.2 보안 파이프라인 (Trust Score)

```
제출 → 정적 분석(10초) → 샌드박스(60초) → Trust Score → 퍼블리시
```

| 항목 | 가중치 |
|------|--------|
| 권한 최소성 | 25% |
| 샌드박스 통과 | 20% |
| 정적 분석 클린 | 15% |
| Smith 평판 | 15% |
| 의존 스킬 신뢰도 | 10% |
| 테스트 커버리지 | 10% |
| 코드 투명성 | 5% |

### 5.3 기술 스택

| 레이어 | 선택 |
|--------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 그래프 시각화 | React Flow (노드 기반 UI) + D3-force (레이아웃) |
| 스타일 | Tailwind CSS + 다크 테마 |
| 파서 | js-yaml + zod (스키마 검증) |
| 샌드박스 | Docker + seccomp |
| DB | SQLite (MVP) → PostgreSQL |
| 호스팅 | Vercel (프론트) + Railway (백엔드) |

### 5.4 기술 MVP — 4주 스코프

| 주차 | 산출물 |
|------|--------|
| W1 | `rune.yaml` 파서 + React Flow 그래프 컴포넌트 |
| W2 | Rune Engine 코어 + `rune run` CLI |
| W3 | 보안 Stage 1+2 + Trust Score |
| W4 | `rune publish` + 웹 카탈로그 + 10개 데모 Rune |

---

## 6. GTM & 마케팅 전략

### 런치 시퀀스 (핵심)

| 기간 | 액션 | KPI |
|------|------|-----|
| W-8~6 | 랜딩 + 웨이트리스트, Founding Smiths 후보 100명 | 500명 |
| W-5~4 | 30명 DM + 프라이빗 베타, Rune 10개 라이브 | Rune 10개 |
| W-3~2 | 블로그 3개, PH 헌터 섭외 | 뷰 5k |
| D-DAY | 화요일 PST 00:01 런칭 | PH #1 목표 |
| W+3~4 | Rune Jam 해커톤 48h | 참가 50팀 |

### 엘리베이터 피치

> "npm은 재료를 파는 곳이에요. RuneHub는 레시피를 공유하고, 모든 재료의 관계를 지도로 보여주는 곳이에요."

### Discord 구조

```
📌 WELCOME      → #welcome / #introductions / #announcements
🔥 GENERAL      → #general / #showcase / #ideas
🛠️ BUILD         → #help / #tutorials / #bug-reports
⚗️ SMITHING     → #smiths-lounge / #peer-review / #collab (Smith+)
🏛️ FOUNDING    → #founders-only / #roadmap-input (Founding 30명)
🤖 BOTS         → #rune-feed / #mp-leaderboard / #bot-commands
```

### 콘텐츠 마케팅 블로그 10개

| # | 제목 |
|---|------|
| 1 | 왜 AI 스킬에 관계 그래프가 필요한가 |
| 2 | Rune vs Raw Skill: 오케스트레이션이 다르다 |
| 3 | ClawHub 보안 사고 이후 우리가 배운 것 |
| 4 | rune.yaml 완전 가이드 |
| 5 | Founding Smith 이야기: 첫 30명 |
| 6 | Trust Score 작동 원리 |
| 7 | 그래프로 보는 스킬 생태계 |
| 8 | 이 Rune 하나로 아침 루틴 자동화 |
| 9 | RuneHub vs GPT Store vs ClawHub |
| 10 | Mana Points 시스템 완전 해부 |

---

## 7. 개발자 플라이휠

### Mana Points (MP) 시스템

| 행동 | MP |
|------|----|
| 스킬 보안 리뷰 통과 | 100 |
| Rune 퍼블리시 (3개+ 스킬) | 300 |
| 코드 리뷰 작성 | 50 |
| 내 Rune 100회 설치 | 200 |
| 버그 리포트 (확인됨) | 150 |
| 신규 개발자 초대 | 75 |

**모든 사용처도 무료 생태계 안에서 순환:** 커스텀 뱃지, 리뷰 우선 큐, 등급 업그레이드 등 — 현금 전환 없음.

### Rune Smith 등급

| 등급 | 조건 | 혜택 |
|------|------|------|
| Apprentice | 가입 + 첫 설치 | 기본 |
| Smith | Rune 1개 퍼블리시 | #smiths-lounge 접근 |
| Artisan | Rune 5개 + MP 2k | 리뷰 우선 큐 |
| Archmage | Rune 20개 + MP 5k | 로드맵 투표권 |
| Rune Lord | 커뮤니티 투표 + MP 20k | Hall of Fame |

### Founding Smiths

- **30명 선발:** 기술(40%) + 커뮤니티(30%) + 비전(20%) + 다양성(10%)
- **혜택:** 평생 최고 등급 + "Founding Smith" 영구 뱃지
- **첫 100개 Rune:** 70개 내부 제작 + 30개 Founding Smiths

---

## 8. 경쟁 분석 & 차별점

| 차원 | ClawHub | GPT Store | **RuneHub** |
|------|---------|-----------|---------------|
| 단위 | 단일 스킬 | 단일 GPT | **Rune (오케스트레이션)** |
| 보안 | ❌ | △ | ✅ **4단계 자동 감사** |
| 스킬 관계 시각화 | ❌ | ❌ | ✅ **그래프 네이티브** |
| 플랫폼 종속 | OpenClaw | OpenAI | **불가지론적** |
| 비용 | 무료 | 무료 | ✅ **완전 무료** |
| 개발자 보상 | ❌ | 미미 | ✅ **Mana Points** |

### 우리만 할 수 있는 것 3가지

1. **Verified Orchestration** — 검증된 워크플로우를 거래 단위로 만든 최초 플랫폼
2. **Skill Relationship Graph** — 스킬 간 관계를 그래프로 탐색하는 최초 마켓플레이스
3. **Cross-Platform Rune** — OpenClaw, LangChain, CrewAI 어디서든 실행

### 복제 불가능한 해자

1. **Trust Graph** — 실행 데이터 기반 신뢰 네트워크 (신규 진입자는 0에서 시작 불가)
2. **스킬 관계 코퍼스** — Rune 100개 = 수천 조합, 조합 검증 데이터는 RuneHub만 보유
3. **Cross-Platform 호환성 데이터** — 어댑터는 오픈소스라도 테스트 데이터는 우리만

---

## 9. 타 마켓 스킬 포팅 — 법적 검토

| 라이선스 | 가능? | 조건 |
|---------|-------|------|
| MIT / Apache 2.0 | ✅ | 저작권 고지 필수 |
| GPL v3 | ⚠️ | 조건부 (오픈소스 유지 시) |
| 무라이선스 | ❌ | 절대 금지 |
| BSL / SSPL | ❌ | 경쟁 서비스 금지 |

**권장: "Verified Import" 시스템**
저작자에게 동의 이메일 → 동의 후에만 등록 + "Official" 뱃지

---

## 10. 지금 당장 TOP 5 액션

| # | 액션 | 소요 |
|---|------|------|
| **1** | **`runehub.com` 도메인 확보** | 30분 🔴 긴급 |
| **2** | **GitHub `rune-hub` 레포 생성 + Next.js 초기화** | 1시간 |
| **3** | **10개 데모 Rune 스펙 작성 + 그래프 JSON** | 1일 |
| **4** | **React Flow 기반 그래프 뷰어 프로토타입** | 3일 |
| **5** | **Vercel 배포 + runehub.com 연결** | 1시간 |

---

*RuneHub — Inscribe. Invoke. Trust. 🔮*
*See how skills connect. Build what matters.*
