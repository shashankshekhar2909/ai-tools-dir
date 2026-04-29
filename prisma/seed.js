const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const categories = [
  { name: "AI Assistants", slug: "ai-assistants", description: "General-purpose assistants for writing, ideation, and rapid execution." },
  { name: "Coding", slug: "coding", description: "Code generation, review, and agentic development workflows." },
  { name: "Design", slug: "design", description: "Visual design, image generation, and creative production tools." },
  { name: "Video & Audio", slug: "video-audio", description: "Creation and editing tools for voice, audio, and video output." },
  { name: "Research", slug: "research", description: "Search, synthesis, and knowledge workflow tools." },
  { name: "Automation", slug: "automation", description: "Workflow orchestration and task automation stacks." },
  { name: "Business", slug: "business", description: "Decks, docs, and operational tools for teams and founders." },
  { name: "Productivity", slug: "productivity", description: "Fast iteration and shipping tools for modern builders." },
];

const tools = [
  ["ChatGPT", "chatgpt", "ai-assistants", "Freemium", 4.8, "Flexible assistant for writing, coding, and ideation."],
  ["Claude", "claude", "ai-assistants", "Freemium", 4.7, "Great reasoning depth and long-form outputs."],
  ["Gemini", "gemini", "ai-assistants", "Freemium", 4.4, "Google-native assistant with broad integrations."],
  ["Perplexity", "perplexity", "research", "Freemium", 4.6, "Citation-first research and answer engine."],
  ["Microsoft Copilot", "microsoft-copilot", "ai-assistants", "Freemium", 4.2, "Assistant integrated into Microsoft ecosystem."],
  ["Poe", "poe", "ai-assistants", "Freemium", 4.1, "Multi-model assistant workspace."],
  ["You.com", "you-com", "research", "Freemium", 4.0, "Search assistant with app-style responses."],
  ["Pi", "pi", "ai-assistants", "Free", 3.9, "Conversational personal AI companion."],

  ["Cursor", "cursor", "coding", "Paid", 4.8, "AI-first IDE for pair programming and refactors."],
  ["GitHub Copilot", "github-copilot", "coding", "Paid", 4.5, "In-editor completion and chat for coding teams."],
  ["Codex", "codex", "coding", "Paid", 4.5, "Agent-style coding support for practical implementation."],
  ["Claude Code", "claude-code", "coding", "Paid", 4.4, "Terminal-native coding assistant workflows."],
  ["Replit", "replit", "coding", "Freemium", 4.3, "Cloud IDE with collaborative AI coding support."],
  ["Codeium", "codeium", "coding", "Freemium", 4.1, "Fast code completions and chat."],
  ["Sourcegraph Cody", "sourcegraph-cody", "coding", "Freemium", 4.1, "Codebase-aware assistant for large repositories."],
  ["Tabnine", "tabnine", "coding", "Freemium", 3.9, "Private-code-friendly completion assistant."],
  ["Continue", "continue", "coding", "Free", 4.0, "Open-source coding assistant extension."],
  ["Aider", "aider", "coding", "Free", 4.0, "CLI coding assistant for code edits."],

  ["Midjourney", "midjourney", "design", "Paid", 4.6, "High-quality image generation for creative direction."],
  ["Ideogram", "ideogram", "design", "Freemium", 4.3, "Image generation with strong text rendering."],
  ["Canva", "canva", "design", "Freemium", 4.5, "Visual design suite with AI productivity features."],
  ["Adobe Firefly", "adobe-firefly", "design", "Freemium", 4.2, "Generative visuals in Adobe workflows."],
  ["Leonardo AI", "leonardo-ai", "design", "Freemium", 4.2, "Asset-focused generation for creators."],
  ["Krea", "krea", "design", "Freemium", 4.1, "Real-time image ideation and enhancement."],
  ["Figma AI", "figma-ai", "design", "Freemium", 4.0, "Design acceleration inside Figma."],
  ["V0", "v0", "design", "Freemium", 4.4, "Generate UI and front-end building blocks quickly."],
  ["Uizard", "uizard", "design", "Freemium", 3.9, "Rapid wireframes and UI drafts."],

  ["Runway", "runway", "video-audio", "Paid", 4.4, "AI video generation and editing workflows."],
  ["PixVerse", "pixverse", "video-audio", "Freemium", 4.1, "Fast short-form AI video experiments."],
  ["ElevenLabs", "elevenlabs", "video-audio", "Freemium", 4.6, "Natural voice generation and dubbing."],
  ["Descript", "descript", "video-audio", "Freemium", 4.2, "Transcript-first audio and podcast editing."],
  ["CapCut", "capcut", "video-audio", "Freemium", 4.0, "AI-enhanced editing for short videos."],
  ["Synthesia", "synthesia", "video-audio", "Paid", 4.1, "Avatar-based explainer video generation."],
  ["Pika", "pika", "video-audio", "Freemium", 4.0, "Prompt-driven short video creation."],
  ["HeyGen", "heygen", "video-audio", "Paid", 4.1, "AI avatars and localized video voiceovers."],
  ["Murf", "murf", "video-audio", "Freemium", 4.0, "Studio-style text-to-speech voices."],
  ["Luma Dream Machine", "luma-dream-machine", "video-audio", "Freemium", 4.1, "High-motion AI video clips."],

  ["NotebookLM", "notebooklm", "research", "Free", 4.4, "Summarize and reason over your own sources."],
  ["Elicit", "elicit", "research", "Freemium", 4.0, "Research assistant for evidence gathering."],
  ["Consensus", "consensus", "research", "Freemium", 4.1, "Research answers grounded in papers."],
  ["Scite", "scite", "research", "Paid", 4.0, "Citation context and evidence checks."],
  ["Wolfram Alpha", "wolfram-alpha", "research", "Freemium", 4.2, "Computational knowledge engine."],

  ["n8n", "n8n", "automation", "Free", 4.6, "Open workflow automation with strong control."],
  ["Make", "make", "automation", "Freemium", 4.3, "Visual automation scenarios for ops and marketing."],
  ["Zapier", "zapier", "automation", "Freemium", 4.2, "Simple trigger-action automation across apps."],
  ["Pipedream", "pipedream", "automation", "Freemium", 4.1, "Code-first API workflows and automations."],
  ["Bardeen", "bardeen", "automation", "Freemium", 3.9, "Browser workflow automation and scraping."],
  ["IFTTT", "ifttt", "automation", "Freemium", 3.8, "Lightweight personal automations."],

  ["Gamma", "gamma", "business", "Freemium", 4.2, "Create polished decks and docs quickly."],
  ["Tome", "tome", "business", "Freemium", 4.0, "AI presentation storytelling tool."],
  ["Notion AI", "notion-ai", "business", "Paid", 4.2, "Workspace docs and planning with AI."],
  ["Jasper", "jasper", "business", "Paid", 3.9, "Marketing-focused AI writing workflows."],
  ["Copy.ai", "copy-ai", "business", "Freemium", 3.8, "Campaign content generation assistant."],
  ["Writesonic", "writesonic", "business", "Freemium", 3.9, "Marketing and SEO content helper."],

  ["Lovable", "lovable", "productivity", "Freemium", 4.0, "Prompt-to-app workflows for quick experiments."],
  ["Bolt", "bolt", "productivity", "Freemium", 4.0, "Rapid AI app scaffolding and iteration."],
  ["Taskade", "taskade", "productivity", "Freemium", 3.9, "AI-driven notes and team workflows."],
  ["Mem", "mem", "productivity", "Freemium", 3.9, "Contextual AI notes and recall."],
  ["Coda AI", "coda-ai", "productivity", "Freemium", 4.0, "Docs and automations in one workspace."],
  ["Otter", "otter", "productivity", "Freemium", 4.0, "Meeting notes and AI summaries."],
  ["ClickUp AI", "clickup-ai", "productivity", "Paid", 3.9, "Project operations with AI assistance."],
  ["Airtable AI", "airtable-ai", "productivity", "Paid", 4.0, "Database and workflow operations with AI."],
];

const guides = [
  {
    title: "Best AI Tools for Solo Founders",
    slug: "best-ai-tools-for-solo-founders",
    excerpt: "A practical starter stack for solo builders shipping quickly.",
    content: "Start with one assistant, one coding copilot, one research tool, and one automation tool.\n\nRecommended baseline:\n- Assistant: ChatGPT or Claude\n- Coding: Cursor or GitHub Copilot\n- Research: Perplexity or NotebookLM\n- Automation: n8n or Make\n\nWeekly operating rhythm:\n1. Monday planning with AI-assisted backlog grooming\n2. Daily build loop with coding copilot + tests\n3. Mid-week content/research publishing\n4. Friday retrospective and tool ROI review",
    type: "Starter Pack",
    readingTime: "8 min",
    publishedAt: new Date("2026-04-20"),
  },
  {
    title: "Cursor vs Codex: Which Should Developers Use?",
    slug: "cursor-vs-codex-which-should-developers-use",
    excerpt: "Direct comparison for coding-focused daily workflows.",
    content: "Choose Cursor when you need IDE-native flow with fast inline edits.\n\nChoose Codex when you need structured implementation support and explicit execution workflows.\n\nDecision filter:\n- Team uses heavy IDE workflows: Cursor\n- Team values stepwise execution with clear terminal workflows: Codex\n\nBest outcome is often hybrid: use one as primary and keep the other for second-opinion code review.",
    type: "Comparison",
    readingTime: "11 min",
    publishedAt: new Date("2026-04-18"),
  },
  {
    title: "My AI Coding Stack for Shipping Faster",
    slug: "my-ai-coding-stack-for-shipping-faster",
    excerpt: "A no-fluff stack that balances speed with code quality.",
    content: "Core stack:\n- IDE copilot for rapid edits\n- Terminal agent for scoped implementation\n- Test runner in CI\n- Linters and type checks as guardrails\n\nExecution pattern:\n1. Break task into thin vertical slices\n2. Implement one slice at a time with tests\n3. Run build checks before every push\n4. Keep a changelog of prompt patterns that worked",
    type: "Workflow",
    readingTime: "7 min",
    publishedAt: new Date("2026-04-16"),
  },
  {
    title: "Best Free AI Tools for Creators",
    slug: "best-free-ai-tools-for-creators",
    excerpt: "A quality-first creator stack without paid lock-in.",
    content: "Free-friendly creator stack:\n- Design: Canva, Ideogram\n- Voice: ElevenLabs free tier\n- Video: CapCut + PixVerse\n- Research: NotebookLM\n\nUse free tiers for validation, then upgrade only for bottlenecks: export quality, speed, or team collaboration.",
    type: "Starter Pack",
    readingTime: "9 min",
    publishedAt: new Date("2026-04-14"),
  },
  {
    title: "AI Tools I Actually Use as a Developer",
    slug: "ai-tools-i-actually-use-as-a-developer",
    excerpt: "A practical stack used for daily shipping, not demos.",
    content: "Daily stack:\n- Chat + planning: ChatGPT/Claude\n- Coding: Cursor/Codex\n- Research: Perplexity\n- Automation: n8n\n\nWhat I avoid:\n- Tool overlap without clear workflow ROI\n- Prompting without verification\n- Automations without monitoring",
    type: "Review",
    readingTime: "6 min",
    publishedAt: new Date("2026-04-12"),
  },
];

const pros = JSON.stringify(["Fast to onboard", "Strong output quality", "Reliable for daily workflows"]);
const cons = JSON.stringify(["Can get expensive at scale", "Output still needs human review"]);

const useCasesByCategory = {
  "ai-assistants": ["Content Writing", "Idea Generation", "General Productivity"],
  coding: ["Coding", "Code Review", "Prototyping"],
  design: ["Design", "Brand Assets", "Prototyping"],
  "video-audio": ["Video Creation", "Voiceovers", "Content Production"],
  research: ["Research", "Fact Checking", "Knowledge Synthesis"],
  automation: ["Automation", "No-code Workflows", "Ops Tasks"],
  business: ["Presentations", "Marketing", "Business Docs"],
  productivity: ["Meeting Notes", "Task Planning", "Team Productivity"],
};

const tagsByCategory = {
  "ai-assistants": ["assistant", "chat", "workflow"],
  coding: ["developer", "code", "ide"],
  design: ["image", "ui", "creative"],
  "video-audio": ["video", "audio", "creator"],
  research: ["search", "citation", "analysis"],
  automation: ["workflow", "integration", "ops"],
  business: ["marketing", "presentation", "growth"],
  productivity: ["notes", "planning", "execution"],
};

async function main() {
  await prisma.tool.deleteMany();
  await prisma.category.deleteMany();
  await prisma.guide.deleteMany();
  await prisma.adminUser.deleteMany();

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  for (const [name, slug, categorySlug, pricingType, rating, shortDescription] of tools) {
    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    await prisma.tool.create({
      data: {
        name,
        slug,
        categoryId: category.id,
        pricingType,
        startingPrice: pricingType === "Free" ? "Free" : pricingType === "Freemium" ? "$0+" : "$20/mo",
        rating,
        shortDescription,
        longDescription: `${name} is a practical tool for builders who need speed without losing quality in production workflows.`,
        bestFor: "Founders, developers, and operators shipping fast",
        pros,
        cons,
        useCases: JSON.stringify(useCasesByCategory[categorySlug] || ["General Productivity"]),
        tags: JSON.stringify(["ai", "builder", ...(tagsByCategory[categorySlug] || ["workflow"])]),
        websiteUrl: `https://${slug}.com`,
        isEditorsPick: ["chatgpt", "claude", "cursor", "perplexity", "github-copilot", "n8n", "elevenlabs"].includes(slug),
        isHot: ["codex", "v0", "bolt", "replit", "runway", "luma-dream-machine"].includes(slug),
      },
    });
  }

  for (const guide of guides) {
    await prisma.guide.create({ data: guide });
  }

  const adminHash = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.create({
    data: {
      email: "admin@aistacklab.dev",
      password: adminHash,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
