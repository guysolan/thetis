import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  formatWeekDay,
  getNextSection,
  getPrevSection,
  getSectionBySlug,
  type SectionMetadata,
  sections,
} from "@/content/course/sections";
import { ContentRenderer, CourseProgressTracker } from "@/components/course";
import type { SectionContent } from "@/components/course/types";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmailSignupDialog } from "@/components/EmailSignupDialog";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { useEffect } from "react";

// Map slugs to their topic folders
const slugToFolder: Record<string, string> = {
  // Emergency
  "emergency-care": "emergency",
  "blood-clot-prevention": "emergency",
  "home-setup": "emergency",
  // Treatment
  "specialist-appointment": "treatment",
  "treatment-decision": "treatment",
  // Boot
  "choosing-your-boot": "boot",
  "your-walking-boot": "boot",
  "living-with-boot": "boot",
  "sleep-management": "boot",
  "healing-process": "boot",
  "wedge-removal": "boot",
  "walking-progress": "boot",
  "common-challenges": "boot",
  "final-boot-phase": "boot",
  // Transition
  "boot-transition": "transition",
  "post-boot-challenges": "transition",
  "scar-management": "transition",
  // Physiotherapy
  "pre-physio-prep": "physiotherapy",
  "starting-physio": "physiotherapy",
  "key-exercises": "physiotherapy",
  "walking-properly": "physiotherapy",
  "progressive-strengthening": "physiotherapy",
  // Recovery
  "building-cardio": "recovery",
  "functional-milestones": "recovery",
  "returning-to-life": "recovery",
  "nutrition-for-healing": "recovery",
  "swimming-and-water-activities": "recovery",
  // Advanced
  "starting-to-run": "advanced",
  "plyometrics": "advanced",
  // Long-term
  "six-month-milestone": "long-term",
  "preventing-rerupture": "long-term",
  "new-normal": "long-term",
  "when-things-dont-go-to-plan": "long-term",
  // Practical
  "first-week-checklist": "practical",
  "practical-life": "practical",
  "mental-health-recovery": "practical",
  "driving-guidelines": "practical",
  "pain-management-throughout-recovery": "practical",
};

// Dynamic import for section content
async function loadSectionContent(
  slug: string,
): Promise<{ metadata: SectionMetadata; content: SectionContent } | null> {
  const folder = slugToFolder[slug];
  if (!folder) {
    return null;
  }

  try {
    const module = await import(
      `@/content/course/standard/${folder}/${slug}.tsx`
    );
    return {
      metadata: module.metadata,
      content: module.content,
    };
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/standard/$slug")({
  loader: async ({ params }) => {
    const sectionMeta = getSectionBySlug(params.slug);
    if (!sectionMeta) {
      throw notFound();
    }

    const sectionData = await loadSectionContent(params.slug);
    if (!sectionData) {
      throw notFound();
    }

    const nextSection = getNextSection(sectionMeta.slug);
    const prevSection = getPrevSection(sectionMeta.slug);

    return {
      section: sectionMeta,
      content: sectionData.content,
      nextSection,
      prevSection,
    };
  },
  component: SectionPage,
  notFoundComponent: () => (
    <div className="mx-auto px-4 sm:px-6 py-12 max-w-4xl text-center">
      <h1 className="mb-4 font-semibold text-foreground text-3xl">
        Section Not Found
      </h1>
      <p className="mb-6 text-muted-foreground">
        This section doesn't exist or hasn't been created yet.
      </p>
      <Link
        to="/standard"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Course
      </Link>
    </div>
  ),
});

function SectionPage() {
  const { section, content, nextSection, prevSection } = Route.useLoaderData();
  const totalSections = sections.length;
  const {
    markLessonComplete,
    isLessonComplete,
    getCompletionPercentage,
  } = useCourseProgress();
  const isComplete = isLessonComplete(section.slug);
  const completionPercentage = getCompletionPercentage(totalSections);
  const completedCount =
    sections.filter((s) => isLessonComplete(s.slug)).length;

  // Mark lesson as complete when viewed
  useEffect(() => {
    if (!isComplete) {
      markLessonComplete(section.slug);
    }
  }, [section.slug, isComplete, markLessonComplete]);

  return (
    <div className="mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-8">
        <Link
          to="/standard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Link>
        <div className="flex items-center gap-3">
          {section.timing && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              {section.timing.when_useful}
            </div>
          )}
          {section.week !== undefined && section.day !== undefined && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              {formatWeekDay(section.week, section.day)}
            </div>
          )}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-muted/50 mb-8 p-4 border border-border rounded-xl">
        <CourseProgressTracker
          currentSectionNumber={section.section_number}
          totalSections={totalSections}
          completedCount={completedCount}
          completionPercentage={completionPercentage}
          sections={sections}
        />
      </div>

      {/* Section Header */}
      <header className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full font-medium text-primary text-sm">
            Section {section.section_number}
          </div>
          {isComplete && (
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full font-semibold text-green-700 dark:text-green-300 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
        <h1 className="mb-4 font-semibold text-foreground text-3xl md:text-4xl tracking-tight">
          {section.title}
        </h1>
        <p className="text-muted-foreground text-lg">{section.description}</p>
        {section.timing && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="font-medium text-primary text-sm mb-1">
              When this lesson is useful:
            </p>
            <p className="text-muted-foreground text-sm">
              {section.timing.when_useful}
            </p>
            {section.timing.triggers && section.timing.triggers.length > 0 && (
              <div className="mt-2">
                <p className="font-medium text-primary text-xs mb-1">
                  Triggers:
                </p>
                <ul className="text-muted-foreground text-xs list-disc list-inside">
                  {section.timing.triggers.map((trigger, idx) => (
                    <li key={idx}>{trigger}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Content */}
      <article className="mb-12 section-card">
        <ContentRenderer content={content} />
      </article>

      {/* Email Signup CTA */}
      <div className="bg-muted/50 mb-12 p-6 border border-border rounded-2xl">
        <div className="flex sm:flex-row flex-col sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="mb-1 font-semibold text-foreground">
              Get personalized recovery emails
            </h3>
            <p className="text-muted-foreground text-sm">
              Receive guidance timed to your injury date, exactly when you need
              it
            </p>
          </div>
          <EmailSignupDialog />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex sm:flex-row flex-col gap-4 pt-8 border-border border-t">
        {prevSection
          ? (
            <Link
              to="/standard/$slug"
              params={{ slug: prevSection.slug }}
              className={cn(
                "group flex flex-1 items-center gap-4 hover:bg-muted/50 p-4 border border-border hover:border-primary/30 rounded-xl transition-all",
              )}
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <div className="flex-1 min-w-0">
                <div className="text-muted-foreground text-sm">Previous</div>
                <div className="font-semibold text-foreground group-hover:text-primary truncate">
                  {prevSection.title}
                </div>
              </div>
            </Link>
          )
          : <div className="flex-1" />}

        {nextSection
          ? (
            <Link
              to="/standard/$slug"
              params={{ slug: nextSection.slug }}
              className={cn(
                "group flex flex-1 items-center gap-4 hover:bg-muted/50 p-4 border border-border hover:border-primary/30 text-right transition-all",
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="text-muted-foreground text-sm">Next</div>
                <div className="font-semibold text-foreground group-hover:text-primary truncate">
                  {nextSection.title}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            </Link>
          )
          : <div className="flex-1" />}
      </nav>
    </div>
  );
}
