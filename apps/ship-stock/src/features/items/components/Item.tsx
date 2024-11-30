import { useLayoutStore } from "@/store/useLayoutStore";
import ItemTable from "./ItemTable";
import ItemCards from './ItemCards';
import { ItemType } from '../types';

const Items = ({ itemType }: { itemType: ItemType }) => {
    const view = useLayoutStore((state) => state.view);

    if (view === 'table') {
        return <ItemTable itemType={itemType} />;
    }

    return (
        <ItemCards itemType={itemType} />
    );
};

export default Items;