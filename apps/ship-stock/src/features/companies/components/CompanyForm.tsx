import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@thetis/ui/form";
import { Button } from "@thetis/ui/button";
import Input from "@/components/Input";
import { useCompanyMutation } from "../api/companyMutation";
import { Company } from "../types";

const companyFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    tax_number: z.string().optional(),
    company_number: z.string().optional(),
});

type CompanyFormData = z.infer<typeof companyFormSchema>;

interface Props {
    company?: Company["Row"];
}

export default function CompanyForm({ company }: Props) {
    const { mutate: upsertCompany } = useCompanyMutation(
        company ? "upsert" : "insert",
    );

    const form = useForm<CompanyFormData>({
        resolver: zodResolver(companyFormSchema),
        defaultValues: {
            id: company?.id,
            name: company?.name || "",
            tax_number: company?.tax_number || "",
            company_number: company?.company_number || "",
        },
    });

    const onSubmit = (data: CompanyFormData) => {
        upsertCompany(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-1"
            >
                <Input label="Company Name" name="name" />
                <Input label="VAT Number" name="tax_number" />
                <Input label="Company Number" name="company_number" />
                <Button
                    type="button"
                    onClick={() => form.handleSubmit(onSubmit)()}
                >
                    Save Company
                </Button>
            </form>
        </Form>
    );
}
