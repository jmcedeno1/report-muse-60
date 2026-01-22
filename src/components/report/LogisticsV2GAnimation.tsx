import { useState, useEffect } from "react";
import { Truck, Zap, Building2, Factory, BatteryCharging, Activity, ArrowRight, ArrowLeft, ArrowLeftRight } from "lucide-react";

type EnergyMode = "grid-import" | "v2f" | "v2g";

const modeConfig = {
  "grid-import": {
    label: "Grid Import",
    description: "Charging trucks from grid",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  "v2f": {
    label: "V2F Mode",
    description: "Trucks powering facility",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
  "v2g": {
    label: "V2G Mode",
    description: "Grid stabilization active",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
};

// Truck with battery SOC bar
function TruckWithBattery({ soc, index, isActive }: { soc: number; index: number; isActive: boolean }) {
  return (
    <div className={`relative flex flex-col items-center transition-all duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}>
      <div className={`p-1.5 md:p-2 rounded-lg ${isActive ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card border border-border text-muted-foreground'}`}>
        <Truck className="h-4 w-4 md:h-5 md:w-5" />
      </div>
      {/* Battery SOC Bar */}
      <div className="mt-1 w-6 md:w-8 h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            soc > 60 ? 'bg-green-500' : soc > 30 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${soc}%` }}
        />
      </div>
      <span className="text-[7px] md:text-[8px] text-muted-foreground mt-0.5">{soc}%</span>
    </div>
  );
}

// Animated energy flow line
function EnergyFlow({ direction, active, color }: { direction: "left" | "right" | "both"; active: boolean; color: string }) {
  if (!active) return (
    <div className="w-8 md:w-12 h-0.5 bg-muted/30 rounded-full" />
  );

  return (
    <div className="relative w-8 md:w-12 h-4 flex items-center justify-center">
      <div className={`absolute inset-x-0 h-0.5 ${color} rounded-full`} />
      {direction === "left" && (
        <div className="absolute inset-0 flex items-center">
          <div className={`w-2 h-2 ${color} rounded-full animate-[flow-left_1s_ease-in-out_infinite]`} />
        </div>
      )}
      {direction === "right" && (
        <div className="absolute inset-0 flex items-center justify-end">
          <div className={`w-2 h-2 ${color} rounded-full animate-[flow-right_1s_ease-in-out_infinite]`} />
        </div>
      )}
      {direction === "both" && (
        <>
          <div className="absolute inset-0 flex items-center">
            <div className={`w-1.5 h-1.5 ${color} rounded-full animate-[flow-left_1.2s_ease-in-out_infinite]`} />
          </div>
          <div className="absolute inset-0 flex items-center justify-end">
            <div className={`w-1.5 h-1.5 ${color} rounded-full animate-[flow-right_1.2s_ease-in-out_infinite] delay-500`} />
          </div>
        </>
      )}
    </div>
  );
}

// Grid stability indicator
function GridStabilityIndicator({ stable }: { stable: boolean }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[7px] md:text-[8px] font-medium ${
        stable ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
      }`}>
        <Activity className="h-2.5 w-2.5" />
        <span>{stable ? '50.00 Hz' : '49.85 Hz'}</span>
      </div>
      {/* Simplified waveform */}
      <svg className="w-10 h-3" viewBox="0 0 40 12">
        <path
          d={stable 
            ? "M0,6 Q5,2 10,6 Q15,10 20,6 Q25,2 30,6 Q35,10 40,6"
            : "M0,6 Q5,1 10,7 Q15,11 20,5 Q25,1 30,8 Q35,10 40,6"
          }
          fill="none"
          stroke={stable ? "#22c55e" : "#eab308"}
          strokeWidth="1.5"
          className="transition-all duration-500"
        />
      </svg>
    </div>
  );
}

export function LogisticsV2GAnimation() {
  const [mode, setMode] = useState<EnergyMode>("grid-import");
  const [truckSOCs, setTruckSOCs] = useState([85, 72, 60, 45]);

  // Cycle through modes automatically
  useEffect(() => {
    const modes: EnergyMode[] = ["grid-import", "v2f", "v2g"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % modes.length;
      setMode(modes[currentIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Simulate SOC changes based on mode
  useEffect(() => {
    const interval = setInterval(() => {
      setTruckSOCs(prev => prev.map(soc => {
        if (mode === "grid-import") {
          return Math.min(100, soc + Math.random() * 2);
        } else {
          return Math.max(20, soc - Math.random() * 1.5);
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [mode]);

  const config = modeConfig[mode];

  return (
    <div className="relative w-full py-4 md:py-6 mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50">
      {/* Mode Indicator */}
      <div className="flex justify-center mb-4 px-4">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} border ${config.borderColor} transition-all duration-500`}>
          <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} animate-pulse`} />
          <span className={`text-xs md:text-sm font-semibold ${config.color}`}>{config.label}</span>
          <span className="text-[10px] md:text-xs text-muted-foreground">• {config.description}</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="relative flex items-center justify-center gap-2 md:gap-4 px-2 md:px-6">
        
        {/* Public Grid */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative p-2 md:p-3 rounded-xl bg-card border border-border shadow-md">
            <Building2 className="h-5 w-5 md:h-7 md:w-7 text-primary" />
            <GridStabilityIndicator stable={mode !== "grid-import"} />
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">Power Grid</span>
          {/* Power label */}
          <div className={`text-[7px] md:text-[9px] font-mono ${mode === "grid-import" ? 'text-blue-500' : mode === "v2g" ? 'text-purple-500' : 'text-muted-foreground'}`}>
            {mode === "grid-import" ? '↓ 150 kW' : mode === "v2g" ? '↑ 120 kW' : '— 0 kW'}
          </div>
        </div>

        {/* Grid ↔ Chargers Flow */}
        <div className="flex flex-col items-center gap-1">
          <EnergyFlow 
            direction={mode === "grid-import" ? "right" : mode === "v2g" ? "left" : "both"} 
            active={mode !== "v2f"} 
            color={mode === "grid-import" ? "bg-blue-500" : "bg-purple-500"}
          />
          <div className="flex items-center gap-0.5">
            {mode === "grid-import" && <ArrowRight className="h-2.5 w-2.5 text-blue-500" />}
            {mode === "v2g" && <ArrowLeft className="h-2.5 w-2.5 text-purple-500" />}
            {mode === "v2f" && <ArrowLeftRight className="h-2.5 w-2.5 text-muted-foreground" />}
          </div>
        </div>

        {/* Bidirectional Chargers */}
        <div className="flex flex-col items-center gap-1">
          <div className={`relative p-2 md:p-3 rounded-2xl shadow-lg transition-all duration-500 ${
            mode === "grid-import" ? 'bg-blue-500 text-white' : 
            mode === "v2f" ? 'bg-green-500 text-white' : 
            'bg-purple-500 text-white'
          }`}>
            <BatteryCharging className="h-5 w-5 md:h-6 md:w-6" />
            <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">DC Fast Chargers</span>
          <span className="text-[7px] md:text-[9px] text-muted-foreground">Bidirectional</span>
        </div>

        {/* Chargers ↔ Trucks Flow */}
        <div className="flex flex-col items-center gap-1">
          <EnergyFlow 
            direction={mode === "grid-import" ? "right" : "left"} 
            active={true} 
            color={mode === "grid-import" ? "bg-blue-500" : "bg-green-500"}
          />
          <div className="text-[7px] md:text-[9px] font-mono text-muted-foreground">
            {mode === "grid-import" ? '→ 37.5 kW/truck' : '← 30 kW/truck'}
          </div>
        </div>

        {/* Electric Truck Fleet */}
        <div className="flex flex-col items-center gap-1">
          <div className="grid grid-cols-2 gap-1">
            {truckSOCs.map((soc, index) => (
              <TruckWithBattery 
                key={index} 
                soc={Math.round(soc)} 
                index={index} 
                isActive={mode !== "grid-import"}
              />
            ))}
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground mt-1">EV Fleet</span>
        </div>

        {/* Trucks → Facility Flow (V2F) */}
        <div className="flex flex-col items-center gap-1">
          <EnergyFlow 
            direction="right" 
            active={mode === "v2f"} 
            color="bg-green-500"
          />
          {mode === "v2f" && (
            <span className="text-[7px] md:text-[9px] font-mono text-green-500">→ 80 kW</span>
          )}
        </div>

        {/* Logistics Facility */}
        <div className="flex flex-col items-center gap-1">
          <div className={`relative p-2 md:p-3 rounded-xl bg-card border shadow-md transition-all duration-500 ${
            mode === "v2f" ? 'border-green-500/50 shadow-green-500/20' : 'border-border'
          }`}>
            <Factory className="h-5 w-5 md:h-7 md:w-7 text-slate-600" />
            {mode === "v2f" && (
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">Facility</span>
          <div className={`text-[7px] md:text-[9px] font-mono ${mode === "v2f" ? 'text-green-500' : 'text-muted-foreground'}`}>
            {mode === "v2f" ? 'V2F Active' : 'Grid Power'}
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="mt-4 flex justify-center gap-2 px-4">
        {(Object.keys(modeConfig) as EnergyMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-2 py-1 rounded-full text-[8px] md:text-[10px] font-medium transition-all ${
              mode === m 
                ? `${modeConfig[m].bgColor} ${modeConfig[m].color} border ${modeConfig[m].borderColor}` 
                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            {modeConfig[m].label}
          </button>
        ))}
      </div>

      {/* Bottom Description */}
      <div className="mt-3 text-center px-4">
        <p className="text-[9px] md:text-xs text-muted-foreground">
          <span className="text-primary font-medium">Bidirectional DC Fast Charging</span> enables fleet-to-facility (V2F) and grid stabilization (V2G) services
        </p>
      </div>
    </div>
  );
}
