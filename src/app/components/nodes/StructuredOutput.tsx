import { getNodeTypeConfig } from "@/lib/constants/node-types";
import { NodeData, NodeType, StructuredOutputNodeConfig } from "@/types";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { BaseNode } from "./BaseNode";


export const StructuredOutputNode = memo(function StructuredOutputNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  const typeConfig = getNodeTypeConfig(NodeType.STRUCTURED_OUTPUT);
  const {schemaDefinition,model} = data.config as StructuredOutputNodeConfig;

  return (
    <BaseNode
      label={data.label}
      icon={typeConfig?.icon || "📊"}
      color={typeConfig?.color || "purple"}
      status={data.status}
      selected={selected}
    >
      <div className="text-xs text-gray-500">Schema: {schemaDefinition}</div>
      <div className="text-xs text-gray-400 truncate">
        Model: {model}
      </div>
    </BaseNode>
  );
});