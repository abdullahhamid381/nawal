import { Headset, PackageCheck, RotateCcw, ShieldCheck } from "lucide-react";
import { company } from "@/data/company";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    body: "Payments are processed over encrypted connections by established payment providers.",
  },
  {
    icon: PackageCheck,
    title: "Reliable fulfillment",
    body: "Orders are picked, packed and handed to the carrier with tracking on every shipment.",
  },
  {
    icon: RotateCcw,
    title: "Straightforward returns",
    body: `Eligible items can be returned within ${company.returnWindowDays} days of delivery.`,
  },
  {
    icon: Headset,
    title: "Responsive support",
    body: `A real support team replies to messages, typically within ${company.supportResponseTime}.`,
  },
];

export function TrustBar() {
  return (
    <section aria-label="Why shop with us" className="border-y border-border bg-surface">
      <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.06} className="flex gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/8 text-primary">
              <it.icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}