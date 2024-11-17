const documentTypeMap = {
    purchase: "purchase-order",
    sale: "invoice",
    shipment: "commercial-invoice",
    stocktake: "stocktake-report",
};
export const openDefaultDocument = (
    order_id: number,
    order_type: string,
) => {
    const document_type = documentTypeMap[order_type];
    window.open(
        `/documents/orders/${order_id}/${document_type}`,
        "_blank",
        "noopener, noreferrer",
    );
};
