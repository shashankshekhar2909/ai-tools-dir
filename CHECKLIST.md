# AI Stack Lab — Phase Checklist

## Phase 1: Static MVP Foundation
- [x] Home page sections
- [x] Tools listing with filters
- [x] Tool detail page
- [x] Category page
- [x] Compare page (basic)
- [x] Blog listing page
- [x] Admin placeholder
- [x] Responsive polish and shared UI components

## Phase 2: SQLite + Prisma Integration
- [x] Prisma schema and client
- [x] SQLite datasource configuration
- [x] Migration created and applied
- [x] Seed command working
- [x] Public pages switched to DB-backed data
- [x] Expanded seed data set for broader tool coverage

## Phase 3: Docker Deployment
- [x] Dockerfile
- [x] docker-compose.yml
- [x] .env.example
- [x] SQLite persistence volume
- [x] Migrations executed on container start
- [x] Running container on fixed port 3011

## Phase 4: Admin Panel
- [x] Login page
- [x] Protected routes
- [x] Tool CRUD
- [x] Guide CRUD
- [x] Newsletter subscriber list

## Phase 5: Search and Filters
- [x] Full-text search over name/description/tags/category
- [ ] Rating filter
- [ ] Editor pick and hot filters
- [x] URL query params for all filters

## Phase 6: Comparison System
- [ ] SEO comparison URLs (/compare/a-vs-b)
- [ ] Final verdict and recommendation blocks
- [ ] Stronger side-by-side evaluation framework

## Phase 7: Guides and Content Engine
- [x] DB-based guides
- [x] Guide detail pages
- [ ] SEO metadata per guide
- [ ] Guide authoring/admin workflow

## Phase 8: Newsletter and Monetization
- [ ] Newsletter persistence to SQLite
- [ ] Affiliate fields surfaced in UI
- [ ] Sponsored label support

## Phase 9: Polish and Public Launch
- [ ] OpenGraph images
- [x] Sitemap and robots
- [ ] Favicon and metadata hardening
- [ ] About page
- [ ] Changelog page
- [ ] Launch copy and final QA
- [x] Premium SaaS redesign — Linear/Vercel/Stripe-inspired surface token system, card hover lift, restrained accent
- [x] IBM Carbon Design System migration (g100 dark theme, @carbon/react + @carbon/styles + @carbon/icons-react)
- [x] Carbon Header with icon buttons (Search, Settings) — fixes broken icon buttons
- [x] Carbon Grid/Column layout across all pages
- [x] Carbon Tile/ClickableTile for cards (ToolCard, GuideCard, categories, compare)
- [x] Carbon Tag for pricing/type badges across all pages
- [x] Carbon Breadcrumb on tool detail and guide pages
- [x] Carbon Select + Search in tools filter bar (client component)
- [x] Carbon OrderedList on Help page
- [x] Admin pages: Carbon form classes (cds--text-input, cds--select, cds--btn)
- [x] Removed @react-three/fiber, @react-three/drei, three, framer-motion
- [x] Replaced globals.css with globals.scss (Carbon SCSS import)
- [x] All 18 pages build clean with Next.js 15 App Router
