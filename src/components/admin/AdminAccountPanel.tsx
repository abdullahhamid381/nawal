import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/lib/auth";

export function AdminAccountPanel({ username }: { username: string }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setCurrent("");
    setNext("");
    setConfirm("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (next.length < 6) return setError("New password must be at least 6 characters.");
    if (next !== confirm) return setError("New passwords don't match.");

    setSubmitting(true);
    try {
      const result = await changePassword(current, next);
      if (!result.ok) {
        setError(result.reason ?? "Could not change password.");
        return;
      }
      toast.success("Password updated");
      reset();
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 text-sm">
      <p className="text-muted-foreground">
        Signed in as <span className="font-medium text-foreground">{username}</span>.
      </p>
      {!open ? (
        <Button size="sm" variant="outline" className="mt-3" onClick={() => setOpen(true)}>
          Change password
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3 max-w-xs space-y-3">
          <div>
            <Label htmlFor="acc-current">Current password</Label>
            <div className="mt-1.5">
              <Input
                id="acc-current"
                type="password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="acc-new">New password</Label>
            <div className="mt-1.5">
              <Input
                id="acc-new"
                type="password"
                value={next}
                onChange={(e) => setNext(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="acc-confirm">Confirm new password</Label>
            <div className="mt-1.5">
              <Input
                id="acc-confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={submitting}>
              Save password
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
