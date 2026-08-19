import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { blogCategories, posts } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Buying Guides & Product Education | Northbay Retail Co." },
      { name: "description", content: "Product guides, buying advice, shopping tips and company updates from the Northbay Retail Co. team." },
      { property: "og:title", content: "Blog — Buying Guides & Product Education | Northbay Retail Co." },
      { property: "og:description", content: "Product guides, buying advice, shopping tips and company updates from the Northbay Retail Co. team." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const list = posts.filter(
    (p) =>
      (!cat || p.category === cat) &&
      (!q || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader title="Blog" description="Practical product guides, buying advice and updates from our team." crumbs={[{ label: "Blog" }]} />
      <div className="container-page py-12">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="blog-search" className="sr-only">Search articles</Label>
            <Input id="blog-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="h-11 pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={cat === null ? "default" : "outline"} onClick={() => setCat(null)}>All</Button>
            {blogCategories.map((c) => (
              <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)}>{c}</Button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">No articles match that search.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]">
                  <div className="aspect-[16/10] overflow-hidden bg-surface">
                    <img src={p.image} alt={p.title} width={1024} height={640} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <Badge variant="secondary" className="w-fit">{p.category}</Badge>
                    <h2 className="mt-3 text-base font-semibold leading-snug">
                      <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:underline">{p.title}</Link>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    <p className="mt-4 text-xs text-muted-foreground">{p.date} · {p.readingTime}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
