import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@thetis/ui/dialog";
import { Button } from "@thetis/ui/button";
import { CheckSquare } from "lucide-react";
import StockCheckForm from "./StockCheckForm";

interface StockCheckDialogProps {
    addressId: string;
    stockpileName: string;
}

const StockCheckDialog: React.FC<StockCheckDialogProps> = ({
    addressId,
    stockpileName,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSuccess = () => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <CheckSquare className="mr-2 w-4 h-4" />
                    Stock Check
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Stock Check - {stockpileName}
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <StockCheckForm
                        addressId={addressId}
                        onSuccess={handleSuccess}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StockCheckDialog;
