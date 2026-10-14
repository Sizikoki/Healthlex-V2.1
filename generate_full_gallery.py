import base64
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DESKTOP_DIR = Path(r"C:\Users\cicek\OneDrive\Desktop")
GALLERY_FILE = DESKTOP_DIR / "Video_Gorselleri_Galerisi.html"

VIDEO_OUTPUT_4X5 = BASE_DIR / "video_output_4x5"
VIDEO_OUTPUT_9X16 = BASE_DIR / "video_output_9x16"

# Slide metadata
CONTENTS = [
    {
        "id": 1,
        "title": "İçerik 1: Tıbbi Terimlerin Şifresini Birlikte Çözelim",
        "desc": "Tıbbi Latinceye Giriş, Dilin Kökeni ve Terimlerin Temel Mantığı",
        "slides": [
            {"num": 1, "name": "Kapak: Tıbbi Latince Gözünü Korkutmasın", "tag": "Kapak"},
            {"num": 2, "name": "Ezber Çıkmazı vs. Yapboz Mantığı", "tag": "İçerik"},
            {"num": 3, "name": "Tıp Dili Neden Latince ve Yunanca?", "tag": "İçerik"},
            {"num": 4, "name": "Kökenler Arasındaki İş Bölümü", "tag": "İçerik"},
            {"num": 5, "name": "Bu Sistem Sana Ne Kazandıracak?", "tag": "İçerik"},
            {"num": 6, "name": "Özet: Tıbbın Dili Bir Yapbozdur", "tag": "Özet"},
            {"num": 7, "name": "Kapanış / CTA (Rehber DM)", "tag": "CTA"}
        ]
    },
    {
        "id": 2,
        "title": "İçerik 2: Bir Terimin 4 Temel Yapı Taşı",
        "desc": "Kök, Ön Ek, Son Ek ve Bağlayıcı Ünlü Mimarisi",
        "slides": [
            {"num": 1, "name": "Kapak: Tıbbi Terimlerin 4 Yapı Taşı", "tag": "Kapak"},
            {"num": 2, "name": "1. KÖK (Word Root)", "tag": "İçerik"},
            {"num": 3, "name": "2. ÖN EK (Prefix)", "tag": "İçerik"},
            {"num": 4, "name": "3. SON EK (Suffix)", "tag": "İçerik"},
            {"num": 5, "name": "4. BAĞLAYICI ÜNLÜ (Combining Vowel)", "tag": "İçerik"},
            {"num": 6, "name": "Terim Yapı Formülü & Önemli Kural", "tag": "Özet"},
            {"num": 7, "name": "Kapanış / CTA (Rehber DM)", "tag": "CTA"}
        ]
    },
    {
        "id": 3,
        "title": "İçerik 3: Bağlayıcı Ünlü \"o\" ve İstisnaları",
        "desc": "Fonetik Köprü Kuralları ve Az Bilinen İstisnalar (cholecystitis, pelvimeter)",
        "slides": [
            {"num": 1, "name": "Kapak: \"o\" Harfi Ne İş Yapıyor?", "tag": "Kapak"},
            {"num": 2, "name": "Bağlayıcı Ünlü Nedir?", "tag": "İçerik"},
            {"num": 3, "name": "Kural Ne Zaman Geçerli?", "tag": "İçerik"},
            {"num": 4, "name": "Daha Az Bilinen İstisnalar (-e, -i)", "tag": "İçerik"},
            {"num": 5, "name": "Farklı Parça Kombinasyonları", "tag": "İçerik"},
            {"num": 6, "name": "Özet: Fonetik Köprü Görevi", "tag": "Özet"},
            {"num": 7, "name": "Kapanış / CTA (Rehber DM)", "tag": "CTA"}
        ]
    },
    {
        "id": 4,
        "title": "İçerik 4: Altın Kural: Terim Sondan Başa Nasıl Çözülür?",
        "desc": "3 Adımlı Çözümleme Metodu ve Klinik Örnekler (gastroenteritis, electrocardiogram)",
        "slides": [
            {"num": 1, "name": "Kapak: Soldan Sağa Okuma! (Altın Kural)", "tag": "Kapak"},
            {"num": 2, "name": "Neden Sondan Başa?", "tag": "İçerik"},
            {"num": 3, "name": "3 Adımlı Çözümleme Yöntemi", "tag": "İçerik"},
            {"num": 4, "name": "Uygulama 1: gastroenteritis", "tag": "İçerik"},
            {"num": 5, "name": "Uygulama 2: electrocardiogram", "tag": "İçerik"},
            {"num": 6, "name": "Önemli Klinik Not: osteoarthritis", "tag": "Özet"},
            {"num": 7, "name": "Kapanış / CTA (Rehber DM)", "tag": "CTA"}
        ]
    },
    {
        "id": 5,
        "title": "İçerik 5: Şaşırtan Okunuş Kuralları (C, G, Y, X Harfleri)",
        "desc": "Doğru Telaffuz Kılavuzu ve Uluslararası Latince vs. Türkçe İmla Ayrımı",
        "slides": [
            {"num": 1, "name": "Kapak: Tıbbi Latinceyi Doğru Okuyor Musun?", "tag": "Kapak"},
            {"num": 2, "name": "C Harfinin Okunuşu", "tag": "İçerik"},
            {"num": 3, "name": "G Harfinin Okunuşu", "tag": "İçerik"},
            {"num": 4, "name": "Y Harfinin Okunuşu", "tag": "İçerik"},
            {"num": 5, "name": "X Harfinin Okunuşu", "tag": "İçerik"},
            {"num": 6, "name": "Çok Önemli Ayrım (Uluslararası vs. Türkçe)", "tag": "Özet"},
            {"num": 7, "name": "Kapanış / CTA (Rehber DM)", "tag": "CTA"}
        ]
    }
]

print("Generating full gallery with all 70 visuals...")

cards_html = []
images_dict = {}
all_ids = []

for c in CONTENTS:
    cid = c["id"]
    for s in c["slides"]:
        snum = s["num"]
        sname = s["name"]
        stag = s["tag"]

        # 4:5
        p_filename = f"icerik{cid}_gonderi_{snum:02d}.png"
        p_path = VIDEO_OUTPUT_4X5 / p_filename
        p_b64 = ""
        if p_path.exists():
            p_b64 = f"data:image/png;base64,{base64.b64encode(p_path.read_bytes()).decode('ascii')}"

        id_4x5 = f"c{cid}_s{snum}_4x5"
        all_ids.append(id_4x5)
        images_dict[id_4x5] = {
            "title": f"İçerik {cid} • Slayt {snum}/7 — {sname}",
            "filename": p_filename,
            "b64": p_b64
        }

        tag_bg = "rgba(94, 234, 212, 0.15)" if stag == "CTA" else ("rgba(56, 189, 248, 0.15)" if stag == "Kapak" else "rgba(255, 255, 255, 0.08)")
        tag_color = "#5eead4" if stag == "CTA" else ("#38bdf8" if stag == "Kapak" else "#94a3b8")

        cards_html.append(f"""
        <div class="card" data-content="{cid}" data-format="4x5" data-tag="{stag}" id="card-{id_4x5}">
          <div class="card-header">
            <div style="display:flex;flex-direction:column;gap:2px;">
              <span class="card-content-badge">İÇERİK {cid} • SLAYT {snum}/7</span>
              <span class="card-title" title="{sname}">{sname}</span>
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
              <span class="card-tag" style="background:{tag_bg};color:{tag_color};">{stag}</span>
              <span class="card-badge">4:5 Post</span>
            </div>
          </div>
          <div class="card-img-wrap">
            <img src="{p_b64}" alt="{p_filename}" loading="lazy" onclick="openModal('{id_4x5}')" />
          </div>
          <div class="card-footer">
            <span class="card-filename">{p_filename}</span>
            <div style="display:flex;gap:8px;">
              <button onclick="openModal('{id_4x5}')" class="btn-preview">Büyüt</button>
              <a href="{p_b64}" download="{p_filename}" class="btn-download">İndir</a>
            </div>
          </div>
        </div>
        """)

        # 9:16
        v_filename = f"icerik{cid}_video_{snum:02d}.png"
        v_path = VIDEO_OUTPUT_9X16 / v_filename
        v_b64 = ""
        if v_path.exists():
            v_b64 = f"data:image/png;base64,{base64.b64encode(v_path.read_bytes()).decode('ascii')}"

        id_9x16 = f"c{cid}_s{snum}_9x16"
        all_ids.append(id_9x16)
        images_dict[id_9x16] = {
            "title": f"İçerik {cid} • Slayt {snum}/7 — {sname}",
            "filename": v_filename,
            "b64": v_b64
        }

        cards_html.append(f"""
        <div class="card" data-content="{cid}" data-format="9x16" data-tag="{stag}" id="card-{id_9x16}">
          <div class="card-header">
            <div style="display:flex;flex-direction:column;gap:2px;">
              <span class="card-content-badge">İÇERİK {cid} • SLAYT {snum}/7</span>
              <span class="card-title" title="{sname}">{sname}</span>
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
              <span class="card-tag" style="background:{tag_bg};color:{tag_color};">{stag}</span>
              <span class="card-badge">9:16 Reels</span>
            </div>
          </div>
          <div class="card-img-wrap">
            <img src="{v_b64}" alt="{v_filename}" loading="lazy" onclick="openModal('{id_9x16}')" />
          </div>
          <div class="card-footer">
            <span class="card-filename">{v_filename}</span>
            <div style="display:flex;gap:8px;">
              <button onclick="openModal('{id_9x16}')" class="btn-preview">Büyüt</button>
              <a href="{v_b64}" download="{v_filename}" class="btn-download">İndir</a>
            </div>
          </div>
        </div>
        """)

cards_str = "".join(cards_html)
images_json_str = json.dumps(images_dict)
all_ids_json_str = json.dumps(all_ids)

html_template = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HealthLexMed — Tüm İçerikler Görsel Galerisi (70 Görsel)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: 'Nunito', sans-serif; }}
    body {{
      background: #0b1324;
      color: #F8FAFC;
      padding: 30px 20px 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }}

    /* Header */
    .header {{
      text-align: center;
      margin-bottom: 24px;
      max-width: 900px;
    }}
    .header h1 {{
      font-size: 32px;
      font-weight: 900;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #5eead4, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}
    .header p {{
      font-size: 15px;
      font-weight: 600;
      color: #94A3B8;
      line-height: 1.5;
    }}

    /* Filter Bar */
    .filter-section {{
      background: #152238;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      padding: 16px 20px;
      max-width: 1320px;
      width: 100%;
      margin-bottom: 28px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: sticky;
      top: 12px;
      z-index: 100;
      backdrop-filter: blur(12px);
    }}

    .filter-row {{
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }}
    .filter-label {{
      font-size: 12px;
      font-weight: 800;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      min-width: 75px;
    }}
    .filter-btn {{
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #94A3B8;
      padding: 7px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }}
    .filter-btn:hover {{
      background: rgba(94, 234, 212, 0.12);
      color: #5eead4;
      border-color: rgba(94, 234, 212, 0.3);
    }}
    .filter-btn.active {{
      background: #0f766e;
      color: #FFFFFF;
      border-color: #5eead4;
      box-shadow: 0 0 12px rgba(94, 234, 212, 0.3);
    }}

    .stats-badge {{
      margin-left: auto;
      font-size: 13px;
      font-weight: 800;
      color: #5eead4;
      background: rgba(94, 234, 212, 0.1);
      padding: 6px 14px;
      border-radius: 14px;
      border: 1px solid rgba(94, 234, 212, 0.2);
    }}

    /* Gallery Grid */
    .gallery-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 26px;
      max-width: 1340px;
      width: 100%;
    }}

    .card {{
      background: #152238;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.09);
      display: flex;
      flex-direction: column;
      box-shadow: 0 12px 28px rgba(0,0,0,0.35);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }}
    .card:hover {{
      transform: translateY(-4px);
      border-color: rgba(94, 234, 212, 0.4);
    }}
    .card.hidden {{
      display: none !important;
    }}

    .card-header {{
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1b2a45;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }}
    .card-content-badge {{
      font-size: 11px;
      font-weight: 800;
      color: #5eead4;
      letter-spacing: 0.5px;
    }}
    .card-title {{
      font-size: 13.5px;
      font-weight: 800;
      color: #F1F5F9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
    }}
    .card-tag {{
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 8px;
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
      background: #090e1a;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      min-height: 440px;
    }}
    .card-img-wrap img {{
      max-width: 100%;
      height: auto;
      max-height: 470px;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
      transition: transform 0.2s ease;
    }}
    .card-img-wrap img:hover {{
      transform: scale(1.02);
    }}

    .card-footer {{
      padding: 12px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1b2a45;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }}
    .card-filename {{
      font-size: 12px;
      color: #94A3B8;
      font-family: monospace;
      font-weight: 600;
    }}
    .btn-preview {{
      background: rgba(255, 255, 255, 0.08);
      color: #E2E8F0;
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 6px 14px;
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
      padding: 6px 14px;
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
      background: rgba(5, 10, 20, 0.94);
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
      box-shadow: 0 10px 40px rgba(0,0,0,0.9);
      object-fit: contain;
    }}
    .modal-info {{
      margin-top: 12px;
      color: #E2E8F0;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 14px;
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
    <h1>Tıbbi Terminoloji Görsel Galerisi</h1>
    <p>İçerik 1'den 5'e kadar tüm serinin en güncel 4:5 Post ve 9:16 Reels görselleri (toplam 70 görsel).</p>
  </div>

  <div class="filter-section">
    <!-- Filter: Content -->
    <div class="filter-row">
      <span class="filter-label">İÇERİK:</span>
      <button class="filter-btn active" data-filter="content" data-val="all" onclick="setFilter('content', 'all', this)">Tümü (1-5)</button>
      <button class="filter-btn" data-filter="content" data-val="1" onclick="setFilter('content', '1', this)">İçerik 1 (Giriş)</button>
      <button class="filter-btn" data-filter="content" data-val="2" onclick="setFilter('content', '2', this)">İçerik 2 (4 Yapı Taşı)</button>
      <button class="filter-btn" data-filter="content" data-val="3" onclick="setFilter('content', '3', this)">İçerik 3 (Bağlayıcı Ünlü)</button>
      <button class="filter-btn" data-filter="content" data-val="4" onclick="setFilter('content', '4', this)">İçerik 4 (Sondan Başa)</button>
      <button class="filter-btn" data-filter="content" data-val="5" onclick="setFilter('content', '5', this)">İçerik 5 (Okunuş Kuralları)</button>
      <span class="stats-badge" id="stats-badge">Görüntülenen: 70 / 70</span>
    </div>

    <!-- Filter: Format & Tag -->
    <div class="filter-row">
      <span class="filter-label">FORMAT:</span>
      <button class="filter-btn active" data-filter="format" data-val="all" onclick="setFilter('format', 'all', this)">Tümü</button>
      <button class="filter-btn" data-filter="format" data-val="4x5" onclick="setFilter('format', '4x5', this)">4:5 Post (35)</button>
      <button class="filter-btn" data-filter="format" data-val="9x16" onclick="setFilter('format', '9x16', this)">9:16 Reels (35)</button>

      <span class="filter-label" style="margin-left:14px;">TÜR:</span>
      <button class="filter-btn active" data-filter="tag" data-val="all" onclick="setFilter('tag', 'all', this)">Tümü</button>
      <button class="filter-btn" data-filter="tag" data-val="Kapak" onclick="setFilter('tag', 'Kapak', this)">Kapaklar</button>
      <button class="filter-btn" data-filter="tag" data-val="CTA" onclick="setFilter('tag', 'CTA', this)">CTA / Kapanış (10)</button>
    </div>
  </div>

  <div class="gallery-grid" id="gallery-grid">
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
        <a id="modal-download" href="" download="" class="btn-download" style="padding:4px 12px;font-size:12px;">İndir (PNG)</a>
      </div>
    </div>
  </div>

  <script>
    const imagesData = {images_json_str};
    const allIds = {all_ids_json_str};
    let currentIdx = 0;
    let visibleIds = [...allIds];

    let currentFilters = {{
      content: 'all',
      format: 'all',
      tag: 'all'
    }};

    function setFilter(type, val, btn) {{
      currentFilters[type] = val;
      
      // Update active button in row
      const parentRow = btn.parentElement;
      parentRow.querySelectorAll(`[data-filter="${{type}}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      applyFilters();
    }}

    function applyFilters() {{
      const cards = document.querySelectorAll('.card');
      let visibleCount = 0;
      visibleIds = [];

      cards.forEach(card => {{
        const cContent = card.getAttribute('data-content');
        const cFormat = card.getAttribute('data-format');
        const cTag = card.getAttribute('data-tag');
        const cardId = card.id.replace('card-', '');

        let match = true;
        if (currentFilters.content !== 'all' && currentFilters.content !== cContent) match = false;
        if (currentFilters.format !== 'all' && currentFilters.format !== cFormat) match = false;
        if (currentFilters.tag !== 'all' && currentFilters.tag !== cTag) match = false;

        if (match) {{
          card.classList.remove('hidden');
          visibleCount++;
          visibleIds.push(cardId);
        }} else {{
          card.classList.add('hidden');
        }}
      }});

      document.getElementById('stats-badge').innerText = `Görüntülenen: ${{visibleCount}} / 70`;
    }}

    function openModal(id) {{
      const data = imagesData[id];
      if (!data) return;
      currentIdx = visibleIds.indexOf(id);
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
      if (visibleIds.length === 0) return;
      currentIdx = (currentIdx + dir + visibleIds.length) % visibleIds.length;
      openModal(visibleIds[currentIdx]);
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

GALLERY_FILE.write_text(html_template, encoding="utf-8")
print(f"Full gallery written successfully to {GALLERY_FILE} (Size: {len(html_template)} bytes)")
