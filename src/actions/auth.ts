'use server';

import { AuthError } from 'next-auth';

import { signIn, signOut } from '@/auth';
import type { AuthFormState } from '@/types/auth-ui';

export async function signInWithCredentials(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const password = String(formData.get('password') ?? '');
  const callbackUrl = String(formData.get('callbackUrl') ?? '/dashboard');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password.' };
    }
    throw error;
  }

  return { error: null };
}

export async function signInWithGitHub(formData: FormData): Promise<void> {
  const callbackUrl = String(formData.get('callbackUrl') ?? '/dashboard');
  await signIn('github', { redirectTo: callbackUrl });
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: '/sign-in' });
}
