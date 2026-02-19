import { SaveStatus } from "@/types/ui";
import { useMutation } from "./useMutation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsDirty, useWorkflowStore } from "@/store/workflow-store";
import { useDebounce } from "./useDebounce";


export const useAutoSave = (workflowId: string | null): SaveStatus => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(SaveStatus.IDLE);
  const isDirty = useIsDirty();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { mutate } = useMutation({
    url:(payload) => `/api/workflows/${workflowId}`,
    method: "PUT",
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const handleSuccess = useCallback(
    (response: any) => {
      console.log("Auto-save successful:", response , workflowId);
      setSaveStatus(SaveStatus.SUCCESS);
      useWorkflowStore.getState().markSaved();
      timeoutRef.current = setTimeout(() => {
        setSaveStatus(SaveStatus.IDLE);
      }, 1500);
    },
    [workflowId],
  );

  const handleError = useCallback(
    (error: any) => {
      console.error("Auto-save failed:", error);
      setSaveStatus(SaveStatus.ERROR);
    },
    [],
  );

  const saveWorkflow = useCallback(() => {
    if (!workflowId) return;
    const state = useWorkflowStore.getState(); // Access Zustand state directly
    const body = {
      name: state.workflowName,
      nodes: state.nodes,
      edges: state.edges,
    };
    setSaveStatus(SaveStatus.SAVING);
    mutate(body);
  }, [workflowId, mutate]); // dependencies for saveWorkflow

  const debouncedSave = useDebounce(saveWorkflow, 2000); // Debounce for 2 seconds

  useEffect(() => {
    if (!workflowId || !isDirty) return; // Don't attempt to save if no workflow ID or not dirty
    debouncedSave();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear any pending timeout on unmount or workflowId change
    };
  }, [isDirty, workflowId, debouncedSave]);


  return saveStatus; // Return state, not IDLE
};
