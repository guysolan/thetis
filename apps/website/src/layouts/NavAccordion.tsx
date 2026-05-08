import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  getConditionHubNavRoutes,
  getConditionShopNavRoutes,
  getContactRoutesByLanguage,
  getPartnerRoutesByLanguage,
  navigationContent,
} from "@/content/routes.tsx";
import { cn } from "@/lib/utils";

import type { Lang } from "../config/languages";

interface NavAccordionProps {
  lang?: Lang;
}

const content = {
  en: {
    courses: "Courses",
    conditionsMenu: "Conditions",
    learnMenu: "Learn",
    shopMenu: "Shop",
    professionals: "Professionals",
    patientGuides: "Learning Resources",
    contactUs: "Contact Us",
    faqs: "FAQs",
    timeline: "Timeline of Recovery",
  },
  de: {
    courses: "Kurse",
    conditionsMenu: "Beschwerden",
    learnMenu: "Lernen",
    shopMenu: "Shop",
    professionals: "Fachkräfte",
    patientGuides: "Lernressourcen",
    contactUs: "Kontaktiere uns",
    faqs: "FAQs",
    timeline: "Genesungszeitplan",
  },
  fr: {
    courses: "Cours",
    conditionsMenu: "Pathologies",
    learnMenu: "Apprendre",
    shopMenu: "Boutique",
    professionals: "Professionnels",
    patientGuides: "Ressources d'Apprentissage",
    contactUs: "Contactez-nous",
    faqs: "FAQs",
    timeline: "Chronologie de Récupération",
  },
  es: {
    courses: "Cursos",
    conditionsMenu: "Condiciones",
    learnMenu: "Aprender",
    shopMenu: "Tienda",
    professionals: "Profesionales",
    patientGuides: "Recursos de Aprendizaje",
    contactUs: "Contáctenos",
    faqs: "FAQs",
    timeline: "Cronología de Recuperación",
  },
  it: {
    courses: "Corsi",
    conditionsMenu: "Patologie",
    learnMenu: "Approfondisci",
    shopMenu: "Shop",
    professionals: "Professionisti",
    patientGuides: "Risorse di Apprendimento",
    contactUs: "Contattaci",
    faqs: "FAQs",
    timeline: "Cronologia del Recupero",
  },
};

const NavAccordion = ({ lang = "en" }: NavAccordionProps) => {
  const t = content[lang];
  const navCopy = navigationContent[lang] as Record<string, string>;

  // Get localized routes
  const partnerLinks = getPartnerRoutesByLanguage(lang);
  const contactLinks = getContactRoutesByLanguage(lang);
  const conditionLearnLinks = getConditionHubNavRoutes(lang);
  const conditionShopLinks = getConditionShopNavRoutes(lang);

  return (
    <div className="flex flex-col gap-2 pt-4">
      <Accordion type="single" collapsible defaultValue="shop">
        <AccordionItem value="shop">
          <AccordionTrigger>
            {(t as Record<string, string>).shopMenu ?? "Shop"}
          </AccordionTrigger>
          <AccordionContent>
            <div className="color-gradient block !pt-0 mb-3 p-4 border border-primary/15 rounded-xl text-left">
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                {navCopy.shopAsideTitle ?? ""}
              </p>
              <p className="mt-1.5 text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                {navCopy.shopAsideBody ?? navCopy.shopMenuDescription ?? ""}
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {conditionShopLinks.map((hub) => (
                <HubMegaLink
                  key={hub.href}
                  href={hub.href}
                  icon={hub.icon}
                  title={hub.title}
                  description={hub.description}
                  variant={hub.variant ?? "outline"}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="learn">
          <AccordionTrigger>
            {(t as Record<string, string>).learnMenu ??
              t.conditionsMenu ??
              "Learn"}
          </AccordionTrigger>
          <AccordionContent>
            <div className="color-gradient block !pt-0 mb-3 p-4 border border-primary/15 rounded-xl text-left">
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                {navCopy.learnAsideTitle ?? ""}
              </p>
              <p className="mt-1.5 text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                {navCopy.learnAsideBody ??
                  navCopy.learnMenuDescription ??
                  ""}
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {conditionLearnLinks.map((hub) => (
                <HubMegaLink
                  key={hub.href}
                  href={hub.href}
                  icon={hub.icon}
                  title={hub.title}
                  description={hub.description}
                  variant={hub.variant}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Professionals */}
        <AccordionItem value="professionals">
          <AccordionTrigger>{t.professionals}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {partnerLinks.map((partner) => (
                <IconLink
                  key={partner.href}
                  href={partner.href}
                  icon={partner.icon}
                  title={partner.title}
                  description={partner.description}
                  variant={partner.variant}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact */}
        <AccordionItem value="contacts">
          <AccordionTrigger>{t.contactUs}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {contactLinks.map((contact) => (
                <a
                  key={contact.href}
                  href={contact.href}
                  className={cn(
                    "flex items-center gap-2 p-3 border rounded-sm transition-colors duration-300",
                    contact.variant === "default"
                      ? "bg-gradient-to-tr from-primary/10 to-primary/20 dark:from-primary/5 dark:to-primary/10 text-primary hover:bg-primary/15 dark:hover:bg-primary/20 hover:text-primary-dark border-primary/20 dark:border-primary/10"
                      : "border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100",
                  )}
                >
                  <span className="flex justify-center items-center w-10 h-10">
                    {contact.icon}
                  </span>
                  <div>
                    <h3
                      className={cn(
                        "font-semibold text-base md:text-lg",
                        contact.variant === "default"
                          ? "text-primary"
                          : "text-neutral-800 dark:text-neutral-200",
                      )}
                    >
                      {contact.title}
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
                      {contact.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default NavAccordion;

const HubMegaLink = ({
  href,
  icon,
  title,
  description,
  variant = "outline",
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "default" | "outline";
}) => (
  <a
    href={href}
    className={cn(
      "flex items-start gap-3 shadow-sm hover:shadow-md p-4 border rounded-xl transition-all duration-300",
      variant === "default"
        ? "bg-gradient-to-br from-primary/12 to-primary/5 dark:from-primary/18 dark:to-primary/8 border-primary/25 hover:border-primary/40"
        : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600",
    )}
  >
    <span
      className={cn(
        "flex justify-center items-center rounded-xl w-12 h-12 shrink-0",
        variant === "default"
          ? "bg-primary/15 text-primary"
          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300",
      )}
    >
      {icon}
    </span>
    <div className="flex-1 min-w-0">
      <h3
        className={cn(
          "font-semibold text-base leading-snug",
          variant === "default"
            ? "text-primary"
            : "text-neutral-900 dark:text-neutral-100",
        )}
      >
        {title}
      </h3>
      <p className="mt-1 text-neutral-600 dark:text-neutral-400 text-sm line-clamp-3 leading-snug">
        {description}
      </p>
    </div>
  </a>
);

const IconLink = ({
  href,
  icon,
  title,
  description,
  variant = "outline",
  compact = false,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "default" | "outline";
  compact?: boolean;
}) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-2 border rounded-sm transition-colors duration-300",
        compact ? "p-2" : "p-3",
        variant === "default"
          ? "bg-gradient-to-tr from-primary/10 to-primary/20 dark:from-primary/5 dark:to-primary/10 text-primary hover:bg-primary/15 dark:hover:bg-primary/20 hover:text-primary-dark border-primary/20 dark:border-primary/10"
          : "border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100",
      )}
    >
      <span
        className={cn(
          "flex justify-center items-center shrink-0",
          compact ? "w-14 h-14" : "w-10 h-10",
        )}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-semibold",
            compact ? "text-sm" : "text-base md:text-lg",
            variant === "default"
              ? "text-primary"
              : "text-neutral-800 dark:text-neutral-200",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-neutral-500 dark:text-neutral-400",
            compact ? "text-xs line-clamp-1 mt-0.5" : "text-sm md:text-base",
          )}
        >
          {description}
        </p>
      </div>
    </a>
  );
};
