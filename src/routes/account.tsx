import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/site/PageHeader";
import { orders } from "@/data/admin";
import { money } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account & Order Tracking — Northbay Retail Co." },
      { name: "description", content: "Sign in to view order history, track shipments and manage your account details." },
      { property: "og:title", content: "My Account & Order Tracking — Northbay Retail Co." },
      { property: "og:description", content: "Sign in to view order history, track shipments and manage your account details." },
      { property: "og:url", content: "/account" },
    ],
    links: [{ rel: "canonical", href: "/account" }],
  }),
  component: AccountPage,
});

function AccountPage() {
  const [tracked, setTracked] = useState<string | null>(null);

  return (
    <>
      <PageHeader title="My account" description="Order history, tracking and account details. [EDIT: connect authentication to enable real customer accounts.]" crumbs={[{ label: "Account" }]} />
      <div className="container-page py-12">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Order history</TabsTrigger>
            <TabsTrigger value="track">Track an order</TabsTrigger>
            <TabsTrigger value="details">Account details</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="pt-6">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[560px] text-sm">
                <caption className="sr-only">Demo order history</caption>
                <thead className="bg-surface">
                  <tr className="border-b border-border text-left">
                    <th scope="col" className="p-4">Order</th><th scope="col" className="p-4">Date</th>
                    <th scope="col" className="p-4">Items</th><th scope="col" className="p-4">Total</th><th scope="col" className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium">{o.id}</td>
                      <td className="p-4 text-muted-foreground">{o.date}</td>
                      <td className="p-4 text-muted-foreground">{o.items}</td>
                      <td className="p-4">{money(o.total)}</td>
                      <td className="p-4"><Badge variant="secondary">{o.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Demo records shown for layout purposes.</p>
          </TabsContent>

          <TabsContent value="track" className="max-w-lg pt-6">
            <form
              className="space-y-4 rounded-xl border border-border bg-card p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setTracked("Processing — your order is being picked and packed. Tracking is emailed at dispatch.");
                toast.success("Order status retrieved");
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="order-no">Order number</Label>
                <Input id="order-no" placeholder="NB-10241" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order-email">Email used at checkout</Label>
                <Input id="order-email" type="email" required />
              </div>
              <Button type="submit">Track order</Button>
              {tracked && <p className="rounded-lg bg-surface p-4 text-sm text-muted-foreground">{tracked}</p>}
            </form>
          </TabsContent>

          <TabsContent value="details" className="max-w-lg pt-6">
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <div className="grid gap-2"><Label htmlFor="acc-name">Full name</Label><Input id="acc-name" /></div>
              <div className="grid gap-2"><Label htmlFor="acc-email">Email</Label><Input id="acc-email" type="email" /></div>
              <div className="grid gap-2"><Label htmlFor="acc-addr">Default shipping address</Label><Input id="acc-addr" /></div>
              <Button onClick={() => toast.success("Saved locally", { description: "Connect a backend to persist account details." })}>Save changes</Button>
            </div>
          </TabsContent>
        </Tabs>

        <p className="mt-10 text-sm text-muted-foreground">
          Need help with an order? <Link to="/contact" className="font-medium text-primary underline-offset-4 hover:underline">Contact support</Link>.
        </p>
      </div>
    </>
  );
}
