import { executiveSummary } from "@/data/reportData";
import { StatCard } from "../StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, TrendingUp, Battery, Globe, Building, FileText, Microscope, Scale } from "lucide-react";

const keyHighlights = [
  { icon: TrendingUp, label: "Market CAGR", value: "20-50%", color: "text-green-500" },
  { icon: Battery, label: "V2G-Ready EVs", value: "15+", color: "text-blue-500" },
  { icon: Globe, label: "Active Pilots", value: "50+", color: "text-purple-500" },
  { icon: Building, label: "Key Players", value: "30+", color: "text-orange-500" },
  { icon: FileText, label: "Patent Families", value: "500+", color: "text-cyan-500" },
  { icon: Microscope, label: "Publications", value: "3,473", color: "text-pink-500" },
  { icon: Scale, label: "Standards", value: "ISO/IEC", color: "text-yellow-500" },
  { icon: Zap, label: "Power Range", value: "3-350kW", color: "text-emerald-500" },
];

export function ExecutiveSummarySection() {
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
        {executiveSummary.summary.split("\n\n").map((paragraph, index) => (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Key Highlights Visual Summary */}
      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-muted/30 to-muted/10">
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Report Highlights at a Glance
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {keyHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className={`p-2 rounded-md bg-muted ${item.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {executiveSummary.keyStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
