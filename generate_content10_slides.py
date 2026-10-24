import asyncio
import base64
from pathlib import Path
from playwright.async_api import async_playwright

BASE_DIR = Path(__file__).resolve().parent
DESKTOP_DIR = Path(r"C:\Users\cicek\OneDrive\Desktop")

# Kanonik tek çıktı klasörleri: Icerik_10/
OUTPUT_4X5 = DESKTOP_DIR / "Instagram_Video_Slaytlar" / "4x5_Post_Formati" / "Icerik_10"
OUTPUT_9X16 = DESKTOP_DIR / "Instagram_Video_Slaytlar" / "9x16_Reels_Formati" / "Icerik_10"
OUTPUT_4X5.mkdir(parents=True, exist_ok=True)
OUTPUT_9X16.mkdir(parents=True, exist_ok=True)

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
    if name == "volume":
        inner = """<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>"""
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
    elif name == "alert-circle":
        inner = """<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>"""
    elif name == "sparkle":
        inner = """<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>"""
    elif name == "check":
        inner = """<polyline points="20 6 9 17 4 12"></polyline>"""
    elif name == "book-open":
        inner = """<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>"""
    elif name == "layers":
        inner = """<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>"""
    elif name == "edit-3":
        inner = """<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>"""
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
# İÇERİK 10: 4:5 GÖNDERİ FORMATI (540x675 -> 1080x1350 @ 2x)
# ==============================================================================
slides_4x5 = [
    # SLIDE 1 (4:5) - Kapak / Hook
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:675px;padding:46px 58px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      <img src="{LOGO_B64}" alt="" style="position:absolute;top:35px;right:25px;width:280px;height:280px;object-fit:contain;opacity:0.065;user-select:none;pointer-events:none;z-index:1;" />
      {get_4x5_swipe_arrow(1, is_dark=False)}
      
      <div style="z-index:2;">
        {get_header(is_dark=False)}
      </div>

      <div style="z-index:2;margin-top:auto;margin-bottom:36px;">
        <h1 style="font-size:34px;font-weight:900;line-height:1.24;letter-spacing:-0.6px;color:{TITLE_LIGHT};margin:0;">
          Binlerce kelimeyi unutmamak için 4 adımlı çalışma yöntemi!
        </h1>
      </div>

      <div style="z-index:2;">
        {get_4x5_footer(1, is_dark=False)}
      </div>
    </div>
    """,

    # SLIDE 2 (4:5) - 1. Adım
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:675px;padding:46px 54px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(2, is_dark=True)}
      
      <div>
        <div style="font-size:12px;font-weight:800;letter-spacing:2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:10px;">
          1. EZBERLEME, PARÇALA VE ANLA
        </div>
        <h2 style="font-size:29px;font-weight:900;line-height:1.24;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 16px 0;">
          Terimleri bütün olarak ezberleme, morfemlerine ayır.
        </h2>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:auto;">
        <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-left:4px solid {ACCENT_DARK};border-radius:14px;padding:22px 20px;">
          <div style="font-size:16px;font-weight:700;color:#FFFFFF;line-height:1.6;">
            <span style="font-family:monospace;color:{ACCENT_DARK};font-size:17px;font-weight:900;">cardi/o</span> (kalp) ve <span style="font-family:monospace;color:#38bdf8;font-size:17px;font-weight:900;">-itis</span> (iltihap) birleşimini çözdüğünde kalp ile ilgili onlarca terimi ezberlemeden anlarsın.
          </div>
        </div>
      </div>

      {get_4x5_footer(2, is_dark=True)}
    </div>
    """,

    # SLIDE 3 (4:5) - 2. Adım
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:675px;padding:46px 54px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(3, is_dark=False, is_turquoise=True)}
      
      <div>
        <div style="font-size:12px;font-weight:800;letter-spacing:2px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:10px;">
          2. ARALIKLI TEKRAR YÖNTEMİ
        </div>
        <h2 style="font-size:29px;font-weight:900;line-height:1.24;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 16px 0;">
          Yeni kök ve ekleri 1. gün, 3. gün ve 1 hafta sonra tekrar et.
        </h2>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:auto;">
        <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:14px;padding:22px 20px;">
          <div style="font-size:16px;font-weight:700;color:#FFFFFF;line-height:1.6;">
            Kartların bir yüzüne morfem yapısını (<span style="font-family:monospace;color:{ACCENT_TURQUOISE};font-size:17px;font-weight:900;">ren/o</span>), diğer yüzüne anlamını (böbrek) yazıp kendini test et.
          </div>
        </div>
      </div>

      {get_4x5_footer(3, is_dark=False, is_turquoise=True)}
    </div>
    """,

    # SLIDE 4 (4:5) - 3. Adım
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:675px;padding:46px 54px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(4, is_dark=False)}
      
      <div>
        <div style="font-size:12px;font-weight:800;letter-spacing:2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:10px;">
          3. SESLİ TELAFFUZ VE İŞİTSEL HAFIZA
        </div>
        <h2 style="font-size:29px;font-weight:900;line-height:1.24;letter-spacing:-0.5px;color:{TITLE_LIGHT};margin:0 0 16px 0;">
          Terimleri sadece gözünle okuma. Okunuş kurallarına dikkat ederek yüksek sesle telaffuz et.
        </h2>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:auto;">
        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid {ACCENT_LIGHT};border-radius:14px;padding:22px 20px;box-shadow:0 2px 10px rgba(0,0,0,0.03);">
          <div style="display:flex;align-items:center;gap:12px;">
            {get_svg_icon('volume', color=ACCENT_LIGHT, size=24)}
            <div style="font-size:16px;font-weight:700;color:{TITLE_LIGHT};line-height:1.5;">
              İşitsel hafızan da devreye girer.
            </div>
          </div>
        </div>
      </div>

      {get_4x5_footer(4, is_dark=False)}
    </div>
    """,

    # SLIDE 5 (4:5) - 4. Adım
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:675px;padding:46px 54px 34px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(5, is_dark=True)}
      
      <div>
        <div style="font-size:12px;font-weight:800;letter-spacing:2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:10px;">
          4. BAĞLAM İÇİNDE OKUMA YAP
        </div>
        <h2 style="font-size:29px;font-weight:900;line-height:1.24;letter-spacing:-0.5px;color:#FFFFFF;margin:0 0 16px 0;">
          Kök ve ekleri tek başlarına liste halinde bırakma.
        </h2>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:auto;">
        <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-left:4px solid {ACCENT_DARK};border-radius:14px;padding:22px 20px;">
          <div style="display:flex;align-items:flex-start;gap:12px;">
            {get_svg_icon('book-open', color=ACCENT_DARK, size=22)}
            <div style="font-size:16px;font-weight:700;color:#FFFFFF;line-height:1.6;">
              Öğrendiğin yapıları anatomi atlaslarında, vaka raporlarında ve ders notlarında cümle içinde gör.
            </div>
          </div>
        </div>
      </div>

      {get_4x5_footer(5, is_dark=True)}
    </div>
    """,

    # SLIDE 6 (4:5) - HealthLexMed Özellikleri
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:675px;padding:44px 50px 32px 36px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(6, is_dark=False)}
      
      <div style="margin-bottom:14px;">
        <div style="font-size:12px;font-weight:800;letter-spacing:2px;color:{ACCENT_LIGHT};text-transform:uppercase;">
          HEALTHLEXMED'DE BU YÖNTEMİ UYGULA
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px;">
        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid {ACCENT_LIGHT};border-radius:12px;padding:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,0.03);display:flex;align-items:center;gap:10px;">
          {get_svg_icon('layers', color=ACCENT_LIGHT, size=20)}
          <div style="font-size:14px;font-weight:700;color:{TITLE_LIGHT};line-height:1.4;">
            <strong style="color:{ACCENT_LIGHT};">570+ morfem kütüphanesi:</strong> ön ek, kök ve son ek analizleri
          </div>
        </div>

        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid #3B82F6;border-radius:12px;padding:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,0.03);display:flex;align-items:center;gap:10px;">
          {get_svg_icon('bookmark', color='#3B82F6', size=20)}
          <div style="font-size:14px;font-weight:700;color:{TITLE_LIGHT};line-height:1.4;">
            <strong style="color:#3B82F6;">Kelime kartları:</strong> aralıklı tekrar planına göre kendin kullanarak çalış
          </div>
        </div>

        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid #8B5CF6;border-radius:12px;padding:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,0.03);display:flex;align-items:center;gap:10px;">
          {get_svg_icon('edit-3', color='#8B5CF6', size=20)}
          <div style="font-size:14px;font-weight:700;color:{TITLE_LIGHT};line-height:1.4;">
            <strong style="color:#8B5CF6;">Morfem yapıcı:</strong> tanımdan terimi sıfırdan kur
          </div>
        </div>

        <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid #10B981;border-radius:12px;padding:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,0.03);display:flex;align-items:center;gap:10px;">
          {get_svg_icon('check', color='#10B981', size=20)}
          <div style="font-size:14px;font-weight:700;color:{TITLE_LIGHT};line-height:1.4;">
            <strong style="color:#10B981;">Eşleştirme ve quiz:</strong> pratik yap ve seviyeni ölç
          </div>
        </div>
      </div>

      {get_4x5_footer(6, is_dark=False)}
    </div>
    """,

    # SLIDE 7 (4:5) - Kapanış / CTA
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:675px;padding:44px 40px 32px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;text-align:center;overflow:hidden;">
      <div style="display:flex;justify-content:center;">
        {get_header(is_dark=False, is_turquoise=True)}
      </div>

      <div style="margin:auto 0;">
        <div style="display:inline-block;font-size:11.5px;font-weight:800;letter-spacing:2px;color:{ACCENT_TURQUOISE};background:rgba(255,255,255,0.12);padding:5px 14px;border-radius:24px;text-transform:uppercase;margin-bottom:16px;">
          SIRA SENDE
        </div>

        <h2 style="font-size:27px;font-weight:900;line-height:1.24;margin:0 0 16px 0;letter-spacing:-0.5px;">
          Ezberlemeden, sistemli şekilde öğrenmek için sen de HealthLexMed'i keşfet!
        </h2>

        <p style="font-size:15.5px;font-weight:700;color:rgba(255,255,255,0.92);margin:0 0 18px 0;line-height:1.4;">
          Yorumlara <span style="color:{ACCENT_TURQUOISE};font-weight:900;">REHBER</span> yaz, linki DM'den göndereyim.
        </p>

        <div style="background:{CARD_LIGHT};color:{TITLE_LIGHT};border-radius:15px;padding:14px 20px;box-shadow:0 12px 30px rgba(0,0,0,0.25);display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:92%;box-sizing:border-box;gap:4px;">
          <span style="font-size:12.5px;font-weight:700;color:{TEXT_MUTED_LIGHT};">Rehberin tamamına ulaşmak için:</span>
          <span style="font-size:20px;font-weight:900;color:{ACCENT_LIGHT};letter-spacing:-0.3px;">healthlexmed.com/rehber</span>
        </div>
      </div>

      <div style="display:flex;justify-content:center;gap:20px;margin-bottom:6px;">
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.9);font-weight:600;">
          {get_svg_icon('heart', color=ACCENT_TURQUOISE, size=18)} <span>Beğen</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.9);font-weight:600;">
          {get_svg_icon('message-circle', color=ACCENT_TURQUOISE, size=18)} <span>Yorum Yap</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.9);font-weight:600;">
          {get_svg_icon('send', color=ACCENT_TURQUOISE, size=18)} <span>Paylaş</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.9);font-weight:600;">
          {get_svg_icon('bookmark', color=ACCENT_TURQUOISE, size=18)} <span>Kaydet</span>
        </div>
      </div>

      {get_4x5_footer(7, is_dark=False, is_turquoise=True)}
    </div>
    """
]

# ==============================================================================
# İÇERİK 10: 9:16 REELS / STORY VİDEO FORMATI (540x960 -> 1080x1920 @ 2x)
# ==============================================================================
slides_9x16 = [
    # SLIDE 1 (9:16) - Kapak / Hook
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <img src="{LOGO_B64}" alt="" style="position:absolute;top:220px;right:75px;width:300px;height:300px;object-fit:contain;opacity:0.065;user-select:none;pointer-events:none;z-index:1;" />
      
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:space-between;z-index:2;box-sizing:border-box;">
        <div>
          {get_header(is_dark=False, scale=1.25)}
        </div>

        <div style="margin-top:auto;margin-bottom:24px;">
          <h1 style="font-size:38px;font-weight:900;line-height:1.2;letter-spacing:-0.7px;color:{TITLE_LIGHT};margin:0;">
            Binlerce kelimeyi unutmamak için 4 adımlı çalışma yöntemi!
          </h1>
        </div>
      </div>
    </div>
    """,

    # SLIDE 2 (9:16) - 1. Adım
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:24px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
            1. EZBERLEME, PARÇALA VE ANLA
          </div>
          <h2 style="font-size:35px;font-weight:900;line-height:1.22;letter-spacing:-0.6px;color:#FFFFFF;margin:0 0 16px 0;">
            Terimleri bütün olarak ezberleme, morfemlerine ayır.
          </h2>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-left:4px solid {ACCENT_DARK};border-radius:18px;padding:26px 24px;">
            <div style="font-size:18.5px;font-weight:700;color:#FFFFFF;line-height:1.6;">
              <span style="font-family:monospace;color:{ACCENT_DARK};font-size:20px;font-weight:900;">cardi/o</span> (kalp) ve <span style="font-family:monospace;color:#38bdf8;font-size:20px;font-weight:900;">-itis</span> (iltihap) birleşimini çözdüğünde kalp ile ilgili onlarca terimi ezberlemeden anlarsın.
            </div>
          </div>
        </div>
      </div>
    </div>
    """,

    # SLIDE 3 (9:16) - 2. Adım
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:24px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_TURQUOISE};text-transform:uppercase;margin-bottom:12px;">
            2. ARALIKLI TEKRAR YÖNTEMİ
          </div>
          <h2 style="font-size:35px;font-weight:900;line-height:1.22;letter-spacing:-0.6px;color:#FFFFFF;margin:0 0 16px 0;">
            Yeni kök ve ekleri 1. gün, 3. gün ve 1 hafta sonra tekrar et.
          </h2>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="background:{CARD_TURQUOISE};border:1px solid {BORDER_TURQUOISE};border-radius:18px;padding:26px 24px;">
            <div style="font-size:18.5px;font-weight:700;color:#FFFFFF;line-height:1.6;">
              Kartların bir yüzüne morfem yapısını (<span style="font-family:monospace;color:{ACCENT_TURQUOISE};font-size:20px;font-weight:900;">ren/o</span>), diğer yüzüne anlamını (böbrek) yazıp kendini test et.
            </div>
          </div>
        </div>
      </div>
    </div>
    """,

    # SLIDE 4 (9:16) - 3. Adım
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:24px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_LIGHT};text-transform:uppercase;margin-bottom:12px;">
            3. SESLİ TELAFFUZ VE İŞİTSEL HAFIZA
          </div>
          <h2 style="font-size:34px;font-weight:900;line-height:1.22;letter-spacing:-0.6px;color:{TITLE_LIGHT};margin:0 0 16px 0;">
            Terimleri sadece gözünle okuma. Okunuş kurallarına dikkat ederek yüksek sesle telaffuz et.
          </h2>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid {ACCENT_LIGHT};border-radius:18px;padding:24px 24px;box-shadow:0 3px 12px rgba(0,0,0,0.04);">
            <div style="display:flex;align-items:center;gap:14px;">
              {get_svg_icon('volume', color=ACCENT_LIGHT, size=28)}
              <div style="font-size:18px;font-weight:700;color:{TITLE_LIGHT};line-height:1.55;">
                İşitsel hafızan da devreye girer.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    """,

    # SLIDE 5 (9:16) - 4. Adım
    f"""
    <div class="slide" style="background:{BG_DARK};color:{TEXT_LIGHT};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:24px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_DARK};text-transform:uppercase;margin-bottom:12px;">
            4. BAĞLAM İÇİNDE OKUMA YAP
          </div>
          <h2 style="font-size:34px;font-weight:900;line-height:1.22;letter-spacing:-0.6px;color:#FFFFFF;margin:0 0 16px 0;">
            Kök ve ekleri tek başlarına liste halinde bırakma.
          </h2>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="background:{CARD_DARK};border:1px solid {BORDER_DARK};border-left:4px solid {ACCENT_DARK};border-radius:18px;padding:26px 24px;">
            <div style="display:flex;align-items:flex-start;gap:14px;">
              {get_svg_icon('book-open', color=ACCENT_DARK, size=26)}
              <div style="font-size:18.5px;font-weight:700;color:#FFFFFF;line-height:1.6;">
                Öğrendiğin yapıları anatomi atlaslarında, vaka raporlarında ve ders notlarında cümle içinde gör.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    """,

    # SLIDE 6 (9:16) - HealthLexMed Özellikleri
    f"""
    <div class="slide" style="background:{BG_LIGHT};color:{TEXT_DARK};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:center;z-index:2;box-sizing:border-box;">
        <div style="margin-bottom:18px;">
          <div style="font-size:15px;font-weight:800;letter-spacing:2.2px;color:{ACCENT_LIGHT};text-transform:uppercase;">
            HEALTHLEXMED'DE BU YÖNTEMİ UYGULA
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid {ACCENT_LIGHT};border-radius:14px;padding:14px 18px;box-shadow:0 2px 10px rgba(0,0,0,0.03);display:flex;align-items:center;gap:12px;">
            {get_svg_icon('layers', color=ACCENT_LIGHT, size=24)}
            <div style="font-size:15.5px;font-weight:700;color:{TITLE_LIGHT};line-height:1.45;">
              <strong style="color:{ACCENT_LIGHT};">570+ morfem kütüphanesi:</strong> ön ek, kök ve son ek analizleri
            </div>
          </div>

          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid #3B82F6;border-radius:14px;padding:14px 18px;box-shadow:0 2px 10px rgba(0,0,0,0.03);display:flex;align-items:center;gap:12px;">
            {get_svg_icon('bookmark', color='#3B82F6', size=24)}
            <div style="font-size:15.5px;font-weight:700;color:{TITLE_LIGHT};line-height:1.45;">
              <strong style="color:#3B82F6;">Kelime kartları:</strong> aralıklı tekrar planına göre kendin kullanarak çalış
            </div>
          </div>

          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid #8B5CF6;border-radius:14px;padding:14px 18px;box-shadow:0 2px 10px rgba(0,0,0,0.03);display:flex;align-items:center;gap:12px;">
            {get_svg_icon('edit-3', color='#8B5CF6', size=24)}
            <div style="font-size:15.5px;font-weight:700;color:{TITLE_LIGHT};line-height:1.45;">
              <strong style="color:#8B5CF6;">Morfem yapıcı:</strong> tanımdan terimi sıfırdan kur
            </div>
          </div>

          <div style="background:{CARD_LIGHT};border:1px solid {BORDER_LIGHT};border-left:4px solid #10B981;border-radius:14px;padding:14px 18px;box-shadow:0 2px 10px rgba(0,0,0,0.03);display:flex;align-items:center;gap:12px;">
            {get_svg_icon('check', color='#10B981', size=24)}
            <div style="font-size:15.5px;font-weight:700;color:{TITLE_LIGHT};line-height:1.45;">
              <strong style="color:#10B981;">Eşleştirme ve quiz:</strong> pratik yap ve seviyeni ölç
            </div>
          </div>
        </div>
      </div>
    </div>
    """,

    # SLIDE 7 (9:16) - Kapanış / CTA
    f"""
    <div class="slide" style="background:{BG_TURQUOISE};color:#FFFFFF;position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center;z-index:2;box-sizing:border-box;">
        <div>
          {get_header(is_dark=False, is_turquoise=True, scale=1.25)}
        </div>

        <div style="margin:auto 0;width:100%;">
          <div style="display:inline-block;font-size:13px;font-weight:800;letter-spacing:2px;color:{ACCENT_TURQUOISE};background:rgba(255,255,255,0.12);padding:6px 16px;border-radius:24px;text-transform:uppercase;margin-bottom:20px;">
            SIRA SENDE
          </div>

          <h2 style="font-size:33px;font-weight:900;line-height:1.22;margin:0 0 20px 0;letter-spacing:-0.6px;">
            Ezberlemeden, sistemli şekilde öğrenmek için sen de HealthLexMed'i keşfet!
          </h2>

          <p style="font-size:17.5px;font-weight:700;color:rgba(255,255,255,0.92);margin:0 0 22px 0;line-height:1.45;">
            Yorumlara <span style="color:{ACCENT_TURQUOISE};font-weight:900;">REHBER</span> yaz, linki DM'den göndereyim.
          </p>

          <div style="background:{CARD_LIGHT};color:{TITLE_LIGHT};border-radius:18px;padding:16px 20px;box-shadow:0 12px 30px rgba(0,0,0,0.25);display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:95%;box-sizing:border-box;gap:5px;">
            <span style="font-size:13.5px;font-weight:700;color:{TEXT_MUTED_LIGHT};">Rehberin tamamına ulaşmak için:</span>
            <span style="font-size:22px;font-weight:900;color:{ACCENT_LIGHT};letter-spacing:-0.3px;">healthlexmed.com/rehber</span>
          </div>
        </div>

        <div style="display:flex;justify-content:center;gap:22px;margin-bottom:4px;width:100%;">
          <div style="display:flex;align-items:center;gap:6px;font-size:14.5px;color:rgba(255,255,255,0.9);font-weight:600;">
            {get_svg_icon('heart', color=ACCENT_TURQUOISE, size=20)} <span>Beğen</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:14.5px;color:rgba(255,255,255,0.9);font-weight:600;">
            {get_svg_icon('message-circle', color=ACCENT_TURQUOISE, size=20)} <span>Yorum Yap</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:14.5px;color:rgba(255,255,255,0.9);font-weight:600;">
            {get_svg_icon('send', color=ACCENT_TURQUOISE, size=20)} <span>Paylaş</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:14.5px;color:rgba(255,255,255,0.9);font-weight:600;">
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

html_4x5_path = OUTPUT_4X5 / "index_content10.html"
html_4x5_path.write_text(generate_html(slides_4x5, 540, 675, "İçerik 10 - 4:5 Slaytlar"), encoding="utf-8")

html_9x16_path = OUTPUT_9X16 / "index_content10.html"
html_9x16_path.write_text(generate_html(slides_9x16, 540, 960, "İçerik 10 - 9:16 Video"), encoding="utf-8")

async def export_all():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # 1. Export 4:5 format (1080x1350 via 540x675 @ 2x)
        print("Exporting İçerik 10 - 4:5 Post Slides (1080x1350) -> Icerik_10/...")
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
            
            fn = OUTPUT_4X5 / f"icerik10_gonderi_{i+1:02d}.png"
            with open(fn, "wb") as f:
                f.write(img_bytes)
            print(f"  [4:5] Exported scene {i+1}/7 -> {fn.name}")

        await page_4x5.close()

        # 2. Export 9:16 format (1080x1920 via 540x960 @ 2x)
        print("Exporting İçerik 10 - 9:16 Reels Video Slides (1080x1920) -> Icerik_10/...")
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
            
            fn = OUTPUT_9X16 / f"icerik10_video_{i+1:02d}.png"
            with open(fn, "wb") as f:
                f.write(img_bytes)
            print(f"  [9:16] Exported scene {i+1}/7 -> {fn.name}")

        await page_9x16.close()
        await browser.close()
        print("İçerik 10 slide generation completed successfully in Icerik_10/!")

if __name__ == "__main__":
    asyncio.run(export_all())
