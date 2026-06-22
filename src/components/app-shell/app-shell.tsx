import { AppShellClient } from '@/components/app-shell/app-shell-client';
import { auth } from '@/auth';
import { resolveDashboardUserId } from '@/lib/db/collections';
import { getSidebarData, type SidebarData } from '@/lib/db/sidebar';
import type { ShellUser } from '@/types/auth-ui';

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
  const session = await auth();
  const user: ShellUser | null = session?.user
    ? {
        name: session.user.name ?? null,
        email: session.user.email ?? null,
        image: session.user.image ?? null,
      }
    : null;

  const userId = await resolveDashboardUserId();
  const sidebarData = userId ? await getSidebarData(userId) : EMPTY_SIDEBAR;

  return (
    <div className='flex min-h-svh flex-col bg-background'>
      <AppShellClient sidebarData={sidebarData} user={user}>
        {children}
      </AppShellClient>
    </div>
  );
}
