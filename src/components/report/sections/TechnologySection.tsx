import { useState } from "react";
import { technologyDeepDive } from "@/data/reportData";
import { CollapsibleCard } from "../CollapsibleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, AlertTriangle, Lightbulb } from "lucide-react";

export function TechnologySection() {
  const [standardsSearch, setStandardsSearch] = useState("");

  const filteredStandards = technologyDeepDive.standards.items.filter(
    (standard) =>
      standard.standard.toLowerCase().includes(standardsSearch.toLowerCase()) ||
      standard.scope.toLowerCase().includes(standardsSearch.toLowerCase()) ||
      standard.organization.toLowerCase().includes(standardsSearch.toLowerCase())
  );

  return (
    <section id="technology" className="scroll-mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Technology Deep Dive
      </h2>

      <Tabs defaultValue="architectures" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-2">
          <TabsTrigger value="architectures">System Architectures</TabsTrigger>
          <TabsTrigger value="electronics">Power Electronics</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        {/* Architectures Tab */}
        <TabsContent value="architectures" className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {technologyDeepDive.architectures.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {technologyDeepDive.architectures.comparison.map((arch) => (
              <Card key={arch.type} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{arch.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{arch.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Efficiency</p>
                      <p className="text-muted-foreground">{arch.efficiency}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Power Level</p>
                      <p className="text-muted-foreground">{arch.powerLevel}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Cost</p>
                      <p className="text-muted-foreground">{arch.cost}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Complexity</p>
                      <p className="text-muted-foreground">{arch.complexity}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-foreground text-sm mb-2">Standards</p>
                    <div className="flex flex-wrap gap-1">
                      {arch.standards.map((std) => (
                        <Badge key={std} variant="outline" className="text-xs">
                          {std}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-foreground text-sm mb-2">Examples</p>
                    <p className="text-sm text-muted-foreground">{arch.examples.join(", ")}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Power Electronics Tab */}
        <TabsContent value="electronics" className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {technologyDeepDive.powerElectronics.title}
          </h3>
          <div className="grid gap-4">
            {technologyDeepDive.powerElectronics.topologies.map((topology) => (
              <CollapsibleCard key={topology.name} title={topology.name}>
                <div className="space-y-3">
                  <p className="text-muted-foreground">{topology.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Efficiency: {topology.efficiency}</Badge>
                  </div>

                  <div>
                    <p className="font-medium text-foreground text-sm mb-2">Advantages</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {topology.advantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span> {adv}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-foreground text-sm mb-2">Applications</p>
                    <p className="text-sm text-muted-foreground">{topology.applications.join(", ")}</p>
                  </div>
                </div>
              </CollapsibleCard>
            ))}
          </div>
        </TabsContent>

        {/* Standards Tab */}
        <TabsContent value="standards" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h3 className="text-lg font-semibold text-foreground">
              {technologyDeepDive.standards.title}
            </h3>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search standards..."
                value={standardsSearch}
                onChange={(e) => setStandardsSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Standard</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Organization</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Scope</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Region</th>
                </tr>
              </thead>
              <tbody>
                {filteredStandards.map((standard) => (
                  <tr key={standard.standard} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{standard.standard}</td>
                    <td className="py-3 px-4 text-muted-foreground">{standard.organization}</td>
                    <td className="py-3 px-4 text-muted-foreground">{standard.scope}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{standard.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{standard.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {technologyDeepDive.challenges.title}
          </h3>
          <div className="grid gap-4">
            {technologyDeepDive.challenges.items.map((item) => (
              <Card key={item.challenge}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    {item.challenge}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-start gap-2 bg-muted/50 p-3 rounded-lg">
                    <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Mitigation</p>
                      <p className="text-sm text-muted-foreground">{item.mitigation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
