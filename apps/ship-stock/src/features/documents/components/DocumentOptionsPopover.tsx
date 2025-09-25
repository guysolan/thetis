import { Button } from "@thetis/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@thetis/ui/sheet";
import { Switch } from "@thetis/ui/switch";
import { Settings } from "lucide-react";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { DocumentOptions, InvoiceOptions } from "../schema";
import { packingListSchema } from "../schema";
import {
  getAvailablePaymentMethods,
  getPaymentMethodDisplayName,
  PAYMENT_METHODS,
} from "../../orders/features/order-documents/components/PaymentDetails";
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

const DocumentOptionsSheet = ({
  documentType,
  currency,
}: { documentType: DocumentType; currency?: string }) => {
  const search = useSearch({ strict: false }) as Partial<DocumentOptions>;
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
    showItemsManifest: (search as any)?.showItemsManifest ?? true,
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
    payment: {
      show: search?.payment?.show ??
        (documentType === "invoice" || documentType === "commercialInvoice"),
      paymentMethods: Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map((method) => [
          method,
          search?.payment?.paymentMethods?.[method] ?? true,
        ]),
      ),
    },
    showExporterDetails: search?.showExporterDetails ??
      documentType === "commercialInvoice",
    showFDADetails: search?.showFDADetails ??
      documentType === "commercialInvoice",
    showExchangeRates: search?.showExchangeRates ??
      documentType === "commercialInvoice",
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
        } else if (parent === "paymentMethods") {
          newOptions.payment.paymentMethods = {
            ...newOptions.payment.paymentMethods,
            [child]: value,
          };
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
        if (key === "payment") {
          newOptions.payment.show = value;
        } else if (key.startsWith("paymentMethods.")) {
          const methodName = key.replace("paymentMethods.", "");
          newOptions.payment.paymentMethods = {
            ...newOptions.payment.paymentMethods,
            [methodName]: value,
          };
        } else if (key === "showSignature") newOptions.showSignature = value;
        else if (key === "showPackages") newOptions.showPackages = value;
        else if (key === "showShippingItems") {
          newOptions.showShippingItems = value;
        } else if (key === "showItemsManifest") {
          newOptions.showItemsManifest = value;
        } else if (key === "showExporterDetails") {
          newOptions.showExporterDetails = value;
        } else if (key === "showFDADetails") newOptions.showFDADetails = value;
        else if (key === "showExchangeRates") {
          newOptions.showExchangeRates = value;
        }
      }

      return newOptions;
    });
  };

  const saveChanges = () => {
    // Force TypeScript to accept our navigation by using @ts-ignore
    navigate({
      // @ts-ignore - TanStack Router complex typing issue
      search: pendingOptions,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          onClick={(e) => e.stopPropagation()}
          variant="outline"
          size="icon"
        >
          <Settings size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[500px]">
        <SheetHeader className="mb-4 pb-4 border-b">
          <SheetTitle>Document Options</SheetTitle>
          <SheetDescription>
            Customize what information appears on your document
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 mb-4">
          {/* Quick Access Controls */}
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="quick-options"
          >
            <AccordionItem value="quick-options">
              <AccordionTrigger className="font-medium text-sm">
                Quick Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">
                      Items
                    </label>
                    <Switch
                      checked={pendingOptions.showItemsManifest}
                      onCheckedChange={(checked) =>
                        updateOption("showItemsManifest", checked)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">
                      Items with Pricing
                    </label>
                    <Switch
                      checked={pendingOptions.showShippingItems}
                      onCheckedChange={(checked) =>
                        updateOption("showShippingItems", checked)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">
                      Package Summary
                    </label>
                    <Switch
                      checked={pendingOptions.showPackages}
                      onCheckedChange={(checked) =>
                        updateOption("showPackages", checked)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping-details">
              <AccordionTrigger className="font-medium text-sm">
                Shipping Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm underline">Show Section</label>
                    <Switch
                      checked={pendingOptions.shippingDetails.show}
                      onCheckedChange={(checked) =>
                        updateOption("shippingDetails.show", checked)}
                    />
                  </div>
                  {pendingOptions.shippingDetails.show && (
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Reason for Export</label>
                        <Switch
                          checked={pendingOptions.shippingDetails
                            .reasonForExport}
                          onCheckedChange={(checked) =>
                            updateOption(
                              "shippingDetails.reasonForExport",
                              checked,
                            )}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Mode of Transport</label>
                        <Switch
                          checked={pendingOptions.shippingDetails
                            .modeOfTransport}
                          onCheckedChange={(checked) =>
                            updateOption(
                              "shippingDetails.modeOfTransport",
                              checked,
                            )}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Incoterms</label>
                        <Switch
                          checked={pendingOptions.shippingDetails.incoterms}
                          onCheckedChange={(checked) =>
                            updateOption(
                              "shippingDetails.incoterms",
                              checked,
                            )}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">
                          Unit of Measurement
                        </label>
                        <Switch
                          checked={pendingOptions.shippingDetails
                            .unitOfMeasurement}
                          onCheckedChange={(checked) =>
                            updateOption(
                              "shippingDetails.unitOfMeasurement",
                              checked,
                            )}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Shipment Number</label>
                        <Switch
                          checked={pendingOptions.shippingDetails
                            .shipmentNumber}
                          onCheckedChange={(checked) =>
                            updateOption(
                              "shippingDetails.shipmentNumber",
                              checked,
                            )}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Airwaybill</label>
                        <Switch
                          checked={pendingOptions.shippingDetails
                            .airwaybill}
                          onCheckedChange={(checked) =>
                            updateOption(
                              "shippingDetails.airwaybill",
                              checked,
                            )}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Reference Number</label>
                        <Switch
                          checked={pendingOptions.shippingDetails
                            .referenceNumber}
                          onCheckedChange={(checked) =>
                            updateOption(
                              "shippingDetails.referenceNumber",
                              checked,
                            )}
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
                    <label className="text-sm underline">Show Section</label>
                    <Switch
                      checked={pendingOptions.from.show}
                      onCheckedChange={(checked) =>
                        updateOption("from.show", checked)}
                    />
                  </div>
                  {pendingOptions.from.show && (
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Billing Address</label>
                        <Switch
                          checked={pendingOptions.from.billing}
                          onCheckedChange={(checked) =>
                            updateOption("from.billing", checked)}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Shipping Address</label>
                        <Switch
                          checked={pendingOptions.from.shipping}
                          onCheckedChange={(checked) =>
                            updateOption("from.shipping", checked)}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Contact Details</label>
                        <Switch
                          checked={pendingOptions.from.contact}
                          onCheckedChange={(checked) =>
                            updateOption("from.contact", checked)}
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
                    <label className="text-sm underline">Show Section</label>
                    <Switch
                      checked={pendingOptions.to.show}
                      onCheckedChange={(checked) =>
                        updateOption("to.show", checked)}
                    />
                  </div>
                  {pendingOptions.to.show && (
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Billing Address</label>
                        <Switch
                          checked={pendingOptions.to.billing}
                          onCheckedChange={(checked) =>
                            updateOption("to.billing", checked)}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Shipping Address</label>
                        <Switch
                          checked={pendingOptions.to.shipping}
                          onCheckedChange={(checked) =>
                            updateOption("to.shipping", checked)}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Contact Details</label>
                        <Switch
                          checked={pendingOptions.to.contact}
                          onCheckedChange={(checked) =>
                            updateOption("to.contact", checked)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-details">
              <AccordionTrigger className="font-medium text-sm">
                Payment Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm underline">
                      Show Section
                    </label>
                    <Switch
                      checked={pendingOptions.payment.show}
                      onCheckedChange={(checked) =>
                        updateOption("payment", checked)}
                    />
                  </div>
                  {pendingOptions.payment.show && (
                    <div className="space-y-2 pl-4">
                      {Object.entries(pendingOptions.payment.paymentMethods)
                        .map((
                          [method, enabled],
                        ) => (
                          <div
                            key={method}
                            className="flex justify-between items-center"
                          >
                            <label className="text-sm">
                              {getPaymentMethodDisplayName(
                                method as keyof typeof PAYMENT_METHODS,
                              )}
                            </label>
                            <Switch
                              checked={enabled}
                              onCheckedChange={(checked) =>
                                updateOption(
                                  `paymentMethods.${method}`,
                                  checked,
                                )}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="exporter-details">
              <AccordionTrigger className="font-medium text-sm">
                Exporter Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm underline">
                      Show Section
                    </label>
                    <Switch
                      checked={pendingOptions.showExporterDetails}
                      onCheckedChange={(checked) =>
                        updateOption("showExporterDetails", checked)}
                    />
                  </div>
                  {pendingOptions.showExporterDetails && (
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">FDA Details</label>
                        <Switch
                          checked={pendingOptions.showFDADetails}
                          onCheckedChange={(checked) =>
                            updateOption("showFDADetails", checked)}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Exchange Rates</label>
                        <Switch
                          checked={pendingOptions.showExchangeRates}
                          onCheckedChange={(checked) =>
                            updateOption("showExchangeRates", checked)}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Signature</label>
                        <Switch
                          checked={pendingOptions.showSignature}
                          onCheckedChange={(checked) =>
                            updateOption("showSignature", checked)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Fixed bottom buttons */}
        <SheetFooter>
          <Button
            variant="outline"
            onClick={() => setPendingOptions(initialOptions)}
            disabled={!hasChanges}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            onClick={saveChanges}
            disabled={!hasChanges}
            className="flex-1"
          >
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DocumentOptionsSheet;
