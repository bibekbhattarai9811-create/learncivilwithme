import bcrypt from "bcryptjs";
import { bad, checkPassword, cleanEmail, createSession, isJson, newId, sql } from "@/lib/server/auth";

export async function POST(req: Request) {
  if (!isJson(req)) return bad("Expected JSON", 415);
  const body = await req.json().catch(() => ({}));
  const name = String(body.name ?? "").trim().slice(0, 60);
  const email = cleanEmail(body.email);
  if (!name) return bad("Please enter your name.");
  if (!email) return bad("Please enter a valid email address.");
  const pwError = checkPassword(body.password);
  if (pwError) return bad(pwError);

  const exists = await sql`select 1 from users where email = ${email}`;
  if (exists.length) return bad("An account with this email already exists. Try logging in.", 409);

  const id = newId();
  const passwordHash = await bcrypt.hash(String(body.password), 10);
  await sql`insert into users (id, email, name, password_hash) values (${id}, ${email}, ${name}, ${passwordHash})`;
  await createSession(id);
  return Response.json({ user: { id, email, name } });
}
