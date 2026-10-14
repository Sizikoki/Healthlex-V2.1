import base64
from pathlib import Path

art_dir = Path(r"C:\Users\cicek\.gemini\antigravity\brain\c15f47f7-e2d8-4bfd-bcfb-f955194ae309")
desktop = Path(r"C:\Users\cicek\OneDrive\Desktop")

def load_slides(prefix, count=7):
    slides_4x5 = []
    slides_9x16 = []
    for i in range(1, count + 1):
        fn_4x5 = f"{prefix}_gonderi_{i:02d}.png"
        p_4x5 = art_dir / fn_4x5
        b64_4x5 = f"data:image/png;base64,{base64.b64encode(p_4x5.read_bytes()).decode('ascii')}" if p_4x5.exists() else ""
        slides_4x5.append((b64_4x5, fn_4x5))

        fn_9x16 = f"{prefix}_video_{i:02d}.png"
        p_9x16 = art_dir / fn_9x16
        b64_9x16 = f"data:image/png;base64,{base64.b64encode(p_9x16.read_bytes()).decode('ascii')}" if p_9x16.exists() else ""
        slides_9x16.append((b64_9x16, fn_9x16))
    return slides_4x5, slides_9x16

c1_4x5, c1_9x16 = load_slides("icerik1")
c2_4x5, c2_9x16 = load_slides("icerik2")
c3_4x5, c3_9x16 = load_slides("icerik3")
c4_4x5, c4_9x16 = load_slides("icerik4")
c5_4x5, c5_9x16 = load_slides("icerik5")

titles_c1 = [
    "1. Kare: Binlerce Tıbbi Terimi Ezberlemeyi Hemen Bırak",
    "2. Kare: Ezber Çıkmazı vs. Yapboz Mantığı",
    "3. Kare: Neden Latince ve Yunanca?",
    "4. Kare: Kökenler Arasındaki İş Bölümü",
    "5. Kare: Bu Sistem Sana Ne Kazandıracak?",
    "6. Kare: Özet Formül: Tıbbın Dili Bir Yapbozdur",
    "7. Kare: Kapanış & CTA: Şifreyi Birlikte Çözelim"
]

titles_c2 = [
    "1. Kare: Tıbbi Terimlerin 4 Yapı Taşı (Kapak)",
    "2. Kare: 1. Yapı Taşı: Kök (Word Root)",
    "3. Kare: 2. Yapı Taşı: Ön Ek (Prefix)",
    "4. Kare: 3. Yapı Taşı: Son Ek (Suffix)",
    "5. Kare: 4. Yapı Taşı: Bağlayıcı Ünlü (Combining Vowel)",
    "6. Kare: Terim Yapı Formülü & Örnek Çözümleme",
    "7. Kare: Kapanış & CTA: Seriyi Kaçırmamak İçin Takip Et"
]

titles_c3 = [
    "1. Kare: Tıbbi Terimlerin Arasındaki 'o' Harfi Ne İş Yapıyor? (Kapak)",
    "2. Kare: Bağlayıcı Ünlü Nedir? (Temel Mantık)",
    "3. Kare: Kural Ne Zaman Geçerli? (3 Temel Durum)",
    "4. Kare: Daha Az Bilinen İstisnalar! (chole, pelvi)",
    "5. Kare: Farklı Parça Kombinasyonları",
    "6. Kare: Özet İpucu: 'o' Harfi Ek Değil, Köprüdür",
    "7. Kare: Kapanış & CTA: Bu İstisnaları Duymuş Muydun?"
]

titles_c4 = [
    "1. Kare: Tıbbi Terimleri Soldan Sağa Okuma! (Kapak)",
    "2. Kare: Neden Sondan Başa? (Temel Yöntem)",
    "3. Kare: 3 Adımlı Çözümleme Yöntemi",
    "4. Kare: Örnek Uygulama 1: gastroenteritis",
    "5. Kare: Örnek Uygulama 2: electrocardiogram",
    "6. Kare: Önemli Klinik Not: osteoarthritis Örneği",
    "7. Kare: Kapanış & CTA: Bu Formülü Kaydet!"
]

titles_c5 = [
    "1. Kare: Tıbbi Latinceyi Doğru Okuyor Musun? (Kapak)",
    "2. Kare: C Harfinin Okunuşu (scapula, cerebrum)",
    "3. Kare: G Harfinin Okunuşu (gaster, digitus)",
    "4. Kare: Y Harfinin Okunuşu (thymus, myocardium)",
    "5. Kare: X Harfinin Okunuşu (thorax, xiphoid)",
    "6. Kare: Çok Önemli Ayrım: Latince vs. Türkçe İmla",
    "7. Kare: Kapanış & CTA: Doğru Telaffuz Özgüven Kazandırır"
]

def render_cards(slides, titles, badge_prefix, is_video=False):
    html = ""
    for ((b64, fn), title) in zip(slides, titles):
        dim = "1080 × 1920 px (9:16)" if is_video else "1080 × 1350 px (4:5)"
        img_style = "max-height:480px;" if is_video else ""
        try:
            fn_num = int(fn.split('_')[-1].split('.')[0])
            badge_text = f"{badge_prefix} {fn_num}/7"
        except Exception:
            badge_text = badge_prefix
        html += f"""
        <div class="card">
          <div class="card-header">
            <span class="card-title">{title}</span>
            <span class="card-badge">{badge_text}</span>
          </div>
          <div class="card-img-wrap">
            <img src="{b64}" alt="{title}" onclick="openModal(this.src)" title="Büyütmek için tıklayın" style="{img_style}">
          </div>
          <div class="card-footer">
            <span style="font-size:12px;color:#94a3b8;">{dim}</span>
            <a href="{b64}" download="{fn}" class="btn-download">İndir ({fn}) 📥</a>
          </div>
        </div>
        """
    return html

cards_c1_4x5 = render_cards(c1_4x5, titles_c1, "Gönderi")
cards_c1_9x16 = render_cards(c1_9x16, titles_c1, "Reels", is_video=True)

cards_c2_4x5 = render_cards(c2_4x5, titles_c2, "Gönderi")
cards_c2_9x16 = render_cards(c2_9x16, titles_c2, "Reels", is_video=True)

cards_c3_4x5 = render_cards(c3_4x5, titles_c3, "Gönderi")
cards_c3_9x16 = render_cards(c3_9x16, titles_c3, "Reels", is_video=True)

cards_c4_4x5 = render_cards(c4_4x5, titles_c4, "Gönderi")
cards_c4_9x16 = render_cards(c4_9x16, titles_c4, "Reels", is_video=True)

cards_c5_4x5 = render_cards(c5_4x5, titles_c5, "Gönderi")
cards_c5_9x16 = render_cards(c5_9x16, titles_c5, "Reels", is_video=True)

full_html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HealthLexMed — Sosyal Medya & Video Görselleri Galerisi</title>
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
      margin-bottom: 28px;
      max-width: 750px;
    }}
    .header h1 {{ font-size: 28px; font-weight: 900; margin-bottom: 8px; color: #5eead4; }}
    .header p {{ font-size: 15px; font-weight: 600; color: #94A3B8; line-height: 1.5; }}
    
    .nav-sections {{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      margin-bottom: 30px;
    }}
    .content-selector {{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      background: #08101e;
      padding: 6px;
      border-radius: 36px;
      border: 1px solid rgba(255,255,255,0.1);
    }}
    .content-btn {{
      background: transparent;
      color: #94A3B8;
      border: none;
      padding: 10px 18px;
      border-radius: 28px;
      font-size: 13.5px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .content-btn.active {{
      background: #0f766e;
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(15,118,110,0.4);
    }}

    .format-selector {{
      display: flex;
      gap: 10px;
    }}
    .format-btn {{
      background: #182a4a;
      color: #94A3B8;
      border: 1px solid rgba(255,255,255,0.1);
      padding: 9px 20px;
      border-radius: 24px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .format-btn:hover {{ background: #23385e; color: #FFF; }}
    .format-btn.active {{
      background: #5eead4;
      color: #0f1b33;
      border-color: #5eead4;
      font-weight: 800;
    }}

    .gallery-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
      gap: 24px;
      max-width: 1240px;
      width: 100%;
    }}
    .card {{
      background: #162032;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      box-shadow: 0 12px 30px rgba(0,0,0,0.35);
      transition: transform 0.2s ease;
    }}
    .card:hover {{
      transform: translateY(-3px);
    }}
    .card-header {{
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1E293B;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }}
    .card-title {{ font-size: 13.5px; font-weight: 700; color: #E2E8F0; }}
    .card-badge {{ font-size: 11px; background: rgba(94, 234, 212, 0.15); color: #5eead4; padding: 3px 10px; border-radius: 12px; font-weight: 800; }}
    .card-img-wrap {{
      background: #090E1A;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      min-height: 380px;
    }}
    .card-img-wrap img {{
      max-width: 100%;
      height: auto;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
    }}
    .card-footer {{
      padding: 14px 18px;
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
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      transition: background 0.2s;
    }}
    .btn-download:hover {{ background: #115e59; }}

    /* Modal for big view */
    .modal {{
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.88);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }}
    .modal.active {{ display: flex; }}
    .modal img {{
      max-height: 90vh;
      max-width: 90vw;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.8);
    }}
    .modal-close {{
      position: absolute;
      top: 24px;
      right: 28px;
      font-size: 32px;
      color: #FFF;
      cursor: pointer;
      font-weight: 300;
    }}
  </style>
</head>
<body>

  <div class="header">
    <h1>🎬 HealthLexMed Görsel Galerisi</h1>
    <p>Hem 4:5 Instagram Carousel gönderileri hem de 9:16 dikey video kareleri tam çözünürlükte hazır. Görsellere tıklayarak tam boyutta inceleyebilir veya "İndir" butonundan kaydedebilirsiniz.</p>
  </div>

  <div class="nav-sections">
    <div class="content-selector">
      <button class="content-btn" onclick="selectContent(1)" id="cbtn1">1. İÇERİK</button>
      <button class="content-btn" onclick="selectContent(2)" id="cbtn2">2. İÇERİK</button>
      <button class="content-btn" onclick="selectContent(3)" id="cbtn3">3. İÇERİK</button>
      <button class="content-btn" onclick="selectContent(4)" id="cbtn4">4. İÇERİK</button>
      <button class="content-btn active" onclick="selectContent(5)" id="cbtn5">5. İÇERİK: Okunuş Kuralları (C, G, Y, X) 🗣️</button>
    </div>

    <div class="format-selector">
      <button class="format-btn active" onclick="selectFormat('4x5')" id="fbtn4x5">4:5 Dikey Post Formatı (1080×1350)</button>
      <button class="format-btn" onclick="selectFormat('9x16')" id="fbtn9x16">9:16 Reels / Shorts Formatı (1080×1920)</button>
    </div>
  </div>

  <!-- Content 1 -->
  <div id="c1_4x5" class="gallery-grid" style="display:none;">{cards_c1_4x5}</div>
  <div id="c1_9x16" class="gallery-grid" style="display:none;">{cards_c1_9x16}</div>

  <!-- Content 2 -->
  <div id="c2_4x5" class="gallery-grid" style="display:none;">{cards_c2_4x5}</div>
  <div id="c2_9x16" class="gallery-grid" style="display:none;">{cards_c2_9x16}</div>

  <!-- Content 3 -->
  <div id="c3_4x5" class="gallery-grid" style="display:none;">{cards_c3_4x5}</div>
  <div id="c3_9x16" class="gallery-grid" style="display:none;">{cards_c3_9x16}</div>

  <!-- Content 4 -->
  <div id="c4_4x5" class="gallery-grid" style="display:none;">{cards_c4_4x5}</div>
  <div id="c4_9x16" class="gallery-grid" style="display:none;">{cards_c4_9x16}</div>

  <!-- Content 5 -->
  <div id="c5_4x5" class="gallery-grid">{cards_c5_4x5}</div>
  <div id="c5_9x16" class="gallery-grid" style="display:none;">{cards_c5_9x16}</div>

  <div class="modal" id="modal" onclick="closeModal()">
    <span class="modal-close">&times;</span>
    <img id="modalImg" src="" alt="Büyük Görsel" onclick="event.stopPropagation()">
  </div>

  <script>
    let currentContent = 5;
    let currentFormat = '4x5';

    function updateView() {{
      const grids = ['c1_4x5', 'c1_9x16', 'c2_4x5', 'c2_9x16', 'c3_4x5', 'c3_9x16', 'c4_4x5', 'c4_9x16', 'c5_4x5', 'c5_9x16'];
      grids.forEach(id => {{
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      }});

      const activeId = `c${{currentContent}}_${{currentFormat}}`;
      const el = document.getElementById(activeId);
      if (el) el.style.display = 'grid';

      for (let i = 1; i <= 5; i++) {{
        const btn = document.getElementById(`cbtn${{i}}`);
        if (btn) btn.classList.toggle('active', currentContent === i);
      }}

      document.getElementById('fbtn4x5').classList.toggle('active', currentFormat === '4x5');
      document.getElementById('fbtn9x16').classList.toggle('active', currentFormat === '9x16');
    }}

    function selectContent(c) {{
      currentContent = c;
      updateView();
    }}

    function selectFormat(f) {{
      currentFormat = f;
      updateView();
    }}

    function openModal(src) {{
      document.getElementById('modalImg').src = src;
      document.getElementById('modal').classList.add('active');
    }}

    function closeModal() {{
      document.getElementById('modal').classList.remove('active');
    }}

    document.addEventListener('keydown', (e) => {{
      if (e.key === 'Escape') closeModal();
    }});
  </script>
</body>
</html>
"""

out_file = desktop / "Video_Gorselleri_Galerisi.html"
out_file.write_text(full_html, encoding="utf-8")
print("Gallery successfully updated on Desktop with Content 5:", out_file)
