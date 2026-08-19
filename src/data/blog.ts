import headphones from "@/assets/product-headphones.jpg";
import bottle from "@/assets/product-bottle.jpg";
import kettle from "@/assets/product-kettle.jpg";
import fitness from "@/assets/product-fitness.jpg";
import home from "@/assets/product-home.jpg";
import warehouse from "@/assets/warehouse.jpg";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const blogCategories = [
  "Buying Guides",
  "Product Education",
  "Shopping Tips",
  "Customer Guides",
  "Company Updates",
];

export const posts: Post[] = [
  {
    slug: "how-to-choose-wireless-headphones",
    title: "How to Choose Wireless Headphones That Actually Last",
    excerpt:
      "Battery life, driver size and build materials matter more than marketing claims. Here is a practical checklist for comparing wireless headphones.",
    category: "Buying Guides",
    date: "2026-06-18",
    readingTime: "6 min read",
    image: headphones,
    body: [
      {
        heading: "Start with how you actually listen",
        paragraphs: [
          "Before comparing specifications, describe your typical listening session. Commuters and frequent travellers usually benefit from over-ear designs with longer battery life, while people who mostly take calls at a desk may prefer lighter on-ear or in-ear models.",
          "Matching the form factor to the use case removes most of the options immediately and makes the remaining comparison much simpler.",
        ],
      },
      {
        heading: "Battery life claims and what they mean",
        paragraphs: [
          "Manufacturers usually quote playback time at moderate volume with active features disabled. If you listen loudly or keep noise cancellation on, expect meaningfully less. A model rated for 30 hours typically delivers comfortable multi-day use for an average commuter.",
          "Check the charging standard as well. USB-C charging and a quick-charge mode are practical advantages you will notice weekly.",
        ],
      },
      {
        heading: "Comfort and materials",
        paragraphs: [
          "Clamping force, cushion material and headband padding determine whether a pair is comfortable after an hour. Memory foam cushions with a breathable cover are a reliable choice for extended wear.",
          "Replaceable ear cushions extend usable product life considerably, so it is worth checking whether spares are available.",
        ],
      },
    ],
  },
  {
    slug: "insulated-bottle-care-guide",
    title: "Caring for Insulated Drinkware: A Simple Maintenance Guide",
    excerpt:
      "Vacuum insulated bottles last for years when cleaned correctly. This guide covers washing, seal care and common mistakes to avoid.",
    category: "Product Education",
    date: "2026-06-02",
    readingTime: "4 min read",
    image: bottle,
    body: [
      {
        heading: "Why hand washing is usually recommended",
        paragraphs: [
          "High dishwasher temperatures can affect powder-coated finishes and, on some models, the vacuum seal. Unless the manufacturer states the bottle is dishwasher safe, warm water and a bottle brush are the safer routine.",
        ],
      },
      {
        heading: "Keeping lids and gaskets clean",
        paragraphs: [
          "Most odour issues come from the lid, not the body. Remove the silicone gasket weekly, wash both parts separately and let them dry fully before reassembling.",
        ],
      },
      {
        heading: "Storage between uses",
        paragraphs: [
          "Store bottles with the lid off so moisture can escape. Sealed storage traps humidity and is the most common cause of residual smells.",
        ],
      },
    ],
  },
  {
    slug: "small-kitchen-appliance-checklist",
    title: "A Practical Checklist Before Buying Small Kitchen Appliances",
    excerpt:
      "Counter space, wattage and cleaning effort decide whether an appliance gets used daily or stored in a cupboard.",
    category: "Buying Guides",
    date: "2026-05-21",
    readingTime: "5 min read",
    image: kettle,
    body: [
      {
        heading: "Measure before you buy",
        paragraphs: [
          "Counter depth and the clearance under wall cabinets are the two measurements most often overlooked. Check the product dimensions in the specifications table before ordering.",
        ],
      },
      {
        heading: "Cleaning effort predicts long-term use",
        paragraphs: [
          "Removable, dishwasher-safe parts are a strong indicator that an appliance will stay in regular rotation. Products that require full disassembly tend to be used less over time.",
        ],
      },
      {
        heading: "Read the electrical specifications",
        paragraphs: [
          "Wattage affects both performance and how many appliances you can safely run on one circuit. Higher wattage kettles boil faster but draw more current.",
        ],
      },
    ],
  },
  {
    slug: "home-gym-essentials-small-spaces",
    title: "Home Gym Essentials for Small Spaces",
    excerpt:
      "You do not need a spare room to train consistently. These compact essentials cover strength, mobility and recovery.",
    category: "Product Education",
    date: "2026-05-09",
    readingTime: "5 min read",
    image: fitness,
    body: [
      {
        heading: "Prioritise versatile equipment",
        paragraphs: [
          "A quality mat, one adjustable resistance set and a single pair of dumbbells cover the majority of home training programmes without dominating a room.",
        ],
      },
      {
        heading: "Storage matters as much as the gear",
        paragraphs: [
          "Equipment that can be stored upright or under a sofa is far more likely to be used. Consider how each item is stored before adding it to your cart.",
        ],
      },
    ],
  },
  {
    slug: "understanding-order-tracking",
    title: "Understanding Order Tracking: What Each Status Means",
    excerpt:
      "Processing, in transit, out for delivery — a plain-language explanation of tracking statuses and what to do if one stalls.",
    category: "Customer Guides",
    date: "2026-04-27",
    readingTime: "4 min read",
    image: warehouse,
    body: [
      {
        heading: "Processing",
        paragraphs: [
          "Your order has been received and is being picked and packed. Tracking numbers are issued once the parcel is handed to the carrier, so a short gap at this stage is normal.",
        ],
      },
      {
        heading: "In transit and out for delivery",
        paragraphs: [
          "In transit means the carrier has scanned the parcel at a facility. Out for delivery means it is on a vehicle scheduled for delivery that day.",
        ],
      },
      {
        heading: "When a status has not updated",
        paragraphs: [
          "Carrier scans can pause for a day or two during high-volume periods. If a status has not changed for several business days, contact our support team with your order number and we will open a trace with the carrier.",
        ],
      },
    ],
  },
  {
    slug: "how-we-select-products",
    title: "How We Select the Products We Sell",
    excerpt:
      "An inside look at our sourcing checklist, supplier requirements and the inspection steps every product passes before listing.",
    category: "Company Updates",
    date: "2026-04-11",
    readingTime: "6 min read",
    image: home,
    body: [
      {
        heading: "Supplier requirements",
        paragraphs: [
          "We work with authorised suppliers and distributors who can document the origin of the products they provide. Where a product category has applicable safety or labelling requirements, we ask suppliers to provide the relevant documentation before we list it.",
        ],
      },
      {
        heading: "Inspection before listing",
        paragraphs: [
          "Incoming inventory is checked for packaging condition, accurate labelling and consistency with the manufacturer specifications we publish on the product page.",
        ],
      },
      {
        heading: "Ongoing review",
        paragraphs: [
          "Products with recurring quality or fulfilment issues are reviewed and, where necessary, delisted. Customer feedback is a direct input into that process.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const relatedPosts = (p: Post) =>
  posts.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);