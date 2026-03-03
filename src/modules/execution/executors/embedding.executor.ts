import { EmbeddingGeneratorNodeConfig } from "@/types";
import { ExecutorFunction } from "../engine.types";

export const executeEmbedding : ExecutorFunction = async ({ node, inputData }) => {
    // For Embedding Node, we would typically call an embedding service to convert input data into embeddings
    // based on the configuration of the node. For this stub, we'll just return a dummy embedding.
    const config = node.config as unknown as EmbeddingGeneratorNodeConfig
    return { output: inputData }; 
}