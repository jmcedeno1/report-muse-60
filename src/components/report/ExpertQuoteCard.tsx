import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpertQuote {
  id: string;
  quote: string;
  expert: string;
  title: string;
  organization: string;
  theme: "technology" | "market" | "policy" | "environment" | "vision";
}

interface ExpertQuoteCardProps {
  quote: ExpertQuote;
  className?: string;
}

const themeStyles = {
  technology: "border-l-blue-500 bg-blue-500/5",
  market: "border-l-purple-500 bg-purple-500/5",
  policy: "border-l-orange-500 bg-orange-500/5",
  environment: "border-l-green-500 bg-green-500/5",
  vision: "border-l-primary bg-primary/5",
};

const themeIconColors = {
  technology: "text-blue-500",
  market: "text-purple-500",
  policy: "text-orange-500",
  environment: "text-green-500",
  vision: "text-primary",
};

export function ExpertQuoteCard({ quote, className }: ExpertQuoteCardProps) {
  return (
    <div
      className={cn(
        "relative border-l-4 rounded-r-lg p-5 my-6 animate-fade-in",
        themeStyles[quote.theme],
        className
      )}
    >
      <Quote
        className={cn(
          "absolute top-4 right-4 h-8 w-8 opacity-20",
          themeIconColors[quote.theme]
        )}
      />
      <blockquote className="text-foreground italic leading-relaxed pr-10 mb-4">
        "{quote.quote}"
      </blockquote>
      <footer className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <span className="text-sm font-semibold text-muted-foreground">
            {quote.expert.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{quote.expert}</p>
          <p className="text-xs text-muted-foreground">
            {quote.title}, {quote.organization}
          </p>
        </div>
      </footer>
    </div>
  );
}
