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
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "@/store/workflow-store";
import { useCallback, useMemo } from "react";

export function WorkflowCanvas() {
  const storeNodes = useWorkflowStore((state) => state.nodes);
  const storeEdges = useWorkflowStore((state) => state.edges);
  const storeDeleteNode = useWorkflowStore((state) => state.removeNode);
  const storeAddEdge = useWorkflowStore((state) => state.addEdge);
  const storeRemoveEdge = useWorkflowStore((state) => state.removeEdge);
  const storeSetNodePosition = useWorkflowStore((state) => state.setNodePosition);
  
  //  Convert store nodes to React Flow format
  const reactFlowNodes: Node[] = useMemo(() => storeNodes.map((node) => {
    return {
      id: node.id,
      type: 'default',
      position: node.position,
      data: {
        label: node.type,
      },
    };
  }), [storeNodes]);
  
  const reactFlowEdges : Edge[] = useMemo(() => storeEdges.map((edge) => {
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    };
  }), [storeEdges]);
 
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    changes.forEach((change) => {
      if (change.type === 'remove' && change.id) {
        storeDeleteNode(change.id);
      }
      if( change.type === 'position' && change.position) {
        storeSetNodePosition(change.id, change.position);
      }
    });
  }, [storeDeleteNode, storeSetNodePosition]);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    changes.forEach((change) => {
      if (change.type === 'remove' && change.id) {
        storeRemoveEdge(change.id);
      }
    });
  }, [storeRemoveEdge]);

  const onConnect = useCallback((connection: Connection) => {
    if (connection.source && connection.target) {
      storeAddEdge(connection.source, connection.target);
    }
  }, [storeAddEdge]);

  return (
    <div className="w-full h-full">
      <ReactFlow 
      nodes={reactFlowNodes} 
      edges={reactFlowEdges} 
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView>
        <Background/>
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
