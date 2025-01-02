import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import { Input } from "@thetis/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@thetis/ui/accordion";

const sizeTypes = ["EU", "UK", "US Men", "US Women"] as const;

const sizeGuide = [
  {
    metric: "EU",
    threshold: 38,
    step: 1,
  },
  {
    metric: "UK",
    threshold: 8,
    step: 0.5,
  },
  {
    metric: "US Men",
    threshold: 9,
    step: 0.5,
  },
  {
    metric: "US Women",
    threshold: 10.5,
    step: 0.5,
  },
];

type SizeType = (typeof sizeTypes)[number];

const WhatSizeAmI = () => {
  const [sizeType, setSizeType] = useState<SizeType>("EU");
  const [size, setSize] = useState<string>("");

  const isValidSize = (input: string): boolean => {
    const num = Number.parseFloat(input);
    if (Number.isNaN(num)) return false;

    const guide = sizeGuide.find((g) => g.metric === sizeType);
    return num % guide!.step === 0;
  };

  const getSizeCategory = (type: SizeType, value: number): string => {
    const guide = sizeGuide.find((g) => g.metric === type);
    return value < guide!.threshold ? "Small" : "Large";
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto border-t w-full max-w-md"
    >
      <AccordionItem value="size-calculator">
        <AccordionTrigger className="font-medium text-md">
          What Size am I?
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6 p-2">
            <div className="flex flex-row gap-4">
              <Select
                value={sizeType}
                onValueChange={(value) => setSizeType(value as SizeType)}
              >
                <SelectTrigger className="w-2/3">
                  <SelectValue placeholder="Select size type" />
                </SelectTrigger>
                <SelectContent>
                  {sizeTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                className="w-1/3"
                type="number"
                step={sizeGuide
                  .find((g) => g.metric === sizeType)
                  ?.step.toString()}
                value={size}
                onChange={handleSizeChange}
                placeholder={`Enter ${sizeType} size`}
              />
            </div>

            {size && isValidSize(size) && (
              <div className="bg-muted p-4 rounded-lg font-medium text-center text-lg">
                Your size is:{" "}
                {getSizeCategory(sizeType, Number.parseFloat(size))}
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WhatSizeAmI;
