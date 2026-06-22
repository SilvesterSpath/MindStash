'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Box } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/lib/user-initials';

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className='text-sm font-medium'>
      {children}
    </label>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setPending(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setError(data.error ?? 'Registration failed.');
        return;
      }

      toast.success('Account created. You can now sign in.');
      router.push('/sign-in');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className='w-full max-w-sm space-y-6'>
      <div className='space-y-2 text-center'>
        <div className='mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
          <Box className='size-5' aria-hidden />
        </div>
        <h1 className='text-xl font-semibold tracking-tight'>Create account</h1>
        <p className='text-sm text-muted-foreground'>
          Get started with MindStash
        </p>
      </div>

      {error ? (
        <p
          className='rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive'
          role='alert'
        >
          {error}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <FieldLabel htmlFor='name'>Name</FieldLabel>
          <Input id='name' name='name' autoComplete='name' required />
        </div>

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
            autoComplete='new-password'
            required
          />
        </div>

        <div className='space-y-2'>
          <FieldLabel htmlFor='confirmPassword'>Confirm password</FieldLabel>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            autoComplete='new-password'
            required
          />
        </div>

        <Button type='submit' className='w-full' disabled={pending}>
          {pending ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className='text-center text-sm text-muted-foreground'>
        Already have an account?{' '}
        <Link
          href='/sign-in'
          className='font-medium text-foreground underline-offset-4 hover:underline'
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
