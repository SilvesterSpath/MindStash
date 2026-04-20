import { prisma } from "@/lib/prisma";

const DEFAULT_DASHBOARD_USER_EMAIL =
  process.env.DASHBOARD_USER_EMAIL ?? "demo@devstash.io";

/** Map DB `item_types.name` (e.g. `snippet`) to UI label used by `ItemTypeGlyph` (`Snippet`). */
export function itemTypeNameToDisplay(dbName: string): string {
  if (!dbName) return dbName;
  return dbName.charAt(0).toUpperCase() + dbName.slice(1).toLowerCase();
}

export async function resolveDashboardUserId(): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email: DEFAULT_DASHBOARD_USER_EMAIL },
    select: { id: true },
  });
  return user?.id ?? null;
}

export type DashboardCollectionCard = {
  id: string;
  name: string;
  description: string | null;
  itemCount: number;
  isFavorite: boolean;
  accentColor: string;
  typeNamesForGlyphs: string[];
};

export type DashboardCollectionStats = {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
};

export async function getDashboardCollectionStats(
  userId: string,
): Promise<DashboardCollectionStats> {
  const [totalItems, totalCollections, favoriteItems, favoriteCollections] =
    await Promise.all([
      prisma.item.count({ where: { userId } }),
      prisma.collection.count({ where: { userId } }),
      prisma.item.count({ where: { userId, isFavorite: true } }),
      prisma.collection.count({ where: { userId, isFavorite: true } }),
    ]);

  return {
    totalItems,
    totalCollections,
    favoriteItems,
    favoriteCollections,
  };
}

function pickDominantAccent(
  typeStats: Map<
    string,
    { count: number; color: string; displayName: string }
  >,
): string {
  let best: { count: number; color: string; displayName: string } | null = null;
  for (const stat of typeStats.values()) {
    if (!best) {
      best = stat;
      continue;
    }
    if (stat.count > best.count) {
      best = stat;
    } else if (stat.count === best.count) {
      if (stat.displayName.localeCompare(best.displayName) < 0) {
        best = stat;
      }
    }
  }
  return best?.color ?? "#6b7280";
}

function toCollectionCard(
  row: {
    id: string;
    name: string;
    description: string | null;
    isFavorite: boolean;
    defaultType: { id: string; name: string; color: string } | null;
    items: {
      addedAt: Date;
      item: { itemType: { id: string; name: string; color: string } };
    }[];
  },
): DashboardCollectionCard {
  const typeStats = new Map<
    string,
    { count: number; color: string; displayName: string }
  >();

  for (const link of row.items) {
    const t = link.item.itemType;
    const displayName = itemTypeNameToDisplay(t.name);
    const existing = typeStats.get(t.id);
    if (existing) {
      existing.count += 1;
    } else {
      typeStats.set(t.id, { count: 1, color: t.color, displayName });
    }
  }

  let accentColor = pickDominantAccent(typeStats);
  if (typeStats.size === 0 && row.defaultType) {
    accentColor = row.defaultType.color;
  }

  const typeNamesForGlyphs = [...typeStats.values()]
    .map((s) => s.displayName)
    .sort((a, b) => a.localeCompare(b));

  if (typeNamesForGlyphs.length === 0 && row.defaultType) {
    typeNamesForGlyphs.push(itemTypeNameToDisplay(row.defaultType.name));
  }

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    itemCount: row.items.length,
    isFavorite: row.isFavorite,
    accentColor,
    typeNamesForGlyphs,
  };
}

export async function getRecentDashboardCollections(
  userId: string,
  limit: number,
): Promise<DashboardCollectionCard[]> {
  const rows = await prisma.collection.findMany({
    where: { userId },
    include: {
      defaultType: { select: { id: true, name: true, color: true } },
      items: {
        select: {
          addedAt: true,
          item: {
            select: {
              itemType: { select: { id: true, name: true, color: true } },
            },
          },
        },
      },
    },
  });

  const scored = rows.map((row) => {
    const latest = row.items.reduce(
      (acc, ic) => (ic.addedAt > acc ? ic.addedAt : acc),
      new Date(0),
    );
    return { row, latest };
  });

  scored.sort((a, b) => {
    const byLatest = b.latest.getTime() - a.latest.getTime();
    if (byLatest !== 0) return byLatest;
    return b.row.updatedAt.getTime() - a.row.updatedAt.getTime();
  });

  return scored.slice(0, limit).map((s) => toCollectionCard(s.row));
}

export async function getDashboardHomeCollectionsModel(
  userId: string,
  collectionLimit = 6,
): Promise<{
  stats: DashboardCollectionStats;
  collections: DashboardCollectionCard[];
}> {
  const [stats, collections] = await Promise.all([
    getDashboardCollectionStats(userId),
    getRecentDashboardCollections(userId, collectionLimit),
  ]);
  return { stats, collections };
}
