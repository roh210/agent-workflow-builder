AWB-010: Create Config Panel Shell
Type: Feature
Priority: P1 - High
Story Points: 2
Sprint: Phase 3 - Configuration Panel
Assignee: Roheena
Blocked By: AWB-009
Description
Create the configuration panel that appears when a node is selected, allowing users to edit node settings.
User Story

As a user, I want to click on a node and see a panel where I can edit its configuration.

Acceptance Criteria

 Panel appears on right side when node selected
 Panel hidden when no node selected
 Shows node label as title
 Has close button
 Renders different form based on node type

Technical Details
File to create:
src/app/components/panels/ConfigPanel.tsx
typescript'use client';

import { useSelectedNode, useWorkflowStore } from '@/store/workflow-store';
import { NodeType } from '@/types';
import { DataInputConfig } from './configs/DataInputConfig';
// ... import other configs

export function ConfigPanel() {
  const selectedNode = useSelectedNode();
  const selectNode = useWorkflowStore((state) => state.selectNode);

  if (!selectedNode) return null;

  const renderConfig = () => {
    switch (selectedNode.type) {
      case NodeType.DATA_INPUT:
        return <DataInputConfig nodeId={selectedNode.id} config={selectedNode.data.config} />;
      // ... other cases
      default:
        return <div>Unknown node type</div>;
    }
  };

  return (
    <aside className="w-80 border-l bg-white p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">{selectedNode.data.label}</h2>
        <button
          onClick={() => selectNode(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      {renderConfig()}
    </aside>
  );
}
Update page.tsx layout:
typescript<main className="h-screen flex">
  <NodeSidebar />
  <div className="flex-1">
    <WorkflowCanvas />
  </div>
  <ConfigPanel />  {/* Add this */}
</main>
Definition of Done

 Panel renders when node selected
 Panel hides when no selection
 Close button works
 Layout doesn't break