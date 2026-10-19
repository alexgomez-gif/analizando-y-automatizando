# Partitura de scroll del inicio

> **Escrita por Claude bajo delegación creativa explícita** del dueño del proyecto (2026-10-19:
> «Haz todos los cambios que tú consideres necesario con la nueva herramienta»).
> Herramienta: skill scroll-craft (motor en `src/vendor/scrollcraft/`), usada **dentro de la marca**:
> `docs/marca.md` manda sobre las reglas de la skill (el degradado del titular y el glow se quedan).

## 1. Brief

- **Qué es:** el inicio de Analizando y Automatizando, para emprendimientos emergentes en Colombia.
- **Qué debe creer el visitante al final:** que sus tareas repetitivas se pueden hacer solas y que el primer paso es fácil y gratis.
- **Qué hace después:** agendar el diagnóstico gratis (una sola acción en toda la página).
- **Activos:** ninguna foto ni video. El mundo visual es la propia marca: noche azul, neón, retícula de horizonte. Nada se genera.
- **Estructura:** escenas distintas (no un vuelo continuo). Cada sección se comporta distinto.

## 2. Recorrido y curva de emoción

| Sección | Lo que siente | Qué lo causa |
|---|---|---|
| Hero | Curiosidad | El lema y la retícula de horizonte; la página promete algo distinto |
| Problema | «Ese soy yo» | Las tres situaciones aparecen una tras otra, como si las fueras reconociendo |
| Servicios | Orientación | Tarjetas que aparecen en orden y responden al cursor con una luz |
| **Cómo trabajamos** | **Claridad (el momento cumbre)** | La sección se sostiene y un pulso de datos recorre la tubería hasta encender «Decisión» |
| Quiénes somos | Confianza | La cita se descubre con una cortina |
| Preguntas | Calma | Sin efectos: aire para leer |
| Calculadora | Control | Sin efectos de scroll: es una herramienta |
| Cierre | Decisión | Quieto. La página termina firme, no se desvanece |

**El momento cumbre:** «La parte donde bajas y ves cómo tus datos recorren el camino hasta convertirse en una decisión».
Es la sección con más recorrido de scroll y la única que se sostiene en pantalla.

**Frase para contarlo:** «Es el sitio donde ves, mientras bajas, cómo tus datos se vuelven decisiones».

## 3. Movimiento propio del sitio

**El pulso de datos de la tubería.** Mientras la sección «Cómo trabajamos» se sostiene, una línea de luz
avanza con el scroll por las cinco etapas (Datos → Limpieza → Análisis → Automatización → Decisión) y
enciende cada una al pasar; «Decisión» se enciende en lima, el color de los resultados. Está hecho solo
con CSS leyendo `--sc-p` (el progreso del acto): cero JavaScript propio.

## 4. Partitura (efecto por sección)

| Sección | Efecto del motor | Detalle |
|---|---|---|
| Hero | Ninguno que oculte contenido | El hero es lo primero que se ve: nada aparece tarde |
| Problema | `data-sc-in` + `data-sc-stagger` | Las 3 tarjetas suben 14 px y aparecen en secuencia, una sola vez |
| Servicios | `data-sc-in` + `data-sc-stagger` · `data-sc-spotlight` + `data-sc-tilt="4"` | Aparición en secuencia; luz que sigue al cursor e inclinación máxima de 4° (marca.md §6.1) |
| Cómo trabajamos | `data-sc-act="pin"` (cumbre) · `data-sc-in` en los pasos | La tubería se sostiene ~2 pantallas con el pulso; los 4 pasos aparecen después en secuencia |
| Quiénes somos | `data-sc-reveal` | Cortina de izquierda a derecha sobre la cita |
| Preguntas, calculadora, cierre | Ninguno | Calma, herramienta y final firme |

Cinco familias distintas de movimiento (aparición, puntero, sostén, cortina, quietud) y nunca la misma dos veces seguidas.

## 5. Reglas que no se negocian

- **Sin JavaScript, o si el motor no se monta, todo el contenido es visible** (protección en `global.css` con `html:not(.sc-ready)`; marca.md §6.3).
- **«Reducir movimiento»:** todo aparece en su estado final; la tubería se muestra encendida completa; el puntero no inclina ni ilumina.
- **Teclado:** nada depende del mouse; el orden de foco no cambia.
- **Presupuesto:** el motor pesa 19 KB comprimido (≤ 30 KB de marca.md §6.3). El pulso es CSS. El motor se carga solo en el inicio.
- **Textos, colores y fuentes:** sin cambios. Nada de cifras inventadas (no se usa `data-sc-count`).

## 6. Lo que no se usa de scroll-craft

Video que avanza con el scroll, generación de imágenes con KIE AI, ffmpeg, Playwright, contadores,
paneo horizontal, vuelo continuo (`worldflight`) y las reglas de la skill que contradicen la marca.
