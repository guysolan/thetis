import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Lock,
  Mail,
} from "lucide-react";
import { EmailSignupDialog } from "@/components/EmailSignupDialog";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { useEnrollment } from "@/hooks/use-enrollment";
import { supabase } from "@/lib/supabase";
import { Card } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@thetis/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { sections as achillesSections } from "@/content/course/achilles-rupture/sections";
import { sections as pfSections } from "@/content/course/plantar-fasciitis/sections";
import { WEBSITE_URL } from "@/lib/env";
import { cn } from "@/lib/utils";
import type { SectionMetadata } from "@/content/course/sections";
import type { CourseType } from "@/hooks/use-enrollment";

function CourseProgressChart({ percentage }: { percentage: number }) {
  const data = [
    { name: "completed", value: percentage, fill: "hsl(var(--primary))" },
    { name: "remaining", value: 100 - percentage, fill: "hsl(var(--muted))" },
  ];

  return (
    <div className="relative w-[50px] h-[50px] shrink-0">
      <ChartContainer
        config={{
          completed: {
            label: "Completed",
            color: "hsl(var(--primary))",
          },
          remaining: {
            label: "Remaining",
            color: "hsl(var(--muted))",
          },
        }}
        className="w-[50px] h-[50px]"
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={18}
            outerRadius={25}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="top-1/2 left-1/2 absolute flex flex-col justify-center items-center -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <span className="font-bold text-primary text-sm">{percentage}%</span>
      </div>
    </div>
  );
}

function CourseCard({
  title,
  description,
  badge,
  features,
  link,
  ctaText,
  icon,
  courseType,
  courseSections,
  forceLocked = false,
  lockedLabel = "Coming Soon",
}: {
  title: string;
  description: string;
  badge: string;
  features: string[];
  link: string;
  ctaText: string;
  icon: React.ReactNode;
  courseType: CourseType;
  courseSections: SectionMetadata[];
  forceLocked?: boolean;
  lockedLabel?: string;
}) {
  const { email } = useSimpleAuth();
  const { hasAccess } = useEnrollment();
  const { getCompletionPercentage, isLessonComplete } = useCourseProgress();

  const unlocked = !forceLocked && (email ? hasAccess(courseType) : false);
  const completionPercentage = unlocked
    ? getCompletionPercentage(courseSections.map((s) => s.slug))
    : 0;

  const nextLesson = unlocked
    ? courseSections.find((s) => {
      if (!s.slug || typeof s.slug !== "string") return false;
      return !isLessonComplete(s.slug);
    })
    : null;

  let displayCtaText = ctaText;
  if (unlocked) {
    if (nextLesson) {
      displayCtaText = "Continue Learning";
    } else if (completionPercentage === 100) {
      displayCtaText = "Review Course";
    } else {
      displayCtaText = `Start Course`;
    }
  }

  const styles = {
    border: "border-primary/30 dark:border-primary/40",
    bg: "bg-white dark:bg-neutral-800",
    hoverBorder: "hover:border-primary/60 dark:hover:border-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeBg: "bg-neutral-100 dark:bg-neutral-700",
    badgeColor: "text-neutral-600 dark:text-neutral-300",
    checkColor: "text-primary",
  };

  return (
    <Card
      className={cn(
        "group relative flex flex-col p-6 md:p-8 border-2 rounded-2xl h-full transition-all duration-300",
        styles.border,
        styles.bg,
        unlocked && styles.hoverBorder,
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <div
            className={cn(
              "flex justify-center items-center rounded-xl w-14 h-14 shrink-0",
              styles.iconBg,
            )}
          >
            <div className={cn("w-7 h-7", styles.iconColor)}>{icon}</div>
          </div>
        )}
        <div className="flex-1">
          {badge && (
            <span
              className={cn(
                "inline-block mb-1 px-2 py-0.5 rounded font-semibold text-xs uppercase tracking-wide",
                styles.badgeBg,
                styles.badgeColor,
              )}
            >
              {badge}
            </span>
          )}
          <h3 className="font-semibold text-foreground group-hover:text-primary text-xl transition-colors">
            {title}
          </h3>
        </div>
        {unlocked
          ? <CourseProgressChart percentage={completionPercentage} />
          : (
            <div className="flex justify-center items-center w-[50px] h-[50px] shrink-0">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
      </div>

      <p className="mb-6 text-muted-foreground text-sm">{description}</p>

      <ul className="flex-grow space-y-3 mb-6">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-foreground text-sm"
          >
            <div
              className={cn(
                "flex justify-center items-center mt-0.5 rounded-full w-5 h-5 shrink-0",
                styles.iconBg,
              )}
            >
              <CheckCircle2 className={cn("w-3 h-3", styles.checkColor)} />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {unlocked
        ? (
          <Link to={link}>
            <Button className="w-full" variant="outline">
              {displayCtaText}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        )
        : (
          forceLocked
            ? (
              <Button className="w-full" variant="outline" disabled>
                {lockedLabel}
                <Lock className="ml-2 w-4 h-4" />
              </Button>
            )
            : (
              <Link to="/claim" search={{ email: "", order: "" }}>
                <Button className="w-full" variant="outline">
                  {email ? "Claim Your Course" : "Sign In to Access"}
                  <Lock className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )
        )}
    </Card>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { email, loading: authLoading } = useSimpleAuth();
  const { enrollments, hasAccess, loading: enrollmentLoading } =
    useEnrollment();
  const { getCompletionPercentage, isLessonComplete } = useCourseProgress();

  return (
    <div className="min-h-screen">
      <div className="color-gradient-hero">
        <div className="mx-auto px-4 sm:px-6 py-16 md:py-24 max-w-5xl">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 mb-6 px-4 py-1.5 rounded-full font-medium text-primary text-sm uppercase tracking-wide">
              <BookOpen className="w-4 h-4" />
              Recovery Programs
            </div>
            {email && enrollments.length > 0
              ? (
                <>
                  <h1 className="mb-6 font-bold text-foreground text-4xl md:text-6xl tracking-tight">
                    Welcome back
                    {`, ${
                      email.split("@")[0].charAt(0).toUpperCase() +
                      email.split("@")[0].slice(1)
                    }`}
                  </h1>
                  <p className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl">
                    Continue your recovery journey
                  </p>
                </>
              )
              : (
                <>
                  <h1 className="mb-6 font-bold text-foreground text-4xl md:text-6xl tracking-tight">
                    Simplify your <span className="text-primary">Recovery</span>
                  </h1>
                  <p className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl">
                    Expert-written courses to guide you through recovery — step
                    by step, at your own pace.
                  </p>
                </>
              )}
          </div>

          <div className="gap-8 grid md:grid-cols-2 mx-auto max-w-4xl">
            <CourseCard
              title="Achilles Rupture"
              description={`${achillesSections.length} lessons covering your complete journey from injury to return to sport.`}
              badge="POPULAR"
              features={[
                "Questions for your surgeon",
                "Physio exercises with illustrations",
                "Product recommendations",
                "Boot comparison guide",
              ]}
              link="/standard"
              ctaText="Start Course"
              icon={<BookOpen className="w-full h-full" />}
              courseType="standard"
              courseSections={achillesSections}
            />
            <CourseCard
              title="Plantar Fasciitis"
              description={`${pfSections.length} lessons on understanding and managing plantar fasciitis and Achilles tendinitis.`}
              badge="NEW"
              features={[
                "Three-level treatment approach",
                "Slant board stretching programme",
                "Evidence-based treatment options",
                "When to consider surgery",
              ]}
              link="/plantar-fasciitis"
              ctaText="Start Course"
              icon={<GraduationCap className="w-full h-full" />}
              courseType="plantar-fasciitis"
              courseSections={pfSections}
            />
            <CourseCard
              title="Achilles Tendinitis"
              description="Targeted course for mid-portion Achilles tendinopathy recovery. Content is being prepared."
              badge="COMING SOON"
              features={[
                "Pain monitoring and load management",
                "Progressive strengthening roadmap",
                "Return-to-activity guidance",
                "Evidence-based treatment options",
              ]}
              link="/"
              ctaText="Coming Soon"
              icon={<Activity className="w-full h-full" />}
              courseType="plantar-fasciitis"
              courseSections={[]}
              forceLocked
              lockedLabel="Coming Soon"
            />
            <CourseCard
              title="Insertional Achilles Tendinitis"
              description="Dedicated insertional protocol with heel-friendly loading progressions. Content is being prepared."
              badge="COMING SOON"
              features={[
                "Insertional-specific exercise adaptations",
                "Heel compression and footwear guidance",
                "Staged loading progression",
                "When to escalate treatment",
              ]}
              link="/"
              ctaText="Coming Soon"
              icon={<Activity className="w-full h-full" />}
              courseType="plantar-fasciitis"
              courseSections={[]}
              forceLocked
              lockedLabel="Coming Soon"
            />
          </div>
        </div>
      </div>

      <div className="bg-muted/30 border-border border-t">
        <div className="mx-auto px-4 sm:px-6 py-16 max-w-5xl">
          <div className="flex md:flex-row flex-col items-center gap-8 bg-card p-8 border border-border rounded-2xl">
            <div className="flex justify-center items-center bg-primary/10 dark:bg-primary/20 rounded-xl w-16 h-16 shrink-0">
              <Mail className="w-8 h-8 text-primary dark:text-primary/80" />
            </div>
            <div className="flex-1 md:text-left text-center">
              <span className="inline-block bg-primary/10 dark:bg-primary/20 mb-2 px-2 py-0.5 rounded font-semibold text-primary dark:text-primary/80 text-xs">
                FREE
              </span>
              <h3 className="mb-2 font-semibold text-foreground text-xl">
                Not ready to commit? Start with free emails
              </h3>
              <p className="text-muted-foreground">
                Personalized recovery guidance timed to your injury date. The
                right information arrives exactly when you need it.
              </p>
            </div>
            <EmailSignupDialog
              triggerText="Get Free Emails"
              supabaseClient={supabase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
