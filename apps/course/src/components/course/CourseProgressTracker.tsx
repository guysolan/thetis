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
import { formatWeekDay } from "@/content/course/sections";

interface CourseProgressTrackerProps {
  currentSectionNumber: number;
  totalSections: number;
  completedCount: number;
  completionPercentage: number;
  sections: SectionMetadata[];
  className?: string;
}

export function CourseProgressTracker({
  currentSectionNumber,
  totalSections,
  completedCount,
  completionPercentage,
  sections,
  className,
}: CourseProgressTrackerProps) {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <div className={cn("w-full space-y-5", className)}>
        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Current Position */}
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-primary rounded-xl w-11 h-11 font-bold text-primary-foreground text-base shadow-md">
              {currentSectionNumber}
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                Current Section
              </span>
              <span className="font-bold text-foreground text-base">
                {currentSectionNumber} of {totalSections}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="bg-border w-px h-11" />

          {/* Completed Count */}
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-primary/10 dark:bg-primary/20 rounded-xl w-11 h-11 shadow-md border border-primary/20">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                Completed
              </span>
              <span className="font-bold text-foreground text-base">
                {completedCount} {completedCount === 1 ? "lesson" : "lessons"}
              </span>
            </div>
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground text-sm">
              Course Progress
            </span>
            <span className="font-bold text-primary text-base">
              {completionPercentage}%
            </span>
          </div>
          <div className="relative w-full">
            <div className="flex items-center justify-between gap-1.5 w-full">
              {Array.from({ length: totalSections }, (_, index) => {
                const sectionNumber = index + 1;
                const section = sections[index];
                const isCompleted = sectionNumber <= completedCount;
                const isCurrent = sectionNumber === currentSectionNumber;
                const isUpcoming = sectionNumber > completedCount;

                if (!section) return null;

                return (
                  <Tooltip key={sectionNumber}>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => {
                          navigate({
                            to: "/standard/week/$week/day/$day",
                            params: {
                              week: String(section.week),
                              day: String(section.day),
                            },
                          });
                        }}
                        className={cn(
                          "relative transition-all duration-200 cursor-pointer flex-shrink-0",
                          "hover:scale-110",
                          isCurrent && "ring-2 ring-primary ring-offset-1 ring-offset-background rounded-full",
                        )}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full transition-all duration-200",
                            isCompleted && "bg-primary/70 dark:bg-primary/80",
                            isCurrent && "bg-primary/40 dark:bg-primary/50",
                            isUpcoming && "bg-muted",
                          )}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-xs p-3 bg-popover border border-border shadow-lg"
                    >
                      <div className="space-y-1.5">
                        <div className="font-semibold text-foreground text-sm leading-tight">
                          {section.title}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                          <span>{formatWeekDay(section.week, section.day)}</span>
                          <span>•</span>
                          <span>Section {sectionNumber}</span>
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
