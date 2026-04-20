import type { LucideIcon } from 'lucide-react';
import { Code2, Folder, Heart, Pin, Star } from 'lucide-react';

import { ItemTypeGlyph } from '@/components/dashboard/item-type-glyph';
import {
  getDashboardCollectionsModel,
  resolveDashboardUserId,
  type DashboardCollectionCard,
} from '@/lib/db/collections';
import { getDashboardItemsModel, type DashboardItemCard } from '@/lib/db/items';
import { cn } from '@/lib/utils';

function StatCard({
  label,
  value,
  icon: Icon,
  iconClassName,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClassName: string;
}) {
  return (
    <div className='flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm'>
      <span className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/50'>
        <Icon
          className={cn(
            'size-4 shrink-0 fill-none stroke-[1.9]',
            iconClassName,
          )}
          aria-hidden
        />
      </span>
      <div className='min-w-0'>
        <p className='font-heading text-3xl leading-none font-semibold tabular-nums tracking-tight'>
          {value}
        </p>
        <p className='mt-1 text-xs font-medium text-muted-foreground'>
          {label}
        </p>
      </div>
    </div>
  );
}

function CollectionCard({
  collection,
}: {
  collection: DashboardCollectionCard;
}) {
  return (
    <article
      className={cn(
        'flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm',
        'border-l-4',
      )}
      style={{ borderLeftColor: collection.accentColor }}
    >
      <div className='flex items-start justify-between gap-2'>
        <h3 className='min-w-0 text-sm font-semibold leading-snug'>
          {collection.name}
        </h3>
        {collection.isFavorite ? (
          <Star
            className='size-4 shrink-0 fill-amber-400 text-amber-400'
            aria-label='Favorite collection'
          />
        ) : (
          <span className='size-4 shrink-0' aria-hidden />
        )}
      </div>
      <p className='line-clamp-2 text-xs text-muted-foreground'>
        {collection.description ?? ''}
      </p>
      <div className='mt-auto flex flex-wrap items-center justify-between gap-2 pt-1'>
        <span className='text-xs tabular-nums text-muted-foreground'>
          {collection.itemCount} items
        </span>
        <div className='flex flex-wrap items-center justify-end gap-2'>
          {collection.typeNamesForGlyphs.map((label) => (
            <ItemTypeGlyph key={label} typeName={label} size='md' />
          ))}
        </div>
      </div>
    </article>
  );
}

function ItemRow({
  item,
  showPinColumn,
}: {
  item: DashboardItemCard;
  showPinColumn: boolean;
}) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg border border-border bg-card/60 px-3 py-3 sm:px-4',
        'border-l-4',
      )}
      style={{ borderLeftColor: item.accentColor }}
    >
      <div className='flex shrink-0 items-start pt-0.5'>
        <ItemTypeGlyph typeName={item.typeName} size='md' />
      </div>
      <div className='min-w-0 flex-1 space-y-1'>
        <div className='flex flex-wrap items-center gap-2'>
          <h4 className='text-sm font-semibold leading-snug'>{item.title}</h4>
          {item.isFavorite ? (
            <Star
              className='size-3.5 shrink-0 fill-amber-400 text-amber-400'
              aria-label='Favorite item'
            />
          ) : null}
          {showPinColumn && item.isPinned ? (
            <Pin className='size-4 shrink-0 text-primary' aria-label='Pinned' />
          ) : null}
        </div>
        <p className='line-clamp-2 text-xs text-muted-foreground'>
          {item.description}
        </p>
        <div className='flex flex-wrap items-center gap-x-2 gap-y-1 pt-0.5'>
          {item.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className='rounded-md bg-muted/80 px-1.5 py-0.5 text-[10px] text-muted-foreground'
            >
              {tag}
            </span>
          ))}
          <span className='ml-auto text-[10px] tabular-nums text-muted-foreground'>
            {item.updatedLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export async function DashboardOverview() {
  const userId = await resolveDashboardUserId();
  const [{ stats, collections: recentCollections }, itemsModel] = userId
    ? await Promise.all([
        getDashboardCollectionsModel(userId),
        getDashboardItemsModel(userId),
      ])
    : [
        {
          stats: {
            totalItems: 0,
            totalCollections: 0,
            favoriteItems: 0,
            favoriteCollections: 0,
          },
          collections: [] as DashboardCollectionCard[],
        },
        {
          pinned: [] as DashboardItemCard[],
          recent: [] as DashboardItemCard[],
        },
      ];

  const { totalItems, totalCollections, favoriteItems, favoriteCollections } =
    stats;

  const { pinned: pinnedItems, recent: recentItems } = itemsModel;

  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col gap-8'>
      <header className='space-y-1'>
        <h1 className='font-heading text-3xl font-semibold tracking-tight'>
          Dashboard
        </h1>
        <p className='text-sm text-muted-foreground'>
          Your developer knowledge hub.
        </p>
      </header>

      <section aria-label='Summary statistics' className='space-y-3'>
        <h2 className='sr-only'>Stats</h2>
        <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          <StatCard
            label='Total items'
            value={totalItems}
            icon={Code2}
            iconClassName='text-sky-400 stroke-sky-400'
          />
          <StatCard
            label='Collections'
            value={totalCollections}
            icon={Folder}
            iconClassName='text-violet-400 stroke-violet-400'
          />
          <StatCard
            label='Favorite items'
            value={favoriteItems}
            icon={Star}
            iconClassName='text-orange-400 stroke-orange-400'
          />
          <StatCard
            label='Favorite collections'
            value={favoriteCollections}
            icon={Heart}
            iconClassName='text-pink-400 stroke-pink-400'
          />
        </div>
      </section>

      <section aria-labelledby='collections-heading' className='space-y-3'>
        <div className='flex items-end justify-between gap-2'>
          <h2
            id='collections-heading'
            className='text-lg font-semibold tracking-tight'
          >
            Recent collections
          </h2>
          <span className='text-xs font-medium text-muted-foreground'>
            View all
          </span>
        </div>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {recentCollections.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </section>

      {pinnedItems.length > 0 ? (
        <section aria-labelledby='pinned-heading' className='space-y-3'>
          <h2
            id='pinned-heading'
            className='text-lg font-semibold tracking-tight'
          >
            Pinned
          </h2>
          <div className='flex flex-col gap-2'>
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} showPinColumn />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby='recent-items-heading' className='space-y-3'>
        <h2
          id='recent-items-heading'
          className='text-lg font-semibold tracking-tight'
        >
          Recent items
        </h2>
        <div className='flex flex-col gap-2'>
          {recentItems.map((item) => (
            <ItemRow key={item.id} item={item} showPinColumn={false} />
          ))}
        </div>
      </section>
    </div>
  );
}
