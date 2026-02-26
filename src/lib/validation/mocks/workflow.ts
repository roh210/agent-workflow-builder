import { NodeStatus, NodeType, WorkflowEdge, WorkflowNode } from "@/types";

export const mockNodes = [
  {
    id: "node1",
    type: NodeType.DATA_INPUT,
    position: { x: 0, y: 0 },
    data: { label: "Data Input", config: {}, status: NodeStatus.IDLE },
  },
  {
    id: "node2",
    type: NodeType.WEB_SCRAPING,
    position: { x: 0, y: 0 },
    data: { label: "Web Scraping", config: {}, status: NodeStatus.IDLE },
  },
  {
    id: "node3",
    type: NodeType.STRUCTURED_OUTPUT,
    position: { x: 0, y: 0 },
    data: { label: "Structured Output", config: {}, status: NodeStatus.IDLE },
  },
  {
    id: "node4",
    type: NodeType.EMBEDDING_GENERATOR,
    position: { x: 0, y: 0 },
    data: {
      label: "Embedding Generator",
      config: {},
      status: NodeStatus.IDLE,
    },
  },
  {
    id: "node5",
    type: NodeType.SIMILARITY_SEARCH,
    position: { x: 0, y: 0 },
    data: { label: "Similarity Search", config: {}, status: NodeStatus.IDLE },
  },
  {
    id: "node6",
    type: NodeType.LLM_TASK,
    position: { x: 0, y: 0 },
    data: { label: "LLM Task", config: {}, status: NodeStatus.IDLE },
  },
  {
    id: "node7",
    type: NodeType.DATA_OUTPUT,
    position: { x: 0, y: 0 },
    data: { label: "Data Output", config: {}, status: NodeStatus.IDLE },
  },
] as WorkflowNode[];

export const mockEdges = [
  { id: "edge1", source: "node1", target: "node2" },
  { id: "edge2", source: "node2", target: "node3" },
  { id: "edge3", source: "node3", target: "node4" },
  { id: "edge4", source: "node4", target: "node5" },
  { id: "edge5", source: "node5", target: "node6" },
  { id: "edge6", source: "node6", target: "node7" },
] as WorkflowEdge[];

export const mockTriangleEdges = [
  { id: "edge1", source: "node1", target: "node2" },
  { id: "edge2", source: "node2", target: "node3" },    
    { id: "edge3", source: "node3", target: "node1" },
] as WorkflowEdge[];

export const mockTriangleNodes = [
  {
    id: "node1",
    type: NodeType.DATA_INPUT,
    position: { x: 0, y: 0 },
    data: { label: "Data Input", config: {}, status: NodeStatus.IDLE },
  },
  {
    id: "node2",
    type: NodeType.WEB_SCRAPING,
    position: { x: 0, y: 0 },
    data: { label: "Web Scraping", config: {}, status: NodeStatus.IDLE },
  },
  {
    id: "node3",
    type: NodeType.STRUCTURED_OUTPUT,
    position: { x: 0, y: 0 },
    data: { label: "Structured Output", config: {}, status: NodeStatus.IDLE },
  },
] as WorkflowNode[];