import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Actions, filters, search, layout toggle – shown top right */
  children?: ReactNode;
}

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 min-h-9">
      <div className="min-w-0">
        <h1 className="text-lg font-semibold tracking-tight truncate">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end [&_button]:h-8 [&_button]:text-sm [&_button]:px-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
