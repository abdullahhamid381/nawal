import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Search, ShoppingBag, User, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/data/products";
import { company } from "@/data/company";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const { cartCount, wishlist, compare } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    void navigate({ to: "/shop", search: { q } });
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p>Free standard shipping on orders over ${company.freeShippingThreshold}</p>
          <p className="hidden sm:block">
            Customer support: <span className="font-medium">{company.phone}</span>
          </p>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-border bg-background/90 backdrop-blur transition-shadow duration-300",
          scrolled && "shadow-[var(--shadow-soft)]",
        )}
      >
        <div className="container-page flex h-16 items-center gap-4">
          <Logo />

          <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-foreground after:scale-x-100" }}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-foreground hover:after:scale-x-100"
              >
                {n.label}
              </Link>
            ))}
            <div className="group relative">
              <button className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Categories
              </button>
              <div className="invisible absolute left-0 top-full w-64 translate-y-1 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-[var(--shadow-lift)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/shop"
                    search={{ category: c.slug }}
                    className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-0.5">
            <Button variant="ghost" size="icon" aria-label="Search products" onClick={() => setSearchOpen((v) => !v)}>
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label={`Comparison (${compare.length})`}>
              <Link to="/compare" className="relative hidden sm:inline-flex">
                <Scale className="size-5" />
                {compare.length > 0 && <CountDot n={compare.length} />}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label={`Wishlist (${wishlist.length})`}>
              <Link to="/wishlist" className="relative">
                <Heart className="size-5" />
                {wishlist.length > 0 && <CountDot n={wishlist.length} />}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="Account">
              <Link to="/account" className="hidden sm:inline-flex">
                <User className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label={`Cart (${cartCount})`}>
              <Link to="/cart" className="relative">
                <ShoppingBag className="size-5" />
                {cartCount > 0 && <CountDot n={cartCount} />}
              </Link>
            </Button>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-0">
                <SheetHeader className="border-b border-border p-5">
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav aria-label="Mobile" className="flex flex-col p-3">
                  {nav.map((n) => (
                    <Link key={n.to} to={n.to} className="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-secondary">
                      {n.label}
                    </Link>
                  ))}
                  <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</p>
                  {categories.map((c) => (
                    <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                      {c.name}
                    </Link>
                  ))}
                  <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account</p>
                  <Link to="/account" className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary">My account & orders</Link>
                  <Link to="/wishlist" className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary">Wishlist</Link>
                  <Link to="/compare" className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary">Compare products</Link>
                  <Link to="/faq" className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary">Help & FAQ</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-border bg-background"
            >
              <form onSubmit={submitSearch} className="container-page flex items-center gap-2 py-3">
                <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                <label htmlFor="site-search" className="sr-only">
                  Search products
                </label>
                <Input
                  id="site-search"
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products, categories or SKU…"
                  className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
                <Button type="submit" size="sm">
                  Search
                </Button>
                <Button type="button" size="icon" variant="ghost" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                  <X className="size-4" />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function CountDot({ n }: { n: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
      {n > 9 ? "9+" : n}
    </span>
  );
}