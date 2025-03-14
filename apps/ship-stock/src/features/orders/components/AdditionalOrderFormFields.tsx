import Input from "../../../components/Input";
import { ReasonForExportSelect } from "./ReasonForExportSelect";
import { IncotermsSelect } from "./IncotermsSelect";
import { ModeOfTransportSelect } from "./ModeOfTransportSelect";
import { UnitOfMeasurementSelect } from "./UnitOfMeasurement";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@thetis/ui/accordion";

const AdditionalFormFields = () => {
  return (
    <Card className="flex flex-col space-y-4 px-1 pt-2 pr-4">
      <CardContent>
        <Accordion type="single">
          <AccordionItem
            className="flex flex-col gap-y-4 p-1"
            value="additional"
          >
            <AccordionTrigger>
              <CardTitle>Additional Form Fields</CardTitle>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-y-4 p-1">
              <ReasonForExportSelect />
              <Input
                type="text"
                name="shipment_number"
                label="Shipment Number"
              />
              <Input type="text" name="airwaybill" label="Air Waybill" />
              <ModeOfTransportSelect />
              <IncotermsSelect />
              <UnitOfMeasurementSelect />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AdditionalFormFields;
