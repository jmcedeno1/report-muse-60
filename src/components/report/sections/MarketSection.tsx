import { useState } from "react";
import { marketData } from "@/data/reportData";
import { CollapsibleCard } from "../CollapsibleCard";
import { FilterTabs } from "../FilterTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building, Zap, Factory, Globe } from "lucide-react";

type PlayerCategory = "all" | "automakers" | "purePlayers" | "energyCompanies" | "equipmentManufacturers";
type Region = "all" | "North America" | "Europe" | "Asia-Pacific";

const categoryOptions: { value: PlayerCategory; label: string }[] = [
  { value: "all", label: "All Players" },
  { value: "automakers", label: "Automakers" },
  { value: "purePlayers", label: "V2G Specialists" },
  { value: "energyCompanies", label: "Energy Companies" },
  { value: "equipmentManufacturers", label: "Equipment" },
];

const regionOptions: { value: Region; label: string }[] = [
  { value: "all", label: "All Regions" },
  { value: "North America", label: "North America" },
  { value: "Europe", label: "Europe" },
  { value: "Asia-Pacific", label: "Asia-Pacific" },
];

const categoryIcons = {
  automakers: Building,
  purePlayers: Zap,
  energyCompanies: Factory,
  equipmentManufacturers: Globe,
};

export function MarketSection() {
  const [categoryFilter, setCategoryFilter] = useState<PlayerCategory>("all");
  const [regionFilter, setRegionFilter] = useState<Region>("all");

  const getFilteredPlayers = () => {
    const allPlayers = [
      ...marketData.players.automakers.map((p) => ({ ...p, category: "automakers" as const })),
      ...marketData.players.purePlayers.map((p) => ({ ...p, category: "purePlayers" as const })),
      ...marketData.players.energyCompanies.map((p) => ({ ...p, category: "energyCompanies" as const })),
      ...marketData.players.equipmentManufacturers.map((p) => ({ ...p, category: "equipmentManufacturers" as const })),
    ];

    return allPlayers.filter((player) => {
      const categoryMatch = categoryFilter === "all" || player.category === categoryFilter;
      const regionMatch = regionFilter === "all" || player.region.includes(regionFilter.split(" ")[0]);
      return categoryMatch && regionMatch;
    });
  };

  const filteredPlayers = getFilteredPlayers();

  return (
    <section id="market" className="scroll-mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Market & Key Players
      </h2>

      {/* Market Overview */}
      <CollapsibleCard
        title="Market Overview"
        icon={<TrendingUp className="h-5 w-5 text-primary" />}
        defaultOpen={true}
        className="mb-6"
      >
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Current Size (2024)</p>
            <p className="text-2xl font-bold text-primary">{marketData.overview.currentSize}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Projected (2030-35)</p>
            <p className="text-2xl font-bold text-primary">{marketData.overview.projectedSize}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">CAGR</p>
            <p className="text-2xl font-bold text-primary">{marketData.overview.cagr}</p>
          </div>
        </div>

        <div>
          <p className="font-medium text-foreground mb-2">Key Market Drivers</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {marketData.overview.keyDrivers.map((driver, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary">•</span> {driver}
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleCard>

      {/* Regional Breakdown */}
      <CollapsibleCard title="Regional Breakdown" className="mb-6">
        <div className="grid gap-4">
          {marketData.regionalBreakdown.map((region) => (
            <div key={region.region} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{region.region}</h4>
                <Badge variant="secondary">{region.marketShare} market share</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {region.keyDevelopments.map((dev, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary">•</span> {dev}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Key Players */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Key Players</h3>
        
        <div className="space-y-3">
          <FilterTabs
            options={categoryOptions}
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value as PlayerCategory)}
          />
          <FilterTabs
            options={regionOptions}
            value={regionFilter}
            onChange={(value) => setRegionFilter(value as Region)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlayers.map((player) => {
            const Icon = categoryIcons[player.category];
            return (
              <Card key={player.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    {player.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{player.capability}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{player.region}</Badge>
                    <Badge
                      variant={player.status === "Production" || player.status === "Commercial" ? "default" : "secondary"}
                    >
                      {player.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredPlayers.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No players match the selected filters.
          </p>
        )}
      </div>
    </section>
  );
}
