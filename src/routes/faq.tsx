import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { company } from "@/data/company";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Orders, Shipping, Returns & Support | Northbay Retail Co." },
      { name: "description", content: "Answers to common questions about orders, payments, shipping, tracking, returns, refunds, products, accounts and customer support." },
      { property: "og:title", content: "FAQ — Orders, Shipping, Returns & Support | Northbay Retail Co." },
      { property: "og:description", content: "Answers to common questions about orders, payments, shipping, tracking, returns, refunds, products, accounts and customer support." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

const groups = [
  {
    title: "Orders",
    items: [
      ["How do I place an order?", "Add items to your cart and complete checkout. You will receive an order confirmation email with your order number."],
      ["Can I change or cancel an order?", "Contact us as soon as possible with your order number. If the order has not yet been dispatched we can usually amend or cancel it."],
      ["Do you sell on other marketplaces?", "Yes — we sell through our own store and third-party online marketplaces. Orders placed on a marketplace are managed under that marketplace's policies."],
    ],
  },
  {
    title: "Payments",
    items: [
      ["Which payment methods do you accept?", "[EDIT: list accepted cards and wallets.] Payments are processed by our payment provider over an encrypted connection."],
      ["Do you store my card details?", "No. Card data is handled entirely by the payment provider; we never receive or store full card numbers."],
      ["When am I charged?", "Payment is captured when the order is placed."],
    ],
  },
  {
    title: "Shipping & tracking",
    items: [
      ["How long does processing take?", "In-stock orders are picked and packed within 1–2 business days."],
      ["How do I track my order?", "A tracking number is emailed at dispatch, and you can check status on the Account page using your order number."],
      ["What if tracking has not updated?", "Carrier scans can pause during busy periods. If there is no movement for several business days, contact us and we will open a trace."],
    ],
  },
  {
    title: "Returns & refunds",
    items: [
      ["What is your return window?", `Eligible items can be returned within ${company.returnWindowDays} days of delivery in unused, resalable condition.`],
      ["How long do refunds take?", "Refunds are issued after inspection; your bank may take a further 3–10 business days to post the credit."],
      ["Who pays return shipping?", "Customers cover return shipping for change-of-mind returns. We cover it for damaged, defective or incorrect items."],
    ],
  },
  {
    title: "Products",
    items: [
      ["Are your products authentic?", "We buy from authorised suppliers and distributors and check incoming stock before listing it."],
      ["Do products include a warranty?", "Where the manufacturer provides a warranty, it applies as stated by the manufacturer. Contact us and we will help you use it."],
      ["An item is out of stock — will it return?", "Restock timing depends on the supplier. Contact us and we can tell you what we know."],
    ],
  },
  {
    title: "Account & support",
    items: [
      ["Do I need an account to order?", "No — guest checkout is available. An account makes it easier to track orders and reorder."],
      ["How do I contact support?", `Email ${company.email} or call ${company.phone} during business hours.`],
      ["How quickly do you reply?", `Typically within ${company.supportResponseTime} on business days.`],
    ],
  },
];

function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        description="Answers to the questions we receive most often. If yours is not here, our team is happy to help."
        crumbs={[{ label: "FAQ" }]}
      />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div className="max-w-3xl space-y-10">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.04}>
              <section>
                <h2 className="mb-3 text-xl font-bold">{g.title}</h2>
                <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-4">
                  {g.items.map(([q, a]) => (
                    <AccordionItem key={q} value={q as string}>
                      <AccordionTrigger className="text-left text-sm font-medium">{q}</AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </Reveal>
          ))}
        </div>
        <aside>
          <div className="sticky top-32 rounded-xl border border-border bg-surface p-6">
            <h2 className="text-base font-semibold">Still need help?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Our support team answers order, product and return questions directly.</p>
            <Button className="mt-4 w-full" asChild><Link to="/contact">Contact support</Link></Button>
            <Button variant="outline" className="mt-2 w-full" asChild><Link to="/shipping">Shipping policy</Link></Button>
            <Button variant="outline" className="mt-2 w-full" asChild><Link to="/returns">Return policy</Link></Button>
          </div>
        </aside>
      </div>
    </>
  );
}
