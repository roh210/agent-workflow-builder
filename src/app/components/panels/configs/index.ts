import { DataInputConfig } from "./DataInputConfig";
import { DataOutputConfig } from "./DataOutputConfig";
import { EmbeddingConfig } from "./EmbeddingConfig";
import { WebScrapingConfig } from "./WebScrapingConfig";
import { SimilaritySearchConfig } from "./SimilaritySearchConfig";
import { StructuredOutputConfig } from "./StructuredOutputConfig";
import { LLMTaskConfig } from "./LLMTaskConfig";
import { NodeType } from "@/types";


interface ConfigComponentProp {
    nodeId: string;
    config: any;
}

export const CONFIG_COMPONENTS : Record<NodeType, React.FC<ConfigComponentProp>> = {
     [NodeType.DATA_INPUT]: DataInputConfig,
     [NodeType.DATA_OUTPUT]: DataOutputConfig,
     [NodeType.EMBEDDING_GENERATOR]: EmbeddingConfig,
     [NodeType.LLM_TASK]: LLMTaskConfig,
     [NodeType.SIMILARITY_SEARCH]: SimilaritySearchConfig,
     [NodeType.STRUCTURED_OUTPUT]: StructuredOutputConfig,
     [NodeType.WEB_SCRAPING]: WebScrapingConfig,
}
export {
  DataInputConfig,
  DataOutputConfig,
  EmbeddingConfig,
  WebScrapingConfig,
  SimilaritySearchConfig,
  StructuredOutputConfig,
  LLMTaskConfig,
};
