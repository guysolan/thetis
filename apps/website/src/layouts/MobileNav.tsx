import Social from '@/components/icons/socials/Social.tsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, NoAccordionLink } from '@thetis/ui/accordion';
import { Badge } from '@thetis/ui/badge';
import { Button } from '@thetis/ui/button';
import { buttonVariants } from '@thetis/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@thetis/ui/sheet';

import { articles } from '../data/articles.ts';
import { products } from '../data/products.ts';
import { cn } from '../lib/utils';

'client only'

// import { amazonLink } from '@/services/getAmazonLink'
export function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    Menu
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mt-8">
                    <SheetTitle>Welcome</SheetTitle>
                    <SheetDescription>
                        At Thetis Medical, we are doing all we can to improve
                        how patients experience Achilles tendon ruptures.
                    </SheetDescription>
                </SheetHeader>
                <Accordion type="single" collapsible>
                    <AccordionItem value="products">
                        <AccordionTrigger>Products</AccordionTrigger>
                        {products.map((product) => {
                            return (
                                <AccordionContent key={product.href}>
                                    <a href={product.href}>{product.title}</a>
                                </AccordionContent>
                            )
                        })}
                    </AccordionItem>
                    <AccordionItem value="patient-guides">
                        <AccordionTrigger>Patient Guides</AccordionTrigger>
                        {articles.map((article) => {
                            return (
                                <AccordionContent key={article.href}>
                                    <a href={article.href}>{article.title}</a>
                                </AccordionContent>
                            )
                        })}
                    </AccordionItem>

                    <NoAccordionLink
                        href="/professionals"
                        title="Professionals"
                    />
                    <NoAccordionLink
                        href="/tesimonials"
                        title="testimonials"
                    />
                    <NoAccordionLink href="/contact" title="Get in Touch" />
                </Accordion>

                <SheetFooter className="flex flex-col gap-y-4 mt-4">
                    <SheetClose asChild>
                        <a
                            className={cn(
                                'w-full',
                                buttonVariants({
                                    variant: 'default',
                                    size: 'lg',
                                })
                            )}
                            // href={amazonLink}
                            target="_blank"
                        >
                            Buy Now
                        </a>
                    </SheetClose>
                    <SheetClose>
                        <a
                            className={cn(
                                'w-full',
                                buttonVariants({
                                    variant: 'outline',
                                    size: 'lg',
                                })
                            )}
                            href="/contact"
                        >
                            Contact Orders
                        </a>
                    </SheetClose>
                    <div className="flex flex-wrap gap-x-6 my-2">
                        <Social mode="facebook" />
                        <Social mode="instagram" />
                        <Social mode="linkedin" />
                        <Social mode="mail" />
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
