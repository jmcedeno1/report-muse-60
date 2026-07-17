import { useMemo, useState } from "react";
import { FilterTabs } from "../FilterTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Zap, Globe, Database, AlertTriangle, DollarSign, Loader2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { usePilots, useFailureModes } from "@/hooks/useExternalData";
import type { Pilot } from "@/integrations/external-supabase/client";

type Region = "all" | "Europe" | "North America" | "Asia-Pacific" | "Other";
type Application = "all" | "V2G" | "V2H" | "V2B" | "V2X";
type Status = "all" | "active" | "completed" | "planned";

const CHART_COLORS = [
  "hsl(232, 32%, 38%)",
  "hsl(231, 97%, 75%)",
  "hsl(231, 100%, 82%)",
  "hsl(330, 65%, 55%)",
  "hsl(210, 60%, 50%)",
  "hsl(220, 15%, 55%)",
];

const EUROPE = new Set([
  "Denmark","Netherlands","Germany","France","United Kingdom","UK","Spain","Italy","Sweden","Norway","Finland","Belgium","Portugal","Ireland","Austria","Switzerland","Poland","Czech Republic","Greece","Estonia","Latvia","Lithuania","Iceland",
]);
const NORTH_AMERICA = new Set(["United States","USA","US","Canada","Mexico"]);
const ASIA_PACIFIC = new Set(["Japan","China","South Korea","Korea","Australia","New Zealand","India","Singapore","Taiwan","Thailand","Vietnam","Indonesia","Malaysia","Philippines"]);

function regionOf(country: string | null): Region {
  if (!country) return "Other";
  if (EUROPE.has(country)) return "Europe";
  if (NORTH_AMERICA.has(country)) return "North America";
  if (ASIA_PACIFIC.has(country)) return "Asia-Pacific";
  return "Other";
}

const regionOptions: { value: Region; label: string }[] = [
  { value: "all", label: "All Regions" },
  { value: "Europe", label: "Europe" },
  { value: "North America", label: "North America" },
  { value: "Asia-Pacific", label: "Asia-Pacific" },
  { value: "Other", label: "Other" },
];

const applicationOptions: { value: Application; label: string }[] = [
  { value: "all", label: "All Applications" },
  { value: "V2G", label: "V2G" },
  { value: "V2H", label: "V2H" },
  { value: "V2B", label: "V2B" },
  { value: "V2X", label: "V2X" },
];

const statusOptions: { value: Status; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "planned", label: "Planned" },
];

function formatUsd(n: number | null) {
  if (!n) return null;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function startYear(p: Pilot): string {
  return p.start_date ? new Date(p.start_date).getFullYear().toString() : "—";
}

export function PilotProjectsSection() {
  const [regionFilter, setRegionFilter] = useState<Region>("all");
  const [applicationFilter, setApplicationFilter] = useState<Application>("all");
  const [statusFilter, setStatusFilter] = useState<Status>("all");

  const { data: pilots, isLoading, error } = usePilots();
  const { data: failureModes } = useFailureModes();

  const failuresByPilot = useMemo(() => {
    const map = new Map<string, number>();
    for (const f of failureModes ?? []) {
      map.set(f.pilot_id, (map.get(f.pilot_id) ?? 0) + 1);
    }
    return map;
  }, [failureModes]);

  const all = pilots ?? [];

  const filtered = all.filter((p) => {
    const r = regionOf(p.country);
    const regionMatch = regionFilter === "all" || r === regionFilter;
    const appMatch = applicationFilter === "all" || (p.v2x_type ?? []).includes(applicationFilter);
    const statusMatch = statusFilter === "all" || (p.status ?? "").toLowerCase() === statusFilter;
    return regionMatch && appMatch && statusMatch;
  });

  // Aggregations
  const byRegion = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of all) {
      const r = regionOf(p.country);
      counts.set(r, (counts.get(r) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([region, projects]) => ({ region, projects }));
  }, [all]);

  const byApplication = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of all) {
      for (const t of p.v2x_type ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1;
    return Array.from(counts.entries()).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / total) * 100),
    }));
  }, [all]);

  const byStatus = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of all) {
      const s = p.status ?? "unknown";
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
    const total = all.length || 1;
    return Array.from(counts.entries()).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / total) * 100),
    }));
  }, [all]);

  const totals = useMemo(() => {
    const countries = new Set(all.map((p) => p.country).filter(Boolean));
    const fleet = all.reduce((s, p) => s + (p.fleet_size ?? 0), 0);
    const power = all.reduce((s, p) => s + (p.power_kw ?? 0), 0);
    const invest = all.reduce((s, p) => s + (p.investment_usd ?? 0), 0);
    return { countries: countries.size, fleet, power, invest };
  }, [all]);

  const metrics = [
    { label: "Pilot Projects", value: all.length.toString(), icon: Globe },
    { label: "Countries", value: totals.countries.toString(), icon: MapPin },
    { label: "Vehicles", value: totals.fleet.toLocaleString(), icon: Users },
    { label: "Power (MW)", value: (totals.power / 1000).toFixed(1), icon: Zap },
    { label: "Investment", value: formatUsd(totals.invest) ?? "—", icon: DollarSign },
    { label: "Data Source", value: "Verified DB", icon: Database },
  ];

  return (
    <section id="pilots" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Pilot Projects
        </h2>
        <Badge variant="outline" className="text-xs font-normal">
          <Database className="h-3 w-3 mr-1" />
          Live from verified V2G database
        </Badge>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground py-8">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading pilot projects…
        </div>
      )}
      {error && (
        <div className="text-sm text-destructive py-4">
          Failed to load pilots: {(error as Error).message}
        </div>
      )}

      {!isLoading && !error && (
        <>
          {/* Summary Dashboard */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Globe className="h-5 w-5 text-primary" />
                Global V2G Pilot Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="bg-background rounded-lg p-4 text-center border border-border/50"
                    >
                      <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* By Region */}
                <div className="bg-background rounded-lg p-4 border border-border/50">
                  <h4 className="font-semibold text-sm mb-4 text-foreground">Projects by Region</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={byRegion} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="region"
                        type="category"
                        width={80}
                        tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value} projects`, "Projects"]}
                      />
                      <Bar dataKey="projects" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* By Application */}
                <div className="bg-background rounded-lg p-4 border border-border/50">
                  <h4 className="font-semibold text-sm mb-4 text-foreground">By Application</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={byApplication}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        dataKey="count"
                        nameKey="type"
                      >
                        {byApplication.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number, _n, p: any) => [`${value} (${p.payload.percentage}%)`, p.payload.type]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    {byApplication.map((item, i) => (
                      <span key={item.type} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                        {item.type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* By Status */}
                <div className="bg-background rounded-lg p-4 border border-border/50">
                  <h4 className="font-semibold text-sm mb-4 text-foreground">By Status</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={byStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        dataKey="count"
                        nameKey="type"
                      >
                        {byStatus.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number, _n, p: any) => [`${value} (${p.payload.percentage}%)`, p.payload.type]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    {byStatus.map((item, i) => (
                      <span key={item.type} className="flex items-center gap-1 capitalize">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                        {item.type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <div className="space-y-3 mb-6">
            <FilterTabs
              options={regionOptions}
              value={regionFilter}
              onChange={(v) => setRegionFilter(v as Region)}
            />
            <FilterTabs
              options={applicationOptions}
              value={applicationFilter}
              onChange={(v) => setApplicationFilter(v as Application)}
            />
            <FilterTabs
              options={statusOptions}
              value={statusFilter}
              onChange={(v) => setStatusFilter(v as Status)}
            />
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing {filtered.length} of {all.length} pilot projects
          </p>

          <div className="grid gap-6">
            {filtered.map((p) => {
              const failureCount = failuresByPilot.get(p.id) ?? p.failure_mode_count ?? 0;
              return (
                <Card key={p.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <CardTitle className="text-lg">{p.name}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {(p.v2x_type ?? []).map((t) => (
                          <Badge key={t} variant="outline">{t}</Badge>
                        ))}
                        {p.status && (
                          <Badge
                            variant={p.status.toLowerCase() === "active" ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {p.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {[p.location, p.country].filter(Boolean).join(", ") || "—"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> Started {startYear(p)}
                      </span>
                      {p.fleet_size != null && (
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {p.fleet_size} vehicles
                        </span>
                      )}
                      {p.power_kw != null && (
                        <span className="flex items-center gap-1">
                          <Zap className="h-4 w-4" /> {p.power_kw} kW
                        </span>
                      )}
                      {formatUsd(p.investment_usd) && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" /> {formatUsd(p.investment_usd)}
                        </span>
                      )}
                    </div>

                    {p.description && (
                      <p className="text-muted-foreground">{p.description}</p>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      {(p.partners?.length ?? 0) > 0 && (
                        <div>
                          <p className="font-medium text-foreground text-sm mb-2">Partners</p>
                          <div className="flex flex-wrap gap-1">
                            {p.partners!.map((partner) => (
                              <Badge key={partner} variant="outline" className="text-xs">
                                {partner}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {(p.gap_categories?.length ?? 0) > 0 && (
                        <div>
                          <p className="font-medium text-foreground text-sm mb-2 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-primary" />
                            Reported Gaps {failureCount > 0 && `(${failureCount})`}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {p.gap_categories!.map((g) => (
                              <Badge key={g} variant="secondary" className="text-xs">
                                {g}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No projects match the selected filters.
            </p>
          )}
        </>
      )}
    </section>
  );
}
