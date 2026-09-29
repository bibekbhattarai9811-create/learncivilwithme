import { bad, currentUser, isJson, sql } from "@/lib/server/auth";

const MAX_BYTES = 500_000;

export async function GET() {
  const user = await currentUser();
  if (!user) return bad("Not logged in", 401);
  const rows = (await sql`select data, updated_at from progress where user_id = ${user.id}`) as {
    data: unknown; updated_at: string;
  }[];
  return Response.json(rows[0] ? { data: rows[0].data, updatedAt: rows[0].updated_at } : { data: null, updatedAt: null });
}

export async function PUT(req: Request) {
  if (!isJson(req)) return bad("Expected JSON", 415);
  const user = await currentUser();
  if (!user) return bad("Not logged in", 401);

  const text = await req.text();
  if (text.length > MAX_BYTES) return bad("Progress data too large", 413);
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text).data;
  } catch {
    return bad("Invalid JSON");
  }
  if (!data || typeof data !== "object" || !Array.isArray(data.done) || !Array.isArray(data.log)) {
    return bad("Invalid progress data");
  }

  const rows = (await sql`
    insert into progress (user_id, data, updated_at) values (${user.id}, ${JSON.stringify(data)}::jsonb, now())
    on conflict (user_id) do update set data = excluded.data, updated_at = now()
    returning updated_at`) as { updated_at: string }[];
  return Response.json({ updatedAt: rows[0].updated_at });
}
