import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import { bad, checkPassword, createSession, isJson, sql } from "@/lib/server/auth";

export async function POST(req: Request) {
  if (!isJson(req)) return bad("Expected JSON", 415);
  const body = await req.json().catch(() => ({}));
  const token = String(body.token ?? "");
  const pwError = checkPassword(body.password);
  if (!token) return bad("This reset link is invalid.");
  if (pwError) return bad(pwError);

  const tokenHash = createHash("sha256").update(token).digest("hex");
  // mark used in the same statement that checks it, so a link can't be used twice
  const rows = (await sql`
    update password_resets set used_at = now()
    where token_hash = ${tokenHash} and used_at is null and expires_at > now()
    returning user_id`) as { user_id: string }[];
  if (!rows.length) return bad("This reset link has expired or was already used. Request a new one.", 410);
  const userId = rows[0].user_id;

  const passwordHash = await bcrypt.hash(String(body.password), 10);
  await sql`update users set password_hash = ${passwordHash} where id = ${userId}`;
  await sql`delete from sessions where user_id = ${userId}`; // sign out every other device
  await sql`delete from login_attempts where email = (select email from users where id = ${userId})`;

  await createSession(userId);
  const [user] = (await sql`select id, email, name from users where id = ${userId}`) as { id: string; email: string; name: string }[];
  return Response.json({ user });
}
