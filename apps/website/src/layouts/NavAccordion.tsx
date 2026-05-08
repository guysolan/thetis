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
import type { ReactNode } from "react";

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

const NavLink = ({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon?: ReactNode;
  title: string;
  description: string;
}) => (
  <a
    href={href}
    className="group flex items-start gap-3 active:bg-neutral-100 dark:active:bg-white/[0.08] p-3 rounded-xl transition-colors"
  >
    {icon && (
      <span className="flex justify-center items-center bg-neutral-100 dark:bg-white/[0.08] rounded-lg w-10 h-10 text-neutral-600 dark:text-neutral-300 shrink-0">
        {icon}
      </span>
    )}
    <div className="flex-1 py-0.5 min-w-0">
      <h3 className="font-medium text-[15px] text-neutral-900 dark:text-neutral-100 leading-snug">
        {title}
      </h3>
      <p className="mt-0.5 text-[13px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-snug">
        {description}
      </p>
    </div>
  </a>
);

const NavAccordion = ({ lang = "en" }: NavAccordionProps) => {
  const t = content[lang];
  const navCopy = navigationContent[lang] as Record<string, string>;

  const partnerLinks = getPartnerRoutesByLanguage(lang);
  const contactLinks = getContactRoutesByLanguage(lang);
  const conditionLearnLinks = getConditionHubNavRoutes(lang);
  const conditionShopLinks = getConditionShopNavRoutes(lang);

  return (
    <div className="flex flex-col pt-4">
      <Accordion type="single" collapsible defaultValue="shop">
        <AccordionItem value="shop">
          <AccordionTrigger>
            {(t as Record<string, string>).shopMenu ?? "Shop"}
          </AccordionTrigger>
          <AccordionContent>
            <p className="px-3 pb-3 text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {navCopy.shopAsideBody ?? navCopy.shopMenuDescription ?? ""}
            </p>
            <div className="flex flex-col -mx-1">
              {conditionShopLinks.map((hub) => (
                <NavLink
                  key={hub.href}
                  href={hub.href}
                  icon={hub.icon}
                  title={hub.title}
                  description={hub.description}
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
            <p className="px-3 pb-3 text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {navCopy.learnAsideBody ?? navCopy.learnMenuDescription ?? ""}
            </p>
            <div className="flex flex-col -mx-1">
              {conditionLearnLinks.map((hub) => (
                <NavLink
                  key={hub.href}
                  href={hub.href}
                  icon={hub.icon}
                  title={hub.title}
                  description={hub.description}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="professionals">
          <AccordionTrigger>{t.professionals}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col -mx-1">
              {partnerLinks.map((partner) => (
                <NavLink
                  key={partner.href}
                  href={partner.href}
                  icon={partner.icon}
                  title={partner.title}
                  description={partner.description}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contacts">
          <AccordionTrigger>{t.contactUs}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col -mx-1">
              {contactLinks.map((contact) => (
                <NavLink
                  key={contact.href}
                  href={contact.href}
                  icon={contact.icon}
                  title={contact.title}
                  description={contact.description}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default NavAccordion;
