import { DataOutputNodeConfig } from "@/types";
import { ExecutorFunction } from "../engine.types";

export const executeDataOutput : ExecutorFunction = async ({ node, inputData }) => {
    // For Data Output Node, we would typically take the input data and format it for output based on the configuration of the node
    // For this stub, we'll just return the input data as output.
    const config = node.config as unknown as DataOutputNodeConfig; 
    return { output: inputData };
}