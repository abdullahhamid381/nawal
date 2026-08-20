import { useEffect, useState, type ReactNode } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/Logo";
import {
  createAdminAccount,
  getAdminUsername,
  hasAdminAccount,
  isSessionActive,
  logout,
  verifyLogin,
} from "@/lib/auth";

type Status = "loading" | "setup" | "login" | "authenticated";

export function AdminAuthGate({
  children,
}: {
  children: (ctx: { username: string; logout: () => void }) => ReactNode;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [username, setUsername] = useState("");

  const refresh = () => {
    if (!hasAdminAccount()) {
      setStatus("setup");
      return;
    }
    if (isSessionActive()) {
      setUsername(getAdminUsername() ?? "");
      setStatus("authenticated");
      return;
    }
    setStatus("login");
  };

  useEffect(refresh, []);

  if (status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-surface">
        <p className="text-sm text-muted-foreground">Loading admin…</p>
      </div>
    );
  }

  if (status === "setup") {
    return <SetupForm onDone={refresh} />;
  }

  if (status === "login") {
    return <LoginForm onSuccess={refresh} />;
  }

  return (
    <>
      {children({
        username,
        logout: () => {
          logout();
          refresh();
        },
      })}
    </>
  );
}

function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-lift)]">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-6 text-center">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function SetupForm({ onDone }: { onDone: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3) return setError("Username must be at least 3 characters.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords don't match.");

    setSubmitting(true);
    try {
      await createAdminAccount(trimmedUsername, password);
      onDone();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Create admin account"
      description="Set a username and password to secure this admin panel in your browser."
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="setup-username">Username</Label>
          <div className="mt-1.5">
            <Input
              id="setup-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="setup-password">Password</Label>
          <div className="mt-1.5">
            <Input
              id="setup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="setup-confirm">Confirm password</Label>
          <div className="mt-1.5">
            <Input
              id="setup-confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={submitting}>
          <ShieldCheck className="size-4" /> Create account
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Stored only in this browser — there is no server for this site, so this protects against
          casual access, not a determined attacker.
        </p>
      </form>
    </AuthShell>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const ok = await verifyLogin(username, password);
      if (!ok) {
        setError("Incorrect username or password.");
        return;
      }
      onSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Admin sign in"
      description="Enter your admin username and password to continue."
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="login-username">Username</Label>
          <div className="mt-1.5">
            <Input
              id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="login-password">Password</Label>
          <div className="mt-1.5">
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={submitting}>
          <Lock className="size-4" /> Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
