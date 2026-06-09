import { describe, expect, it } from "vitest";
import {
  NIGHT_SPLINT_PRODUCT_ID,
  THETIS_ORG_ID,
  THETIS_WEBSITE_ID,
  buildPageGraphSchema,
  buildShopConditionPageGraphSchema,
} from "./thetis-graph";

describe("buildPageGraphSchema", () => {
  it("links WebPage to site graph ids and optional main entity", () => {
    const graph = buildPageGraphSchema({
      lang: "en",
      title: "Achilles Tendon Rupture Splint",
      description: "Night splint for Achilles rupture recovery.",
      pageUrl: "https://thetismedical.com/splint/",
      mainEntityId: NIGHT_SPLINT_PRODUCT_ID,
      breadcrumbItems: [
        { name: "Home", item: "https://thetismedical.com/" },
        {
          name: "Achilles Tendon Rupture Splint",
          item: "https://thetismedical.com/splint/",
        },
      ],
    });

    const types = graph["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(["WebPage", "BreadcrumbList"]);

    const webPage = graph["@graph"][0];
    expect(webPage.isPartOf).toEqual({ "@id": THETIS_WEBSITE_ID });
    expect(webPage.about).toEqual({ "@id": THETIS_ORG_ID });
    expect(webPage.mainEntity).toEqual({ "@id": NIGHT_SPLINT_PRODUCT_ID });
    expect(webPage.url).toBe("https://thetismedical.com/splint/");
  });
});

describe("buildShopConditionPageGraphSchema", () => {
  it("includes WebPage and BreadcrumbList linked to site graph ids", () => {
    const graph = buildShopConditionPageGraphSchema({
      lang: "en",
      conditionId: "plantar-fasciitis",
      title: "Plantar fasciitis — shop",
      description: "Curated plantar fasciitis recovery gear.",
      pageUrl: "https://thetismedical.com/shop/plantar-fasciitis/",
    });

    const types = graph["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(["WebPage", "BreadcrumbList"]);

    const webPage = graph["@graph"][0];
    expect(webPage.isPartOf).toEqual({ "@id": THETIS_WEBSITE_ID });
    expect(webPage.about).toEqual({ "@id": THETIS_ORG_ID });
    expect(webPage.url).toBe(
      "https://thetismedical.com/shop/plantar-fasciitis/",
    );

    const breadcrumb = graph["@graph"][1];
    expect(breadcrumb.itemListElement).toHaveLength(3);
    expect(breadcrumb.itemListElement?.[1]?.name).toBe("Shop");
  });

  it("adds night splint Product schema on achilles rupture shop hub", () => {
    const graph = buildShopConditionPageGraphSchema({
      lang: "en",
      conditionId: "achilles-rupture",
      title: "Achilles rupture — shop",
      description: "Patented night splint and curated recovery gear.",
      pageUrl: "https://thetismedical.com/shop/achilles-rupture/",
    });

    const product = graph["@graph"].find((node) => node["@type"] === "Product");
    expect(product?.name).toBe("Achilles Rupture Night Splint");
    expect(product?.aggregateRating).toMatchObject({
      "@type": "AggregateRating",
      reviewCount: "303",
      ratingValue: "4.1",
    });
  });
});
