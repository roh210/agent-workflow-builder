"use client";
import {
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  DeleteWorkflowResponse,
  ListWorkflowsResponse,
  WorkflowListItem,
} from "@/types";
import { WorkflowCard } from "./components/ui/WorkflowCard";
import { LoadingUI } from "./components/ui/LoadingUI";
import { EmptyState } from "./components/ui/EmptyState";
import { useFetch } from "@/hooks/useFetch";
import { ErrorUI } from "./components/ui/ErrorUI";
import { useRouter } from "next/navigation";
import { useMutation } from "@/hooks/useMutation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const { data, loading, error, refetch } =
    useFetch<ListWorkflowsResponse>("/api/workflows");
  const [workflows, setWorkflows] = useState<WorkflowListItem[]>(
    data?.workflows || [],
  );

  useEffect(() => {
    if (data?.workflows) setWorkflows(data.workflows);
  }, [data]);

  const route = useRouter();

  const { mutate: createWorkflow, loading: creating } = useMutation<
    CreateWorkflowResponse,
    CreateWorkflowRequest
  >({
    url: "/api/workflows",
    method: "POST",
    onSuccess: (response) => {
      if (!response) return;
      const { workflow } = response;
      route.push(`/workflow/${workflow.id}`);
    },
    onError: (error, response) => {
      console.log(error, response);
    },
  });

  const { mutate: deleteWorkflow, loading: deleting } = useMutation<
    DeleteWorkflowResponse,
    string,
    WorkflowListItem[]
  >({
    url: (id) => `/api/workflows/${id}`,
    method: "DELETE",
    onMutate: (id) => {
      let previousWorkflows: WorkflowListItem[] = [];
      // Optimistically update the UI by removing the deleted workflow
      console.log("workflows in onMutate:", workflows.length);
      console.log("data.workflows:", data?.workflows?.length);
      setWorkflows((prev) => {
        previousWorkflows = prev;
        return prev.filter((workflow) => workflow.id !== id);
      });
      return { previousData: previousWorkflows };
    },
    onSuccess: () => {
      refetch();
      //
    },
    onError: (error, response) => {
      console.log(error, response);
      if (response.previousData) {
        setWorkflows(response.previousData || []); // revert to previous state
      }

      // revert to previous state
    },
  });

  return (
    <main className="h-screen w-full flex flex-col p-8">
      <div className="flex-1">
        <button
          disabled={creating}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => createWorkflow({ name: "Untitled Workflow" })}
        >
          {creating ? "Creating..." : "+ New Workflow"}
        </button>
        <h1 className="text-2xl font-bold mb-4">My Workflows</h1>
        {loading && <LoadingUI />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.length > 0 &&
            !loading &&
            workflows.map((workflow) => (
              <div key={workflow.id} className="relative cursor-pointer" onClick={(e) => {e.stopPropagation() ; route.push(`/workflow/${workflow.id}`)}}>
                <WorkflowCard
                 key={workflow.id}
                  {...workflow}
                  onDelete={() => deleteWorkflow(workflow.id)}
                />
              </div>
            ))}
          {!loading && workflows.length === 0 && (
            <EmptyState message="No workflows found. Create a new workflow to get started!" />
          )}
          {error && <ErrorUI message={error} />}
        </div>
      </div>
    </main>
  );
}
