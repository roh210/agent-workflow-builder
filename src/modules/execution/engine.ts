import { prisma } from "@/lib/db/prisma";
import { Edge, Node, Prisma } from "@prisma/client";
import { topologicalSort } from "./topological-sort";
import { NodeStatus, NodeType, WorkflowStatus } from "@/types";
import { EXECUTORS } from "./executors";

const gatherInput = (currentNode: Node, allNodes: Node[], edges: Edge[]): unknown => {
  const incomingEdge = edges.find((edge) => edge.target === currentNode.id);
  if (!incomingEdge) {
    return currentNode.config;
  }
  const upstreamNode = allNodes.find((node) => node.id === incomingEdge.source);
  return upstreamNode?.output ?? null;
};

export const executeWorkflow = async (executionId: string): Promise<void> => {
  const execution = await prisma.execution.findUnique({
    where: { id: executionId },
    include: {
      workflow: {
        include: {
          nodes: true,
          edges: true,
        },
      },
    },
  });
  if (!execution) {
    throw new Error("Execution not found");
  }
  const sortedNodeIds = topologicalSort(
    execution.workflow.nodes.map((n) => n.id),
    execution.workflow.edges
  );
  for (const nodeId of sortedNodeIds) {
    const currentNode = execution.workflow.nodes.find((n) => n.id === nodeId);
    if (!currentNode) {
      throw new Error(`Node with id ${nodeId} not found`);
    }
    try {
      await prisma.node.update({
        where: { id: nodeId },
        data: { status: NodeStatus.RUNNING },
      });
      const inputData = gatherInput(
        currentNode,
        execution.workflow.nodes,
        execution.workflow.edges
      );
      const executor = EXECUTORS[currentNode.type as NodeType];
      if (!executor) {
        throw new Error(`No executor found for node type ${currentNode?.type}`);
      }
      const result = await executor({ node: currentNode!, inputData });
      await prisma.$transaction([
        prisma.node.update({
          where: { id: nodeId },
          data: { status: NodeStatus.SUCCESS, output: result.output ?? Prisma.JsonNull },
        }),
        prisma.execution.update({
          where: { id: executionId },
          data: { currentNodeId: nodeId },
        }),
      ]);
    } catch (error) {
      await prisma.$transaction([
        prisma.node.update({
          where: { id: nodeId },
          data: { status: NodeStatus.ERROR, error: (error as Error).message },
        }),
        prisma.execution.update({
          where: { id: executionId },
          data: {
            status: WorkflowStatus.FAILED,
            error: (error as Error).message,
            completedAt: new Date(),
          },
        }),
      ]);
    return 
    }
  }
  await prisma.execution.update({
    where: { id: executionId },
    data: { status: WorkflowStatus.COMPLETED, completedAt: new Date() },
  });
};
