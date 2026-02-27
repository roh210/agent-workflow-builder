import { WorkflowEdge } from "@/types";

  export const topologicalSort = (nodeIds:string[], edges: Pick<WorkflowEdge, "source" | "target">[]): string[] => {
     const adjacencyList: Record<string, string[]> = {};
    const inDegree: Record<string, number> = {};
     nodeIds.forEach((node) => {
    adjacencyList[node] = [];
    inDegree[node] = 0;
  });
  edges.forEach((edge) => {
    adjacencyList[edge.source].push(edge.target);
  });

 edges.forEach((edge)=>{
    inDegree[edge.target]++ ;
 })
 const queue: string[] = nodeIds.filter(id => inDegree[id] === 0)
 const result: string[] = []

 while(queue.length !==0 ){
    let node = queue.shift()  as string 
     result.push(node)
    for(let nei of adjacencyList[node]){
        inDegree[nei]--
        if(inDegree[nei] === 0){
            queue.push(nei)
        }
    }
 }
 if(result.length !==nodeIds.length){
    throw new Error("Cycle detected: workflow contains a circular dependency")
 }
 return result
  }