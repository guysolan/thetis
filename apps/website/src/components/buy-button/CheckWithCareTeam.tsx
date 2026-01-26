import React, { useEffect, useState } from "react";
import { Button } from "@thetis/ui/button";
import { Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { content } from "../products/night-splint/content.ts";
import type { Lang } from "../../config/languages.ts";

interface Props {
  className?: string;
  lang: Lang;
}

const CheckWithCareTeam = ({ className, lang = "en" }: Props) => {
  const [open, setOpen] = useState(false);
  const t = content[lang]?.checkWithCareTeam || content.en.checkWithCareTeam;

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
      <button
        type="button"
        className={cn(
          "flex items-center gap-1.5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 dark:text-neutral-400 text-sm transition-colors",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <Info className="w-3 h-3" />
        <span className="hover:underline">{t.button}</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4"
          onClick={handleOverlayClick}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
            }
          }}
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
                {t.modal.title}
              </h2>

              <div className="space-y-4 text-base">
                <p className="text-gray-700">
                  {t.modal.p1}
                </p>

                <p
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: t.modal.p2 }}
                />

                <div className="bg-primary/10 p-4 border-primary/30 border-l-4 rounded-r-lg">
                  <p className="mb-2 font-medium text-primary">
                    {t.modal.whatToDo}
                  </p>
                  <p
                    className="text-primary"
                    dangerouslySetInnerHTML={{ __html: t.modal.evidence }}
                  />
                </div>

                <p className="text-gray-600 text-sm">
                  {t.modal.p3}
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
