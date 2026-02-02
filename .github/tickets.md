AWB-008: Create Remaining Node Components
Type: Feature
Priority: P0 - Critical
Story Points: 5
Sprint: Phase 2 - Node Components
Assignee: Roheena
Blocked By: AWB-007
Description
Create the remaining 6 node components following the same pattern as DataInputNode.
Acceptance Criteria

 WebScrapingNode created and working
 StructuredOutputNode created and working
 EmbeddingNode created and working
 SimilaritySearchNode created and working
 LLMTaskNode created and working
 DataOutputNode created and working

Technical Details
Files to create:
FileColorIconShowsWebScrapingNode.tsxgreen🌐URL, summarize toggleStructuredOutputNode.tsxpurple{}Schema typeEmbeddingNode.tsxorange📦Model nameSimilaritySearchNode.tsxcyan🔍Top K valueLLMTaskNode.tsxpink🤖Model, temperatureDataOutputNode.tsxgray📤Output format
Pattern to follow:
typescript'use client';

import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import type { NodeData, XxxNodeConfig } from '@/types';

export const XxxNode = memo(function XxxNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  const config = data.config as XxxNodeConfig;

  return (
    <BaseNode
      label={data.label}
      status={data.status}
      selected={selected}
      color="xxx"
      icon={<span>🔷</span>}
    >
      {/* Node-specific preview content */}
    </BaseNode>
  );
});

XxxNode.displayName = 'XxxNode';
Definition of Done

 All 6 nodes created
 All nodes render on canvas
 All nodes show relevant config preview
 No TypeScript errors