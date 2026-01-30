AWB-003: Create Workflow Canvas Component
Type: Feature
Priority: P0 - Critical
Story Points: 3
Sprint: Phase 1 - Canvas Foundation
Assignee: Roheena
Blocked By: AWB-002
Description
Create the main canvas component using React Flow where users will build their workflows by adding and connecting nodes.
User Story

As a user, I want to see an interactive canvas where I can pan, zoom, and eventually add workflow nodes.

Acceptance Criteria

 Canvas renders full-width and full-height
 User can pan by dragging background
 User can zoom with scroll wheel
 Background shows dot grid pattern
 Minimap shows in bottom-right corner
 Controls (zoom in/out/fit) show in bottom-left
 Canvas connects to Zustand store for nodes/edges

Technical Details
File to create:
src/app/components/canvas/WorkflowCanvas.tsx
Dependencies:
typescriptimport ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
Component structure:
typescript'use client';

import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '@/store/workflow-store';

export function WorkflowCanvas() {
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  
  // TODO: Convert store nodes to React Flow format
  // TODO: Handle onNodesChange, onEdgesChange, onConnect
  
  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={[]}
        edges={[]}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
Key callbacks to implement:

onNodesChange → update positions in store
onEdgesChange → handle edge deletion
onConnect → add new edge (with validation)
onNodeClick → select node

Learning Resources

React Flow Docs
Sim Studio: apps/sim/app/components/workflow-canvas.tsx

Definition of Done

 Component renders without errors
 Pan and zoom work smoothly
 Background grid visible
 Controls and minimap visible
 No console errors