import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Form } from "@thetis/ui/form";
import dayjs from "dayjs";
import OrderFormButton from "./OrderFormButton";
import React from "react";
import type { StockValidationConfig } from "../hooks/useStockValidation";
import FormErrors from "../../../../../components/FormErrors";

interface BaseOrderFormProps<T extends z.ZodType> {
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: (data: z.infer<T>) => Promise<void>;
  children: React.ReactNode;
  title?: string;
  config?: StockValidationConfig;
}

export function BaseOrderForm<T extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
  config,
  children,
}: BaseOrderFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: {
      order_date: dayjs().toDate(),
      ...defaultValues,
    },
  });

  const scrollToTop = () => {
    document.getElementById("order-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (data: z.infer<T>) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission failed:", error);
      scrollToTop();
    }
  };

  return (
    <Form {...form}>
      <form
        id="order-form"
        className="flex flex-col gap-y-4 px-1 w-full"
        onSubmit={form.handleSubmit(handleSubmit, () => scrollToTop())}
      >
        {children}
        <FormErrors />
        <OrderFormButton
          config={config}
          onClick={form.handleSubmit(handleSubmit, () => scrollToTop())}
        />
      </form>
    </Form>
  );
}
