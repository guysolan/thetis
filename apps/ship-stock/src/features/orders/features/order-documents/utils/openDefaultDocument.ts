const documentTypeMap = {
    build: "purchase-order",
    sell: "invoice",
    ship: "commercial-invoice",
    count: "stocktake-report",
};
export const openDefaultDocument = (
    order_id: number,
    order_type: string,
) => {
    const document_type = documentTypeMap[order_type];
    if (!document_type) return;
    window.open(
        `/documents/orders/${order_id}/${document_type}`,
        "_blank",
        "noopener, noreferrer",
    );
};
