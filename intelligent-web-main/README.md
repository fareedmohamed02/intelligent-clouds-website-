# Intelligent-Cloud Web

Marketing website for Intelligent-Cloud.

## Stack

React · TypeScript · Vite · Tailwind CSS · shadcn-style primitives · React Query · Lucide · Framer Motion

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)

## Local run order

1. MongoDB  
2. `../intelligent-cloud-api` → `http://localhost:4000`  
3. `../intelligent-cloud-admin` → `http://localhost:5174`  
4. **This app** → `http://localhost:5173`

## Env

- `VITE_API_URL` — API base URL (default `http://localhost:4000`)

## Notes

- Design tokens live in `src/index.css` (duplicated from the design plan; not a shared package).
- Brand + illustrations are mirrored from `../assets/` into `public/assets/` (URLs stay `/assets/...`). Use `src/lib/assets.ts`.
- Re-sync after editing master assets: `powershell -File ../scripts/sync-assets.ps1`
- CMS data: `src/hooks/useCms.ts` (settings, services, solutions, faqs, docs) via `VITE_API_URL`
- Site search: navbar / ⌘K (Ctrl+K) — indexes static pages + live CMS content
- Loading UI: `src/components/skeletons.tsx`
- Route stubs for all Phase 1 pages are registered; homepage sections land in Phase 3.
