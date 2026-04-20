import { AppShellClient } from '@/components/app-shell/app-shell-client';

/**
 * Server shell root: delegates interactive layout (collapse, drawer, active links)
 * to {@link AppShellClient} so route `children` stay server-rendered.
 */
export function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-svh flex-col bg-background'>
      <AppShellClient>{children}</AppShellClient>
    </div>
  );
}
