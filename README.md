# Agent Workflow Builder

A visual no-code platform for building AI-powered workflows. Drag, drop, and connect nodes to create RAG pipelines, automation workflows, and intelligent agents — without writing code.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0--alpha-orange.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## Overview

Agent Workflow Builder enables users to visually compose AI pipelines by connecting modular nodes on an interactive canvas. v1 focuses on **RAG (Retrieval-Augmented Generation)** patterns, with agentic features planned for future releases.

### Why This Exists

Building AI workflows typically requires:
- Writing integration code across multiple APIs
- Managing complex data flow between steps
- Handling execution order and error states

This tool abstracts that complexity into a visual interface where pipelines are composed by connecting nodes.

---

## Features

### Current (v1 - RAG Pipeline Builder)
- 🎨 **Visual Canvas** — Drag-and-drop node-based workflow editor
- 🔗 **7 Core Nodes** — Data Input, Web Scraping, Structured Output, Embeddings, Similarity Search, LLM Task, Data Output
- ✅ **Smart Validation** — Type-safe connections with cycle detection
- 💾 **Auto-Save** — Changes persist automatically
- ⚡ **Execution Engine** — Topologically-sorted execution with real-time status
- 📊 **Output Inspection** — View results per node after execution

### Roadmap
| Version | Focus | Status |
|---------|-------|--------|
| v1 | RAG Pipelines | 🚧 In Progress |
| v2 | Triggers, Conditionals, Memory | 📋 Planned |
| v3 | Agentic Features (Tool Router, ReAct) | 📋 Planned |
| v4 | Production (Evals, Guardrails, Observability) | 📋 Planned |

---

## Demo

**Example: Chat with Any Website**

```
[Data Input: "What is useEffect?"]
         ↓
[Web Scraping: react.dev/reference/useEffect]
         ↓
[Embedding Generator]
         ↓
[Similarity Search: topK=3]
         ↓
[LLM Task: "Answer based on context"]
         ↓
[Data Output: JSON]
```

<!-- Add GIF or screenshot here -->
<!-- ![Demo](./docs/demo.gif) -->

---

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted)
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/agent-workflow-builder.git
cd agent-workflow-builder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```bash
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/agent_workflow_builder"
OPENAI_API_KEY="sk-..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

---

## Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Canvas | React Flow |
| State Management | Zustand |
| Database | PostgreSQL + Prisma |
| AI | OpenAI API |
| Styling | Tailwind CSS |

### Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── workflows/          # CRUD operations
│   │   └── executions/         # Execution status
│   ├── components/
│   │   ├── canvas/             # React Flow canvas
│   │   ├── nodes/              # Node components
│   │   └── panels/             # Sidebar, config panels
│   └── page.tsx                # Main application
├── lib/
│   ├── db/                     # Prisma client
│   ├── execution/              # Execution engine
│   │   ├── engine.ts           # Orchestrator
│   │   ├── topological-sort.ts # Execution order
│   │   └── executors/          # Node executors
│   └── validation/             # Edge validation
├── store/                      # Zustand store
├── hooks/                      # Custom hooks
├── types/                      # TypeScript types
└── prisma/
    └── schema.prisma           # Database schema
```

### Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Canvas    │────▶│   Zustand   │────▶│   Prisma    │
│ (React Flow)│◀────│   Store     │◀────│ (PostgreSQL)│
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Execution  │
                    │   Engine    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Executor │ │ Executor │ │ Executor │
        │  (LLM)   │ │(Embedding)│ │ (Scrape) │
        └──────────┘ └──────────┘ └──────────┘
```

---

## Node Reference

### v1 Nodes

| Node | Purpose | Config |
|------|---------|--------|
| **Data Input** | Entry point for workflows | `inputType`, `placeholder` |
| **Web Scraping** | Fetch content from URLs | `url`, `summarize` |
| **Structured Output** | Parse/validate against schema | `schema`, `strictMode` |
| **Embedding Generator** | Convert text to vectors | `model`, `dimensions` |
| **Similarity Search** | Find relevant chunks | `topK`, `threshold` |
| **LLM Task** | Generate with context | `model`, `temperature`, `promptTemplate` |
| **Data Output** | Format final response | `format` |

---

## API Reference

### Workflows

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/workflows` | List all workflows |
| `POST` | `/api/workflows` | Create workflow |
| `GET` | `/api/workflows/:id` | Get workflow with nodes/edges |
| `PUT` | `/api/workflows/:id` | Update workflow |
| `DELETE` | `/api/workflows/:id` | Delete workflow |
| `POST` | `/api/workflows/:id/execute` | Trigger execution |

### Executions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/executions/:id` | Get execution status |

---

## Development

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Linting & Formatting

```bash
# Lint
npm run lint

# Format
npm run format
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Apply migrations (production)
npx prisma migrate deploy
```

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [React Flow](https://reactflow.dev/) — Canvas library
- [Sim Studio](https://github.com/simstudio) — Architecture inspiration
- [OpenAI](https://openai.com/) — LLM and embedding APIs

---

## Contact

**Roheena** — [LinkedIn](https://linkedin.com/in/yourprofile) · [GitHub](https://github.com/yourusername)

---

<p align="center">
  <sub>Built with focus and intention 🌟</sub>
</p>