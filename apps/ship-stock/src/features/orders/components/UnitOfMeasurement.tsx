import Select from "../../../components/Select";

const unitOfMeasurement = [
  { label: "Metric", value: "metric" },
  { label: "Imperial", value: "imperial" },
];

export function UnitOfMeasurementSelect() {
  return (
    <Select
      name="unit_of_measurement"
      label="Unit of Measurement"
      options={unitOfMeasurement}
    />
  );
}
