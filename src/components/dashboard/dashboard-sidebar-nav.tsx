import Link from "next/link";
import { Box, Settings, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getItemTypeHref, pluralizeTypeLabel } from "@/lib/item-type-paths";
import {
  mockCollections,
  mockCurrentUser,
  mockItemTypes,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]!}${parts[parts.length - 1]![0]!}`.toUpperCase();
}

export function DashboardSidebarNav({
  collapsed,
  onNavigate,
  currentPath,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  currentPath: string;
}) {
  const favorites = mockCollections.filter((c) => c.isFavorite);
  const rest = mockCollections.filter((c) => !c.isFavorite);

  const linkClass = (active: boolean) =>
    cn(
      "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
    );

  return (
    <div className="flex h-full min-h-0 flex-col bg-sidebar text-sidebar-foreground">
      <div
        className={cn(
          "flex shrink-0 items-center border-b border-sidebar-border px-3 py-3",
          collapsed ? "justify-center px-2" : "gap-2"
        )}
      >
        {collapsed ? (
          <Box
            className="size-5 shrink-0 text-sidebar-primary"
            aria-label="DevStash"
          />
        ) : (
          <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <Box className="size-4 shrink-0 text-sidebar-primary" aria-hidden />
            <span>DevStash</span>
          </div>
        )}
      </div>

      <nav
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3"
        aria-label="Dashboard"
      >
        <div>
          {!collapsed ? (
            <p className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Types
            </p>
          ) : null}
          <ul className="space-y-0.5">
            {mockItemTypes.map((t) => {
              const href = getItemTypeHref(t.name);
              if (!href) return null;
              const active =
                currentPath === href || currentPath.startsWith(`${href}/`);
              return (
                <li key={t.id}>
                  <Link
                    href={href}
                    className={linkClass(active)}
                    onClick={onNavigate}
                    title={collapsed ? pluralizeTypeLabel(t.name) : undefined}
                  >
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-accent/60 text-base leading-none"
                      aria-hidden
                    >
                      {t.icon}
                    </span>
                    {!collapsed ? (
                      <>
                        <span className="min-w-0 flex-1 truncate">
                          {pluralizeTypeLabel(t.name)}
                        </span>
                        <span className="shrink-0 tabular-nums text-muted-foreground">
                          {t.itemCount}
                        </span>
                      </>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {!collapsed ? (
          <>
            <div>
              <p className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Favorites
              </p>
              <ul className="space-y-0.5">
                {favorites.map((c) => (
                  <li key={c.id}>
                    <div
                      className={cn(
                        linkClass(false),
                        "cursor-default text-muted-foreground"
                      )}
                    >
                      <Star
                        className="size-4 shrink-0 fill-amber-400 text-amber-400"
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Recent
              </p>
              <ul className="space-y-0.5">
                {rest.map((c) => (
                  <li key={c.id}>
                    <div
                      className={cn(
                        linkClass(false),
                        "cursor-default text-muted-foreground"
                      )}
                    >
                      <span className="min-w-0 flex-1 truncate pl-1">
                        {c.name}
                      </span>
                      <span className="shrink-0 tabular-nums text-muted-foreground">
                        {c.itemCount}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </nav>

      <div
        className={cn(
          "shrink-0 border-t border-sidebar-border p-3",
          collapsed && "flex flex-col items-center gap-2 px-2 py-3"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2",
            collapsed ? "flex-col" : "w-full"
          )}
          aria-label={
            collapsed
              ? `${mockCurrentUser.name}, ${mockCurrentUser.email}`
              : undefined
          }
        >
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground"
            aria-hidden={!collapsed}
          >
            {initialsFromName(mockCurrentUser.name)}
          </div>
          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">
                  {mockCurrentUser.name}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {mockCurrentUser.email}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0 text-muted-foreground"
                aria-label="Settings"
              >
                <Settings className="size-4" />
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
