import { DataInputNodeConfig } from "@/types";
import { ExecutorFunction } from "../engine.types";

export const executeDataInput: ExecutorFunction = async ({ node, inputData }) => {
    // For Data Input Node, we simply return the configured data as output
    const config = node.config as unknown as DataInputNodeConfig;
    return { output: config.defaultValue };
};