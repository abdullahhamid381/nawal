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
  gallery?: string[] | undefined;
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
    name: "Hybrid Active Noise Cancelling Bluetooth Headphones",
    category: "audio-electronics",
    price: 79.99,
    compareAt: 99.99,
    badge: "New",
    stock: 50,
    short: "Over-ear wireless headphones with next-generation hybrid ANC, 120-hour battery life and Bluetooth 6.0.",
    features: [
      "All-day comfort: adjustable headband and ultra-soft memory foam ear cups",
      "Up to 120 hours of playtime; 5-minute quick charge gives 4 extra hours",
      "Bluetooth 6.0 with stable, low-latency, auto-connect pairing",
      "Advanced hybrid ANC eliminates up to 95% of ambient noise (20Hz–20kHz)",
      "Precision-tuned drivers for deep bass; AI-enhanced mic for clear calls",
    ],
    specs: [
      { label: "Connectivity", value: "Bluetooth 6.0" },
      { label: "Noise cancelling", value: "Dual-mic hybrid ANC, up to 95%" },
      { label: "Battery life", value: "Up to 120 hours" },
      { label: "Quick charge", value: "5 min = 4 hours playback" },
      { label: "ANC frequency range", value: "20Hz–20kHz" },
    ],
    gallery: [
      "/images/hybrid-anc-headphones-1.jpg",
      "/images/hybrid-anc-headphones-2.jpg",
      "/images/hybrid-anc-headphones-3.jpg",
      "/images/hybrid-anc-headphones-4.jpg",
      "/images/hybrid-anc-headphones-5.avif",
    ],
  },
  {
    name: "Kyusrd Wireless Bluetooth Sports Earphones",
    category: "audio-electronics",
    price: 15.99,
    badge: "Value Pick",
    stock: 90,
    short: "No in-ear digital display sports earphones with Bluetooth 5.3 and long battery life.",
    features: [
      "Bluetooth 5.3 with digital intelligent control",
      "Foldable sports stereo design, no in-ear wearing sensation",
      "HiFi sound quality, comfortable for all-day wear",
      "Automatic connection and fast pairing within 10 m range",
      "Long battery life with directional sound transmission",
    ],
    specs: [
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Connection range", value: "10 meters" },
      { label: "Headphone power", value: "25 mAh" },
      { label: "Charging compartment power", value: "180 mAh" },
      { label: "Charging time", value: "1.5 hours" },
      { label: "Usage time", value: "4–8 hours" },
    ],
    gallery: [
      "/images/kyusrd-earphones-1.avif",
      "/images/kyusrd-earphones-2.avif",
      "/images/kyusrd-earphones-3.avif",
    ],
  },
  {
    name: "Nothing Ear (a) Wireless Earbuds",
    category: "audio-electronics",
    price: 99.0,
    badge: "Best Seller",
    stock: 35,
    short: "Hi-Res Audio earbuds with 45dB hybrid ANC, an 11mm driver, dual connect and 42.5H playtime.",
    features: [
      "Powerful 11 mm driver for deep bass and richer clarity",
      "45 dB Smart Active Noise Cancellation that adapts to ear seal in real time",
      "Clear Voice Technology with dedicated talk mic — 60% less wind noise vs Ear (2)",
      "Fast charge: 10 min charge gives 10 hours of playback (ANC off)",
      "Up to 42.5 hours total playtime with the case (ANC off)",
      "Low Latency Mode, dual-device connect, and ChatGPT integration via Nothing X app",
    ],
    specs: [
      { label: "Connectivity", value: "Bluetooth, dual-device connect" },
      { label: "Noise cancelling", value: "Up to 45 dB Smart ANC" },
      { label: "Driver", value: "11 mm" },
      { label: "Battery life", value: "Up to 42.5 hours (case incl.)" },
      { label: "Fast charge", value: "10 min = 10 hours playback" },
      { label: "Water resistance", value: "IP54 (buds)" },
    ],
    gallery: ["/images/nothing-ear-a-1.avif", "/images/nothing-ear-a-2.avif"],
  },
  {
    name: "Vinci Professional Audio Mixer Kit",
    category: "audio-electronics",
    price: 45.0,
    stock: 28,
    short: "Vinci S2 multi-function sound card and mixer console for podcasting, DJing and live vocals.",
    features: [
      "Adjustable high/middle/bass with 12th-order electronic tone adjustment",
      "One-click silencing for crystal-clear live broadcasts across 3 platforms",
      "Automatic background music volume reduction",
      "Bluetooth-compatible wireless accompaniment music with colorful LED lights",
      "Built-in 800mAh battery for 5–6 hours of usage",
      "Type-C OTG interface for direct connection and better stereo sound quality",
    ],
    specs: [
      { label: "Inputs", value: "3.5 mm microphone + sound card" },
      { label: "Tone adjustment", value: "12th-order electronic" },
      { label: "Battery", value: "800 mAh, 5–6 hours usage" },
      { label: "Connectivity", value: "Bluetooth + Type-C OTG" },
      { label: "Use case", value: "Podcast, DJ, live vocal, gaming" },
    ],
  },
  {
    name: "onn Stereo Speaker with Volume Controls",
    category: "audio-electronics",
    price: 19.88,
    stock: 65,
    short: "USB-powered 3.5mm stereo speakers with copper-tinted drivers and in-line volume control.",
    features: [
      "2.5-inch copper-tinted drivers",
      "3.6-foot attached speaker wire",
      "Integrated in-line volume control",
      "3.5mm AUX input with USB power (split cord)",
    ],
    specs: [
      { label: "Driver size", value: "2.5 inch, copper-tinted" },
      { label: "Inputs", value: "3.5 mm AUX" },
      { label: "Power", value: "USB (5V)" },
      { label: "Speaker wire", value: "3.6 ft attached" },
      { label: "AUX/USB cord", value: "5 ft split cord" },
    ],
    gallery: [
      "/second-product/onn-stereo-speaker-1.avif",
      "/second-product/onn-stereo-speaker-2.avif",
      "/second-product/onn-stereo-speaker-3.avif",
    ],
  },

  
 
  {
    name: "Elite Gourmet Easy Egg Cooker, 7-Egg, Retro Mint",
    category: "kitchen-appliances",
    price: 19.99,
    badge: "New",
    stock: 72,
    short: "Automatic 7-egg cooker with a pre-marked measuring cup for soft, medium or hard-boiled eggs.",
    features: [
      "Cooks up to 7 eggs at once",
      "Pre-marked measuring cup for consistent soft, medium or hard-boiled results",
      "Automatic shut-off with indicator light when done",
      "Built-in timer adjusts automatically to your chosen doneness",
      "Piercing pin prevents cracking and releases sulfur for golden yolks",
      "Dishwasher-safe egg tray, lid and measuring cup",
    ],
    specs: [
      { label: "Capacity", value: "7 eggs" },
      { label: "Shut-off", value: "Automatic with indicator light" },
      { label: "Included", value: "Egg tray, lid, measuring cup, manual" },
      { label: "Care", value: "Dishwasher-safe parts" },
      { label: "Color", value: "Retro Mint" },
    ],
    gallery: [
      "/third-product/elite-egg-cooker-1.jpg",
      "/third-product/elite-egg-cooker-2.jpg",
      "/third-product/elite-egg-cooker-3.jpg",
    ],
  },
  {
    name: "Hamilton Beach 6-Speed Electric Hand Mixer",
    category: "kitchen-appliances",
    price: 24.99,
    stock: 58,
    short: "250W hand mixer with QuickBurst power, a stabilizing bowl rest, and a snap-on storage case.",
    features: [
      "250W peak-power motor for every mixing job",
      "6 speeds plus QuickBurst for an extra burst of power when needed",
      "Bowl Rest feature stabilizes the mixer on the bowl edge for less tipping and drips",
      "Snap-on storage case neatly holds the beaters and whisk together",
      "Eject button releases attachments without getting hands messy",
      "Includes 2 dishwasher-safe traditional beaters and a whisk",
    ],
    specs: [
      { label: "Power", value: "250 W peak" },
      { label: "Speeds", value: "6 + QuickBurst" },
      { label: "Attachments", value: "2 beaters + whisk, dishwasher safe" },
      { label: "Storage", value: "Snap-on case" },
      { label: "Stability", value: "Bowl Rest edge stabilizer" },
    ],
    gallery: [
      "/third-product/hamilton-hand-mixer-1.jpg",
      "/third-product/hamilton-hand-mixer-2.jpg",
      "/third-product/hamilton-hand-mixer-3.jpg",
      "/third-product/hamilton-hand-mixer-4.jpg",
      "/third-product/hamilton-hand-mixer-5.jpg",
    ],
  },
  {
    name: "Beneno Heavy Duty Manual Can Opener with Magnet, Green",
    category: "kitchen-appliances",
    price: 12.99,
    badge: "Value Pick",
    stock: 130,
    short: "Manual can opener with a smooth-cutting precision gear, magnetic lid remover and built-in bottle opener.",
    features: [
      "High carbon steel blade with precision gears for smooth cuts",
      "Soft non-slip rubber handle and turn knob, 360° rotation",
      "Strong magnetic lid remover keeps hands away from sharp edges",
      "Built-in bottle opener for beer, soda and other capped bottles",
      "Comfortable for users with limited hand strength or arthritis",
    ],
    specs: [
      { label: "Length", value: "8.2 inches" },
      { label: "Blade", value: "High carbon steel, precision gear" },
      { label: "Handle", value: "Soft rubber, non-slip" },
      { label: "Extra features", value: "Magnetic lid lift, bottle opener" },
      { label: "Color", value: "Green" },
    ],
    gallery: [
      "/third-product/beneno-can-opener-1.jpg",
      "/third-product/beneno-can-opener-2.jpg",
      "/third-product/beneno-can-opener-3.jpg",
    ],
  },
  {
    name: "Cuisinart Electric Can Opener, One-Touch Operation, Black",
    category: "kitchen-appliances",
    price: 34.99,
    stock: 45,
    short: "One-touch hands-free electric can opener with a Power Cut blade, magnetic lid holder and nonslip base.",
    features: [
      "One-touch, hands-free operation — no manual twisting",
      "Power Cut blade with magnetic lid holder easily opens cans of any size",
      "Wide nonslip base for stability during use",
      "Detachable activation lever for safe, easy cleaning",
      "Ideal for seniors and easy, low-strain handling",
      "3-year limited warranty",
    ],
    specs: [
      { label: "Operation", value: "One-touch, hands-free" },
      { label: "Dimensions", value: '9.4" H x 4.6" W x 4.5" D' },
      { label: "Base", value: "Nonslip" },
      { label: "Cleaning", value: "Detachable activation lever" },
      { label: "Lid holder", value: "Magnetic" },
      { label: "Warranty", value: "3-year limited" },
      { label: "Color", value: "Black" },
    ],
    gallery: [
      "/third-product/cuisinart-can-opener-1.jpg",
      "/third-product/cuisinart-can-opener-2.jpg",
      "/third-product/cuisinart-can-opener-3.jpg",
      "/third-product/cuisinart-can-opener-5.jpg",
      "/third-product/cuisinart-can-opener-4.jpg",
    ],
  },
  {
    name: "Crock-Pot Manual 7-Quart Slow Cooker, Mussel Grey",
    category: "kitchen-appliances",
    price: 44.99,
    badge: "Best Seller",
    stock: 38,
    short: "7-quart manual slow cooker with 3 heat settings and oven-safe, dishwasher-safe stoneware.",
    features: [
      "3 manual heat settings: High, Low, and Warm",
      "7-quart capacity feeds 9+ people",
      "Manual Warm setting keeps food at serving temperature",
      "Removable stoneware is oven-safe up to 400°F",
      "Stoneware and lid are both dishwasher-safe",
      "Fine sand texture finish in Mussel Grey",
    ],
    specs: [
      { label: "Capacity", value: "7 quarts" },
      { label: "Heat settings", value: "High, Low, Warm" },
      { label: "Stoneware", value: "Oven-safe up to 400°F" },
      { label: "Care", value: "Dishwasher-safe stoneware and lid" },
      { label: "Color", value: "Mussel Grey" },
    ],
    gallery: [
      "/second-product/crockpot-slow-cooker-1.avif",
      "/second-product/crockpot-slow-cooker-2.avif",
      "/second-product/crockpot-slow-cooker-3.webp",
    ],
  },
  {
    name: "Mainstays Black Handle Stainless Steel Kitchen Shears",
    category: "kitchen-appliances",
    price: 8.99,
    badge: "Value Pick",
    stock: 110,
    short: "8.6-inch multi-purpose kitchen shears with a built-in bottle opener and nutcracker.",
    features: [
      "Durable, rust-resistant stainless steel blades",
      "Built-in bottle opener in one blade",
      "Nutcracker built into the handles",
      "Ergonomic ambidextrous grip for right- or left-handed use",
      "Cuts meats, vegetables, twine, flowers, paper and more",
      "Easy to clean and store",
    ],
    specs: [
      { label: "Length", value: "8.6 inches" },
      { label: "Blade material", value: "Stainless steel" },
      { label: "Handle", value: "Black plastic, ambidextrous" },
      { label: "Extra features", value: "Bottle opener, nutcracker" },
      { label: "Quantity", value: "1 Each" },
    ],
    gallery: [
      "/second-product/mainstays-shears-1.avif",
      "/second-product/mainstays-shears-2.avif",
      "/second-product/mainstays-shears-3.avif",
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
  const fallbackImage = imageFor[s.category] ?? headphones;
  const gallery = s.gallery && s.gallery.length > 0 ? s.gallery : [fallbackImage, fallbackImage, fallbackImage];
  const image = gallery[0] ?? fallbackImage;
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
    gallery,
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