# SOMOS NATURAL — sitio público

> **Este archivo es la FUENTE DE VERDAD del proyecto.** Léelo completo al retomar.

Sitio de marketing del negocio de aguas naturales. **No es el ERP**: ese vive aparte en
`~/Developer/natural-erp` y tiene su propio CLAUDE.md.

## 🟢 AHORA (12-nov noche): IDENTIDAD primero → luego web a la manera de Mana

Referencias de Zahir: Fizzly, Matcha Meleon, Juicy Joy, Lemon Chill, Pure
Froot, Giddy Grapes (+ en.manayerbamate.com). Plan acordado en 3 pasos:
(1) identidad, (2) web con esa identidad, (3) opcional, etiquetas. Ilustración
por el camino **MIXTO** (lo eligió él): boceto de IA a tintas planas →
`herramientas/vectorizar.py` (cubeta para el fondo + paleta EXACTA de marca +
vtracer) → SVG. Requiere `brew install potrace` y `pip3 install --user vtracer`
(ya instalados).

**Hoja de marca**: `/referencias/marca.html` (`src/referencias/marca/`):
logotipo (la palabra NATURAL de su etiqueta de jamaica trazada con potrace →
`public/marca/natural-{tinta,crema,lavanda,jamaica}.svg`), combinaciones con la
gotita y el sello, paleta base (lavanda #8C66BB, crema, aqua, tinta #2A1A40,
acentos jamaica #C8243E y maracuyá #F2C230), un MUNDO (fondo + tinta) por sabor
(`mundos` en pagina.js), tipografía (Fraunces suave para títulos + Rubik),
recursos (ondas, estallido, borde a cuadros, timbre) y las 2 primeras
ilustraciones vectoriales (`public/marca/ilu-{jamaica,tamarindo}.svg`: la
gotita abrazando la flor / cargando vainas). Las ilustraciones van sobre el
tono CLARO del sabor (sobre el fuerte la fruta se perdía).
**v2 (aprobado todo menos colores):** `mundos` rehechos con la regla "el fondo
CONTRASTA con el agua" (como guanábana) y tonos de sus paletas de referencia
(periwinkle, vino, lavanda rosa, lima pálido, cereza, mandarina, escarcha,
rosa, mora, mezclilla, lila, cinabrio, pistache); "frutos rojos en claro" lo
pidió él. **Gotita OFICIAL nueva en vector plano** (`public/marca/gotita.svg`,
misma cara/guantes/amor y paz del sello) — él dijo "si consideras cambiar la
gotita, hazlo". El sello (`img/logo.png`) todavía trae la gotita vieja.
**v3:** botellas de las cartas giradas a +0.07 rad (con 0.16 asomaba la orilla
oscura de la etiqueta de un solo lado); café fondo MANTEQUILLA #F6E3A1,
horchata FIRE #BF3604, piña FROST #E6F1FA (igual que chocolate) — pedidos suyos.
Botellas de las cartas en −0.02 rad (todavía asomaba la orilla con 0.07).
**Sello nuevo** en SVG en línea (`sello()` en marca/pagina.js): A clásico (anillo
+ SOMOS NATURAL / AGUAS DE SABOR + gotita oficial) y B con logotipo (gotita +
NATURAL + AGUAS DE SABOR · PUEBLA). Para archivo final: texto a curvas.
**Ilustraciones**: 10 de 14 vectorizadas en `public/marca/ilu-<etq>.svg`
(escenas y paletas en el scratchpad `escenas.tsv`); mango, piña, melón y
guanábana fallaron por el LÍMITE de ChatGPT Plus (se renueva 9:24 pm).
Zahir eligió el sello **A**, pero duda de usar un SELLO como logo principal →
en la hoja hay 4 opciones de logo principal: 1 solo la palabra (+ gotita como
ícono), 2 gotita sentada sobre la L, 3 insignia con forma de GOTA, 4 timbre.
✅ **DECIDIDO:** firma = opción 2 (gotita sentada sobre la L) para hero, redes y
publicidad; SOLO LAS LETRAS cuando haga falta sobrio; gotita sola = ícono; sello
A = stickers/tapas. Falta dibujar la pose SENTADA (`lanzar-sentada.sh` en el
scratchpad, programado para cuando se renueve la cuota de ChatGPT).

**VIDEO 4K (12-nov):** Real-ESRGAN x4plus (240 cuadros, ~2.7 h) → maestro
`~/Desktop/natural-video-4k/natural-4k.mp4` (3840×2160, con audio, grano fino).
En la web: `public/video/hero-{720,1080,1440}.mp4` ya salen del 4K (1440 solo en
pantallas ≥1600 px) + cartel `hero-final.jpg` del 1440.

**Vista de producción de Mundos**: `npx vite build --config <scratchpad>/vite.mundos.mjs`
(input `referencias/mundos.html`) + renombrar a `index.html` + `vite preview` en
:5190. Pulido del 12-nov: botella más grande (0.8 H) e inclinada (−0.13),
sticker "Hecha hoy" girando, píldoras en barra, cabeza editorial en proceso,
sello A en el pie.

**Mundos — 13º:** la fruta/elemento por sabor RECHAZADO ("rompe con toda la
estética") — quitado, no volver. `botanica.js` ahora es un GENERADOR con semilla por
sabor (`componer(i+1)`): reparte flores, destellos, hojas (3 tallos a la derecha, 2
a la izquierda), ventana con nubes o círculo, estallido, y decide DÓNDE va la gotita
(5 lugares, izquierda o derecha; `.gotita-caja` con sus hojas de enfrente). Mismo
sabor = misma composición. ANIMACIONES: al entrar (`.brota`) los tallos se DIBUJAN
(pathLength 1 + dashoffset), las hojas BROTAN, las flores FLORECEN girando con
rebote, destellos y estallido aparecen, la gotita llega de un brinco; en reposo las
flores giran, las hojas se mecen, las nubes viajan, el sol late y gira, la gotita
baila.

**Mundos — 12º:** giro de 42° (con 26° lo de la derecha se quedaba abajo a la
izquierda y se cortaba de golpe) + la copia se desvanece al final. El elemento del
sabor ya NO flota ni va enorme: `.elem-caja` (≈36svh) abajo a la derecha, SENTADO
sobre su propio estallido girando (`.elem-sol`), con la botánica completa alrededor.

**Mundos — 11º:** disco ENORME (`transform-origin: 50% 520%`, 26°) y giro CONTINUO:
lo viejo es una copia `.fantasma` (conserva sus colores con variables en línea) que
se va rodando mientras lo nuevo entra detrás, al mismo tiempo; todo pasa POR DETRÁS
de la botella (lienzo z 3 > hero z 2). Lado izquierdo más alto (`.bota-izq` 128%).
**ELEMENTO PROPIO POR SABOR** (estilo póster: contorno + SOMBRA PLANA desplazada +
brillos): prueba de frutos rojos aprobable en `public/marca/elem-frutos-rojos.svg`;
si existe `elem-<etq>.svg` va grande a la derecha (`.elem`, `.con-elem` aligera la
botánica). 🔴 `vectorizar.py` ahora usa `hierarchical='cutout'`: con 'stacked' la
capa base del tamaño del cuadro salía del color del contorno (cuadro oscuro).

**Mundos — 9º/10º (cambio de sabor como Mana):** Zahir: "como si fuera un DISCO y
girara hacia donde gira". Los dos lados (`.lado-izq` = botánica + gotita + hojas
de enfrente; `.lado-der`) son UN DISCO con centro en la botella (transform-origin
50% 52%): al cambiar gira 80° hacia la dirección de la flecha (`--dir` ±1) y se va
(`.sale`, 420 ms), el fondo cambia de GOLPE, y lo nuevo entra rodando desde −80°
en la MISMA dirección (`.entra-desde` → `.entra`); la botella gira hacia el mismo
lado (`ir.dir`) y cambia de espaldas. (El 9º, encoger hacia el centro, NO era.) Cada
sabor con su acomodo: `data-variante` a (ventana con nubes) / b (ramillete de
flores) alternado, y la fruta del sabor regada en 3 tamaños (`.b-fruta`).

**Mundos — 8º:** horchata SIN el vaso (borrado en el boceto con PIL y re-vectorizado;
el original quedó como `ilu-horchata-con-vaso.png` en el scratchpad); maracuyá se
rehace en el lote de las 9:27 (salía distinta: gotita con piernas oscuras) con un
prompt más estricto ("IDÉNTICA"); ANIMACIONES suaves en la botánica: estallido
gira (48 s), destellos titilan, nubes se mueven en la ventana, flores se mecen,
hojas de enfrente con viento, la fruta flota (todo se apaga con movimiento
reducido).

**Mundos — 7º ("me parece muy fea la gotita" a mano → "hazlo como las otras"):**
la gotita del hero vuelve a ser la ILUSTRACIÓN vectorizada de cada sabor, con SUS
colores (sin teñir). Para integrarla, la BOTÁNICA lleva ahora el MISMO contorno
morado oscuro (#2A1A40) que las ilustraciones (hojas, pétalos, ventana, nubes,
estallido, destellos; tallos con un trazo oscuro debajo `.b-tallo-borde`). La firma
usa `/marca/gotita.svg`. `gotita.js` (la dibujada a mano) quedó sin usar: NO volver
a ella. Lote de ChatGPT de las 9:27 REACTIVADO (frutas con contorno ya combinan).

**Mundos — 6º ("la gota entera cambia de color"; "rehazla sin pedírselo a ChatGPT";
"que la botella siga interactuando con la web"):** GOTITA DIBUJADA A MANO en
`src/referencias/mundos/gotita.js` (estilo plano de la botánica: sin contorno,
degradado aqua, ojos con brillo, cachetes rosas, brazos de manguera, guantes
blancos, zapatos lavanda; colores FIJOS) en el hero y en la firma del pie. LA
BOTELLA ACOMPAÑA LA PÁGINA: lienzo fijo (z 3, entre fondos y textos) y paradas
`data-botella` = hero (inclinación de Mana) → "Así le hacemos" (ahora va justo
después de los stickers, 2 columnas: pasos a la izquierda que se encienden, hueco
STICKY a la derecha donde la botella da vueltas) → se desvanece antes del texto →
aterriza en el pie junto a la firma (`.pie-arriba`). Mando del hero en
`.capa-frente` (sticky encima del lienzo). 🔴 `.proceso` usa `overflow: clip`:
con `hidden` el hueco sticky no pegaba. En teléfono la botella solo vive en el
hero. Lote de ChatGPT de las 9:27 CANCELADO: lo de ChatGPT trae contorno grueso
y ya no combina con la gotita plana (pendiente decidir frutas a mano).

**Mundos — 5º pulido ("me encantó"; gotita más integrada + movimiento de Mana al bajar):**
REVISADO EN VIVO en en.manayerbamate.com: el hero se queda pegado un buen tramo y
la lata se va inclinando HACIA LA CÁMARA (enseña la tapa) y acostando, mientras
las ilustraciones se mueven despacio. Aquí: `.viaje` (230svh) con el hero sticky;
`viajeP()` 0→1 → la botella: cabeceo hasta 0.78, ladeo hasta −0.75, crece un poco
(más acostada se veía medio vacía por la física del agua). 🔴 En
`lavanda/escena.js` el grupo usa `rotation.order = 'ZXY'` (giro → cabeceo →
ladeo); con XYZ el cabeceo solo la giraba sobre su eje. Plantas e ilustración con
parallax por `--p`. GOTITA: la ilustración se inserta EN LÍNEA (fetch del SVG, se le
pone viewBox porque vtracer no lo trae) y el contorno #2A1A40 pasa a
`.ilu-linea` = tinta del mundo; va más chica y abajo, con hojas DELANTE
(`frente` en botanica.js) y un balanceo suave.

**Mundos — 4º pulido ("no me encantaron los elementos gráficos, gotitas muy grandes"):**
la composición en código se cambió por BOTÁNICA dibujada a mano en
`src/referencias/mundos/botanica.js` (a la Mana: tallos que trepan, hojas con
nervadura curva, flores de 5 pétalos con degradado, ventana con nubes, estallido,
destellos), con colores por sabor (`base` + `botanica` en pagina.js → variables
--h --hl --p1 --p2 --v --s). Gotita más chica (50svh) entre las plantas de la
izquierda. Sobre el estallido de la derecha va LA FRUTA DEL SABOR
(`/marca/fruta-<etq>.svg`, lote `lanzar-frutas.sh` en el scratchpad, camino
mixto; si no existe, no se ve).

**Mundos — 3er pulido ("mucho texto", referencia: hero de Mana):** HERO SIN TEXTO:
fuera título, nombre gigante, ficha y las 14 píldoras; la ilustración del sabor
ENORME a la izquierda saliéndose, a la derecha una COMPOSICIÓN vector en código
(`deco`: ventana con nubes, flor, estallido, hojas, destellos) que toma los
colores del mundo + `acentos`/`azules` por sabor; abajo al centro el MANDO:
flecha blanca · píldora con el nombre (tinta) · "+" (agregar al pedido) · flecha.
Menú en píldoras crema. Franja de STICKERS (las 14 ilustraciones corriendo).
Nosotros y proceso con menos texto (proceso solo títulos). h1 solo para lector.

**Mundos — 2º pulido (minimalismo + lo que faltaba):** ritmo único `--espacio`;
proceso solo texto (números grandes, sin ilustraciones de sabores que no tenían
que ver); negocios/eventos solo con los TÍTULOS de cada punto; secciones nuevas:
**Nosotros** (foto real `formacion.jpg` + 2 líneas), **Dudas** (acordeón con
facts confirmados: mínimo, zona, sin azúcar, eventos, tamaños, cambio de botellas echadas a perder (NO hay envases retornables, corregido 13-nov) — NO la
duración de 5–7 días ni el anticipo, siguen sin confirmar), **Mi pedido** (panel
lateral: contador por sabor + tamaño + dulzura + aviso de mínimo → WhatsApp;
"Agregar a mi pedido" en la ficha), ficha con tamaños y DULZURA, pie completo
(firma, sello, navegación, contacto, reparto, ©), favicon = gotita, meta
description y og.

**WEB NUEVA "Mundos"** (`/referencias/mundos.html`, `src/referencias/mundos/`),
arrancada el 12-nov noche con la identidad: barra con SOLO LAS LETRAS (máscara
CSS: toma la tinta del mundo en pantalla). 🔴 **SIN VIDEO** (Zahir: "ya no me
gusta el video, las referencias no tenían video"): el hero ES el mundo de los
sabores, con "Se hacen hoy. Te llegan mañana." arriba a la izquierda. SABORES a la
Mana: toda la pantalla toma el mundo (`marca/datos.js`, fuente única de los
colores), botella 3D al centro (escena de `lavanda/escena.js`), nombre gigante
TONO SOBRE TONO (24% de la tinta sobre el fondo: en tinta pura competía con la
botella), su ilustración abajo a la izquierda, ficha a la derecha; se cambia
con flechas/píldoras/teclado/deslizar — NO con scroll — y la botella da una
vuelta y cambia de sabor de espaldas. Proceso sobre lavanda con ondas y 4
ilustraciones; negocios/eventos en tarjetas de mundo con estallido "¡Desde 10!"
y timbre "¡Salud!"; dónde; pie con la FIRMA (por ahora gotita parada sobre la
L, falta la pose sentada).

## (2026-11-12, tarde) el sitio Mana NO le gustó → hero con VIDEO realista

Zahir: "no me gustó nada como se ve". Nueva dirección: **hero = video de alguien
tomando la botella**, más realista. No tiene fotos buenas de referencia, así que:

- **Modelo 3D mejorado con `foto: true`** (`armarBotella({ foto: true })`, solo
  para fotos fijas, el sitio NO lo usa): el agua deja pasar la luz
  (transmission + attenuation) y el grosor depende del ángulo de la vista
  (`transmission_fragment` parchado: `thickness * |n·v|`), así lo grueso queda
  oscuro y las orillas rubí. Color de la luz por sabor: `luz` en la receta
  (jamaica `0xc4123a`), absorción `absorcion` (default 0.2). 256 caras.
- **Estudio de foto**: `referencias/foto.html?sabor=jamaica` → guarda
  `public/referencias/botellas/foto-<etq>-{frente,tres}.png` (papel crema,
  sombra suave, reflejo rubí en el piso).
- Con esos renders + el arte de la etiqueta, ChatGPT (`codex exec`) generó
  `producto-jamaica.png` (foto de producto, etiqueta muy fiel) y
  `hero-persona-jamaica.png` (16:9, mujer en patio poblano con la botella,
  aire a la derecha para texto) — en el scratchpad de esa sesión. Siguiente
  paso: pasar la del hero a una herramienta de imagen→video.

- **Versión "Lotería Natural"** — ✅ GUARDADA como propuesta (12-nov) en
  `propuestas/loteria-natural-2026-11-12/` (build de producción listo; ver su
  LEEME.md). Zahir quiere probar OTRO diseño antes de decidir. (`/referencias/natural.html`,
  `src/referencias/natural/`) — la que se armó con su visto bueno tras
  rechazar Lavanda ("no me gustó nada": la transición video→botella se veía
  extraña y era feo obligar a pasar por los 14 sabores) y Lotería ("se ve hecho
  por IA"). Estilo lotería (papel picado, cartas con número y nombre, rótulos
  Alfa Slab One, frijolitos, gritón con versos) en los colores del SELLO
  (lavanda, crema, aqua, morado tinta; rojo jamaica y amarillo maracuyá del
  logo) + Rubik. **Las cartas llevan la botella REAL** (render del 3D,
  `public/referencias/cartas/<etq>.webp`, se rehacen con
  `referencias/cartas.html`) sobre el `fondoGaleria` del sabor; La Gotita usa
  `img/gotita.png` (la del sello) y El Garrafón es tipográfico. **Tocar una
  carta: la botella se sale de la carta en 3D** (visor con la escena de
  `lavanda/escena.js`, arrastrar = girar con inercia, sacudir mueve el agua),
  con verso, "Ponerle frijolito" y "Pedir este". El video es la carta "0 · La
  Antojada" del hero (se reproduce una vez + "↻ Otra vez"). Nada de
  transiciones de scroll.
  **Pulido (12-nov):** botellas giradas a la derecha (+0.16 rad, la etiqueta
  miraba a la izquierda) en cartas y visor; **minimalismo** a pedido ("aunque
  sea lotería, mantengamos el minimalismo"): sin tablero oscuro, fondos de
  carta al 32% del color del sabor sobre crema, bordes de 1px y sombras
  suaves, papel picado en 2 tonos, gritón y cuenta como píldoras, títulos sin
  sombra. Hero rehecho: solo la carta del video grande + La Jamaica asomando,
  título en minúsculas, liga a WhatsApp y una línea de datos abajo.
  **2º pulido:** barra con SOLO la gotita (`img/gotita.png`); **intro**: al
  abrir, el video va a pantalla completa ("Saltar ↓") y al terminar se ENCOGE
  (WAAPI top/left/width/height) hasta su carta, ahora HORIZONTAL y sola (se
  quitó La Jamaica de al lado); sale CADA vez que se abre o recarga (Zahir lo pidió así; antes era una vez
  por sesión); sin autoplay o con movimiento reducido no hay intro. 🔴 La
  carta va girada -1.5°: mientras dura la intro lleva `rotate: none` (cualquier
  rotate, aun 0deg, vuelve al video `fixed` relativo a la carta). Flecha "Baja
  para ver los sabores".
  **Contexto en la intro** (`.intro-capa`, solo a pantalla completa): gotita +
  "Somos Natural" arriba, dos frases abajo según el segundo del video
  (`data-de`/`data-a`: 1–4.2 s "Hechas en Puebla por una familia", 5–9.3 s "Se
  hacen hoy. Te llegan mañana."), línea de avance y degradado solo abajo; se
  desvanece al encogerse (`.encogiendo`).
  **3º: EL VIDEO ES EL FONDO DEL HERO** (Zahir: "que el hero esté integrado
  con el video, que se quede de fondo en lugar del morado"). Ya NO se encoge a
  una carta (la carta "La Antojada" se quitó): la intro corre a pantalla
  completa sin barra; al terminar/Saltar se queda en el último cuadro (ella
  con la botella a la derecha) y aparecen el velo morado del lado izquierdo,
  título, botones, datos, flecha y "↻ Ver el video" (repite la intro). La
  cabecera (papel picado + barra) es `fixed` y transparente sobre el video;
  con scroll > 40 px el picado se recoge y la barra toma el lavanda (`.bajo`).
  **4º:** velo NEUTRO oscuro (rgb 12 8 6), sin morado ("como la primera
  versión"). **El hero aparece DE UNA** con el último cuadro como cartel
  (`public/video/hero-final.jpg` / `-720.jpg`, sacados con ffmpeg -sseof) y el
  video con `preload="none"`: solo se baja y corre (intro a pantalla completa
  con títulos) si tocan "↻ Ver el video".
- **Botella: silueta MEDIDA** de la imagen de referencia que mandó Zahir
  (botella 500 ml en rojo): `MEDIDA` en modelo.js, forma por defecto. Él la
  aprobó ("súper bien la botella") con la etiqueta subida a 1.3. La "nueva"
  (hombro 0.6 R) se veía CHATA.

- **Versión "Lavanda"** (RECHAZADA) (`/referencias/lavanda.html`, `src/referencias/lavanda/`)
  — la dirección que pidió Zahir tras rechazar Lotería ("se ve hecho por IA"):
  la experiencia son **el video + la botella 3D en sintonía**, con los colores
  del SELLO (lavanda #8C66BB, crema #FFFDF2, aqua #E0F2F6, morado tinta) y
  Rubik. Sin ilustraciones generadas. Coreografía (`pagina.js` → `cuadro()`):
  hero pegado 320vh → al bajar, la botella 3D aparece EXACTAMENTE encima de la
  del último cuadro del video (`VIDEO = {x:882,y:412,ancho:222}` en px del
  video, mapeado con object-fit cover; en teléfono object-position 69%), el
  video se funde a lavanda y la 3D viaja a la derecha junto a "Catorce
  sabores…" → Sabores pegado (75vh por sabor): botella al centro, nombre
  gigante crema detrás, gira al final de cada tramo y cambia de sabor de
  espaldas, lista a la derecha → Proceso: botella ladeada a la derecha,
  pasos se encienden → se desvanece antes de Negocios/Eventos, Dónde, pie.
- **Botella: forma nueva por defecto** (`forma: 'nueva'` en `armarBotella`):
  medida contra `formacion.jpg` — hombro corto (~0.6 R) en curva que se cierra
  al cuello, agua casi al anillo (nivel 1.915), etiqueta más arriba (1.3).
  `forma: 'antes'` conserva la vieja. Ojo: el sitio Mana y el de main también
  usan modelo.js → ya ven la forma nueva. Opción `realce: true` (orilla del agua
  del color `luz/brillo` del sabor + grosor del PET por fresnel, barata).
  HDRI CC0 de Poly Haven en `public/hdri/` (estudio de foto y Lavanda).

- **Versión "Lotería"** (RECHAZADA: "se ve hecho por IA") (`/referencias/loteria.html`, código en
  `src/referencias/loteria/`), pedida tras Antojo: "retro, lotería, mexicano,
  como Mercado". Cada sabor es una CARTA DE LOTERÍA (número, ilustración,
  nombre con artículo: "La Jamaica", "El Tamarindo") + La Gotita (15, no se
  marca) y El Garrafón (16) = tabla de 4×4. **El pedido se arma poniéndole
  frijolito a las cartas** y "¡Lotería!" abre WhatsApp con la lista y el
  tamaño. El gritón (franja pegada) canta el verso de cada carta; los versos
  son nuestros y NO afirman ingredientes (la horchata NO dice canela). Hero:
  rótulo + abanico de 3 cartas, la del centro es "La Antojada" (0) con el
  video adentro. Papel picado, rótulos Alfa Slab One, Courier Prime para
  lo de máquina. Ilustraciones: ChatGPT en estilo litografía de lotería
  antigua, `jamaica.png` como referencia de estilo para las demás
  (`public/referencias/loteria/<id>.webp`); sin texto en la imagen, el marco
  y el nombre van en HTML. Si falta una, cae a `public/mundo/fruta-*`.

- **Versión "Antojo"** (`/referencias/antojo.html`, código en
  `src/referencias/antojo/`), con referencias de Olipop, Cure, The Crumb
  Culture, Oh Belly y Gulp: cinta que corre, video de hero con el título
  encima (se reproduce una vez y se queda en la botella), orillas onduladas,
  ¿Por qué Natural? en nubes de color sobre vino, franja a cuadros, mano
  destapando la botella con notas punteadas (`public/referencias/antojo/
  mano-jamaica.webp`, generada con ChatGPT y limpiada de manchas), carril
  "Encuentra tu sabor" (botella sobre su fruta y su color), ¿Para quién? en
  tarjetas con la gotita, "Así de sencillo" con las 4 poses, dónde comprar y
  un pie con "Natural" gigante. Letra: Shrikhand + Jost. Falta su veredicto.
- **Video del hero**: `public/video/hero-{1080,720}.mp4` + `hero-cartel.jpg`
  (Gemini, 720p → mejora con ffmpeg). Real-ESRGAN x4plus escalando a 4K en
  el scratchpad (~40 s por cuadro, 240 cuadros).

## (Rechazado 2026-11-12) sitio nuevo a la manera de Mana (rama `mana`, 2026-11-12, SIN commit)

Zahir: *"ya tengo una identidad que me gustaría que siguiéramos o replicáramos"*.
Referencias: yaas-energy.com, agrumeafarm.it/en y **la directa, en.manayerbamate.com**.
Se rehízo el sitio entero en `src/sitio/` siguiendo el SISTEMA de Mana con el
material de Natural. **main y lo publicado NO se tocaron**; el sitio anterior
sigue en `src/App.jsx` + `src/index.css` + `src/componentes/`, sin cargar
(`src/main.jsx` ahora carga `sitio/Sitio.jsx` + `sitio/sitio.css`).

**Falta que Zahir lo vea y diga si va por ahí.** No se ha subido ni revisado con
Codex (toca `/codex:review` antes del commit).

Qué se tomó de la referencia y qué es propio:

| De Mana (el sistema) | De Natural (el contenido) |
|---|---|
| Color plano a toda la pantalla que ES el sabor | 14 pares de color en `sitio/tonos.js` (`fondo` claro + `boton` oscuro) |
| Producto 3D al centro, que cae y se queda asomado abajo | La botella 3D de siempre (`botella/modelo.js`) |
| Dibujos grandes a los lados que se salen de la orilla | La fruta en caricatura (`public/mundo/fruta-*`) + **14 ramas nuevas** (`public/mundo/rama-*`) |
| Flechas + píldora con el nombre del sabor | Además 14 puntos, teclado ← → y deslizar con el dedo |
| Rueda de tarjetas que gira al bajar | Los 4 pasos de `proceso` con las 4 poses de la gotita que ya existían |
| Dos fotos a media pantalla, palabra gigante, carril de bloques de color | `formacion.jpg` (real) + fotos generadas; "SABORES"; botellas del 3D |
| Texto en curva + calcomanía de flor | "¿Para tu negocio, tu fiesta o para ti?" → los tres caminos a WhatsApp |
| Pie con personaje y "press space to jump" | La gotita del logo brinca frutas (espacio o toque) |
| Neue Montreal delgada en mayúsculas | **Host Grotesk** 300 (Google Fonts). Ya NO se cargan Yeseva/Jost/Bagel |

Orden: `Portada → Rueda (#proceso) → Dos fotos → Sabores (#sabores) → Caminos
(#caminos) → Dónde comprar (#tiendas) → Instagram → Pie`.

| Archivo (`src/sitio/`) | Qué hace |
|---|---|
| `tonos.js` | Los dos colores de cada sabor y `SABORES` (orden del menú + rutas de imágenes) |
| `sabor.js` | El sabor de la portada (almacén chiquito; lo oyen la portada y el 3D) |
| `escenario.js` | La botella 3D con la coreografía nueva (ver abajo) |
| `Lienzo.jsx` | El lienzo fijo; carga el 3D aparte; sin WebGL pone `html[data-botella=no]` y la portada enseña la foto |
| `Techo.jsx` | Franja del aviso (lo que la portada no dice con letras) + píldoras; en teléfono, "Menú" a pantalla completa |
| `Portada.jsx` | Color que entra en círculo, dibujos que salen/entran por su lado, flechas, nombre, puntos |
| `Rueda.jsx` | La rueda del proceso; publica `--q` (0→1) y el CSS gira el disco |
| `Vitrina.jsx` | SABORES + carril de 14 bloques, píldoras por grupo, tamaños y dulzura |
| `Caminos.jsx` | Texto en curva (SVG `textPath`), calcomanía y las tres tarjetas |
| `Tiendas.jsx` | Lista de puntos de venta + el My Maps (barra recortada, igual que antes) |
| `Suelo.jsx` | Pie y el juego del brinco |
| `sitio.css` | Todo el estilo. Sigue la regla: cero estilos a mano en el JSX (solo datos: `--f`, `--b`, `--q`, `--mx/--my`) |

**La botella (`sitio/escenario.js`)**: el motor viejo (`botella/escenario.js`)
supone que cada hueco cruza el centro de la pantalla; aquí el segundo vive
pegado ABAJO y nunca lo cruza, así que el avance se mide con la sección:
`p` = lo que falta para que la rueda llegue arriba (la caída, con maroma) y
`q` = lo recorrido dentro de la rueda (gira dos vueltas). Dos huecos:
`data-botella="portada"` y `data-botella="rueda"`; la sección larga lleva
`data-rueda`. **El giro solo no va parejo**: se entretiene con la etiqueta al
frente y pasa rápido la espalda (a paso parejo se veía de espaldas la mitad del
tiempo). Sigue siendo UNA botella, UN lienzo, ligera en celular.

**Capas (no cambiarlas a la ligera):** portada 0-2 → `.lienzo` 3 → controles de
la portada 6 → `.tapa` 5 (toda sección de las fotos para abajo: opaca, tapa el
lienzo) → `.techo` 50. La escena de la rueda es sticky (forma su propio grupo)
y queda ENTERA detrás del lienzo: por eso las tarjetas pasan detrás de la botella.

**La rueda en CSS:** `.rueda-disco` es un punto (el centro de un círculo de
`--radio: 250vw`); cada `.rueda-pieza` cuelga a un radio de distancia, girada
`--i × --pasito`, y el disco gira `--q × --giro × --pasito`. Si se agrega o
quita una pieza hay que tocar los `nth-child` y `--giro` (= el `--i` de la
última). En pantallas de menos de 460 px de alto la rueda se suelta y los
pasos se leen en fila.

**Imágenes generadas con ChatGPT** (`codex exec`, con permiso de Zahir: "si
necesitas fotos pídeselas a codex"): las 14 `public/mundo/rama-<etq>.webp`
(900 px, fondo transparente), con `fruta-mango` como referencia de estilo. El
guion y la lista quedaron en el scratchpad de esa sesión; la receta: una
llamada por imagen, 4 a la vez, `-i referencia.png < /dev/null`, y pedir "fondo
TRANSPARENTE (PNG con canal alfa)". Las fotos de ambiente siguen siendo las
generadas de `public/referencias/fotos/` (⚠️ inventadas: decidir si se quedan).

**Pendiente / por decidir con Zahir:**
- Que lo vea en compu y en su iPhone (`http://192.168.3.202:5181`) — el 3D en
  teléfono no se ha probado en aparato real.
- Las frutas (`fruta-*.webp`) son de 520 px: en pantallas grandes se ven
  suaves. Si se queda este rumbo, pedirlas de nuevo a 1200 px.
- Tipografía: se cambió a Host Grotesk por la referencia. Si quiere conservar
  Yeseva/Jost, es una variable (`--letra`) más los títulos.
- Antes de publicar: `/codex:review`, borrar lo viejo que ya no se cargue
  (`App.jsx`, `index.css`, `componentes/`, `botella/escenario.js`, `referencias/`)
  y mover las botellas de `public/referencias/botellas/` a su carpeta propia.

## Qué es y para quién

Sitio de una sola página con **tres caminos**, decididos con el negocio el 2026-09-04:

1. **Tu negocio** — tiendas, torterías y restaurantes. Es el cliente fuerte.
2. **Eventos** — fiestas y reuniones. Sale del Instagram: *"Para tu fiesta, reunión o
   cualquier plan. Pide por DM y reserva tu fecha."*
3. **Para mí** — público final.

**Los pedidos NO tocan la base de datos.** El sitio arma el mensaje y abre WhatsApp; la
familia lo captura en el ERP como siempre. Fue decisión explícita: cero backend, cero
riesgo, y el ERP hoy ni siquiera se está usando (su Supabase se vuelve a pausar solo).

## Diseño

**El lenguaje sale de la etiqueta de Jamaica** (`~/Downloads/AGUA DE JAMAICA.png`), que el
negocio eligió de entre sus tres etiquetas.

- **Color:** crema `#FAEDE9`, vino `#9B2247`, vino hondo `#6E1732`, tinta `#2B181D`.
  Cada sabor trae además **su propio color**, que viaja como `--c`.
- **Tipografía:** `Yeseva One` (display setentero) **solo en títulos**; `Jost` en todo lo
  demás, casi siempre en versalitas muy espaciadas (`.caps`) como en la etiqueta.
  **El texto corrido va a peso 400** (2026-09-05): el 300 pasaba contraste pero se veía
  tímido junto a la tinta vino saturada de la etiqueta. Solo la firma `fina` de melón
  conserva el 300, porque copia su arte real.
- **Sin efectos.** Nada de sombras, degradados, resplandores ni bordes redondeados. La
  estructura la dan líneas de 1 px. Se llegó aquí porque la primera versión (morada, con
  animaciones) se sintió sucia.

**La pieza central es `Etiqueta.jsx`.** Cada sabor se muestra como su etiqueta, no como una
botella genérica.

> **Las etiquetas van DIBUJADAS, no fotografiadas — y cada una es distinta.**
> Se probó meter el JPG del arte real y el negocio lo rechazó: le gusta el dibujo. Pero
> tampoco pueden ser todas iguales, porque **sus etiquetas de verdad no se parecen entre sí**.
> La solución: `sabor.etiqueta` no es una imagen, es **la receta para dibujarla**.

```js
etiqueta: { real: true, trazo: 'arco', fondo: '#FAEDE9', tinta: '#9B2247',
            letra: 'groovy', motivo: 'jamaica' }
```

| Campo | Qué es |
|---|---|
| `real` | Si el diseño está copiado de su etiqueta de verdad o es la plantilla de la casa |
| `trazo` | `arco` · `centro` · `esquinas` · `sello` · `casa` — cinco acomodos sacados de sus etiquetas |
| `fondo` / `tinta` | El papel y la tinta de ESA etiqueta |
| `letra` | `groovy` · `serif` · `bold` · `redonda` · `fina` — lo único que cambia de tipografía |
| `acento` / `onda` | Color del texto en arco / de los adornos de fondo. **Van separados**: el arco del mango en amarillo sobre naranja no se leía |
| adornos | `ondas` (mango) · `goteo` (chocolate) · `sembrado` (piña, mango) · `rincones` (jamaica) · `selloRect` (vainilla) |
| `motivo` | Cuál de los 14 dibujos de línea (`Motivos.jsx`) le toca |

Todo mide en **`cqw`**, así que la misma etiqueta sirve en una tarjeta de 230 px y en la
portada a 420 px sin tocar nada.

### Retro de etiqueta, no de hamburguesería

Criterio fijado el 2026-09-06 a pedido de Zahir: el sitio debe verse retro **como sus
etiquetas** —imprenta, papel, una tinta, versalitas espaciadas, filetes, dibujo de línea,
sello redondo— y **no como la ola actual de "retro de comida rápida"** (marquesinas que
corren, mascotas rubber-hose por todos lados, calcomanías, letras burbuja, sunbursts,
mostaza y turquesa). Al agregar algo, preguntar de cuál de los dos lados viene.

De su lado (se queda): Yeseva + Jost en versalitas, crema y vino, líneas de 1 px, las
etiquetas dibujadas, el sello, el texto en arco del aro, las fotos con lavado cálido, el
**filete doble** entre secciones (`3px double var(--marco-firme)`, agregado el 2026-09-06).

Del lado de la moda (se quitó o se vigila):

- **La marquesina se detuvo** (2026-09-06). La tira sigue siendo la banda vino con los cuatro
  textos fijos, pero quieta y centrada, como el pie de una etiqueta. Era la firma más clara
  del retro de hamburguesería.
- **La gotita** es del negocio y se queda, pero es rubber-hose de los años 30, que es
  exactamente lo que usan las hamburgueserías retro. Aparecía cuatro veces; **el caminante
  (la que cruzaba brincando entre Sabores y Proceso) se quitó el 2026-09-06 con el visto
  bueno de Zahir** por ser la aparición más caricaturesca. Quedan portada, pedido y pie.
  No reintroducirlo.
- La pila de la portada tiene aire de calcomanías, pero a −7°/−1.5°/+5° se lee como
  etiquetas sobre la mesa y no como *sticker bomb*. No aumentar los ángulos.
- `Bagel Fat One` (letra burbuja) solo vive en la firma `redonda` de maracuyá, mango, piña y
  guanábana **porque copia sus etiquetas reales**. No usarla fuera de ahí.

### La portada es una pila

**Tres etiquetas en abanico** (`Portada.jsx` + `.pila`), no una sola. Se llegó aquí el
2026-09-05 después de dos intentos medidos en el navegador:

- Una sola etiqueta que se desvanecía **flotaba en el aire como calcomanía en una caja**: el
  mismo problema que ya se había diagnosticado con las fotos.
- Una **hoja de color** detrás (el `color` del sabor, a sangre hasta el borde derecho) se
  veía bien con horchata, pero **maracuyá, chocolate, frutos rojos, vainilla, mango y
  guanábana se fundían con ella** porque su papel ES su color. Descartada.

Cómo funciona:

- Se renderizan **las 15** y el CSS enseña solo tres por `data-pos` (0, 1, 2). Cada etiqueta
  conserva su nodo al cambiar de puesto, así la transición de `rotate`/`translate` la lleva
  de un lugar al otro: la de adelante **se va al fondo** y asoma la siguiente. Solo la de
  adelante dibuja su fruta (`[data-pos='0'] .etq-motivo`).
- **El orden intercala papeles oscuros y claros** por la luminosidad de `etiqueta.fondo`
  (`intercalarPorPapel`): en el orden del menú se juntaban tamarindo, limón y café, tres
  cremas seguidas, y la pila se quedaba sin color. Sale de los datos: si cambia un papel o
  llega la sandía, se acomoda solo.
- La pila mide **112 % de su celda** a partir de 940 px y se derrama hacia el hueco y fuera
  del marco. Lo que integra una pieza es la escala, no la caja. La columna se quedó en
  `1.1fr 0.9fr`: con `1fr 1fr` el tercer botón de la portada se caía a otra línea.
- La gotita con su aro va con `z-index: 4`, encima de la etiqueta de adelante (3).

**Qué NO va en las etiquetas del sitio** (decisiones del negocio, 2026-09-04):

- **"500 ml"** — el sitio vende cuatro tamaños; ponerlo en cada etiqueta contradecía Tamaños.
- **El teléfono** — ya está en el encabezado, el botón flotante, el armador y el pie. En la
  etiqueta era además lo que chocaba con la firma: quitarlo destrabó el acomodo de todas.
- **"Agítese antes de beber"** — es una instrucción para quien ya trae la botella en la mano.

**Tampoco se rotula "de agua" en las tarjetas** (2026-09-05): es lo normal y, como no todos
los sabores traen `tipo`, la mitad lo decía y la otra mitad no, como si fuera un error. Solo
se rotula lo distinto: "con leche".

**Sí se queda "sin conservadores"**: es argumento de venta y va en todas sus etiquetas de
verdad. Vive en `.etq-pie` de cada trazo; quitarlo sería borrar esa línea.

**El trazo de la fruta va EN BUCLE** (pedido del negocio): se dibuja, se queda quieto un rato
y se borra por donde empezó. El desplazamiento sigue de largo hasta `-1` en vez de volver a
`1`, y por eso no se ve el salto. Ciclo de 9 s con las figuras escalonadas.

**Tres trampas que ya costaron:**

- 🔴 **Nunca poner `position` en una regla que solo quiere `z-index`.** Se agregó
  `.etq-arco, .etq-firma, .etq-esquinas … { position: relative; z-index: 2 }` DESPUÉS de las
  reglas base, con la misma especificidad, y le borró el `absolute` a los arcos y a las
  esquinas: **el acomodo entero de las quince etiquetas se cayó al flujo normal.** La forma
  correcta: `z-index` en la regla base de cada pieza, y `position: relative` solo en las que
  son estáticas —las que un trazo vuelve absolutas ganan por especificidad
  (`[data-trazo=x] .etq-firma` le gana a `.etq-firma`).
- Los dibujos de `Motivos.jsx` llevan **`pathLength="1"` en cada figura**. Sin eso,
  `stroke-dasharray: 1` mide una unidad de usuario y el trazo sale punteado en vez de
  dibujarse. Si agregas un motivo nuevo, ponle `pathLength`.
- **El texto en arco se achica solo según su largo** (`Arco.jsx`). El arco mide lo que mide:
  a tamaño fijo, "Agua de limón con pepino y chía" se sale de la curva y el final desaparece.
- **Cuidado con el orden entre `[data-trazo]` y `[data-sello]`**: los dos tienen la misma
  especificidad, así que gana el último. El "sin conservadores" de vainilla se iba al filo de
  abajo porque la regla del sello redondo venía después; se resolvió subiendo la de la
  estampilla a `[data-trazo='sello'][data-sello='rect']`.
- Las tarjetas piden **mínimo 290 px** (`clamp(290px, 78vw, 340px)` en el estante). A 228 px
  no cabía el texto de las esquinas y se cortaba.

Además, **el `color` del sabor es la tinta de su etiqueta**, no el del líquido: la horchata
es azul marino y el maracuyá olivo, porque eso es lo que se ve en la tarjeta.

### Reglas

- **Cero estilos escritos a mano en el JSX.** Todo sale de `index.css`. La ÚNICA excepción
  es `--c`, el color del sabor, porque es un dato y no una decisión de diseño.
- **Nada inventado.** No hay testimonios, ni fotos de producto falsas, ni datos de contacto
  de relleno. Lo que falta se deja vacío y el sitio lo aguanta.
- **Un toggle que nadie lee no es un toggle.** Se borró `mostrarPrecios` cuando se quitaron
  los precios: dejarlo habría hecho creer que ponerlo en `true` los devolvía.

### Sabores son estantes, no una rejilla

Hasta el 2026-09-05 los 15 sabores iban en una rejilla de 3 por fila: **cinco filas de
rectángulos iguales, un tercio del sitio**, con filas huérfanas de 2 y de 1. Ahora cada grupo
es **un estante** (`Estante.jsx` + `.estante`): una fila que se desliza de lado y **sale por
el borde derecho de la pantalla**. Se ven tres y media; la que asoma invita a deslizar.

- Se saca del `.marco` con el mismo truco que la franja (`margin: 0 calc(50% - 50vw)`) y se
  le devuelve el margen como `padding` (`--borde`), así la primera tarjeta queda alineada con
  el resto de la página y `scroll-padding-left` hace que las demás caigan en esa misma línea.
- **Las flechas solo aparecen si de verdad hay algo escondido** (`ResizeObserver` sobre
  `scrollWidth > clientWidth`) y solo de 860 px para arriba; en teléfono se desliza con el
  dedo. La barra de scroll va oculta: la tarjeta que asoma y las flechas son la señal.
- `overflow: auto hidden` con `padding` arriba y abajo, para que el estante no recorte el
  levantón de 4 px del hover ni el revelado.
- ⚠️ **En una pestaña oculta de Chrome el `scrollBy` suave no corre** (no hay cuadros de
  animación). Si al probar con la extensión parece que la flecha no hace nada, no es el
  código: se comprobó con `behavior: 'auto'` que mueve exactamente una tarjeta.

### Cabezas editoriales

Las cinco secciones abrían igual —rótulo, título, párrafo, todo en la columna izquierda— y la
**mitad derecha quedaba vacía**; se leía como plantilla. Desde el 2026-09-05, de 860 px para
arriba `.cabeza` es una rejilla `7fr 5fr`: **título a la izquierda, entrada a la derecha,
apoyadas en el mismo piso** (`align-items: end` + `padding-bottom: .25em` en la entrada para
compensar el descenso del título). La de **Pedido sigue centrada** a propósito (es el cierre)
y la de **Formación** no es `.cabeza`: va junto a la foto.

## La botella 3D (2026-10-17/18)

Pedido de Zahir después de rechazar un rediseño completo ("del jardín poblano",
guardado en `git stash`): de sus referencias le gustó **la botella real como
protagonista y que gire al bajar**. **Se quedan Yeseva + Jost y vino/crema.**

Se armó primero en una prueba aparte (`public/prueba/botella.html`, con selector
de sabores) ajustando cada detalle con él, y luego se pasó al sitio:

| Archivo | Qué hace |
|---|---|
| `src/botella/motor.js` | La botella en three.js. No sabe nada de la página: en cada cuadro le dicen dónde ponerla (pixeles) y qué sabor enseñar |
| `src/botella/Botella3D.jsx` | El lienzo fijo a toda la pantalla y la coreografía: sigue el hueco de la portada, viaja girando al de Sabores |
| `src/botella/canal.js` | Eventos `pedir` (una tarjeta quiere un sabor) y `mostrando` (la botella ya lo enseña) |
| `src/botella/orden.js` | El orden intercalado por papel, compartido con la pila |
| `public/etiquetas/*.webp` | El arte REAL de las 14 etiquetas (de los PNG de Canva en Downloads) |

La receta de cada sabor vive en `negocio.js` → `botella: { etq, agua, lechosa |
opacidad, brillo, tapa, pulpa }`.

**Lo que ya decidió Zahir (no reabrir):**
- Silueta **Boston round de 500 ml**, `R = 0.32`, hombro en domo largo, cuello
  corto recto con anillo. Se ajustó varias veces contra sus fotos.
- Etiqueta **justo debajo del hombro**, 196° de la vuelta (12 cm sobre ~22 cm).
- **PET, no vidrio**: velo del plástico en 0.08 (más alto = halo blanco sobre
  jamaica), brillos anchos. **Sin gotas de frío**: se veía sucia.
- Agua **casi hasta el cuello** (nivel 1.83), con física: superficie nivelada en
  el mundo, ladeo por inercia (resorte de 0.5 s, ζ 0.24, respuesta 0.4) y ola
  apenas visible. Lo quiso **discreto**: más fuerte "se sentía exagerado".
- Tapa de 28 mm con estrías y anillo de seguridad; **amarilla en maracuyá**
  (`#EBC300`, sacado de su video).
- **Pulpa dentro del shader del agua** (DDA 3D por el rayo, absorción, se asienta
  al fondo). Las partículas sueltas se veían "como confeti" y se salían de la
  botella. Chía (limón) y semilla (maracuyá) redondas; frutos rojos, piña, mango,
  melón y guanábana con **trozos grandes, pocos, irregulares y suaves**.
- 🔴 **Orden fijo de capas transparentes: agua → plástico → etiqueta.** Con el
  orden automático, en ciertos ángulos el plástico se pintaba encima de la
  etiqueta y deslavaba la botella entera.
- La etiqueta lleva un **reverso blanco** para que se vea a través de las aguas
  transparentes cuando queda atrás.

**En la página:** reemplaza la pila de la portada (que sigue de respaldo sin
WebGL, vía `html[data-botella='si']`), cambia sola de sabor cada 4.2 s con una
vuelta (el cambio ocurre de espaldas), viaja a la vitrina de Sabores y ahí la
cambian las tarjetas. **En teléfono no viaja** (pasaba encima del texto): salta
de un hueco al otro cuando la portada sale de la pantalla. three.js va en un
archivo aparte que se carga después (~123 KB gzip).

**Las tarjetas de Sabores (y la pila de respaldo) usan el ARTE REAL desde el
2026-10-18** (`EtiquetaReal.jsx`), no la etiqueta dibujada: junto a la botella
convivían dos versiones de cada etiqueta y chocaban; Zahir eligió el arte real.
Esto revierte la decisión de septiembre ("le gusta el dibujo"). El arte real sí
trae teléfono, "500 ML" y "agítese": es la etiqueta tal cual. `Etiqueta.jsx`
(la dibujada) queda solo como caída si un sabor no trae arte.

**La vitrina de Sabores va pegada (sticky)** de 980 px para arriba: cabeza y
estantes a la izquierda, botella a la derecha mientras se recorren los sabores.
Los estantes ahí ya no salen a sangre; se deslizan dentro de su columna.

**Recorrido de los clásicos** (`Recorrido.jsx`, 2026-10-18), entre la tira y
Sabores, sacado de una referencia de Zahir (grabación de un pin de Pinterest):
una escena pegada dentro de una sección de 5 pantallas; cada pantalla es un
clásico con fondo de su tono, mancha con el dibujo de línea de su fruta
(`Motivos.jsx`) y el nombre gigante (primera palabra) que la botella atraviesa.
La botella va inclinada y se endereza en cada cambio. **Solo los 5 clásicos**
(decisión de Zahir: con 14 eran 14 pantallas). Los textos son genéricos y
ciertos para todos — **no inventar descripciones por sabor**; si el negocio da
una frase real de cada uno, va en negocio.js. La botella ahora sigue TRES
huecos: portada → recorrido → Sabores.

**SANDÍA está fuera del sitio** (no tiene etiqueta real).

## REFERENCIAS: cinco versiones para comparar (rama `referencias`, 2026-10-21, commit 9be1b9c, pusheada)

Zahir: "no me encanta el diseño actual" → pasó poppi, Recess, Olipop y Ghia para
ver Natural adaptado a cada una, más una propuesta propia. **main y lo publicado
NO se tocaron.** Se abren en `/referencias/` (índice) y cada página trae abajo una
barra para brincar entre versiones. Vanilla JS + CSS, sin React; leen
`src/datos/negocio.js` y `src/lib/whatsapp.js` (todo en `src/referencias/`).

| Página | Referencia | Idea |
|---|---|---|
| `poppi.html` · Pop | drinkpoppi.com | rosa mexicano + amarillo, cinta que corre, tablero de mosaicos, gotita guiñando |
| `recess.html` · Calma | takearecess.com | degradado que cambia al bajar, nubes, letra ancha (Archivo 125) |
| `olipop.html` · Fuente de sodas | drinkolipop.com | crema + verde, Caprasimo, estampas de estrella, píldoras por grupo, gotita en el proceso |
| `ghia.html` · Sobremesa | drinkghia.com | revista, Instrument Serif en mayúsculas, listones, aparador sobre negro, vino y rosa de su etiqueta |
| `mercado.html` · Mercado | propia | papel picado, rótulos ("SE SURTE A"), pizarra "Hoy hay" que llena un vitrolero |

- **Fotos de botella** (`public/referencias/botellas/<etq>-{frente,tres,ladeada}.webp`,
  42): salen del MISMO 3D del sitio con `referencias/estudio.html` +
  `src/referencias/estudio.js`, que las manda a un middleware SOLO de desarrollo en
  `vite.config.js` (`/__guardar`). Para rehacerlas: abrir esa página con `npm run dev`
  y pasar los PNG a webp con `cwebp`.
- **Fotos de ambiente** (`public/referencias/fotos/`, 10): generadas con ChatGPT
  (`codex exec` con la foto 3D de la botella como referencia, con permiso de Zahir).
  ⚠️ Son inventadas: si una versión gana, decidir si se quedan o se reemplazan con
  fotos reales (la regla vieja era "el sitio no lleva nada inventado").
- `public/mundo/` se trajo de la rama `inicio-nuevo` (gotitas).
- Textos: se quitaron a propósito las frases que afirmaban ingredientes (siguen sin
  confirmar con la familia).

## AHORA: la botella acompaña la página (rama `galeria`, 2026-10-18)

🔴 **El refri se DESCARTÓ**: en el iPhone 16 Pro de Zahir se trababa (14
botellas, dos lienzos, pulpa por pixel). OJO: **lo publicado en
somos-natural.pages.dev todavía es el refri** hasta que se publique `galeria`.

Referencia directa: **el video de la lata de mango** (la lata cae girando en la
portada, cruza de lado junto a la información, llega a una sección a todo color
"FRESH | JUICE"). Regla de rendimiento: **UNA botella, UN lienzo**, versión
`ligera` en celular (menos caras, sin pulpa, DPR 1.5), solo se dibuja cuando se
ve.

| Archivo | Qué hace |
|---|---|
| `src/botella/escenario.js` | La botella que sigue los huecos `data-botella` en orden (`data-inclina`, `data-agarrable`); viaja entre huecos con una vuelta; entrada cayendo girando |
| `src/botella/Botella.jsx` | El lienzo fijo; carga el 3D aparte; sin WebGL no pasa nada |
| `src/botella/saborActual.js` | El sabor que te acompaña (lo elige la galería) |
| `src/componentes/Hero.jsx` | Portada: título letra por letra, botella a la derecha inclinada |
| `src/componentes/Galeria.jsx` | "Agua de \| Jamaica" a todo color, los 14 con flechas/puntos/teclado/deslizar, `/#sabor` |
| Proceso, Negocios, Eventos | Carril pegado (sticky) a un lado con la botella, alternando lados |

Los nombres de la galería: dos palabras van en dos renglones ("Frutos / rojos")
y la letra baja un escalón según la palabra más larga (`data-largo`), porque
"Frutos rojos" se cortaba en la orilla.

**Revisión de diseño con ChatGPT** (2026-10-18; capturas pasadas con
`codex exec -s read-only "prompt" -i img…`, el texto ANTES de las imágenes o
el `-i` se lo traga): se aplicó línea de "a quién y dónde" arriba del título
(`.hero-quien`), título 15% más chico, datos para el dueño de tienda (sabores,
tamaños, sin conservadores, WhatsApp), versalitas un poco más grandes y gris
más oscuro, botón "Ver los 14 sabores" en la galería y carril de 24vw. **El
giro constante de la botella se queda** (Zahir lo quiere, aunque ChatGPT sugirió
dejarla de frente en reposo).

**Galería estilo "Fruity"** (2026-10-18, referencia de Pinterest de Zahir):
fuera el círculo con el dibujo de línea ("horrible"); nombre del sabor gigante
de orilla a orilla detrás de la botella (`data-letras`), barrido de color al
cambiar de sabor, botella ENORME y en diagonal en compu (`data-inclina="0.5"`,
base hacia la derecha para no tapar los datos), y **frutas flotando**:
`public/frutas/<etq>-1.webp` y `-2.webp`, 28 imágenes **generadas con ChatGPT**
(codex exec en carpeta aislada, con permiso de Zahir; son ilustraciones de
ingredientes, no fotos del producto). Prompt de estilo: foto de producto
realista, fondo transparente, luz suave arriba-izquierda, pieza girada en el
aire. Si falta una, no se ve (onError).

Medido en compu: 60 fps estables. **Falta probar en el iPhone** (diseño de
celular sin revisar: el Chrome de la extensión no se deja achicar).

## ESCENAS: Cómo trabajamos, Tu negocio y Eventos (2026-10-18, sin commit)

Zahir: *"quiero inmersión, no un sitio web que parece del 2010"* y **NO quiere
hielera**. Diagnóstico previo: cuatro lenguajes visuales sin hablarse, la botella
de adorno en un carril sin relación con el texto, tapando la foto real y
desapareciendo antes del final. Se tomó el lenguaje de la galería y se llevó a
las secciones:

- `Escena.jsx`: sección de **una pantalla por paso**, adentro todo pegado
  (sticky). Al bajar avanza el paso: cambia el **color de toda la pantalla**, la
  **palabra gigante** detrás de la botella, la inclinación y **el sabor** de la
  botella (`data-sabor` en el hueco, escogido para resaltar sobre ese color; sin
  él vuelve el de la galería). Texto del paso abajo izq., `extra` (botones,
  prueba social) y barra de avance abajo der.
- Colores por sección y paso en `index.css` (`[data-escena][data-paso]`), sacados
  de la historia o de papeles de sus etiquetas. Proceso: rosa jamaica → vino →
  atardecer → madrugada azul. Negocios: vino hondo → olivo → amarillo tamarindo
  → tinta. Eventos: rosa fiesta → mango → verde, **con el video del paseo de
  fondo en gris + multiply al 35%** (no `z-index` en `.escena-fondo`: rompe el
  multiply).
- Palabras gigantes en UN renglón ("Esa tarde", "Del día", "Tu gente"): a dos
  renglones salían chicas.
- `escenario.js`: inclinación suavizada (`inclVista`) y aviso `alPedirSabor`.
- **Orden nuevo:** las tres escenas seguidas (Proceso → Negocios → Eventos) y
  DESPUÉS Formación (la foto real) → Dónde comprar → Pedido. Así la botella nunca
  pasa encima de una foto.
- Botón de WhatsApp con aro crema (sobre el vino desaparecía).
- Quedó CSS viejo de carriles (`.con-botella`, `.acompana*`) sin uso: limpiar.

**Galería, segunda pasada** (mismo día): fondos más antojables con
`fondoGaleria` por sabor en negocio.js (maracuyá morado de cáscara, mango rosa
"con chile", naranja verde azulado, piña verde de corona, jamaica rosa de flor —en el vino
de la marca sus flores y la botella oscura se perdían—); frutas en TRES planos con `--p` (atrás desenfocadas, en
medio nítidas, una de primer plano `f` encima de la botella), parallax con
mouse y scroll (`--mx/--my/--sy` desde Galeria.jsx) y sombra teñida del color
del sabor (la gris las hacía ver pegadas). Rehechas con ChatGPT las débiles:
`mango-2` (entero con hoja), `melon-2` (medio cantaloupe), `pina-2` (entera con
corona), `guanabana-2` (entera). webp con `cwebp` (el ffmpeg de Homebrew no
trae libwebp).

**Revisión final de ChatGPT** (1 hallazgo, real y arreglado): en pantallas
bajitas (teléfono acostado, letra grande) la capa de adelante de la escena no
cabía y lo que se salía quedaba pegado fuera de la vista. Con `max-height:
520px` las escenas dejan de ser pegadas y enseñan TODOS los pasos en lista
(la `.solo-lector`, ahora visible), sin palabra gigante. Limpieza: 58 reglas
de CSS sin uso (carriles, pasos, ventajas, retrato, franja, banda) y
`Banda.jsx` borrados.

**Revisión de ChatGPT de las escenas** (2 hallazgos, ambos reales y
arreglados): todos los pasos van en una lista `.solo-lector` para lectores de
pantalla, y `prefers-reduced-motion` apaga la entrada del paso (la regla va al
FINAL del CSS para ganar por orden).

**Teléfono** (mismo día, pedido de Zahir: "mejor distribución del texto"):
bloque al FINAL de index.css. **La botella en teléfono va GRANDE, cargada a
la esquina derecha y saliéndose de la orilla, DETRÁS del texto** (Zahir: "no
simplemente en medio… esquinada detrás del texto, que se vea más grande"); el
título y el párrafo van angostos (≈65vw) para no pasar sobre ella, los botones
sí (son sólidos). 🔴 Para eso **cada escena son DOS capas pegadas**:
`.escena-fija` (color, video, palabra gigante → detrás del lienzo de la
botella) y `.escena-frente` (texto y botones, z 46 → encima), montada con
`margin-top: -100svh`. En una sola capa no se puede: lo sticky forma su propio
grupo de apilamiento y queda entero atrás o adelante del lienzo. Los colores
del paso van en la `<section>` (`[data-escena][data-paso]`) para que los
hereden las dos capas. Texto alineado
a la izquierda y compacto, barra de avance abajo a la izquierda (el WhatsApp va
a la derecha), "De agua · Sin conservadores…" oculto en la galería, portada a
la izquierda con botella de 40svh, selector del pedido en un renglón.
🔴 Dos trampas: (1) **una sola columna explícita** (`minmax(0,1fr)`): la
palabra gigante no corta renglón y ensanchaba la columna, mandando el título a
una segunda; (2) `.escena-gigante` TAMBIÉN es `.galeria-gigante`: las reglas
de teléfono van con selector más específico (`.escena-fija .escena-gigante`,
`.galeria > .galeria-gigante`) o la de la galería se la lleva.
**Portada en teléfono** — el acomodo que Zahir eligió es SU CAPTURA del
18-oct: botella GRANDE en la esquina derecha saliéndose de la orilla (right
−20vw, 64svh) y el texto a la izquierda POR DELANTE, con los tres botones. Solo
se depuró el texto: línea corta "Aguas naturales · Zona sur de Puebla"
(`.hero-quien-largo` oculto), sin párrafo y sin la lista de datos. Luego, con
otra captura suya: **sin botones**, el texto en el mismo lugar y la botella
centrada a media altura en la orilla derecha y más grande (74vw × 78svh,
right −12vw: él la pidió un poco más a la izquierda). 🔴 **Probados y RECHAZADOS en la misma tarde, no
repetir:** botella arriba chiquita, botella mediana a la derecha, botella al
centro con la palabra gigante "Natural" detrás, portada sin botones y frutas
flotando alrededor. Lección: cuando pida "depurar", quitar texto y NO mover el
acomodo. `escenario.js` (teléfono): la botella entra a su hueco con margen de ¾
de pantalla (antes ½).
**Portada SIEMPRE con jamaica**: su hueco lleva `data-sabor="Jamaica"`; aunque
en la galería elijan otro, al subir vuelve a jamaica.
Se probó el **título en color invertido** donde la botella lo tapa (copia
recortada cada cuadro con la silueta del agua) y Zahir prefirió el título en
sus colores de siempre: se quitó. (También se probó el texto abajo a la izquierda; quedó encima de la base
oscura de la botella.)
Probado y RECHAZADO ("se ve HORRIBLE"): botella "como producto" de una idea
de ChatGPT (etiqueta fija de frente, piso con sombra y reflejo en CSS, halo
rosa, hielos y flor a sus pies). Con efectos de CSS se ve pegado y flotando.
Se regresó a la versión que sí le gustó: texto a la izquierda (centrado en
vertical), botella grande centrada a media altura en la orilla derecha
(right −12vw, 74vw × 78svh), sin botones, jamaica fija.
**Cómo verlo en tamaño teléfono** (el Chrome de la extensión no se achica):
abrir `localhost:5181/robots.txt` (mismo origen), reemplazar el documento por
un `<iframe>` de 390 px apuntando a `/` y manejar `iframe.contentWindow`.

**La parte de abajo** (mismo día): "Así salen" ahora es la foto ANCHA de la
fila de botellas (`fotos.formacionAncha`) a pantalla completa, pegada, con
acercamiento lento al bajar (`--z` 1.14→1) y velo parejo de tinta al 30% (un
velo solo arriba dejaba orilla dura). Dónde comprar y el pedido son **lienzos de
color a sangre** (`.lienzo-rosa`, `.lienzo-vino`) con título gigante
(`.cabeza-gigante`; títulos acortados: "La más cercana.", "Arma tu pedido.").
Las tiendas van como etiquetas con ↗; el armador en panel hueso sobre el vino y
cada sabor lleva su **etiqueta real en miniatura** en vez de la gota de color.

## (Descartado) La portada era el refri (rama `refri`, 2026-10-18)

Zahir no quería tarjetas ni "solo scrollear": quiere **experiencia**. Se armaron
dos prototipos (`configurador.html` y `refri.html`, código en
`src/prototipos/`, NO se publican) y **eligió el refri**. Plan en 3 partes:
**(1) refri como portada + pantalla del sabor — HECHA**, (2) ~~hielera~~ (se
descartó: la presentación es solo para ver y el pedido sigue en el armador),
(3) limpieza — HECHA: quitar recorrido,
estantes y el armador viejo; dejar Cómo trabajamos, Tu negocio, Eventos y Dónde
comprar abajo.

| Archivo | Qué hace |
|---|---|
| `src/botella/modelo.js` | La botella como pieza (geometría, agua, pulpa); la usan el motor viejo, el refri y los prototipos |
| `src/refri/escena.js` | El refri 3D con sus 14 botellas y la botella elegida. **Dos lienzos** (ver abajo) |
| `src/componentes/RefriPortada.jsx` | Portada (texto + refri), pantalla del sabor, rutas `/#sabor`, teclado, hielera |

**Ajustes del 2026-10-18 (noche), pedidos por Zahir:**
- Botellas a **0.8** en el refri (a 0.6 "se veían muy pequeñas") y **refri
  pulido**: cuerpo vino con esquinas redondeadas y barniz, letrero iluminado,
  puerta de vidrio con brillo en diagonal y jaladera cromada, tiras con el
  nombre del grupo en cada repisa, LED, rejilla y patitas (todo en `escena.js`,
  texturas pintadas en canvas, sin imágenes).
- **La pantalla del sabor es SOLO para ver** (nada de tamaño, dulzura ni
  hielera ahí; el pedido vive en su sección). Se quitaron la hielera y el
  garrafón del sitio (siguen en los prototipos).
- **Presentación, no otra pantalla**: el fondo del sabor es translúcido con
  `backdrop-filter: blur`, así el refri se queda detrás desenfocado. La botella
  **gira sola** (0.55 rad/s), flota apenas y se puede agarrar. Se avanza con
  flechas, puntitos, teclado o deslizando; se cierra con la X, tocando afuera o
  Esc.

**2ª ronda (2026-10-18, más noche):** se quitó el letrero "Somos Natural"
del refri (la cabeza va lisa), botellas a **0.92**, y **la presentación dejó de
ser una capa encima**: ahora es la sección `#sabor`, justo abajo del refri, en
el flujo de la página. Tocar una botella desliza la página hasta ahí (scroll
propio de 1.2 s, `deslizarA`) y la botella sale de su repisa y baja con el
scroll dando una vuelta (`bajada` en `escena.js`). Subir la regresa. Siempre
hay un sabor "actual" (al principio, jamaica).

**Limpieza (parte 3, 2026-10-18):** se borraron la portada vieja (pila),
el recorrido de los clásicos, las tarjetas de sabores con su vitrina, la
sección Sabores entera (estantes, franja, tamaños/dulzura), la botella del
sitio viejo (`motor.js`, `Botella3D.jsx`, `canal.js`, `orden.js`), la gotita
con aro y los prototipos (`configurador.html`, `refri.html`,
`src/prototipos/`). La barra de arriba ya **solo lleva el sello**, sin el
nombre escrito. Orden de la página hoy:

```
Refri (portada) → Sabor (#sabor) → Tira → Cómo trabajamos → Formación →
Tu negocio → Eventos → Dónde comprar → Pedido (armador) → Pie
```

**Las capas (no cambiarlas a la ligera):** el nombre gigante y la mancha van
DETRÁS de la botella y los textos ENCIMA, y la botella viaja desde el refri.
Por eso: `.lienzo-refri` (z 3) → fondo/mancha/nombre de la sección (flujo) →
`.lienzo-botella` (z 65, solo la del sabor) → textos y controles (z 70) →
encabezado (z 80). Al
elegir, la botella pasa de una escena a la otra conservando su lugar en el
mundo (misma cámara). Los lienzos no reciben clics: se escucha en los huecos.

Detalles: mientras carga el 3D se enseña un refri dibujado con CSS; sin WebGL,
ese refri lleva las etiquetas como botones. Los 14 sabores existen como botones
reales (`.refri-lista`, visibles al llegar con teclado). Esc cierra, flechas
cambian de sabor, atrás del navegador cierra. En teléfono la pantalla del sabor
se desliza y el nombre gigante sube con ella (`--desliza`).

🔴 **La Mac no distingue mayúsculas**: `hielera.js` y `Hielera.jsx` (o
`configurador.jsx` y `Configurador.jsx`) son el MISMO archivo. Ya pasó dos veces.

## Movimiento

Se agregó el 2026-09-04 porque el sitio quieto se sentía genérico. **Todo el movimiento
sale del vocabulario de la marca**; no hay efectos prestados.

| Qué | Dónde | Por qué es suyo |
|---|---|---|
| **La gotita en su aro** | Portada | Su logo YA es un timbre redondo y sus etiquetas ya traen texto en arco: el personaje y el aro son la misma idea |
| **La pila rota** sola cada 3.2 s | Portada | Tres papeles a la vez; la de adelante se va al fondo. Enseña los 15 sin llenar la primera pantalla de tarjetas |
| **Las hojas se dibujan** al entrar en pantalla | Cada etiqueta | La línea botánica es de la etiqueta de Jamaica; dibujarla la vuelve gesto |
| **Revelado en cascada** | Todo el sitio | Quita lo estático sin agregar adorno |
| **Calcomanía** (gira y se tiñe al pasar el mouse) | Tarjetas de sabor | Trata cada tarjeta como lo que es: una etiqueta pegada |

La **tira ya no corre** desde el 2026-09-06 (ver "Retro de etiqueta, no de hamburguesería").
Sigue ahí, pero quieta. "Agítese antes de beber" se quitó el 2026-09-05 por la misma razón
que de las etiquetas; en su lugar va el reparto en la zona.

Reglas del movimiento:

- **`[data-revelar]` + `useRevelar()`**: UN solo `IntersectionObserver` para todo el sitio,
  y cada elemento se deja de observar al entrar. Nada se re-anima al volver a subir.
- La cascada se hace con `:nth-child()` en CSS, **no** con un índice inline, para no romper
  la regla de cero estilos en el JSX.
- Las hojas usan `pathLength="1"`: así el trazo se anima sin conocer el largo real de cada
  curva y todas se dibujan al mismo ritmo.
- **`prefers-reduced-motion` se respeta con criterio**, no a martillazos. Se apaga lo que
  se mueve solo y lo que entra; se conservan los cambios de color al pasar el mouse, que
  no son movimiento y sí dan respuesta. (Antes había un `* { animation: none !important }`
  que hoy habría matado el diseño entero.)
- El texto del aro está calibrado para que **una sola vuelta ≈ la circunferencia**. Si se
  cambia la frase o el tamaño de letra, hay que volver a mirarlo: si sobra, se corta a
  media palabra en la costura.

## Datos

**Todo lo editable vive en `src/datos/negocio.js`.** No hay que tocar componentes para
cambiar teléfono, sabores, tamaños ni zona.

- **WhatsApp:** `522224422840`. ⚠️ El `MENÚ-3.pdf` del Instagram trae **otros dos números**
  (222 162 2676 y 951 509 5973). Se usa este porque Zahir lo confirmó y es el que va
  impreso en las etiquetas. **Falta decidir si los otros dos siguen vivos.**
- **Zona:** la zona sur de Puebla.
- **Mínimo:** 10 aguas. No bloquea el envío, solo avisa cuánto falta. No aplica a garrafón.
- **Precios: APAGADOS** a pedido del negocio (2026-09-04). Su propio menú tampoco los
  publica y los del ERP son de abril de 2025. Volver a ponerlos exige recuperar el bloque
  de precio en `Negocios.jsx` y el cálculo en `Pedido.jsx`, no solo cambiar un dato.
- **Ingredientes: APAGADOS** (`mostrarIngredientes = false`). Los datos siguen en el
  archivo. Salían de las recetas del ERP y **nunca los confirmó la familia**; si se
  reactivan, hay que confirmarlos primero: es una declaración pública sobre comida.

### Catálogo

Sale del **`MENÚ-3.pdf`** que el negocio comparte por Instagram, no del ERP.

| Grupo | Sabores |
|---|---|
| Los clásicos | Jamaica, Horchata, Maracuyá, Tamarindo, Limón pepino y chía |
| Especiales | Café, Chocolate, Frutos rojos, Vainilla |
| Por temporada | Naranja, Melón, Piña, Sandía, Mango |

Tamaños: 250 ml · **500 ml (el de la etiqueta)** · 1 L · Garrafón 20 L
Dulzura: con azúcar · poca azúcar · stevia · sin azúcar

**Diseños reales conocidos: 14 de 15.** Los 7 primeros salieron del arte en `~/Downloads`;
los 7 siguientes los mandó Zahir el 2026-09-04 desde Canva.

| Sabor | Papel | Tinta | Letra | Trazo |
|---|---|---|---|---|
| Jamaica | blush | vino | groovy | centro + **rincones** |
| Horchata | hueso | azul marino | serif | centro |
| Café | crema | terracota | bold | esquinas |
| Tamarindo | amarillo pálido | café | serif | centro |
| Maracuyá | olivo oscuro | crema | redonda | arco |
| Naranja | crema | naranja | serif | arco |
| Limón, pepino y chía | crema | verde | serif | arco |
| Chocolate | café muy oscuro | crema | bold | arco + **goteo** |
| Frutos rojos | vino oscuro | crema | groovy | arco |
| Vainilla | casi negro | oro | serif | **sello rectangular** |
| Mango | naranja con **ondas** | crema | redonda | arco |
| Piña | verde pálido, fruta **sembrada** | crema | redonda | arco |
| Melón | salmón | negro | **fina** | arco |
| Guanábana | verde salvia | verde hondo | redonda | **sello** |

**SANDÍA está FUERA del sitio desde el 2026-10-17** (pedido de Zahir): nunca tuvo etiqueta real y él no la tiene. Su receta quedó comentada al final de `sabores` en `negocio.js`; se devuelve cuando la diseñen. El sitio queda en 14 sabores.

**Pulido del 2026-09-04**, después de comparar contra el arte real:
la jamaica pasó de arco a nombre recto con **ramas finas en las cuatro esquinas** y el centro
limpio (su etiqueta no lleva dibujo al centro); el chocolate ganó el **chorreado arriba y las
barras abajo**, que es lo que lo hace reconocible más que el color; la vainilla dejó el sello
redondo por una **estampilla festoneada rectangular** con todo el texto adentro y la botánica
alrededor; y los dibujos de horchata, tamarindo, maracuyá y frutos rojos crecieron, porque
iban tan chicos que se leían como una mancha detrás de la firma.

**GUANÁBANA se dio de alta** como sabor de temporada el 2026-09-04: tenía etiqueta y no
estaba en el menú.

> 🚫 **TARO está DESCONTINUADO. No darlo de alta.** Existe `Agua de taro.png` en
> `~/Downloads` y es una etiqueta bonita, pero **el negocio ya no lo maneja** (confirmado el
> 2026-09-04). Nunca estuvo en el sitio ni en el catálogo del ERP; el archivo suelto es lo
> único que queda. Si aparece de nuevo la tentación de agregarlo, la respuesta ya está dada.

(Las carpetas `mexcali etiqueta*` son de otra marca, de mezcal: no tocarlas.)

> ⚠️ **El menú y el ERP no cuadran.** El ERP no conoce "Limón, pepino y chía" ni "Sandía",
> y tiene Melón y Piña apagados por no venderse. **Falta cuadrar los dos catálogos**; si no,
> el sitio ofrece cosas que el sistema no sabe cobrar.

## Puntos de venta

Sección `Puntos.jsx` (id `puntos`), entre Formación y Tu negocio, agregada el 2026-09-06.
Responde la pregunta que el sitio no contestaba: **el pedido por WhatsApp pide mínimo 10, así
que quien quiere una sola no tenía a dónde ir.** El aviso "faltan N para el mínimo" del
armador ahora enlaza aquí, y el pie también.

**De dónde salen los datos.** Del PDF `Puntos de venta` que el negocio comparte en su historia
destacada de Instagram **📍Donde comprar** (el botón CLICK del segundo cuadro). Se abre desde
Instagram con sesión iniciada, se copia el enlace de Drive y se baja el PDF; `pdftotext` da los
nombres y `pypdf` saca de cada página la anotación `/URI` con su enlace de Google Maps.

- Son **19 en el PDF y 12 en el sitio.** El de la página 6 viene rotulado solo como "super" y
  su enlace apunta a un punto del mapa sin ficha de negocio: **falta preguntarle su nombre.**
  Y el 2026-09-06 Zahir dio de baja cinco que ya no las venden —Colegio Miguel Hidalgo,
  Miscelánea Nachito, Miscelánea de la 10, Minisuper Ricky's y Miscelánea Never— y confirmó
  que **Super Sanm y Miscelánea Tity eran el mismo local** (compartían coordenadas exactas):
  se quedó Tity.
- 🔴 **Al dar de baja un punto hay que rehacer el encuadre del mapa**, porque se calcula a
  partir de los que quedan. Nachito era el más al norte; sin recalcular, el mapa se quedaba
  con un hueco arriba.
- **No hay colonias.** Google solo devuelve dirección completa en tres de los diecinueve, y
  poner la colonia de unos sí y de otros no se lee como error, igual que pasó con "de agua"
  en las tarjetas de sabor. Ni Nominatim ni el HTML de Maps sirven: Puebla no tiene las
  colonias mapeadas en OpenStreetMap y Google bloquea la lectura directa.
### El mapa: primero el de Google, y el dibujado de respaldo

**Manda el de Google.** El 2026-09-06 Zahir pidió cambiarlo: *"creo que sería más rápido y más
sencillo para los clientes"*, porque la gente ya sabe usar Google Maps, puede navegar desde
ahí y él edita las tiendas sin tocar código. Se creó un **Google My Maps** importando un CSV
con los doce puntos y sus coordenadas —así no hubo que poner pin por pin— y su dirección vive
en `mapaGoogle` (negocio.js). Si ese campo se vacía, el sitio vuelve solo al mapa dibujado.

- 🔴 **Google entrega la dirección con `/u/1/`**, que es la segunda cuenta de quien lo creó, y
  así **redirige (302) a quien no tenga esa sesión**. Hay que quitarlo: sin `/u/1/` responde
  200 y se ve sin iniciar sesión. Comprobado con curl.
- `ehbc` pinta la barra del mapa. Va la **tinta** de la marca (`2B181D`), la misma del pie. No
  un color claro: Google escribe su texto en claro encima y con el crema no se leía.
- Con el de Google la sección cambia de acomodo (`.puntos-caja-ancha`): **mapa a lo ancho
  arriba y lista debajo en dos columnas**. Un mapa de Google en columna angosta y vertical se
  lee apretado. El dibujado sí va al lado, porque es vertical de origen.
- **Google resuelve de paso lo de las colonias**: su mapa ya las rotula. El campo `colonia` de
  `puntosDeVenta` solo hace falta si algún día se quieren también en la lista de texto.

**Cómo quedó personalizado el My Maps** (2026-09-06, hecho desde el navegador):

| Qué | Cómo |
|---|---|
| Título | "Somos Natural · Dónde comprar", con descripción y el WhatsApp |
| Capa | "Puntos de venta" (venía con el nombre del CSV) |
| Etiquetas | El **nombre de cada tienda** se ve sobre su pin, sin tener que tocarlo |
| Icono | **El sello de la marca**, apuntando a `somos-natural.pages.dev/img/logo.png` |
| Vista | Guardada centrada en los doce puntos |
| Mapa base | El **normal**. Se probó el claro y pierde las calles, que son la referencia |
| Barra negra | **Recortada** en el sitio (no en My Maps): a Zahir no le pegaba con el diseño |
| Ficha del pin | Solo el nombre y el botón de direcciones, porque los puntos vienen de un KML |

> 🔴 **El icono depende de que el logo siga publicado en esa dirección.** Si se renombra o se
> borra `public/img/logo.png`, los pines se quedan sin icono.
>
> ⚠️ **En el menú de la capa, "Eliminar esta capa" está pegado a "Abrir tabla de datos" y el
> orden cambia.** Un clic a ciegas ahí borra los doce puntos. Si hay que rehacerlos, el CSV
> para reimportar se genera desde `puntosDeVenta` (está en el Escritorio como
> `somos-natural-puntos-de-venta.csv`).
>
> **La ficha del pin: por qué se veía a tabla vieja y cómo se arregló** (2026-09-06). Al tocar
> un pin, My Maps abre una ficha con **una línea por cada columna de datos**. Con el CSV eran
> cinco —Nombre, Latitud, Longitud, Colonia, Descripcion— y parecía una hoja de cálculo. La
> ficha **no se puede desactivar**: es cómo funciona el producto. Lo que sí se puede es
> dejarla con **solo el nombre y el botón de direcciones**, y así quedó.
>
> **La solución fue reimportar los puntos como KML.** Un KML con solo `<name>` y `<Point>`,
> **sin `ExtendedData`**, no trae columnas, así que no hay nada que listar. El archivo se
> genera desde `puntosDeVenta` y está en el Escritorio como
> `somos-natural-puntos-de-venta.kml`.
>
> El procedimiento, por si hay que repetirlo: capa nueva → Importar el KML → cambiar
> "Estilos individuales" a **Estilo uniforme** → **Establecer etiquetas: nombre** → aplicar el
> icono del logo (queda guardado en "Otros iconos") → comprobar la ficha ocultando la capa
> vieja → borrar la vieja.
>
> El otro camino, borrar las columnas en "Abrir tabla de datos", **no se puede desde la
> extensión de Chrome**: esa tabla se abre en una ventana aparte que no entra en el grupo de
> pestañas, y no hay URL directa (`/maps/d/u/1/datatable?mid=…` da 404).
>
> 🔴 **En el mapa INCRUSTADO la ficha se comporta peor que en el visor completo**
> (2026-09-06): se abre como un panel que **tapa la mitad del mapa**, lista la columna
> `nombre` con su encabezado y **no trae el botón de direcciones**. Es decir, desde el sitio
> no hay forma de arrancar la navegación tocando un pin.
>
> La salida es meter el enlace nosotros: el KML lleva en cada `<description>` un
> `<a href="https://www.google.com/maps/dir/?api=1&destination=LAT,LON">Cómo llegar</a>`
> dentro de CDATA. **Ya está aplicado**: la ficha muestra el nombre y un enlace que abre la
> navegación hacia esa tienda.
>
> ⚠️ **My Maps NO acepta enlaces con texto propio.** Al importar el KML degrada el `<a>` a
> texto plano y deja `Cómo llegar (https://…)`, con la dirección a la vista. Y si se escribe
> el HTML a mano en el editor de la descripción, lo **escapa** y enseña las etiquetas
> literales, que es peor: se probó el 2026-09-06 y se revirtió. La dirección visible es el
> precio de que haya enlace; la alternativa es una ficha limpia sin forma de navegar.
>
> ⚠️ **Subir ese archivo NO se puede desde la extensión de Chrome.** El importador de My Maps
> abre el selector de archivos de Google (un componente aislado del resto de la página), y ahí
> no hay ningún `input type="file"` que se pueda alcanzar. Lo mismo pasó con el icono
> personalizado, que sí se pudo solo porque acepta una URL en vez de un archivo.

> ⚠️ **El visor público tarda en reflejar el borrado de una capa.** Justo después de eliminar
> la vieja, `/maps/d/viewer` seguía enseñando las dos; el editor ya tenía una sola. Es caché:
> no hay que volver a borrar nada.

### La barra negra del embed va recortada

El iframe de My Maps trae una barra negra arriba con el título, el aviso "Este mapa se hizo
con Google My Maps" y los botones de compartir y pantalla completa. **No pega con el sitio y
no hay parámetro para quitarla**, así que se recorta: la caja `.mapa-google` lleva `overflow:
hidden` y el iframe se sube 60 px siendo 60 px más alto (`--barra`). No se tapa con nada
encima, se recorta de verdad.

- **La atribución de Google se conserva**, que es lo que sus términos exigen: su logo, "Datos
  del mapa ©INEGI" y el enlace a Condiciones viven DENTRO del área del mapa, abajo, y no se
  tocan. Lo recortado es el título (que ya lo dice la cabeza de la sección) y sus dos botones.
- El de pantalla completa se repone con el enlace **"Abrir el mapa completo"** debajo del
  mapa, que apunta a `mapaGoogleVer` y lo abre en Google Maps.
- Si algún día Google cambia el alto de esa barra, se ajusta `--barra`.

### El mapa dibujado (respaldo)

`Mapa.jsx` dibuja **las calles de verdad reducidas a líneas**, con los puntos encima. El
nombre no se rotula sobre el dibujo: vive en la lista de al lado. Se hizo porque un Google
Maps incrustado pide llave de API, pesa y se ve igual que el de cualquier otro sitio; sigue
sirviendo si algún día se quiere volver a él.

**De dónde salen las calles.** De OpenStreetMap, con la API de Overpass, el recuadro
`(18.968, -98.252, 19.068, -98.166)` y las vías `motorway|trunk|primary|secondary`. Vienen
1893 tramos sueltos; el guion los **une por sus extremos** (OSM parte cada calle en decenas de
pedazos), los pasa por **Douglas-Peucker** con épsilon 2.2 y los guarda como recorridos
relativos en enteros. **De 46 KB a 8 KB**, 314 recorridos. Todo vive ya resuelto en
`src/datos/mapa.js`; no hay dependencia de mapas ni llamadas en vivo.

- La posición de cada punto sale de **las coordenadas de su enlace de Google Maps**. La llave
  de `marcas` es el mismo `nombre` de `puntosDeVenta`: si no coincide, ese punto no se dibuja
  y el sitio lo aguanta.
- **Ocho avenidas rotuladas** (`calles` en `mapa.js`), no las 152 que traen nombre: el mapa es
  para ubicarse, no para navegar. Van abreviadas como se dicen —"Juan Pablo II", "11 Sur",
  "Valsequillo"—, siguen el giro de su calle y llevan un halo del color del papel
  (`paint-order: stroke fill`) para leerse encima del trazo sin taparlo con una caja.
  El sitio de cada rótulo **no es el punto medio de la calle**: se prueban 41 puntos a lo
  largo de su tramo y gana el que quede más lejos de los otros rótulos, de los puntos de venta
  y de los bordes. Con el punto medio, "Juan Pablo II" se cruzaba encima de "Héroes del 5 de
  Mayo" y Valsequillo salía cortado por abajo.
- 🟡 **Las colonias NO están todavía, y no por descuido.** Ayudarían más que las calles —la
  gente dice "vivo en San Manuel", no "vivo en la 24 Sur"— pero no se pueden sacar solas:
  - Con `place=neighbourhood|suburb|quarter`, OpenStreetMap devuelve **tres** en toda la zona
    y las tres caen fuera del encuadre.
  - Ampliando a `landuse=residential`, `place=*` de cualquier tipo y límites administrativos
    de nivel 9-11, salen **trece** dentro del encuadre, **pero casi todas en la mitad sur**,
    donde casi no hay puntos de venta. Tras descartar las que chocan con un punto o con un
    nombre de avenida, **sobreviven dos**. Dos colonias sueltas se ven peor que ninguna.
  - Las colonias de la zona donde SÍ están los puntos —Jardines de San Manuel, Bugambilias,
    El Patrimonio, Infonavit La Margarita— **existen en Google Maps y no en OpenStreetMap**.
  - Google devuelve la colonia en tres de los diecinueve puntos; Nominatim, en ninguno.

  **Así que las dicta la familia.** `puntosDeVenta` ya trae el campo `colonia`, con las tres
  que se pudieron verificar (La Hacienda, Arboledas de Loma Bella, 22 de Septiembre) y nueve
  vacías. `Puntos.jsx` las enseña **solo cuando las doce están llenas** (`hayColonias`):
  mostrar la colonia de unas sí y de otras no se lee como un error, igual que pasó con "de
  agua" en las tarjetas de sabor.
- **La atribución a OpenStreetMap es obligatoria** (ODbL) y va en el pie del mapa.
- 🔴 **Nunca `overflow: visible` en el SVG del mapa.** El archivo trae calles fuera del
  encuadre; con overflow visible se salían del marco por la izquierda y se dibujaban encima
  del título. El encuadre ya deja 95 unidades de aire alrededor de los puntos.
- El mapa es **pegajoso** de 900 px para arriba: la lista es casi el doble de alta y sin eso
  quedaba un hueco enorme a su lado.
- **Señalar un renglón enciende su punto y al revés.** El apagado va en la lista entera y en
  el grupo de pines, **no en cada renglón**: al saltar de uno a otro el `mouseleave` del
  anterior no siempre llega y se quedaban dos encendidos.

Para rehacerlo hay que volver a consultar Overpass con ese recuadro y reproyectar. Si cambia
un enlace de Google Maps, hay que rehacer su marca.
- La lista va en **una columna** cuando el mapa está al lado, y en **dos** cuando el mapa se
  va arriba. Nunca en tres: "Vinos y Licores San Manuel" no cabía en un renglón junto a su
  enlace y dejaba un escalón en toda esa fila.
- El PDF es de **marzo de 2026**. Conviene confirmar la lista antes de cada temporada.

## Lo que dice su Instagram

Revisadas las cinco historias destacadas el 2026-09-06. Esto es voz del propio negocio y
**sirve para no inventar nada**; lo que todavía no está en el sitio queda anotado.

**💡 Dudas** — seis preguntas con su respuesta:

| Pregunta | Respuesta |
|---|---|
| ¿Son 100% naturales? | Sí, fruta fresca y nada artificial |
| ¿Puedo pedir para eventos grandes? | Sí, con anticipación |
| ¿Surtimos a negocios? | Sí, tiendas, cafeterías y más |
| **¿Cuánto duran?** | **Refrigeradas, de 5 a 7 días** |
| ¿Tienen opciones sin azúcar? | Sí, sin azúcar y con stevia |
| ¿Son aptas para toda la familia? | Sí, clásicas y saludables sin azúcar |

> **"De 5 a 7 días refrigeradas" no está en el sitio y debería.** Proceso dice "se echan a
> perder rápido" sin decir cuánto duran, que es justo lo que el cliente quiere saber.
> Falta confirmarlo con la familia antes de publicarlo: es una declaración sobre comida.

**🥳 Celebra** — el flujo de eventos tal como ellos lo cuentan: mándanos DM → cotiza tu
paquete → selecciona tus sabores → **aparta con un anticipo**. Cierra con "escríbenos ya y
reserva tu fecha".

> **El anticipo tampoco está en el sitio.** Eventos dice "apartas la fecha" y ya. Falta saber
> de cuánto es y con cuánta anticipación, que era un pendiente viejo.

**🤝 Haz equipo** — el argumento a los negocios: "¿Tienes una tienda, cafetería o negocio?
Haz equipo con nosotros. Escríbenos por DM para más info". Es lo mismo que dice la sección
Tu negocio, con otras palabras.

**❤️ Familia Natural** — reposts de clientes reales sosteniendo las botellas, etiquetando
`@somos_natural_mx`. Uno de ellos dice **"Las mejores aguas de sabores de Puebla"**.

> 🟡 **Aquí SÍ hay testimonios reales.** La regla de "nada inventado" no los prohíbe: prohíbe
> inventarlos. Si el negocio quiere ponerlos, hay que **pedir permiso a cada persona** antes,
> porque son cuentas de gente real. Decisión pendiente de Zahir.

> En un repost aparece una botella de **agua de taro**. Confirma que existió, pero **sigue
> descontinuado**: no darlo de alta.

## Orden de las secciones

Revisado el 2026-09-06 con criterio de venta. Queda así:

```
Portada → Tira → Sabores → Proceso → Formación → Tu negocio → Eventos → Dónde comprar → Pedido
```

- La portada engancha a los tres públicos con sus tres botones; **Sabores** enseña el producto
  y **Proceso** da el argumento (por qué son distintos). Eso vale para todos.
- Después van **los dos caminos por los que el negocio cobra**: tiendas y eventos. Tu negocio
  es el cliente fuerte, así que va primero.
- **Dónde comprar** se movió detrás de ellos y **justo antes del armador**, porque es la
  salida para quien no llega al mínimo: el aviso de "faltan N" enlaza ahí mismo.

**Prueba social en Tu negocio** (2026-09-06): una línea antes del botón dice cuántos negocios
las venden hoy y enlaza a la lista. Sale de `puntosDeVenta.length`, así que **se actualiza
sola** al dar de alta o de baja una tienda, y si un día no hubiera lista, la frase no aparece.
Para el siguiente dueño, "estos ya nos venden" pesa más que cualquier promesa.

**"Dónde comprar" entró al menú** el 2026-09-06 (pedido de Zahir). Con eso son seis enlaces
y ya no caben desde 900 px: la marca y el botón llevan `flex-shrink: 0`, así que el menú los
empujaba fuera y "Somos Natural" se partía en dos renglones. Se recuperó espacio con hueco
menor y **versalitas menos abiertas solo por debajo de 1200 px**; de ahí para arriba el menú
vuelve al espaciado de la marca. El menú aparece desde **980 px**.

## Estructura

```
src/
  datos/negocio.js        ← TODO lo editable
  datos/mapa.js           ← las calles dibujadas y dónde cae cada punto de venta
  lib/whatsapp.js         ← arma los enlaces wa.me; devuelve null si no hay número
  componentes/
    Etiqueta.jsx          ← dibuja la etiqueta según la receta del sabor
    Motivos.jsx           ← los 14 dibujos de línea, uno por fruta
    Arco.jsx              ← texto curvado, se achica según su largo
    Estante.jsx           ← una fila de sabores que se desliza de lado (flechas solo si desborda)
    Puntos.jsx            ← dónde comprar una sola botella
    Mapa.jsx              ← el mapa dibujado (datos en datos/mapa.js)
    Encabezado.jsx  Portada.jsx  Tira.jsx  Sabores.jsx
    Proceso.jsx     Negocios.jsx Eventos.jsx  Pedido.jsx
    Pie.jsx         Flotante.jsx Iconos.jsx
public/img/
  logo.png                ← el sello morado con la gotita
  fotos/                  ← 5 fotos ya recortadas y comprimidas (ver abajo)
```

### Fotos

Llegaron por AirDrop el 2026-09-04: **96 fotos y 8 videos**, `IMG_4632`–`IMG_4740`, en
`~/Downloads`. Son cuadradas de 6048×6048 y todas siguen el mismo lenguaje: una mano
sosteniendo la botella contra plantas y flores, a plena luz.

> ⚠️ **Buscarlas por fecha de modificación NO funciona.** El AirDrop conserva la fecha
> original de la foto, así que un `find -newermt` no las ve aunque Finder las muestre en
> "Hoy" (Finder ordena por *fecha de incorporación*). Buscar por nombre: `IMG_4[5-7]*`.

Las 5 elegidas y para qué:

| Archivo | Original | Dónde | Por qué esa |
|---|---|---|---|
| `formacion-ancha.jpg` | 4733 | Franja al cerrar Sabores | La fila de botellas ya es una composición horizontal: es la única que aguanta el corte ancho |
| `formacion.jpg` | 4740 | Sección propia tras Proceso | Jamaica y horchata con gotas de frío. Se cambió la fila de botellas para no repetirla dos veces en la misma página |

Se convierten con `sips` (HEIC→JPEG) y se recortan con PIL. Ninguna pasa de 225 KB.

**Tratamiento de foto — la regla es una sola: NINGUNA foto flota dentro de una caja.**

Se llegó aquí en dos intentos. El primero fue un recuadro con marco de 1 px: se veía pegado.
El segundo quitó el marco y recortó en arco: **se seguía viendo pegado**. La conclusión, y
la regla del proyecto:

> **Un recuadro con aire alrededor se lee como calcomanía, con marco o sin él. Lo que
> integra una foto es la ESCALA, no la forma.** El arco no arregla nada; sangrar hasta el
> borde de la pantalla sí.

- **Franja** (`.franja`): UNA foto ancha, de borde a borde y **en silencio** —sin velo, sin
  texto, sin marco— cerrando Sabores. Es el remate: después de quince etiquetas dibujadas,
  las botellas de verdad, todas juntas.

  > 🔴 **Aquí hubo cuatro fotos cuadradas en cuatro columnas y se veían pésimas.** Dos
  > causas. La tonta: `figure img { object-fit: cover }` **no alcanzaba a imágenes que no
  > viven dentro de un `<figure>`**, así que quedaban sin `object-fit` y sin tamaño, y el
  > navegador usaba el atributo `height="700"` del HTML contra un ancho de columna de 360:
  > las **estiraba**. Las reglas ahora apuntan al elemento (`.foto img`), no al padre.
  > La de fondo, y la que importa: **una foto cuadrada con una botella vertical no sobrevive
  > una banda horizontal**, por bien recortada que esté. Solo aguantan las fotos cuya
  > composición ya es horizontal — la formación de botellas en fila.
- **Banda** (`.banda`) de borde a borde con la frase encima. Es el formato que el negocio
  aprobó explícitamente al verlo con video.
- **Retrato** (`.retrato`): la foto **sale por el borde izquierdo** de la pantalla y el texto
  se queda alineado con el resto de la página. Por eso `Formacion.jsx` **no va dentro de
  `.marco`**, y el texto lleva su propio
  `padding-right: max(1.15rem, calc((100vw - var(--ancho)) / 2 + 1.15rem))`.
- **Lavado cálido** (`.foto`): velo de `--crema` en `soft-light` al 50% más `saturate(.94)`,
  para que los blancos de la foto casen con el papel.

## Videos

`ffmpeg` se instaló con Homebrew el 2026-09-04. Los 8 originales son **4K, 3–17 s**, de 6 a
81 MB, y **todos son verticales menos `IMG_4675`**.

- **En el sitio va uno solo:** `public/video/paseo.mp4` ← `IMG_4675`, recortado a 5:3,
  1600×960, sin audio, CRF 30. **7.1 MB → 447 KB.** Reemplazó a la foto en la banda de
  Eventos. Va `autoPlay muted loop playsInline` con `paseo.jpg` de cartel para que no
  parpadee en negro.
- Los otros 7 quedaron comprimidos en `~/Downloads/videos-web/` (205 MB → 6.3 MB en total),
  disponibles pero **sin usar**. No meterlos al repo hasta que tengan un lugar.

Receta: `ffmpeg -i X -vf "crop=…,scale=…,fps=30" -an -c:v libx264 -profile:v main
-pix_fmt yuv420p -crf 30 -preset slow -movflags +faststart`.

## La gotita

El personaje (`public/img/gotita.png`) salió de `Gemini_Generated_Image_t4mjzbt4mjzbt4mj.png`
en Downloads. Es rubber-hose de los años 30, que cae justo en el registro retro del sitio.

> El fondo blanco se quitó con **relleno por inundación desde los bordes**, no borrando todo
> el blanco: los guantes y los ojos también son blancos y se habrían perdido.
> Después se cuantizó a 128 colores: **234 KB → 35 KB**, sin pérdida visible (es dibujo plano).

Un solo dibujo, tres apariciones:

| Dónde | Cómo |
|---|---|
| **Portada** | **Dentro de su aro de texto giratorio**, en la esquina de abajo a la derecha |
| **Panel del pedido** | Asomada por arriba, volteada |
| **Pie** | Silueta con `mask`, al 13% — atmósfera, no calcomanía |

> **Se probó teñir la gotita del color del sabor (`hue-rotate`) y el negocio lo rechazó.**
> No reintroducirlo. El personaje se queda con sus colores. `src/lib/color.js`, que calculaba
> el giro, se borró junto con el efecto.

> **Eran dos personajes y ahora es uno** (2026-09-04). La portada tenía el timbre redondo
> —que ya traía la gotita chiquita dentro del logo— **y** la gotita de cuerpo entero: el mismo
> personaje dos veces. Se fusionaron en `GotitaSello.jsx`. Dos cosas que importan del ajuste:
> la figura mide **82% del alto del aro**, no más, porque con sus adornos salía más ancha que
> el aro y le tapaba el texto; y va **abajo a la derecha, por debajo de la línea de la firma**,
> porque a la altura del centro se montaba encima de "NATURAL" y le comía la L.
>
> **La gotita NO flota.** Se le quitó el balanceo a pedido del negocio (2026-09-04): el único
> movimiento de la pieza es el aro girando. No reintroducir el `respirar`.

> **Hubo una cuarta, el caminante** (cruzaba brincando la línea entre Sabores y Proceso), y se
> quitó el 2026-09-06: era la aparición más caricaturesca y jalaba al retro de hamburguesería.
> Si algo vuelve a animar al personaje con dos movimientos a la vez, van en dos elementos:
> en el mismo se pisarían porque los dos usan `transform`.

> ⚠️ En Downloads hay otras dos `Gemini_Generated_Image_*`: una es una **foto de producto
> generada por IA** —NO usarla, el sitio no lleva nada inventado— y la otra es una foto
> familiar de Zahir.

## Stack y despliegue

React 19 + Vite 6, sin router (una sola página con anclas) y sin dependencias de más.
`public/_redirects` ya trae el fallback de SPA para **Cloudflare Pages**, que es a donde va.

**Repo en GitHub desde el 2026-09-06:** `zahirdanielvidahurrazaga/somos_natural` (privado),
remoto `origin`, rama `main`. Lo creó Zahir; el primer push llevó 14 commits.

**Despliegue: Cloudflare Pages conectado al repo por Git** (proyecto `somos-natural`,
dirección `somos-natural.pages.dev`), configurado por Zahir el 2026-09-06. Cada push a `main`
reconstruye el sitio. Valores del proyecto: rama de producción `main`, build `npm run build`,
salida `dist`, sin variables de entorno. Es el primer proyecto de este negocio en Cloudflare
(el ERP nunca se desplegó).

> Al crear el proyecto, el menú "Production branch" salía vacío ("No labels found") porque el
> repo aún no tenía ramas. Se resolvió con el primer push.

Si algún día hace falta subir a mano sin pasar por Git:

```
npx wrangler login
npm run build
npx wrangler pages deploy dist --project-name=somos-natural
```

**Dos cosas que hay que deshacer el día del lanzamiento real:**

1. 🔴 **Borrar `public/robots.txt`.** Hoy bloquea a TODOS los buscadores para que no indexen
   la dirección de pruebas `*.pages.dev`: si Google la indexa y luego el negocio se mueve a
   su dominio, quedan dos direcciones compitiendo por lo mismo.
2. ⚠️ **Volver ABSOLUTA la ruta de `og:image`** en `index.html`. WhatsApp y Facebook no
   resuelven rutas relativas, y el link se va a compartir sobre todo por WhatsApp.

Regla del usuario: se trabaja en local y se despliega cuando él lo aprueba.

## Pendientes

- **Conseguir el arte de las 7 etiquetas que faltan** (Chocolate, Frutos rojos, Vainilla,
  Melón, Piña, Sandía, Mango) y pasarlas a `real: true`.
- Decidir si alguno de los 7 videos de `~/Downloads/videos-web/` entra al sitio.
- Cuadrar el catálogo del menú contra el del ERP.
- Confirmar si los otros dos teléfonos del menú siguen vivos.
- Definir con cuánta anticipación se aparta una fecha de evento, y **de cuánto es el anticipo**
  (su Instagram dice que hay uno, pero no dice cuánto).
- **Confirmar la duración "5 a 7 días refrigeradas"** con la familia y ponerla en Proceso.
- **Decidir si se usan los testimonios reales** de la destacada Familia Natural, pidiendo
  permiso a cada persona. Es lo que más convertiría y no cuesta nada.
- **Los precios siguen apagados.** Es la fricción más grande para el cliente fuerte: un dueño
  de tienda no decide sin saber su margen. Decisión del negocio, pero conviene replantearla.
- **Mapa propio con MapLibre + OpenFreeMap**, en vez del My Maps de Google. Zahir lo pidió el
  2026-09-06 y quedó **para después**; lo quiere también porque la pieza serviría en sus otros
  proyectos. Sin llave, sin tarjeta y sin límite de uso; Google exige facturación activa
  aunque no se pasen de las 10 mil cargas gratis.
- **Preguntar el nombre del punto de venta 6** (el que el PDF rotula solo como "super") y si
  Super Sanm y Miscelánea Tity son el mismo local.
- **Revisar en teléfono la pila de la portada y los estantes** (2026-09-05): son nuevos y
  nunca se han visto en pantalla chica.

## Quién prueba

**Las pruebas las hace Zahir**, no el modelo. Al terminar un cambio: dejar `npm run dev`
corriendo y entregarle la lista de qué revisar, agrupada por sección.

## Mundos — sesión 2026-11-12/13 (pulido)
- Flores del color de cada sabor (`botanica` en mundos/pagina.js: p1/p2 por sabor).
- Barra: liquid glass al bajar (ya no morada), logo sin encogerse; en celular, botón de menú con panel de vidrio.
- Botella: maroma completa hacia la cámara (eje inclinado con `voltea` en escena.js, nunca de frente) que dura TODO el viaje hero → "Así le hacemos" y termina parada ahí. Líquido conserva volumen (muestras de volumen en modelo.js). El pie YA NO lleva botella (Zahir).
- "Así le hacemos": fondo del sabor, ventana con nubes + jardín que crece con el scroll (`escenario()`), sello con palabra por paso; en celular, escena estática con la botella plana.
- Resto de secciones con el lenguaje del hero (`ramito()`, `ventanita()`): Nosotros foto en arco + gotita ASOMA, tarjetas tipo estampa, Dudas con gotita DUDANDO, seto en Dónde comprar. Poses nuevas en public/marca (gotita-asoma, gotita-dudando; ChatGPT + vectorizar.py).
- Estallido del hero → MARGARITA del color del sabor.
- Firma del pie al centro + "¿Se te antojó? / Armar mi pedido". Pantalla de carga con la gotita brincando.
- RECHAZADO: condensación procedural (se veía como burbujas pegadas); el código quedó apagado (`rocio` en modelo.js).
