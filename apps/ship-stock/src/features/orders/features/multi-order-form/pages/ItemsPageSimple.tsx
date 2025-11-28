import { FormProvider, useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { multiOrderFormSchema as schema } from "../schema";
import StockItems from "../../../components/StockItems";
import PackageStockItems from "../../../components/PackageStockItems";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Badge } from "@thetis/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import { List, Package } from "lucide-react";

type ItemsPageSimpleProps = {
    form: any; // TanStack Form
};

export function ItemsPageSimple({ form }: ItemsPageSimpleProps) {
    const [orderType, setOrderType] = React.useState<string | undefined>(
        undefined,
    );
    const [orderItems, setOrderItems] = React.useState<any[]>([]);
    const [packageItems, setPackageItems] = React.useState<any[]>([]);
    const [mode, setMode] = React.useState<"direct" | "package">("direct");

    // Subscribe to form state
    React.useEffect(() => {
        const unsubscribe = form.store.subscribe(() => {
            const values = form.state.values;
            setOrderType(values.order_type);
            setOrderItems(values.order_items || []);
            setPackageItems(values.package_items || []);
            setMode(values.mode || "direct");
        });
        return unsubscribe;
    }, [form]);

    // Create react-hook-form instance for child components
    const rhfForm = useReactHookForm({
        defaultValues: form.state.values,
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    // Sync TanStack Form to react-hook-form
    const syncingFromTanstack = React.useRef(false);
    const syncingFromRHF = React.useRef(false);

    React.useEffect(() => {
        const unsubscribe = form.store.subscribe(() => {
            if (syncingFromRHF.current) {
                return;
            }
            syncingFromTanstack.current = true;
            rhfForm.reset(form.state.values as any, {
                keepDirty: true,
                keepDirtyValues: true,
                keepErrors: true,
                keepTouched: true,
                keepIsSubmitted: true,
                keepSubmitCount: true,
                keepDefaultValues: true,
            });
            syncingFromTanstack.current = false;
        });
        return unsubscribe;
    }, [form, rhfForm]);

    React.useEffect(() => {
        const subscription = rhfForm.watch((_, info) => {
            const name = info?.name;
            if (!name || syncingFromTanstack.current) {
                return;
            }
            syncingFromRHF.current = true;
            const nextValue = rhfForm.getValues(name as any);
            form.setFieldValue(name as any, nextValue as never, {
                dontValidate: true,
            });
            syncingFromRHF.current = false;
        });
        return () => {
            subscription.unsubscribe?.();
        };
    }, [form, rhfForm]);

    const getOrderTypeLabel = () => {
        switch (orderType) {
            case "sale":
                return "Sale";
            case "purchase":
                return "Purchase";
            case "shipment":
                return "Shipment";
            default:
                return "Order";
        }
    };

    const getInstructions = () => {
        switch (orderType) {
            case "sale":
                return "Add items you're selling to the customer";
            case "purchase":
                return "Add items you're purchasing from the supplier";
            case "shipment":
                return "Add items you're shipping between locations";
            default:
                return "Add items to this order";
        }
    };

    // For shipments, we need to sync to_items changes to from_items (with negative quantities)
    const isShipment = orderType === "shipment";

    // Sync to_items to from_items for shipments in direct mode
    React.useEffect(() => {
        if (!isShipment || mode !== "direct") return;

        const unsubscribe = rhfForm.watch((value, { name: fieldName }) => {
            if (fieldName?.startsWith("to_items")) {
                const toItems = rhfForm.getValues("to_items") || [];
                const fromItems = toItems.map((item) => ({
                    ...item,
                    quantity_change: -Number(item.quantity_change || 0),
                }));
                rhfForm.setValue("from_items", fromItems, {
                    shouldDirty: false,
                    shouldValidate: false,
                });
                // Also sync to TanStack form
                form.setFieldValue("from_items", fromItems, {
                    dontValidate: true,
                });
            }
        });

        return () => unsubscribe.unsubscribe();
    }, [isShipment, mode, rhfForm, form]);

    // Determine which items array and address to use based on order type
    type ItemsToUpdate =
        | "order_items"
        | "produced_items"
        | "from_items"
        | "to_items";

    const getItemsConfig = (): {
        itemsName: string;
        addressName: string;
        fromItemsName?: string;
        fromAddressName?: string;
        packageItemsToUpdate: ItemsToUpdate[];
    } => {
        if (isShipment) {
            return {
                itemsName: "to_items",
                addressName: "to_shipping_address_id",
                fromItemsName: "from_items",
                fromAddressName: "from_shipping_address_id",
                packageItemsToUpdate: ["from_items", "to_items"],
            };
        } else {
            return {
                itemsName: "order_items",
                addressName: "from_shipping_address_id",
                packageItemsToUpdate: ["order_items"],
            };
        }
    };

    const itemsConfig = getItemsConfig();

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-semibold text-xl">Items</h2>
                    <Badge variant="outline">{getOrderTypeLabel()}</Badge>
                </div>
                <p className="text-gray-600 text-sm">{getInstructions()}</p>
            </div>

            <FormProvider {...rhfForm}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs
                            value={mode}
                            onValueChange={(value) => {
                                form.setFieldValue(
                                    "mode",
                                    value as "direct" | "package",
                                );
                            }}
                        >
                            <TabsList className="grid grid-cols-2 mb-4 w-full">
                                <TabsTrigger
                                    value="direct"
                                    className="flex items-center gap-2"
                                >
                                    <List size={16} />
                                    <span>Individual Items</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="package"
                                    className="flex items-center gap-2"
                                >
                                    <Package size={16} />
                                    <span>Package Mode</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="direct" className="mt-0">
                                <div className="space-y-4">
                                    <p className="text-gray-600 text-sm">
                                        Add individual items one by one
                                    </p>
                                    <StockItems
                                        name={itemsConfig.itemsName}
                                        address_name={itemsConfig.addressName}
                                        showPrice={true}
                                        showTax={true}
                                    />
                                    {isShipment && itemsConfig.fromItemsName &&
                                        (
                                            <StockItems
                                                name={itemsConfig.fromItemsName}
                                                address_name={itemsConfig
                                                    .fromAddressName}
                                                readOnly={true}
                                                showPrice={false}
                                                showTax={false}
                                            />
                                        )}
                                </div>
                            </TabsContent>

                            <TabsContent value="package" className="mt-0">
                                <div className="space-y-4">
                                    <p className="text-gray-600 text-sm">
                                        Add pre-configured packages that contain
                                        multiple items
                                    </p>
                                    <PackageStockItems
                                        itemsToUpdate={itemsConfig
                                            .packageItemsToUpdate}
                                    />
                                    {isShipment && (
                                        <>
                                            <StockItems
                                                name="to_items"
                                                address_name="to_shipping_address_id"
                                                showPrice={true}
                                                showTax={true}
                                                allowedTypes={[
                                                    "product",
                                                    "part",
                                                ]}
                                                packageMode={true}
                                            />
                                            <StockItems
                                                name="from_items"
                                                address_name="from_shipping_address_id"
                                                readOnly={true}
                                                showPrice={false}
                                                showTax={false}
                                                allowedTypes={[
                                                    "product",
                                                    "part",
                                                ]}
                                                packageMode={true}
                                            />
                                        </>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </FormProvider>
        </div>
    );
}
