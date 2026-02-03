"use client";

import { useSelectedNode, useWorkflowStore } from "@/store/workflow-store";
import { NodeType } from "@/types/workflow";

export const ConfigPanel: React.FC = () => {
  const selectedNode = useSelectedNode();
  const selectNode = useWorkflowStore((state) => state.selectNode);

  if (!selectedNode) return null;

  const renderConfig = () => {
    switch (selectedNode.type) {
      case NodeType.DATA_INPUT:
        return <div className="text-gray-300"> Data Input Config (TODO)</div>;
      case NodeType.WEB_SCRAPING:
        return <div className="text-gray-300"> Web Scraping Config (TODO)</div>;
      case NodeType.STRUCTURED_OUTPUT:
        return <div className="text-gray-300"> Structured Output Config (TODO)</div>;
      case NodeType.EMBEDDING_GENERATOR:
        return <div className="text-gray-300"> Embedding Generator Config (TODO)</div>;
      case NodeType.SIMILARITY_SEARCH:
        return <div className="text-gray-300"> Similarity Search Config (TODO)</div>;
      case NodeType.LLM_TASK:
        return <div className="text-gray-300"> LLM Task Config (TODO)</div>;
      case NodeType.DATA_OUTPUT:
        return <div className="text-gray-300"> Data Output Config (TODO)</div>;
      default:
        return <div className="text-gray-300"> Unknown Node Type </div>;
    }
  };

  return(
    <aside className="w-80 h-full border-l border-gray-300 bg-black p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-white">{selectedNode.data.label}</h2>
        <button className="text-gray-400 hover:text-white" onClick={() => selectNode(null)}>✕</button>
      </div>
      {renderConfig()}
    </aside>
  )
};
