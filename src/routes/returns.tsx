import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, type PolicySection } from "@/components/site/Policy";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Refunds — Northbay Retail Co." },
      { name: "description", content: "Return eligibility, timeframes, refunds, exchanges, damaged or defective items, non-returnable products and refund processing times." },
      { property: "og:title", content: "Returns & Refunds — Northbay Retail Co." },
      { property: "og:description", content: "Return eligibility, timeframes, refunds, exchanges, damaged or defective items, non-returnable products and refund processing times." },
      { property: "og:url", content: "/returns" },
    ],
    links: [{ rel: "canonical", href: "/returns" }],
  }),
  component: ReturnsPage,
});

const sections: PolicySection[] = [
  {
    heading: "Return eligibility",
    bullets: [
      "Items must be unused, in resalable condition and in original packaging.",
      "Proof of purchase (order number or receipt) is required.",
      "Items marked final sale or listed as non-returnable are not eligible.",
    ],
  },
  {
    heading: "Return timeframe",
    paragraphs: [
      "Returns are accepted within 30 days of the delivery date. Requests received after this window may be considered at our discretion.",
    ],
  },
  {
    heading: "How the refund process works",
    bullets: [
      "Email our support team with your order number and the reason for return.",
      "We review the request and, if approved, issue return instructions.",
      "Once the returned item is received and inspected, the refund is issued to the original payment method.",
    ],
  },
  {
    heading: "Exchanges",
    paragraphs: [
      "We process exchanges as a return plus a new order. This is usually the fastest route, since the replacement ships as soon as it is placed rather than waiting for the return to arrive.",
    ],
  },
  {
    heading: "Damaged products",
    paragraphs: [
      "Report transit damage within [EDIT: number] days of delivery with photographs of the packaging and item. Approved claims are replaced or refunded and no return shipping cost applies to you.",
    ],
  },
  {
    heading: "Defective products",
    paragraphs: [
      "If a product develops a fault within the manufacturer warranty period, contact us and we will help arrange a replacement, repair or refund in line with the applicable warranty terms.",
    ],
  },
  {
    heading: "Non-returnable products",
    bullets: [
      "Personal care and hygiene items once opened.",
      "Perishable goods and consumables.",
      "Gift cards and digital products.",
      "[EDIT: add any other non-returnable categories you stock.]",
    ],
  },
  {
    heading: "Return shipping costs",
    paragraphs: [
      "Return shipping is paid by the customer for change-of-mind returns. We cover return shipping where the item is damaged, defective or incorrectly supplied.",
    ],
  },
  {
    heading: "Refund processing time",
    paragraphs: [
      "Refunds are issued within [EDIT: number] business days of the returned item passing inspection. Your bank or card issuer may take a further 3–10 business days to post the credit.",
    ],
  },
];

function ReturnsPage() {
  return (
    <PolicyPage
      title="Returns & Refunds"
      description="Return eligibility, timeframes, refunds, exchanges, damaged or defective items, non-returnable products and refund processing times."
      sections={sections}
    />
  );
}
