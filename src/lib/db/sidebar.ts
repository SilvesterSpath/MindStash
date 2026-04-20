import { prisma } from '@/lib/prisma';

import { itemTypeNameToDisplay } from '@/lib/db/collections';

export type SidebarItemType = {
  id: string;
  /** Display name, e.g. "Snippet" */
  name: string;
  itemCount: number;
};

export type SidebarCollection = {
  id: string;
  name: string;
  isFavorite: boolean;
  /** Dominant item-type color – used as the accent circle for recent collections. */
  accentColor: string;
};

export type SidebarData = {
  itemTypes: SidebarItemType[];
  favoriteCollections: SidebarCollection[];
  recentCollections: SidebarCollection[];
};

function pickDominantColor(
  items: { itemType: { id: string; name: string; color: string } }[],
): string {
  const counts = new Map<string, { count: number; color: string; name: string }>();
  for (const { itemType: t } of items) {
    const existing = counts.get(t.id);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(t.id, { count: 1, color: t.color, name: itemTypeNameToDisplay(t.name) });
    }
  }
  let best: { count: number; color: string; name: string } | null = null;
  for (const entry of counts.values()) {
    if (
      !best ||
      entry.count > best.count ||
      (entry.count === best.count && entry.name.localeCompare(best.name) < 0)
    ) {
      best = entry;
    }
  }
  return best?.color ?? '#6b7280';
}

export async function getSidebarData(
  userId: string,
  recentCollectionLimit = 8,
): Promise<SidebarData> {
  const ITEM_TYPE_ORDER: string[] = [
    'snippet',
    'prompt',
    'command',
    'note',
    'file',
    'image',
    'link',
  ];

  const [rawTypes, favoriteRows, recentRows] = await Promise.all([
    prisma.itemType.findMany({
      where: { isSystem: true },
      include: {
        items: {
          where: { userId },
          select: { id: true },
        },
      },
    }),

    prisma.collection.findMany({
      where: { userId, isFavorite: true },
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    }),

    prisma.collection.findMany({
      where: { userId, isFavorite: false },
      orderBy: { updatedAt: 'desc' },
      take: recentCollectionLimit,
      include: {
        items: {
          select: {
            item: {
              select: {
                itemType: { select: { id: true, name: true, color: true } },
              },
            },
          },
        },
      },
    }),
  ]);

  const itemTypes: SidebarItemType[] = rawTypes
    .sort((a, b) => {
      const ai = ITEM_TYPE_ORDER.indexOf(a.name.toLowerCase());
      const bi = ITEM_TYPE_ORDER.indexOf(b.name.toLowerCase());
      const aPos = ai === -1 ? ITEM_TYPE_ORDER.length : ai;
      const bPos = bi === -1 ? ITEM_TYPE_ORDER.length : bi;
      return aPos - bPos;
    })
    .map((t) => ({
      id: t.id,
      name: itemTypeNameToDisplay(t.name),
      itemCount: t.items.length,
    }));

  const favoriteCollections: SidebarCollection[] = favoriteRows.map((c) => ({
    id: c.id,
    name: c.name,
    isFavorite: true,
    accentColor: '#6b7280',
  }));

  const recentCollections: SidebarCollection[] = recentRows.map((c) => ({
    id: c.id,
    name: c.name,
    isFavorite: false,
    accentColor: pickDominantColor(c.items.map((ic) => ic.item)),
  }));

  return { itemTypes, favoriteCollections, recentCollections };
}
