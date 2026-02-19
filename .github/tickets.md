AWB-017: Implement Auto-Save Functionality
FieldValueTypeFeaturePriorityP1 - HighStory Points2SprintPhase 4 - Workflow PersistenceAssigneeRoheenaLabelsauto-save, hooks, frontendBlocked ByAWB-016
Description
Implement auto-save that automatically persists workflow changes to the database after a debounced delay.
User Story

As a user, I want my changes automatically saved so I don't lose work.

Acceptance Criteria

 Changes to nodes/edges/name trigger auto-save
 Save is debounced (2 second delay)
 Multiple rapid changes only trigger one save
 Save calls PUT /api/workflows/[id]
 Status updates: idle → saving → saved → idle
 Error status shown if save fails
 Does not save on initial load (only on changes)
 Cleanup on component unmount

Definition of Done

 useAutoSave hook created
 SaveIndicator component created
 Integrated with WorkflowHeader
 Debounce working correctly