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
      className="flex flex-nowrap justify-start items-center gap-x-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md h-fit text-lg lg:text-xl"
      href={homeUrl}
    >
      <Logo className="dark:fill-white w-8 h-8" />
      <span className="dark:text-white text-nowrap">
        Thetis Medical<sup className="scale-60 translate-y-6">&reg;</sup>
      </span>
    </a>
  );
};

export default Thetis;
