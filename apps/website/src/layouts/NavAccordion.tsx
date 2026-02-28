import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";

import {
  getArticleRoutesByLanguage,
  getContactRoutesByLanguage,
  getCourseRoutesByLanguage,
  getPartnerRoutesByLanguage,
  getProductRoutesByLanguage,
  getRecoveryPhaseRoutesByLanguage,
  getRouteBySlugAndLanguage,
} from "@/content/routes.tsx";
import TendonStiffnessImage from "@/assets/tendon-stiffness-after-rupture.png";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const splintImageSrc = "/images/night_splint_bed_top_square.jpg";
import type { Lang } from "../config/languages";

interface NavAccordionProps {
  lang?: Lang;
}

const content = {
  en: {
    courses: "Courses",
    ourProduct: "Products",
    professionals: "Professionals",
    patientGuides: "Learning Resources",
    contactUs: "Contact Us",
    faqs: "FAQs",
    timeline: "Timeline of Recovery",
    splintSeeProduct: "See product",
    splintHowToBuy: "How to buy",
    splintReviews: "Reviews",
    howToBuyShort: "Where to buy",
    reviewsShort: "Customer reviews",
  },
  de: {
    courses: "Kurse",
    ourProduct: "Produkte",
    professionals: "Fachkräfte",
    patientGuides: "Lernressourcen",
    contactUs: "Kontaktiere uns",
    faqs: "FAQs",
    timeline: "Genesungszeitplan",
    splintSeeProduct: "Produkt ansehen",
    splintHowToBuy: "So kaufen Sie",
    splintReviews: "Bewertungen",
    howToBuyShort: "Kaufoptionen",
    reviewsShort: "Kundenbewertungen",
  },
  fr: {
    courses: "Cours",
    ourProduct: "Produits",
    professionals: "Professionnels",
    patientGuides: "Ressources d'Apprentissage",
    contactUs: "Contactez-nous",
    faqs: "FAQs",
    timeline: "Chronologie de Récupération",
    splintSeeProduct: "Voir le produit",
    splintHowToBuy: "Comment acheter",
    splintReviews: "Avis",
    howToBuyShort: "Où acheter",
    reviewsShort: "Avis clients",
  },
  es: {
    courses: "Cursos",
    ourProduct: "Productos",
    professionals: "Profesionales",
    patientGuides: "Recursos de Aprendizaje",
    contactUs: "Contáctenos",
    faqs: "FAQs",
    timeline: "Cronología de Recuperación",
    splintSeeProduct: "Ver producto",
    splintHowToBuy: "Cómo comprar",
    splintReviews: "Reseñas",
    howToBuyShort: "Dónde comprar",
    reviewsShort: "Opiniones",
  },
  it: {
    courses: "Corsi",
    ourProduct: "Prodotti",
    professionals: "Professionisti",
    patientGuides: "Risorse di Apprendimento",
    contactUs: "Contattaci",
    faqs: "FAQs",
    timeline: "Cronologia del Recupero",
    splintSeeProduct: "Vedi prodotto",
    splintHowToBuy: "Come acquistare",
    splintReviews: "Recensioni",
    howToBuyShort: "Dove acquistare",
    reviewsShort: "Recensioni clienti",
  },
};

const NavAccordion = ({ lang = "en" }: NavAccordionProps) => {
  const t = content[lang];

  // Get localized routes
  const partnerLinks = getPartnerRoutesByLanguage(lang);
  const contactLinks = getContactRoutesByLanguage(lang);
  const articleRoutes = getArticleRoutesByLanguage(lang);
  const recoveryPhaseLinks = getRecoveryPhaseRoutesByLanguage(lang);

  // Get direct links for Course and Splint
  const courseRoute = getRouteBySlugAndLanguage("course", lang);
  const splintRoute = getRouteBySlugAndLanguage(
    "achilles-rupture-splint",
    lang,
  );
  const reviewsRoute = getRouteBySlugAndLanguage("reviews", lang);

  const howToBuyHrefByLang: Record<string, string> = {
    en: "/how-to-buy",
    de: "/de/wie-kaufen",
    fr: "/fr/comment-acheter",
    es: "/es/como-comprar",
    it: "/it/come-acquistare",
  };
  const howToBuyHref = howToBuyHrefByLang[lang] ?? "/how-to-buy";

  return (
    <div className="flex flex-col gap-2 pt-4">
      {/* Products: default-open accordion with splint card (sublinks: How to buy, Reviews) + course card */}
      <Accordion type="single" collapsible defaultValue="products" className="gap-0">
        <AccordionItem value="products" className="border-none">
          <AccordionTrigger className="py-2 font-medium text-neutral-900 dark:text-neutral-100">
            {t.ourProduct}
          </AccordionTrigger>
          <AccordionContent className="pb-2 pt-0">
            <div className="flex flex-col gap-2">
              {splintRoute && (
                <div className="flex flex-col gap-0 rounded-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <ImageProductLink
                    href={splintRoute.href}
                    imageSrc={splintImageSrc}
                    title={splintRoute.title}
                    description={splintRoute.description ?? ""}
                    nested
                  />
                  <div className="flex flex-col border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
                    <a
                      href={howToBuyHref}
                      className="flex items-center gap-2 py-2 px-3 pl-4 text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <MapPin className="w-4 h-4 shrink-0" />
                      {(t as Record<string, string>).howToBuyShort ?? "Where to buy"}
                    </a>
                    {reviewsRoute && (
                      <a
                        href={reviewsRoute.href}
                        className="flex items-center gap-2 py-2 px-3 pl-4 text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border-t border-neutral-200 dark:border-neutral-800"
                      >
                        <Star className="w-4 h-4 shrink-0" />
                        {t.splintReviews}
                      </a>
                    )}
                  </div>
                </div>
              )}
              {courseRoute && (
                <ImageProductLink
                  href={courseRoute.href}
                  imageSrc={TendonStiffnessImage.src}
                  title={courseRoute.title}
                  description={courseRoute.description ?? ""}
                />
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible>
        {/* Learning Resources - FAQs + Timeline */}
        <AccordionItem value="learning-resources">
          <AccordionTrigger>{t.patientGuides}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3">
              {/* FAQs Section */}
              <div className="flex flex-col gap-1.5">
                <h3 className="mb-0.5 font-semibold text-neutral-600 dark:text-neutral-400 text-xs uppercase tracking-wide">
                  {t.faqs}
                </h3>
                {articleRoutes.map((article) => (
                  <a
                    key={article.href}
                    href={article.href}
                    className="flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 border border-neutral-200 dark:border-neutral-800 rounded-sm text-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 dark:text-neutral-200 transition-colors duration-300"
                  >
                    <span className="flex justify-center items-center w-9 h-9 shrink-0">
                      {article.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 mt-0.5">
                          {article.description}
                        </p>
                      )}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {article.tags.map((tag) => (
                            <Badge
                              key={`${article.href}-${tag.words}`}
                              className={`${tag.color} text-black bg-opacity-80 font-light text-xs`}
                            >
                              {tag.words}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>

              {/* Timeline Section */}
              <div className="flex flex-col gap-1.5">
                <h3 className="mb-0.5 font-semibold text-neutral-600 dark:text-neutral-400 text-xs uppercase tracking-wide">
                  {t.timeline}
                </h3>
                {recoveryPhaseLinks.map((link) => (
                  <IconLink
                    key={link.href}
                    href={link.href}
                    icon={link.icon}
                    title={link.title}
                    description={link.description}
                    variant={link.variant}
                    compact
                  />
                ))}
              </div>
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
                    {contact.icon && contact.icon}
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

const ImageProductLink = ({
  href,
  imageSrc,
  title,
  description,
  nested = false,
}: {
  href: string;
  imageSrc: string;
  title: string;
  description: string;
  nested?: boolean;
}) => (
  <a
    href={href}
    className={cn(
      "flex items-center gap-2 p-2 transition-colors duration-300",
      !nested && "border border-neutral-200 dark:border-neutral-800 rounded-sm",
      "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100",
    )}
  >
    <img
      src={imageSrc}
      alt=""
      className="w-14 h-14 shrink-0 rounded object-cover"
    />
    <div className="min-w-0 flex-1">
      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
        {title}
      </h3>
      {description && (
        <p className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 mt-0.5">
          {description}
        </p>
      )}
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
        {icon && icon}
      </span>
      <div className="min-w-0 flex-1">
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
            compact
              ? "text-xs line-clamp-1 mt-0.5"
              : "text-sm md:text-base",
          )}
        >
          {description}
        </p>
      </div>
    </a>
  );
};
