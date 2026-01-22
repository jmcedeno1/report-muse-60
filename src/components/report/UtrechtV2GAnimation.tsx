import { Car, Zap, Building2, TreePine, Wind, Sun } from "lucide-react";

export function UtrechtV2GAnimation() {
  return (
    <div className="relative w-full py-8 mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50">
      {/* Background city pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>

      {/* Title Banner */}
      <div className="relative text-center mb-6 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs md:text-sm font-semibold text-primary">Utrecht V2G Pilot — Europe's First Large-Scale Car-Sharing Fleet</span>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-6 px-4">
        {/* Top Row: Renewable Sources */}
        <div className="flex items-center justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center gap-1">
            <div className="p-3 rounded-xl bg-card border border-border shadow-md">
              <Sun className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground">Solar</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="p-3 rounded-xl bg-card border border-border shadow-md">
              <Wind className="h-6 w-6 md:h-8 md:w-8 text-sky-500 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground">Wind</span>
          </div>
        </div>

        {/* Energy Flow Down */}
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-6 bg-gradient-to-b from-yellow-500/50 via-primary to-primary/50" />
          <Zap className="h-4 w-4 text-primary animate-bounce" style={{ animationDuration: '1.5s' }} />
          <div className="w-0.5 h-6 bg-gradient-to-b from-primary/50 to-primary" />
        </div>

        {/* City Grid Hub */}
        <div className="relative">
          <div className="p-4 md:p-5 rounded-2xl bg-card border-2 border-primary/30 shadow-xl">
            <Building2 className="h-8 w-8 md:h-10 md:w-10 text-primary" />
          </div>
          <div className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[8px] md:text-[10px] font-bold">
            GRID
          </div>
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-20" style={{ animationDuration: '2s' }} />
        </div>

        {/* Bidirectional Flow Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-green-500 animate-v2g-flow" />
            <span className="text-[10px] text-green-500 font-medium">V2G</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-blue-500 font-medium">G2V</span>
            <Zap className="h-3 w-3 text-blue-500 animate-v2h-flow" />
          </div>
        </div>

        {/* Car-Sharing Fleet */}
        <div className="relative w-full max-w-md">
          {/* Charging Station Background */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
          
          {/* Fleet of Cars */}
          <div className="relative flex items-center justify-center gap-3 md:gap-6 py-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Charging Cable */}
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-primary/60"
                  style={{ opacity: index % 2 === 0 ? 1 : 0.3 }}
                />
                
                {/* Car */}
                <div 
                  className={`relative p-2 md:p-3 rounded-xl transition-all duration-500 ${
                    index % 2 === 0 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                      : 'bg-card border border-border text-primary'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.3}s`,
                  }}
                >
                  <Car className="h-5 w-5 md:h-6 md:w-6" />
                  
                  {/* Charging indicator */}
                  {index % 2 === 0 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>
                
                {/* Battery level */}
                <div className="mt-1 flex gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1 h-2 rounded-sm ${
                        i < (index % 2 === 0 ? 4 - Math.floor(index / 2) : 2 + index) 
                          ? 'bg-green-500' 
                          : 'bg-muted'
                      }`}
                      style={{ 
                        animationDelay: `${i * 0.2}s`,
                        animation: index % 2 === 0 ? 'pulse 2s infinite' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Utrecht Skyline */}
        <div className="flex items-end justify-center gap-1 md:gap-2 opacity-40">
          <div className="w-3 md:w-4 h-8 md:h-12 bg-muted-foreground/30 rounded-t-sm" />
          <div className="w-4 md:w-6 h-12 md:h-16 bg-muted-foreground/40 rounded-t-sm" />
          <TreePine className="h-6 w-6 md:h-8 md:w-8 text-green-600/50" />
          <div className="w-5 md:w-8 h-16 md:h-20 bg-muted-foreground/30 rounded-t-sm" />
          <div className="w-3 md:w-5 h-10 md:h-14 bg-muted-foreground/40 rounded-t-sm" />
          <TreePine className="h-5 w-5 md:h-7 md:w-7 text-green-600/50" />
          <div className="w-4 md:w-6 h-14 md:h-18 bg-muted-foreground/30 rounded-t-sm" />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-6 mx-4 p-3 rounded-lg bg-card/50 border border-border/50">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-center">
          <div>
            <p className="text-lg md:text-xl font-bold text-primary">150+</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Shared EVs</p>
          </div>
          <div className="w-px h-8 bg-border hidden md:block" />
          <div>
            <p className="text-lg md:text-xl font-bold text-primary">1,000+</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Charging Points</p>
          </div>
          <div className="w-px h-8 bg-border hidden md:block" />
          <div>
            <p className="text-lg md:text-xl font-bold text-primary">10 MW</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Grid Capacity</p>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="mt-4 text-center px-4">
        <p className="text-xs md:text-sm text-muted-foreground">
          <span className="text-primary font-medium">We Drive Solar</span> — Pioneering V2G car-sharing since 2019
        </p>
      </div>
    </div>
  );
}
