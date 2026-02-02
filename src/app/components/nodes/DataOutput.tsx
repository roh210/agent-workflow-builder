import { getNodeTypeConfig } from "@/lib/constants/node-types";
import { DataOutputNodeConfig, NodeData, NodeType } from "@/types";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { BaseNode } from "./BaseNode";


export const DataOutputNode = memo(function DataOutputNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  const typeConfig = getNodeTypeConfig(NodeType.DATA_OUTPUT);
  const {outputFormat, displaySource} = data.config as DataOutputNodeConfig;

  return (
    <BaseNode
      label={data.label}
      icon={typeConfig?.icon || "📤"}
      color={typeConfig?.color || "gray"}
      status={data.status}
      selected={selected}
    >
      <div className="text-xs text-gray-500">Format: {outputFormat}</div>
      {displaySource && (
        <div className="text-xs text-gray-400 truncate">
          Source: {displaySource ==='previousNode'? 'Previous Node' : 'Selected Fields'}
        </div>
      )}
    </BaseNode>
  );
});