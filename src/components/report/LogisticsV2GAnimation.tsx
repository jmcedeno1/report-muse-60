import { Bus, Zap, Building2, BatteryCharging, ArrowRight, ArrowLeft } from "lucide-react";

export function LogisticsV2GAnimation() {
  return (
    <div className="relative w-full py-5 md:py-6 mb-6 rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50 overflow-hidden">
      {/* Main layout: Grid ← Buses → Building */}
      <div className="flex items-center justify-center gap-1 md:gap-3 px-3 md:px-8">
        {/* Power Grid */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 md:p-3 rounded-xl bg-card border border-border shadow-sm">
            <Building2 className="h-5 w-5 md:h-7 md:w-7 text-primary" />
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">Power Grid</span>
          <span className="text-[7px] md:text-[8px] font-mono text-primary">V2G</span>
        </div>

        {/* Flow: Buses → Grid */}
        <div className="w-10 md:w-16 flex flex-col items-center gap-0.5">
          <div className="relative w-full h-6 flex items-center justify-center">
            <div className="w-full h-0.5 bg-primary/40 rounded-full" />
            <div className="absolute w-2 h-2 bg-primary rounded-full animate-[flow-left_1s_ease-in-out_infinite]" />
            <ArrowLeft className="absolute left-0 h-3 w-3 text-primary" />
          </div>
          <span className="text-[7px] md:text-[8px] font-mono text-primary">120 kW</span>
        </div>

        {/* eBus Fleet + Charger */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative p-2 md:p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <BatteryCharging className="h-5 w-5 md:h-6 md:w-6" />
            <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
          </div>
          <div className="flex gap-1.5 mt-1">
            {[78, 65, 52].map((soc, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div className="p-1.5 rounded-lg bg-primary text-primary-foreground shadow-md">
                  <Bus className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div className="w-6 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${soc > 60 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${soc}%` }} />
                </div>
                <span className="text-[7px] text-muted-foreground">{soc}%</span>
              </div>
            ))}
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground mt-1">eBus Fleet</span>
        </div>

        {/* Flow: Buses → Building */}
        <div className="w-10 md:w-16 flex flex-col items-center gap-0.5">
          <div className="relative w-full h-6 flex items-center justify-center">
            <div className="w-full h-0.5 bg-primary/40 rounded-full" />
            <div className="absolute w-2 h-2 bg-primary rounded-full animate-[flow-right_1s_ease-in-out_infinite]" />
            <ArrowRight className="absolute right-0 h-3 w-3 text-primary" />
          </div>
          <span className="text-[7px] md:text-[8px] font-mono text-primary">80 kW</span>
        </div>

        {/* Office Building */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 md:p-3 rounded-xl bg-card border border-primary/50 shadow-sm shadow-primary/20">
            <Building2 className="h-5 w-5 md:h-7 md:w-7 text-muted-foreground" />
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">Office</span>
          <span className="text-[7px] md:text-[8px] font-mono text-primary">V2B</span>
        </div>
      </div>

      <p className="mt-4 text-center text-[9px] md:text-xs text-muted-foreground px-4">
        <span className="text-primary font-medium">Electric buses as energy assets</span> — simultaneously powering buildings (V2B) and stabilizing the grid (V2G)
      </p>
    </div>
  );
}
