import { useState } from "react";
import { cn } from "@/lib/utils";
import { sections } from "@/data/reportData";
import { 
  FileText, Zap, Cpu, TrendingUp, MapPin, 
  Scale, Leaf, AlertTriangle, BookOpen, Menu, X, Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Zap,
  Cpu,
  TrendingUp,
  MapPin,
  Scale,
  Leaf,
  AlertTriangle,
  BookOpen,
  Shield,
};

interface ReportNavigationProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function ReportNavigation({ activeSection, onSectionChange }: ReportNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Navigation sidebar */}
      <nav
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            EV Bidirectional Charging
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Interactive Report</p>
        </div>

        <div className="px-3 pb-6 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {sections.map((section) => {
            const Icon = iconMap[section.icon];
            return (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                <span>{section.title}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
