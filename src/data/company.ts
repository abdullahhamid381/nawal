/**
 * COMPANY PROFILE — single source of truth for all company information.
 * Every value below is an editable placeholder. Replace with the real
 * business details before publishing.
 */
export const company = {
  name: "Northbay Retail Co.",
  legalName: "Northbay Retail Co. LLC",
  tagline: "Quality Products. Reliable Service. Trusted Shopping.",
  shortDescription:
    "We are a customer-focused eCommerce company committed to providing quality products, reliable fulfillment, secure shopping, and exceptional customer service.",
  email: "support@example.com", // EDIT: real support email
  salesEmail: "sales@example.com", // EDIT
  phone: "+1 (000) 000-0000", // EDIT: real business phone
  address: {
    line1: "000 Example Street, Suite 000", // EDIT
    city: "City",
    state: "State",
    zip: "00000",
    country: "United States",
  },
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM (EST)" },
    { days: "Saturday", time: "10:00 AM – 4:00 PM (EST)" },
    { days: "Sunday", time: "Closed" },
  ],
  supportResponseTime: "1 business day",
  social: [
    { label: "Facebook", href: "https://example.com" },
    { label: "Instagram", href: "https://example.com" },
    { label: "LinkedIn", href: "https://example.com" },
    { label: "YouTube", href: "https://example.com" },
  ],
  policyUpdated: "Last updated: [EDIT DATE]",
  freeShippingThreshold: 49,
  returnWindowDays: 30,
} as const;

export const fullAddress = `${company.address.line1}, ${company.address.city}, ${company.address.state} ${company.address.zip}, ${company.address.country}`;