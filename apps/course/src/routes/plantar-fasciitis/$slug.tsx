import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  getNextSection,
  getPrevSection,
  getSectionBySlug,
  type SectionMetadata,
  sections,
  slugToChapter,
} from "@/content/course/plantar-fasciitis/sections";
import {
  ContentRenderer,
  CoursePageLayout,
  CourseProgressTracker,
  CourseSectionHeader,
  LessonCompletionButton,
} from "@/components/course";
import type { SectionContent } from "@/components/course/types";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { useEffect } from "react";

const slugToFolder = slugToChapter;

async function loadSectionContent(
  slug: string,
): Promise<{ metadata: SectionMetadata; content: SectionContent } | null> {
  const folder = slugToFolder[slug];
  if (!folder) {
    console.error(`No folder mapping found for slug: ${slug}`);
    return null;
  }

  try {
    const module = await import(
      `@/content/course/plantar-fasciitis/${folder}/${slug}.tsx`
    );

    if (!module.metadata || !module.content) {
      console.error(`Section ${slug} is missing metadata or content exports`);
      return null;
    }

    return {
      metadata: module.metadata,
      content: module.content,
    };
  } catch (error) {
    console.error(`Failed to load section ${slug} from ${folder}:`, error);
    return null;
  }
}

import { ProtectedRoute } from "@/components/ProtectedRoute";

export const Route = createFileRoute("/plantar-fasciitis/$slug")({
  loader: async ({ params }) => {
    const sectionMeta = getSectionBySlug(params.slug);
    if (!sectionMeta) {
      throw notFound();
    }

    if (!slugToFolder[params.slug]) {
      console.error(`Section ${params.slug} not found in slugToFolder mapping`);
      throw notFound();
    }

    const sectionData = await loadSectionContent(params.slug);
    if (!sectionData) {
      console.error(`Failed to load content for section ${params.slug}`);
      throw notFound();
    }

    let nextSection = getNextSection(sectionMeta.slug);
    let prevSection = getPrevSection(sectionMeta.slug);

    if (nextSection && !slugToFolder[nextSection.slug]) {
      nextSection = null;
    }
    if (prevSection && !slugToFolder[prevSection.slug]) {
      prevSection = null;
    }

    return {
      section: sectionMeta,
      content: sectionData.content,
      nextSection,
      prevSection,
    };
  },
  component: () => (
    <ProtectedRoute requiredCourse="plantar-fasciitis">
      <SectionPage />
    </ProtectedRoute>
  ),
  notFoundComponent: () => (
    <div className="mx-auto px-4 sm:px-6 py-12 max-w-4xl text-center">
      <h1 className="mb-4 font-semibold text-foreground text-3xl">
        Section Not Found
      </h1>
      <p className="mb-6 text-muted-foreground">
        This section doesn't exist or hasn't been created yet.
      </p>
      <Link
        to="/plantar-fasciitis"
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
    markLessonIncomplete,
    isLessonComplete,
    getCompletionPercentage,
    setCurrentBookmark,
  } = useCourseProgress();
  const isComplete = isLessonComplete(section.slug);
  const completionPercentage = getCompletionPercentage(
    sections.map((s) => s.slug),
  );
  const completedCount =
    sections.filter((s) => isLessonComplete(s.slug)).length;

  useEffect(() => {
    setCurrentBookmark(section.slug);
  }, [section.slug, setCurrentBookmark]);

  useEffect(() => {
    if (isComplete) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

      if (scrollPercentage > 0.75) {
        markLessonComplete(section.slug);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [section.slug, isComplete, markLessonComplete]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [section.slug]);

  return (
    <CoursePageLayout>
      <CourseSectionHeader
        backTo="/plantar-fasciitis"
        backLabel="Back to Course"
        rightAction={
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
        }
      />

      <div className="flex lg:flex-row flex-col gap-8 mb-12">
        <div className="lg:w-64 lg:shrink-0">
          <div className="lg:top-20 lg:sticky lg:self-start bg-muted/50 p-4 border border-border rounded-xl lg:h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <CourseProgressTracker
              currentSectionNumber={section.section_number}
              totalSections={totalSections}
              completedCount={completedCount}
              completionPercentage={completionPercentage}
              sections={sections}
              isSectionComplete={isLessonComplete}
              routePrefix="/plantar-fasciitis"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {(prevSection || nextSection) && (
            <nav className="flex sm:flex-row flex-col gap-4 mb-12">
              {prevSection
                ? (
                  <Link
                    to="/plantar-fasciitis/$slug"
                    params={{ slug: prevSection.slug }}
                    className="group flex flex-1 items-center gap-3 hover:bg-muted/50 p-3 border border-border hover:border-primary/30 rounded-lg transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-muted-foreground text-xs">
                        Previous
                      </div>
                      <div className="font-medium text-foreground group-hover:text-primary text-sm truncate">
                        {prevSection.title}
                      </div>
                    </div>
                  </Link>
                )
                : <div className="flex-1" />}
              {nextSection
                ? (
                  <Link
                    to="/plantar-fasciitis/$slug"
                    params={{ slug: nextSection.slug }}
                    onClick={() => {
                      if (!isComplete) markLessonComplete(section.slug);
                    }}
                    className="group flex flex-1 items-center gap-3 hover:bg-muted/50 p-3 border border-border hover:border-primary/30 rounded-lg transition-all"
                  >
                    <div className="flex-1 min-w-0 text-right">
                      <div className="text-muted-foreground text-xs">Next</div>
                      <div className="font-medium text-foreground group-hover:text-primary text-sm truncate">
                        {nextSection.title}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                  </Link>
                )
                : <div className="flex-1" />}
            </nav>
          )}

          <div>
            <header className="mb-10">
              <h1 className="mb-3 font-semibold text-foreground text-3xl md:text-4xl tracking-tight">
                {section.title}
              </h1>
              <p className="mb-4 text-muted-foreground text-lg">
                {section.description}
              </p>
              {section.timing && (
                <div className="space-y-3 bg-primary/5 p-4 md:p-5 border border-primary/20 rounded-lg">
                  <div>
                    <p className="mb-2 font-semibold text-primary text-base md:text-lg">
                      When this lesson is useful:
                    </p>
                    <p className="text-foreground text-sm leading-relaxed">
                      {section.timing.when_useful}
                    </p>
                  </div>
                  {section.timing.triggers &&
                    section.timing.triggers.length > 0 && (
                    <div>
                      <p className="mb-2 font-semibold text-primary text-base md:text-lg">
                        Useful when:
                      </p>
                      <ul className="space-y-1.5 text-foreground text-sm list-disc list-inside">
                        {section.timing.triggers.map((trigger, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {trigger}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </header>

            <article className="mb-12 section-card">
              <ContentRenderer content={content} />
            </article>

            {(prevSection || nextSection) && (
              <nav className="flex sm:flex-row flex-col gap-4 pt-8 border-border border-t">
                {prevSection
                  ? (
                    <Link
                      to="/plantar-fasciitis/$slug"
                      params={{ slug: prevSection.slug }}
                      className="group flex flex-1 items-center gap-4 hover:bg-muted/50 p-4 border border-border hover:border-primary/30 rounded-xl transition-all"
                    >
                      <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-muted-foreground text-sm">
                          Previous
                        </div>
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
                      to="/plantar-fasciitis/$slug"
                      params={{ slug: nextSection.slug }}
                      onClick={() => {
                        if (!isComplete) markLessonComplete(section.slug);
                      }}
                      className="group flex flex-1 items-center gap-4 hover:bg-muted/50 p-4 border border-border hover:border-primary/30 rounded-xl transition-all"
                    >
                      <div className="flex-1 min-w-0 text-right">
                        <div className="text-muted-foreground text-sm">
                          Next
                        </div>
                        <div className="font-semibold text-foreground group-hover:text-primary truncate">
                          {nextSection.title}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
                    </Link>
                  )
                  : <div className="flex-1" />}
              </nav>
            )}
          </div>
        </div>
      </div>
    </CoursePageLayout>
  );
}
