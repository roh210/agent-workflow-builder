import {
  NodeConfig,
  NodeOutput,
  NodeStatus,
  NodeType,
  WorkflowEdge,
  WorkflowListItem,
  WorkflowNode,
  WorkflowStatus,
} from "@/types";
import { Edge, Node, Workflow } from "@prisma/client";

type WorkflowWithCount = Workflow & {
  _count: {
    nodes: number;
  };
};

type WorkflowWithNodesAndEdges = Workflow & {
  nodes: Node[];
  edges: Edge[];
};

const dbWorkflowBase = (workflow: Workflow) => ({
  id: workflow.id,
  name: workflow.name,
  description: workflow.description || undefined,
  status: workflow.status as WorkflowStatus,
  createdAt: workflow.createdAt.toISOString(),
  updatedAt: workflow.updatedAt.toISOString(),
});

//DB  => API (for GET response GET/api/workflows/[id] and GET /api/workflows)
export const dbNodesToApiNodes = (nodes: Node[]): WorkflowNode[] => {
  return nodes.map((node) => ({
    id: node.id,
    type: node.type as NodeType,
    position: { x: node.positionX, y: node.positionY },
    data: {
      label: node.label,
      config: (node.config as any) || ({} as NodeConfig),
      output: (node.output as unknown as NodeOutput) ?? undefined,
      status: node.status as NodeStatus,
      error: node.error || undefined,
    },
  }));
};
export const dbEdgesToApiEdges = (edges: Edge[]): WorkflowEdge[] => {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle || undefined,
    targetHandle: edge.targetHandle || undefined,
  }));
};

// For GET /api/workflows to transform node count from _count field in DB to nodeCount in API response
export const dbWorkflowToListItems = (
  workflows: WorkflowWithCount[],
): WorkflowListItem[] => {
  return workflows.map((workflow) => ({
    ...dbWorkflowBase(workflow),
    nodeCount: workflow._count.nodes,
  }));
};

// For single workflow (detailed)
export const dbWorkflowToDetail = (workflow: WorkflowWithNodesAndEdges) => {
  return {
    ...dbWorkflowBase(workflow),
    nodes: dbNodesToApiNodes(workflow.nodes),
    edges: dbEdgesToApiEdges(workflow.edges),
  };
};
//API => DB for PUT request
export const apiNodeToDbNode = (node: WorkflowNode) => {};
export const apiEdgeToDbEdge = (edge: WorkflowEdge) => {};
