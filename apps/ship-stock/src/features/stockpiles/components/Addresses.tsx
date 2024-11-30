import { useLayoutStore } from "@/store/useLayoutStore";
import AddressTable from "./AddressTable";
import AddressCards from './AddressCards';
import { useSelectAddresses } from '../api/selectAddresses';

const Addresses = () => {
    const view = useLayoutStore((state) => state.view);
    const { data: addresses } = useSelectAddresses();
    if (view === 'table' && addresses) {
        return <AddressTable addresses={addresses} />;
    }

    return (
        <AddressCards />
    );
};

export default Addresses;