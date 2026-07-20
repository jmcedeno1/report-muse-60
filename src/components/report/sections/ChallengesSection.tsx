import { challengesAndFuture } from "@/data/reportData";
import { CollapsibleCard } from "../CollapsibleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Rocket, TrendingUp, TrendingDown, Minus, Database, Loader2 } from "lucide-react";
import { useFailureModes } from "@/hooks/useCloudData";
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const SEVERITY_COLORS: Record<string, string> = {
  High: "hsl(0, 72%, 55%)",
  Medium: "hsl(38, 92%, 55%)",
  Low: "hsl(220, 15%, 55%)",
};
const BAR_COLOR = "hsl(232, 32%, 38%)";

const getTrendIcon = (trend: string) => {
  if (trend.toLowerCase().includes("improving")) {
    return <TrendingUp className="h-3 w-3 text-primary" />;
  }
  if (trend.toLowerCase().includes("slowly")) {
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  }
  return <TrendingDown className="h-3 w-3 text-destructive" />;
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High":
      return "destructive";
    case "Medium":
      return "secondary";
    default:
      return "outline";
  }
};

export function ChallengesSection() {
  const failureModes = useFailureModes();

  const { byCategory, bySeverity, total } = useMemo(() => {
    const rows = failureModes.data ?? [];
    const cat = new Map<string, number>();
    const sev = new Map<string, number>();
    for (const r of rows) {
      const c = (r.category ?? "Uncategorized").trim() || "Uncategorized";
      const s = (r.severity ?? "Unknown").trim() || "Unknown";
      cat.set(c, (cat.get(c) ?? 0) + 1);
      sev.set(s, (sev.get(s) ?? 0) + 1);
    }
    return {
      byCategory: [...cat.entries()].map(([category, count]) => ({ category, count })).sort((a, b) => b.count - a.count),
      bySeverity: [...sev.entries()].map(([severity, count]) => ({ severity, count })),
      total: rows.length,
    };
  }, [failureModes.data]);

  return (
    <section id="challenges" className="scroll-mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Challenges & Future Outlook
      </h2>

      {/* Live gap categories from failure_modes */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Top Gap Categories from Pilot Failure Modes
            </CardTitle>
            <Badge variant="secondary" className="gap-1">
              <Database className="h-3 w-3" /> Live · {total} modes
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {failureModes.isLoading ? (
            <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading
            </div>
          ) : byCategory.length === 0 ? (
            <p className="text-sm text-muted-foreground">No failure modes indexed yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byCategory} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <XAxis type="number" allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis
                      type="category"
                      dataKey="category"
                      width={140}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                    />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                      cursor={{ fill: "hsl(var(--muted))" }}
                    />
                    <Bar dataKey="count" fill={BAR_COLOR} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground mb-2">By severity</p>
                {bySeverity
                  .sort((a, b) => b.count - a.count)
                  .map((s) => (
                    <div key={s.severity} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{ backgroundColor: SEVERITY_COLORS[s.severity] ?? BAR_COLOR }}
                        />
                        {s.severity}
                      </span>
                      <span className="text-muted-foreground">{s.count}</span>
                    </div>
                  ))}
                <p className="text-xs text-muted-foreground pt-3 border-t border-border mt-3">
                  Aggregated from {total} documented gaps across pilot deployments.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Challenges */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Current Challenges
        </h3>

        {challengesAndFuture.challenges.map((category) => (
          <CollapsibleCard key={category.category} title={`${category.category} Challenges`}>
            <div className="space-y-3">
              {category.items.map((item) => (
                <div
                  key={item.challenge}
                  className="border border-border rounded-lg p-3"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-medium text-foreground">{item.challenge}</span>
                    <Badge variant={getSeverityColor(item.severity) as "destructive" | "secondary" | "outline"}>
                      {item.severity}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {getTrendIcon(item.trend)}
                      {item.trend}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CollapsibleCard>
        ))}
      </div>

      {/* Future Trends */}
      <div>
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
          <Rocket className="h-5 w-5 text-primary" />
          Future Trends & Developments
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {challengesAndFuture.futureTrends.map((trend) => (
            <Card key={trend.trend}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{trend.trend}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{trend.description}</p>
                <Badge variant="outline">Expected: {trend.timeline}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
