import { Category, Guide, Tool } from "@/lib/types";
import WEBSITE_URLS from "@/data/tool-urls.json";

const WEBSITE_URLS_MAP = WEBSITE_URLS as Record<string, string>;
const websiteUrlForSlug = (slug: string): string => WEBSITE_URLS_MAP[slug] ?? `https://${slug}.com`;

export const categories: Category[] = [
  { id: "c1", name: "AI Assistants", slug: "ai-assistants", description: "General-purpose assistants for writing, ideation, and rapid execution." },
  { id: "c2", name: "Coding", slug: "coding", description: "Code generation, review, and agentic development workflows." },
  { id: "c3", name: "Design", slug: "design", description: "Visual design, image generation, and creative production tools." },
  { id: "c4", name: "Video & Audio", slug: "video-audio", description: "Creation and editing tools for voice, audio, and video output." },
  { id: "c5", name: "Research", slug: "research", description: "Search, synthesis, and knowledge workflow tools." },
  { id: "c6", name: "Automation", slug: "automation", description: "Workflow orchestration and task automation stacks." },
  { id: "c7", name: "Business", slug: "business", description: "Decks, docs, and operational tools for teams and founders." },
  { id: "c8", name: "Productivity", slug: "productivity", description: "Fast iteration and shipping tools for modern builders." },
];

const t = (
  id: string,
  name: string,
  slug: string,
  categorySlug: string,
  pricingType: Tool["pricingType"],
  rating: number,
  shortDescription: string,
): Tool => ({
  id,
  name,
  slug,
  categorySlug,
  pricingType,
  rating,
  shortDescription,
  longDescription: `${name} is a practical tool for builders who need speed without losing quality in production workflows.`,
  bestFor: "Founders, developers, and operators shipping fast",
  pros: ["Fast to onboard", "Strong output quality", "Reliable for daily workflows"],
  cons: ["Can get expensive at scale", "Output still needs human review"],
  useCases: ["Rapid prototyping", "Content generation", "Team workflow acceleration"],
  tags: ["ai", "builder", "workflow"],
  websiteUrl: websiteUrlForSlug(slug),
  isEditorsPick: ["chatgpt", "claude", "cursor", "perplexity", "github-copilot"].includes(slug),
  isHot: ["codex", "v0", "bolt", "replit"].includes(slug),
  alternatives: ["chatgpt", "claude", "gemini"].filter((s) => s !== slug),
  startingPrice: pricingType === "Free" ? "Free" : "$20/mo",
});

export const tools: Tool[] = [
  t("t1", "ChatGPT", "chatgpt", "ai-assistants", "Freemium", 4.8, "Flexible assistant for writing, coding, and ideation."),
  t("t2", "Claude", "claude", "ai-assistants", "Freemium", 4.7, "Great reasoning depth and long-form outputs."),
  t("t3", "Gemini", "gemini", "ai-assistants", "Freemium", 4.4, "Google-native assistant with broad integrations."),
  t("t4", "Perplexity", "perplexity", "research", "Freemium", 4.6, "Citation-first research and answer engine."),
  t("t5", "Cursor", "cursor", "coding", "Paid", 4.8, "AI-first IDE for pair programming and refactors."),
  t("t6", "GitHub Copilot", "github-copilot", "coding", "Paid", 4.5, "In-editor completion and chat for coding teams."),
  t("t7", "Codex", "codex", "coding", "Paid", 4.5, "Agent-style coding support for practical implementation."),
  t("t8", "Claude Code", "claude-code", "coding", "Paid", 4.4, "Terminal-native coding assistant workflows."),
  t("t9", "Midjourney", "midjourney", "design", "Paid", 4.6, "High-quality image generation for creative direction."),
  t("t10", "Ideogram", "ideogram", "design", "Freemium", 4.3, "Image generation with strong text rendering."),
  t("t11", "Runway", "runway", "video-audio", "Paid", 4.4, "AI video generation and editing workflows."),
  t("t12", "PixVerse", "pixverse", "video-audio", "Freemium", 4.1, "Fast short-form AI video experiments."),
  t("t13", "ElevenLabs", "elevenlabs", "video-audio", "Freemium", 4.6, "Natural voice generation and dubbing."),
  t("t14", "Descript", "descript", "video-audio", "Freemium", 4.2, "Transcript-first audio and podcast editing."),
  t("t15", "NotebookLM", "notebooklm", "research", "Free", 4.4, "Summarize and reason over your own sources."),
  t("t16", "Gamma", "gamma", "business", "Freemium", 4.2, "Create polished decks and docs quickly."),
  t("t17", "Canva", "canva", "design", "Freemium", 4.5, "Visual design suite with AI productivity features."),
  t("t18", "n8n", "n8n", "automation", "Free", 4.6, "Open workflow automation with strong control."),
  t("t19", "Make", "make", "automation", "Freemium", 4.3, "Visual automation scenarios for ops and marketing."),
  t("t20", "Zapier", "zapier", "automation", "Freemium", 4.2, "Simple trigger-action automation across apps."),
  t("t21", "Lovable", "lovable", "productivity", "Freemium", 4.0, "Prompt-to-app workflows for quick experiments."),
  t("t22", "Bolt", "bolt", "productivity", "Freemium", 4.0, "Rapid AI app scaffolding and iteration."),
  t("t23", "Replit", "replit", "coding", "Freemium", 4.3, "Cloud IDE with collaborative AI coding support."),
  t("t24", "V0", "v0", "design", "Freemium", 4.4, "Generate UI and front-end building blocks quickly."),
];

export const guides: Guide[] = [
  {
    id: "g1",
    title: "Best AI Tools for Solo Founders",
    slug: "best-ai-tools-for-solo-founders",
    excerpt: "A practical starter stack for solo builders shipping quickly.",
    content: "A practical starter stack for solo builders shipping quickly.",
    type: "Starter Pack",
    readingTime: "8 min",
    publishedAt: "2026-04-20",
  },
  {
    id: "g2",
    title: "Cursor vs Codex: Which Should Developers Use?",
    slug: "cursor-vs-codex-which-should-developers-use",
    excerpt: "Direct comparison for coding-focused daily workflows.",
    content: "Direct comparison for coding-focused daily workflows.",
    type: "Comparison",
    readingTime: "11 min",
    publishedAt: "2026-04-18",
  },
  {
    id: "g3",
    title: "My AI Coding Stack for Shipping Faster",
    slug: "my-ai-coding-stack-for-shipping-faster",
    excerpt: "A no-fluff stack that balances speed with code quality.",
    content: "A no-fluff stack that balances speed with code quality.",
    type: "Workflow",
    readingTime: "7 min",
    publishedAt: "2026-04-16",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
export const getToolsByCategory = (categorySlug: string) => tools.filter((tool) => tool.categorySlug === categorySlug);
