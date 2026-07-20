// Seeds public.standards with the canonical V2G / bidirectional-charging
// technical standards from IEC, ISO, SAE, IEEE, UL, and CHAdeMO.
// These have no free public API, so entries are manually curated with citations.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const STANDARDS = [
  { code: "ISO 15118-20", organization: "ISO/IEC", title: "Road vehicles — Vehicle to grid communication interface — Part 20: 2nd generation network layer and application layer requirements",
    status: "Published", year: 2022, region: "Global",
    scope: "Enables bidirectional power transfer (V2G, V2H, V2L) with plug & charge, TLS 1.3 security, and dynamic control loop.",
    url: "https://www.iso.org/standard/77845.html",
    taxonomy_tags: ["V2G", "communication", "ISO 15118"] },
  { code: "ISO 15118-2", organization: "ISO/IEC", title: "Road vehicles — Vehicle-to-Grid Communication Interface — Part 2: Network and application protocol requirements",
    status: "Published", year: 2014, region: "Global",
    scope: "First-generation ISO 15118, unidirectional AC/DC charging, foundation for Plug & Charge.",
    url: "https://www.iso.org/standard/55366.html",
    taxonomy_tags: ["charging", "communication"] },
  { code: "IEC 61851-1", organization: "IEC", title: "Electric vehicle conductive charging system — Part 1: General requirements",
    status: "Published", year: 2017, region: "Global",
    scope: "Baseline requirements for EVSE and EV conductive charging up to 1000 V AC / 1500 V DC.",
    url: "https://webstore.iec.ch/publication/33644",
    taxonomy_tags: ["charging", "EVSE"] },
  { code: "IEC 61851-23", organization: "IEC", title: "DC electric vehicle supply equipment",
    status: "Published", year: 2023, region: "Global",
    scope: "Requirements for DC EVSE, extended in Ed.2 (2023) to cover reverse power flow for V2G.",
    url: "https://webstore.iec.ch/publication/32915",
    taxonomy_tags: ["DC charging", "V2G"] },
  { code: "IEC 63110", organization: "IEC", title: "Management of electric vehicle charging and discharging infrastructures",
    status: "Under development", year: 2025, region: "Global",
    scope: "Protocol for managing EV charging/discharging assets from a back-end (successor to OCPP for utility-grade V2G).",
    url: "https://www.iec.ch/dyn/www/f?p=103:38:0::::FSP_ORG_ID,FSP_APEX_PAGE,FSP_PROJECT_ID:1255,23,100908",
    taxonomy_tags: ["V2G", "backend", "management"] },
  { code: "IEC 63119", organization: "IEC", title: "Information exchange for electric vehicle charging roaming service",
    status: "Under development", year: 2024, region: "Global",
    scope: "Cross-operator roaming for EV charging and discharging services.",
    url: "https://www.iec.ch/", taxonomy_tags: ["roaming", "interop"] },
  { code: "SAE J3072", organization: "SAE", title: "Interconnection Requirements for Onboard, Grid Support Inverter Systems",
    status: "Published", year: 2024, region: "North America",
    scope: "Governs how an EV's on-board inverter interconnects with a distribution system for grid-support export (V2G).",
    url: "https://www.sae.org/standards/content/j3072_202405/",
    taxonomy_tags: ["V2G", "interconnection", "inverter"] },
  { code: "SAE J3068", organization: "SAE", title: "Electric Vehicle Power Transfer System Using Three-Phase AC Capable Coupler",
    status: "Published", year: 2023, region: "North America",
    scope: "Three-phase AC coupler enabling higher-power bidirectional AC charging.",
    url: "https://www.sae.org/standards/content/j3068_202304/",
    taxonomy_tags: ["AC charging", "three-phase"] },
  { code: "SAE J2847/3", organization: "SAE", title: "Communication for DC Reverse Power Flow",
    status: "Published", year: 2021, region: "North America",
    scope: "Message set for DC reverse power flow between the EV and the EVSE.",
    url: "https://www.sae.org/standards/content/j2847/3_202108/",
    taxonomy_tags: ["V2G", "DC", "communication"] },
  { code: "IEEE 1547-2018", organization: "IEEE", title: "Standard for Interconnection and Interoperability of Distributed Energy Resources with Associated Electric Power Systems Interfaces",
    status: "Published", year: 2018, region: "North America",
    scope: "Umbrella interconnection standard for DERs including bidirectional EVs. FERC has adopted it as reference.",
    url: "https://standards.ieee.org/ieee/1547/5915/",
    taxonomy_tags: ["DER", "interconnection", "grid"] },
  { code: "UL 9741", organization: "UL", title: "Standard for Bidirectional Electric Vehicle (EV) Charging System Equipment",
    status: "Published", year: 2023, region: "North America",
    scope: "Safety certification for bidirectional EV charging equipment.",
    url: "https://www.shopulstandards.com/ProductDetail.aspx?productId=UL9741",
    taxonomy_tags: ["safety", "V2G"] },
  { code: "UL 1741 SB", organization: "UL", title: "Inverters, Converters, Controllers and Interconnection System Equipment for Use With Distributed Energy Resources — Supplement SB",
    status: "Published", year: 2021, region: "North America",
    scope: "Certification of grid-support functions for DER inverters, applicable to V2G-capable EVSE.",
    url: "https://www.shopulstandards.com/ProductDetail.aspx?productId=UL1741",
    taxonomy_tags: ["inverter", "DER"] },
  { code: "CHAdeMO 3.0 / ChaoJi", organization: "CHAdeMO", title: "CHAdeMO 3.0 (ChaoJi) high-power DC charging",
    status: "Published", year: 2020, region: "Global",
    scope: "Unified China–Japan DC connector supporting up to 900 kW bidirectional operation.",
    url: "https://www.chademo.com/chaoji", taxonomy_tags: ["DC charging", "V2G", "connector"] },
  { code: "OCPP 2.1", organization: "Open Charge Alliance", title: "Open Charge Point Protocol 2.1",
    status: "Published", year: 2024, region: "Global",
    scope: "Adds bidirectional power transfer and ISO 15118-20 support to the de-facto open EVSE-CSMS protocol.",
    url: "https://www.openchargealliance.org/protocols/ocpp-21/",
    taxonomy_tags: ["OCPP", "backend", "V2G"] },
  { code: "IEEE 2030.5", organization: "IEEE", title: "Smart Energy Profile 2.0 (SEP 2.0)",
    status: "Published", year: 2018, region: "Global",
    scope: "Application-layer protocol for DER management, used by CA Rule 21 for bidirectional EVs.",
    url: "https://standards.ieee.org/ieee/2030.5/5897/",
    taxonomy_tags: ["DER", "communication"] },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const { error, count } = await supa
    .from("standards")
    .upsert(STANDARDS, { onConflict: "code,organization", count: "exact" });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ ok: true, inserted: count ?? STANDARDS.length }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
