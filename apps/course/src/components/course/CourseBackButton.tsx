import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface CourseBackButtonProps {
    to: string;
    label: string;
}

export function CourseBackButton({ to, label }: CourseBackButtonProps) {
    return (
        <Link
            to={to}
            className="inline-flex items-center gap-2 mb-12 text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            {label}
        </Link>
    );
}
