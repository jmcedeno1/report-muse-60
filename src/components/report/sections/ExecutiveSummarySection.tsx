import { executiveSummary } from "@/data/reportData";
import { StatCard } from "../StatCard";
import { LogisticsV2GAnimation } from "../LogisticsV2GAnimation";
import { Zap, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCorpusCounts } from "@/hooks/useCloudData";

export function ExecutiveSummarySection() {
  const paragraphs = executiveSummary.summary.split("\n\n");
  const counts = useCorpusCounts();
  const corpusStats = [
    { label: "Patents (Lens.org)", value: counts.data?.patents.toLocaleString() ?? "—" },
    { label: "Publications (OpenAlex)", value: counts.data?.publications.toLocaleString() ?? "—" },
    { label: "Pilot projects", value: counts.data?.pilots.toLocaleString() ?? "—" },
    { label: "News articles (GDELT)", value: counts.data?.news.toLocaleString() ?? "—" },
  ];
  
  
  return (
    <section id="overview" className="scroll-mt-8">
      {/* EMRC Header Banner */}
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-4 border-primary">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase">EMRC Research Report</p>
            <p className="text-xs text-muted-foreground">Electric Mobility Research Center • LUT University</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {executiveSummary.title}
        </h1>
        <div className="w-24 h-1 bg-primary rounded-full mb-6" />
      </div>

      <div className="prose prose-slate max-w-none mb-8">
        {/* First two paragraphs */}
        {paragraphs.slice(0, 2).map((paragraph, index) => (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}

        {/* Logistics V2G Animation */}
        <LogisticsV2GAnimation />

        {/* Remaining paragraphs */}
        {paragraphs.slice(2).map((paragraph, index) => (
          <p key={index + 2} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {executiveSummary.keyStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="mt-8 p-5 rounded-xl border border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2 mb-3">
          <Database className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">Verified evidence base</p>
          <Badge variant="outline" className="text-xs">live</Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Numbers below are read directly from the report's Lovable Cloud database at page load.
          Every downstream section (Patents, Publications, Pilots, News) aggregates from the same rows.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {corpusStats.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </div>
    </section>
  );
}
