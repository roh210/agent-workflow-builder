# Learning Map: Agent Workflow Builder

This document maps project features to learning resources. Use this when implementing features to deepen understanding.

---

## Quick Reference

| When Working On | Study This |
|-----------------|------------|
| Execution order | LeetCode 210, DDIA Ch.2 |
| State management | Sim Studio `stores/` |
| Node components | Sim Studio `blocks/` |
| LLM calls | AI Engineering Ch.5 |
| Embeddings | AI Engineering Ch.4 |
| Data flow | Composing Software Ch.8 |
| Graph validation | DDIA Ch.2 |

---

## Phase 1: Canvas & State

### What You're Building
- React Flow canvas
- Zustand store for nodes/edges
- Drag-and-drop node creation

### Resources to Study

**React Flow Basics**
- Docs: https://reactflow.dev/docs/quickstart/
- Focus: Custom nodes, handles, callbacks

**Zustand Patterns**
- Sim Studio: `apps/sim/stores/workflows/store.ts`
- Focus: How they structure state and actions

**Concepts**
- Pub/Sub pattern (like LC 2694 Event Emitter)
- Immutable state updates

---

## Phase 2: Node Components

### What You're Building
- 7 custom node types
- Base node component
- Node type registry

### Resources to Study

**Sim Studio Reference**
- `apps/sim/blocks/` - How they define block configs
- `apps/sim/components/ui/` - Reusable UI patterns

**React Patterns**
- `memo()` for performance
- Discriminated unions for type safety

---

## Phase 3: Configuration Panel

### What You're Building
- Dynamic form based on node type
- Config updates to store
- Form validation

### Resources to Study

**Form Patterns**
- Controlled components in React
- Zod for validation schemas

**Type Safety**
- TypeScript discriminated unions
- Your `types/nodes.ts` config interfaces

---

## Phase 4: Workflow API

### What You're Building
- CRUD endpoints (Create, Read, Update, Delete)
- Prisma database queries
- Request validation

### Resources to Study

**Next.js App Router**
- Docs: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Focus: Route handlers, request/response

**Prisma**
- Docs: https://www.prisma.io/docs/concepts/components/prisma-client/crud
- Focus: Create, findMany, update, delete

**DDIA Connection**
- Ch.2: Data models and query languages
- How your relational model (Workflow → Nodes → Edges) maps to queries

---

## Phase 5: Edge Validation

### What You're Building
- Prevent invalid connections
- Cycle detection
- Single-input constraint (MVP)

### Resources to Study

**LeetCode Problems**
- LC 207: Course Schedule (cycle detection)
- LC 210: Course Schedule II (topological sort)
- Both use the same graph concepts you need

**Algorithm Concepts**
- In-degree counting
- BFS/DFS traversal
- Adjacency list representation

**DDIA Connection**
- Ch.2: Graph-like data models
- How edges represent dependencies

---

## Phase 6: Execution Engine

### What You're Building
- Topological sort for execution order
- Sequential node execution
- Passing data between nodes

### Resources to Study

**Primary: LeetCode 210 (Course Schedule II)**
```
Why this matters:
- Your nodes = courses
- Your edges = prerequisites
- Execution order = course order that satisfies all prerequisites
```

**Algorithm: Kahn's Algorithm (BFS approach)**
```
1. Count in-degrees (how many edges point TO each node)
2. Start with nodes that have 0 in-degree
3. Process node, reduce in-degree of neighbors
4. Add neighbors with 0 in-degree to queue
5. Repeat until done
```

**Composing Software Connection**
- Ch.8: Function Composition
- Your execution IS composition: `output = nodeC(nodeB(nodeA(input)))`

**Sim Studio Reference**
- `apps/sim/executor/` - Their execution implementation

---

## Phase 7: Node Executors

### What You're Building
- Individual executor for each node type
- LLM API calls (OpenAI)
- Web scraping (Cheerio)
- Embeddings generation

### Resources to Study

**AI Engineering (Chip Huyen)**
- Ch.4: Embeddings
  - What embeddings are
  - How similarity search works
  - Vector dimensions
  
- Ch.5: Prompt Engineering
  - Prompt templates
  - System messages
  - Temperature and other parameters
  
- Ch.7: Agents
  - How agents chain operations
  - Tool use patterns

**OpenAI API Docs**
- Chat completions: https://platform.openai.com/docs/guides/chat
- Embeddings: https://platform.openai.com/docs/guides/embeddings

**Web Scraping**
- Cheerio docs: https://cheerio.js.org/
- Basic selectors and text extraction

---

## Concept Deep Dives

### Topological Sort (You'll Use This A Lot)

**The Problem**
```
Nodes: A, B, C, D
Edges: A→B, A→C, B→D, C→D

What order to execute so dependencies are satisfied?
Answer: A, B, C, D (or A, C, B, D)
```

**Kahn's Algorithm (Recommended)**
```typescript
function topologicalSort(nodes, edges) {
  // 1. Build adjacency list and count in-degrees
  const graph = new Map();      // nodeId → [dependent nodeIds]
  const inDegree = new Map();   // nodeId → count of incoming edges
  
  nodes.forEach(n => {
    graph.set(n.id, []);
    inDegree.set(n.id, 0);
  });
  
  edges.forEach(e => {
    graph.get(e.source).push(e.target);
    inDegree.set(e.target, inDegree.get(e.target) + 1);
  });
  
  // 2. Find starting nodes (in-degree = 0)
  const queue = [];
  inDegree.forEach((count, nodeId) => {
    if (count === 0) queue.push(nodeId);
  });
  
  // 3. Process queue
  const result = [];
  while (queue.length > 0) {
    const nodeId = queue.shift();
    result.push(nodeId);
    
    // Reduce in-degree of neighbors
    graph.get(nodeId).forEach(neighborId => {
      inDegree.set(neighborId, inDegree.get(neighborId) - 1);
      if (inDegree.get(neighborId) === 0) {
        queue.push(neighborId);
      }
    });
  }
  
  // 4. Check for cycle
  if (result.length !== nodes.length) {
    throw new Error('Cycle detected!');
  }
  
  return result;
}
```

**Practice**
- Solve LC 210 before implementing execution engine
- It's the exact same algorithm

---

### Data Flow Between Nodes

**Composing Software Connection**
```typescript
// Function composition
const compose = (f, g) => (x) => f(g(x));
const pipeline = compose(nodeC, compose(nodeB, nodeA));
const result = pipeline(input);

// Your workflow execution
async function executeWorkflow(sortedNodeIds, nodes, input) {
  let data = input;
  
  for (const nodeId of sortedNodeIds) {
    const node = nodes.find(n => n.id === nodeId);
    data = await executeNode(node, data);  // Output becomes next input
  }
  
  return data;
}
```

**Key Insight**
- Each node is a function: `(input, config) → output`
- Workflow is function composition
- Edges define composition order

---

### Embeddings & Similarity Search

**AI Engineering Ch.4 Summary**
```
Text → Embedding Model → Vector (array of numbers)

"Hello world" → [0.1, -0.3, 0.8, ...] (1536 dimensions)

Similar text = Similar vectors
Similarity = Cosine similarity (dot product of normalized vectors)
```

**Your Similarity Search Node**
```typescript
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

---

## When Stuck: Decision Tree

```
Stuck on UI/Components?
└── Check Sim Studio: apps/sim/components/

Stuck on State?
└── Check Sim Studio: apps/sim/stores/
└── Review Zustand docs

Stuck on Execution Order?
└── Solve LC 210 first
└── Read DDIA Ch.2 on graphs

Stuck on LLM Integration?
└── AI Engineering Ch.5
└── OpenAI API docs

Stuck on Embeddings?
└── AI Engineering Ch.4

Stuck on Data Flow?
└── Composing Software Ch.8

Stuck on Database?
└── Prisma docs
└── DDIA Ch.2 on data models
```

---

## Resource Links

**Books**
- AI Engineering (Chip Huyen): Your copy
- Composing Software (Eric Elliott): Your copy
- DDIA (Martin Kleppmann): Your copy

**Code References**
- Sim Studio: https://github.com/simstudioai/sim
  - `apps/sim/stores/` - State management
  - `apps/sim/blocks/` - Node definitions
  - `apps/sim/executor/` - Execution engine

**LeetCode**
- LC 207: https://leetcode.com/problems/course-schedule/
- LC 210: https://leetcode.com/problems/course-schedule-ii/
- LC 2694: https://leetcode.com/problems/event-emitter/

**Documentation**
- React Flow: https://reactflow.dev/docs/
- Zustand: https://zustand-demo.pmnd.rs/
- Prisma: https://www.prisma.io/docs/
- OpenAI: https://platform.openai.com/docs/
- Next.js App Router: https://nextjs.org/docs/app