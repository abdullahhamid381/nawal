import { useEffect, useState } from "react";
import { ImageIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Category, Product } from "@/data/products";
import type { ProductInput } from "@/lib/catalog";

const BADGES = ["New", "Best Seller", "Value Pick", "Limited Stock"] as const;
const NO_BADGE = "none";

type Spec = { label: string; value: string };

type FormState = {
  name: string;
  category: string;
  brand: string;
  sku: string;
  price: string;
  compareAt: string;
  stock: string;
  badge: string;
  images: string[];
  shortDescription: string;
  description: string;
  features: string;
  specs: Spec[];
};

const emptyForm = (defaultCategory: string): FormState => ({
  name: "",
  category: defaultCategory,
  brand: "",
  sku: "",
  price: "",
  compareAt: "",
  stock: "",
  badge: NO_BADGE,
  images: [""],
  shortDescription: "",
  description: "",
  features: "",
  specs: [],
});

const productToForm = (p: Product): FormState => ({
  name: p.name,
  category: p.category,
  brand: p.brand,
  sku: p.sku,
  price: String(p.price),
  compareAt: p.compareAt !== undefined ? String(p.compareAt) : "",
  stock: String(p.stock),
  badge: p.badge ?? NO_BADGE,
  images: p.gallery.length > 0 ? [...p.gallery] : [p.image],
  shortDescription: p.shortDescription,
  description: p.description,
  features: p.features.join("\n"),
  specs: p.specs.length > 0 ? p.specs : [],
});

export function ProductFormDialog({
  open,
  onOpenChange,
  categories,
  product,
  defaultCategory,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  product?: Product | null;
  defaultCategory?: string;
  onSubmit: (input: ProductInput) => void;
}) {
  const [form, setForm] = useState<FormState>(() =>
    emptyForm(defaultCategory ?? categories[0]?.slug ?? ""),
  );
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(product);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setForm(
      product ? productToForm(product) : emptyForm(defaultCategory ?? categories[0]?.slug ?? ""),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateSpec = (i: number, patch: Partial<Spec>) =>
    setForm((f) => ({
      ...f,
      specs: f.specs.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    }));
  const removeSpec = (i: number) =>
    setForm((f) => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));
  const addSpec = () => setForm((f) => ({ ...f, specs: [...f.specs, { label: "", value: "" }] }));

  const updateImage = (i: number, value: string) =>
    setForm((f) => ({ ...f, images: f.images.map((img, idx) => (idx === i ? value : img)) }));
  const removeImage = (i: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));
  const addImage = () => setForm((f) => ({ ...f, images: [...f.images, ""] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const shortDescription = form.shortDescription.trim();
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!name) return setError("Product name is required.");
    if (!form.category) return setError("Choose a category.");
    if (!shortDescription) return setError("Short description is required.");
    if (!Number.isFinite(price) || price < 0)
      return setError("Price must be a valid, non-negative number.");
    if (!Number.isFinite(stock) || stock < 0)
      return setError("Stock must be a valid, non-negative number.");

    const compareAt = form.compareAt.trim() ? Number(form.compareAt) : undefined;
    if (compareAt !== undefined && !Number.isFinite(compareAt))
      return setError("Compare-at price must be a number.");

    const images = form.images.map((i) => i.trim()).filter(Boolean);

    const input: ProductInput = {
      name,
      category: form.category,
      brand: form.brand.trim(),
      sku: form.sku.trim() || undefined,
      price,
      compareAt,
      stock,
      badge: form.badge === NO_BADGE ? undefined : (form.badge as Product["badge"]),
      image: images[0] || undefined,
      gallery: images.length > 0 ? images : undefined,
      shortDescription,
      description: form.description.trim() || undefined,
      features: form.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      specs: form.specs
        .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))
        .filter((s) => s.label && s.value),
    };

    onSubmit(input);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit product" : "Add product"}</DialogTitle>
          <DialogDescription>
            {isEdit ? `Editing ${product?.name}` : "Create a new product in the selected category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Product name" htmlFor="p-name" required className="sm:col-span-2">
              <Input
                id="p-name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </Field>

            <Field label="Category" htmlFor="p-category" required>
              <Select value={form.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger id="p-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Badge" htmlFor="p-badge">
              <Select value={form.badge} onValueChange={(v) => set("badge", v)}>
                <SelectTrigger id="p-badge">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NO_BADGE}>None</SelectItem>
                  {BADGES.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Brand" htmlFor="p-brand">
              <Input
                id="p-brand"
                value={form.brand}
                onChange={(e) => set("brand", e.target.value)}
                placeholder="Northbay Essentials"
              />
            </Field>

            <Field label="SKU" htmlFor="p-sku">
              <Input
                id="p-sku"
                value={form.sku}
                onChange={(e) => set("sku", e.target.value)}
                placeholder="Auto-generated if blank"
              />
            </Field>

            <Field label="Price (USD)" htmlFor="p-price" required>
              <Input
                id="p-price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                required
              />
            </Field>

            <Field label="Compare-at price" htmlFor="p-compare">
              <Input
                id="p-compare"
                type="number"
                min="0"
                step="0.01"
                value={form.compareAt}
                onChange={(e) => set("compareAt", e.target.value)}
                placeholder="Optional"
              />
            </Field>

            <Field label="Stock" htmlFor="p-stock" required>
              <Input
                id="p-stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={(e) => set("stock", e.target.value)}
                required
              />
            </Field>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label>Product images</Label>
              <Button type="button" size="sm" variant="outline" onClick={addImage}>
                <Plus className="size-3.5" /> Add image
              </Button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              The first image is used as the cover. Leave empty to fall back to the category image.
            </p>
            <div className="mt-2 space-y-2">
              {form.images.map((url, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-surface">
                    {url.trim() ? (
                      <img src={url} alt="" className="size-full object-cover" />
                    ) : (
                      <ImageIcon className="size-4 text-muted-foreground" aria-hidden="true" />
                    )}
                  </div>
                  <Input
                    placeholder={i === 0 ? "Cover image URL" : "Additional image URL"}
                    value={url}
                    onChange={(e) => updateImage(i, e.target.value)}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label="Remove image"
                    onClick={() => removeImage(i)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Field label="Short description" htmlFor="p-short" required>
            <Textarea
              id="p-short"
              value={form.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
              rows={2}
              required
            />
          </Field>

          <Field label="Full description" htmlFor="p-desc">
            <Textarea
              id="p-desc"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Falls back to short description"
            />
          </Field>

          <Field label="Features" htmlFor="p-features">
            <Textarea
              id="p-features"
              value={form.features}
              onChange={(e) => set("features", e.target.value)}
              rows={3}
              placeholder="One feature per line"
            />
          </Field>

          <div>
            <div className="flex items-center justify-between">
              <Label>Specifications</Label>
              <Button type="button" size="sm" variant="outline" onClick={addSpec}>
                <Plus className="size-3.5" /> Add spec
              </Button>
            </div>
            {form.specs.length > 0 && (
              <div className="mt-2 space-y-2">
                {form.specs.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder="Label"
                      value={s.label}
                      onChange={(e) => updateSpec(i, { label: e.target.value })}
                    />
                    <Input
                      placeholder="Value"
                      value={s.value}
                      onChange={(e) => updateSpec(i, { value: e.target.value })}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Remove spec"
                      onClick={() => removeSpec(i)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save changes" : "Add product"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  htmlFor,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
