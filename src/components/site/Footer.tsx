import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company, fullAddress } from "@/data/company";
import { useCatalog } from "@/lib/catalog";
import { Logo } from "./Logo";
import { NewsletterForm } from "./Newsletter";

const customerService = [
  { label: "Shipping & Delivery", to: "/shipping" },
  { label: "Returns & Refunds", to: "/returns" },
  { label: "Order Tracking", to: "/account" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact Us", to: "/contact" },
] as const;

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Customer Reviews", to: "/reviews" },
  { label: "Shop All", to: "/shop" },
] as const;

const policies = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Shipping Policy", to: "/shipping" },
  { label: "Return Policy", to: "/returns" },
] as const;

export function Footer() {
  const { categories } = useCatalog();
  return (
    <footer className="mt-auto border-t border-border bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo invert />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            {company.shortDescription}
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-primary-foreground/80">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {fullAddress}
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">
                {company.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className="hover:underline">
                {company.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {company.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
          <FooterCol title="Shop">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop"
                  search={{ category: c.slug }}
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="Customer Service">
            {customerService.map((l) => (
              <li key={l.to + l.label}>
                <Link
                  to={l.to}
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="Company">
            {companyLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold">Stay updated</h3>
          <p className="mt-2 text-sm text-primary-foreground/75">
            Product guides, restock notices and occasional offers. Unsubscribe any time.
          </p>
          <div className="mt-4">
            <NewsletterForm compact />
          </div>
          <ul className="mt-6 flex flex-wrap gap-3 text-sm">
            {company.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-md border border-primary-foreground/25 px-3 py-1.5 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {policies.map((p) => (
              <li key={p.label}>
                <Link to={p.to} className="transition-colors hover:text-primary-foreground">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">{children}</ul>
    </div>
  );
}
