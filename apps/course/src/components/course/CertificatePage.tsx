import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";
import { Download, ArrowLeft, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import tendonGapImage from "@/assets/tendon-gap.png";

export default function CertificatePage() {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = certificateRef.current;
    if (!element) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("Achilles-Recovery-Course-Certificate.pdf");
    } catch (err) {
      console.error("Failed to generate certificate:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/standard/course-completion"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Congratulations
        </Link>

        {/* Certificate - custom formatting for download */}
        <div
          ref={certificateRef}
          className="bg-white p-12 md:p-16 rounded-2xl shadow-lg border-2 border-primary/20"
          style={{ minHeight: "400px" }}
        >
          <div className="flex flex-col items-center text-center">
            {/* Image from emergency-care - first image (tendon-gap) */}
            <img
              src={tendonGapImage}
              alt="Achilles tendon recovery"
              className="w-24 h-24 md:w-32 md:h-32 object-contain mb-6 opacity-90"
            />

            <div className="mb-6">
              <h1
                className="font-bold text-foreground text-3xl md:text-4xl mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Certificate of Completion
              </h1>
              <p className="text-muted-foreground text-xl md:text-2xl">
                Achilles Recovery Course
              </p>
            </div>

            <p className="text-foreground text-lg max-w-xl leading-relaxed">
              This certifies that the recipient has completed the full Achilles Recovery
              Course and is equipped with the knowledge to support their recovery journey
              from injury through return to sport.
            </p>

            <div className="mt-10 pt-8 border-t border-border w-full max-w-md">
              <p className="text-muted-foreground text-sm">
                Thetis Medical · Achilles Recovery Standard Course
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleDownload}
            disabled={isDownloading}
            className="gap-2"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Certificate (PDF)
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
