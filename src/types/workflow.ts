// src/types/workflow.ts

export enum NodeType {
  DATA_INPUT = 'dataInput',
  WEB_SCRAPING = 'webScraping',
  STRUCTURED_OUTPUT = 'structuredOutput',
  EMBEDDING_GENERATOR = 'embeddingGenerator',
  SIMILARITY_SEARCH = 'similaritySearch',
  LLM_TASK = 'llmTask',
  DATA_OUTPUT = 'dataOutput',
}

export enum NodeStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum WorkflowStatus {
  DRAFT = 'draft',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Position {
  x: number;
  y: number;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: Position;
  data: NodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface NodeData {
  label: string;
  config: NodeConfig;
  output?: NodeOutput;
  status: NodeStatus;
  error?: string;
}

// Import from nodes.ts
import type { NodeConfig, NodeOutput } from './nodes';