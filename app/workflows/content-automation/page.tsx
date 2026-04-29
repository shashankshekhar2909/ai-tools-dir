import Link from "next/link";

const steps = [
  "Use ChatGPT to generate content ideas mapped to your audience problems.",
  "Use Claude to edit drafts into clearer, more useful final content.",
  "Use Canva to produce consistent visual assets and social variants.",
  "Use n8n to automate distribution, publishing triggers, and repurposing flows.",
  "Route audience responses back into your backlog for the next content cycle.",
];

export const metadata = {
  title: "Content Automation System",
  description: "Workflow for AI-assisted content automation using ChatGPT, Claude, Canva, and n8n.",
  alternates: {
    canonical: "/workflows/content-automation",
  },
};

export default function ContentAutomationPage() {
  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
      <span className="eyebrow">Workflow</span>
      <h1 className="section-heading">Content Automation System</h1>
      <p className="section-subtext" style={{ marginTop: "0.5rem" }}>
        Build a reliable content system that blends quality editing with automation.
      </p>

      <div className="premium-card" style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", color: "var(--text-primary)" }}>Who this is for</h2>
        <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Builders and creators who want consistent publishing without manual overhead.
        </p>
      </div>

      <div className="premium-card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", color: "var(--text-primary)" }}>Tools needed</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
          {["ChatGPT", "Claude", "Canva", "n8n"].map((tool) => (
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
          <li>Automating distribution before content quality and positioning are stable.</li>
          <li>No feedback loop from content performance to idea generation.</li>
          <li>Over-automating tone and losing personal voice.</li>
        </ul>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <Link href="/tools?category=automation" className="btn-primary">Browse automation tools</Link>
        <Link href="/workflows" className="btn-secondary">All workflows</Link>
      </div>
    </div>
  );
}
