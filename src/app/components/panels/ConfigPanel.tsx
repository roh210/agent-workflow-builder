"use client";
import { useSelectedNode, useWorkflowStore } from "@/store/workflow-store";
import { CONFIG_COMPONENTS} from "./configs";

export const ConfigPanel: React.FC = () => {
  const selectedNode = useSelectedNode();
  const selectNode = useWorkflowStore((state) => state.selectNode);
  if (!selectedNode) return null;

  const ConfigComponent = CONFIG_COMPONENTS[selectedNode.type];

  return (
    <aside className="w-80 h-full border-l border-gray-300 bg-black p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-white">{selectedNode.data.label}</h2>
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => selectNode(null)}
        >
          ✕
        </button>
      </div>
     <ConfigComponent nodeId={selectedNode.id}  config={selectedNode.data.config} />
    </aside>
  );
};
