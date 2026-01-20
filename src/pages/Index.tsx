import { useState, useEffect } from "react";
import { ReportNavigation } from "@/components/report/ReportNavigation";
import { ExecutiveSummarySection } from "@/components/report/sections/ExecutiveSummarySection";
import { HowItWorksSection } from "@/components/report/sections/HowItWorksSection";
import { TechnologySection } from "@/components/report/sections/TechnologySection";
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
      const sections = [
        "overview", "how-it-works", "technology", "market",
        "pilots", "regulatory", "impact", "challenges", "references"
      ];

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

  return (
    <div className="min-h-screen bg-background">
      <ReportNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="lg:ml-64 p-6 md:p-8 lg:p-12 max-w-5xl">
        <div className="space-y-16">
          <ExecutiveSummarySection />
          <HowItWorksSection />
          <TechnologySection />
          <MarketSection />
          <PilotProjectsSection />
          <RegulatorySection />
          <ImpactSection />
          <ChallengesSection />
          <ReferencesSection />
        </div>

        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Interactive Report on EV Bidirectional Charging</p>
          <p className="mt-1">Data synthesized from uploaded research documents</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
