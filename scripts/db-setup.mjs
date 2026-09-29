// Creates the tables for accounts + cloud progress. Safe to run repeatedly.
// Usage: node --env-file=.env.local scripts/db-setup.mjs
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const sql = neon(process.env.DATABASE_URL);

await sql`
  create table if not exists users (
    id            text primary key,
    email         text not null unique,
    name          text not null,
    password_hash text not null,
    created_at    timestamptz not null default now()
  )`;

// only a SHA-256 hash of the session token is stored, never the token itself
await sql`
  create table if not exists sessions (
    token_hash text primary key,
    user_id    text not null references users(id) on delete cascade,
    expires_at timestamptz not null,
    created_at timestamptz not null default now()
  )`;
await sql`create index if not exists sessions_user_idx on sessions(user_id)`;

await sql`
  create table if not exists progress (
    user_id    text primary key references users(id) on delete cascade,
    data       jsonb not null,
    updated_at timestamptz not null default now()
  )`;

// failed-login throttle
await sql`
  create table if not exists login_attempts (
    email      text not null,
    at         timestamptz not null default now()
  )`;
await sql`create index if not exists login_attempts_idx on login_attempts(email, at)`;

console.log("Tables ready:", (await sql`select table_name from information_schema.tables where table_schema = 'public' order by 1`).map((r) => r.table_name).join(", "));
