import React from 'react'
import { useSelectItemsView } from '../../../../../items/api/selectItemsView';
import { Badge } from '@thetis/ui/badge';

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
        <div className="space-y-2 px-2 py-1">
            <div className="flex flex-wrap gap-2">
                {item.components.map((comp, index) => (
                    <Badge
                        key={comp.component_id}
                        className=""
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