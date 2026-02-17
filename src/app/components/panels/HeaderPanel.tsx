"use client";

import { useAutoSave } from "@/hooks/useAutoSave";
import {
  useWorkflowId,
  useWorkflowName,
  useWorkflowStore,
} from "@/store/workflow-store";
import React, { useEffect } from "react";
import { STATUS_CONFIG } from ".";
import { useWorkflowExecution } from "@/hooks/useWorkflowExecution";
import Link from "next/link";

export const HeaderPanel: React.FC = () => {
  const storeWorkflowName = useWorkflowName();
  const updateWorkflowStoreName = useWorkflowStore(
    (state) => state.setWorkflowName,
  );
  const workflowId = useWorkflowId();
  const [workflowName, setWorkflowName] = React.useState(storeWorkflowName);
  const [isEditing, setIsEditing] = React.useState(false);
  const saveStatus = useAutoSave(workflowId || "");
  const { isExecuting, executeWorkflow } = useWorkflowExecution(workflowId);

  useEffect(() => {
    if (!isEditing) {
      setWorkflowName(storeWorkflowName);
    }
  }, [storeWorkflowName, isEditing]);

  const handleRunButton = async () => {
    if (!workflowId) return;
    await executeWorkflow();
  };

  const handleSave = () => {
    const trimmedName = workflowName.trim();
    if (trimmedName.length === 0) {
      setWorkflowName(storeWorkflowName);
    }
    else if (trimmedName !== storeWorkflowName) {
      updateWorkflowStoreName(trimmedName);
    }
    setIsEditing(false);
  };

  return (
    <header className="w-full h-16 border-b border-gray-700 text-white px-6 flex items-center justify-between">
      <div className="flex gap-8 flex-1 items-center">
        <Link href="/" className="font-bold text-4xl cursor-pointer">
          ←
        </Link>
        {isEditing ? (
          <input
            value={workflowName}
            onBlur={handleSave}
            onChange={(e) => setWorkflowName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
              if (e.key === "Escape") {
                setWorkflowName(storeWorkflowName);
                setIsEditing(false);
              }
            }}
            autoFocus
            className="text-lg font-semibold bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:border-blue-500 focus:outline-none"/>
        ) : (
          <h1
            className="text-lg font-semibold cursor-pointer truncate max-w-[250px]"
            onClick={() => setIsEditing(true)}
          >
            {workflowName}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-8">
        <div className={STATUS_CONFIG[saveStatus].color}>
          {STATUS_CONFIG[saveStatus].text}
      </div>
        <button
          onClick={handleRunButton}
          disabled={isExecuting}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-600 cursor-pointer disabled:cursor-not-allowed"
        >
          {isExecuting ? "Running..." : "Run Workflow"}
        </button>
      </div>
    </header>
  );
};
