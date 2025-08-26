import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@thetis/ui/select";
import { useUpdateOrder } from "@/features/orders/api/updateOrder";
import { cn } from "@/lib/utils";
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    Package,
    PackageCheck,
    Truck,
} from "lucide-react";

interface DeliveryStatusSelectProps {
    orderId: number;
    currentStatus: string;
}

const statusConfig = {
    pending: {
        label: "Pending",
        color: "bg-gray-100 text-gray-800 border-gray-200",
        hoverColor: "hover:bg-gray-200",
        icon: Clock,
    },
    processing: {
        label: "Processing",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        hoverColor: "hover:bg-blue-200",
        icon: Package,
    },
    ready_for_pickup: {
        label: "Ready for Pickup",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        hoverColor: "hover:bg-yellow-200",
        icon: PackageCheck,
    },
    out_for_delivery: {
        label: "Out for Delivery",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        hoverColor: "hover:bg-orange-200",
        icon: Truck,
    },
    delivered: {
        label: "Delivered",
        color: "bg-green-100 text-green-800 border-green-200",
        hoverColor: "hover:bg-green-200",
        icon: CheckCircle,
    },
    failed_delivery: {
        label: "Failed Delivery",
        color: "bg-red-100 text-red-800 border-red-200",
        hoverColor: "hover:bg-red-200",
        icon: AlertTriangle,
    },
} as const;

type DeliveryStatus = keyof typeof statusConfig;

export function DeliveryStatusSelect({
    orderId,
    currentStatus,
}: DeliveryStatusSelectProps) {
    const { mutate: updateOrder } = useUpdateOrder();

    const handleStatusChange = (newStatus: string) => {
        updateOrder({
            id: orderId,
            delivery_status: newStatus as DeliveryStatus,
        });
    };

    // Get the status config with fallback to pending
    const statusKey = (
        currentStatus in statusConfig ? currentStatus : "pending"
    ) as DeliveryStatus;
    const statusColor = statusConfig[statusKey]?.color ||
        statusConfig.pending.color;
    const StatusIcon = statusConfig[statusKey]?.icon ||
        statusConfig.pending.icon;

    return (
        <Select onValueChange={handleStatusChange} defaultValue={currentStatus}>
            <SelectTrigger
                className={cn(
                    "border rounded-full px-2 h-6 text-xs font-medium w-fit min-w-0 flex items-center gap-1",
                    statusColor,
                )}
            >
                <StatusIcon size={12} />
                <span>{statusConfig[statusKey]?.label}</span>
            </SelectTrigger>
            <SelectContent>
                {Object.entries(statusConfig).map(([status, config]) => {
                    const Icon = config.icon;
                    return (
                        <SelectItem
                            key={status}
                            value={status}
                            className={cn(
                                "rounded-full my-1 text-xs font-medium flex items-center gap-2",
                                config.color,
                                config.hoverColor,
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <Icon size={12} />
                                {config.label}
                            </div>
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}
