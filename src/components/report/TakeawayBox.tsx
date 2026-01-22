import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TakeawayBoxProps {
  title?: string;
  takeaways: string[];
  defaultOpen?: boolean;
  className?: string;
}

export function TakeawayBox({
  title = "Key Takeaways",
  takeaways,
  defaultOpen = false,
  className,
}: TakeawayBoxProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "rounded-lg border border-primary/20 bg-primary/5 overflow-hidden my-6",
        className
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-primary/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-foreground">{title}</span>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {takeaways.length} insights
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <ul className="px-4 pb-4 space-y-2">
            {takeaways.map((takeaway, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
