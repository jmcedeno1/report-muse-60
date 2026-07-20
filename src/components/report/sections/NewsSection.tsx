import { useState } from "react";
import { Newspaper, Globe, ExternalLink, Loader2, Database, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNews, useNewsByDomain, useNewsByCountry } from "@/hooks/useCloudData";

const CHART_COLORS = ["hsl(232, 32%, 38%)", "hsl(231, 97%, 75%)"];

function formatDate(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch { return "—"; }
}

export function NewsSection() {
  const news = useNews(60);
  const byDomain = useNewsByDomain(8);
  const byCountry = useNewsByCountry(8);
  const [q, setQ] = useState("");

  const filtered = (news.data ?? []).filter((n) =>
    q === "" || (n.title ?? "").toLowerCase().includes(q.toLowerCase()) || (n.domain ?? "").toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <section id="news" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Newspaper className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          News & Media Coverage
        </h2>
        <Badge variant="outline" className="ml-auto text-xs">
          <Database className="h-3 w-3 mr-1" /> Live from GDELT
        </Badge>
      </div>

      <p className="text-muted-foreground mb-8 leading-relaxed">
        Global news coverage of vehicle-to-grid and bidirectional charging is ingested
        from the GDELT DOC 2.0 open dataset, which indexes worldwide broadcast, print
        and web news in real time. Each article below links to the original source; the
        distribution charts show which outlets and countries have covered the topic in
        the ingested window.
      </p>

      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="h-5 w-5 text-primary" />
            Coverage overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Top publishing domains</h4>
              {byDomain.isLoading ? (
                <div className="h-52 flex items-center justify-center"><Loader2 className="h-4 w-4 animate-spin" /></div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={byDomain.data ?? []} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="domain" type="category" width={160} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => [`${v} articles`, "Articles"]} />
                    <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Top source countries</h4>
              {byCountry.isLoading ? (
                <div className="h-52 flex items-center justify-center"><Loader2 className="h-4 w-4 animate-spin" /></div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={byCountry.data ?? []} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="country" type="category" width={60} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => [`${v} articles`, "Articles"]} />
                    <Bar dataKey="count" fill={CHART_COLORS[1]} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 relative max-w-md">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Filter articles by title or domain…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>

      {news.isLoading ? (
        <div className="h-40 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading news
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((n) => (
            <a
              key={n.id}
              href={n.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-medium text-foreground leading-snug flex-1">
                  {n.title ?? n.url}
                </h4>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 mt-1 opacity-60" />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDate(n.seen_date)}</span>
                {n.domain && <Badge variant="outline" className="text-xs">{n.domain}</Badge>}
                {n.source_country && <Badge variant="secondary" className="text-xs">{n.source_country}</Badge>}
              </div>
            </a>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-6">
              No articles match your filter.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
