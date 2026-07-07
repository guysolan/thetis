from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "output" / "Untitled design (12).png"
DST = ROOT / "output" / "Untitled design (12)-rear-pad-removed.png"


def main() -> None:
    image = Image.open(SRC).convert("RGBA")
    patch = Image.new("RGBA", image.size, (255, 255, 255, 0))
    mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(mask)

    # Remove only the visible rear calf pad behind the leg in BAD FIT 1. This is
    # a direct white-background patch in the top-left panel; no labels, layout,
    # other straps, or other panels are touched.
    draw.polygon(
        [(765, 835), (875, 820), (878, 880), (840, 925), (775, 900)],
        fill=255,
    )
    draw.polygon(
        [(845, 862), (880, 885), (860, 990), (835, 975)],
        fill=255,
    )

    mask = mask.filter(ImageFilter.GaussianBlur(2.0))
    patch.putalpha(mask)
    repaired = Image.alpha_composite(image, patch)

    # Restore the original red panel border exactly in case the feathered patch
    # overlapped it by a pixel or two.
    border_strip = image.crop((875, 480, 900, 1315))
    repaired.paste(border_strip, (875, 480))

    repaired.convert("RGB").save(DST)
    print(f"Saved: {DST}")


if __name__ == "__main__":
    main()
