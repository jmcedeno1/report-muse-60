import { useState, useEffect } from "react";
import { ReportNavigation } from "@/components/report/ReportNavigation";
import { ExecutiveSummarySection } from "@/components/report/sections/ExecutiveSummarySection";
import { HowItWorksSection } from "@/components/report/sections/HowItWorksSection";
import { TechnologySection } from "@/components/report/sections/TechnologySection";
import { PatentsSection } from "@/components/report/sections/PatentsSection";
import { ScientificPublicationsSection } from "@/components/report/sections/ScientificPublicationsSection";
import { MarketSection } from "@/components/report/sections/MarketSection";
import { PilotProjectsSection } from "@/components/report/sections/PilotProjectsSection";
import { RegulatorySection } from "@/components/report/sections/RegulatorySection";
import { ImpactSection } from "@/components/report/sections/ImpactSection";
import { ChallengesSection } from "@/components/report/sections/ChallengesSection";
import { ReferencesSection } from "@/components/report/sections/ReferencesSection";
const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "how-it-works", "technology", "patents", "publications", "market", "pilots", "regulatory", "impact", "challenges", "references"];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="min-h-screen bg-background">
      <ReportNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="lg:ml-64 p-6 md:p-8 lg:p-12 max-w-5xl">
        <div className="space-y-16">
          <ExecutiveSummarySection />
          <HowItWorksSection />
          <TechnologySection />
          <PatentsSection />
          <ScientificPublicationsSection />
          <MarketSection />
          <PilotProjectsSection />
          <RegulatorySection />
          <ImpactSection />
          <ChallengesSection />
          <ReferencesSection />
        </div>

        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 bg-primary rounded-full" />
              <div>
                <p className="text-sm font-semibold text-foreground">EMRC</p>
                <p className="text-xs text-muted-foreground">Electric Mobility Research Center</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Interactive Report on EV Bidirectional Charging</p>
              <p className="text-xs mt-1">LUT University</p>
            </div>
          </div>
        </footer>
      </main>
    </div>;
};
export default Index;