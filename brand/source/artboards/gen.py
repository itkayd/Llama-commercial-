import os, json
D = os.path.dirname(os.path.abspath(__file__))
G = '#173D36'; S = '#E3A13A'; SI = '#8A5A12'; PG = '#F5F6F2'; SG = '#E8EDE6'; INK = '#152320'; MU = '#56625D'; LN = '#D5DCD3'; OBM = '#B9CCC3'
B = {'green': '45747eb1bfad2fb31f5d91890ad86247', 'white': '4daefa90de90aaf6cbfb5b378997ee69',
     'green_d': 'eb600a582d39b3385988a690e2831197', 'white_d': 'dabd937533f0acb453058b548c9ac787',
     'stack_g': 'ad611d59d5820cd9c3dac1da2c6247c1', 'stack_w': '0dcc9dd6cce55c0e71b7c98afa7943a1', 'icon': '6d24f1759fb724ffe604f8d902942d82'}
PHONE = '07000 000000'; EMAIL = 'hello@llamacommercial.co.uk'; WEB = 'llamacommercial.co.uk'
DISP = "Fraunces, Georgia, serif"; MONO = "'IBM Plex Mono', monospace"
SECT = 'OFFICES · SCHOOLS · CHURCHES · SHOPS · GYMS · FACTORIES · COMMUNAL AREAS · CAR PARKS'

def img(k, alt, style):
    return f'<img src="/_blob/{B[k]}" alt="{alt}" style="{style}">'

def llama_svg(w, h, x, y, s, bird='#FFFFFF', band=S, eye=G, extra=''):
    return (f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" aria-hidden="true" style="position: absolute; left: 0; top: 0;{extra}">'
            f'<g transform="translate({x} {y}) scale({s})">'
            f'<path d="M37.2 30.5C35 23 35.6 15.5 38.6 10.5C41.2 15 42.4 22.5 41.8 30Z" fill="{bird}"/>'
            f'<path d="M43.6 29.2C42.4 21.5 44 14 47.6 9.6C49.8 14.4 50.2 22 48.4 29.2Z" fill="{bird}"/>'
            f'<path d="M32 400L32 44C32 33.5 37 28 45.5 28L61 28C67.5 28 71.5 32 71.5 37.5C71.5 43 67.5 46 62 46L52 46C49.6 46 48 47.8 48 50.2L48 400Z" fill="{bird}"/>'
            f'<circle cx="55.5" cy="35.5" r="2.4" fill="{eye}"/>'
            f'<path d="M62 41.5L66.5 41.5" stroke="{eye}" stroke-width="1.6" stroke-linecap="round"/>'
            f'<rect x="32" y="66" width="16" height="9" fill="{band}"/>'
            f'<path d="M32.8 70.5L34.9 68.2L37.4 72.8L40 68.2L42.6 72.8L45.1 68.2L47.2 70.5" fill="none" stroke="{bird}" stroke-width="1.3" stroke-linejoin="round"/>'
            f'</g></svg>')

def doc(title, body, w, h, props=None, vals='{}', ink=INK):
    p = {'$preview': {'width': w, 'height': h}}
    if props: p = {**props, **p}
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&amp;family=Manrope:wght@400;500;700&amp;family=IBM+Plex+Mono:wght@500&amp;display=swap">
<style>
body{{margin:0;font-family:Manrope,Arial,sans-serif;color:{ink}}}
a{{color:{ink}}}a:hover{{color:{MU}}}
td,th{{padding:12px 10px;text-align:left;vertical-align:top}}
</style>
</helmet>
{body}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{json.dumps(p)}'>
class Component extends DCLogic {{
  renderVals() {{ return {vals}; }}
}}
</script>
</body>
</html>
'''

F = {}
# 1 Brand sheet
sw = lambda name, hexv, sub, bg, fg, flex: f'<div style="flex: {flex}; background: {bg}; color: {fg}; border-radius: 14px; padding: 18px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 150px;{" border: 1px solid " + LN + ";" if bg in (PG, "#FFFFFF", SG) else ""}"><p style="margin: 0; font-weight: 700; font-size: 18px;">{name}</p><p style="margin: 2px 0 0; font-size: 13.5px; opacity: .85;">{hexv}{sub}</p></div>'
F['Main'] = ('Brand sheet', f'''<div style="width: 1280px; height: 800px; display: grid; grid-template-columns: 520px minmax(0, 1fr); background: #FFFFFF;">
  <div style="background: {G}; color: #FFFFFF; padding: 56px 52px 52px; display: flex; flex-direction: column; position: relative; overflow: hidden;">
    {llama_svg(520, 800, 300, 360, 4.2)}
    <div style="position: relative;">{img('white_d', 'Llama Commercial, commercial cleaning, London', 'width: 400px; height: auto;')}</div>
    <div style="position: relative; margin-top: auto; display: flex; flex-direction: column; gap: 18px; max-width: 300px;">
      <p style="margin: 0; font-family: {MONO}; font-size: 13px; letter-spacing: 0.14em; color: {S};">BRAND SHEET · V1 · NOV 2026</p>
      <h1 style="margin: 0; font-family: {DISP}; font-weight: 600; font-size: 58px; line-height: 1.02;">No drama. <span style="color: {S};">Just Llama.</span></h1>
      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: {OBM};">An original llama with a woven band: calm, steady and hard-working. Highland green carries the brand. Saffron is the band and nothing more.</p>
    </div>
  </div>
  <div style="padding: 52px 56px; display: flex; flex-direction: column; gap: 32px;">
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <p style="margin: 0; font-family: {MONO}; font-size: 12px; letter-spacing: 0.14em; color: {MU};">COLOUR · 60 / 30 / 10</p>
      <div style="display: flex; gap: 10px;">
        {sw('Highland', '#173D36', ' · Pantone 3435 C', G, '#FFFFFF', 1.6)}
        {sw('Saffron', '#E3A13A', ' · 7409 C', S, INK, 1)}
        {sw('Page', '#F5F6F2', '', PG, INK, 1)}
        {sw('Sage', '#E8EDE6', '', SG, INK, 1)}
        {sw('Slate', '#56625D', '', MU, '#FFFFFF', 1)}
      </div>
    </div>
    <div style="display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 36px;">
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <p style="margin: 0; font-family: {MONO}; font-size: 12px; letter-spacing: 0.14em; color: {MU};">TYPE</p>
        <p style="margin: 0; font-family: {DISP}; font-weight: 600; font-size: 46px; line-height: 1.02;">Commercial cleaning across London.</p>
        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: {MU};">Fraunces for headlines. Manrope for everything people read: letters, quotes, the website.</p>
        <p style="margin: 0; font-family: {MONO}; font-size: 13px; letter-spacing: 0.1em;">IBM PLEX MONO · SCHEDULES AND LABELS</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <p style="margin: 0; font-family: {MONO}; font-size: 12px; letter-spacing: 0.14em; color: {MU};">COLOUR-CODED CLEANING</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px;">
          <div style="display: flex; align-items: center; gap: 10px;"><i style="width: 34px; height: 22px; border-radius: 5px; background: #C6463B;"></i>Red · toilets</div>
          <div style="display: flex; align-items: center; gap: 10px;"><i style="width: 34px; height: 22px; border-radius: 5px; background: #3C6FB6;"></i>Blue · general</div>
          <div style="display: flex; align-items: center; gap: 10px;"><i style="width: 34px; height: 22px; border-radius: 5px; background: #3E8A55;"></i>Green · kitchens</div>
          <div style="display: flex; align-items: center; gap: 10px;"><i style="width: 34px; height: 22px; border-radius: 5px; background: #E0B323;"></i>Yellow · sinks</div>
        </div>
        <p style="margin: 10px 0 0; font-family: {MONO}; font-size: 12px; letter-spacing: 0.14em; color: {MU};">APPROVED LINES</p>
        <p style="margin: 0; font-size: 15px; line-height: 1.7;">No drama. Just Llama.<br>Llama clean that for you.<br>Llama handle it.</p>
      </div>
    </div>
    <div style="margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-top: 1px solid {LN}; padding-top: 22px;">
      {img('green', 'Llama Commercial logo', 'height: 56px; width: auto;')}
      <p style="margin: 0; max-width: 380px; font-size: 14px; line-height: 1.55; color: {MU};">Voice: calm, plain, specific. "The same two cleaners each visit." No offers in headlines, no exclamation marks.</p>
    </div>
  </div>
</div>''', 1280, 800)

# 2/3 Business card
F['BusinessCardFront'] = ('Business card front', f'''<div style="width: 680px; height: 440px; box-sizing: border-box; background: {G}; position: relative; overflow: hidden; padding: 56px 60px; display: flex; flex-direction: column; justify-content: space-between;">
  {llama_svg(680, 440, 470, 120, 3.0)}
  <div style="position: relative;">{img('white', 'Llama Commercial', 'width: 360px; height: auto;')}</div>
  <p style="position: relative; margin: 0; font-family: {DISP}; font-style: italic; font-weight: 500; font-size: 30px; color: {S};">No drama. Just Llama.</p>
</div>''', 680, 440)
F['BusinessCardBack'] = ('Business card back', f'''<div style="width: 680px; height: 440px; box-sizing: border-box; background: #FFFFFF; padding: 52px 60px 44px; display: flex; flex-direction: column;">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 24px;">
    <div><p style="margin: 0; font-family: {DISP}; font-weight: 600; font-size: 46px; line-height: 1;">Diesel</p><p style="margin: 8px 0 0; font-size: 22px; color: {MU};">Founder</p></div>
    {img('icon', 'Llama Commercial icon', 'width: 92px; height: 92px;')}
  </div>
  <div style="margin-top: 34px; display: grid; gap: 10px; font-size: 24px; font-variant-numeric: tabular-nums;">
    <p style="margin: 0; font-weight: 700;">{PHONE}</p>
    <p style="margin: 0;">{EMAIL}</p>
    <p style="margin: 0; color: {MU};">{WEB}</p>
  </div>
  <p style="margin: auto 0 0; font-family: {MONO}; font-size: 17px; letter-spacing: 0.08em; color: {MU}; border-top: 1px solid {LN}; padding-top: 14px;">COMMERCIAL CLEANING · LONDON</p>
</div>''', 680, 440)

# 4 Email signature
F['EmailSignature'] = ('Email signature', f'''<div style="width: 600px; height: 200px; box-sizing: border-box; background: #FFFFFF; padding: 30px 28px; display: flex; gap: 22px; align-items: center;">
  {img('icon', 'Llama Commercial', 'width: 64px; height: 64px; flex-shrink: 0;')}
  <div style="display: flex; flex-direction: column; gap: 4px; border-left: 2px solid {G}; padding-left: 20px;">
    <p style="margin: 0; font-family: {DISP}; font-weight: 600; font-size: 22px;">Diesel</p>
    <p style="margin: 0; font-size: 14px; color: {MU};">Founder, Llama Commercial</p>
    <p style="margin: 6px 0 0; font-size: 14px; font-variant-numeric: tabular-nums;"><b>{PHONE}</b> · {EMAIL}</p>
    <p style="margin: 0; font-size: 14px; color: {MU};">{WEB} · <i style="font-family: {DISP}; color: {SI};">No drama. Just Llama.</i></p>
  </div>
</div>''', 600, 200)

# 5 Flyer A5
li = lambda t: f'<li style="display: flex; gap: 10px; align-items: baseline;"><i style="width: 7px; height: 7px; border-radius: 2px; background: {S}; flex: none; transform: translateY(-2px);"></i>{t}</li>'
F['FlyerA5'] = ('Flyer A5', f'''<div style="width: 592px; height: 840px; box-sizing: border-box; background: #FFFFFF; display: flex; flex-direction: column;">
  <div style="background: {G}; color: #FFFFFF; padding: 40px; display: flex; flex-direction: column; gap: 20px; position: relative; overflow: hidden;">
    {llama_svg(592, 330, 430, 70, 2.5)}
    <div style="position: relative;">{img('white', 'Llama Commercial', 'width: 220px; height: auto;')}</div>
    <h1 style="position: relative; margin: 0; font-family: {DISP}; font-weight: 600; font-size: 40px; line-height: 1.04; max-width: 400px;">Commercial cleaning across London.</h1>
    <p style="position: relative; margin: 0; font-size: 16px; line-height: 1.5; color: {OBM}; max-width: 380px;">Offices, schools, churches, shops, gyms, factories, communal areas and car parks.</p>
  </div>
  <div style="padding: 26px 40px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 26px; font-size: 14px; line-height: 1.4;">
    <div><p style="margin: 0 0 10px; font-weight: 700; font-size: 16px; border-bottom: 2px solid {G}; padding-bottom: 8px;">Everyday cleaning</p>
      <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 6px;">{li('Office and contract cleaning')}{li('Schools and education centres')}{li('Churches and halls')}{li('Shops, gyms and factories')}{li('Communal areas')}</ul></div>
    <div><p style="margin: 0 0 10px; font-weight: 700; font-size: 16px; border-bottom: 2px solid {G}; padding-bottom: 8px;">Floors and specialist</p>
      <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 6px;">{li('Carpet, upholstery and rugs')}{li('Floor scrubbing and polishing')}{li('Floor stripping and sealing')}{li('Deep cleaning')}{li('Car park cleaning')}</ul></div>
  </div>
  <div style="padding: 22px 40px 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; font-size: 13px; line-height: 1.4; color: {MU};">
    <div style="border-top: 2px solid {INK}; padding-top: 10px;"><p style="margin: 0 0 4px; font-family: {MONO}; font-size: 11px; letter-spacing: 0.1em; color: {INK};">1 · SITE VISIT</p>We walk the building with you.</div>
    <div style="border-top: 2px solid {INK}; padding-top: 10px;"><p style="margin: 0 0 4px; font-family: {MONO}; font-size: 11px; letter-spacing: 0.1em; color: {INK};">2 · WRITTEN QUOTE</p>A specification and a fixed price.</div>
    <div style="border-top: 2px solid {INK}; padding-top: 10px;"><p style="margin: 0 0 4px; font-family: {MONO}; font-size: 11px; letter-spacing: 0.1em; color: {INK};">3 · REGULAR TEAM</p>The same cleaners at set times.</div>
  </div>
  <div style="margin-top: auto; padding: 20px 40px 32px; display: flex; flex-direction: column; gap: 6px;">
    <p style="margin: 0; font-size: 15px; color: {MU};">Arrange a site visit</p>
    <p style="margin: 0; font-family: {DISP}; font-weight: 600; font-size: 40px; line-height: 1.05; font-variant-numeric: tabular-nums;">{PHONE}</p>
    <p style="margin: 0; font-size: 15px;">{WEB} · {EMAIL}</p>
    <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 16px; border-top: 1px solid {LN}; padding-top: 12px; margin-top: 10px;">
      <p style="margin: 0; font-size: 12.5px; color: {MU};">Site visits and written quotes are free. Insured. Vetted staff.</p>
      <p style="margin: 0; font-family: {DISP}; font-style: italic; font-size: 16px; color: {SI}; white-space: nowrap;">No drama. Just Llama.</p>
    </div>
  </div>
</div>''', 592, 840)

# 6 Letterhead
F['Letterhead'] = ('Letterhead', f'''<div style="width: 794px; height: 1123px; box-sizing: border-box; background: #FFFFFF; padding: 64px 72px 48px; display: flex; flex-direction: column;">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; padding-bottom: 28px; border-bottom: 2px solid {G};">
    {img('green_d', 'Llama Commercial, commercial cleaning, London', 'width: 330px; height: auto;')}
    <p style="margin: 0; text-align: right; font-size: 13px; line-height: 1.7; color: {MU};">{PHONE}<br>{EMAIL}<br>{WEB}</p>
  </div>
  <div style="padding-top: 44px; display: flex; flex-direction: column; gap: 18px; font-size: 15px; line-height: 1.65; max-width: 600px;">
    <p style="margin: 0; font-family: {MONO}; font-size: 12px; letter-spacing: 0.14em; color: {MU};">[DATE]</p>
    <p style="margin: 0;">[Name]<br>[Organisation]<br>[Address]</p>
    <p style="margin: 0;">Dear [Name],</p>
    <p style="margin: 0;">I run Llama Commercial, a commercial cleaning company based in Hackney. We clean offices, schools, churches, shops, gyms, factories, communal areas and car parks across London, and we look after carpets and hard floors.</p>
    <p style="margin: 0;">Every contract starts with a site visit and a written specification, so you know exactly what gets cleaned, how often and by whom. We send the same cleaners each visit, and we walk the site with you every month.</p>
    <p style="margin: 0;">If it would help, I'd be glad to visit [site name] and send you a written quote. You can reach me directly on {PHONE}.</p>
    <p style="margin: 0;">Kind regards,</p>
    <p style="margin: 0;"><b style="font-family: {DISP}; font-weight: 600; font-size: 19px;">Diesel</b><br>Founder, Llama Commercial</p>
  </div>
  <div style="margin-top: auto; display: flex; justify-content: space-between; gap: 24px; align-items: flex-end; border-top: 1px solid {LN}; padding-top: 16px;">
    <p style="margin: 0; font-size: 11px; line-height: 1.6; color: {MU};">Llama Commercial Ltd · Registered in England and Wales · Company number [COMPANY NUMBER]<br>Registered office: [REGISTERED ADDRESS]</p>
    <p style="margin: 0; font-family: {DISP}; font-style: italic; font-size: 13px; color: {SI}; white-space: nowrap;">No drama. Just Llama.</p>
  </div>
</div>''', 794, 1123)

# 7 Quote / invoice
lab = lambda t: f'<p style="margin: 0 0 4px; font-family: {MONO}; font-size: 11px; letter-spacing: 0.14em; color: {MU};">{t}</p>'
F['Quote'] = ('Quote and invoice', f'''<div style="width: 794px; height: 1123px; box-sizing: border-box; background: #FFFFFF; padding: 56px 64px 44px; display: flex; flex-direction: column; gap: 28px;">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 24px;">
    {img('green', 'Llama Commercial', 'width: 250px; height: auto;')}
    <div style="text-align: right; display: flex; flex-direction: column; gap: 6px;">
      <p style="margin: 0; font-family: {DISP}; font-weight: 600; font-size: 36px; line-height: 1;">{{{{docType}}}}</p>
      <p style="margin: 0; font-family: {MONO}; font-size: 12px; letter-spacing: 0.12em; color: {MU};">NO. LC-0001 · [DATE]</p>
    </div>
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; background: {SG}; border-radius: 14px; padding: 20px 22px; font-size: 14px; line-height: 1.6;">
    <div>{lab('FOR')}[Client organisation]<br>[Contact name]<br>[Billing address]</div>
    <div>{lab('SITE')}[Site address]<br>Offices, kitchen, 2 toilets · vinyl and carpet<br>Monday to Friday, from 6:00pm</div>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <thead>
      <tr style="border-bottom: 2px solid {G}; font-family: {MONO}; font-size: 11px; letter-spacing: 0.12em;">
        <th>SERVICE</th><th style="text-align: right;">FREQUENCY</th><th style="text-align: right;">HOURS</th><th style="text-align: right;">PER MONTH</th>
      </tr>
    </thead>
    <tbody style="font-variant-numeric: tabular-nums;">
      <tr style="border-bottom: 1px solid {LN};"><td>Contract clean to the attached specification</td><td style="text-align: right;">5 a week</td><td style="text-align: right;">1.25 a visit</td><td style="text-align: right;">£595.38</td></tr>
      <tr style="border-bottom: 1px solid {LN};"><td>Machine scrub of hard floors, machine included</td><td style="text-align: right;">Monthly</td><td style="text-align: right;">2.0</td><td style="text-align: right;">£75.00</td></tr>
      <tr style="border-bottom: 1px solid {LN};"><td>Toilet roll, hand soap and bin liners, at cost plus 10%</td><td style="text-align: right;">As used</td><td style="text-align: right;">–</td><td style="text-align: right;">As used</td></tr>
    </tbody>
  </table>
  <div style="align-self: flex-end; width: 310px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; font-variant-numeric: tabular-nums;">
    <div style="display: flex; justify-content: space-between;"><span>Subtotal</span><span>£670.38</span></div>
    <div style="display: flex; justify-content: space-between; color: {MU};"><span>VAT</span><span>Not charged</span></div>
    <div style="display: flex; justify-content: space-between; background: {G}; color: #FFFFFF; border-radius: 8px; padding: 12px 14px; font-family: {DISP}; font-weight: 600; font-size: 20px;"><span>Total per month</span><span style="color: {S};">£670.38</span></div>
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; font-size: 13px; line-height: 1.6;">
    <div>{lab('TERMS')}Rolling monthly agreement, 30 days' notice either way. Invoiced monthly in advance, payment within 14 days. This quote is valid for 30 days.</div>
    <div>{lab('PAY BY BANK TRANSFER')}Llama Commercial Ltd<br>Sort code [00-00-00] · Account [00000000]<br>Reference: LC-0001</div>
  </div>
  <div style="display: flex; gap: 32px; font-size: 13px; color: {MU};">
    <p style="margin: 0; flex: 1; border-top: 1px solid {G}; padding-top: 8px;">Accepted by (name and signature)</p>
    <p style="margin: 0; width: 160px; border-top: 1px solid {G}; padding-top: 8px;">Date</p>
  </div>
  <p style="margin: auto 0 0; font-size: 11px; line-height: 1.6; color: {MU}; border-top: 1px solid {LN}; padding-top: 14px;">Llama Commercial Ltd · Company number [COMPANY NUMBER] · [REGISTERED ADDRESS] · {PHONE} · {EMAIL} · Not VAT registered</p>
</div>''', 794, 1123)

# 8 Square ad: Llama clean that
F['SocialProof'] = ('Ad: Llama clean that', f'''<div style="width: 1080px; height: 1080px; box-sizing: border-box; background: {G}; color: #FFFFFF; padding: 88px; display: flex; flex-direction: column; position: relative; overflow: hidden;">
  {llama_svg(1080, 1080, 700, 380, 6.0)}
  <h1 style="position: relative; margin: 0; font-family: {DISP}; font-weight: 600; font-size: 112px; line-height: 1; max-width: 700px;">Llama clean that for you.</h1>
  <p style="position: relative; margin: 36px 0 0; font-size: 34px; line-height: 1.4; color: {OBM}; max-width: 600px;">Offices, schools, churches, shops, gyms, factories, communal areas and car parks across London.</p>
  <div style="position: relative; margin-top: auto; display: flex; flex-direction: column; gap: 18px;">
    {img('white', 'Llama Commercial', 'width: 380px; height: auto;')}
    <p style="margin: 0; font-size: 30px;">Arrange a site visit · <b style="font-variant-numeric: tabular-nums;">{PHONE}</b></p>
  </div>
</div>''', 1080, 1080)

# 9 Square ad: what we clean
sec = lambda t: f'<div style="display: flex; align-items: center; gap: 18px; padding: 20px 0; border-bottom: 1px solid {LN};"><i style="width: 14px; height: 14px; border-radius: 3px; background: {S}; flex: none;"></i>{t}</div>'
F['SocialGuarantee'] = ('Ad: what we clean', f'''<div style="width: 1080px; height: 1080px; box-sizing: border-box; background: {PG}; padding: 88px; display: flex; flex-direction: column;">
  <p style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.16em; color: {MU};">COMMERCIAL CLEANING · LONDON</p>
  <h1 style="margin: 24px 0 0; font-family: {DISP}; font-weight: 600; font-size: 92px; line-height: 1.02; max-width: 860px;">One team for every kind of building.</h1>
  <div style="margin-top: 52px; display: grid; grid-template-columns: 1fr 1fr; column-gap: 56px; font-size: 34px; border-top: 1px solid {LN};">
    {sec('Offices')}{sec('Schools')}{sec('Churches')}{sec('Shops')}{sec('Gyms')}{sec('Factories')}{sec('Communal areas')}{sec('Car parks')}
  </div>
  <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; gap: 32px;">
    {img('green', 'Llama Commercial', 'width: 380px; height: auto;')}
    <p style="margin: 0; text-align: right; font-size: 28px; line-height: 1.4;"><i style="font-family: {DISP}; color: {SI};">No drama. Just Llama.</i><br><b style="font-variant-numeric: tabular-nums;">{PHONE}</b></p>
  </div>
</div>''', 1080, 1080)

# 10 Story
st = lambda n, h, t: f'<div style="border-top: 2px solid rgba(255,255,255,.5); padding-top: 18px; display: flex; flex-direction: column; gap: 6px;"><p style="margin: 0; font-family: {MONO}; font-size: 24px; letter-spacing: 0.12em; color: {S};">{n}</p><p style="margin: 0; font-size: 38px; font-weight: 700;">{h}</p><p style="margin: 0; font-size: 30px; line-height: 1.4; color: {OBM};">{t}</p></div>'
F['SocialStory'] = ('Ad: story', f'''<div style="width: 1080px; height: 1920px; box-sizing: border-box; background: {G}; color: #FFFFFF; padding: 200px 88px 220px; display: flex; flex-direction: column; gap: 44px; position: relative; overflow: hidden;">
  {llama_svg(1080, 1920, 720, 120, 5.0)}
  <div style="position: relative;">{img('white', 'Llama Commercial', 'width: 440px; height: auto;')}</div>
  <h1 style="position: relative; margin: 0; font-family: {DISP}; font-weight: 600; font-size: 120px; line-height: 0.98; max-width: 640px;">No drama. <span style="color: {S};">Just Llama.</span></h1>
  <p style="position: relative; margin: 0; font-size: 38px; line-height: 1.35; color: {OBM}; max-width: 700px;">Commercial cleaning for offices, schools, churches, shops, gyms, factories and car parks across London.</p>
  <div style="position: relative; display: grid; gap: 28px; max-width: 700px;">
    {st('1', 'Site visit', 'We walk the building with you.')}
    {st('2', 'Written quote', 'A specification and a fixed monthly price.')}
    {st('3', 'A regular team', 'The same cleaners at the agreed times.')}
  </div>
  <div style="position: relative; margin-top: auto; background: #FFFFFF; color: {INK}; border-radius: 22px; padding: 34px 38px; display: flex; justify-content: space-between; align-items: center; gap: 24px;">
    <span style="font-family: {DISP}; font-weight: 600; font-size: 46px; line-height: 1.05;">Arrange a<br>site visit</span>
    <span style="font-family: {MONO}; font-size: 34px; letter-spacing: 0.04em; text-align: right;">07000<br>000000</span>
  </div>
</div>''', 1080, 1920)

# 11 LinkedIn
F['LinkedInBanner'] = ('LinkedIn banner', f'''<div style="width: 1584px; height: 396px; box-sizing: border-box; background: {G}; color: #FFFFFF; padding: 56px 360px 56px 520px; display: flex; flex-direction: column; justify-content: center; gap: 20px; position: relative; overflow: hidden;">
  {llama_svg(1584, 396, 1300, 40, 3.6)}
  <h1 style="margin: 0; position: relative; font-family: {DISP}; font-weight: 600; font-size: 60px; line-height: 1.02;">Commercial cleaning<br>across London.</h1>
  <p style="margin: 0; position: relative; font-family: {MONO}; font-size: 17px; letter-spacing: 0.1em; color: {OBM};">OFFICES · SCHOOLS · CHURCHES · SHOPS · GYMS · FACTORIES · CAR PARKS</p>
  <p style="margin: 0; position: relative; font-family: {DISP}; font-style: italic; font-size: 26px; color: {S};">No drama. Just Llama.</p>
</div>''', 1584, 396)

# 12 Visit report
row = lambda area, code, done: f'<div style="display: grid; grid-template-columns: 26px minmax(0, 1fr) 120px; gap: 16px; align-items: center; padding: 16px 0; border-bottom: 1px solid {LN}; font-size: 24px;"><i style="width: 22px; height: 22px; border-radius: 5px; background: {code};"></i><span>{area}</span><span style="text-align: right; font-family: {MONO}; font-size: 20px; color: {G};">{done}</span></div>'
F['PhotoReport'] = ('Visit report', f'''<div style="width: 1080px; height: 1350px; box-sizing: border-box; background: #FFFFFF; display: flex; flex-direction: column;">
  <div style="background: {G}; color: #FFFFFF; padding: 56px 64px; display: flex; justify-content: space-between; align-items: center; gap: 24px;">
    {img('white', 'Llama Commercial', 'width: 320px; height: auto;')}
    <p style="margin: 0; font-family: {DISP}; font-weight: 600; font-size: 46px;">Visit report</p>
  </div>
  <div style="padding: 40px 64px 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px;">
    <div>{lab('SITE')}<p style="margin: 0; font-size: 22px;">[Site name]</p></div>
    <div>{lab('DATE')}<p style="margin: 0; font-size: 22px;">[Date]</p></div>
    <div>{lab('TEAM')}<p style="margin: 0; font-size: 22px;">[Names]</p></div>
    <div>{lab('TIME')}<p style="margin: 0; font-size: 22px; font-variant-numeric: tabular-nums;">18:00 to 19:15</p></div>
  </div>
  <div style="padding: 28px 64px 0;">
    <div style="border-top: 2px solid {G};">
      {row('Offices and meeting rooms', '#3C6FB6', 'DONE')}
      {row('Kitchen and breakout area', '#3E8A55', 'DONE')}
      {row('Toilets: floors and fittings', '#C6463B', 'DONE')}
      {row('Washroom sinks', '#E0B323', 'DONE')}
      {row('Bins and recycling', '#3C6FB6', 'DONE')}
    </div>
  </div>
  <div style="padding: 28px 64px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div style="height: 260px; background: {SG}; border-radius: 14px; display: flex; align-items: flex-end; padding: 18px; font-size: 18px; color: {MU};">[Photo: kitchen]</div>
    <div style="height: 260px; background: {SG}; border-radius: 14px; display: flex; align-items: flex-end; padding: 18px; font-size: 18px; color: {MU};">[Photo: reception floor]</div>
  </div>
  <div style="padding: 24px 64px 0;">{lab('NOTES')}<p style="margin: 0; font-size: 22px; line-height: 1.5;">Hand soap running low in the ground floor toilet. New stock brought on Wednesday.</p></div>
  <p style="margin: auto 64px 40px; padding-top: 16px; border-top: 1px solid {LN}; font-size: 18px; color: {MU};">Llama Commercial · {PHONE} · {EMAIL}</p>
</div>''', 1080, 1350)

# 13 Uniform
F['Uniform'] = ('Uniform', f'''<div style="width: 1000px; height: 620px; box-sizing: border-box; background: {PG}; padding: 32px 48px; display: flex; flex-direction: column; gap: 18px;">
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px; flex-grow: 1;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
      <div style="position: relative; width: 400px; height: 440px;">
        <svg width="400" height="440" viewBox="0 0 400 440" aria-hidden="true" style="position: absolute; left: 0; top: 0;">
          <path d="M140 20L100 34L10 90L48 170L92 146V440H308V146L352 170L390 90L300 34L260 20C246 44 224 56 200 56C176 56 154 44 140 20Z" fill="{G}"/>
          <path d="M140 20C154 44 176 56 200 56C224 56 246 44 260 20L246 16C236 34 220 42 200 42C180 42 164 34 154 16Z" fill="#2A5A50"/>
          <path d="M200 56V120" stroke="#2A5A50" stroke-width="3"/>
        </svg>
        {img('white', 'Logo on left chest', 'position: absolute; left: 222px; top: 100px; width: 124px; height: auto;')}
      </div>
      <p style="margin: 0; font-family: {MONO}; font-size: 13px; letter-spacing: 0.14em; color: {MU};">FRONT · WHITE LOGO, LEFT CHEST, 90MM WIDE</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
      <div style="position: relative; width: 400px; height: 440px;">
        <svg width="400" height="440" viewBox="0 0 400 440" aria-hidden="true" style="position: absolute; left: 0; top: 0;">
          <path d="M140 20L100 34L10 90L48 170L92 146V440H308V146L352 170L390 90L300 34L260 20C246 30 224 34 200 34C176 34 154 30 140 20Z" fill="{G}"/>
          <path d="M140 20C154 30 176 34 200 34C224 34 246 30 260 20L250 12C236 20 220 24 200 24C180 24 164 20 150 12Z" fill="#2A5A50"/>
        </svg>
        {img('stack_w', 'Stacked logo across shoulders', 'position: absolute; left: 120px; top: 80px; width: 160px; height: auto;')}
        <p style="position: absolute; left: 92px; top: 300px; width: 216px; margin: 0; text-align: center; font-family: {DISP}; font-style: italic; font-size: 19px; color: {S};">No drama. Just Llama.</p>
      </div>
      <p style="margin: 0; font-family: {MONO}; font-size: 13px; letter-spacing: 0.14em; color: {MU};">BACK · STACKED LOGO, 220MM WIDE</p>
    </div>
  </div>
  <p style="margin: 0; font-size: 14px; line-height: 1.5; color: {MU}; border-top: 1px solid {LN}; padding-top: 12px;">Bottle-green polo, the closest stock colour to highland #173D36. Embroider the front logo; print the back in white and saffron. Same layout on tabards. Add a hi-vis vest with the white logo for car park work.</p>
</div>''', 1000, 620)

for name, (title, body, w, h, *rest) in F.items():
    kw = {}
    if rest:
        pass
    open(f'{D}/{name}.dc.html', 'w').write(doc(title, body, w, h))
# re-write the two with props/ink properly
open(f'{D}/Quote.dc.html', 'w').write(doc('Quote and invoice', F['Quote'][1], 794, 1123, props={'docType': {'editor': 'enum', 'options': ['Quote', 'Invoice'], 'default': 'Quote'}}, vals="{ docType: this.props.docType ?? 'Quote' }"))
for n in ['SocialProof', 'SocialStory', 'LinkedInBanner']:
    t, body, w, h = F[n][:4]
    open(f'{D}/{n}.dc.html', 'w').write(doc(t, body, w, h, ink='#FFFFFF'))
print('written', len(F))
