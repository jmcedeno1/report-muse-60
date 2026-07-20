// Editorial companion metadata for the 10 V2G patent families.
// Sub-technology keyword patterns are used against live patent titles/abstracts
// so status badges and yearly filings remain verifiable from the corpus.

export type SubTech = {
  label: string;
  // JS RegExp source, case-insensitive, matched on `${title} ${abstract}`
  pattern: string;
  color: string; // stroke color for the trend line
};

export type FamilyDetail = {
  description: string;
  subTechnologies: SubTech[];
  opportunities: string[];
};

// Palette drawn from the report brand colors (primary + accent variants).
const C = {
  indigo: "hsl(232 32% 38%)",   // #414A7F
  blue:   "hsl(229 100% 74%)",  // #8193FD
  sky:    "hsl(228 100% 82%)",  // #A1AFFF
  amber:  "hsl(38 92% 50%)",
  emerald:"hsl(160 65% 42%)",
  violet: "hsl(262 60% 58%)",
};

export const PATENT_FAMILY_DETAILS: Record<string, FamilyDetail> = {
  "Bidirectional Converter / Inverter": {
    description:
      "Power electronics that enable energy to flow in both directions between the battery and the grid. Includes on-board chargers, dual-active-bridge stages, and off-board bidirectional inverters.",
    subTechnologies: [
      { label: "On-board charger (OBC)",   pattern: "onboard charger|on-board charger|\\bOBC\\b", color: C.indigo },
      { label: "Dual-active-bridge",       pattern: "dual.?active.?bridge|\\bDAB\\b",              color: C.blue },
      { label: "Bidirectional inverter",   pattern: "bidirectional.*inverter|reverse power",       color: C.sky },
      { label: "Wide-bandgap (SiC/GaN)",   pattern: "silicon carbide|\\bSiC\\b|gallium nitride|\\bGaN\\b", color: C.amber },
    ],
    opportunities: [
      "Integrated OBC + DC/DC stages to shrink onboard footprint",
      "Wide-bandgap devices for higher efficiency at 11–22 kW",
      "Modular multi-port topologies for V2G + solar + storage",
    ],
  },
  "Wireless / Inductive Transfer": {
    description:
      "Contactless energy transfer between vehicle and pad via inductive or resonant coupling. Enables hands-free static and, increasingly, dynamic charging while the vehicle is in motion.",
    subTechnologies: [
      { label: "Static inductive",  pattern: "static.*(inductive|wireless).*charg|stationary.*wireless", color: C.indigo },
      { label: "Resonant coupling", pattern: "resonant.*coupl|magnetic resonance",                       color: C.violet },
      { label: "Dynamic / in-motion", pattern: "dynamic.*(charg|wireless)|in.?motion.*charg|road.*charg", color: C.blue },
      { label: "Alignment & foreign object", pattern: "alignment|foreign object|\\bFOD\\b|coil.?position", color: C.amber },
    ],
    opportunities: [
      "Standardisation around SAE J2954 and IEC 61980 for interoperability",
      "Dynamic wireless corridors for heavy-duty and transit fleets",
      "Improved coil alignment for autonomous parking scenarios",
    ],
  },
  "Battery Management & Degradation": {
    description:
      "Systems that estimate battery state and manage cycling to preserve life. Central to V2G, where extra throughput must be traded against calendar and cycle aging.",
    subTechnologies: [
      { label: "State of charge (SoC)", pattern: "state of charge|\\bSoC\\b",                       color: C.indigo },
      { label: "State of health (SoH)", pattern: "state of health|\\bSoH\\b",                       color: C.blue },
      { label: "Degradation modeling",  pattern: "degrad|aging|ageing|capacity fade|calendar life", color: C.amber },
      { label: "Thermal management",    pattern: "thermal.*(management|control).*batter|battery.*cool", color: C.emerald },
    ],
    opportunities: [
      "V2G-aware cycling strategies that minimise incremental degradation",
      "Second-life screening using field data from bidirectional pilots",
      "Digital twins that couple SoH to warranty and residual value",
    ],
  },
  "Smart Charging & Scheduling": {
    description:
      "Software and controls that decide when and how fast to charge (or discharge) based on tariffs, grid signals, and user preferences. The economic layer that turns hardware into a service.",
    subTechnologies: [
      { label: "Demand response",     pattern: "demand response",                                        color: C.indigo },
      { label: "Load balancing",      pattern: "load balancing|load management|peak shav",              color: C.blue },
      { label: "Charging optimisation", pattern: "charg.*optimiz|optimal.*charg|scheduling.*charg",     color: C.amber },
      { label: "Fleet management",    pattern: "fleet.*(charg|management)|depot.*charg",                color: C.emerald },
    ],
    opportunities: [
      "AI-driven price-aware scheduling coupled to day-ahead markets",
      "Vehicle-user preference APIs (SoC guarantees, departure times)",
      "Aggregator platforms that stack tariffs, capacity, and ancillary revenue",
    ],
  },
  "Vehicle-to-Grid (V2G)": {
    description:
      "Bidirectional interaction between EV batteries and the electricity grid, enabling frequency regulation, capacity, and energy arbitrage services through certified interconnection.",
    subTechnologies: [
      { label: "Grid support / ancillary", pattern: "ancillary service|grid support|frequency regulation", color: C.indigo },
      { label: "Aggregation",              pattern: "aggregat.*(vehicle|EV|fleet)|VPP|virtual power plant", color: C.blue },
      { label: "Interconnection & islanding", pattern: "islanding|interconnection|anti[- ]islanding|\\bIEEE ?1547\\b", color: C.amber },
      { label: "Energy arbitrage",         pattern: "energy arbitrage|price arbitrage|time.?of.?use",       color: C.emerald },
    ],
    opportunities: [
      "Certified V2G-ready OBCs approved under IEEE 1547 and UL 1741 SB",
      "Aggregator business models for frequency and capacity markets",
      "Utility programs that co-fund bidirectional hardware for fleets",
    ],
  },
  "Cybersecurity & Authentication": {
    description:
      "Trust and identity layer for charging: certificates, encryption, and secure onboarding so grid operators, EVSE, and vehicles can transact without exposing the grid or the user.",
    subTechnologies: [
      { label: "Plug & Charge (ISO 15118)", pattern: "plug and charge|ISO ?15118",                    color: C.indigo },
      { label: "Certificate / PKI",         pattern: "cross[- ]certificate|\\bPKI\\b|certificate.*charg", color: C.blue },
      { label: "Authentication",            pattern: "authentication.*charg|secure.*charg",             color: C.amber },
      { label: "Encryption",                pattern: "encryption.*charg|\\bTLS\\b.*charg",              color: C.emerald },
    ],
    opportunities: [
      "Pan-European contract certificate pools for roaming",
      "Post-quantum crypto readiness for long-lived EVSE fleets",
      "Anomaly detection on OCPP / ISO 15118 traffic",
    ],
  },
  "Vehicle-to-Home / Building": {
    description:
      "Using the EV as a home or building battery for backup power, self-consumption, and demand charge reduction. Growing rapidly with resilience concerns and rooftop solar.",
    subTechnologies: [
      { label: "Backup power",            pattern: "backup power|home backup|outage",                color: C.indigo },
      { label: "Home energy management",  pattern: "home energy management|\\bHEMS\\b|residential energy", color: C.blue },
      { label: "PV / solar coupling",     pattern: "photovoltaic.*charg|solar.*(charg|EV)|\\bPV\\b.*charg", color: C.amber },
      { label: "Building integration",    pattern: "building.*(energy|integration)|\\bBEMS\\b",       color: C.emerald },
    ],
    opportunities: [
      "Integrated inverter + HEMS packages sold with the vehicle",
      "Utility incentives for behind-the-meter capacity from EVs",
      "Multi-family building solutions with shared bidirectional infrastructure",
    ],
  },
  "Charging Communication & Protocols": {
    description:
      "The messaging standards that let vehicles, chargers, and back-ends coordinate: ISO 15118 between vehicle and charger, OCPP between charger and back-end, OpenADR for grid signals.",
    subTechnologies: [
      { label: "ISO 15118",         pattern: "ISO ?15118",                          color: C.indigo },
      { label: "OCPP",              pattern: "\\bOCPP\\b",                          color: C.blue },
      { label: "Plug & Charge",     pattern: "plug and charge",                     color: C.amber },
      { label: "Other protocols",   pattern: "charging protocol|communication protocol.*charg", color: C.emerald },
    ],
    opportunities: [
      "ISO 15118-20 rollout unlocking native bidirectional messaging",
      "OCPP 2.1 features for smart charging profiles and V2X",
      "OpenADR bridges from utilities to fleet operators",
    ],
  },
  "Vehicle-to-Load (V2L)": {
    description:
      "The vehicle exports AC power to arbitrary appliances or tools directly from a socket. A pragmatic step toward broader V2X and a marketed feature on many new EVs.",
    subTechnologies: [
      { label: "Portable power / AC outlet", pattern: "portable power|AC outlet|power export", color: C.indigo },
      { label: "Tool & appliance powering",  pattern: "power.*tool|appliance.*power",           color: C.blue },
      { label: "Emergency / outage",         pattern: "emergency power|outage.*(EV|vehicle)",   color: C.amber },
    ],
    opportunities: [
      "Higher-power (>3.6 kW) outlets certified for jobsite tools",
      "Standardised connectors and safety interlocks",
      "Bundled inverter accessories to bridge V2L to home circuits",
    ],
  },
  "Vehicle-to-Vehicle (V2V)": {
    description:
      "Peer-to-peer energy transfer between electric vehicles, typically to rescue a stranded EV or to balance a small fleet in the field. Still an early research area with limited commercial deployment.",
    subTechnologies: [
      { label: "Peer-to-peer charging", pattern: "peer[- ]to[- ]peer charg|vehicle[- ]to[- ]vehicle charg", color: C.indigo },
      { label: "Roadside assistance",   pattern: "roadside|rescue.*(EV|vehicle)",                            color: C.blue },
      { label: "Fleet balancing",       pattern: "fleet.*balanc|convoy",                                     color: C.amber },
    ],
    opportunities: [
      "Standard V2V connector and handshake protocols",
      "Mobile bidirectional units for roadside operators",
      "Micro-grid formation between clustered vehicles",
    ],
  },
};
