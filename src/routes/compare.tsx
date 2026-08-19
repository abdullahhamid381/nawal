import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { products } from "@/data/products";
import { money, useStore } from "@/lib/store";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Products — Northbay Retail Co." },
      { name: "description", content: "Compare product prices, availability and specifications side by side before you buy." },
      { property: "og:title", content: "Compare Products — Northbay Retail Co." },
      { property: "og:description", content: "Compare product prices, availability and specifications side by side before you buy." },
      { property: "og:url", content: "/compare" },
    ],
    links: [{ rel: "canonical", href: "/compare" }],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { compare, toggleCompare, addToCart } = useStore();
  const items = products.filter((p) => compare.includes(p.slug));
  const rows = ["Price", "Availability", "Brand", "SKU"];

  return (
    <>
      <PageHeader title="Compare products" description="Add up to four products from any product card to compare them side by side." crumbs={[{ label: "Compare" }]} />
      <div className="container-page py-12">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <h2 className="text-lg font-semibold">No products selected</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use the compare icon on a product card to add items here.</p>
            <Button className="mt-6" asChild><Link to="/shop">Browse products</Link></Button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <caption className="sr-only">Product comparison</caption>
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th scope="col" className="p-4 text-left font-semibold">Product</th>
                  {items.map((p) => (
                    <th key={p.id} scope="col" className="p-4 text-left align-top">
                      <img src={p.image} alt={p.name} width={120} height={120} loading="lazy" className="mb-3 size-24 rounded-lg border border-border object-cover" />
                      <Link to="/product/$slug" params={{ slug: p.slug }} className="font-semibold hover:underline">{p.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r} className="border-b border-border">
                    <th scope="row" className="p-4 text-left font-medium text-muted-foreground">{r}</th>
                    {items.map((p) => (
                      <td key={p.id} className="p-4">
                        {r === "Price" && money(p.price)}
                        {r === "Availability" && (p.stock > 0 ? `In stock (${p.stock})` : "Out of stock")}
                        {r === "Brand" && p.brand}
                        {r === "SKU" && p.sku}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="p-4 text-left font-medium text-muted-foreground">Actions</th>
                  {items.map((p) => (
                    <td key={p.id} className="space-y-2 p-4">
                      <Button size="sm" className="w-full" onClick={() => addToCart(p.slug)}>Add to cart</Button>
                      <Button size="sm" variant="outline" className="w-full" onClick={() => toggleCompare(p.slug)}>Remove</Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
