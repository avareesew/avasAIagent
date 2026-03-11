# Project Context

## Orientation for AI Tools & Collaborators

> This file exists to orient AI assistants (Cursor, Copilot, ChatGPT, etc.) to the structure, conventions, and goals of this project. Read this first before suggesting code, edits, or architecture changes.

---

## What This Project Is

A **Travel & Budget Planner AI Agent** built with **LangChain.js** for a BYU MISM course assignment. It is a multi-tool ReAct chatbot that helps users plan trips and estimate travel budgets through a conversational web interface.

This is an **individual academic project** with a hard rubric. Code quality, repo hygiene, and incremental git history are graded as much as functionality.

---

## Tech Stack


| Layer           | Technology                                                                |
| --------------- | ------------------------------------------------------------------------- |
| Agent framework | LangChain.js                                                              |
| LLM             | Anthropic Claude Haiku 4.5 (`claude-haiku-4-5-20251001`, via `@langchain/anthropic`) |
| Web search      | Tavily (`@langchain/community`)                                           |
| Math evaluation | mathjs                                                                    |
| Vector store    | MemoryVectorStore (or HNSWLib for persistence)                            |
| Embeddings      | HuggingFace Transformers (local, no API key — via `@langchain/community`) |
| Web server      | Express.js                                                                |
| Frontend        | Vanilla HTML/CSS/JS (single page)                                         |
| Runtime         | Node.js                                                                   |
| Language        | JavaScript (ESM or CommonJS — confirm in package.json)                    |


---

## Project Structure

```
avasAIagent/
├── aiDocs/
│   ├── PRD.md              # What the agent does, tools, problem statement
│   ├── roadmap.md          # Phased build plan with progress tracking
│   ├── context.md          # This file — AI orientation
│   └── rubric.md           # Grading requirements (source of truth)
├── docs/                   # RAG source documents (plain text or Markdown)
│   ├── budget-framework.md
│   ├── southeast-asia-guide.md
│   ├── europe-budget-guide.md
│   ├── packing-checklist.md
│   └── travel-safety-insurance.md
├── public/
│   └── index.html          # Chat web UI
├── src/
│   ├── agent.js            # Agent executor, memory, tool wiring
│   ├── tools/
│   │   ├── calculator.js   # Math expression tool
│   │   ├── search.js       # Tavily web search tool
│   │   └── rag.js          # RAG retriever tool
│   ├── rag/
│   │   ├── loader.js       # Document loader + splitter
│   │   └── vectorstore.js  # Embedding + vector store init
│   └── logger.js           # Structured logger (tool name, args, result)
├── server.js               # Express server + /chat endpoint
├── index.js                # Entry point (terminal mode)
├── .env                    # API keys — NEVER commit this
├── .gitignore
├── package.json
└── README.md
```

---

## Agent Architecture

The agent uses the **ReAct pattern** (Reason + Act):

1. User sends a message
2. Agent reasons about which tool (if any) to use
3. Agent calls the tool with arguments
4. Tool returns a result (Observation)
5. Agent incorporates result into final answer
6. Memory stores the turn for follow-up context

```
User Input
    ↓
[Conversation Memory] ← injects history
    ↓
[LLM — Reasoning]
    ↓
Tool Decision
    ├── Calculator  →  math expression  →  numeric result
    ├── Tavily      →  search query     →  web results + URLs
    └── RAG         →  semantic query   →  passage + source doc
    ↓
[LLM — Final Answer]
    ↓
User Response
```

---

## Coding Conventions

- **Structured logging is required.** Every tool invocation must log: tool name, input arguments, and raw result. Use the logger in `src/logger.js`.
- **No secrets in code.** All API keys go in `.env` and are accessed via `process.env`. Never hardcode keys.
- **Incremental commits.** Each phase gets its own commit(s). Do not bundle unrelated changes.
- **Source attribution for RAG.** Every RAG tool response must include the source document name. This is a rubric requirement.
- **Error handling.** Tools should catch errors and return a descriptive string rather than crashing the agent.

---

## Key Constraints (Rubric-Driven)

- Must use **LangChain.js** (not Python LangChain, not raw Anthropic SDK)
- Must have **3 tools minimum**: Calculator, Tavily Search, RAG
- RAG must use **≥5 real documents** with source attribution
- Must have **conversation memory** (multi-turn follow-ups work)
- Must have a **web UI** (terminal fallback acceptable but not the target)
- Repo must have **5+ meaningful commits** showing progression
- Repo must have a `context.md`, PRD, roadmap, `.gitignore`, structured logging, and `README.md`

---

## What NOT to Change Without Reading the Rubric

> Full grading requirements are in `aiDocs/rubric.md` — read it before making architectural decisions.

- The tool names and their behavior specs (see `aiDocs/PRD.md`)
- The logging format (must show tool call + args + result)
- The memory implementation (must support multi-turn context)
- The document count for RAG (must be ≥5)

---

## Environment Variables Required

```env
ANTHROPIC_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
```

---

## Current Phase

> Update this line as work progresses.

**Current Phase:** Phase 1 — Project Setup & Infrastructure  
See `roadmap.md` for full phase breakdown and task checklist.