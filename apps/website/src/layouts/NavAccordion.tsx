import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";

import { articles } from "@thetis/website/src/content/articles";
import { productLinks } from "@/content/pages.tsx";
import { partnerLinks } from "@/content/pages.tsx";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NavAccordion = () => {
  return (
    <Accordion type="single" collapsible>
      {/* Products */}
      <AccordionItem value="products">
        <AccordionTrigger>Our Products</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            {productLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative flex flex-row items-center bg-neutral-50 hover:bg-muted/80 dark:hover:bg-neutral-800 active:bg-muted dark:bg-neutral-900 shadow-sm hover:shadow-md active:shadow-inner border hover:border-neutral-400 dark:hover:border-neutral-600 active:border-neutral-500 dark:border-neutral-800 rounded-lg w-full overflow-hidden active:scale-[0.98] transition-all duration-150 cursor-pointer"
              >
                <div className="flex-shrink-0 p-3">
                  {link.image && (
                    <img
                      src={link.image.src}
                      alt={link.title}
                      className="brightness-110 rounded-lg w-24 h-24 object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col flex-1 gap-1 p-4 overflow-hidden">
                  <span className="flex flex-row items-center gap-1 font-semibold text-neutral-900 dark:text-neutral-100 text-base md:text-lg !underline underline-offset-4 truncate">
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
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Partners */}
      <AccordionItem value="partners">
        <AccordionTrigger>Partners</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {partnerLinks.map((partner) => (
              <a
                key={partner.href}
                href={partner.href}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg border transition-colors duration-300",
                  "border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100",
                )}
              >
                <span className="flex justify-center items-center w-10 h-10">
                  {partner.icon && partner.icon}
                </span>
                <div>
                  <h3
                    className={cn(
                      "font-semibold text-base md:text-lg",
                      "text-neutral-800 dark:text-neutral-200",
                    )}
                  >
                    {partner.title}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
                    {partner.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Patient Guides */}
      <AccordionItem value="patient-guides">
        <AccordionTrigger>Patient Guides</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {articles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                className="flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 dark:text-neutral-200 transition-colors duration-300"
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
    </Accordion>
  );
};

export default NavAccordion;
