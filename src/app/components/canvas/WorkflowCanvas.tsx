"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "@/store/workflow-store";
import React, { useCallback, useMemo } from "react";
import { NodeType } from "@/types";
import { nodeTypes } from "../nodes";

const edgeTypes = {};

export const WorkflowCanvas: React.FC = () => {
  const storeNodes = useWorkflowStore((state) => state.nodes);
  const storeEdges = useWorkflowStore((state) => state.edges);
  const storeDeleteNode = useWorkflowStore((state) => state.removeNode);
  const storeAddEdge = useWorkflowStore((state) => state.addEdge);
  const storeRemoveEdge = useWorkflowStore((state) => state.removeEdge);
  const storeSetNodePosition = useWorkflowStore(
    (state) => state.setNodePosition,
  );
  const storeAddNode = useWorkflowStore((state) => state.addNode);
  const [reactFlowInstance, setReactFlowInstance] =
    React.useState<ReactFlowInstance | null>(null);

  //  Convert store nodes to React Flow format
  const reactFlowNodes: Node[] = useMemo(
    () =>
      storeNodes.map((node) => {
        return {
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
        };
      }),
    [storeNodes],
  );

  const reactFlowEdges: Edge[] = useMemo(
    () =>
      storeEdges.map((edge) => {
        return {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
        };
      }),
    [storeEdges],
  );

  // Handle events
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changes.forEach((change) => {
        if (change.type === "remove" && change.id) {
          storeDeleteNode(change.id);
        }
        if (change.type === "position" && change.position) {
          storeSetNodePosition(change.id, change.position);
        }
      });
    },
    [storeDeleteNode, storeSetNodePosition],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      changes.forEach((change) => {
        if (change.type === "remove" && change.id) {
          storeRemoveEdge(change.id);
        }
      });
    },
    [storeRemoveEdge],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        storeAddEdge(connection.source, connection.target);
      }
    },
    [storeAddEdge],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowInstance) return;
      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      storeAddNode(nodeType as NodeType, position);
    },
    [reactFlowInstance, storeAddNode],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
