import { useEffect, useState } from "react";
import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category, Product } from "@/data/products";
import {
  addCategory,
  addProduct,
  deleteCategory,
  deleteProduct,
  hasCatalogOverrides,
  resetCatalog,
  updateCategory,
  updateProduct,
  useCatalog,
  type CategoryInput,
  type ProductInput,
} from "@/lib/catalog";
import { money } from "@/lib/store";
import { CategoryFormDialog } from "./CategoryFormDialog";
import { ProductFormDialog } from "./ProductFormDialog";

export function ProductsAdminPanel() {
  const { products, categories } = useCatalog();
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.slug ?? "");

  useEffect(() => {
    if (categories.length > 0 && !categories.some((c) => c.slug === activeCategory)) {
      setActiveCategory(categories[0]?.slug ?? "");
    }
  }, [categories, activeCategory]);

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const [overridden, setOverridden] = useState(false);
  useEffect(() => setOverridden(hasCatalogOverrides()), [products, categories]);

  const visibleProducts = products.filter((p) => p.category === activeCategory);

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductDialogOpen(true);
  };
  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductDialogOpen(true);
  };
  const submitProduct = (input: ProductInput) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, input);
      toast.success("Product updated", { description: input.name });
    } else {
      addProduct(input);
      toast.success("Product added", { description: input.name });
    }
  };

  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };
  const openEditCategory = (c: Category) => {
    setEditingCategory(c);
    setCategoryDialogOpen(true);
  };
  const submitCategory = (input: CategoryInput) => {
    if (editingCategory) {
      updateCategory(editingCategory.slug, input);
      toast.success("Category updated", { description: input.name });
    } else {
      const created = addCategory(input);
      setActiveCategory(created.slug);
      toast.success("Category added", { description: input.name });
    }
  };

  const confirmDeleteCategory = () => {
    if (!deletingCategory) return;
    const result = deleteCategory(deletingCategory.slug);
    if (!result.ok) {
      toast.error("Can't delete category", { description: result.reason });
    } else {
      toast.success("Category deleted", { description: deletingCategory.name });
    }
    setDeletingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Categories</h2>
          <p className="text-xs text-muted-foreground">
            Manage products within each category. Changes save to this browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {overridden && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (
                  window.confirm(
                    "Reset the catalog to its original demo data? This discards all admin edits in this browser.",
                  )
                ) {
                  resetCatalog();
                  toast.success("Catalog reset to defaults");
                }
              }}
            >
              <RotateCcw className="size-3.5" /> Reset to defaults
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={openAddCategory}>
            <Plus className="size-3.5" /> Add category
          </Button>
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {categories.map((c) => (
            <TabsTrigger key={c.slug} value={c.slug} className="data-[state=active]:bg-secondary">
              {c.name}
              <span className="ml-1.5 text-xs text-muted-foreground">
                {products.filter((p) => p.category === c.slug).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {categories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No categories yet. Add one to start listing products.
          </p>
        </div>
      ) : (
        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
            <div>
              <h3 className="text-sm font-semibold">
                {categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory} ·{" "}
                {visibleProducts.length} products
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {categories.find((c) => c.slug === activeCategory)?.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const cat = categories.find((c) => c.slug === activeCategory);
                  if (cat) openEditCategory(cat);
                }}
              >
                <Pencil className="size-3.5" /> Edit category
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  const cat = categories.find((c) => c.slug === activeCategory);
                  if (cat) setDeletingCategory(cat);
                }}
              >
                <Trash2 className="size-3.5" /> Delete category
              </Button>
              <Button size="sm" onClick={openAddProduct}>
                <Plus className="size-3.5" /> Add product
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-surface">
                <tr className="border-b border-border text-left">
                  <th scope="col" className="p-3 font-medium">
                    Product
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    SKU
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Price
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Stock
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Badge
                  </th>
                  <th scope="col" className="p-3 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-sm text-muted-foreground">
                      No products in this category yet.
                    </td>
                  </tr>
                ) : (
                  visibleProducts.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <td className="flex items-center gap-3 p-3">
                        <img
                          src={p.image}
                          alt=""
                          width={40}
                          height={40}
                          className="size-10 shrink-0 rounded-md border border-border object-cover"
                        />
                        <span className="font-medium">{p.name}</span>
                      </td>
                      <td className="p-3 text-muted-foreground">{p.sku}</td>
                      <td className="p-3">{money(p.price)}</td>
                      <td className="p-3">{p.stock}</td>
                      <td className="p-3">
                        {p.badge && <Badge variant="secondary">{p.badge}</Badge>}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-end gap-1.5">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Edit ${p.name}`}
                            onClick={() => openEditProduct(p)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Delete ${p.name}`}
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeletingProduct(p)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <ProductFormDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        categories={categories}
        product={editingProduct}
        defaultCategory={activeCategory}
        onSubmit={submitProduct}
      />

      <CategoryFormDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        category={editingCategory}
        onSubmit={submitCategory}
      />

      <AlertDialog
        open={Boolean(deletingProduct)}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes "{deletingProduct?.name}" from the catalog in this browser.
              This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deletingProduct) {
                  deleteProduct(deletingProduct.id);
                  toast.success("Product deleted", { description: deletingProduct.name });
                }
                setDeletingProduct(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={Boolean(deletingCategory)}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes "{deletingCategory?.name}" in this browser. Categories with
              products can't be deleted — move or delete its products first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDeleteCategory}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
