# AI Stack Lab

> Tested AI tools, workflows, and stacks for people who actually ship.

A curated, opinionated directory of AI tools — not another scraped list. Every entry is hand-picked, categorized, and rated by someone who actually uses them to build things.

Built by [Shashank](https://github.com/sunnyrocks1122) under the **BuildWithShashank** brand.

---

## Why this exists

The AI tooling space is loud. A new "100 best AI tools" listicle drops every Tuesday. Most of them are SEO bait.

AI Stack Lab takes the opposite approach:

- **Curated, not crawled.** Each tool has a reason to be here.
- **Builder-first.** Pricing, real use-cases, pros, cons — the things you check before paying.
- **Comparable.** Side-by-side comparisons instead of fluff reviews.
- **Calm UI.** Premium SaaS aesthetic. No pop-ups. No newsletter modal in your face. (Newsletter is opt-in, at the bottom, where it belongs.)

Think of it as a builder's notebook, made public.

---

## Stack

| Layer       | Choice                                          |
| ----------- | ----------------------------------------------- |
| Framework   | Next.js 15 (App Router) + TypeScript            |
| UI          | IBM Carbon Design System + custom premium layer |
| Styling     | SCSS modules, CSS custom properties, Tailwind   |
| Database    | SQLite via Prisma ORM                           |
| Auth        | bcryptjs-hashed admin login (no third-party)    |
| Deployment  | Docker (host `3011` → container `3000`)         |
| Theming     | Light + dark, persisted, no FOUC                |

No Supabase. No managed DB. No vendor lock-in. The whole app fits on one cheap VPS.

---

## Features

### For readers

- **Tools directory** — searchable, filterable by category, pricing, rating
- **Tool detail pages** — pros, cons, pricing, use-cases, similar tools
- **Side-by-side compare** — pick any two tools, see the differences
- **Guides & blog** — long-form posts on workflows and stacks
- **"My current stack"** — opinionated picks, on the homepage
- **Light / dark theme** — toggle in the header, remembered across visits

### For the admin (you)

- **CRUD for tools, categories, guides, newsletter signups**
- **Editor's pick flag** — featured tools surface on the homepage
- **URL sync workflow** — `npm run tools:sync-urls:fix` keeps tool URLs honest
- **Premium-styled admin forms** — same design language as the public site

---

## Getting started

### Prerequisites

- Node.js 20+
- Docker (optional, for the prod-like setup)

### Local dev

```bash
git clone https://github.com/sunnyrocks1122/ai-tools-dir.git
cd ai-tools-dir
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Docker

```bash
docker compose up --build
```

App lives at [http://localhost:3011](http://localhost:3011). DB persists in `./data/app.db`.

### Admin login

After seeding, log in at `/admin/login` with the seeded credentials (see `prisma/seed.js`). Change the password immediately.

---

## Project structure

```
app/
  page.tsx              # Homepage — narrative, not directory dump
  tools/                # Directory + tool detail pages
  compare/              # Side-by-side comparison
  blog/, guides/        # Long-form content
  help/                 # FAQ + how to use the site
  admin/                # CRUD dashboard (auth-gated)
  _premium.scss         # Premium SaaS surface tokens, card/button system
  globals.scss          # Carbon import + premium layer
components/
  site-header.tsx       # Sticky header, theme toggle, mobile drawer
  site-footer.tsx
  tool-card.tsx         # Premium card component
  tools-filter-bar.tsx  # Search + filters toolbar
  theme-toggle.tsx      # Light/dark switcher
prisma/
  schema.prisma         # Tools, Categories, Guides, Newsletter, AdminUser
  seed.js
scripts/
  sync-tool-urls.mjs    # Tool URL health check
```

---

## Design system

The site rides on **Carbon Design System** for accessibility, components, and type — but layered with a custom premium token system in `app/_premium.scss`:

- **3 surface elevations** (`--surface-0/1/2`) — body, cards, hover
- **Single accent** — indigo `#6366f1`, used sparingly
- **Soft shadows** in light mode, deep shadows in dark
- **Linear / Vercel / Stripe** as visual references — calm density, restrained motion

Theme switching uses a `data-theme` attribute on `<html>` plus a synchronous `<head>` script to prevent flash. Reduced-motion users get instant transitions.

---

## Roadmap

See [`PLAN.md`](./PLAN.md) and [`CHECKLIST.md`](./CHECKLIST.md) for the full plan. Highlights:

- [ ] Affiliate link tracking
- [ ] Tool submission form (community-suggested entries, admin-reviewed)
- [ ] Workflow library — "stacks" as first-class entities, not just guides
- [ ] Email digest from newsletter signups
- [ ] Public API for the directory

---

## Contributing

This is a personal project, but tool suggestions are welcome. Open an issue with:

- Tool name + URL
- One-line "what it does"
- Why it deserves a spot (be honest — "everyone's using it" is not a reason)

PRs that fix bugs or improve a11y / performance are also welcome.

---

## License

MIT. Use it, fork it, learn from it.

---

## Credits

- Built by [Shashank Shekhar](https://github.com/sunnyrocks1122) — [BuildWithShashank](https://buildwithshashank.com)
- Design system: [IBM Carbon](https://carbondesignsystem.com)
- Inspiration: [Linear](https://linear.app), [Vercel](https://vercel.com), [Stripe Docs](https://stripe.com/docs), [Product Hunt](https://producthunt.com)

---

<p align="center">
  <em>If you ship things with AI, this is the directory I wish I had.</em>
</p>
