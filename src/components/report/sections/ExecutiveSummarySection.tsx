import { executiveSummary } from "@/data/reportData";
import { expertInsights, keyTakeaways } from "@/data/expertInsightsData";
import { StatCard } from "../StatCard";
import { UtrechtV2GAnimation } from "../UtrechtV2GAnimation";
import { ExpertQuoteCard } from "../ExpertQuoteCard";
import { TakeawayBox } from "../TakeawayBox";
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

      {/* Expert Vision Quote */}
      {expertInsights.overview?.[0] && (
        <ExpertQuoteCard quote={expertInsights.overview[0]} />
      )}

      <div className="prose prose-slate max-w-none mb-8">
        {/* First two paragraphs */}
        {paragraphs.slice(0, 2).map((paragraph, index) => (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}

        {/* Bidirectional Charging Animation */}
        <UtrechtV2GAnimation />

        {/* Remaining paragraphs */}
        {paragraphs.slice(2).map((paragraph, index) => (
          <p key={index + 2} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Market Scale Quote */}
      {expertInsights.overview?.[1] && (
        <ExpertQuoteCard quote={expertInsights.overview[1]} />
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {executiveSummary.keyStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Key Takeaways */}
      {keyTakeaways.overview && (
        <TakeawayBox 
          title="Executive Summary Takeaways" 
          takeaways={keyTakeaways.overview} 
          defaultOpen={true}
        />
      )}
    </section>
  );
}
