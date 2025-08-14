# Multilingual Routing System

This document explains the comprehensive multilingual routing system implemented for the Thetis Medical website.

## Overview

The system provides a centralized way to manage routes across multiple languages, enabling seamless language switching while maintaining SEO best practices.

## Key Features

- **Centralized Route Definition**: All routes are defined in `src/content/routes.ts`
- **Automatic Language Detection**: Language is detected from URL path
- **Language Switching**: Users can switch languages while staying on the same page
- **SEO Optimization**: Automatic hreflang generation and canonical URLs
- **Component Internationalization**: Components can accept language props

## Directory Structure

```
src/
├── content/
│   ├── routes.ts           # Centralized route definitions with multilingual support
│   ├── pages.tsx           # Legacy file (for backward compatibility)
│   └── articles.tsx        # Legacy file (for backward compatibility)
├── config/
│   └── languages.ts        # Language configuration
├── utils/
│   ├── language.ts         # Language utilities and helpers
│   └── staticPaths.ts      # Static path generation utilities
├── components/
│   ├── LanguageSwitcher.astro      # Updated language switcher
│   ├── MultilingualFAQs.tsx        # Multilingual FAQ component
│   └── contact/
│       └── FormLinks.astro          # Updated form links
└── pages/
    ├── index.astro         # English homepage (updated)
    ├── de/
    │   ├── index.astro     # German homepage
    │   ├── contact.astro   # German contact page
    │   └── FAQs/
    │       └── achilles-rupture-timeline.astro  # German FAQ page
    └── sitemap.astro       # Updated sitemap
```

## Route Definition System

### Base Routes (`src/content/routes.ts`)

Routes are defined as `BaseRoute` objects containing multilingual content:

```typescript
export interface BaseRoute {
  slug: string; // Base slug without language prefix
  title: Record<string, string>; // Titles for each language
  description: Record<string, string>; // Descriptions for each language
  icon?: React.ReactNode;
  variant?: "default" | "outline";
  image?: ImageMetadata;
  tags?: Array<{ words: string; color: string }>;
}
```

Example:
```typescript
{
  slug: "contact",
  title: {
    en: "Contact Us",
    de: "Kontaktieren Sie uns",
    fr: "Contactez-nous",
    es: "Contáctanos",
  },
  description: {
    en: "Contact us for more information.",
    de: "Kontaktieren Sie uns für weitere Informationen.",
    fr: "Contactez-nous pour plus d'informations.",
    es: "Contáctenos para más información.",
  },
  icon: <Mail size={20} />,
  variant: "default",
}
```

### Route Categories

Routes are organized into logical categories:
- `mainPageRoutes`: Core website pages
- `productRoutes`: Product-related pages
- `partnerRoutes`: Partner and professional pages
- `contactRoutes`: Contact and support pages
- `videoRoutes`: Video content pages
- `articleRoutes`: FAQ and educational content
- `legalRoutes`: Legal and policy pages

## Language Configuration

Languages are configured in `src/config/languages.ts`:

```typescript
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
  // Add more languages as needed
];
```

## URL Structure

The system follows this URL pattern:

- **English (default)**: `example.com/contact`
- **German**: `example.com/de/contact`
- **French**: `example.com/fr/contact`
- **Spanish**: `example.com/es/contact`

For nested routes:
- **English**: `example.com/FAQs/achilles-rupture-timeline`
- **German**: `example.com/de/FAQs/achilles-rupture-timeline`

## Core Functions

### Language Utilities (`src/utils/language.ts`)

Key functions available:

```typescript
// Extract language code from path
getLanguageFromPath(path: string): string

// Extract slug from path (remove language prefix)
getSlugFromPath(path: string): string

// Generate localized path
generateLocalizedPath(slug: string, langCode: string): string

// Get localized route information
getLocalizedRoute(slug: string, langCode: string): Route

// Language switching utilities
urlUtils.switchLanguage(currentPath: string, targetLangCode: string): string
urlUtils.getLanguageSwitcherOptions(currentPath: string): LanguageOption[]

// SEO helpers
generateHreflangLinks(slug: string, baseUrl?: string): HreflangLink[]
getCanonicalUrl(slug: string, langCode: string, baseUrl?: string): string
```

### Route Generation (`src/content/routes.ts`)

```typescript
// Generate all routes for all languages
generateAllRoutes(): Route[]

// Get routes for specific language
getRoutesByLanguage(langCode: string): Route[]

// Get specific route
getRouteBySlugAndLanguage(slug: string, langCode: string): Route

// Get alternate language routes
getAlternateRoutesForSlug(slug: string, currentLangCode: string): AlternateRoute[]
```

## Usage Examples

### In Astro Pages

```astro
---
import Layout from "@/layouts/Layout.astro";
import { getCurrentLanguage, getLocalizedRoute } from "../utils/language";

const currentPath = Astro.url.pathname;
const currentLang = getCurrentLanguage(currentPath);
const pageRoute = getLocalizedRoute("contact", currentLang.code);

const title = pageRoute?.title || "Contact Us";
const description = pageRoute?.description || "Contact us for more information.";
---

<Layout
  title={title}
  description={description}
  slug="contact"
  lang={currentLang.code}
>
  <!-- Page content -->
</Layout>
```

### In React Components

```tsx
import { getRoutesByLanguage } from "../content/routes";

interface Props {
  lang?: string;
}

const MyComponent: React.FC<Props> = ({ lang = "en" }) => {
  const routes = getRoutesByLanguage(lang);
  const contactRoute = routes.find(r => r.slug === "contact");
  
  return (
    <a href={contactRoute?.href}>
      {contactRoute?.title}
    </a>
  );
};
```

### Language Switcher

The `LanguageSwitcher` component automatically:
- Detects current language and page
- Generates correct URLs for all languages
- Maintains the same page across language switches

```astro
<LanguageSwitcher />
```

## SEO Features

### Automatic Hreflang Generation

The Layout component automatically generates hreflang links:

```astro
<Layout
  title={title}
  description={description}
  slug="contact"  <!-- Provide slug for automatic hreflang -->
  lang={currentLang.code}
>
```

### Canonical URLs

Canonical URLs are automatically generated for each page in each language.

### Sitemap Integration

The `astro.config.mjs` now uses the route system to generate multilingual sitemaps:

```javascript
import { generateAllRoutes } from "./src/content/routes";

const allRoutes = generateAllRoutes();
const allPages = allRoutes.map((route) => `${url}${route.href}`);
```

## Adding New Languages

1. **Add language to config**:
```typescript
// src/config/languages.ts
{
  code: "fr",
  name: "French", 
  nativeName: "Français",
  flag: "🇫🇷",
  dir: "/fr",
  hreflang: "fr",
}
```

2. **Add translations to routes**:
```typescript
// src/content/routes.ts
{
  slug: "contact",
  title: {
    en: "Contact Us",
    de: "Kontaktieren Sie uns",
    fr: "Contactez-nous", // Add French translation
  },
  // ...
}
```

3. **Create language-specific pages** (optional):
```
src/pages/fr/
├── index.astro
├── contact.astro
└── FAQs/
    └── achilles-rupture-timeline.astro
```

## Adding New Routes

1. **Define the base route**:
```typescript
// src/content/routes.ts
const newRoute: BaseRoute = {
  slug: "new-page",
  title: {
    en: "New Page",
    de: "Neue Seite",
    // Add other languages
  },
  description: {
    en: "Description of the new page",
    de: "Beschreibung der neuen Seite",
    // Add other languages
  },
};
```

2. **Add to appropriate category**:
```typescript
export const mainPageRoutes: BaseRoute[] = [
  // ... existing routes
  newRoute,
];
```

3. **Create page files**:
```
src/pages/
├── new-page.astro      # English version
├── de/
│   └── new-page.astro  # German version
```

## Migration Notes

### Backward Compatibility

The system maintains backward compatibility:
- `pages` export still available (English routes only)
- `articles` export still available (English routes only)
- Existing components continue to work

### Updating Existing Components

To make existing components multilingual:

1. Add `lang` prop to component
2. Use `getRoutesByLanguage(lang)` to get routes
3. Use localized route data instead of hardcoded content

## Performance Considerations

- Routes are generated at build time
- Language detection is fast (simple path parsing)
- Components receive pre-generated route data
- No runtime language file loading required

## Best Practices

1. **Always provide fallback content** in English
2. **Use the slug prop** in Layout for automatic hreflang
3. **Test language switching** on all pages
4. **Validate translations** before deploying
5. **Keep route slugs consistent** across languages (only content changes)

## Development Workflow

1. **Define routes** in `routes.ts` with all language variants
2. **Create pages** using the route utilities
3. **Test language switching** functionality
4. **Verify SEO elements** (hreflang, canonical URLs)
5. **Update any hardcoded links** to use route system

This system provides a robust foundation for expanding the website to support multiple languages while maintaining clean, maintainable code and excellent SEO performance.