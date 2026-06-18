from __future__ import annotations

import argparse
from pathlib import Path
from typing import Tuple

from PIL import Image


LIGHT_ALPHA_THRESHOLD = 246
SATURATION_THRESHOLD = 18


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Prepara un PNG optimizado para markers de MapLibre."
    )

    parser.add_argument(
        "--input",
        required=True,
        help="Ruta de la imagen original. Puede ser PNG normal o spritesheet horizontal.",
    )

    parser.add_argument(
        "--output",
        required=True,
        help="Ruta de salida del PNG optimizado.",
    )

    parser.add_argument(
        "--size",
        type=int,
        default=96,
        help="Tamaño final cuadrado en px. Recomendado: 96 para puntos, 128 para evento.",
    )

    parser.add_argument(
        "--frames",
        type=int,
        default=1,
        help="Cantidad de frames si es spritesheet horizontal.",
    )

    parser.add_argument(
        "--frame-index",
        type=int,
        default=0,
        help="Frame a extraer si es spritesheet. Empieza en 0.",
    )

    parser.add_argument(
        "--padding",
        type=int,
        default=8,
        help="Padding interno final en px.",
    )

    parser.add_argument(
        "--remove-checkerboard",
        action="store_true",
        help="Intenta eliminar fondo tipo checkerboard claro dibujado.",
    )

    parser.add_argument(
        "--no-trim",
        action="store_true",
        help="No recorta bordes transparentes.",
    )

    return parser.parse_args()


def is_light_low_saturation(pixel: Tuple[int, int, int, int]) -> bool:
    r, g, b, a = pixel

    if a == 0:
        return True

    max_channel = max(r, g, b)
    min_channel = min(r, g, b)
    saturation = max_channel - min_channel

    return max_channel >= LIGHT_ALPHA_THRESHOLD and saturation <= SATURATION_THRESHOLD


def remove_checkerboard_background(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    pixels = image.load()

    width, height = image.size

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]

            if is_light_low_saturation((r, g, b, a)):
                pixels[x, y] = (255, 255, 255, 0)

    return image


def extract_frame(image: Image.Image, frames: int, frame_index: int) -> Image.Image:
    if frames <= 1:
        return image

    if frame_index < 0 or frame_index >= frames:
        raise ValueError(f"frame-index debe estar entre 0 y {frames - 1}")

    frame_width = image.width // frames
    left = frame_width * frame_index
    right = left + frame_width

    return image.crop((left, 0, right, image.height))


def trim_transparent(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()

    if bbox is None:
        return image

    return image.crop(bbox)


def fit_on_square_canvas(image: Image.Image, size: int, padding: int) -> Image.Image:
    image = image.convert("RGBA")

    available = max(1, size - (padding * 2))

    width, height = image.size
    scale = min(available / width, available / height)

    next_width = max(1, int(width * scale))
    next_height = max(1, int(height * scale))

    resized = image.resize((next_width, next_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 0))

    x = (size - next_width) // 2
    y = size - next_height - padding

    canvas.alpha_composite(resized, (x, y))

    return canvas


def save_optimized_png(image: Image.Image, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    image.save(
        output_path,
        format="PNG",
        optimize=True,
        compress_level=9,
    )


def main() -> None:
    args = parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        raise FileNotFoundError(f"No existe el archivo: {input_path}")

    image = Image.open(input_path).convert("RGBA")

    image = extract_frame(image, args.frames, args.frame_index)

    if args.remove_checkerboard:
        image = remove_checkerboard_background(image)

    if not args.no_trim:
        image = trim_transparent(image)

    image = fit_on_square_canvas(
        image=image,
        size=args.size,
        padding=args.padding,
    )

    save_optimized_png(image, output_path)

    original_kb = input_path.stat().st_size / 1024
    output_kb = output_path.stat().st_size / 1024

    print("Marker generado correctamente")
    print(f"Entrada: {input_path}")
    print(f"Salida:  {output_path}")
    print(f"Tamaño final: {args.size}x{args.size}px")
    print(f"Peso original: {original_kb:.2f} KB")
    print(f"Peso salida:   {output_kb:.2f} KB")


if __name__ == "__main__":
    main()
