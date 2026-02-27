import { prisma } from "@/lib/db/prisma";
import { handleApiError } from "@/lib/utils/api-error";
import { CreateWorkflowSchema } from "@/lib/validation/workflow-schemas";
import {apiEdgeToDbEdge, apiNodeToDbNode, dbWorkflowToDetail } from "@/modules/workflows/workflow.transformer";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) => {
  const { id } = await context.params;
  try {
    await prisma.workflow.delete({
      where: {
        id,
      },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error, "deleteWorkflow");
  }
};

export const GET = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) => {
  const { id } = await context.params;
  try {
    const workflow = await prisma.workflow.findUnique({
      where: { id },
      include: {
        nodes: true,
        edges: true,
      },
    });
    if (!workflow) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ workflow: dbWorkflowToDetail(workflow) });
  } catch (error) {
    return handleApiError(error, "getWorkflow");
  }
};

export const PUT = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) => {
  const { id } = await context.params;
  try {
    const body = await request.json();
    if (!body.nodes || !body.edges) {
      return NextResponse.json(
        { error: "Nodes and edges are required" },
        { status: 400 },
      );
    }
    const validated = CreateWorkflowSchema.parse(body);
    const workflow = await prisma.$transaction(async (prisma) => {
      await prisma.edge.deleteMany({
        where: { workflowId: id },
      });
      await prisma.node.deleteMany({
        where: { workflowId: id },
      });

      return await prisma.workflow.update({
        where: { id },
        data: {
          name: validated.name,
          description: validated.description,
          nodes: {
           create: body.nodes.map(apiNodeToDbNode),
          },
          edges: {
            create: body.edges.map(apiEdgeToDbEdge),
          },
        },
        include: {
          nodes: true,
          edges: true,
        },
      });
    });

    return NextResponse.json({ workflow: dbWorkflowToDetail(workflow) });
  } catch (error) {
    return handleApiError(error, "updateWorkflow");
  }
};
