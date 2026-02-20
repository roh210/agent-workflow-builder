import { prisma } from "@/lib/db/prisma";
import { handleApiError } from "@/lib/utils/api-error";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) => {
  const { id } = await context.params;
  try {
    const execution = await prisma.execution.findUnique({
      where: { id },
    });
    if (!execution) {
      return NextResponse.json(
        { error: "Execution not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      status: execution.status,
      progress: {
        completedNodes: execution.completedNodes,
        totalNodes: execution.totalNodes,
        currentNodeId: execution.currentNodeId,
      },
      result: execution.result,
      error: execution.error,
    });
  } catch (error) {
    return handleApiError(error, "getExecutionStatus");
  }
};
