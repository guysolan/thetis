import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  sections,
  getSectionByWeekDay,
  getNextSection,
  getPrevSection,
  formatWeekDay,
  type SectionMetadata,
} from "@/content/course/sections";
import { ContentRenderer } from "@/components/course";
import type { SectionContent } from "@/components/course/types";
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

// Dynamic import for section content
async function loadSectionContent(
  slug: string
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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 text-center">
      <h1 className="font-serif text-3xl font-semibold text-slate-900 mb-4">
        Section Not Found
      </h1>
      <p className="text-slate-600 mb-6">
        This section doesn't exist or hasn't been created yet.
      </p>
      <Link
        to="/essentials"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Course
      </Link>
    </div>
  ),
});

function SectionPage() {
  const { section, content, nextSection, prevSection } = Route.useLoaderData();
  const totalSections = sections.length;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 md:py-12">
      {/* Breadcrumb & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Link
          to="/essentials"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            {formatWeekDay(section.week, section.day)}
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BookOpen className="h-4 w-4" />
            {section.section_number} of {totalSections}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{
              width: `${(section.section_number / totalSections) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Section Header */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
          Section {section.section_number}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
          {section.title}
        </h1>
        <p className="text-lg text-slate-600">{section.description}</p>
      </header>

      {/* Content */}
      <article className="section-card mb-12">
        <ContentRenderer content={content} />
      </article>

      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200">
        {prevSection ? (
          <Link
            to="/essentials/week/$week/day/$day"
            params={{
              week: String(prevSection.week),
              day: String(prevSection.day),
            }}
            className={cn(
              "flex-1 group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
            )}
          >
            <ArrowLeft className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-slate-500">Previous</div>
              <div className="font-semibold text-slate-900 truncate group-hover:text-blue-900">
                {prevSection.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextSection ? (
          <Link
            to="/essentials/week/$week/day/$day"
            params={{
              week: String(nextSection.week),
              day: String(nextSection.day),
            }}
            className={cn(
              "flex-1 group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all text-right"
            )}
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm text-slate-500">Next</div>
              <div className="font-semibold text-slate-900 truncate group-hover:text-blue-900">
                {nextSection.title}
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  );
}

