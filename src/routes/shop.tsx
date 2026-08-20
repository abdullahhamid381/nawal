import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { useCatalog } from "@/lib/catalog";

type ShopSearch = {
  q?: string | undefined;
  category?: string | undefined;
  sort?: "featured" | "price-asc" | "price-desc" | "name" | undefined;
  page?: number | undefined;
};

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "name"]).optional(),
  page: z.number().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop All Products — Northbay Retail Co." },
      {
        name: "description",
        content:
          "Browse the full Northbay Retail Co. catalogue: audio, kitchen, home, fitness and travel products with search, filtering and secure checkout.",
      },
      { property: "og:title", content: "Shop All Products — Northbay Retail Co." },
      {
        property: "og:description",
        content: "Browse quality everyday products with search, category and price filtering.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

const PER_PAGE = 8;
const MAX_PRICE = 200;

function ShopPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products, categories } = useCatalog();

  const [query, setQuery] = useState(search.q ?? "");
  const [price, setPrice] = useState<number[]>([MAX_PRICE]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const activeCategories = search.category ? search.category.split(",").filter(Boolean) : [];
  const sort = search.sort ?? "featured";
  const page = search.page ?? 1;

  const setSearch = (next: Partial<ShopSearch>) =>
    void navigate({ search: (prev: ShopSearch) => ({ ...prev, page: 1, ...next }) });

  const toggleCategory = (slug: string) => {
    const next = activeCategories.includes(slug)
      ? activeCategories.filter((c: string) => c !== slug)
      : [...activeCategories, slug];
    setSearch({ category: next.length ? next.join(",") : undefined });
  };

  const filtered = useMemo(() => {
    const q = (search.q ?? "").trim().toLowerCase();
    let list = products.filter((p) => {
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.includes(q);
      const matchCat = activeCategories.length === 0 || activeCategories.includes(p.category);
      const matchPrice = p.price <= (price[0] ?? MAX_PRICE);
      const matchStock = !inStockOnly || p.stock > 0;
      return matchQ && matchCat && matchPrice && matchStock;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") list = [...list].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    return list;
  }, [search.q, activeCategories.join(","), price, inStockOnly, sort, products]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const filters = (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold">Categories</h3>
        <ul className="mt-3 space-y-2.5">
          {categories.map((c) => (
            <li key={c.slug} className="flex items-center gap-2.5">
              <Checkbox
                id={`cat-${c.slug}`}
                checked={activeCategories.includes(c.slug)}
                onCheckedChange={() => toggleCategory(c.slug)}
              />
              <Label htmlFor={`cat-${c.slug}`} className="cursor-pointer text-sm font-normal">
                {c.name}
              </Label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold">Max price</h3>
        <Slider
          className="mt-4"
          value={price}
          onValueChange={setPrice}
          min={20}
          max={MAX_PRICE}
          step={5}
        />
        <p className="mt-2 text-sm text-muted-foreground">Up to ${price[0]}</p>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="stock"
          checked={inStockOnly}
          onCheckedChange={(v) => setInStockOnly(v === true)}
        />
        <Label htmlFor="stock" className="cursor-pointer text-sm font-normal">
          In stock only
        </Label>
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setPrice([MAX_PRICE]);
          setInStockOnly(false);
          setQuery("");
          void navigate({ search: {} });
        }}
      >
        <X className="size-4" /> Clear all filters
      </Button>
    </div>
  );

  return (
    <>
      <PageHeader
        title="Shop all products"
        description="Search, filter and compare our full catalogue of everyday consumer products."
        crumbs={[{ label: "Shop" }]}
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-32 rounded-xl border border-border bg-card p-5">{filters}</div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <form
              className="relative flex-1 min-w-[220px]"
              onSubmit={(e) => {
                e.preventDefault();
                setSearch({ q: query || undefined });
              }}
            >
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Label htmlFor="shop-search" className="sr-only">
                Search products
              </Label>
              <Input
                id="shop-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="h-11 pl-9"
              />
            </form>

            <Select value={sort} onValueChange={(v) => setSearch({ sort: v as "featured" })}>
              <SelectTrigger className="h-11 w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="name">Name A–Z</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 lg:hidden">
                  <SlidersHorizontal className="size-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="p-4">{filters}</div>
              </SheetContent>
            </Sheet>
          </div>

          <p className="mb-5 text-sm text-muted-foreground" role="status">
            Showing {visible.length} of {filtered.length} products
          </p>

          {visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <h2 className="text-lg font-semibold">No products match those filters</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening your price range or clearing filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}

          {pages > 1 && (
            <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={current === 1}
                onClick={() =>
                  void navigate({ search: (p: ShopSearch) => ({ ...p, page: current - 1 }) })
                }
              >
                Previous
              </Button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <Button
                  key={n}
                  size="sm"
                  variant={n === current ? "default" : "outline"}
                  aria-current={n === current ? "page" : undefined}
                  onClick={() => void navigate({ search: (p: ShopSearch) => ({ ...p, page: n }) })}
                >
                  {n}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={current === pages}
                onClick={() =>
                  void navigate({ search: (p: ShopSearch) => ({ ...p, page: current + 1 }) })
                }
              >
                Next
              </Button>
            </nav>
          )}

          <p className="mt-10 text-sm text-muted-foreground">
            Looking for something specific?{" "}
            <Link
              to="/contact"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Contact our team
            </Link>{" "}
            and we will help you find it.
          </p>
        </div>
      </div>
    </>
  );
}
