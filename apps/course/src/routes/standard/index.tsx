import { createFileRoute, Link } from "@tanstack/react-router";
import { formatWeekDay, sections } from "@/content/course/sections";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@thetis/ui/button";
import { Progress } from "@thetis/ui/progress";
import { useCourseProgress } from "@/hooks/use-course-progress";

export const Route = createFileRoute("/standard/")({
  component: StandardIndexPage,
});

// Group sections by phase based on days_after_rupture ranges
const phases = [
  { name: "Week 0-1: Emergency & First Steps", minDay: 0, maxDay: 13 },
  { name: "Weeks 2-3: Treatment Decision", minDay: 14, maxDay: 27 },
  { name: "Weeks 4-7: Progressive Recovery", minDay: 28, maxDay: 55 },
  { name: "Weeks 8-10: Final Boot Phase", minDay: 56, maxDay: 77 },
  { name: "Weeks 11-14: Boot Transition", minDay: 78, maxDay: 104 },
  { name: "Weeks 15-26: Strengthening", minDay: 105, maxDay: 189 },
  { name: "Week 26+: Return to Sport", minDay: 190, maxDay: 999 },
];

function StandardIndexPage() {
  const {
    isLessonComplete,
    markLessonComplete,
    markLessonIncomplete,
    getCompletionPercentage,
  } = useCourseProgress();
  const completionPercentage = getCompletionPercentage(sections.length);

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-12 text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Programs
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 mb-4 px-3 py-1 rounded-full font-medium text-primary text-sm">
            <BookOpen className="w-4 h-4" />
            Standard Course
          </div>
          <h1 className="mb-4 font-bold text-foreground text-3xl md:text-5xl tracking-tight">
            Achilles Recovery Standard
          </h1>
          <p className="mb-6 max-w-2xl text-muted-foreground text-lg md:text-xl">
            {sections.length}{" "}
            lessons covering your complete journey from injury to return to
            sport.
          </p>

          {/* Progress Summary */}
          {completionPercentage > 0 && (
            <div className="bg-primary/10 mb-6 p-4 border border-primary/20 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-foreground text-sm">
                  Your Progress
                </span>
                <span className="font-bold text-primary text-sm">
                  {completionPercentage}% Complete
                </span>
              </div>
              <Progress value={completionPercentage} />
              <p className="mt-2 text-muted-foreground text-xs">
                {sections.filter((s) => isLessonComplete(s.slug)).length} of
                {" "}
                {sections.length} lessons completed
              </p>
            </div>
          )}
        </div>

        {/* Section List */}
        <div className="space-y-12">
          {phases.map((phase, phaseIndex) => {
            const phaseSections = sections.filter(
              (s) =>
                s.days_after_rupture >= phase.minDay &&
                s.days_after_rupture <= phase.maxDay,
            );

            if (phaseSections.length === 0) return null;

            return (
              <div key={phaseIndex} className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex justify-center items-center bg-primary rounded-xl w-10 h-10 font-bold text-primary-foreground">
                    {phaseIndex + 1}
                  </div>
                  <h2 className="font-bold text-foreground text-xl md:text-2xl">
                    {phase.name}
                  </h2>
                </div>

                <div className="gap-3 grid">
                  {phaseSections.map((section) => {
                    const isComplete = isLessonComplete(section.slug);
                    return (
                      <div
                        key={section.slug}
                        className={cn(
                          "group relative flex flex-col gap-4 p-5 border rounded-2xl transition-all",
                          isComplete
                            ? "bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30"
                            : "bg-card border-border",
                        )}
                      >
                        {/* Main Content */}
                        <div className="flex items-center gap-4">
                          {/* Section Number/Status Icon */}
                          <div
                            className={cn(
                              "flex justify-center items-center rounded-xl w-12 h-12 font-bold transition-colors shrink-0",
                              isComplete
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {isComplete
                              ? <CheckCircle2 className="w-6 h-6" />
                              : (
                                section.section_number
                              )}
                          </div>

                          {/* Content */}
                          <div className="flex flex-1 items-center gap-4 min-w-0">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3
                                  className={cn(
                                    "font-semibold transition-colors",
                                    isComplete
                                      ? "text-primary"
                                      : "text-foreground",
                                  )}
                                >
                                  {section.title}
                                </h3>
                                {isComplete && (
                                  <span className="inline-flex items-center gap-1 bg-primary/20 dark:bg-primary/30 px-2 py-0.5 rounded font-semibold text-primary text-xs">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Done
                                  </span>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-1">
                                {section.description}
                              </p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-wider shrink-0">
                              <Clock className="w-3.5 h-3.5" />
                              {formatWeekDay(section.week, section.day)}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (isComplete) {
                                markLessonIncomplete(section.slug);
                              } else {
                                markLessonComplete(section.slug);
                              }
                            }}
                          >
                            {isComplete ? "Unmark as Done" : "Mark as Done"}
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            asChild
                          >
                            <Link
                              to="/standard/week/$week/day/$day"
                              params={{
                                week: String(section.week),
                                day: String(section.day),
                              }}
                            >
                              Open
                              <ChevronRight className="ml-1 w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
