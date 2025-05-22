import { useFormState } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@thetis/ui/alert";
import { AlertCircle } from "lucide-react";

interface FormErrorsProps {
  title?: string;
  fieldPrefix?: string;
  fields?: string[];
}

interface FormattedError {
  field: string;
  message: string;
}

const FormErrors = ({
  title = "Form Errors",
  fieldPrefix,
  fields,
}: FormErrorsProps) => {
  const { errors } = useFormState();

  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  const processErrors = (
    errors: any,
    prefix: string = "",
  ): FormattedError[] => {
    return Object.entries(errors).flatMap(([key, value]) => {
      const currentPath = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === "object" && "message" in value) {
        // This is a leaf error with a message
        return [
          {
            field: currentPath
              .split(".")
              .map((part) =>
                part
                  .replace(/_/g, " ")
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^\w/, (c) => c.toUpperCase())
                  .replace(/\b\w/g, (c) => c.toUpperCase())
                  .replace(/\d+$/, "")
                  .trim(),
              )
              .join(" › "),
            message: value.message as string,
          },
        ];
      } else if (Array.isArray(value)) {
        // Handle array errors
        return value.flatMap((item, index) => {
          if (item && typeof item === "object") {
            return processErrors(item, `${currentPath}[${index}]`);
          }
          return [];
        });
      } else if (value && typeof value === "object") {
        // Recursively process nested objects
        return processErrors(value, currentPath);
      }
      return [];
    });
  };

  const formattedErrors = processErrors(errors)
    .filter((error) => {
      if (!fieldPrefix && !fields) return true;
      if (fields) return fields.includes(error.field);
      return error.field.startsWith(fieldPrefix!);
    })
    .filter((error) => error.message);

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
