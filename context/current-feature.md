# Current Feature

## Auth Credentials - Email/Password Provider

## Status

In Progress

## Overview

Add Credentials provider for email/password authentication with registration.

## Requirements

- Use bcryptjs for hashing (already installed)
- Add password field to User model via migration if not already there
- Update `auth.config.ts` with Credentials provider placeholder
- Update `auth.ts` to override Credentials with bcrypt validation
- Create registration API route at `/api/auth/register`

## Registration API Route

`POST /api/auth/register`

- Accept: name, email, password, confirmPassword
- Validate passwords match
- Check if user already exists
- Hash password with bcryptjs
- Create user in database
- Return success/error response

## Notes

### Credentials Provider in Split Pattern

- `auth.config.ts`: Add Credentials provider with `authorize: () => null` placeholder
- `auth.ts`: Override the Credentials provider with actual bcrypt validation logic

## Testing

1. Test registration via curl:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","confirmPassword":"password123"}'
```

2. Go to `/api/auth/signin`
3. Sign in with email/password
4. Verify redirect to `/dashboard`
5. Verify GitHub OAuth still works

## References

- Credentials provider: https://authjs.dev/getting-started/authentication/credentials

## History

<!-- Keep this updated. Earliest to latest -->

**Initial Setup**

- 2026-03-27: Initialized the Next.js app baseline.

- 2026-03-27: Cleaned starter boilerplate: `src/app/page.tsx` simplified to render only `<h1>MindStash</h1>`; `src/app/globals.css` reduced to only `@import "tailwindcss";`; removed default SVG assets from `public`.

**Dashboard UI Phase 1**

- 2026-04-10: Scoped current work to phase 1 spec; status set to In Progress.

- 2026-04-10: Delivered phase 1 scope: ShadCN setup, `/dashboard` route, dark-mode layout, top bar (search + `New item` + `New collection`), and sidebar/main placeholders.

- 2026-04-10: Marked feature Completed after `npm run build` passed.

**Dashboard UI Phase 2**

- 2026-04-13: Scoped current work to phase 2 spec (`context/features/dashboard-phase-2-spec.md`); status set to In Progress.

- 2026-04-13: Delivered phase 2 scope: collapsible desktop sidebar, mobile `Sheet` drawer, type links to `/items/[slug]`, Favorites + Recent collection lists from mock data, user footer with settings control, header search copy + ⌘K hint; added `DashboardChrome`, `(main)` layout, and shadcn `sheet`.

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

**Seed data**

- 2026-04-17: Scoped current work to `context/features/seed-spec.md`; status set to In Progress.

**App shell vs. dashboard route (naming refactor)**

- 2026-04-20: Clarified naming — "dashboard" refers to `/dashboard` content, not the logged-in frame. Separated the persistent app shell from the dashboard route; renamed `dashboard-*` components to `app-shell-*`; `/dashboard` page body became `DashboardOverview` in `src/components/dashboard/`; introduced `src/components/app-shell/`.

**Dashboard Collections**

- 2026-04-20: Scoped current work to `context/features/dashboard-collections-spec.md`; status set to In Progress.

- 2026-04-20: Delivered scope: `src/lib/db/collections.ts`, Prisma-backed recent collections and stats in `DashboardOverview` (`src/components/dashboard/dashboard-overview.tsx`); collection accent from dominant item type; type glyphs per collection; `/dashboard` forced dynamic; pinned and recent item lists still mock (deferred).

- 2026-04-20: Marked feature Completed after `npm run build` passed.

**Dashboard Items**

- 2026-04-20: Scoped current work to `context/features/dashboard-items-spec.md`; status set to In Progress.

- 2026-04-20: Delivered scope: `src/lib/db/items.ts` (`getPinnedDashboardItems`, `getRecentDashboardItems`, `getDashboardItemsModel`); `DashboardOverview` loads pinned and recent items from Prisma (no `mockItems`); type-colored left border on item rows; pinned section omitted when empty; seed optional `isPinned` / `isFavorite` on demo items.

- 2026-04-20: Marked feature Completed after `npm run build` passed.

**Stats & Sidebar**

- 2026-04-20: Scoped current work to `context/features/stats-sidebar-spec.md`; status set to In Progress.

- 2026-04-20: Delivered scope: `src/lib/db/sidebar.ts` (`getSidebarData` — system item types with per-user counts, favorite collections, recent collections with dominant-type accent color); `AppShell` made async to fetch sidebar data server-side; `AppShellClient` and `AppSidebarNav` updated to consume real DB data (mock data removed); recent collections in sidebar show a colored accent circle; "View all" on the dashboard collections section links to `/collections`.

- 2026-04-20: Reordered sidebar item types to: Snippet, Prompt, Command, Note, File, Image, Link.

- 2026-04-20: Added horizontal divider between Types and Collections sections in sidebar; "Collections" header added below divider matching "Types" style.

- 2026-04-20: Added collapsible toggle (chevron) to both Types and Collections sidebar sections; chevron rotates 90° when open; both sections default to expanded.

- 2026-04-20: Marked feature Completed.

**Add Pro Badge to Sidebar**

- 2026-05-22: Scoped current work to `context/features/add-pro-badge-sidebar.md`; status set to In Progress.

- 2026-05-22: Added subtle uppercase `PRO` badges for `File` and `Image` item types in `src/components/app-shell/app-sidebar-nav.tsx` using shadcn/ui `Badge`.

- 2026-05-22: Marked feature Completed after `npm run build` passed.

**Quick Wins - Query Efficiency and Cleanup**

- 2026-06-02: Scoped current work to low-risk quick wins from audit findings; status set to In Progress.

- 2026-06-02: Implemented query-efficiency improvements: `resolveDashboardUserId` is now request-cached in `src/lib/db/collections.ts`, and sidebar type counts now use Prisma relation `_count` in `src/lib/db/sidebar.ts` instead of loading item ID rows.

- 2026-06-02: Marked feature Completed after `npm run lint` and `npm run build` passed.

**Auth Setup - NextAuth + GitHub Provider**

- 2026-06-16: Scoped current work to `context/features/auth-phase-1-spec.md`; status set to In Progress.

- 2026-06-16: Created branch `feature/auth-phase-1`; installed `next-auth@5.0.0-beta.31` and `@auth/prisma-adapter@2.11.2`.

- 2026-06-16: Implemented split-config NextAuth v5 + GitHub OAuth: edge-safe `src/auth.config.ts` (providers only), full `src/auth.ts` (Prisma adapter + JWT strategy + session `user.id` callback), route handler `src/app/api/auth/[...nextauth]/route.ts`, Next.js 16 `src/proxy.ts` (protects `/dashboard/:path*`, redirects unauthenticated users to default sign-in with `callbackUrl`), and `src/types/next-auth.d.ts` (Session `user.id`). Verified conventions against authjs.dev + local Next.js proxy docs. `npm run build` passed.

- 2026-06-16: Browser-tested on `feature/auth-phase-1`: `/dashboard` redirects to `/api/auth/signin?callbackUrl=...`; default sign-in page shows "Sign in with GitHub"; OAuth initiates to GitHub with callback `http://localhost:3000/api/auth/callback/github`. Marked feature Completed after `npm run build` passed.

**Auth Credentials - Email/Password Provider**

- 2026-06-17: Scoped current work to `context/features/auth-phase-2-spec.md`; status set to In Progress.

- 2026-06-17: Created branch `feature/auth-phase-2`.

- 2026-06-17: Implemented phase 2 scope: Credentials provider placeholder in `src/auth.config.ts` (edge-safe), bcrypt `authorize` override in `src/auth.ts`, and `POST /api/auth/register` route (`src/app/api/auth/register/route.ts`) with validation, duplicate-email check, and bcrypt hashing (12 rounds). User `password` field already present in schema/migration — no new migration required. Verified: `npm run build` passed; registration API returns 201/409/400 as expected; default sign-in page shows email/password fields and GitHub button.
