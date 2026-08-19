import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { company, fullAddress } from "@/data/company";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Northbay Retail Co." },
      { name: "description", content: "Contact Northbay Retail Co. by email, phone or message form. Business address, opening hours and customer support information." },
      { property: "og:title", content: "Contact Us — Northbay Retail Co." },
      { property: "og:description", content: "Contact Northbay Retail Co. by email, phone or message form. Business address, opening hours and customer support information." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      e.currentTarget?.reset?.();
      toast.success("Message received", { description: "Connect an email service to deliver form submissions." });
    }, 500);
  }

  return (
    <>
      <PageHeader
        title="Contact us"
        description={`Questions about an order, a product or a return? Our team replies within ${company.supportResponseTime} on business days.`}
        crumbs={[{ label: "Contact" }]}
      />

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
        <Reveal>
          <Card>
            <CardContent className="p-7">
              <h2 className="text-xl font-bold">Send us a message</h2>
              <form onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" required autoComplete="name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="order">Order number (optional)</Label>
                  <Input id="order" name="order" placeholder="NB-00000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" required />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={6} required />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" disabled={sending}>
                    {sending ? "Sending…" : "Send message"}
                  </Button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    By sending this form you agree to our{" "}
                    <Link to="/privacy" className="underline underline-offset-4">privacy policy</Link>.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </Reveal>

        <div className="space-y-5">
          <Reveal>
            <Card><CardContent className="space-y-4 p-6 text-sm">
              <h2 className="text-base font-semibold">Business details</h2>
              <p className="flex gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><a href={`mailto:${company.email}`} className="hover:underline">{company.email}</a></p>
              <p className="flex gap-2.5"><Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">{company.phone}</a></p>
              <p className="flex gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{fullAddress}</p>
            </CardContent></Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card><CardContent className="p-6 text-sm">
              <h2 className="flex items-center gap-2 text-base font-semibold"><Clock className="size-4 text-primary" aria-hidden="true" /> Business hours</h2>
              <ul className="mt-4 space-y-2">
                {company.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{h.days}</span>
                    <span className="font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </CardContent></Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card><CardContent className="p-6 text-sm">
              <h2 className="text-base font-semibold">Customer support</h2>
              <p className="mt-2 text-muted-foreground">
                For order status, returns and product questions, include your order number so we can respond faster.
              </p>
              <Button variant="outline" className="mt-4 w-full" asChild><Link to="/faq">Read the FAQ</Link></Button>
            </CardContent></Card>
          </Reveal>
        </div>
      </div>

      <section className="container-page pb-14">
        <Reveal>
          <h2 className="mb-4 text-xl font-bold">Find us</h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Map showing our business location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
              loading="lazy"
              className="h-[360px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">[EDIT: replace the address in the company profile to update this map.]</p>
        </Reveal>
      </section>
    </>
  );
}
