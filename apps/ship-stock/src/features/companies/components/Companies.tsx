import { useLayoutStore } from "@/store/useLayoutStore";
import CompanyTable from "./CompanyTable";
import CompanyCards from './CompanyCards';

const Companies = () => {
    const view = useLayoutStore((state) => state.view);

    if (view === 'table') {
        return <CompanyTable />;
    }

    return (
        <CompanyCards />
    );
};

export default Companies;