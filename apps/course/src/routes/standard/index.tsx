import { createFileRoute, Link } from "@tanstack/react-router";
import { sections } from "@/content/course/sections";
import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@thetis/ui/button";
import { Progress } from "@thetis/ui/progress";
import { useCourseProgress } from "@/hooks/use-course-progress";

export const Route = createFileRoute("/standard/")({
  component: StandardIndexPage,
});

// Chapter display names - map folder names to human-readable titles (chronological order)
const chapterDisplayNames: Record<
  string,
  { name: string; description: string }
> = {
  "00-practical": {
    name: "Practical Life",
    description: "Throughout recovery - work, driving, and daily life",
  },
  "01-emergency": {
    name: "Emergency Care",
    description: "Days 0-3 - Immediate needs after rupture",
  },
  "02-early-treatment": {
    name: "Early Treatment",
    description: "Days 2-14 - Understanding your options and getting your boot",
  },
  "03-boot-phase": {
    name: "Boot Phase",
    description: "Days 14-56 - Living with your boot and managing recovery",
  },
  "04-transition": {
    name: "Boot Transition",
    description: "Days 74-98 - Moving out of your boot",
  },
  "05-physiotherapy": {
    name: "Physiotherapy",
    description: "Days 63-105 - Rebuilding strength and function",
  },
  "06-recovery": {
    name: "Recovery & Strengthening",
    description: "Days 84-160 - Building fitness and returning to activities",
  },
  "07-advanced": {
    name: "Advanced Activities",
    description: "Days 200-220 - Running, jumping, and return to sport",
  },
  "08-long-term": {
    name: "Long-Term Recovery",
    description: "Days 180-240 - Life after Achilles rupture",
  },
};

// Display sections in pure chronological order (by section_number)
// Sections are already ordered chronologically in sections.ts
function getChronologicalSections() {
  return sections.sort((a, b) => a.section_number - b.section_number);
}

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

        {/* Section List - Chronological Order */}
        <div className="gap-3 grid">
          {getChronologicalSections().map((section) => {
            const isComplete = isLessonComplete(section.slug);
            const chapterInfo = chapterDisplayNames[section.chapter] || {
              name: section.chapter,
              description: "",
            };
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
                    {isComplete ? <CheckCircle2 className="w-6 h-6" /> : (
                      section.section_number
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        className={cn(
                          "font-semibold transition-colors",
                          isComplete ? "text-primary" : "text-foreground",
                        )}
                      >
                        {section.title}
                      </h3>
                      <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground text-xs">
                        {chapterInfo.name}
                      </span>
                    </div>
                    {section.timing.when_useful && (
                      <p className="text-muted-foreground text-sm">
                        {section.timing.when_useful}
                      </p>
                    )}
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
                      to="/standard/$slug"
                      params={{
                        slug: section.slug,
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
    </div>
  );
}
