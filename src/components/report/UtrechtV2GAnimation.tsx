import { Car, Zap, Building2, Wind, Sun, BatteryCharging, Flame, Atom } from "lucide-react";

export function UtrechtV2GAnimation() {
  return (
    <div className="relative w-full py-6 mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50">
      {/* Title */}
      <div className="text-center mb-4 px-4">
        <span className="text-xs md:text-sm font-semibold text-primary">Vehicle-to-Grid (V2G) Energy Flow</span>
      </div>

      {/* Horizontal Layout: Energy Sources → Grid → Charger → Cars */}
      <div className="relative flex items-center justify-center gap-2 md:gap-4 px-4">
        
        {/* Energy Sources (Left) */}
        <div className="flex flex-col items-center gap-2">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-1.5 md:p-2 rounded-lg bg-card border border-border shadow-sm">
              <Sun className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
            </div>
            <div className="p-1.5 md:p-2 rounded-lg bg-card border border-border shadow-sm">
              <Wind className="h-4 w-4 md:h-5 md:w-5 text-sky-500" />
            </div>
            <div className="p-1.5 md:p-2 rounded-lg bg-card border border-border shadow-sm">
              <Flame className="h-4 w-4 md:h-5 md:w-5 text-orange-500" />
            </div>
            <div className="p-1.5 md:p-2 rounded-lg bg-card border border-border shadow-sm">
              <Atom className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />
            </div>
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground">Power Sources</span>
        </div>

        {/* Flow Arrow */}
        <div className="flex items-center">
          <div className="w-4 md:w-8 h-0.5 bg-gradient-to-r from-muted-foreground/30 to-primary" />
          <Zap className="h-3 w-3 md:h-4 md:w-4 text-primary animate-pulse" />
        </div>

        {/* Grid */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 md:p-3 rounded-xl bg-card border border-border shadow-md">
            <Building2 className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground">Grid</span>
        </div>

        {/* Bidirectional Flow */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center">
            <Zap className="h-3 w-3 text-green-500 animate-v2g-flow" />
            <div className="w-4 md:w-8 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary" />
            <Zap className="h-3 w-3 text-blue-500 animate-v2h-flow" />
          </div>
          <div className="flex gap-1 text-[8px] md:text-[10px]">
            <span className="text-green-500 font-medium">V2G</span>
            <span className="text-muted-foreground">↔</span>
            <span className="text-blue-500 font-medium">G2V</span>
          </div>
        </div>

        {/* Bidirectional Charger (Center) */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative p-3 md:p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <BatteryCharging className="h-6 w-6 md:h-8 md:w-8" />
            <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-md -z-10" />
          </div>
          <span className="text-[10px] md:text-xs font-medium text-foreground">Charger</span>
        </div>

        {/* Flow Arrow */}
        <div className="flex items-center">
          <Zap className="h-3 w-3 md:h-4 md:w-4 text-primary animate-pulse" />
          <div className="w-4 md:w-8 h-0.5 bg-gradient-to-r from-primary to-primary/50" />
        </div>

        {/* EVs (Right) */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <div 
                key={index}
                className={`p-1.5 md:p-2 rounded-lg ${
                  index === 1 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-card border border-border text-primary'
                }`}
              >
                <Car className="h-4 w-4 md:h-5 md:w-5" />
              </div>
            ))}
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground">EV Fleet</span>
        </div>
      </div>

      {/* Bottom label */}
      <div className="mt-4 text-center px-4">
        <p className="text-[10px] md:text-xs text-muted-foreground">
          <span className="text-primary font-medium">Bidirectional Charging</span> enables EVs to power homes and stabilize the grid
        </p>
      </div>
    </div>
  );
}
