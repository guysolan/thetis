import { useLayoutStore } from "@/store/useLayoutStore";
import ContactTable from "./ContactTable";
import ContactCards from './ContactCards';

const Contacts = () => {
    const view = useLayoutStore((state) => state.view);

    if (view === 'table') {
        return <ContactTable />;
    }

    return (
        <ContactCards />
    );
};

export default Contacts;