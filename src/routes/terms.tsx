import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, type PolicySection } from "@/components/site/Policy";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Northbay Retail Co." },
      { name: "description", content: "Terms governing website use, orders, payments, pricing, shipping, returns, intellectual property and account responsibilities." },
      { property: "og:title", content: "Terms & Conditions — Northbay Retail Co." },
      { property: "og:description", content: "Terms governing website use, orders, payments, pricing, shipping, returns, intellectual property and account responsibilities." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections: PolicySection[] = [
  {
    heading: "Website usage",
    paragraphs: [
      "By accessing this website you agree to use it lawfully and not to interfere with its operation, security or availability. We may update these terms; the version published on this page applies to your use of the site.",
    ],
  },
  {
    heading: "Orders",
    paragraphs: [
      "Submitting an order is an offer to purchase. A contract is formed when we confirm dispatch. We may decline or cancel an order where an item is unavailable, a pricing error has occurred, or where we cannot verify the payment or delivery details.",
    ],
  },
  {
    heading: "Payments",
    paragraphs: [
      "Payment is taken at the time of order through our payment provider. All prices are shown in US dollars unless stated otherwise, and applicable taxes are calculated at checkout.",
    ],
  },
  {
    heading: "Product information",
    paragraphs: [
      "Product descriptions, specifications and images are provided by manufacturers and suppliers and reviewed by our team. Minor variations in packaging or appearance can occur. If a listing contains a material error we will contact you before dispatch.",
    ],
  },
  {
    heading: "Pricing",
    paragraphs: [
      "Prices may change without notice. The price applied to your order is the price shown at the time your order is confirmed.",
    ],
  },
  {
    heading: "Shipping",
    paragraphs: [
      "Shipping terms, timeframes and costs are set out in our Shipping & Delivery policy, which forms part of these terms.",
    ],
  },
  {
    heading: "Returns",
    paragraphs: [
      "Return and refund terms are set out in our Returns & Refunds policy, which forms part of these terms and does not affect your statutory rights.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "Site content, branding and layout are owned by us or our licensors and may not be copied or reproduced for commercial use without written permission. Manufacturer trademarks remain the property of their owners.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the extent permitted by law, our liability arising from your use of this website or products purchased is limited to the amount paid for the relevant order. Nothing in these terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    heading: "Account responsibilities",
    paragraphs: [
      "You are responsible for keeping your account credentials confidential and for activity carried out through your account. Notify us promptly if you believe your account has been accessed without authorisation.",
    ],
  },
];

function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      description="Terms governing website use, orders, payments, pricing, shipping, returns, intellectual property and account responsibilities."
      sections={sections}
    />
  );
}
