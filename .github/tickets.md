AWB-002: Initialize Database Schema
Type: Task
Priority: P0 - Blocker
Story Points: 1
Sprint: Phase 0 - Setup
Assignee: Roheena
Blocked By: AWB-001
Description
Generate Prisma client and push database schema to create all required tables.
Acceptance Criteria

 Prisma client is generated without errors
 All 4 tables exist in database (Workflow, Node, Edge, Execution)
 Foreign key relationships are correct
 Indexes are created

Technical Details
Files involved:

prisma/schema.prisma (already created)
src/lib/db/prisma.ts (already created)

Commands to run:
bash# Generate Prisma client (creates types)
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Optional: Open Prisma Studio to verify
npx prisma studio
Expected tables:
TablePurposeWorkflowStores workflow metadata (name, status)NodeStores nodes with config (JSONB) and output (JSONB)EdgeStores connections between nodesExecutionTracks async execution progress
Verification:

Run npx prisma studio
Verify all 4 tables appear
Check that columns match schema

Error Handling

If db push fails with connection error → check DATABASE_URL
If permission error → check database user has CREATE privileges

Definition of Done

 npx prisma generate completes successfully
 npx prisma db push completes successfully
 All 4 tables visible in Prisma Studio
 No TypeScript errors when importing from @prisma/client