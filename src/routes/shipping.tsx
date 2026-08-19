import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, type PolicySection } from "@/components/site/Policy";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery — Northbay Retail Co." },
      { name: "description", content: "Processing times, shipping methods, delivery estimates, tracking, delayed or damaged parcels and international shipping information." },
      { property: "og:title", content: "Shipping & Delivery — Northbay Retail Co." },
      { property: "og:description", content: "Processing times, shipping methods, delivery estimates, tracking, delayed or damaged parcels and international shipping information." },
      { property: "og:url", content: "/shipping" },
    ],
    links: [{ rel: "canonical", href: "/shipping" }],
  }),
  component: ShippingPage,
});

const sections: PolicySection[] = [
  {
    heading: "Order processing times",
    paragraphs: [
      "In-stock orders are picked and packed within 1–2 business days of payment confirmation. Orders placed on weekends or public holidays begin processing on the next business day.",
      "During high-volume periods processing may take slightly longer. If a delay is expected, we contact you by email with a revised timeframe.",
    ],
  },
  {
    heading: "Shipping methods",
    bullets: [
      "Standard shipping — [EDIT: carrier], typically 3–7 business days after dispatch.",
      "Expedited shipping — [EDIT: carrier], typically 2–3 business days after dispatch.",
      "Free standard shipping on eligible orders over $49 shipped within the contiguous United States.",
    ],
  },
  {
    heading: "Estimated delivery times",
    paragraphs: [
      "Delivery estimates are shown at checkout and are calculated from the dispatch date, not the order date. Estimates are provided by the carrier and are not guaranteed delivery dates.",
    ],
  },
  {
    heading: "Tracking your order",
    paragraphs: [
      "A tracking number is emailed as soon as the carrier collects your parcel. Tracking can take up to 24 hours to show its first scan.",
      "You can also view order status and tracking from the Account page using your order number.",
    ],
  },
  {
    heading: "Delayed orders",
    paragraphs: [
      "If tracking has not updated for several business days, contact our support team with your order number and we will open a trace with the carrier. Traces typically take [EDIT: number] business days to resolve.",
    ],
  },
  {
    heading: "Damaged packages",
    paragraphs: [
      "If your parcel arrives damaged, photograph the outer packaging and the item and contact us within [EDIT: number] days of delivery. We will arrange a replacement or refund once the claim is reviewed.",
    ],
  },
  {
    heading: "Lost packages",
    paragraphs: [
      "A parcel is considered lost once the carrier confirms it cannot be located. We will replace or refund confirmed lost shipments at no cost to you.",
    ],
  },
  {
    heading: "International shipping",
    paragraphs: [
      "[EDIT: State whether you ship internationally.] Where international shipping is offered, the recipient is responsible for any import duties, taxes or customs fees charged by the destination country.",
    ],
  },
];

function ShippingPage() {
  return (
    <PolicyPage
      title="Shipping & Delivery"
      description="Processing times, shipping methods, delivery estimates, tracking, delayed or damaged parcels and international shipping information."
      sections={sections}
    />
  );
}
