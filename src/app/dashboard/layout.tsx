import { Box, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="h-14 shrink-0 border-b border-border px-4">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center gap-3">
          <div className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight">
            <Box className="size-4" aria-hidden />
            <span>DevStash</span>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              className="pl-9"
              placeholder="Search"
              type="search"
              aria-label="Search"
            />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button type="button" variant="outline">
              New collection
            </Button>
            <Button type="button">New item</Button>
          </div>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="w-56 shrink-0 border-r border-border p-4 md:w-64">
          <h2 className="text-lg font-semibold tracking-tight">Sidebar</h2>
        </aside>
        <main className="min-h-0 flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
