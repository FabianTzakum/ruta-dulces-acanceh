from __future__ import annotations

import shutil
import tkinter as tk
from pathlib import Path
from tkinter import filedialog, messagebox, ttk
from typing import Tuple

from PIL import Image, ImageTk


APP_TITLE = "Preparador de marcadores - Ruta de los Dulces"

MARKER_PRESETS = {
    "Con dulces": {
        "filename": "marker-with-candies.png",
        "size": 96,
        "padding": 18,
    },
    "Pocos dulces": {
        "filename": "marker-few-candies.png",
        "size": 96,
        "padding": 18,
    },
    "Sin dulces": {
        "filename": "marker-no-candies.png",
        "size": 96,
        "padding": 18,
    },
    "Evento activo": {
        "filename": "marker-event-active.png",
        "size": 128,
        "padding": 12,
    },
}

LIGHT_ALPHA_THRESHOLD = 246
SATURATION_THRESHOLD = 18


class MarkerMakerApp:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title(APP_TITLE)
        self.root.geometry("860x640")
        self.root.minsize(820, 600)

        self.input_path = tk.StringVar()
        self.output_dir = tk.StringVar(value=str(Path.cwd() / "public" / "markers"))
        self.marker_type = tk.StringVar(value="Evento activo")
        self.frames = tk.IntVar(value=8)
        self.frame_index = tk.IntVar(value=3)
        self.size = tk.IntVar(value=128)
        self.padding = tk.IntVar(value=12)
        self.remove_checkerboard = tk.BooleanVar(value=True)
        self.no_trim = tk.BooleanVar(value=False)

        self.preview_image: ImageTk.PhotoImage | None = None
        self.output_preview_image: ImageTk.PhotoImage | None = None

        self.build_ui()
        self.apply_preset()

    def build_ui(self) -> None:
        container = ttk.Frame(self.root, padding=18)
        container.pack(fill="both", expand=True)

        title = ttk.Label(
            container,
            text="Preparar PNG para MapLibre",
            font=("Segoe UI", 18, "bold"),
        )
        title.pack(anchor="w")

        subtitle = ttk.Label(
            container,
            text="Selecciona tu imagen o spritesheet, elige el marcador y genera el PNG optimizado.",
        )
        subtitle.pack(anchor="w", pady=(4, 16))

        main = ttk.Frame(container)
        main.pack(fill="both", expand=True)

        form = ttk.Frame(main)
        form.pack(side="left", fill="y", padx=(0, 18))

        preview = ttk.Frame(main)
        preview.pack(side="right", fill="both", expand=True)

        self.build_form(form)
        self.build_preview(preview)

    def build_form(self, parent: ttk.Frame) -> None:
        parent.columnconfigure(1, weight=1)

        ttk.Label(parent, text="Archivo original").grid(row=0, column=0, sticky="w", pady=(0, 6))

        input_entry = ttk.Entry(parent, textvariable=self.input_path, width=42)
        input_entry.grid(row=1, column=0, columnspan=2, sticky="ew")

        ttk.Button(parent, text="Seleccionar archivo", command=self.select_input_file).grid(
            row=2,
            column=0,
            columnspan=2,
            sticky="ew",
            pady=(8, 16),
        )

        ttk.Label(parent, text="Carpeta de salida").grid(row=3, column=0, sticky="w", pady=(0, 6))

        output_entry = ttk.Entry(parent, textvariable=self.output_dir, width=42)
        output_entry.grid(row=4, column=0, columnspan=2, sticky="ew")

        ttk.Button(parent, text="Seleccionar carpeta", command=self.select_output_dir).grid(
            row=5,
            column=0,
            columnspan=2,
            sticky="ew",
            pady=(8, 16),
        )

        ttk.Label(parent, text="Tipo de marcador").grid(row=6, column=0, sticky="w", pady=(0, 6))

        marker_combo = ttk.Combobox(
            parent,
            textvariable=self.marker_type,
            values=list(MARKER_PRESETS.keys()),
            state="readonly",
        )
        marker_combo.grid(row=7, column=0, columnspan=2, sticky="ew")
        marker_combo.bind("<<ComboboxSelected>>", lambda _event: self.apply_preset())

        ttk.Label(parent, text="Frames").grid(row=8, column=0, sticky="w", pady=(16, 6))
        ttk.Spinbox(parent, from_=1, to=64, textvariable=self.frames, width=10).grid(
            row=8,
            column=1,
            sticky="ew",
            pady=(16, 6),
        )

        ttk.Label(parent, text="Frame a usar").grid(row=9, column=0, sticky="w", pady=(0, 6))
        ttk.Spinbox(parent, from_=0, to=63, textvariable=self.frame_index, width=10).grid(
            row=9,
            column=1,
            sticky="ew",
            pady=(0, 6),
        )

        ttk.Label(parent, text="Tamaño final").grid(row=10, column=0, sticky="w", pady=(0, 6))
        ttk.Spinbox(parent, from_=32, to=512, increment=8, textvariable=self.size, width=10).grid(
            row=10,
            column=1,
            sticky="ew",
            pady=(0, 6),
        )

        ttk.Label(parent, text="Padding").grid(row=11, column=0, sticky="w", pady=(0, 6))
        ttk.Spinbox(parent, from_=0, to=80, textvariable=self.padding, width=10).grid(
            row=11,
            column=1,
            sticky="ew",
            pady=(0, 6),
        )

        ttk.Checkbutton(
            parent,
            text="Quitar checkerboard/fondo claro",
            variable=self.remove_checkerboard,
        ).grid(row=12, column=0, columnspan=2, sticky="w", pady=(12, 4))

        ttk.Checkbutton(
            parent,
            text="No recortar transparencia",
            variable=self.no_trim,
        ).grid(row=13, column=0, columnspan=2, sticky="w", pady=(0, 16))

        ttk.Button(parent, text="Vista previa", command=self.preview_output).grid(
            row=14,
            column=0,
            columnspan=2,
            sticky="ew",
            pady=(0, 8),
        )

        ttk.Button(parent, text="Generar PNG optimizado", command=self.generate_marker).grid(
            row=15,
            column=0,
            columnspan=2,
            sticky="ew",
        )

        ttk.Separator(parent).grid(row=16, column=0, columnspan=2, sticky="ew", pady=18)

        ttk.Label(parent, text="Nombres que usará el mapa:", font=("Segoe UI", 10, "bold")).grid(
            row=17,
            column=0,
            columnspan=2,
            sticky="w",
        )

        names = "\n".join(
            [
                "marker-with-candies.png",
                "marker-few-candies.png",
                "marker-no-candies.png",
                "marker-event-active.png",
            ]
        )

        ttk.Label(parent, text=names).grid(row=18, column=0, columnspan=2, sticky="w", pady=(6, 0))

    def build_preview(self, parent: ttk.Frame) -> None:
        parent.columnconfigure(0, weight=1)
        parent.rowconfigure(1, weight=1)
        parent.rowconfigure(3, weight=1)

        ttk.Label(parent, text="Vista original", font=("Segoe UI", 12, "bold")).grid(
            row=0,
            column=0,
            sticky="w",
        )

        self.original_canvas = tk.Canvas(parent, height=210, bg="#17132f", highlightthickness=0)
        self.original_canvas.grid(row=1, column=0, sticky="nsew", pady=(8, 18))

        ttk.Label(parent, text="Salida optimizada", font=("Segoe UI", 12, "bold")).grid(
            row=2,
            column=0,
            sticky="w",
        )

        self.output_canvas = tk.Canvas(parent, height=260, bg="#17132f", highlightthickness=0)
        self.output_canvas.grid(row=3, column=0, sticky="nsew", pady=(8, 0))

    def apply_preset(self) -> None:
        preset = MARKER_PRESETS.get(self.marker_type.get())

        if not preset:
            return

        self.size.set(int(preset["size"]))
        self.padding.set(int(preset["padding"]))

    def select_input_file(self) -> None:
        selected = filedialog.askopenfilename(
            title="Seleccionar imagen o spritesheet",
            filetypes=[
                ("Imágenes", "*.png *.jpg *.jpeg *.webp"),
                ("PNG", "*.png"),
                ("Todos", "*.*"),
            ],
        )

        if not selected:
            return

        self.input_path.set(selected)
        self.show_original_preview(Path(selected))

    def select_output_dir(self) -> None:
        selected = filedialog.askdirectory(
            title="Seleccionar carpeta de salida",
            initialdir=self.output_dir.get() or str(Path.cwd()),
        )

        if not selected:
            return

        self.output_dir.set(selected)

    def show_original_preview(self, path: Path) -> None:
        try:
            image = Image.open(path).convert("RGBA")
            preview = self.make_preview_image(image, 560, 200)
            self.preview_image = ImageTk.PhotoImage(preview)

            self.original_canvas.delete("all")
            self.original_canvas.create_image(
                self.original_canvas.winfo_width() // 2 or 280,
                105,
                image=self.preview_image,
                anchor="center",
            )
        except Exception as exc:
            messagebox.showerror("Error", f"No se pudo cargar la imagen:\n{exc}")

    def preview_output(self) -> None:
        try:
            output = self.process_current_image()
            preview = self.make_preview_image(output, 260, 240)
            self.output_preview_image = ImageTk.PhotoImage(preview)

            self.output_canvas.delete("all")
            self.output_canvas.create_image(
                self.output_canvas.winfo_width() // 2 or 260,
                130,
                image=self.output_preview_image,
                anchor="center",
            )
        except Exception as exc:
            messagebox.showerror("Error", f"No se pudo generar vista previa:\n{exc}")

    def generate_marker(self) -> None:
        try:
            output = self.process_current_image()
            output_dir = Path(self.output_dir.get())
            output_dir.mkdir(parents=True, exist_ok=True)

            preset = MARKER_PRESETS[self.marker_type.get()]
            filename = str(preset["filename"])
            output_path = output_dir / filename

            output.save(output_path, format="PNG", optimize=True, compress_level=9)

            self.preview_output()

            size_kb = output_path.stat().st_size / 1024

            messagebox.showinfo(
                "PNG generado",
                f"Archivo generado correctamente:\n\n{output_path}\n\nPeso: {size_kb:.2f} KB",
            )
        except Exception as exc:
            messagebox.showerror("Error", f"No se pudo generar el marcador:\n{exc}")

    def process_current_image(self) -> Image.Image:
        input_value = self.input_path.get().strip()

        if not input_value:
            raise ValueError("Selecciona primero una imagen.")

        input_path = Path(input_value)

        if not input_path.exists():
            raise FileNotFoundError(f"No existe el archivo:\n{input_path}")

        image = Image.open(input_path).convert("RGBA")

        image = extract_frame(
            image=image,
            frames=max(1, int(self.frames.get())),
            frame_index=max(0, int(self.frame_index.get())),
        )

        if self.remove_checkerboard.get():
            image = remove_checkerboard_background(image)

        if not self.no_trim.get():
            image = trim_transparent(image)

        image = fit_on_square_canvas(
            image=image,
            size=max(32, int(self.size.get())),
            padding=max(0, int(self.padding.get())),
        )

        return image

    @staticmethod
    def make_preview_image(image: Image.Image, max_width: int, max_height: int) -> Image.Image:
        image = image.convert("RGBA")
        copy = image.copy()
        copy.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)

        canvas = Image.new("RGBA", (max_width, max_height), (23, 19, 47, 255))
        x = (max_width - copy.width) // 2
        y = (max_height - copy.height) // 2
        canvas.alpha_composite(copy, (x, y))

        return canvas


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

    if frame_index >= frames:
        raise ValueError(f"El frame seleccionado debe estar entre 0 y {frames - 1}.")

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

    if width <= 0 or height <= 0:
        raise ValueError("La imagen no tiene tamaño válido.")

    scale = min(available / width, available / height)

    next_width = max(1, int(width * scale))
    next_height = max(1, int(height * scale))

    resized = image.resize((next_width, next_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 0))

    x = (size - next_width) // 2
    y = size - next_height - padding

    canvas.alpha_composite(resized, (x, y))

    return canvas


def ensure_output_folder() -> None:
    default_dir = Path.cwd() / "public" / "markers"
    default_dir.mkdir(parents=True, exist_ok=True)


def main() -> None:
    ensure_output_folder()

    root = tk.Tk()
    app = MarkerMakerApp(root)

    icon_path = Path.cwd() / "public" / "markers"

    if icon_path.exists():
        pass

    root.mainloop()


if __name__ == "__main__":
    main()
