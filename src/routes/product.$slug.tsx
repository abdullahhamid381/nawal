import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Heart, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { Rating } from "@/components/site/Rating";
import { Reveal } from "@/components/site/Reveal";
import { reviewsFor } from "@/data/products";
import { company } from "@/data/company";
import { getCatalogProduct, useCatalog } from "@/lib/catalog";
import { money, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getCatalogProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Northbay Retail Co.` },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.shortDescription },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            sku: p.sku,
            brand: { "@type": "Brand", name: p.brand },
            description: p.shortDescription,
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "USD",
              availability:
                p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: loaderProduct } = Route.useLoaderData();
  const { products, categories } = useCatalog();
  const product = products.find((p) => p.slug === loaderProduct.slug) ?? loaderProduct;
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const productReviews = reviewsFor(product.slug);
  const wished = wishlist.includes(product.slug);
  const bundle = related.slice(0, 2);
  const bundleTotal = product.price + bundle.reduce((s, p) => s + p.price, 0);
  const categoryName =
    categories.find((c) => c.slug === product.category)?.name ?? product.category;

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[{ label: "Shop", to: "/shop" }, { label: categoryName }, { label: product.name }]}
      />

      <div className="container-page grid gap-10 py-12 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <img
              src={product.gallery[active] ?? product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-[1.08]"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "size-20 overflow-hidden rounded-lg border-2 bg-surface transition-colors",
                  i === active ? "border-primary" : "border-border hover:border-muted-foreground",
                )}
              >
                <img
                  src={g}
                  alt=""
                  width={160}
                  height={160}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
            <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
            <span className="text-xs text-muted-foreground">Brand: {product.brand}</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">{product.name}</h2>
          <div className="mt-3">
            <Rating value={product.rating} count={product.reviewCount} size="md" />
          </div>
          <p className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{money(product.price)}</span>
            {product.compareAt && (
              <span className="text-base text-muted-foreground line-through">
                {money(product.compareAt)}
              </span>
            )}
          </p>
          <p
            className={cn(
              "mt-2 text-sm font-medium",
              product.stock > 0 ? "text-success" : "text-destructive",
            )}
          >
            {product.stock > 0 ? `In stock — ${product.stock} available` : "Currently out of stock"}
          </p>
          <p className="mt-5 leading-relaxed text-muted-foreground">{product.shortDescription}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex h-11 items-center rounded-lg border border-border">
              <button
                className="px-3 text-lg"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium" aria-live="polite">
                {qty}
              </span>
              <button
                className="px-3 text-lg"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <Button
              size="lg"
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product.slug, qty);
                toast.success("Added to cart", { description: product.name });
              }}
            >
              Add to cart
            </Button>
            <Button size="lg" variant="secondary" asChild disabled={product.stock === 0}>
              <Link to="/checkout" onClick={() => addToCart(product.slug, qty)}>
                Buy now
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              aria-pressed={wished}
              onClick={() => toggleWishlist(product.slug)}
            >
              <Heart className={cn("size-4", wished && "fill-destructive text-destructive")} />{" "}
              Wishlist
            </Button>
          </div>

          <ul className="mt-8 grid gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-3">
            <li className="flex gap-2.5 text-sm">
              <Truck className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>Free shipping over ${company.freeShippingThreshold}</span>
            </li>
            <li className="flex gap-2.5 text-sm">
              <RotateCcw className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{company.returnWindowDays}-day returns</span>
            </li>
            <li className="flex gap-2.5 text-sm">
              <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>Secure checkout</span>
            </li>
          </ul>

          <div className="mt-8 rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold">Frequently bought together</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                {product.name} — {money(product.price)}
              </li>
              {bundle.map((b) => (
                <li key={b.id}>
                  {b.name} — {money(b.price)}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-semibold">Bundle total: {money(bundleTotal)}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  addToCart(product.slug);
                  bundle.forEach((b) => addToCart(b.slug));
                  toast.success("Bundle added to cart");
                }}
              >
                Add all to cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page pb-16">
        <Tabs defaultValue="description">
          <TabsList className="flex-wrap">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & returns</TabsTrigger>
          </TabsList>
          <TabsContent
            value="description"
            className="max-w-3xl pt-6 leading-relaxed text-muted-foreground"
          >
            {product.description}
          </TabsContent>
          <TabsContent value="specs" className="pt-6">
            <dl className="max-w-2xl divide-y divide-border rounded-xl border border-border">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-2 gap-4 p-4 text-sm">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>
          <TabsContent value="features" className="pt-6">
            <ul className="max-w-2xl space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            {productReviews.length === 0 ? (
              <div className="max-w-2xl rounded-xl border border-dashed border-border p-8 text-center">
                <p className="font-semibold">No reviews for this product yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Verified reviews appear here once customers who purchased this item submit
                  feedback.
                </p>
              </div>
            ) : null}
          </TabsContent>
          <TabsContent
            value="shipping"
            className="max-w-3xl space-y-3 pt-6 text-sm text-muted-foreground"
          >
            <p>
              In-stock orders are processed within 1–2 business days and shipped with tracking.
              Delivery estimates are shown at checkout.
            </p>
            <p>
              Eligible items can be returned within {company.returnWindowDays} days of delivery in
              unused, resalable condition.
            </p>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/shipping">Shipping policy</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/returns">Return policy</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-14">
          <div className="container-page">
            <Reveal>
              <h2 className="mb-8 text-2xl font-bold">Related products</h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
