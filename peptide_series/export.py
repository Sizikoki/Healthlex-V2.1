# peptide_series/export.py
import asyncio
import json
import os
import sys
from pathlib import Path
from playwright.async_api import async_playwright

CURRENT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(CURRENT_DIR.parent))

from peptide_series.template import render_slide_4x5, render_slide_9x16, wrap_html

OUTPUT_4X5 = CURRENT_DIR / "output_4x5"
OUTPUT_9X16 = CURRENT_DIR / "output_9x16"
DATA_DIR = CURRENT_DIR / "data"

OUTPUT_4X5.mkdir(parents=True, exist_ok=True)
OUTPUT_9X16.mkdir(parents=True, exist_ok=True)

async def export_series(json_filename="icerik01_peptit_nedir.json"):
    data_path = DATA_DIR / json_filename
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    series_id = data.get("series_id", "icerik01")
    total_slides = data.get("total_slides", 7)
    slides = data.get("slides", [])

    print(f"=== [Peptit Serisi] Dışa Aktarım Başlıyor: {series_id} ({len(slides)} Sayfa Test) ===")

    # 1. 4:5 Formatı HTML
    slides_4x5_html = [render_slide_4x5(s, total_slides=total_slides) for s in slides]
    html_4x5 = wrap_html(slides_4x5_html, 540, 675, title=f"{series_id} - 4:5 Post")
    html_4x5_path = OUTPUT_4X5 / "index.html"
    html_4x5_path.write_text(html_4x5, encoding="utf-8")

    # 2. 9:16 Formatı HTML
    slides_9x16_html = [render_slide_9x16(s) for s in slides]
    html_9x16 = wrap_html(slides_9x16_html, 540, 960, title=f"{series_id} - 9:16 Reels")
    html_9x16_path = OUTPUT_9X16 / "index.html"
    html_9x16_path.write_text(html_9x16, encoding="utf-8")

    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Render 4:5 (540x675 @ 2x = 1080x1350)
        print("  -> 4:5 Post formatı aktarılıyor (1080x1350)...")
        page_4x5 = await browser.new_page(
            viewport={"width": 540, "height": 675},
            device_scale_factor=2.0
        )
        await page_4x5.set_content(html_4x5, wait_until="networkidle")
        await page_4x5.wait_for_timeout(2000)

        for idx, slide in enumerate(slides):
            num = slide.get("slide_number", idx + 1)
            await page_4x5.evaluate(f"document.getElementById('track').style.transform = 'translateX({-idx * 540}px)'")
            await page_4x5.wait_for_timeout(300)
            img_bytes = await page_4x5.screenshot(clip={"x": 0, "y": 0, "width": 540, "height": 675})
            
            out_file = OUTPUT_4X5 / f"{series_id}_gonderi_{num:02d}.png"
            for _ in range(5):
                try:
                    with open(out_file, "wb") as f_out:
                        f_out.write(img_bytes)
                    break
                except OSError:
                    await asyncio.sleep(0.3)
            print(f"     [4:5] Sayfa {num} tamamlandı -> {out_file.name}")
        await page_4x5.close()

        # Render 9:16 (540x960 @ 2x = 1080x1920)
        print("  -> 9:16 Reels formatı aktarılıyor (1080x1920)...")
        page_9x16 = await browser.new_page(
            viewport={"width": 540, "height": 960},
            device_scale_factor=2.0
        )
        await page_9x16.set_content(html_9x16, wait_until="networkidle")
        await page_9x16.wait_for_timeout(2000)

        for idx, slide in enumerate(slides):
            num = slide.get("slide_number", idx + 1)
            await page_9x16.evaluate(f"document.getElementById('track').style.transform = 'translateX({-idx * 540}px)'")
            await page_9x16.wait_for_timeout(300)
            img_bytes = await page_9x16.screenshot(clip={"x": 0, "y": 0, "width": 540, "height": 960})
            
            out_file = OUTPUT_9X16 / f"{series_id}_video_{num:02d}.png"
            for _ in range(5):
                try:
                    with open(out_file, "wb") as f_out:
                        f_out.write(img_bytes)
                    break
                except OSError:
                    await asyncio.sleep(0.3)
            print(f"     [9:16] Sayfa {num} tamamlandı -> {out_file.name}")
        await page_9x16.close()

        await browser.close()
    
    print("=== Dışa aktarım başarıyla tamamlandı! ===")

if __name__ == "__main__":
    asyncio.run(export_series())
