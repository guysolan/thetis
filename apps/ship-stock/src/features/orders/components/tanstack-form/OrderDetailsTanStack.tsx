import { DatePickerField } from "../../../../components/tanstack-form/DatePickerField";
import { SelectField } from "../../../../components/tanstack-form/SelectField";
import { SelectFieldWithInfo } from "../../../../components/tanstack-form/SelectFieldWithInfo";
import { InputField } from "../../../../components/tanstack-form/InputField";
import { currencyKeys } from "../../../../constants/currencies";
import dayjs from "dayjs";
import EditCard from "../../../../components/EditCard";
import {
    Calendar,
    DollarSign,
    FileText,
    Globe2,
    Hash as HashIcon,
    PlaneTakeoff,
    Scale,
    Truck,
} from "lucide-react";
import { FieldGroup } from "@thetis/ui/field";
import * as React from "react";

const unitOfMeasurementOptions = [
    { label: "Metric", value: "metric" },
    { label: "Imperial", value: "imperial" },
];

const modeOfTransportOptions = [
    { label: "Sea", value: "sea" },
    { label: "Air", value: "air" },
    { label: "Road", value: "road" },
    { label: "Rail", value: "rail" },
];

const reasonsForExport = [
    {
        name: "Against Sale",
        description:
            "Goods are being exported as part of a sales transaction with a buyer in another country.",
    },
    {
        name: "Return/Exchange",
        description:
            "Goods are sent back to the supplier for an exchange or credit.",
    },
    {
        name: "Repair/Service",
        description:
            "Items are exported for repair or servicing with plans for return after the work is completed.",
    },
    {
        name: "Temporary Export",
        description:
            "Goods are temporarily exported for purposes such as demonstration, exhibition, or trial.",
    },
    {
        name: "Gift",
        description:
            "Items are sent as a gift without a commercial transaction involved.",
    },
    {
        name: "Sample",
        description:
            "Goods are sent as samples for demonstration purposes to encourage future sales.",
    },
    {
        name: "Replacement",
        description:
            "Products are sent to replace items that were previously damaged or defective.",
    },
    {
        name: "Donation",
        description:
            "Items are being exported as a charitable contribution without a commercial transaction.",
    },
    {
        name: "Transfer of Ownership",
        description:
            "Goods are moved between branches or subsidiaries of the same company as an internal transfer.",
    },
];

const incotermsOptions = [
    {
        name: "Ex Works (EXW)",
        description:
            "The seller makes the goods available at their premises. Buyer is responsible for all transportation costs and risks.",
    },
    {
        name: "Free Carrier (FCA)",
        description:
            "Seller delivers goods to carrier nominated by buyer. Risk transfers when goods are delivered to carrier.",
    },
    {
        name: "Carriage Paid To (CPT)",
        description:
            "Seller pays for carriage to destination. Risk transfers when goods are handed to first carrier.",
    },
    {
        name: "Carriage and Insurance Paid To (CIP)",
        description:
            "Like CPT, but seller also provides insurance against loss/damage during transport.",
    },
    {
        name: "Delivered at Terminal (DAT)",
        description:
            "Seller delivers and unloads goods at specified terminal. Risk transfers after unloading.",
    },
    {
        name: "Delivered at Place (DAP)",
        description:
            "Seller delivers goods to specified destination. Buyer handles import duties and unloading.",
    },
    {
        name: "Free Alongside Ship (FAS)",
        description:
            "Seller delivers goods alongside ship at port. Buyer assumes risk and costs thereafter.",
    },
    {
        name: "Free On Board (FOB)",
        description:
            "Seller loads goods onto ship. Risk transfers when goods pass ship's rail.",
    },
    {
        name: "Cost and Freight (CFR)",
        description:
            "Seller pays transport costs to destination port. Risk transfers upon loading onto ship.",
    },
    {
        name: "Cost, Insurance and Freight (CIF)",
        description:
            "Like CFR plus seller provides insurance during transport.",
    },
    {
        name: "Delivered Duty Paid (DDP)",
        description:
            "Seller is responsible for delivering goods to named destination, paying all costs including duties, taxes, and import clearance. Risk transfers at delivery.",
    },
];

type OrderDetailsTanStackProps = {
    form: any;
};

const OrderDetailsTanStack = ({ form }: OrderDetailsTanStackProps) => {
    const [orderDate, setOrderDate] = React.useState<any>(null);
    const [currency, setCurrency] = React.useState<string | undefined>(
        undefined,
    );
    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState<
        string | undefined
    >(undefined);
    const [reasonForExport, setReasonForExport] = React.useState<
        string | undefined
    >(undefined);
    const [modeOfTransport, setModeOfTransport] = React.useState<
        string | undefined
    >(undefined);
    const [incoterms, setIncoterms] = React.useState<string | undefined>(
        undefined,
    );
    const [airwaybill, setAirwaybill] = React.useState<string | undefined>(
        undefined,
    );
    const [referenceNumber, setReferenceNumber] = React.useState<
        string | undefined
    >(undefined);

    React.useEffect(() => {
        const unsubscribe = form.store.subscribe(() => {
            const values = form.state.values;
            setOrderDate(values.order_date);
            setCurrency(values.currency);
            setUnitOfMeasurement(values.unit_of_measurement);
            setReasonForExport(values.reason_for_export);
            setModeOfTransport(values.mode_of_transport);
            setIncoterms(values.incoterms);
            setAirwaybill(values.airwaybill);
            setReferenceNumber(values.reference_number);
        });
        return unsubscribe;
    }, [form]);

    const getPlaceholder = (value: string | undefined) => {
        return value || "Not specified";
    };

    const editContent = (
        <FieldGroup>
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
                <DatePickerField
                    name="order_date"
                    label="Order Date"
                    form={form}
                />
                <SelectField
                    name="currency"
                    label="Currency"
                    form={form}
                    options={currencyKeys.map((o) => ({
                        label: o,
                        value: o,
                    }))}
                />
                <SelectField
                    name="unit_of_measurement"
                    label="Unit of Measurement"
                    form={form}
                    options={unitOfMeasurementOptions}
                />
                <SelectFieldWithInfo
                    name="reason_for_export"
                    label="Reason for Export"
                    form={form}
                    options={reasonsForExport}
                    placeholder="Select reason for export"
                />
                <SelectField
                    name="mode_of_transport"
                    label="Mode of Transport"
                    form={form}
                    options={modeOfTransportOptions}
                />
                <SelectFieldWithInfo
                    name="incoterms"
                    label="Incoterms"
                    form={form}
                    options={incotermsOptions}
                    placeholder="Select incoterms"
                />
                <InputField
                    type="text"
                    name="airwaybill"
                    label="Air Waybill"
                    form={form}
                />
                <InputField
                    type="text"
                    name="reference_number"
                    label="Reference Number"
                    form={form}
                />
            </div>
        </FieldGroup>
    );

    const previewContent = (
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center gap-4 text-gray-700">
                <Calendar size={20} />
                <div>
                    <p className="text-gray-700 text-sm">Order Date</p>
                    <p className="font-medium">
                        {orderDate
                            ? dayjs(orderDate).format("DD/MM/YYYY")
                            : "Not specified"}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
                <DollarSign size={20} />
                <div>
                    <p className="text-gray-700 text-sm">Currency</p>
                    <p className="font-medium">{getPlaceholder(currency)}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
                <Scale size={20} />
                <div>
                    <p className="text-gray-700 text-sm">
                        Unit of Measurement
                    </p>
                    <p className="font-medium">
                        {getPlaceholder(unitOfMeasurement)}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
                <FileText size={20} />
                <div>
                    <p className="text-gray-700 text-sm">Reason for Export</p>
                    <p className="font-medium">
                        {getPlaceholder(reasonForExport)}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
                <Truck size={20} />
                <div>
                    <p className="text-gray-700 text-sm">Mode of Transport</p>
                    <p className="font-medium">
                        {getPlaceholder(modeOfTransport)}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
                <Globe2 size={20} />
                <div>
                    <p className="text-gray-700 text-sm">Incoterms</p>
                    <p className="font-medium">{getPlaceholder(incoterms)}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
                <PlaneTakeoff size={20} />
                <div>
                    <p className="text-gray-700 text-sm">Air Waybill</p>
                    <p className="font-medium">{getPlaceholder(airwaybill)}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
                <HashIcon size={20} />
                <div>
                    <p className="text-gray-700 text-sm">Reference Number</p>
                    <p className="font-medium">
                        {getPlaceholder(referenceNumber)}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <EditCard title="Order Details" previewContent={previewContent}>
            {editContent}
        </EditCard>
    );
};

export default OrderDetailsTanStack;
