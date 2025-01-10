import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import { cn } from "../../lib/utils";

export function ThemeToggle() {
  const [theme, setThemeState] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "light");
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Tabs value={theme}>
      <TabsList className="gap-2 p-2 h-fit">
        <TabsTrigger
          onClick={() => setThemeState("light")}
          value="light"
          className={cn(
            "h-8 w-8 p-0",
            theme === "light" ? "bg-neutral-200" : "",
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
