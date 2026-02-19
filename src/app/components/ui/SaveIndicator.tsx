import { SaveStatus } from "@/types/ui";
import { STATUS_CONFIG } from "../panels";


export const SaveIndicator = ({ status }: { status: SaveStatus }) => {
  const config = STATUS_CONFIG[status];
  return (
    <div className={config.color}>
      {config.text}
    </div>
  );
};