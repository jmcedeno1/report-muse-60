import { useState } from "react";
import { pilotProjects, pilotProjectsSummary } from "@/data/reportData";
import { FilterTabs } from "../FilterTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, CheckCircle, Zap, Car, Battery, Activity, TrendingUp, Leaf, Globe } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

type VehicleType = "all" | "Light-duty" | "Heavy-duty";
type Region = "all" | "Europe" | "North America" | "Asia-Pacific";
type Application = "all" | "V2G" | "V2H" | "V2G/V2H" | "V2G/V1G";

const vehicleOptions: { value: VehicleType; label: string }[] = [
  { value: "all", label: "All Vehicles" },
  { value: "Light-duty", label: "Light-duty" },
  { value: "Heavy-duty", label: "Heavy-duty" },
];

const regionOptions: { value: Region; label: string }[] = [
  { value: "all", label: "All Regions" },
  { value: "Europe", label: "Europe" },
  { value: "North America", label: "North America" },
  { value: "Asia-Pacific", label: "Asia-Pacific" },
];

const applicationOptions: { value: Application; label: string }[] = [
  { value: "all", label: "All Applications" },
  { value: "V2G", label: "V2G" },
  { value: "V2H", label: "V2H" },
  { value: "V2G/V2H", label: "V2G/V2H" },
  { value: "V2G/V1G", label: "V2G/V1G" },
];

const CHART_COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted-foreground))"];

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Car,
  Battery,
  Activity,
  TrendingUp,
  Leaf,
};

export function PilotProjectsSection() {
  const [vehicleFilter, setVehicleFilter] = useState<VehicleType>("all");
  const [regionFilter, setRegionFilter] = useState<Region>("all");
  const [applicationFilter, setApplicationFilter] = useState<Application>("all");

  const filteredProjects = pilotProjects.filter((project) => {
    const vehicleMatch = vehicleFilter === "all" || project.vehicleType === vehicleFilter;
    const regionMatch = regionFilter === "all" || project.region === regionFilter;
    const applicationMatch = applicationFilter === "all" || project.application.includes(applicationFilter.replace("/", ""));
    return vehicleMatch && regionMatch && applicationMatch;
  });

  return (
    <section id="pilots" className="scroll-mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Pilot Projects
      </h2>

      {/* Summary Metrics Dashboard */}
      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Globe className="h-5 w-5 text-primary" />
            Global V2G Pilot Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pilotProjectsSummary.metrics.map((metric) => {
              const IconComponent = iconMap[metric.icon];
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

          {/* Charts Row */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* By Region Bar Chart */}
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Projects by Region</h4>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={pilotProjectsSummary.byRegion} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="region" 
                    type="category" 
                    width={80} 
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number, name: string) => [
                      name === "projects" ? `${value} projects` : `${value} vehicles`,
                      name === "projects" ? "Projects" : "Vehicles"
                    ]}
                  />
                  <Bar dataKey="projects" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* By Vehicle Type Pie Chart */}
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">By Vehicle Type</h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={pilotProjectsSummary.byVehicleType}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    dataKey="percentage"
                    nameKey="type"
                  >
                    {pilotProjectsSummary.byVehicleType.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`${value}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 text-xs">
                {pilotProjectsSummary.byVehicleType.map((item, i) => (
                  <span key={item.type} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                    {item.type} ({item.percentage}%)
                  </span>
                ))}
              </div>
            </div>

            {/* By Application Pie Chart */}
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">By Application</h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={pilotProjectsSummary.byApplication}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    dataKey="percentage"
                    nameKey="type"
                  >
                    {pilotProjectsSummary.byApplication.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`${value}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {pilotProjectsSummary.byApplication.map((item, i) => (
                  <span key={item.type} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                    {item.type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="space-y-3 mb-6">
        <FilterTabs
          options={vehicleOptions}
          value={vehicleFilter}
          onChange={(value) => setVehicleFilter(value as VehicleType)}
        />
        <FilterTabs
          options={regionOptions}
          value={regionFilter}
          onChange={(value) => setRegionFilter(value as Region)}
        />
        <FilterTabs
          options={applicationOptions}
          value={applicationFilter}
          onChange={(value) => setApplicationFilter(value as Application)}
        />
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredProjects.length} of {pilotProjects.length} pilot projects
      </p>

      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{project.vehicleType}</Badge>
                  <Badge variant="outline">{project.application}</Badge>
                  <Badge
                    variant={
                      project.status === "Operational" || project.status === "Expanding" || project.status === "Commercial"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Started {project.startYear}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {project.scale}
                </span>
              </div>

              <p className="text-muted-foreground">{project.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground text-sm mb-2">Partners</p>
                  <div className="flex flex-wrap gap-1">
                    {project.partners.map((partner) => (
                      <Badge key={partner} variant="outline" className="text-xs">
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm mb-2">Key Outcomes</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {project.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No projects match the selected filters.
        </p>
      )}
    </section>
  );
}
