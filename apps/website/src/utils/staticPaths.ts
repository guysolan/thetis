import { allBaseRoutes } from '../content/routes';
import { languages } from '../config/languages';

export function getStaticPaths() {
  const paths = [];
  
  // Generate paths for all non-English languages
  for (const language of languages) {
    if (language.code === 'en') continue; // Skip English as it's handled by default routes
    
    for (const route of allBaseRoutes) {
      // Skip empty slug for language root pages (handled separately)
      if (route.slug === '') continue;
      
      paths.push({
        params: { 
          slug: route.slug 
        },
        props: {
          lang: language.code,
          route: route
        }
      });
    }
  }
  
  return paths;
}

export function getStaticPathsForLanguage(langCode: string) {
  const paths = [];
  
  for (const route of allBaseRoutes) {
    if (route.slug === '') continue; // Skip empty slug
    
    paths.push({
      params: { 
        slug: route.slug 
      },
      props: {
        lang: langCode,
        route: route
      }
    });
  }
  
  return paths;
}