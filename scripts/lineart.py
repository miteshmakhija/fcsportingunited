"""Convert a photo into a clean line-art / pencil-sketch portrait.

Usage:
    python scripts/lineart.py <input> <output.png> [l,t,r,b] [blur]

Optional crop is given as four fractions (left,top,right,bottom) to trim,
e.g. "0.15,0.05,0.15,0" removes 15% from each side and 5% from the top —
useful to drop the shoulders and centre the face. Crop runs before the
line-art conversion so the output stays high resolution.
"""
import sys

from PIL import Image, ImageOps, ImageFilter, ImageMath, ImageChops, ImageEnhance

# Pillow renamed eval -> unsafe_eval in recent versions.
_eval = getattr(ImageMath, "unsafe_eval", getattr(ImageMath, "eval", None))


def to_line_art(src, dst, crop=(0, 0, 0, 0), blur_radius=9):
    img = Image.open(src).convert("RGB")

    # Crop (left, top, right, bottom fractions) before conversion.
    w, h = img.size
    l, t, r, b = crop
    img = img.crop((int(w * l), int(h * t), int(w * (1 - r)), int(h * (1 - b))))

    gray = ImageOps.grayscale(img)
    gray = ImageOps.autocontrast(gray, cutoff=2)

    # Pencil-sketch base via colour-dodge of an inverted blur.
    inverted = ImageOps.invert(gray)
    blurred = inverted.filter(ImageFilter.GaussianBlur(blur_radius))
    sketch = _eval("convert(min(a * 255 / (256 - b), 255), 'L')", a=gray, b=blurred)

    # Edge emphasis for crisper outlines.
    edges = gray.filter(ImageFilter.FIND_EDGES)
    edges = ImageOps.invert(edges)               # dark lines on white
    edges = ImageOps.autocontrast(edges, cutoff=1)

    combined = ImageChops.multiply(sketch, edges)     # darken along edges
    out = Image.blend(sketch, combined, 0.55)
    out = ImageEnhance.Contrast(out).enhance(1.35)
    out = ImageOps.autocontrast(out, cutoff=1)

    out.save(dst, "PNG")
    print(f"[lineart] wrote {dst} ({out.size[0]}x{out.size[1]})")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("usage: python scripts/lineart.py <input> <output.png> [l,t,r,b] [blur]")
        sys.exit(1)
    crop = (0, 0, 0, 0)
    if len(sys.argv) >= 4 and sys.argv[3]:
        crop = tuple(float(x) for x in sys.argv[3].split(","))
    blur = int(sys.argv[4]) if len(sys.argv) >= 5 else 9
    to_line_art(sys.argv[1], sys.argv[2], crop, blur)
