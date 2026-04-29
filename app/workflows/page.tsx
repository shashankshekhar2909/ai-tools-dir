import Link from "next/link";

const workflows = [
  {
    slug: "build-mvp-with-ai",
    title: "Build an MVP with AI",
    description: "From idea clarity to deployment with a practical AI-assisted product build loop.",
    difficulty: "Intermediate",
    tools: ["ChatGPT", "Claude", "Codex", "Cursor", "Docker/Vercel"],
    setupTime: "90-150 min",
  },
  {
    slug: "ai-coding-setup",
    title: "AI Coding Setup",
    description: "A repeatable coding setup for architecture, implementation, debugging, and release.",
    difficulty: "Beginner to Intermediate",
    tools: ["Claude", "Codex", "Cursor", "GitHub", "Docker"],
    setupTime: "45-75 min",
  },
  {
    slug: "content-automation",
    title: "Content Automation System",
    description: "Systemize idea generation, editing, design, and distribution with minimal manual work.",
    difficulty: "Intermediate",
    tools: ["ChatGPT", "Claude", "Canva", "n8n"],
    setupTime: "60-120 min",
  },
];

export const metadata = {
  title: "Workflows",
  description: "Practical AI workflows for builders: MVP shipping, coding setup, and content automation systems.",
  alternates: {
    canonical: "/workflows",
  },
};

export default function WorkflowsPage() {
  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
      <div style={{ maxWidth: "44rem", marginBottom: "2rem" }}>
        <span className="eyebrow">Practical Playbooks</span>
        <h1 className="section-heading">AI Workflows</h1>
        <p className="section-subtext" style={{ marginTop: "0.5rem" }}>
          Step-by-step workflows for builders who want repeatable output, not random tool-hopping.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {workflows.map((w) => (
          <article key={w.slug} className="premium-card">
            <h2 style={{ margin: "0 0 0.45rem", fontSize: "1.05rem", color: "var(--text-primary)" }}>{w.title}</h2>
            <p style={{ margin: "0 0 0.8rem", fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              {w.description}
            </p>
            <p style={{ margin: "0 0 0.35rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Difficulty: {w.difficulty}
            </p>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Setup time: {w.setupTime}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
              {w.tools.map((tool) => (
                <span key={tool} className="stack-chip" style={{ fontSize: "0.75rem" }}>
                  {tool}
                </span>
              ))}
            </div>
            <Link href={`/workflows/${w.slug}`} className="btn-secondary" style={{ alignSelf: "flex-start" }}>
              Open workflow
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
