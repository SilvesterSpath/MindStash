import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Add it to .env before running this script.");
  }

  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    const userCount = await prisma.user.count();
    const itemTypeCount = await prisma.itemType.count();

    console.log("Database connection successful.");
    console.log(`Users: ${userCount}`);
    console.log(`ItemTypes: ${itemTypeCount}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error("Database test failed.");
  console.error(error);
  process.exit(1);
});
