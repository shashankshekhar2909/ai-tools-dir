import { PrismaClient } from "@prisma/client";
import websiteUrls from "../data/tool-urls.json" with { type: "json" };

const prisma = new PrismaClient();
const urlFor = (slug) => websiteUrls[slug] || `https://${slug}.com`;

// New tools to upsert. Format: [name, slug, categorySlug, pricing, rating, shortDesc]
const NEW_TOOLS = [
  ["Mistral Le Chat", "mistral", "ai-assistants", "Freemium", 4.3, "European-built assistant with strong open models."],
  ["Grok", "grok", "ai-assistants", "Paid", 4.1, "X-integrated assistant with real-time context."],
  ["DeepSeek", "deepseek", "ai-assistants", "Free", 4.4, "Open-weight assistant with strong reasoning at low cost."],
  ["Qwen", "qwen", "ai-assistants", "Free", 4.2, "Alibaba's open assistant with multilingual strength."],
  ["Meta AI", "meta-ai", "ai-assistants", "Free", 4.0, "Llama-powered assistant across Meta apps."],

  ["Windsurf", "windsurf", "coding", "Freemium", 4.5, "Agentic IDE with deep codebase awareness."],
  ["Devin", "devin", "coding", "Paid", 4.2, "Autonomous AI software engineer for delegated tasks."],
  ["Zed", "zed", "coding", "Freemium", 4.4, "High-performance editor with collaborative AI."],
  ["Phind", "phind", "coding", "Freemium", 4.2, "Search-first AI assistant for developers."],
  ["Warp", "warp", "coding", "Freemium", 4.4, "AI-native terminal with command suggestions."],
  ["Augment Code", "augment-code", "coding", "Paid", 4.3, "Enterprise codebase-aware AI assistant."],
  ["Trae", "trae", "coding", "Free", 4.0, "ByteDance's AI coding IDE."],

  ["Recraft", "recraft", "design", "Freemium", 4.4, "Vector-aware image generation for brand work."],
  ["Magnific", "magnific", "design", "Paid", 4.5, "Upscaling and detail enhancement engine."],
  ["Flux", "flux", "design", "Freemium", 4.6, "Black Forest Labs' state-of-the-art image model."],
  ["Galileo AI", "galileo", "design", "Paid", 4.1, "Prompt-to-UI design generation."],
  ["Framer AI", "framer-ai", "design", "Freemium", 4.2, "AI-assisted site building inside Framer."],
  ["Photoroom", "photoroom", "design", "Freemium", 4.3, "Product photo cleanup and background magic."],
  ["Spline", "spline", "design", "Freemium", 4.2, "3D scene building with AI helpers."],
  ["Vizcom", "vizcom", "design", "Freemium", 4.1, "Industrial design sketches to renders."],

  ["Sora", "sora", "video-audio", "Paid", 4.5, "OpenAI's flagship text-to-video model."],
  ["Veo", "veo", "video-audio", "Paid", 4.4, "Google DeepMind's cinematic video generation."],
  ["Kling", "kling", "video-audio", "Freemium", 4.3, "Long-form realistic AI video clips."],
  ["Suno", "suno", "video-audio", "Freemium", 4.6, "Full-song AI music generation with vocals."],
  ["Udio", "udio", "video-audio", "Freemium", 4.4, "High-fidelity music creation from text."],
  ["Hedra", "hedra", "video-audio", "Freemium", 4.2, "Character-driven AI video and avatars."],
  ["AssemblyAI", "assemblyai", "video-audio", "Freemium", 4.4, "Speech-to-text and audio intelligence APIs."],

  ["Exa", "exa", "research", "Freemium", 4.3, "Neural search API for builders and agents."],
  ["Genspark", "genspark", "research", "Freemium", 4.1, "Agent-based answer engine with sparkpages."],
  ["Glasp", "glasp", "research", "Free", 4.0, "Social highlighter and knowledge capture."],

  ["Lindy", "lindy", "automation", "Paid", 4.3, "AI agents that run real business workflows."],
  ["Relay", "relay", "automation", "Freemium", 4.2, "Human-in-the-loop AI automations."],
  ["Trigger.dev", "trigger-dev", "automation", "Free", 4.3, "Open-source background jobs and workflows."],
  ["Activepieces", "activepieces", "automation", "Free", 4.1, "Open-source no-code automation platform."],

  ["Beautiful.ai", "beautiful-ai", "business", "Paid", 4.1, "Smart slide layouts that design themselves."],
  ["Pitch", "pitch", "business", "Freemium", 4.2, "Collaborative deck-building with AI assistance."],
  ["Decktopus", "decktopus", "business", "Freemium", 4.0, "Prompt-driven slide creation."],

  ["Granola", "granola", "productivity", "Freemium", 4.5, "Background meeting notes that just work."],
  ["Raycast", "raycast", "productivity", "Freemium", 4.7, "macOS launcher with AI commands built-in."],
  ["Reflect", "reflect", "productivity", "Paid", 4.1, "Networked notes with AI synthesis."],
  ["Fathom", "fathom", "productivity", "Freemium", 4.4, "AI meeting recorder and summarizer."],
  ["Read AI", "read-ai", "productivity", "Freemium", 4.0, "Meeting analytics with AI sentiment."],
  ["tldraw", "tldraw", "productivity", "Free", 4.5, "Whiteboard with AI shape and flow generation."],
];

const EDITORS_PICK = new Set(["windsurf", "raycast", "suno", "flux"]);
const HOT = new Set(["sora", "veo", "devin", "granola", "deepseek", "kling", "exa"]);

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

const pros = JSON.stringify(["Fast to onboard", "Strong output quality", "Reliable for daily workflows"]);
const cons = JSON.stringify(["Can get expensive at scale", "Output still needs human review"]);

const priceFor = (pricing) =>
  pricing === "Free" ? "Free" : pricing === "Freemium" ? "$0+" : "$20/mo";

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const [name, slug, categorySlug, pricing, rating, shortDescription] of NEW_TOOLS) {
    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      console.warn(`! skip ${slug} — category '${categorySlug}' not found`);
      skipped++;
      continue;
    }
    const existing = await prisma.tool.findUnique({ where: { slug } });
    const data = {
      name,
      slug,
      categoryId: category.id,
      pricingType: pricing,
      startingPrice: priceFor(pricing),
      rating,
      shortDescription,
      longDescription: `${name} is a practical tool for builders who need speed without losing quality in production workflows.`,
      bestFor: "Founders, developers, and operators shipping fast",
      pros,
      cons,
      useCases: JSON.stringify(useCasesByCategory[categorySlug] || ["General Productivity"]),
      tags: JSON.stringify(["ai", "builder", ...(tagsByCategory[categorySlug] || ["workflow"])]),
      websiteUrl: urlFor(slug),
      isEditorsPick: EDITORS_PICK.has(slug),
      isHot: HOT.has(slug),
    };

    if (dryRun) {
      console.log(`${existing ? "UPDATE" : "INSERT"} ${slug}`);
      existing ? updated++ : inserted++;
      continue;
    }

    if (existing) {
      await prisma.tool.update({ where: { slug }, data });
      updated++;
      console.log(`~ updated ${slug}`);
    } else {
      await prisma.tool.create({ data });
      inserted++;
      console.log(`+ inserted ${slug}`);
    }
  }

  console.log(`\nDone. inserted=${inserted} updated=${updated} skipped=${skipped}${dryRun ? " (dry-run)" : ""}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
