import { Alert, AlertDescription, AlertTitle } from "@thetis/ui/alert";
import { AlertCircle } from "lucide-react";
import type { FormApi } from "@tanstack/react-form";

export function ValidationSummary({ form }: { form: FormApi<any, any> }) {
    return (
        <form.Subscribe
            selector={(state) => ({
                fieldMeta: state.fieldMeta,
                errors: state.errors,
            })}
            children={({ fieldMeta, errors }) => {
                const fieldErrors = Object.values(fieldMeta)
                    .filter((meta: any) => meta.errors.length > 0)
                    .flatMap((meta: any) => meta.errors)
                    .map((err: any) => err?.message || err);

                const formErrors = errors.map((err: any) =>
                    (typeof err === "object" ? err?.message || JSON.stringify(err) : err)
                );
                const allErrors = [...formErrors, ...fieldErrors].map((err) => {
                    if (typeof err === "string") return err;
                    if (typeof err === "object" && err?.message) return err.message;
                    return JSON.stringify(err);
                });

                if (allErrors.length === 0) return null;

                return (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="w-4 h-4" />
                        <AlertTitle>Validation Errors</AlertTitle>
                        <AlertDescription>
                            <ul className="space-y-1 mt-2 pl-5 list-disc">
                                {allErrors.map((error, i) => (
                                    <li key={i}>
                                        {typeof error === "string" ? error : JSON.stringify(error)}
                                    </li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                );
            }}
        />
    );
}
