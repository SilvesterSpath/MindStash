'use client';

import * as React from 'react';
import { Box, Menu, PanelLeft, PanelLeftClose, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { AppSidebarNav } from '@/components/app-shell/app-sidebar-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/**
 * Client-only shell: sidebar collapse, mobile drawer, and active nav.
 * Pages passed as `children` remain server components from the app tree.
 */
export function AppShellClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      <header className='h-14 shrink-0 border-b border-border px-2 sm:px-4'>
        <div className='mx-auto flex h-full w-full max-w-6xl items-center gap-2 sm:gap-3'>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='shrink-0 md:hidden'
            aria-label='Open menu'
            onClick={() => setMobileOpen(true)}
          >
            <Menu className='size-5' />
          </Button>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='hidden shrink-0 md:inline-flex'
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? (
              <PanelLeft className='size-5' />
            ) : (
              <PanelLeftClose className='size-5' />
            )}
          </Button>
          <div className='flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold tracking-tight md:hidden'>
            <Box className='size-4' aria-hidden />
            <span className='truncate'>MindStash</span>
          </div>
          <div className='relative mx-auto min-w-0 flex-1 max-w-md'>
            <Search
              className='pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground'
              aria-hidden
            />
            <Input
              className='h-9 pl-9 pr-14 sm:pr-20'
              placeholder='Search items...'
              type='search'
              aria-label='Search items'
            />
            <kbd className='pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted-foreground sm:inline-block'>
              ⌘K
            </kbd>
          </div>
          <div className='ml-auto flex shrink-0 items-center gap-2'>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='hidden sm:inline-flex'
            >
              New collection
            </Button>
            <Button type='button' size='sm'>
              New item
            </Button>
          </div>
        </div>
      </header>

      <div className='flex min-h-0 flex-1'>
        <aside
          className={cn(
            'hidden shrink-0 border-r border-sidebar-border md:flex md:flex-col md:transition-[width] md:duration-200 md:ease-in-out',
            collapsed ? 'md:w-18' : 'md:w-64',
          )}
        >
          <AppSidebarNav collapsed={collapsed} currentPath={pathname} />
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side='left'
            showCloseButton
            className='w-[min(100vw,18rem)] border-sidebar-border bg-sidebar p-0 sm:max-w-xs'
          >
            <SheetTitle className='sr-only'>Navigation</SheetTitle>
            <AppSidebarNav
              collapsed={false}
              currentPath={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <main className='min-h-0 flex-1 overflow-auto p-4'>{children}</main>
      </div>
    </>
  );
}
