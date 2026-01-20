import { executiveSummary } from "@/data/reportData";
import { StatCard } from "../StatCard";
import { BidirectionalAnimation } from "../BidirectionalAnimation";
import { Zap } from "lucide-react";

export function ExecutiveSummarySection() {
  const paragraphs = executiveSummary.summary.split("\n\n");
  
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
        {/* First three paragraphs */}
        {paragraphs.slice(0, 3).map((paragraph, index) => (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}

        {/* Bidirectional Charging Animation */}
        <BidirectionalAnimation />

        {/* Remaining paragraphs */}
        {paragraphs.slice(3).map((paragraph, index) => (
          <p key={index + 3} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {executiveSummary.keyStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
