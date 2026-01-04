import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  formatWeekDay,
  getNextSection,
  getPrevSection,
  getSectionByWeekDay,
  type SectionMetadata,
  sections,
} from "@/content/course/sections";
import { ContentRenderer } from "@/components/course";
import type { SectionContent } from "@/components/course/types";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmailSignupDialog } from "@/components/EmailSignupDialog";

// Dynamic import for section content
async function loadSectionContent(
  slug: string,
): Promise<{ metadata: SectionMetadata; content: SectionContent } | null> {
  try {
    const module = await import(
      `@/content/course/essentials/${slug}.tsx`
    );
    return {
      metadata: module.metadata,
      content: module.content,
    };
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/essentials/week/$week/day/$day")({
  loader: async ({ params }) => {
    const week = parseInt(params.week);
    const day = parseInt(params.day);

    const sectionMeta = getSectionByWeekDay(week, day);
    if (!sectionMeta) {
      throw notFound();
    }

    const sectionData = await loadSectionContent(sectionMeta.slug);
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
        to="/essentials"
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

  return (
    <div className="mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-4xl">
      {/* Breadcrumb & Progress */}
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-8">
        <Link
          to="/essentials"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            {formatWeekDay(section.week, section.day)}
          </div>
          <div className="bg-border w-px h-4" />
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <BookOpen className="w-4 h-4" />
            {section.section_number} of {totalSections}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="bg-muted rounded-full w-full h-1.5 overflow-hidden">
          <div
            className="bg-primary rounded-full h-full transition-all duration-500"
            style={{
              width: `${(section.section_number / totalSections) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Section Header */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 mb-4 px-3 py-1 rounded-full font-medium text-primary text-sm">
          Section {section.section_number}
        </div>
        <h1 className="mb-4 font-semibold text-foreground text-3xl md:text-4xl tracking-tight">
          {section.title}
        </h1>
        <p className="text-muted-foreground text-lg">{section.description}</p>
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
              to="/essentials/week/$week/day/$day"
              params={{
                week: String(prevSection.week),
                day: String(prevSection.day),
              }}
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
              to="/essentials/week/$week/day/$day"
              params={{
                week: String(nextSection.week),
                day: String(nextSection.day),
              }}
              className={cn(
                "group flex flex-1 items-center gap-4 hover:bg-muted/50 p-4 border border-border hover:border-primary/30 rounded-xl text-right transition-all",
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
