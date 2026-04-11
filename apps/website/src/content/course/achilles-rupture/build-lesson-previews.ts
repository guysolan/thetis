import {
  Footprints,
  Heart,
  type LucideIcon,
  Stethoscope,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { AchillesRuptureCourseCopy } from "./translations";

export interface LessonPreviewPhase {
  phase: string;
  weeks: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  lessons: string[];
}

export function buildAchillesRuptureLessonPreviews(
  t: AchillesRuptureCourseCopy,
): LessonPreviewPhase[] {
  return [
    {
      phase: t.lessonPreviews.phase1.phase,
      weeks: t.lessonPreviews.phase1.weeks,
      icon: Stethoscope,
      color: "from-primary to-primary/70",
      bgColor: "bg-primary/5 dark:bg-primary/10",
      borderColor: "border-primary/20 dark:border-primary/30",
      lessons: t.lessonPreviews.lessons1,
    },
    {
      phase: t.lessonPreviews.phase2.phase,
      weeks: t.lessonPreviews.phase2.weeks,
      icon: Footprints,
      color: "from-primary/90 to-primary/60",
      bgColor: "bg-primary/8 dark:bg-primary/12",
      borderColor: "border-primary/25 dark:border-primary/35",
      lessons: t.lessonPreviews.lessons2,
    },
    {
      phase: t.lessonPreviews.phase3.phase,
      weeks: t.lessonPreviews.phase3.weeks,
      icon: TrendingUp,
      color: "from-primary/80 to-primary/50",
      bgColor: "bg-primary/10 dark:bg-primary/15",
      borderColor: "border-primary/30 dark:border-primary/40",
      lessons: t.lessonPreviews.lessons3,
    },
    {
      phase: t.lessonPreviews.phase4.phase,
      weeks: t.lessonPreviews.phase4.weeks,
      icon: Zap,
      color: "from-primary/70 to-primary/40",
      bgColor: "bg-primary/12 dark:bg-primary/18",
      borderColor: "border-primary/35 dark:border-primary/45",
      lessons: t.lessonPreviews.lessons4,
    },
    {
      phase: t.lessonPreviews.phase5.phase,
      weeks: t.lessonPreviews.phase5.weeks,
      icon: Heart,
      color: "from-primary to-primary/80",
      bgColor: "bg-primary/5 dark:bg-primary/10",
      borderColor: "border-primary/20 dark:border-primary/30",
      lessons: t.lessonPreviews.lessons5,
    },
  ];
}
