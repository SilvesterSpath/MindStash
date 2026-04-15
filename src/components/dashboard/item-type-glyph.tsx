import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Code2,
  FileText,
  Image as ImageIcon,
  Link2,
  Paperclip,
  Terminal,
} from "lucide-react";

import { cn } from "@/lib/utils";

const GLYPHS: Record<
  string,
  { Icon: LucideIcon; className: string }
> = {
  Snippet: { Icon: Code2, className: "text-sky-400" },
  Note: { Icon: FileText, className: "text-amber-400" },
  Link: { Icon: Link2, className: "text-violet-400" },
  Prompt: { Icon: Bot, className: "text-fuchsia-400" },
  Command: { Icon: Terminal, className: "text-orange-400" },
  File: { Icon: Paperclip, className: "text-slate-400" },
  Image: { Icon: ImageIcon, className: "text-emerald-400" },
};

const sizeClassName = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-9",
} as const;

export type ItemTypeGlyphSize = keyof typeof sizeClassName;

export function ItemTypeGlyph({
  typeName,
  size = "md",
  className,
  title,
}: {
  typeName: string;
  size?: ItemTypeGlyphSize;
  className?: string;
  /** Defaults to `typeName` for tooltips / a11y */
  title?: string;
}) {
  const spec = GLYPHS[typeName];
  const label = title ?? typeName;
  if (!spec) {
    return (
      <span
        className={cn(
          sizeClassName[size],
          "inline-flex shrink-0 items-center justify-center text-[10px] font-semibold text-muted-foreground",
          className
        )}
        title={label}
        aria-label={label}
      >
        {typeName.slice(0, 1)}
      </span>
    );
  }
  const { Icon, className: tone } = spec;
  return (
    <span className="inline-flex shrink-0" title={label}>
      <Icon
        className={cn(
          sizeClassName[size],
          "shrink-0 stroke-[1.75]",
          tone,
          className
        )}
        aria-hidden
      />
    </span>
  );
}
