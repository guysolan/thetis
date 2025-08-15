import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";

import { articles } from "@thetis/website/src/content/articles";
import { productLinks } from "@/content/pages.tsx";
import { contactLinks, partnerLinks } from "@/content/pages.tsx";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lang } from "../config/languages";

interface NavAccordionProps {
  lang?: Lang;
}

const content = {
  en: {
    ourProduct: "Our Product",
    professionals: "Professionals",
    patientGuides: "Patient Guides",
    contactUs: "Contact Us",
  },
  de: {
    ourProduct: "Unser Produkt",
    professionals: "Fachkräfte",
    patientGuides: "Patientenleitfäden",
    contactUs: "Kontaktiere uns",
  },
  fr: {
    ourProduct: "Notre Produit",
    professionals: "Professionnels",
    patientGuides: "Guides du Patient",
    contactUs: "Contactez-nous",
  },
  es: {
    ourProduct: "Nuestro Producto",
    professionals: "Profesionales",
    patientGuides: "Guías del Paciente",
    contactUs: "Contáctenos",
  },
  it: {
    ourProduct: "Il Nostro Prodotto",
    professionals: "Professionisti",
    patientGuides: "Guide del Paziente",
    contactUs: "Contattaci",
  },
};

const NavAccordion = ({ lang = "en" }: NavAccordionProps) => {
  const t = content[lang];
  return (
    <Accordion type="single" collapsible>
      {/* Products */}
      <AccordionItem value="products">
        <AccordionTrigger>{t.ourProduct}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            {productLinks.map((link) =>
              link.image
                ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative flex flex-row items-center bg-neutral-50 hover:bg-muted/80 active:bg-muted dark:bg-neutral-900 dark:hover:bg-neutral-800 shadow-sm hover:shadow-md active:shadow-inner border hover:border-neutral-400 active:border-neutral-500 dark:border-neutral-800 dark:hover:border-neutral-600 rounded-sm w-full overflow-hidden active:scale-[0.98] transition-all duration-150 cursor-pointer"
                  >
                    <div className="flex-shrink-0 p-4 pr-0">
                      {link.image && (
                        <img
                          src={link.image.src}
                          alt={link.title}
                          className="brightness-110 rounded-sm w-32 h-32 object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 gap-1 p-4 overflow-hidden">
                      <span className="flex flex-row items-center gap-1 font-semibold text-neutral-900 dark:text-neutral-100 text-base md:text-lg !underline underline-offset-4 text-wrap">
                        {link.title}
                        <ArrowRight size={16} className="flex-shrink-0 ml-1" />
                      </span>
                      {link.description && (
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base line-clamp-3">
                          {link.description}
                        </p>
                      )}
                    </div>
                  </a>
                )
                : (
                  <IconLink
                    key={link.href}
                    href={link.href}
                    icon={link.icon}
                    title={link.title}
                    description={link.description}
                  />
                )
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Partners */}
      <AccordionItem value="partners">
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

      {/* Patient Guides */}
      <AccordionItem value="patient-guides">
        <AccordionTrigger>{t.patientGuides}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {articles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                className="flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-3 border border-neutral-200 dark:border-neutral-800 rounded-sm text-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 dark:text-neutral-200 transition-colors duration-300"
              >
                <span className="flex justify-center items-center w-10 h-10">
                  {article.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-base md:text-lg">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
                      {article.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {article.tags.map((tag) => (
                      <Badge
                        key={`${article.href}-${tag.words}`}
                        className={`${tag.color} text-black bg-opacity-80 font-light text-xs`}
                      >
                        {tag.words}
                      </Badge>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Partners */}
      <AccordionItem value="contacts">
        <AccordionTrigger>{t.contactUs}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {contactLinks.map((contact) => (
              <a
                key={contact.href}
                href={contact.href}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-sm border transition-colors duration-300",
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
  );
};

export default NavAccordion;

const IconLink = ({
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
}) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-2 p-3 rounded-sm border transition-colors duration-300",
        variant === "default"
          ? "bg-gradient-to-tr from-primary/10 to-primary/20 dark:from-primary/5 dark:to-primary/10 text-primary hover:bg-primary/15 dark:hover:bg-primary/20 hover:text-primary-dark border-primary/20 dark:border-primary/10"
          : "border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100",
      )}
    >
      <span className="flex justify-center items-center w-10 h-10">
        {icon && icon}
      </span>
      <div>
        <h3
          className={cn(
            "font-semibold text-base md:text-lg",
            variant === "default"
              ? "text-primary"
              : "text-neutral-800 dark:text-neutral-200",
          )}
        >
          {title}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
          {description}
        </p>
      </div>
    </a>
  );
};
