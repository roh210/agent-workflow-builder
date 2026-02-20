import { prisma } from "@/lib/db/prisma";
import { handleApiError } from "@/lib/utils/api-error";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) => {
  const { id } = await context.params;
  try {
    //  find the workflow by id
    const workflow = await prisma.workflow.findUnique({
      where: { id },
      include: {
        nodes: true,
      },
    });

    if (!workflow) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 },
      );
    }
    if (workflow.nodes.length === 0) {
      return NextResponse.json(
        { error: "Workflow has no nodes to execute" },
        { status: 400 },
      );
    }
    const execution = await prisma.execution.create({
      data: {
        workflowId: id,
        totalNodes: workflow.nodes.length,
      },
    });
    // TODO: fire async execution non-blocking

    return NextResponse.json({ executionId: execution.id , status: execution.status}, { status: 202 });
  } catch (error) {
    return handleApiError(error, "executeWorkflow");
  }
};
