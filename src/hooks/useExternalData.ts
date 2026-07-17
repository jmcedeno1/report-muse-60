import { useQuery } from "@tanstack/react-query";
import { extSupabase, type Pilot, type Patent, type Publication, type FailureMode } from "@/integrations/external-supabase/client";

export function usePilots() {
  return useQuery({
    queryKey: ["ext", "pilots"],
    queryFn: async (): Promise<Pilot[]> => {
      const { data, error } = await extSupabase
        .from("pilots")
        .select("*")
        .order("start_date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Pilot[];
    },
  });
}

export function useFailureModes() {
  return useQuery({
    queryKey: ["ext", "failure_modes"],
    queryFn: async (): Promise<FailureMode[]> => {
      const { data, error } = await extSupabase.from("failure_modes").select("*");
      if (error) throw error;
      return (data ?? []) as FailureMode[];
    },
  });
}

export function usePatentsByYear() {
  return useQuery({
    queryKey: ["ext", "patents", "by-year"],
    queryFn: async () => {
      // Fetch year column only, aggregate client-side (10k rows, single column ~ small payload)
      const { data, error } = await extSupabase
        .from("patents")
        .select("year")
        .not("year", "is", null);
      if (error) throw error;
      const counts = new Map<number, number>();
      for (const r of (data ?? []) as { year: number }[]) {
        counts.set(r.year, (counts.get(r.year) ?? 0) + 1);
      }
      return Array.from(counts.entries())
        .sort(([a], [b]) => a - b)
        .map(([year, count]) => ({ year, count }));
    },
  });
}

export function usePatentsTop(limit = 20) {
  return useQuery({
    queryKey: ["ext", "patents", "top", limit],
    queryFn: async (): Promise<Patent[]> => {
      const { data, error } = await extSupabase
        .from("patents")
        .select("*")
        .order("citations", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Patent[];
    },
  });
}

export function usePublicationsByYear() {
  return useQuery({
    queryKey: ["ext", "publications", "by-year"],
    queryFn: async () => {
      const { data, error } = await extSupabase
        .from("publications")
        .select("year")
        .not("year", "is", null);
      if (error) throw error;
      const counts = new Map<number, number>();
      for (const r of (data ?? []) as { year: number }[]) {
        counts.set(r.year, (counts.get(r.year) ?? 0) + 1);
      }
      return Array.from(counts.entries())
        .sort(([a], [b]) => a - b)
        .map(([year, count]) => ({ year, count }));
    },
  });
}

export function usePublicationsTop(limit = 20) {
  return useQuery({
    queryKey: ["ext", "publications", "top", limit],
    queryFn: async (): Promise<Publication[]> => {
      const { data, error } = await extSupabase
        .from("publications")
        .select("*")
        .order("citations", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Publication[];
    },
  });
}

export function useCorpusCounts() {
  return useQuery({
    queryKey: ["ext", "corpus-counts"],
    queryFn: async () => {
      const [p, pub, pi] = await Promise.all([
        extSupabase.from("patents").select("*", { count: "exact", head: true }),
        extSupabase.from("publications").select("*", { count: "exact", head: true }),
        extSupabase.from("pilots").select("*", { count: "exact", head: true }),
      ]);
      return {
        patents: p.count ?? 0,
        publications: pub.count ?? 0,
        pilots: pi.count ?? 0,
      };
    },
  });
}
