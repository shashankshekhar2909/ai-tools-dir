import Link from "next/link";

type StackTool = {
  name: string;
  slug: string;
  role: string;
  when: string;
  strength: string;
  limitation: string;
};

type StackSection = {
  title: string;
  subtitle: string;
  tools: StackTool[];
};

const stackSections: StackSection[] = [
  {
    title: "Current Coding Stack",
    subtitle: "Tools I use for shipping, refactoring, and day-to-day dev execution.",
    tools: [
      {
        name: "Codex",
        slug: "codex",
        role: "Full app generation and large refactors",
        when: "When I have a clear PLAN.md or AGENTS.md",
        strength: "Great for structured execution",
        limitation: "Needs strong upfront architecture",
      },
      {
        name: "Claude",
        slug: "claude",
        role: "Architecture and reasoning partner",
        when: "When breaking complex features into clean technical plans",
        strength: "Strong depth and reasoning quality",
        limitation: "Can over-explain if prompts are broad",
      },
      {
        name: "Cursor",
        slug: "cursor",
        role: "Daily IDE flow and fast edits",
        when: "When iterating directly inside a codebase",
        strength: "Excellent for speed in active development loops",
        limitation: "Context can drift on very large repos",
      },
      {
        name: "ChatGPT",
        slug: "chatgpt",
        role: "Fast implementation drafts and utilities",
        when: "When I need quick direction or code scaffolding",
        strength: "Fast, versatile, and broad",
        limitation: "Needs careful verification for edge cases",
      },
      {
        name: "GitHub Copilot",
        slug: "github-copilot",
        role: "Inline code completion and pair-programming assist",
        when: "When shipping repetitive or pattern-heavy code",
        strength: "Smooth in-editor acceleration",
        limitation: "Suggestions still need human review",
      },
    ],
  },
  {
    title: "Research and Planning Stack",
    subtitle: "Tools I use to sharpen ideas and validate direction before building.",
    tools: [
      {
        name: "Perplexity",
        slug: "perplexity",
        role: "Source-backed research",
        when: "When validating claims, tools, and market context",
        strength: "Fast answers with citations",
        limitation: "Still requires source-level sanity checks",
      },
      {
        name: "ChatGPT",
        slug: "chatgpt",
        role: "Idea shaping and prompt drafting",
        when: "When turning rough concepts into practical execution prompts",
        strength: "Great ideation speed",
        limitation: "Quality depends heavily on prompt specificity",
      },
      {
        name: "Claude",
        slug: "claude",
        role: "Planning and system-level decomposition",
        when: "When transforming ideas into implementation-ready plans",
        strength: "Strong structured thinking",
        limitation: "Can be slower than lightweight tools for quick checks",
      },
      {
        name: "NotebookLM",
        slug: "notebooklm",
        role: "Source-grounded synthesis",
        when: "When summarizing docs and aligning across references",
        strength: "Great with user-provided materials",
        limitation: "Less useful without strong source docs",
      },
    ],
  },
  {
    title: "Content and Design Stack",
    subtitle: "Tools I use to publish visuals, copy, and launch assets quickly.",
    tools: [
      {
        name: "Canva",
        slug: "canva",
        role: "Social and marketing asset production",
        when: "When I need fast brand-consistent visuals",
        strength: "Fast output with minimal design overhead",
        limitation: "Advanced custom design flexibility is limited",
      },
      {
        name: "Midjourney",
        slug: "midjourney",
        role: "Concept visuals and art direction",
        when: "When exploring visual styles quickly",
        strength: "High-quality image generation",
        limitation: "Iteration control can take prompt tuning",
      },
      {
        name: "Ideogram",
        slug: "ideogram",
        role: "Text-heavy image generation",
        when: "When visuals need readable typography",
        strength: "Strong text rendering in images",
        limitation: "Output style variety can be inconsistent",
      },
      {
        name: "Gamma",
        slug: "gamma",
        role: "Decks and narrative docs",
        when: "When packaging ideas for stakeholders or content",
        strength: "Fast polished presentation output",
        limitation: "Deeper layout customization is narrower than full design suites",
      },
    ],
  },
  {
    title: "Automation Stack",
    subtitle: "Tools I use to remove repetitive work from operations and publishing.",
    tools: [
      {
        name: "n8n",
        slug: "n8n",
        role: "Core workflow automation engine",
        when: "When building reliable automations with control",
        strength: "Flexible and developer-friendly",
        limitation: "Setup complexity is higher than no-code-first options",
      },
      {
        name: "Make",
        slug: "make",
        role: "Visual scenario automation",
        when: "When teams need quick integration workflows",
        strength: "Easy visual orchestration",
        limitation: "Complex flows can become hard to maintain",
      },
      {
        name: "Zapier",
        slug: "zapier",
        role: "Simple trigger-action automation",
        when: "When I need the fastest integration launch",
        strength: "Huge app ecosystem",
        limitation: "Costs scale quickly with high task volume",
      },
    ],
  },
];

const workflowSteps = [
  { step: "Idea", tool: "ChatGPT / Claude" },
  { step: "Research", tool: "Perplexity / NotebookLM" },
  { step: "Architecture", tool: "Claude" },
  { step: "Prompt Spec", tool: "ChatGPT / Claude" },
  { step: "Code Generation", tool: "Codex" },
  { step: "Review", tool: "Cursor / GitHub Copilot" },
  { step: "Deploy", tool: "Docker / Vercel" },
];

export const metadata = {
  title: "My AI Stack",
};

export default function StackPage() {
  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
      <section style={{ maxWidth: "48rem", marginBottom: "2.5rem" }}>
        <span className="eyebrow">Builder Stack</span>
        <h1 className="section-heading">My AI Stack</h1>
        <p className="section-subtext" style={{ marginTop: "0.5rem" }}>
          The AI tools and workflows I use to build, test, write, automate, and ship faster.
        </p>
      </section>

      {stackSections.map((section) => (
        <section key={section.title} style={{ marginBottom: "2.25rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 650, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: 0 }}>
              {section.title}
            </h2>
            <p style={{ margin: "0.35rem 0 0", fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
              {section.subtitle}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {section.tools.map((tool) => (
              <article key={`${section.title}-${tool.slug}`} className="premium-card">
                <div style={{ marginBottom: "0.625rem" }}>
                  <Link href={`/tools/${tool.slug}`} style={{ textDecoration: "none" }}>
                    <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 650, color: "var(--text-primary)" }}>{tool.name}</h3>
                  </Link>
                </div>
                <p style={{ margin: "0 0 0.45rem", fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                  <strong style={{ color: "var(--text-primary)" }}>Role:</strong> {tool.role}
                </p>
                <p style={{ margin: "0 0 0.45rem", fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                  <strong style={{ color: "var(--text-primary)" }}>When I use it:</strong> {tool.when}
                </p>
                <p style={{ margin: "0 0 0.45rem", fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                  <strong style={{ color: "var(--text-primary)" }}>Strength:</strong> {tool.strength}
                </p>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                  <strong style={{ color: "var(--text-primary)" }}>Limitation:</strong> {tool.limitation}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section style={{ marginTop: "0.5rem", marginBottom: "2.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 650, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: 0 }}>
            My AI Build Workflow
          </h2>
          <p style={{ margin: "0.35rem 0 0", fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
            Idea to deployment with the exact tool touchpoints I use most often.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "0.75rem" }}>
          {workflowSteps.map((item, idx) => (
            <div key={item.step} className="premium-card" style={{ padding: "1rem" }}>
              <p style={{ margin: 0, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-muted)", fontWeight: 600 }}>
                Step {idx + 1}
              </p>
              <p style={{ margin: "0.35rem 0 0.45rem", fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {item.step}
              </p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {item.tool}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="premium-card" style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <p style={{ margin: "0 0 0.3rem", fontSize: "0.92rem", color: "var(--text-primary)", fontWeight: 600 }}>
            Want the full stack playbook?
          </p>
          <p style={{ margin: 0, fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Browse tools or join the builder newsletter for weekly workflow upgrades.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <Link href="/tools" className="btn-primary">Browse Tools</Link>
          <Link href="/blog" className="btn-secondary">Read Guides</Link>
        </div>
      </section>
    </div>
  );
}
