import { Bus, Zap, Building2, BatteryCharging, ArrowLeftRight } from "lucide-react";

function BiFlow({ label }: { label: string }) {
  return (
    <div className="w-8 md:w-14 flex flex-col items-center gap-0.5">
      <div className="relative w-full h-6 flex items-center justify-center">
        <div className="w-full h-0.5 bg-primary/40 rounded-full" />
        <div className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-[flow-right_1s_ease-in-out_infinite]" />
        <div className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-[flow-left_1.2s_ease-in-out_infinite]" />
        <ArrowLeftRight className="absolute h-3 w-3 text-primary" />
      </div>
      <span className="text-[6px] md:text-[8px] font-mono text-primary">{label}</span>
    </div>
  );
}

export function LogisticsV2GAnimation() {
  return (
    <div className="relative w-full py-5 md:py-6 mb-6 rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50 overflow-hidden">
      <div className="flex items-center justify-center gap-0.5 md:gap-2 px-2 md:px-6">
        {/* Electric Buses (DER Assets) */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="flex gap-1">
            {[78, 65, 52].map((soc, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div className="p-1 md:p-1.5 rounded-lg bg-primary text-primary-foreground shadow-md">
                  <Bus className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </div>
                <div className="w-5 h-1 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${soc > 60 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${soc}%` }} />
                </div>
                <span className="text-[6px] text-muted-foreground">{soc}%</span>
              </div>
            ))}
          </div>
          <span className="text-[7px] md:text-[10px] font-medium text-foreground">Electric Buses</span>
          <span className="text-[6px] md:text-[8px] text-muted-foreground">DER Assets</span>
        </div>

        {/* Buses ↔ Chargers */}
        <BiFlow label="DC" />

        {/* Bidirectional Chargers (Grid Inverters) */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative p-2 md:p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <BatteryCharging className="h-5 w-5 md:h-6 md:w-6" />
            <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
          </div>
          <span className="text-[7px] md:text-[10px] font-medium text-foreground">Bidirectional Chargers</span>
          <span className="text-[6px] md:text-[8px] text-muted-foreground">Grid Inverters</span>
        </div>

        {/* Chargers ↔ Grid */}
        <BiFlow label="V2G" />

        {/* Power Grid (center - delivers to both chargers and buildings) */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="p-2 md:p-3 rounded-xl bg-card border border-border shadow-sm">
            <Zap className="h-5 w-5 md:h-7 md:w-7 text-primary" />
          </div>
          <span className="text-[7px] md:text-[10px] font-medium text-foreground">Power Grid</span>
          <span className="text-[6px] md:text-[8px] text-muted-foreground">V2G Services</span>
        </div>

        {/* Grid ↔ Sites & Buildings */}
        <BiFlow label="V2B/V2H" />

        {/* Sites & Buildings */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="p-2 md:p-3 rounded-xl bg-card border border-primary/40 shadow-sm shadow-primary/10">
            <Building2 className="h-5 w-5 md:h-7 md:w-7 text-muted-foreground" />
          </div>
          <span className="text-[7px] md:text-[10px] font-medium text-foreground">Sites & Buildings</span>
          <span className="text-[6px] md:text-[8px] text-muted-foreground">V2B / V2H</span>
        </div>
      </div>

      <p className="mt-4 text-center text-[9px] md:text-xs text-muted-foreground px-4">
        <span className="text-primary font-medium">Bidirectional power flow</span> — eBuses as DER assets exchange energy across the value chain
      </p>
    </div>
  );
}
