import React from "react";

const OrderDescription = ({
  orderDate,
  orderId,
  currency,
  deliveryDates,
}: {
  orderDate: string;
  orderId: number;
  currency: string;
  deliveryDates?: string | null;
}) => {
  // Parse delivery dates if it's a JSON string array
  const parseDeliveryDates = (
    jsonString: string | null,
  ): [string | null, string | null] | null => {
    if (!jsonString) return null;

    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length === 2) {
        return [parsed[0] || null, parsed[1] || null];
      }
    } catch (error) {
      console.warn("Failed to parse delivery dates:", error);
    }

    return null;
  };

  const deliveryDateRange = parseDeliveryDates(deliveryDates ?? null);
  const hasDeliveryDates = deliveryDateRange &&
    (deliveryDateRange[0] || deliveryDateRange[1]);

  // Format delivery date range
  const formatDeliveryDates = () => {
    if (!deliveryDateRange) return "";

    const [startDate, endDate] = deliveryDateRange;

    if (startDate && endDate) {
      return `${new Date(startDate).toLocaleDateString()} - ${
        new Date(endDate).toLocaleDateString()
      }`;
    } else if (startDate) {
      return `from ${new Date(startDate).toLocaleDateString()}`;
    } else if (endDate) {
      return `by ${new Date(endDate).toLocaleDateString()}`;
    }

    return "";
  };

  return (
    <section>
      <p>
        <strong>Date:</strong> {new Date(orderDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Order Number:</strong> #{orderId.toString().padStart(4, "0")}
      </p>
      {hasDeliveryDates && (
        <p>
          <strong>Delivery Date:</strong> {formatDeliveryDates()}
        </p>
      )}
      <p>
        <strong>Currency:</strong> {currency}
      </p>
    </section>
  );
};

export default OrderDescription;
