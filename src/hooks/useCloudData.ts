// Live-data hooks backed by Lovable Cloud (the verified V2G corpus).
// All queries are read-only and cached with React Query.
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Pilot = Tables<"pilots">;
export type Patent = Tables<"patents">;
export type Publication = Tables<"publications">;
export type FailureMode = Tables<"failure_modes">;
export type NewsArticle = Tables<"news">;
export type MarketStat = Tables<"market_stats">;
export type Standard = Tables<"standards">;
export type Regulation = Tables<"regulations">;

/* ---------- market ---------- */
export function useMarketStats(metric?: string) {
  return useQuery({
    queryKey: ["cloud", "market_stats", metric],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      let q = supabase.from("market_stats").select("*").order("year");
      if (metric) q = q.eq("metric", metric);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as MarketStat[];
    },
  });
}

/* ---------- standards ---------- */
export function useStandards() {
  return useQuery({
    queryKey: ["cloud", "standards"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("standards")
        .select("*")
        .order("organization")
        .order("code");
      if (error) throw error;
      return (data ?? []) as Standard[];
    },
  });
}

/* ---------- regulations ---------- */
export function useRegulations(limit = 100) {
  return useQuery({
    queryKey: ["cloud", "regulations", limit],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("regulations")
        .select("*")
        .order("publication_date", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Regulation[];
    },
  });
}

/* ---------- patent families ---------- */
export type PatentFamily = {
  family: string;
  total: number;
  recent: number;
  older: number;
  first_year: number;
  last_year: number;
  recent_annual_rate: number;
  historical_annual_rate: number | null;
  momentum: number | null;
  maturity: "Growing" | "Active" | "Saturated" | "Emerging";
};

export function usePatentFamilies() {
  return useQuery({
    queryKey: ["cloud", "patent_families"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patent_families" as never)
        .select("*")
        .order("total", { ascending: false });
      if (error) throw error;
      return (data ?? []) as PatentFamily[];
    },
  });
}
        .from("regulations")
        .select("*")
        .order("publication_date", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Regulation[];
    },
  });
}

const STALE = 5 * 60 * 1000;

/* ---------- corpus summary ---------- */
export function useCorpusCounts() {
  return useQuery({
    queryKey: ["cloud", "corpus_summary"],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("corpus_summary" as never)
        .select("*")
        .maybeSingle();
      if (error) throw error;
      return (data ?? { patents: 0, publications: 0, pilots: 0, failure_modes: 0, news: 0 }) as {
        patents: number;
        publications: number;
        pilots: number;
        failure_modes: number;
        news: number;
      };
    },
  });
}

/* ---------- patents ---------- */
export function usePatentsByYear() {
  return useQuery({
    queryKey: ["cloud", "patents_by_year"],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patents_by_year" as never)
        .select("year, count")
        .order("year", { ascending: true });
      if (error) throw error;
      return (data ?? []) as { year: number; count: number }[];
    },
  });
}

export function usePatentsTopOrgs(limit = 10) {
  return useQuery({
    queryKey: ["cloud", "patents_top_orgs", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patents_top_orgs" as never)
        .select("name, count")
        .order("count", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as { name: string; count: number }[];
    },
  });
}

export function usePatentsTopCountries(limit = 10) {
  return useQuery({
    queryKey: ["cloud", "patents_top_countries", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patents_top_countries" as never)
        .select("country, count")
        .order("count", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as { country: string; count: number }[];
    },
  });
}

export function usePatentsThemes(limit = 10) {
  return useQuery({
    queryKey: ["cloud", "patents_themes", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patents_themes" as never)
        .select("theme, count")
        .order("count", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as { theme: string; count: number }[];
    },
  });
}

export function usePatentsTop(limit = 15) {
  return useQuery({
    queryKey: ["cloud", "patents_top", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patents")
        .select("id,uid,title,year,url,orgs,countries,citations,publication_number,taxonomy_tags")
        .order("citations", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Patent[];
    },
  });
}

/* ---------- publications ---------- */
export function usePublicationsByYear() {
  return useQuery({
    queryKey: ["cloud", "publications_by_year"],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publications_by_year" as never)
        .select("year, count")
        .order("year", { ascending: true });
      if (error) throw error;
      return (data ?? []) as { year: number; count: number }[];
    },
  });
}

export function usePublicationsTopOrgs(limit = 10) {
  return useQuery({
    queryKey: ["cloud", "publications_top_orgs", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publications_top_orgs" as never)
        .select("name, count")
        .order("count", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as { name: string; count: number }[];
    },
  });
}

export function usePublicationsTopCountries(limit = 10) {
  return useQuery({
    queryKey: ["cloud", "publications_top_countries", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publications_top_countries" as never)
        .select("country, count")
        .order("count", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as { country: string; count: number }[];
    },
  });
}

export function usePublicationsThemes(limit = 10) {
  return useQuery({
    queryKey: ["cloud", "publications_themes", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publications_themes" as never)
        .select("theme, count")
        .order("count", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as { theme: string; count: number }[];
    },
  });
}

export function usePublicationsTop(limit = 15) {
  return useQuery({
    queryKey: ["cloud", "publications_top", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("id,uid,title,year,doi,url,orgs,countries,citations,source,taxonomy_tags")
        .order("citations", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Publication[];
    },
  });
}

export function usePublicationsWithTags(limit = 400) {
  return useQuery({
    queryKey: ["cloud", "publications_with_tags", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("id,title,year,doi,url,orgs,citations,source,taxonomy_tags")
        .not("taxonomy_tags", "is", null)
        .order("citations", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Publication[];
    },
  });
}



/* ---------- pilots ---------- */
export function usePilots() {
  return useQuery({
    queryKey: ["cloud", "pilots"],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pilots")
        .select("*")
        .order("start_date", { ascending: false, nullsFirst: false });
      if (error) throw error;
      return (data ?? []) as Pilot[];
    },
  });
}

export function useFailureModes() {
  return useQuery({
    queryKey: ["cloud", "failure_modes"],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase.from("failure_modes").select("*");
      if (error) throw error;
      return (data ?? []) as FailureMode[];
    },
  });
}

/* ---------- news ---------- */
export function useNews(limit = 60) {
  return useQuery({
    queryKey: ["cloud", "news", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id,uid,url,title,seen_date,domain,language,source_country,tone,social_image")
        .order("seen_date", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as NewsArticle[];
    },
  });
}

export function useNewsByDomain(limit = 10) {
  return useQuery({
    queryKey: ["cloud", "news_by_domain", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_by_domain" as never)
        .select("domain, count")
        .order("count", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as { domain: string; count: number }[];
    },
  });
}

export function useNewsByCountry(limit = 10) {
  return useQuery({
    queryKey: ["cloud", "news_by_country", limit],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_by_country" as never)
        .select("country, count")
        .order("count", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as { country: string; count: number }[];
    },
  });
}
