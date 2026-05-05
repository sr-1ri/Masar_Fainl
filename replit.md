# Workspace — منصة مسار (Masar Platform)

## Overview

A luxury Saudi educational guidance web platform featuring **هياف (Hayyaf)** — an AI assistant powered by Claude (claude-sonnet-4-6) with vision support that helps Saudi students analyze grade reports / schedules from images, suggests modern study methods (Pomodoro, spaced repetition, AI mind maps), and explains Saudi university specializations with admission rates, careers, and recommended professional certifications.

The UI is fully Arabic, right-to-left (RTL), and uses a luxury palette inspired by King Khalid University and Asir heritage: royal green + matte gold + ivory, with subtle Sadu (Asir) SVG patterns.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind + shadcn/ui + wouter + framer-motion
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **AI**: Anthropic Claude via Replit AI Integrations (no user key needed)
- **Build**: esbuild (CJS bundle)

## Artifacts

- `artifacts/masar` — main web app (`/`)
- `artifacts/api-server` — Express API (`/api`)
- `artifacts/mockup-sandbox` — design canvas

## Domain Tables

- `conversations`, `messages` — Hayyaf chat history (Anthropic integration)
- `specializations` — Saudi university specializations (8 seeded)
- `study_tips` — creative study methods (6 seeded)
- `university_programs` — university × program admission rates + careers + certifications (66 rows across 6 universities, 13 programs)

Educational stages are served from a static list in `artifacts/api-server/src/routes/masar.ts`.

## Pages (`artifacts/masar`)

- `/` Home — luxury hero, video placeholder, 3 corridors, feature strip, stats
- `/chat` Chat with Hayyaf — supports image upload (vision)
- `/specializations` Specializations directory
- `/admissions` University admission rates × programs × certifications
- `/methods` Modern study techniques (interactive Pomodoro timer, spaced-repetition demo, AI mind map showcase)
- `/resources` Saudi educational platforms + Saudi educator influencers
- `/personality` Visual / auditory / kinesthetic learning style quiz
- `/study-tips` Legacy creative study tips
- `/stages` Educational stages

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/scripts run seed:masar` — seed specializations and study tips (idempotent)
- `pnpm --filter @workspace/scripts run seed:universities` — seed university programs (idempotent)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
