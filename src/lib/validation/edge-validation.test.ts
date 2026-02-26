import {
  isCycle,
  isDuplicateEdge,
  isSelfConnection,
  isValidTypeCompatibility,
} from "@/modules/validation/edge-validation";
import { NodeStatus, NodeType, WorkflowEdge, WorkflowNode } from "@/types";
import { Connection } from "reactflow";
import {
  mockEdges,
  mockNodes,
  mockTriangleEdges,
  mockTriangleNodes,
} from "./mocks/workflow";

describe("isSelfConnection", () => {
  it("should return true for self connection", () => {
    const connection = { source: "node1", target: "node1" } as Connection;
    expect(isSelfConnection(connection)).toBe(true);
  });
  it("should return false for non-self connection", () => {
    const connection = { source: "node1", target: "node2" } as Connection;
    expect(isSelfConnection(connection)).toBe(false);
  });
  it("should return false if source or target is missing", () => {
    const connection1 = { source: "node1", target: "" } as Connection;
    const connection2 = { source: "", target: "node1" } as Connection;
    expect(isSelfConnection(connection1)).toBe(false);
    expect(isSelfConnection(connection2)).toBe(false);
  });
});

describe("isDuplicateEdge", () => {
  it("should return true for duplicate edge", () => {
    const connection = { source: "node1", target: "node2" } as Connection;
    const edges = [{ source: "node1", target: "node2" }] as WorkflowEdge[];
    expect(isDuplicateEdge(edges, connection)).toBe(true);
  });
  it("should return false for non-duplicate edge", () => {
    const connection = { source: "node1", target: "node2" } as Connection;
    const edges = [{ source: "node2", target: "node1" }] as WorkflowEdge[];
    expect(isDuplicateEdge(edges, connection)).toBe(false);
  });
  it("should return false if edges list is empty", () => {
    const connection = { source: "node1", target: "node2" } as Connection;
    const edges: WorkflowEdge[] = [];
    expect(isDuplicateEdge(edges, connection)).toBe(false);
  });
});

describe("isValidTypeCompatibility", () => {
  const nodes = [...mockNodes];
  it("should return true for compatible types", () => {
    const connection = { source: "node1", target: "node2" } as Connection;
    expect(isValidTypeCompatibility(nodes, connection)).toBe(true);
  });
  it("should return true for another set of compatible types", () => {
    const connection = { source: "node2", target: "node3" } as Connection;
    expect(isValidTypeCompatibility(nodes, connection)).toBe(true);
  });
  it("should return false for incompatible types", () => {
    const connection = { source: "node2", target: "node1" } as Connection;
    expect(isValidTypeCompatibility(nodes, connection)).toBe(false);
  });
  it("should return false if source node is missing", () => {
    const connection = { source: "nodeX", target: "node2" } as Connection;
    expect(isValidTypeCompatibility(nodes, connection)).toBe(false);
  });
  it("should return false if target node is missing", () => {
    const connection = { source: "node1", target: "nodeY" } as Connection;
    expect(isValidTypeCompatibility(nodes, connection)).toBe(false);
  });
  it("should return false for terminal node with outgoing connections", () => {
    const connection = { source: "node7", target: "node1" } as Connection;
    expect(isValidTypeCompatibility(nodes, connection)).toBe(false);
  });
});

describe("isCycle", () => {
  const nodes = [...mockNodes];
  let edges: WorkflowEdge[];

  beforeEach(() => {
    edges = [...mockEdges];
  });

  const newConnection = { source: "node7", target: "node1" } as Connection;
  it("should return true for cyclic connection", () => {
    expect(isCycle(edges, nodes, newConnection)).toBe(true);
  });
  it("should return false for non-cyclic connection", () => {
    const nonCyclicConnection = {
      source: "node1",
      target: "node3",
    } as Connection;
    expect(isCycle(edges, nodes, nonCyclicConnection)).toBe(false);
  });
  it("should return false if empty edges list", () => {
    const emptyEdges: WorkflowEdge[] = [];
    expect(isCycle(emptyEdges, nodes, newConnection)).toBe(false);
  });
  it("should return false if empty nodes list", () => {
    const emptyNodes: WorkflowNode[] = [];
    expect(isCycle(edges, emptyNodes, newConnection)).toBe(false);
  });
  it("should return false if single node with self-connection", () => {
    const singleNode = [
      {
        id: "node1",
        type: NodeType.DATA_INPUT,
        position: { x: 0, y: 0 },
        data: { label: "Data Input", config: {}, status: NodeStatus.IDLE },
      },
    ] as WorkflowNode[];
    const selfConnection = { source: "node1", target: "node1" } as Connection;
    expect(isCycle([], singleNode, selfConnection)).toBe(false);
  });
  it("should return true for indirect cycle", () => {
    const triangleConnection = {
      source: "node3",
      target: "node1",
    } as Connection;
    expect(
      isCycle(mockTriangleEdges, mockTriangleNodes, triangleConnection),
    ).toBe(true);
  });
});
