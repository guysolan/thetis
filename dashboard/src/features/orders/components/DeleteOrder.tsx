import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useDeleteOrder } from "../api/deleteOrder";
import { buttonVariants } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

interface DeleteOrderModalProps {
    orderId: number;
    trigger: React.ReactNode;
}

const DeleteOrder: React.FC<DeleteOrderModalProps> = ({ orderId, trigger }) => {
    const { mutate: deleteOrder } = useDeleteOrder();

    return (
        <AlertDialog >
            <AlertDialogTrigger
                className='w-full'
                asChild
                onClick={(e) => e.stopPropagation()}
            >
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Order</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete Order #{orderId}? This
                        action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteOrder(orderId);
                        }}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteOrder;
