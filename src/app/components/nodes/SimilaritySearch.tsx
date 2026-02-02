import { getNodeTypeConfig } from "@/lib/constants/node-types";
import { NodeData, NodeType, SimilaritySearchNodeConfig } from "@/types";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { BaseNode } from "./BaseNode";

export const SimilaritySearchNode = memo(function SimilaritySearchNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  const typeConfig = getNodeTypeConfig(NodeType.SIMILARITY_SEARCH);
  const {topK,queryEmbeddingSource} = data.config as SimilaritySearchNodeConfig;

  return (
    <BaseNode
      label={data.label}
      icon={typeConfig?.icon || "🔍"}
      color={typeConfig?.color || "yellow"}
      status={data.status}
      selected={selected}
    >
      <div className="text-xs text-gray-500">Top K: {topK}</div>
      <div className="text-xs text-gray-400 truncate">
        Query: {queryEmbeddingSource === 'fromPreviousNode'? 'From Previous' : 'Generate'}
      </div>
    </BaseNode>
  );
});
