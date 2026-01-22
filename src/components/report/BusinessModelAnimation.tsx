import { useState } from "react";
import { 
  Network, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Users, 
  DollarSign, 
  Lightbulb,
  ChevronRight,
  ArrowRight,
  Building2,
  Car
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CustomerSegment {
  segment: string;
  example: string;
}

interface RevenueStream {
  stream: string;
  description: string;
}

interface BusinessModel {
  model: string;
  description: string;
  players: string[];
  valueProposition: string;
  customerSegments: CustomerSegment[];
  revenueStreams: RevenueStream[];
  icon: string;
}

interface BusinessModelAnimationProps {
  models: BusinessModel[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  TrendingUp,
  ShieldCheck,
  Truck,
  Building2,
  Car,
};

export function BusinessModelAnimation({ models }: BusinessModelAnimationProps) {
  const [activeModel, setActiveModel] = useState(0);
  const currentModel = models[activeModel];
  const IconComponent = iconMap[currentModel.icon] || Network;

  return (
    <div className="relative w-full py-6 mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-accent/10 border border-border/50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Model Selector Tabs */}
      <div className="relative flex flex-wrap justify-center gap-2 px-4 mb-6">
        {models.map((model, index) => {
          const TabIcon = iconMap[model.icon] || Network;
          return (
            <button
              key={model.model}
              onClick={() => setActiveModel(index)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300",
                activeModel === index
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <TabIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{model.model}</span>
            </button>
          );
        })}
      </div>

      {/* Main Animation Area */}
      <div className="relative px-4">
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Value Proposition - Left */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-xl">
                <Lightbulb className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl -z-10 animate-pulse" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Value Proposition</h4>
            <p className="text-xs text-muted-foreground leading-relaxed px-2">
              {currentModel.valueProposition}
            </p>
          </div>

          {/* Central Model Hub */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="p-5 md:p-6 rounded-2xl bg-card border-2 border-primary shadow-xl">
                <IconComponent className="h-10 w-10 md:h-12 md:w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{currentModel.model}</h3>
            <p className="text-xs text-muted-foreground mb-3 px-2">{currentModel.description}</p>
            <div className="flex flex-wrap justify-center gap-1">
              {currentModel.players.map((player) => (
                <Badge key={player} variant="secondary" className="text-xs">
                  {player}
                </Badge>
              ))}
            </div>
          </div>

          {/* Revenue Streams - Right */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="p-4 rounded-2xl bg-accent text-accent-foreground shadow-xl">
                <DollarSign className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-accent/30 blur-xl -z-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Revenue Streams</h4>
            <div className="space-y-1.5 px-2">
              {currentModel.revenueStreams.map((stream, idx) => (
                <div 
                  key={stream.stream} 
                  className="text-xs text-muted-foreground animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="font-medium text-foreground">{stream.stream}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flow Lines - Desktop */}
        <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 -translate-y-1/2 pointer-events-none">
          <div className="flex items-center justify-between px-8">
            <ArrowRight className="h-5 w-5 text-primary/40 animate-pulse" />
            <ArrowRight className="h-5 w-5 text-primary/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Customer Segments - Bottom */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Customer Segments</h4>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {currentModel.customerSegments.map((segment, idx) => (
              <div 
                key={segment.segment}
                className="group relative bg-card border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-all duration-300 cursor-default"
              >
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium text-foreground">{segment.segment}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5 pl-5">{segment.example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Label */}
      <div className="mt-6 text-center">
        <p className="text-xs md:text-sm text-muted-foreground">
          <span className="text-primary font-medium">Click tabs</span> to explore different business models
        </p>
      </div>
    </div>
  );
}
