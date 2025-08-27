import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import { useUpdateOrder } from "../api/updateOrder";
import { cn } from "@/lib/utils";

interface PaymentStatusSelectProps {
  orderId: number;
  currentStatus: string;
}

const statusConfig = {
  unpaid: {
    label: "Unpaid",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    hoverColor: "hover:bg-yellow-200",
  },
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-800 border-green-200",
    hoverColor: "hover:bg-green-200",
  },
  overdue: {
    label: "Overdue",
    color: "bg-red-100 text-red-800 border-red-200",
    hoverColor: "hover:bg-red-200",
  },
  refunded: {
    label: "Refunded",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    hoverColor: "hover:bg-blue-200",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    hoverColor: "hover:bg-gray-200",
  },
} as const;

type PaymentStatus = keyof typeof statusConfig;

export function PaymentStatusSelect({
  orderId,
  currentStatus,
}: PaymentStatusSelectProps) {
  const { mutate: updateOrder } = useUpdateOrder();

  const handleStatusChange = (newStatus: string) => {
    updateOrder({
      id: orderId,
      payment_status: newStatus as PaymentStatus,
    });
  };

  // Get the status config with fallback to unpaid
  const statusKey = (
    currentStatus in statusConfig ? currentStatus : "unpaid"
  ) as PaymentStatus;
  const statusColor =
    statusConfig[statusKey]?.color || statusConfig.unpaid.color;

  return (
    <Select onValueChange={handleStatusChange} defaultValue={currentStatus}>
      <SelectTrigger
        className={cn(
          "border rounded-full px-2 h-6 text-xs font-medium w-fit min-w-0",
          statusColor,
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(statusConfig).map(([status, config]) => (
          <SelectItem
            key={status}
            value={status}
            className={cn(
              "rounded-full my-1 text-xs font-medium",
              config.color,
              config.hoverColor,
            )}
          >
            {config.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
