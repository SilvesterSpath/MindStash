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
            'flex min-w-0 max-w-44 items-center gap-2 rounded-lg border-0 px-1 py-1 outline-none ring-0',
            'hover:bg-muted/60 focus:bg-muted/60 focus-visible:bg-muted/60 data-[state=open]:bg-muted/60',
          )}
          aria-label={`${displayName} account menu`}
        >
          <div className='size-8 shrink-0 overflow-hidden rounded-full'>
            <UserAvatar name={user.name} image={user.image} />
          </div>
          <div className='min-w-0 text-left'>
            <p className='truncate text-sm font-medium leading-tight'>
              {displayName}
            </p>
            {user.email ? (
              <p className='truncate text-xs text-muted-foreground leading-tight'>
                {user.email}
              </p>
            ) : null}
          </div>
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
