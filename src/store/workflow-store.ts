import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { WorkflowNode, WorkflowEdge, NodeConfig, NodeOutput } from '@/types';
import { NodeType, NodeStatus } from '@/types';
import { nanoid } from 'nanoid';

// ========== STATE INTERFACE ==========
interface WorkflowState {
  workflowId: string | null;
  workflowName: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  isExecuting: boolean;
  executionId: string | null;
  isDirty: boolean;
  lastSavedAt: string | null;
}

// ========== ACTIONS INTERFACE ==========
interface WorkflowActions {
  // Workflow
  setWorkflow: (id: string, name: string, nodes: WorkflowNode[], edges: WorkflowEdge[]) => void;
  setWorkflowName: (name: string) => void;
  resetWorkflow: () => void;

  // Nodes
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  updateNode: (id: string, data: Partial<WorkflowNode['data']>) => void;
  updateNodeConfig: (id: string, config: Partial<NodeConfig>) => void;
  updateNodeStatus: (id: string, status: NodeStatus, error?: string) => void;
  updateNodeOutput: (id: string, output: unknown) => void;
  removeNode: (id: string) => void;
  setNodePosition: (id: string, position: { x: number; y: number }) => void;

  // Edges
  addEdge: (source: string, target: string) => void;
  removeEdge: (id: string) => void;

  // Selection
  selectNode: (id: string | null) => void;

  // Execution
  setExecuting: (isExecuting: boolean, executionId?: string | null) => void;
  clearExecutionResults: () => void;

  // Save tracking
  markDirty: () => void;
  markSaved: () => void;
}

// ========== INITIAL STATE ==========
const initialState: WorkflowState = {
  workflowId: null,
  workflowName: 'Untitled Workflow',
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isExecuting: false,
  executionId: null,
  isDirty: false,
  lastSavedAt: null,
};

// ========== DEFAULT CONFIGS ==========
const getDefaultConfig = (type: NodeType): NodeConfig => {
  const configs: Record<string, NodeConfig> = {
    [NodeType.DATA_INPUT]: {
      inputType: 'text',
      placeholder: 'Enter your input...',
    },
    [NodeType.WEB_SCRAPING]: {
      urlSource: 'manual',
      manualUrl: '',
      shouldSummarize: true,
      summarizationModel: 'gpt-4o-mini',
    },
    [NodeType.STRUCTURED_OUTPUT]: {
      textSource: 'fromPreviousNode',
      schemaDefinition: 'manual',
      model: 'gpt-4o-mini',
    },
    [NodeType.EMBEDDING_GENERATOR]: {
      textSource: 'fromPreviousNode',
      model: 'text-embedding-3-small',
    },
    [NodeType.SIMILARITY_SEARCH]: {
      queryEmbeddingSource: 'fromPreviousNode',
      vectorStoreType: 'inMemory',
      topK: 5,
    },
    [NodeType.LLM_TASK]: {
      promptTemplate: '',
      model: 'gpt-4o-mini',
      temperature: 0.7,
    },
    [NodeType.DATA_OUTPUT]: {
      outputFormat: 'json',
      displaySource: 'previousNode',
      prettyPrint: true,
    },
  };
  return configs[type];
};

const getDefaultLabel = (type: NodeType): string => {
  const labels: Record<string, string> = {
    [NodeType.DATA_INPUT]: 'Data Input',
    [NodeType.WEB_SCRAPING]: 'Web Scraper',
    [NodeType.STRUCTURED_OUTPUT]: 'Structured Output',
    [NodeType.EMBEDDING_GENERATOR]: 'Embeddings',
    [NodeType.SIMILARITY_SEARCH]: 'Similarity Search',
    [NodeType.LLM_TASK]: 'LLM Task',
    [NodeType.DATA_OUTPUT]: 'Output',
  };
  return labels[type];
};

// ========== STORE ==========
export const useWorkflowStore = create<WorkflowState & WorkflowActions>()(
  devtools(
    (set) => ({
      ...initialState,

      // ===== WORKFLOW ACTIONS =====
      setWorkflow: (id, name, nodes, edges) =>
        set(
          { workflowId: id, workflowName: name, nodes, edges, isDirty: false },
          false,
          'setWorkflow'
        ),

      setWorkflowName: (name) =>
        set(
          { workflowName: name, isDirty: true },
          false,
          'setWorkflowName'
        ),

      resetWorkflow: () =>
        set(initialState, false, 'resetWorkflow'),

      // ===== NODE ACTIONS =====
      addNode: (type, position) =>
        set(
          (state) => ({
            nodes: [
              ...state.nodes,
              {
                id: `node_${nanoid(8)}`,
                type,
                position,
                data: {
                  label: getDefaultLabel(type),
                  config: getDefaultConfig(type),
                  status: NodeStatus.IDLE,
                },
              },
            ],
            isDirty: true,
          }),
          false,
          'addNode'
        ),

      updateNode: (id, data) =>
        set(
          (state) => ({
            nodes: state.nodes.map((node) =>
              node.id === id
                ? { ...node, data: { ...node.data, ...data } }
                : node
            ),
            isDirty: true,
          }),
          false,
          'updateNode'
        ),

      updateNodeConfig: (id, config) =>
        set(
          (state) => ({
            nodes: state.nodes.map((node) =>
              node.id === id
                ? {
                    ...node,
                    data: {
                      ...node.data,
                      config: { ...node.data.config, ...config } as NodeConfig,
                    },
                  }
                : node
            ),
            isDirty: true,
          }),
          false,
          'updateNodeConfig'
        ),

      updateNodeStatus: (id, status, error) =>
        set(
          (state) => ({
            nodes: state.nodes.map((node) =>
              node.id === id
                ? { ...node, data: { ...node.data, status, error } }
                : node
            ),
          }),
          false,
          'updateNodeStatus'
        ),

      updateNodeOutput: (id, output) =>
        set(
          (state) => ({
            nodes: state.nodes.map((node) =>
              node.id === id
                ? { ...node, data: { ...node.data, output: output as NodeOutput } }
                : node
            ),
          }),
          false,
          'updateNodeOutput'
        ),

      removeNode: (id) =>
        set(
          (state) => ({
            nodes: state.nodes.filter((node) => node.id !== id),
            // Cascade: remove connected edges
            edges: state.edges.filter(
              (edge) => edge.source !== id && edge.target !== id
            ),
            // Clear selection if deleted node was selected
            selectedNodeId:
              state.selectedNodeId === id ? null : state.selectedNodeId,
            isDirty: true,
          }),
          false,
          'removeNode'
        ),

      setNodePosition: (id, position) =>
        set(
          (state) => ({
            nodes: state.nodes.map((node) =>
              node.id === id ? { ...node, position } : node
            ),
            isDirty: true,
          }),
          false,
          'setNodePosition'
        ),

      // ===== EDGE ACTIONS =====
      addEdge: (source, target) =>
        set(
          (state) => ({
            edges: [
              ...state.edges,
              {
                id: `edge_${nanoid(8)}`,
                source,
                target,
              },
            ],
            isDirty: true,
          }),
          false,
          'addEdge'
        ),

      removeEdge: (id) =>
        set(
          (state) => ({
            edges: state.edges.filter((edge) => edge.id !== id),
            isDirty: true,
          }),
          false,
          'removeEdge'
        ),

      // ===== SELECTION =====
      selectNode: (id) =>
        set({ selectedNodeId: id }, false, 'selectNode'),

      // ===== EXECUTION =====
      setExecuting: (isExecuting, executionId = null) =>
        set({ isExecuting, executionId }, false, 'setExecuting'),

      clearExecutionResults: () =>
        set(
          (state) => ({
            nodes: state.nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                output: undefined,
                status: NodeStatus.IDLE,
                error: undefined,
              },
            })),
          }),
          false,
          'clearExecutionResults'
        ),

      // ===== SAVE TRACKING =====
      markDirty: () =>
        set({ isDirty: true }, false, 'markDirty'),

      markSaved: () =>
        set(
          { isDirty: false, lastSavedAt: new Date().toISOString() },
          false,
          'markSaved'
        ),
    }),
    { name: 'workflow-store' }
  )
);

// ========== SELECTORS ==========
export const useNodes = () => useWorkflowStore((state) => state.nodes);
export const useEdges = () => useWorkflowStore((state) => state.edges);
export const useSelectedNode = () => {
  const nodes = useWorkflowStore((state) => state.nodes);
  const selectedId = useWorkflowStore((state) => state.selectedNodeId);
  return nodes.find((n) => n.id === selectedId) ?? null;
};
export const useIsExecuting = () => useWorkflowStore((state) => state.isExecuting);
export const useIsDirty = () => useWorkflowStore((state) => state.isDirty);
export const useWorkflowName = () => useWorkflowStore((state) => state.workflowName);