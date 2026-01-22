import { Lightbulb } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface KeyInsightBadgeProps {
  insight: string;
  details?: string;
  className?: string;
}

export function KeyInsightBadge({
  insight,
  details,
  className,
}: KeyInsightBadgeProps) {
  const content = (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-primary/10 text-primary border border-primary/20",
        "text-sm font-medium cursor-default",
        "hover:bg-primary/15 transition-colors",
        className
      )}
    >
      <Lightbulb className="h-4 w-4" />
      <span>{insight}</span>
    </div>
  );

  if (details) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{details}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}
