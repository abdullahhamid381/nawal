import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thanks — you're on the list.", {
      description: "Connect a mailing provider to store subscribers.",
    });
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
      <label htmlFor={compact ? "nl-compact" : "nl"} className="sr-only">
        Email address
      </label>
      <Input
        id={compact ? "nl-compact" : "nl"}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-11 bg-background"
      />
      <Button type="submit" size="lg" className="h-11 shrink-0">
        <Mail className="size-4" aria-hidden="true" />
        Subscribe
      </Button>
    </form>
  );
}