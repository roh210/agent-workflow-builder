AWB-011: Create Config Form Components
Type: Feature
Priority: P1 - High
Story Points: 3
Sprint: Phase 3 - Configuration Panel
Assignee: Roheena
Blocked By: AWB-010
Description
Create individual configuration form components for each of the 7 node types. These forms allow users to edit node-specific settings.
User Story

As a user, I want to configure each node's settings through an intuitive form so my workflow behaves as intended.

Acceptance Criteria

 DataInputConfig form with input type selector and placeholder field
 WebScrapingConfig form with URL field and summarize toggle
 StructuredOutputConfig form with JSON schema editor
 EmbeddingConfig form with model selector
 SimilaritySearchConfig form with topK slider and threshold input
 LLMTaskConfig form with model selector, temperature slider, prompt textarea
 DataOutputConfig form with format selector
 All forms update Zustand store on change

Technical Details
Files to create:
src/app/components/panels/configs/
├── DataInputConfig.tsx
├── WebScrapingConfig.tsx
├── StructuredOutputConfig.tsx
├── EmbeddingConfig.tsx
├── SimilaritySearchConfig.tsx
├── LLMTaskConfig.tsx
├── DataOutputConfig.tsx
└── index.ts
Example - LLMTaskConfig.tsx:
typescript'use client';

import { useWorkflowStore } from '@/store/workflow-store';
import type { LLMTaskNodeConfig } from '@/types';

interface Props {
  nodeId: string;
  config: LLMTaskNodeConfig;
}

export function LLMTaskConfig({ nodeId, config }: Props) {
  const updateNodeConfig = useWorkflowStore((s) => s.updateNodeConfig);

  const handleChange = (field: keyof LLMTaskNodeConfig, value: any) => {
    updateNodeConfig(nodeId, { ...config, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Model Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Model</label>
        <select
          value={config.model}
          onChange={(e) => handleChange('model', e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4o-mini">GPT-4o Mini</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        </select>
      </div>

      {/* Temperature */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Temperature: {config.temperature}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={config.temperature}
          onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* System Prompt */}
      <div>
        <label className="block text-sm font-medium mb-1">System Prompt</label>
        <textarea
          value={config.systemPrompt || ''}
          onChange={(e) => handleChange('systemPrompt', e.target.value)}
          rows={3}
          className="w-full border rounded px-3 py-2"
          placeholder="You are a helpful assistant..."
        />
      </div>

      {/* User Prompt Template */}
      <div>
        <label className="block text-sm font-medium mb-1">Prompt Template</label>
        <textarea
          value={config.promptTemplate}
          onChange={(e) => handleChange('promptTemplate', e.target.value)}
          rows={4}
          className="w-full border rounded px-3 py-2"
          placeholder="Use {{input}} to reference incoming data"
        />
        <p className="text-xs text-gray-500 mt-1">
          Use {"{{input}}"} to reference data from connected nodes
        </p>
      </div>
    </div>
  );
}
Config field mapping:
Node TypeFieldsDataInputinputType (text/json/file), placeholder, defaultValueWebScrapingurl, selector?, summarize (boolean), maxLengthStructuredOutputschema (JSON), strictModeEmbeddingmodel, dimensions?SimilaritySearchtopK, threshold, metric (cosine/euclidean)LLMTaskmodel, temperature, systemPrompt, promptTemplate, maxTokensDataOutputformat (json/text/markdown), includeMetadata
Definition of Done

 All 7 config forms created
 Forms update store correctly
 No TypeScript errors
 Forms render in ConfigPanel based on node type
