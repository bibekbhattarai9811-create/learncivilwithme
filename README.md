# LearnCivilWithMe

Live site: **https://learncivilwithme.vercel.app**

A self-study website for becoming a professional civil engineer (US path: self-study → FE → PE).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3300

## What's inside

| Page | What it does |
|---|---|
| Dashboard | Overall progress, next tasks, weekly hours, streak, quiz accuracy |
| Roadmap | 9 phases, 36 modules, 94 checkable tasks, key concepts + free resources per module |
| Practice (FE) | 145 FE-style questions in 12 topics with worked solutions, per-topic accuracy, review missed, FE-pace timer |
| Calculators | Beam (V/M/deflection diagrams), section properties, Manning, concrete estimator, engineering economics, unit converter |
| Study Log | Log sessions, weekly goal, 16-week heatmap, hours by subject |
| License Path | Honest US licensure routes and pre-license jobs |
| Backup & Settings | Export/import/reset progress (JSON) |
| Log in / Sign up | Optional free account; progress syncs to the cloud across devices |

Guests: progress is stored in the browser's localStorage (`civilpath:v1`).
Logged-in users: the same data also syncs to Neon Postgres via `/api/progress` (merged with guest progress on first login).

## Accounts (database)

- Neon Postgres, database `learncivilwithme`. Connection string in `DATABASE_URL` (`.env.local` locally, Vercel env vars in production). Never commit it.
- Create/update tables: `npm run db:setup`
- Passwords are bcrypt-hashed; sessions are random tokens in an httpOnly cookie (only their SHA-256 is stored); failed logins are throttled (8 per email per 15 min).

## Editing content

- Roadmap: `src/lib/roadmap.ts` (keep task `id`s stable, since progress is stored against them)
- Questions: `src/lib/questions.ts`

## Deploy

Automatic: every push to `master` on GitHub redeploys https://learncivilwithme.vercel.app
