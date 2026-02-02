"use client";
import React from "react";
import { NodeType } from "@/types";
import { NODE_TYPE_CONFIG } from "@/lib/constants/node-types";

const onDragStart = (
  event: React.DragEvent<HTMLDivElement>,
  nodeType: NodeType,
) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};
export const NodeSideBar: React.FC = () => {
  return (
    <aside className="w-64 h-full border-r">
      <div className="p-4 border-b border-gray-300 font-bold text-lg uppercase">
        nodes
      </div>
      <div className="p-4 space-y-4">
        {NODE_TYPE_CONFIG.map((node) => (
          <div
            key={node.type}
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
            className="flex items-center p-2 border border-gray-300 rounded cursor-grab hover:border-blue-500 shadow-sm active:cursor-grabbing"
          >
            <span className="text-2xl mr-2">{node.icon}</span>
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};
