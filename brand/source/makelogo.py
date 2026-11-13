import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import cairosvg
B = os.path.dirname(os.path.abspath(__file__)); F = B + '/node_modules/@fontsource/'
OUT = os.path.join(B, '..', 'logos')
HIGHLAND = '#173D36'; CLAY = '#E3A13A'; WOOL = '#F5F6F2'; WHITE = '#FFFFFF'; BLACK = '#000000'
STONE = '#5A645F'; SAGE = '#B7CCC3'
fonts = {
    'f600': TTFont(F + 'fraunces/files/fraunces-latin-600-normal.woff'),
    'm700': TTFont(F + 'manrope/files/manrope-latin-700-normal.woff'),
}

def text(t, font, size, x, y, track=0.0):
    f = fonts[font]; gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f['head'].unitsPerEm; s = size / upm
    pen = SVGPathPen(gs); cx = 0
    for ch in t:
        g = cmap.get(ord(ch))
        if g is None: continue
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, x + cx, y)))
        cx += gs[g].width * s + track * size
    return pen.getCommands(), cx - track * size

def capH(font, size):
    f = fonts[font]; return f['OS/2'].sCapHeight * size / f['head'].unitsPerEm

# Original llama: head-and-neck profile facing right, two banana ears, woven neck band.
HEAD = ('M32 100 L32 44 C32 33.5 37 28 45.5 28 L61 28 C67.5 28 71.5 32 71.5 37.5 '
        'C71.5 43 67.5 46 62 46 L52 46 C49.6 46 48 47.8 48 50.2 L48 100 Z')
EAR1 = 'M37.2 30.5 C35 23 35.6 15.5 38.6 10.5 C41.2 15 42.4 22.5 41.8 30 Z'
EAR2 = 'M43.6 29.2 C42.4 21.5 44 14 47.6 9.6 C49.8 14.4 50.2 22 48.4 29.2 Z'

def llama(bird=WHITE, band=CLAY, eye=HIGHLAND, cut=True):
    o = f'<path d="{EAR1}" fill="{bird}"/><path d="{EAR2}" fill="{bird}"/><path d="{HEAD}" fill="{bird}"/>'
    o += f'<circle cx="55.5" cy="35.5" r="2.4" fill="{eye}"/>'
    o += f'<path d="M62 41.5 L66.5 41.5" stroke="{eye}" stroke-width="1.6" stroke-linecap="round"/>'
    # woven band: a clay strip with a light zigzag running through it
    o += f'<rect x="32" y="66" width="16" height="9" fill="{band}"/>'
    o += f'<path d="M32.8 70.5 L34.9 68.2 L37.4 72.8 L40 68.2 L42.6 72.8 L45.1 68.2 L47.2 70.5" fill="none" stroke="{bird}" stroke-width="1.3" stroke-linejoin="round"/>'
    return o

def icon(x, y, s, tile=True, bird=WHITE, band=CLAY, bg=HIGHLAND, eye=None):
    k = s / 100
    o = f'<g transform="translate({x} {y}) scale({k})">'
    if tile:
        cid = f'c{abs(hash((x, y, s, bg))) % 100000}'
        o += f'<defs><clipPath id="{cid}"><rect width="100" height="100" rx="22"/></clipPath></defs>'
        o += f'<rect width="100" height="100" rx="22" fill="{bg}"/>'
        o += f'<g clip-path="url(#{cid})" transform="translate(9 0)">{llama(bird, band, eye or bg)}</g>'
    else:
        # free-standing: end the neck with a soft base so it doesn't look cut
        o += f'<clipPath id="fs{abs(hash((x, y, s))) % 100000}"><rect width="100" height="88"/></clipPath>'
        o += f'<g clip-path="url(#fs{abs(hash((x, y, s))) % 100000})" transform="translate(9 0)">{llama(bird, band, eye or bg)}</g>'
    return o + '</g>'

def svg(w, h, body, bg=None):
    r = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{r}{body}</svg>'

def save(name, s, png_w=2000):
    open(f'{OUT}/{name}.svg', 'w').write(s)
    cairosvg.svg2png(bytestring=s.encode(), write_to=f'{OUT}/{name}.png', output_width=png_w)

def horizontal(word=HIGHLAND, sub=STONE, tile=True, bird=WHITE, band=CLAY, bg=HIGHLAND, eye=None, desc=None, descol=None):
    S = 100; gap = 24
    d1, w1 = text('Llama', 'f600', 60, S + gap, 52)
    d2, w2 = text('COMMERCIAL', 'm700', 15.5, S + gap + 2, 80, 0.30)
    body = icon(0, 0, S, tile, bird, band, bg, eye) + f'<path d="{d1}" fill="{word}"/><path d="{d2}" fill="{sub}"/>'
    W = S + gap + max(w1, w2 + 2)
    if desc:
        x0 = W + 26
        d3, w3 = text(desc, 'm700', 13, x0 + 22, 56, 0.22)
        body += f'<path d="M{x0} 22V78" stroke="{descol}" stroke-width="1.5" opacity="0.6"/><path d="{d3}" fill="{descol}"/>'
        W = x0 + 22 + w3
    return svg(round(W + 2), S, body)

def stacked(word=HIGHLAND, sub=STONE, tile=True, bird=WHITE, bg=HIGHLAND):
    S = 128
    d1, w1 = text('Llama', 'f600', 70, 0, 0); d2, w2 = text('COMMERCIAL', 'm700', 17, 0, 0, 0.30)
    W = max(w1, w2, S) + 40
    body = icon((W - S) / 2, 0, S, tile, bird, CLAY, bg)
    y1 = S + 30 + capH('f600', 70)
    d1, _ = text('Llama', 'f600', 70, (W - w1) / 2, y1); d2, _ = text('COMMERCIAL', 'm700', 17, (W - w2) / 2, y1 + 34, 0.30)
    body += f'<path d="{d1}" fill="{word}"/><path d="{d2}" fill="{sub}"/>'
    return svg(round(W), round(y1 + 46), body)

DESC = 'COMMERCIAL CLEANING · LONDON'
P = 'llama-commercial'
save(f'{P}-logo-green', horizontal())
save(f'{P}-logo-white', horizontal(word=WHITE, sub=SAGE, tile=False))
save(f'{P}-logo-black', horizontal(word=BLACK, sub=BLACK, bg=BLACK, band='#FFFFFF', eye=BLACK).replace('stroke="#FFFFFF" stroke-width="1.3"', 'stroke="#000000" stroke-width="1.3"'))
save(f'{P}-logo-green-descriptor', horizontal(desc=DESC, descol=STONE))
save(f'{P}-logo-white-descriptor', horizontal(word=WHITE, sub=SAGE, tile=False, desc=DESC, descol=SAGE))
save(f'{P}-stacked-green', stacked(), 1600)
save(f'{P}-stacked-white', stacked(word=WHITE, sub=SAGE, tile=False), 1600)
save(f'{P}-icon', svg(100, 100, icon(0, 0, 100)), 1024)
save(f'{P}-icon-on-wool', svg(100, 100, icon(0, 0, 100, tile=False, bird=HIGHLAND, eye=WOOL), WOOL), 1024)
save(f'{P}-social-avatar', svg(400, 400, f'<rect width="400" height="400" fill="{HIGHLAND}"/><g transform="translate(-34 42) scale(3.6)"><g transform="translate(9 0)">' + llama(WHITE, CLAY, HIGHLAND) + '</g></g>'), 800)
save(f'{P}-favicon', svg(100, 100, icon(0, 0, 100)), 256)
print('ok')
