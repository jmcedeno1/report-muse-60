import { Bus, Zap, Building2, BatteryCharging, ArrowLeftRight } from "lucide-react";

function BiArrow() {
  return (
    <div className="flex flex-col items-center justify-center shrink-0 px-1 md:px-2">
      <ArrowLeftRight className="h-5 w-5 md:h-6 md:w-6 text-primary/60" />
    </div>
  );
}

function NodeCard({
  icon,
  label,
  subtitle,
  gradientFrom,
  gradientTo,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 md:p-5 rounded-xl bg-card border border-border/60 shadow-sm min-w-[80px] md:min-w-[130px]">
      <div
        className="p-3 md:p-4 rounded-xl shadow-md"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {icon}
      </div>
      <span className="text-xs md:text-sm font-semibold text-foreground text-center leading-tight">
        {label}
      </span>
      <span className="text-[10px] md:text-xs text-muted-foreground text-center">
        {subtitle}
      </span>
    </div>
  );
}

export function LogisticsV2GAnimation() {
  return (
    <div className="relative w-full py-6 md:py-8 mb-6 rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/5 border border-border/50 overflow-hidden">
      {/* Title */}
      <p className="text-center text-xs md:text-sm text-primary font-medium mb-5 px-4">
        Bidirectional power flow across the energy value chain
      </p>

      {/* Cards row */}
      <div className="flex items-center justify-center gap-0 md:gap-1 px-3 md:px-6">
        <NodeCard
          icon={<Bus className="h-6 w-6 md:h-7 md:w-7 text-white" />}
          label="Electric Buses"
          subtitle="DER Assets"
          gradientFrom="hsl(195, 70%, 55%)"
          gradientTo="hsl(210, 60%, 45%)"
        />

        <BiArrow />

        <NodeCard
          icon={<BatteryCharging className="h-6 w-6 md:h-7 md:w-7 text-white" />}
          label="Bidirectional Chargers"
          subtitle="Grid Inverters"
          gradientFrom="hsl(160, 50%, 50%)"
          gradientTo="hsl(170, 45%, 40%)"
        />

        <BiArrow />

        <NodeCard
          icon={<Building2 className="h-6 w-6 md:h-7 md:w-7 text-white" />}
          label="Sites & Buildings"
          subtitle="V2B / V2H"
          gradientFrom="hsl(140, 45%, 50%)"
          gradientTo="hsl(150, 40%, 40%)"
        />

        <BiArrow />

        <NodeCard
          icon={<Zap className="h-6 w-6 md:h-7 md:w-7 text-white" />}
          label="Power Grid"
          subtitle="V2G Services"
          gradientFrom="hsl(30, 85%, 55%)"
          gradientTo="hsl(20, 80%, 48%)"
        />
      </div>

      {/* Legend */}
      <div className="mt-5 flex justify-center gap-4 md:gap-6 px-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
          <span className="text-[10px] md:text-xs text-muted-foreground">Power Flow</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowLeftRight className="h-3 w-3 text-primary/60" />
          <span className="text-[10px] md:text-xs text-muted-foreground">Bidirectional</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-[10px] md:text-xs text-muted-foreground">Active</span>
        </div>
      </div>
    </div>
  );
}
