import { WorkflowCanvas } from "./components/canvas/WorkflowCanvas";
import { NodeSideBar } from "./components/panels/NodeSideBar";

export default function Home() {
  return (
    <main className="h-screen w-full flex">
      <NodeSideBar/>
      <div className="flex-1">
      <WorkflowCanvas/>
     </div>
    </main>
  );
}
