import { createFileRoute, Link } from "@tanstack/react-router";
import { formatWeekDay, sections } from "@/content/course/sections";
import { BookOpen, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/essentials/")({
  component: EssentialsIndexPage,
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

function EssentialsIndexPage() {
  return (
    <div className="mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 mb-4 px-3 py-1 rounded-full font-medium text-blue-800 text-sm">
          <BookOpen className="w-4 h-4" />
          Essentials Course
        </div>
        <h1 className="mb-4 font-serif font-semibold text-slate-900 text-3xl md:text-4xl">
          Achilles Recovery Essentials
        </h1>
        <p className="text-slate-600 text-lg">
          {sections.length}{" "}
          sections covering your complete recovery journey from injury to return
          to sport.
        </p>
      </div>

      {/* Section List */}
      <div className="space-y-8">
        {phases.map((phase, phaseIndex) => {
          const phaseSections = sections.filter(
            (s) =>
              s.days_after_rupture >= phase.minDay &&
              s.days_after_rupture <= phase.maxDay,
          );

          if (phaseSections.length === 0) return null;

          return (
            <div key={phaseIndex}>
              <h2 className="flex items-center gap-2 mb-4 font-semibold text-slate-900 text-lg">
                <div className="flex justify-center items-center bg-blue-600 rounded-full w-7 h-7 font-bold text-white text-sm">
                  {phaseIndex + 1}
                </div>
                {phase.name}
              </h2>
              <div className="space-y-2">
                {phaseSections.map((section, i) => (
                  <Link
                    key={section.slug}
                    to="/essentials/week/$week/day/$day"
                    params={{
                      week: String(section.week),
                      day: String(section.day),
                    }}
                    className={cn(
                      "group flex items-center gap-4 bg-white hover:bg-blue-50/50 p-4 border border-slate-100 hover:border-blue-200 rounded-xl transition-all",
                    )}
                  >
                    <div className="flex justify-center items-center bg-slate-100 group-hover:bg-blue-100 rounded-lg w-10 h-10 font-semibold text-slate-600 group-hover:text-blue-700 text-sm transition-colors shrink-0">
                      {section.section_number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-slate-500 text-sm truncate">
                        {section.description}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
                      <Clock className="w-4 h-4" />
                      {formatWeekDay(section.week, section.day)}
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
