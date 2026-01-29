AWB-001: Configure Environment Variables
Type: Task
Priority: P0 - Blocker
Story Points: 1
Sprint: Phase 0 - Setup
Assignee: Roheena
Description
Set up all required environment variables and API keys needed for the application to run.
Acceptance Criteria

 OpenAI API key is configured and valid
 PostgreSQL database URL is configured
 Application starts without environment errors
 API key has sufficient credits/quota

Technical Details
Files to modify:

.env.local

Environment variables needed:
bashDATABASE_URL="postgresql://username:password@host:5432/agent_workflow_builder"
OPENAI_API_KEY="sk-..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
Steps:

Go to https://platform.openai.com/api-keys
Create new API key, copy it
Go to https://neon.tech (or Supabase)
Create new project → copy connection string
Create .env.local in project root
Add all three variables
Verify: npm run dev starts without errors

Resources

OpenAI API Keys
Neon PostgreSQL
Supabase

Definition of Done

 .env.local created with all variables
 npm run dev runs without environment errors
 Sensitive keys not committed to git (check .gitignore)