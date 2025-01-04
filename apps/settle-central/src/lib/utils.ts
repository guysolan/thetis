import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as changeCase from "change-case";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectKeysToSnakeCase<T extends object>(
  in_obj: T,
): { [K: string]: any } {
  if (Array.isArray(in_obj)) {
    return in_obj.map((v_item) =>
      v_item && typeof v_item === "object"
        ? objectKeysToSnakeCase(v_item)
        : v_item
    );
  }

  const v_result: { [K: string]: any } = {};

  for (const [v_key, v_value] of Object.entries(in_obj)) {
    const v_camelKey = changeCase.snakeCase(v_key);
    v_result[v_camelKey] = v_value && typeof v_value === "object"
      ? objectKeysToSnakeCase(v_value)
      : v_value;
  }

  return v_result;
}
