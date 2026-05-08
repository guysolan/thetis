import Logo from "@/components/icons/Logo.tsx";
import type { Lang } from "@/config/languages.ts";
import { languages } from "@/config/languages.ts";

interface ThetisProps {
  lang?: Lang;
}

const Thetis = ({ lang }: ThetisProps) => {
  // Detect current language from URL if lang prop is not provided
  let currentLanguage = languages[0]; // default to English

  if (lang) {
    // Use provided lang prop
    currentLanguage = languages.find((l) => l.code === lang) || languages[0];
  } else {
    // Detect from URL
    const pathname = typeof window !== "undefined"
      ? window.location.pathname
      : "";
    const segments = pathname.replace(/^\//, "").split("/");
    const possibleLangCode = segments[0];
    const detectedLang = languages.find((lang) =>
      lang.code === possibleLangCode
    );
    if (detectedLang) {
      currentLanguage = detectedLang;
    }
  }

  // Generate the home URL for the current language
  const homeUrl = currentLanguage.code === "en" ? "/" : currentLanguage.dir;

  return (
    <a
      className="flex flex-nowrap justify-start items-center gap-x-2 hover:bg-neutral-900/[0.05] dark:hover:bg-white/[0.08] -ml-2 py-1.5 pr-2 pl-2 rounded-lg min-w-0 min-h-9 font-semibold text-neutral-900 lg:text-[1.05rem] dark:text-neutral-50 text-base tracking-tight transition-colors"
      href={homeUrl}
    >
      <Logo className="dark:fill-white w-8 h-8" />
      <span className="dark:text-white max-lg:truncate text-nowrap">
        Thetis Medical<sup className="scale-60 translate-y-6">&reg;</sup>
      </span>
    </a>
  );
};

export default Thetis;
