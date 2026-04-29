import Link from "next/link";
import { GuideCard } from "@/components/guide-card";
import { ToolCard } from "@/components/tool-card";
import { getCategories } from "@/lib/db/categories";
import { getGuides } from "@/lib/db/guides";
import { getEditorsPicks, getToolCounts } from "@/lib/db/tools";
import { Category, Guide, Tool } from "@/lib/types";

// Category icons (inline SVG paths — kept minimal for zero extra dependencies)
const categoryIcon: Record<string, string> = {
  "ai-assistants": "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14a7 7 0 0 1-5.5-2.7C7.2 14.5 9.5 13 12 13s4.8 1.5 5.5 3.3A7 7 0 0 1 12 19z",
  "coding": "M8 3L3 12l5 9M16 3l5 9-5 9M10 12h4",
  "design": "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  "video-audio": "M15 8v8H5V8h10zm5-3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h7v-2H5V7h14v10h-2v2h3a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z",
  "research": "M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3zm7 13.5-3-3",
  "automation": "M12 3v3M19.07 4.93l-2.12 2.12M21 12h-3M19.07 19.07l-2.12-2.12M12 21v-3M4.93 19.07l2.12-2.12M3 12h3M4.93 4.93l2.12 2.12",
  "business": "M2 7a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7zm9-4h2v4h-2V3z",
  "productivity": "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

// My actual stack — tools I use grouped by category
const myStack = [
  {
    category: "Coding",
    description: "AI-first development environment + terminal",
    tools: [
      { name: "Cursor", slug: "cursor" },
      { name: "Claude Code", slug: "claude-code" },
      { name: "GitHub Copilot", slug: "github-copilot" },
    ],
  },
  {
    category: "AI Assistants",
    description: "Daily reasoning, drafting, and research",
    tools: [
      { name: "Claude", slug: "claude" },
      { name: "ChatGPT", slug: "chatgpt" },
      { name: "Perplexity", slug: "perplexity" },
    ],
  },
  {
    category: "Design & UI",
    description: "Faster visual output without a design team",
    tools: [
      { name: "V0", slug: "v0" },
      { name: "Midjourney", slug: "midjourney" },
      { name: "Canva", slug: "canva" },
    ],
  },
  {
    category: "Automation",
    description: "Connect tools and ship background jobs",
    tools: [
      { name: "n8n", slug: "n8n" },
      { name: "Make", slug: "make" },
    ],
  },
];

export default async function HomePage() {
  const [categories, guides, editorsPicks, counts] = await Promise.all([
    getCategories(),
    getGuides(),
    getEditorsPicks(3),
    getToolCounts(),
  ]);

  return (
    <div>

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="hero-glow"
        style={{
          padding: "6rem 1.5rem 5rem",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <span className="eyebrow">BuildWithShashank</span>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              margin: "0 0 1.25rem",
              maxWidth: "44rem",
            }}
          >
            The AI tools I actually use to ship.
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              marginBottom: "2.5rem",
              maxWidth: "36rem",
            }}
          >
            I&apos;ve tested 100+ AI tools so you don&apos;t have to. This is the stack I
            reach for when building products solo — honest reviews, practical
            comparisons, no hype.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/tools" className="btn-primary">
              Browse the stack &rarr;
            </Link>
            <Link href="/blog" className="btn-secondary">
              Read the guides
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats strip ──────────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 0,
          }}
        >
          {[
            { label: "Tools reviewed", value: counts.total },
            { label: "Categories", value: categories.length },
            { label: "Free tools", value: counts.free },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card"
              style={{
                borderRadius: 0,
                border: "none",
                borderRight: i < 2 ? "1px solid var(--border-subtle)" : "none",
                padding: "2.5rem 2rem",
              }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured tools ───────────────────────────────────────────────── */}
      <section
        className="page-section"
        style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem 0" }}
      >
        <div className="section-header">
          <span className="eyebrow">Editor&apos;s picks</span>
          <h2 className="section-heading">Tools I actually ship with</h2>
          <p className="section-subtext">
            Vetted through real use. If it&apos;s here, I&apos;ve built something with it.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {editorsPicks.map((tool: Tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        <div style={{ marginTop: "1.75rem" }}>
          <Link href="/tools" className="btn-secondary" style={{ fontSize: "0.875rem" }}>
            See all {counts.total} tools &rarr;
          </Link>
        </div>
      </section>

      {/* ─── My current stack ─────────────────────────────────────────────── */}
      <section
        className="page-section"
        style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <div className="section-header">
          <span className="eyebrow">My setup</span>
          <h2 className="section-heading">My current stack</h2>
          <p className="section-subtext">
            What&apos;s running on my machine right now. Updated when I switch something up.
          </p>
        </div>
        <div
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {myStack.map((row) => (
            <div key={row.category} className="stack-row" style={{ padding: "1.25rem 1.75rem" }}>
              <div>
                <p
                  style={{
                    margin: "0 0 0.25rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {row.category}
                </p>
                <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                  {row.description}
                </p>
              </div>
              <div className="stack-chips">
                {row.tools.map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="stack-chip">
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Categories ───────────────────────────────────────────────────── */}
      <section
        className="page-section"
        style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <span className="eyebrow">Browse by need</span>
            <h2 className="section-heading">Categories</h2>
          </div>
          <Link
            href="/tools"
            style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", textDecoration: "none" }}
          >
            All tools &rarr;
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="category-card"
              style={{ textDecoration: "none" }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 0.25rem",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {category.name}
                </p>
                <p
                  className="line-clamp-1"
                  style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-muted)" }}
                >
                  {category.description}
                </p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ flexShrink: 0, color: "var(--text-muted)" }}
                aria-hidden="true"
              >
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Latest guides ────────────────────────────────────────────────── */}
      <section
        className="page-section"
        style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <div
          className="section-header"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <div>
            <span className="eyebrow">Learn</span>
            <h2 className="section-heading">Latest guides</h2>
          </div>
          <Link
            href="/blog"
            style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", textDecoration: "none" }}
          >
            All guides &rarr;
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {guides.slice(0, 3).map((guide: Guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      {/* ─── Newsletter ───────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
        }}
      >
        <div className="newsletter-block">
          <span className="eyebrow">Weekly Builder Brief</span>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              margin: "0.5rem 0 0.75rem",
            }}
          >
            Stay sharp. Ship faster.
          </h2>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
            Practical AI stack updates, tested workflows, and honest picks — every week.
            No noise, no affiliate spam.
          </p>
          <form
            className="newsletter-form"
            method="post"
            action="/api/newsletter"
          >
            <label htmlFor="newsletter-email" className="cds--visually-hidden">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
            />
            <button type="submit" className="btn-primary">
              Join
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
