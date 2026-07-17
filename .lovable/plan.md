
## Goal

Replace hardcoded values in `src/data/reportData.ts` with live reads from your existing Supabase database that holds real Bidirectional EV Charging data, so every number/table in the report is verifiable and traceable to a row.

## Approach

Add a **second, read-only Supabase client** pointing at your external project, alongside the existing Lovable Cloud client (which stays for anything app-side like auth or future writes). The report fetches from your DB at page load; nothing about your DB is modified.

This keeps your DB as the single source of truth, avoids a data migration, and lets you keep updating the report just by editing rows in your Supabase.

## What I need from you before building

1. **External Supabase Project URL** (e.g. `https://xxxx.supabase.co`)
2. **External Supabase anon/publishable key** (safe to ship in the browser — do NOT share the service_role key)
3. **Table list + column names** for the data you want surfaced (or just say "everything relevant" and I'll inspect the schema after you paste the two values above using a one-off read)
4. Confirmation that the tables you want to expose have **RLS enabled with a public SELECT policy** (or that you're OK with me suggesting the policies you need to add on your side). Without an anon SELECT policy, the browser cannot read them.

## Build steps (once credentials are in)

1. Store the external URL + anon key as Vite env vars (`VITE_EXT_SUPABASE_URL`, `VITE_EXT_SUPABASE_ANON_KEY`).
2. Create `src/integrations/external-supabase/client.ts` — a separate `createClient` instance so it doesn't collide with the auto-generated Lovable Cloud client.
3. For each report section that should become live, add a small typed fetch hook (e.g. `usePatents()`, `usePublications()`, `useMarketStats()`, `useBusinessModels()`, `useReferences()`) using `@tanstack/react-query` (already in the project).
4. Update the corresponding section components to render from the query result with loading + empty states; keep the current visuals unchanged.
5. Add a small "Source: <your DB> · row id #…" affordance where the existing "Source" tooltip already lives, so every figure links back to the row it came from.
6. Leave any section that has no matching table in the DB untouched, and list those explicitly so you can decide whether to add tables or remove the section.

## Non-goals

- No writes, no admin editor UI, no auth on the report side.
- No migration of your data into Lovable Cloud.
- No changes to the existing animations, layout, or design tokens.

## Open decision (I'll default if you don't answer)

If you don't specify which sections to wire first, I'll default to the four with the most fact-heavy content: **Executive Summary stat cards, Patents, Scientific Publications, and References** — then extend to Market / Business Models / Pilots in a follow-up.

Reply with the URL + anon key (and any table hints) and I'll implement.
