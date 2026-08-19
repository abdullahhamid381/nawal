import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "./Reveal";

export type Crumb = { label: string; to?: string };

export function PageHeader({
  title,
  description,
  crumbs = [],
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-page py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight className="size-3" aria-hidden="true" />
                {c.to ? (
                  <Link to={c.to} className="transition-colors hover:text-foreground">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <FadeIn>
          <h1 className="max-w-3xl text-3xl font-bold md:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
        </FadeIn>
      </div>
    </header>
  );
}