import asyncio
import sys
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "playwright"])
    subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
    from playwright.async_api import async_playwright

CAROUSEL_INFO = {"file": "carousel-skolyoz.html", "dir": "slides/skolyoz", "slides": 7}

VIEW_W = 420
VIEW_H = 525
SCALE = 1080 / 420

async def export_carousel():
    input_html = Path(CAROUSEL_INFO["file"])
    if not input_html.exists():
        print(f"Hata: {input_html} bulunamadı!")
        return

    output_dir = Path(CAROUSEL_INFO["dir"])
    output_dir.mkdir(parents=True, exist_ok=True)
    total_slides = CAROUSEL_INFO["slides"]

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={"width": 800, "height": 900},
            device_scale_factor=SCALE
        )

        file_uri = input_html.resolve().as_uri()
        await page.goto(file_uri, wait_until="networkidle")
        await page.wait_for_timeout(3000)

        viewport_locator = page.locator('.carousel-viewport')

        for i in range(total_slides):
            await page.evaluate("""(idx) => {
                const track = document.querySelector('.carousel-track');
                if (track) {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
                }
            }""", i)
            await page.wait_for_timeout(300)

            output_path = output_dir / f"slide_{i+1}.png"
            await viewport_locator.screenshot(path=str(output_path))
            print(f"Aktarıldı: slide_{i+1}.png -> {output_path}")

        await browser.close()
        print("\nSkolyoz carouseli kusursuz 1080x1350px PNG olarak export edildi!")

if __name__ == "__main__":
    asyncio.run(export_carousel())
