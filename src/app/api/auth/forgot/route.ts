import { createHash, randomBytes } from "node:crypto";
import { bad, cleanEmail, isJson, sql } from "@/lib/server/auth";
import { emailConfigured, sendPasswordResetEmail } from "@/lib/server/email";

const MAX_PER_HOUR = 3;

// Always answers the same way, so this can't be used to discover which emails have accounts.
const OK = () => Response.json({ ok: true });

export async function POST(req: Request) {
  if (!isJson(req)) return bad("Expected JSON", 415);
  const body = await req.json().catch(() => ({}));
  const email = cleanEmail(body.email);
  if (!email) return bad("Please enter a valid email address.");
  // without an email service, don't pretend a link was sent (dev still logs it below)
  if (!emailConfigured() && process.env.NODE_ENV === "production") {
    return bad("Password reset by email isn't switched on yet. Please try again later.", 503);
  }

  const users = (await sql`select id, name from users where email = ${email}`) as { id: string; name: string }[];
  const user = users[0];
  if (!user) return OK();

  const [{ n }] = (await sql`
    select count(*)::int as n from password_resets where user_id = ${user.id} and created_at > now() - interval '1 hour'`) as { n: number }[];
  if (n >= MAX_PER_HOUR) return OK();

  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  await sql`update password_resets set used_at = now() where user_id = ${user.id} and used_at is null`; // only the newest link works
  await sql`insert into password_resets (token_hash, user_id, expires_at) values (${tokenHash}, ${user.id}, now() + interval '1 hour')`;

  // SITE_URL in production, so a forged Host header can't redirect the link elsewhere
  const origin = process.env.SITE_URL || new URL(req.url).origin;
  const resetUrl = `${origin}/reset-password?token=${token}`;

  try {
    if (!emailConfigured()) throw new Error("RESEND_API_KEY not set");
    await sendPasswordResetEmail(email, user.name, resetUrl);
  } catch (e) {
    console.error("[password reset] email failed:", e instanceof Error ? e.message : e);
    if (process.env.NODE_ENV !== "production") console.log(`[password reset] dev link for ${email}: ${resetUrl}`);
  }
  return OK();
}
