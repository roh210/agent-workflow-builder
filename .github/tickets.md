Phase 7: Execution Engine

AWB-020: Create Topological Sort Utility
FieldValueTypeFeaturePriorityP0 - CriticalStory Points2SprintPhase 7 - Execution EngineAssigneeRoheenaLabelsexecution, algorithm, backendBlocked ByAWB-019
Description
Implement topological sorting to determine the correct execution order of nodes based on their dependencies.
User Story

As a developer, I need nodes to execute in the right order so data flows correctly.

Acceptance Criteria

 Implement Kahn's algorithm for topological sort
 Input: array of node IDs, array of edges
 Output: array of node IDs in execution order
 Nodes with no dependencies execute first
 Handles multiple starting nodes (parallel inputs)
 Throws error if cycle detected
 Unit tests cover various graph shapes

Definition of Done

 Function created and exported
 All unit tests pass
 Handles edge cases (single node, parallel branches)