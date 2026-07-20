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
  const topCited = usePatentsTop(15);

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
            <Quote className="h-5 w-5 text-primary" /> Most-cited patents in the corpus
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topCited.isLoading ? <LoadingBlock /> : (
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[70px]">Year</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-[180px]">Assignee</TableHead>
                    <TableHead className="w-[90px] text-right">Citations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(topCited.data ?? []).map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-muted-foreground">{p.year ?? "—"}</TableCell>
                      <TableCell className="text-sm">
                        {p.url ? (
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                            {p.title ?? p.uid}
                            <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                          </a>
                        ) : (
                          p.title ?? p.uid
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {(p.orgs ?? []).slice(0, 2).join(", ") || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{p.citations ?? 0}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
