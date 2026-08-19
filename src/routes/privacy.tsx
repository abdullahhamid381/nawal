import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, type PolicySection } from "@/components/site/Policy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Northbay Retail Co." },
      { name: "description", content: "How Northbay Retail Co. collects, uses, stores and protects customer information, and the rights you have over your data." },
      { property: "og:title", content: "Privacy Policy — Northbay Retail Co." },
      { property: "og:description", content: "How Northbay Retail Co. collects, uses, stores and protects customer information, and the rights you have over your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections: PolicySection[] = [
  {
    heading: "Information we collect",
    bullets: [
      "Contact details you provide, such as name, email address, phone number and shipping address.",
      "Order information, including products purchased and delivery details.",
      "Messages you send us through contact forms or email.",
    ],
  },
  {
    heading: "Account information",
    paragraphs: [
      "If you create an account, we store the details required to operate it — your email address, order history and saved addresses. You can request an update or deletion of your account information at any time.",
    ],
  },
  {
    heading: "Payment information",
    paragraphs: [
      "Payments are processed by our payment provider. We do not receive or store full card numbers. We retain only limited transaction references needed for order management, refunds and accounting.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We use cookies and similar browser storage to keep your cart, remember preferences and measure site performance. You can control cookies through your browser settings; disabling them may affect site functionality.",
    ],
  },
  {
    heading: "Analytics",
    paragraphs: [
      "We use aggregated analytics to understand how the site is used and to improve navigation and product pages. [EDIT: name your analytics provider.]",
    ],
  },
  {
    heading: "Third-party services",
    bullets: [
      "Payment processing — [EDIT: provider name].",
      "Shipping and tracking — [EDIT: carrier names].",
      "Email delivery — [EDIT: provider name].",
      "These providers receive only the information required to perform their service.",
    ],
  },
  {
    heading: "Data security",
    paragraphs: [
      "Data is transmitted over encrypted connections and access to customer records is limited to team members who need it. No system is completely secure, so we also review our practices regularly.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You may request a copy of the personal information we hold about you, ask us to correct it, or request deletion where we are not required to retain it. Contact us to make a request and we will respond within the timeframe required by applicable law.",
    ],
  },
  {
    heading: "Contacting us about privacy",
    paragraphs: [
      "Privacy questions and requests can be sent to our support email or business address listed on the Contact page.",
    ],
  },
];

function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="How Northbay Retail Co. collects, uses, stores and protects customer information, and the rights you have over your data."
      sections={sections}
    />
  );
}
