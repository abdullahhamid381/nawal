import { Link } from "@tanstack/react-router";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label={`${company.name} home`}>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-lg font-bold transition-transform group-hover:scale-105",
          invert ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
          <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 10.5v5.2M16 8.3v5.2M8 10.5 16 6M8 15.7l8-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-base font-extrabold tracking-tight", invert && "text-primary-foreground")}>
          Northbay
        </span>
        <span className={cn("text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground", invert && "text-primary-foreground/70")}>
          Retail Co.
        </span>
      </span>
    </Link>
  );
}