import { useState } from "react";
import { useStandards, useRegulations } from "@/hooks/useCloudData";
import { CollapsibleCard } from "../CollapsibleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "../FilterTabs";
import { Input } from "@/components/ui/input";
import { Globe, ScrollText, BookOpen, Search, ExternalLink } from "lucide-react";

type OrgFilter = "all" | "ISO/IEC" | "IEC" | "SAE" | "IEEE" | "UL" | "Open Charge Alliance" | "CHAdeMO";

const orgOptions: { value: OrgFilter; label: string }[] = [
  { value: "all", label: "All Bodies" },
  { value: "ISO/IEC", label: "ISO/IEC" },
  { value: "IEC", label: "IEC" },
  { value: "SAE", label: "SAE" },
  { value: "IEEE", label: "IEEE" },
  { value: "UL", label: "UL" },
  { value: "Open Charge Alliance", label: "OCA" },
  { value: "CHAdeMO", label: "CHAdeMO" },
];

export function RegulatorySection() {
  const [orgFilter, setOrgFilter] = useState<OrgFilter>("all");
  const [regSearch, setRegSearch] = useState("");

  const standardsQ = useStandards();
  const regulationsQ = useRegulations(200);

  const standards = (standardsQ.data ?? []).filter(
    (s) => orgFilter === "all" || s.organization === orgFilter,
  );

  const regulations = (regulationsQ.data ?? []).filter(
    (r) => regSearch === "" || r.title.toLowerCase().includes(regSearch.toLowerCase()),
  );

  const usRegs = regulations.filter((r) => r.source === "US Federal Register").slice(0, 20);
  const euRegs = regulations.filter((r) => r.source === "EUR-Lex");

  return (
    <section id="regulatory" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Regulatory Framework
        </h2>
        <Badge variant="secondary" className="text-xs">
          Live from Federal Register + EUR-Lex + standards catalogue
        </Badge>
      </div>

      {/* Technical Standards */}
      <CollapsibleCard
        title="Technical Standards"
        icon={<BookOpen className="h-5 w-5 text-primary" />}
        defaultOpen={true}
        className="mb-6"
      >
        <p className="text-sm text-muted-foreground mb-4">
          Curated V2G / bidirectional-charging standards from IEC, ISO, SAE, IEEE, UL,
          Open Charge Alliance, and CHAdeMO. Each entry links to the official catalogue page.
        </p>
        <div className="mb-4">
          <FilterTabs
            options={orgOptions}
            value={orgFilter}
            onChange={(v) => setOrgFilter(v as OrgFilter)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {standards.map((s) => (
            <Card key={s.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-start justify-between gap-2">
                  <span className="font-semibold">{s.code}</span>
                  <Badge variant="outline" className="shrink-0">{s.organization}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm font-medium text-foreground mb-1">{s.title}</p>
                {s.scope && (
                  <p className="text-xs text-muted-foreground mb-2">{s.scope}</p>
                )}
                <div className="flex flex-wrap gap-2 items-center">
                  {s.status && <Badge variant={s.status === "Published" ? "default" : "secondary"}>{s.status}</Badge>}
                  {s.year && <Badge variant="outline">{s.year}</Badge>}
                  {s.region && <Badge variant="outline">{s.region}</Badge>}
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1 ml-auto"
                    >
                      Source <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {standards.length === 0 && (
            <p className="text-sm text-muted-foreground col-span-full text-center py-6">
              {standardsQ.isLoading ? "Loading standards…" : "No standards match the selected body."}
            </p>
          )}
        </div>
      </CollapsibleCard>

      {/* EU Regulations */}
      <CollapsibleCard
        title="European Union — Regulatory Acts"
        icon={<Globe className="h-5 w-5 text-primary" />}
        defaultOpen={true}
        className="mb-6"
      >
        <div className="space-y-3">
          {euRegs.map((r) => (
            <div key={r.id} className="border border-border rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <p className="font-medium text-foreground text-sm">{r.title}</p>
                <div className="flex gap-2 shrink-0">
                  {r.doc_type && <Badge variant="outline">{r.doc_type}</Badge>}
                  {r.publication_date && (
                    <Badge variant="secondary">{new Date(r.publication_date).getFullYear()}</Badge>
                  )}
                </div>
              </div>
              {r.summary && <p className="text-sm text-muted-foreground mb-2">{r.summary}</p>}
              {r.url && (
                <a href={r.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                  EUR-Lex <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* US Federal Register */}
      <CollapsibleCard
        title="United States — Recent Federal Register Filings"
        icon={<ScrollText className="h-5 w-5 text-primary" />}
        className="mb-6"
      >
        <div className="relative max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by title…"
            value={regSearch}
            onChange={(e) => setRegSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="space-y-3">
          {usRegs.map((r) => (
            <div key={r.id} className="border border-border rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <p className="font-medium text-foreground text-sm">{r.title}</p>
                <div className="flex gap-2 shrink-0">
                  {r.doc_type && <Badge variant="outline">{r.doc_type}</Badge>}
                  {r.publication_date && <Badge variant="secondary">{r.publication_date}</Badge>}
                </div>
              </div>
              {r.agency && <p className="text-xs text-muted-foreground mb-1">{r.agency}</p>}
              {r.summary && <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{r.summary}</p>}
              {r.url && (
                <a href={r.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                  Federal Register <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
          {usRegs.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              {regulationsQ.isLoading ? "Loading regulations…" : "No matching filings."}
            </p>
          )}
        </div>
      </CollapsibleCard>
    </section>
  );
}
