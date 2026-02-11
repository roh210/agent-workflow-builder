// src/types/api.ts

import type { Workflow, WorkflowNode, WorkflowEdge, WorkflowStatus } from './workflow';

// ========== WORKFLOW CRUD ==========
export interface CreateWorkflowRequest {
  name: string;
  description?: string;
}

export interface CreateWorkflowResponse {
  workflow: Workflow;
}

export interface GetWorkflowResponse {
  workflow: Workflow;
}
export interface WorkflowListItem{
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  nodeCount: number;
  status: WorkflowStatus;
}
export interface ListWorkflowsResponse {
  workflows: WorkflowListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  totalPages: number;
  };
}

export interface UpdateWorkflowRequest {
  name?: string;
  description?: string;
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
}

export interface UpdateWorkflowResponse {
  workflow: Workflow;
}

export interface DeleteWorkflowResponse {
  success: boolean;
  deletedId: string;
}

// ========== EXECUTION ==========
export interface ExecuteWorkflowRequest {
  inputData: unknown;
}

export interface ExecuteWorkflowResponse {
  executionId: string;
  status: 'started' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
}

export interface GetExecutionStatusResponse {
  status: 'running' | 'completed' | 'failed';
  progress?: {
    completedNodes: number;
    totalNodes: number;
    currentNodeId?: string;
  };
  result?: unknown;
  error?: string;
}

// ========== IMPORT/EXPORT ==========
export interface ExportWorkflowResponse {
  workflow: Workflow;
  version: string;
  exportedAt: string;
}

export interface ImportWorkflowRequest {
  workflowData: Workflow;
  newName?: string;
}

export interface ImportWorkflowResponse {
  workflow: Workflow;
  warnings?: string[];
}