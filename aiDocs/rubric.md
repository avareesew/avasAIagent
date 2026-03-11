# Grading Rubric
## Multi-Tool AI Agent — Individual Project

**Course:** BYU MISM — Dev Units 7 & 8  
**Assignment:** Build a multi-tool chatbot agent using LangChain.js demonstrating the ReAct pattern.

> This is the source-of-truth grading checklist. Review before every commit and before final submission.

---

## What You're Building

A chatbot agent with:

| Feature | Requirement | Status |
|---------|-------------|--------|
| Calculator tool | Evaluates math expressions | 🔲 |
| Web search tool | Searches the web using Tavily | 🔲 |
| RAG tool | Vector search over ≥5 real documents, with source attribution | 🔲 |
| Conversation memory | Multi-turn context (follow-up questions work) | 🔲 |
| Web UI | A chat web page (terminal fallback acceptable but not the target) | 🔲 |
| Streaming | Recommended but not required | 🔲 |

---

## Repo Requirements

> We review your repo, not just whether the chatbot works.

| Requirement | Details | Status |
|-------------|---------|--------|
| `context.md` | Orients AI tools to your project | 🔲 |
| PRD | What the agent does, its tools, the problem it solves | 🔲 |
| Roadmap | Phased plan with progress tracked | 🔲 |
| `.gitignore` | No secrets, no node_modules, etc. | 🔲 |
| Structured logging | Logging that shows tool calls, arguments, and results | 🔲 |
| Incremental git history | 5+ meaningful commits showing progression (setup → tools → agent → UI → RAG → polish), not one dump | 🔲 |
| `README.md` | What it does, how to run it | 🔲 |

---

## Deliverables Checklist

| Deliverable | Status |
|-------------|--------|
| GitHub repo with proper infrastructure and incremental history | 🔲 |
| Working agent — three tools + memory + web UI | 🔲 |
| `README.md` | 🔲 |
| 2-minute demo video — unedited screen capture showing web UI with a couple of tools/features | 🔲 |

**Submit:** GitHub repo link + demo video

---

## Demo Video Requirements

- Unedited screen capture
- Shows the **web UI** in action (not just terminal)
- Demonstrates at least **2 tools/features**
- Does not need to be polished
- Duration: ~2 minutes

---

## Stretch Goals (Extra Credit)

| Goal | Status |
|------|--------|
| Streaming in the web UI | 🔲 |
| 4th custom tool | 🔲 |
| Persistent vector store — documents survive restarts | 🔲 |
| Agent proposal — ~1 page identifying a feature in one of your projects that would benefit from an agent pattern (or a thorough explanation of why it wouldn't) | 🔲 |

---

## Commit Message Convention (for incremental history)

Use these as a guide to ensure your commits show clear progression:

```
chore: project setup and infrastructure
feat: implement calculator and tavily search tools
feat: agent loop with ReAct pattern and conversation memory
feat: RAG pipeline with source attribution
feat: web UI chat interface
docs: finalize README and polish
```

Each commit should represent a meaningful, isolated phase of work — not a bulk dump at the end.

---

## Pre-Submission Audit

Run through this checklist before submitting:

- [ ] All 3 tools work through the web UI
- [ ] Follow-up questions maintain context across ≥3 turns
- [ ] RAG responses include source document name in every answer
- [ ] Structured logs show tool name, input args, and result for every tool call
- [ ] `.env` is NOT committed (check `git log` to be sure)
- [ ] `node_modules/` is NOT committed
- [ ] ≥5 commits with meaningful messages showing progression
- [ ] `README.md` includes setup instructions and describes all tools
- [ ] `context.md`, PRD, and roadmap are in the repo
- [ ] Demo video is 2 minutes, shows web UI, demonstrates ≥2 tools
- [ ] GitHub repo link is accessible (not private, or grader has access)
