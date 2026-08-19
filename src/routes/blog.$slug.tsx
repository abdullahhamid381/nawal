import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { getPost, relatedPosts } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — Northbay Retail Co.` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            datePublished: p.date,
            description: p.excerpt,
            publisher: { "@type": "Organization", name: "Northbay Retail Co." },
          }),
        },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const related = relatedPosts(post);
  return (
    <>
      <PageHeader title={post.title} crumbs={[{ label: "Blog", to: "/blog" }, { label: post.category }]} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_300px]">
        <article className="max-w-3xl">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-xs text-muted-foreground">{post.date} · {post.readingTime}</span>
          </div>
          <img src={post.image} alt={post.title} width={1024} height={640} className="mt-6 w-full rounded-2xl border border-border object-cover" />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          {post.body.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.04}>
              <section className="mt-8">
                <h2 className="text-xl font-bold">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
                ))}
              </section>
            </Reveal>
          ))}
        </article>
        <aside>
          <div className="sticky top-32 rounded-xl border border-border bg-surface p-6">
            <h2 className="text-base font-semibold">Related articles</h2>
            <ul className="mt-4 space-y-4">
              {related.length === 0 && <li className="text-sm text-muted-foreground">No related articles yet.</li>}
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to="/blog/$slug" params={{ slug: r.slug }} className="text-sm font-medium hover:underline">{r.title}</Link>
                  <p className="mt-1 text-xs text-muted-foreground">{r.readingTime}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
