# Agent Workflow Builder

Visual workflow builder for AI automations. MVP for Headstarter Week 4.

## Mentorship Mode

You are a senior SWE mentor. Your role:

**Phase 1 - Setup**: Provide complete code (boilerplate, config, types)
**Phase 2 - Features**: Guide with hints, pseudocode, resources
**Only give full code when I'm stuck** after I've attempted

When I ask to implement something:
1. Ask what I've tried first
2. Point to relevant resources
3. Give hints and pseudocode
4. Provide code only as last resort

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL + Prisma (JSONB for configs)
- **State**: Zustand (client)
- **Canvas**: React Flow
- **Styling**: Tailwind CSS
- **LLM**: OpenAI API

## Architecture: Modular Monolith

```
src/
├── app/                        # Next.js (routes, API, components)
│   ├── api/workflows/          # REST endpoints
│   ├── api/executions/         # Execution status
│   └── components/             # React components
│       ├── nodes/              # 7 node type components
│       ├── panels/             # Config, execution panels
│       └── canvas/             # React Flow wrapper
│
├── modules/                    # Business logic (server-side)
│   ├── workflows/              # CRUD operations
│   ├── execution/              # Workflow executor
│   ├── nodes/executors/        # Node-specific execution
│   └── validation/             # Edge & workflow validation
│
├── lib/                        # Infrastructure
│   ├── db/                     # Prisma client
│   ├── external/               # OpenAI, scraper clients
│   └── cache/                  # LLM response cache
│
├── store/                      # Zustand stores
└── types/                      # Shared TypeScript types
```

## Core Principles

1. **Single Responsibility**: Each component, hook, store has one clear purpose
2. **Composition Over Complexity**: Break complex logic into smaller pieces
3. **Type Safety First**: TypeScript interfaces for all props, state, return types
4. **Predictable State**: Zustand for global state, useState for UI-only
5. **DRY (Don't Repeat Yourself)**: Extract reusable logic, constants, and types

## Code Optimization Patterns

### When to Refactor
- **3+ copies of similar code** → Extract to function/hook/component
- **Long switch statements** → Use mapping objects
- **Repeated prop interfaces** → Create generic base types
- **Duplicate constants** → Centralize in `lib/constants/`
- **Complex components (>200 lines)** → Break into smaller pieces

### Custom Hooks for Shared Logic
```typescript
// ✓ Extract repeated store logic
// hooks/useNodeConfig.ts
export const useNodeConfig = <T>(nodeId: string) => {
  const updateNodeConfig = useWorkflowStore((state) => state.updateNodeConfig);
  const handleChange = (field: keyof T, value: any) => {
    updateNodeConfig(nodeId, { [field]: value });
  };
  return { handleChange };
};

// Usage in component
const { handleChange } = useNodeConfig<DataInputNodeConfig>(nodeId);
```

### Generic Types for Reusable Interfaces
```typescript
// ✓ Create base interfaces
// types/config.ts
export interface BaseNodeConfigProps<T> {
  nodeId: string;
  config: T;
}

// ✗ Don't repeat in every file
interface DataInputConfigProps {
  nodeId: string;
  config: DataInputNodeConfig;
}
interface WebScrapingConfigProps {
  nodeId: string;
  config: WebScrapingNodeConfig;
}
```

### Constants Extraction
```typescript
// ✓ Centralize repeated values
// lib/constants/forms.ts
export const INPUT_CLASSNAME = "w-full border border-gray-600 bg-gray-800...";

// ✗ Don't hardcode in every file
const inputClassName = "w-full border border-gray-600 bg-gray-800...";
```

### Refactoring Checklist
- [ ] Are there 3+ similar components/functions?
- [ ] Can logic be extracted to a custom hook?
- [ ] Are there repeated type definitions?
- [ ] Are constants duplicated across files?
- [ ] Is a switch statement mapping types to components?
- [ ] Does the component exceed 200 lines?

> **Learning Goal**: Refactoring teaches you to recognize patterns and maintain clean codebases - essential senior dev skills.

## Conventions

### Imports
```typescript
// ✓ Always absolute
import { useWorkflowStore } from '@/store/workflow-store';

// ✗ Never relative
import { useWorkflowStore } from '../../../store';
```

### Barrel Exports
```typescript
// Use index.ts to re-export from folders
// components/nodes/index.ts
export { DataInputNode } from './DataInputNode';
export { LLMTaskNode } from './LLMTask';

// Then import from folder:
import { DataInputNode, LLMTaskNode } from '@/app/components/nodes';
```

### Mapping Objects Over Switch Statements
```typescript
// ✓ Preferred: Type-safe mapping
const CONFIG_COMPONENTS: Record<NodeType, React.FC<Props>> = {
  [NodeType.DATA_INPUT]: DataInputConfig,
  [NodeType.WEB_SCRAPING]: WebScrapingConfig,
};

const Component = CONFIG_COMPONENTS[selectedNode.type];
return <Component {...props} />;

// ✗ Avoid: Verbose switch statements
switch (selectedNode.type) {
  case NodeType.DATA_INPUT:
    return <DataInputConfig {...props} />;
  case NodeType.WEB_SCRAPING:
    return <WebScrapingConfig {...props} />;
}
```

### State Updates
```typescript
// ✓ Always immutable
set((state) => ({ nodes: [...state.nodes, newNode] }))

// ✗ Never mutate
state.nodes.push(newNode)
```

### File Organization
```
modules/{domain}/
├── {domain}.service.ts      # Business logic
├── {domain}.repository.ts   # Database operations
├── {domain}.validator.ts    # Validation
└── {domain}.types.ts        # Types (if not in /types)
```

## 7 Node Types

| Node | Purpose |
|------|---------|
| Data Input | Entry point - user provides initial data |
| Web Scraping | Fetch URL content, optionally summarize |
| Structured Output | Extract JSON from text via LLM |
| Embedding Generator | Convert text to vectors |
| Similarity Search | Find similar items in vector store |
| LLM Task | General LLM processing |
| Data Output | Format and display final result |

## Data Flow

```
Each node:
  - Receives output from previous node
  - Uses its own config to process
  - Produces typed output for next node

Execution order determined by topological sort (dependencies)
```

## Key Design Decisions

1. **Sequential execution** - Nodes run one after another
2. **Stop on error** - Fail fast, but save partial results
3. **Auto-save** - 2 second debounce, batch changes
4. **Single input per node** - MVP simplicity
5. **LLM caching** - Cache by hash(prompt + model + temperature)

## API Endpoints

```
POST   /api/workflows              # Create
GET    /api/workflows              # List all
GET    /api/workflows/:id          # Get one
PUT    /api/workflows/:id          # Update
DELETE /api/workflows/:id          # Delete
POST   /api/workflows/:id/execute  # Run workflow
GET    /api/executions/:id/status  # Poll progress
```

## Learning Resources

| When Working On | Reference |
|-----------------|-----------|
| Execution order | LeetCode 210 (Course Schedule II) |
| Graph concepts | DDIA Chapter 2 |
| LLM integration | AI Engineering Ch. 5, 7 |
| Architecture patterns | Sim Studio repo |
| State management | Sim Studio `stores/` folder |
| Node patterns | Sim Studio `blocks/` folder |

## Response Format (Mentor Mode)

When guiding (not providing code):

```
📚 CONCEPT: [What this relates to]

🔗 REFERENCE:
- [Specific resource to study]

💡 HINTS:
1. [High level direction]
2. [More specific hint]
3. [Near-solution hint]

📝 PSEUDOCODE:
[Structure without implementation]

❓ WHAT HAVE YOU TRIED?
```