import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/site/PageHeader";
import { money, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — Northbay Retail Co." },
      { name: "description", content: "Review the items in your cart, apply a discount code and continue to secure checkout." },
      { property: "og:title", content: "Shopping Cart — Northbay Retail Co." },
      { property: "og:description", content: "Review the items in your cart, apply a discount code and continue to secure checkout." },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartLines, setQty, removeFromCart, subtotal, discount, shipping, tax, total, applyCoupon, coupon, clearCoupon } = useStore();
  const [code, setCode] = useState("");

  return (
    <>
      <PageHeader title="Your cart" crumbs={[{ label: "Cart" }]} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        <div>
          {cartLines.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <h2 className="text-lg font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-sm text-muted-foreground">Browse the catalogue to add products.</p>
              <Button className="mt-6" asChild><Link to="/shop">Shop products</Link></Button>
            </div>
          ) : (
            <ul className="divide-y divide-border rounded-xl border border-border bg-card">
              {cartLines.map(({ product, qty }) => (
                <li key={product.id} className="flex flex-wrap gap-4 p-4">
                  <img src={product.image} alt={product.name} width={96} height={96} loading="lazy" className="size-24 rounded-lg border border-border object-cover" />
                  <div className="min-w-[180px] flex-1">
                    <Link to="/product/$slug" params={{ slug: product.slug }} className="font-semibold hover:underline">{product.name}</Link>
                    <p className="mt-1 text-xs text-muted-foreground">SKU {product.sku}</p>
                    <p className="mt-2 text-sm font-medium">{money(product.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 items-center rounded-lg border border-border">
                      <button className="px-2" aria-label={`Decrease quantity of ${product.name}`} onClick={() => setQty(product.slug, qty - 1)}><Minus className="size-3.5" /></button>
                      <span className="w-8 text-center text-sm">{qty}</span>
                      <button className="px-2" aria-label={`Increase quantity of ${product.name}`} onClick={() => setQty(product.slug, qty + 1)}><Plus className="size-3.5" /></button>
                    </div>
                    <Button size="icon" variant="ghost" aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(product.slug)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <p className="w-20 text-right font-semibold">{money(product.price * qty)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside>
          <div className="sticky top-32 rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Order summary</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <Row label="Subtotal" value={money(subtotal)} />
              {discount > 0 && <Row label={`Discount (${coupon})`} value={`−${money(discount)}`} />}
              <Row label="Shipping" value={shipping === 0 ? "Free" : money(shipping)} />
              <Row label="Estimated tax" value={money(tax)} />
              <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
                <dt>Total</dt><dd>{money(total)}</dd>
              </div>
            </dl>

            <div className="mt-5">
              <Label htmlFor="coupon" className="text-xs">Discount code</Label>
              <div className="mt-1.5 flex gap-2">
                <Input id="coupon" value={code} onChange={(e) => setCode(e.target.value)} placeholder="WELCOME10" className="h-10" />
                <Button variant="outline" className="h-10" onClick={() => (applyCoupon(code) ? toast.success("Code applied") : toast.error("Invalid code"))}>Apply</Button>
              </div>
              {coupon && (
                <button className="mt-2 text-xs text-muted-foreground underline" onClick={clearCoupon}>Remove code</button>
              )}
            </div>

            <Button size="lg" className="mt-5 w-full" disabled={cartLines.length === 0} asChild>
              <Link to="/checkout">Proceed to checkout</Link>
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Secure checkout · Encrypted connection</p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
