AWB-015: Create Workflow Editor Page
FieldValueTypeFeaturePriorityP0 - CriticalStory Points3SprintPhase 4 - Workflow PersistenceAssigneeRoheenaLabelspage, editor, frontendBlocked ByAWB-014
Description
Create the workflow editor page with dynamic routing that loads a specific workflow by ID.
User Story

As a user, I want to open a specific workflow and see my previously saved nodes and connections.

Acceptance Criteria

 Page accessible at /workflow/[id]
 Fetches workflow data by ID from API
 Transforms database format to React Flow format
 Loads nodes and edges into Zustand store
 Stores workflowId in store for auto-save
 Shows loading state while fetching
 Shows error state if workflow not found (404)
 "Back" link returns to workflow list
 Resets store when navigating away

Definition of Done

 Dynamic route works
 Workflow loads into canvas
 Error states handled
 Navigation works both ways