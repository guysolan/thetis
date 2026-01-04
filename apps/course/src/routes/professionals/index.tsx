import { createFileRoute, Link } from "@tanstack/react-router";
import { formatWeekDay, sections } from "@/content/course/sections";
import { BookOpen, ChevronRight, Clock, Mail, Star } from "lucide-react";
import { Button } from "@thetis/ui/button";
import { EmailSignupDialog } from "@/components/EmailSignupDialog";
import { ShopifyCourseBuyButton } from "@/components/ShopifyCourseBuyButton";
import { useCoursePrice } from "@/hooks/use-course-price";
import { SHOPIFY_PRODUCTS } from "@/lib/shopify";

export const Route = createFileRoute("/professionals/")({
  component: ProfessionalsIndexPage,
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

function ProfessionalsIndexPage() {
  const { formattedPrice, isLoading } = useCoursePrice("professionals");

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
            <Star className="fill-current w-4 h-4 text-primary" />
            Professionals Course
          </div>
          <h1 className="mb-4 font-bold text-foreground text-3xl md:text-5xl tracking-tight">
            Achilles Recovery <span className="text-primary">Professional</span>
          </h1>
          <p className="mb-6 max-w-2xl text-muted-foreground text-lg md:text-xl">
            Everything in Essentials, plus expert-led deep dives and advanced
            recovery hacks from specialist surgeons and physios.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ShopifyCourseBuyButton
              productId={SHOPIFY_PRODUCTS.PROFESSIONALS_COURSE}
              buttonText="Buy Professionals Course"
              showPrice={true}
              price={formattedPrice}
              isLoading={isLoading}
              className="flex-1 min-w-[200px]"
            />
            <EmailSignupDialog
              trigger={
                <Button variant="outline" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Get Free Recovery Emails
                </Button>
              }
            />
          </div>
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
                  <div className="flex justify-center items-center bg-primary shadow-sm rounded-xl w-10 h-10 font-bold text-primary-foreground">
                    {phaseIndex + 1}
                  </div>
                  <h2 className="font-bold text-foreground text-xl md:text-2xl">
                    {phase.name}
                  </h2>
                </div>

                <div className="gap-3 grid">
                  {phaseSections.map((section) => (
                    <Link
                      key={section.slug}
                      to="/essentials/week/$week/day/$day"
                      params={{
                        week: String(section.week),
                        day: String(section.day),
                      }}
                      className="group flex items-center gap-4 bg-card hover:bg-muted/50 p-5 border border-border hover:border-primary/30 rounded-2xl transition-all"
                    >
                      <div className="flex justify-center items-center bg-muted group-hover:bg-primary/10 rounded-xl w-12 h-12 font-bold text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                        {section.section_number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground text-sm truncate">
                          {section.description}
                        </p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        {formatWeekDay(section.week, section.day)}
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
