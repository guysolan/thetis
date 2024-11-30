import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@thetis/ui/accordion'
import React from 'react'
import { ItemView } from '../types'

const ItemDetails = ({ item }: { item: ItemView }) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem
                value="specifications"
                className="border-0"
            >
                <AccordionTrigger className="py-2 text-sm hover:no-underline">
                    Specifications
                </AccordionTrigger>
                <AccordionContent>
                    <table className="w-full text-sm">
                        <tbody className="divide-y">
                            {item.sku && (
                                <tr>
                                    <td className="py-2 text-muted-foreground">
                                        SKU
                                    </td>
                                    <td className="py-2">{item.sku}</td>
                                </tr>
                            )}
                            {(item.height || item.width || item.depth) && (
                                <tr>
                                    <td className="py-2 text-muted-foreground">
                                        Dimensions
                                    </td>
                                    <td className="py-2">
                                        {item.height}H × {item.width}W ×{" "}
                                        {item.depth}D
                                    </td>
                                </tr>
                            )}
                            {item.weight > 0 && (
                                <tr>
                                    <td className="py-2 text-muted-foreground">
                                        Weight
                                    </td>
                                    <td className="py-2">{item.weight} kg</td>
                                </tr>
                            )}
                            {item.country_of_origin && (
                                <tr>
                                    <td className="py-2 text-muted-foreground">
                                        Origin
                                    </td>
                                    <td className="py-2">
                                        {item.country_of_origin}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default ItemDetails