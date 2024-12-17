import { Button } from "@thetis/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@thetis/ui/form";

import dayjs from "dayjs";
import DatePicker from "@/components/DatePicker";

import { OrderView } from "../types";
import Select from "@/components/Select";
import { useUpdateOrder } from "../api/updateOrder";
import { orderTypes } from "../types";
import Input from "../../../components/Input";
import { ReasonForExportSelect } from "./ReasonForExportSelect";
import Textarea from "../../../components/Textarea";
import { IncotermsSelect } from "./IncotermsSelect";
import { ModeOfTransportSelect } from "./ModeOfTransportSelect";
import { UnitOfMeasurementSelect } from "./UnitOfMeasurement";

const editOrderSchema = z.object({
  order_type: z.enum(orderTypes),
  order_date: z.coerce.date(),
  carriage: z.number(),
  reason_for_export: z.string().optional(),
  shipment_number: z.string().optional(),
  airwaybill: z.string().optional(),
  mode_of_transport: z.string().optional(),
  incoterms: z.string().optional(),
  unit_of_measurement: z.string().optional(),
});

const EditOrderForm = ({ order }: { order: OrderView }) => {
  const form = useForm<z.infer<typeof editOrderSchema>>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      order_date: dayjs(order.order_date).toDate(),
      order_type: order.order_type,
      carriage: order.carriage ?? 0,
      reason_for_export: order.reason_for_export,
      shipment_number: order.shipment_number,
      airwaybill: order.airwaybill,
      mode_of_transport: order.mode_of_transport,
      incoterms: order.incoterms,
      unit_of_measurement: order.unit_of_measurement,
    },
  });

  const { mutate: updateOrder } = useUpdateOrder();

  const handleSubmit = async (formData: z.infer<typeof editOrderSchema>) => {
    console.log(formData);
    await updateOrder({ ...formData, id: order.order_id });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-4 px-1 pt-2 pr-4"
      >
        <Select
          options={["sale", "shipment", "build", "purchase", "stocktake"].map(
            (x) => ({ label: x, value: x }),
          )}
          name="order_type"
          label="Order Type"
        />
        <DatePicker name="order_date" label="Order Date" />
        <Input type="number" name="carriage" label="Carriage" />
        <ReasonForExportSelect />
        <Input type="text" name="shipment_number" label="Shipment Number" />
        <Input type="text" name="airwaybill" label="Air Waybill" />
        <ModeOfTransportSelect />
        <IncotermsSelect />
        <UnitOfMeasurementSelect />
        <Button
          onClick={() => {
            console.log(form.formState.errors);
            console.log(form.getValues());
          }}
          type="submit"
        >
          Update Order
        </Button>
      </form>
    </Form>
  );
};

export default EditOrderForm;
