import { SaveStatus } from "@/types/ui";


// stub for ticket AWB 17
export const useAutoSave = (workflowId: string | null):SaveStatus => {
  if (!workflowId) {
    return SaveStatus.IDLE;
  }
  return SaveStatus.IDLE;
}