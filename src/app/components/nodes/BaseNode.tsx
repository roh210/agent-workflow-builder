"use client";
import { cn } from "@/lib/utils/cn";
import { NodeStatus } from "@/types";
import { Handle, Position } from "@reactflow/core";
import { memo } from "react";

interface BaseNodeProps {
  label: string;
  icon?: React.ReactNode;
  status: NodeStatus;
  selected: boolean;
  color?: string;
  children?: React.ReactNode;
}

const colorClasses: Record<string, string> = {
  gray: "bg-gray-100",
  pink: "bg-pink-100",
  blue: "bg-blue-100",
  green: "bg-green-100",
  purple: "bg-purple-100",
  orange: "bg-orange-100",
  cyan: "bg-cyan-100",
};

export const BaseNode: React.FC<BaseNodeProps> = memo(function BaseNode({
  label,
  status,
  selected,
  children,
  color = "gray",
  icon,
}: BaseNodeProps) {
  return (
    <div
      className={cn(
        "min-w-[180px] bg-white rounded-lg border-2",
        selected ? "border-blue-500" : "border-transparent",
        status === NodeStatus.IDLE && "border-gray-300",
        status === NodeStatus.RUNNING && "animate-pulse border-yellow-500",
        status === NodeStatus.SUCCESS && "border-green-500",
        status === NodeStatus.ERROR && "border-red-500",
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
      <div className={cn("p-4 flex flex-row items-center gap-2", colorClasses[color])}>
        <span>{icon}</span>
        <span className="font-semibold text-center">{label}</span>
        <StatusIndicator status={status} />
      </div>
      {children && (
        <div className="px-3 py-2 text-xs text-gray-600">{children}</div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
    </div>
  );
});

const StatusIndicator: React.FC<{ status: NodeStatus }> = ({ status }) => {
  if (status === NodeStatus.IDLE) return null;
  return (
    <span className="ml-auto">
      {status === NodeStatus.RUNNING && "⏳"}
      {status === NodeStatus.SUCCESS && "✓"}
      {status === NodeStatus.ERROR && "✗"}
    </span>
  );
};
