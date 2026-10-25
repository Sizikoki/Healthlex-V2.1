import base64
from pathlib import Path

DESKTOP_DIR = Path(r"C:\Users\cicek\OneDrive\Desktop")
DIR_4X5 = DESKTOP_DIR / "Instagram_Video_Slaytlar" / "4x5_Post_Formati" / "Icerik_8"
DIR_9X16 = DESKTOP_DIR / "Instagram_Video_Slaytlar" / "9x16_Reels_Formati" / "Icerik_8"
GALLERY_OUT = DESKTOP_DIR / "Icerik_8_Gorselleri_Galerisi.html"

SLIDES_DATA = [
    {"num": 1, "title": "1. Sayfa: Kapak (Hook)", "desc": "Böbreğe neden hem renal hem nefrit denir?"},
    {"num": 2, "title": "2. Sayfa: Neden İki Kök Var?", "desc": "Aynı organ için iki farklı kök (Latince vs Grekçe)."},
    {"num": 3, "title": "3. Sayfa: Eş Anlamlı Kökler 1", "desc": "Böbrek ve akciğer kökleri."},
    {"num": 4, "title": "4. Sayfa: Eş Anlamlı Kökler 2", "desc": "Deri ve ağız kökleri."},
    {"num": 5, "title": "5. Sayfa: Aynı Kök, İki Anlam", "desc": "Eşadlılık: scler/o ve myel/o iki ayrı anlam."},
    {"num": 6, "title": "6. Sayfa: İstisnalar", "desc": "Bu bir kural değil, genel eğilim (renal, dermis)."},
    {"num": 7, "title": "7. Sayfa: Kapanış / CTA", "desc": "Rehberin tamamına ulaşmak için."},
]

cards = []
for s in SLIDES_DATA:
    num = s["num"]
    title = s["title"]
    desc = s["desc"]

    # 4:5
    f_4x5 = DIR_4X5 / f"icerik8_gonderi_{num:02d}.png"
    b64_4x5 = f"data:image/png;base64,{base64.b64encode(f_4x5.read_bytes()).decode('ascii')}"

    # 9:16
    f_9x16 = DIR_9X16 / f"icerik8_video_{num:02d}.png"
    b64_9x16 = f"data:image/png;base64,{base64.b64encode(f_9x16.read_bytes()).decode('ascii')}"

    cards.append(f"""
    <div class="row-pair">
      <div class="pair-info">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div class="pair-visuals">
        <!-- 4:5 -->
        <div class="visual-card">
          <div class="visual-badge">4:5 Gönderi (1080x1350)</div>
          <img src="{b64_4x5}" alt="{f_4x5.name}" />
          <div class="visual-footer">{f_4x5.name}</div>
        </div>
        <!-- 9:16 -->
        <div class="visual-card">
          <div class="visual-badge">9:16 Video / Reels (1080x1920)</div>
          <img src="{b64_9x16}" alt="{f_9x16.name}" />
          <div class="visual-footer">{f_9x16.name}</div>
        </div>
      </div>
    </div>
    """)

html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>İçerik 8 Görsel Galerisi (1-7 Slaytlar)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: 'Nunito', sans-serif; }}
    body {{
      background: #0b1324;
      color: #F8FAFC;
      padding: 40px 20px 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }}
    .header {{
      text-align: center;
      margin-bottom: 30px;
      max-width: 800px;
    }}
    .header h1 {{
      font-size: 32px;
      font-weight: 900;
      color: #5eead4;
      margin-bottom: 8px;
    }}
    .header p {{
      font-size: 16px;
      color: #94a3b8;
    }}
    .container {{
      width: 100%;
      max-width: 1200px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }}
    .row-pair {{
      background: #152238;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}
    .pair-info h3 {{
      font-size: 20px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 4px;
    }}
    .pair-info p {{
      font-size: 14.5px;
      color: #94a3b8;
      font-weight: 600;
    }}
    .pair-visuals {{
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }}
    .visual-card {{
      background: #0f1b33;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 280px;
    }}
    .visual-badge {{
      font-size: 12px;
      font-weight: 800;
      color: #5eead4;
      background: rgba(94, 234, 212, 0.1);
      padding: 4px 10px;
      border-radius: 6px;
      align-self: flex-start;
    }}
    .visual-card img {{
      max-width: 100%;
      max-height: 520px;
      border-radius: 8px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.4);
      object-fit: contain;
    }}
    .visual-footer {{
      font-family: monospace;
      font-size: 13px;
      font-weight: 700;
      color: #cbd5e1;
    }}
  </style>
</head>
<body>
  <div class="header">
    <h1>İçerik 8: Eş Anlamlı Kökler — Görsel Galerisi</h1>
    <p>4:5 Gönderi ve 9:16 Reels formatlarının 1-7 slaytları (Kanonik Icerik_8/ Klasörü)</p>
  </div>
  <div class="container">
    {''.join(cards)}
  </div>
</body>
</html>
"""

GALLERY_OUT.write_text(html, encoding="utf-8")
print(f"Icerik 8 gallery created at {GALLERY_OUT}")
