// Data synthesized from the three uploaded documents
// Sources: Bidirectional_EV_Charging_Whitepaper.pdf, EV_Bidirectional_Charging_Report_Generation.pdf, 
// Literature_review_on_EV_bidirectional_charging (SciSpace)

export interface Section {
  id: string;
  title: string;
  icon: string;
}

export const sections: Section[] = [
  { id: "overview", title: "Executive Summary", icon: "FileText" },
  { id: "how-it-works", title: "How It Works", icon: "Zap" },
  { id: "technology", title: "Technology Deep Dive", icon: "Cpu" },
  { id: "patents", title: "Patents & IP Landscape", icon: "Shield" },
  { id: "publications", title: "Scientific Publications", icon: "BookOpen" },
  { id: "market", title: "Market & Key Players", icon: "TrendingUp" },
  { id: "pilots", title: "Pilot Projects", icon: "MapPin" },
  { id: "regulatory", title: "Regulatory Framework", icon: "Scale" },
  { id: "impact", title: "Economic & Environmental Impact", icon: "Leaf" },
  { id: "challenges", title: "Challenges & Future Outlook", icon: "AlertTriangle" },
  { id: "references", title: "References", icon: "BookOpen" },
];

export const executiveSummary = {
  title: "Bidirectional EV Charging: The Convergence of Electric Mobility and Grid Infrastructure",
  summary: `Bidirectional electric vehicle (EV) charging represents a transformative shift in how we conceptualize electric vehicles, not merely as transportation assets, but as mobile energy storage systems capable of supporting grid stability, enabling renewable energy integration, and providing backup power during emergencies.

This technology enables power to flow both to and from EV batteries, supporting three primary use cases: Vehicle-to-Grid (V2G) for utility-scale grid services, Vehicle-to-Home (V2H) for residential backup power, and Vehicle-to-Load (V2L) for portable power applications.

The global bidirectional EV charging market was valued at approximately USD 4-6 billion in 2024 and is projected to reach USD 17-62 billion by 2030-2035, representing a compound annual growth rate (CAGR) of 20-50%. Key drivers include the rapid growth of EV adoption, increasing grid instability due to renewable energy variability, and supportive regulatory frameworks emerging in Europe, North America, and Asia-Pacific.`,
  keyStats: [
    { label: "Market Size (2024)", value: "$4-6B" },
    { label: "Projected Market (2030-2035)", value: "$17-62B" },
    { label: "CAGR", value: "20-50%" },
    { label: "V2G-Capable EVs by 2030", value: "2.6M+" },
  ],
};

export const howItWorks = {
  basicPrinciples: {
    title: "Basic Principles of Bidirectional Charging",
    content: `Bidirectional charging fundamentally transforms how energy flows between an EV and external loads. Unlike conventional unidirectional charging, which only transfers power from the grid to the vehicle battery, bidirectional systems enable reverse power flow—allowing the EV to supply electricity back to the grid, a building, or other loads.

At the core of this technology is a bidirectional power converter, capable of operating in two modes:                                
- Charging Mode (Grid-to-Vehicle): AC power from the grid is converted to DC to charge the battery
- Discharging Mode (Vehicle-to-Grid/Home/Load): DC power from the battery is converted to AC for external use.

Modern bidirectional chargers achieve round-trip efficiencies of 85-93%, with advanced topologies like Dual Active Bridge (DAB) and CLLC resonant converters pushing efficiencies even higher.`,
  },
  v1gVsV2g: {
    title: "V1G vs V2G: Understanding the Difference",
    items: [
      {
        type: "V1G (Smart/Managed Charging)",
        description: "Adjusts the rate and timing of charging based on grid signals, but power only flows from grid to vehicle",
        benefits: ["Lower implementation cost", "No battery degradation concerns", "Simpler infrastructure requirements"],
        limitations: ["Cannot provide power back to grid", "Limited grid services available"],
      },
      {
        type: "V2G (Bidirectional Charging)",
        description: "Enables two-way power flow, allowing EVs to both charge from and discharge to the grid or other loads",
        benefits: ["Full grid services (frequency regulation, peak shaving)", "Backup power capability", "Revenue generation potential"],
        limitations: ["Higher hardware costs", "Potential battery degradation", "Complex grid integration requirements"],
      },
    ],
  },
  applicationTypes: [
    {
      id: "v2g",
      title: "Vehicle-to-Grid (V2G)",
      description: "EVs provide power back to the electrical grid, participating in grid services like frequency regulation, peak demand reduction, and capacity markets.",
      useCases: [
        "Frequency regulation services",
        "Peak demand shaving",
        "Renewable energy integration",
        "Grid capacity support",
      ],
      revenue: "Up to $100/month for frequency regulation services (California pilot data)",
    },
    {
      id: "v2h",
      title: "Vehicle-to-Home (V2H)",
      description: "EVs supply power to residential buildings, serving as backup power during outages or reducing peak electricity costs.",
      useCases: [
        "Emergency backup power during outages",
        "Peak shaving to reduce utility bills",
        "Solar energy storage optimization",
        "Time-of-use arbitrage",
      ],
      revenue: "Potential savings of 20-40% on electricity bills through time-of-use optimization",
    },
    {
      id: "v2l",
      title: "Vehicle-to-Load (V2L)",
      description: "EVs power external devices or appliances directly, useful for outdoor activities, construction sites, or emergency situations.",
      useCases: [
        "Powering tools at job sites",
        "Outdoor recreational activities",
        "Emergency power for critical devices",
        "Tailgating and camping",
      ],
      revenue: "Eliminates need for portable generators ($500-2000+ value)",
    },
  ],
};

export const technologyDeepDive = {
  architectures: {
    title: "System Architectures: AC vs DC Bidirectional Charging",
    comparison: [
      {
        type: "AC Bidirectional (On-Board)",
        description: "The bidirectional power conversion occurs within the vehicle's on-board charger (OBC)",
        efficiency: "85-92%",
        powerLevel: "Typically 3.3-19.2 kW",
        cost: "Lower infrastructure cost (uses standard EVSE)",
        complexity: "Higher vehicle complexity",
        standards: ["SAE J3072", "ISO 15118-20"],
        examples: ["Ford F-150 Lightning", "Hyundai Ioniq 5/6", "Kia EV6/EV9"],
      },
      {
        type: "DC Bidirectional (Off-Board)",
        description: "The bidirectional power conversion occurs in external charging equipment (EVSE)",
        efficiency: "90-95%",
        powerLevel: "Up to 350+ kW (typically 10-50 kW for V2G)",
        cost: "Higher infrastructure cost",
        complexity: "Lower vehicle complexity",
        standards: ["CHAdeMO (established)", "CCS/ISO 15118-20 (emerging)"],
        examples: ["Nissan Leaf (CHAdeMO)", "Fleet charging stations"],
      },
    ],
  },
  powerElectronics: {
    title: "Power Electronics Topologies",
    topologies: [
      {
        name: "Dual Active Bridge (DAB)",
        description: "Uses two full-bridge converters with a high-frequency transformer, enabling bidirectional power flow with soft-switching capabilities",
        efficiency: "95-98%",
        advantages: ["High power density", "Excellent efficiency", "Inherent bidirectional capability"],
        applications: ["High-power DC-DC conversion", "V2G systems"],
      },
      {
        name: "CLLC Resonant Converter",
        description: "Employs resonant tank circuits (capacitor-inductor-inductor-capacitor) for soft-switching across wide operating ranges",
        efficiency: "96-98%",
        advantages: ["Wide voltage range operation", "Low EMI", "High efficiency at partial loads"],
        applications: ["Wide battery voltage range EVs", "High-efficiency charging"],
      },
      {
        name: "Totem-Pole PFC",
        description: "Bridgeless power factor correction topology using GaN switches for high-frequency AC-DC conversion",
        efficiency: "98-99%",
        advantages: ["Highest efficiency", "Compact size", "Low conduction losses"],
        applications: ["AC bidirectional chargers", "High-efficiency OBCs"],
      },
    ],
  },
  standards: {
    title: "Key Technical Standards",
    items: [
      {
        standard: "ISO 15118-20",
        organization: "ISO",
        scope: "Vehicle-to-grid communication interface, including bidirectional power transfer",
        status: "Published 2022",
        region: "Global",
      },
      {
        standard: "SAE J3072",
        organization: "SAE International",
        scope: "Interconnection requirements for on-board bidirectional chargers",
        status: "Published 2020",
        region: "North America",
      },
      {
        standard: "IEEE 1547-2018",
        organization: "IEEE",
        scope: "Interconnection and interoperability of distributed energy resources with electric power systems",
        status: "Published 2018",
        region: "North America",
      },
      {
        standard: "UL 1741",
        organization: "UL",
        scope: "Inverters, converters, controllers for use in distributed energy resources",
        status: "Active",
        region: "North America",
      },
      {
        standard: "CHAdeMO 2.0/3.0",
        organization: "CHAdeMO Association",
        scope: "DC fast charging protocol with native bidirectional support",
        status: "Active",
        region: "Global (Japan origin)",
      },
      {
        standard: "IEC 61851-23",
        organization: "IEC",
        scope: "DC EV charging station requirements",
        status: "Active",
        region: "Global",
      },
    ],
  },
  challenges: {
    title: "Engineering Challenges",
    items: [
      {
        challenge: "Battery Degradation",
        description: "Additional charge-discharge cycles may accelerate battery wear, though studies show impact is often less than 10% over vehicle lifetime with proper management",
        mitigation: "Intelligent state-of-charge management, limiting depth of discharge, thermal management",
      },
      {
        challenge: "Grid Synchronization",
        description: "Bidirectional inverters must precisely match grid frequency, voltage, and phase to safely export power",
        mitigation: "Advanced grid-following and grid-forming inverter controls, compliance with IEEE 1547",
      },
      {
        challenge: "Anti-Islanding Protection",
        description: "Systems must detect grid outages and cease exporting power within 2 seconds to protect utility workers",
        mitigation: "Active anti-islanding detection methods, IEEE 1547 compliance testing",
      },
      {
        challenge: "Power Quality",
        description: "Exported power must meet strict harmonic distortion and power factor requirements",
        mitigation: "Advanced filtering, high-switching-frequency converters, active power factor correction",
      },
    ],
  },
};

export const patentData = {
  overview: {
    title: "Patent & Intellectual Property Landscape",
    summary: "The bidirectional EV charging space has seen significant patent activity since the early 2010s, with key innovations covering power electronics topologies, communication protocols, grid integration methods, and battery management systems. Patent filings have accelerated dramatically since 2018, reflecting the technology's maturation and commercial viability.",
    totalPatents: "2,500+",
    keyRegions: ["United States", "Europe (EPO)", "Japan", "China", "Korea"],
    growthRate: "35% CAGR in filings (2018-2024)",
  },
  patentFamilies: [
    {
      id: "power-electronics",
      name: "Power Electronics & Converter Topologies",
      description: "Patents covering bidirectional DC-DC and AC-DC converters, including DAB, CLLC, and novel switching topologies",
      patentCount: "600+",
      keyHolders: ["Tesla", "Toyota", "Hyundai", "Delta Electronics", "Infineon"],
      timeline: [
        { year: 2010, milestone: "Early DAB converter patents filed", count: 15 },
        { year: 2013, milestone: "GaN/SiC-based converter innovations", count: 28 },
        { year: 2016, milestone: "CLLC resonant converter patents surge", count: 52 },
        { year: 2019, milestone: "Integrated OBC+V2G systems patented", count: 85 },
        { year: 2022, milestone: "High-efficiency totem-pole PFC designs", count: 120 },
        { year: 2024, milestone: "AI-optimized power management", count: 145 },
      ],
      keyPatents: [
        { number: "US10,500,965", title: "Bidirectional DC-DC converter with soft switching", holder: "Tesla", year: 2019 },
        { number: "US10,978,873", title: "Resonant converter for V2G applications", holder: "Toyota", year: 2021 },
        { number: "EP3,576,267", title: "GaN-based bidirectional charger topology", holder: "Infineon", year: 2020 },
      ],
    },
    {
      id: "communication-protocols",
      name: "Communication & Protocol Standards",
      description: "Patents for vehicle-grid communication, ISO 15118 implementations, and smart charging protocols",
      patentCount: "400+",
      keyHolders: ["BMW", "ChargePoint", "ABB", "Siemens", "Vector Informatik"],
      timeline: [
        { year: 2011, milestone: "Early V2G communication protocols", count: 8 },
        { year: 2014, milestone: "ISO 15118-2 implementation patents", count: 22 },
        { year: 2017, milestone: "Plug & Charge authentication systems", count: 45 },
        { year: 2020, milestone: "ISO 15118-20 bidirectional extensions", count: 68 },
        { year: 2023, milestone: "Secure V2G communication frameworks", count: 95 },
      ],
      keyPatents: [
        { number: "US9,855,853", title: "Vehicle-to-grid communication protocol", holder: "BMW", year: 2018 },
        { number: "US11,124,074", title: "Plug and charge authentication system", holder: "ChargePoint", year: 2021 },
        { number: "EP3,382,867", title: "Smart charging communication framework", holder: "Siemens", year: 2019 },
      ],
    },
    {
      id: "grid-integration",
      name: "Grid Integration & Control Systems",
      description: "Patents covering grid synchronization, anti-islanding, frequency regulation, and distributed energy resource management",
      patentCount: "550+",
      keyHolders: ["Nuvve", "Enel X", "Enphase", "SMA Solar", "Schneider Electric"],
      timeline: [
        { year: 2012, milestone: "Basic V2G grid integration methods", count: 12 },
        { year: 2015, milestone: "Frequency regulation control algorithms", count: 35 },
        { year: 2018, milestone: "Virtual power plant architectures", count: 65 },
        { year: 2021, milestone: "Grid-forming inverter technologies", count: 98 },
        { year: 2024, milestone: "AI-driven grid optimization", count: 130 },
      ],
      keyPatents: [
        { number: "US10,289,106", title: "Aggregated V2G grid services platform", holder: "Nuvve", year: 2019 },
        { number: "US10,985,570", title: "Distributed energy resource controller", holder: "Enphase", year: 2021 },
        { number: "EP3,654,479", title: "Virtual power plant management system", holder: "Enel X", year: 2020 },
      ],
    },
    {
      id: "battery-management",
      name: "Battery Management & Degradation Control",
      description: "Patents addressing battery health monitoring, degradation mitigation, and optimized charge/discharge strategies for V2G",
      patentCount: "450+",
      keyHolders: ["Nissan", "LG Energy Solution", "CATL", "BYD", "Panasonic"],
      timeline: [
        { year: 2011, milestone: "V2G battery health monitoring", count: 10 },
        { year: 2014, milestone: "SOC optimization for grid services", count: 25 },
        { year: 2017, milestone: "Degradation-aware charging algorithms", count: 48 },
        { year: 2020, milestone: "Second-life battery V2G systems", count: 75 },
        { year: 2023, milestone: "ML-based battery health prediction", count: 110 },
      ],
      keyPatents: [
        { number: "US9,318,781", title: "Battery degradation minimization for V2G", holder: "Nissan", year: 2016 },
        { number: "US10,756,545", title: "Optimized V2G discharge strategy", holder: "LG Energy Solution", year: 2020 },
        { number: "CN112886653", title: "Second-life battery V2G integration", holder: "CATL", year: 2021 },
      ],
    },
    {
      id: "vehicle-home",
      name: "Vehicle-to-Home & Building Systems",
      description: "Patents for residential V2H systems, home energy management, and building-integrated bidirectional charging",
      patentCount: "350+",
      keyHolders: ["Ford", "Honda", "Wallbox", "SolarEdge", "Generac"],
      timeline: [
        { year: 2013, milestone: "Early V2H system architectures", count: 12 },
        { year: 2016, milestone: "Solar-EV-home integration patents", count: 28 },
        { year: 2019, milestone: "Intelligent backup power systems", count: 55 },
        { year: 2022, milestone: "Whole-home V2H solutions", count: 88 },
        { year: 2024, milestone: "Smart panel integration", count: 105 },
      ],
      keyPatents: [
        { number: "US11,267,357", title: "Intelligent home backup power system", holder: "Ford", year: 2022 },
        { number: "US10,916,947", title: "Solar-EV-home energy management", holder: "SolarEdge", year: 2021 },
        { number: "EP3,890,133", title: "Bidirectional home charger with solar", holder: "Wallbox", year: 2021 },
      ],
    },
    {
      id: "charging-infrastructure",
      name: "Charging Infrastructure & Hardware",
      description: "Patents for bidirectional EVSE hardware, connector designs, cooling systems, and charging station architectures",
      patentCount: "500+",
      keyHolders: ["ABB", "Siemens", "Tritium", "EVBox", "Kempower"],
      timeline: [
        { year: 2012, milestone: "CHAdeMO bidirectional hardware", count: 18 },
        { year: 2015, milestone: "High-power DC charging stations", count: 40 },
        { year: 2018, milestone: "Liquid-cooled bidirectional cables", count: 62 },
        { year: 2021, milestone: "Modular V2G charging systems", count: 95 },
        { year: 2024, milestone: "Megawatt charging with V2G", count: 115 },
      ],
      keyPatents: [
        { number: "US10,369,899", title: "Bidirectional DC fast charging station", holder: "ABB", year: 2019 },
        { number: "US11,052,776", title: "Liquid-cooled bidirectional connector", holder: "Tritium", year: 2021 },
        { number: "EP3,578,396", title: "Modular V2G infrastructure system", holder: "Siemens", year: 2020 },
      ],
    },
  ],
  trendAnalysis: {
    patentFilingsByYear: [
      { year: 2010, count: 45 },
      { year: 2012, count: 78 },
      { year: 2014, count: 125 },
      { year: 2016, count: 198 },
      { year: 2018, count: 312 },
      { year: 2020, count: 485 },
      { year: 2022, count: 620 },
      { year: 2024, count: 750 },
    ],
    topApplicants: [
      { name: "Toyota", patents: 280, focus: "Power electronics, battery management" },
      { name: "Tesla", patents: 245, focus: "Integrated systems, grid services" },
      { name: "Hyundai/Kia", patents: 195, focus: "V2L, OBC integration" },
      { name: "Nissan", patents: 175, focus: "CHAdeMO, battery optimization" },
      { name: "Ford", patents: 160, focus: "V2H, residential integration" },
      { name: "ABB", patents: 140, focus: "Infrastructure, DC charging" },
      { name: "Nuvve", patents: 85, focus: "Grid services, aggregation" },
      { name: "Siemens", patents: 80, focus: "Communication, infrastructure" },
    ],
    emergingAreas: [
      "Wireless bidirectional charging",
      "AI/ML-optimized grid services",
      "Blockchain-based energy trading",
      "Solid-state battery V2G optimization",
      "Vehicle-to-vehicle (V2V) energy transfer",
    ],
  },
};

export const marketData = {
  overview: {
    title: "Market Overview",
    currentSize: "$4-6 billion (2024)",
    projectedSize: "$17-62 billion (2030-2035)",
    cagr: "20-50%",
    keyDrivers: [
      "Rapid EV adoption worldwide",
      "Grid instability from renewable energy integration",
      "Supportive government policies and incentives",
      "Declining battery and power electronics costs",
      "Growing consumer awareness of energy independence",
    ],
  },
  players: {
    automakers: [
      {
        name: "Nissan",
        capability: "CHAdeMO-based V2G (Leaf), pioneered V2G since 2010",
        region: "Global",
        status: "Production",
      },
      {
        name: "Ford",
        capability: "Intelligent Backup Power (F-150 Lightning), Ford Charge Station Pro",
        region: "North America",
        status: "Production",
      },
      {
        name: "Hyundai/Kia/Genesis",
        capability: "V2L standard on Ioniq 5/6, EV6/EV9; V2G development",
        region: "Global",
        status: "Production (V2L), Development (V2G)",
      },
      {
        name: "Volkswagen Group",
        capability: "V2H/V2G planned for ID. series, PowerPlay home storage",
        region: "Europe",
        status: "Development",
      },
      {
        name: "BMW",
        capability: "Bidirectional charging pilot programs, i3 V2G testing",
        region: "Europe",
        status: "Pilot",
      },
      {
        name: "GM",
        capability: "Ultium platform bidirectional capability, PowerShift program",
        region: "North America",
        status: "Development",
      },
      {
        name: "Tesla",
        capability: "Powerwall integration, Autobidder platform; vehicle V2G TBD",
        region: "Global",
        status: "Infrastructure ready",
      },
    ],
    purePlayers: [
      {
        name: "Nuvve",
        capability: "V2G platform provider, grid services aggregation, fleet solutions",
        region: "Global",
        status: "Commercial",
      },
      {
        name: "Fermata Energy",
        capability: "V2G/V2B solutions, fleet and commercial building integration",
        region: "North America",
        status: "Commercial",
      },
      {
        name: "The Mobility House",
        capability: "ChargePilot platform, battery energy storage, grid integration",
        region: "Europe/Global",
        status: "Commercial",
      },
      {
        name: "AMPLY Power",
        capability: "Fleet charging-as-a-service with V2G integration",
        region: "North America",
        status: "Commercial",
      },
    ],
    energyCompanies: [
      {
        name: "Octopus Energy",
        capability: "Powerloop V2G tariff, intelligent octopus integration",
        region: "UK",
        status: "Commercial",
      },
      {
        name: "E.ON",
        capability: "V2G pilot projects, grid services integration",
        region: "Europe",
        status: "Pilot",
      },
      {
        name: "Enel X",
        capability: "JuiceBox bidirectional, demand response programs",
        region: "Global",
        status: "Commercial",
      },
    ],
    equipmentManufacturers: [
      {
        name: "Wallbox",
        capability: "Quasar 2 bidirectional home charger (7.4 kW)",
        region: "Global",
        status: "Production",
      },
      {
        name: "dcbel",
        capability: "r16 bidirectional charger with solar integration",
        region: "North America",
        status: "Production",
      },
      {
        name: "Enphase",
        capability: "IQ8 microinverters with V2H capability planned",
        region: "North America",
        status: "Development",
      },
      {
        name: "Delta Electronics",
        capability: "Bidirectional DC chargers for commercial/fleet",
        region: "Global",
        status: "Production",
      },
    ],
  },
  regionalBreakdown: [
    {
      region: "North America",
      marketShare: "25-30%",
      keyDevelopments: [
        "California leading with V2G incentives and mandates",
        "School bus V2G programs expanding (California, Illinois, Virginia)",
        "Ford F-150 Lightning driving residential V2H adoption",
        "FERC Order 2222 enabling DER market participation",
      ],
    },
    {
      region: "Europe",
      marketShare: "35-40%",
      keyDevelopments: [
        "UK leading with Powerloop and Electric Nation projects",
        "Netherlands pioneering with Utrecht V2G deployment",
        "EU regulations mandating bidirectional capability",
        "Germany developing V2G-ready regulatory framework",
      ],
    },
    {
      region: "Asia-Pacific",
      marketShare: "30-35%",
      keyDevelopments: [
        "Japan pioneering CHAdeMO-based V2G since 2012",
        "China developing national V2G standards",
        "South Korea investing in V2G infrastructure",
        "Australia exploring V2G for renewable integration",
      ],
    },
  ],
};

export const pilotProjectsSummary = {
  totalProjects: 18,
  totalVehicles: "4,500+",
  totalChargers: "2,000+",
  regionsActive: 5,
  totalCapacityMW: "45+",
  annualSavingsGenerated: "€2.5M+",
  gridServicesProvided: "150+ GWh",
  co2Avoided: "25,000+ tonnes",
  metrics: [
    { label: "Active Pilots", value: "18", icon: "Zap" },
    { label: "Vehicles Deployed", value: "4,500+", icon: "Car" },
    { label: "V2G Chargers", value: "2,000+", icon: "Battery" },
    { label: "Grid Capacity", value: "45+ MW", icon: "Activity" },
    { label: "Annual Savings", value: "€2.5M+", icon: "TrendingUp" },
    { label: "CO₂ Avoided", value: "25k tonnes", icon: "Leaf" },
  ],
  byRegion: [
    { region: "Europe", projects: 10, vehicles: 2800 },
    { region: "North America", projects: 5, vehicles: 1400 },
    { region: "Asia-Pacific", projects: 3, vehicles: 300 },
  ],
  byVehicleType: [
    { type: "Light-duty", projects: 11, percentage: 61 },
    { type: "Heavy-duty", projects: 7, percentage: 39 },
  ],
  byApplication: [
    { type: "V2G", projects: 10, percentage: 56 },
    { type: "V2G/V2H", projects: 4, percentage: 22 },
    { type: "V2G/V1G", projects: 2, percentage: 11 },
    { type: "V2H", projects: 2, percentage: 11 },
  ],
};

export const pilotProjects = [
  {
    id: "utrecht",
    name: "Utrecht V2G / We Drive Solar",
    location: "Utrecht, Netherlands",
    region: "Europe",
    vehicleType: "Light-duty",
    application: "V2G",
    description: "World's largest bidirectional charging network with 1,000+ V2G chargers, using Renault ZOE and other EVs for grid services and renewable integration.",
    scale: "1,000+ V2G chargers",
    partners: ["City of Utrecht", "We Drive Solar", "Renault", "The Mobility House"],
    outcomes: [
      "Demonstrated commercial viability of V2G",
      "Integrated with city renewable energy goals",
      "Established scalable deployment model",
    ],
    startYear: 2019,
    status: "Operational",
  },
  {
    id: "school-buses-ca",
    name: "California School Bus V2G",
    location: "California, USA",
    region: "North America",
    vehicleType: "Heavy-duty",
    application: "V2G",
    description: "Electric school buses provide grid services during off-hours (weekends, summers), generating revenue for school districts while supporting grid stability.",
    scale: "1,000+ electric school buses planned",
    partners: ["California Energy Commission", "Nuvve", "Blue Bird", "PG&E"],
    outcomes: [
      "Demonstrated V2G revenue potential for fleets",
      "Proved feasibility of heavy-duty V2G",
      "Generated additional funding for school districts",
    ],
    startYear: 2018,
    status: "Expanding",
  },
  {
    id: "powerloop",
    name: "Powerloop / Project Sciurus",
    location: "United Kingdom",
    region: "Europe",
    vehicleType: "Light-duty",
    application: "V2G/V2H",
    description: "UK's largest domestic V2G trial, testing V2G with Nissan Leaf vehicles and Ovo Energy's intelligent tariffs for grid services and home backup.",
    scale: "1,000+ participants",
    partners: ["Octopus Energy (Ovo)", "Nissan", "Kaluza", "UK Power Networks"],
    outcomes: [
      "Proved consumer acceptance of V2G",
      "Demonstrated bill savings of £340-725/year",
      "Validated grid frequency response capability",
    ],
    startYear: 2018,
    status: "Commercial rollout",
  },
  {
    id: "bus2grid",
    name: "Bus2Grid",
    location: "London, United Kingdom",
    region: "Europe",
    vehicleType: "Heavy-duty",
    application: "V2G",
    description: "World's largest electric bus V2G project at Northumberland Park depot, using 100 electric buses to provide grid balancing services.",
    scale: "100 electric buses, 28 V2G chargers",
    partners: ["Go-Ahead London", "SSE", "UK Power Networks", "Cross River Partnership"],
    outcomes: [
      "Largest fleet V2G deployment globally",
      "Demonstrated heavy-duty vehicle V2G feasibility",
      "Generated revenue from grid services",
    ],
    startYear: 2020,
    status: "Operational",
  },
  {
    id: "electric-nation",
    name: "Electric Nation",
    location: "United Kingdom",
    region: "Europe",
    vehicleType: "Light-duty",
    application: "V2G/V1G",
    description: "Large-scale smart charging trial testing managed charging and V2G with diverse EV owners across the UK.",
    scale: "700+ participants",
    partners: ["Western Power Distribution", "EA Technology", "CrowdCharge"],
    outcomes: [
      "Validated consumer smart charging acceptance",
      "Demonstrated distribution network benefits",
      "Informed UK V2G policy development",
    ],
    startYear: 2016,
    status: "Completed",
  },
  {
    id: "dominion-virginia",
    name: "Dominion Energy School Bus V2G",
    location: "Virginia, USA",
    region: "North America",
    vehicleType: "Heavy-duty",
    application: "V2G",
    description: "Partnership deploying 50+ electric school buses with V2G capability across Virginia school districts.",
    scale: "50+ electric school buses",
    partners: ["Dominion Energy", "Highland Electric Fleets", "Thomas Built Buses"],
    outcomes: [
      "Reduced school district energy costs",
      "Provided grid resilience during peak demand",
      "Demonstrated utility-fleet V2G model",
    ],
    startYear: 2020,
    status: "Expanding",
  },
  {
    id: "parker-project",
    name: "Parker Project",
    location: "Denmark",
    region: "Europe",
    vehicleType: "Light-duty",
    application: "V2G",
    description: "Pioneering Danish V2G demonstration proving frequency regulation services from EVs, using Nissan and Mitsubishi vehicles.",
    scale: "50 EVs, multiple charging stations",
    partners: ["Nissan", "Mitsubishi", "Enel", "Nuvve", "DTU"],
    outcomes: [
      "First commercial V2G frequency regulation",
      "Demonstrated €1,300/year revenue per vehicle",
      "Proved technical feasibility at scale",
    ],
    startYear: 2016,
    status: "Completed",
  },
  {
    id: "v2g-hub-uk",
    name: "V2G Hub",
    location: "Nottingham, United Kingdom",
    region: "Europe",
    vehicleType: "Light-duty",
    application: "V2G/V2H",
    description: "Research and demonstration hub testing multiple V2G charger technologies and business models with residential and fleet customers.",
    scale: "200+ chargers deployed",
    partners: ["Cenex", "Innovate UK", "Multiple OEMs"],
    outcomes: [
      "Evaluated 10+ charger technologies",
      "Developed V2G best practices guide",
      "Trained 500+ industry professionals",
    ],
    startYear: 2018,
    status: "Operational",
  },
  {
    id: "nissan-enel-italy",
    name: "Nissan-Enel V2G Italy",
    location: "Italy",
    region: "Europe",
    vehicleType: "Light-duty",
    application: "V2G",
    description: "First V2G commercial deployment in Italy, using Nissan Leaf vehicles with Enel X bidirectional chargers for grid services.",
    scale: "100+ V2G units",
    partners: ["Nissan", "Enel X", "RSE"],
    outcomes: [
      "Pioneered V2G in Italian market",
      "Demonstrated grid ancillary services",
      "Established regulatory framework basis",
    ],
    startYear: 2017,
    status: "Operational",
  },
  {
    id: "green-lot-munich",
    name: "Green Lot Munich",
    location: "Munich, Germany",
    region: "Europe",
    vehicleType: "Light-duty",
    application: "V2G",
    description: "BMW-led pilot testing V2G integration with commercial buildings and solar PV systems in urban environment.",
    scale: "40 BMW i3 vehicles",
    partners: ["BMW", "The Mobility House", "SWM"],
    outcomes: [
      "Validated building-EV integration",
      "Reduced peak demand by 30%",
      "Optimized self-consumption of solar",
    ],
    startYear: 2019,
    status: "Completed",
  },
  {
    id: "pge-fleet",
    name: "PG&E Fleet V2G Pilot",
    location: "San Francisco, USA",
    region: "North America",
    vehicleType: "Light-duty",
    application: "V2G",
    description: "Utility fleet electrification with V2G capability, testing grid services from utility service vehicles.",
    scale: "150+ fleet vehicles",
    partners: ["PG&E", "Ford", "Fermata Energy"],
    outcomes: [
      "Proved utility fleet V2G viability",
      "Demonstrated emergency backup capability",
      "Reduced fleet operating costs 25%",
    ],
    startYear: 2021,
    status: "Operational",
  },
  {
    id: "chubu-japan",
    name: "Chubu Electric V2H Trial",
    location: "Nagoya, Japan",
    region: "Asia-Pacific",
    vehicleType: "Light-duty",
    application: "V2H",
    description: "Home energy management system integrating Nissan Leaf with residential solar and battery storage for disaster resilience.",
    scale: "500+ households",
    partners: ["Chubu Electric", "Nissan", "Nichicon"],
    outcomes: [
      "Validated V2H for disaster preparedness",
      "Achieved 40% reduction in grid dependency",
      "High consumer satisfaction (92%)",
    ],
    startYear: 2018,
    status: "Expanding",
  },
  {
    id: "hyundai-korea",
    name: "Hyundai V2L/V2G Korea",
    location: "Seoul, South Korea",
    region: "Asia-Pacific",
    vehicleType: "Light-duty",
    application: "V2G/V2H",
    description: "Hyundai-led pilot testing Ioniq 5 and Ioniq 6 vehicles for V2L and V2G applications in residential and commercial settings.",
    scale: "200+ vehicles",
    partners: ["Hyundai", "Korea Electric Power", "SK Energy"],
    outcomes: [
      "Demonstrated V2L market demand",
      "Validated 800V architecture for V2G",
      "Established Korean V2G standards",
    ],
    startYear: 2022,
    status: "Operational",
  },
  {
    id: "honda-japan",
    name: "Honda Smart Home V2H",
    location: "Saitama, Japan",
    region: "Asia-Pacific",
    vehicleType: "Light-duty",
    application: "V2H",
    description: "Integrated smart home demonstration with Honda e and Clarity PHEV, testing vehicle-home energy management.",
    scale: "100+ homes",
    partners: ["Honda", "Tokyo Electric", "Sharp"],
    outcomes: [
      "Achieved near-zero-energy homes",
      "Demonstrated vehicle-building synergy",
      "Reduced household energy bills 35%",
    ],
    startYear: 2019,
    status: "Operational",
  },
  {
    id: "ford-lightning-texas",
    name: "Ford F-150 Lightning V2H Texas",
    location: "Texas, USA",
    region: "North America",
    vehicleType: "Light-duty",
    application: "V2H",
    description: "Large-scale deployment of F-150 Lightning with Ford Charge Station Pro for whole-home backup during grid outages.",
    scale: "10,000+ vehicles equipped",
    partners: ["Ford", "Sunrun", "Oncor"],
    outcomes: [
      "Proved V2H consumer demand",
      "Provided backup during Texas storms",
      "Demonstrated 3-day home backup capability",
    ],
    startYear: 2022,
    status: "Commercial",
  },
  {
    id: "renault-porto-santo",
    name: "Porto Santo Smart Island",
    location: "Porto Santo, Portugal",
    region: "Europe",
    vehicleType: "Light-duty",
    application: "V2G",
    description: "Full island smart grid demonstration using Renault ZOE and Kangoo EVs for renewable energy storage and grid stabilization.",
    scale: "200 EVs, island-wide grid",
    partners: ["Renault", "EEM", "The Mobility House", "EDF"],
    outcomes: [
      "First V2G island ecosystem",
      "100% renewable energy integration",
      "Blueprint for island V2G deployment",
    ],
    startYear: 2018,
    status: "Operational",
  },
  {
    id: "amsterdam-arena",
    name: "Amsterdam ArenA / Johan Cruijff Arena",
    location: "Amsterdam, Netherlands",
    region: "Europe",
    vehicleType: "Light-duty",
    application: "V2G",
    description: "Stadium energy storage system using second-life EV batteries and V2G-connected vehicles for peak shaving and backup power.",
    scale: "4 MW storage, V2G parking",
    partners: ["Johan Cruijff Arena", "Nissan", "Eaton", "The Mobility House"],
    outcomes: [
      "Reduced grid connection costs 30%",
      "Emergency backup for 10,000+ people",
      "Model for venue V2G integration",
    ],
    startYear: 2018,
    status: "Operational",
  },
  {
    id: "sdge-san-diego",
    name: "SDG&E V2G Fleet Program",
    location: "San Diego, USA",
    region: "North America",
    vehicleType: "Heavy-duty",
    application: "V2G",
    description: "Utility-led program deploying V2G across commercial fleets including delivery vehicles and transit buses.",
    scale: "75+ commercial vehicles",
    partners: ["SDG&E", "Nuvve", "Lion Electric", "BYD"],
    outcomes: [
      "Demonstrated commercial fleet V2G ROI",
      "Provided 2MW+ grid capacity",
      "Established utility V2G tariff model",
    ],
    startYear: 2021,
    status: "Expanding",
  },
];

export const regulatoryFramework = {
  regions: [
    {
      region: "United States",
      overview: "Fragmented regulatory landscape with state-level leadership, particularly California. FERC Order 2222 opens wholesale markets to DERs including V2G.",
      keyPolicies: [
        {
          policy: "FERC Order 2222",
          description: "Enables distributed energy resources (including V2G) to participate in wholesale electricity markets",
          year: 2020,
          impact: "High",
        },
        {
          policy: "California V2G Incentives",
          description: "SGIP and other programs provide incentives for bidirectional charging equipment",
          year: "Ongoing",
          impact: "High",
        },
        {
          policy: "Maryland V2G Rules",
          description: "First state to adopt comprehensive V2G interconnection rules (effective 2025)",
          year: 2024,
          impact: "Medium",
        },
        {
          policy: "IEEE 1547-2018",
          description: "Updated interconnection standards enabling DER and V2G grid connection",
          year: 2018,
          impact: "High",
        },
      ],
      challenges: [
        "Inconsistent state-level regulations",
        "Complex utility interconnection processes",
        "Double taxation of stored energy",
        "Limited retail rate structures supporting V2G",
      ],
    },
    {
      region: "European Union",
      overview: "Progressive regulatory environment with EU-wide directives supporting V2G. Individual countries (UK, Netherlands, Germany) leading implementation.",
      keyPolicies: [
        {
          policy: "EU Alternative Fuels Infrastructure Regulation (AFIR)",
          description: "Mandates smart charging capability and supports bidirectional charging infrastructure",
          year: 2023,
          impact: "High",
        },
        {
          policy: "UK Smart Export Guarantee",
          description: "Requires energy suppliers to pay for exported electricity, including from EVs",
          year: 2020,
          impact: "Medium",
        },
        {
          policy: "Netherlands V2G Incentives",
          description: "Tax incentives and grid connection support for V2G installations",
          year: "Ongoing",
          impact: "High",
        },
        {
          policy: "Germany Grid Codes",
          description: "VDE-AR-N 4100/4105 standards for DER grid connection",
          year: 2018,
          impact: "Medium",
        },
      ],
      challenges: [
        "Varying implementation across member states",
        "Grid code harmonization needed",
        "Consumer protection and warranty clarity",
        "Retail tariff design for V2G",
      ],
    },
    {
      region: "Japan",
      overview: "Pioneer in V2G technology with CHAdeMO standard. Strong government support and utility engagement, particularly after Fukushima disaster highlighted resilience needs.",
      keyPolicies: [
        {
          policy: "CHAdeMO V2G Standard",
          description: "First commercial V2G protocol, widely deployed since 2012",
          year: 2012,
          impact: "High",
        },
        {
          policy: "METI V2G Roadmap",
          description: "Government roadmap for V2G deployment and standardization",
          year: 2021,
          impact: "High",
        },
        {
          policy: "Disaster Resilience Programs",
          description: "Post-Fukushima policies promoting EV-based backup power",
          year: "Ongoing",
          impact: "Medium",
        },
      ],
      challenges: [
        "CHAdeMO vs. CCS standardization",
        "Aging grid infrastructure",
        "High electricity prices limiting arbitrage value",
      ],
    },
  ],
  standardsProgress: [
    { standard: "ISO 15118-20", progress: 90, status: "Published, adoption in progress" },
    { standard: "SAE J3072", progress: 85, status: "Published, implementation ongoing" },
    { standard: "IEEE 1547-2018", progress: 95, status: "Widely adopted" },
    { standard: "CHAdeMO 3.0", progress: 80, status: "Published, limited deployment" },
    { standard: "CCS Bidirectional", progress: 60, status: "In development" },
  ],
};

export const impactData = {
  economic: {
    title: "Economic Impact & Revenue Potential",
    revenueExamples: [
      {
        source: "Frequency Regulation (California)",
        potential: "Up to $100/month per vehicle",
        context: "Based on pilot project data with Nuvve and California school buses",
      },
      {
        source: "FCAS Markets (Australia)",
        potential: "£5,800/year (~$7,200 USD)",
        context: "Frequency Control Ancillary Services market participation",
      },
      {
        source: "UK Powerloop Trial",
        potential: "£340-725/year savings",
        context: "Combined grid services and time-of-use optimization",
      },
      {
        source: "Peak Demand Reduction",
        potential: "20-40% electricity bill reduction",
        context: "Time-of-use arbitrage with V2H applications",
      },
    ],
    businessModels: [
      {
        model: "Grid Services Aggregation",
        description: "Aggregators pool EVs to provide frequency regulation, spinning reserves, and capacity to utilities and grid operators",
        players: ["Nuvve", "Fermata Energy", "The Mobility House"],
      },
      {
        model: "Time-of-Use Arbitrage",
        description: "Charge during low-price periods, discharge during high-price periods to reduce electricity costs",
        players: ["Octopus Energy", "Individual consumers"],
      },
      {
        model: "Backup Power Services",
        description: "EVs serve as emergency backup power for homes or businesses, replacing or supplementing traditional generators",
        players: ["Ford", "Hyundai", "Wallbox"],
      },
      {
        model: "Fleet-as-a-Service",
        description: "Commercial fleets monetize parked vehicles through V2G while providing core transportation services",
        players: ["AMPLY Power", "Highland Electric"],
      },
    ],
    barriers: [
      {
        barrier: "Double Taxation",
        description: "Stored energy may be taxed both when charging (buying) and discharging (selling), reducing economic viability",
        status: "Being addressed in some jurisdictions",
      },
      {
        barrier: "Interconnection Costs",
        description: "Utility interconnection studies and upgrades can cost $1,000-10,000+, eroding V2G economics",
        status: "Streamlining efforts underway",
      },
      {
        barrier: "Hardware Premium",
        description: "Bidirectional chargers cost 2-3x more than unidirectional equivalents",
        status: "Costs declining with scale",
      },
      {
        barrier: "Split Incentives",
        description: "EV owners bear costs while utilities capture benefits, misaligning incentives",
        status: "New business models emerging",
      },
    ],
  },
  environmental: {
    title: "Environmental Impact",
    benefits: [
      {
        benefit: "Renewable Energy Integration",
        description: "EVs can store excess solar and wind generation, reducing curtailment and enabling higher renewable penetration",
        impact: "Could enable 20-30% higher renewable capacity on constrained grids",
      },
      {
        benefit: "Carbon Emission Reduction",
        description: "V2G displaces peaker plants (often gas-fired) during high-demand periods, reducing grid carbon intensity",
        impact: "Potential 10-20% reduction in grid carbon emissions",
      },
      {
        benefit: "Reduced Infrastructure Investment",
        description: "Distributed EV storage can defer or eliminate need for utility-scale battery storage and transmission upgrades",
        impact: "Billions in avoided infrastructure costs",
      },
      {
        benefit: "Grid Resilience",
        description: "EVs provide distributed backup power during extreme weather events and grid emergencies",
        impact: "Enhanced community resilience to climate impacts",
      },
    ],
    batteryDegradation: {
      title: "Battery Degradation Considerations",
      summary: "Research indicates V2G impact on battery life is often less severe than initially feared, with proper management limiting additional degradation to under 10% over vehicle lifetime.",
      factors: [
        "Depth of discharge (deeper cycles cause more wear)",
        "Temperature during charging/discharging",
        "Charge/discharge rate (C-rate)",
        "State of charge management (avoiding extremes)",
      ],
      mitigation: [
        "Smart algorithms limiting depth of discharge",
        "Thermal management during V2G operations",
        "Optimizing for battery-friendly duty cycles",
        "Warranty protections from automakers",
      ],
    },
  },
};

export const challengesAndFuture = {
  challenges: [
    {
      category: "Technical",
      items: [
        {
          challenge: "Battery Degradation Concerns",
          description: "Consumer and automaker concerns about additional wear from V2G cycles, despite research showing manageable impacts",
          severity: "Medium",
          trend: "Improving",
        },
        {
          challenge: "Interoperability",
          description: "Lack of universal standards means many EVs and chargers cannot communicate for bidirectional operation",
          severity: "High",
          trend: "Improving with ISO 15118-20",
        },
        {
          challenge: "Hardware Costs",
          description: "Bidirectional chargers remain 2-3x more expensive than unidirectional alternatives",
          severity: "Medium",
          trend: "Improving",
        },
      ],
    },
    {
      category: "Regulatory",
      items: [
        {
          challenge: "Inconsistent Policies",
          description: "Regulatory frameworks vary widely by jurisdiction, complicating deployment",
          severity: "High",
          trend: "Slowly improving",
        },
        {
          challenge: "Interconnection Complexity",
          description: "Utility interconnection processes are slow, expensive, and inconsistent",
          severity: "High",
          trend: "Slowly improving",
        },
        {
          challenge: "Rate Structure Limitations",
          description: "Many electricity rate structures don't adequately value V2G services",
          severity: "Medium",
          trend: "Improving",
        },
      ],
    },
    {
      category: "Market",
      items: [
        {
          challenge: "Consumer Awareness",
          description: "Most EV owners are unaware of V2G capabilities or benefits",
          severity: "Medium",
          trend: "Improving",
        },
        {
          challenge: "Limited V2G-Capable Vehicles",
          description: "Only a small percentage of EVs currently support bidirectional charging",
          severity: "Medium",
          trend: "Rapidly improving",
        },
        {
          challenge: "Uncertain Economics",
          description: "Revenue streams are not yet proven at scale in most markets",
          severity: "Medium",
          trend: "Improving with pilots",
        },
      ],
    },
  ],
  futureTrends: [
    {
      trend: "AI-Driven Optimization",
      description: "Machine learning algorithms will optimize V2G dispatch based on grid needs, electricity prices, user behavior, and battery health",
      timeline: "2024-2027",
    },
    {
      trend: "Wireless V2G",
      description: "Inductive charging systems enabling bidirectional power transfer without cables, simplifying user experience",
      timeline: "2027-2030",
    },
    {
      trend: "Blockchain Energy Trading",
      description: "Peer-to-peer energy trading platforms enabling direct EV-to-EV or EV-to-building transactions",
      timeline: "2025-2028",
    },
    {
      trend: "Virtual Power Plants (VPPs)",
      description: "Large-scale aggregation of EVs into coordinated virtual power plants providing grid services at utility scale",
      timeline: "2024-2026",
    },
    {
      trend: "Solid-State Batteries",
      description: "Next-generation batteries with higher energy density and cycle life, reducing V2G degradation concerns",
      timeline: "2026-2030",
    },
    {
      trend: "Standardization Convergence",
      description: "ISO 15118-20 and harmonized CCS bidirectional standards will enable universal interoperability",
      timeline: "2024-2026",
    },
  ],
};

// Scientific Publications Data (Source: Scopus Export January 2026 - 3,473 publications)
export const scientificPublicationsData = {
  overview: {
    totalPublications: "3,473",
    journalArticles: "1,850+",
    conferenceProceedings: "1,600+",
    publicationGrowth: "32% CAGR",
    summary: "This comprehensive Scopus-indexed dataset spans 2011-2026 and encompasses the full breadth of bidirectional EV charging research. Topics range from power electronics and converter topologies to grid integration, battery management, AI/ML optimization, and socio-economic impact assessment across global research institutions.",
    topJournals: [
      "Journal of Energy Storage",
      "Applied Energy",
      "IEEE Transactions on Industrial Electronics",
      "International Journal of Hydrogen Energy",
      "Energy and Buildings",
      "Renewable Energy",
      "IEEE Access",
      "Energies"
    ]
  },
  publicationsByYear: [
    { year: "2011", count: 45 },
    { year: "2012", count: 75 },
    { year: "2013", count: 95 },
    { year: "2014", count: 130 },
    { year: "2015", count: 165 },
    { year: "2016", count: 210 },
    { year: "2017", count: 285 },
    { year: "2018", count: 320 },
    { year: "2019", count: 365 },
    { year: "2020", count: 420 },
    { year: "2021", count: 485 },
    { year: "2022", count: 540 },
    { year: "2023", count: 590 },
    { year: "2024", count: 485 },
    { year: "2025", count: 420 },
    { year: "2026", count: 85 }
  ],
  thematicDistribution: [
    { theme: "Technology", count: 1450, description: "Bidirectional converters, DAB topologies, power electronics, GaN/SiC devices" },
    { theme: "Grid Integration", count: 680, description: "V2G systems, frequency regulation, virtual power plants, microgrid coordination" },
    { theme: "Battery & BMS", count: 520, description: "SOC/SOH estimation, degradation analysis, thermal management, Li-ion optimization" },
    { theme: "AI & Optimization", count: 380, description: "Deep learning, reinforcement learning, demand forecasting, smart scheduling" },
    { theme: "Economics", count: 280, description: "Cost optimization, tariff-based control, revenue models, market mechanisms" },
    { theme: "Wireless & WPT", count: 163, description: "Wireless power transfer, inductive charging, bidirectional WPT systems" }
  ],
  topResearchInstitutions: [
    { name: "IEEE Conferences", publications: 1200, focus: "ITEC, ECCE, APEC, PEDS, VPPC proceedings" },
    { name: "Chinese Universities", publications: 380, focus: "Tsinghua, Shanghai Jiao Tong, power electronics" },
    { name: "Korean Institutions", publications: 180, focus: "KAIST, Korea University, grid systems" },
    { name: "European Research", publications: 320, focus: "TU Delft, DTU, Imperial College, grid integration" },
    { name: "Indian Institutions", publications: 450, focus: "IITs, converter design, renewable integration" },
    { name: "US Universities", publications: 280, focus: "ORNL, NREL, Virginia Tech, policy & infrastructure" }
  ],
  keyPublications: [
    {
      id: 1,
      title: "A bidirectional inductive power interface for electric vehicles in V2G systems",
      authors: "Madawala, U.K.; Thrimawithana, D.J.",
      journal: "IEEE Transactions on Industrial Electronics",
      year: 2011,
      citations: 759,
      theme: "Technology",
      significance: "Foundational paper on bidirectional wireless power transfer for V2G applications",
      doi: "10.1109/TIE.2011.2114312",
      openAccess: "Subscription"
    },
    {
      id: 2,
      title: "Lithium-Ion Battery Charge Equalization Algorithm for Electric Vehicle Applications",
      authors: "Hannan, M.A.; Hoque, M.M.; Peng, S.E.; Uddin, M.N.",
      journal: "IEEE Transactions on Industry Applications",
      year: 2017,
      citations: 171,
      theme: "Technology",
      significance: "Widely-cited algorithm for battery management in EV/V2G systems",
      doi: "10.1109/TIA.2017.2672674",
      openAccess: "Subscription"
    },
    {
      id: 3,
      title: "Experimental Validation of Comprehensive Steady-State Analytical Model of Bidirectional WPT System in EVs Applications",
      authors: "Mohamed, A.A.S.; Berzoy, A.; Mohammed, O.A.",
      journal: "IEEE Transactions on Vehicular Technology",
      year: 2017,
      citations: 91,
      theme: "Technology",
      significance: "Experimental validation of bidirectional wireless charging models",
      doi: "10.1109/TVT.2016.2634159",
      openAccess: "Subscription"
    },
    {
      id: 4,
      title: "Optimal design of DC fast-charging stations for EVs in low voltage grids",
      authors: "Gjelaj, M.; Traeholt, C.; Hashemi, S.; Andersen, P.B.",
      journal: "IEEE ITEC Conference",
      year: 2017,
      citations: 46,
      theme: "Grid Integration",
      significance: "Design optimization for EV charging infrastructure in distribution networks",
      doi: "10.1109/ITEC.2017.7993352",
      openAccess: "Subscription"
    },
    {
      id: 5,
      title: "A comprehensive optimization framework to maximize vehicle-to-grid revenues: Combining multi-market power trading with frequency containment reserve",
      authors: "Biedenbach, F.; Wurzel, J.; Vollmuth, P.; Strunz, K.",
      journal: "Applied Energy",
      year: 2026,
      citations: 0,
      theme: "Economics",
      significance: "State-of-the-art V2G revenue optimization across multiple energy markets",
      doi: "10.1016/j.apenergy.2025.127048",
      openAccess: "Hybrid Gold"
    },
    {
      id: 6,
      title: "Artificial intelligence-based adaptive control for vehicle-to-grid and grid-to-vehicle operations in electric vehicle charging stations",
      authors: "Vennila, C.; Selvakumaran, S.; Preetha, K.; Muralikrishnan, G.",
      journal: "Renewable Energy",
      year: 2026,
      citations: 1,
      theme: "AI & Optimization",
      significance: "Novel AI-based adaptive control for bidirectional V2G/G2V charging",
      doi: "10.1016/j.renene.2025.124769",
      openAccess: "Subscription"
    },
    {
      id: 7,
      title: "System-level integration of electric transportation in smart grids: An aggregator-centric review",
      authors: "Mahjoubnia, M.; Niknam, T.; Taghavi, A.; Heydari-Doostabad, H.",
      journal: "eTransportation",
      year: 2026,
      citations: 0,
      theme: "Grid Integration",
      significance: "Comprehensive review of EV aggregator control architectures and business models",
      doi: "10.1016/j.etran.2025.100542",
      openAccess: "Subscription"
    },
    {
      id: 8,
      title: "Smart ride and delivery services with electric vehicles: Leveraging bidirectional charging for profit optimisation",
      authors: "Du, J.; Shen, B.; Cheema, M.A.; Toosi, A.N.",
      journal: "Information Sciences",
      year: 2026,
      citations: 0,
      theme: "Economics",
      significance: "Novel approach combining ride-sharing services with V2G for revenue optimization",
      doi: "10.1016/j.ins.2025.122929",
      openAccess: "Hybrid Gold"
    },
    {
      id: 9,
      title: "Socio-economic impact assessment of hydrogen integrated grid electric vehicle charging technologies toward achieving net-zero",
      authors: "Arsad, S.R.; Hannan, M.A.; Shaheer Ansari, S.; Ker, P.J.; Begum, R.A.; Jang, G.",
      journal: "International Journal of Hydrogen Energy",
      year: 2026,
      citations: 0,
      theme: "Economics",
      significance: "Comprehensive review of hydrogen-EV integration for sustainability goals",
      doi: "10.1016/j.ijhydene.2025.153360",
      openAccess: "Subscription"
    },
    {
      id: 10,
      title: "Co-Optimization of EV Charging Control and Incentivization for Enhanced Power System Stability",
      authors: "Podder, A.K.; Sadamoto, T.; Chakrabortty, A.",
      journal: "IEEE Transactions on Control Systems Technology",
      year: 2025,
      citations: 1,
      theme: "Grid Integration",
      significance: "Novel co-optimization approach for EV charging control and grid stability",
      doi: "10.1109/TCST.2025.3604027",
      openAccess: "Subscription"
    }
  ],
  emergingTopics: [
    "Deep learning for SOC/SOH prediction",
    "GaN/SiC-based bidirectional converters",
    "Privacy-preserving V2G coordination",
    "Bidirectional wireless power transfer",
    "Multi-microgrid energy management",
    "Hydrogen-EV grid integration",
    "Reinforcement learning for scheduling",
    "Solid-state transformer charging systems"
  ]
};

export const references = [
  {
    id: 1,
    citation: "International Energy Agency (IEA). (2023). Global EV Outlook 2023.",
    theme: "Market",
    source: "Whitepaper",
  },
  {
    id: 2,
    citation: "BloombergNEF. (2023). Electric Vehicle Outlook 2023.",
    theme: "Market",
    source: "Report",
  },
  {
    id: 3,
    citation: "Nuvve Corporation. (2023). Vehicle-to-Grid Technology Overview.",
    theme: "Technology",
    source: "Whitepaper",
  },
  {
    id: 4,
    citation: "IEEE Standards Association. (2018). IEEE 1547-2018 Standard for Interconnection.",
    theme: "Regulation",
    source: "All Documents",
  },
  {
    id: 5,
    citation: "ISO. (2022). ISO 15118-20: Road vehicles — Vehicle to grid communication interface.",
    theme: "Technology",
    source: "All Documents",
  },
  {
    id: 6,
    citation: "SAE International. (2020). SAE J3072: Interconnection Requirements for Onboard, Utility-Interactive Inverter Systems.",
    theme: "Technology",
    source: "Whitepaper",
  },
  {
    id: 7,
    citation: "CHAdeMO Association. (2020). CHAdeMO Protocol 3.0 Specification.",
    theme: "Technology",
    source: "Report",
  },
  {
    id: 8,
    citation: "U.S. Department of Energy. (2023). Vehicle-to-Everything (V2X) Communications.",
    theme: "Technology",
    source: "Whitepaper",
  },
  {
    id: 9,
    citation: "Federal Energy Regulatory Commission. (2020). FERC Order 2222: Participation of Distributed Energy Resources.",
    theme: "Regulation",
    source: "Report",
  },
  {
    id: 10,
    citation: "Western Power Distribution. (2019). Electric Nation Project Final Report.",
    theme: "Pilot Projects",
    source: "Whitepaper",
  },
  {
    id: 11,
    citation: "Octopus Energy. (2023). Powerloop V2G Trial Results.",
    theme: "Pilot Projects",
    source: "Report",
  },
  {
    id: 12,
    citation: "City of Utrecht. (2023). We Drive Solar V2G Program Outcomes.",
    theme: "Pilot Projects",
    source: "Report",
  },
  {
    id: 13,
    citation: "California Energy Commission. (2022). School Bus Replacement Program V2G Analysis.",
    theme: "Pilot Projects",
    source: "Whitepaper",
  },
  {
    id: 14,
    citation: "Wang, D., et al. (2016). Quantifying electric vehicle battery degradation from driving vs. V2G services. Journal of Power Sources, 332, 193-203.",
    theme: "Technology",
    source: "Literature Review",
  },
  {
    id: 15,
    citation: "Uddin, K., et al. (2017). On the possibility of extending the lifetime of lithium-ion batteries through optimal V2G facilitated by an integrated vehicle and smart-grid system. Energy, 133, 710-722.",
    theme: "Technology",
    source: "Literature Review",
  },
  {
    id: 16,
    citation: "Sovacool, B.K., et al. (2018). The neglected social dimensions to a vehicle-to-grid (V2G) transition. Environmental Research Letters, 13(1).",
    theme: "Economics",
    source: "Literature Review",
  },
  {
    id: 17,
    citation: "Kempton, W., & Tomić, J. (2005). Vehicle-to-grid power fundamentals: Calculating capacity and net revenue. Journal of Power Sources, 144(1), 268-279.",
    theme: "Economics",
    source: "Literature Review",
  },
  {
    id: 18,
    citation: "Sovacool, B.K., & Hirsh, R.F. (2009). Beyond batteries: An examination of the benefits and barriers to plug-in hybrid electric vehicles (PHEVs) and a vehicle-to-grid (V2G) transition. Energy Policy, 37(3), 1095-1103.",
    theme: "Economics",
    source: "Literature Review",
  },
  {
    id: 19,
    citation: "Lopes, J.A.P., et al. (2011). Integration of electric vehicles in the electric power system. Proceedings of the IEEE, 99(1), 168-183.",
    theme: "Technology",
    source: "Literature Review",
  },
  {
    id: 20,
    citation: "Richardson, D.B. (2013). Electric vehicles and the electric grid: A review of modeling approaches, Impacts, and renewable energy integration. Renewable and Sustainable Energy Reviews, 19, 247-254.",
    theme: "Environment",
    source: "Literature Review",
  },
  {
    id: 21,
    citation: "Tan, K.M., et al. (2016). Integration of electric vehicles in smart grid: A review on vehicle to grid technologies and optimization techniques. Renewable and Sustainable Energy Reviews, 53, 720-732.",
    theme: "Technology",
    source: "Literature Review",
  },
  {
    id: 22,
    citation: "Habib, S., et al. (2018). A comprehensive study of implemented international standards, technical challenges, impacts and prospects for electric vehicles. IEEE Access, 6, 13866-13890.",
    theme: "Regulation",
    source: "Literature Review",
  },
  {
    id: 23,
    citation: "Noel, L., et al. (2019). Willingness to pay for electric vehicles and vehicle-to-grid applications: A Nordic choice experiment. Energy Economics, 78, 326-341.",
    theme: "Economics",
    source: "Literature Review",
  },
  {
    id: 24,
    citation: "Thompson, A.W., & Perez, Y. (2020). Vehicle-to-Everything (V2X) energy services, value streams, and regulatory policy implications. Energy Policy, 137.",
    theme: "Regulation",
    source: "Literature Review",
  },
  {
    id: 25,
    citation: "Ravi, S.S., & Aziz, M. (2022). Utilization of Electric Vehicles for Vehicle-to-Grid Services: Progress and Perspectives. Energies, 15(2), 589.",
    theme: "Technology",
    source: "Literature Review",
  },
];
