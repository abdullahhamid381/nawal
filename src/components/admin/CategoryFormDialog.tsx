import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@/data/products";
import type { CategoryInput } from "@/lib/catalog";

type FormState = { name: string; description: string; image: string };

const toForm = (c?: Category | null): FormState => ({
  name: c?.name ?? "",
  description: c?.description ?? "",
  image: c?.image ?? "",
});

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSubmit: (input: CategoryInput) => void;
}) {
  const [form, setForm] = useState<FormState>(() => toForm(category));
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(category);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setForm(toForm(category));
  }, [open, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const description = form.description.trim();
    if (!name) return setError("Category name is required.");
    if (!description) return setError("Description is required.");
    onSubmit({ name, description, image: form.image.trim() || undefined });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit category" : "Add category"}</DialogTitle>
          <DialogDescription>
            {isEdit ? `Editing ${category?.name}` : "Create a new product category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="c-name">
              Name <span className="text-destructive">*</span>
            </Label>
            <div className="mt-1.5">
              <Input
                id="c-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="c-desc">
              Description <span className="text-destructive">*</span>
            </Label>
            <div className="mt-1.5">
              <Textarea
                id="c-desc"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="c-image">Image URL</Label>
            <div className="mt-1.5">
              <Input
                id="c-image"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="Falls back to an existing category image"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save changes" : "Add category"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
