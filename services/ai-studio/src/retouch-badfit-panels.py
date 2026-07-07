from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output"


def inpaint_polygons(src_name: str, dst_name: str, polygons: list[list[tuple[int, int]]]) -> None:
    src = OUT / src_name
    dst = OUT / dst_name
    image = cv2.imread(str(src), cv2.IMREAD_COLOR)
    if image is None:
        raise FileNotFoundError(src)

    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    for points in polygons:
        cv2.fillPoly(mask, [np.array(points, dtype=np.int32)], 255)

    # Telea inpainting is deterministic and only uses nearby pixels, avoiding a
    # generative image pass while removing the small unwanted components.
    retouched = cv2.inpaint(image, mask, 7, cv2.INPAINT_TELEA)
    cv2.imwrite(str(dst), retouched)
    print(f"Saved: {dst}")


def main() -> None:
    inpaint_polygons(
        "panel-toolow-photo-v1.png",
        "panel-toolow-photo-v2.png",
        [
            # Rear calf pad/rail only, at the far back edge of the leg.
            [(982, 190), (1024, 174), (1024, 650), (970, 700), (972, 560), (1010, 440), (976, 300)],
            [(938, 420), (1024, 365), (1024, 610), (946, 660)],
        ],
    )
    inpaint_polygons(
        "panel-toohigh-photo-v1.png",
        "panel-toohigh-photo-v2.png",
        [
            # Middle shin strap only. Top strap, foot strap and ankle/heel strap remain.
            [(560, 286), (760, 360), (706, 492), (512, 420)],
            [(606, 320), (810, 396), (750, 512), (560, 444)],
        ],
    )


if __name__ == "__main__":
    main()
