/**
 * Client-side admin login.
 *
 * This is a static site with no backend/server session, so this is a
 * convenience gate (keeps casual visitors out of /admin), not real security —
 * the credential hash and all admin logic still ship in the browser bundle,
 * so a determined visitor with devtools can bypass it. Don't rely on this to
 * protect sensitive data.
 */
const CREDENTIALS_KEY = "northbay-admin-credentials-v1";
const SESSION_KEY = "northbay-admin-session-v1";
const CHANGE_EVENT = "admin-auth:change";

type Credentials = { username: string; salt: string; hash: string };

function toHex(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(salt: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

function randomSalt(): string {
  return toHex(crypto.getRandomValues(new Uint8Array(16)));
}

function readCredentials(): Credentials | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CREDENTIALS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Credentials>;
    if (
      typeof parsed.username !== "string" ||
      typeof parsed.salt !== "string" ||
      typeof parsed.hash !== "string"
    ) {
      return null;
    }
    return { username: parsed.username, salt: parsed.salt, hash: parsed.hash };
  } catch {
    return null;
  }
}

function notify() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function hasAdminAccount(): boolean {
  return readCredentials() !== null;
}

export function getAdminUsername(): string | null {
  return readCredentials()?.username ?? null;
}

export function isSessionActive(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}

export async function createAdminAccount(username: string, password: string): Promise<void> {
  const salt = randomSalt();
  const hash = await hashPassword(salt, password);
  window.localStorage.setItem(
    CREDENTIALS_KEY,
    JSON.stringify({ username: username.trim(), salt, hash }),
  );
  window.sessionStorage.setItem(SESSION_KEY, "1");
  notify();
}

export async function verifyLogin(username: string, password: string): Promise<boolean> {
  const creds = readCredentials();
  if (!creds) return false;
  if (creds.username.toLowerCase() !== username.trim().toLowerCase()) return false;
  const hash = await hashPassword(creds.salt, password);
  const ok = hash === creds.hash;
  if (ok) {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    notify();
  }
  return ok;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ ok: boolean; reason?: string }> {
  const creds = readCredentials();
  if (!creds) return { ok: false, reason: "No admin account exists yet." };
  const currentHash = await hashPassword(creds.salt, currentPassword);
  if (currentHash !== creds.hash) return { ok: false, reason: "Current password is incorrect." };
  const salt = randomSalt();
  const hash = await hashPassword(salt, newPassword);
  window.localStorage.setItem(
    CREDENTIALS_KEY,
    JSON.stringify({ username: creds.username, salt, hash }),
  );
  notify();
  return { ok: true };
}

export function logout(): void {
  window.sessionStorage.removeItem(SESSION_KEY);
  notify();
}

export function resetAdminAccount(): void {
  window.localStorage.removeItem(CREDENTIALS_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
  notify();
}
