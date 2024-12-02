import { ReactNode } from 'react';
import { TabsList } from "@thetis/ui/tabs";

interface TabsHeaderProps {
    tabsList: ReactNode;
    optionButtons?: ReactNode; // For buttons like LayoutPopover
    actionButtons?: ReactNode; // For primary actions like "New Item"
}

const TabsHeader = ({ tabsList, optionButtons, actionButtons }: TabsHeaderProps) => {
    return (
        <div className="flex md:flex-row flex-col-reverse justify-start md:justify-between items-start md:items-center gap-4 mb-4">
            <TabsList>
                {tabsList}
            </TabsList>
            {(optionButtons || actionButtons) && (
                <div className="flex md:flex-row flex-row-reverse justify-between items-center gap-2 w-full md:w-fit">
                    {optionButtons ?? <div />}
                    {actionButtons}
                </div>
            )}
        </div>
    );
};

export default TabsHeader; 