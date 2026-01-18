import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@thetis/ui/tooltip";
import { useNavigate } from "@tanstack/react-router";
import type { SectionMetadata } from "@/content/course/sections";

interface CourseProgressTrackerProps {
  currentSectionNumber: number;
  totalSections: number;
  completedCount: number;
  completionPercentage: number;
  sections: SectionMetadata[];
  isSectionComplete: (slug: string) => boolean;
  className?: string;
}

export function CourseProgressTracker({
  currentSectionNumber,
  totalSections,
  completedCount,
  completionPercentage,
  sections,
  isSectionComplete,
  className,
}: CourseProgressTrackerProps) {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <div className={cn("space-y-4 w-full", className)}>
        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Current Position */}
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-primary rounded-lg w-10 h-10 font-bold text-primary-foreground text-sm">
              {currentSectionNumber}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-muted-foreground text-xs">
                Current Section
              </span>
              <span className="font-semibold text-foreground text-sm">
                {currentSectionNumber} of {totalSections}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="bg-border w-px h-10" />

          {/* Completed Count */}
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-primary/10 border border-primary/20 rounded-lg w-10 h-10">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-muted-foreground text-xs">
                Completed
              </span>
              <span className="font-semibold text-foreground text-sm">
                {completedCount} {completedCount === 1 ? "lesson" : "lessons"}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-foreground text-sm">
              Course Progress
            </span>
            <span className="font-semibold text-primary text-sm">
              {completionPercentage}%
            </span>
          </div>
          <div className="relative w-full">
            <div className="flex justify-between items-center gap-1 w-full">
              {Array.from({ length: totalSections }, (_, index) => {
                const sectionNumber = index + 1;
                const section = sections[index];
                const isCompleted = section
                  ? isSectionComplete(section.slug)
                  : false;
                const isCurrent = sectionNumber === currentSectionNumber;
                const isUpcoming = !isCompleted && !isCurrent;

                if (!section) return null;

                return (
                  <Tooltip key={sectionNumber}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => {
                          navigate({
                            to: "/standard/$slug",
                            params: {
                              slug: section.slug,
                            },
                          });
                        }}
                        className={cn(
                          "relative flex-shrink-0 rounded-full transition-all duration-200 cursor-pointer",
                          "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                          isCurrent && "ring-2 ring-primary ring-offset-1",
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-full w-3 h-3 transition-all duration-200",
                            isCompleted && "bg-primary",
                            isCurrent && !isCompleted &&
                              "bg-primary/40 ring-2 ring-primary/40",
                            isUpcoming && "bg-slate-300",
                          )}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-popover shadow-lg p-2 border border-border max-w-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground text-sm leading-tight">
                          {section.title}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Section {sectionNumber}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          <p className="text-muted-foreground text-xs text-center">
            {completedCount} of {totalSections} lessons completed
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}
