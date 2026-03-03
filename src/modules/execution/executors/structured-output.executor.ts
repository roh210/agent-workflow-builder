import { StructuredOutputNodeConfig } from "@/types";
import { ExecutorFunction } from "../engine.types";

export const executeStructuredOutput : ExecutorFunction = async ({ node, inputData }) => {
    // For Structured Output Node, we would typically format the input data into a structured format
    // based on the configuration of the node. For this stub, we'll just return the input data as output.
    const config = node.config as unknown as StructuredOutputNodeConfig;
    return { output: inputData };
}