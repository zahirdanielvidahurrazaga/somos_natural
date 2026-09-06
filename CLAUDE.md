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

**FALTA UNA SOLA: SANDÍA** (`real: false`). Lleva el trazo `casa` hasta que llegue su arte.

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
  permiso a cada persona.
- **Preguntar el nombre del punto de venta 6** (el que el PDF rotula solo como "super") y si
  Super Sanm y Miscelánea Tity son el mismo local.
- **Revisar en teléfono la pila de la portada y los estantes** (2026-09-05): son nuevos y
  nunca se han visto en pantalla chica.

## Quién prueba

**Las pruebas las hace Zahir**, no el modelo. Al terminar un cambio: dejar `npm run dev`
corriendo y entregarle la lista de qué revisar, agrupada por sección.
