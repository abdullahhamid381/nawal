import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  CreditCard,
  Headset,
  Lock,
  MessageSquare,
  PackageSearch,
  Truck,
  Quote,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import warehouse from "@/assets/warehouse.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { TrustBar } from "@/components/site/TrustBar";
import { NewsletterForm } from "@/components/site/Newsletter";
import { reviews } from "@/data/products";
import { company } from "@/data/company";
import { useCatalog } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northbay Retail Co. — Quality Products. Reliable Service." },
      {
        name: "description",
        content:
          "Shop quality everyday products from Northbay Retail Co. Secure checkout, tracked shipping, straightforward returns and responsive customer support.",
      },
      {
        property: "og:title",
        content: "Northbay Retail Co. — Quality Products. Reliable Service.",
      },
      {
        property: "og:description",
        content:
          "A customer-focused eCommerce company offering quality products, secure shopping and reliable fulfillment.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />
      <Featured />
      <WhyChooseUs />
      <Operations />
      <Reviews />
      <SupportRow />
      <NewsletterBand />
    </>
  );
}

function Hero() {
  const { products, categories } = useCatalog();
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            Independent online retailer
          </span>
          <h1 className="mt-5 text-balance-tight text-4xl font-extrabold leading-[1.08] md:text-5xl lg:text-6xl">
            Quality Products.
            <br />
            Reliable Service.
            <br />
            <span className="text-primary">Trusted Shopping.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {company.shortDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/shop">
                Shop Now <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/shop" search={{ sort: "featured" }}>
                Explore Products
              </Link>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            <Stat label="Product listings" value={`${products.length}`} />
            <Stat label="Product categories" value={`${categories.length}`} />
            <Stat label="Return window" value={`${company.returnWindowDays} days`} />
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <img
            src={heroImage}
            alt="A selection of everyday consumer products including headphones, an insulated bottle and a kitchen appliance"
            width={1600}
            height={1200}
            className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-lift)]"
          />
          <div className="absolute -bottom-5 left-5 hidden rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-lift)] sm:block">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-success/12 text-success">
                <Truck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">Tracked on every order</p>
                <p className="text-xs text-muted-foreground">
                  Tracking details sent by email at dispatch
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-bold">{value}</dd>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground/70">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-bold md:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function Categories() {
  const { categories } = useCatalog();
  return (
    <section className="container-page py-16">
      <Reveal>
        <SectionHead
          eyebrow="Browse"
          title="Featured categories"
          description="Everyday product categories we stock and fulfil directly."
          action={
            <Button variant="ghost" asChild>
              <Link to="/shop">
                All products <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <Link
              to="/shop"
              search={{ category: c.slug }}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-surface">
                <img
                  src={c.image}
                  alt={c.name}
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold">{c.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Shop category{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const { products } = useCatalog();
  const featuredProducts = products.filter((p) => p.badge === "Best Seller" || p.badge === "New");
  return (
    <section className="border-y border-border bg-surface py-16">
      <div className="container-page">
        <Reveal>
          <SectionHead
            eyebrow="Selected for you"
            title="Featured products"
            description="A cross-section of our current catalogue."
            action={
              <Button variant="outline" asChild>
                <Link to="/shop">View all products</Link>
              </Button>
            }
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    icon: PackageSearch,
    title: "Authentic products",
    body: "We source from authorised suppliers and inspect inventory before it is listed for sale.",
  },
  {
    icon: Lock,
    title: "Secure shopping",
    body: "Checkout runs over encrypted connections and card details are handled by the payment provider, never stored by us.",
  },
  {
    icon: Truck,
    title: "Dependable shipping",
    body: "Orders are processed on business days and every shipment includes carrier tracking.",
  },
  {
    icon: Headset,
    title: "Customer-first service",
    body: `Questions are answered by our support team, typically within ${company.supportResponseTime}.`,
  },
];

function WhyChooseUs() {
  return (
    <section className="container-page py-16">
      <Reveal>
        <SectionHead
          eyebrow="Why choose us"
          title="Built around the details that matter"
          description="A retail operation focused on accurate listings, careful packing and clear communication."
        />
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.06}>
            <Card className="h-full transition-transform duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <r.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Operations() {
  return (
    <section className="border-y border-border bg-surface py-16">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img
            src={warehouse}
            alt="Organised shelving with packed orders inside our fulfillment facility"
            width={1600}
            height={1000}
            loading="lazy"
            className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-soft)]"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground/70">
            Fulfillment
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Fast, careful and fully tracked</h2>
          <p className="mt-3 text-muted-foreground">
            Orders placed before our daily cut-off are picked the same business day. Items are
            packed with protective materials appropriate to the product, and a tracking number is
            emailed as soon as the carrier collects.
          </p>
          <ul className="mt-6 space-y-4">
            {[
              { title: "Processing", body: "1–2 business days for in-stock items." },
              { title: "Dispatch", body: "Tracking number issued by email at hand-off." },
              { title: "Delivery", body: "Estimated delivery windows shown at checkout." },
            ].map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-background text-sm font-semibold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button className="mt-8" variant="outline" asChild>
            <Link to="/shipping">Read our shipping policy</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="container-page py-16">
      <Reveal>
        <SectionHead
          eyebrow="Customer feedback"
          title="Customer reviews"
          description="We publish verified reviews from real customers only."
          action={
            <Button variant="ghost" asChild>
              <Link to="/reviews">
                All reviews <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
      </Reveal>
      {reviews.length === 0 ? (
        <Reveal>
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <Quote className="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-semibold">No published reviews yet</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Verified reviews from customers will appear here as orders are delivered. We do not
              publish incentivised or unverified feedback.
            </p>
            <Button className="mt-6" variant="outline" asChild>
              <Link to="/reviews">Learn how reviews work</Link>
            </Button>
          </div>
        </Reveal>
      ) : null}
    </section>
  );
}

function SupportRow() {
  const items = [
    {
      icon: CreditCard,
      title: "Secure payments",
      body: "Major cards and digital wallets processed by an established payment provider. We never store full card numbers.",
    },
    {
      icon: Truck,
      title: "Fast, reliable shipping",
      body: `Free standard shipping on orders over $${company.freeShippingThreshold}. Expedited options available at checkout.`,
    },
    {
      icon: MessageSquare,
      title: "Customer support",
      body: `Email ${company.email} or call ${company.phone} during business hours.`,
    },
  ];
  return (
    <section className="border-t border-border bg-primary py-16 text-primary-foreground">
      <div className="container-page grid gap-8 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.06}>
            <span className="grid size-11 place-items-center rounded-xl bg-primary-foreground/12">
              <it.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{it.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function NewsletterBand() {
  return (
    <section className="container-page py-16">
      <Reveal>
        <div className="rounded-2xl border border-border bg-surface p-8 md:p-12">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Product guides and restock notices</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Join our email list for buying guides, product education and occasional offers. No
                spam, unsubscribe at any time.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
