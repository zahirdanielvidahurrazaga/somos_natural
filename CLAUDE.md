# SOMOS NATURAL — sitio público

> **Este archivo es la FUENTE DE VERDAD del proyecto.** Léelo completo al retomar.

Sitio de marketing del negocio de aguas naturales. **No es el ERP**: ese vive aparte en
`~/Developer/natural-erp` y tiene su propio CLAUDE.md.

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
- **Sin efectos.** Nada de sombras, degradados, resplandores ni bordes redondeados. La
  estructura la dan líneas de 1 px. Se llegó aquí porque la primera versión (morada, con
  animaciones) se sintió sucia.

**La pieza central es `Etiqueta.jsx`.** Cada sabor se muestra como su etiqueta, no como una
botella genérica.

> **Las etiquetas reales NO se parecen entre sí y el sitio lo respeta** (corregido el
> 2026-09-04, a petición del negocio). La de jamaica es setentera en vino, la de horchata es
> una serif azul marino con acuarela, la de maracuyá es olivo oscuro, la de café es un sans
> terracota. Enseñarlas todas con el mismo dibujo era mentir sobre el producto.
> `Etiqueta.jsx` usa **el arte real** cuando el sabor lo tiene (`sabor.etiqueta` →
> `public/img/etiquetas/<nombre>.jpg`) y cae al dibujo genérico teñido de su color solo
> para los siete que aún no tienen archivo.

Además, **el `color` de cada sabor con etiqueta real es el color dominante de SU etiqueta**,
no el del líquido: la horchata es azul marino y el maracuyá olivo, porque eso es lo que se
ve en la tarjeta.

### Reglas

- **Cero estilos escritos a mano en el JSX.** Todo sale de `index.css`. La ÚNICA excepción
  es `--c`, el color del sabor, porque es un dato y no una decisión de diseño.
- **Nada inventado.** No hay testimonios, ni fotos de producto falsas, ni datos de contacto
  de relleno. Lo que falta se deja vacío y el sitio lo aguanta.
- **Un toggle que nadie lee no es un toggle.** Se borró `mostrarPrecios` cuando se quitaron
  los precios: dejarlo habría hecho creer que ponerlo en `true` los devolvía.

## Movimiento

Se agregó el 2026-09-04 porque el sitio quieto se sentía genérico. **Todo el movimiento
sale del vocabulario de la marca**; no hay efectos prestados.

| Qué | Dónde | Por qué es suyo |
|---|---|---|
| **Sello giratorio** | Portada, encima de la etiqueta | Su logo YA es un timbre redondo, y sus etiquetas ya traen texto en arco |
| **La etiqueta cambia de sabor** sola cada 3.2 s | Portada | Enseña los 14 sabores sin llenar la primera pantalla de tarjetas |
| **Las hojas se dibujan** al entrar en pantalla | Cada etiqueta | La línea botánica es de la etiqueta de Jamaica; dibujarla la vuelve gesto |
| **Tira que corre** | Bajo la portada | Los tres textos fijos de sus etiquetas, como marquesina de época |
| **Revelado en cascada** | Todo el sitio | Quita lo estático sin agregar adorno |
| **Calcomanía** (gira y se tiñe al pasar el mouse) | Tarjetas de sabor | Trata cada tarjeta como lo que es: una etiqueta pegada |

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

**Etiquetas reales en archivo: 7 de 14.** Están Jamaica, Horchata, Café, Tamarindo, Maracuyá,
Naranja y Limón. **Faltan** Chocolate, Frutos rojos, Vainilla, Melón, Piña, Sandía y Mango —
esos siete caen al dibujo genérico. En `~/Downloads` hay además etiquetas de **Guanábana** y
**Taro**, dos sabores que el menú NO lista: si existen, hay que darlos de alta.
(Las carpetas `mexcali etiqueta*` son de otra marca, de mezcal: no tocarlas.)

> ⚠️ **El menú y el ERP no cuadran.** El ERP no conoce "Limón, pepino y chía" ni "Sandía",
> y tiene Melón y Piña apagados por no venderse. **Falta cuadrar los dos catálogos**; si no,
> el sitio ofrece cosas que el sistema no sabe cobrar.

## Estructura

```
src/
  datos/negocio.js        ← TODO lo editable
  lib/whatsapp.js         ← arma los enlaces wa.me; devuelve null si no hay número
  componentes/
    Etiqueta.jsx          ← la etiqueta del producto (+ Hoja, la línea botánica)
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
| `formacion.jpg` | 4730 | Sección propia tras Proceso | Nueve sabores de un jalón: es la prueba del catálogo |
| `evento.jpg` | 4707 | Banda en Eventos | Recorte 5:3, el más ancho que deja la botella entera |
| `detalle-jamaica.jpg` | 4648 | Trío tras Sabores | **Trae la etiqueta de Jamaica REAL**, la misma que da el diseño al sitio |
| `detalle-vocho.jpg` | 4697 | Trío | Un Vocho crema de fondo: regalo para lo setentero |
| `detalle-cafe.jpg` | 4640 | Trío | Margaritas moradas, la más "natural" del lote |

Se convierten con `sips` (HEIC→JPEG) y se recortan con PIL. Ninguna pasa de 225 KB.

**Tratamiento de foto — la regla es una sola: NINGUNA foto flota dentro de una caja.**

Se llegó aquí en dos intentos. El primero fue un recuadro con marco de 1 px: se veía pegado.
El segundo quitó el marco y recortó en arco: **se seguía viendo pegado**. La conclusión, y
la regla del proyecto:

> **Un recuadro con aire alrededor se lee como calcomanía, con marco o sin él. Lo que
> integra una foto es la ESCALA, no la forma.** El arco no arregla nada; sangrar hasta el
> borde de la pantalla sí.

- **Franja de cuatro fotos** (`.tira-fotos`) pegadas sin separación, de borde a borde,
  cerrando Sabores. Es una franja, no cuatro cuadros.
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

Un solo dibujo, cuatro apariciones:

| Dónde | Cómo |
|---|---|
| **Portada** | Junto a la etiqueta, respirando |
| **Entre Sabores y Proceso** | Cruza la página caminando por la línea divisoria |
| **Panel del pedido** | Asomada por arriba, volteada |
| **Pie** | Silueta con `mask`, al 13% — atmósfera, no calcomanía |

> **Se probó teñir la gotita del color del sabor (`hue-rotate`) y el negocio lo rechazó.**
> No reintroducirlo. El personaje se queda con sus colores. `src/lib/color.js`, que calculaba
> el giro, se borró junto con el efecto.

El caminante lleva **dos animaciones en dos elementos**: una avanza y otra brinca. En el
mismo elemento se pisarían, porque las dos usan `transform`.

> ⚠️ En Downloads hay otras dos `Gemini_Generated_Image_*`: una es una **foto de producto
> generada por IA** —NO usarla, el sitio no lleva nada inventado— y la otra es una foto
> familiar de Zahir.

## Stack y despliegue

React 19 + Vite 6, sin router (una sola página con anclas) y sin dependencias de más.
`public/_redirects` ya trae el fallback de SPA para **Cloudflare Pages**, que es a donde va.

**Todavía NO se ha desplegado.** Regla del usuario: se trabaja en local y se despliega
cuando él lo aprueba.

## Pendientes

- Decidir si alguno de los 7 videos de `~/Downloads/videos-web/` entra al sitio.
- Cuadrar el catálogo del menú contra el del ERP.
- Confirmar si los otros dos teléfonos del menú siguen vivos.
- Definir con cuánta anticipación se aparta una fecha de evento.
- Desplegar en Cloudflare Pages.

## Quién prueba

**Las pruebas las hace Zahir**, no el modelo. Al terminar un cambio: dejar `npm run dev`
corriendo y entregarle la lista de qué revisar, agrupada por sección.
