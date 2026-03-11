# Product Requirements Document
## Travel & Budget Planner AI Agent

**Project:** Multi-Tool AI Agent  
**Course:** BYU MISM — Dev Units 7 & 8  
**Author:** Ava Williams  
**Last Updated:** March 2026

---

## 1. Problem Statement

Planning travel is expensive, fragmented, and time-consuming. Travelers typically juggle multiple browser tabs — comparing flight prices, reading destination guides, estimating total trip costs, and converting currencies — with no unified intelligence to reason across all of it.

This agent eliminates that fragmentation. It acts as a single conversational interface that can **search the web for real-time travel data**, **perform trip budget calculations**, and **answer questions grounded in curated travel documents** — all while maintaining context across a multi-turn conversation.

---

## 2. Agent Overview

**Name:** Travel & Budget Planner Agent  
**Runtime:** LangChain.js (ReAct pattern)  
**Interface:** Web UI (chat page)  
**Memory:** Conversation buffer — follow-up questions retain full context

The agent reasons over which tool to invoke based on the user's intent, uses the tool, observes the result, and responds — following the ReAct (Reason + Act) loop.

---

## 3. Tools

### 3.1 Calculator Tool
- **Purpose:** Evaluate math expressions for trip budgeting (total costs, per-day spend, currency conversion approximations, group splits).
- **Input:** A natural language math expression or formula string.
- **Output:** Computed numeric result with units.
- **Example prompts:**
  - *"If flights cost $420 and hotel is $95/night for 7 nights, what's my total trip cost?"*
  - *"Split a $1,340 trip budget among 4 people."*

### 3.2 Tavily Web Search Tool
- **Purpose:** Fetch real-time, grounded travel information from the web.
- **Input:** A search query string.
- **Output:** Summarized search results with source URLs.
- **Example prompts:**
  - *"What are the visa requirements for US citizens visiting Japan?"*
  - *"Find budget-friendly hotels in Lisbon under $80/night."*
  - *"What is the best time of year to visit Iceland?"*

### 3.3 RAG (Retrieval-Augmented Generation) Tool
- **Purpose:** Answer questions grounded in a curated set of internal travel documents (destination guides, packing lists, travel tips, budgeting frameworks).
- **Input:** A semantic query.
- **Output:** Answer with **source attribution** (document name and relevant passage).
- **Documents (≥5):**
  1. Budget Travel Framework — how to structure a travel budget
  2. Destination Guide: Southeast Asia
  3. Destination Guide: Europe on a Budget
  4. Packing & Logistics Checklist
  5. Travel Safety & Insurance Guide
  6. Points & Miles Strategy for Flights
- **Example prompts:**
  - *"What should I budget for food per day in Thailand?"*
  - *"What documents do I need before any international trip?"*

---

## 4. Conversation Memory

The agent maintains a rolling conversation buffer so users can ask follow-up questions naturally:

> *User: "How much would a 10-day trip to Japan cost?"*  
> *User: "Now split that among 3 people."*  
> *User: "What about if we go in the off-season instead?"*

All three turns share context without the user repeating themselves.

---

## 5. Web UI

- Single-page chat interface
- Message history displayed in a scrollable thread
- Input field + send button
- Streaming responses (stretch goal)
- No authentication required for local development

---

## 6. Success Criteria

| Criterion | Requirement |
|-----------|-------------|
| Calculator tool | Correctly evaluates budget math expressions |
| Tavily search tool | Returns grounded, real-time travel information |
| RAG tool | Returns answers with source attribution from ≥5 documents |
| Memory | Follow-up questions work across ≥3 turns |
| Web UI | Functional chat page in browser |
| Repo hygiene | Structured logging, incremental commits, no secrets |

---

## 7. Out of Scope

- User authentication / accounts
- Booking integrations (flights, hotels)
- Mobile-native app
- Multi-user / production deployment
