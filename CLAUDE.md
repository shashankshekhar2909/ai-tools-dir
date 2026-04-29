# CLAUDE.md

## Project
AI Stack Lab (BuildWithShashank)

Stack:
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- SQLite + Prisma
- Docker (`3011 -> 3000` in current env)

## Purpose for Claude
Claude is responsible for **UI refinement and UX polish** while preserving functionality and existing architecture.

## Mandatory Working Rules
1. Read these files before making UI changes:
- `PLAN.md`
- `CHECKLIST.md`
- `app/globals.css`
- `app/layout.tsx`
- `components/*`

2. Preserve continuity:
- Do not rewrite working features unnecessarily.
- Reuse existing components before creating new ones.
- Keep visual language consistent across pages.
- Keep spacing, radii, shadows, and typography coherent.

3. Scope guard:
- Focus on frontend UI/UX improvements.
- Avoid schema or backend logic changes unless explicitly requested.
- Do not break admin auth flows or route behavior.

4. Responsiveness:
- Validate mobile/tablet/desktop layouts.
- Avoid overflow and cramped controls.
- Keep forms legible and touch-friendly.

5. Accessibility baseline:
- Ensure sufficient text contrast.
- Keep semantic heading structure.
- Preserve keyboard-friendly controls and visible focus states.

## Current UI Priorities
1. Refine information hierarchy on:
- Home (`/`)
- Tools directory (`/tools`)
- Tool detail (`/tools/[slug]`)
- Help page (`/help`)

2. Improve visual consistency:
- Card rhythm and spacing
- Filter controls alignment
- CTA clarity and placement
- Empty states and section intros

3. Improve comparison and guide readability:
- Better section grouping
- Cleaner text scan patterns
- More consistent metadata display

4. Admin UI polish (without changing auth model):
- Improve form layout and readability
- Better list row density/spacing
- Safer visual affordances for destructive actions

## Design Direction
- Clean premium SaaS look
- Minimal clutter
- Practical, builder-focused
- Clear, confident CTAs
- No gimmicky gradients or noisy effects

## SEO/UI Constraints
- Do not remove metadata, robots, sitemap, manifest, or GA script.
- Keep social links in footer intact.

## Validation Checklist Before Finishing
- `npm run build` passes
- No broken routes introduced
- No regressions in `/admin/login` flow
- UI looks consistent on key pages
- Update docs:
  - Add notes in `PLAN.md` if phase status changes
  - Update `CHECKLIST.md` checkboxes for completed UI items

## Deployment Note
If asked to deploy, keep port mapping consistent:
- Host `3011` -> container `3000`
