import { Stethoscope, Trophy } from "lucide-react";

interface TestimonialRoleBadgeProps {
  role: "clinician" | "athlete";
  compact?: boolean;
}

export default function TestimonialRoleBadge({
  role,
  compact = false,
}: TestimonialRoleBadgeProps) {
  const isSurgeon = role === "clinician";

  return (
    <span
      className={`inline-flex items-center gap-1 shrink-0 rounded-full border font-medium ${
        compact ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]"
      } ${
        isSurgeon
          ? "border-primary/30 bg-primary/5 text-primary"
          : "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
      }`}
      title={isSurgeon ? "Surgeon testimonial" : "Athlete testimonial"}
    >
      {isSurgeon ? (
        <Stethoscope className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} aria-hidden />
      ) : (
        <Trophy className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} aria-hidden />
      )}
      {isSurgeon ? "Surgeon" : "Athlete"}
    </span>
  );
}
