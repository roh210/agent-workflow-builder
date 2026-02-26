Phase 6: Edge Validation

AWB-019: Implement Edge Validation Rules
FieldValueTypeFeaturePriorityP1 - HighStory Points3SprintPhase 6 - Edge ValidationAssigneeRoheenaLabelsvalidation, canvas, logicBlocked ByAWB-010
Description
Implement validation rules for node connections to prevent invalid workflows.
User Story

As a user, I want the system to prevent invalid connections so my workflows always work.

Acceptance Criteria

 Prevent self-connections (node connecting to itself)
 Prevent duplicate edges (same source→target)
 Validate type compatibility (define which nodes can connect)
 Detect and prevent cycles (no circular dependencies)
 Show error toast/notification explaining why connection is invalid
 Invalid drop targets could show visual feedback (stretch)

Technical Notes

Type compatibility matrix needed (which nodes can connect to which)
Cycle detection using DFS algorithm
Integration with canvas onConnect handler

Definition of Done

 All 4 validation rules working
 User feedback on invalid connections
 Unit tests for validation logic
 Commit: feat: add edge validation