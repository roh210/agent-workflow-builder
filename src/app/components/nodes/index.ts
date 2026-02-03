import { NodeType } from "@/types";
import { DataInputNode } from "./DataInputNode";
import { DataOutputNode } from "./DataOutput";
import { EmbeddingNode } from "./Embedding";
import { LLMTaskNode } from "./LLMTask";
import { SimilaritySearchNode } from "./SimilaritySearch";
import { StructuredOutputNode } from "./StructuredOutput";
import { WebScrapingNode } from "./WebScraping";

export const nodeTypes = {
  [NodeType.DATA_INPUT]: DataInputNode,
  [NodeType.DATA_OUTPUT]: DataOutputNode,
  [NodeType.EMBEDDING_GENERATOR]: EmbeddingNode,
  [NodeType.LLM_TASK]: LLMTaskNode,
  [NodeType.SIMILARITY_SEARCH]: SimilaritySearchNode,
  [NodeType.STRUCTURED_OUTPUT]: StructuredOutputNode,
  [NodeType.WEB_SCRAPING]: WebScrapingNode
};

export {
  DataInputNode,
  WebScrapingNode,
  StructuredOutputNode,
  EmbeddingNode,
  SimilaritySearchNode,
  LLMTaskNode,
  DataOutputNode,
};