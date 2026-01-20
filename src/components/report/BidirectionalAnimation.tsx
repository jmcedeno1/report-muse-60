import { Car, Home, Zap, Building2 } from "lucide-react";

export function BidirectionalAnimation() {
  return (
    <div className="relative w-full py-8 mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="relative flex items-center justify-center gap-4 md:gap-8 px-4">
        {/* Grid/Home Side */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="p-4 md:p-5 rounded-2xl bg-card border border-border shadow-lg">
              <Home className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
          </div>
          <span className="text-xs md:text-sm font-medium text-muted-foreground">Home</span>
        </div>

        {/* Energy Flow Line - V2H */}
        <div className="relative flex-1 max-w-[120px] md:max-w-[180px] h-12 flex items-center">
          {/* Line */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-border" />
          
          {/* Animated energy particles - V2H direction (right to left) */}
          <div className="absolute inset-x-0 flex items-center justify-center">
            <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary animate-v2h-flow" />
          </div>
          <div className="absolute inset-x-0 flex items-center justify-center" style={{ animationDelay: '1s' }}>
            <Zap className="h-3 w-3 md:h-4 md:w-4 text-primary/60 animate-v2h-flow" style={{ animationDelay: '1.5s' }} />
          </div>
          
          {/* Direction label */}
          <div className="absolute -top-5 inset-x-0 text-center">
            <span className="text-[10px] md:text-xs text-primary font-medium">V2H</span>
          </div>
        </div>

        {/* EV in the center */}
        <div className="flex flex-col items-center gap-2 z-10">
          <div className="relative">
            <div className="p-5 md:p-6 rounded-2xl bg-primary text-primary-foreground shadow-xl">
              <Car className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            {/* Battery indicator */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
              <div className="w-1.5 h-3 md:w-2 md:h-4 rounded-sm bg-green-500 animate-pulse" style={{ animationDelay: '0s' }} />
              <div className="w-1.5 h-3 md:w-2 md:h-4 rounded-sm bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-3 md:w-2 md:h-4 rounded-sm bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
              <div className="w-1.5 h-3 md:w-2 md:h-4 rounded-sm bg-green-400/50 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl -z-10" />
          </div>
          <span className="text-xs md:text-sm font-semibold text-foreground">Electric Vehicle</span>
        </div>

        {/* Energy Flow Line - V2G */}
        <div className="relative flex-1 max-w-[120px] md:max-w-[180px] h-12 flex items-center">
          {/* Line */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-border" />
          
          {/* Animated energy particles - V2G direction (left to right) */}
          <div className="absolute inset-x-0 flex items-center justify-center">
            <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary animate-v2g-flow" />
          </div>
          <div className="absolute inset-x-0 flex items-center justify-center">
            <Zap className="h-3 w-3 md:h-4 md:w-4 text-primary/60 animate-v2g-flow" style={{ animationDelay: '1.5s' }} />
          </div>
          
          {/* Direction label */}
          <div className="absolute -top-5 inset-x-0 text-center">
            <span className="text-[10px] md:text-xs text-primary font-medium">V2G</span>
          </div>
        </div>

        {/* Grid Side */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="p-4 md:p-5 rounded-2xl bg-card border border-border shadow-lg">
              <Building2 className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-20" style={{ animationDuration: '2.5s' }} />
          </div>
          <span className="text-xs md:text-sm font-medium text-muted-foreground">Grid</span>
        </div>
      </div>

      {/* Bottom label */}
      <div className="mt-6 text-center">
        <p className="text-xs md:text-sm text-muted-foreground">
          <span className="text-primary font-medium">Bidirectional Charging</span> enables EVs to power homes and stabilize the grid
        </p>
      </div>
    </div>
  );
}
