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
BG_LIGHT = "#f5f7fb"       # Açık zemin
BG_DARK = "#0f1b33"        # Koyu zemin
BG_TURQUOISE = "#0b5f5c"   # Turkuaz zemin

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

# Vurgu ve üst etiket rengi
ACCENT_LIGHT = "#0f766e"
ACCENT_DARK = "#5eead4"
ACCENT_TURQUOISE = "#5eead4"

def get_svg_icon(name, color="#5eead4", size=18):
    if name == "puzzle":
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
    elif name == "link":
        inner = """<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>"""
    elif name == "sparkle":
        inner = """<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>"""
    elif name == "flask":
        inner = """<path d="M9 3h6"></path><path d="M10 3v6l-4 9a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-9V3"></path><path d="M7 16h10"></path>"""
    elif name == "activity":
        inner = """<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>"""
    elif name == "info":
        inner = """<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>"""
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
# İÇERİK 3: 4:5 GÖNDERİ FORMATI (540x675 -> 1080x1350 @ 2x)
# ==============================================================================
slides_4x5 = [
    # SLIDE 1 (4:5) - Hook
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      <img src="{LOGO_B64}" alt="" style="position:absolute;top:35px;right:25px;width:280px;height:280px;object-fit:contain;opacity:0.065;user-select:none;pointer-events:none;z-index:1;" />
      {get_4x5_swipe_arrow(1, is_dark=False)}
      
      <div style="z-index:2;">
        {get_header(is_dark=False)}
      </div>

      <div style="z-index:2;margin-top:auto;margin-bottom:32px;">
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:16px;">
          TIBBİ TERMİNOLOJİ ŞİFRELERİ
        </div>
        <h1 style="font-size:35px;font-weight:900;line-height:1.2;letter-spacing:-0.6px;color:{TITLE_LIGHT};margin:0 0 18px 0;">
          Tıbbi terimlerin arasındaki "o" harfi ne iş yapıyor?
        </h1>
        <p style="font-size:17px;font-weight:600;line-height:1.55;color:{TEXT_MUTED_LIGHT};margin:0;">
          Bir ek mi, rastgele bir ses mi yoksa gizli bir köprü mü? Tıp dilinin en sık kullanılan harfinin arkasındaki mantığı keşfet.
        </p>
      </div>

      <div style="z-index:2;">
        {get_4x5_footer(1, is_dark=False)}
      </div>
    </div>
    """,

    # SLIDE 2 (4:5) - Bağlayıcı Ünlü Nedir?
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(2, is_dark=True)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
          TEMEL MANTIK
        </div>
        <h2 style="font-size:34px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 14px 0;">
          Bağlayıcı ünlü nedir?
        </h2>
        
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
          <div style="display:flex;align-items:flex-start;gap:8px;font-size:14.5px;font-weight:600;line-height:1.48;color:{TEXT_MUTED_DARK};">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:{ACCENT_DARK};margin-top:7px;flex-shrink:0;"></span>
            <span>İki sessiz harfin yan yana gelerek <strong style="color:#FFF;">telaffuzu zorlaştırmasını</strong> engeller.</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:8px;font-size:14.5px;font-weight:600;line-height:1.48;color:{TEXT_MUTED_DARK};">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:{ACCENT_DARK};margin-top:7px;flex-shrink:0;"></span>
            <span>Kelimenin akıcı, ritmik ve fonetik okunmasını sağlar.</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:8px;font-size:14.5px;font-weight:600;line-height:1.48;color:{TEXT_MUTED_DARK};">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:{ACCENT_DARK};margin-top:7px;flex-shrink:0;"></span>
            <span>Standart bağlayıcı ünlü harfimiz: <strong style="color:{ACCENT_DARK};font-size:16px;">"o"</strong></span>
          </div>
        </div>
      </div>

      <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:16px;padding:16px 18px;margin-bottom:12px;">
        <div style="font-size:11px;font-weight:800;letter-spacing:1.5px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:10px;">
          STANDART FORMÜL ÖRNEĞİ
        </div>

        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px 14px;margin-bottom:10px;text-align:center;">
          <div style="font-family:monospace;font-size:15px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:wrap;">
            <span>gastr</span>
            <span style="color:{ACCENT_DARK};font-size:17px;">+ o +</span>
            <span>enter</span>
            <span style="color:{ACCENT_DARK};font-size:17px;">+ o +</span>
            <span style="color:{ACCENT_DARK};">-logy</span>
          </div>
          <div style="margin-top:6px;font-size:16.5px;font-weight:900;color:#FFFFFF;">
            ➔ <span style="color:{ACCENT_DARK};">gastroenterology</span>
          </div>
        </div>

        <div style="font-size:12.5px;font-weight:600;line-height:1.45;color:{TEXT_MUTED_DARK};">
          "o" harfleri olmasaydı: <em style="color:#FFF;">"gastr-enter-logy"</em> şeklinde kaba ve telaffuzu son derece zor bir kelime ortaya çıkardı.
        </div>
      </div>

      <div style="font-size:13.5px;font-weight:600;color:#64748B;line-height:1.45;margin-bottom:4px;">
        Bağlayıcı ünlü, kelimeler arasındaki telaffuz pürüzlerini ortadan kaldırır.
      </div>

      {get_4x5_footer(2, is_dark=True)}
    </div>
    """,

    # SLIDE 3 (4:5) - Kural Ne Zaman Geçerli?
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(3, is_dark=False, is_turquoise=True)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:12px;">
          BİRLEŞİM KURALLARI
        </div>
        <h2 style="font-size:33px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 14px 0;">
          Kural ne zaman geçerli?
        </h2>
      </div>

      <div style="display:flex;flex-direction:column;gap:9px;margin-bottom:12px;">
        <!-- Kural 1 -->
        <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:14px;padding:11px 14px;">
          <div style="font-size:12px;font-weight:800;letter-spacing:1px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:3px;">
            1. İKİ FARKLI KÖK BİRLEŞİRKEN
          </div>
          <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:4px;">
            Araya her zaman girer:
          </div>
          <div style="font-size:13.5px;font-weight:800;color:#FFFFFF;font-family:monospace;">
            electr/o + cardi/o + -gram ➔ <span style="color:{ACCENT_TURQUOISE};">electrocardiogram</span>
          </div>
        </div>

        <!-- Kural 2 -->
        <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:14px;padding:11px 14px;">
          <div style="font-size:12px;font-weight:800;letter-spacing:1px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:3px;">
            2. SON EK SESSİZ HARFLE BAŞLARSA
          </div>
          <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:4px;">
            Araya girer ve sesi yumuşatır:
          </div>
          <div style="font-size:13.5px;font-weight:800;color:#FFFFFF;font-family:monospace;">
            path/o + -logy ➔ <span style="color:{ACCENT_TURQUOISE};">pathology</span>
          </div>
        </div>

        <!-- Kural 3 -->
        <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:14px;padding:11px 14px;">
          <div style="font-size:12px;font-weight:800;letter-spacing:1px;color:#FCA5A5;text-transform:uppercase;margin-bottom:3px;">
            3. SON EK SESLİ HARFLE BAŞLARSA
          </div>
          <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:4px;">
            Birleştirici ünlü düşer:
          </div>
          <div style="font-size:13.5px;font-weight:800;color:#FFFFFF;font-family:monospace;">
            gastr/o + -itis ➔ <span style="color:{ACCENT_TURQUOISE};">gastritis</span> <span style="font-size:12px;color:rgba(255,255,255,0.7);font-family:'Nunito';">(gastroitis değil!)</span>
          </div>
        </div>
      </div>

      <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.8);line-height:1.4;margin-bottom:4px;">
        İki sesli harf yan yana gelip ses çatışması yaratmasın diye "o" harfi kendiliğinden elenir.
      </div>

      {get_4x5_footer(3, is_dark=False, is_turquoise=True)}
    </div>
    """,

    # SLIDE 4 (4:5) - Daha Az Bilinen İstisnalar!
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(4, is_dark=False)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:12px;">
          DİKKAT EDİLMESİ GEREKENLER
        </div>
        <h2 style="font-size:33px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:{TITLE_LIGHT};margin:0 0 12px 0;">
          Daha az bilinen istisnalar!
        </h2>
        <p style="font-size:15px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_LIGHT};margin:0 0 16px 0;">
          Birleştirici ünlü neredeyse her zaman "o" harfidir ancak bazı özel köklerde farklı harfler devreye girer:
        </p>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:12px;">
        <!-- Safra Kökü -->
        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid {ACCENT_LIGHT};border-radius:14px;padding:14px 16px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
            <div style="font-size:14px;font-weight:900;color:{TITLE_LIGHT};display:flex;align-items:center;gap:6px;">
              {get_svg_icon('flask', color=ACCENT_LIGHT, size=17)}
              <span>Safra Kökü</span>
            </div>
            <span style="font-size:11.5px;background:rgba(15,118,110,0.1);color:{ACCENT_LIGHT};padding:3px 10px;border-radius:12px;font-weight:800;">
              Ünlü: "e"
            </span>
          </div>
          <div style="font-size:14px;font-weight:700;color:{TITLE_LIGHT};font-family:monospace;">
            chol/<span style="color:{ACCENT_LIGHT};font-weight:900;">e</span> + cyst/o + -itis ➔ <span style="font-weight:900;color:{ACCENT_LIGHT};">cholecystitis</span>
          </div>
          <div style="font-size:12.5px;font-weight:600;color:{TEXT_MUTED_LIGHT};margin-top:3px;">
            Safra kesesi iltihabı (choleitis / kolesistit)
          </div>
        </div>

        <!-- Pelvis Kökü -->
        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid #6366F1;border-radius:14px;padding:14px 16px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
            <div style="font-size:14px;font-weight:900;color:{TITLE_LIGHT};display:flex;align-items:center;gap:6px;">
              {get_svg_icon('activity', color='#6366F1', size=17)}
              <span>Pelvis Kökü</span>
            </div>
            <span style="font-size:11.5px;background:rgba(99,102,241,0.1);color:#6366F1;padding:3px 10px;border-radius:12px;font-weight:800;">
              Ünlü: "i"
            </span>
          </div>
          <div style="font-size:14px;font-weight:700;color:{TITLE_LIGHT};font-family:monospace;">
            pelv/<span style="color:#6366F1;font-weight:900;">i</span> + -meter ➔ <span style="font-weight:900;color:#6366F1;">pelvimeter</span>
          </div>
          <div style="font-size:12.5px;font-weight:600;color:{TEXT_MUTED_LIGHT};margin-top:3px;">
            Leğen kemiği çapını ölçen alet (pelvimetre)
          </div>
        </div>
      </div>

      <div style="font-size:13.5px;font-weight:600;color:{TEXT_MUTED_LIGHT};line-height:1.45;margin-bottom:4px;">
        Bu istisnalar nadirdir; tıbbi dilin %95'inde standart birleştirici ünlü daima "o" harfidir.
      </div>

      {get_4x5_footer(4, is_dark=False)}
    </div>
    """,

    # SLIDE 5 (4:5) - Farklı Parça Kombinasyonları
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(5, is_dark=True)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
          YAPI ÇEŞİTLERİ
        </div>
        <h2 style="font-size:33px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 12px 0;">
          Farklı parça kombinasyonları.
        </h2>
        <p style="font-size:15px;font-weight:600;line-height:1.48;color:{TEXT_MUTED_DARK};margin:0 0 16px 0;">
          Tıbbi terimler daima tek bir şablonla kurulmaz; farklı yapı taşlarının birleşimiyle türetilir:
        </p>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px;">
        <!-- Kombinasyon 1 -->
        <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:14px;padding:12px 16px;">
          <div style="font-size:11px;font-weight:800;letter-spacing:1px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:4px;">
            KÖK + SON EK
          </div>
          <div style="font-size:14.5px;font-weight:700;color:#FFFFFF;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span style="font-family:monospace;color:{ACCENT_DARK};">neur/o</span>
            <span style="color:#64748B;">+</span>
            <span style="font-family:monospace;color:{ACCENT_DARK};">-logy</span>
            <span style="color:{ACCENT_DARK};">➔</span>
            <span style="font-weight:900;">neurology</span>
            <span style="font-size:12.5px;font-weight:600;color:{TEXT_MUTED_DARK};">(nöroloji)</span>
          </div>
        </div>

        <!-- Kombinasyon 2 -->
        <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:14px;padding:12px 16px;">
          <div style="font-size:11px;font-weight:800;letter-spacing:1px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:4px;">
            ÖN EK + SON EK
          </div>
          <div style="font-size:14.5px;font-weight:700;color:#FFFFFF;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span style="font-family:monospace;color:{ACCENT_DARK};">endo-</span>
            <span style="color:#64748B;">+</span>
            <span style="font-family:monospace;color:{ACCENT_DARK};">-scope</span>
            <span style="color:{ACCENT_DARK};">➔</span>
            <span style="font-weight:900;">endoscope</span>
            <span style="font-size:12.5px;font-weight:600;color:{TEXT_MUTED_DARK};">(endoskop)</span>
          </div>
        </div>

        <!-- Kombinasyon 3 -->
        <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:14px;padding:12px 16px;">
          <div style="font-size:11px;font-weight:800;letter-spacing:1px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:4px;">
            KÖK + KÖK + SON EK
          </div>
          <div style="font-size:14px;font-weight:700;color:#FFFFFF;display:flex;align-items:center;gap:5px;flex-wrap:wrap;">
            <span style="font-family:monospace;color:{ACCENT_DARK};">cardi/o</span>
            <span style="color:#64748B;">+</span>
            <span style="font-family:monospace;color:{ACCENT_DARK};">my/o</span>
            <span style="color:#64748B;">+</span>
            <span style="font-family:monospace;color:{ACCENT_DARK};">-pathy</span>
            <span style="color:{ACCENT_DARK};">➔</span>
            <span style="font-weight:900;">cardiomyopathy</span>
          </div>
        </div>
      </div>

      <div style="font-size:13.5px;font-weight:600;color:#64748B;line-height:1.45;margin-bottom:4px;">
        Bileşenleri doğru ayrıştırdığında terimin uzunluğu fark etmeksizin anlamı netleşir.
      </div>

      {get_4x5_footer(5, is_dark=True)}
    </div>
    """,

    # SLIDE 6 (4:5) - Özet İpucu
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(6, is_dark=False)}
      
      <div>
        <div style="font-size:12.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:12px;">
          ÖZET İPUCU
        </div>
        <h2 style="font-size:33px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:{TITLE_LIGHT};margin:0 0 16px 0;">
          "o" harfi bir ek değil, sadece bir köprüdür.
        </h2>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:16px;">
        <!-- Core Advice Box -->
        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-radius:16px;padding:18px 20px;box-shadow:0 4px 14px rgba(0,0,0,0.04);">
          <div style="font-size:15px;font-weight:800;color:{ACCENT_LIGHT};margin-bottom:8px;display:flex;align-items:center;gap:8px;">
            {get_svg_icon('link', color=ACCENT_LIGHT, size=20)}
            <span>Akılda Tutulması Gereken Kural:</span>
          </div>
          <div style="font-size:15px;font-weight:600;line-height:1.55;color:{TITLE_LIGHT};">
            Kelimede <strong>"o"</strong> harfini gördüğünde onun anlam taşıyan bir ek olmadığını, sadece iki parçayı birbirine bağlayan bir <strong>köprü</strong> olduğunu hatırla!
          </div>
        </div>

        <!-- Bridge Visual representation -->
        <div style="background:rgba(15,118,110,0.06);border:1px solid rgba(15,118,110,0.2);border-radius:14px;padding:14px 16px;text-align:center;">
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;font-family:monospace;font-weight:800;font-size:14px;">
            <div style="background:{BG_DARK};color:#FFF;padding:6px 12px;border-radius:8px;">PARÇA 1</div>
            <div style="background:{ACCENT_LIGHT};color:#FFF;padding:6px 14px;border-radius:16px;font-size:15px;font-weight:900;">— o —</div>
            <div style="background:{BG_TURQUOISE};color:#FFF;padding:6px 12px;border-radius:8px;">PARÇA 2</div>
          </div>
          <div style="font-size:12px;font-weight:700;color:{ACCENT_LIGHT};margin-top:6px;letter-spacing:0.5px;">
            FONETİK KÖPRÜ GÖREVİ
          </div>
        </div>
      </div>

      <div style="font-size:13.5px;font-weight:600;color:{TEXT_MUTED_LIGHT};line-height:1.45;margin-bottom:4px;text-align:center;">
        Kelimeleri köprülerinden ayırdığında, gizli şifre anında çözülür.
      </div>

      {get_4x5_footer(6, is_dark=False)}
    </div>
    """,

    # SLIDE 7 (4:5) - CTA
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
          Bu istisnaları daha önce duymuş muydun?
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
# İÇERİK 3: 9:16 REELS / STORY VİDEO FORMATI (540x960 -> 1080x1920 @ 2x)
# ==============================================================================
slides_9x16 = [
    # SLIDE 1 (9:16) - Hook
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <img src="{LOGO_B64}" alt="" style="position:absolute;top:220px;right:75px;width:300px;height:300px;object-fit:contain;opacity:0.065;user-select:none;pointer-events:none;z-index:1;" />
      
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:space-between;z-index:2;box-sizing:border-box;">
        <div>
          {get_header(is_dark=False, scale=1.25)}
        </div>

        <div style="margin-top:auto;margin-bottom:20px;">
          <div style="font-size:15.5px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:18px;">
            TIBBİ TERMİNOLOJİ ŞİFRELERİ
          </div>
          <h1 style="font-size:42px;font-weight:900;line-height:1.18;letter-spacing:-0.7px;color:{TITLE_LIGHT};margin:0 0 22px 0;">
            Tıbbi terimlerin arasındaki "o" harfi ne iş yapıyor?
          </h1>
          <p style="font-size:20.5px;font-weight:600;line-height:1.55;color:{TEXT_MUTED_LIGHT};margin:0;">
            Bir ek mi, rastgele bir ses mi yoksa gizli bir köprü mü? Tıp dilinin en sık kullanılan harfinin arkasındaki mantığı keşfet.
          </p>
        </div>
      </div>
    </div>
    """,

    # SLIDE 2 (9:16) - Bağlayıcı Ünlü Nedir?
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:20px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
            TEMEL MANTIK
          </div>
          <h2 style="font-size:40px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:#FFFFFF;margin:0 0 16px 0;">
            Bağlayıcı ünlü nedir?
          </h2>
          
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="display:flex;align-items:flex-start;gap:10px;font-size:18px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_DARK};">
              <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:{ACCENT_DARK};margin-top:9px;flex-shrink:0;"></span>
              <span>İki sessiz harfin yan yana gelerek <strong style="color:#FFF;">telaffuzu zorlaştırmasını</strong> engeller.</span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:10px;font-size:18px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_DARK};">
              <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:{ACCENT_DARK};margin-top:9px;flex-shrink:0;"></span>
              <span>Kelimenin akıcı ve ritmik okunmasını sağlar.</span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:10px;font-size:18px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_DARK};">
              <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:{ACCENT_DARK};margin-top:9px;flex-shrink:0;"></span>
              <span>Standart bağlayıcı ünlü: <strong style="color:{ACCENT_DARK};font-size:20px;">"o"</strong></span>
            </div>
          </div>
        </div>

        <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:18px;padding:20px 20px;margin-bottom:18px;">
          <div style="font-size:13.5px;font-weight:800;letter-spacing:1.5px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
            STANDART FORMÜL ÖRNEĞİ
          </div>

          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px 16px;margin-bottom:12px;text-align:center;">
            <div style="font-family:monospace;font-size:18px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;">
              <span>gastr</span>
              <span style="color:{ACCENT_DARK};font-size:20px;">+ o +</span>
              <span>enter</span>
              <span style="color:{ACCENT_DARK};font-size:20px;">+ o +</span>
              <span style="color:{ACCENT_DARK};">-logy</span>
            </div>
            <div style="margin-top:8px;font-size:19px;font-weight:900;color:#FFFFFF;">
              ➔ <span style="color:{ACCENT_DARK};">gastroenterology</span>
            </div>
          </div>

          <div style="font-size:15px;font-weight:600;line-height:1.48;color:{TEXT_MUTED_DARK};">
            "o" harfleri olmasaydı: <em style="color:#FFF;">"gastr-enter-logy"</em> gibi telaffuzu son derece zor ve kopuk bir kelime oluşurdu.
          </div>
        </div>

        <div style="font-size:16.5px;font-weight:600;color:#64748B;line-height:1.45;">
          Bağlayıcı ünlü, kelimeler arasındaki telaffuz pürüzlerini ortadan kaldırır.
        </div>
      </div>
    </div>
    """,

    # SLIDE 3 (9:16) - Kural Ne Zaman Geçerli?
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:18px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:10px;">
            BİRLEŞİM KURALLARI
          </div>
          <h2 style="font-size:38px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:#FFFFFF;margin:0 0 14px 0;">
            Kural ne zaman geçerli?
          </h2>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px;">
          <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:16px;padding:14px 16px;">
            <div style="font-size:13px;font-weight:800;letter-spacing:1px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:4px;">
              1. İKİ FARKLI KÖK BİRLEŞİRKEN
            </div>
            <div style="font-size:15px;font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:4px;">
              Araya her zaman girer:
            </div>
            <div style="font-size:15.5px;font-weight:800;color:#FFFFFF;font-family:monospace;">
              electr/o + cardi/o + -gram ➔ <span style="color:{ACCENT_TURQUOISE};">electrocardiogram</span>
            </div>
          </div>

          <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:16px;padding:14px 16px;">
            <div style="font-size:13px;font-weight:800;letter-spacing:1px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:4px;">
              2. SON EK SESSİZLE BAŞLARSA
            </div>
            <div style="font-size:15px;font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:4px;">
              Araya girer ve sesi yumuşatır:
            </div>
            <div style="font-size:15.5px;font-weight:800;color:#FFFFFF;font-family:monospace;">
              path/o + -logy ➔ <span style="color:{ACCENT_TURQUOISE};">pathology</span>
            </div>
          </div>

          <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:16px;padding:14px 16px;">
            <div style="font-size:13px;font-weight:800;letter-spacing:1px;color:#FCA5A5;text-transform:uppercase;margin-bottom:4px;">
              3. SON EK SESLİ HARFLE BAŞLARSA
            </div>
            <div style="font-size:15px;font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:4px;">
              Birleştirici ünlü düşer:
            </div>
            <div style="font-size:15.5px;font-weight:800;color:#FFFFFF;font-family:monospace;">
              gastr/o + -itis ➔ <span style="color:{ACCENT_TURQUOISE};">gastritis</span> <span style="font-size:13.5px;color:rgba(255,255,255,0.7);font-family:'Nunito';">(gastroitis değil!)</span>
            </div>
          </div>
        </div>

        <div style="font-size:16px;font-weight:600;color:rgba(255,255,255,0.8);line-height:1.45;">
          İki sesli harf yan yana gelip ses çatışması yaratmasın diye "o" harfi kendiliğinden elenir.
        </div>
      </div>
    </div>
    """,

    # SLIDE 4 (9:16) - Daha Az Bilinen İstisnalar!
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:18px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:12px;">
            DİKKAT EDİLMESİ GEREKENLER
          </div>
          <h2 style="font-size:38px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:{TITLE_LIGHT};margin:0 0 12px 0;">
            Daha az bilinen istisnalar!
          </h2>
          <p style="font-size:18px;font-weight:600;line-height:1.5;color:{TEXT_MUTED_LIGHT};margin:0 0 16px 0;">
            Birleştirici ünlü neredeyse her zaman "o" harfidir, ancak bazı köklerde farklı harfler devreye girer:
          </p>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:18px;">
          <!-- Safra Kökü -->
          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:5px solid {ACCENT_LIGHT};border-radius:16px;padding:16px 18px;box-shadow:0 2px 10px rgba(0,0,0,0.03);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <div style="font-size:17px;font-weight:900;color:{TITLE_LIGHT};display:flex;align-items:center;gap:8px;">
                {get_svg_icon('flask', color=ACCENT_LIGHT, size=20)}
                <span>Safra Kökü</span>
              </div>
              <span style="font-size:13px;background:rgba(15,118,110,0.1);color:{ACCENT_LIGHT};padding:4px 12px;border-radius:12px;font-weight:800;">
                Ünlü: "e"
              </span>
            </div>
            <div style="font-size:17px;font-weight:700;color:{TITLE_LIGHT};font-family:monospace;">
              chol/<span style="color:{ACCENT_LIGHT};font-weight:900;">e</span> + cyst/o + -itis ➔ <span style="font-weight:900;color:{ACCENT_LIGHT};">cholecystitis</span>
            </div>
            <div style="font-size:14.5px;font-weight:600;color:{TEXT_MUTED_LIGHT};margin-top:4px;">
              Safra kesesi iltihabı (choleitis / kolesistit)
            </div>
          </div>

          <!-- Pelvis Kökü -->
          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:5px solid #6366F1;border-radius:16px;padding:16px 18px;box-shadow:0 2px 10px rgba(0,0,0,0.03);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <div style="font-size:17px;font-weight:900;color:{TITLE_LIGHT};display:flex;align-items:center;gap:8px;">
                {get_svg_icon('activity', color='#6366F1', size=20)}
                <span>Pelvis Kökü</span>
              </div>
              <span style="font-size:13px;background:rgba(99,102,241,0.1);color:#6366F1;padding:4px 12px;border-radius:12px;font-weight:800;">
                Ünlü: "i"
              </span>
            </div>
            <div style="font-size:17px;font-weight:700;color:{TITLE_LIGHT};font-family:monospace;">
              pelv/<span style="color:#6366F1;font-weight:900;">i</span> + -meter ➔ <span style="font-weight:900;color:#6366F1;">pelvimeter</span>
            </div>
            <div style="font-size:14.5px;font-weight:600;color:{TEXT_MUTED_LIGHT};margin-top:4px;">
              Leğen kemiği çapını ölçen alet (pelvimetre)
            </div>
          </div>
        </div>

        <div style="font-size:16.5px;font-weight:600;color:{TEXT_MUTED_LIGHT};line-height:1.45;">
          Bu istisnalar nadirdir; tıbbi dilin %95'inde standart birleştirici ünlü daima "o" harfidir.
        </div>
      </div>
    </div>
    """,

    # SLIDE 5 (9:16) - Farklı Parça Kombinasyonları
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:18px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
            YAPI ÇEŞİTLERİ
          </div>
          <h2 style="font-size:38px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:#FFFFFF;margin:0 0 12px 0;">
            Farklı parça kombinasyonları.
          </h2>
          <p style="font-size:18px;font-weight:600;line-height:1.48;color:{TEXT_MUTED_DARK};margin:0 0 16px 0;">
            Tıbbi terimler daima tek bir şablonla kurulmaz; farklı yapı taşlarının birleşimiyle türetilir:
          </p>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px;">
          <!-- Kombinasyon 1 -->
          <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:16px;padding:14px 18px;">
            <div style="font-size:12.5px;font-weight:800;letter-spacing:1px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:4px;">
              KÖK + SON EK
            </div>
            <div style="font-size:17.5px;font-weight:700;color:#FFFFFF;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="font-family:monospace;color:{ACCENT_DARK};">neur/o</span>
              <span style="color:#64748B;">+</span>
              <span style="font-family:monospace;color:{ACCENT_DARK};">-logy</span>
              <span style="color:{ACCENT_DARK};">➔</span>
              <span style="font-weight:900;">neurology</span>
              <span style="font-size:14.5px;font-weight:600;color:{TEXT_MUTED_DARK};">(nöroloji)</span>
            </div>
          </div>

          <!-- Kombinasyon 2 -->
          <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:16px;padding:14px 18px;">
            <div style="font-size:12.5px;font-weight:800;letter-spacing:1px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:4px;">
              ÖN EK + SON EK
            </div>
            <div style="font-size:17.5px;font-weight:700;color:#FFFFFF;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="font-family:monospace;color:{ACCENT_DARK};">endo-</span>
              <span style="color:#64748B;">+</span>
              <span style="font-family:monospace;color:{ACCENT_DARK};">-scope</span>
              <span style="color:{ACCENT_DARK};">➔</span>
              <span style="font-weight:900;">endoscope</span>
              <span style="font-size:14.5px;font-weight:600;color:{TEXT_MUTED_DARK};">(endoskop)</span>
            </div>
          </div>

          <!-- Kombinasyon 3 -->
          <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-radius:16px;padding:14px 18px;">
            <div style="font-size:12.5px;font-weight:800;letter-spacing:1px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:4px;">
              KÖK + KÖK + SON EK
            </div>
            <div style="font-size:16.5px;font-weight:700;color:#FFFFFF;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <span style="font-family:monospace;color:{ACCENT_DARK};">cardi/o</span>
              <span style="color:#64748B;">+</span>
              <span style="font-family:monospace;color:{ACCENT_DARK};">my/o</span>
              <span style="color:#64748B;">+</span>
              <span style="font-family:monospace;color:{ACCENT_DARK};">-pathy</span>
              <span style="color:{ACCENT_DARK};">➔</span>
              <span style="font-weight:900;">cardiomyopathy</span>
            </div>
          </div>
        </div>

        <div style="font-size:16.5px;font-weight:600;color:#64748B;line-height:1.45;">
          Bileşenleri doğru ayrıştırdığında terimin uzunluğu fark etmeksizin anlamı netleşir.
        </div>
      </div>
    </div>
    """,

    # SLIDE 6 (9:16) - Özet İpucu
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:20px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:12px;">
            ÖZET İPUCU
          </div>
          <h2 style="font-size:38px;font-weight:900;line-height:1.18;letter-spacing:-0.6px;color:{TITLE_LIGHT};margin:0 0 16px 0;">
            "o" harfi bir ek değil, sadece bir köprüdür.
          </h2>
        </div>

        <div style="display:flex;flex-direction:column;gap:18px;margin-bottom:20px;">
          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-radius:18px;padding:22px 22px;box-shadow:0 4px 14px rgba(0,0,0,0.04);">
            <div style="font-size:17.5px;font-weight:800;color:{ACCENT_LIGHT};margin-bottom:10px;display:flex;align-items:center;gap:10px;">
              {get_svg_icon('link', color=ACCENT_LIGHT, size=22)}
              <span>Akılda Tutulması Gereken Kural:</span>
            </div>
            <div style="font-size:18px;font-weight:600;line-height:1.55;color:{TITLE_LIGHT};">
              Kelimede <strong>"o"</strong> harfini gördüğünde onun anlam taşıyan bir ek olmadığını, sadece iki parçayı birbirine bağlayan bir <strong>köprü</strong> olduğunu hatırla!
            </div>
          </div>

          <div style="background:rgba(15,118,110,0.06);border:1px solid rgba(15,118,110,0.2);border-radius:16px;padding:18px 20px;text-align:center;">
            <div style="display:flex;align-items:center;justify-content:center;gap:10px;font-family:monospace;font-weight:800;font-size:16px;">
              <div style="background:{BG_DARK};color:#FFF;padding:8px 14px;border-radius:8px;">PARÇA 1</div>
              <div style="background:{ACCENT_LIGHT};color:#FFF;padding:8px 16px;border-radius:20px;font-size:17px;font-weight:900;">— o —</div>
              <div style="background:{BG_TURQUOISE};color:#FFF;padding:8px 14px;border-radius:8px;">PARÇA 2</div>
            </div>
            <div style="font-size:14px;font-weight:700;color:{ACCENT_LIGHT};margin-top:8px;letter-spacing:0.5px;">
              FONETİK KÖPRÜ GÖREVİ
            </div>
          </div>
        </div>

        <div style="font-size:17px;font-weight:600;color:{TEXT_MUTED_LIGHT};line-height:1.45;text-align:center;">
          Kelimeleri köprülerinden ayırdığında, gizli şifre anında çözülür.
        </div>
      </div>
    </div>
    """,

    # SLIDE 7 (9:16) - CTA
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
            Bu istisnaları daha önce duymuş muydun?
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

html_4x5_path = OUTPUT_4X5 / "index_content3.html"
html_4x5_path.write_text(generate_html(slides_4x5, 540, 675, "İçerik 3 - 4:5 Slaytlar"), encoding="utf-8")

html_9x16_path = OUTPUT_9X16 / "index_content3.html"
html_9x16_path.write_text(generate_html(slides_9x16, 540, 960, "İçerik 3 - 9:16 Video"), encoding="utf-8")

async def export_all():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # 1. Export 4:5 format (1080x1350 via 540x675 @ 2x)
        print("Exporting İçerik 3 - 4:5 Post Slides (1080x1350)...")
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
            
            fn = OUTPUT_4X5 / f"icerik3_gonderi_{i+1:02d}.png"
            for _ in range(5):
                try:
                    with open(fn, "wb") as f:
                        f.write(img_bytes)
                    break
                except OSError:
                    await asyncio.sleep(0.4)
            print(f"  [4:5] Exported scene {i+1}/7 -> {fn.name}")

        await page_4x5.close()

        # 2. Export 9:16 format (1080x1920 via 540x960 @ 2x)
        print("Exporting İçerik 3 - 9:16 Reels Video Slides (1080x1920)...")
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
            
            fn = OUTPUT_9X16 / f"icerik3_video_{i+1:02d}.png"
            for _ in range(5):
                try:
                    with open(fn, "wb") as f:
                        f.write(img_bytes)
                    break
                except OSError:
                    await asyncio.sleep(0.4)
            print(f"  [9:16] Exported scene {i+1}/7 -> {fn.name}")

        await page_9x16.close()
        await browser.close()
        print("İçerik 3 slide generation completed successfully!")

if __name__ == "__main__":
    asyncio.run(export_all())
