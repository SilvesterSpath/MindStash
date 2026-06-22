'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, ChevronRight, Star } from 'lucide-react';

import { ItemTypeGlyph } from '@/components/dashboard/item-type-glyph';
import { Badge } from '@/components/ui/badge';
import { getItemTypeHref, pluralizeTypeLabel } from '@/lib/item-type-paths';
import { type SidebarData } from '@/lib/db/sidebar';
import { cn } from '@/lib/utils';

function SectionToggle({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onToggle}
      className='flex w-full items-center gap-1 px-2 py-0.5 text-xs font-medium text-muted-foreground hover:text-sidebar-foreground transition-colors'
      aria-expanded={open}
    >
      <ChevronRight
        className={cn(
          'size-3 shrink-0 transition-transform duration-200',
          open && 'rotate-90',
        )}
        aria-hidden
      />
      {label}
    </button>
  );
}

export function AppSidebarNav({
  collapsed,
  onNavigate,
  currentPath,
  sidebarData,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  currentPath: string;
  sidebarData: SidebarData;
}) {
  const { itemTypes, favoriteCollections, recentCollections } = sidebarData;
  const [typesOpen, setTypesOpen] = React.useState(true);
  const [collectionsOpen, setCollectionsOpen] = React.useState(true);

  const linkClass = (active: boolean) =>
    cn(
      'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
      active
        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
        : 'text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground',
    );

  return (
    <div className='flex h-full min-h-0 flex-col bg-sidebar text-sidebar-foreground'>
      <div
        className={cn(
          'flex shrink-0 items-center border-b border-sidebar-border px-3 py-3',
          collapsed ? 'justify-center px-2' : 'gap-2',
        )}
      >
        {collapsed ? (
          <Box
            className='size-5 shrink-0 text-sidebar-primary'
            aria-label='MindStash'
          />
        ) : (
          <div className='flex items-center gap-2 text-sm font-semibold tracking-tight'>
            <Box className='size-4 shrink-0 text-sidebar-primary' aria-hidden />
            <span>MindStash</span>
          </div>
        )}
      </div>

      <nav
        className='flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3'
        aria-label='Dashboard'
      >
        <div className='space-y-1'>
          {!collapsed ? (
            <SectionToggle
              label='Types'
              open={typesOpen}
              onToggle={() => setTypesOpen((o) => !o)}
            />
          ) : null}
          {typesOpen ? (
            <ul className='space-y-0.5'>
              {itemTypes.map((t) => {
                const href = getItemTypeHref(t.name);
                if (!href) return null;
                const active =
                  currentPath === href || currentPath.startsWith(`${href}/`);
                const showProBadge = ['file', 'image'].includes(
                  t.name.toLowerCase(),
                );
                return (
                  <li key={t.id}>
                    <Link
                      href={href}
                      className={linkClass(active)}
                      onClick={onNavigate}
                      title={collapsed ? pluralizeTypeLabel(t.name) : undefined}
                    >
                      <ItemTypeGlyph typeName={t.name} size='md' />
                      {!collapsed ? (
                        <>
                          <span className='min-w-0 flex-1 truncate'>
                            {pluralizeTypeLabel(t.name)}
                          </span>
                          {showProBadge ? (
                            <Badge
                              variant='secondary'
                              className='h-5 border-sidebar-border/60 bg-sidebar-accent/60 px-1.5 text-[10px] font-semibold tracking-wide text-muted-foreground'
                            >
                              PRO
                            </Badge>
                          ) : null}
                          <span className='shrink-0 tabular-nums text-muted-foreground'>
                            {t.itemCount}
                          </span>
                        </>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        {!collapsed ? (
          <>
            <hr className='-mx-3 border-sidebar-border' />

            <div className='space-y-1'>
              <SectionToggle
                label='Collections'
                open={collectionsOpen}
                onToggle={() => setCollectionsOpen((o) => !o)}
              />

              {collectionsOpen ? (
                <>
                  {favoriteCollections.length > 0 ? (
                    <div className='space-y-1'>
                      <p className='px-2 pt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase'>
                        Favorites
                      </p>
                      <ul className='space-y-0.5'>
                        {favoriteCollections.map((c) => (
                          <li key={c.id}>
                            <div
                              className={cn(
                                linkClass(false),
                                'cursor-default text-muted-foreground',
                              )}
                            >
                              <Star
                                className='size-4 shrink-0 fill-amber-400 text-amber-400'
                                aria-hidden
                              />
                              <span className='min-w-0 flex-1 truncate'>{c.name}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {recentCollections.length > 0 ? (
                    <div className='space-y-1'>
                      <p className='px-2 pt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase'>
                        Recent
                      </p>
                      <ul className='space-y-0.5'>
                        {recentCollections.map((c) => (
                          <li key={c.id}>
                            <div
                              className={cn(
                                linkClass(false),
                                'cursor-default text-muted-foreground',
                              )}
                            >
                              <span
                                className='size-2.5 shrink-0 rounded-full'
                                style={{ backgroundColor: c.accentColor }}
                                aria-hidden
                              />
                              <span className='min-w-0 flex-1 truncate'>{c.name}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href='/collections'
                        className='mt-1 flex px-2 text-xs text-muted-foreground hover:text-sidebar-foreground transition-colors'
                        onClick={onNavigate}
                      >
                        View all collections
                      </Link>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </>
        ) : null}
      </nav>
    </div>
  );
}
