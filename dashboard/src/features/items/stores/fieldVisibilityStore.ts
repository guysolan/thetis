import { create } from "zustand";

interface FieldVisibility {
    sku: boolean;
    countryOfOrigin: boolean;
    dimensions: boolean;
}

interface FieldVisibilityStore {
    visibility: FieldVisibility;
    toggleField: (field: keyof FieldVisibility, value: boolean) => void;
}

export const useFieldVisibilityStore = create<FieldVisibilityStore>((set) => ({
    visibility: {
        sku: false,
        countryOfOrigin: false,
        dimensions: false,
    },
    toggleField: (field, value) =>
        set((state) => ({
            visibility: {
                ...state.visibility,
                [field]: value,
            },
        })),
}));
