import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@thetis/ui/tabs";
import { cn } from "../../lib/utils";

export function ThemeToggle() {
  const [theme, setThemeState] = React.useState<
    "theme-light" | "dark" | "system"
  >("theme-light");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: light)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <Tabs value={theme}>
      <TabsList className="gap-2 p-2 h-fit">
        <TabsTrigger
          onClick={() => setThemeState("theme-light")}
          value="theme-light"
          className={cn(
            "h-8 w-8 p-0",
            theme === "theme-light" ? "bg-neutral-200" : "",
          )}
        >
          <Sun size={20} />
          <span className="sr-only">Light</span>
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setThemeState("dark")}
          value="dark"
          className={cn(
            "h-8 w-8 p-0",
            theme === "dark" ? "bg-neutral-200" : "",
          )}
        >
          <Moon size={20} />
          <span className="sr-only">Dark</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
