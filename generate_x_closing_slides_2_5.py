import asyncio
import base64
import json
import shutil
from pathlib import Path
from playwright.async_api import async_playwright

BASE_DIR = Path(__file__).resolve().parent
VIDEO_OUTPUT_9X16 = BASE_DIR / "video_output_9x16"
DESKTOP_DIR = Path(r"C:\Users\cicek\OneDrive\Desktop")
REELS_DIR = DESKTOP_DIR / "Instagram_Video_Slaytlar" / "9x16_Reels_Formati"
ARTIFACTS_DIR = Path(r"C:\Users\cicek\.gemini\antigravity\brain\c15f47f7-e2d8-4bfd-bcfb-f955194ae309")
GALLERY_FILE = DESKTOP_DIR / "Video_Gorselleri_Galerisi.html"

# Brand assets & colors
LOGO_FILE = BASE_DIR / "frontend" / "public" / "logo-mark.png"
LOGO_B64 = f"data:image/png;base64,{base64.b64encode(LOGO_FILE.read_bytes()).decode('ascii')}"

BG_TURQUOISE = "#0b5f5c"
ACCENT_TURQUOISE = "#5eead4"
CARD_LIGHT = "#ffffff"
ACCENT_LIGHT = "#0f766e"

SLIDES_DATA = [
    {
        "content_num": 2,
        "title": "Terimleri ezberlemeden çözmeye devam et!",
        "filename": "icerik2_video_07_x.png"
    },
    {
        "content_num": 3,
        "title": "Bu istisnaları daha önce duymuş muydun?",
        "filename": "icerik3_video_07_x.png"
    },
    {
        "content_num": 4,
        "title": "Bu 3 adımlı altın kuralı unutma!",
        "filename": "icerik4_video_07_x.png"
    },
    {
        "content_num": 5,
        "title": "Doğru telaffuz klinikte özgüven kazandırır.",
        "filename": "icerik5_video_07_x.png"
    }
]

def get_header(scale=1.25):
    size = int(28 * scale)
    font_size = int(22 * scale)
    return f"""
    <div style="display:flex;align-items:center;gap:{int(11 * scale)}px;">
      <img src="{LOGO_B64}" alt="HealthLexMed Logo" style="width:{size}px;height:{size}px;object-fit:contain;" />
      <div style="font-size:{font_size}px;font-weight:900;letter-spacing:-0.3px;line-height:1;font-family:'Nunito',sans-serif;">
        <span style="color:#ffffff;">Health</span><span style="color:#5eead4;font-family:'Nunito',serif;font-style:italic;font-weight:800;">Lex</span><span style="color:#ffffff;">Med</span>
      </div>
    </div>
    """

def get_arrow_down_icon(color="#0f766e", size=24):
    """Clean single-color stroke down arrow (Feather/Lucide style)."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>"""

def render_slide_html(slide_info):
    title = slide_info["title"]
    # Exact 1:1 layout from icerik1_video_07_x.png
    return f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:420px;height:640px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center;z-index:2;box-sizing:border-box;">
        
        <!-- Top: Logo -->
        <div style="display:flex;justify-content:center;width:100%;">
          {get_header(scale=1.25)}
        </div>

        <!-- Middle: Badge + Title + White Box (Vertically Centered & Balanced) -->
        <div style="margin:auto 0;width:100%;display:flex;flex-direction:column;align-items:center;">
          <div style="display:inline-block;font-size:13.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_TURQUOISE};background:rgba(255,255,255,0.12);padding:7px 18px;border-radius:24px;text-transform:uppercase;margin-bottom:20px;">
            TIBBİ TERMİNOLOJİ SERİSİ
          </div>

          <h2 style="font-size:38px;font-weight:900;line-height:1.24;margin:0 0 32px 0;letter-spacing:-0.6px;color:#FFFFFF;max-width:390px;">
            {title}
          </h2>

          <!-- White Box: Single line with downward arrow icon -->
          <div style="background:{CARD_LIGHT};border-radius:18px;padding:18px 22px;box-shadow:0 12px 30px rgba(0,0,0,0.25);display:inline-flex;align-items:center;justify-content:center;gap:10px;width:92%;box-sizing:border-box;">
            {get_arrow_down_icon(color=ACCENT_LIGHT, size=24)}
            <span style="font-size:20.5px;font-weight:900;color:{ACCENT_LIGHT};letter-spacing:-0.3px;white-space:nowrap;">Rehberin linki ilk yanıtta</span>
          </div>
        </div>

        <!-- Bottom spacer to maintain exact vertical centering within safe zone -->
        <div style="height:32px;width:100%;"></div>

      </div>
    </div>
    """

def get_page_html(slides_list):
    rendered_slides = "\n".join(render_slide_html(s) for s in slides_list)
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>X (Twitter) Kapanış Slaytları</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    }}
    body {{
      background: #000000;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }}
    .track {{
      display: flex;
      flex-direction: row;
      width: {len(slides_list) * 540}px;
      height: 960px;
      transition: transform 0.2s ease;
    }}
    .slide {{
      width: 540px;
      height: 960px;
      flex-shrink: 0;
    }}
  </style>
</head>
<body>
  <div class="track" id="track">
    {rendered_slides}
  </div>
</body>
</html>"""

async def export_slides():
    print("Exporting X 9:16 Closing Slides for Content 2, 3, 4, 5 (1080x1920)...")
    html_content = get_page_html(SLIDES_DATA)
    temp_html = BASE_DIR / "x_temp_export_2_5.html"
    temp_html.write_text(html_content, encoding="utf-8")

    exported_files = []

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={"width": 540, "height": 960},
            device_scale_factor=2.0,
        )
        await page.set_content(temp_html.read_text(encoding="utf-8"), wait_until="networkidle")
        await page.wait_for_timeout(2000)

        for i, s in enumerate(SLIDES_DATA):
            await page.evaluate(f"document.getElementById('track').style.transform = 'translateX({-i * 540}px)'")
            await page.wait_for_timeout(300)
            img_bytes = await page.screenshot(clip={"x": 0, "y": 0, "width": 540, "height": 960})

            fname = s["filename"]
            target_local = VIDEO_OUTPUT_9X16 / fname
            with open(target_local, "wb") as f:
                f.write(img_bytes)
            print(f"  Exported -> {fname}")
            exported_files.append((target_local, fname, s))

        await page.close()
        await browser.close()

    temp_html.unlink(missing_ok=True)
    return exported_files

def copy_to_destinations(exported_files):
    for target_local, fname, s in exported_files:
        c_num = s["content_num"]
        # Copy to Desktop Reels folder
        if REELS_DIR.exists():
            shutil.copy2(target_local, REELS_DIR / fname)
            sub_folder = REELS_DIR / f"Icerik_{c_num}"
            if sub_folder.exists():
                shutil.copy2(target_local, sub_folder / fname)
        # Copy to Artifacts folder
        if ARTIFACTS_DIR.exists():
            shutil.copy2(target_local, ARTIFACTS_DIR / fname)

    print("All X slides copied to desktop and artifact directories!")

def update_gallery(exported_files):
    cards_html = []
    images_dict = {}
    all_ids = []

    for target_local, fname, s in exported_files:
        c_num = s["content_num"]
        title = s["title"]
        b64 = f"data:image/png;base64,{base64.b64encode(target_local.read_bytes()).decode('ascii')}"

        card_id = f"x_c{c_num}_video_07"
        all_ids.append(card_id)
        images_dict[card_id] = {
            "title": f"İçerik {c_num} • Kapanış (X Sürümü)",
            "filename": fname,
            "b64": b64
        }

        cards_html.append(f"""
        <div class="card" id="card-{card_id}">
          <div class="card-header">
            <div style="display:flex;flex-direction:column;gap:2px;">
              <span class="card-content-badge">İÇERİK {c_num} • KAPANIR (SAYFA 7)</span>
              <span class="card-title" title="{title}">{title}</span>
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
              <span class="card-tag" style="background:rgba(255, 255, 255, 0.12);color:#FFFFFF;border:1px solid rgba(255, 255, 255, 0.25);">X (Twitter) Sürümü</span>
              <span class="card-badge">9:16 • 1080×1920</span>
            </div>
          </div>
          <div class="card-img-wrap">
            <img src="{b64}" alt="{fname}" onclick="openModal('{card_id}')" />
          </div>
          <div class="card-footer">
            <div style="display:flex;flex-direction:column;gap:2px;">
              <span class="card-filename">{fname}</span>
              <span style="font-size:11.5px;color:#5eead4;font-weight:700;">⬇️ "Rehberin linki ilk yanıtta"</span>
            </div>
            <div style="display:flex;gap:8px;">
              <button onclick="openModal('{card_id}')" class="btn-preview">Büyüt</button>
              <a href="{b64}" download="{fname}" class="btn-download">İndir (PNG)</a>
            </div>
          </div>
        </div>
        """)

    cards_str = "".join(cards_html)
    images_json_str = json.dumps(images_dict)
    all_ids_json_str = json.dumps(all_ids)

    gallery_html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HealthLexMed — İçerik 2-5 X Kapanış Kareleri (4 Görsel)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: 'Nunito', sans-serif; }}
    body {{
      background: #090e1a;
      color: #F8FAFC;
      padding: 36px 20px 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }}
    .header {{
      text-align: center;
      margin-bottom: 32px;
      max-width: 820px;
    }}
    .header h1 {{
      font-size: 30px;
      font-weight: 900;
      letter-spacing: -0.5px;
      margin-bottom: 10px;
      color: #5eead4;
    }}
    .header p {{
      font-size: 15px;
      font-weight: 600;
      color: #94A3B8;
      line-height: 1.6;
    }}
    .badge-info {{
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(94, 234, 212, 0.12);
      border: 1px solid rgba(94, 234, 212, 0.3);
      padding: 7px 18px;
      border-radius: 24px;
      color: #5eead4;
      font-weight: 800;
      font-size: 13.5px;
      margin-top: 14px;
    }}

    .gallery-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 28px;
      max-width: 1300px;
      width: 100%;
    }}

    .card {{
      background: #141d2e;
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      box-shadow: 0 14px 34px rgba(0,0,0,0.45);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }}
    .card:hover {{
      transform: translateY(-4px);
      border-color: rgba(94, 234, 212, 0.4);
    }}

    .card-header {{
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1a253a;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }}
    .card-content-badge {{
      font-size: 11px;
      font-weight: 800;
      color: #5eead4;
      letter-spacing: 0.6px;
    }}
    .card-title {{
      font-size: 14px;
      font-weight: 800;
      color: #F1F5F9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
    }}
    .card-tag {{
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 10px;
      font-weight: 800;
    }}
    .card-badge {{
      font-size: 11px;
      background: rgba(255, 255, 255, 0.08);
      color: #CBD5E1;
      padding: 4px 10px;
      border-radius: 10px;
      font-weight: 700;
    }}

    .card-img-wrap {{
      background: #060a12;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      min-height: 480px;
    }}
    .card-img-wrap img {{
      max-width: 100%;
      height: auto;
      max-height: 520px;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: 0 8px 26px rgba(0,0,0,0.6);
      transition: transform 0.2s ease;
    }}
    .card-img-wrap img:hover {{
      transform: scale(1.02);
    }}

    .card-footer {{
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1a253a;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }}
    .card-filename {{
      font-size: 12.5px;
      color: #E2E8F0;
      font-family: monospace;
      font-weight: 700;
    }}
    .btn-preview {{
      background: rgba(255, 255, 255, 0.08);
      color: #E2E8F0;
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .btn-preview:hover {{
      background: rgba(255, 255, 255, 0.16);
      color: #FFF;
    }}
    .btn-download {{
      background: #0f766e;
      color: #FFFFFF;
      text-decoration: none;
      padding: 7px 16px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      transition: background 0.2s;
    }}
    .btn-download:hover {{ background: #115e59; }}

    /* Modal / Lightbox */
    .modal {{
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(3, 6, 12, 0.95);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }}
    .modal.active {{ display: flex; }}
    .modal-content {{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 95vw;
      max-height: 95vh;
    }}
    .modal img {{
      max-height: 85vh;
      max-width: 90vw;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.95);
      object-fit: contain;
    }}
    .modal-info {{
      margin-top: 14px;
      color: #E2E8F0;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 16px;
    }}
    .modal-close {{
      position: absolute;
      top: 20px;
      right: 28px;
      font-size: 38px;
      color: #FFF;
      cursor: pointer;
      font-weight: 300;
      user-select: none;
      transition: color 0.2s;
    }}
    .modal-close:hover {{ color: #5eead4; }}
    .modal-nav {{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFF;
      font-size: 26px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s;
    }}
    .modal-nav:hover {{
      background: #0f766e;
      border-color: #5eead4;
    }}
    .modal-prev {{ left: 24px; }}
    .modal-next {{ right: 24px; }}
  </style>
</head>
<body>

  <div class="header">
    <h1>X (Twitter) Kapanış Kareleri (İçerik 2, 3, 4 ve 5)</h1>
    <p>İçerik 1 X karesiyle birebir aynı düzende; soru/açıklama satırı ve alt ikon satırı kaldırılmış, "Rehberin linki ilk yanıtta" kutusuyla üretilen 4 yeni kapanış karesi.</p>
    <div class="badge-info">
      <span>✨ Yalnızca Bu 4 Yeni Görsel Gösteriliyor</span>
    </div>
  </div>

  <div class="gallery-grid">
    {cards_str}
  </div>

  <!-- Lightbox Modal -->
  <div class="modal" id="modal" onclick="closeModal()">
    <span class="modal-close" onclick="closeModal()">&times;</span>
    <div class="modal-nav modal-prev" onclick="navModal(-1, event)">&#10094;</div>
    <div class="modal-nav modal-next" onclick="navModal(1, event)">&#10095;</div>
    <div class="modal-content" onclick="event.stopPropagation()">
      <img id="modal-img" src="" alt="Büyük Görsel">
      <div class="modal-info">
        <span id="modal-title"></span>
        <a id="modal-download" href="" download="" class="btn-download" style="padding:5px 14px;font-size:12.5px;">İndir (PNG)</a>
      </div>
    </div>
  </div>

  <script>
    const imagesData = {images_json_str};
    const allIds = {all_ids_json_str};
    let currentIdx = 0;

    function openModal(id) {{
      const data = imagesData[id];
      if (!data) return;
      currentIdx = allIds.indexOf(id);
      if (currentIdx === -1) currentIdx = 0;

      document.getElementById('modal-img').src = data.b64;
      document.getElementById('modal-title').innerText = data.title + ' (' + data.filename + ')';
      const dlBtn = document.getElementById('modal-download');
      dlBtn.href = data.b64;
      dlBtn.download = data.filename;
      document.getElementById('modal').classList.add('active');
    }}

    function closeModal() {{
      document.getElementById('modal').classList.remove('active');
    }}

    function navModal(dir, e) {{
      if (e) e.stopPropagation();
      if (allIds.length === 0) return;
      currentIdx = (currentIdx + dir + allIds.length) % allIds.length;
      openModal(allIds[currentIdx]);
    }}

    document.addEventListener('keydown', function(e) {{
      if (!document.getElementById('modal').classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navModal(-1);
      if (e.key === 'ArrowRight') navModal(1);
    }});
  </script>

</body>
</html>
"""

    GALLERY_FILE.write_text(gallery_html, encoding="utf-8")
    print(f"Gallery updated at {GALLERY_FILE} showing only the 4 visuals!")

async def main():
    exported_files = await export_slides()
    copy_to_destinations(exported_files)
    update_gallery(exported_files)

if __name__ == "__main__":
    asyncio.run(main())
