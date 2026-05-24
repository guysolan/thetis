import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  label?: string;
  className?: string;
}

export default function VerifiedBadge({
  label = "Verified",
  className = "",
}: VerifiedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 shrink-0 ${className}`}
      title={label}
    >
      <BadgeCheck
        className="w-4 h-4 text-primary fill-primary/15"
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
