import asyncio
import base64
from pathlib import Path
from playwright.async_api import async_playwright

BASE_DIR = Path(__file__).resolve().parent
OUTPUT_4X5 = BASE_DIR / "video_output_4x5"
OUTPUT_9X16 = BASE_DIR / "video_output_9x16"
OUTPUT_4X5.mkdir(exist_ok=True)
OUTPUT_9X16.mkdir(exist_ok=True)

# Logo source from frontend
LOGO_FILE = BASE_DIR / "frontend" / "public" / "logo-mark.png"
LOGO_B64 = f"data:image/png;base64,{base64.b64encode(LOGO_FILE.read_bytes()).decode('ascii')}"

# Exact brand colors
BG_LIGHT = "#f5f7fb"       # Açık zemin (krem yerine)
BG_DARK = "#0f1b33"        # Koyu zemin (yeşilimsi siyah yerine)
BG_TURQUOISE = "#0b5f5c"   # Turkuaz zemin (düz renk, gradient yerine)

TITLE_LIGHT = "#0f1b33"
TEXT_DARK = "#0f1b33"
TEXT_MUTED_LIGHT = "#64748b"
BORDER_LIGHT = "#e2e8f0"
CARD_LIGHT = "#ffffff"

TITLE_DARK = "#ffffff"
TEXT_LIGHT = "#ffffff"
TEXT_MUTED_DARK = "#94a3b8"
BORDER_DARK = "rgba(255, 255, 255, 0.08)"
CARD_DARK = "#182a4a"

TITLE_TURQUOISE = "#ffffff"
TEXT_MUTED_TURQUOISE = "rgba(255, 255, 255, 0.88)"
CARD_TURQUOISE = "#0e6f6b"
BORDER_TURQUOISE = "rgba(255, 255, 255, 0.12)"

# Vurgu ve üst etiket rengi: açık zeminde #0f766e, koyu ve turkuaz zeminde #5eead4
ACCENT_LIGHT = "#0f766e"
ACCENT_DARK = "#5eead4"
ACCENT_TURQUOISE = "#5eead4"

def get_svg_icon(name, color="#5eead4", size=18):
    if name == "target":
        inner = """<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>"""
    elif name == "book":
        inner = """<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>"""
    elif name == "graduation-cap":
        inner = """<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>"""
    elif name == "puzzle":
        inner = """<path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"></path>"""
    elif name == "arrow-right":
        inner = """<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>"""
    elif name == "heart":
        inner = """<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>"""
    elif name == "message-circle":
        inner = """<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>"""
    elif name == "send":
        inner = """<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path>"""
    elif name == "bookmark":
        inner = """<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>"""
    else:
        inner = ""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;vertical-align:middle;">{inner}</svg>"""

def get_header(is_dark=False, is_turquoise=False, scale=1.0):
    size = int(36 * scale)
    font_size = int(17 * scale)
    if not is_dark and not is_turquoise:
        text_health_med = "#0f2a4a"
        text_lex = "#0f766e"
    else:
        text_health_med = "#ffffff"
        text_lex = "#5eead4"

    return f"""
    <div style="display:flex;align-items:center;gap:{int(11 * scale)}px;">
      <img src="{LOGO_B64}" alt="HealthLexMed Logo" style="width:{size}px;height:{size}px;object-fit:contain;" />
      <div style="font-size:{font_size}px;font-weight:900;letter-spacing:-0.3px;line-height:1;font-family:'Nunito',sans-serif;">
        <span style="color:{text_health_med};">Health</span><span style="color:{text_lex};font-family:'Nunito',serif;font-style:italic;font-weight:800;">Lex</span><span style="color:{text_health_med};">Med</span>
      </div>
    </div>
    """

def get_4x5_footer(slide_index, is_dark=False, is_turquoise=False):
    """Generates thin progress bar + 'X/7' indicator for 4:5 post slides."""
    pct = (slide_index / 7.0) * 100
    if not is_dark and not is_turquoise:
        track_bg = "#e2e8f0"
        fill_bg = "#0f766e"
        text_color = "#64748b"
    elif is_dark:
        track_bg = "rgba(255, 255, 255, 0.12)"
        fill_bg = "#5eead4"
        text_color = "#94a3b8"
    else:  # turquoise
        track_bg = "rgba(255, 255, 255, 0.2)"
        fill_bg = "#5eead4"
        text_color = "rgba(255, 255, 255, 0.85)"

    return f"""
    <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;margin-top:auto;padding-top:14px;">
      <div style="flex:1;height:4px;background:{track_bg};border-radius:2px;overflow:hidden;">
        <div style="width:{pct:.1f}%;height:100%;background:{fill_bg};border-radius:2px;"></div>
      </div>
      <span style="font-size:12.5px;font-weight:800;color:{text_color};letter-spacing:0.5px;font-family:'Nunito',sans-serif;">{slide_index}/7</span>
    </div>
    """

def get_4x5_swipe_arrow(slide_index, is_dark=False, is_turquoise=False):
    """Adds a thin chevron arrow (›) on the right edge vertically centered for slides 1 to 6."""
    if slide_index >= 7:
        return ""
    if not is_dark and not is_turquoise:
        bg = "#ffffff"
        color = "#0f766e"
        border = "1px solid #e2e8f0"
        shadow = "0 2px 8px rgba(0,0,0,0.06)"
    elif is_dark:
        bg = "#182a4a"
        color = "#5eead4"
        border = "1px solid rgba(255,255,255,0.12)"
        shadow = "0 3px 10px rgba(0,0,0,0.3)"
    else:
        bg = "#0e6f6b"
        color = "#5eead4"
        border = "1px solid rgba(255,255,255,0.18)"
        shadow = "0 3px 10px rgba(0,0,0,0.25)"

    return f"""
    <div style="position:absolute;right:12px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:{bg};border:{border};box-shadow:{shadow};display:flex;align-items:center;justify-content:center;z-index:30;pointer-events:none;">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
    """

# ==============================================================================
# 4:5 GÖNDERİ FORMATI (540x675 canvas -> exported at 1080x1350 via 2x scale)
# ==============================================================================
slides_4x5 = [
    # SLIDE 1 (4:5)
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      <img src="{LOGO_B64}" alt="" style="position:absolute;top:35px;right:25px;width:280px;height:280px;object-fit:contain;opacity:0.065;user-select:none;pointer-events:none;z-index:1;" />
      {get_4x5_swipe_arrow(1, is_dark=False)}
      
      <div style="z-index:2;">
        {get_header(is_dark=False)}
      </div>

      <div style="z-index:2;margin-top:auto;margin-bottom:32px;">
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:16px;">
          TIBBİ TERMİNOLOJİ
        </div>
        <h1 style="font-size:36px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:{TITLE_LIGHT};margin:0 0 18px 0;">
          Binlerce tıbbi terimi ezberlemeyi hemen bırak.
        </h1>
        <p style="font-size:17px;font-weight:600;line-height:1.55;color:{TEXT_MUTED_LIGHT};margin:0;">
          Tıbbi terimler ezberlenmez, çözülür: Çünkü arkasında tıkır tıkır işleyen bir şifre var.
        </p>
      </div>

      <div style="z-index:2;">
        {get_4x5_footer(1, is_dark=False)}
      </div>
    </div>
    """,

    # SLIDE 2 (4:5)
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(2, is_dark=True)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
          YÖNTEM KARŞILAŞTIRMASI
        </div>
        <h2 style="font-size:34px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 14px 0;">
          Ezber çıkmazı vs. yapboz mantığı.
        </h2>
        <p style="font-size:16px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_DARK};margin:0 0 20px 0;">
          Binlerce kelimeyi tek tek hafızaya atmak bir süre sonra tıkanır. Oysa tıp dili, parçaların birleştiği mantıksal bir yapbozdur.
        </p>
      </div>

      <div style="display:flex;gap:12px;margin-bottom:14px;">
        <div style="flex:1;background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:16px;padding:16px 14px;">
          <div style="font-size:10px;font-weight:800;letter-spacing:0.6px;color:#F87171;text-transform:uppercase;margin-bottom:8px;white-space:nowrap;">
            GELENEKSEL EZBER
          </div>
          <div style="font-size:22px;font-weight:900;color:#FFFFFF;margin-bottom:10px;">
            Çıkmaz Yol
          </div>
          <div style="font-size:13.5px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_DARK};">
            • Tek tek ezberleme<br>
            • Yeni terimde çaresizlik<br>
            • Sınavdan sonra unutma
          </div>
        </div>

        <div style="flex:1;background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:16px;padding:16px 14px;">
          <div style="font-size:9.5px;font-weight:800;letter-spacing:0.2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:8px;white-space:nowrap;">
            HEALTHLEXMED MANTIĞI
          </div>
          <div style="font-size:22px;font-weight:900;color:#FFFFFF;margin-bottom:10px;">
            Çözümleme
          </div>
          <div style="font-size:13.5px;font-weight:600;line-height:1.5;color:#E2E8F0;">
            • Kök ve ekleri ayırma<br>
            • Kuralları kavrama<br>
            • Tek bakışta çözme
          </div>
        </div>
      </div>

      <div style="font-size:14px;font-weight:600;color:#64748B;line-height:1.45;margin-bottom:4px;">
        Kelimeleri değil, birleşim kurallarını öğrendiğinde sistem kendiliğinden çalışır.
      </div>

      {get_4x5_footer(2, is_dark=True)}
    </div>
    """,

    # SLIDE 3 (4:5)
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(3, is_dark=False, is_turquoise=True)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:12px;">
          TARİH VE STANDARTLAŞMA
        </div>
        <h2 style="font-size:34px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 14px 0;">
          Tıp dili neden Latince ve Yunanca?
        </h2>
        <p style="font-size:16px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_TURQUOISE};margin:0 0 18px 0;">
          Tıbbi terminoloji tesadüfen seçilmedi. İki temel nedene dayanır.
        </p>
      </div>

      <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:16px;padding:18px 20px;margin-bottom:12px;">
        <div style="margin-bottom:14px;">
          <div style="font-size:11.5px;font-weight:800;letter-spacing:1.8px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:6px;">
            1. CANLI BİR DİL DEĞİLDİR
          </div>
          <div style="font-size:14.5px;font-weight:600;line-height:1.5;color:rgba(255,255,255,0.95);">
            Latince günümüzde hiçbir ülkenin konuşma dili değildir. Anlam kaymasına uğramaz, şiveleri yoktur ve zamanla değişmez.
          </div>
        </div>
        <div style="height:1px;background:rgba(255,255,255,0.15);margin-bottom:14px;"></div>
        <div>
          <div style="font-size:11.5px;font-weight:800;letter-spacing:1.8px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:6px;">
            2. ULUSLARARASI STANDARTLAŞMA
          </div>
          <div style="font-size:14.5px;font-weight:600;line-height:1.5;color:rgba(255,255,255,0.95);">
            Anatomi terimleri <em>Terminologia Anatomica</em> ile küresel olarak sabitlenmiştir. Nereye gidersen git yazılan yapı herkes için aynıdır.
          </div>
        </div>
      </div>

      <div style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.8);line-height:1.45;margin-bottom:4px;">
        Evrensel bir tıp dili, minimum karışıklık ve küresel ortak akıl demektir.
      </div>

      {get_4x5_footer(3, is_dark=False, is_turquoise=True)}
    </div>
    """,

    # SLIDE 4 (4:5)
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(4, is_dark=False)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:12px;">
          GÖREV PAYLAŞIMI
        </div>
        <h2 style="font-size:34px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:{TITLE_LIGHT};margin:0 0 18px 0;">
          Kökenler arasındaki iş bölümü.
        </h2>
      </div>

      <div style="display:flex;flex-direction:column;margin-bottom:14px;">
        <!-- Row 01 -->
        <div style="display:flex;align-items:flex-start;gap:18px;padding:16px 0;border-bottom:1px solid {BORDER_LIGHT};">
          <span style="font-size:38px;font-weight:700;color:{ACCENT_LIGHT};min-width:44px;line-height:1;font-family:'Nunito',sans-serif;">01</span>
          <div>
            <div style="font-size:17.5px;font-weight:800;color:{TITLE_LIGHT};margin-bottom:5px;">
              Latince Kökenler <span style="font-weight:600;color:{TEXT_MUTED_LIGHT};">· Anatomi</span>
            </div>
            <div style="font-size:14.5px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_LIGHT};">
              Genellikle vücudun normal yapısını ve organları tanımlar.<br>
              <span style="color:#475569;">Örnek: Kemikler, kaslar, organların anatomik duruşu.</span>
            </div>
          </div>
        </div>

        <!-- Row 02 -->
        <div style="display:flex;align-items:flex-start;gap:18px;padding:16px 0;">
          <span style="font-size:38px;font-weight:700;color:{ACCENT_LIGHT};min-width:44px;line-height:1;font-family:'Nunito',sans-serif;">02</span>
          <div>
            <div style="font-size:17.5px;font-weight:800;color:{TITLE_LIGHT};margin-bottom:5px;">
              Grekçe / Yunanca <span style="font-weight:600;color:{TEXT_MUTED_LIGHT};">· Klinik</span>
            </div>
            <div style="font-size:14px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_LIGHT};">
              Genellikle hastalıkları, semptomları ve cerrahi işlemleri tanımlar.<br>
              <span style="color:#475569;">Örnek: İltihabi durumlar (-itis), cerrahi çıkarma <span style="white-space:nowrap;">işlemleri (-ectomy)</span>.</span>
            </div>
          </div>
        </div>
      </div>

      <div style="font-size:14px;font-weight:600;color:{TEXT_MUTED_LIGHT};margin-bottom:4px;line-height:1.45;">
        Bu bir kural değil, genel eğilim. İstisnalarını serinin ilerleyen bölümlerinde göreceğiz.
      </div>

      {get_4x5_footer(4, is_dark=False)}
    </div>
    """,

    # SLIDE 5 (4:5)
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(5, is_dark=True)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
          SİSTEMİN KAZANIMLARI
        </div>
        <h2 style="font-size:34px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 14px 0;">
          Bu sistem sana ne kazandıracak?
        </h2>
        <p style="font-size:16px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_DARK};margin:0 0 18px 0;">
          Ezber yükünü bir kenara bıraktığında, tıp dilini bir yapboz gibi tek bakışta çözmeye başlarsın.
        </p>

        <div style="font-size:11.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:10px;">
          BU YÖNTEMLE KAZANILANLAR
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;padding:7px 14px;background:{CARD_DARK};border:1px solid rgba(255,255,255,0.1);border-radius:24px;color:#E2E8F0;">
            {get_svg_icon('target', color=ACCENT_DARK, size=16)}
            <span>Hızlı kavrama</span>
          </div>
          <div style="display:flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;padding:7px 14px;background:{CARD_DARK};border:1px solid rgba(255,255,255,0.1);border-radius:24px;color:#E2E8F0;">
            {get_svg_icon('book', color=ACCENT_DARK, size=16)}
            <span>Kalıcı hafıza</span>
          </div>
          <div style="display:flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;padding:7px 14px;background:{CARD_DARK};border:1px solid rgba(255,255,255,0.1);border-radius:24px;color:#E2E8F0;">
            {get_svg_icon('graduation-cap', color=ACCENT_DARK, size=16)}
            <span>Klinik iletişim</span>
          </div>
          <div style="display:flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;padding:7px 14px;background:{CARD_DARK};border:1px solid rgba(255,255,255,0.1);border-radius:24px;color:#E2E8F0;">
            {get_svg_icon('puzzle', color=ACCENT_DARK, size=16)}
            <span>Yapboz mantığı</span>
          </div>
        </div>

        <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:14px;padding:14px 16px;font-size:13.5px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_DARK};">
          <strong style="color:#FFF;">Özet:</strong> Parçaların anlamını bildiğin için sınav sonrası unutmaz, sağlık profesyonelleri arasında <strong style="color:#FFF;">daha az hatayla ve güvenle</strong> bilgi akışı sağlarsın.
        </div>
      </div>

      <div style="font-size:14px;font-weight:600;color:#64748B;line-height:1.45;margin-bottom:4px;">
        Ezber geçicidir; kök ve eklerin mantığı ise meslek hayatı boyunca kalır.
      </div>

      {get_4x5_footer(5, is_dark=True)}
    </div>
    """,

    # SLIDE 6 (4:5)
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(6, is_dark=False)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:12px;">
          ÖZET FORMÜL
        </div>
        <h2 style="font-size:34px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:{TITLE_LIGHT};margin:0 0 18px 0;">
          Tıbbın dili bir yapbozdur.
        </h2>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px;">
        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-radius:16px;padding:16px 18px;display:flex;align-items:flex-start;gap:12px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:{ACCENT_LIGHT};margin-top:6px;flex-shrink:0;"></span>
          <div style="font-size:14.5px;font-weight:600;line-height:1.5;color:{TITLE_LIGHT};">
            Tıbbi terminoloji devasa bir kelime öbeği değil, <strong style="font-weight:800;">mantıksal bir sistemdir</strong>.
          </div>
        </div>

        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-radius:16px;padding:16px 18px;display:flex;align-items:flex-start;gap:12px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:{ACCENT_LIGHT};margin-top:6px;flex-shrink:0;"></span>
          <div style="font-size:14.5px;font-weight:600;line-height:1.5;color:{TITLE_LIGHT};">
            Parçaları birleştirmeyi öğrendiğinde tıp dilini <strong style="font-weight:800;">ana dilin gibi okumaya başlarsın</strong>.
          </div>
        </div>

        <div style="background:rgba(15,118,110,0.08);border:1px solid rgba(15,118,110,0.25);border-radius:16px;padding:16px;display:flex;align-items:center;justify-content:center;gap:10px;">
          {get_svg_icon('arrow-right', color=ACCENT_LIGHT, size=20)}
          <div style="font-size:15.5px;font-weight:900;color:{ACCENT_LIGHT};">
            Şimdi terimlerin yapı taşlarını keşfetmeye başlayalım!
          </div>
        </div>
      </div>

      <div style="font-size:14px;font-weight:600;color:{TEXT_MUTED_LIGHT};margin-bottom:4px;line-height:1.45;text-align:center;">
        Kök ve eklerin mantığını kavra, tıp diline hâkim ol.
      </div>

      {get_4x5_footer(6, is_dark=False)}
    </div>
    """,

    # SLIDE 7 (4:5)
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:675px;padding:46px 44px 34px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;text-align:center;overflow:hidden;">
      <div style="display:flex;justify-content:center;">
        {get_header(is_dark=False, is_turquoise=True)}
      </div>

      <div style="margin:auto 0;">
        <div style="display:inline-block;font-size:12px;font-weight:800;letter-spacing:2px;color:{ACCENT_TURQUOISE};background:rgba(255,255,255,0.12);padding:6px 16px;border-radius:24px;text-transform:uppercase;margin-bottom:16px;">
          TIBBİ TERMİNOLOJİ SERİSİ
        </div>

        <h2 style="font-size:32px;font-weight:900;line-height:1.22;margin:0 0 16px 0;letter-spacing:-0.5px;">
          Tıbbi terimlerin şifresini birlikte çözelim.
        </h2>

        <p style="font-size:16px;font-weight:600;line-height:1.55;color:rgba(255,255,255,0.92);margin:0 auto 24px;max-width:400px;">
          <span style="display:inline-flex;align-items:center;vertical-align:-2px;margin-right:6px;">{get_svg_icon('message-circle', color=ACCENT_TURQUOISE, size=18)}</span>Rehberin tamamını istiyorsan yorumlara <strong style="color:#5eead4;font-weight:900;">REHBER</strong> yaz, linki sana DM'den gönderelim.
        </p>

        <div style="background:{CARD_LIGHT};color:{TITLE_LIGHT};border-radius:16px;padding:16px 24px;box-shadow:0 12px 30px rgba(0,0,0,0.25);display:inline-flex;flex-direction:column;align-items:center;gap:5px;width:90%;box-sizing:border-box;">
          <span style="font-size:12.5px;font-weight:600;color:{TEXT_MUTED_LIGHT};">Ya da doğrudan:</span>
          <span style="font-size:20px;font-weight:900;color:{ACCENT_LIGHT};letter-spacing:-0.3px;">healthlexmed.com/rehber</span>
        </div>
      </div>

      <div style="display:flex;justify-content:center;gap:22px;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:7px;font-size:13.5px;color:rgba(255,255,255,0.9);font-weight:600;">
          {get_svg_icon('heart', color=ACCENT_TURQUOISE, size=18)} <span>Beğen</span>
        </div>
        <div style="display:flex;align-items:center;gap:7px;font-size:13.5px;color:rgba(255,255,255,0.9);font-weight:600;">
          {get_svg_icon('message-circle', color=ACCENT_TURQUOISE, size=18)} <span>Yorum Yap</span>
        </div>
        <div style="display:flex;align-items:center;gap:7px;font-size:13.5px;color:rgba(255,255,255,0.9);font-weight:600;">
          {get_svg_icon('send', color=ACCENT_TURQUOISE, size=18)} <span>Paylaş</span>
        </div>
        <div style="display:flex;align-items:center;gap:7px;font-size:13.5px;color:rgba(255,255,255,0.9);font-weight:600;">
          {get_svg_icon('bookmark', color=ACCENT_TURQUOISE, size=18)} <span>Kaydet</span>
        </div>
      </div>

      {get_4x5_footer(7, is_dark=False, is_turquoise=True)}
    </div>
    """
]

# ==============================================================================
# 9:16 REELS / STORY VİDEO FORMATI (540x960 canvas -> exported at 1080x1920 via 2x scale)
# Safe zone: y: 110px to 750px (corresponds to 220px to 1500px in 1080x1920).
# Right safe zone: right margin >= 70px (corresponds to >= 140px in 1080x1920, strictly clear of the right 120px button rail).
# All fonts increased by ~25% for mobile video readability.
# NO progress bar, NO swipe arrow.
# ==============================================================================
slides_9x16 = [
    # SLIDE 1 (9:16)
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <img src="{LOGO_B64}" alt="" style="position:absolute;top:220px;right:75px;width:300px;height:300px;object-fit:contain;opacity:0.065;user-select:none;pointer-events:none;z-index:1;" />
      
      <!-- Strictly bounded to Safe Zone (110px to 750px vertically, 40px to 470px horizontally) -->
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:space-between;z-index:2;box-sizing:border-box;">
        <div>
          {get_header(is_dark=False, scale=1.25)}
        </div>

        <div style="margin-top:auto;margin-bottom:20px;">
          <div style="font-size:15.5px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:18px;">
            TIBBİ TERMİNOLOJİ
          </div>
          <h1 style="font-size:44px;font-weight:900;line-height:1.18;letter-spacing:-0.7px;color:{TITLE_LIGHT};margin:0 0 22px 0;">
            Binlerce tıbbi terimi ezberlemeyi hemen bırak.
          </h1>
          <p style="font-size:21px;font-weight:600;line-height:1.55;color:{TEXT_MUTED_LIGHT};margin:0;">
            Tıbbi terimler ezberlenmez, çözülür: Çünkü arkasında tıkır tıkır işleyen bir şifre var.
          </p>
        </div>
      </div>
    </div>
    """,

    # SLIDE 2 (9:16)
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:22px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
            YÖNTEM KARŞILAŞTIRMASI
          </div>
          <h2 style="font-size:40px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:#FFFFFF;margin:0 0 14px 0;">
            Ezber çıkmazı vs. yapboz mantığı.
          </h2>
          <p style="font-size:19.5px;font-weight:600;line-height:1.52;color:{TEXT_MUTED_DARK};margin:0 0 22px 0;">
            Binlerce kelimeyi tek tek hafızaya atmak bir süre sonra tıkanır. Oysa tıp dili, parçaların birleştiği mantıksal bir yapbozdur.
          </p>
        </div>

        <div style="display:flex;gap:12px;margin-bottom:20px;">
          <div style="flex:1;background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:16px;padding:18px 14px;">
            <div style="font-size:11px;font-weight:800;letter-spacing:0.8px;color:#F87171;text-transform:uppercase;margin-bottom:8px;white-space:nowrap;">
              GELENEKSEL EZBER
            </div>
            <div style="font-size:24px;font-weight:900;color:#FFFFFF;margin-bottom:10px;">
              Çıkmaz Yol
            </div>
            <div style="font-size:16px;font-weight:600;line-height:1.55;color:{TEXT_MUTED_DARK};">
              • Tek tek ezberleme<br>
              • Yeni terimde çaresizlik<br>
              • Sınavdan sonra unutma
            </div>
          </div>

          <div style="flex:1;background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:16px;padding:18px 14px;">
            <div style="font-size:11px;font-weight:800;letter-spacing:0.4px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:8px;white-space:nowrap;">
              HEALTHLEXMED MANTIĞI
            </div>
            <div style="font-size:24px;font-weight:900;color:#FFFFFF;margin-bottom:10px;">
              Çözümleme
            </div>
            <div style="font-size:16px;font-weight:600;line-height:1.55;color:#E2E8F0;">
              • Kök ve ekleri ayırma<br>
              • Kuralları kavrama<br>
              • Tek bakışta çözme
            </div>
          </div>
        </div>

        <div style="font-size:17.5px;font-weight:600;color:#64748B;line-height:1.45;">
          Kelimeleri değil, birleşim kurallarını öğrendiğinde sistem kendiliğinden çalışır.
        </div>
      </div>
    </div>
    """,

    # SLIDE 3 (9:16)
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:20px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:12px;">
            TARİH VE STANDARTLAŞMA
          </div>
          <h2 style="font-size:40px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:#FFFFFF;margin:0 0 14px 0;">
            Tıp dili neden Latince ve Yunanca?
          </h2>
          <p style="font-size:19.5px;font-weight:600;line-height:1.52;color:{TEXT_MUTED_TURQUOISE};margin:0 0 20px 0;">
            Tıbbi terminoloji tesadüfen seçilmedi. İki temel nedene dayanır.
          </p>
        </div>

        <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:18px;padding:22px 22px;margin-bottom:20px;">
          <div style="margin-bottom:18px;">
            <div style="font-size:13.5px;font-weight:800;letter-spacing:1.8px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:6px;">
              1. CANLI BİR DİL DEĞİLDİR
            </div>
            <div style="font-size:17.5px;font-weight:600;line-height:1.52;color:rgba(255,255,255,0.95);">
              Latince günümüzde hiçbir ülkenin konuşma dili değildir. Anlam kaymasına uğramaz, şiveleri yoktur ve zamanla değişmez.
            </div>
          </div>
          <div style="height:1px;background:rgba(255,255,255,0.18);margin-bottom:18px;"></div>
          <div>
            <div style="font-size:13.5px;font-weight:800;letter-spacing:1.8px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:6px;">
              2. ULUSLARARASI STANDARTLAŞMA
            </div>
            <div style="font-size:17.5px;font-weight:600;line-height:1.52;color:rgba(255,255,255,0.95);">
              Anatomi terimleri <em>Terminologia Anatomica</em> ile küresel olarak sabitlenmiştir. Nereye gidersen git yazılan yapı herkes için aynıdır.
            </div>
          </div>
        </div>

        <div style="font-size:17.5px;font-weight:600;color:rgba(255,255,255,0.8);line-height:1.45;">
          Evrensel bir tıp dili, minimum karışıklık ve küresel ortak akıl demektir.
        </div>
      </div>
    </div>
    """,

    # SLIDE 4 (9:16)
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:20px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:12px;">
            GÖREV PAYLAŞIMI
          </div>
          <h2 style="font-size:40px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:{TITLE_LIGHT};margin:0 0 18px 0;">
            Kökenler arasındaki iş bölümü.
          </h2>
        </div>

        <div style="display:flex;flex-direction:column;margin-bottom:20px;">
          <!-- Row 01 -->
          <div style="display:flex;align-items:flex-start;gap:20px;padding:20px 0;border-bottom:1px solid {BORDER_LIGHT};">
            <span style="font-size:44px;font-weight:700;color:{ACCENT_LIGHT};min-width:48px;line-height:1;font-family:'Nunito',sans-serif;">01</span>
            <div>
              <div style="font-size:20px;font-weight:800;color:{TITLE_LIGHT};margin-bottom:6px;">
                Latince Kökenler <span style="font-weight:600;color:{TEXT_MUTED_LIGHT};">· Anatomi</span>
              </div>
              <div style="font-size:17.5px;font-weight:600;line-height:1.55;color:{TEXT_MUTED_LIGHT};">
                Genellikle vücudun normal yapısını ve organları tanımlar.<br>
                <span style="color:#475569;">Örnek: Kemikler, kaslar, organların anatomik duruşu.</span>
              </div>
            </div>
          </div>

          <!-- Row 02 -->
          <div style="display:flex;align-items:flex-start;gap:20px;padding:20px 0;">
            <span style="font-size:44px;font-weight:700;color:{ACCENT_LIGHT};min-width:48px;line-height:1;font-family:'Nunito',sans-serif;">02</span>
            <div>
              <div style="font-size:20px;font-weight:800;color:{TITLE_LIGHT};margin-bottom:6px;">
                Grekçe / Yunanca <span style="font-weight:600;color:{TEXT_MUTED_LIGHT};">· Klinik</span>
              </div>
              <div style="font-size:17.5px;font-weight:600;line-height:1.55;color:{TEXT_MUTED_LIGHT};">
                Genellikle hastalıkları, semptomları ve cerrahi işlemleri tanımlar.<br>
                <span style="color:#475569;">Örnek: İltihabi durumlar (-itis), cerrahi çıkarma işlemleri <span style="white-space:nowrap;">(-ectomy)</span>.</span>
              </div>
            </div>
          </div>
        </div>

        <div style="font-size:17px;font-weight:600;color:{TEXT_MUTED_LIGHT};line-height:1.45;">
          Bu bir kural değil, genel eğilim. İstisnalarını serinin ilerleyen bölümlerinde göreceğiz.
        </div>
      </div>
    </div>
    """,

    # SLIDE 5 (9:16)
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:18px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:10px;">
            SİSTEMİN KAZANIMLARI
          </div>
          <h2 style="font-size:40px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:#FFFFFF;margin:0 0 14px 0;">
            Bu sistem sana ne kazandıracak?
          </h2>
          <p style="font-size:19px;font-weight:600;line-height:1.52;color:{TEXT_MUTED_DARK};margin:0 0 18px 0;">
            Ezber yükünü bir kenara bıraktığında, tıp dilini bir yapboz gibi tek bakışta çözmeye başlarsın.
          </p>

          <div style="font-size:14px;font-weight:800;letter-spacing:2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
            BU YÖNTEMLE KAZANILANLAR
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px;">
            <div style="display:flex;align-items:center;gap:8px;font-size:16.5px;font-weight:600;padding:9px 18px;background:{CARD_DARK};border:1px solid rgba(255,255,255,0.1);border-radius:24px;color:#E2E8F0;">
              {get_svg_icon('target', color=ACCENT_DARK, size=20)}
              <span>Hızlı kavrama</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font-size:16.5px;font-weight:600;padding:9px 18px;background:{CARD_DARK};border:1px solid rgba(255,255,255,0.1);border-radius:24px;color:#E2E8F0;">
              {get_svg_icon('book', color=ACCENT_DARK, size=20)}
              <span>Kalıcı hafıza</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font-size:16.5px;font-weight:600;padding:9px 18px;background:{CARD_DARK};border:1px solid rgba(255,255,255,0.1);border-radius:24px;color:#E2E8F0;">
              {get_svg_icon('graduation-cap', color=ACCENT_DARK, size=20)}
              <span>Klinik iletişim</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font-size:16.5px;font-weight:600;padding:9px 18px;background:{CARD_DARK};border:1px solid rgba(255,255,255,0.1);border-radius:24px;color:#E2E8F0;">
              {get_svg_icon('puzzle', color=ACCENT_DARK, size=20)}
              <span>Yapboz mantığı</span>
            </div>
          </div>

          <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:16px;padding:18px 20px;font-size:17px;font-weight:600;line-height:1.52;color:{TEXT_MUTED_DARK};">
            <strong style="color:#FFF;">Özet:</strong> Parçaların anlamını bildiğin için sınav sonrası unutmaz, sağlık profesyonelleri arasında <strong style="color:#FFF;">daha az hatayla ve güvenle</strong> bilgi akışı sağlarsın.
          </div>
        </div>

        <div style="font-size:17px;font-weight:600;color:#64748B;line-height:1.45;">
          Ezber geçicidir; kök ve eklerin mantığı ise meslek hayatı boyunca kalır.
        </div>
      </div>
    </div>
    """,

    # SLIDE 6 (9:16)
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:20px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:12px;">
            ÖZET FORMÜL
          </div>
          <h2 style="font-size:40px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:{TITLE_LIGHT};margin:0 0 18px 0;">
            Tıbbın dili bir yapbozdur.
          </h2>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:22px;">
          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-radius:16px;padding:20px 22px;display:flex;align-items:flex-start;gap:16px;">
            <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:{ACCENT_LIGHT};margin-top:8px;flex-shrink:0;"></span>
            <div style="font-size:18px;font-weight:600;line-height:1.52;color:{TITLE_LIGHT};">
              Tıbbi terminoloji devasa bir kelime öbeği değil, <strong style="font-weight:800;">mantıksal bir sistemdir</strong>.
            </div>
          </div>

          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-radius:16px;padding:20px 22px;display:flex;align-items:flex-start;gap:16px;">
            <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:{ACCENT_LIGHT};margin-top:8px;flex-shrink:0;"></span>
            <div style="font-size:18px;font-weight:600;line-height:1.52;color:{TITLE_LIGHT};">
              Parçaları birleştirmeyi öğrendiğinde tıp dilini <strong style="font-weight:800;">ana dilin gibi okumaya başlarsın</strong>.
            </div>
          </div>

          <div style="background:rgba(15,118,110,0.08);border:1px solid rgba(15,118,110,0.25);border-radius:16px;padding:20px;display:flex;align-items:center;justify-content:center;gap:12px;">
            {get_svg_icon('arrow-right', color=ACCENT_LIGHT, size=24)}
            <div style="font-size:18.5px;font-weight:900;color:{ACCENT_LIGHT};">
              Şimdi terimlerin yapı taşlarını keşfetmeye başlayalım!
            </div>
          </div>
        </div>

        <div style="font-size:17.5px;font-weight:600;color:{TEXT_MUTED_LIGHT};line-height:1.45;text-align:center;">
          Kök ve eklerin mantığını kavra, tıp diline hâkim ol.
        </div>
      </div>
    </div>
    """,

    # SLIDE 7 (9:16)
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:space-between;text-align:center;z-index:2;box-sizing:border-box;">
        <div style="display:flex;justify-content:center;">
          {get_header(is_dark=False, is_turquoise=True, scale=1.25)}
        </div>

        <div style="margin:auto 0;">
          <div style="display:inline-block;font-size:13.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_TURQUOISE};background:rgba(255,255,255,0.12);padding:7px 18px;border-radius:24px;text-transform:uppercase;margin-bottom:18px;">
            TIBBİ TERMİNOLOJİ SERİSİ
          </div>

          <h2 style="font-size:36px;font-weight:900;line-height:1.22;margin:0 0 16px 0;letter-spacing:-0.6px;">
            Tıbbi terimlerin şifresini birlikte çözelim.
          </h2>

          <p style="font-size:18.5px;font-weight:600;line-height:1.55;color:rgba(255,255,255,0.92);margin:0 auto 24px;max-width:390px;">
            <span style="display:inline-flex;align-items:center;vertical-align:-2px;margin-right:6px;">{get_svg_icon('message-circle', color=ACCENT_TURQUOISE, size=20)}</span>Rehberin tamamını istiyorsan yorumlara <strong style="color:#5eead4;font-weight:900;">REHBER</strong> yaz, linki sana DM'den gönderelim.
          </p>

          <div style="background:{CARD_LIGHT};color:{TITLE_LIGHT};border-radius:18px;padding:20px 24px;box-shadow:0 12px 30px rgba(0,0,0,0.25);display:inline-flex;flex-direction:column;align-items:center;gap:6px;width:92%;box-sizing:border-box;">
            <span style="font-size:14px;font-weight:600;color:{TEXT_MUTED_LIGHT};">Ya da doğrudan:</span>
            <span style="font-size:22px;font-weight:900;color:{ACCENT_LIGHT};letter-spacing:-0.3px;">healthlexmed.com/rehber</span>
          </div>
        </div>

        <div style="display:flex;justify-content:center;gap:20px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:7px;font-size:15px;color:rgba(255,255,255,0.9);font-weight:600;">
            {get_svg_icon('heart', color=ACCENT_TURQUOISE, size=20)} <span>Beğen</span>
          </div>
          <div style="display:flex;align-items:center;gap:7px;font-size:15px;color:rgba(255,255,255,0.9);font-weight:600;">
            {get_svg_icon('message-circle', color=ACCENT_TURQUOISE, size=20)} <span>Yorum Yap</span>
          </div>
          <div style="display:flex;align-items:center;gap:7px;font-size:15px;color:rgba(255,255,255,0.9);font-weight:600;">
            {get_svg_icon('send', color=ACCENT_TURQUOISE, size=20)} <span>Paylaş</span>
          </div>
          <div style="display:flex;align-items:center;gap:7px;font-size:15px;color:rgba(255,255,255,0.9);font-weight:600;">
            {get_svg_icon('bookmark', color=ACCENT_TURQUOISE, size=20)} <span>Kaydet</span>
          </div>
        </div>
      </div>
    </div>
    """
]

def generate_html(slides, width, height, title):
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>{title}</title>
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
      width: {len(slides) * width}px;
      height: {height}px;
    }}
    .slide {{
      width: {width}px;
      height: {height}px;
      flex-shrink: 0;
    }}
  </style>
</head>
<body>
  <div class="track" id="track">
    {''.join(slides)}
  </div>
</body>
</html>
"""

html_4x5_path = OUTPUT_4X5 / "index.html"
html_4x5_path.write_text(generate_html(slides_4x5, 540, 675, "Video Slides 4:5"), encoding="utf-8")

html_9x16_path = OUTPUT_9X16 / "index.html"
html_9x16_path.write_text(generate_html(slides_9x16, 540, 960, "Video Slides 9:16"), encoding="utf-8")

async def export_all():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # 1. Export 4:5 format (Exact 1080x1350 via 540x675 @ 2x)
        print("Exporting 4:5 Post Slides (1080x1350)...")
        page_4x5 = await browser.new_page(
            viewport={"width": 540, "height": 675},
            device_scale_factor=2.0,
        )
        await page_4x5.set_content(html_4x5_path.read_text(encoding="utf-8"), wait_until="networkidle")
        await page_4x5.wait_for_timeout(2500)

        for i in range(len(slides_4x5)):
            await page_4x5.evaluate(f"document.getElementById('track').style.transform = 'translateX({-i * 540}px)'")
            await page_4x5.wait_for_timeout(300)
            img_bytes = await page_4x5.screenshot(clip={"x": 0, "y": 0, "width": 540, "height": 675})
            
            # Save standard file name and new icerik1_gonderi_0X.png
            file_names = [
                OUTPUT_4X5 / f"video_slide_{i+1}.png",
                OUTPUT_4X5 / f"icerik1_gonderi_{i+1:02d}.png"
            ]
            for fn in file_names:
                for _ in range(5):
                    try:
                        with open(fn, "wb") as f:
                            f.write(img_bytes)
                        break
                    except OSError:
                        await asyncio.sleep(0.4)
            print(f"  [4:5] Exported scene {i+1}/7 -> icerik1_gonderi_{i+1:02d}.png")

        await page_4x5.close()

        # 2. Export 9:16 format (Exact 1080x1920 via 540x960 @ 2x)
        print("Exporting 9:16 Reels Video Slides (1080x1920)...")
        page_9x16 = await browser.new_page(
            viewport={"width": 540, "height": 960},
            device_scale_factor=2.0,
        )
        await page_9x16.set_content(html_9x16_path.read_text(encoding="utf-8"), wait_until="networkidle")
        await page_9x16.wait_for_timeout(2500)

        for i in range(len(slides_9x16)):
            await page_9x16.evaluate(f"document.getElementById('track').style.transform = 'translateX({-i * 540}px)'")
            await page_9x16.wait_for_timeout(300)
            img_bytes = await page_9x16.screenshot(clip={"x": 0, "y": 0, "width": 540, "height": 960})
            
            # Save standard file name and new icerik1_video_0X.png
            file_names = [
                OUTPUT_9X16 / f"reels_scene_{i+1}.png",
                OUTPUT_9X16 / f"icerik1_video_{i+1:02d}.png"
            ]
            for fn in file_names:
                for _ in range(5):
                    try:
                        with open(fn, "wb") as f:
                            f.write(img_bytes)
                        break
                    except OSError:
                        await asyncio.sleep(0.4)
            print(f"  [9:16] Exported scene {i+1}/7 -> icerik1_video_{i+1:02d}.png")

        await page_9x16.close()
        await browser.close()
        print("All video slides exported successfully!")

asyncio.run(export_all())
