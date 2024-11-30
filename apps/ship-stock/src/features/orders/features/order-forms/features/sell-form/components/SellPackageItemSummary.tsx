import { useFormContext } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { Currency } from '../../../../../../../components/Currency';
import { PackageFormItem } from '../sellFormSchema';
import NumberFlow from '@number-flow/react';

interface SellPackageItemSummaryProps {
    packageIndex: number;
}

const SellPackageItemSummary = ({ packageIndex }: SellPackageItemSummaryProps) => {
    const { watch } = useFormContext();
    const { data: items } = useSelectItemsView();

    const currency = watch('currency');
    const packageItems: PackageFormItem[] = watch(`order_items.${packageIndex}.package_items`);

    const getItemName = (itemId: string) => {
        return items?.find(item => String(item.item_id) === itemId)?.item_name || '';
    };

    return (
        <div className="space-y-2">
            {packageItems?.map((item: any, index: number) => (
                <p key={index} className="flex justify-start text-sm">
                    {item.quantity} x {getItemName(item.item_id)}{" "}@{' '}
                    <NumberFlow
                        value={item.item_price ?? 0}
                        format={{ style: "currency", currency: currency }}
                    />
                </p>
            ))}
        </div>
    );
};

export default SellPackageItemSummary;