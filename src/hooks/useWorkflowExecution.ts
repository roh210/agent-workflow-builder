import { WorkflowStatus } from "@/types";
import { useEffect, useRef, useState } from "react";

export const useWorkflowExecution = (workflowId: string | null) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const pollRef= useRef<NodeJS.Timeout | null>(null);
  useEffect(() =>{
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
      } 
    }
  }, []);
  const executeWorkflow = async () => {
    if (!workflowId) return;
    setIsExecuting(true);
    const response = await fetch(`/api/workflows/${workflowId}/execute`, {
      method: "POST",
    });

    if (!response.ok) {
      setIsExecuting(false);
      return
    }
    const { executionId } = await response.json();
    pollRef.current = setInterval(async () => {
      const statusResponse = await fetch(`/api/executions/${executionId}`);
      const { status } = await statusResponse.json();
      if (status === WorkflowStatus.COMPLETED || status === WorkflowStatus.FAILED) {
        clearInterval(pollRef.current!);
        setIsExecuting(false);
      }
    }, 500);
  };
  
  return { isExecuting, executeWorkflow };
};