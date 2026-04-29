# AI Stack Lab — Feature Upgrade Plan

## Goal

Upgrade AI Stack Lab from a simple AI tools directory into a builder-focused AI workflow and stack platform.

The product should feel like:

> A practical AI operating system for builders, founders, and developers.

Not just:

> Another AI tools directory.

---

# Agent Instructions

Before making changes:

1. Read `PLAN.md`.
2. Read this file fully.
3. Check current implementation.
4. Do not rewrite the whole app.
5. Continue from existing UI and component structure.
6. Preserve current data and working routes.
7. Add features step by step.
8. Keep UI clean, premium, and consistent.
9. Update this file after completing each phase.
10. Avoid duplicate components.

---

# Priority Feature Roadmap

## Foundational Requirements (Carry Forward from PLAN.md)

- Keep core stack unchanged: Next.js 15 App Router, TypeScript, Tailwind CSS, SQLite, Prisma, Docker.
- Keep database path unchanged: `/app/data/app.db`.
- No Supabase and no external managed DB.
- Preserve existing working routes and data flows; avoid rewrites.
- Prefer reusable components and avoid duplicate component creation.
- Keep app responsive with consistent premium UI language.
- Keep TypeScript strict (avoid `any` unless unavoidable).
- Keep Prisma/data access in reusable `lib/db/*` functions where practical.
- After each phase, verify:
  - `npm run build` succeeds
  - no TypeScript errors
  - existing tool pages and newsletter flow still work
  - no broken links/regressions in header navigation

## Phase A — My AI Stack Page

### Goal

Create a personal, authority-building page that shows the AI tools I actually use.

Route:

```txt
/stack
```

Page title:

My AI Stack

Hero copy:

The AI tools and workflows I use to build, test, write, automate, and ship faster.

Sections:

1. Current Coding Stack

Show cards for:

Codex
Claude
Cursor
ChatGPT
GitHub Copilot

Each card should include:

Tool name
Role in my workflow
When I use it
Strength
Limitation

Example:

Codex
Role: Full app generation and large refactors
When I use it: When I have a clear PLAN.md or AGENTS.md
Strength: Great for structured execution
Limitation: Needs strong upfront architecture
2. Research and Planning Stack

Tools:

Perplexity
ChatGPT
Claude
NotebookLM
3. Content and Design Stack

Tools:

Canva
Midjourney
Ideogram
Gamma
4. Automation Stack

Tools:

n8n
Make
Zapier
5. My AI Build Workflow

Create a visual step flow:

Idea → Research → Architecture → Prompt Spec → Code Generation → Review → Deploy

Each step should show which tool is used.

UI Requirements
Premium card layout
Clean sections
Good spacing
Responsive
CTA to tools directory
CTA to newsletter
Phase B — Workflow Pages
Goal

Add practical workflow pages that explain how to use AI tools together.

Routes:

/workflows
/workflows/build-mvp-with-ai
/workflows/ai-coding-setup
/workflows/content-automation
Workflows List Page

Show workflow cards:

Build an MVP with AI
AI Coding Setup
Content Automation System

Each card should include:

Title
Short description
Difficulty
Tools used
Estimated setup time
Workflow Detail Page Structure

Each workflow page should include:

Hero section
Who this is for
Tools needed
Step-by-step process
Common mistakes
Recommended stack
CTA to newsletter
Workflow 1: Build an MVP with AI

Content direction:

Use ChatGPT or Claude to clarify the idea.
Use Claude to create the product plan.
Use Codex to generate the app from PLAN.md.
Use Cursor to polish and debug.
Use Vercel or Docker to deploy.
Workflow 2: AI Coding Setup

Content direction:

Use Claude for architecture.
Use Codex for implementation.
Use Cursor for editing and debugging.
Use GitHub for version control.
Use Docker for repeatable deployment.
Workflow 3: Content Automation System

Content direction:

Use ChatGPT for idea generation.
Use Claude for editing.
Use Canva for design.
Use n8n for automation.
Use newsletter capture for audience building.
UI Requirements
Guide-style layout
Clean typography
Step cards
Tool badges
CTA blocks
Phase C — Better Comparison Pages
Goal

Make comparison pages useful and SEO-friendly.

Routes:

/compare
/compare/cursor-vs-codex
/compare/chatgpt-vs-claude
/compare/claude-vs-gemini
Compare Landing Page

Show popular comparisons:

Cursor vs Codex
ChatGPT vs Claude
Claude vs Gemini
Midjourney vs Ideogram
n8n vs Make
Comparison Detail Page Structure

Each page should include:

Title
Short verdict
Best for table
Pricing comparison
Strengths
Weaknesses
Real use cases
Final recommendation
Example Verdict
Use Codex when you have a clear product plan and want structured execution.
Use Cursor when you want fast codebase editing, debugging, and daily development flow.
UI Requirements
Comparison table
Verdict card
Use-case cards
CTA to related tools
Phase D — Use Case Search
Goal

Allow users to discover tools based on what they want to do.

Route:

/use-cases

Use cases:

Build an app
Write content
Create reels
Automate business
Research faster
Design visuals
Generate videos
Improve coding workflow

Each use case should show:

Recommended tools
Best beginner option
Best advanced option
Best free option
Suggested workflow
UI Requirements
Use case cards
Filter by goal
Tool recommendation sections
CTA to workflow pages
Phase E — Builder Score System
Goal

Replace random ratings with a structured scoring system.

Add fields to Tool model later:

easeOfUseScore
outputQualityScore
speedScore
pricingScore
stabilityScore
builderScore

For now, if database migration is too much, calculate scores from static values or add optional fields.

Score Formula
Builder Score = average of:
- Ease of use
- Output quality
- Speed
- Pricing value
- Stability
Tool Detail Page Additions

Show:

Builder Score
Ease of Use
Output Quality
Speed
Pricing Value
Stability
UI Requirements
Score bars
Compact rating card
Clear explanation
Phase F — Newsletter Lead Magnet
Goal

Make newsletter signup more valuable.

Current newsletter:

Weekly Builder Brief
Get practical AI stack updates, tested workflows, and honest tool picks.

Upgrade CTA:

Get the Free AI Builder Starter Pack

Include:

My AI coding stack
Best tools by use case
3 practical AI workflows
Prompt/spec templates
Weekly updates

Newsletter success message:

You're in. I’ll send you the AI Builder Starter Pack and weekly practical AI stack updates.

Add this copy near newsletter form:

Join builders getting practical AI workflows, stack updates, and honest tool picks without hype.
Phase G — Tag System
Goal

Improve filtering and discovery.

Add tags:

beginner
advanced
free
freemium
paid
developer
creator
founder
no-code
automation
research
coding
design
video
writing
productivity
experimental

Tool cards should show 2-3 tags max.

Tool detail pages should show all tags.

Phase H — Trending and Featured Sections
Goal

Make the site feel actively curated.

Add homepage sections:

Trending This Week
Recently Added
Most Useful for Builders

For now, use manual flags in data/database:

isTrending
isRecentlyAdded
isBuilderPick

Later these can become real analytics.

Navigation Updates

Add nav links:

Tools
Stack
Workflows
Compare
Use Cases
Guides

Keep header clean. If space is tight on mobile, use a menu.

Data Updates

If using static data, extend tool records with optional fields:

type Tool = {
  id: string
  name: string
  slug: string
  category: string
  pricingType: string
  startingPrice?: string
  rating: number
  shortDescription: string
  longDescription: string
  bestFor: string
  pros: string[]
  cons: string[]
  useCases: string[]
  tags: string[]
  websiteUrl?: string
  affiliateUrl?: string
  isEditorsPick?: boolean
  isHot?: boolean
  isTrending?: boolean
  isRecentlyAdded?: boolean
  isBuilderPick?: boolean
  easeOfUseScore?: number
  outputQualityScore?: number
  speedScore?: number
  pricingScore?: number
  stabilityScore?: number
  builderScore?: number
}

If using Prisma, update model carefully and run migration.

Do not break existing seed data.

Suggested Execution Order
Step 1

Add /stack page.

Step 2

Add /workflows and 3 workflow detail pages.

Step 3

Improve /compare and add static comparison detail pages.

Step 4

Add /use-cases.

Step 5

Add Builder Score UI.

Step 6

Upgrade newsletter copy and CTA.

Step 7

Add tags and trending sections.

Quality Checklist

Before marking complete:

App builds successfully
No TypeScript errors
Mobile responsive
Header navigation works
Existing tool pages still work
Existing newsletter form still works
UI remains consistent
No duplicate routes
No broken links
Data remains easy to maintain
Progress Log
Phase A — My AI Stack Page

Status: Completed

Notes:
- Added `/stack` page with:
  - Current Coding Stack
  - Research and Planning Stack
  - Content and Design Stack
  - Automation Stack
  - My AI Build Workflow step flow
- Added `Stack` nav link in header.
- Added newsletter section anchor on home (`/#newsletter`) and linked CTA from `/stack`.
- Reused existing premium card styles and button components for UI consistency.

Phase B — Workflow Pages

Status: Completed

Notes:
- Added `/workflows` list page with:
  - Build an MVP with AI
  - AI Coding Setup
  - Content Automation System
- Added workflow detail routes:
  - `/workflows/build-mvp-with-ai`
  - `/workflows/ai-coding-setup`
  - `/workflows/content-automation`
- Added workflow navigation link in header and footer.
- Included guide-style sections:
  - Who this is for
  - Tools needed
  - Step-by-step process
  - Common mistakes
  - CTA blocks

Phase C — Better Comparison Pages

Status: Not started

Notes:

Phase D — Use Case Search

Status: Not started

Notes:

Phase E — Builder Score System

Status: Not started

Notes:

Phase F — Newsletter Lead Magnet

Status: Not started

Notes:

Phase G — Tag System

Status: Not started

Notes:

Phase H — Trending and Featured Sections

Status: Not started

Notes:
