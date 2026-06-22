'use client';

import Link from 'next/link';
import { LogOut, UserRound } from 'lucide-react';

import { signOutAction } from '@/actions/auth';
import { UserAvatar } from '@/components/auth/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ShellUser } from '@/types/auth-ui';
import { cn } from '@/lib/utils';

export function AppUserMenu({ user }: { user: ShellUser }) {
  const displayName = user.name?.trim() || 'User';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          className={cn(
            'flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full',
            'hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
          aria-label={`${displayName} account menu`}
        >
          <UserAvatar name={user.name} image={user.image} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' side='bottom' className='w-44'>
        <DropdownMenuItem asChild>
          <Link href='/profile' className='flex items-center gap-2'>
            <UserRound className='size-4' />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            void signOutAction();
          }}
        >
          <LogOut className='size-4' />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
