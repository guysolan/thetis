import { ReactNode } from "react";
import { BookOpen } from "lucide-react";

interface CourseHeaderProps {
    badge: string;
    title: string;
    description: string;
    children?: ReactNode;
}

export function CourseHeader({
    badge,
    title,
    description,
    children,
}: CourseHeaderProps) {
    return (
        <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 mb-4 px-3 py-1 rounded-full font-medium text-primary text-sm">
                <BookOpen className="w-4 h-4" />
                {badge}
            </div>
            <h1 className="mb-4 font-bold text-foreground text-3xl md:text-5xl tracking-tight">
                {title}
            </h1>
            <p className="mb-6 max-w-2xl text-muted-foreground text-lg md:text-xl">
                {description}
            </p>
            {children}
        </div>
    );
}
