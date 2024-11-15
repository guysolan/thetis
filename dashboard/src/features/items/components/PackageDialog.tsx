import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PackageForm } from "./PackageForm";

const PackageDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-fit">
                    <Plus className="mr-2 w-4 h-4" />
                    New Package
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        Create New Package
                    </DialogTitle>
                </DialogHeader>
                <PackageForm
                    item={null}
                />
            </DialogContent>
        </Dialog>
    );
};

export default PackageDialog;
