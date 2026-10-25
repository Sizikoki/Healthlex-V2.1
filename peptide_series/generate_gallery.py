# peptide_series/generate_gallery.py
import base64
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
OUTPUT_4X5 = CURRENT_DIR / "output_4x5"
OUTPUT_9X16 = CURRENT_DIR / "output_9x16"
GALLERY_FILE = CURRENT_DIR / "gallery.html"

def build_gallery():
    slides_info = [
        {"num": 1, "title": "Sayfa 1: Herkes Peptit Konuşuyor (Kapak - Light)", "post": "icerik01_gonderi_01.png", "video": "icerik01_video_01.png"},
        {"num": 2, "title": "Sayfa 2: Kısa Bir Amino Asit Zinciri (TANIM - Dark)", "post": "icerik01_gonderi_02.png", "video": "icerik01_video_02.png"},
    ]

    cards_html = []
    for item in slides_info:
        # 4:5 Card
        p_path = OUTPUT_4X5 / item["post"]
        p_b64 = ""
        if p_path.exists():
            p_b64 = f"data:image/png;base64,{base64.b64encode(p_path.read_bytes()).decode('ascii')}"

        cards_html.append(f"""
        <div class="card">
          <div class="card-header">
            <span class="card-title">{item["title"]}</span>
            <span class="card-badge badge-4x5">4:5 Post • 1080x1350</span>
          </div>
          <div class="card-img-wrap img-4x5">
            <img src="{p_b64}" alt="{item['post']}" onclick="openModal(this.src)" />
          </div>
          <div class="card-footer">
            <span class="filename">{item['post']}</span>
            <a href="{p_b64}" download="{item['post']}" class="btn-download">İndir (PNG)</a>
          </div>
        </div>
        """)

        # 9:16 Card
        v_path = OUTPUT_9X16 / item["video"]
        v_b64 = ""
        if v_path.exists():
            v_b64 = f"data:image/png;base64,{base64.b64encode(v_path.read_bytes()).decode('ascii')}"

        cards_html.append(f"""
        <div class="card">
          <div class="card-header">
            <span class="card-title">{item["title"]}</span>
            <span class="card-badge badge-9x16">9:16 Reels • 1080x1920</span>
          </div>
          <div class="card-img-wrap img-9x16">
            <img src="{v_b64}" alt="{item['video']}" onclick="openModal(this.src)" />
          </div>
          <div class="card-footer">
            <span class="filename">{item['video']}</span>
            <a href="{v_b64}" download="{item['video']}" class="btn-download">İndir (PNG)</a>
          </div>
        </div>
        """)

    html_content = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Peptit Serisi — Görsel Test Galerisi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    }}
    body {{
      background: #141A17;
      color: #F3EDE2;
      min-height: 100vh;
      padding: 40px 24px;
    }}
    .container {{
      max-width: 1300px;
      margin: 0 auto;
    }}
    header {{
      margin-bottom: 36px;
      padding-bottom: 24px;
      border-bottom: 1px solid #2A332E;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 16px;
    }}
    h1 {{
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #F3EDE2;
      margin-bottom: 6px;
    }}
    .subtitle {{
      font-size: 14.5px;
      color: #A9B89A;
      font-weight: 500;
    }}
    .meta-badge {{
      background: #2A332E;
      border: 1px solid #3A443F;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      color: #A9B89A;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 24px;
      align-items: start;
    }}
    .card {{
      background: #1E2622;
      border: 1px solid #2A332E;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }}
    .card:hover {{
      transform: translateY(-3px);
      border-color: #4F6B57;
    }}
    .card-header {{
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      background: #19201D;
      border-bottom: 1px solid #2A332E;
    }}
    .card-title {{
      font-size: 13px;
      font-weight: 700;
      color: #F3EDE2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }}
    .card-badge {{
      font-size: 10.5px;
      font-weight: 800;
      padding: 4px 8px;
      border-radius: 6px;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }}
    .badge-4x5 {{
      background: rgba(79, 107, 87, 0.2);
      color: #A9B89A;
      border: 1px solid rgba(169, 184, 154, 0.3);
    }}
    .badge-9x16 {{
      background: rgba(192, 138, 43, 0.2);
      color: #E6B86A;
      border: 1px solid rgba(230, 184, 106, 0.3);
    }}
    .card-img-wrap {{
      background: #101513;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: zoom-in;
    }}
    .card-img-wrap img {{
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }}
    .img-4x5 img {{
      aspect-ratio: 4/5;
    }}
    .img-9x16 img {{
      aspect-ratio: 9/16;
      max-height: 440px;
    }}
    .card-footer {{
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #19201D;
      border-top: 1px solid #2A332E;
    }}
    .filename {{
      font-size: 12px;
      color: #8C968F;
      font-family: monospace;
      font-weight: 600;
    }}
    .btn-download {{
      background: #4F6B57;
      color: #F3EDE2;
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      transition: background 0.2s;
    }}
    .btn-download:hover {{
      background: #3E5645;
    }}
    .modal {{
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.85);
      z-index: 1000;
      align-items: center;
      justify-content: center;
      cursor: zoom-out;
      padding: 24px;
    }}
    .modal img {{
      max-height: 90vh;
      max-width: 90vw;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.7);
    }}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1>Peptit Serisi · Test Galerisi</h1>
        <div class="subtitle">İçerik 1 (Bölüm 1) — 4:5 Post (1080x1350) & 9:16 Reels (1080x1920) Test Çıktıları</div>
      </div>
      <div class="meta-badge">
        @fizyoterapist.siddik • 4 PNG Görsel
      </div>
    </header>

    <div class="grid">
      {''.join(cards_html)}
    </div>
  </div>

  <div class="modal" id="modal" onclick="this.style.display='none'">
    <img id="modal-img" src="" alt="Tam Boyut" />
  </div>

  <script>
    function openModal(src) {{
      const modal = document.getElementById('modal');
      const img = document.getElementById('modal-img');
      img.src = src;
      modal.style.display = 'flex';
    }}
  </script>
</body>
</html>
"""
    GALLERY_FILE.write_text(html_content, encoding="utf-8")
    print(f"=== Galeri HTML başarıyla oluşturuldu: {GALLERY_FILE} ===")

if __name__ == "__main__":
    build_gallery()
