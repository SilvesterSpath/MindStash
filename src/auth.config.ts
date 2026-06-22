import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';

export const credentialsFields = {
  email: { label: 'Email', type: 'email' },
  password: { label: 'Password', type: 'password' },
} as const;

// Edge-compatible config: providers only, no database adapter.
// Shared by both the proxy (route protection) and the full auth instance.
export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GitHub,
    Credentials({
      credentials: credentialsFields,
      authorize: () => null,
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
