import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileDown, Loader2, FileText, Calendar, Clock, Trash2, Download } from "lucide-react";

interface ReportItem {
  id: string;
  name: string;
  generatedAt: Date;
  size: string;
  blob: Blob | null;
}

export function ReportGeneratorSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [progress, setProgress] = useState(0);

  const sectionLabels = [
    "Executive Summary", "How It Works", "Technology", "Patents",
    "Publications", "Market", "Pilots", "Regulatory", "Impact", "Challenges", "References"
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const m = 15;

      pdf.setFontSize(24);
      pdf.setTextColor(59, 130, 246);
      pdf.text("Bidirectional EV Charging", pageW / 2, 60, { align: "center" });
      pdf.setFontSize(16);
      pdf.setTextColor(100, 100, 100);
      pdf.text("Interactive Report", pageW / 2, 75, { align: "center" });
      pdf.setFontSize(12);
      pdf.text("EMRC - LUT University", pageW / 2, 95, { align: "center" });
      pdf.setFontSize(10);
      pdf.text("Generated: " + new Date().toLocaleString(), pageW / 2, 120, { align: "center" });

      setProgress(10);

      const ids = ["overview", "how-it-works", "technology", "patents", "publications", "market", "pilots", "regulatory", "impact", "challenges", "references"];

      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (el) {
          pdf.addPage();
          const canvas = await html2canvas(el, { scale: 1.5, backgroundColor: "#fff", logging: false });
          const imgData = canvas.toDataURL("image/jpeg", 0.7);
          const w = pageW - 2 * m;
          const h = (canvas.height * w) / canvas.width;
          pdf.addImage(imgData, "JPEG", m, m, w, Math.min(h, pageH - 2 * m));
        }
        setProgress(10 + Math.round(((i + 1) / ids.length) * 85));
      }

      setProgress(100);
      const blob = pdf.output("blob");
      const now = new Date();
      const name = "Report_" + now.toISOString().slice(0, 10) + "_" + now.toTimeString().slice(0, 8).replace(/:/g, "-");

      setReports(prev => [{ id: String(Date.now()), name, generatedAt: now, size: (blob.size / 1024 / 1024).toFixed(2) + " MB", blob }, ...prev]);
      pdf.save(name + ".pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const handleDownload = (r: ReportItem) => {
    if (r.blob) {
      const url = URL.createObjectURL(r.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = r.name + ".pdf";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = (id: string) => setReports(prev => prev.filter(r => r.id !== id));

  return (
    <section id="report-generator" className="scroll-mt-8">
      <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
        <FileDown className="h-8 w-8 text-primary" />
        Report Generator
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generate PDF Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Generate a PDF containing all report sections for printing and sharing.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">Included Sections:</h4>
              <div className="flex flex-wrap gap-2">
                {sectionLabels.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
              </div>
            </div>
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Generating...</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: progress + "%" }} />
                </div>
              </div>
            )}
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full gap-2" size="lg">
              {isGenerating ? <><Loader2 className="h-4 w-4 animate-spin" />Generating...</> : <><FileDown className="h-4 w-4" />Generate PDF</>}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Generated Reports</span>
              {reports.length > 0 && <Badge variant="outline">{reports.length}</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No reports yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {reports.map(r => (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3 min-w-0">
                      <FileText className="h-8 w-8 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{r.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{r.generatedAt.toLocaleString()}</span>
                          <Badge variant="outline" className="text-xs">{r.size}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(r)}><Download className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
