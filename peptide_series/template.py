# peptide_series/template.py
from .theme import (
    BG_LIGHT, BG_DARK, BG_ACCENT,
    TEXT_ON_LIGHT, TEXT_ON_DARK,
    MUTED_ON_LIGHT, MUTED_ON_DARK,
    ACCENT_LIGHT, ACCENT_DARK,
    CARD_LIGHT, CARD_DARK,
    BORDER_LIGHT, BORDER_DARK,
    BADGE_GREEN, BADGE_AMBER, BADGE_RED,
    FONT, BRAND_TEXT, HANDLE
)

def get_theme_colors(mode):
    if mode == "light":
        return {
            "bg": BG_LIGHT,
            "text": TEXT_ON_LIGHT,
            "title": TEXT_ON_LIGHT,
            "muted": MUTED_ON_LIGHT,
            "accent": ACCENT_LIGHT,
            "card": CARD_LIGHT,
            "border": BORDER_LIGHT,
            "track": "rgba(30, 38, 34, 0.12)",
            "fill": ACCENT_LIGHT,
        }
    elif mode == "accent":
        return {
            "bg": BG_ACCENT,
            "text": TEXT_ON_DARK,
            "title": TEXT_ON_DARK,
            "muted": "rgba(243, 237, 226, 0.85)",
            "accent": ACCENT_DARK,
            "card": "rgba(255, 255, 255, 0.12)",
            "border": "rgba(255, 255, 255, 0.18)",
            "track": "rgba(255, 255, 255, 0.2)",
            "fill": ACCENT_DARK,
        }
    else:  # dark
        return {
            "bg": BG_DARK,
            "text": TEXT_ON_DARK,
            "title": "#FFFFFF",
            "muted": MUTED_ON_DARK,
            "accent": ACCENT_DARK,
            "card": CARD_DARK,
            "border": BORDER_DARK,
            "track": "rgba(255, 255, 255, 0.12)",
            "fill": ACCENT_DARK,
        }

def get_header(mode, scale=1.0):
    c = get_theme_colors(mode)
    title_size = int(14.5 * scale)
    handle_size = int(12.5 * scale)
    dot_size = int(4 * scale)
    gap = int(9 * scale)
    
    return f"""
    <div style="display:flex;align-items:center;gap:{gap}px;letter-spacing:-0.2px;">
      <span style="font-size:{title_size}px;font-weight:800;color:{c['title']};">{BRAND_TEXT}</span>
      <span style="width:{dot_size}px;height:{dot_size}px;border-radius:50%;background:{c['accent']};opacity:0.75;display:inline-block;"></span>
      <span style="font-size:{handle_size}px;font-weight:600;color:{c['accent']};">{HANDLE}</span>
    </div>
    """

def get_4x5_footer(slide_index, total_slides=7, mode="light"):
    c = get_theme_colors(mode)
    pct = (slide_index / total_slides) * 100.0
    return f"""
    <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;margin-top:auto;padding-top:14px;">
      <div style="flex:1;height:4px;background:{c['track']};border-radius:2px;overflow:hidden;">
        <div style="width:{pct:.1f}%;height:100%;background:{c['fill']};border-radius:2px;"></div>
      </div>
      <span style="font-size:12.5px;font-weight:800;color:{c['muted']};letter-spacing:0.5px;">{slide_index}/{total_slides}</span>
    </div>
    """

def get_4x5_swipe_arrow(slide_index, total_slides=7, mode="light"):
    if slide_index >= total_slides:
        return ""
    c = get_theme_colors(mode)
    return f"""
    <div style="position:absolute;right:12px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:{c['card']};border:1px solid {c['border']};box-shadow:0 2px 8px rgba(0,0,0,0.12);display:flex;align-items:center;justify-content:center;z-index:30;pointer-events:none;">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="{c['accent']}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
    """

def render_beads_block(block, mode, scale=1.0):
    c = get_theme_colors(mode)
    variant = block.get("variant", "decorative_single")
    
    if variant == "decorative_single":
        # Slide 1: Decorative single short peptide chain
        bead_size = int(32 * scale)
        font_size = int(11 * scale)
        beads_html = []
        labels = ["Val", "Gly", "Pro", "Ala", "Arg"]
        for idx, lbl in enumerate(labels):
            bead = f"""
            <div style="display:flex;flex-direction:column;align-items:center;gap:{int(4*scale)}px;">
              <div style="width:{bead_size}px;height:{bead_size}px;border-radius:50%;background:{c['bg']};border:2px solid {c['accent']};color:{c['text']};display:flex;align-items:center;justify-content:center;font-size:{font_size}px;font-weight:800;box-shadow:0 3px 8px rgba(0,0,0,0.06);">
                {lbl}
              </div>
              <span style="font-size:{int(8.5*scale)}px;font-weight:700;color:{c['muted']};text-transform:uppercase;letter-spacing:0.5px;">AA {idx+1}</span>
            </div>
            """
            beads_html.append(bead)
            if idx < len(labels) - 1:
                line = f"""
                <div style="display:flex;flex-direction:column;align-items:center;margin-top:{int(-10*scale)}px;">
                  <div style="width:{int(20*scale)}px;height:2px;background:{c['accent']};opacity:0.6;"></div>
                </div>
                """
                beads_html.append(line)
        
        return f"""
        <div style="background:{c['card']};border:1px solid {c['border']};border-radius:{int(16*scale)}px;padding:{int(18*scale)}px {int(16*scale)}px;margin:{int(14*scale)}px 0;display:flex;flex-direction:column;gap:{int(10*scale)}px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:{int(4*scale)}px;">
            <div style="font-size:{int(11*scale)}px;font-weight:800;letter-spacing:1.5px;color:{c['accent']};text-transform:uppercase;">
              AMİNO ASİT ZİNCİRİ
            </div>
            <div style="font-size:{int(11*scale)}px;font-weight:600;color:{c['muted']};">
              Peptit Bağı İle Bağlı
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;gap:{int(6*scale)}px;padding:{int(4*scale)}px 0;">
            {''.join(beads_html)}
          </div>
        </div>
        """

    elif variant == "comparison":
        # Slide 2: Top card 3 beads (Peptit), bottom card long sequence (Protein)
        top = block.get("top", {})
        bottom = block.get("bottom", {})
        
        # Peptit: 3 clean beads
        p_beads = []
        p_labels = ["AA 1", "AA 2", "AA 3"]
        for idx, lbl in enumerate(p_labels):
            p_beads.append(f"""
            <div style="width:{int(30*scale)}px;height:{int(30*scale)}px;border-radius:50%;background:{c['bg']};border:2px solid {c['accent']};color:{c['text']};display:flex;align-items:center;justify-content:center;font-size:{int(10*scale)}px;font-weight:800;">
              {lbl}
            </div>
            """)
            if idx < len(p_labels) - 1:
                p_beads.append(f"""<div style="width:{int(14*scale)}px;height:2px;background:{c['accent']};"></div>""")
        
        # Protein: 10-12 condensed beads showing long folded chain
        prot_beads = []
        for i in range(11):
            opacity = 0.5 + (0.5 if i % 2 == 0 else 0.2)
            prot_beads.append(f"""
            <div style="width:{int(18*scale)}px;height:{int(18*scale)}px;border-radius:50%;background:{c['accent']};opacity:{opacity:.2f};border:1px solid rgba(255,255,255,0.2);"></div>
            """)
            if i < 10:
                prot_beads.append(f"""<div style="width:{int(8*scale)}px;height:1.5px;background:{c['border']};"></div>""")

        return f"""
        <div style="display:flex;flex-direction:column;gap:{int(10*scale)}px;margin:{int(12*scale)}px 0;">
          <!-- Top Card: Peptit -->
          <div style="background:{c['card']};border:1px solid {c['border']};border-left:4px solid {c['accent']};border-radius:{int(14*scale)}px;padding:{int(12*scale)}px {int(16*scale)}px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:{int(8*scale)}px;">
              <span style="font-size:{int(13*scale)}px;font-weight:800;color:{c['title']};">{top.get('label', 'Peptit')}</span>
              <span style="font-size:{int(10.5*scale)}px;font-weight:700;color:{c['accent']};letter-spacing:0.5px;text-transform:uppercase;">{top.get('sublabel', '2 - 50 Amino Asit')}</span>
            </div>
            <div style="display:flex;align-items:center;gap:{int(6*scale)}px;">
              {''.join(p_beads)}
            </div>
          </div>

          <!-- Bottom Card: Protein -->
          <div style="background:{c['card']};border:1px solid {c['border']};border-left:4px solid {MUTED_ON_DARK if mode != 'light' else MUTED_ON_LIGHT};border-radius:{int(14*scale)}px;padding:{int(12*scale)}px {int(16*scale)}px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:{int(8*scale)}px;">
              <span style="font-size:{int(13*scale)}px;font-weight:800;color:{c['title']};">{bottom.get('label', 'Protein')}</span>
              <span style="font-size:{int(10.5*scale)}px;font-weight:700;color:{c['muted']};letter-spacing:0.5px;text-transform:uppercase;">{bottom.get('sublabel', '50+ Amino Asit')}</span>
            </div>
            <div style="display:flex;align-items:center;flex-wrap:wrap;gap:{int(4*scale)}px;">
              {''.join(prot_beads)}
            </div>
          </div>
        </div>
        """
    return ""

def render_content_block(block, mode, scale=1.0):
    if not block:
        return ""
    b_type = block.get("type")
    if b_type == "beads":
        return render_beads_block(block, mode, scale)
    elif b_type == "bullets":
        c = get_theme_colors(mode)
        items = block.get("items", [])
        items_html = []
        for item in items:
            items_html.append(f"""
            <div style="display:flex;align-items:flex-start;gap:{int(10*scale)}px;margin-bottom:{int(8*scale)}px;">
              <div style="width:{int(6*scale)}px;height:{int(6*scale)}px;border-radius:50%;background:{c['accent']};margin-top:{int(6*scale)}px;flex-shrink:0;"></div>
              <div style="font-size:{int(14*scale)}px;font-weight:600;line-height:1.45;color:{c['text']};">{item}</div>
            </div>
            """)
        return f"""<div style="margin:{int(12*scale)}px 0;">{''.join(items_html)}</div>"""
    return ""

# ==============================================================================
# 4:5 SLIDE RENDERER (540x675 canvas -> 1080x1350 via 2x Playwright scale)
# ==============================================================================
def render_slide_4x5(slide, total_slides=7):
    mode = slide.get("theme_mode", "light")
    c = get_theme_colors(mode)
    num = slide.get("slide_number", 1)
    tag = slide.get("tag", "")
    title = slide.get("title", "")
    desc = slide.get("description", "")
    summary = slide.get("summary", "")
    block = slide.get("block", None)

    return f"""
    <div class="slide" style="background:{c['bg']};color:{c['text']};position:relative;width:540px;height:675px;padding:44px 54px 32px 38px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
      {get_4x5_swipe_arrow(num, total_slides, mode)}
      
      <!-- Top Brand Header -->
      <div style="z-index:2;">
        {get_header(mode, scale=1.0)}
      </div>

      <!-- Main Body Content -->
      <div style="z-index:2;margin-top:auto;margin-bottom:auto;padding-top:10px;">
        <div style="font-size:12px;font-weight:800;letter-spacing:2px;color:{c['accent']};text-transform:uppercase;margin-bottom:12px;">
          {tag}
        </div>
        <h1 style="font-size:33px;font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:{c['title']};margin:0 0 14px 0;">
          {title}
        </h1>
        <p style="font-size:15.5px;font-weight:600;line-height:1.52;color:{c['muted']};margin:0;">
          {desc}
        </p>

        {render_content_block(block, mode, scale=1.0)}
      </div>

      <!-- Summary & Footer -->
      <div style="z-index:2;">
        <div style="font-size:13.5px;font-weight:600;color:{c['muted']};line-height:1.45;margin-bottom:4px;">
          {summary}
        </div>
        {get_4x5_footer(num, total_slides, mode)}
      </div>
    </div>
    """

# ==============================================================================
# 9:16 SLIDE RENDERER (540x960 canvas -> 1080x1920 via 2x Playwright scale)
# Strictly bounded within safe zone:
# Top: 110px, Height: 640px (110 to 750px)
# Left: 40px, Width: 430px (leaves 70px on the right for Reels button rail)
# ==============================================================================
def render_slide_9x16(slide):
    mode = slide.get("theme_mode", "light")
    c = get_theme_colors(mode)
    tag = slide.get("tag", "")
    title = slide.get("title", "")
    desc = slide.get("description", "")
    summary = slide.get("summary", "")
    block = slide.get("block", None)

    return f"""
    <div class="slide" style="background:{c['bg']};color:{c['text']};position:relative;width:540px;height:960px;box-sizing:border-box;overflow:hidden;">
      <div style="position:absolute;top:110px;left:40px;width:430px;height:640px;display:flex;flex-direction:column;justify-content:space-between;z-index:2;box-sizing:border-box;">
        
        <!-- Header -->
        <div>
          {get_header(mode, scale=1.22)}
        </div>

        <!-- Middle Body Content -->
        <div style="margin-top:auto;margin-bottom:auto;padding-top:10px;">
          <div style="font-size:14.5px;font-weight:800;letter-spacing:2.2px;color:{c['accent']};text-transform:uppercase;margin-bottom:14px;">
            {tag}
          </div>
          <h1 style="font-size:39px;font-weight:900;line-height:1.2;letter-spacing:-0.6px;color:{c['title']};margin:0 0 16px 0;">
            {title}
          </h1>
          <p style="font-size:19px;font-weight:600;line-height:1.52;color:{c['muted']};margin:0;">
            {desc}
          </p>

          {render_content_block(block, mode, scale=1.18)}
        </div>

        <!-- Summary -->
        <div>
          <div style="font-size:16.5px;font-weight:600;color:{c['muted']};line-height:1.45;">
            {summary}
          </div>
        </div>

      </div>
    </div>
    """

def wrap_html(slides_html, width, height, title="Peptit Serisi"):
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: '{FONT}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    }}
    body {{
      background: #0E1626;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }}
    .track {{
      display: flex;
      width: {len(slides_html) * width}px;
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
    {''.join(slides_html)}
  </div>
</body>
</html>
"""
