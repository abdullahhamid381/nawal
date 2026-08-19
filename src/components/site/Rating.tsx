import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = "sm",
}: {
  value: number | null;
  count?: number;
  size?: "sm" | "md";
}) {
  const px = size === "sm" ? "size-3.5" : "size-4";
  if (value === null || !count) {
    return <span className="text-xs text-muted-foreground">No reviews yet</span>;
  }
  return (
    <span className="flex items-center gap-1.5" aria-label={`Rated ${value} out of 5`}>
      <span className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(px, i <= Math.round(value) ? "fill-accent text-accent" : "text-border")}
            aria-hidden="true"
          />
        ))}
      </span>
      <span className="text-xs text-muted-foreground">
        {value.toFixed(1)} ({count})
      </span>
    </span>
  );
}