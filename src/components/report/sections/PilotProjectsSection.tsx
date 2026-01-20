import { useState } from "react";
import { pilotProjects } from "@/data/reportData";
import { FilterTabs } from "../FilterTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, CheckCircle } from "lucide-react";

type VehicleType = "all" | "Light-duty" | "Heavy-duty";
type Region = "all" | "Europe" | "North America";
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
];

const applicationOptions: { value: Application; label: string }[] = [
  { value: "all", label: "All Applications" },
  { value: "V2G", label: "V2G" },
  { value: "V2H", label: "V2H" },
  { value: "V2G/V2H", label: "V2G/V2H" },
];

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

      <div className="space-y-3 mb-6">
        <FilterTabs
          options={vehicleOptions}
          value={vehicleFilter}
          onChange={setVehicleFilter}
        />
        <FilterTabs
          options={regionOptions}
          value={regionFilter}
          onChange={setRegionFilter}
        />
        <FilterTabs
          options={applicationOptions}
          value={applicationFilter}
          onChange={setApplicationFilter}
        />
      </div>

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
                      project.status === "Operational" || project.status === "Expanding"
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
