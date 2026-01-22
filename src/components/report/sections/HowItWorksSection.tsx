import { useState } from "react";
import { howItWorks } from "@/data/reportData";
import { expertInsights, keyTakeaways } from "@/data/expertInsightsData";
import { CollapsibleCard } from "../CollapsibleCard";
import { FilterTabs } from "../FilterTabs";
import { ExpertQuoteCard } from "../ExpertQuoteCard";
import { TakeawayBox } from "../TakeawayBox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Home, Plug, CheckCircle, XCircle } from "lucide-react";

type ApplicationType = "all" | "v2g" | "v2h" | "v2l";

const applicationIcons = {
  v2g: Zap,
  v2h: Home,
  v2l: Plug,
};

const filterOptions: { value: ApplicationType; label: string }[] = [
  { value: "all", label: "All Applications" },
  { value: "v2g", label: "V2G" },
  { value: "v2h", label: "V2H" },
  { value: "v2l", label: "V2L" },
];

export function HowItWorksSection() {
  const [applicationFilter, setApplicationFilter] = useState<ApplicationType>("all");

  const filteredApplications = howItWorks.applicationTypes.filter(
    (app) => applicationFilter === "all" || app.id === applicationFilter
  );

  return (
    <section id="how-it-works" className="scroll-mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        How Bidirectional Charging Works
      </h2>

      {/* Basic Principles */}
      <CollapsibleCard
        title={howItWorks.basicPrinciples.title}
        defaultOpen={true}
        className="mb-6"
      >
        <div className="prose prose-slate max-w-none">
          {howItWorks.basicPrinciples.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </CollapsibleCard>

      {/* V1G vs V2G Comparison */}
      <CollapsibleCard
        title={howItWorks.v1gVsV2g.title}
        className="mb-6"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {howItWorks.v1gVsV2g.items.map((item) => (
            <Card key={item.type} className="border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-primary" /> Benefits
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {item.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-muted-foreground" /> Limitations
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {item.limitations.map((limitation, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span> {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CollapsibleCard>

      {/* Application Types */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">Application Types</h3>
        <FilterTabs
          options={filterOptions}
          value={applicationFilter}
          onChange={(value) => setApplicationFilter(value as ApplicationType)}
        />
      </div>

      <div className="grid gap-4">
        {filteredApplications.map((app) => {
          const Icon = applicationIcons[app.id as keyof typeof applicationIcons];
          return (
            <Card key={app.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {Icon && <Icon className="h-5 w-5 text-primary" />}
                  {app.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{app.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Use Cases</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {app.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span> {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Revenue/Value Potential</p>
                    <Badge variant="secondary" className="text-sm">
                      {app.revenue}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Expert Insight */}
      {expertInsights.howItWorks?.[0] && (
        <ExpertQuoteCard quote={expertInsights.howItWorks[0]} className="mt-6" />
      )}

      {/* Key Takeaways */}
      {keyTakeaways.howItWorks && (
        <TakeawayBox 
          title="How It Works Takeaways" 
          takeaways={keyTakeaways.howItWorks} 
        />
      )}
    </section>
  );
}
