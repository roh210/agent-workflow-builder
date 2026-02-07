import { prisma } from "@/lib/db/prisma";
import { handleApiError } from "@/lib/utils/api-error";
import { CreateWorkflowSchema } from "@/lib/validation/workflow-schemas";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validated = CreateWorkflowSchema.parse(body);
    const workflow = await prisma.workflow.create({
      data: {
        name: validated.name,
        description: validated.description,
      },
    });
    return NextResponse.json(workflow, { status: 201 });
  } catch (error) {
    return handleApiError(error, "createWorkflow");
  }
};

export const GET = async (request: NextRequest) => {
  const pageNum = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const limitNum = parseInt(request.nextUrl.searchParams.get("limit") || "10");
  const skipPages = (pageNum - 1) * limitNum;
  try {
    const [totalCount, workflows] = await Promise.all([
      prisma.workflow.count(),
      prisma.workflow.findMany({
        skip: skipPages,
        take: limitNum,
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          id: true,
          name: true,
          status: true,
          description: true,
        },
      }),
    ]);
    return NextResponse.json(
      {
        workflows: workflows,
        pagination: {
          total: totalCount,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalCount / limitNum),
        },
      },
    );
  } catch (error) {
   return handleApiError(error, "getWorkflows");
  }
};
