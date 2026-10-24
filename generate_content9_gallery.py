import base64
from pathlib import Path

DESKTOP_DIR = Path(r"C:\Users\cicek\OneDrive\Desktop")
DIR_4X5 = DESKTOP_DIR / "Instagram_Video_Slaytlar" / "4x5_Post_Formati" / "Icerik_9"
DIR_9X16 = DESKTOP_DIR / "Instagram_Video_Slaytlar" / "9x16_Reels_Formati" / "Icerik_9"

SLIDES = [
    {"num": 1, "name": "Kapak: Bu Hatalar Hasta Güvenliğini Riske Atabilir", "tag": "Kapak"},
    {"num": 2, "name": "Yazım ve Okunuş (Harf Atlama ve Yazım Hatası)", "tag": "İçerik"},
    {"num": 3, "name": "Anlam ve Kullanım (Diller Arası Melez Telaffuz)", "tag": "İçerik"},
    {"num": 4, "name": "Anlam ve Kullanım (Raporlarda Tutarsızlık)", "tag": "İçerik"},
    {"num": 5, "name": "Anlam ve Kullanım (hypo- ve micro- Ön Ekleri)", "tag": "İçerik"},
    {"num": 6, "name": "Kısaltmalar (Ca: Karsinom vs Kalsiyum)", "tag": "Özet"},
    {"num": 7, "name": "Kapanış / CTA (Rehber DM)", "tag": "CTA"}
]

cards_html = []
images_dict = {}
all_ids = []

for s in SLIDES:
    snum = s["num"]
    sname = s["name"]
    stag = s["tag"]
    
    # 4:5 Post
    p_4x5 = DIR_4X5 / f"icerik9_gonderi_{snum:02d}.png"
    if p_4x5.exists():
        b64_4x5 = f"data:image/png;base64,{base64.b64encode(p_4x5.read_bytes()).decode('ascii')}"
        uid_4x5 = f"c9_s{snum}_4x5"
        images_dict[uid_4x5] = b64_4x5
        all_ids.append(uid_4x5)
        cards_html.append(f"""
        <div class="card" data-format="4x5" data-tag="{stag}" onclick="openModal('{uid_4x5}', 'İçerik 9 • Slayt {snum}/7 • 4:5 Post', '{sname}')">
          <div class="card-thumb-wrap aspect-4x5">
            <img src="{b64_4x5}" alt="{sname}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span class="badge badge-4x5">4:5 Post</span>
              <span class="badge badge-tag">{stag}</span>
              <span class="badge-num">#{snum}</span>
            </div>
            <div class="card-title">{sname}</div>
          </div>
        </div>
        """)

    # 9:16 Video
    p_9x16 = DIR_9X16 / f"icerik9_video_{snum:02d}.png"
    if p_9x16.exists():
        b64_9x16 = f"data:image/png;base64,{base64.b64encode(p_9x16.read_bytes()).decode('ascii')}"
        uid_9x16 = f"c9_s{snum}_9x16"
        images_dict[uid_9x16] = b64_9x16
        all_ids.append(uid_9x16)
        cards_html.append(f"""
        <div class="card" data-format="9x16" data-tag="{stag}" onclick="openModal('{uid_9x16}', 'İçerik 9 • Slayt {snum}/7 • 9:16 Video', '{sname}')">
          <div class="card-thumb-wrap aspect-9x16">
            <img src="{b64_9x16}" alt="{sname}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span class="badge badge-9x16">9:16 Video</span>
              <span class="badge badge-tag">{stag}</span>
              <span class="badge-num">#{snum}</span>
            </div>
            <div class="card-title">{sname}</div>
          </div>
        </div>
        """)

html_template = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>İçerik 9 Görsel Galerisi (Hasta Güvenliği ve Terminoloji Hataları)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: 'Nunito', sans-serif; }}
    body {{ background: #0b1329; color: #f8fafc; min-height: 100vh; padding: 30px 20px; }}
    .header {{ text-align: center; margin-bottom: 25px; }}
    .header h1 {{ font-size: 26px; font-weight: 900; color: #5eead4; margin-bottom: 6px; }}
    .header p {{ font-size: 14px; color: #94a3b8; }}
    .filter-section {{ display: flex; justify-content: center; gap: 10px; margin-bottom: 25px; flex-wrap: wrap; }}
    .filter-btn {{ background: #1e293b; border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; padding: 7px 16px; border-radius: 20px; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.2s; }}
    .filter-btn.active, .filter-btn:hover {{ background: #0f766e; color: #ffffff; border-color: #5eead4; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 18px; max-width: 1400px; margin: 0 auto; }}
    .card {{ background: #131f37; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; cursor: pointer; transition: transform 0.2s, border-color 0.2s; }}
    .card:hover {{ transform: translateY(-4px); border-color: #5eead4; }}
    .card-thumb-wrap {{ width: 100%; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; }}
    .aspect-4x5 {{ aspect-ratio: 4/5; }}
    .aspect-9x16 {{ aspect-ratio: 9/16; }}
    .card-thumb-wrap img {{ width: 100%; height: 100%; object-fit: contain; }}
    .card-body {{ padding: 12px 14px; }}
    .card-meta {{ display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }}
    .badge {{ font-size: 10.5px; font-weight: 800; padding: 2px 7px; border-radius: 6px; }}
    .badge-4x5 {{ background: rgba(56,189,248,0.15); color: #38bdf8; }}
    .badge-9x16 {{ background: rgba(168,85,247,0.15); color: #c084fc; }}
    .badge-tag {{ background: rgba(255,255,255,0.08); color: #cbd5e1; }}
    .badge-num {{ margin-left: auto; font-size: 11px; font-weight: 800; color: #64748b; }}
    .card-title {{ font-size: 13px; font-weight: 700; color: #f1f5f9; line-height: 1.35; }}
    /* Modal */
    .modal {{ display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 999; align-items: center; justify-content: center; padding: 20px; }}
    .modal.open {{ display: flex; }}
    .modal-content {{ max-width: 90vw; max-height: 90vh; display: flex; flex-direction: column; align-items: center; }}
    .modal-content img {{ max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 10px; }}
    .modal-info {{ margin-top: 12px; text-align: center; }}
    .modal-title {{ font-size: 16px; font-weight: 800; color: #5eead4; }}
    .modal-desc {{ font-size: 13.5px; color: #94a3b8; margin-top: 3px; }}
    .modal-close {{ position: absolute; top: 20px; right: 25px; font-size: 32px; color: #fff; cursor: pointer; }}
  </style>
</head>
<body>
  <div class="header">
    <h1>İçerik 9: Hasta Güvenliği ve Terminoloji Hataları</h1>
    <p>4:5 Gönderi ve 9:16 Video Formatları (Toplam 14 Görsel)</p>
  </div>
  <div class="filter-section">
    <button class="filter-btn active" onclick="filterGallery('all', this)">Tümü (14)</button>
    <button class="filter-btn" onclick="filterGallery('4x5', this)">4:5 Post (7)</button>
    <button class="filter-btn" onclick="filterGallery('9x16', this)">9:16 Video (7)</button>
  </div>
  <div class="grid" id="galleryGrid">
    {''.join(cards_html)}
  </div>
  <div class="modal" id="modal" onclick="closeModal(event)">
    <span class="modal-close" onclick="closeModal(event)">&times;</span>
    <div class="modal-content" onclick="event.stopPropagation()">
      <img id="modalImg" src="" alt="" />
      <div class="modal-info">
        <div class="modal-title" id="modalTitle"></div>
        <div class="modal-desc" id="modalDesc"></div>
      </div>
    </div>
  </div>
  <script>
    const images = {str(images_dict)};
    function filterGallery(fmt, btn) {{
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.card').forEach(c => {{
        if (fmt === 'all' || c.getAttribute('data-format') === fmt) {{
          c.style.display = 'block';
        }} else {{
          c.style.display = 'none';
        }}
      }});
    }}
    function openModal(uid, title, desc) {{
      document.getElementById('modalImg').src = images[uid];
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('modalDesc').innerText = desc;
      document.getElementById('modal').classList.add('open');
    }}
    function closeModal(e) {{
      document.getElementById('modal').classList.remove('open');
    }}
  </script>
</body>
</html>
"""

out_html = DESKTOP_DIR / "Icerik_9_Gorselleri_Galerisi.html"
out_html.write_text(html_template, encoding="utf-8")
print(f"Icerik 9 gallery created at {out_html}")
