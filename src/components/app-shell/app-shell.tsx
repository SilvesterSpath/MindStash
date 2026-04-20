import { AppShellClient } from '@/components/app-shell/app-shell-client';
import { resolveDashboardUserId } from '@/lib/db/collections';
import { getSidebarData, type SidebarData } from '@/lib/db/sidebar';

const EMPTY_SIDEBAR: SidebarData = {
  itemTypes: [],
  favoriteCollections: [],
  recentCollections: [],
};

/**
 * Server shell root: resolves sidebar data then delegates interactive layout
 * (collapse, drawer, active links) to {@link AppShellClient} so route
 * `children` stay server-rendered.
 */
export async function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await resolveDashboardUserId();
  const sidebarData = userId ? await getSidebarData(userId) : EMPTY_SIDEBAR;

  return (
    <div className='flex min-h-svh flex-col bg-background'>
      <AppShellClient sidebarData={sidebarData}>{children}</AppShellClient>
    </div>
  );
}
