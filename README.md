# Travel & Budget Planner AI Agent

A multi-tool conversational AI agent that helps users plan trips and estimate travel budgets. Built with LangChain.js using the ReAct pattern.

---

## What It Does

Ask it anything travel-related — it reasons across three tools to give you a grounded answer:

- **Calculator** — estimates trip costs, splits budgets, converts currencies
- **Web Search** — fetches real-time travel info via Tavily (visa requirements, hotel prices, best travel seasons)
- **RAG** — answers questions from a curated library of travel guides with source attribution

Conversations are stateful — follow-up questions work naturally without repeating context.

---

## Tools

| Tool | Description |
|------|-------------|
| Calculator | Evaluates math expressions for trip budgeting |
| Tavily Search | Searches the web for real-time travel information |
| RAG | Vector search over curated travel documents with source attribution |

---

## Setup

### Prerequisites
- Node.js 18+
- Anthropic API key
- Tavily API key

### Install

```bash
git clone https://github.com/YOUR_USERNAME/avasAIagent.git
cd avasAIagent
npm install
```

### Configure environment

Create a `.env` file in the project root:

```env
ANTHROPIC_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
```

### Run

```bash
# Terminal mode
node index.js

# Web UI
npm start
# Open http://localhost:3000
```

---

## Project Docs

See `aiDocs/` for full project documentation:

- [`aiDocs/PRD.md`](aiDocs/PRD.md) — agent purpose, tools, and problem statement
- [`aiDocs/roadmap.md`](aiDocs/roadmap.md) — phased build plan with progress tracking
- [`aiDocs/context.md`](aiDocs/context.md) — project orientation for AI tools
- [`aiDocs/rubric.md`](aiDocs/rubric.md) — grading requirements

---

## Course

BYU MISM — Multi-Tool AI Agent (Dev Units 7 & 8)
