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

interface DeleteOrderModalProps {
    orderId: number;
}

const DeleteOrder: React.FC<DeleteOrderModalProps> = ({ orderId }) => {
    const { mutate: deleteOrder } = useDeleteOrder();

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="text-red-500 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <Trash2 className="w-4 h-4" />
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
