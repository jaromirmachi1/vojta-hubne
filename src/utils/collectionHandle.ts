/**
 * Fallback slug from title — Shopify Admin handles often differ.
 * Prefer explicit `collectionHandle` on customerPaths (see altHomepage.ts).
 */
export function titleToCollectionHandle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
