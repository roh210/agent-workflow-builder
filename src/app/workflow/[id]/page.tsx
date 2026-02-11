'use client';
import { WorkflowCanvas } from "@/app/components/canvas/WorkflowCanvas";
import { ConfigPanel } from "@/app/components/panels/ConfigPanel";
import { NodeSideBar } from "@/app/components/panels/NodeSideBar";
import { use } from "react";


export default function CanvasEditor({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  // TODO: useEffect to fetch workflow and hydrate store
  // - GET /api/workflows/${workflowId}
  // - Transform DB shape → Store shape
  // - Call setWorkflow(id, name, transformedNodes, transformedEdges)
  
  return (
    <main className="h-screen w-full flex">
      <NodeSideBar/>
      <div className="flex-1">
      <WorkflowCanvas/>
     </div>
     <ConfigPanel/>
    </main>
  );
}