export interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
    dir: string;
    hreflang: string;
}

export const languages: Language[] = [
    {
        code: "en",
        name: "English",
        nativeName: "English",
        flag: "🇺🇸",
        dir: "/",
        hreflang: "en",
    },
    {
        code: "de",
        name: "German",
        nativeName: "Deutsch",
        flag: "🇩🇪",
        dir: "/de",
        hreflang: "de",
    },
    {
        code: "fr",
        name: "French",
        nativeName: "Français",
        flag: "🇫🇷",
        dir: "/fr",
        hreflang: "fr",
    },
    {
        code: "es",
        name: "Spanish",
        nativeName: "Español",
        flag: "🇪🇸",
        dir: "/es",
        hreflang: "es",
    },
];

export function getLanguageByCode(code: string): Language | undefined {
    return languages.find((lang) => lang.code === code);
}

export function getLanguageByPath(path: string): Language | undefined {
    return languages.find((lang) => path.startsWith(lang.dir));
}

export function getAlternateLanguages(
    currentPath: string,
    currentLang: string,
) {
    const basePath = currentPath.replace(/^\/[a-z]{2}/, "") || "/";

    return languages
        .filter((lang) => lang.code !== currentLang)
        .map((lang) => ({
            lang: lang.hreflang,
            url: `${lang.dir}${basePath === "/" ? "" : basePath}`,
        }));
}
