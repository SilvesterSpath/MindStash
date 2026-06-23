import { auth } from '@/auth';
import { SignInForm } from '@/components/auth/sign-in-form';
import { redirect } from 'next/navigation';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  if (session?.user) {
    redirect('/dashboard');
  }

  const params = await searchParams;
  const rawCallbackUrl = params.callbackUrl ?? '/dashboard';
  const callbackUrl = rawCallbackUrl.startsWith('/')
    ? rawCallbackUrl
    : (() => {
        try {
          return new URL(rawCallbackUrl).pathname;
        } catch {
          return '/dashboard';
        }
      })();

  return <SignInForm callbackUrl={callbackUrl} />;
}
