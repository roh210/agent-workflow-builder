import { getNodeTypeConfig } from "@/lib/constants/node-types";
import { EmbeddingGeneratorNodeConfig, NodeData, NodeType } from "@/types";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { BaseNode } from "./BaseNode";

export const EmbeddingNode = memo(function EmbeddingNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  const typeConfig = getNodeTypeConfig(NodeType.EMBEDDING_GENERATOR);
  const {model, dimensions} = data.config as EmbeddingGeneratorNodeConfig;

  return (
    <BaseNode
      label={data.label}
      icon={typeConfig?.icon || "🧠"}
      color={typeConfig?.color || "pink"}
      status={data.status}
      selected={selected}
    >
      <div className="text-xs text-gray-500">Model: {model}</div>
      {dimensions && (
        <div className="text-xs text-gray-400 truncate">
          Dimensions: {dimensions}
        </div>
      )}
    </BaseNode>
  );
});