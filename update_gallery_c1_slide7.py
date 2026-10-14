import base64
from pathlib import Path

art_dir = Path(r"C:\Users\cicek\.gemini\antigravity\brain\c15f47f7-e2d8-4bfd-bcfb-f955194ae309")
desktop = Path(r"C:\Users\cicek\OneDrive\Desktop")

p_4x5 = art_dir / "icerik1_gonderi_07.png"
p_9x16 = art_dir / "icerik1_video_07.png"

b64_4x5 = f"data:image/png;base64,{base64.b64encode(p_4x5.read_bytes()).decode('ascii')}"
b64_9x16 = f"data:image/png;base64,{base64.b64encode(p_9x16.read_bytes()).decode('ascii')}"

html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HealthLexMed — İçerik 1 (7. Sayfa Kapanış Revizyonu)</title>
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
      margin-bottom: 32px;
      max-width: 760px;
    }}
    .header h1 {{ font-size: 28px; font-weight: 900; margin-bottom: 10px; color: #5eead4; }}
    .header p {{ font-size: 15px; font-weight: 600; color: #94A3B8; line-height: 1.55; }}
    
    .gallery-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 30px;
      max-width: 960px;
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
      transition: transform 0.2s ease;
    }}
    .card:hover {{
      transform: translateY(-4px);
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
    }}
  </style>
</head>
<body>

  <div class="header">
    <h1>🎬 İçerik 1 — 7. Sayfa (Kapanış) Revizyonu</h1>
    <p>DM & Yorum çağrılı güncellenen kapanış görseli: 4:5 Instagram Post formatı ve 9:16 dikey Reels video formatı. Görsellere tıklayarak tam boyutta inceleyebilir veya "İndir" butonundan kaydedebilirsiniz.</p>
  </div>

  <div class="gallery-grid">
    <!-- 4:5 Post -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">İçerik 1 (7. Kare): Kapanış & CTA</span>
        <span class="card-badge">Gönderi 7/7</span>
      </div>
      <div class="card-img-wrap">
        <img src="{b64_4x5}" alt="İçerik 1 Gönderi 7" onclick="openModal(this.src)" title="Büyütmek için tıklayın">
      </div>
      <div class="card-footer">
        <span style="font-size:12.5px;color:#94a3b8;">1080 × 1350 px (4:5)</span>
        <a href="{b64_4x5}" download="icerik1_gonderi_07.png" class="btn-download">İndir (icerik1_gonderi_07.png) 📥</a>
      </div>
    </div>

    <!-- 9:16 Video -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">İçerik 1 (7. Kare): Kapanış & CTA</span>
        <span class="card-badge">Reels 7/7</span>
      </div>
      <div class="card-img-wrap">
        <img src="{b64_9x16}" alt="İçerik 1 Reels 7" onclick="openModal(this.src)" title="Büyütmek için tıklayın">
      </div>
      <div class="card-footer">
        <span style="font-size:12.5px;color:#94a3b8;">1080 × 1920 px (9:16)</span>
        <a href="{b64_9x16}" download="icerik1_video_07.png" class="btn-download">İndir (icerik1_video_07.png) 📥</a>
      </div>
    </div>
  </div>

  <div class="modal" id="modal" onclick="closeModal()">
    <span class="modal-close">&times;</span>
    <img id="modalImg" src="" alt="Büyük Görsel" onclick="event.stopPropagation()">
  </div>

  <script>
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
out_file.write_text(html, encoding="utf-8")
print("Gallery successfully updated with only the two revised visuals:", out_file)
