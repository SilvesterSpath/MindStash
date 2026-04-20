import { hash } from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { ContentType, PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const DEMO_EMAIL = "demo@devstash.io";
const DEMO_PASSWORD = "12345678";
const BCRYPT_ROUNDS = 12;

const systemItemTypes = [
  { name: "snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { name: "command", icon: "Terminal", color: "#f97316", isSystem: true },
  { name: "note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { name: "file", icon: "File", color: "#6b7280", isSystem: true },
  { name: "image", icon: "Image", color: "#ec4899", isSystem: true },
  { name: "link", icon: "Link", color: "#10b981", isSystem: true },
] as const;

async function ensureSystemItemTypes(): Promise<Map<string, string>> {
  const byName = new Map<string, string>();

  for (const type of systemItemTypes) {
    let row = await prisma.itemType.findFirst({
      where: { name: type.name, userId: null },
      select: { id: true },
    });

    if (!row) {
      row = await prisma.itemType.create({
        data: type,
        select: { id: true },
      });
    } else {
      await prisma.itemType.update({
        where: { id: row.id },
        data: {
          icon: type.icon,
          color: type.color,
          isSystem: type.isSystem,
        },
      });
    }

    byName.set(type.name, row.id);
  }

  return byName;
}

async function upsertDemoUser() {
  const password = await hash(DEMO_PASSWORD, BCRYPT_ROUNDS);
  const emailVerified = new Date();

  return prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    create: {
      email: DEMO_EMAIL,
      name: "Demo User",
      password,
      isPro: false,
      emailVerified,
    },
    update: {
      name: "Demo User",
      password,
      isPro: false,
      emailVerified,
    },
  });
}

async function resetDemoUserContent(userId: string) {
  await prisma.item.deleteMany({ where: { userId } });
  await prisma.collection.deleteMany({ where: { userId } });
}

/** Inserts `item_collections` in the same statement as the item (no follow-up queries). */
async function createItemInCollection(
  collectionId: string,
  data: {
    userId: string;
    itemTypeId: string;
    title: string;
    contentType: (typeof ContentType)[keyof typeof ContentType];
    content?: string | null;
    language?: string | null;
    url?: string | null;
    description?: string | null;
    isPinned?: boolean;
    isFavorite?: boolean;
  },
) {
  await prisma.item.create({
    data: {
      title: data.title,
      contentType: data.contentType,
      content: data.content ?? null,
      language: data.language ?? null,
      url: data.url ?? null,
      description: data.description ?? null,
      isPinned: data.isPinned ?? false,
      isFavorite: data.isFavorite ?? false,
      userId: data.userId,
      itemTypeId: data.itemTypeId,
      collections: { create: [{ collectionId }] },
    },
  });
}

async function main() {
  const types = await ensureSystemItemTypes();
  const user = await upsertDemoUser();
  await resetDemoUserContent(user.id);

  const snippetId = types.get("snippet")!;
  const promptId = types.get("prompt")!;
  const commandId = types.get("command")!;
  const linkId = types.get("link")!;

  const react = await prisma.collection.create({
    data: {
      userId: user.id,
      name: "React Patterns",
      description: "Reusable React patterns and hooks",
      defaultTypeId: snippetId,
    },
  });

  const ai = await prisma.collection.create({
    data: {
      userId: user.id,
      name: "AI Workflows",
      description: "AI prompts and workflow automations",
      defaultTypeId: promptId,
    },
  });

  const devops = await prisma.collection.create({
    data: {
      userId: user.id,
      name: "DevOps",
      description: "Infrastructure and deployment resources",
    },
  });

  const terminal = await prisma.collection.create({
    data: {
      userId: user.id,
      name: "Terminal Commands",
      description: "Useful shell commands for everyday development",
      defaultTypeId: commandId,
    },
  });

  const design = await prisma.collection.create({
    data: {
      userId: user.id,
      name: "Design Resources",
      description: "UI/UX resources and references",
      defaultTypeId: linkId,
    },
  });

  await createItemInCollection(react.id, {
    userId: user.id,
    itemTypeId: snippetId,
    title: "Custom hooks (debounce, storage, media)",
    contentType: ContentType.TEXT,
    language: "typescript",
    isPinned: true,
    content: `import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota / private mode */
    }
  }, [key, value]);
  return [value, setValue] as const;
}`,
  });

  await createItemInCollection(react.id, {
    userId: user.id,
    itemTypeId: snippetId,
    title: "Context providers & compound components",
    contentType: ContentType.TEXT,
    language: "typescript",
    isPinned: true,
    content: `// Theme context + compound Tabs (simplified pattern)

import { createContext, useContext, useMemo, type ReactNode } from "react";

const ThemeCtx = createContext<{ tone: "light" | "dark" } | null>(null);
export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeProvider({
  tone,
  children,
}: {
  tone: "light" | "dark";
  children: ReactNode;
}) {
  const value = useMemo(() => ({ tone }), [tone]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}`,
  });

  await createItemInCollection(react.id, {
    userId: user.id,
    itemTypeId: snippetId,
    title: "Utility helpers (formatting & guards)",
    contentType: ContentType.TEXT,
    language: "typescript",
    content: `export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}`,
  });

  await createItemInCollection(ai.id, {
    userId: user.id,
    itemTypeId: promptId,
    title: "Structured code review",
    contentType: ContentType.TEXT,
    content: `You are a senior engineer reviewing a pull request.

Checklist:
- Correctness & edge cases
- API / typing clarity
- Tests or risk if untested
- Security (authz, injection, secrets)
- Performance hotspots

Output:
1) Summary (2–4 bullets)
2) Blocking issues (if any)
3) Suggestions ordered by impact
4) Optional nits (prefix with "nit:")`,
  });

  await createItemInCollection(ai.id, {
    userId: user.id,
    itemTypeId: promptId,
    title: "Documentation from code",
    contentType: ContentType.TEXT,
    content: `Given a module or public API, produce concise documentation.

Include:
- Purpose / when to use
- Key types and function signatures (TypeScript)
- Minimal runnable example
- Common pitfalls
- Related modules

Tone: clear, skimmable headings, short paragraphs.`,
  });

  await createItemInCollection(ai.id, {
    userId: user.id,
    itemTypeId: promptId,
    title: "Safe refactor plan",
    contentType: ContentType.TEXT,
    content: `You are helping refactor legacy code safely.

Steps:
1) Restate the goal and constraints.
2) Map current behavior (inputs/outputs, side effects).
3) Propose incremental steps with checkpoints.
4) List tests to add or extend before each risky change.
5) Flag unknowns and how to validate them quickly.

Prefer small PR-sized steps over a big-bang rewrite.`,
  });

  await createItemInCollection(devops.id, {
    userId: user.id,
    itemTypeId: snippetId,
    title: "Multi-stage Docker build (Node)",
    contentType: ContentType.TEXT,
    language: "dockerfile",
    content: `# syntax=docker/dockerfile:1
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]`,
  });

  await createItemInCollection(devops.id, {
    userId: user.id,
    itemTypeId: commandId,
    title: "Deploy (blue/green style)",
    contentType: ContentType.TEXT,
    content: `#!/usr/bin/env bash
set -euo pipefail
TAG=\${TAG:-$(git rev-parse --short HEAD)}
echo "Building \${TAG}..."
docker build -t app:"\${TAG}" .
echo "Rolling update (replace with your orchestrator)..."
# kubectl set image deploy/app app=app:\${TAG}
# or your PaaS CLI here
echo "Post-deploy smoke..."
curl -fsS https://example.com/healthz`,
  });

  await createItemInCollection(devops.id, {
    userId: user.id,
    itemTypeId: linkId,
    title: "Docker — Get started",
    contentType: ContentType.URL,
    url: "https://docs.docker.com/get-started/",
    description: "Official Docker introduction and fundamentals.",
  });

  await createItemInCollection(devops.id, {
    userId: user.id,
    itemTypeId: linkId,
    title: "GitHub Actions documentation",
    contentType: ContentType.URL,
    url: "https://docs.github.com/en/actions",
    description: "CI/CD workflows, runners, and deployment patterns.",
  });

  await createItemInCollection(terminal.id, {
    userId: user.id,
    itemTypeId: commandId,
    title: "Git: compact history & bisect",
    contentType: ContentType.TEXT,
    content: `# Recent commits (oneline)
git log --oneline -n 20

# Find the commit that introduced a bug
git bisect start
git bisect bad                 # current commit is bad
git bisect good v1.2.0         # last known good
# test, then: git bisect good|bad until found`,
  });

  await createItemInCollection(terminal.id, {
    userId: user.id,
    itemTypeId: commandId,
    title: "Docker: inspect running containers",
    contentType: ContentType.TEXT,
    content: `docker ps
docker ps -a --filter "name=web"
docker logs -f --tail=200 web
docker exec -it web sh`,
  });

  await createItemInCollection(terminal.id, {
    userId: user.id,
    itemTypeId: commandId,
    title: "Process & ports (Windows / Unix)",
    contentType: ContentType.TEXT,
    content: `# Windows (PowerShell)
Get-Process node | Select-Object Id, CPU, WS

# Unix-like
ps aux | rg node
lsof -iTCP:3000 -sTCP:LISTEN`,
  });

  await createItemInCollection(terminal.id, {
    userId: user.id,
    itemTypeId: commandId,
    title: "Package managers: audit & dedupe",
    contentType: ContentType.TEXT,
    content: `npm outdated
npm audit --omit=dev

pnpm outdated
pnpm dedupe

# Recreate lockfile if needed (destructive; commit carefully)
rm -rf node_modules && npm ci`,
  });

  await createItemInCollection(design.id, {
    userId: user.id,
    itemTypeId: linkId,
    title: "MDN — CSS reference",
    contentType: ContentType.URL,
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    description: "Authoritative CSS property reference and guides.",
  });

  await createItemInCollection(design.id, {
    userId: user.id,
    itemTypeId: linkId,
    title: "Tailwind CSS documentation",
    contentType: ContentType.URL,
    url: "https://tailwindcss.com/docs",
    description: "Utility-first styling, configuration, and plugins.",
  });

  await createItemInCollection(design.id, {
    userId: user.id,
    itemTypeId: linkId,
    title: "shadcn/ui",
    contentType: ContentType.URL,
    url: "https://ui.shadcn.com/",
    description: "Copy-paste React components built on Radix + Tailwind.",
  });

  await createItemInCollection(design.id, {
    userId: user.id,
    itemTypeId: linkId,
    title: "Lucide icons",
    contentType: ContentType.URL,
    url: "https://lucide.dev/icons/",
    description: "Icon set used across this stack; searchable by name.",
  });

  const [itemCount, junctionCount] = await Promise.all([
    prisma.item.count({ where: { userId: user.id } }),
    prisma.itemCollection.count({
      where: { collection: { userId: user.id } },
    }),
  ]);

  console.log(
    `Seed completed: demo user, system types, 5 collections, ${itemCount} items, ${junctionCount} collection links (item_collections).`,
  );
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
