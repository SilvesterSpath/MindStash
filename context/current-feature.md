# Current Feature

**Database seed data** — Extend `prisma/seed.ts` to populate the database with sample data for development and demos (see `context/features/seed-spec.md`).

## Status

In Progress

## Goals

### User

- **Email:** demo@devstash.io
- **Name:** Demo User
- **Password:** 12345678 (hash with bcryptjs, 12 rounds)
- **isPro:** false
- **emailVerified:** current date

### System Item Types

| Name    | Icon       | Color   |
| ------- | ---------- | ------- |
| snippet | Code       | #3b82f6 |
| prompt  | Sparkles   | #8b5cf6 |
| command | Terminal   | #f97316 |
| note    | StickyNote | #fde047 |
| file    | File       | #6b7280 |
| image   | Image      | #ec4899 |
| link    | Link       | #10b981 |

Icons are Lucide React component names. All types have `isSystem: true`.

### Collections & Items

#### React Patterns

_Description: Reusable React patterns and hooks_

3 snippets (TypeScript):

- Custom hooks (useDebounce, useLocalStorage, etc.)
- Component patterns (Context providers, compound components)
- Utility functions

#### AI Workflows

_Description: AI prompts and workflow automations_

3 prompts:

- Code review prompts
- Documentation generation
- Refactoring assistance

#### DevOps

_Description: Infrastructure and deployment resources_

- 1 snippet (Docker, CI/CD config)
- 1 command (deployment scripts)
- 2 links (documentation URLs - use real URLs)

#### Terminal Commands

_Description: Useful shell commands for everyday development_

4 commands:

- Git operations
- Docker commands
- Process management
- Package manager utilities

#### Design Resources

_Description: UI/UX resources and references_

4 links (use real URLs):

- CSS/Tailwind references
- Component libraries
- Design systems
- Icon libraries

## Notes

Source spec: `context/features/seed-spec.md`.

## History

<!-- Keep this updated. Earliest to latest -->

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
