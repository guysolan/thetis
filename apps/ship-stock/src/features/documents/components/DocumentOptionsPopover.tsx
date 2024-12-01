import { Button } from "@thetis/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import { Settings } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { DocumentOptions } from "../schema";
import { documentOptions, documentOptionsSchema } from "../schema";
import Switch from "../../../components/Switch";

const DocumentOptionsPopover = ({
  documentType,
}: { documentType: keyof typeof documentOptions }) => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/documents" });
  console.log(search);
  const form = useForm<DocumentOptions>({
    defaultValues: documentOptionsSchema.parse({
      from: {
        show: search.from?.show !== false,
        billing: search.from?.billing !== false,
        shipping: search.from?.shipping !== false,
        contact: search.from?.contact !== false,
      },
      to: {
        show: search.to?.show !== false,
        billing: search.to?.billing !== false,
        shipping: search.to?.shipping !== false,
        contact: search.to?.contact !== false,
      },
      payment: search.payment !== false,
      total: search.total !== false,
    }),
  });

  const { register, handleSubmit, watch, setValue, formState } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      console.log("Search params updating:", value);
      navigate({
        search: (prev) => ({
          ...prev,
          ...value,
        }),
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, navigate]);

  const onSubmit = (data: DocumentOptions) => {
    return false;
  };

  const handleFromShowChange = (checked: boolean) => {
    setValue("from.show", checked);
    if (!checked) {
      setValue("from.billing", false);
      setValue("from.shipping", false);
      setValue("from.contact", false);
    }
  };

  const handleToShowChange = (checked: boolean) => {
    setValue("to.show", checked);
    if (!checked) {
      setValue("to.billing", false);
      setValue("to.shipping", false);
      setValue("to.contact", false);
    }
  };

  const formFields = documentOptions[documentType];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          onClick={(e) => e.stopPropagation()}
          variant="outline"
          size="icon"
        >
          <Settings size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="flex flex-col gap-3 p-4 w-72"
      >
        <h3 className="font-semibold">Document Options</h3>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-3">
              <Switch name="from.show" label="From Section" />
              {watch("from.show") && (
                <div className="space-y-2 pl-6">
                  {formFields.from
                    .filter((option) => option.id !== "show")
                    .map((option) => (
                      <Switch
                        key={option.id}
                        name={`from.${option.id}`}
                        label={option.label}
                      />
                    ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Switch name="to.show" label="To Section" />
              {watch("to.show") && (
                <div className="space-y-2 pl-6">
                  {formFields.to
                    .filter((option) => option.id !== "show")
                    .map((option) => (
                      <Switch
                        key={option.id}
                        name={`to.${option.id}`}
                        label={option.label}
                      />
                    ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Additional Options</h4>
              <div className="space-y-2 pl-4">
                {formFields.additional.map((option) => (
                  <Switch
                    key={option.id}
                    name={option.id}
                    label={option.label}
                  />
                ))}
              </div>
            </div>
          </form>
        </FormProvider>
      </PopoverContent>
    </Popover>
  );
};

export default DocumentOptionsPopover;
