# Current Feature

## Auth UI - Sign In, Register & Sign Out

## Status

Completed

## Overview

Replace NextAuth default pages with custom UI. Show logged-in user avatar in the app header with profile access and sign-out.

## Requirements

### Sign In Page (`/sign-in`)

- Email and password input fields
- "Sign in with GitHub" button
- Link to register page
- Form validation and error display

### Register Page (`/register`)

- Name, email, password, confirm password fields
- Form validation (passwords match, email format)
- Submit to `/api/auth/register`
- Redirect to sign-in on success with toast confirmation

### Header User Menu (top-right)

- Display user avatar (GitHub image or initials fallback) next to **New item**
- Vertical divider between **New item** and avatar
- Avatar-only trigger (no name label in header)
- Dropdown with Profile and Sign out
- Session user passed from server via `ShellUser` (`src/types/auth-ui.ts`)

## Notes

### Avatar Logic

- If user has `image` (from GitHub): use that
- Otherwise: generate initials from name (e.g., "Brad Traversy" → "BT")

### Components

- `UserAvatar` — reusable avatar with initials fallback (`src/components/auth/user-avatar.tsx`)
- `AppUserMenu` — header dropdown (`src/components/app-shell/app-user-menu.tsx`)
- `(auth)/layout.tsx` — centered layout for sign-in/register (no app shell)

### Registration Toast

- Sonner toast on successful registration: "Account created. You can now sign in."
- Toast fires in `RegisterForm` before client navigation to `/sign-in`

## Testing

1. Go to `/sign-in` — verify custom page renders
2. Sign in with GitHub — verify flow works
3. Sign in with email/password — verify flow works
4. Verify avatar shows in header (GitHub image or initials)
5. Click avatar — verify dropdown with Profile and Sign out
6. Click "Sign out" — verify logout and redirect to `/sign-in`
7. Go to `/register` — create new account — verify toast and redirect to sign-in

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

- 2026-06-17: Merged `feature/auth-phase-2` into `main`, pushed to remote, and deleted local feature branch. Marked feature Completed.

**Auth UI - Sign In, Register & Sign Out**

- 2026-06-17: Scoped current work to `context/features/auth-phase-3-spec.md`; status set to In Progress.

- 2026-06-17: Created branch `feature/auth-phase-3`. Implemented custom auth UI: `/sign-in` and `/register` pages with validation and error display; server actions for credentials/GitHub sign-in and sign-out (`src/actions/auth.ts`); `pages.signIn` + proxy redirect to `/sign-in`; reusable `UserAvatar` with initials fallback; `(auth)` route group layout; placeholder `/profile` page; `AppShell` passes session user to client shell via `ShellUser`.

- 2026-06-17: Moved user menu from sidebar footer to header top-right (`AppUserMenu`), next to **New item** with vertical divider; avatar-only in header (name removed from trigger).

- 2026-06-17: Added Sonner toasts (`src/components/ui/sonner.tsx`); registration success shows "Account created. You can now sign in." toast before redirect to `/sign-in`.

- 2026-06-17: Marked feature Completed after `npm run build` passed.
