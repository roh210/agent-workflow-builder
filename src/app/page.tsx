import Image from "next/image";
import { WorkflowCanvas } from "./components/canvas/WorkflowCanvas";
import { NodeSideBar } from "./components/panels/NodeSideBar";

export default function Home() {
  return (
    <div className="h-screen w-full flex">
      <NodeSideBar/>
      <div className="flex-1">
      <WorkflowCanvas/>
     </div>
    </div>
  );
}
