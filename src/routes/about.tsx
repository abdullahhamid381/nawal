import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import warehouse from "@/assets/warehouse.jpg";
import { company } from "@/data/company";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Northbay Retail Co." },
      { name: "description", content: "Learn about Northbay Retail Co.: our mission, values, product sourcing philosophy, quality checks, fulfillment process and customer service commitment." },
      { property: "og:title", content: "About Us — Northbay Retail Co." },
      { property: "og:description", content: "Learn about Northbay Retail Co.: our mission, values, product sourcing philosophy, quality checks, fulfillment process and customer service commitment." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { title: "Customer first", body: "Decisions start with the customer experience: accurate listings, fair policies and clear communication." },
  { title: "Honest listings", body: "We publish manufacturer specifications as supplied and avoid claims we cannot support." },
  { title: "Operational care", body: "Careful picking, protective packing and tracked dispatch on every order." },
  { title: "Continuous review", body: "Products and suppliers with recurring issues are reviewed and, where needed, delisted." },
];

const timeline = [
  { step: "Founded", body: "The company was established to sell quality everyday consumer products directly to customers online. [EDIT: add your founding details.]" },
  { step: "Catalogue built", body: "We assembled an initial catalogue across audio, kitchen, home, fitness and travel categories." },
  { step: "Fulfillment process", body: "We standardised picking, packing and tracked dispatch so customers receive consistent service." },
  { step: "Today", body: "We continue to expand the catalogue based on customer demand and supplier availability." },
];

const team = [
  { role: "Founder & Operations", body: "Oversees sourcing, supplier relationships and day-to-day operations." },
  { role: "Fulfillment Lead", body: "Manages inventory accuracy, packing standards and carrier hand-off." },
  { role: "Customer Support", body: "Answers pre-sale questions, order enquiries, returns and after-sales support." },
  { role: "Catalogue & Content", body: "Reviews product data, specifications and imagery before listings go live." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        title={`About ${company.name}`}
        description={company.shortDescription}
        crumbs={[{ label: "About" }]}
      />

      <section className="container-page grid items-center gap-10 py-14 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">Who we are</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {company.name} is an independent online retailer selling everyday consumer products through our own online
            store and third-party marketplaces. We focus on a curated catalogue rather than an unlimited one, so that
            every listing can be checked, stocked and supported properly.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our team handles sourcing, listing accuracy, fulfillment and customer support directly. That keeps
            responsibility for the customer experience in one place — from the moment an order is placed to any
            after-sales question that follows.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <img src={warehouse} alt="Shelving with packed customer orders in our fulfillment area" width={1600} height={1000} loading="lazy" className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-soft)]" />
        </Reveal>
      </section>

      <section className="border-y border-border bg-surface py-14">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="h-full"><CardContent className="p-7">
              <h2 className="text-xl font-bold">Our mission</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To make everyday shopping straightforward: quality products described accurately, priced fairly,
                shipped reliably and supported by people who answer.
              </p>
            </CardContent></Card>
          </Reveal>
          <Reveal delay={0.06}>
            <Card className="h-full"><CardContent className="p-7">
              <h2 className="text-xl font-bold">Our vision</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To grow into a retailer customers return to by default — because the listings are trustworthy, the
                fulfillment is dependable and the service is consistent.
              </p>
            </CardContent></Card>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-14">
        <Reveal><h2 className="text-2xl font-bold">Business values</h2></Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <Card className="h-full"><CardContent className="p-6">
                <h3 className="text-base font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </CardContent></Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-14">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          {[
            { h: "Product sourcing philosophy", p: "We buy from authorised suppliers and distributors who can document where products come from. We prefer fewer, better-supported lines over a large catalogue we cannot stand behind." },
            { h: "Quality assurance", p: "Incoming stock is checked for packaging condition, correct labelling and consistency with the specifications we publish. Items that fail these checks are not listed." },
            { h: "Order fulfillment", p: "Orders are picked and packed on business days, protected with appropriate materials and handed to the carrier with tracking issued to the customer by email." },
          ].map((b, i) => (
            <Reveal key={b.h} delay={i * 0.06}>
              <h2 className="text-xl font-bold">{b.h}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{b.p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page py-14">
        <Reveal><h2 className="text-2xl font-bold">Our journey</h2></Reveal>
        <ol className="mt-8 max-w-3xl border-l border-border">
          {timeline.map((t, i) => (
            <Reveal key={t.step} delay={i * 0.05}>
              <li className="relative pb-8 pl-8">
                <span className="absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-background bg-primary" aria-hidden="true" />
                <h3 className="font-semibold">{t.step}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-surface py-14">
        <div className="container-page">
          <Reveal>
            <h2 className="text-2xl font-bold">Our team</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Roles within the business. [EDIT: replace with real names, photographs and biographies.]
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.role} delay={i * 0.05}>
                <Card className="h-full"><CardContent className="p-6">
                  <span className="grid size-11 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {m.role.slice(0, 1)}
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{m.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </CardContent></Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-8">
            <div>
              <h2 className="text-xl font-bold">Customer service commitment</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Every message is answered by our team, typically within {company.supportResponseTime}. If something goes
                wrong with an order, we will tell you what happened and how we intend to fix it.
              </p>
            </div>
            <Button size="lg" asChild><Link to="/contact">Contact us</Link></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
