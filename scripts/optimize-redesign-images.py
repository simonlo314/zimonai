"""Re-encode approved assets only; retain originals, aspect ratio and provenance."""
from pathlib import Path
from PIL import Image

assets = Path(__file__).resolve().parents[1] / "src" / "assets"
for name in ("zimonai-shenzhen-reception-lounge", "zimonai-shenzhen-public-meeting-area", "zimonai-shenzhen-reception-desk", "zimonai-t1-sample-report-cover"):
    source = assets / f"{name}.png"
    with Image.open(source) as original:
        for width in (320, 640):
            result = original.convert("RGB")
            result.thumbnail((width, round(width * original.height / original.width)))
            target = assets / f"{name}-{width}.webp"
            result.save(target, "WEBP", quality=84, method=6)
            print(f"{target.name}: {result.width}x{result.height}, {target.stat().st_size} bytes; original {source.stat().st_size} bytes")

# Deterministic compression only. Keep the original photos and their proportions.
for name in ("editorial-power-supply-board", "editorial-chargers-table"):
    source = assets / f"{name}.jpg"
    with Image.open(source) as original:
        for width in (640, 1200):
            target = assets / f"{name}-{width}.webp"
            result = original.convert("RGB")
            result.thumbnail((width, round(width * original.height / original.width)))
            result.save(target, "WEBP", quality=82, method=6)
            print(f"{target.name}: {result.width}x{result.height}, {target.stat().st_size} bytes")
