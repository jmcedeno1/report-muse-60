import { useMemo } from "react";
import { useMarketStats } from "@/hooks/useCloudData";
import { CollapsibleCard } from "../CollapsibleCard";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const TRACKED_COUNTRIES = [
  "World", "China", "United States", "Germany", "United Kingdom",
  "France", "Norway", "Japan", "Netherlands", "Sweden",
];

const CHART_COLORS = ["#414A7F", "#8193FD", "#A1AFFF", "#5B6CB4", "#B8C4FF", "#2E355C", "#6E7FE0", "#C9D1FF", "#3F4A80", "#7D8CD1"];

export function LiveMarketPanel() {
  const salesQ = useMarketStats("Electric car sales");
  const stockQ = useMarketStats("Electric car stock");
  const shareQ = useMarketStats("Share of new cars that are electric");

  const salesSeries = useMemo(() => {
    const rows = salesQ.data ?? [];
    const byYear: Record<number, Record<string, number>> = {};
    for (const r of rows) {
      if (!TRACKED_COUNTRIES.includes(r.country)) continue;
      byYear[r.year] ??= { year: r.year } as Record<string, number>;
      byYear[r.year][r.country] = Number(r.value);
    }
    return Object.values(byYear).sort((a, b) => a.year - b.year);
  }, [salesQ.data]);

  const shareLatest = useMemo(() => {
    const rows = shareQ.data ?? [];
    const latest: Record<string, { country: string; year: number; value: number }> = {};
    for (const r of rows) {
      if (r.country === "World") continue;
      const prev = latest[r.country];
      if (!prev || r.year > prev.year) latest[r.country] = { country: r.country, year: r.year, value: Number(r.value) };
    }
    return Object.values(latest)
      .sort((a, b) => b.value - a.value)
      .slice(0, 12);
  }, [shareQ.data]);

  const worldStock = useMemo(() => {
    return (stockQ.data ?? [])
      .filter((r) => r.country === "World")
      .sort((a, b) => a.year - b.year)
      .map((r) => ({ year: r.year, stock: Number(r.value) / 1_000_000 }));
  }, [stockQ.data]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">Global EV stock (millions of vehicles)</h4>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={worldStock}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)} M`} />
                <Bar dataKey="stock" fill="#414A7F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">EV share of new car sales — latest year</h4>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={shareLatest} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                <YAxis dataKey="country" type="category" tick={{ fontSize: 11 }} width={90} />
                <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
                <Bar dataKey="value" fill="#8193FD" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground mb-2">Annual EV sales by market</h4>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={salesSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => (v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}M` : `${(v / 1_000).toFixed(0)}k`)} />
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {TRACKED_COUNTRIES.map((c, i) => (
                <Line key={c} type="monotone" dataKey={c} stroke={CHART_COLORS[i % CHART_COLORS.length]} dot={false} strokeWidth={2} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function MarketSection() {
  return (
    <section id="market" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Market & Key Players
        </h2>
        <Badge variant="secondary" className="text-xs">
          Live from IEA Global EV Outlook
        </Badge>
      </div>

      <CollapsibleCard
        title="Electric Vehicle Market — Verified Data"
        icon={<TrendingUp className="h-5 w-5 text-primary" />}
        defaultOpen={true}
        className="mb-6"
      >
        <p className="text-sm text-muted-foreground mb-4">
          Data sourced from the IEA Global EV Outlook via Our World in Data (CC-BY 4.0).
          Covers historical sales, stock, and adoption share for 40+ markets.
        </p>
        <LiveMarketPanel />
      </CollapsibleCard>
    </section>
  );
}
