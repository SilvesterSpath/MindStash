'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { ReactNode } from 'react';
import { Box } from 'lucide-react';

import { signInWithCredentials, signInWithGitHub } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { AuthFormState } from '@/types/auth-ui';

const initialState: AuthFormState = { error: null };

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className='text-sm font-medium'>
      {children}
    </label>
  );
}

export function SignInForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState(
    signInWithCredentials,
    initialState,
  );

  return (
    <div className='w-full max-w-sm space-y-6'>
      <div className='space-y-2 text-center'>
        <div className='mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
          <Box className='size-5' aria-hidden />
        </div>
        <h1 className='text-xl font-semibold tracking-tight'>Sign in</h1>
        <p className='text-sm text-muted-foreground'>
          Welcome back to MindStash
        </p>
      </div>

      {state.error ? (
        <p
          className='rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive'
          role='alert'
        >
          {state.error}
        </p>
      ) : null}

      <form action={formAction} className='space-y-4'>
        <input type='hidden' name='callbackUrl' value={callbackUrl} />

        <div className='space-y-2'>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
          />
        </div>

        <div className='space-y-2'>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
          />
        </div>

        <Button type='submit' className='w-full' disabled={pending}>
          {pending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-border' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or</span>
        </div>
      </div>

      <form action={signInWithGitHub}>
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        <Button type='submit' variant='outline' className='w-full'>
          Sign in with GitHub
        </Button>
      </form>

      <p className='text-center text-sm text-muted-foreground'>
        Don&apos;t have an account?{' '}
        <Link
          href='/register'
          className='font-medium text-foreground underline-offset-4 hover:underline'
        >
          Register
        </Link>
      </p>
    </div>
  );
}
