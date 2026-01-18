import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import type { SectionMetadata } from "@/content/course/sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@thetis/ui/accordion";
import { useEffect, useRef } from "react";

interface CourseProgressTrackerProps {
  currentSectionNumber: number;
  totalSections: number;
  completedCount: number;
  completionPercentage: number;
  sections: SectionMetadata[];
  isSectionComplete: (slug: string) => boolean;
  className?: string;
}

export function CourseProgressTracker({
  currentSectionNumber,
  totalSections,
  completedCount,
  completionPercentage,
  sections,
  isSectionComplete,
  className,
}: CourseProgressTrackerProps) {
  const navigate = useNavigate();
  const currentSectionRef = useRef<HTMLButtonElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  // Scroll current lesson to top on large screens when appropriate
  useEffect(() => {
    // Only on large screens
    if (window.innerWidth < 1024) return;

    const currentButton = currentSectionRef.current;
    const container = stepsContainerRef.current;

    if (!currentButton || !container) return;

    // Find the scrollable parent (the one with overflow-y-auto)
    let scrollableParent: HTMLElement | null = container.parentElement;
    while (scrollableParent) {
      const styles = window.getComputedStyle(scrollableParent);
      if (styles.overflowY === "auto" || styles.overflowY === "scroll") {
        break;
      }
      scrollableParent = scrollableParent.parentElement;
    }

    if (!scrollableParent) return;

    // Calculate the button's position relative to the scrollable container
    const containerRect = scrollableParent.getBoundingClientRect();
    const buttonRect = currentButton.getBoundingClientRect();
    const relativeTop = buttonRect.top - containerRect.top;
    const currentScrollTop = scrollableParent.scrollTop;

    // Calculate the button's absolute position within the container's content
    const buttonAbsoluteTop = currentScrollTop + relativeTop;

    // Only scroll if current section is below the top third of the visible area
    if (relativeTop > containerRect.height * 0.33) {
      // Scroll the button to the top of the scrollable container
      scrollableParent.scrollTo({
        top: buttonAbsoluteTop,
        behavior: "smooth",
      });
    }
  }, [currentSectionNumber]);

  const stepsList = (
    <div ref={stepsContainerRef} className="flex flex-col gap-2">
      {sections.map((section, index) => {
        const sectionNumber = index + 1;
        const isCompleted = isSectionComplete(section.slug);
        const isCurrent = sectionNumber === currentSectionNumber;
        const isUpcoming = !isCompleted && !isCurrent;

        return (
          <button
            key={sectionNumber}
            ref={isCurrent ? currentSectionRef : null}
            type="button"
            onClick={() => {
              navigate({
                to: "/standard/$slug",
                params: {
                  slug: section.slug,
                },
              });
            }}
            className={cn(
              "group flex items-start gap-3 p-2 rounded-lg transition-all",
              "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              isCurrent && "bg-primary/10",
            )}
          >
            {/* Step Indicator */}
            <div className="flex items-center pt-0.5 shrink-0">
              <div
                className={cn(
                  "flex justify-center items-center rounded-full w-6 h-6 font-semibold text-xs transition-all",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && !isCompleted &&
                    "bg-primary/20 text-primary border-2 border-primary",
                  isUpcoming &&
                    "bg-muted text-muted-foreground border-2 border-border",
                )}
              >
                {isCompleted
                  ? <CheckCircle2 className="w-4 h-4" />
                  : <span>{sectionNumber}</span>}
              </div>
            </div>

            {/* Section Label */}
            <div className="flex-1 pt-0.5 min-w-0 text-left">
              <div
                className={cn(
                  "font-medium text-sm leading-tight transition-colors",
                  isCurrent && "text-primary font-semibold",
                  isCompleted && !isCurrent && "text-foreground",
                  isUpcoming && "text-muted-foreground",
                )}
              >
                {section.title}
              </div>
              {isCurrent && (
                <div className="mt-0.5 text-muted-foreground text-xs">
                  Current lesson
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {/* Vertical Progress Stepper */}
      {/* Desktop: Always visible */}
      <div className="hidden lg:block">
        {stepsList}
      </div>

      {/* Mobile: Accordion wrapper */}
      <div className="lg:hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="steps" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="font-medium text-sm">See steps</span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              {stepsList}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Progress Summary */}
      <div className="pt-4 border-border border-t">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-foreground text-sm">
            Progress
          </span>
          <span className="font-semibold text-primary text-sm">
            {completionPercentage}%
          </span>
        </div>
        <div className="bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="mt-2 text-muted-foreground text-xs">
          {completedCount} of {totalSections} lessons completed
        </p>
      </div>
    </div>
  );
}
