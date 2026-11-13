# Camino "mixto" de ilustración (12-nov-2026): boceto de IA a tintas planas →
# este script → SVG limpio. Quita el fondo (cubeta desde las esquinas), pega
# cada pixel al color EXACTO de la paleta de marca y traza con vtracer.
# Uso: python3 herramientas/vectorizar.py boceto.png salida.svg "#C8243E,#F2C230"
# (tinta #2A1A40, blanco y aqua de la gotita ya van incluidos). Requiere: pip3 install --user vtracer

import sys, re, vtracer
from PIL import Image, ImageDraw
entrada, salida = sys.argv[1], sys.argv[2]
# paleta de MARCA: cada pixel se pega al color exacto más cercano (la limpieza)
MARCA = ['#2A1A40', '#FFFFFF', '#DCEFF7'] + sys.argv[3].split(',')
im = Image.open(entrada).convert('RGB')
LLAVE = (255, 0, 255)
w, h = im.size
# 1) el fondo fuera ANTES de reducir colores (si no, se come la paleta)
for x, y in [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3)]:
    ImageDraw.floodfill(im, (x, y), LLAVE, thresh=40)
# 2) tintas planas solo con los colores del dibujo
pal = [tuple(int(h[i:i+2], 16) for i in (1, 3, 5)) for h in MARCA]
pimg = Image.new('P', (1, 1))
plano = [v for c in pal + [LLAVE] for v in c]
pimg.putpalette(plano + [0] * (768 - len(plano)))
q = im.quantize(palette=pimg, dither=Image.Dither.NONE).convert('RGB')
import tempfile, os
tmp = os.path.join(tempfile.gettempdir(), 'natural-plano.png')
q.save(tmp)
vtracer.convert_image_to_svg_py(tmp, salida, colormode='color', hierarchical='cutout', mode='spline',
    filter_speckle=12, color_precision=8, layer_difference=10, corner_threshold=60, length_threshold=4.0,
    max_iterations=10, splice_threshold=45, path_precision=3)
svg = open(salida).read()
def cerca(c):  # cada relleno se pega al color plano más cercano de la paleta
    r, g, b = int(c[1:3], 16), int(c[3:5], 16), int(c[5:7], 16)
    todos = pal + [LLAVE]
    m = min(todos, key=lambda p: (p[0]-r)**2 + (p[1]-g)**2 + (p[2]-b)**2)
    return m
def cambiar(mo):
    m = cerca(mo.group(1))
    return 'fill="none"' if m == LLAVE else 'fill="#%02X%02X%02X"' % m
svg = re.sub(r'fill="(#[0-9A-Fa-f]{6})"', cambiar, svg)
svg = re.sub(r'<path[^>]*fill="none"[^>]*/>', '', svg)
open(salida, 'w').write(svg)
print(salida, 'paleta', ['#%02X%02X%02X' % p for p in pal], 'paths', svg.count('<path'), 'KB', len(svg)//1024)
