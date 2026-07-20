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
  return (
    <section id="challenges" className="scroll-mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Challenges & Future Outlook
      </h2>

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
