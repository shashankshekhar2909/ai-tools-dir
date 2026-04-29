import Link from "next/link";

const steps = [
  "Use ChatGPT or Claude to clarify the problem, audience, and MVP scope.",
  "Use Claude to convert the idea into a practical product plan with milestones.",
  "Use Codex to generate the initial app based on your PLAN.md.",
  "Use Cursor to polish implementation details, fix bugs, and tighten UX.",
  "Deploy via Docker or Vercel and validate the first feedback loop.",
];

export const metadata = {
  title: "Build an MVP with AI",
  description: "Step-by-step workflow to build and ship an MVP using ChatGPT, Claude, Codex, Cursor, and Docker/Vercel.",
  alternates: {
    canonical: "/workflows/build-mvp-with-ai",
  },
};

export default function BuildMvpWithAiPage() {
  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
      <span className="eyebrow">Workflow</span>
      <h1 className="section-heading">Build an MVP with AI</h1>
      <p className="section-subtext" style={{ marginTop: "0.5rem" }}>
        A builder-first workflow to go from idea to shipped MVP quickly without losing structure.
      </p>

      <div className="premium-card" style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", color: "var(--text-primary)" }}>Who this is for</h2>
        <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Founders and developers shipping a first version with limited time.
        </p>
      </div>

      <div className="premium-card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", color: "var(--text-primary)" }}>Tools needed</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
          {["ChatGPT", "Claude", "Codex", "Cursor", "Docker/Vercel"].map((tool) => (
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
          <li>Starting code generation without a clear scope document.</li>
          <li>Skipping QA/debug loops before deployment.</li>
          <li>Trying to automate everything before first user feedback.</li>
        </ul>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <Link href="/tools" className="btn-primary">Explore tools</Link>
        <Link href="/workflows" className="btn-secondary">All workflows</Link>
      </div>
    </div>
  );
}
