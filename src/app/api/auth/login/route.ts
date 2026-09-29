import bcrypt from "bcryptjs";
import { bad, cleanEmail, createSession, isJson, sql } from "@/lib/server/auth";

const MAX_FAILS = 8; // per email per 15 minutes
// compared against when the email doesn't exist, so response time doesn't reveal which emails have accounts
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

export async function POST(req: Request) {
  if (!isJson(req)) return bad("Expected JSON", 415);
  const body = await req.json().catch(() => ({}));
  const email = cleanEmail(body.email);
  const password = String(body.password ?? "");
  if (!email || !password) return bad("Enter your email and password.");

  const [{ n }] = (await sql`
    select count(*)::int as n from login_attempts where email = ${email} and at > now() - interval '15 minutes'`) as { n: number }[];
  if (n >= MAX_FAILS) return bad("Too many failed attempts. Wait 15 minutes and try again.", 429);

  const rows = (await sql`select id, email, name, password_hash from users where email = ${email}`) as {
    id: string; email: string; name: string; password_hash: string;
  }[];
  const user = rows[0];
  const ok = await bcrypt.compare(password, user?.password_hash ?? DUMMY_HASH);
  if (!user || !ok) {
    await sql`insert into login_attempts (email) values (${email})`;
    return bad("Wrong email or password.", 401);
  }

  await sql`delete from login_attempts where email = ${email}`;
  await createSession(user.id);
  return Response.json({ user: { id: user.id, email: user.email, name: user.name } });
}
