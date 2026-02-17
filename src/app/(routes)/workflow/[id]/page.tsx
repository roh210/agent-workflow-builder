"use client";
import { WorkflowCanvas } from "@/app/components/canvas/WorkflowCanvas";
import { ConfigPanel } from "@/app/components/panels/ConfigPanel";
import { HeaderPanel } from "@/app/components/panels/HeaderPanel";
import { NodeSideBar } from "@/app/components/panels/NodeSideBar";
import { ErrorUI } from "@/app/components/ui/ErrorUI";
import { LoadingUI } from "@/app/components/ui/LoadingUI";
import { useFetch } from "@/hooks/useFetch";
import { useWorkflowStore } from "@/store/workflow-store";
import { GetWorkflowResponse } from "@/types";
import { use, useEffect, } from "react";

export default function CanvasEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  console.log("CanvasEditor id:", id);
  const { data, loading, error } = useFetch<GetWorkflowResponse>(
    `/api/workflows/${id}`,
  );
  const setWorkflow = useWorkflowStore((state) => state.setWorkflow);
  const resetWorkflow = useWorkflowStore((state) => state.resetWorkflow);

  useEffect(() => {
    if (data) {
      setWorkflow(
        id,
        data.workflow.name,
        data.workflow.nodes,
        data.workflow.edges,
      );

      return () => resetWorkflow();
    }
  }, [data, setWorkflow, resetWorkflow, id]);

  return (
    <main className="h-screen w-full flex flex-col">
      <HeaderPanel />
      <div className="flex-row flex-1 flex overflow-hidden">
        <NodeSideBar />
        {loading && <LoadingUI />}
        {!loading && !error && <WorkflowCanvas />}
        {!loading && error && <ErrorUI message={error} />}
      <ConfigPanel />
      </div>
    </main>
  );
}
