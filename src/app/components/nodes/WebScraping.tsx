import { getNodeTypeConfig } from "@/lib/constants/node-types";
import { NodeData, NodeType, WebScrapingNodeConfig } from "@/types";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { BaseNode } from "./BaseNode";

export const WebScrapingNode = memo(function WebScrapingNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  const typeConfig = getNodeTypeConfig(NodeType.WEB_SCRAPING);
  const { urlSource, shouldSummarize, manualUrl, summarizationModel } =
    data.config as WebScrapingNodeConfig;

  return (
    <BaseNode
      label={data.label}
      icon={typeConfig?.icon || "🌐"}
      color={typeConfig?.color || "green"}
      status={data.status}
      selected={selected}
    >
      <div className="text-xs text-gray-500">
       URL: {urlSource === "manual" ? (manualUrl || 'Not set') : "From Input"}
      </div>
      {shouldSummarize && (
        <div className="text-xs text-gray-400">
          Summarize: {summarizationModel}
        </div>
      )}
    </BaseNode>
  );
});
