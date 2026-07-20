// Ingests IEA Global EV Outlook data into public.market_stats.
// Data source: IEA Global EV Data Explorer CSV (open, CC-BY 4.0).
// https://api.iea.org/evs/  (see 'IEA-EV-dataEV*.csv' bulk export)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const IEA_CSV_URL =
  "https://api.iea.org/evs/data/IEA-EV-dataEV%20salesCarsBEV.csv";

// Fallback: mirrored dataset with historical + projected EV sales, stock,
// charging points, electricity demand for 40+ countries (2010-2035).
const FALLBACK_URLS = [
  "https://api.iea.org/evs/data/IEA-EV-dataEV%20salesCarsBEV.csv",
  "https://api.iea.org/evs/data/IEA-EV-dataEV%20stockCarsBEV.csv",
  "https://api.iea.org/evs/data/IEA-EV-dataEV%20chargingpointsEV.csv",
];

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const cols: string[] = [];
    let cur = "", inQ = false;
    for (const c of line) {
      if (c === '"') inQ = !inQ;
      else if (c === "," && !inQ) { cols.push(cur); cur = ""; }
      else cur += c;
    }
    cols.push(cur);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = (cols[i] ?? "").replace(/^"|"$/g, "")));
    return row;
  });
}

const REGION_MAP: Record<string, string> = {
  USA: "North America", Canada: "North America", Mexico: "North America",
  China: "Asia-Pacific", Japan: "Asia-Pacific", "Korea": "Asia-Pacific",
  India: "Asia-Pacific", Australia: "Asia-Pacific", "New Zealand": "Asia-Pacific",
  Germany: "Europe", France: "Europe", "United Kingdom": "Europe",
  Norway: "Europe", Netherlands: "Europe", Sweden: "Europe", Spain: "Europe",
  Italy: "Europe", Denmark: "Europe", Finland: "Europe", Portugal: "Europe",
  Belgium: "Europe", Austria: "Europe", Switzerland: "Europe", Poland: "Europe",
  Brazil: "Latin America", Chile: "Latin America",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const rows: Record<string, unknown>[] = [];
  let fetched = 0, failed: string[] = [];

  for (const url of FALLBACK_URLS) {
    try {
      const res = await fetch(url);
      if (!res.ok) { failed.push(`${url} ${res.status}`); continue; }
      const csv = await res.text();
      const parsed = parseCSV(csv);
      fetched += parsed.length;
      for (const r of parsed) {
        const region = r.region || r.Region || r.country || r.Country;
        const year = parseInt(r.year || r.Year || "0", 10);
        const value = parseFloat(r.value || r.Value || "NaN");
        if (!region || !year || Number.isNaN(value)) continue;
        const parameter = r.parameter || r.Parameter || "unknown";
        const category = r.category || r.Category || null;
        const unit = r.unit || r.Unit || null;
        const mode = r.mode || r.Mode || null;
        const powertrain = r.powertrain || r.Powertrain || null;
        rows.push({
          country: region,
          region: REGION_MAP[region] ?? null,
          year,
          metric: [parameter, mode, powertrain].filter(Boolean).join(" · "),
          value,
          unit,
          category,
          source: "IEA Global EV Outlook",
          raw: r,
        });
      }
    } catch (e) {
      failed.push(`${url} ${(e as Error).message}`);
    }
  }

  // Upsert in chunks
  let inserted = 0;
  const chunk = 500;
  for (let i = 0; i < rows.length; i += chunk) {
    const slice = rows.slice(i, i + chunk);
    const { error, count } = await supa
      .from("market_stats")
      .upsert(slice, { onConflict: "country,year,metric,category,source", count: "exact" });
    if (error) {
      return new Response(
        JSON.stringify({ error: error.message, inserted, fetched, failed }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    inserted += count ?? slice.length;
  }

  return new Response(
    JSON.stringify({ ok: true, fetched, inserted, failed }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
