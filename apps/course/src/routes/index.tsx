import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Mail } from "lucide-react";
import { PricingCard } from "@thetis/ui/pricing-card";
import { EmailSignupDialog } from "@/components/EmailSignupDialog";
import { ShopifyCourseBuyButton } from "@/components/ShopifyCourseBuyButton";
import { useCoursePrice } from "@/hooks/use-course-price";
import { SHOPIFY_PRODUCTS } from "@/lib/shopify";

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
  productId,
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
  courseType: "essentials" | "professionals";
  productId: string;
}) {
  const { formattedPrice, isLoading } = useCoursePrice(courseType);

  return (
    <div className="flex flex-col h-full">
      <Link to={link} className="flex-1">
        <PricingCard
          title={title}
          description={description}
          price={formattedPrice ||
            (courseType === "essentials" ? "£29.99" : "£79.99")}
          priceSuffix="one-time"
          variant={variant}
          badge={badge}
          features={features}
          ctaText={ctaText}
          icon={icon}
          showRibbon={showRibbon}
          ribbonText={ribbonText}
          className="h-full"
        />
      </Link>
      <div className="mt-6" onClick={(e) => e.stopPropagation()}>
        <ShopifyCourseBuyButton
          productId={productId}
          buttonText={`Buy ${title} Course`}
          showPrice={false}
          className="w-full"
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
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
            <h1 className="mb-6 font-bold text-foreground text-4xl md:text-6xl tracking-tight">
              Simplify your <span className="text-primary">Recovery</span>
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl">
              Choose the program that best fits your journey back to life, work,
              and sport after an Achilles rupture.
            </p>
          </div>

          {/* Course Cards */}
          <div className="gap-8 grid md:grid-cols-2 mx-auto max-w-4xl">
            <CourseCard
              title="Essentials"
              description="31 easily digestible lessons to guide you through each stage of recovery."
              variant="standard"
              badge="POPULAR"
              features={[
                "Questions for your surgeon",
                "Physio exercises with illustrations",
                "Product recommendations",
                "Boot comparison guide",
              ]}
              link="/essentials"
              ctaText="Start Essentials"
              icon={<BookOpen className="w-full h-full" />}
              courseType="essentials"
              productId={SHOPIFY_PRODUCTS.ESSENTIALS_COURSE}
            />
            <CourseCard
              title="Professional"
              description="Advanced recovery strategies and expert-led video lessons for elite results."
              variant="premium"
              badge="PREMIUM"
              showRibbon={true}
              ribbonText="BEST VALUE"
              features={[
                "Everything in Essentials",
                "Specialist surgeon video lessons",
                "8 recovery hacks from elite athletes",
                "Return-to-sport protocols",
                "Priority expert support",
              ]}
              link="/professionals"
              ctaText="Go Professional"
              icon={<GraduationCap className="w-full h-full" />}
              courseType="professionals"
              productId={SHOPIFY_PRODUCTS.PROFESSIONALS_COURSE}
            />
          </div>
        </div>
      </div>

      {/* Free Email Course Section */}
      <div className="bg-muted/30 border-border border-t">
        <div className="mx-auto px-4 sm:px-6 py-16 max-w-5xl">
          <div className="flex md:flex-row flex-col items-center gap-8 bg-card p-8 border border-border rounded-2xl">
            <div className="flex justify-center items-center bg-green-100 dark:bg-green-900 rounded-xl w-16 h-16 shrink-0">
              <Mail className="w-8 h-8 text-green-700 dark:text-green-300" />
            </div>
            <div className="flex-1 md:text-left text-center">
              <span className="inline-block bg-green-100 dark:bg-green-900 mb-2 px-2 py-0.5 rounded font-semibold text-green-700 dark:text-green-300 text-xs">
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
              triggerClassName="bg-green-600 hover:bg-green-700 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
