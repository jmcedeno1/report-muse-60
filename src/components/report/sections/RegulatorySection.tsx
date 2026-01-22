import { regulatoryFramework } from "@/data/reportData";
import { expertInsights, keyTakeaways } from "@/data/expertInsightsData";
import { CollapsibleCard } from "../CollapsibleCard";
import { ExpertQuoteCard } from "../ExpertQuoteCard";
import { TakeawayBox } from "../TakeawayBox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe, AlertCircle, ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export function RegulatorySection() {
  const [isStandardsOpen, setIsStandardsOpen] = useState(false);

  return (
    <section id="regulatory" className="scroll-mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Regulatory Framework
      </h2>

      {/* Regional Regulations */}
      <div className="space-y-4 mb-8">
        {regulatoryFramework.regions.map((region) => (
          <CollapsibleCard
            key={region.region}
            title={region.region}
            icon={<Globe className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">{region.overview}</p>

              <div>
                <p className="font-medium text-foreground mb-3">Key Policies</p>
                <div className="space-y-3">
                  {region.keyPolicies.map((policy) => (
                    <div
                      key={policy.policy}
                      className="border border-border rounded-lg p-3"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-medium text-foreground">{policy.policy}</span>
                        <Badge variant="outline">{policy.year}</Badge>
                        <Badge
                          variant={
                            policy.impact === "High"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {policy.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{policy.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  Regulatory Challenges
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {region.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span> {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleCard>
        ))}
      </div>

      {/* Standards Progress */}
      <Collapsible open={isStandardsOpen} onOpenChange={setIsStandardsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Standards Development Progress</CardTitle>
                <ChevronDown 
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                    isStandardsOpen ? "rotate-180" : ""
                  }`} 
                />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <TooltipProvider delayDuration={200}>
                <div className="space-y-4">
                  {regulatoryFramework.standardsProgress.map((item) => (
                    <Tooltip key={item.standard}>
                      <TooltipTrigger asChild>
                        <div className="cursor-pointer hover:bg-muted/50 rounded-md p-2 -mx-2 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-foreground text-sm">{item.standard}</span>
                            <span className="text-sm text-muted-foreground">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2 mb-1" />
                          <p className="text-xs text-muted-foreground">{item.status}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p className="text-sm">{item.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Expert Insights */}
      {expertInsights.regulatory?.map((quote) => (
        <ExpertQuoteCard key={quote.id} quote={quote} />
      ))}

      {/* Key Takeaways */}
      {keyTakeaways.regulatory && (
        <TakeawayBox 
          title="Regulatory Takeaways" 
          takeaways={keyTakeaways.regulatory} 
        />
      )}
    </section>
  );
}
