import { WorkflowListItem } from "@/types";

interface WorkflowCardProps extends WorkflowListItem {
  onDelete: (id: string) => void;
}

export const WorkflowCard = ({ onDelete, ...workflow }: WorkflowCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h1>{workflow.id}</h1>
      <h2 className="text-xl font-semibold mb-2">{workflow.name}</h2>
      <p className="text-gray-600">{workflow.description}</p>
      <p className="text-gray-500 text-sm mt-2">
        Nodes: {workflow.nodeCount} | Last Updated:{" "}
        {new Date(workflow.updatedAt).toLocaleDateString()}
      </p>
      <button
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(workflow.id);
        }}
      >
        Delete Workflow
      </button>
    </div>
  );
};
