AWB-005: Update Main Page Layout
Type: Feature
Priority: P0 - Critical
Story Points: 1
Sprint: Phase 1 - Canvas Foundation
Assignee: Roheena
Blocked By: AWB-003, AWB-004
Description
Update the main page to display the sidebar and canvas in a proper layout.
User Story

As a user, I want to see the node sidebar on the left and the canvas taking up the remaining space.

Acceptance Criteria

 Page fills full viewport height
 Sidebar fixed width on left (256px / w-64)
 Canvas fills remaining space
 No scrollbars on main layout
 Responsive (sidebar collapses on mobile - stretch goal)

Technical Details
File to modify:
src/app/page.tsx
Layout structure:
typescriptimport { WorkflowCanvas } from '@/app/components/canvas/WorkflowCanvas';
import { NodeSidebar } from '@/app/components/panels/NodeSidebar';

export default function Home() {
  return (
    <main className="h-screen flex">
      <NodeSidebar />
      <div className="flex-1">
        <WorkflowCanvas />
      </div>
    </main>
  );
}
Also update layout:
src/app/layout.tsx
typescript// Ensure no padding/margin on body
<body className={`${inter.className} overflow-hidden`}>
  {children}
</body>
Definition of Done

 Layout renders correctly
 No unwanted scrollbars
 Sidebar and canvas both visible
 Drag from sidebar to canvas works end-to-end