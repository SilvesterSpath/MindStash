export const ITEM_TYPE_SLUGS = {
  Snippet: "snippets",
  Prompt: "prompts",
  Command: "commands",
  Note: "notes",
  File: "files",
  Image: "images",
  Link: "links",
} as const;

export type KnownItemTypeName = keyof typeof ITEM_TYPE_SLUGS;

export type ItemTypeSlug =
  (typeof ITEM_TYPE_SLUGS)[KnownItemTypeName];

const SLUG_SET = new Set<string>(Object.values(ITEM_TYPE_SLUGS));

export function getItemTypeSlug(name: string): ItemTypeSlug | undefined {
  return ITEM_TYPE_SLUGS[name as KnownItemTypeName] as ItemTypeSlug | undefined;
}

export function getItemTypeHref(name: string): string | undefined {
  const slug = getItemTypeSlug(name);
  return slug ? `/items/${slug}` : undefined;
}

export function isValidItemTypeSlug(slug: string): slug is ItemTypeSlug {
  return SLUG_SET.has(slug);
}

/** Plural label for sidebar (e.g. Snippets). */
export function pluralizeTypeLabel(name: string): string {
  const slug = getItemTypeSlug(name);
  if (!slug) return name;
  const map: Record<ItemTypeSlug, string> = {
    snippets: "Snippets",
    prompts: "Prompts",
    commands: "Commands",
    notes: "Notes",
    files: "Files",
    images: "Images",
    links: "Links",
  };
  return map[slug];
}
