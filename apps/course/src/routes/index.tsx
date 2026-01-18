import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import {
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
import { Card } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@thetis/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { sections } from "@/content/course/sections";
import { WEBSITE_URL } from "@/lib/env";
import { cn } from "@/lib/utils";

function CourseProgressChart({
  percentage,
}: {
  percentage: number;
}) {
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
  variant,
  badge,
  features,
  link,
  ctaText,
  icon,
  showRibbon,
  ribbonText,
  courseType,
}: {
  title: string;
  description: string;
  variant: "standard" | "premium";
  badge: string;
  features: string[];
  link: string;
  ctaText: string;
  icon: React.ReactNode;
  showRibbon?: boolean;
  ribbonText?: string;
  courseType: "standard" | "premium";
}) {
  const { email } = useSimpleAuth();
  const { hasAccess } = useEnrollment();
  const { getCompletionPercentage, isLessonComplete } = useCourseProgress();

  // Check if user has access to this course
  const unlocked = email ? hasAccess(courseType) : false;

  // Get sections for this course type
  const courseSections = sections.filter(
    (s) => s.course_type === courseType,
  );
  const completionPercentage = unlocked
    ? getCompletionPercentage(courseSections.length)
    : 0;

  // Get next incomplete lesson for enrolled users (only for standard course)
  const nextLesson = unlocked && courseType === "standard"
    ? courseSections.find((s) => {
      if (!s.slug || typeof s.slug !== "string") {
        console.warn("Section missing valid slug:", s);
        return false;
      }
      return !isLessonComplete(s.slug);
    })
    : null;

  // Debug: log nextLesson if it exists
  if (nextLesson && process.env.NODE_ENV === "development") {
    console.log("Next lesson:", nextLesson);
  }

  // Determine CTA text based on enrollment status
  let displayCtaText = ctaText;
  if (unlocked) {
    if (nextLesson) {
      displayCtaText = "Continue Learning";
    } else if (completionPercentage === 100) {
      displayCtaText = "Review Course";
    } else {
      displayCtaText = `Start ${title} Course`;
    }
  }

  const variantStyles = {
    standard: {
      border: "border-primary/30 dark:border-primary/40",
      bg: "bg-white dark:bg-neutral-800",
      hoverBorder: "hover:border-primary/60 dark:hover:border-primary",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      badgeBg: "bg-neutral-100 dark:bg-neutral-700",
      badgeColor: "text-neutral-600 dark:text-neutral-300",
      checkColor: "text-primary",
    },
    premium: {
      border: "border-primary/30 dark:border-primary/40",
      bg: "bg-white dark:bg-neutral-800",
      hoverBorder: "hover:border-primary/60 dark:hover:border-primary",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      badgeBg: "bg-neutral-100 dark:bg-neutral-700",
      badgeColor: "text-neutral-600 dark:text-neutral-300",
      checkColor: "text-primary",
    },
  };

  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        "group relative flex flex-col p-6 md:p-8 border-2 rounded-2xl h-full transition-all duration-300",
        styles.border,
        styles.bg,
        unlocked && styles.hoverBorder,
      )}
    >
      {/* Ribbon for premium tier */}
      {showRibbon && (
        <div className="top-0 right-4 absolute bg-primary px-3 py-1 rounded-b-lg font-semibold text-white text-xs">
          {ribbonText}
        </div>
      )}

      {/* Header with icon and badge */}
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

      {/* Description */}
      <p className="mb-6 text-muted-foreground text-sm">{description}</p>

      {/* Features list */}
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

      {/* CTA */}
      {unlocked
        ? (
          nextLesson && nextLesson.slug && typeof nextLesson.slug === "string"
            ? (
              // @ts-ignore - Premium route exists but we only use standard here
              <Link
                to="/standard/$slug"
                params={{ slug: nextLesson.slug }}
              >
                <Button
                  className="w-full"
                  variant="outline"
                >
                  {displayCtaText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )
            : (
              <Link to={link}>
                <Button
                  className="w-full"
                  variant="outline"
                >
                  {displayCtaText}
                </Button>
              </Link>
            )
        )
        : (
          <Link to="/claim" search={{ email: "", order: "" }}>
            <Button
              className="w-full"
              variant="outline"
            >
              {email ? "Claim Your Course" : "Sign In to Access"}
              <Lock className="ml-2 w-4 h-4" />
            </Button>
          </Link>
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

  // Show landing page for everyone, but customize for enrolled users
  return (
    <div className="min-h-screen">
      {/* Hero with gradient background */}
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
                    Welcome back{email
                      ? `, ${
                        email.split("@")[0].charAt(0).toUpperCase() +
                        email.split("@")[0].slice(1)
                      }`
                      : ""}
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
                    Choose the program that best fits your journey back to life,
                    work, and sport after an Achilles rupture.
                  </p>
                </>
              )}
          </div>

          {/* Course Card */}
          <div className="flex justify-center mx-auto max-w-4xl">
            <CourseCard
              title="Standard"
              description="31 easily digestible lessons to guide you through each stage of recovery."
              variant="standard"
              badge="POPULAR"
              features={[
                "Questions for your surgeon",
                "Physio exercises with illustrations",
                "Product recommendations",
                "Boot comparison guide",
              ]}
              link="/standard"
              ctaText="Start Standard Course"
              icon={<BookOpen className="w-full h-full" />}
              courseType="standard"
            />
          </div>
        </div>
      </div>

      {/* Free Email Course Section */}
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
            <EmailSignupDialog triggerText="Get Free Emails" />
          </div>
        </div>
      </div>
    </div>
  );
}
