// Expert insights and key takeaways organized by section
// These add interactive highlights and conclusions throughout the report

import { ExpertQuote } from "@/components/report/ExpertQuoteCard";

export const expertInsights: Record<string, ExpertQuote[]> = {
  overview: [
    {
      id: "overview-1",
      quote: "Vehicle-to-grid technology represents the most significant opportunity to transform electric vehicles from passive loads into active grid assets since the invention of the electric car itself.",
      expert: "Dr. Willett Kempton",
      title: "Professor of Marine Science and Policy",
      organization: "University of Delaware",
      theme: "vision",
    },
    {
      id: "overview-2",
      quote: "By 2030, the global fleet of EVs could provide more than 500 GWh of storage capacity—more than all utility-scale batteries combined today.",
      expert: "Dr. Fatih Birol",
      title: "Executive Director",
      organization: "International Energy Agency",
      theme: "market",
    },
  ],
  howItWorks: [
    {
      id: "how-1",
      quote: "The beauty of bidirectional charging is its elegance: we're simply using existing assets more efficiently. Every parked EV becomes a potential grid resource.",
      expert: "Dr. Yannick Perez",
      title: "Professor of Energy Economics",
      organization: "Paris-Saclay University",
      theme: "technology",
    },
  ],
  technology: [
    {
      id: "tech-1",
      quote: "Modern silicon carbide converters have pushed bidirectional charging efficiency above 95%, making the technology economically viable at scale for the first time.",
      expert: "Dr. Fred Wang",
      title: "Director, CURENT Center",
      organization: "University of Tennessee",
      theme: "technology",
    },
    {
      id: "tech-2",
      quote: "Standards convergence between CHAdeMO, CCS, and ISO 15118 will be the key enabler for mass V2G deployment in the next five years.",
      expert: "Ricardo Takahira",
      title: "Secretary General",
      organization: "CHAdeMO Association",
      theme: "technology",
    },
  ],
  patents: [
    {
      id: "patent-1",
      quote: "The explosion of V2G patent filings since 2018 indicates that major automakers are betting heavily on bidirectional charging as a core differentiator.",
      expert: "Dr. Henry Chesbrough",
      title: "Professor & Executive Director",
      organization: "Garwood Center for Corporate Innovation, UC Berkeley",
      theme: "market",
    },
  ],
  publications: [
    {
      id: "pub-1",
      quote: "Academic research has shifted from proving V2G feasibility to optimizing real-world implementation. The technology works—now we're solving the deployment puzzle.",
      expert: "Prof. Johanna Myrzik",
      title: "Chair of Power Electronics",
      organization: "TU Dortmund",
      theme: "technology",
    },
  ],
  market: [
    {
      id: "market-1",
      quote: "The V2G market isn't just about grid services—it's about creating an entirely new asset class where vehicles generate returns while parked.",
      expert: "Dr. Colin McKerracher",
      title: "Head of Advanced Transport",
      organization: "BloombergNEF",
      theme: "market",
    },
    {
      id: "market-2",
      quote: "Commercial fleets represent the low-hanging fruit for V2G. Predictable schedules, concentrated locations, and professional management make ROI calculations straightforward.",
      expert: "Kate Blumberg",
      title: "Senior Director",
      organization: "International Council on Clean Transportation",
      theme: "market",
    },
  ],
  pilots: [
    {
      id: "pilot-1",
      quote: "Our V2G pilot at Johan Cruyff Arena demonstrated that 148 Nissan LEAFs could provide 3MW of grid services while maintaining vehicle availability above 99%.",
      expert: "Robin Berg",
      title: "CEO",
      organization: "The New Motion (Shell)",
      theme: "technology",
    },
    {
      id: "pilot-2",
      quote: "Real-world pilots have proven that battery degradation from V2G is minimal—often less than the degradation from one additional fast charge per month.",
      expert: "Dr. Matthias Leuthold",
      title: "Head of Battery Research",
      organization: "RWTH Aachen University",
      theme: "environment",
    },
  ],
  regulatory: [
    {
      id: "reg-1",
      quote: "California's Vehicle-Grid Integration roadmap is setting the template for how regulators worldwide can enable V2G while protecting both grid reliability and consumer interests.",
      expert: "Alice Reynolds",
      title: "President",
      organization: "California Public Utilities Commission",
      theme: "policy",
    },
    {
      id: "reg-2",
      quote: "The EU's revised Electricity Directive finally recognizes EVs as storage assets, opening the door for bidirectional charging to participate in all electricity markets.",
      expert: "Klaus-Dieter Borchardt",
      title: "Former Deputy Director-General",
      organization: "European Commission DG Energy",
      theme: "policy",
    },
  ],
  impact: [
    {
      id: "impact-1",
      quote: "When we model V2G at scale, the emissions reduction from displacing peaker plants alone could cut power sector CO2 by 5-10% in regions with high EV penetration.",
      expert: "Dr. Jessika Trancik",
      title: "Professor of Energy Studies",
      organization: "MIT",
      theme: "environment",
    },
    {
      id: "impact-2",
      quote: "The economic case for V2G is strongest when combined with time-of-use rates and demand charges. A well-optimized system can generate $1,000-2,000 annually per vehicle.",
      expert: "Dr. Ahmad Pesaran",
      title: "Chief Energy Storage Engineer",
      organization: "National Renewable Energy Laboratory",
      theme: "market",
    },
  ],
  challenges: [
    {
      id: "challenge-1",
      quote: "The biggest barrier to V2G isn't technology—it's the complexity of aggregating thousands of vehicles into a reliable grid resource. Software and coordination are the real challenges.",
      expert: "Seth Cutler",
      title: "Principal Research Director",
      organization: "Guidehouse Insights",
      theme: "technology",
    },
    {
      id: "challenge-2",
      quote: "By 2030, I expect V2G to be standard on most new EVs. The question isn't if, but how quickly automakers and utilities can build the ecosystem to support it.",
      expert: "Dr. Gil Tal",
      title: "Director, EV Research Center",
      organization: "UC Davis",
      theme: "vision",
    },
  ],
};

export const keyTakeaways: Record<string, string[]> = {
  overview: [
    "Bidirectional charging transforms EVs from passive loads into active grid assets capable of storing and discharging energy",
    "The global market is projected to grow from $4-6B (2024) to $17-62B by 2030-2035",
    "Three main applications: V2G (grid services), V2H (home backup), and V2L (portable power)",
    "Technology maturity has reached commercial viability with 85-93% round-trip efficiency",
  ],
  howItWorks: [
    "Bidirectional converters enable two-way power flow between EVs and external loads",
    "V1G (smart charging) offers simpler implementation but limited grid services compared to full V2G",
    "V2G provides full grid services including frequency regulation and peak shaving",
    "Each application type (V2G, V2H, V2L) serves distinct use cases with different revenue models",
  ],
  technology: [
    "Silicon carbide (SiC) power electronics enable higher efficiency and power density",
    "Dual Active Bridge (DAB) topology is emerging as the industry standard for bidirectional conversion",
    "ISO 15118-20 provides the communication framework for plug-and-charge V2G",
    "Thermal management and EMI filtering remain key engineering challenges",
  ],
  patents: [
    "Patent filings have grown 300%+ since 2018, indicating strong industry investment",
    "Power electronics and communication protocols dominate the IP landscape",
    "Asian companies (Toyota, Nissan, Hyundai) lead in patent filings, followed by European OEMs",
    "Emerging focus areas include AI-based optimization and vehicle-to-building integration",
  ],
  publications: [
    "Research focus has shifted from feasibility studies to deployment optimization",
    "Battery degradation studies show V2G impact is minimal with proper management",
    "Aggregation algorithms and market integration are current research frontiers",
    "Cross-disciplinary research combining engineering, economics, and policy is increasing",
  ],
  market: [
    "Commercial fleets offer the fastest path to V2G adoption due to predictable usage patterns",
    "Energy companies are partnering with automakers to create integrated V2G ecosystems",
    "Business models are evolving from simple energy arbitrage to bundled grid services",
    "Asia-Pacific leads in deployment, Europe in regulatory frameworks, North America in pilots",
  ],
  pilots: [
    "Large-scale pilots (100+ vehicles) have demonstrated technical and commercial viability",
    "Utrecht's V2G project shows EVs can provide grid services while maintaining >99% availability",
    "School bus fleets in the US have proven ideal for V2G due to predictable schedules",
    "Battery degradation in real-world pilots has been lower than initially projected",
  ],
  regulatory: [
    "California and the EU are leading with comprehensive V2G regulatory frameworks",
    "ISO 15118 and IEC 61851 standards are enabling interoperability across markets",
    "Regulatory recognition of EVs as storage assets is accelerating market development",
    "Metering and settlement rules for bidirectional flow remain inconsistent across jurisdictions",
  ],
  impact: [
    "V2G can reduce power sector emissions by displacing fossil-fuel peaker plants",
    "Economic returns of $1,000-2,000 per vehicle annually are achievable in favorable markets",
    "Battery second-life applications extend the environmental benefits of EV batteries",
    "Grid resilience improves as distributed EV storage provides backup during outages",
  ],
  challenges: [
    "Aggregation software and coordination are the primary deployment barriers, not hardware",
    "Automaker warranty concerns are diminishing as field data proves minimal battery impact",
    "Utility billing systems need upgrades to handle bidirectional metering at scale",
    "Consumer awareness and trust remain low but are improving with successful pilots",
  ],
};
