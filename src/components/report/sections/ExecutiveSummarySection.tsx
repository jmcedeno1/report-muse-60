import { executiveSummary } from "@/data/reportData";
import { StatCard } from "../StatCard";

export function ExecutiveSummarySection() {
  return (
    <section id="overview" className="scroll-mt-8">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {executiveSummary.keyStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
