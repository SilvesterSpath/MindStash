import { DashboardChrome } from "@/components/dashboard/dashboard-chrome";

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardChrome>{children}</DashboardChrome>;
}
