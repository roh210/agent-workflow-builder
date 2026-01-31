'use client';
import React from "react";
import { NodeType } from "@/types";

const NODE_TYPES = [
    {type: NodeType.DATA_INPUT, label: 'Data Input', icon:'📥'},
    {type: NodeType.WEB_SCRAPING, label: 'Web Scraper', icon:'🌐'},
    {type: NodeType.STRUCTURED_OUTPUT, label: 'Structured Output', icon:'📊'},
    {type: NodeType.EMBEDDING_GENERATOR, label: 'Embeddings', icon:'🧠'},
    {type: NodeType.SIMILARITY_SEARCH, label: 'Similarity Search', icon:'🔍'},
    {type: NodeType.LLM_TASK, label: 'LLM Task', icon:'🤖'},
    {type: NodeType.DATA_OUTPUT, label: 'Output', icon:'📤'}    ,
]

const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
}
export const NodeSideBar: React.FC = () => {
    return(
        <aside className="w-64 h-full border-r">
            <div className="p-4 border-b border-gray-300 font-bold text-lg">
                Nodes
            </div>
            <div className="p-4 space-y-4">
                {NODE_TYPES.map((node) => (
                    <div key={node.type} draggable onDragStart={(event) => onDragStart(event, node.type)} className="flex items-center p-2 border border-gray-300 rounded cursor-grab hover:border-blue-500 shadow-sm active:cursor-grabbing">
                        <span className="text-2xl mr-2">{node.icon}</span>
                        <span>{node.label}</span>
                    </div>
                ))}
            </div>
        </aside>
    )
}