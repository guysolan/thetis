import { ReactNode } from "react";
import { TabsList } from "@thetis/ui/tabs";

interface TabsHeaderProps {
  tabsList: ReactNode;
}

/** Tabs only – aligned far left. Selected tab has underline + bold. Use PageHeader for title + right-side actions/filters. */
const TabsHeader = ({ tabsList }: TabsHeaderProps) => {
  return (
    <div className="mb-4 w-full">
      <TabsList
        className={[
          "flex h-10 w-full justify-start gap-0 rounded-none bg-transparent p-0 border-b border-border",
          "[&_button]:inline-flex [&_button]:h-10 [&_button]:items-center [&_button]:gap-2 [&_button]:rounded-none [&_button]:border-b-2 [&_button]:border-transparent [&_button]:bg-transparent [&_button]:px-4 [&_button]:text-sm [&_button]:font-medium [&_button]:text-muted-foreground [&_button]:shadow-none [&_button]:transition-colors",
          "[&_button:hover]:text-foreground",
          "[&_button[data-active]]:border-primary [&_button[data-active]]:text-foreground [&_button[data-active]]:font-semibold [&_button[data-active]]:bg-transparent [&_button[data-active]]:shadow-none",
        ].join(" ")}
      >
        {tabsList}
      </TabsList>
    </div>
  );
};

export default TabsHeader;