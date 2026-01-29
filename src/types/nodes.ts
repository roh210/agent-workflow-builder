// src/types/nodes.ts

// ========== DATA INPUT NODE ==========
export interface DataInputNodeConfig {
  inputType: 'text' | 'json' | 'file';
  defaultValue?: string;
  placeholder?: string;
}

export interface DataInputNodeOutput {
  value: unknown;
  type: string;
}

// ========== WEB SCRAPING NODE ==========
export interface WebScrapingNodeConfig {
  urlSource: 'manual' | 'fromInput';
  manualUrl?: string;
  extractionRules?: string;
  shouldSummarize: boolean;
  summarizationModel?: 'gpt-4' | 'gpt-4o-mini' | 'gpt-3.5-turbo';
  summaryLength?: number;
}

export interface WebScrapingNodeOutput {
  url: string;
  summary: string;
  rawContent?: string;
  metadata: {
    title?: string;
    description?: string;
    scrapedAt: string;
    contentLength: number;
  };
}

// ========== STRUCTURED OUTPUT NODE ==========
export interface StructuredOutputNodeConfig {
  textSource: 'fromPreviousNode' | 'manual';
  manualText?: string;
  schemaDefinition: 'manual' | 'fromExample';
  jsonSchema?: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
  exampleOutput?: string;
  model: 'gpt-4' | 'gpt-4o-mini' | 'gpt-3.5-turbo';
  instructions?: string;
}

export interface StructuredOutputNodeOutput {
  extractedData: Record<string, unknown>;
  rawResponse?: string;
  schema: unknown;
}

// ========== EMBEDDING GENERATOR NODE ==========
export interface EmbeddingGeneratorNodeConfig {
  textSource: 'fromPreviousNode' | 'manual';
  manualText?: string;
  fieldPath?: string;
  model: 'text-embedding-3-small' | 'text-embedding-3-large' | 'text-embedding-ada-002';
  dimensions?: number;
}

export interface EmbeddingGeneratorNodeOutput {
  embeddings: number[];
  text: string;
  model: string;
  dimensions: number;
}

// ========== SIMILARITY SEARCH NODE ==========
export interface SimilaritySearchNodeConfig {
  queryEmbeddingSource: 'fromPreviousNode' | 'generateFromText';
  queryText?: string;
  vectorStoreType: 'inMemory' | 'uploaded';
  uploadedVectorsId?: string;
  topK: number;
  similarityThreshold?: number;
}

export interface SimilaritySearchNodeOutput {
  results: Array<{
    text: string;
    score: number;
    metadata?: Record<string, unknown>;
  }>;
  queryEmbedding?: number[];
}

// ========== LLM TASK NODE ==========
export interface LLMTaskNodeConfig {
  promptTemplate: string;
  variables?: Record<string, string>;
  model: 'gpt-4' | 'gpt-4o' | 'gpt-4o-mini' | 'gpt-3.5-turbo' | 'o1' | 'o1-mini';
  temperature?: number;
  maxTokens?: number;
  systemMessage?: string;
}

export interface LLMTaskNodeOutput {
  response: string;
  tokensUsed?: {
    prompt: number;
    completion: number;
    total: number;
  };
  model: string;
  finishReason?: string;
}

// ========== DATA OUTPUT NODE ==========
export interface DataOutputNodeConfig {
  outputFormat: 'json' | 'text' | 'markdown';
  displaySource: 'previousNode' | 'selectFields';
  selectedFields?: Array<{
    nodeId: string;
    fieldPath: string;
    label?: string;
  }>;
  prettyPrint?: boolean;
  includeMetadata?: boolean;
}

export interface DataOutputNodeOutput {
  formattedOutput: string;
  rawData: unknown;
}

// ========== DISCRIMINATED UNIONS ==========
export type NodeConfig =
  | DataInputNodeConfig
  | WebScrapingNodeConfig
  | StructuredOutputNodeConfig
  | EmbeddingGeneratorNodeConfig
  | SimilaritySearchNodeConfig
  | LLMTaskNodeConfig
  | DataOutputNodeConfig;

export type NodeOutput =
  | DataInputNodeOutput
  | WebScrapingNodeOutput
  | StructuredOutputNodeOutput
  | EmbeddingGeneratorNodeOutput
  | SimilaritySearchNodeOutput
  | LLMTaskNodeOutput
  | DataOutputNodeOutput;