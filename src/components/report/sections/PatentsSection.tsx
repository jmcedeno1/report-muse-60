import { useState } from "react";
import { patentData } from "@/data/reportData";
import { CollapsibleCard } from "@/components/report/CollapsibleCard";
import { FilterTabs } from "@/components/report/FilterTabs";
import { StatCard } from "@/components/report/StatCard";
import { Shield, TrendingUp, Users, Lightbulb, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Patents"
          value={patentData.overview.totalPatents}
        />
        <StatCard
          label="Filing Growth"
          value={patentData.overview.growthRate}
        />
        <StatCard
          label="Top Applicants"
          value={patentData.trendAnalysis.topApplicants.length.toString()}
        />
        <StatCard
          label="Emerging Areas"
          value={patentData.trendAnalysis.emergingAreas.length.toString()}
        />
      </div>

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
