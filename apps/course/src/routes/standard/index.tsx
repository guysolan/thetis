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

// Chapter display names - map folder names to human-readable titles
const chapterDisplayNames: Record<
  string,
  { name: string; description: string }
> = {
  emergency: {
    name: "Emergency Care",
    description: "Immediate needs after rupture",
  },
  treatment: {
    name: "Treatment Decision",
    description: "Understanding your options",
  },
  boot: {
    name: "Boot & Equipment",
    description: "Living with your boot and managing recovery",
  },
  practical: {
    name: "Practical Life",
    description: "Work, driving, and daily life",
  },
  transition: {
    name: "Boot Transition",
    description: "Moving out of your boot",
  },
  physiotherapy: {
    name: "Physiotherapy",
    description: "Rebuilding strength and function",
  },
  recovery: {
    name: "Recovery & Strengthening",
    description: "Building fitness and returning to activities",
  },
  advanced: {
    name: "Advanced Activities",
    description: "Running, jumping, and return to sport",
  },
  "long-term": {
    name: "Long-Term Recovery",
    description: "Life after Achilles rupture",
  },
};

// Auto-group sections by chapter (derived from folder structure)
function groupSectionsByChapter(): Array<{
  chapter: string;
  name: string;
  description: string;
  sections: typeof sections;
}> {
  const grouped = sections.reduce(
    (acc, section) => {
      const chapter = section.chapter;
      if (!acc[chapter]) {
        acc[chapter] = [];
      }
      acc[chapter].push(section);
      return acc;
    },
    {} as Record<string, typeof sections>,
  );

  // Convert to array and sort chapters by their first section's position
  return Object.entries(grouped)
    .map(([chapter, sections]) => {
      const displayInfo = chapterDisplayNames[chapter] || {
        name: chapter.charAt(0).toUpperCase() + chapter.slice(1),
        description: "",
      };
      return {
        chapter,
        name: displayInfo.name,
        description: displayInfo.description,
        sections: sections.sort((a, b) => a.section_number - b.section_number),
      };
    })
    .sort((a, b) => {
      // Sort chapters by the first section's number in each chapter
      const aFirst = a.sections[0]?.section_number || 0;
      const bFirst = b.sections[0]?.section_number || 0;
      return aFirst - bFirst;
    });
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

        {/* Section List */}
        <div className="space-y-12">
          {groupSectionsByChapter().map((chapterGroup, chapterIndex) => {
            if (chapterGroup.sections.length === 0) return null;

            return (
              <div key={chapterGroup.chapter} className="relative">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex justify-center items-center bg-primary rounded-xl w-10 h-10 font-bold text-primary-foreground">
                    {chapterIndex + 1}
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground text-xl md:text-2xl">
                      {chapterGroup.name}
                    </h2>
                    {chapterGroup.description && (
                      <p className="mt-1 text-muted-foreground text-sm">
                        {chapterGroup.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="gap-3 grid">
                  {chapterGroup.sections.map((section) => {
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
                            <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                              {section.timing && (
                                <div className="flex items-center gap-2 max-w-[200px] font-medium text-muted-foreground text-xs">
                                  <Clock className="w-3.5 h-3.5 shrink-0" />
                                  <span className="text-right line-clamp-2">
                                    {section.timing.when_useful}
                                  </span>
                                </div>
                              )}
                              {section.week !== undefined &&
                                section.day !== undefined && (
                                <div className="flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                  {formatWeekDay(section.week, section.day)}
                                </div>
                              )}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
