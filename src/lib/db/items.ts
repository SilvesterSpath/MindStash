import { prisma } from '@/lib/prisma';

import { itemTypeNameToDisplay } from '@/lib/db/collections';

export type DashboardItemCard = {
  id: string;
  title: string;
  description: string;
  typeName: string;
  tags: string[];
  updatedLabel: string;
  isPinned: boolean;
  isFavorite: boolean;
  accentColor: string;
};

function formatItemUpdatedLabel(updatedAt: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(updatedAt);
}

function mapItemToDashboardCard(item: {
  id: string;
  title: string;
  description: string | null;
  updatedAt: Date;
  isPinned: boolean;
  isFavorite: boolean;
  itemType: { name: string; color: string };
  tags: { name: string }[];
}): DashboardItemCard {
  const tags = item.tags.map((t) => t.name).sort((a, b) => a.localeCompare(b));

  return {
    id: item.id,
    title: item.title,
    description: item.description ?? '',
    typeName: itemTypeNameToDisplay(item.itemType.name),
    tags,
    updatedLabel: formatItemUpdatedLabel(item.updatedAt),
    isPinned: item.isPinned,
    isFavorite: item.isFavorite,
    accentColor: item.itemType.color,
  };
}

const itemListInclude = {
  itemType: { select: { name: true, color: true } },
  tags: { select: { name: true } },
} as const;

export async function getPinnedDashboardItems(
  userId: string,
): Promise<DashboardItemCard[]> {
  const rows = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: 'desc' },
    include: itemListInclude,
  });
  return rows.map(mapItemToDashboardCard);
}

export async function getRecentDashboardItems(
  userId: string,
  limit: number,
): Promise<DashboardItemCard[]> {
  const rows = await prisma.item.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    take: limit,
    include: itemListInclude,
  });
  return rows.map(mapItemToDashboardCard);
}

export async function getDashboardItemsModel(
  userId: string,
  recentLimit = 10,
): Promise<{
  pinned: DashboardItemCard[];
  recent: DashboardItemCard[];
}> {
  const [pinned, recent] = await Promise.all([
    getPinnedDashboardItems(userId),
    getRecentDashboardItems(userId, recentLimit),
  ]);
  return { pinned, recent };
}
