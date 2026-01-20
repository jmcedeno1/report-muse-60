import { useState } from "react";
import { references } from "@/data/reportData";
import { FilterTabs } from "../FilterTabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
type Theme = "all" | "Technology" | "Economics" | "Environment" | "Regulation" | "Market" | "Pilot Projects";
const themeOptions: {
  value: Theme;
  label: string;
}[] = [{
  value: "all",
  label: "All Themes"
}, {
  value: "Technology",
  label: "Technology"
}, {
  value: "Economics",
  label: "Economics"
}, {
  value: "Environment",
  label: "Environment"
}, {
  value: "Regulation",
  label: "Regulation"
}, {
  value: "Market",
  label: "Market"
}, {
  value: "Pilot Projects",
  label: "Pilot Projects"
}];
export function ReferencesSection() {
  const [themeFilter, setThemeFilter] = useState<Theme>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredReferences = references.filter(ref => {
    const themeMatch = themeFilter === "all" || ref.theme === themeFilter;
    const searchMatch = searchQuery === "" || ref.citation.toLowerCase().includes(searchQuery.toLowerCase());
    return themeMatch && searchMatch;
  });
  return <section id="references" className="scroll-mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        References
      </h2>

      <div className="space-y-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search references..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9" />
        </div>

        <FilterTabs options={themeOptions} value={themeFilter} onChange={value => setThemeFilter(value as Theme)} />
      </div>

      <div className="space-y-3">
        {filteredReferences.map(ref => <div key={ref.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex-1">
                <span className="text-sm text-muted-foreground mr-2">[{ref.id}]</span>
                <span className="text-foreground">{ref.citation}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{ref.theme}</Badge>
                <Badge variant="secondary">{ref.source}</Badge>
              </div>
            </div>
          </div>)}
      </div>

      {filteredReferences.length === 0 && <p className="text-center text-muted-foreground py-8">
          No references match your search.
        </p>}

      
    </section>;
}