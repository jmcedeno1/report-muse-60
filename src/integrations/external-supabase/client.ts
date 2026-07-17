// Read-only client for the verified V2G research database.
// Kept separate from the Lovable Cloud client so the two never collide.
import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_EXT_SUPABASE_URL as string;
const KEY = import.meta.env.VITE_EXT_SUPABASE_ANON_KEY as string;

export const extSupabase = createClient(URL, KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export type Pilot = {
  id: string;
  name: string;
  location: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  partners: string[] | null;
  power_kw: number | null;
  fleet_size: number | null;
  status: string | null;
  v2x_type: string[] | null;
  start_date: string | null;
  end_date: string | null;
  investment_usd: number | null;
  description: string | null;
  failure_mode_count: number | null;
  gap_categories: string[] | null;
};

export type Patent = {
  id: string;
  uid: string;
  title: string | null;
  abstract: string | null;
  year: number | null;
  url: string | null;
  orgs: string[] | null;
  countries: string[] | null;
  citations: number | null;
  publication_number: string | null;
  cpc_classes: string[] | null;
  family_id: string | null;
  taxonomy_tags: string[] | null;
};

export type Publication = {
  id: string;
  uid: string;
  title: string | null;
  year: number | null;
  doi: string | null;
  url: string | null;
  orgs: string[] | null;
  countries: string[] | null;
  citations: number | null;
  taxonomy_tags: string[] | null;
};

export type FailureMode = {
  id: string;
  pilot_id: string;
  category: string | null;
  severity: string | null;
  description: string | null;
};
