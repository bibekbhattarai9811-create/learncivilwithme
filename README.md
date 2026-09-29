# LearnCivilWithMe

Live site: https://bibekbhattarai9811-create.github.io/learncivilwithme/

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

All progress is stored in the browser's localStorage (`civilpath:v1`). Use Backup to move it between computers.

## Editing content

- Roadmap: `src/lib/roadmap.ts` (keep task `id`s stable, since progress is stored against them)
- Questions: `src/lib/questions.ts`

## Deploy

```bash
npm run deploy
```

Builds the static site and pushes it to the `gh-pages` branch, which GitHub Pages serves at
https://bibekbhattarai9811-create.github.io/learncivilwithme/
