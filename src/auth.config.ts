import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';

// Edge-compatible config: providers only, no database adapter.
// Shared by both the proxy (route protection) and the full auth instance.
export const authConfig = {
  providers: [GitHub],
} satisfies NextAuthConfig;

export default authConfig;
