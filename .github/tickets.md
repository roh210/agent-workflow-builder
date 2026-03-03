AWB-021: Create Execution Engine Core
FieldValueTypeFeaturePriorityP0 - CriticalStory Points5SprintPhase 7 - Execution EngineAssigneeRoheenaLabelsexecution, engine, backendBlocked ByAWB-020
Description
Create the core execution engine that orchestrates running workflow nodes in the correct order.
User Story

As a user, I want my workflow to execute and pass data between nodes automatically.

Acceptance Criteria

 Gets execution order from topological sort
 Iterates through nodes in order
 For each node: updates status to RUNNING in DB
 For each node: gathers inputs from upstream node outputs
 For each node: calls appropriate executor
 For each node: stores output in DB
 For each node: updates status to SUCCESS
 Updates Execution record with currentNodeId
 On completion: marks Execution as COMPLETED
 On error: marks node as ERROR, Execution as FAILED
 Stores error message for debugging

Definition of Done

 Engine function created
 Executes nodes in correct order
 Status updates work
 Error handling works
 Outputs stored correctly