import { Pin, Star } from "lucide-react";

import { mockCollections, mockItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 font-heading text-2xl font-semibold tabular-nums tracking-tight">
        {value}
      </p>
    </div>
  );
}

function CollectionCard({
  collection,
}: {
  collection: (typeof mockCollections)[number];
}) {
  return (
    <article
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm",
        "border-l-4"
      )}
      style={{ borderLeftColor: collection.accentColor }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="min-w-0 text-sm font-semibold leading-snug">
          {collection.name}
        </h3>
        {collection.isFavorite ? (
          <Star
            className="size-4 shrink-0 fill-amber-400 text-amber-400"
            aria-label="Favorite collection"
          />
        ) : (
          <span className="size-4 shrink-0" aria-hidden />
        )}
      </div>
      <p className="line-clamp-2 text-xs text-muted-foreground">
        {collection.description}
      </p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
        <span className="text-xs tabular-nums text-muted-foreground">
          {collection.itemCount} items
        </span>
        <div className="flex flex-wrap justify-end gap-1">
          {collection.typeLabelsShown.map((label) => (
            <span
              key={label}
              className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {label}
            </span>
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
  item: (typeof mockItems)[number];
  showPinColumn: boolean;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-card/60 px-3 py-3 sm:px-4">
      <div className="flex shrink-0 items-start gap-2 pt-0.5">
        {showPinColumn ? (
          item.isPinned ? (
            <Pin
              className="size-4 shrink-0 text-primary"
              aria-label="Pinned"
            />
          ) : (
            <span className="inline-flex size-4 shrink-0" aria-hidden />
          )
        ) : null}
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-base leading-none"
          aria-hidden
        >
          {item.typeIcon}
        </span>
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-semibold leading-snug">{item.title}</h4>
          {item.isFavorite ? (
            <Star
              className="size-3.5 shrink-0 fill-amber-400 text-amber-400"
              aria-label="Favorite item"
            />
          ) : null}
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {item.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-0.5">
          {item.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted/80 px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-[10px] tabular-nums text-muted-foreground">
            {item.updatedLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DashboardHome() {
  const totalItems = mockItems.length;
  const totalCollections = mockCollections.length;
  const favoriteItems = mockItems.filter((i) => i.isFavorite).length;
  const favoriteCollections = mockCollections.filter((c) => c.isFavorite)
    .length;

  const recentCollections = mockCollections;
  const pinnedItems = mockItems.filter((i) => i.isPinned);
  const recentItems = mockItems.slice(0, 10);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="space-y-1">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Your developer knowledge hub.
        </p>
      </header>

      <section aria-label="Summary statistics" className="space-y-3">
        <h2 className="sr-only">Stats</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Items" value={totalItems} />
          <StatCard label="Collections" value={totalCollections} />
          <StatCard label="Favorite items" value={favoriteItems} />
          <StatCard label="Favorite collections" value={favoriteCollections} />
        </div>
      </section>

      <section aria-labelledby="collections-heading" className="space-y-3">
        <div className="flex items-end justify-between gap-2">
          <h2
            id="collections-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Recent collections
          </h2>
          <span className="text-xs font-medium text-muted-foreground">
            View all
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recentCollections.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </section>

      <section aria-labelledby="pinned-heading" className="space-y-3">
        <h2
          id="pinned-heading"
          className="text-lg font-semibold tracking-tight"
        >
          Pinned
        </h2>
        <div className="flex flex-col gap-2">
          {pinnedItems.map((item) => (
            <ItemRow key={item.id} item={item} showPinColumn />
          ))}
        </div>
      </section>

      <section aria-labelledby="recent-items-heading" className="space-y-3">
        <h2
          id="recent-items-heading"
          className="text-lg font-semibold tracking-tight"
        >
          Recent items
        </h2>
        <div className="flex flex-col gap-2">
          {recentItems.map((item) => (
            <ItemRow key={item.id} item={item} showPinColumn={false} />
          ))}
        </div>
      </section>
    </div>
  );
}
