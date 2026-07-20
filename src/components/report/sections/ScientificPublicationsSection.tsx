import { BookOpen, TrendingUp, FileText, Globe, BarChart3, Quote, Building, ExternalLink, Loader2, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import {
  usePublicationsByYear, usePublicationsTop, usePublicationsTopOrgs,
  usePublicationsTopCountries, usePublicationsThemes, useCorpusCounts,
  usePublicationsWithTags,
} from "@/hooks/useCloudData";
import { useMemo } from "react";

const CHART_COLORS = [
  "hsl(232, 32%, 38%)",
  "hsl(231, 97%, 75%)",
  "hsl(231, 100%, 82%)",
  "hsl(330, 65%, 55%)",
  "hsl(210, 60%, 50%)",
  "hsl(220, 15%, 55%)",
];

function LoadingBlock() {
  return (
    <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading
    </div>
  );
}

export function ScientificPublicationsSection() {
  const counts = useCorpusCounts();
  const byYear = usePublicationsByYear();
  const topOrgs = usePublicationsTopOrgs(8);
  const topCountries = usePublicationsTopCountries(8);
  const themes = usePublicationsThemes(8);
  const topCited = usePublicationsTop(15);

  const total = counts.data?.publications ?? 0;
  const years = byYear.data ?? [];
  const yearsSpan = years.length ? `${years[0].year}–${years[years.length - 1].year}` : "—";
  const peakYear = years.length
    ? years.reduce((a, b) => (b.count > a.count ? b : a), years[0])
    : null;

  const summaryMetrics = [
    { label: "Publications in corpus", value: total.toLocaleString(), icon: FileText },
    { label: "Coverage", value: yearsSpan, icon: TrendingUp },
    { label: "Peak year", value: peakYear ? `${peakYear.year}` : "—", icon: BarChart3 },
    { label: "Countries", value: (topCountries.data?.length ?? 0).toString(), icon: Globe },
    { label: "Institutions (top)", value: (topOrgs.data?.length ?? 0).toString(), icon: Building },
    { label: "Themes", value: (themes.data?.length ?? 0).toString(), icon: BookOpen },
  ];

  return (
    <section id="publications" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Scientific Publications
        </h2>
        <Badge variant="outline" className="ml-auto text-xs">
          <Database className="h-3 w-3 mr-1" /> Live from verified corpus
        </Badge>
      </div>

      <p className="text-muted-foreground mb-8 leading-relaxed">
        Publications are drawn from an OpenAlex + Lens.org search of bidirectional
        charging and V2G topics (2000–present), including grid integration, battery
        management, wireless power transfer, market design, and interoperability
        standards. Aggregations below are recomputed at page load from the raw
        records.
      </p>

      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-primary" />
            Publication Landscape Summary
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
            <h4 className="font-semibold text-sm mb-4 text-foreground">Publications per year</h4>
            {byYear.isLoading ? <LoadingBlock /> : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={years}>
                  <defs>
                    <linearGradient id="pubYearGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => [`${v} papers`, "Publications"]} labelFormatter={(l) => `Year ${l}`} />
                  <Area type="monotone" dataKey="count" stroke={CHART_COLORS[0]} strokeWidth={2} fill="url(#pubYearGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Top institutions</h4>
              {topOrgs.isLoading ? <LoadingBlock /> : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={topOrgs.data ?? []} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => [`${v} papers`, "Papers"]} />
                    <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Top countries</h4>
              {topCountries.isLoading ? <LoadingBlock /> : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={topCountries.data ?? []} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="country" type="category" width={60} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => [`${v} papers`, "Papers"]} />
                    <Bar dataKey="count" fill={CHART_COLORS[1]} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {(themes.data?.length ?? 0) > 0 && (
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Thematic distribution</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={themes.data ?? []} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="count" nameKey="theme" label={(e) => e.theme}>
                    {(themes.data ?? []).map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number, _n, p: any) => [`${v} papers`, p.payload.theme]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" /> Most-cited publications in the corpus
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
                    <TableHead className="w-[160px]">Source</TableHead>
                    <TableHead className="w-[90px] text-right">Citations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(topCited.data ?? []).map((p) => {
                    const link = p.doi ? `https://doi.org/${p.doi}` : p.url ?? null;
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="text-muted-foreground">{p.year ?? "—"}</TableCell>
                        <TableCell className="text-sm">
                          {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                              {p.title ?? p.uid}
                              <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                            </a>
                          ) : (
                            p.title ?? p.uid
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{p.source ?? "—"}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">{p.citations ?? 0}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
