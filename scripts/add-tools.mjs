import { PrismaClient } from "@prisma/client";
import websiteUrls from "../data/tool-urls.json" with { type: "json" };

const prisma = new PrismaClient();
const urlFor = (slug) => websiteUrls[slug] || `https://${slug}.com`;

// New tools to upsert. Format: [name, slug, categorySlug, pricing, rating, shortDesc]
const NEW_TOOLS = [
  ["Comet", "comet", "research", "Free", 4.4, "Perplexity's agentic AI browser — free worldwide, handles multi-step web tasks."],
  ["Manus", "manus", "automation", "Freemium", 4.2, "General-purpose autonomous AI agent for complex, multi-step tasks."],
  ["Cline", "cline", "coding", "Free", 4.5, "Open-source autonomous coding agent for VS Code, JetBrains, Cursor, and more."],
  ["Higgsfield", "higgsfield", "video-audio", "Freemium", 4.3, "Aggregates 15+ AI video models — Sora, Veo, Kling — in one subscription."],
];

const EDITORS_PICK = new Set([]);
const HOT = new Set(["comet", "manus", "cline"]);

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
