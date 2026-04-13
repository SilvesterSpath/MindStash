import { notFound } from "next/navigation";

import {
  getItemTypeSlug,
  isValidItemTypeSlug,
  pluralizeTypeLabel,
} from "@/lib/item-type-paths";
import { mockItemTypes } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ typeSlug: string }>;
};

export default async function ItemsByTypePage({ params }: PageProps) {
  const { typeSlug } = await params;
  if (!isValidItemTypeSlug(typeSlug)) {
    notFound();
  }

  const resolved = mockItemTypes.find((t) => getItemTypeSlug(t.name) === typeSlug);
  if (!resolved) {
    notFound();
  }

  const label = pluralizeTypeLabel(resolved.name);

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">{label}</h1>
      <p className="text-sm text-muted-foreground">
        {resolved.itemCount} items (mock)
      </p>
    </div>
  );
}
