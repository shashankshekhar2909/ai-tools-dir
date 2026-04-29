# AI Stack Lab — Complete Development Plan

## Project Goal

Build a polished AI tools directory called **AI Stack Lab** under the BuildWithShashank brand.

Positioning:

> Tested AI tools, workflows, and stacks for people who actually ship.

This should not look like a random AI tools list. It should feel like a serious builder-focused platform with clean UI, useful comparisons, practical reviews, and future monetization through affiliate links, newsletter, and guides.

---

# Core Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- SQLite
- Prisma ORM
- Docker + Docker Compose
- Server-hosted deployment
- No Supabase
- No external managed DB

Database path:

```txt
/app/data/app.db
```

## Important Agent Instructions

### Maintain Continuity

Before making any change:

- Read this file fully.
- Check existing folder structure.
- Do not rewrite working code unnecessarily.
- Continue from the current implementation state.
- Preserve existing design language and naming.
- Keep components reusable and clean.
- Keep pages visually consistent.
- Update this plan when a phase is completed.
- Add notes under Progress Log.
- Never create duplicate components if an existing one can be reused.

### UI Quality Rules

The app should have:

- Clean premium SaaS look
- Neat spacing
- Consistent card design
- Responsive mobile/tablet/desktop views
- Sticky header
- Clear search and filters
- No clutter
- No cheap clone feel
- Good empty states
- Clear CTA buttons
- Consistent typography

### Code Quality Rules

- Use TypeScript properly
- Avoid `any` unless unavoidable
- Keep data fetching clean
- Keep Prisma queries in reusable functions
- Use reusable components
- Keep route files readable
- Avoid large messy files
- Add comments only where useful
- Keep environment variables documented

## Phase 1 — Static MVP Foundation

### Goal

Create a polished frontend using static seed-like data first.

### Pages

#### 1. Home Page

Sections:

- Hero section
- Search bar
- Stats:
- Tools reviewed
- Categories
- Free tools
- Category cards
- Editor’s choice
- Latest guides
- Editor picks
- Newsletter section
- Footer

#### 2. Tools Listing Page

Features:

- Search input
- Category filter
- Pricing filter
- Tool cards
- Empty state

#### 3. Tool Detail Page

Each tool page should show:

- Tool name
- Category
- Rating
- Pricing
- Short description
- Long description
- Best for
- Pros
- Cons
- Use cases
- Tags
- Alternatives
- CTA button
- Affiliate disclosure placeholder

#### 4. Category Page

Show:

- Category title
- Description
- Tools in category

#### 5. Compare Page

Basic comparison:

- Select two tools
- Compare pricing, rating, best for, pros, cons

#### 6. Blog Page

Show guide cards.

#### 7. Admin Placeholder

Simple page saying:

- Add tools
- Edit tools
- Add guides
- Manage newsletter
- Coming soon

### Phase 1 Output

- Fully responsive UI
- Static data working
- Clean layout
- Good visual polish

## Phase 2 — SQLite + Prisma Integration

### Goal

Move data from static JSON to SQLite using Prisma.

### Prisma Models

Create:

```prisma
model Tool {
  id               String   @id @default(cuid())
  name             String
  slug             String   @unique
  categoryId       String
  pricingType      String
  startingPrice    String?
  rating           Float
  shortDescription String
  longDescription  String
  bestFor          String
  pros             String
  cons             String
  useCases         String
  tags             String
  websiteUrl       String?
  affiliateUrl     String?
  isEditorsPick    Boolean  @default(false)
  isHot            Boolean  @default(false)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  category Category @relation(fields: [categoryId], references: [id])
}

model Category {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  tools       Tool[]
}

model Guide {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String
  readingTime String
  type        String
  publishedAt DateTime
  createdAt   DateTime @default(now())
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

### Seed Data

Seed at least 24 tools:

- ChatGPT
- Claude
- Gemini
- Perplexity
- Cursor
- GitHub Copilot
- Codex
- Claude Code
- Midjourney
- Ideogram
- Runway
- PixVerse
- ElevenLabs
- Descript
- NotebookLM
- Gamma
- Canva
- n8n
- Make
- Zapier
- Lovable
- Bolt
- Replit
- V0

Categories:

- AI Assistants
- Coding
- Design
- Video & Audio
- Research
- Automation
- Business
- Productivity

### Phase 2 Output

- App reads from SQLite
- Prisma client configured
- Seed command works
- Public pages use DB data

## Phase 3 — Docker Deployment

### Goal

Make the app deployable on my own server.

### Required Files

Create:

- Dockerfile
- docker-compose.yml
- .env.example

### Docker Requirements

- App should run on port 3000
- SQLite DB should persist using volume
- Prisma migrations should run safely
- Seed should be possible manually
- App should restart unless stopped

Example service:

```yaml
services:
  ai-stack-lab:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    env_file:
      - .env
    restart: unless-stopped
```

### Phase 3 Output

- Docker build works
- Docker Compose works
- SQLite persists after restart
- App runs on server

## Phase 4 — Admin Panel

### Goal

Create a simple internal admin system.

### Admin Features

- Login page
- Tool list
- Add tool
- Edit tool
- Delete tool
- Add category
- Add guide
- Newsletter subscriber list

### Auth

Keep it simple:

- Email + password
- Password hashed
- Cookie session
- Protected admin routes

Do not over-engineer auth.

### Phase 4 Output

- Admin can manage tools
- Admin can manage guides
- Admin routes protected

## Phase 5 — Search and Filters

### Goal

Make the directory useful.

### Features

- Full text search over:
- Tool name
- Description
- Tags
- Category
- Category filters
- Pricing filters
- Rating filter
- Editor pick filter
- Hot tools filter

For MVP, use SQLite search. Later we can add Typesense.

### Phase 5 Output

- Search feels fast
- Filters work cleanly
- URL query params supported

## Phase 6 — Comparison System

### Goal

Make comparison pages SEO-worthy.

### Features

- Compare any two tools
- Dedicated comparison URLs:
- `/compare/chatgpt-vs-claude`
- `/compare/cursor-vs-codex`

Each comparison should show:

- Who should use which
- Pricing
- Strengths
- Weaknesses
- Best use cases
- Final verdict

### Phase 6 Output

- Useful comparison pages
- SEO-ready URL structure

## Phase 7 — Guides and Content Engine

### Goal

Turn the site into a content asset.

### Guide Types

- Starter packs
- Comparisons
- Tool reviews
- Workflow guides
- Founder stacks
- Coding stacks

Example guides:

- Best AI Tools for Solo Founders
- Cursor vs Codex: Which Should Developers Use?
- My AI Coding Stack for Shipping Faster
- Best Free AI Tools for Creators
- AI Tools I Actually Use as a Developer

### Phase 7 Output

- Guide detail pages
- Markdown or DB-based guide content
- SEO metadata

## Phase 8 — Newsletter and Monetization

### Goal

Start building audience and income.

### Features

- Newsletter subscribe form
- Save email to SQLite
- Affiliate link field
- Affiliate disclosure on tool pages
- Sponsored tool label support

### Phase 8 Output

- Email capture works
- Affiliate-ready pages
- Monetization structure ready

## Phase 9 — Polish and Public Launch

### Goal

Make it presentable for X, LinkedIn, recruiters, and brands.

### Final Polish

- Add OpenGraph images
- Add favicon
- Add metadata
- Add sitemap
- Add robots.txt
- Add loading states
- Add 404 page
- Add proper footer
- Add about page
- Add changelog page

### Launch Positioning

Post idea:

> I built a builder-focused AI tools directory.
>
> Not another random AI tools list.
>
> AI Stack Lab is where I document tools, workflows, and comparisons I would actually use to ship products faster.

### Phase 9 Output

- Public launch-ready site
- Portfolio-worthy project
- Content engine ready

## Future Phase — Typesense Search

Only add this after the MVP has real content.

### Goal

Use Typesense for fast search and filtering.

### Rule

SQLite remains the source of truth.
Typesense is only a search index.

## Progress Log

### Phase 1

Status: Completed

Notes:
- Phase 1 static MVP implemented with Next.js 15 + TypeScript + Tailwind.
- Pages completed: Home, Tools listing, Tool detail, Category, Compare, Blog, Admin placeholder.
- Added reusable static dataset (24 tools, categories, guides), shared layout, header, footer, cards.
- Added responsive filters, empty states, sticky header, and polished SaaS-style UI consistency.
- Verified with successful production build on April 29, 2026.

### Phase 2

Status: Completed

Notes:
- Prisma + SQLite integrated with schema, migration, and seeded records.
- Added reusable DB access modules in lib/db and Prisma client singleton.
- Public pages now read from SQLite instead of static in-memory data.
- Added Prisma scripts: db:generate, db:migrate, db:seed.
- Verified with successful production build on April 29, 2026.

### Phase 3

Status: Completed

Notes:
- Dockerfile, docker-compose.yml, .env.example added and wired.
- Container startup runs Prisma migrate deploy automatically.
- SQLite persistence configured via ./data volume mount.
- App verified running on fixed host port 3011 on April 29, 2026.


### Phase 4

Status: Completed

Notes:
- Added admin login with email/password and cookie session.
- Protected admin routes with server-side guard.
- Implemented tool CRUD pages (list, add, edit, delete).
- Implemented category add/list and guide add/delete.
- Added newsletter subscriber listing page.
- Added seeded default admin user for immediate access.


### Phase 5

Status: In progress

Notes:
- Added use-case filter support on tools listing and DB query layer.
- Added purpose-driven Help page linking directly to filtered tool results.
- Improved seed categorization with category-aware use cases and tags.


### Phase 6

Status: Not started

Notes:

### Phase 7

Status: In progress

Notes:
- Added DB-backed guide detail pages at /guides/[slug].
- Added richer guide content seed and clickable guide cards.


### Phase 8

Status: Not started

Notes:

### Phase 9

Status: In progress

Notes:
- UI refinement pass #1 completed on April 29, 2026 (Tailwind + Framer Motion — superseded).
- Design system migration to IBM Carbon Design System completed on April 29, 2026.
- Removed @react-three/fiber, @react-three/drei, three, framer-motion (packages had peer dep conflicts with React 18 and fought Carbon's aesthetic).
- Installed @carbon/react, @carbon/styles, @carbon/icons-react, sass.
- Carbon theme: g10 (cool light gray) — enterprise default, readable, premium SaaS feel.
- Wired globals.scss with Carbon SCSS import; removed Tailwind globals.css.
- Added transpilePackages + sassOptions to next.config.ts for Carbon compatibility.
- Rebuilt Header: Carbon Header, HeaderName, HeaderNavigation, HeaderMenuItem, HeaderGlobalBar with @carbon/icons-react icons.
- Rebuilt all public pages (Home, Tools, Tool Detail, Category, Compare, Help, Blog, Guides) using Carbon Grid/Column, Tile, ClickableTile, Breadcrumb, Tag, OrderedList.
- Rebuilt admin pages (Dashboard, Tools CRUD, Categories, Guides, Newsletter, Login) using Carbon form classes and layout.
- Client components (SiteHeader, ToolsFilterBar, CompareClient, ToolCard, GuideCard) marked "use client" per App Router requirements.
- Server components use Carbon CSS class names directly (cds--btn, cds--type-*) to avoid RSC serialization issues with renderIcon.
- All builds verified passing production build on April 29, 2026.
- Premium SaaS redesign completed April 29, 2026.
  - Introduced `app/_premium.scss` with CSS custom property surface token system.
  - Homepage restructured as a narrative with hero-glow, featured tools, my-stack, categories, guides, and newsletter sections.
  - ToolCard, GuideCard, ToolsFilterBar rewritten with premium-card classes and toolbar layout.
  - SiteHeader updated with active-route underline animation and reduced visual weight.
  - All pages given explicit max-width containers (layout.tsx no longer wraps children in a grid).
  - Build verified passing (18/18 pages).
