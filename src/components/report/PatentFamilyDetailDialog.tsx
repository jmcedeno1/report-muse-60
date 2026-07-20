import { useMemo } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from "recharts";
import { Loader2, Target, Building2, Lightbulb, TrendingUp, Activity, MinusCircle, Sparkles } from "lucide-react";
import { usePatentFamilyRows, type PatentFamily } from "@/hooks/useCloudData";
import { PATENT_FAMILY_DETAILS, type SubTech } from "@/data/patentFamilyDetails";

type Maturity = PatentFamily["maturity"];

const MATURITY_META: Record<Maturity, { icon: typeof Activity; badgeClass: string }> = {
  Growing:   { icon: TrendingUp,  badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" },
  Active:    { icon: Activity,    badgeClass: "bg-primary/15 text-primary border-primary/30" },
  Saturated: { icon: MinusCircle, badgeClass: "bg-muted text-muted-foreground border-border" },
  Emerging:  { icon: Sparkles,    badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30" },
};

function classify(recent: number, older: number, total: number, yearsSpan: number): Maturity {
  if (total < 20) return "Emerging";
  const recentRate = recent / 5;
  const historicalRate = older / Math.max(yearsSpan - 5, 1);
  if (historicalRate === 0) return recent > 0 ? "Growing" : "Emerging";
  const ratio = recentRate / historicalRate;
  if (ratio >= 2) return "Growing";
  if (ratio >= 0.7) return "Active";
  return "Saturated";
}

export function PatentFamilyDetailDialog({
  family, open, onOpenChange,
}: {
  family: PatentFamily | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const familyName = family?.family ?? null;
  const query = usePatentFamilyRows(open ? familyName : null);
  const rows = query.data ?? [];
  const detail = familyName ? PATENT_FAMILY_DETAILS[familyName] : undefined;

  const currentYear = new Date().getFullYear();
  const recentCutoff = currentYear - 5;

  const analysis = useMemo(() => {
    if (!detail) return null;
    const subs = detail.subTechnologies.map((s) => {
      const re = new RegExp(s.pattern, "i");
      const matched = rows.filter((r) => re.test(`${r.title ?? ""} ${r.abstract ?? ""}`));
      const total = matched.length;
      const years = matched.map((m) => m.year).filter((y): y is number => !!y);
      const minY = years.length ? Math.min(...years) : currentYear;
      const yearsSpan = Math.max(currentYear - minY + 1, 1);
      const recent = matched.filter((m) => (m.year ?? 0) >= recentCutoff).length;
      const older = total - recent;
      return { ...s, total, recent, older, maturity: classify(recent, older, total, yearsSpan) };
    });

    // Yearly filings per sub-technology (last 10 years for readability)
    const startYear = currentYear - 9;
    const yearlyMap = new Map<number, Record<string, number>>();
    for (let y = startYear; y <= currentYear; y++) yearlyMap.set(y, {});
    for (const s of subs) {
      const re = new RegExp(s.pattern, "i");
      for (const r of rows) {
        if (!r.year || r.year < startYear || r.year > currentYear) continue;
        if (!re.test(`${r.title ?? ""} ${r.abstract ?? ""}`)) continue;
        const bucket = yearlyMap.get(r.year)!;
        bucket[s.label] = (bucket[s.label] ?? 0) + 1;
      }
    }
    const yearly = Array.from(yearlyMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([year, counts]) => ({ year, ...counts }));

    // Top assignees
    const orgCounts = new Map<string, number>();
    for (const r of rows) {
      for (const o of r.orgs ?? []) {
        if (!o) continue;
        orgCounts.set(o, (orgCounts.get(o) ?? 0) + 1);
      }
    }
    const topOrgs = Array.from(orgCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return { subs, yearly, topOrgs };
  }, [rows, detail, currentYear, recentCutoff]);

  if (!family) return null;

  const famMeta = MATURITY_META[family.maturity];
  const FamIcon = famMeta.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl">{family.family}</DialogTitle>
              <DialogDescription className="pt-1 leading-relaxed">
                {detail?.description ??
                  "Detailed technology description not available for this family yet."}
              </DialogDescription>
            </div>
            <span className={`shrink-0 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium ${famMeta.badgeClass}`}>
              <FamIcon className="h-3 w-3" /> {family.maturity}
            </span>
          </div>
        </DialogHeader>

        {query.isLoading || !analysis ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading verified corpus data…
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {/* Yearly trend by sub-technology */}
            <section className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Patent applications by sub-technology</h3>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer>
                  <LineChart data={analysis.yearly} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="year" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    {analysis.subs.map((s) => (
                      <Line
                        key={s.label}
                        type="monotone"
                        dataKey={s.label}
                        stroke={s.color}
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Sub-technology status overview */}
            <section className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Sub-technology status</h3>
                <span className="text-xs text-muted-foreground">
                  from {rows.length.toLocaleString()} matched patents
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {analysis.subs.map((s) => {
                  const m = MATURITY_META[s.maturity];
                  const Icon = m.icon;
                  return (
                    <div
                      key={s.label}
                      className="flex items-center justify-between gap-3 rounded-md bg-muted/40 px-3 py-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: s.color }}
                        />
                        <span className="text-sm font-medium truncate">{s.label}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {s.total}
                        </span>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${m.badgeClass}`}>
                        <Icon className="h-2.5 w-2.5" /> {s.maturity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Key players */}
            {analysis.topOrgs.length > 0 && (
              <section className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm">Key players</h3>
                  <span className="text-xs text-muted-foreground">by filings in this family</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.topOrgs.map(([org, count]) => (
                    <Badge key={org} variant="secondary" className="font-normal">
                      {org} <span className="ml-1.5 text-muted-foreground">· {count}</span>
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Strategic opportunities */}
            {detail?.opportunities?.length ? (
              <section className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm">Strategic opportunities</h3>
                </div>
                <ul className="space-y-1.5">
                  {detail.opportunities.map((o) => (
                    <li key={o} className="text-sm text-foreground/80 flex gap-2">
                      <span className="text-primary mt-1">•</span> <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export type { SubTech };
