import { DashboardShellClient } from "@/components/dashboard/dashboard-shell-client";

/**
 * Server shell: delegates interactive layout (collapse, drawer, active links)
 * to {@link DashboardShellClient} so route `children` stay server-rendered.
 */
export function DashboardChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <DashboardShellClient>{children}</DashboardShellClient>
    </div>
  );
}
