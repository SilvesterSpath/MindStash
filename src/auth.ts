import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

import { authConfig, credentialsFields } from '@/auth.config';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    GitHub,
    Credentials({
      credentials: credentialsFields,
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== 'string' || typeof password !== 'string') {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: email.trim().toLowerCase() },
        });

        if (!user?.password) {
          return null;
        }

        const passwordMatches = await compare(password, user.password);
        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
});
