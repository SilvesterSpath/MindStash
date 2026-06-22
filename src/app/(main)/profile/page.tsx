import { auth } from '@/auth';
import { UserAvatar } from '@/components/auth/user-avatar';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in?callbackUrl=/profile');
  }

  const { user } = session;
  const displayName = user.name?.trim() || 'User';

  return (
    <div className='mx-auto w-full max-w-lg space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Profile</h1>
        <p className='text-sm text-muted-foreground'>
          Your MindStash account details
        </p>
      </div>

      <div className='flex items-center gap-4 rounded-xl border border-border bg-card p-4'>
        <div className='size-14 shrink-0 overflow-hidden rounded-full'>
          <UserAvatar name={user.name ?? null} image={user.image ?? null} />
        </div>
        <div className='min-w-0'>
          <p className='truncate text-lg font-medium'>{displayName}</p>
          {user.email ? (
            <p className='truncate text-sm text-muted-foreground'>{user.email}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
