AWB-009: Create Node Types Registry
Type: Feature
Priority: P0 - Critical
Story Points: 1
Sprint: Phase 2 - Node Components
Assignee: Roheena
Blocked By: AWB-008
Description
Create a registry that maps node types to their React components for React Flow.
Acceptance Criteria

 All 7 node types registered
 Registry exported from index file
 Canvas uses registry for nodeTypes prop

Technical Details
File to create:
src/app/components/nodes/index.ts
typescriptimport { DataInputNode } from './DataInputNode';
import { WebScrapingNode } from './WebScrapingNode';
import { StructuredOutputNode } from './StructuredOutputNode';
import { EmbeddingNode } from './EmbeddingNode';
import { SimilaritySearchNode } from './SimilaritySearchNode';
import { LLMTaskNode } from './LLMTaskNode';
import { DataOutputNode } from './DataOutputNode';
import { NodeType } from '@/types';

export const nodeTypes = {
  [NodeType.DATA_INPUT]: DataInputNode,
  [NodeType.WEB_SCRAPING]: WebScrapingNode,
  [NodeType.STRUCTURED_OUTPUT]: StructuredOutputNode,
  [NodeType.EMBEDDING_GENERATOR]: EmbeddingNode,
  [NodeType.SIMILARITY_SEARCH]: SimilaritySearchNode,
  [NodeType.LLM_TASK]: LLMTaskNode,
  [NodeType.DATA_OUTPUT]: DataOutputNode,
};

export {
  DataInputNode,
  WebScrapingNode,
  StructuredOutputNode,
  EmbeddingNode,
  SimilaritySearchNode,
  LLMTaskNode,
  DataOutputNode,
};
Update WorkflowCanvas.tsx:
typescriptimport { nodeTypes } from '@/app/components/nodes';

<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}  // Add this
  // ...
>
Definition of Done

 Registry file created
 Canvas uses nodeTypes
 All 7 node types render correctly on canvas
 Commit: feat: add 7 node type components