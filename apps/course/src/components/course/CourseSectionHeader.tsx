import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface CourseSectionHeaderProps {
  backTo: string;
  backLabel: string;
  rightAction?: ReactNode;
}

export function CourseSectionHeader({
  backTo,
  backLabel,
  rightAction,
}: CourseSectionHeaderProps) {
  return (
    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-12">
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
}
