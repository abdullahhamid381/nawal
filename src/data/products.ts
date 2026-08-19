import headphones from "@/assets/product-headphones.jpg";
import bottle from "@/assets/product-bottle.jpg";
import kettle from "@/assets/product-kettle.jpg";
import fitness from "@/assets/product-fitness.jpg";
import home from "@/assets/product-home.jpg";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  brand: string;
  category: string;
  price: number;
  compareAt?: number | undefined;
  image: string;
  gallery: string[];
  badge?: "New" | "Best Seller" | "Value Pick" | "Limited Stock" | undefined;
  stock: number;
  shortDescription: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  /** Ratings are intentionally empty — populate only with verified customer reviews. */
  rating: number | null;
  reviewCount: number;
};

export const categories: Category[] = [
  {
    slug: "audio-electronics",
    name: "Audio & Electronics",
    description: "Everyday audio and personal electronics selected for build quality and reliability.",
    image: headphones,
  },
  {
    slug: "kitchen-appliances",
    name: "Kitchen & Appliances",
    description: "Practical small appliances and kitchen essentials for daily use.",
    image: kettle,
  },
  {
    slug: "home-living",
    name: "Home & Living",
    description: "Textiles, storage and comfort products for the modern home.",
    image: home,
  },
  {
    slug: "fitness-outdoor",
    name: "Fitness & Outdoor",
    description: "Training and outdoor gear built for regular, everyday use.",
    image: fitness,
  },
  {
    slug: "drinkware-travel",
    name: "Drinkware & Travel",
    description: "Insulated bottles, tumblers and travel accessories.",
    image: bottle,
  },
];

const imageFor: Record<string, string> = {
  "audio-electronics": headphones,
  "kitchen-appliances": kettle,
  "home-living": home,
  "fitness-outdoor": fitness,
  "drinkware-travel": bottle,
};

type Seed = {
  name: string;
  category: string;
  price: number;
  compareAt?: number | undefined;
  badge?: Product["badge"] | undefined;
  stock: number;
  short: string;
  features: string[];
  specs: { label: string; value: string }[];
};

const seeds: Seed[] = [
  {
    name: "Wireless Over-Ear Headphones",
    category: "audio-electronics",
    price: 89.99,
    compareAt: 109.99,
    badge: "Best Seller",
    stock: 42,
    short: "Comfortable over-ear headphones with long battery life and a low-latency wireless connection.",
    features: [
      "Up to 30 hours of playback per charge",
      "Memory-foam ear cushions for extended wear",
      "Built-in microphone for calls",
      "Foldable design with travel case",
    ],
    specs: [
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Battery life", value: "Up to 30 hours" },
      { label: "Charging", value: "USB-C" },
      { label: "Weight", value: "248 g" },
    ],
  },
  {
    name: "Compact Wireless Earbuds",
    category: "audio-electronics",
    price: 44.99,
    badge: "New",
    stock: 78,
    short: "Lightweight earbuds with a pocket-sized charging case and secure everyday fit.",
    features: ["Charging case with USB-C", "Three silicone tip sizes included", "Touch playback controls", "Water-resistant build"],
    specs: [
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Battery life", value: "6 h + 18 h case" },
      { label: "Water resistance", value: "IPX4" },
      { label: "Weight", value: "42 g with case" },
    ],
  },
  {
    name: "Desk Bluetooth Speaker",
    category: "audio-electronics",
    price: 59.0,
    stock: 24,
    short: "A compact desktop speaker tuned for clear voice and balanced music playback.",
    features: ["Full-range driver with passive radiator", "Aux input for wired sources", "Rechargeable battery", "Anti-slip base"],
    specs: [
      { label: "Output", value: "10 W" },
      { label: "Battery life", value: "Up to 12 hours" },
      { label: "Inputs", value: "Bluetooth, 3.5 mm" },
      { label: "Dimensions", value: "160 × 70 × 70 mm" },
    ],
  },
  {
    name: "65W USB-C Charging Hub",
    category: "audio-electronics",
    price: 34.5,
    badge: "Value Pick",
    stock: 120,
    short: "Four-port charging hub for phones, tablets and laptops on a single outlet.",
    features: ["65 W total output", "Two USB-C and two USB-A ports", "Over-current protection", "Compact travel footprint"],
    specs: [
      { label: "Total output", value: "65 W" },
      { label: "Ports", value: "2 × USB-C, 2 × USB-A" },
      { label: "Input", value: "100–240 V" },
      { label: "Cable", value: "1.5 m detachable" },
    ],
  },
  {
    name: "1.7L Electric Kettle",
    category: "kitchen-appliances",
    price: 39.99,
    compareAt: 49.99,
    badge: "Best Seller",
    stock: 61,
    short: "Fast-boil kettle with automatic shut-off and a cool-touch handle.",
    features: ["Boil-dry protection", "Removable limescale filter", "Concealed heating element", "Water level window"],
    specs: [
      { label: "Capacity", value: "1.7 L" },
      { label: "Power", value: "1500 W" },
      { label: "Material", value: "BPA-free polypropylene" },
      { label: "Cord length", value: "75 cm" },
    ],
  },
  {
    name: "Stainless Steel Cookware Set",
    category: "kitchen-appliances",
    price: 129.0,
    stock: 18,
    badge: "Limited Stock",
    short: "Five-piece stainless steel set with encapsulated bases for even heat distribution.",
    features: ["Induction compatible", "Tempered glass lids", "Riveted stay-cool handles", "Dishwasher safe"],
    specs: [
      { label: "Pieces", value: "5" },
      { label: "Material", value: "18/10 stainless steel" },
      { label: "Compatibility", value: "Gas, electric, induction" },
      { label: "Oven safe", value: "Up to 450°F" },
    ],
  },
  {
    name: "Digital Kitchen Scale",
    category: "kitchen-appliances",
    price: 21.99,
    stock: 94,
    short: "Precision kitchen scale with tare function and an easy-read backlit display.",
    features: ["Measures to 1 g accuracy", "Tare and unit conversion", "Tempered glass platform", "Auto power-off"],
    specs: [
      { label: "Capacity", value: "5 kg / 11 lb" },
      { label: "Accuracy", value: "1 g" },
      { label: "Units", value: "g, kg, oz, lb" },
      { label: "Power", value: "2 × AAA (included)" },
    ],
  },
  {
    name: "Pour-Over Coffee Maker",
    category: "kitchen-appliances",
    price: 27.5,
    stock: 47,
    short: "Borosilicate glass carafe with a reusable stainless steel filter.",
    features: ["No paper filters required", "Heat-resistant glass", "Non-slip silicone collar", "Dishwasher safe"],
    specs: [
      { label: "Capacity", value: "600 ml" },
      { label: "Material", value: "Borosilicate glass" },
      { label: "Filter", value: "Stainless steel mesh" },
      { label: "Care", value: "Dishwasher safe" },
    ],
  },
  {
    name: "Cotton Throw Blanket",
    category: "home-living",
    price: 49.0,
    badge: "New",
    stock: 55,
    short: "Soft woven cotton throw that layers well on sofas and beds year round.",
    features: ["100% cotton face", "Breathable mid-weight knit", "Finished edges", "Machine washable"],
    specs: [
      { label: "Dimensions", value: '50" × 60"' },
      { label: "Material", value: "100% cotton" },
      { label: "Care", value: "Machine wash cold" },
      { label: "Weight", value: "1.2 kg" },
    ],
  },
  {
    name: "Linen Cushion Cover Set",
    category: "home-living",
    price: 32.0,
    stock: 83,
    short: "Two-piece cushion cover set in a washed linen blend with hidden zippers.",
    features: ["Set of two covers", "Hidden zipper closure", "Pre-washed for softness", "Inserts sold separately"],
    specs: [
      { label: "Size", value: '18" × 18"' },
      { label: "Material", value: "Linen-cotton blend" },
      { label: "Closure", value: "Hidden zipper" },
      { label: "Care", value: "Machine wash cold" },
    ],
  },
  {
    name: "Woven Storage Basket",
    category: "home-living",
    price: 38.0,
    stock: 36,
    short: "Sturdy woven basket for blankets, laundry or living-room storage.",
    features: ["Reinforced handles", "Collapsible for storage", "Natural fibre weave", "Holds shape when full"],
    specs: [
      { label: "Dimensions", value: '15" × 15" × 14"' },
      { label: "Material", value: "Cotton rope" },
      { label: "Capacity", value: "45 L" },
      { label: "Care", value: "Spot clean" },
    ],
  },
  {
    name: "LED Desk Lamp",
    category: "home-living",
    price: 42.99,
    compareAt: 54.0,
    stock: 29,
    short: "Adjustable desk lamp with multiple brightness levels and a USB charging port.",
    features: ["Five brightness levels", "Three colour temperatures", "USB-A charge-out port", "Weighted base"],
    specs: [
      { label: "Power", value: "10 W LED" },
      { label: "Colour temp", value: "3000K–6000K" },
      { label: "Reach", value: "18 in" },
      { label: "Input", value: "USB-C" },
    ],
  },
  {
    name: "Non-Slip Yoga Mat",
    category: "fitness-outdoor",
    price: 45.0,
    badge: "Best Seller",
    stock: 67,
    short: "6 mm cushioned mat with a textured, non-slip surface for home training.",
    features: ["6 mm high-density cushioning", "Textured non-slip surface", "Carry strap included", "Free of phthalates"],
    specs: [
      { label: "Dimensions", value: '72" × 24"' },
      { label: "Thickness", value: "6 mm" },
      { label: "Material", value: "TPE foam" },
      { label: "Weight", value: "1.1 kg" },
    ],
  },
  {
    name: "Hex Dumbbell Pair",
    category: "fitness-outdoor",
    price: 74.0,
    stock: 15,
    badge: "Limited Stock",
    short: "Rubber-coated hex dumbbells with a knurled chrome handle for secure grip.",
    features: ["Rubber coating protects floors", "Hex heads resist rolling", "Knurled chrome handle", "Sold as a pair"],
    specs: [
      { label: "Weight", value: "20 lb each" },
      { label: "Coating", value: "Rubber" },
      { label: "Handle", value: "Knurled chrome" },
      { label: "Set", value: "2 dumbbells" },
    ],
  },
  {
    name: "Resistance Band Set",
    category: "fitness-outdoor",
    price: 24.99,
    badge: "Value Pick",
    stock: 140,
    short: "Five graduated latex bands with a mesh carry bag for mobility and strength work.",
    features: ["Five resistance levels", "Natural latex construction", "Mesh carry bag", "Exercise guide included"],
    specs: [
      { label: "Bands", value: "5" },
      { label: "Resistance", value: "10–50 lb" },
      { label: "Material", value: "Natural latex" },
      { label: "Length", value: "600 mm" },
    ],
  },
  {
    name: "Foam Recovery Roller",
    category: "fitness-outdoor",
    price: 29.0,
    stock: 52,
    short: "Medium-density roller with a textured surface for post-workout recovery.",
    features: ["Textured relief zones", "Holds shape under load", "Lightweight EVA core", "Easy to clean"],
    specs: [
      { label: "Length", value: "13 in" },
      { label: "Diameter", value: "5.5 in" },
      { label: "Material", value: "EVA foam" },
      { label: "Max load", value: "300 lb" },
    ],
  },
  {
    name: "Insulated Water Bottle 24oz",
    category: "drinkware-travel",
    price: 28.0,
    badge: "Best Seller",
    stock: 210,
    short: "Double-wall vacuum insulated bottle that keeps drinks cold or hot for hours.",
    features: ["Cold up to 24 h, hot up to 12 h", "Leak-resistant lid", "Powder-coated grip finish", "Fits standard cup holders"],
    specs: [
      { label: "Capacity", value: "24 oz / 710 ml" },
      { label: "Material", value: "18/8 stainless steel" },
      { label: "Insulation", value: "Double-wall vacuum" },
      { label: "Care", value: "Hand wash recommended" },
    ],
  },
  {
    name: "Travel Tumbler 16oz",
    category: "drinkware-travel",
    price: 22.0,
    stock: 98,
    short: "Commuter tumbler with a sliding-lid design and insulated stainless body.",
    features: ["Slide-close lid", "Insulated stainless body", "Cup-holder friendly", "Condensation-free exterior"],
    specs: [
      { label: "Capacity", value: "16 oz / 473 ml" },
      { label: "Material", value: "Stainless steel" },
      { label: "Lid", value: "Slide-close" },
      { label: "Care", value: "Top-rack dishwasher safe" },
    ],
  },
  {
    name: "Packing Cube Set",
    category: "drinkware-travel",
    price: 31.0,
    badge: "New",
    stock: 44,
    short: "Four-piece packing cube set with mesh panels for organised travel.",
    features: ["Four sizes included", "Mesh ventilation panels", "Reinforced zippers", "Lightweight ripstop fabric"],
    specs: [
      { label: "Pieces", value: "4" },
      { label: "Material", value: "Ripstop polyester" },
      { label: "Zippers", value: "Two-way" },
      { label: "Weight", value: "310 g set" },
    ],
  },
  {
    name: "Everyday Backpack 20L",
    category: "drinkware-travel",
    price: 68.0,
    compareAt: 82.0,
    stock: 22,
    short: "Water-resistant commuter backpack with a padded 15-inch laptop sleeve.",
    features: ["Padded 15-inch laptop sleeve", "Water-resistant shell", "Luggage pass-through strap", "Quick-access top pocket"],
    specs: [
      { label: "Capacity", value: "20 L" },
      { label: "Laptop fit", value: "Up to 15 in" },
      { label: "Material", value: "600D polyester" },
      { label: "Weight", value: "780 g" },
    ],
  },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const products: Product[] = seeds.map((s, i) => {
  const image = imageFor[s.category] ?? headphones;
  return {
    id: `p-${String(i + 1).padStart(3, "0")}`,
    slug: slugify(s.name),
    name: s.name,
    sku: `NB-${s.category.slice(0, 3).toUpperCase()}-${String(1000 + i * 7)}`,
    brand: "Northbay Essentials",
    category: s.category,
    price: s.price,
    compareAt: s.compareAt,
    image,
    gallery: [image, image, image],
    badge: s.badge,
    stock: s.stock,
    shortDescription: s.short,
    description: `${s.short} Every unit is sourced from authorised suppliers, inspected before it enters our inventory, and shipped in protective packaging from our fulfillment facility. Product images and specifications are provided by the manufacturer and are reviewed by our team before listing.`,
    features: s.features,
    specs: s.specs,
    rating: null,
    reviewCount: 0,
  };
});

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const categoryName = (slug: string) => getCategory(slug)?.name ?? slug;
export const featuredProducts = products.filter((p) => p.badge === "Best Seller" || p.badge === "New").slice(0, 8);
export const relatedProducts = (p: Product) =>
  products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

/**
 * Customer reviews — intentionally empty.
 * Add only genuine, verified customer reviews here (or wire to a backend later).
 */
export type Review = {
  id: string;
  productSlug?: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
};

export const reviews: Review[] = [];
export const reviewsFor = (slug: string) => reviews.filter((r) => r.productSlug === slug);