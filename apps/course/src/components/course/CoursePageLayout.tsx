import { ReactNode } from "react";

interface CoursePageLayoutProps {
    children: ReactNode;
}

export function CoursePageLayout({ children }: CoursePageLayoutProps) {
    return (
        <div className="bg-background min-h-screen">
            <div className="mx-auto px-4 sm:px-6 py-16 max-w-4xl">
                {children}
            </div>
        </div>
    );
}
