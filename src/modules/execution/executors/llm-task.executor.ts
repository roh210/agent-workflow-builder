import { LLMTaskNodeConfig } from "@/types";
import { ExecutorFunction } from "../engine.types";

export const executeLLMTask : ExecutorFunction = async ({ node, inputData }) => {
    // For LLM Task Node, we would typically call a language model API with the input data and the configuration of the node
    // For this stub, we'll just return a dummy response.
    const config = node.config as unknown as LLMTaskNodeConfig
    return { output: inputData };
}