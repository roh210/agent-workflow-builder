import { NodeType, WorkflowEdge, WorkflowNode } from "@/types";
import { Connection } from "reactflow";

export const NODE_COMPATIBILITY: Record<NodeType, NodeType[]> = {
  [NodeType.DATA_INPUT]: [
    NodeType.WEB_SCRAPING,
    NodeType.LLM_TASK,
    NodeType.EMBEDDING_GENERATOR,
    NodeType.STRUCTURED_OUTPUT,
  ],
  [NodeType.WEB_SCRAPING]: [NodeType.STRUCTURED_OUTPUT, NodeType.LLM_TASK, NodeType.EMBEDDING_GENERATOR, NodeType.DATA_OUTPUT],
  [NodeType.STRUCTURED_OUTPUT]: [
    NodeType.EMBEDDING_GENERATOR,
    NodeType.LLM_TASK,
    NodeType.DATA_OUTPUT,
  ],
  [NodeType.EMBEDDING_GENERATOR]: [NodeType.SIMILARITY_SEARCH],
  [NodeType.SIMILARITY_SEARCH]: [NodeType.LLM_TASK , NodeType.DATA_OUTPUT],
  [NodeType.LLM_TASK]: [NodeType.DATA_OUTPUT, NodeType.STRUCTURED_OUTPUT, NodeType.EMBEDDING_GENERATOR, NodeType.LLM_TASK],
  [NodeType.DATA_OUTPUT]: [], // terminal — no outgoing connections
};

export const isSelfConnection = (connection: Connection): boolean => {
  return connection.source === connection.target;
};
export const isDuplicateEdge = (
  edges: WorkflowEdge[],
  newConnection: Connection,
): boolean => {
  return edges.some(
    (edge) =>
      `${edge.source}->${edge.target}` ===
      `${newConnection.source}->${newConnection.target}`,
  );
};
export const isValidTypeCompatibility = (
  nodes: WorkflowNode[],
  newConnection: Connection,
): boolean => {
  const sourceNode = nodes.find((node) => node.id === newConnection.source);
  const targetNode = nodes.find((node) => node.id === newConnection.target);
  if (!sourceNode || !targetNode) {
    console.warn("Source or target node not found");
    return false;
  }
  const compatibleTargets = NODE_COMPATIBILITY[sourceNode.type];
  if (!compatibleTargets.includes(targetNode.type)) {
    console.warn(
      `Incompatible node types: ${sourceNode.type} cannot connect to ${targetNode.type}`,
    );
    return false;
  }
  return true;
};

export const isCycle = (
  edges: WorkflowEdge[],
  nodes: WorkflowNode[],
  newConnection: Connection,
): boolean => {
  if (!newConnection.source || !newConnection.target || nodes.length === 0 || edges.length === 0) return false;
  const adjacencyList: Record<string, string[]> = {};
  nodes.forEach((node) => {
    adjacencyList[node.id] = [];
  });
  edges.forEach((edge) => {
    adjacencyList[edge.source].push(edge.target);
  });
  const visited: Record<string, boolean> = {};
  const dfs = (nodeId: string): boolean => {
    if (nodeId === newConnection.source) {
      return true; // cycle detected
    }
    if (!visited[nodeId]) {
      visited[nodeId] = true;
      for (const neighbor of adjacencyList[nodeId]) {
        if (!visited[neighbor] && dfs(neighbor)) {
          return true;
        }
      }
    }
    return false;
  };
  return dfs(newConnection.target);
};

export const validateConnection = (
  connection: Connection,
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): string | null => {
  if (!connection.source || !connection.target) return "Invalid connection";

  if (isSelfConnection(connection)) {
    return "Cannot connect node to itself";
  }
  if (!isValidTypeCompatibility(nodes, connection)) {
    return "Incompatible node types";
  }
  if (isDuplicateEdge(edges, connection)) {
    return "Edge already exists";
  }
  if (isCycle(edges, nodes, connection)) {
    return "Connection would create a cycle";
  }
  return null; // valid connection
};
