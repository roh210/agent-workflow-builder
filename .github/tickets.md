AWB-012: Create Workflow CRUD API Routes
Type: Feature
Priority: P0 - Critical
Story Points: 3
Sprint: Phase 4 - API Routes
Assignee: Roheena
Blocked By: AWB-002
Description
Create Next.js API routes for creating, reading, updating, and deleting workflows. These routes persist workflow data to PostgreSQL via Prisma.
User Story

As a user, I want my workflows to be saved so I can close the browser and return to them later.

Acceptance Criteria

 POST /api/workflows - Creates new workflow, returns workflow with ID
 GET /api/workflows - Lists all workflows (paginated)
 GET /api/workflows/[id] - Returns single workflow with nodes and edges
 PUT /api/workflows/[id] - Updates workflow (full replacement)
 DELETE /api/workflows/[id] - Deletes workflow and all associated nodes/edges
 All routes return proper HTTP status codes
 All routes handle errors gracefully

Technical Details
Files to create:
src/app/api/workflows/
├── route.ts              # GET (list), POST (create)
└── [id]/
    └── route.ts          # GET, PUT, DELETE
POST /api/workflows (route.ts):
typescriptimport { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const CreateWorkflowSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateWorkflowSchema.parse(body);

    const workflow = await prisma.workflow.create({
      data: {
        name: validated.name,
        description: validated.description,
        status: 'DRAFT',
      },
    });

    return NextResponse.json(workflow, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Create workflow error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [workflows, total] = await Promise.all([
      prisma.workflow.findMany({
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { nodes: true } },
        },
      }),
      prisma.workflow.count(),
    ]);

    return NextResponse.json({
      workflows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('List workflows error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
GET/PUT/DELETE /api/workflows/[id] (route.ts):
typescriptimport { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const workflow = await prisma.workflow.findUnique({
      where: { id: params.id },
      include: {
        nodes: true,
        edges: true,
      },
    });

    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(workflow);
  } catch (error) {
    console.error('Get workflow error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();
    
    // Transaction: update workflow, replace nodes and edges
    const workflow = await prisma.$transaction(async (tx) => {
      // Delete existing nodes and edges
      await tx.edge.deleteMany({ where: { workflowId: params.id } });
      await tx.node.deleteMany({ where: { workflowId: params.id } });

      // Update workflow with new nodes and edges
      return tx.workflow.update({
        where: { id: params.id },
        data: {
          name: body.name,
          description: body.description,
          status: body.status,
          nodes: {
            create: body.nodes?.map((node: any) => ({
              id: node.id,
              type: node.type,
              label: node.label,
              positionX: node.position.x,
              positionY: node.position.y,
              config: node.config,
            })),
          },
          edges: {
            create: body.edges?.map((edge: any) => ({
              id: edge.id,
              sourceNodeId: edge.source,
              targetNodeId: edge.target,
              sourceHandle: edge.sourceHandle,
              targetHandle: edge.targetHandle,
            })),
          },
        },
        include: {
          nodes: true,
          edges: true,
        },
      });
    });

    return NextResponse.json(workflow);
  } catch (error) {
    console.error('Update workflow error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.workflow.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Delete workflow error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
Testing
bash# Create workflow
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d '{"name": "My First Workflow"}'

# List workflows
curl http://localhost:3000/api/workflows

# Get single workflow
curl http://localhost:3000/api/workflows/{id}

# Delete workflow
curl -X DELETE http://localhost:3000/api/workflows/{id}
Definition of Done

 All 5 endpoints working
 Proper error handling with status codes
 Transactions used for complex updates
 Tested with curl or Postman
 Commit: feat: add workflow CRUD API routes