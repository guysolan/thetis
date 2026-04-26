import { useState } from "react";
import { languages } from "../config/languages";
import { getTranslatedUrlForLanguage } from "../content/routes";
import { getLanguageFromPath } from "../utils/language";
import { ChevronDown, Languages } from "lucide-react";
import { cn } from "../lib/utils";

interface LanguageSwitcherProps {
  currentPath: string;
  className?: string;
}

export function LanguageSwitcher(
  { currentPath, className }: LanguageSwitcherProps,
) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLangCode = getLanguageFromPath(currentPath);
  const currentLanguage =
    languages.find((lang) => lang.code === currentLangCode) || languages[0];

  const languageOptions = languages.map((language) => {
    const href = getTranslatedUrlForLanguage(currentPath, language.code);
    return {
      ...language,
      href,
      isActive: language.code === currentLangCode,
    };
  });

  return (
    <div className={cn("relative w-full", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 px-2.5 py-2 border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full min-w-[5.25rem] text-gray-700 dark:text-neutral-200 text-sm transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={currentLanguage.nativeName}
        aria-label={`Language: ${currentLanguage.name} (${currentLanguage.code.toUpperCase()})`}
      >
        <Languages size={16} className="opacity-80 shrink-0" aria-hidden />
        <span className="min-w-0 font-semibold tabular-nums text-left tracking-tight">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "ml-auto transition-transform shrink-0",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div className="right-0 z-50 absolute bg-white dark:bg-neutral-900 shadow-lg mt-1 border border-gray-300 dark:border-neutral-600 rounded-md w-56">
          <div className="py-1">
            {languageOptions.map((langOption) => (
              <a
                key={langOption.code}
                href={langOption.href}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2 text-sm transition-colors",
                  langOption.isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
                )}
                onClick={() => setIsOpen(false)}
              >
                <span className="w-7 font-semibold tabular-nums">
                  {langOption.code.toUpperCase()}
                </span>
                <span className="flex-1 opacity-90 min-w-0 text-xs text-left truncate">
                  {langOption.nativeName}
                </span>
                {langOption.isActive && (
                  <svg
                    className="ml-auto w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
