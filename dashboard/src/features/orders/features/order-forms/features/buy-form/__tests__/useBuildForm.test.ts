import {
    calculateRequiredQuantity,
    createServiceItem,
    processComponent,
} from "../useBuyForm";
import { describe, expect, it } from "vitest";

describe("Order Processing Functions", () => {
    describe("calculateRequiredQuantity", () => {
        it("should correctly multiply component and produced quantities", () => {
            expect(calculateRequiredQuantity(2, 3)).toBe(6);
            expect(calculateRequiredQuantity(1.5, 2)).toBe(3);
        });
    });

    describe("createServiceItem", () => {
        it("should create a service item with correct properties", () => {
            const component = {
                component_id: "123",
                component_name: "Test Service",
                component_type: "service" as const,
                component_quantity: 1,
                component_price: 10,
            };

            const result = createServiceItem(component, 2);

            expect(result).toEqual({
                item_id: "123",
                quantity_change: 2,
                item_price: 10,
                item_tax: 0.2,
                item_type: "service",
            });
        });
    });

    describe("processComponent", () => {
        it("should handle service components correctly", () => {
            const serviceComponent = {
                component_id: "123",
                component_name: "Test Service",
                component_type: "service" as const,
                component_quantity: 1,
                component_price: 10,
            };

            const result = processComponent(serviceComponent, 2, []);

            expect(result.consumedItems).toHaveLength(0);
            expect(result.purchaseItems).toHaveLength(1);
            expect(result.purchaseItems[0].item_type).toBe("service");
        });
    });
});
