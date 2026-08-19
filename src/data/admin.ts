/**
 * DEMO ADMIN DATA
 * Placeholder records used to demonstrate the admin dashboard layout.
 * Replace with real business data (or connect a database) before use.
 */
export type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  items: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";
  tracking?: string | undefined;
};

export const orders: Order[] = [
  { id: "NB-10241", customer: "Demo Customer A", email: "customer.a@example.com", date: "2026-08-09", total: 128.98, items: 3, status: "Processing" },
  { id: "NB-10240", customer: "Demo Customer B", email: "customer.b@example.com", date: "2026-08-08", total: 45.0, items: 1, status: "Shipped", tracking: "DEMO123456789" },
  { id: "NB-10239", customer: "Demo Customer C", email: "customer.c@example.com", date: "2026-08-07", total: 214.5, items: 4, status: "Delivered", tracking: "DEMO987654321" },
  { id: "NB-10238", customer: "Demo Customer D", email: "customer.d@example.com", date: "2026-08-06", total: 68.0, items: 1, status: "Delivered", tracking: "DEMO456789123" },
  { id: "NB-10237", customer: "Demo Customer E", email: "customer.e@example.com", date: "2026-08-05", total: 89.99, items: 1, status: "Refunded" },
  { id: "NB-10236", customer: "Demo Customer F", email: "customer.f@example.com", date: "2026-08-04", total: 152.49, items: 5, status: "Delivered", tracking: "DEMO321654987" },
  { id: "NB-10235", customer: "Demo Customer G", email: "customer.g@example.com", date: "2026-08-03", total: 31.0, items: 1, status: "Cancelled" },
];

export const customers = [
  { id: "C-1001", name: "Demo Customer A", email: "customer.a@example.com", orders: 4, spent: 412.87, joined: "2026-02-11" },
  { id: "C-1002", name: "Demo Customer B", email: "customer.b@example.com", orders: 2, spent: 118.0, joined: "2026-03-02" },
  { id: "C-1003", name: "Demo Customer C", email: "customer.c@example.com", orders: 7, spent: 903.4, joined: "2025-11-19" },
  { id: "C-1004", name: "Demo Customer D", email: "customer.d@example.com", orders: 1, spent: 68.0, joined: "2026-06-28" },
  { id: "C-1005", name: "Demo Customer E", email: "customer.e@example.com", orders: 3, spent: 245.98, joined: "2026-01-07" },
];

export const coupons = [
  { code: "WELCOME10", type: "Percentage", value: "10%", usage: "38 / 500", status: "Active", expires: "2026-12-31" },
  { code: "FREESHIP", type: "Shipping", value: "Free standard", usage: "112 / ∞", status: "Active", expires: "2026-10-31" },
  { code: "BUNDLE25", type: "Fixed", value: "$25.00", usage: "9 / 100", status: "Scheduled", expires: "2027-01-15" },
  { code: "SPRING15", type: "Percentage", value: "15%", usage: "204 / 200", status: "Expired", expires: "2026-05-31" },
];

export const subscribers = [
  { email: "subscriber.a@example.com", date: "2026-08-09", source: "Footer form" },
  { email: "subscriber.b@example.com", date: "2026-08-08", source: "Homepage" },
  { email: "subscriber.c@example.com", date: "2026-08-06", source: "Checkout" },
  { email: "subscriber.d@example.com", date: "2026-08-01", source: "Footer form" },
];

export const messages = [
  { id: "M-501", name: "Demo Sender A", email: "sender.a@example.com", subject: "Question about shipping times", date: "2026-08-10", status: "Unread" },
  { id: "M-500", name: "Demo Sender B", email: "sender.b@example.com", subject: "Return request follow-up", date: "2026-08-09", status: "Replied" },
  { id: "M-499", name: "Demo Sender C", email: "sender.c@example.com", subject: "Bulk order enquiry", date: "2026-08-07", status: "Replied" },
];

export const salesTrend = [
  { month: "Feb", revenue: 4200, orders: 61 },
  { month: "Mar", revenue: 5100, orders: 74 },
  { month: "Apr", revenue: 4780, orders: 69 },
  { month: "May", revenue: 6250, orders: 91 },
  { month: "Jun", revenue: 7010, orders: 104 },
  { month: "Jul", revenue: 6840, orders: 99 },
];