/**
 * Client-side catalog store.
 *
 * This site ships with no backend/database — `data/products.ts` is the seed
 * catalog baked into the build. The admin panel persists edits to
 * localStorage and layers them over that seed so changes survive reloads in
 * the same browser. There is no server, so admin edits are local to the
 * browser/device that made them and won't appear for other visitors or
 * survive a redeploy.
 */
import { useSyncExternalStore } from "react";
import {
  categories as seedCategories,
  products as seedProducts,
  type Category,
  type Product,
} from "@/data/products";

const STORAGE_KEY = "northbay-admin-catalog-v1";
const CHANGE_EVENT = "catalog:change";

type CatalogData = { products: Product[]; categories: Category[] };

const SERVER_SNAPSHOT: CatalogData = { products: seedProducts, categories: seedCategories };

let cache: CatalogData | null = null;

function readStorage(): CatalogData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CatalogData>;
    if (!Array.isArray(parsed.products) || !Array.isArray(parsed.categories)) return null;
    return { products: parsed.products, categories: parsed.categories };
  } catch {
    return null;
  }
}

function writeStorage(data: CatalogData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function getData(): CatalogData {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  if (!cache) cache = readStorage() ?? SERVER_SNAPSHOT;
  return cache;
}

function setData(data: CatalogData) {
  cache = data;
  writeStorage(data);
}

export function subscribeCatalog(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    cache = null;
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function getCatalogSnapshot(): CatalogData {
  return getData();
}

export function getServerCatalogSnapshot(): CatalogData {
  return SERVER_SNAPSHOT;
}

/** Reactive hook for components — reflects admin edits after hydration without a hydration-mismatch error. */
export function useCatalog() {
  return useSyncExternalStore(subscribeCatalog, getCatalogSnapshot, getServerCatalogSnapshot);
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function uniqueSlug(base: string, taken: string[]): string {
  const root = slugify(base) || "item";
  if (!taken.includes(root)) return root;
  let i = 2;
  while (taken.includes(`${root}-${i}`)) i++;
  return `${root}-${i}`;
}

// Plain (non-hook) readers — safe to call from route loaders, which run outside React.
export function getCatalogProduct(slug: string) {
  return getData().products.find((p) => p.slug === slug);
}
export function getCatalogCategory(slug: string) {
  return getData().categories.find((c) => c.slug === slug);
}
export function getCatalogCategoryName(slug: string) {
  return getCatalogCategory(slug)?.name ?? slug;
}
export function getCatalogFeaturedProducts() {
  return getData()
    .products.filter((p) => p.badge === "Best Seller" || p.badge === "New")
    .slice(0, 8);
}
export function getCatalogRelatedProducts(product: Product) {
  return getData()
    .products.filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
}

export type ProductInput = {
  name: string;
  category: string;
  brand: string;
  sku?: string | undefined;
  price: number;
  compareAt?: number | undefined;
  stock: number;
  badge?: Product["badge"];
  image?: string | undefined;
  gallery?: string[] | undefined;
  shortDescription: string;
  description?: string | undefined;
  features?: string[] | undefined;
  specs?: { label: string; value: string }[] | undefined;
};

export function addProduct(input: ProductInput): Product {
  const data = getData();
  const category = data.categories.find((c) => c.slug === input.category);
  const fallbackImage = category?.image ?? data.categories[0]?.image ?? "";
  const image = input.image?.trim() || fallbackImage;
  const gallery = input.gallery && input.gallery.length > 0 ? input.gallery : [image];
  const slug = uniqueSlug(
    input.name,
    data.products.map((p) => p.slug),
  );
  const id = `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const sku =
    input.sku?.trim() ||
    `NB-${input.category.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;

  const product: Product = {
    id,
    slug,
    name: input.name.trim(),
    sku,
    brand: input.brand.trim() || "Northbay Essentials",
    category: input.category,
    price: input.price,
    compareAt: input.compareAt,
    image,
    gallery,
    badge: input.badge,
    stock: input.stock,
    shortDescription: input.shortDescription.trim(),
    description: input.description?.trim() || input.shortDescription.trim(),
    features: input.features ?? [],
    specs: input.specs ?? [],
    rating: null,
    reviewCount: 0,
  };

  setData({ ...data, products: [product, ...data.products] });
  return product;
}

export function updateProduct(id: string, input: ProductInput): void {
  const data = getData();
  const idx = data.products.findIndex((p) => p.id === id);
  if (idx === -1) return;
  const existing = data.products[idx];
  if (!existing) return;
  const image = input.image?.trim() || existing.image;
  const gallery = input.gallery && input.gallery.length > 0 ? input.gallery : [image];

  const updated: Product = {
    ...existing,
    name: input.name.trim(),
    brand: input.brand.trim() || "Northbay Essentials",
    sku: input.sku?.trim() || existing.sku,
    category: input.category,
    price: input.price,
    compareAt: input.compareAt,
    image,
    gallery,
    badge: input.badge,
    stock: input.stock,
    shortDescription: input.shortDescription.trim(),
    description: input.description?.trim() || input.shortDescription.trim(),
    features: input.features ?? [],
    specs: input.specs ?? [],
  };

  const products = [...data.products];
  products[idx] = updated;
  setData({ ...data, products });
}

export function deleteProduct(id: string): void {
  const data = getData();
  setData({ ...data, products: data.products.filter((p) => p.id !== id) });
}

export type CategoryInput = { name: string; description: string; image?: string | undefined };

export function addCategory(input: CategoryInput): Category {
  const data = getData();
  const slug = uniqueSlug(
    input.name,
    data.categories.map((c) => c.slug),
  );
  const category: Category = {
    slug,
    name: input.name.trim(),
    description: input.description.trim(),
    image: input.image?.trim() || data.categories[0]?.image || "",
  };
  setData({ ...data, categories: [...data.categories, category] });
  return category;
}

export function updateCategory(slug: string, input: CategoryInput): void {
  const data = getData();
  const idx = data.categories.findIndex((c) => c.slug === slug);
  if (idx === -1) return;
  const existing = data.categories[idx];
  if (!existing) return;
  const updated: Category = {
    ...existing,
    name: input.name.trim(),
    description: input.description.trim(),
    image: input.image?.trim() || existing.image,
  };
  const categories = [...data.categories];
  categories[idx] = updated;
  setData({ ...data, categories });
}

export function deleteCategory(slug: string): { ok: boolean; reason?: string } {
  const data = getData();
  if (data.products.some((p) => p.category === slug)) {
    return { ok: false, reason: "Move or delete this category's products first." };
  }
  if (data.categories.length <= 1) {
    return { ok: false, reason: "At least one category is required." };
  }
  setData({ ...data, categories: data.categories.filter((c) => c.slug !== slug) });
  return { ok: true };
}

export function resetCatalog(): void {
  setData({ products: seedProducts, categories: seedCategories });
}

export function hasCatalogOverrides(): boolean {
  return readStorage() !== null;
}
