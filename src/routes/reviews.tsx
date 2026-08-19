import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/site/PageHeader";
import { Rating } from "@/components/site/Rating";
import { Reveal } from "@/components/site/Reveal";
import { reviews } from "@/data/products";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — Northbay Retail Co." },
      { name: "description", content: "Verified customer reviews of Northbay Retail Co. products and service. We publish genuine feedback from real orders only." },
      { property: "og:title", content: "Customer Reviews — Northbay Retail Co." },
      { property: "og:description", content: "Verified customer reviews of Northbay Retail Co. products and service. We publish genuine feedback from real orders only." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <PageHeader
        title="Customer reviews"
        description="We publish reviews from verified customers only. No incentivised, purchased or fabricated feedback appears on this site."
        crumbs={[{ label: "Reviews" }]}
      />
      <div className="container-page py-12">
        <div className="mb-10 grid gap-5 sm:grid-cols-3">
          {[
            { icon: BadgeCheck, t: "Verified purchases", b: "Reviews are linked to a completed order before they are published." },
            { icon: ShieldCheck, t: "Unedited feedback", b: "We do not edit review content or remove critical reviews." },
            { icon: MessageSquare, t: "We respond", b: "Where an issue is raised, our team replies publicly with the resolution." },
          ].map((i, idx) => (
            <Reveal key={i.t} delay={idx * 0.05}>
              <Card className="h-full"><CardContent className="p-6">
                <i.icon className="size-5 text-primary" aria-hidden="true" />
                <h2 className="mt-3 text-base font-semibold">{i.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.b}</p>
              </CardContent></Card>
            </Reveal>
          ))}
        </div>

        {reviews.length === 0 ? (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <h2 className="text-xl font-bold">No published reviews yet</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                This section is ready for genuine customer reviews. Reviews submitted by verified customers are approved
                in the admin panel and appear here automatically.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild><Link to="/shop">Browse products</Link></Button>
                <Button variant="outline" asChild><Link to="/contact">Share your feedback</Link></Button>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <Card key={r.id}><CardContent className="p-6">
                <Rating value={r.rating} count={1} />
                <h3 className="mt-3 font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                <p className="mt-4 text-xs text-muted-foreground">{r.author} · {r.date}{r.verified ? " · Verified purchase" : ""}</p>
              </CardContent></Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
