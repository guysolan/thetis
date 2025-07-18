import React, { useEffect, useState } from "react";
import { Button } from "@thetis/ui/button";
import { Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CheckWithCareTeam = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Close modal when clicking outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-2 font-medium text-primary text-base hover:text-primary/80 hover:bg-transparent transition-colors p-0 h-auto",
          className,
        )}
        onClick={() => {
          console.log("Dialog trigger clicked");
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            console.log("Dialog trigger clicked");
            setOpen(true);
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            console.log("Dialog trigger clicked");
            setOpen(true);
          }
        }}
      >
        <Info className="w-4 h-4" />
        <span className="underline">Check with care team before buying</span>
      </Button>

      {/* Modal */}
      {open && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white shadow-xl rounded-lg w-full max-w-md transition-all transform">
            <button
              type="button"
              onClick={() => setOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpen(false);
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpen(false);
                }
              }}
              className="top-4 right-4 absolute text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <h2 className="mb-4 font-semibold text-black text-lg">
                Sleeping in a boot is miserable - we get it
              </h2>

              <div className="space-y-4 text-base">
                <p className="text-gray-700">
                  We know sleeping in a boot is miserable. That's why we built
                  this splint - to give you better sleep during recovery.
                </p>

                <p className="text-gray-700">
                  However,{" "}
                  <strong>you must check with your doctor first</strong>. Some
                  surgeons may not approve the splint for home use.
                </p>

                <div className="bg-primary/10 p-4 border-primary/30 border-l-4 rounded-r-lg">
                  <p className="mb-2 font-medium text-primary">
                    📋 What to do:
                  </p>
                  <p className="text-primary">
                    Show your surgeon our{" "}
                    <a href="/evidence" className="text-primary text-semibold underline">
                      evidence page
                    </a>{" "}
                    before buying. We have safety data and clinical studies that
                    support the splint's effectiveness.
                  </p>
                </div>

                <p className="text-gray-600 text-sm">
                  We want you to sleep better, but we also want your recovery to
                  be safe and approved by your medical team.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckWithCareTeam;
