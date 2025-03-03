import { useFormState } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@thetis/ui/alert";
import { AlertCircle } from "lucide-react";

interface FormErrorsProps {
    title?: string;
}

interface FormErrorsProps {
    title?: string;
    fieldPrefix?: string;
    fields?: string[];
}

const FormErrors = ({
    title = "Form Errors",
    fieldPrefix,
    fields
}: FormErrorsProps) => {
    const { errors } = useFormState();

    if (!errors || Object.keys(errors).length === 0) {
        return null;
    }

    console.log(errors)
    // Transform errors into a more readable format
    const formattedErrors = Object.entries(errors)
        // Filter errors by prefix and fields if provided
        .filter(([field]) => {
            if (!fieldPrefix && !fields) return true;
            if (fields) return fields.includes(field);
            return field.startsWith(fieldPrefix!);
        })
        .map(([field, error]) => ({
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

    if (formattedErrors.length === 0) {
        return null;
    }

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