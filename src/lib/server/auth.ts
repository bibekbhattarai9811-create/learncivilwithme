// Server-only auth helpers: Neon (Postgres over HTTPS), bcrypt passwords,
// random session tokens in an httpOnly cookie (only their SHA-256 is stored).
import { neon } from "@neondatabase/serverless";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";

export const sql = neon(process.env.DATABASE_URL!);

const COOKIE = "lcwm_session";
const SESSION_DAYS = 30;

export type User = { id: string; email: string; name: string };

const hash = (token: string) => createHash("sha256").update(token).digest("hex");

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5);
  await sql`insert into sessions (token_hash, user_id, expires_at) values (${hash(token)}, ${userId}, ${expires})`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function currentUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const rows = await sql`
    select u.id, u.email, u.name from sessions s join users u on u.id = s.user_id
    where s.token_hash = ${hash(token)} and s.expires_at > now()`;
  return (rows[0] as User) ?? null;
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) await sql`delete from sessions where token_hash = ${hash(token)}`;
  store.delete(COOKIE);
}

export const newId = () => randomUUID();

/** Reject cross-site form posts: our client always sends JSON. */
export function isJson(req: Request) {
  return (req.headers.get("content-type") ?? "").includes("application/json");
}

export function bad(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export function cleanEmail(v: unknown) {
  const e = String(v ?? "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254 ? e : null;
}

export function checkPassword(v: unknown) {
  const p = String(v ?? "");
  if (p.length < 8) return "Password must be at least 8 characters.";
  if (p.length > 200) return "Password is too long.";
  return null;
}
