import { Button } from "@thetis/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import { Switch } from "@thetis/ui/switch";
import { Settings } from "lucide-react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { DocumentOptions, InvoiceOptions } from "../schema";
import { packingListSchema } from "../schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@thetis/ui/accordion";

type DocumentType =
  | "commercialInvoice"
  | "purchaseOrder"
  | "invoice"
  | "packingList"
  | "shippingLabel";

const DocumentOptionsPopover = ({
  documentType,
}: { documentType: DocumentType }) => {
  const search = useSearch({ from: "/documents" }) as Partial<DocumentOptions>;
  const navigate = useNavigate();

  // Get current values with sensible defaults
  const initialOptions = {
    shippingDetails: {
      show: search?.shippingDetails?.show ?? true,
      reasonForExport: search?.shippingDetails?.reasonForExport ?? true,
      modeOfTransport: search?.shippingDetails?.modeOfTransport ?? true,
      incoterms: search?.shippingDetails?.incoterms ?? true,
      unitOfMeasurement: search?.shippingDetails?.unitOfMeasurement ?? true,
      shipmentNumber: search?.shippingDetails?.shipmentNumber ?? true,
      airwaybill: search?.shippingDetails?.airwaybill ?? true,
      referenceNumber: search?.shippingDetails?.referenceNumber ?? true,
    },
    showShippingItems: search?.showShippingItems ?? true,
    total: search?.total ?? true,
    showCarriage:
      search?.showCarriage ??
      (documentType === "invoice" || documentType === "commercialInvoice"),
    showPackages: search?.showPackages ?? documentType === "packingList",
    from: {
      show: search?.from?.show ?? true,
      billing: search?.from?.billing ?? true,
      shipping: search?.from?.shipping ?? true,
      contact: search?.from?.contact ?? true,
    },
    to: {
      show: search?.to?.show ?? true,
      billing: search?.to?.billing ?? true,
      shipping: search?.to?.shipping ?? true,
      contact: search?.to?.contact ?? true,
    },
    payment:
      search?.payment ??
      (documentType === "invoice" || documentType === "commercialInvoice"),
    showExporterDetails:
      search?.showExporterDetails ?? documentType === "commercialInvoice",
    showFDADetails:
      search?.showFDADetails ?? documentType === "commercialInvoice",
    showExchangeRates:
      search?.showExchangeRates ?? documentType === "commercialInvoice",
    showSignature: search?.showSignature ?? true,
  };

  // Local state for pending changes
  const [pendingOptions, setPendingOptions] = useState(initialOptions);
  const [hasChanges, setHasChanges] = useState(false);

  // Update hasChanges whenever pendingOptions or initialOptions change
  useEffect(() => {
    const hasPendingChanges =
      JSON.stringify(pendingOptions) !== JSON.stringify(initialOptions);
    setHasChanges(hasPendingChanges);
  }, [pendingOptions, initialOptions]);

  const updateOption = (key: string, value: boolean) => {
    setPendingOptions((prev) => {
      const newOptions = { ...prev };

      if (key.includes(".")) {
        const [parent, child] = key.split(".");

        if (parent === "shippingDetails") {
          newOptions.shippingDetails = {
            ...newOptions.shippingDetails,
            [child]: value,
          };
        } else if (parent === "from") {
          newOptions.from = { ...newOptions.from, [child]: value };
        } else if (parent === "to") {
          newOptions.to = { ...newOptions.to, [child]: value };
        }

        // Handle special cases
        if (key === "shippingDetails.show" && !value) {
          newOptions.shippingDetails = {
            ...newOptions.shippingDetails,
            show: false,
            reasonForExport: false,
            modeOfTransport: false,
            incoterms: false,
            unitOfMeasurement: false,
            shipmentNumber: false,
            airwaybill: false,
            referenceNumber: false,
          };
        }
        if (key === "from.show" && !value) {
          newOptions.from = {
            ...newOptions.from,
            show: false,
            billing: false,
            shipping: false,
            contact: false,
          };
        }
        if (key === "to.show" && !value) {
          newOptions.to = {
            ...newOptions.to,
            show: false,
            billing: false,
            shipping: false,
            contact: false,
          };
        }
      } else {
        // Handle direct boolean properties
        if (key === "payment") newOptions.payment = value;
        else if (key === "total") newOptions.total = value;
        else if (key === "showSignature") newOptions.showSignature = value;
        else if (key === "showPackages") newOptions.showPackages = value;
        else if (key === "showShippingItems")
          newOptions.showShippingItems = value;
        else if (key === "showExporterDetails")
          newOptions.showExporterDetails = value;
        else if (key === "showFDADetails") newOptions.showFDADetails = value;
        else if (key === "showExchangeRates")
          newOptions.showExchangeRates = value;
        else if (key === "showCarriage") newOptions.showCarriage = value;
      }

      return newOptions;
    });
  };

  const saveChanges = () => {
    // Create a new search object with proper types
    const newSearch = {
      shippingDetails: {
        show: pendingOptions.shippingDetails.show,
        reasonForExport: pendingOptions.shippingDetails.reasonForExport,
        modeOfTransport: pendingOptions.shippingDetails.modeOfTransport,
        incoterms: pendingOptions.shippingDetails.incoterms,
        unitOfMeasurement: pendingOptions.shippingDetails.unitOfMeasurement,
        shipmentNumber: pendingOptions.shippingDetails.shipmentNumber,
        airwaybill: pendingOptions.shippingDetails.airwaybill,
        referenceNumber: pendingOptions.shippingDetails.referenceNumber,
      },
      from: {
        show: pendingOptions.from.show,
        billing: pendingOptions.from.billing,
        shipping: pendingOptions.from.shipping,
        contact: pendingOptions.from.contact,
      },
      to: {
        show: pendingOptions.to.show,
        billing: pendingOptions.to.billing,
        shipping: pendingOptions.to.shipping,
        contact: pendingOptions.to.contact,
      },
      payment: pendingOptions.payment,
      total: pendingOptions.total,
      showSignature: pendingOptions.showSignature,
      showPackages: pendingOptions.showPackages,
      showShippingItems: pendingOptions.showShippingItems,
      showExporterDetails: pendingOptions.showExporterDetails,
      showFDADetails: pendingOptions.showFDADetails,
      showExchangeRates: pendingOptions.showExchangeRates,
      showCarriage: pendingOptions.showCarriage,
    };

    // Navigate with the new search params
    navigate({
      search: newSearch,
    });
  };

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

        {/* Quick Access Controls */}
        <div className="space-y-2 pb-3 border-b">
          <div className="flex justify-between items-center">
            <label className="text-sm">Total Amount</label>
            <Switch
              checked={pendingOptions.total}
              onCheckedChange={(checked) => updateOption("total", checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm">Carriage</label>
            <Switch
              checked={pendingOptions.showCarriage}
              onCheckedChange={(checked) =>
                updateOption("showCarriage", checked)
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm">Shipping Items List</label>
            <Switch
              checked={pendingOptions.showShippingItems}
              onCheckedChange={(checked) =>
                updateOption("showShippingItems", checked)
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm">Package Summary</label>
            <Switch
              checked={pendingOptions.showPackages}
              onCheckedChange={(checked) =>
                updateOption("showPackages", checked)
              }
            />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="shipping-details">
            <AccordionTrigger className="font-medium text-sm">
              Shipping Details
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm">Show Section</label>
                  <Switch
                    checked={pendingOptions.shippingDetails.show}
                    onCheckedChange={(checked) =>
                      updateOption("shippingDetails.show", checked)
                    }
                  />
                </div>
                {pendingOptions.shippingDetails.show && (
                  <div className="space-y-2 pl-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Reason for Export</label>
                      <Switch
                        checked={pendingOptions.shippingDetails.reasonForExport}
                        onCheckedChange={(checked) =>
                          updateOption(
                            "shippingDetails.reasonForExport",
                            checked,
                          )
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Mode of Transport</label>
                      <Switch
                        checked={pendingOptions.shippingDetails.modeOfTransport}
                        onCheckedChange={(checked) =>
                          updateOption(
                            "shippingDetails.modeOfTransport",
                            checked,
                          )
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Incoterms</label>
                      <Switch
                        checked={pendingOptions.shippingDetails.incoterms}
                        onCheckedChange={(checked) =>
                          updateOption("shippingDetails.incoterms", checked)
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Unit of Measurement</label>
                      <Switch
                        checked={
                          pendingOptions.shippingDetails.unitOfMeasurement
                        }
                        onCheckedChange={(checked) =>
                          updateOption(
                            "shippingDetails.unitOfMeasurement",
                            checked,
                          )
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Shipment Number</label>
                      <Switch
                        checked={pendingOptions.shippingDetails.shipmentNumber}
                        onCheckedChange={(checked) =>
                          updateOption(
                            "shippingDetails.shipmentNumber",
                            checked,
                          )
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Airwaybill</label>
                      <Switch
                        checked={pendingOptions.shippingDetails.airwaybill}
                        onCheckedChange={(checked) =>
                          updateOption("shippingDetails.airwaybill", checked)
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Reference Number</label>
                      <Switch
                        checked={pendingOptions.shippingDetails.referenceNumber}
                        onCheckedChange={(checked) =>
                          updateOption(
                            "shippingDetails.referenceNumber",
                            checked,
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="from-section">
            <AccordionTrigger className="font-medium text-sm">
              From Section
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm">Show Section</label>
                  <Switch
                    checked={pendingOptions.from.show}
                    onCheckedChange={(checked) =>
                      updateOption("from.show", checked)
                    }
                  />
                </div>
                {pendingOptions.from.show && (
                  <div className="space-y-2 pl-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Billing Address</label>
                      <Switch
                        checked={pendingOptions.from.billing}
                        onCheckedChange={(checked) =>
                          updateOption("from.billing", checked)
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Shipping Address</label>
                      <Switch
                        checked={pendingOptions.from.shipping}
                        onCheckedChange={(checked) =>
                          updateOption("from.shipping", checked)
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Contact Details</label>
                      <Switch
                        checked={pendingOptions.from.contact}
                        onCheckedChange={(checked) =>
                          updateOption("from.contact", checked)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="to-section">
            <AccordionTrigger className="font-medium text-sm">
              To Section
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm">Show Section</label>
                  <Switch
                    checked={pendingOptions.to.show}
                    onCheckedChange={(checked) =>
                      updateOption("to.show", checked)
                    }
                  />
                </div>
                {pendingOptions.to.show && (
                  <div className="space-y-2 pl-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Billing Address</label>
                      <Switch
                        checked={pendingOptions.to.billing}
                        onCheckedChange={(checked) =>
                          updateOption("to.billing", checked)
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Shipping Address</label>
                      <Switch
                        checked={pendingOptions.to.shipping}
                        onCheckedChange={(checked) =>
                          updateOption("to.shipping", checked)
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Contact Details</label>
                      <Switch
                        checked={pendingOptions.to.contact}
                        onCheckedChange={(checked) =>
                          updateOption("to.contact", checked)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="additional-options">
            <AccordionTrigger className="font-medium text-sm">
              Additional Options
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm">Payment Details</label>
                  <Switch
                    checked={pendingOptions.payment}
                    onCheckedChange={(checked) =>
                      updateOption("payment", checked)
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm">Exporter Details</label>
                  <Switch
                    checked={pendingOptions.showExporterDetails}
                    onCheckedChange={(checked) =>
                      updateOption("showExporterDetails", checked)
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm">FDA Details</label>
                  <Switch
                    checked={pendingOptions.showFDADetails}
                    onCheckedChange={(checked) =>
                      updateOption("showFDADetails", checked)
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm">Exchange Rates</label>
                  <Switch
                    checked={pendingOptions.showExchangeRates}
                    onCheckedChange={(checked) =>
                      updateOption("showExchangeRates", checked)
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm">Signature</label>
                  <Switch
                    checked={pendingOptions.showSignature}
                    onCheckedChange={(checked) =>
                      updateOption("showSignature", checked)
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex gap-2 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPendingOptions(initialOptions)}
            disabled={!hasChanges}
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={saveChanges}
            disabled={!hasChanges}
            className="flex-1"
          >
            Save Changes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DocumentOptionsPopover;
