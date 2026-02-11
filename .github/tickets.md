AWB-014: Create Workflow List Page
FieldValueTypeFeaturePriorityP0 - CriticalStory Points2SprintPhase 4 - Workflow PersistenceAssigneeRoheenaLabelspage, ui, frontendBlocked ByAWB-013
Description
Create the landing page that displays all workflows and allows users to create new ones or open existing ones.
User Story

As a user, I want to see all my workflows so I can choose which one to edit or create a new one.

Acceptance Criteria

 Page loads at root URL (/)
 Fetches and displays list of workflows from API
 Shows workflow name, node count, last updated date
 "New Workflow" button creates workflow via POST and navigates to editor
 Clicking a workflow navigates to /workflow/[id]
 Delete button removes workflow (with confirmation)
 Empty state message when no workflows exist
 Loading state while fetching
 Error handling if fetch fails

Definition of Done

 List page is the root page
 CRUD operations work correctly
 Navigation to editor works
 Responsive layout

