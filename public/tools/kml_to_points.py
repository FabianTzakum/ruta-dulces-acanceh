import json
import re
import unicodedata
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path

NS = {"k": "http://www.opengis.net/kml/2.2"}

def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = "".join(char for char in value if not unicodedata.combining(char))
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    return value or "punto"

def map_category(folder_name: str):
    folder_name = folder_name.upper()
    if "NEGOCIO" in folder_name:
        return "business", "Negocio"
    if "CASA" in folder_name:
        return "house", "Casa"
    if "INSTITUC" in folder_name:
        return "institution", "Institución pública"
    return "business", "Negocio"

def convert(kml_path: str, output_path: str):
    root = ET.parse(kml_path).getroot()
    points = []
    slug_counts = defaultdict(int)
    status_cycle = [
        ("available", "Disponible", "high"),
        ("available", "Disponible", "medium"),
        ("available", "Disponible", "high"),
        ("low", "Quedan pocos", "low"),
        ("unknown", "Sin actualizar", "unknown"),
    ]

    point_id = 1

    for folder in root.findall(".//k:Folder", NS):
        folder_name = folder.findtext("k:name", default="", namespaces=NS).strip()
        category, category_label = map_category(folder_name)

        for placemark in folder.findall("k:Placemark", NS):
            name = placemark.findtext("k:name", default="", namespaces=NS).strip()
            coordinates = placemark.findtext(".//k:coordinates", default="", namespaces=NS).strip()

            if not name or not coordinates:
                continue

            lng, lat, *_ = coordinates.split()[0].split(",")
            base_slug = slugify(name)
            slug_counts[base_slug] += 1
            slug = base_slug if slug_counts[base_slug] == 1 else f"{base_slug}-{slug_counts[base_slug]}"

            status, status_label, candies_level = status_cycle[(point_id - 1) % len(status_cycle)]

            points.append({
                "id": point_id,
                "slug": slug,
                "name": name,
                "category": category,
                "category_label": category_label,
                "status": status,
                "status_label": status_label,
                "candies_level": candies_level,
                "short_description": f"Punto participante de la Ruta de los Dulces Acanceh.",
                "description": "Datos descriptivos temporales hasta que el administrador cargue la información oficial.",
                "address": "Acanceh, Yucatán",
                "lat": round(float(lat), 7),
                "lng": round(float(lng), 7),
                "main_image": "",
                "gallery": [],
                "google_maps_url": f"https://www.google.com/maps/search/?api=1&query={float(lat):.7f},{float(lng):.7f}",
                "updated_at": "2026-10-31T18:30:00-06:00",
                "has_event": False
            })

            point_id += 1

    Path(output_path).write_text(json.dumps(points, ensure_ascii=False, indent=2), encoding="utf-8")

if __name__ == "__main__":
    convert("Ruta de los Dulces Acanceh 2025 2a Ed.kml", "points-v1.json")
