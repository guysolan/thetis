import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Calendar,
  Heart,
  HelpCircle,
  Hourglass,
  Stethoscope,
} from "lucide-react";

/** Lucide icon for learn-hub FAQ cards, keyed by English FAQ slug prefix. */
const iconByFaqSlug: Record<string, LucideIcon> = {
  "FAQs/achilles-rupture-timeline": Calendar,
  "FAQs/achilles-tear-treatment": Activity,
  "FAQs/is-my-achilles-ruptured": Stethoscope,
  "FAQs/torn-achilles-recovery": Hourglass,
  "FAQs/what-happens-if-my-achilles-is-ruptured": HelpCircle,
  "FAQs/life-after-achilles-rupture": Heart,
};

export function getLearnFaqCardIcon(slug: string): LucideIcon {
  return iconByFaqSlug[slug] ?? HelpCircle;
}
