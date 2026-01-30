import Image from "next/image";
import { WorkflowCanvas } from "./components/canvas/WorkflowCanvas";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <WorkflowCanvas />
    </div>
  );
}
