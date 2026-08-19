import { type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/site/PageHeader";
import { money, useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — Northbay Retail Co." },
      { name: "description", content: "Complete your order over a secure, encrypted checkout with tracked shipping and straightforward returns." },
      { property: "og:title", content: "Secure Checkout — Northbay Retail Co." },
      { property: "og:description", content: "Complete your order over a secure, encrypted checkout with tracked shipping and straightforward returns." },
      { property: "og:url", content: "/checkout" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartLines, subtotal, discount, shipping, tax, total, clearCart } = useStore();

  function submit(e: FormEvent) {
    e.preventDefault();
    toast.success("Demo checkout", { description: "Connect a payment provider to accept real orders." });
    clearCart();
  }

  return (
    <>
      <PageHeader title="Checkout" description="Demo checkout — connect a payment provider to process live orders." crumbs={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-8">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="co-email" label="Email" type="email" />
              <Field id="co-phone" label="Phone" type="tel" />
            </div>
          </section>
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="co-first" label="First name" />
              <Field id="co-last" label="Last name" />
              <div className="sm:col-span-2"><Field id="co-addr" label="Street address" /></div>
              <Field id="co-city" label="City" />
              <Field id="co-state" label="State" />
              <Field id="co-zip" label="ZIP code" />
              <Field id="co-country" label="Country" />
            </div>
          </section>
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold"><Lock className="size-4 text-primary" aria-hidden="true" /> Payment</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Card fields are supplied by the payment provider and are not stored on this site. [EDIT: connect your payment provider.]
            </p>
          </section>
          <Button type="submit" size="lg" disabled={cartLines.length === 0}>Place order</Button>
        </form>

        <aside>
          <div className="sticky top-32 rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Order summary</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {cartLines.map(({ product, qty }) => (
                <li key={product.id} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{product.name} × {qty}</span>
                  <span className="font-medium">{money(product.price * qty)}</span>
                </li>
              ))}
              {cartLines.length === 0 && <li className="text-muted-foreground">Your cart is empty. <Link to="/shop" className="underline">Shop products</Link>.</li>}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{money(subtotal)}</dd></div>
              {discount > 0 && <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd>−{money(discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : money(shipping)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>{money(tax)}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-bold"><dt>Total</dt><dd>{money(total)}</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} required />
    </div>
  );
}
