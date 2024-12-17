import Select from "../../../components/Select";

const modeOfTransport = [
  { label: "Sea", value: "sea" },
  { label: "Air", value: "air" },
  { label: "Road", value: "road" },
  { label: "Rail", value: "rail" },
];

export function ModeOfTransportSelect() {
  return (
    <Select
      name="mode_of_transport"
      label="Mode of Transport"
      options={modeOfTransport}
    />
  );
}
