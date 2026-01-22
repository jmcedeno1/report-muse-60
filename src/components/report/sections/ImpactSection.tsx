import { impactData } from "@/data/reportData";
import { CollapsibleCard } from "../CollapsibleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Leaf, Battery, AlertTriangle, CheckCircle } from "lucide-react";

export function ImpactSection() {
  return (
    <section id="impact" className="scroll-mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Economic & Environmental Impact
      </h2>

      {/* Economic Impact */}
      <CollapsibleCard
        title={impactData.economic.title}
        icon={<DollarSign className="h-5 w-5 text-primary" />}
        defaultOpen={true}
        className="mb-6"
      >
        <div className="space-y-6">
          {/* Revenue Examples */}
          <div>
            <p className="font-medium text-foreground mb-3">Revenue Potential Examples</p>
            <div className="grid md:grid-cols-2 gap-3">
              {impactData.economic.revenueExamples.map((example) => (
                <div
                  key={example.source}
                  className="bg-muted/50 p-4 rounded-lg"
                >
                  <p className="font-medium text-foreground">{example.source}</p>
                  <p className="text-xl font-bold text-primary my-1">{example.potential}</p>
                  <p className="text-sm text-muted-foreground">{example.context}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Barriers */}
          <div>
            <p className="font-medium text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              Economic Barriers
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {impactData.economic.barriers.map((barrier) => (
                <div
                  key={barrier.barrier}
                  className="border border-border rounded-lg p-3"
                >
                  <p className="font-medium text-foreground mb-1">{barrier.barrier}</p>
                  <p className="text-sm text-muted-foreground mb-2">{barrier.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {barrier.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleCard>

      {/* Environmental Impact */}
      <CollapsibleCard
        title={impactData.environmental.title}
        icon={<Leaf className="h-5 w-5 text-primary" />}
        className="mb-6"
      >
        <div className="space-y-6">
          {/* Benefits */}
          <div>
            <p className="font-medium text-foreground mb-3">Environmental Benefits</p>
            <div className="grid gap-3">
              {impactData.environmental.benefits.map((benefit) => (
                <Card key={benefit.benefit}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {benefit.benefit}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{benefit.description}</p>
                    <Badge variant="secondary">{benefit.impact}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleCard>

      {/* Battery Degradation */}
      <CollapsibleCard
        title={impactData.environmental.batteryDegradation.title}
        icon={<Battery className="h-5 w-5 text-primary" />}
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            {impactData.environmental.batteryDegradation.summary}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-foreground text-sm mb-2">Degradation Factors</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {impactData.environmental.batteryDegradation.factors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span> {factor}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground text-sm mb-2">Mitigation Strategies</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {impactData.environmental.batteryDegradation.mitigation.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleCard>
    </section>
  );
}
