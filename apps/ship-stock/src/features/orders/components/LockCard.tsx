import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Lock, Unlock } from "lucide-react";
import PriceItems from "../features/order-forms/components/PriceItems";
import { cn } from "../../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";

const LockCard = ({
  title,
  children,
}: { title: React.ReactNode; children: React.ReactNode }) => {
  const [isLocked, setIsLocked] = React.useState(true);
  return (
    <Card className={cn(isLocked && "bg-neutral-50 cursor-not-allowed")}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <Select
          defaultValue={isLocked ? "locked" : "unlocked"}
          onValueChange={(value) => setIsLocked(value === "locked")}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select a lock status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="locked">
              <span className="flex flex-row gap-2 pr-2 text-base text-neutral-800">
                <Lock size={20} />
                Locked
              </span>
            </SelectItem>
            <SelectItem value="unlocked">
              <span className="flex flex-row gap-2 pr-2 text-base text-neutral-800">
                <Unlock size={20} />
                Unlocked
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent
        className={cn(isLocked && "cursor-not-allowed pointer-events-none")}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default LockCard;
