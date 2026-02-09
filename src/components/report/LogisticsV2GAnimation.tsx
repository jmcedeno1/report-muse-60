import { useState, useEffect } from "react";
import { Bus, Zap, Building2, BatteryCharging, ArrowRight, ArrowLeft } from "lucide-react";

type FlowMode = "charging" | "v2g" | "v2b";

const modes: { key: FlowMode; label: string; desc: string }[] = [
  { key: "charging", label: "Charging", desc: "Grid charges the bus fleet" },
  { key: "v2g", label: "V2G", desc: "Buses stabilize the grid" },
  { key: "v2b", label: "V2B", desc: "Buses power the office building" },
];

function BusIcon({ soc, active }: { soc: number; active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className={`p-1.5 rounded-lg transition-all duration-500 ${active ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card border border-border text-muted-foreground'}`}>
        <Bus className="h-4 w-4 md:h-5 md:w-5" />
      </div>
      <div className="w-6 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${soc > 60 ? 'bg-green-500' : soc > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${soc}%` }}
        />
      </div>
      <span className="text-[7px] text-muted-foreground">{soc}%</span>
    </div>
  );
}

function FlowArrow({ direction, active, label }: { direction: "left" | "right"; active: boolean; label?: string }) {
  if (!active) return <div className="w-10 md:w-16 h-6 flex items-center justify-center"><div className="w-full h-px bg-border" /></div>;

  return (
    <div className="w-10 md:w-16 flex flex-col items-center gap-0.5">
      <div className="relative w-full h-6 flex items-center justify-center">
        <div className="w-full h-0.5 bg-primary/40 rounded-full" />
        <div className={`absolute w-2 h-2 bg-primary rounded-full ${direction === "right" ? "animate-[flow-right_1s_ease-in-out_infinite]" : "animate-[flow-left_1s_ease-in-out_infinite]"}`} />
        {direction === "right" ? (
          <ArrowRight className="absolute right-0 h-3 w-3 text-primary" />
        ) : (
          <ArrowLeft className="absolute left-0 h-3 w-3 text-primary" />
        )}
      </div>
      {label && <span className="text-[7px] md:text-[8px] font-mono text-primary">{label}</span>}
    </div>
  );
}

export function LogisticsV2GAnimation() {
  const [mode, setMode] = useState<FlowMode>("charging");
  const [socs, setSocs] = useState([82, 68, 55]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % modes.length;
      setMode(modes[i].key);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSocs(prev => prev.map(s =>
        mode === "charging" ? Math.min(100, s + Math.random() * 2) : Math.max(25, s - Math.random() * 1.5)
      ));
    }, 2000);
    return () => clearInterval(interval);
  }, [mode]);

  const current = modes.find(m => m.key === mode)!;
  const discharging = mode !== "charging";

  return (
    <div className="relative w-full py-5 md:py-6 mb-6 rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50 overflow-hidden">
      {/* Mode badge */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs md:text-sm font-semibold text-primary">{current.label}</span>
          <span className="text-[10px] md:text-xs text-muted-foreground">• {current.desc}</span>
        </div>
      </div>

      {/* Main layout: Grid ← → Buses ← → Building */}
      <div className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-8">
        {/* Power Grid */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 md:p-3 rounded-xl bg-card border border-border shadow-sm">
            <Building2 className="h-5 w-5 md:h-7 md:w-7 text-primary" />
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">Power Grid</span>
        </div>

        {/* Grid ↔ Buses flow */}
        <FlowArrow
          direction={mode === "charging" ? "right" : "left"}
          active={mode === "charging" || mode === "v2g"}
          label={mode === "charging" ? "150 kW" : mode === "v2g" ? "120 kW" : undefined}
        />

        {/* Bus Fleet + Charger */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative p-2 md:p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <BatteryCharging className="h-5 w-5 md:h-6 md:w-6" />
            <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
          </div>
          <div className="flex gap-1 mt-1">
            {socs.map((s, i) => (
              <BusIcon key={i} soc={Math.round(s)} active={discharging} />
            ))}
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">eBus Fleet</span>
        </div>

        {/* Buses → Building flow */}
        <FlowArrow
          direction="right"
          active={mode === "v2b"}
          label={mode === "v2b" ? "80 kW" : undefined}
        />

        {/* Office Building */}
        <div className="flex flex-col items-center gap-1">
          <div className={`p-2 md:p-3 rounded-xl bg-card border shadow-sm transition-all duration-500 ${mode === "v2b" ? 'border-primary/50 shadow-primary/20' : 'border-border'}`}>
            <Building2 className="h-5 w-5 md:h-7 md:w-7 text-muted-foreground" />
            {mode === "v2b" && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />}
          </div>
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">Office</span>
        </div>
      </div>

      {/* Mode selector */}
      <div className="mt-4 flex justify-center gap-2 px-4">
        {modes.map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-medium transition-all ${
              mode === m.key ? 'bg-primary/15 text-primary border border-primary/30' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-center text-[9px] md:text-xs text-muted-foreground px-4">
        <span className="text-primary font-medium">Electric buses as energy assets</span> — powering buildings (V2B) and stabilizing the grid (V2G)
      </p>
    </div>
  );
}
