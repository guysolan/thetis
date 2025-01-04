import { convertCommaDecimalsInJson, sumValues } from "./utils.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/testing/asserts.ts";

Deno.test("convertCommaDecimalsInJson works for commas", () => {
    const commas = [
        "0,9",
        "0,8",
        "0,7",
        "0,6",
        "0,5",
        "0,4",
        "0,3",
        "0,2",
        "0,1",
        "0",
    ];
    const decimals = convertCommaDecimalsInJson(commas);
    assertEquals(decimals, [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]);
});

Deno.test("convertCommaDecimalsInJson works for decimals", () => {
    const commas = [
        "0.9",
        "0.8",
        "0.7",
        "0.6",
        "0.5",
        "0.4",
        "0.3",
        "0.2",
        "0.1",
        "0",
    ];
    const decimals = convertCommaDecimalsInJson(commas);
    assertEquals(decimals, [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]);
});

Deno.test("sumValues correctly sums an array of numbers", () => {
    const v_values = [1, 2, 3, 4, 5];
    const v_result = sumValues(v_values);
    assertEquals(v_result, 15);
});

Deno.test("sumValues handles an array with non-finite numbers", () => {
    const v_values = [1, 2, undefined, null, 4, Infinity];
    const v_result = sumValues(v_values);
    assertEquals(v_result, 7);
});

Deno.test("sumValues returns 0 for an empty array", () => {
    const v_values: number[] = [];
    const v_result = sumValues(v_values);
    assertEquals(v_result, 0);
});
