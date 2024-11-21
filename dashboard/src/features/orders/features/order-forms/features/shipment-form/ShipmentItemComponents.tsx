import React from 'react'
import { useSelectItemsView } from '../../../../../items/api/selectItemsView';
import { Badge } from '../../../../../../components/ui/badge';

const ShipmentItemComponents = ({ itemId }: { itemId: string }) => {
    const { data: items } = useSelectItemsView();
    const item = items?.find((item) => item.item_id === Number(itemId));

    if (!item?.components?.length) {
        return (
            <div className="text-muted-foreground text-sm italic">
                No components
            </div>
        );
    }

    return (
        <div className="space-y-1.5">
            <div className="flex flex-wrap gap-1.5">
                {item.components.map((comp, index) => (
                    <Badge
                        key={comp.component_id}
                        className="inline-flex items-center bg-background hover:bg-accent px-2.5 py-0.5 border focus:ring-2 focus:ring-ring focus:ring-offset-2 font-semibold text-foreground text-xs transition-colors focus:outline-none"
                    >
                        <span className="font-medium text-primary">
                            {comp.component_quantity}x
                        </span>
                        <span className="ml-1">
                            {comp.component_name}
                        </span>
                    </Badge>
                ))}
            </div>
        </div>
    );
}

export default ShipmentItemComponents