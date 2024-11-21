import { useFormState } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FormErrorsProps {
    title?: string;
}

const FormErrors = ({ title = "Form Errors" }: FormErrorsProps) => {
    const { errors } = useFormState();

    if (!errors || Object.keys(errors).length === 0) {
        return null;
    }

    // Transform errors into a more readable format
    const formattedErrors = Object.entries(errors).map(([field, error]) => ({
        field: field.split('.')
            .map(part => part
                .replace(/_/g, ' ') // Convert underscores to spaces
                .replace(/([A-Z])/g, ' $1')
                .replace(/^\w/, c => c.toUpperCase())
                .replace(/\b\w/g, c => c.toUpperCase()) // Capitalize all words
                .replace(/\d+$/, '')
                .trim()
            ).join(' › '),
        message: error?.message as string
    })).filter(error => error.message);

    return (
        <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                <ul className="space-y-1 mt-2 pl-4 list-disc">
                    {formattedErrors.map(({ field, message }, index) => (
                        <li key={index}>
                            <span className="font-medium">{field}:</span> {message}
                        </li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
};

export default FormErrors;