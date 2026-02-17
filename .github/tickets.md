AWB-016: Create Workflow Header Component
FieldValueTypeFeaturePriorityP1 - HighStory Points2SprintPhase 4 - Workflow PersistenceAssigneeRoheenaLabelsheader, ui, frontendBlocked ByAWB-015
Description
Create the header component for the workflow editor showing workflow name, save status, and run button.
User Story

As a user, I want to see and edit my workflow name and know when my changes are saved.

Acceptance Criteria

 Header displays at top of editor page
 Back button/link returns to workflow list
 Workflow name is editable inline
 Name changes update Zustand store
 Save status indicator shows (idle/saving/saved/error)
 Run button triggers workflow execution
 Run button disabled while execution in progress
 Shows execution status (completed/failed)

Definition of Done

 Header component created
 All elements functional
 Integrated with auto-save and execution hooks