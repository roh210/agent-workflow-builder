import { WorkflowEdge } from "@/types";
import { topologicalSort } from "./topological-sort";

describe("topologicalSort", () => {
    it("should return single node",() =>{
        const nodeIds = ["node1"]
        const edges :  Pick<WorkflowEdge, "source" | "target">[] = []
        expect(topologicalSort(nodeIds,edges)).toEqual(["node1"])
    })
    it("should return empty array for no nodes",() =>{
        const nodeIds : string[] = []
        const edges :  Pick<WorkflowEdge, "source" | "target">[] = []
        expect(topologicalSort(nodeIds,edges)).toEqual([])
    })
    it("should throw error for cycle detection",() =>{
        const nodeIds = ["node1","node2"]
        const edges :  Pick<WorkflowEdge, "source" | "target">[] = [
            {source:"node1", target:"node2"},
            {source:"node2", target:"node1"}
        ]
        expect(() => topologicalSort(nodeIds,edges)).toThrow("Cycle detected: workflow contains a circular dependency")
    })
    it("it should return correct topological order for a diamond shape graph",() =>{
        const nodeIds = ["node1","node2","node3","node4"]
        const edges :  Pick<WorkflowEdge, "source" | "target">[] = [{source:"node1", target:"node2"},{source:"node1", target:"node3"}, {source:"node2", target:"node4"},{source:"node3", target:"node4"}]
        const result = topologicalSort(nodeIds,edges)
        expect(result.indexOf("node1")).toBeLessThan(result.indexOf("node2"))
        expect(result.indexOf("node1")).toBeLessThan(result.indexOf("node3"))
        expect(result.indexOf("node2")).toBeLessThan(result.indexOf("node4"))
        expect(result.indexOf("node3")).toBeLessThan(result.indexOf("node4"))
    })
    it("it should return correct topological order for a linear graph", () =>{
        const nodeIds = ["node1", "node2", "node3"]
        const edges : Pick<WorkflowEdge , "source" | "target">[] = [{source:"node1", target:"node2"}, {source:"node2", target:"node3"}]
        const result = topologicalSort(nodeIds,edges)
        expect(result).toEqual(["node1","node2","node3"])
    })
    it("it should return all dependencies first for parallel branches", () =>{
        const nodeIds = ["node1", "node2", "node3", "node4"]
        const edges : Pick<WorkflowEdge , "source" | "target">[] = [{source:"node1", target:"node3"}, {source:"node2", target:"node3"}, {source:"node3", target:"node4"}]
        const result = topologicalSort(nodeIds,edges)
        expect(result.length).toBe(4)
        expect(result.indexOf("node1")).toBeLessThan(result.indexOf("node3"))
        expect(result.indexOf("node2")).toBeLessThan(result.indexOf("node3"))
        expect(result.indexOf("node3")).toBeLessThan(result.indexOf("node4"))       
    })
});