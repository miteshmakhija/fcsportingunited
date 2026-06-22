"""Crop + enhance a portrait photo (keeps it a normal colour photo).

Usage:
    python scripts/enhance.py <input> <output.jpg> [l,t,r,b] [aspect]

[l,t,r,b]  optional side/top trim fractions (e.g. "0.08,0,0.08,0").
[aspect]   optional target width/height ratio (e.g. "0.8" for a 4:5 card).
           When the image is taller than the target, height is cropped from
           the BOTTOM so the head stays fully visible.
"""
import sys

from PIL import Image, ImageOps, ImageEnhance


def enhance(src, dst, crop=(0, 0, 0, 0), aspect=None):
    img = Image.open(src).convert("RGB")

    w, h = img.size
    l, t, r, b = crop
    img = img.crop((int(w * l), int(h * t), int(w * (1 - r)), int(h * (1 - b))))

    if aspect:
        w, h = img.size
        cur = w / h
        if cur > aspect:                       # too wide -> trim sides evenly
            nw = int(h * aspect)
            x0 = (w - nw) // 2
            img = img.crop((x0, 0, x0 + nw, h))
        else:                                  # too tall -> trim bottom, keep head
            nh = int(w / aspect)
            img = img.crop((0, 0, w, nh))

    img = ImageOps.autocontrast(img, cutoff=1)
    img = ImageEnhance.Sharpness(img).enhance(1.6)
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = ImageEnhance.Color(img).enhance(1.12)
    img = ImageEnhance.Brightness(img).enhance(1.03)

    img.save(dst, "JPEG", quality=90)
    print(f"[enhance] wrote {dst} ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("usage: python scripts/enhance.py <input> <output.jpg> [l,t,r,b] [aspect]")
        sys.exit(1)
    crop = (0, 0, 0, 0)
    if len(sys.argv) >= 4 and sys.argv[3]:
        crop = tuple(float(x) for x in sys.argv[3].split(","))
    aspect = float(sys.argv[4]) if len(sys.argv) >= 5 and sys.argv[4] else None
    enhance(sys.argv[1], sys.argv[2], crop, aspect)
