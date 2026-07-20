import { useMemo, useState } from "react";
import { references } from "@/data/reportData";
import { FilterTabs } from "../FilterTabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Database, Loader2, BookOpen, Newspaper, FileText } from "lucide-react";
import { usePublicationsTop, useNews } from "@/hooks/useCloudData";

type SourceKind = "all" | "publications" | "news" | "editorial";

type Ref = {
  key: string;
  citation: string;
  url?: string;
  year?: number | string;
  theme: string;
  source: string;
  kind: Exclude<SourceKind, "all">;
};

const sourceOptions: { value: SourceKind; label: string }[] = [
  { value: "all", label: "All Sources" },
  { value: "publications", label: "Publications" },
  { value: "news", label: "News & Media" },
  { value: "editorial", label: "Editorial / Standards" },
];

const kindIcon = {
  publications: BookOpen,
  news: Newspaper,
  editorial: FileText,
} as const;

export function ReferencesSection() {
  const [sourceFilter, setSourceFilter] = useState<SourceKind>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const pubs = usePublicationsTop(50);
  const news = useNews(50);

  const combined = useMemo<Ref[]>(() => {
    const pubRefs: Ref[] = (pubs.data ?? []).map((p, i) => ({
      key: `pub-${p.id}`,
      citation: [
        (p.orgs?.[0] ?? "").trim(),
        p.title,
        p.year ? `(${p.year})` : "",
        p.source ? `— ${p.source}` : "",
        p.doi ? `doi:${p.doi}` : "",
      ]
        .filter(Boolean)
        .join(" "),
      url: p.url ?? (p.doi ? `https://doi.org/${p.doi}` : undefined),
      year: p.year ?? undefined,
      theme: p.taxonomy_tags?.[0] ?? "Publication",
      source: p.source ?? "Scholarly",
      kind: "publications",
    }));

    const newsRefs: Ref[] = (news.data ?? []).map((n) => ({
      key: `news-${n.id}`,
      citation: [n.title ?? n.url, n.domain ? `— ${n.domain}` : "", n.seen_date ? new Date(n.seen_date).toISOString().slice(0, 10) : ""]
        .filter(Boolean)
        .join(" "),
      url: n.url,
      theme: "News",
      source: n.domain ?? "News",
      kind: "news",
    }));

    const editorialRefs: Ref[] = references.map((r) => ({
      key: `ed-${r.id}`,
      citation: r.citation,
      theme: r.theme,
      source: r.source,
      kind: "editorial",
    }));

    return [...pubRefs, ...newsRefs, ...editorialRefs];
  }, [pubs.data, news.data]);

  const filtered = combined.filter((ref) => {
    const kindMatch = sourceFilter === "all" || ref.kind === sourceFilter;
    const searchMatch = searchQuery === "" || ref.citation.toLowerCase().includes(searchQuery.toLowerCase());
    return kindMatch && searchMatch;
  });

  const loading = pubs.isLoading || news.isLoading;

  return (
    <section id="references" className="scroll-mt-8">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">References</h2>
        <Badge variant="secondary" className="gap-1">
          <Database className="h-3 w-3" /> Live from verified corpus
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search references..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <FilterTabs
          options={sourceOptions}
          value={sourceFilter}
          onChange={(v) => setSourceFilter(v as SourceKind)}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading references
        </div>
      )}

      {!loading && (
        <div className="space-y-3">
          {filtered.map((ref) => {
            const Icon = kindIcon[ref.kind];
            return (
              <div
                key={ref.key}
                className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1 min-w-0 flex items-start gap-3">
                    <Icon className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <div className="min-w-0">
                      <p className="text-foreground text-sm leading-relaxed break-words">{ref.citation}</p>
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary inline-flex items-center gap-1 mt-1 hover:underline"
                        >
                          Open source <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Badge variant="outline">{ref.theme}</Badge>
                    <Badge variant="secondary">{ref.source}</Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No references match your search.</p>
      )}
    </section>
  );
}
