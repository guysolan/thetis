import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import dayjs from "dayjs";
import OrderFormButton from "./OrderFormButton";

interface BaseOrderFormProps<T extends z.ZodType> {
    schema: T;
    defaultValues: z.infer<T>;
    onSubmit: (data: z.infer<T>) => Promise<void>;
    children: React.ReactNode;
    title?: string;
}

export function BaseOrderForm<T extends z.ZodType>({
    schema,
    defaultValues,
    onSubmit,
    children,
}: BaseOrderFormProps<T>) {
    const form = useForm<z.infer<T>>({
        resolver: zodResolver(schema),
        defaultValues: {
            order_date: dayjs().toDate(),
            ...defaultValues,
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-4 px-1 pt-2 pr-4"
            >
                {children}
                <OrderFormButton />
            </form>
        </Form>
    );
}
