import { NodeType } from "@/types";

export const NODE_TYPE_CONFIG = [
    {type: NodeType.DATA_INPUT, label: 'Data Input', icon:'📥', color:'blue'},
    {type: NodeType.WEB_SCRAPING, label: 'Web Scraper', icon:'🌐', color: 'green'},
    {type: NodeType.STRUCTURED_OUTPUT, label: 'Structured Output', icon:'📊', color: 'purple'},
    {type: NodeType.EMBEDDING_GENERATOR, label: 'Embeddings', icon:'🧠', color: 'pink'},
    {type: NodeType.SIMILARITY_SEARCH, label: 'Similarity Search', icon:'🔍', color: 'yellow'},
    {type: NodeType.LLM_TASK, label: 'LLM Task', icon:'🤖', color: 'orange'},
    {type: NodeType.DATA_OUTPUT, label: 'Output', icon:'📤', color: 'gray'}    ,
] as const;

export const getNodeTypeConfig = (type: NodeType) => {
    return NODE_TYPE_CONFIG.find((node) => node.type === type);
}