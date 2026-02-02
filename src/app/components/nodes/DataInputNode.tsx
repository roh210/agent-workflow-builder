import { getNodeTypeConfig } from "@/lib/constants/node-types";
import { DataInputNodeConfig, NodeData, NodeType } from "@/types";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { BaseNode } from "./BaseNode";

export const DataInputNode = memo(function DataInputNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  const typeConfig = getNodeTypeConfig(NodeType.DATA_INPUT);
  const {inputType, placeholder} = data.config as DataInputNodeConfig;

  return (
    <BaseNode
      label={data.label}
      icon={typeConfig?.icon || "📥"}
      color={typeConfig?.color || "blue"}
      status={data.status}
      selected={selected}
    >
      <div className="text-xs text-gray-500">Type: {inputType}</div>
      {placeholder && (
        <div className="text-xs text-gray-400 truncate">
          {placeholder}
        </div>
      )}
    </BaseNode>
  );
});
