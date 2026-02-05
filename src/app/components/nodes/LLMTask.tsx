import { getNodeTypeConfig } from "@/lib/constants/node-types";
import { LLMTaskNodeConfig, NodeData, NodeType } from "@/types";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { BaseNode } from "./BaseNode";

export const LLMTaskNode = memo(function LLMTaskNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  const typeConfig = getNodeTypeConfig(NodeType.LLM_TASK);
  const { model, temperature } = data.config as LLMTaskNodeConfig;

  return (
    <BaseNode
      label={data.label}
      icon={typeConfig?.icon || "🤖"}
      color={typeConfig?.color || "orange"}
      status={data.status}
      selected={selected}
    >
      <div className="text-xs text-gray-500">Model: {model}</div>
      <div className="text-xs text-gray-400 truncate">
        Temperature: {temperature}
      </div>
    </BaseNode>
  );
});
