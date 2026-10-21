# Partitura de scroll del inicio

> **Escrita por Claude bajo delegación creativa explícita** del dueño del proyecto (2026-10-19:
> «Haz todos los cambios que tú consideres necesario con la nueva herramienta»).
> Herramienta: skill scroll-craft (motor en `src/vendor/scrollcraft/`), usada **dentro de la marca**:
> `docs/marca.md` manda sobre las reglas de la skill (el degradado del titular y el glow se quedan).

## 1. Brief

- **Qué es:** el inicio de Analizando y Automatizando, para emprendimientos emergentes en Colombia.
- **Qué debe creer el visitante al final:** que sus tareas repetitivas se pueden hacer solas y que el primer paso es fácil y gratis.
- **Qué hace después:** agendar el diagnóstico gratis (una sola acción en toda la página).
- **Activos:** ninguna foto ni video. El mundo visual es la propia marca: noche azul, neón, retícula de horizonte. Nada se genera:
  todo se dibuja con código (CSS, SVG calculado al compilar y `<canvas>`).
- **Estructura:** escenas distintas (no un vuelo continuo). Cada sección se comporta distinto.

## 2. Recorrido y curva de emoción

| Sección | Lo que siente | Qué lo causa |
|---|---|---|
| Hero | Asombro, ganas de explorar | **Escena «Amanecer»** (2026-10-21): el sitio empieza de noche y amanece mientras bajas; el sol sube tras las montañas, las estrellas se apagan y el tablero de ejemplo se acerca |
| Problema | «Ese soy yo» | Las tres situaciones aparecen una tras otra, como si las fueras reconociendo |
| Servicios | Orientación | Tarjetas que aparecen en orden y responden al cursor con una luz |
| **Cómo trabajamos** | **Claridad (el momento cumbre)** | La sección se sostiene y un pulso de datos recorre la tubería hasta encender «Decisión» |
| Quiénes somos | Confianza | La cita se descubre con una cortina |
| Preguntas | Calma | Sin efectos: aire para leer |
| Calculadora | Control | Sin efectos de scroll: es una herramienta |
| Cierre | Decisión | Quieto. La página termina firme, no se desvanece |

**El momento cumbre:** «La parte donde bajas y ves cómo tus datos recorren el camino hasta convertirse en una decisión».
Es la sección con más recorrido de scroll: su acto mide 2 pantallas y se sostiene 1 (el del hero mide 1,8 y se sostiene 0,8).

**Frase para contarlo:** «Es el sitio donde ves, mientras bajas, cómo tus datos se vuelven decisiones».

## 3. Movimiento propio del sitio

**La escena de apertura: «Amanecer»** (plan aprobado el 2026-10-21, `HeroAmanecer.astro`). La marca se llama «Neón al
amanecer»: la noche son los datos en bruto y el neón la claridad. El hero se sostiene 0,8 pantallas y, mientras bajas, el sol
sube detrás de dos cordilleras andinas, las estrellas se apagan, la retícula avanza hacia ti y el mini tablero se acerca.
Con mouse, la red de datos se une al cursor y el tablero se inclina (máx. 4°). El paso 3 del plan extenderá el amanecer a toda la página.

**El momento cumbre sigue siendo el pulso de datos de la tubería.** Mientras la sección «Cómo trabajamos» se sostiene, una línea de luz
avanza con el scroll por las cinco etapas (Datos → Limpieza → Análisis → Automatización → Decisión) y
enciende cada una al pasar; «Decisión» se enciende en lima, el color de los resultados. Está hecho solo
con CSS leyendo `--sc-p` (el progreso del acto): cero JavaScript propio.

## 4. Partitura (efecto por sección)

| Sección | Efecto del motor | Detalle |
|---|---|---|
| Hero | `data-sc-act="pin"` (`data-sc-span="1.8"`) · capas en CSS sobre `--sc-p` · `<canvas>` propio · `data-sc-tilt="4"` + `data-sc-spotlight` en el tablero | Nada que oculte contenido: el texto está en su sitio desde el primer cuadro (solo el tablero aparece a los 250 ms). En celular el texto sube lo justo para mostrar el tablero |
| Problema | `data-sc-in` + `data-sc-stagger` | Las 3 tarjetas suben 14 px y aparecen en secuencia, una sola vez |
| Servicios | `data-sc-in` + `data-sc-stagger` · `data-sc-spotlight` + `data-sc-tilt="4"` | Aparición en secuencia; luz que sigue al cursor e inclinación máxima de 4° (marca.md §6.1) |
| Cómo trabajamos | `data-sc-act="pin"` (cumbre) · `data-sc-in` en los pasos | La tubería se sostiene ~2 pantallas con el pulso; los 4 pasos aparecen después en secuencia |
| Quiénes somos | `data-sc-reveal` | Cortina de izquierda a derecha sobre la cita |
| Preguntas, calculadora, cierre | Ninguno | Calma, herramienta y final firme |

Cinco familias distintas de movimiento (aparición, puntero, sostén, cortina, quietud) y nunca la misma dos veces seguidas
(los dos sostenes, hero y tubería, están separados por dos secciones con aparición).

## 5. Reglas que no se negocian

- **Sin JavaScript, o si el motor no se monta, todo el contenido es visible** (protección en `global.css` con `html:not(.sc-ready)`; marca.md §6.3).
- **«Reducir movimiento»:** todo aparece en su estado final; la tubería se muestra encendida completa; el puntero no inclina ni ilumina.
  El hero **no se sostiene** (sería un tramo de scroll en el que no pasa nada): escena quieta, tablero completo y sin contar.
- **Teclado:** nada depende del mouse; el orden de foco no cambia.
- **Presupuesto:** el motor pesa 7,5 KB comprimido; la escena del hero, 1,6 KB y el mini tablero, 0,4 KB (total ≈ 9,5 KB, ≤ 30 KB de
  marca.md §6.3). El pulso y las capas del hero son CSS. El motor se carga solo en el inicio. Los `<canvas>` van a ≤ 30 cuadros por
  segundo y se detienen fuera de pantalla, igual que la aurora y la retícula.
- **Sin JavaScript o si el motor falla:** el hero es una sección normal con la escena quieta (y, sin JavaScript, el encabezado vuelve a su franja).
- **Textos, colores y fuentes:** sin cambios. Las únicas cifras son las del mini tablero, marcadas «Datos de ejemplo» (marca.md §7);
  cuentan con un script propio que deja la cifra final en el HTML (no se usa `data-sc-count`).

## 6. Lo que no se usa de scroll-craft

Video que avanza con el scroll, generación de imágenes con KIE AI, ffmpeg, Playwright, los contadores del motor,
paneo horizontal, vuelo continuo (`worldflight`) y las reglas de la skill que contradicen la marca.
