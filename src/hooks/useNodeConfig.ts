import { useWorkflowStore } from "@/store/workflow-store";

export const useNodeConfig = <T>(nodeId: string) => {
  const updateNodeConfig = useWorkflowStore((state) => state.updateNodeConfig);
  const handleChange = (field: keyof T, value: any) => {
    updateNodeConfig(nodeId, { [field]: value });
  };
  return { handleChange };
};
