import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Northbay Retail Co." },
      { name: "description", content: "Products you have saved for later. Move items to your cart whenever you are ready to order." },
      { property: "og:title", content: "Wishlist — Northbay Retail Co." },
      { property: "og:description", content: "Products you have saved for later. Move items to your cart whenever you are ready to order." },
      { property: "og:url", content: "/wishlist" },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));
  return (
    <>
      <PageHeader title="Wishlist" description="Products you have saved for later." crumbs={[{ label: "Wishlist" }]} />
      <div className="container-page py-12">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <h2 className="text-lg font-semibold">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">Save products with the heart icon to find them here later.</p>
            <Button className="mt-6" asChild><Link to="/shop">Browse products</Link></Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </>
  );
}
