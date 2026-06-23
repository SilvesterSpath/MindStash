import { initialsFromName } from '@/lib/user-initials';
import { cn } from '@/lib/utils';

export function UserAvatar({
  name,
  image,
  className,
}: {
  name: string | null;
  image: string | null;
  className?: string;
}) {
  const displayName = name?.trim() || 'User';
  const initials = initialsFromName(displayName);

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- external OAuth avatars
      <img
        src={image}
        alt={displayName}
        className={cn('size-full rounded-full border-0 object-cover', className)}
      />
    );
  }

  return (
    <span
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground',
        className,
      )}
      aria-hidden={Boolean(image)}
    >
      {initials}
    </span>
  );
}
