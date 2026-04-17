import { createFileRoute, Link } from "@tanstack/react-router";
import { sections } from "@/content/course/plantar-fasciitis/sections";
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

export const Route = createFileRoute("/plantar-fasciitis/")({
  component: () => (
    <ProtectedRoute requiredCourse="plantar-fasciitis">
      <PlantarFasciitisIndexPage />
    </ProtectedRoute>
  ),
});

const chapterDisplayNames: Record<
  string,
  { name: string; description: string }
> = {
  "00-understanding": {
    name: "Understanding",
    description: "What heel pain is and why it happens",
  },
  "01-level-1-foundation": {
    name: "Level 1: Foundation",
    description: "Rest, weight management, stretching, and footwear",
  },
  "02-level-2-further-treatment": {
    name: "Level 2: Further Treatment",
    description: "Scans, injections, and shockwave therapy",
  },
  "03-level-3-surgery": {
    name: "Level 3: Surgery",
    description: "When surgery is considered — rarely needed",
  },
};

function PlantarFasciitisIndexPage() {
  const {
    isLessonComplete,
    markLessonComplete,
    markLessonIncomplete,
    getCompletionPercentage,
  } = useCourseProgress();

  const courseSections = sections.filter((s) => s.course_type === "standard");
  const completionPercentage = getCompletionPercentage(
    courseSections.map((s) => s.slug),
  );

  return (
    <CoursePageLayout>
      <CourseBackButton to="/" label="Back to Programs" />

      <CourseHeader
        badge="Plantar Fasciitis"
        title="Chronic Heel Pain Recovery"
        description={`A guide to understanding and managing persistent heel pain — plantar fasciitis and Achilles tendinitis at the heel. ${courseSections.length} lessons from first principles through to advanced options (including surgery, which is rarely needed).`}
      >
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
              {courseSections.filter((s) => isLessonComplete(s.slug)).length} of
              {" "}
              {courseSections.length} lessons completed
            </p>
          </div>
        )}
      </CourseHeader>

      <div className="gap-3 grid">
        {courseSections
          .sort((a, b) => a.section_number - b.section_number)
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
                <div className="flex items-center gap-4">
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
                      : section.section_number}
                  </div>

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

                <div className="flex justify-end items-center gap-2">
                  <LessonCompletionButton
                    isComplete={isComplete}
                    onToggle={() => {
                      if (isLessonComplete(section.slug)) {
                        markLessonIncomplete(section.slug);
                      } else {
                        markLessonComplete(section.slug);
                      }
                    }}
                  />
                  <Button variant="default" size="sm" asChild>
                    <Link
                      to="/plantar-fasciitis/$slug"
                      params={{ slug: section.slug }}
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
