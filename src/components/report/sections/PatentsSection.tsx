import { useState } from "react";
import { Shield, TrendingUp, FileText, Globe, Layers, BarChart3, Loader2, Database, Activity, Sparkles, Waves, MinusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import {
  usePatentsByYear, usePatentsTopOrgs, usePatentsTopCountries, usePatentsThemes, useCorpusCounts,
  usePatentFamilies, type PatentFamily,
} from "@/hooks/useCloudData";
import { PatentFamilyDetailDialog } from "@/components/report/PatentFamilyDetailDialog";

const CHART_COLORS = [
  "hsl(232, 32%, 38%)",
  "hsl(231, 97%, 75%)",
  "hsl(231, 100%, 82%)",
  "hsl(330, 65%, 55%)",
  "hsl(210, 60%, 50%)",
  "hsl(220, 15%, 55%)",
];

function LoadingBlock({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> {label}
    </div>
  );
}

export function PatentsSection() {
  const counts = useCorpusCounts();
  const byYear = usePatentsByYear();
  const topOrgs = usePatentsTopOrgs(8);
  const topCountries = usePatentsTopCountries(8);
  const themes = usePatentsThemes(8);
  const families = usePatentFamilies();
  const [selectedFamily, setSelectedFamily] = useState<PatentFamily | null>(null);

  const total = counts.data?.patents ?? 0;
  const years = byYear.data ?? [];
  const yearsSpan = years.length ? `${years[0].year}–${years[years.length - 1].year}` : "—";
  const peakYear = years.length
    ? years.reduce((a, b) => (b.count > a.count ? b : a), years[0])
    : null;
  const themedCount = (themes.data ?? []).reduce((s, r) => s + r.count, 0);

  const summaryMetrics = [
    { label: "Patents in corpus", value: total.toLocaleString(), icon: FileText },
    { label: "Coverage", value: yearsSpan, icon: TrendingUp },
    { label: "Peak year", value: peakYear ? `${peakYear.year}` : "—", icon: BarChart3 },
    { label: "Countries", value: (topCountries.data?.length ?? 0).toString(), icon: Globe },
    { label: "Applicants (top)", value: (topOrgs.data?.length ?? 0).toString(), icon: Layers },
    { label: "Tagged patents", value: themedCount.toLocaleString(), icon: Shield },
  ];

  return (
    <section id="patents" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Patents & IP Landscape
        </h2>
        <Badge variant="outline" className="ml-auto text-xs">
          <Database className="h-3 w-3 mr-1" /> Live from verified corpus
        </Badge>
      </div>

      <p className="text-muted-foreground mb-8 leading-relaxed">
        Every figure below is aggregated live from the project's patent corpus
        (Lens.org export, focused on B60L11/18 and adjacent CPC classes covering
        bidirectional charging, V2G, V2H and inductive power transfer). Filings, top
        assignees, geographic distribution, and thematic tags are computed from the raw
        rows at page load, so what you see reflects the current dataset.
      </p>

      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-primary" />
            Patent Landscape Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {summaryMetrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="bg-background rounded-lg p-4 text-center border border-border/50">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{m.value}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-background rounded-lg p-4 border border-border/50">
            <h4 className="font-semibold text-sm mb-4 text-foreground">Patent filings per year</h4>
            {byYear.isLoading ? <LoadingBlock /> : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={years}>
                  <defs>
                    <linearGradient id="patentYearGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                    formatter={(v: number) => [`${v} patents`, "Filings"]}
                    labelFormatter={(l) => `Year ${l}`}
                  />
                  <Area type="monotone" dataKey="count" stroke={CHART_COLORS[0]} strokeWidth={2} fill="url(#patentYearGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Top applicants</h4>
              {topOrgs.isLoading ? <LoadingBlock /> : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={topOrgs.data ?? []} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => [`${v} patents`, "Patents"]} />
                    <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Top jurisdictions</h4>
              {topCountries.isLoading ? <LoadingBlock /> : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={topCountries.data ?? []} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="country" type="category" width={60} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => [`${v} patents`, "Patents"]} />
                    <Bar dataKey="count" fill={CHART_COLORS[1]} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {(themes.data?.length ?? 0) > 0 && (
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Thematic distribution (taxonomy tags)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={themes.data ?? []} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="count" nameKey="theme" label={(e) => e.theme}>
                    {(themes.data ?? []).map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number, _n, p: any) => [`${v} patents`, p.payload.theme]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" /> Patent families by technology
          </CardTitle>
          <p className="text-sm text-muted-foreground pt-1">
            Each patent in the corpus is matched by title and abstract to one or more V2G
            technology families. Maturity compares the annual filing rate over the last five
            years against the family's historical average.
          </p>
        </CardHeader>
        <CardContent>
          {families.isLoading ? <LoadingBlock /> : (
            <>
              <div className="flex flex-wrap gap-3 mb-6 text-xs">
                <MaturityLegend />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {(families.data ?? []).map((f) => (
                  <FamilyCard key={f.family} f={f} onClick={() => setSelectedFamily(f)} />
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <PatentFamilyDetailDialog
        family={selectedFamily}
        open={!!selectedFamily}
        onOpenChange={(o) => !o && setSelectedFamily(null)}
      />
    </section>
  );
}

const MATURITY_STYLES: Record<
  PatentFamily["maturity"],
  { label: string; icon: typeof Activity; badgeClass: string; ringClass: string; description: string }
> = {
  Growing:   { label: "Growing",   icon: TrendingUp,   badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30", ringClass: "ring-emerald-500/20", description: "Filing rate has accelerated 2× or more above the historical average." },
  Active:    { label: "Active",    icon: Activity,     badgeClass: "bg-primary/15 text-primary border-primary/30",                                     ringClass: "ring-primary/20",     description: "Filing rate is close to the historical average — steady development." },
  Saturated: { label: "Saturated", icon: MinusCircle,  badgeClass: "bg-muted text-muted-foreground border-border",                                     ringClass: "ring-border",         description: "Filing rate has slowed to below 70% of the historical average." },
  Emerging:  { label: "Emerging",  icon: Sparkles,     badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",           ringClass: "ring-amber-500/20",   description: "Small but recent corpus — an early-stage family to monitor." },
};

function MaturityLegend() {
  return (
    <>
      {(Object.keys(MATURITY_STYLES) as PatentFamily["maturity"][]).map((k) => {
        const s = MATURITY_STYLES[k];
        const Icon = s.icon;
        return (
          <span key={k} className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 ${s.badgeClass}`}>
            <Icon className="h-3 w-3" /> {s.label}
          </span>
        );
      })}
    </>
  );
}

function FamilyCard({ f, onClick }: { f: PatentFamily; onClick: () => void }) {
  const s = MATURITY_STYLES[f.maturity];
  const Icon = s.icon;
  const momentum = f.momentum ?? null;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg border border-border bg-background p-4 ring-1 ${s.ringClass} transition-all hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 cursor-pointer`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-semibold text-foreground text-sm leading-tight">{f.family}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {f.first_year}–{f.last_year}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium ${s.badgeClass}`}>
          <Icon className="h-3 w-3" /> {s.label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="rounded-md bg-muted/50 p-2 text-center">
          <p className="text-lg font-bold text-foreground leading-none">{f.total.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Total filings</p>
        </div>
        <div className="rounded-md bg-muted/50 p-2 text-center">
          <p className="text-lg font-bold text-foreground leading-none">{f.recent_annual_rate}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Recent per year</p>
        </div>
        <div className="rounded-md bg-muted/50 p-2 text-center">
          <p className="text-lg font-bold text-foreground leading-none">
            {momentum !== null ? `${momentum}×` : "—"}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">Momentum</p>
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-2">
        <div
          className="h-full bg-primary"
          style={{
            width: `${Math.min(100, Math.round((f.recent / Math.max(f.total, 1)) * 100))}%`,
          }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground">
        {Math.round((f.recent / Math.max(f.total, 1)) * 100)}% of filings in the last 5 years
      </p>
    </button>
  );
}
