AWB-004: Create Node Sidebar Component
Type: Feature
Priority: P0 - Critical
Story Points: 2
Sprint: Phase 1 - Canvas Foundation
Assignee: Roheena
Description
Create a sidebar that displays all 7 node types that users can drag onto the canvas.
User Story

As a user, I want to see a list of available node types so I can drag them onto my workflow canvas.

Acceptance Criteria

 Sidebar shows on left side of screen
 All 7 node types displayed with icon and label
 Nodes are draggable
 Dragging node to canvas creates new node at drop position
 Visual feedback when dragging (cursor change, ghost element)

Technical Details
File to create:
src/app/components/panels/NodeSidebar.tsx
Node types to display:
Node TypeIcon SuggestionColorData InputInputBlueWeb ScrapingGlobeGreenStructured OutputBracesPurpleEmbedding GeneratorBoxOrangeSimilarity SearchSearchCyanLLM TaskBotPinkData OutputOutputGray
Drag implementation:
typescript// On sidebar item
const onDragStart = (event: DragEvent, nodeType: NodeType) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

// On canvas (in WorkflowCanvas.tsx)
const onDrop = (event: DragEvent) => {
  const type = event.dataTransfer.getData('application/reactflow');
  const position = reactFlowInstance.screenToFlowPosition({
    x: event.clientX,
    y: event.clientY,
  });
  addNode(type as NodeType, position);
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};
Component structure:
typescript'use client';

import { NodeType } from '@/types';

const NODE_TYPES = [
  { type: NodeType.DATA_INPUT, label: 'Data Input', icon: '📥' },
  { type: NodeType.WEB_SCRAPING, label: 'Web Scraper', icon: '🌐' },
  // ... etc
];

export function NodeSidebar() {
  const onDragStart = (e: React.DragEvent, type: NodeType) => {
    e.dataTransfer.setData('application/reactflow', type);
  };

  return (
    <aside className="w-64 border-r bg-gray-50 p-4">
      <h2 className="font-semibold mb-4">Nodes</h2>
      <div className="space-y-2">
        {NODE_TYPES.map((node) => (
          <div
            key={node.type}
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
            className="p-3 bg-white rounded border cursor-grab hover:border-blue-500"
          >
            <span className="mr-2">{node.icon}</span>
            {node.label}
          </div>
        ))}
      </div>
    </aside>
  );
}
Learning Resources

React Flow Drag and Drop
HTML Drag and Drop API

Definition of Done

 Sidebar renders with all 7 node types
 Each node type shows icon and label
 Drag cursor appears on hover
 Dragging works (visual feedback)
 Drop on canvas creates node (requires AWB-003)