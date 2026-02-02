AWB-007: Create Data Input Node
Type: Feature
Priority: P0 - Critical
Story Points: 2
Sprint: Phase 2 - Node Components
Assignee: Roheena
Blocked By: AWB-006
Description
Create the Data Input node component - the entry point for all workflows.
User Story

As a user, I want a Data Input node so I can provide initial data to start my workflow.

Acceptance Criteria

 Extends BaseNode styling
 Shows input type (text/json/file)
 Shows placeholder preview if configured
 Distinct icon/color (blue)
 Works when dropped on canvas

Technical Details
File to create:
src/app/components/nodes/DataInputNode.tsx
Component:
typescript'use client';

import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import type { NodeData, DataInputNodeConfig } from '@/types';

export const DataInputNode = memo(function DataInputNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  const config = data.config as DataInputNodeConfig;

  return (
    <BaseNode
      label={data.label}
      status={data.status}
      selected={selected}
      color="blue"
      icon={<span>📥</span>}
    >
      <div className="text-xs text-gray-500">
        Type: {config.inputType}
      </div>
      {config.placeholder && (
        <div className="text-xs text-gray-400 truncate">
          "{config.placeholder}"
        </div>
      )}
    </BaseNode>
  );
});

DataInputNode.displayName = 'DataInputNode';
Definition of Done

 Node renders correctly on canvas
 Shows input type from config
 Selection state works
 Can be connected to other nodes