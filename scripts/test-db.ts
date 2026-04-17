import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const DEMO_EMAIL = "demo@devstash.io";

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Add it to .env before running this script.");
  }

  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("Database connection successful.");

    const demoUser = await prisma.user.findUnique({
      where: { email: DEMO_EMAIL },
      select: {
        id: true,
        email: true,
        name: true,
        isPro: true,
        emailVerified: true,
        collections: {
          orderBy: { name: "asc" },
          select: {
            id: true,
            name: true,
            description: true,
            defaultType: { select: { name: true } },
            items: {
              select: {
                item: {
                  select: {
                    id: true,
                    title: true,
                    contentType: true,
                    itemType: { select: { name: true } },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!demoUser) {
      throw new Error(`Demo user not found (${DEMO_EMAIL}). Run prisma seed first.`);
    }

    const [systemTypeCount, itemCount, junctionCount] = await Promise.all([
      prisma.itemType.count({ where: { isSystem: true, userId: null } }),
      prisma.item.count({ where: { userId: demoUser.id } }),
      prisma.itemCollection.count({ where: { collection: { userId: demoUser.id } } }),
    ]);

    const expected = {
      collections: 5,
      items: 18,
      links: 18,
      systemTypes: 7,
    };

    const actualCollections = demoUser.collections.length;
    const checks = [
      { label: "system item types", expected: expected.systemTypes, actual: systemTypeCount },
      { label: "collections", expected: expected.collections, actual: actualCollections },
      { label: "items", expected: expected.items, actual: itemCount },
      { label: "item_collections links", expected: expected.links, actual: junctionCount },
    ];

    console.log("");
    console.log("Demo user:");
    console.log(`- Email: ${demoUser.email}`);
    console.log(`- Name: ${demoUser.name ?? "(null)"}`);
    console.log(`- isPro: ${demoUser.isPro}`);
    console.log(`- emailVerified: ${demoUser.emailVerified?.toISOString() ?? "(null)"}`);

    console.log("");
    console.log("Seed data checks:");
    for (const check of checks) {
      const status = check.actual === check.expected ? "OK" : "MISMATCH";
      console.log(
        `- ${status}: ${check.label} (expected ${check.expected}, got ${check.actual})`,
      );
    }

    console.log("");
    console.log("Collections and items:");
    for (const collection of demoUser.collections) {
      const typeName = collection.defaultType?.name ?? "none";
      console.log(`- ${collection.name} [defaultType: ${typeName}]`);
      console.log(`  Description: ${collection.description ?? "(none)"}`);
      console.log(`  Items: ${collection.items.length}`);
      for (const relation of collection.items) {
        const item = relation.item;
        console.log(`    • ${item.title} (${item.itemType.name} / ${item.contentType})`);
      }
    }

    const hasMismatch = checks.some((check) => check.actual !== check.expected);
    if (hasMismatch) {
      throw new Error("Seed verification failed. One or more counts do not match the expected demo dataset.");
    }

    console.log("");
    console.log("All seed checks passed.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error("Database test failed.");
  console.error(error);
  process.exit(1);
});
