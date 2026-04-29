import Link from "next/link";

const purposeGuides = [
  { title: "I want to code faster", useCase: "Coding", stack: "Cursor / Codex / GitHub Copilot" },
  { title: "I want better research", useCase: "Research", stack: "Perplexity / NotebookLM / Consensus" },
  { title: "I want to create visuals", useCase: "Design", stack: "Midjourney / Ideogram / Canva" },
  { title: "I want video output", useCase: "Video Creation", stack: "Runway / Luma Dream Machine / CapCut" },
  { title: "I want content marketing", useCase: "Marketing", stack: "Jasper / Copy.ai / Writesonic" },
  { title: "I want automations", useCase: "Automation", stack: "n8n / Make / Zapier" },
  { title: "I need decks and docs", useCase: "Presentations", stack: "Gamma / Tome / Notion AI" },
  { title: "I need meeting summaries", useCase: "Meeting Notes", stack: "Otter / Notion AI / Coda AI" },
];

const steps = [
  "Define one primary task and one success metric.",
  "Shortlist 3 tools using the purpose filter.",
  "Run the same sample task in all 3 tools.",
  "Keep only the tool that gives the best speed-to-quality ratio.",
];

export const metadata = {
  title: "Help — AI Purpose Guide",
};

export default function HelpPage() {
  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* Page header */}
      <div style={{ marginBottom: "2.5rem", maxWidth: "42rem" }}>
        <span className="eyebrow">Find your fit</span>
        <h1 className="section-heading">AI Purpose Guide</h1>
        <p className="section-subtext" style={{ marginTop: "0.5rem" }}>
          Start with your goal, then jump into a filtered tool list curated for that purpose.
        </p>
      </div>

      {/* Purpose cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          marginBottom: "3.5rem",
        }}
      >
        {purposeGuides.map((item) => (
          <Link
            key={item.title}
            href={`/tools?useCase=${encodeURIComponent(item.useCase)}`}
            className="premium-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span className="eyebrow" style={{ marginBottom: "0.75rem" }}>
              {item.useCase}
            </span>
            <h2
              style={{
                margin: "0 0 0.625rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                lineHeight: 1.35,
              }}
            >
              {item.title}
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                margin: "0 0 1rem",
                flexGrow: 1,
              }}
            >
              Suggested stack: {item.stack}
            </p>
            <span style={{ fontSize: "0.8125rem", color: "var(--accent-hover)" }}>
              View tools &rarr;
            </span>
          </Link>
        ))}
      </div>

      {/* Quick-pick framework */}
      <div
        className="premium-card"
        style={{ maxWidth: "48rem" }}
      >
        <span className="eyebrow">Framework</span>
        <h2
          style={{
            margin: "0.375rem 0 0.625rem",
            fontSize: "1.1875rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          How to pick the right tool in 10 minutes
        </h2>
        <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
          A simple framework that actually works.
        </p>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            counterReset: "steps",
          }}
        >
          {steps.map((step, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                fontSize: "0.9375rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  background: "var(--accent-dim)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  color: "var(--accent-hover)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "0.125rem",
                }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div
          style={{
            padding: "1.25rem 1.5rem",
            backgroundColor: "var(--surface-0)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", margin: 0 }}>
            Ready to find your stack?
          </p>
          <Link href="/tools" className="btn-primary">
            Browse all tools &rarr;
          </Link>
        </div>
      </div>

    </div>
  );
}
