# Project Roadmap

## Travel & Budget Planner AI Agent

**Course:** BYU MISM — Dev Units 7 & 8  
**Author:** Ava Williams

---

## Phases Overview


| Phase | Name                           | Status         |
| ----- | ------------------------------ | -------------- |
| 1     | Project Setup & Infrastructure | ✅ Done        |
| 2     | Tool Implementation            | ✅ Done        |
| 3     | Agent Loop & Memory            | ✅ Done        |
| 4     | RAG Pipeline                   | ✅ Done        |
| 5     | Web UI                         | 🔲 Not Started |
| 6     | Polish & Submission            | 🔲 Not Started |


> Update status to ✅ Done / 🔄 In Progress / 🔲 Not Started as work progresses.

---

## Phase 1 — Project Setup & Infrastructure

**Goal:** Working skeleton with all dependencies installed and repo hygiene in place.

### Tasks

- Initialize Node.js project (`npm init`)
- Install core dependencies: `langchain`, `@langchain/anthropic`, `@langchain/community`, `dotenv`
- Create `.env.example` with API key placeholders (Anthropic, Tavily)
- Create `.gitignore` (node_modules, .env, vector store files)
- Set up structured logger (`src/logger.js` — logs tool name, args, result via winston)
- Create `aiDocs/` folder with PRD, roadmap, context, rubric
- Create `README.md` skeleton
- **Commit:** `chore: project setup and infrastructure`

**Exit Criteria:** `node index.js` runs without errors; logger outputs to console.

---

## Phase 2 — Tool Implementation

**Goal:** All three tools working in isolation, independently testable.

### Tasks

- **Calculator tool** — wrap a math expression evaluator (e.g. `mathjs`)
  - Input: expression string
  - Output: numeric result
  - Test: `"420 + 95 * 7"` → `1085`
- **Tavily Search tool** — integrate `TavilySearchResults` from LangChain community
  - Configure API key via `.env`
  - Test: search for "budget travel tips Europe"
- **RAG tool** (stub) — placeholder that returns a hardcoded string (full implementation in Phase 4)
- Write isolated test scripts for each tool
- Log all tool calls: name, input arguments, raw result
- **Commit:** `feat: implement calculator and tavily search tools`

**Exit Criteria:** Each tool can be called standalone and returns expected output with logs.

---

## Phase 3 — Agent Loop & Memory

**Goal:** ReAct agent running in terminal with all three tools and multi-turn memory.

### Tasks

- Initialize `ChatAnthropic` model (claude-haiku-3-5)
- Create LangChain ReAct agent with all three tools
- Add `ConversationBufferMemory` for multi-turn context
- Wire agent executor with memory
- Test multi-turn conversation:
  1. Ask about a trip cost
  2. Follow-up: split it among travelers
  3. Follow-up: compare to a different destination
- Verify structured logs show Thought → Action → Observation → Answer cycle
- **Commit:** `feat: agent loop with ReAct pattern and conversation memory`

**Exit Criteria:** Terminal agent handles ≥3-turn conversations correctly.

---

## Phase 4 — RAG Pipeline

**Goal:** Full RAG tool with ≥5 documents and source attribution in every answer.

### Tasks

- Write or source ≥5 travel documents (Markdown or plain text):
  - `docs/budget-framework.md`
  - `docs/southeast-asia-guide.md`
  - `docs/europe-budget-guide.md`
  - `docs/packing-checklist.md`
  - `docs/travel-safety-insurance.md`
  - `docs/points-miles-strategy.md` *(optional 6th)*
- Set up vector store (e.g. `MemoryVectorStore` or `HNSWLib` for persistence)
- Create document loader + text splitter pipeline
- Embed documents with `HuggingFaceTransformersEmbeddings` (local, no API key required)
- Build retriever and wrap as LangChain tool
- Ensure every RAG response includes source document name
- Replace RAG stub from Phase 2 with full implementation
- **Commit:** `feat: RAG pipeline with source attribution`

**Exit Criteria:** Agent cites source document when answering questions from the knowledge base.

---

## Phase 5 — Web UI

**Goal:** Functional browser-based chat interface connected to the agent.

### Tasks

- Set up Express.js server (`express`, `cors`)
- Create `/chat` POST endpoint that streams or returns agent response
- Build `public/index.html` — single-page chat UI
  - Message thread (user + agent bubbles)
  - Input field + send button
  - Basic CSS styling
- Connect frontend to backend via `fetch`
- Test all three tools through the browser UI
- **Commit:** `feat: web UI chat interface`
- *(Stretch)* Add streaming with `TransformStream` / SSE — **Commit:** `feat: streaming responses in UI`

**Exit Criteria:** All tools accessible and usable through the browser chat page.

---

## Phase 6 — Polish & Submission

**Goal:** Clean repo, complete README, demo video recorded.

### Tasks

- Complete `README.md`:
  - What the agent does
  - Setup instructions (`npm install`, env vars, `npm start`)
  - How to run locally
  - Tool descriptions
- Final audit: no secrets committed, `.gitignore` covers all sensitive files
- Verify ≥5 meaningful commits with clear messages
- Review structured logs in production run
- Record 2-minute unedited screen capture demo showing:
  - Web UI loaded in browser
  - Calculator tool in action
  - Tavily search in action
  - RAG tool with source attribution
  - Multi-turn follow-up question
- Submit GitHub repo link + demo video
- **Commit:** `docs: finalize README and polish`

**Exit Criteria:** Rubric checklist fully satisfied; repo is submission-ready.

---

## Stretch Goals Tracker


| Goal                                       | Status         |
| ------------------------------------------ | -------------- |
| Streaming in web UI                        | 🔲 Not Started |
| 4th custom tool                            | 🔲 Not Started |
| Persistent vector store (survives restart) | 🔲 Not Started |
| Agent proposal (~1 page)                   | 🔲 Not Started |


