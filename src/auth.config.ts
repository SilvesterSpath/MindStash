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
  trustHost: true,
  pages: {
    signIn: '/sign-in',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
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
