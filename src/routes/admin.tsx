import { createFileRoute, Link } from "@tanstack/react-router";
import { DollarSign, LogOut, Package, ShoppingCart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/site/Logo";
import { AdminAccountPanel } from "@/components/admin/AdminAccountPanel";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { ProductsAdminPanel } from "@/components/admin/ProductsAdminPanel";
import { coupons, customers, messages, orders, salesTrend, subscribers } from "@/data/admin";
import { blogCategories, posts } from "@/data/blog";
import { reviews } from "@/data/products";
import { useCatalog } from "@/lib/catalog";
import { money } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Northbay Retail Co." },
      {
        name: "description",
        content:
          "Internal admin dashboard for products, orders, customers, content and store settings.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const revenue = orders
  .filter((o) => o.status !== "Cancelled" && o.status !== "Refunded")
  .reduce((s, o) => s + o.total, 0);

function AdminPage() {
  return <AdminAuthGate>{(ctx) => <AdminDashboard {...ctx} />}</AdminAuthGate>;
}

function AdminDashboard({ username, logout }: { username: string; logout: () => void }) {
  const { products } = useCatalog();
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">{username}</span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">View storefront</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="size-4" /> Log out
            </Button>
          </div>
        </div>
      </header>

      <div className="container-page py-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Demo data for layout purposes — replace with live business data.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={DollarSign} label="Revenue (demo)" value={money(revenue)} />
          <Kpi icon={ShoppingCart} label="Total orders" value={String(orders.length)} />
          <Kpi icon={Package} label="Products" value={String(products.length)} />
          <Kpi icon={Users} label="Customers" value={String(customers.length)} />
        </div>

        <Tabs defaultValue="orders" className="mt-8">
          <TabsList className="flex-wrap">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products & inventory</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="pt-6">
            <Panel title="Recent orders">
              <Table head={["Order", "Customer", "Date", "Items", "Total", "Status"]}>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="p-3 font-medium">{o.id}</td>
                    <td className="p-3">{o.customer}</td>
                    <td className="p-3 text-muted-foreground">{o.date}</td>
                    <td className="p-3">{o.items}</td>
                    <td className="p-3">{money(o.total)}</td>
                    <td className="p-3">
                      <Badge variant="secondary">{o.status}</Badge>
                    </td>
                  </tr>
                ))}
              </Table>
            </Panel>
            <Panel title="Monthly performance" className="mt-6">
              <Table head={["Month", "Revenue", "Orders"]}>
                {salesTrend.map((m) => (
                  <tr key={m.month} className="border-b border-border last:border-0">
                    <td className="p-3 font-medium">{m.month}</td>
                    <td className="p-3">{money(m.revenue)}</td>
                    <td className="p-3">{m.orders}</td>
                  </tr>
                ))}
              </Table>
            </Panel>
          </TabsContent>

          <TabsContent value="products" className="pt-6">
            <ProductsAdminPanel />
          </TabsContent>

          <TabsContent value="customers" className="pt-6">
            <Panel title="Customers">
              <Table head={["ID", "Name", "Email", "Orders", "Spent", "Joined"]}>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="p-3 text-muted-foreground">{c.id}</td>
                    <td className="p-3 font-medium">{c.name}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.orders}</td>
                    <td className="p-3">{money(c.spent)}</td>
                    <td className="p-3 text-muted-foreground">{c.joined}</td>
                  </tr>
                ))}
              </Table>
            </Panel>
          </TabsContent>

          <TabsContent value="content" className="grid gap-6 pt-6 lg:grid-cols-2">
            <Panel title={`Blog posts (${posts.length})`}>
              <ul className="divide-y divide-border text-sm">
                {posts.map((p) => (
                  <li key={p.slug} className="flex justify-between gap-4 p-3">
                    <span className="font-medium">{p.title}</span>
                    <span className="shrink-0 text-muted-foreground">{p.category}</span>
                  </li>
                ))}
              </ul>
              <p className="p-3 text-xs text-muted-foreground">
                Categories: {blogCategories.join(", ")}
              </p>
            </Panel>
            <Panel title={`Reviews awaiting content (${reviews.length})`}>
              <p className="p-4 text-sm text-muted-foreground">
                No reviews stored. Genuine customer reviews added here appear on product pages and
                the reviews page.
              </p>
            </Panel>
            <Panel title="Contact messages">
              <Table head={["ID", "From", "Subject", "Status"]}>
                {messages.map((m) => (
                  <tr key={m.id} className="border-b border-border last:border-0">
                    <td className="p-3 text-muted-foreground">{m.id}</td>
                    <td className="p-3">{m.name}</td>
                    <td className="p-3">{m.subject}</td>
                    <td className="p-3">
                      <Badge variant="secondary">{m.status}</Badge>
                    </td>
                  </tr>
                ))}
              </Table>
            </Panel>
          </TabsContent>

          <TabsContent value="marketing" className="grid gap-6 pt-6 lg:grid-cols-2">
            <Panel title="Coupons">
              <Table head={["Code", "Type", "Value", "Usage", "Status"]}>
                {coupons.map((c) => (
                  <tr key={c.code} className="border-b border-border last:border-0">
                    <td className="p-3 font-medium">{c.code}</td>
                    <td className="p-3">{c.type}</td>
                    <td className="p-3">{c.value}</td>
                    <td className="p-3 text-muted-foreground">{c.usage}</td>
                    <td className="p-3">
                      <Badge variant="secondary">{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </Table>
            </Panel>
            <Panel title="Newsletter subscribers">
              <Table head={["Email", "Date", "Source"]}>
                {subscribers.map((s) => (
                  <tr key={s.email} className="border-b border-border last:border-0">
                    <td className="p-3 font-medium">{s.email}</td>
                    <td className="p-3 text-muted-foreground">{s.date}</td>
                    <td className="p-3">{s.source}</td>
                  </tr>
                ))}
              </Table>
            </Panel>
          </TabsContent>

          <TabsContent value="settings" className="grid gap-6 pt-6 lg:grid-cols-2">
            <Panel title="Admin account">
              <AdminAccountPanel username={username} />
            </Panel>
            {[
              {
                t: "Website settings",
                d: "Company name, contact details, business hours and social links are edited in the company profile file.",
              },
              {
                t: "Shipping settings",
                d: "Processing times, carriers, rates and free-shipping threshold are edited in the shipping policy and company profile.",
              },
              {
                t: "Return policy settings",
                d: "Return window, eligibility and refund timing are edited in the returns policy content.",
              },
              {
                t: "Privacy & terms",
                d: "Privacy policy and terms & conditions content are edited in their respective policy files.",
              },
            ].map((s) => (
              <Panel key={s.t} title={s.t}>
                <p className="p-4 text-sm text-muted-foreground">{s.d}</p>
              </Panel>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`overflow-hidden rounded-xl border border-border bg-card ${className}`}>
      <h2 className="border-b border-border p-4 text-sm font-semibold">{title}</h2>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <table className="w-full min-w-[560px] text-sm">
      <thead className="bg-surface">
        <tr className="border-b border-border text-left">
          {head.map((h) => (
            <th key={h} scope="col" className="p-3 font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
