"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  Box,
  Menu,
  PanelLeft,
  PanelLeftClose,
  Search,
  Settings,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  getItemTypeHref,
  pluralizeTypeLabel,
} from "@/lib/item-type-paths";
import {
  mockCollections,
  mockCurrentUser,
  mockItemTypes,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]!}${parts[parts.length - 1]![0]!}`.toUpperCase();
}

function SidebarNav({
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
              const active = currentPath === href || currentPath.startsWith(`${href}/`);
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

export function DashboardChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="h-14 shrink-0 border-b border-border px-2 sm:px-4">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden shrink-0 md:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? (
              <PanelLeft className="size-5" />
            ) : (
              <PanelLeftClose className="size-5" />
            )}
          </Button>
          <div className="flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold tracking-tight md:hidden">
            <Box className="size-4" aria-hidden />
            <span className="truncate">DevStash</span>
          </div>
          <div className="relative mx-auto min-w-0 flex-1 max-w-md">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              className="h-9 pl-9 pr-14 sm:pr-20"
              placeholder="Search items..."
              type="search"
              aria-label="Search items"
            />
            <kbd className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted-foreground sm:inline-block">
              ⌘K
            </kbd>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
            >
              New collection
            </Button>
            <Button type="button" size="sm">
              New item
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            "hidden shrink-0 border-r border-sidebar-border md:flex md:flex-col md:transition-[width] md:duration-200 md:ease-in-out",
            collapsed ? "md:w-18" : "md:w-64"
          )}
          aria-hidden={false}
        >
          <SidebarNav
            collapsed={collapsed}
            currentPath={pathname}
          />
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            showCloseButton
            className="w-[min(100vw,18rem)] border-sidebar-border bg-sidebar p-0 sm:max-w-xs"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarNav
              collapsed={false}
              currentPath={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <main className="min-h-0 flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
