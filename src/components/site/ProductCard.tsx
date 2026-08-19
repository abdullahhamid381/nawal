import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Eye, Heart, Scale, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { categoryName, type Product } from "@/data/products";
import { money, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Rating } from "./Rating";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, wishlist, toggleCompare, compare } = useStore();
  const [quickView, setQuickView] = useState(false);
  const wished = wishlist.includes(product.slug);
  const compared = compare.includes(product.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Link to="/product/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1024}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {product.badge ? (
            <Badge variant={product.badge === "Limited Stock" ? "destructive" : "secondary"} className="pointer-events-auto">
              {product.badge}
            </Badge>
          ) : (
            <span />
          )}
          <div className="pointer-events-auto flex flex-col gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wished}
              className="size-8 rounded-full shadow-sm"
              onClick={() => {
                toggleWishlist(product.slug);
                toast.success(wished ? "Removed from wishlist" : "Saved to wishlist");
              }}
            >
              <Heart className={cn("size-4", wished && "fill-destructive text-destructive")} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              aria-label="Quick view"
              className="size-8 rounded-full shadow-sm"
              onClick={() => setQuickView(true)}
            >
              <Eye className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              aria-label={compared ? "Remove from comparison" : "Add to comparison"}
              aria-pressed={compared}
              className="size-8 rounded-full shadow-sm"
              onClick={() => {
                toggleCompare(product.slug);
                toast.success(compared ? "Removed from comparison" : "Added to comparison");
              }}
            >
              {compared ? <Check className="size-4" /> : <Scale className="size-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {categoryName(product.category)}
        </p>
        <h3 className="text-sm font-semibold leading-snug">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="after:absolute after:inset-0 after:content-[''] hover:underline">
            {product.name}
          </Link>
        </h3>
        <Rating value={product.rating} count={product.reviewCount} />
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <span className="text-base font-bold">{money(product.price)}</span>
            {product.compareAt && (
              <span className="ml-2 text-xs text-muted-foreground line-through">{money(product.compareAt)}</span>
            )}
            <p className={cn("text-[11px]", product.stock > 0 ? "text-success" : "text-destructive")}>
              {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
            </p>
          </div>
          <Button
            size="sm"
            className="relative z-10"
            disabled={product.stock === 0}
            onClick={() => {
              addToCart(product.slug);
              toast.success("Added to cart", { description: product.name });
            }}
          >
            <ShoppingCart className="size-4" />
            <span className="sr-only sm:not-sr-only">Add</span>
          </Button>
        </div>
      </div>

      <Dialog open={quickView} onOpenChange={setQuickView}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>SKU {product.sku}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 sm:grid-cols-2">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-square w-full rounded-lg border border-border object-cover"
            />
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold">{money(product.price)}</p>
              <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
              <ul className="space-y-1.5 text-sm">
                {product.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2 pt-2">
                <Button
                  onClick={() => {
                    addToCart(product.slug);
                    setQuickView(false);
                    toast.success("Added to cart", { description: product.name });
                  }}
                >
                  Add to cart
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/product/$slug" params={{ slug: product.slug }}>
                    View full details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.article>
  );
}