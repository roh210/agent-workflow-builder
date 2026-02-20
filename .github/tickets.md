Phase 5: Execution API

AWB-018: Create Execution API Routes
FieldValueTypeFeaturePriorityP0 - CriticalStory Points2SprintPhase 5 - Execution APIAssigneeRoheenaLabelsapi, execution, backendBlocked ByAWB-013
Description
Create API endpoints to trigger workflow execution and check execution status.
User Story

As a user, I want to run my workflow and check its progress.

Acceptance Criteria
POST /api/workflows/[id]/execute

 Validates workflow exists and has nodes
 Creates Execution record with PENDING status
 Triggers async execution (non-blocking)
 Returns 202 with executionId immediately
 Returns 400 if workflow has no nodes
 Returns 404 if workflow not found

GET /api/executions/[id]

 Returns execution status
 Includes currentNodeId (which node is running)
 Includes error message if failed
 Includes node outputs for completed nodes
 Returns 404 if execution not found

Definition of Done

 Both endpoints working
 Async execution doesn't block response
 Status tracking works
 Tested with postman