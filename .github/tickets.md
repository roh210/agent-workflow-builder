AWB-006: Create Base Node Component
Type: Feature
Priority: P0 - Critical
Story Points: 3
Sprint: Phase 2 - Node Components
Assignee: Roheena
Blocked By: AWB-005
Description
Create a reusable base node component that all 7 node types will extend. This ensures consistent styling and behavior.
User Story

As a developer, I want a base node component so all nodes have consistent handles, selection states, and status indicators.

Acceptance Criteria

 Base node has input handle (top) and output handle (bottom)
 Shows node label/title
 Visual indication when selected (border color change)
 Status indicator (idle/running/success/error)
 Consistent sizing and padding
 Accepts children for node-specific content

Technical Details
File to create:
src/app/components/nodes/BaseNode.tsx
Props interface:
typescriptinterface BaseNodeProps {
  label: string;
  status: NodeStatus;
  selected: boolean;
  children?: React.ReactNode;
  color?: string; // Border/accent color for node type
  icon?: React.ReactNode;
}
Component structure:
typescript'use client';

import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { cn } from '@/lib/utils/cn';
import { NodeStatus } from '@/types';

interface BaseNodeProps {
  label: string;
  status: NodeStatus;
  selected: boolean;
  children?: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
}

export const BaseNode = memo(function BaseNode({
  label,
  status,
  selected,
  children,
  color = 'gray',
  icon,
}: BaseNodeProps) {
  return (
    <div
      className={cn(
        'min-w-[180px] bg-white rounded-lg border-2 shadow-sm',
        selected ? 'border-blue-500 shadow-md' : 'border-gray-200',
        status === NodeStatus.RUNNING && 'border-yellow-500',
        status === NodeStatus.SUCCESS && 'border-green-500',
        status === NodeStatus.ERROR && 'border-red-500'
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />

      {/* Header */}
      <div className={cn('px-3 py-2 border-b flex items-center gap-2', `bg-${color}-50`)}>
        {icon}
        <span className="font-medium text-sm">{label}</span>
        <StatusIndicator status={status} />
      </div>

      {/* Content */}
      {children && (
        <div className="px-3 py-2 text-xs text-gray-600">
          {children}
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
    </div>
  );
});

function StatusIndicator({ status }: { status: NodeStatus }) {
  if (status === NodeStatus.IDLE) return null;
  
  return (
    <span className="ml-auto">
      {status === NodeStatus.RUNNING && '⏳'}
      {status === NodeStatus.SUCCESS && '✓'}
      {status === NodeStatus.ERROR && '✗'}
    </span>
  );
}
Definition of Done

 Component renders with handles
 Selection styling works
 Status indicator shows correctly
 Children render in content area
 Component is memoized for performance