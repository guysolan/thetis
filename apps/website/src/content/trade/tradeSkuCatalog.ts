/** Trade page SKU / GTIN reference (Amazon EU listings). */

export type TradeSkuRow = {
  productName: string;
  sku: string;
  gtin: string;
};

export const tradeSkuCatalog: TradeSkuRow[] = [
  {
    productName: "Achilles Tendon Rupture Splint Right Large",
    sku: "TM-ATRNS-LR",
    gtin: "B09N5MVY1Q",
  },
  {
    productName: "Achilles Tendon Rupture Splint Left Large",
    sku: "TM-ATRNS-LL",
    gtin: "B09N5HBBKQ",
  },
  {
    productName: "Achilles Tendon Rupture Splint Right Small",
    sku: "TM-ATRNS-SR",
    gtin: "B09N58H79F",
  },
  {
    productName: "Achilles Tendon Rupture Splint Left Small",
    sku: "TM-ATRNS-SL",
    gtin: "B09N5KH4F3",
  },
];
