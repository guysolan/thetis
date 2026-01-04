import { createFileRoute, Link } from "@tanstack/react-router";
import { formatWeekDay, sections } from "@/content/course/sections";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@thetis/ui/button";
import { Progress } from "@thetis/ui/progress";
import { EmailSignupDialog } from "@/components/EmailSignupDialog";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { WEBSITE_URL } from "@/lib/env";

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
  const { isLessonComplete, getCompletionPercentage } = useCourseProgress();
  const completionPercentage = getCompletionPercentage(sections.length);

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 mb-12 text-muted-foreground hover:text-primary transition-colors"
        >
          <div className="transition-transform group-hover:-translate-x-1">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </div>
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
                      <Link
                        key={section.slug}
                        to="/standard/week/$week/day/$day"
                        params={{
                          week: String(section.week),
                          day: String(section.day),
                        }}
                        className={cn(
                          "group flex items-center gap-4 p-5 border rounded-2xl transition-all",
                          isComplete
                            ? "bg-primary/10 dark:bg-primary/20 border-primary/30 dark:border-primary/40 hover:border-primary/50 dark:hover:border-primary/60"
                            : "bg-card hover:bg-muted/50 border-border hover:border-primary/30",
                        )}
                      >
                        <div
                          className={cn(
                            "flex justify-center items-center rounded-xl w-12 h-12 font-bold transition-colors shrink-0",
                            isComplete
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary",
                          )}
                        >
                          {isComplete ? <CheckCircle2 className="w-6 h-6" /> : (
                            section.section_number
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3
                              className={cn(
                                "font-semibold transition-colors",
                                isComplete
                                  ? "text-primary"
                                  : "text-foreground group-hover:text-primary",
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
                          <p className="text-muted-foreground text-sm truncate">
                            {section.description}
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                          <Clock className="w-3.5 h-3.5" />
                          {formatWeekDay(section.week, section.day)}
                        </div>
                        <ChevronRight
                          className={cn(
                            "w-5 h-5 transition-colors",
                            isComplete
                              ? "text-primary"
                              : "text-muted-foreground/30 group-hover:text-primary",
                          )}
                        />
                      </Link>
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
