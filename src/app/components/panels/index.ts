import { SaveStatus } from "@/types/ui";

interface StatusConfig {
  text: string;
  color: string;
}
export const STATUS_CONFIG  : Record<SaveStatus, StatusConfig> = {
  [SaveStatus.SAVING]: { text: "⏳ Saving...", color: "text-blue-500" },
  [SaveStatus.SUCCESS]: { text: "✅ Saved", color: "text-green-500" },
  [SaveStatus.ERROR]: { text: "⚠ Save failed", color: "text-red-500" },
  [SaveStatus.IDLE]:{ text: '✅ All changes saved', color: 'text-gray-400' } ,
}