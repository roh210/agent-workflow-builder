import { SimilaritySearchNodeConfig } from "@/types";
import { ExecutorFunction } from "../engine.types";

export const executeSimilaritySearch : ExecutorFunction = async ({ node, inputData }) => {
    // For Similarity Search Node, we would typically perform a similarity search based on the input data and the configuration of the node
    // For this stub, we'll just return a dummy search result.
    const config = node.config as unknown as SimilaritySearchNodeConfig
    return { output: inputData };
}