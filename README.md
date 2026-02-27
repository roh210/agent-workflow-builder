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
- ✅ **Smart Validation** — Type-safe connections with cycle detection and compatibility matrix
- 💾 **Auto-Save** — Changes persist automatically with debounced PUT requests
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

## Building a Valid Workflow

Workflows must follow the **node compatibility matrix** — each node only accepts specific inputs based on what it produces. Invalid connections are rejected with an error toast.

### Node Data Flow

| Node | Receives | Produces | Can Connect To |
|------|----------|----------|----------------|
| **Data Input** | Nothing — entry point | Raw text or JSON | Web Scraping, LLM Task, Embedding Generator, Structured Output |
| **Web Scraping** | URL (text) | Scraped + summarised text | Structured Output, LLM Task, Embedding Generator, Data Output |
| **Structured Output** | Unstructured text | Structured JSON object | Embedding Generator, LLM Task, Data Output |
| **Embedding Generator** | Text | Vector (float array) | Similarity Search only |
| **Similarity Search** | Query vector | Similar text chunks + scores | LLM Task, Data Output |
| **LLM Task** | Text context | Text response | Data Output, Structured Output, Embedding Generator, LLM Task |
| **Data Output** | Anything | Nothing — terminal node | Nothing |

### Rules
- ✅ Every workflow needs at least one **Data Input** node
- ✅ Every workflow needs at least one **Data Output** node
- ❌ Circular connections are not allowed (cycle detection enforced)
- ❌ A node cannot connect to itself
- ❌ Duplicate edges between the same two nodes are not allowed
- ℹ️ **LLM Task → LLM Task** is valid for prompt chaining pipelines

### Example Workflows

**Simple LLM Pipeline:**
```
Data Input → LLM Task → Data Output
```

**RAG Pipeline (Chat with any website):**
```
Data Input → Embedding Generator → Similarity Search → LLM Task → Data Output
                                         ↑
                        Web Scraping ────┘
```

**Structured Data Extraction:**
```
Data Input → Web Scraping → Structured Output → Data Output
```

**Prompt Chaining:**
```
Data Input → LLM Task (summarise) → LLM Task (extract insights) → Data Output
```

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

### Execution Order

Nodes execute in **topological order** determined by Kahn's algorithm (BFS):

```
User clicks Run
      ↓
topologicalSort(nodes, edges)
      ↓
[dataInput, webScraping, embedding, similarity, llmTask, dataOutput]
      ↓
for each node in order:
  output = executeNode(node, previousOutput)
```

This guarantees every node receives fully computed input from its dependencies before executing.

---

## Node Reference

### v1 Nodes

| Node | Purpose | Key Config |
|------|---------|------------|
| **Data Input** | Entry point for workflows | `inputType`, `placeholder`, `defaultValue` |
| **Web Scraping** | Fetch content from URLs | `url`, `shouldSummarize`, `summarizationModel` |
| **Structured Output** | Extract JSON from text via LLM | `schemaDefinition`, `exampleOutput`, `model` |
| **Embedding Generator** | Convert text to vectors | `model`, `dimensions` |
| **Similarity Search** | Find similar chunks in vector store | `topK`, `similarityThreshold` |
| **LLM Task** | General LLM processing | `model`, `temperature`, `promptTemplate` |
| **Data Output** | Format and display final result | `outputFormat`, `prettyPrint` |

---

## API Reference

### Workflows

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/workflows` | List all workflows (paginated) |
| `POST` | `/api/workflows` | Create workflow |
| `GET` | `/api/workflows/:id` | Get workflow with nodes and edges |
| `PUT` | `/api/workflows/:id` | Update workflow (nodes + edges) |
| `DELETE` | `/api/workflows/:id` | Delete workflow |
| `POST` | `/api/workflows/:id/execute` | Trigger execution |

### Executions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/executions/:id` | Get execution status and progress |

---

## Development

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Test coverage
npm run test:coverage
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

### Database Migrations

```bash
npx prisma migrate dev --name your_migration_name
npx prisma migrate deploy   # production
```

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- [React Flow](https://reactflow.dev/) — Canvas library
- [Sim Studio](https://github.com/simstudioai/sim) — Architecture inspiration
- [OpenAI](https://openai.com/) — LLM and embedding APIs

---

## Contact

**Roheena** — [LinkedIn](https://linkedin.com/in/yourprofile) · [GitHub](https://github.com/yourusername)

---

<p align="center">
  <sub>Built with focus and intention 🌟</sub>
</p>