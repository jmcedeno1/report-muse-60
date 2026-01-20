import { useState } from "react";
import { scientificPublicationsData } from "@/data/reportData";
import { CollapsibleCard } from "@/components/report/CollapsibleCard";
import { FilterTabs } from "@/components/report/FilterTabs";
import { 
  BookOpen, TrendingUp, Users, Lightbulb, FileText, 
  Globe, BarChart3, Award, Quote, Building, ExternalLink, Lock, Unlock
} from "lucide-react";
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
  AreaChart,
  Area
} from "recharts";

type ThemeFilter = "all" | "Technology" | "Economics" | "Environment" | "Regulation";

const themeFilters = [
  { value: "all", label: "All Themes" },
  { value: "Technology", label: "Technology" },
  { value: "Economics", label: "Economics" },
  { value: "Environment", label: "Environment" },
  { value: "Regulation", label: "Regulation" },
];

const CHART_COLORS = [
  "hsl(var(--primary))", 
  "hsl(var(--accent))", 
  "hsl(var(--emrc-light))", 
  "hsl(var(--muted-foreground))", 
  "hsl(var(--secondary-foreground))"
];

const summaryMetrics = [
  { label: "Total Publications", value: scientificPublicationsData.overview.totalPublications, icon: FileText },
  { label: "Journal Articles", value: scientificPublicationsData.overview.journalArticles, icon: BookOpen },
  { label: "Reviews", value: scientificPublicationsData.overview.conferenceProceedings, icon: Users },
  { label: "Publication Growth", value: scientificPublicationsData.overview.publicationGrowth, icon: TrendingUp },
  { label: "Top Journals", value: "7", icon: Award },
  { label: "Emerging Topics", value: "6", icon: Lightbulb },
];

export function ScientificPublicationsSection() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeFilter>("all");

  const filteredPublications = selectedTheme === "all"
    ? scientificPublicationsData.keyPublications
    : scientificPublicationsData.keyPublications.filter((p) => p.theme === selectedTheme);

  return (
    <section id="publications" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Scientific Publications
        </h2>
      </div>

      <p className="text-muted-foreground mb-8 leading-relaxed">
        {scientificPublicationsData.overview.summary}
      </p>

      {/* Summary Dashboard */}
      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-primary" />
            Publication Landscape Summary
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

          {/* Charts Row */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Publication Trend Area Chart */}
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Publications Over Time</h4>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={scientificPublicationsData.publicationsByYear}>
                  <defs>
                    <linearGradient id="publicationGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`${value} papers`, "Publications"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#publicationGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Top Institutions Bar Chart */}
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">Top Research Institutions</h4>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={scientificPublicationsData.topResearchInstitutions.slice(0, 5)} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={70} 
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
                    formatter={(value: number) => [`${value} publications`, "Papers"]}
                  />
                  <Bar dataKey="publications" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Thematic Distribution Pie Chart */}
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground">By Research Theme</h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={scientificPublicationsData.thematicDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    dataKey="count"
                    nameKey="theme"
                  >
                    {scientificPublicationsData.thematicDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number, name: string, props: any) => [`${value} papers`, props.payload.theme]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 text-xs mt-2">
                {scientificPublicationsData.thematicDistribution.slice(0, 3).map((item, i) => (
                  <span key={item.theme} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                    {item.theme}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Top Journals */}
          <div className="bg-background rounded-lg p-4 border border-border/50">
            <h4 className="font-semibold text-sm mb-3 text-foreground">Leading Journals</h4>
            <div className="flex flex-wrap gap-2">
              {scientificPublicationsData.overview.topJournals.map((journal) => (
                <Badge key={journal} variant="secondary" className="text-sm">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {journal}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Filter */}
      <div className="mb-6">
        <FilterTabs
          options={themeFilters}
          value={selectedTheme}
          onChange={(value) => setSelectedTheme(value as ThemeFilter)}
        />
      </div>

      {/* Key Publications */}
      <CollapsibleCard
        title="Landmark Publications"
        defaultOpen={true}
      >
        <div className="space-y-4">
          {filteredPublications.map((publication) => (
            <div 
              key={publication.id} 
              className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground leading-tight mb-1">
                    {publication.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {publication.authors} ({publication.year})
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {publication.journal}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {publication.theme}
                    </Badge>
                    {publication.citations > 0 && (
                      <Badge variant="default" className="text-xs">
                        <Quote className="h-3 w-3 mr-1" />
                        {publication.citations.toLocaleString()} citations
                      </Badge>
                    )}
                    {"openAccess" in publication && (
                      <Badge 
                        variant={publication.openAccess !== "Subscription" ? "default" : "outline"} 
                        className="text-xs"
                      >
                        {publication.openAccess !== "Subscription" ? (
                          <Unlock className="h-3 w-3 mr-1" />
                        ) : (
                          <Lock className="h-3 w-3 mr-1" />
                        )}
                        {publication.openAccess !== "Subscription" ? "Open Access" : "Subscription"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-2">
                    {publication.significance}
                  </p>
                  {"doi" in publication && publication.doi && (
                    <a 
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      DOI: {publication.doi}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Top Research Institutions Table */}
      <div className="mt-8">
        <CollapsibleCard
          title="Leading Research Institutions"
          defaultOpen={true}
        >
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead className="w-[100px] text-center">Publications</TableHead>
                  <TableHead>Research Focus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scientificPublicationsData.topResearchInstitutions.map((institution, index) => (
                  <TableRow key={institution.name}>
                    <TableCell className="font-medium text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" />
                        {institution.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{institution.publications}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {institution.focus}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CollapsibleCard>
      </div>

      {/* Emerging Topics */}
      <div className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Emerging Research Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {scientificPublicationsData.emergingTopics.map((topic) => (
            <Badge key={topic} variant="default" className="text-sm">
              {topic}
            </Badge>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          These emerging research topics represent the cutting edge of V2G academic inquiry, with publication activity accelerating as new interdisciplinary connections are explored.
        </p>
      </div>
    </section>
  );
}
