import asyncio
import base64
from pathlib import Path
from playwright.async_api import async_playwright

BASE_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = BASE_DIR / "carousel_output"
OUTPUT_DIR.mkdir(exist_ok=True)

# Colors extracted directly from reference images
BG_LIGHT = "#FAF6F1"      # Warm ivory/cream
BG_DARK = "#17201F"       # Deep forest slate/charcoal
GRADIENT_TEAL = "linear-gradient(165deg, #245855 0%, #347671 60%, #478B87 100%)"

TEAL_ACCENT = "#3A7D7A"    # Teal accent on light bg
MINT_ACCENT = "#5FAFA4"    # Mint accent on dark bg
MINT_LIGHT = "#A7E8DC"     # Light mint on gradient bg

TEXT_DARK = "#17201F"      # Near black on light bg
TEXT_LIGHT = "#FFFFFF"     # White on dark bg
TEXT_MUTED_LIGHT = "#7C7873"  # Muted taupe/gray on light bg
TEXT_MUTED_DARK = "#9EB0AB"   # Soft sage gray on dark bg

BORDER_LIGHT = "#EBE5DC"
BORDER_DARK = "rgba(255, 255, 255, 0.1)"

def get_progress_bar(index, total, is_light):
    pct = ((index + 1) / total) * 100
    track_color = "rgba(0, 0, 0, 0.07)" if is_light else "rgba(255, 255, 255, 0.14)"
    fill_color = TEAL_ACCENT if is_light else "#FFFFFF"
    label_color = TEXT_MUTED_LIGHT if is_light else "rgba(255, 255, 255, 0.55)"
    return f"""
    <div style="position:absolute;bottom:0;left:0;right:0;padding:20px 32px 24px;z-index:10;display:flex;align-items:center;gap:14px;box-sizing:border-box;">
      <div style="flex:1;height:3.5px;background:{track_color};border-radius:2px;overflow:hidden;">
        <div style="height:100%;width:{pct:.1f}%;background:{fill_color};border-radius:2px;"></div>
      </div>
      <span style="font-size:11.5px;color:{label_color};font-weight:500;font-family:'Plus Jakarta Sans',sans-serif;">{index + 1}/{total}</span>
    </div>
    """

def get_swipe_arrow(is_light):
    stroke = "rgba(23, 32, 31, 0.3)" if is_light else "rgba(255, 255, 255, 0.35)"
    return f"""
    <div style="position:absolute;right:10px;top:50%;transform:translateY(-50%);z-index:9;pointer-events:none;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 5l7 7-7 7" stroke="{stroke}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    """

def get_header(is_dark=False):
    avatar_bg = TEAL_ACCENT if not is_dark else "rgba(255,255,255,0.15)"
    text_color = TEXT_LIGHT if is_dark else TEXT_DARK
    return f"""
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:38px;height:38px;border-radius:50%;background:{avatar_bg};color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;letter-spacing:0.5px;border:1px solid rgba(255,255,255,0.12);">
        HL
      </div>
      <div style="font-size:14.5px;font-weight:600;color:{text_color};letter-spacing:-0.2px;">
        HealthLexMed
      </div>
    </div>
    """

# Build slides HTML according to reference screenshots
slides_data = [
    # SLIDE 1 (HOOK - Warm Light BG like Reference 1)
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:420px;height:525px;padding:32px 34px 56px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      <!-- Giant Subtle Monogram Watermark like "SC" in Reference 1 -->
      <div style="position:absolute;top:-20px;right:-15px;font-size:260px;font-weight:800;color:rgba(23,32,31,0.032);line-height:0.8;user-select:none;pointer-events:none;font-family:'Plus Jakarta Sans',sans-serif;">
        HL
      </div>

      <!-- Top Avatar & Name -->
      <div style="z-index:2;">
        {get_header(is_dark=False)}
      </div>

      <!-- Main Content (Generous breathing room like Reference 1) -->
      <div style="z-index:2;margin-top:auto;margin-bottom:24px;">
        <!-- Category Tag -->
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:{TEAL_ACCENT};text-transform:uppercase;margin-bottom:14px;">
          TIBBİ TERMİNOLOJİ
        </div>

        <!-- Headline (Editorial tight spacing ending with period like Reference 1) -->
        <h1 style="font-size:29px;font-weight:800;line-height:1.18;letter-spacing:-0.6px;color:{TEXT_DARK};margin:0 0 16px 0;">
          Binlerce tıbbi terimi ezberlemeyi hemen bırakın.
        </h1>

        <!-- Subtitle -->
        <p style="font-size:14px;line-height:1.5;color:{TEXT_MUTED_LIGHT};margin:0;">
          Tıbbi terimler ezberlenmez, çözülür: Çünkü arkasında tıkır tıkır işleyen bir şifre var.
        </p>
      </div>

      {get_swipe_arrow(is_light=True)}
      {get_progress_bar(0, 7, is_light=True)}
    </div>
    """,

    # SLIDE 2 (Problem vs Solution - Dark BG like Reference 2)
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:420px;height:525px;padding:32px 32px 56px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:{MINT_ACCENT};text-transform:uppercase;margin-bottom:10px;">
          YÖNTEM KARŞILAŞTIRMASI
        </div>

        <h2 style="font-size:27px;font-weight:800;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 12px 0;">
          Ezber çıkmazı vs. yapboz mantığı.
        </h2>

        <p style="font-size:13.5px;line-height:1.5;color:{TEXT_MUTED_DARK};margin:0 0 18px 0;">
          Binlerce kelimeyi tek tek hafızaya atmak bir süre sonra tıkanır. Oysa tıp dili, parçaların birleştiği mantıksal bir yapbozdur.
        </p>
      </div>

      <!-- Two comparison boxes like "SAĞLIKLI OMUZ" vs "DONUK OMUZ" in Reference 2 -->
      <div style="display:flex;gap:12px;margin-bottom:12px;">
        <!-- Box 1 -->
        <div style="flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:14px 12px;">
          <div style="font-size:9.5px;font-weight:700;letter-spacing:1.5px;color:#F87171;text-transform:uppercase;margin-bottom:6px;">
            GELENEKSEL EZBER
          </div>
          <div style="font-size:18px;font-weight:800;color:#FFFFFF;margin-bottom:8px;">
            Çıkmaz Yol
          </div>
          <div style="font-size:11.5px;line-height:1.45;color:{TEXT_MUTED_DARK};">
            • Tek tek ezberleme<br>
            • Yeni terimde çaresizlik<br>
            • Sınavdan sonra unutma
          </div>
        </div>

        <!-- Box 2 -->
        <div style="flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:14px 12px;">
          <div style="font-size:9.5px;font-weight:700;letter-spacing:1.5px;color:{MINT_ACCENT};text-transform:uppercase;margin-bottom:6px;">
            HEALTHLEX MANTIĞI
          </div>
          <div style="font-size:18px;font-weight:800;color:#FFFFFF;margin-bottom:8px;">
            Çözümleme
          </div>
          <div style="font-size:11.5px;line-height:1.45;color:#D1DFDC;">
            • Kök ve ekleri ayırma<br>
            • Kuralları kavrama<br>
            • Tek bakışta çözme
          </div>
        </div>
      </div>

      <div style="font-size:12px;color:#7A8E89;line-height:1.4;margin-bottom:4px;">
        Kelimeleri değil, birleşim kurallarını öğrendiğinizde sistem kendiliğinden çalışır.
      </div>

      {get_swipe_arrow(is_light=False)}
      {get_progress_bar(1, 7, is_light=False)}
    </div>
    """,

    # SLIDE 3 (Deep Dive - Rich Teal Gradient like Reference 3)
    f"""
    <div class="slide" style="background:{GRADIENT_TEAL};color:#FFFFFF;position:relative;width:420px;height:525px;padding:32px 32px 56px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:{MINT_LIGHT};text-transform:uppercase;margin-bottom:10px;">
          TARİH VE STANDARTLAŞMA
        </div>

        <h2 style="font-size:27px;font-weight:800;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 12px 0;">
          Tıp dili neden Latince ve Yunanca?
        </h2>

        <p style="font-size:13.5px;line-height:1.5;color:rgba(255,255,255,0.85);margin:0 0 16px 0;">
          Tıbbi terminoloji tesadüfen seçilmemiştir. Yüzyıllardır değişmeyen iki temel küresel kural üzerine kuruludur.
        </p>
      </div>

      <!-- Callout Box like "HÜCRESEL SEBEBİ" in Reference 3 -->
      <div style="background:rgba(0,0,0,0.18);border:1px solid rgba(255,255,255,0.14);border-radius:14px;padding:16px 18px;margin-bottom:10px;">
        <div style="margin-bottom:14px;">
          <div style="font-size:10px;font-weight:700;letter-spacing:1.8px;color:{MINT_LIGHT};text-transform:uppercase;margin-bottom:4px;">
            1. CANLI BİR DİL DEĞİLDİR
          </div>
          <div style="font-size:12.5px;line-height:1.45;color:rgba(255,255,255,0.92);">
            Latince günümüzde hiçbir ülkenin konuşma dili değildir. Anlam kaymasına uğramaz, şiveleri yoktur ve zamanla değişmez.
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,0.1);margin-bottom:12px;"></div>

        <div>
          <div style="font-size:10px;font-weight:700;letter-spacing:1.8px;color:{MINT_LIGHT};text-transform:uppercase;margin-bottom:4px;">
            2. ULUSLARARASI STANDARTLAŞMA
          </div>
          <div style="font-size:12.5px;line-height:1.45;color:rgba(255,255,255,0.92);">
            Anatomi terimleri <em>Terminologia Anatomica</em> ile küresel olarak sabitlenmiştir. Nereye giderseniz gidin yazılan yapı herkes için aynıdır.
          </div>
        </div>
      </div>

      <div style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.4;margin-bottom:4px;">
        Evrensel bir tıp dili, sıfır karışıklık ve küresel ortak akıl demektir.
      </div>

      {get_swipe_arrow(is_light=False)}
      {get_progress_bar(2, 7, is_light=False)}
    </div>
    """,

    # SLIDE 4 (Division of Labor - Light BG with 01, 02 Numbered List like Reference 4)
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:420px;height:525px;padding:32px 34px 56px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:{TEAL_ACCENT};text-transform:uppercase;margin-bottom:10px;">
          GÖREV PAYLAŞIMI
        </div>

        <h2 style="font-size:27px;font-weight:800;line-height:1.2;letter-spacing:-0.5px;color:{TEXT_DARK};margin:0 0 16px 0;">
          Kökenler arasındaki iş bölümü.
        </h2>
      </div>

      <!-- Numbered Rows with large thin numbers like Reference 4 -->
      <div style="display:flex;flex-direction:column;margin-bottom:14px;">
        <!-- Row 01 -->
        <div style="display:flex;align-items:flex-start;gap:16px;padding:14px 0;border-bottom:1px solid {BORDER_LIGHT};">
          <span style="font-size:32px;font-weight:300;color:{TEAL_ACCENT};min-width:38px;line-height:1;font-family:'Plus Jakarta Sans',sans-serif;">01</span>
          <div>
            <div style="font-size:14.5px;font-weight:700;color:{TEXT_DARK};margin-bottom:4px;">
              Latince Kökenler <span style="font-weight:400;color:{TEXT_MUTED_LIGHT};">· Anatomi</span>
            </div>
            <div style="font-size:12.5px;line-height:1.5;color:{TEXT_MUTED_LIGHT};">
              Vücudun <strong>normal yapısını ve organları</strong> tanımlar.<br>
              <span style="color:#524F4A;">Örnek: Kemikler, kaslar, organların anatomik duruşu.</span>
            </div>
          </div>
        </div>

        <!-- Row 02 -->
        <div style="display:flex;align-items:flex-start;gap:16px;padding:14px 0;">
          <span style="font-size:32px;font-weight:300;color:{TEAL_ACCENT};min-width:38px;line-height:1;font-family:'Plus Jakarta Sans',sans-serif;">02</span>
          <div>
            <div style="font-size:14.5px;font-weight:700;color:{TEXT_DARK};margin-bottom:4px;">
              Grekçe / Yunanca <span style="font-weight:400;color:{TEXT_MUTED_LIGHT};">· Klinik</span>
            </div>
            <div style="font-size:12.5px;line-height:1.5;color:{TEXT_MUTED_LIGHT};">
              <strong>Hastalıkları, semptomları ve cerrahi</strong> işlemleri tanımlar.<br>
              <span style="color:#524F4A;">Örnek: İltihabi durumlar (-it), kesi/ameliyatlar (-ektomi).</span>
            </div>
          </div>
        </div>
      </div>

      <div style="font-size:12px;color:{TEXT_MUTED_LIGHT};margin-bottom:4px;line-height:1.4;">
        Formül çok net: Normal yapı Latince, hastalık ve cerrahi müdahale Yunanca.
      </div>

      {get_swipe_arrow(is_light=True)}
      {get_progress_bar(3, 7, is_light=True)}
    </div>
    """,

    # SLIDE 5 (Benefits - Dark BG with Feature Pills like Reference 5)
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:420px;height:525px;padding:32px 32px 56px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:{MINT_ACCENT};text-transform:uppercase;margin-bottom:10px;">
          SİSTEMİN KAZANIMLARI
        </div>

        <h2 style="font-size:27px;font-weight:800;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 12px 0;">
          Bu sistem size ne kazandıracak?
        </h2>

        <p style="font-size:13.5px;line-height:1.5;color:{TEXT_MUTED_DARK};margin:0 0 18px 0;">
          Ezber yükünü bir kenara bıraktığınızda, tıp dilini bir yapboz gibi tek bakışta çözmeye başlarsınız.
        </p>

        <!-- Sub-label like Reference 5 -->
        <div style="font-size:10.5px;font-weight:700;letter-spacing:2px;color:{MINT_ACCENT};text-transform:uppercase;margin-bottom:10px;">
          BU YÖNTEMLE KAZANILANLAR
        </div>

        <!-- Short Pill Tags (Image 5 style) -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          <span style="font-size:12px;padding:6px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;color:#D1DFDC;">🎯 Hızlı kavrama</span>
          <span style="font-size:12px;padding:6px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;color:#D1DFDC;">📚 Kalıcı hafıza</span>
          <span style="font-size:12px;padding:6px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;color:#D1DFDC;">🎓 Klinik iletişim</span>
          <span style="font-size:12px;padding:6px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;color:#D1DFDC;">🧩 Yapboz mantığı</span>
        </div>

        <!-- Benefit description row -->
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px 14px;font-size:12px;line-height:1.45;color:{TEXT_MUTED_DARK};">
          <strong style="color:#FFF;">Özet:</strong> Parçaların anlamını bildiğiniz için sınav sonrası unutmaz, sağlık profesyonelleri arasında <strong>daha az hatayla ve güvenle</strong> bilgi akışı sağlarsınız.
        </div>
      </div>

      <div style="font-size:12px;color:#7A8E89;line-height:1.4;margin-bottom:4px;">
        Ezber geçicidir; kök ve eklerin mantığı ise meslek hayatı boyunca kalır.
      </div>

      {get_swipe_arrow(is_light=False)}
      {get_progress_bar(4, 7, is_light=False)}
    </div>
    """,

    # SLIDE 6 (Summary Formula - Warm Light BG like Reference 1 & 4)
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:420px;height:525px;padding:32px 34px 56px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:{TEAL_ACCENT};text-transform:uppercase;margin-bottom:10px;">
          ÖZET FORMÜL
        </div>

        <h2 style="font-size:27px;font-weight:800;line-height:1.2;letter-spacing:-0.5px;color:{TEXT_DARK};margin:0 0 16px 0;">
          Tıbbın dili bir yapbozdur.
        </h2>
      </div>

      <!-- Core Formula Cards -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px;">
        <div style="background:#FFFFFF;border:1px solid {BORDER_LIGHT};border-radius:14px;padding:14px 16px;display:flex;align-items:flex-start;gap:10px;">
          <span style="color:{TEAL_ACCENT};font-size:15px;line-height:1.2;">🔹</span>
          <div style="font-size:13px;line-height:1.45;color:{TEXT_DARK};">
            Tıbbi terminoloji devasa bir kelime öbeği değil, <strong>mantıksal bir sistemdir</strong>.
          </div>
        </div>

        <div style="background:#FFFFFF;border:1px solid {BORDER_LIGHT};border-radius:14px;padding:14px 16px;display:flex;align-items:flex-start;gap:10px;">
          <span style="color:{TEAL_ACCENT};font-size:15px;line-height:1.2;">🔹</span>
          <div style="font-size:13px;line-height:1.45;color:{TEXT_DARK};">
            Parçaları birleştirmeyi öğrendiğinde tıp dilini <strong>ana dilin gibi okumaya başlarsın</strong>.
          </div>
        </div>

        <!-- Highlight Callout -->
        <div style="background:rgba(58,125,122,0.1);border:1px solid rgba(58,125,122,0.25);border-radius:14px;padding:14px 16px;text-align:center;">
          <div style="font-size:13.5px;font-weight:800;color:{TEAL_ACCENT};">
            🚀 Şimdi terimlerin yapı taşlarını keşfetmeye başlayalım!
          </div>
        </div>
      </div>

      <div style="font-size:12px;color:{TEXT_MUTED_LIGHT};margin-bottom:4px;line-height:1.4;">
        Rehberin devamı ve kaynak bağlantısı sonraki sayfada 👉
      </div>

      {get_swipe_arrow(is_light=True)}
      {get_progress_bar(5, 7, is_light=True)}
    </div>
    """,

    # SLIDE 7 (CTA - Rich Deep Teal Gradient, NO ARROW, FULL PROGRESS BAR)
    f"""
    <div class="slide" style="background:{GRADIENT_TEAL};color:#FFFFFF;position:relative;width:420px;height:525px;padding:34px 32px 56px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;text-align:center;overflow:hidden;">
      <!-- Top Brand Lockup -->
      <div style="display:flex;justify-content:center;">
        {get_header(is_dark=True)}
      </div>

      <!-- Main CTA Content -->
      <div style="margin:auto 0;">
        <div style="display:inline-block;font-size:10px;font-weight:700;letter-spacing:2px;color:{MINT_LIGHT};background:rgba(255,255,255,0.12);padding:5px 14px;border-radius:20px;text-transform:uppercase;margin-bottom:14px;">
          TIBBİ TERMİNOLOJİ REHBERİ
        </div>

        <h2 style="font-size:25px;font-weight:800;line-height:1.22;margin:0 0 12px 0;letter-spacing:-0.5px;">
          Tıbbi terimlerin şifresini birlikte çözelim.
        </h2>

        <p style="font-size:13.5px;line-height:1.55;color:rgba(255,255,255,0.9);margin:0 auto 20px;max-width:320px;">
          📌 Tıp ve sağlık bilimlerinde okuyan arkadaşına göndermeyi ve kaydetmeyi unutma! Daha fazlası için takipte kal.
        </p>

        <!-- CTA Box -->
        <div style="background:#FFFFFF;color:{TEXT_DARK};border-radius:14px;padding:14px 20px;box-shadow:0 12px 30px rgba(0,0,0,0.25);display:inline-flex;flex-direction:column;align-items:center;gap:4px;width:88%;box-sizing:border-box;">
          <span style="font-size:11px;font-weight:600;color:{TEXT_MUTED_LIGHT};">Rehberin tamamına ulaşmak için:</span>
          <span style="font-size:16px;font-weight:800;color:{TEAL_ACCENT};letter-spacing:-0.3px;">healthlexmed.com/rehber</span>
        </div>
      </div>

      <!-- Action badges -->
      <div style="display:flex;justify-content:center;gap:18px;margin-bottom:6px;">
        <div style="display:flex;align-items:center;gap:5px;font-size:11.5px;color:rgba(255,255,255,0.85);font-weight:600;">
          <span>❤️</span> Beğen
        </div>
        <div style="display:flex;align-items:center;gap:5px;font-size:11.5px;color:rgba(255,255,255,0.85);font-weight:600;">
          <span>💬</span> Yorum Yap
        </div>
        <div style="display:flex;align-items:center;gap:5px;font-size:11.5px;color:rgba(255,255,255,0.85);font-weight:600;">
          <span>↗️</span> Paylaş
        </div>
        <div style="display:flex;align-items:center;gap:5px;font-size:11.5px;color:rgba(255,255,255,0.85);font-weight:600;">
          <span>🔖</span> Kaydet
        </div>
      </div>

      {get_progress_bar(6, 7, is_light=False)}
    </div>
    """
]

# Write HTML Template with IG Frame
html_template = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HealthLexMed — Instagram Carousel (Editorial Style)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    }}
    body {{
      background: #0E1626;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 40px 16px;
      color: #F8FAFC;
    }}
    .preview-title {{
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #94A3B8;
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .ig-frame {{
      width: 420px;
      background: #FFFFFF;
      border-radius: 18px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
      overflow: hidden;
      color: #0F172A;
      position: relative;
    }}
    .ig-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: #FFFFFF;
      border-bottom: 1px solid #F1F5F9;
    }}
    .ig-avatar-group {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .ig-avatar-circle {{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: {TEAL_ACCENT};
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 13px;
    }}
    .ig-user-info {{
      display: flex;
      flex-direction: column;
    }}
    .ig-username {{
      font-size: 13px;
      font-weight: 700;
      color: #0F172A;
      display: flex;
      align-items: center;
      gap: 4px;
    }}
    .ig-badge {{
      color: {TEAL_ACCENT};
      font-size: 12px;
    }}
    .ig-location {{
      font-size: 11px;
      color: #64748B;
    }}
    .ig-more {{
      color: #64748B;
      font-size: 18px;
      cursor: pointer;
    }}
    .carousel-viewport {{
      width: 420px;
      height: 525px;
      position: relative;
      overflow: hidden;
      cursor: grab;
      user-select: none;
    }}
    .carousel-viewport:active {{
      cursor: grabbing;
    }}
    .carousel-track {{
      display: flex;
      width: {len(slides_data) * 420}px;
      height: 100%;
      transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1);
    }}
    .slide {{
      width: 420px;
      height: 525px;
      flex-shrink: 0;
    }}
    .ig-actions {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px 8px;
    }}
    .ig-actions-left {{
      display: flex;
      gap: 16px;
    }}
    .ig-icon {{
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .ig-dots {{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      padding: 4px 0 8px;
    }}
    .ig-dot {{
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #CBD5E1;
      transition: all 0.2s ease;
      cursor: pointer;
    }}
    .ig-dot.active {{
      background: {TEAL_ACCENT};
      width: 8px;
      height: 8px;
    }}
    .ig-caption {{
      padding: 4px 16px 16px;
      font-size: 12.5px;
      line-height: 1.45;
      color: #1E293B;
    }}
    .ig-caption strong {{
      color: #0F172A;
      margin-right: 4px;
    }}
    .ig-tags {{
      color: {TEAL_ACCENT};
      font-weight: 500;
      margin-top: 4px;
      display: block;
    }}
    .ig-time {{
      font-size: 10px;
      color: #94A3B8;
      margin-top: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}
    .nav-buttons {{
      display: flex;
      gap: 12px;
      margin-top: 18px;
    }}
    .nav-btn {{
      background: #1E293B;
      color: #F8FAFC;
      border: 1px solid #334155;
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }}
    .nav-btn:hover {{
      background: #334155;
    }}
  </style>
</head>
<body>

  <div class="preview-title">
    <span>📱</span> Instagram Carousel Önizleme (HealthLexMed)
  </div>

  <div class="ig-frame">
    <!-- Header -->
    <div class="ig-header">
      <div class="ig-avatar-group">
        <div class="ig-avatar-circle">HL</div>
        <div class="ig-user-info">
          <span class="ig-username">healthlexmed <span class="ig-badge">●</span></span>
          <span class="ig-location">Sağlık & Tıbbi Terminoloji</span>
        </div>
      </div>
      <div class="ig-more">•••</div>
    </div>

    <!-- Carousel Viewport -->
    <div class="carousel-viewport" id="carouselViewport">
      <div class="carousel-track" id="carouselTrack">
        {''.join(slides_data)}
      </div>
    </div>

    <!-- Actions -->
    <div class="ig-actions">
      <div class="ig-actions-left">
        <div class="ig-icon" title="Beğen">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </div>
        <div class="ig-icon" title="Yorum">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </div>
        <div class="ig-icon" title="Paylaş">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </div>
      </div>
      <!-- Dots -->
      <div class="ig-dots" id="igDots">
        {''.join([f'<div class="ig-dot{" active" if i==0 else ""}" onclick="goToSlide({i})"></div>' for i in range(len(slides_data))])}
      </div>
      <!-- Bookmark -->
      <div class="ig-icon" title="Kaydet">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
      </div>
    </div>

    <!-- Caption -->
    <div class="ig-caption">
      <strong>healthlexmed</strong> Binlerce tıbbi terimi tek tek ezberlemek yerine parçalarına ayırarak nasıl tek bakışta çözeceğinizi keşfedin! 🩺🧩 Tıbbi terminoloji devasa bir kelime öbeği değil; mantıksal bir yapbozdur.
      <span class="ig-tags">#tıbbiterminoloji #tıpöğrencisi #healthlexmed #anatomi #tıpeğitimi #doktor #fizyoterapi #hemşirelik</span>
      <div class="ig-time">2 SAAT ÖNCE</div>
    </div>
  </div>

  <div class="nav-buttons">
    <button class="nav-btn" onclick="prevSlide()">← Önceki Slayt</button>
    <button class="nav-btn" onclick="nextSlide()">Sonraki Slayt →</button>
  </div>

  <script>
    const totalSlides = {len(slides_data)};
    let currentIndex = 0;
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.ig-dot');
    const viewport = document.getElementById('carouselViewport');

    function updateCarousel() {{
      track.style.transform = `translateX(-${{currentIndex * 420}}px)`;
      dots.forEach((dot, idx) => {{
        dot.classList.toggle('active', idx === currentIndex);
      }});
    }}

    function goToSlide(idx) {{
      currentIndex = Math.max(0, Math.min(totalSlides - 1, idx));
      updateCarousel();
    }}

    function nextSlide() {{
      if (currentIndex < totalSlides - 1) {{
        currentIndex++;
        updateCarousel();
      }}
    }}

    function prevSlide() {{
      if (currentIndex > 0) {{
        currentIndex--;
        updateCarousel();
      }}
    }}

    let startX = 0;
    let isDragging = false;

    viewport.addEventListener('pointerdown', (e) => {{
      isDragging = true;
      startX = e.clientX;
    }});

    window.addEventListener('pointerup', (e) => {{
      if (!isDragging) return;
      isDragging = false;
      const diffX = e.clientX - startX;
      if (diffX < -40) {{
        nextSlide();
      }} else if (diffX > 40) {{
        prevSlide();
      }}
    }});
  </script>
</body>
</html>
"""

html_path = OUTPUT_DIR / "carousel.html"
html_path.write_text(html_template, encoding="utf-8")
print(f"Generated HTML carousel at: {html_path}")

# Run Playwright to export slides as 1080x1350px PNGs
async def export_slides():
    VIEW_W = 420
    VIEW_H = 525
    SCALE = 1080 / 420  # 2.5714...

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=SCALE,
        )

        html_content = html_path.read_text(encoding="utf-8")
        await page.set_content(html_content, wait_until="networkidle")
        await page.wait_for_timeout(3000)  # Wait for Google Fonts to load

        # Hide the Instagram frame chrome, show only the slide viewport
        await page.evaluate("""() => {
            document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption,.preview-title,.nav-buttons')
                .forEach(el => el.style.display='none');
            const frame = document.querySelector('.ig-frame');
            if (frame) {
                frame.style.cssText = 'width:420px;height:525px;max-width:none;border-radius:0;box-shadow:none;overflow:hidden;margin:0;';
            }
            const viewport = document.querySelector('.carousel-viewport');
            if (viewport) {
                viewport.style.cssText = 'width:420px;height:525px;aspect-ratio:unset;overflow:hidden;cursor:default;';
            }
            document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;background:transparent;';
        }""")
        await page.wait_for_timeout(500)

        for i in range(len(slides_data)):
            await page.evaluate("""(idx) => {
                const track = document.querySelector('.carousel-track');
                track.style.transition = 'none';
                track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
            }""", i)
            await page.wait_for_timeout(400)

            img_bytes = await page.screenshot(
                clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H}
            )
            out_png = OUTPUT_DIR / f"slide_{i+1}.png"
            for attempt in range(5):
                try:
                    with open(out_png, "wb") as f:
                        f.write(img_bytes)
                    break
                except OSError:
                    await asyncio.sleep(0.5)
            print(f"Exported slide {i+1}/{len(slides_data)} -> {out_png.name}")

        await browser.close()
        print("All slides exported successfully in reference style!")

asyncio.run(export_slides())
