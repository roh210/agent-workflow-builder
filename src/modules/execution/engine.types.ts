import { Node } from "@prisma/client";


export interface ExecutorContext {
    node: Node;
    inputData: unknown;
}

export interface ExecutorResult {
    output: unknown;
}
export type ExecutorFunction = (context: ExecutorContext) => Promise<ExecutorResult>;
