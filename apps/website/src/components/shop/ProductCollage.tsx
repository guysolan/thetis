import {
  type AchillesProduct,
  THETIS_NIGHT_SPLINT_PRODUCT_ID,
} from "@thetis/catalogue";
import { useMemo, useState } from "react";

/** Organic bento tiles — slot count drives selection math. */
const COLLAGE_GRID_PATTERN = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
] as const;

const GRID_SLOT_COUNT = COLLAGE_GRID_PATTERN.length;

function shuffleCopy<T>(array: readonly T[]): T[] {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = out[i]!;
    out[i] = out[j]!;
    out[j] = t;
  }
  return out;
}

/** Essentials first, then remaining Thetis-prefix (non-essential dup pass), capped at `cap`. */
function pickForcedProducts(
  products: AchillesProduct[],
  cap: number,
): AchillesProduct[] {
  const essentials = products.filter((p) => p.priority === "essential");
  const thetisNonEssential = products.filter(
    (p) => p.id.startsWith("thetis-") && p.priority !== "essential",
  );
  const chosen: AchillesProduct[] = [];
  const ids = new Set<string>();
  for (const list of [essentials, thetisNonEssential]) {
    for (const p of list) {
      if (chosen.length >= cap) return chosen;
      if (ids.has(p.id)) continue;
      ids.add(p.id);
      chosen.push(p);
    }
  }
  return chosen;
}

function buildRandomizedCollage(
  products: AchillesProduct[],
): AchillesProduct[] {
  const forcedUnique = pickForcedProducts(products, GRID_SLOT_COUNT);
  const idSetForced = new Set(forcedUnique.map((p) => p.id));
  const extrasPool = shuffleCopy(
    products.filter((p) => !idSetForced.has(p.id)),
  );
  const extraSlots = GRID_SLOT_COUNT - forcedUnique.length;
  const extrasChosen = extrasPool.slice(0, Math.max(0, extraSlots));

  /** Random assignment to grid positions (large / small cells). */
  return shuffleCopy([...forcedUnique, ...extrasChosen]);
}

interface ProductCollageProps {
  products: AchillesProduct[];
}

export default function ProductCollage({ products }: ProductCollageProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const productFingerprint = useMemo(
    () => products.map((p) => p.id).join("\0"),
    [products],
  );

  const displayProducts = useMemo(
    () => buildRandomizedCollage(products),
    [products, productFingerprint],
  );

  const gridPattern = COLLAGE_GRID_PATTERN;

  return (
    <div className="relative p-3 w-full h-full">
      <div className="gap-2 grid grid-cols-4 grid-rows-4 h-full">
        {displayProducts.map((product, index) => {
          const gridClasses = gridPattern[index] || "col-span-1 row-span-1";
          const isLarge = gridClasses.includes("row-span-2");

          const isThetis = product.id.startsWith("thetis-");
          const isEssential = product.priority === "essential";
          const isSplintFill = product.id === THETIS_NIGHT_SPLINT_PRODUCT_ID;

          return (
            <div
              key={product.id}
              className={`${gridClasses} relative group overflow-hidden rounded-xl bg-white dark:bg-neutral-900 border ${
                isThetis
                  ? "border-primary/50 dark:border-primary/60 ring-1 ring-primary/20"
                  : isEssential
                  ? "border-primary/30 dark:border-primary/40"
                  : "border-neutral-200/80 dark:border-neutral-700/80"
              } shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 hover:scale-[1.02]`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative flex flex-col justify-center items-center w-full h-full ${
                  isSplintFill ? "p-0" : "p-3"
                }`}
              >
                {product.imagePath && (
                  <img
                    src={product.imagePath}
                    alt={product.name}
                    className={isSplintFill
                      ? `absolute inset-0 size-full rounded-[inherit] object-cover object-center transition-all duration-300 ${
                        hoveredIndex === index
                          ? "scale-105 brightness-110"
                          : "scale-100"
                      }`
                      : `object-contain max-w-full max-h-full transition-all duration-300 ${
                        hoveredIndex === index
                          ? "scale-110 brightness-110"
                          : "scale-100"
                      }`}
                    loading="lazy"
                  />
                )}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-2 sm:p-3`}
                >
                  <div className="w-full text-white">
                    <p
                      className={`font-semibold ${
                        isLarge ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                      } line-clamp-2`}
                    >
                      {product.name}
                    </p>
                    {isLarge && product.keyBenefit && (
                      <p className="opacity-90 mt-1 text-[10px] sm:text-xs line-clamp-2">
                        {product.keyBenefit}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
