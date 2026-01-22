import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileDown, 
  Loader2, 
  FileText, 
  Calendar, 
  Clock,
  Trash2,
  Download
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface GeneratedReport {
  id: string;
  name: string;
  generatedAt: Date;
  size: string;
  blob?: Blob;
}

export function ReportGeneratorSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>([]);
  const [progress, setProgress] = useState(0);

  const generatePDF = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;

      // Get main content area (excluding navigation and report generator)
      const mainContent = document.querySelector("main");
      if (!mainContent) {
        throw new Error("Main content not found");
      }

      // Get all sections
      const sectionIds = [
        "overview",
        "how-it-works", 
        "technology",
        "patents",
        "publications",
        "market",
        "pilots",
        "regulatory",
        "impact",
        "challenges",
        "references"
      ];

      let yPosition = margin;

      // Add title page
      pdf.setFontSize(24);
      pdf.setTextColor(59, 130, 246); // Primary color
      pdf.text("Bidirectional EV Charging", pageWidth / 2, 60, { align: "center" });
      
      pdf.setFontSize(16);
      pdf.setTextColor(100, 100, 100);
      pdf.text("Interactive Report", pageWidth / 2, 75, { align: "center" });
      
      pdf.setFontSize(12);
      pdf.text("Electric Mobility Research Center (EMRC)", pageWidth / 2, 95, { align: "center" });
      pdf.text("LUT University", pageWidth / 2, 105, { align: "center" });
      
      pdf.setFontSize(10);
      pdf.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, pageWidth / 2, 130, { align: "center" });

      // Add table of contents
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Table of Contents", margin, 30);
      
      pdf.setFontSize(11);
      const tocItems = [
        { num: "1", title: "Executive Summary", page: "3" },
        { num: "2", title: "How It Works", page: "4" },
        { num: "3", title: "Technology Deep Dive", page: "5" },
        { num: "4", title: "Patents & IP Landscape", page: "6" },
        { num: "5", title: "Scientific Publications", page: "7" },
        { num: "6", title: "Market & Key Players", page: "8" },
        { num: "7", title: "Pilot Projects", page: "9" },
        { num: "8", title: "Regulatory Framework", page: "10" },
        { num: "9", title: "Economic & Environmental Impact", page: "11" },
        { num: "10", title: "Challenges & Future Outlook", page: "12" },
        { num: "11", title: "References", page: "13" },
      ];

      let tocY = 45;
      tocItems.forEach((item) => {
        pdf.text(`${item.num}. ${item.title}`, margin, tocY);
        pdf.text(item.page, pageWidth - margin - 10, tocY);
        tocY += 8;
      });

      setProgress(10);

      // Capture each section
      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i];
        const section = document.getElementById(sectionId);
        
        if (section) {
          pdf.addPage();
          
          // Capture section as canvas
          const canvas = await html2canvas(section, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false,
          });

          const imgData = canvas.toDataURL("image/jpeg", 0.8);
          const imgWidth = contentWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Handle multi-page sections
          let heightLeft = imgHeight;
          let position = margin;
          let pageCount = 0;

          while (heightLeft > 0) {
            if (pageCount > 0) {
              pdf.addPage();
              position = margin;
            }

            const availableHeight = pageHeight - 2 * margin;
            const sliceHeight = Math.min(heightLeft, availableHeight);

            pdf.addImage(
              imgData,
              "JPEG",
              margin,
              position - (pageCount * availableHeight),
              imgWidth,
              imgHeight
            );

            heightLeft -= availableHeight;
            pageCount++;
          }
        }

        setProgress(10 + Math.round(((i + 1) / sectionIds.length) * 85));
      }

      // Add footer to all pages
      const totalPages = pdf.getNumberOfPages();
      for (let i = 2; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `EMRC - Bidirectional EV Charging Report | Page ${i} of ${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      }

      setProgress(100);

      // Generate blob for storage
      const pdfBlob = pdf.output("blob");
      const pdfSize = (pdfBlob.size / 1024 / 1024).toFixed(2);

      // Create report entry
      const newReport: GeneratedReport = {
        id: Date.now().toString(),
        name: `EV_Bidirectional_Report_${new Date().toISOString().split("T")[0]}_${new Date().toLocaleTimeString().replace(/:/g, "-")}`,
        generatedAt: new Date(),
        size: `${pdfSize} MB`,
        blob: pdfBlob,
      };

      setGeneratedReports((prev) => [newReport, ...prev]);

      // Auto-download
      pdf.save(`${newReport.name}.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const downloadReport = (report: GeneratedReport) => {
    if (report.blob) {
      const url = URL.createObjectURL(report.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${report.name}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const deleteReport = (reportId: string) => {
    setGeneratedReports((prev) => prev.filter((r) => r.id !== reportId));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section id="report-generator" className="scroll-mt-8">
      <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
        <FileDown className="h-8 w-8 text-primary" />
        Report Generator
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Generator Card */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generate PDF Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Generate a comprehensive PDF report containing all sections of this interactive report. 
              The PDF includes formatted content, charts, and data tables optimized for printing and sharing.
            </p>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">Included Sections:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Executive Summary",
                  "How It Works",
                  "Technology",
                  "Patents",
                  "Publications",
                  "Market",
                  "Pilots",
                  "Regulatory",
                  "Impact",
                  "Challenges",
                  "References"
                ].map((section) => (
                  <Badge key={section} variant="secondary" className="text-xs">
                    {section}
                  </Badge>
                ))}
              </div>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Generating PDF...</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <Button 
              onClick={generatePDF} 
              disabled={isGenerating}
              className="w-full gap-2"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4" />
                  Generate PDF Report
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Reports History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Generated Reports
              </span>
              {generatedReports.length > 0 && (
                <Badge variant="outline">{generatedReports.length} reports</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {generatedReports.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No reports generated yet</p>
                <p className="text-xs mt-1">Generate your first PDF report to see it here</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {generatedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <FileText className="h-8 w-8 text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{report.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(report.generatedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(report.generatedAt)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {report.size}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => downloadReport(report)}
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => deleteReport(report.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">About Report Generation</h4>
              <p className="text-sm text-muted-foreground">
                Reports are generated from the current state of this interactive document. Each PDF captures 
                all sections with their latest content, charts, and data. Generated reports are stored in 
                your browser session - for persistent storage across sessions, consider enabling Lovable Cloud.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
