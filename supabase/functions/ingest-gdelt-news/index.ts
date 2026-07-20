// Ingests recent V2G/bidirectional-charging news from GDELT DOC 2.0 API into
// the news table. No API key required. Idempotent (upsert on uid = sha1(url)).
//
// Invoke:
//   POST /functions/v1/ingest-gdelt-news
//   { query?: string, timespan?: string, maxrecords?: number }
//
// Defaults mirror the profile query in the WIP repo.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const CLOUD_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const cloud = createClient(CLOUD_URL, SERVICE_KEY, { auth: { persistSession: false } });

const DEFAULT_QUERY =
  '("vehicle-to-grid" OR "V2G" OR "bidirectional charging" OR "V2H" OR "V2X charging")';
const GDELT = "https://api.gdeltproject.org/api/v2/doc/doc";

async function sha1(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-1", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// GDELT seendate format: "YYYYMMDDTHHMMSSZ"
function parseSeenDate(s: string | undefined): string | null {
  if (!s || s.length < 15) return null;
  const iso = `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T${s.slice(9, 11)}:${s.slice(11, 13)}:${s.slice(13, 15)}Z`;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    let body: { query?: string; timespan?: string; maxrecords?: number } = {};
    try { body = await req.json(); } catch { /* empty body */ }

    const query = body.query ?? DEFAULT_QUERY;
    const timespan = body.timespan ?? "1month"; // 1d, 1w, 1month, 3months, 1year
    const maxrecords = Math.min(body.maxrecords ?? 250, 250);

    const params = new URLSearchParams({
      query,
      mode: "ArtList",
      format: "json",
      timespan,
      maxrecords: String(maxrecords),
      sort: "DateDesc",
    });

    const res = await fetch(`${GDELT}?${params.toString()}`);
    if (!res.ok) {
      const txt = await res.text();
      return new Response(
        JSON.stringify({ error: "GDELT request failed", status: res.status, details: txt }),
        { status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // GDELT sometimes returns non-JSON on empty; guard.
    const text = await res.text();
    let payload: any = {};
    try { payload = JSON.parse(text); } catch { payload = { articles: [] }; }

    const articles: any[] = payload.articles ?? [];
    const rows = await Promise.all(
      articles
        .filter((a) => a?.url)
        .map(async (a) => ({
          uid: await sha1(a.url),
          url: a.url,
          title: a.title ?? null,
          seen_date: parseSeenDate(a.seendate),
          domain: a.domain ?? null,
          language: a.language ?? null,
          source_country: a.sourcecountry ?? null,
          tone: a.tone != null ? Number(a.tone) : null,
          social_image: a.socialimage ?? null,
          query,
          taxonomy_tags: [],
          raw: a,
        })),
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ ok: true, fetched: 0, upserted: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { error } = await cloud
      .from("news")
      .upsert(rows, { onConflict: "uid", ignoreDuplicates: false });
    if (error) {
      console.error("news upsert failed:", error);
      return new Response(
        JSON.stringify({ error: "DB upsert failed", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ ok: true, fetched: articles.length, upserted: rows.length, query, timespan }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("ingest-gdelt-news failed:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
