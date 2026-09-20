# Intelligent-Cloud Admin

Admin panel for Intelligent-Cloud content, leads, and settings.

## Stack

React · TypeScript · Vite · Tailwind CSS · shadcn-style primitives · React Query · Lucide

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

App: [http://localhost:5174](http://localhost:5174)

## Local run order

1. MongoDB  
2. `../intelligent-cloud-api` → `http://localhost:4000`  
3. **This app** → `http://localhost:5174`  
4. `../intelligent-cloud-web` → `http://localhost:5173`

## Env

- `VITE_API_URL` — API base URL (default `http://localhost:4000`)

## Notes

- Design tokens are duplicated here (same values as web) — no monorepo shared package.
- Auth/login is a Phase 0 shell; real JWT auth ships in Phase 1.
- Dashboard already probes `GET /health` via React Query.
