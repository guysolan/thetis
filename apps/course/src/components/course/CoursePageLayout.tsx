import { ReactNode } from "react";

interface CoursePageLayoutProps {
    children: ReactNode;
}

export function CoursePageLayout({ children }: CoursePageLayoutProps) {
    return (
        <div className="bg-background">
            <div className="mx-auto px-4 sm:px-6 py-16 max-w-4xl lg:max-w-6xl">
                {children}
            </div>
        </div>
    );
}
