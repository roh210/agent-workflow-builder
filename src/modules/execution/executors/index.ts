import { NodeType } from "@/types";
import { ExecutorFunction } from "../engine.types";
import { executeDataInput } from "./data-input.executor";
import { executeDataOutput } from "./data-output.executor";
import { executeEmbedding } from "./embedding.executor";
import { executeLLMTask } from "./llm-task.executor";
import { executeSimilaritySearch } from "./similarity-search.executor";
import { executeStructuredOutput } from "./structured-output.executor";
import { executeWebScraping } from "./web-scraping.executor";

export const EXECUTORS : Record<NodeType, ExecutorFunction> ={
 [NodeType.DATA_INPUT] : executeDataInput,
 [NodeType.DATA_OUTPUT]: executeDataOutput,
 [NodeType.EMBEDDING_GENERATOR] : executeEmbedding,
 [NodeType.LLM_TASK] : executeLLMTask,
 [NodeType.SIMILARITY_SEARCH] : executeSimilaritySearch,
 [NodeType.STRUCTURED_OUTPUT] : executeStructuredOutput,
 [NodeType.WEB_SCRAPING] : executeWebScraping
} 
