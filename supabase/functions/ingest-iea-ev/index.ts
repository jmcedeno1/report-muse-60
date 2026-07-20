// Ingests EV market data from Our World in Data (which sources IEA Global EV Outlook).
// Writes to public.market_stats.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const DATASETS: { url: string; metric: string; unit: string; category: string }[] = [
  { url: "https://ourworldindata.org/grapher/electric-car-sales.csv",
    metric: "Electric car sales", unit: "vehicles", category: "Sales" },
  { url: "https://ourworldindata.org/grapher/electric-car-stocks.csv",
    metric: "Electric car stock", unit: "vehicles", category: "Stock" },
  { url: "https://ourworldindata.org/grapher/electric-car-sales-share.csv",
    metric: "Share of new cars that are electric", unit: "%", category: "Share" },
];

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = cols[i] ?? ""));
    return row;
  });
}

const REGION_MAP: Record<string, string> = {
  "United States": "North America", Canada: "North America", Mexico: "North America",
  China: "Asia-Pacific", Japan: "Asia-Pacific", "South Korea": "Asia-Pacific",
  India: "Asia-Pacific", Australia: "Asia-Pacific", "New Zealand": "Asia-Pacific",
  Germany: "Europe", France: "Europe", "United Kingdom": "Europe",
  Norway: "Europe", Netherlands: "Europe", Sweden: "Europe", Spain: "Europe",
  Italy: "Europe", Denmark: "Europe", Finland: "Europe", Portugal: "Europe",
  Belgium: "Europe", Austria: "Europe", Switzerland: "Europe", Poland: "Europe",
  Brazil: "Latin America", Chile: "Latin America", World: "Global",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const rows: Record<string, unknown>[] = [];
  const failed: string[] = [];

  for (const d of DATASETS) {
    try {
      const res = await fetch(d.url);
      if (!res.ok) { failed.push(`${d.url} ${res.status}`); continue; }
      const parsed = parseCSV(await res.text());
      const valueCol = Object.keys(parsed[0] ?? {}).find(
        (k) => k !== "Entity" && k !== "Code" && k !== "Year",
      );
      if (!valueCol) continue;
      for (const r of parsed) {
        const country = r.Entity;
        const year = parseInt(r.Year, 10);
        const value = parseFloat(r[valueCol]);
        if (!country || !year || Number.isNaN(value)) continue;
        rows.push({
          country,
          region: REGION_MAP[country] ?? null,
          year,
          metric: d.metric,
          value,
          unit: d.unit,
          category: d.category,
          source: "IEA Global EV Outlook (via Our World in Data)",
        });
      }
    } catch (e) { failed.push(`${d.url} ${(e as Error).message}`); }
  }

  // Dedupe within batch by conflict key
  const seen = new Set<string>();
  const deduped = rows.filter((r) => {
    const k = `${r.country}|${r.year}|${r.metric}|${r.category}|${r.source}`;
    if (seen.has(k)) return false;
    seen.add(k); return true;
  });

  let inserted = 0;
  const chunk = 500;
  for (let i = 0; i < deduped.length; i += chunk) {
    const slice = deduped.slice(i, i + chunk);
    const { error, count } = await supa
      .from("market_stats")
      .upsert(slice, { onConflict: "country,year,metric,category,source", count: "exact" });
    if (error) {
      return new Response(JSON.stringify({ error: error.message, inserted }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    inserted += count ?? slice.length;
  }

  return new Response(
    JSON.stringify({ ok: true, fetched: rows.length, inserted, failed }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
