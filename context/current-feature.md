# Current Feature

Dashboard Collections — Replace the dummy collection data in the dashboard main area (right side) with actual data from the Neon database via Prisma. Keep the six recent collection cards as they look today; do not add the items row underneath yet.

## Status

In Progress

## Goals

- Create `src/lib/db/collections.ts` with data fetching functions.
- Fetch collections directly in a server component (not from `src/lib/mock-data.ts`).
- Collection card border color derived from the most-used content type in that collection.
- Show small icons for all item types present in that collection.
- Preserve the current design and layout (reference screenshot if needed).
- Update the collection stats display.

## Notes

- Full spec: `context/features/dashboard-collections-spec.md`
- Screenshot: `context/screenshots/dashboard-ui-main.png`

## History

**Dashboard Collections**

- 2026-04-20: Scoped current work to `context/features/dashboard-collections-spec.md`; status set to In Progress.

**App shell vs. dashboard route (naming refactor)**

- 2026-04-20: Clarified naming so “dashboard” refers to `/dashboard` content, not the logged-in frame.

| Type | Example |
|------|---------|
| Architectural intent | Separated app shell from dashboard route |
| Conceptual rename | `dashboard-*` → `app-shell-*` (persistent frame); `/dashboard` page body renamed to `dashboard-overview` / `DashboardOverview` |
| Responsibility split | Layout owns shell, route owns page content |
| Folder restructuring | `src/components/app-shell/` introduced |

**Seed data**

- 2026-04-17: Scoped current work to `context/features/seed-spec.md`; status set to In Progress.

**Completed Features**

- 2026-04-10: Dashboard UI Phase 1 completed.

- 2026-04-13: Dashboard UI Phase 2 completed.

- 2026-04-15: Dashboard UI Phase 3 completed.

- 2026-04-16: Neon PostgreSQL + Prisma ORM setup completed.

**Initial Setup**

- 2026-03-27: Initialized the Next.js app baseline.

- 2026-03-27: Cleaned starter boilerplate:

  - `src/app/page.tsx` simplified to render only `<h1>MindStash</h1>`.

  - `src/app/globals.css` reduced to only `@import "tailwindcss";`.

  - Removed default SVG assets from `public`.

**Dashboard UI Phase 1**

- 2026-04-10: Scoped current work to phase 1 spec; status set to In Progress.

- 2026-04-10: Implemented phase 1 dashboard UI and marked feature as Completed.

- 2026-04-10: Delivered phase 1 scope: ShadCN setup, `/dashboard` route, dark-mode layout, top bar (search + `New item` + `New collection`), and sidebar/main placeholders.

**Dashboard UI Phase 2**

- 2026-04-13: Scoped current work to phase 2 spec (`context/features/dashboard-phase-2-spec.md`); status set to Not Started.

- 2026-04-13: Status set to In Progress.

- 2026-04-13: Implemented phase 2: collapsible desktop sidebar, mobile `Sheet` drawer, type links to `/items/[slug]`, Favorites + Recent collection lists from mock data, user footer with settings control, header search copy + ⌘K hint; added `DashboardChrome`, `(main)` layout, and shadcn `sheet`.

- 2026-04-13: Marked feature Completed after `npm run build` passed.

**Dashboard UI Phase 3**

- 2026-04-15: Scoped current work to phase 3 spec (`context/features/dashboard-phase-3-spec.md`); status set to In Progress.

- 2026-04-15: Created branch `feature/dashboard-phase-3` and implemented dashboard home: stats row (items, collections, favorite items, favorite collections), recent collections grid, pinned list, and 10 recent items from `src/lib/mock-data.ts` via `DashboardHome` (`src/components/dashboard/dashboard-home.tsx`).

- 2026-04-15: Marked feature Completed after `npm run build` passed.

**Neon PostgreSQL + Prisma ORM**

- 2026-04-16: Scoped current work to `context/features/database-spec.md`; status set to In Progress.

- 2026-04-16: Created branch `feature/neon-prisma`; added Prisma 7 dependencies/config, Neon adapter-based client (`src/lib/prisma.ts`), schema (`prisma/schema.prisma`), seed (`prisma/seed.ts`), and migration/Studio scripts in `package.json`.

- 2026-04-16: Created and applied initial migration (`init`) against Neon and verified schema is up to date.

- 2026-04-16: Ran seed successfully and verified data via `scripts/test-db.ts` (system item types present).

- 2026-04-16: Marked feature Completed after `npm run build` passed.
