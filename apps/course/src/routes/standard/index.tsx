import { createFileRoute, Link } from "@tanstack/react-router";
import { sections } from "@/content/course/sections";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@thetis/ui/button";
import { Progress } from "@thetis/ui/progress";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  CourseBackButton,
  CourseHeader,
  CoursePageLayout,
  LessonCompletionButton,
} from "@/components/course";

export const Route = createFileRoute("/standard/")({
  component: () => (
    <ProtectedRoute requiredCourse="standard">
      <StandardIndexPage />
    </ProtectedRoute>
  ),
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

function StandardIndexPage() {
  const {
    isLessonComplete,
    markLessonComplete,
    markLessonIncomplete,
    getCompletionPercentage,
  } = useCourseProgress();

  // Filter sections to only show standard course sections
  const standardSections = sections.filter(
    (s) => s.course_type === "standard",
  );
  const completionPercentage = getCompletionPercentage(standardSections.length);

  return (
    <CoursePageLayout>
      <CourseBackButton to="/" label="Back to Programs" />

      <CourseHeader
        badge="Standard Course"
        title="Achilles Recovery Standard"
        description={`${standardSections.length} lessons covering your complete journey from injury to return to sport.`}
      >
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
              {standardSections.filter((s) => isLessonComplete(s.slug))
                .length} of {standardSections.length} lessons completed
            </p>
          </div>
        )}
      </CourseHeader>

      {/* Section List - Chronological Order */}
      <div className="gap-3 grid">
        {standardSections.sort((a, b) => a.section_number - b.section_number)
          .map((section) => {
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
                  <LessonCompletionButton
                    isComplete={isComplete}
                    onToggle={() => {
                      const currentSlug = section.slug;
                      const currentIsComplete = isLessonComplete(currentSlug);
                      if (currentIsComplete) {
                        markLessonIncomplete(currentSlug);
                      } else {
                        markLessonComplete(currentSlug);
                      }
                    }}
                  />
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
    </CoursePageLayout>
  );
}
