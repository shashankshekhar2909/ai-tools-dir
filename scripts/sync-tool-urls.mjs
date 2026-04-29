import { PrismaClient } from "@prisma/client";
import websiteUrls from "../data/tool-urls.json" with { type: "json" };

const prisma = new PrismaClient();
const shouldFix = process.argv.includes("--fix");

const defaultUrl = (slug) => `https://${slug}.com`;

async function main() {
  const tools = await prisma.tool.findMany({
    select: { id: true, name: true, slug: true, websiteUrl: true },
    orderBy: { name: "asc" },
  });

  const mismatches = [];
  for (const tool of tools) {
    const expected = websiteUrls[tool.slug] || defaultUrl(tool.slug);
    if (tool.websiteUrl !== expected) {
      mismatches.push({ ...tool, expected });
    }
  }

  if (mismatches.length === 0) {
    console.log("All tool URLs are already in sync.");
    return;
  }

  console.log(`Found ${mismatches.length} URL mismatch(es).`);
  for (const item of mismatches) {
    console.log(`- ${item.slug}: ${item.websiteUrl || "(empty)"} -> ${item.expected}`);
  }

  if (!shouldFix) {
    console.log("\nRun with --fix to apply updates.");
    return;
  }

  for (const item of mismatches) {
    await prisma.tool.update({
      where: { id: item.id },
      data: { websiteUrl: item.expected },
    });
  }

  console.log(`Applied ${mismatches.length} update(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
