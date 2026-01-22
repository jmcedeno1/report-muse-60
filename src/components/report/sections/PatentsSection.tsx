import { useState } from "react";
import { patentData } from "@/data/reportData";
import { CollapsibleCard } from "@/components/report/CollapsibleCard";
import { FilterTabs } from "@/components/report/FilterTabs";
import { Shield, TrendingUp, Users, Lightbulb, Calendar, FileText, Globe, Layers, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  Area,
  AreaChart
} from "recharts";

type PatentFamily = "all" | "power-electronics" | "communication-protocols" | "grid-integration" | "battery-management" | "vehicle-home" | "charging-infrastructure";

const familyFilters = [
  { value: "all", label: "All Families" },
  { value: "power-electronics", label: "Power Electronics" },
  { value: "communication-protocols", label: "Communication" },
  { value: "grid-integration", label: "Grid Integration" },
  { value: "battery-management", label: "Battery Management" },
  { value: "vehicle-home", label: "V2H/Building" },
  { value: "charging-infrastructure", label: "Infrastructure" },
];

const CHART_COLORS = [
  "hsl(232, 32%, 38%)",   // Deep purple (#414A7F)
  "hsl(231, 97%, 75%)",   // Light purple (#8193FD)
  "hsl(231, 100%, 82%)",  // Soft lavender (#A1AFFF)
  "hsl(330, 65%, 55%)",   // Rose pink
  "hsl(210, 60%, 50%)",   // Steel blue
  "hsl(220, 15%, 55%)",   // Warm grey
];

// Prepare data for charts
const familyDistribution = patentData.patentFamilies.map((family) => ({
  name: family.name.split(" ")[0],
  fullName: family.name,
  count: parseInt(family.patentCount.replace("+", "")),
}));

const topApplicantsChart = patentData.trendAnalysis.topApplicants.slice(0, 6);

const summaryMetrics = [
  { label: "Total Patents", value: patentData.overview.totalPatents, icon: FileText },
  { label: "Patent Families", value: "6", icon: Layers },
  { label: "Filing Growth", value: "45% CAGR", icon: TrendingUp },
  { label: "Key Regions", value: "5", icon: Globe },
  { label: "Top Applicants", value: "8+", icon: Users },
  { label: "Data Source", value: "Espacenet", icon: Lightbulb },
];

export function PatentsSection() {
  const [selectedFamily, setSelectedFamily] = useState<PatentFamily>("all");

  const filteredFamilies = selectedFamily === "all"
    ? patentData.patentFamilies
    : patentData.patentFamilies.filter((f) => f.id === selectedFamily);

  return (
    <section id="patents" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Patents & IP Landscape
        </h2>
      </div>

      <p className="text-muted-foreground mb-8 leading-relaxed">
        {patentData.overview.summary}
      </p>

      {/* Summary Dashboard */}
      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-primary" />
            Patent Landscape Summary
            <Badge variant="outline" className="ml-2 text-xs font-normal">
              <Globe className="h-3 w-3 mr-1" />
              Espacenet Database
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {summaryMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="bg-background rounded-lg p-4 text-center border border-border/50"
                >
                  <IconComponent className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              );
            })}
          </div>

          {/* Combined Patent Family Timeline Chart */}
          <div className="bg-background rounded-lg p-4 border border-border/50">
            <h4 className="font-semibold text-sm mb-4 text-foreground">Patent Filings by Family Over Time</h4>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={(() => {
                // Merge all family timelines into a single dataset
                const allYears = new Set<number>();
                patentData.patentFamilies.forEach(f => f.timeline.forEach(t => allYears.add(t.year)));
                const sortedYears = Array.from(allYears).sort((a, b) => a - b);
                
                return sortedYears.map(year => {
                  const point: Record<string, number> = { year };
                  patentData.patentFamilies.forEach(family => {
                    const entry = family.timeline.find(t => t.year === year);
                    point[family.id] = entry?.count || 0;
                  });
                  return point;
                });
              })()}>
                <defs>
                  {patentData.patentFamilies.map((family, index) => (
                    <linearGradient key={family.id} id={`gradient-${family.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0}/>
                    </linearGradient>
                  ))}
                </defs>
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                {patentData.patentFamilies.map((family, index) => (
                  <Area 
                    key={family.id}
                    type="monotone" 
                    dataKey={family.id}
                    name={family.name.split(" ")[0]}
                    stroke={CHART_COLORS[index % CHART_COLORS.length]} 
                    strokeWidth={2}
                    fill={`url(#gradient-${family.id})`}
                    stackId="1"
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs">
              {patentData.patentFamilies.map((family, index) => (
                <span key={family.id} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                  {family.name.split(" ")[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Top Applicants Bar Chart */}
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Top Patent Applicants</h4>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={topApplicantsChart} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={60} 
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`${value} patents`, "Patents"]}
                  />
                  <Bar dataKey="patents" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Family Distribution Pie Chart */}
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">By Patent Family</h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={familyDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    dataKey="count"
                    nameKey="name"
                  >
                    {familyDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number, name: string, props: any) => [`${value}+ patents`, props.payload.fullName]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 text-xs mt-2">
                {familyDistribution.slice(0, 3).map((item, i) => (
                  <span key={item.name} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Regions */}
          <div className="bg-background rounded-lg p-4 border border-border/50">
            <h4 className="font-semibold text-sm mb-3 text-foreground">Key Patent Regions</h4>
            <div className="flex flex-wrap gap-2">
              {patentData.overview.keyRegions.map((region) => (
                <Badge key={region} variant="secondary" className="text-sm">
                  <Globe className="h-3 w-3 mr-1" />
                  {region}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patent Family Filter */}
      <div className="mb-6">
        <FilterTabs
          options={familyFilters}
          value={selectedFamily}
          onChange={(value) => setSelectedFamily(value as PatentFamily)}
        />
      </div>

      {/* Patent Families */}
      <div className="space-y-6 mb-8">
        {filteredFamilies.map((family) => (
          <CollapsibleCard
            key={family.id}
            title={`${family.name} (${family.patentCount} patents)`}
            defaultOpen={selectedFamily !== "all" || family.id === "power-electronics"}
          >
            <div className="space-y-6">
              <p className="text-muted-foreground">{family.description}</p>

              {/* Key Holders */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Key Patent Holders</h4>
                <div className="flex flex-wrap gap-2">
                  {family.keyHolders.map((holder) => (
                    <Badge key={holder} variant="secondary">
                      {holder}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Patent Progression Timeline
                </h4>
                <div className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-4 ml-6">
                    {family.timeline.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-sm font-medium text-foreground">{item.year}</span>
                            <p className="text-sm text-muted-foreground">{item.milestone}</p>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            {item.count} patents
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Patents Table */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Notable Patents</h4>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[140px]">Patent No.</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="w-[120px]">Holder</TableHead>
                        <TableHead className="w-[80px] text-right">Year</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {family.keyPatents.map((patent) => (
                        <TableRow key={patent.number}>
                          <TableCell className="font-mono text-xs">
                            {patent.number}
                          </TableCell>
                          <TableCell className="text-sm">
                            {patent.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{patent.holder}</Badge>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {patent.year}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CollapsibleCard>
        ))}
      </div>

      {/* Top Applicants */}
      <CollapsibleCard
        title="Top Patent Applicants"
        defaultOpen={true}
      >
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="w-[100px] text-center">Patents</TableHead>
                <TableHead>Primary Focus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patentData.trendAnalysis.topApplicants.map((applicant, index) => (
                <TableRow key={applicant.name}>
                  <TableCell className="font-medium text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {applicant.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{applicant.patents}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {applicant.focus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleCard>

      {/* Emerging Areas */}
      <div className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Emerging Patent Areas
        </h3>
        <div className="flex flex-wrap gap-2">
          {patentData.trendAnalysis.emergingAreas.map((area) => (
            <Badge key={area} variant="default" className="text-sm">
              {area}
            </Badge>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          These emerging areas represent the frontier of V2G innovation, with patent filings accelerating as the technology matures and new applications are discovered.
        </p>
      </div>
    </section>
  );
}
