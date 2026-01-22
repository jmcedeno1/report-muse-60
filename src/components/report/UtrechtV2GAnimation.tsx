import { Car, Zap, Building2, Wind, Sun, BatteryCharging, Flame, Atom, Home, Factory, Lightbulb } from "lucide-react";

export function UtrechtV2GAnimation() {
  return (
    <div className="relative w-full py-6 mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50">
      {/* Title */}
      <div className="text-center mb-4 px-4">
        <span className="text-xs md:text-sm font-semibold text-primary">Vehicle-to-Grid (V2G) Energy Flow</span>
      </div>

      {/* Main Horizontal Layout */}
      <div className="relative flex items-center justify-center gap-2 md:gap-3 px-2 md:px-4">
        
        {/* Energy Sources (Left) */}
        <div className="flex flex-col items-center gap-1">
          <div className="grid grid-cols-2 gap-1">
            <div className="p-1 md:p-1.5 rounded-lg bg-card border border-border shadow-sm">
              <Sun className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
            </div>
            <div className="p-1 md:p-1.5 rounded-lg bg-card border border-border shadow-sm">
              <Wind className="h-3 w-3 md:h-4 md:w-4 text-sky-500" />
            </div>
            <div className="p-1 md:p-1.5 rounded-lg bg-card border border-border shadow-sm">
              <Flame className="h-3 w-3 md:h-4 md:w-4 text-orange-500" />
            </div>
            <div className="p-1 md:p-1.5 rounded-lg bg-card border border-border shadow-sm">
              <Atom className="h-3 w-3 md:h-4 md:w-4 text-purple-500" />
            </div>
          </div>
          <span className="text-[8px] md:text-[10px] text-muted-foreground">Sources</span>
        </div>

        {/* Flow Arrow to Grid */}
        <div className="flex items-center">
          <div className="w-3 md:w-6 h-0.5 bg-gradient-to-r from-muted-foreground/30 to-primary" />
          <Zap className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary" />
        </div>

        {/* Grid */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-1.5 md:p-2 rounded-xl bg-card border border-border shadow-md">
            <Building2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>
          <span className="text-[8px] md:text-[10px] text-muted-foreground">Grid</span>
        </div>

        {/* Bidirectional Flow */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-0.5">
            <Zap className="h-2.5 w-2.5 text-green-500 animate-v2g-flow" />
            <div className="w-3 md:w-6 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary" />
            <Zap className="h-2.5 w-2.5 text-blue-500 animate-v2h-flow" />
          </div>
          <div className="flex gap-0.5 text-[7px] md:text-[9px]">
            <span className="text-green-500 font-medium">V2G</span>
            <span className="text-muted-foreground">↔</span>
            <span className="text-blue-500 font-medium">G2V</span>
          </div>
        </div>

        {/* Bidirectional Charger (Center) */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative p-2 md:p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <BatteryCharging className="h-5 w-5 md:h-6 md:w-6" />
            <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-md -z-10" />
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">Charger</span>
        </div>

        {/* Flow Arrow to EVs */}
        <div className="flex items-center">
          <Zap className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary" />
          <div className="w-3 md:w-6 h-0.5 bg-gradient-to-r from-primary to-primary/50" />
        </div>

        {/* EVs */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-0.5">
            {[0, 1].map((index) => (
              <div 
                key={index}
                className={`p-1 md:p-1.5 rounded-lg ${
                  index === 0 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-card border border-border text-primary'
                }`}
              >
                <Car className="h-3 w-3 md:h-4 md:w-4" />
              </div>
            ))}
          </div>
          <span className="text-[8px] md:text-[10px] text-muted-foreground">EVs</span>
        </div>

        {/* V2X Flow - To Loads */}
        <div className="flex items-center">
          <div className="w-3 md:w-6 h-0.5 bg-gradient-to-r from-green-500/50 to-green-500" />
          <Zap className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-500 animate-pulse" />
        </div>

        {/* Loads (Right) - Homes, Buildings, Other */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-0.5">
              <div className="p-1 md:p-1.5 rounded-lg bg-card border border-border shadow-sm">
                <Home className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
              </div>
              <div className="p-1 md:p-1.5 rounded-lg bg-card border border-border shadow-sm">
                <Factory className="h-3 w-3 md:h-4 md:w-4 text-slate-600" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="p-1 md:p-1.5 rounded-lg bg-card border border-border shadow-sm">
                <Lightbulb className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
              </div>
            </div>
          </div>
          <span className="text-[8px] md:text-[10px] text-muted-foreground">Loads</span>
        </div>
      </div>

      {/* V2X Labels */}
      <div className="mt-3 flex justify-center gap-2 md:gap-4 px-4">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-[8px] md:text-[10px] text-green-600 font-medium">V2H</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-[8px] md:text-[10px] text-blue-600 font-medium">V2B</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[8px] md:text-[10px] text-primary font-medium">V2G</span>
        </div>
      </div>

      {/* Bottom label */}
      <div className="mt-3 text-center px-4">
        <p className="text-[9px] md:text-xs text-muted-foreground">
          <span className="text-primary font-medium">Bidirectional Charging</span> powers homes, buildings & loads while stabilizing the grid
        </p>
      </div>
    </div>
  );
}
