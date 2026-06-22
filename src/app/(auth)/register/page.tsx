import { auth } from '@/auth';
import { RegisterForm } from '@/components/auth/register-form';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/dashboard');
  }

  return <RegisterForm />;
}
