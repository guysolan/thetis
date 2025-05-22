import Input from "../../../components/Input";
import { ReasonForExportSelect } from "./ReasonForExportSelect";
import { IncotermsSelect } from "./IncotermsSelect";
import { ModeOfTransportSelect } from "./ModeOfTransportSelect";
import { UnitOfMeasurementSelect } from "./UnitOfMeasurement";
import { useFormContext } from "react-hook-form";
import EditCard from "@/components/EditCard";
import ShippingDetails from "../features/order-documents/components/ShippingDetails";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@thetis/ui/accordion";

const AdditionalFormFields = () => {
  const form = useFormContext();
  const formValues = form.watch();

  const getPlaceholder = (value: string | undefined) => {
    return value || "Not specified";
  };

  const editContent = (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <UnitOfMeasurementSelect />
      </div>
      <Accordion type="single">
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-4">
            <ReasonForExportSelect />
            <Input type="text" name="shipment_number" label="Shipment Number" />
            <Input type="text" name="airwaybill" label="Air Waybill" />
            <ModeOfTransportSelect />
            <IncotermsSelect />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  const previewContent = (
    <ShippingDetails
      reasonForExport={getPlaceholder(formValues.reason_for_export)}
      modeOfTransport={getPlaceholder(formValues.mode_of_transport)}
      incoterms={getPlaceholder(formValues.incoterms)}
      unitOfMeasurement={getPlaceholder(formValues.unit_of_measurement)}
      shipmentNumber={getPlaceholder(formValues.shipment_number)}
      airwaybill={getPlaceholder(formValues.airwaybill)}
    />
  );

  return (
    <EditCard title="Additional Form Fields" previewContent={previewContent}>
      {editContent}
    </EditCard>
  );
};

export default AdditionalFormFields;
