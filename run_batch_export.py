import subprocess
import sys
import shutil
import base64
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
SCRIPTS = [
    "generate_video_slides.py",
    "generate_content2_slides.py",
    "generate_content3_slides.py",
    "generate_content4_slides.py",
    "generate_content5_slides.py"
]

DESKTOP_DIR = Path(r"C:\Users\cicek\OneDrive\Desktop\Instagram_Video_Slaytlar")
POST_4X5_DIR = DESKTOP_DIR / "4x5_Post_Formati"
REELS_9X16_DIR = DESKTOP_DIR / "9x16_Reels_Formati"
ARTIFACTS_DIR = Path(r"C:\Users\cicek\.gemini\antigravity\brain\c15f47f7-e2d8-4bfd-bcfb-f955194ae309")
GALLERY_FILE = Path(r"C:\Users\cicek\OneDrive\Desktop\Video_Gorselleri_Galerisi.html")

VIDEO_OUTPUT_4X5 = BASE_DIR / "video_output_4x5"
VIDEO_OUTPUT_9X16 = BASE_DIR / "video_output_9x16"

def run_scripts():
    for script in SCRIPTS:
        print(f"=== Running {script} ===")
        res = subprocess.run([sys.executable, str(BASE_DIR / script)], cwd=str(BASE_DIR), capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error running {script}:")
            print(res.stderr)
            sys.exit(1)
        else:
            print(f"Finished {script} successfully.")

def copy_files():
    POST_4X5_DIR.mkdir(parents=True, exist_ok=True)
    REELS_9X16_DIR.mkdir(parents=True, exist_ok=True)
    
    for i in range(1, 6):
        sub_post = POST_4X5_DIR / f"Icerik_{i}"
        sub_reels = REELS_9X16_DIR / f"Icerik_{i}"
        sub_post.mkdir(parents=True, exist_ok=True)
        sub_reels.mkdir(parents=True, exist_ok=True)

        for s in range(1, 8):
            f_4x5 = VIDEO_OUTPUT_4X5 / f"icerik{i}_gonderi_{s:02d}.png"
            f_9x16 = VIDEO_OUTPUT_9X16 / f"icerik{i}_video_{s:02d}.png"

            if f_4x5.exists():
                shutil.copy2(f_4x5, POST_4X5_DIR / f_4x5.name)
                shutil.copy2(f_4x5, sub_post / f_4x5.name)
                if ARTIFACTS_DIR.exists():
                    shutil.copy2(f_4x5, ARTIFACTS_DIR / f_4x5.name)

            if f_9x16.exists():
                shutil.copy2(f_9x16, REELS_9X16_DIR / f_9x16.name)
                shutil.copy2(f_9x16, sub_reels / f_9x16.name)
                if ARTIFACTS_DIR.exists():
                    shutil.copy2(f_9x16, ARTIFACTS_DIR / f_9x16.name)

    print("All files copied successfully!")

def build_gallery():
    cards_html = []
    
    # Strictly the 10 visuals: Slide 7 of Contents 1 to 5 (both 4:5 and 9:16)
    items = [
        {"num": 1, "title": "İçerik 1 — Kapanış (Sayfa 7)", "post": f"icerik1_gonderi_07.png", "video": f"icerik1_video_07.png"},
        {"num": 2, "title": "İçerik 2 — Kapanış (Sayfa 7)", "post": f"icerik2_gonderi_07.png", "video": f"icerik2_video_07.png"},
        {"num": 3, "title": "İçerik 3 — Kapanış (Sayfa 7)", "post": f"icerik3_gonderi_07.png", "video": f"icerik3_video_07.png"},
        {"num": 4, "title": "İçerik 4 — Kapanış (Sayfa 7)", "post": f"icerik4_gonderi_07.png", "video": f"icerik4_video_07.png"},
        {"num": 5, "title": "İçerik 5 — Kapanış (Sayfa 7)", "post": f"icerik5_gonderi_07.png", "video": f"icerik5_video_07.png"},
    ]

    for item in items:
        # 4:5 Card
        p_path = VIDEO_OUTPUT_4X5 / item["post"]
        p_b64 = ""
        if p_path.exists():
            p_b64 = f"data:image/png;base64,{base64.b64encode(p_path.read_bytes()).decode('ascii')}"
        
        cards_html.append(f"""
        <div class="card">
          <div class="card-header">
            <span class="card-title">{item["title"]} (4:5 Post)</span>
            <span class="card-badge">4:5 • 1080x1350</span>
          </div>
          <div class="card-img-wrap">
            <img src="{p_b64}" alt="{item['post']}" onclick="openModal(this.src)" />
          </div>
          <div class="card-footer">
            <span style="font-size:12px;color:#94a3b8;font-weight:700;">{item['post']}</span>
            <a href="{p_b64}" download="{item['post']}" class="btn-download">İndir (PNG)</a>
          </div>
        </div>
        """)

        # 9:16 Card
        v_path = VIDEO_OUTPUT_9X16 / item["video"]
        v_b64 = ""
        if v_path.exists():
            v_b64 = f"data:image/png;base64,{base64.b64encode(v_path.read_bytes()).decode('ascii')}"

        cards_html.append(f"""
        <div class="card">
          <div class="card-header">
            <span class="card-title">{item["title"]} (9:16 Reels)</span>
            <span class="card-badge">9:16 • 1080x1920</span>
          </div>
          <div class="card-img-wrap">
            <img src="{v_b64}" alt="{item['video']}" onclick="openModal(this.src)" />
          </div>
          <div class="card-footer">
            <span style="font-size:12px;color:#94a3b8;font-weight:700;">{item['video']}</span>
            <a href="{v_b64}" download="{item['video']}" class="btn-download">İndir (PNG)</a>
          </div>
        </div>
        """)

    gallery_content = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HealthLexMed — İçerik 1-5 Kapanış (CTA) Galerisi (10 Görsel)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: 'Nunito', sans-serif; }}
    body {{
      background: #0f1b33;
      color: #F8FAFC;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }}
    .header {{
      text-align: center;
      margin-bottom: 36px;
      max-width: 820px;
    }}
    .header h1 {{ font-size: 28px; font-weight: 900; margin-bottom: 12px; color: #5eead4; }}
    .header p {{ font-size: 15px; font-weight: 600; color: #94A3B8; line-height: 1.6; }}
    
    .filter-info {{
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(94, 234, 212, 0.12);
      border: 1px solid rgba(94, 234, 212, 0.3);
      padding: 8px 20px;
      border-radius: 30px;
      color: #5eead4;
      font-weight: 800;
      font-size: 13.5px;
      margin-top: 14px;
    }}

    .gallery-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 28px;
      max-width: 1280px;
      width: 100%;
    }}
    .card {{
      background: #162032;
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      flex-direction: column;
      box-shadow: 0 14px 34px rgba(0,0,0,0.4);
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
      background: #1E293B;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }}
    .card-title {{ font-size: 14.5px; font-weight: 800; color: #E2E8F0; }}
    .card-badge {{ font-size: 11.5px; background: rgba(94, 234, 212, 0.15); color: #5eead4; padding: 4px 12px; border-radius: 12px; font-weight: 800; }}
    .card-img-wrap {{
      background: #090E1A;
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
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      transition: transform 0.2s ease;
    }}
    .card-img-wrap img:hover {{
      transform: scale(1.02);
    }}
    .card-footer {{
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1E293B;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }}
    .btn-download {{
      background: #0f766e;
      color: #FFFFFF;
      text-decoration: none;
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      transition: background 0.2s;
    }}
    .btn-download:hover {{ background: #115e59; }}

    /* Modal for big view */
    .modal {{
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }}
    .modal.active {{ display: flex; }}
    .modal img {{
      max-height: 92vh;
      max-width: 92vw;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.85);
    }}
    .modal-close {{
      position: absolute;
      top: 24px;
      right: 28px;
      font-size: 34px;
      color: #FFF;
      cursor: pointer;
      font-weight: 300;
      user-select: none;
    }}
  </style>
</head>
<body>

  <div class="header">
    <h1>İçerik 1–5 CTA Kapanış Sayfaları Revizyonu</h1>
    <p>Tüm serideki 7. sayfaların (kapanış/CTA) tek tip konuşma balonu ikonu, turkuaz REHBER vurgusu, "Ya da doğrudan:" bağlantı metni ve "TIBBİ TERMİNOLOJİ SERİSİ" etiketiyle güncellenmiş toplam 10 görseli.</p>
    <div class="filter-info">
      <span>✨ Yalnızca Güncellenen 10 Görsel (5x 4:5 Post, 5x 9:16 Reels)</span>
    </div>
  </div>

  <div class="gallery-grid">
    {''.join(cards_html)}
  </div>

  <div class="modal" id="modal" onclick="closeModal()">
    <span class="modal-close" onclick="closeModal()">&times;</span>
    <img id="modal-img" src="" alt="Büyük Görsel" onclick="event.stopPropagation()">
  </div>

  <script>
    function openModal(src) {{
      document.getElementById('modal-img').src = src;
      document.getElementById('modal').classList.add('active');
    }}
    function closeModal() {{
      document.getElementById('modal').classList.remove('active');
    }}
    document.addEventListener('keydown', function(e) {{
      if (e.key === 'Escape') closeModal();
    }});
  </script>

</body>
</html>
"""
    GALLERY_FILE.write_text(gallery_content, encoding="utf-8")
    print(f"Gallery written successfully to {GALLERY_FILE}")

if __name__ == "__main__":
    run_scripts()
    copy_files()
    build_gallery()
