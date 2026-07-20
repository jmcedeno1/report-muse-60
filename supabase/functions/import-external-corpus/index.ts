// Imports patents, publications, pilots, failure_modes from the external
// verified V2G Supabase into Lovable Cloud. Idempotent (upsert on uid / evidence_uid).
// Invoke:  POST /functions/v1/import-external-corpus  { table?: "all" | "patents" | ... }
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const EXT_URL = Deno.env.get("EXT_SUPABASE_URL")!;
const EXT_KEY = Deno.env.get("EXT_SUPABASE_ANON_KEY")!;
const CLOUD_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const ext = createClient(EXT_URL, EXT_KEY, { auth: { persistSession: false } });
const cloud = createClient(CLOUD_URL, SERVICE_KEY, { auth: { persistSession: false } });

const PAGE = 1000;

async function copyTable(table: string, conflictKey: string, columns = "*") {
  let from = 0;
  let total = 0;
  while (true) {
    const { data, error } = await ext
      .from(table)
      .select(columns)
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`ext ${table}: ${error.message}`);
    if (!data || data.length === 0) break;

    // Strip id/created_at/updated_at so Cloud generates its own; keep uid/evidence_uid for conflict.
    const rows = data.map((r: Record<string, unknown>) => {
      const { id: _id, created_at: _c, updated_at: _u, ...rest } = r as any;
      return rest;
    });

    const { error: upErr } = await cloud
      .from(table)
      .upsert(rows, { onConflict: conflictKey, ignoreDuplicates: false });
    if (upErr) throw new Error(`cloud ${table} upsert: ${upErr.message}`);

    total += rows.length;
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return total;
}

async function copyFailureModes() {
  // pilot_id in external DB maps to a different UUID in Cloud after import.
  // Join by evidence_uid: pull pilots (evidence_uid -> ext_id), then remap.
  const { data: extPilots, error: e1 } = await ext.from("pilots").select("id, evidence_uid");
  if (e1) throw new Error(`ext pilots for remap: ${e1.message}`);
  const { data: cloudPilots, error: e2 } = await cloud.from("pilots").select("id, evidence_uid");
  if (e2) throw new Error(`cloud pilots for remap: ${e2.message}`);

  const evidenceToCloudId = new Map(
    (cloudPilots ?? []).filter((p: any) => p.evidence_uid).map((p: any) => [p.evidence_uid, p.id]),
  );
  const extIdToEvidence = new Map((extPilots ?? []).map((p: any) => [p.id, p.evidence_uid]));

  const { data: fms, error: e3 } = await ext
    .from("failure_modes")
    .select("pilot_id,category,severity,description");
  if (e3) throw new Error(`ext failure_modes: ${e3.message}`);

  const rows = (fms ?? [])
    .map((fm: any) => {
      const ev = extIdToEvidence.get(fm.pilot_id);
      const cloudPilotId = ev ? evidenceToCloudId.get(ev) : null;
      if (!cloudPilotId) return null;
      const { id: _i, created_at: _c, updated_at: _u, pilot_id: _p, ...rest } = fm;
      return { ...rest, pilot_id: cloudPilotId };
    })
    .filter(Boolean);

  // Failure modes have no natural key; wipe + reinsert for idempotency.
  const { error: delErr } = await cloud.from("failure_modes").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) throw new Error(`cloud failure_modes wipe: ${delErr.message}`);

  if (rows.length) {
    const { error: insErr } = await cloud.from("failure_modes").insert(rows);
    if (insErr) throw new Error(`cloud failure_modes insert: ${insErr.message}`);
  }
  return rows.length;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    let body: { table?: string } = {};
    try { body = await req.json(); } catch { /* empty body */ }
    const target = body.table ?? "all";

    const results: Record<string, number> = {};

    if (target === "all" || target === "patents") {
      results.patents = await copyTable(
        "patents",
        "uid",
        "uid,title,abstract,year,url,orgs,countries,citations,publication_number,cpc_classes,family_id,taxonomy_tags",
      );
    }
    if (target === "all" || target === "publications") {
      results.publications = await copyTable(
        "publications",
        "uid",
        "uid,title,abstract,year,doi,url,orgs,countries,citations,source,taxonomy_tags",
      );
    }
    if (target === "all" || target === "pilots") {
      results.pilots = await copyTable(
        "pilots",
        "evidence_uid",
        "name,location,country,latitude,longitude,partners,power_kw,fleet_size,status,v2x_type,start_date,end_date,investment_usd,description,evidence_uid,failure_mode_count,gap_categories",
      );
    }
    if (target === "all" || target === "failure_modes") {
      results.failure_modes = await copyFailureModes();
    }

    return new Response(JSON.stringify({ ok: true, imported: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("import-external-corpus failed:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
