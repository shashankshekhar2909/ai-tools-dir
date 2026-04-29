import Link from "next/link";

const steps = [
  "Use Claude to design architecture boundaries, folder structure, and tradeoffs.",
  "Use Codex to implement scoped features from an explicit technical spec.",
  "Use Cursor to refine code, debug issues, and make local iteration faster.",
  "Use GitHub for clean commits, review discipline, and rollback safety.",
  "Use Docker to standardize runtime and deployment behavior across environments.",
];

export const metadata = {
  title: "AI Coding Setup",
};

export default function AiCodingSetupPage() {
  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
      <span className="eyebrow">Workflow</span>
      <h1 className="section-heading">AI Coding Setup</h1>
      <p className="section-subtext" style={{ marginTop: "0.5rem" }}>
        A practical setup for repeatable, production-minded AI-assisted software delivery.
      </p>

      <div className="premium-card" style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", color: "var(--text-primary)" }}>Who this is for</h2>
        <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Developers and teams who want faster execution without sacrificing code quality.
        </p>
      </div>

      <div className="premium-card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", color: "var(--text-primary)" }}>Tools needed</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
          {["Claude", "Codex", "Cursor", "GitHub", "Docker"].map((tool) => (
            <span key={tool} className="stack-chip">{tool}</span>
          ))}
        </div>
      </div>

      <div className="premium-card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 0.8rem", fontSize: "1rem", color: "var(--text-primary)" }}>Step-by-step process</h2>
        <ol style={{ margin: 0, paddingLeft: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          {steps.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </div>

      <div className="premium-card">
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", color: "var(--text-primary)" }}>Common mistakes</h2>
        <ul style={{ margin: 0, paddingLeft: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <li>Generating code before architecture and acceptance criteria are defined.</li>
          <li>Skipping version control discipline while iterating quickly.</li>
          <li>Treating AI output as final without manual review and tests.</li>
        </ul>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <Link href="/tools?category=coding" className="btn-primary">Browse coding tools</Link>
        <Link href="/workflows" className="btn-secondary">All workflows</Link>
      </div>
    </div>
  );
}
