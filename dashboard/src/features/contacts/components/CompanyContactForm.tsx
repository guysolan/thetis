import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Input from "@/components/Input";
import { useCompanyContactMutation } from "../api/companyContactMutation";
import { Contact } from "../types";
import CompanySelect from "../../companies/components/CompanySelect";

const contactFormSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").optional().nullable(),
    phone: z.string().optional().nullable(),
    company_id: z.coerce.number(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface Props {
    contact: Contact["Row"] | null;
    operation: "insert" | "upsert";
    companyId?: number;
}

export default function CompanyContactForm(
    { contact, operation, companyId }: Props,
) {
    const { mutate: upsertContact } = useCompanyContactMutation(operation);

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            id: contact?.id,
            name: contact?.name || "",
            email: contact?.email || "",
            phone: contact?.phone || "",
            company_id: companyId || undefined,
        },
    });

    const onSubmit = (data: ContactFormData) => {
        upsertContact({ contact: data, companyId: data.company_id });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-1"
            >
                <CompanySelect name="company_id" />
                <Input label="Name" name="name" />
                <Input label="Email" name="email" type="email" />
                <Input label="Phone" name="phone" type="tel" />
                <Button
                    type="button"
                    onClick={() => form.handleSubmit(onSubmit)()}
                >
                    Save Contact
                </Button>
            </form>
        </Form>
    );
}