# Marca y diseño — Analizando y Automatizando

Complemento de `CLAUDE.md`. Aquí vive toda la identidad visual: concepto, colores, tipografía, efectos e interactividad.
Todo componente nuevo debe usar estos tokens. Si algo no está definido aquí, pregunta antes de inventarlo.

---

## 1. Concepto: «Neón al amanecer»

Cyberpunk **optimista**: la estética de ciudad nocturna con luces de neón, pero sin distopía.
La noche azul profunda representa los datos en bruto; el neón es la claridad que aparece cuando se analizan y automatizan.
La sensación final debe ser: *el futuro ya llegó y trabaja a tu favor*.

**Personalidad de la marca:** confiable · precisa · optimista · futurista · cercana.

### La regla 80 / 20
- **80 % calma:** fondos oscuros, mucho espacio en blanco (o en negro), tipografía limpia, orden.
- **20 % brillo:** el neón solo en lo que importa: llamados a la acción, cifras clave, gráficos, estados activos.
- **El brillo señala, no decora.** Si todo brilla, nada destaca y la página deja de verse profesional.
- **Excepción aprobada (2026-10-21, plan «Amanecer»):** la escena del hero lleva más color que el 20 %: es la entrada a la marca, la noche que amanece. Debajo del hero la página vuelve a la calma, hasta el cierre del inicio, donde el sol termina de salir (2026-10-28).

### Nombre
- **Empresa y sitio:** Analizando y Automatizando
- **Forma corta (logo, favicon, redes):** A&A
- **Dominio:** `analizandoyautomatizando.com`
- **Lema:** «Analizamos lo que tienes. Automatizamos lo que repites»
  - Descartados: «Del dato a la decisión, sin trabajo repetitivo» · «Tus datos claros. Tus procesos en automático»

---

## 2. Paleta de colores

Contrastes verificados con la fórmula WCAG 2.2. Todos los colores de texto pasan **AA (≥ 4,5:1)** sobre los tres fondos oscuros.

### 2.1 Tema oscuro (predeterminado)

**Fondos y estructura**

| Token | Hex | Nombre | Uso |
| --- | --- | --- | --- |
| `--fondo` | `#070B1F` | Noche profunda | Fondo general de la página |
| `--superficie` | `#0F1533` | Cabina | Tarjetas, secciones alternas |
| `--elevada` | `#182052` | Holograma | Menús, modales, tarjeta en hover |
| `--borde` | `#2B3577` | Circuito | Bordes **decorativos** y divisores |
| `--borde-fuerte` | `#5A6BC8` | Circuito activo | Bordes de inputs y controles (≥ 3:1 en todos los fondos) |

**Texto**

| Token | Hex | Contraste sobre `--fondo` / `--elevada` | Uso |
| --- | --- | --- | --- |
| `--texto` | `#EEF4FF` | 17,7 / 13,9 | Títulos y párrafos |
| `--texto-2` | `#A7B3DA` | 9,4 / 7,4 | Subtítulos, descripciones |
| `--texto-tenue` | `#7F8BB8` | 5,8 / 4,6 | Notas, metadatos, pies de gráfico |

**Neón (acentos)**

| Token | Hex | Nombre | Significado y uso | Contraste sobre `--fondo` |
| --- | --- | --- | --- | --- |
| `--cian` | `#00E5FF` | Cian datos | **Color principal.** Análisis, enlaces, botón primario, foco | 12,7 |
| `--magenta` | `#FF3DDC` | Magenta flujo | **Secundario.** Automatización, botón secundario, destacados | 6,5 |
| `--violeta` | `#A78BFA` | Violeta IA | Inteligencia artificial, análisis predictivo, etiquetas | 7,2 |
| `--lima` | `#B8FF3D` | Lima crecimiento | Éxito, resultados positivos, «ahorro» | 16,2 |
| `--ambar` | `#FFC94D` | Ámbar amanecer | Advertencias, calidez, insignias «nuevo» | 12,7 |
| `--coral` | `#FF6B8B` | Coral alerta | Errores y validación de formularios | 7,2 |

**Texto sobre botones de neón:** usar siempre `--fondo` (`#070B1F`). Contraste entre 6,5:1 (magenta) y 16,2:1 (lima). Nunca texto blanco sobre cian o lima.

### 2.2 Tema claro (alternativo)

Para quien prefiera fondo claro y para versiones impresas. El neón se oscurece para mantener contraste.

| Token | Hex | Contraste sobre `#F6F8FF` |
| --- | --- | --- |
| `--fondo` | `#F6F8FF` | — |
| `--superficie` | `#FFFFFF` | — |
| `--borde-fuerte` | `#7880AE` | 3,6 |
| `--texto` | `#0B1030` | 17,5 |
| `--texto-2` | `#465079` | 7,4 |
| `--texto-tenue` | `#5A6488` | 5,5 |
| `--cian` | `#00788A` | 4,9 |
| `--magenta` | `#B5148F` | 5,7 |
| `--violeta` | `#6233D6` | 6,7 |
| `--lima` | `#3F7A00` | 5,0 |
| `--ambar` | `#9A5B00` | 5,1 |
| `--coral` | `#C8204A` | 5,3 |

En el tema claro, el texto de los botones de color va en blanco (`#FFFFFF`): 5,2:1 sobre cian y 6,1:1 sobre magenta.

### 2.3 Degradados de marca

| Nombre | Definición | Uso |
| --- | --- | --- |
| **Amanecer neón** | `linear-gradient(135deg, #00E5FF 0%, #A78BFA 50%, #FF3DDC 100%)` | Palabras clave del titular, borde del botón principal, logo |
| **Horizonte** | `linear-gradient(90deg, #00E5FF 0%, #B8FF3D 100%)` | Barras de progreso, líneas de crecimiento |
| **Aurora** | `radial-gradient(ellipse at top, rgba(167,139,250,.25), transparent 60%), radial-gradient(ellipse at bottom right, rgba(255,61,220,.15), transparent 50%)` | Fondo del hero y de secciones clave |

Regla: los degradados van en **titulares cortos (≤ 4 palabras), bordes y fondos**, nunca en párrafos.

**Versiones para el tema claro** (con los neones oscurecidos de §2.2):
- Amanecer neón: `#00788A → #6233D6 → #B5148F` (contraste 4,9 / 6,7 / 5,7 sobre `#F6F8FF`).
- Horizonte: `#00788A → #3F7A00` (4,9 / 5,0).
- Aurora: violeta `rgba(98,51,214,.10)` y magenta `rgba(181,20,143,.06)`. Más intensa, el cian del titular bajaría de 3:1.

### 2.4 Resplandor (glow)

```css
--glow-cian:    0 0 0 1px rgba(0,229,255,.45), 0 0 24px rgba(0,229,255,.35), 0 0 64px rgba(0,229,255,.12);
--glow-magenta: 0 0 0 1px rgba(255,61,220,.45), 0 0 24px rgba(255,61,220,.30), 0 0 64px rgba(255,61,220,.10);
--glow-texto:   0 0 12px rgba(0,229,255,.55);
```
- Máximo **un elemento con glow fuerte por pantalla** (normalmente el botón principal).
- En tarjetas, el glow aparece solo en `:hover` y `:focus-visible`.

### 2.5 Colores para gráficos

Orden de series: **cian → magenta → lima → ámbar → violeta → coral**.
- Nunca depender solo del color: añadir etiquetas directas, patrones o formas distintas.
- Positivo = lima con flecha ↑; negativo = coral con flecha ↓. Nunca solo rojo/verde.
- Rejilla de gráficos en `--borde` con opacidad 50 %; ejes en `--texto-tenue`.

---

## 3. Tipografía

Todas de Google Fonts, con licencia libre (SIL Open Font License).
**Se alojan en el propio dominio:** la configuración `fonts` de Astro las descarga al compilar y las sirve desde el sitio. Nunca se cargan desde los servidores de Google (protege la privacidad del visitante).

| Rol | Fuente | Pesos | Uso |
| --- | --- | --- | --- |
| Titulares | **Space Grotesk** | 500, 700 | H1–H3, logo, cifras grandes. Futurista pero legible |
| Texto | **Inter** | 400, 500, 600 | Párrafos, botones, formularios |
| Datos y código | **JetBrains Mono** | 400, 500 | Cifras de tableros, etiquetas tipo terminal, «chips» técnicos |

**Escala (móvil → escritorio):**
- H1: 2,5 rem → 4,5 rem, `letter-spacing: -0.02em`, `line-height: 1.05`
- H2: 2 rem → 3 rem
- H3: 1,375 rem → 1,75 rem
- Texto: 1,0625 rem (17 px), `line-height: 1.65`, máximo 68 caracteres por línea
- Etiquetas mono: 0,8125 rem, MAYÚSCULAS, `letter-spacing: 0.08em`

---

## 4. Logo (v1)

Los archivos están en `public/logo/`. **No los redibujes ni los edites a mano**: si hace falta un cambio, se pide y se regeneran todas las versiones juntas.

### Concepto
Monograma **A&A** dibujado con una sola línea continua, como una gráfica de datos:

1. **Primera A · Analizar.** El trazo nace abajo a la izquierda y sube al primer pico.
2. **El lazo · Automatizar.** Al bajar, la línea da una vuelta completa y sigue sola. Es el «&».
3. **Segunda A y nodo · Resultado.** La línea sube a un pico más alto que el primero y termina en un nodo lima con brillo.
4. **Barra compartida · Horizonte.** Un solo trazo horizontal cruza las dos A.

- **Color:** degradado Amanecer neón (cian → violeta → magenta) de abajo a la izquierda hacia arriba a la derecha; nodo en `--lima`. Junto con el borde del botón principal, es la única pieza de la marca con más de dos neones.
- **Nodo flotante:** un corte fino separa el nodo del pico, para que se lea también en las versiones a una tinta.
- **Wordmark:** Space Grotesk 700 convertida a trazos (no depende de fuentes instaladas), en dos líneas: «Analizando y» / «Automatizando». La «y» va en peso 500 y color `--texto-2`.

### Archivos

| Archivo | Cuándo usarlo |
| --- | --- |
| `logo-horizontal.svg` | Predeterminado. Encabezado y pie en tema oscuro |
| `logo-horizontal-claro.svg` | Tema claro, documentos y propuestas en fondo blanco |
| `logo-animado.svg` | Hero o pantalla de carga: la línea se dibuja una vez (respeta `prefers-reduced-motion`) |
| `logo-blanco.svg` | Sobre fotos, videos o fondos de color |
| `logo-oscuro.svg` | Impresión a una tinta, sellos, facturas |
| `monograma.svg` / `monograma-claro.svg` | Espacios pequeños o cuadrados: avatar de redes, marca de agua en gráficos |
| `favicon.svg` + `favicon-32.png` | Pestaña del navegador |
| `apple-touch-icon.png` (180 px) | Acceso directo en iPhone |
| `icono-192.png`, `icono-512.png` | Manifest web (Android, PWA); sirven como `maskable` |

### Uso en el código

```html
<!-- En el <head> del BaseLayout -->
<link rel="icon" href="/logo/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/logo/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/logo/apple-touch-icon.png">

<!-- En el encabezado: proporción 4:1 (por ejemplo 176 × 44) -->
<a href="/" aria-label="Analizando y Automatizando, inicio">
  <img src="/logo/logo-horizontal.svg" alt="" width="176" height="44">
</a>
```

Con el tema claro activo (`[data-theme="light"]`), muestra `logo-horizontal-claro.svg` en lugar del oscuro.

### Reglas
- **Espacio libre:** alrededor del logo, como mínimo el alto del lazo (≈ ¼ del alto total).
- **Tamaño mínimo:** horizontal 160 px de ancho (40 mm impreso); monograma 24 px. Más pequeño, usa el favicon.
- **No se modifica:** no cambiar colores, no estirar, no añadir sombras ni contornos, no rotar, no ponerlo sobre fondos neón o fotos muy cargadas.

---

## 5. Estilo visual de la interfaz

- **Esquinas:** 12 px en tarjetas, 999 px en botones y chips, 8 px en inputs.
- **Tarjetas «cristal»:** fondo `--cristal` (oscuro `rgba(15,21,51,.65)`, claro `rgba(255,255,255,.7)`), `backdrop-filter: blur(14px)`, borde 1 px `--borde`. Si la tarjeta es un enlace, en hover y foco: borde con degradado Amanecer neón + `--glow-cian`.
- **Retícula de horizonte:** una cuadrícula en perspectiva (estilo synthwave) que se pierde hacia el horizonte. Es la firma visual de la marca. En el hero va en neón (líneas cian y magenta) y avanza hacia el visitante; en el llamado final de las páginas internas, quieta y en `--borde` con baja opacidad; en el cierre del inicio, quieta y en neón tenue.
- **Escena «Amanecer» (hero del inicio, `HeroAmanecer.astro`):** el sitio empieza de noche y amanece al bajar. Capas de atrás hacia adelante: cielo con aurora, estrellas, sol synthwave (franjas) con halo, bruma, dos cordilleras andinas con la cresta en neón, suelo con la retícula, línea de horizonte, red de datos, velo de lectura y grano.
  - Colores: tokens de escena (`--cielo-*`, `--monte-*`, `--sol-1` a `--sol-4`, §8); nada suelto en el componente.
  - Las crestas brillan a contraluz: fuertes cerca del sol y tenues detrás del texto.
  - Tema claro: un amanecer de día (cielo claro bajo el titular, tonos de alba solo cerca del horizonte, sin estrellas).
  - **Contraste medido con píxeles reales** (2 temas × 5 anchos × 3 momentos del scroll): todo el texto cumple AA sobre la escena.
- **Escena de cierre (inicio, `EscenaCierre.astro`, 2026-10-28):** el mismo amanecer al final de la página, detrás de «Tu primer paso son 30 minutos». Cielo, sol synthwave con halo que sube mientras la sección entra, dos cordilleras con un valle al centro (cresta lejana violeta, cercana ámbar: la luz del sol ya les da de frente), línea de horizonte y retícula quieta. El texto va arriba, sobre el cielo, y nunca encima del sol ni de las crestas.
  - Contraste medido con píxeles reales (2 temas × 3 anchos × 3 momentos): título ≥ 16:1, párrafo ≥ 6,6:1 y botón contra la escena ≥ 4,1:1.
  - Las demás páginas mantienen el cierre en tarjeta con Aurora y retícula tenue.
- **Ruido sutil:** textura de grano al 3 % sobre los fondos para evitar degradados planos (hoy, en las escenas del hero y del cierre del inicio).
- **Iconos:** de línea, trazo 1,5 px, esquinas redondeadas. Paquete `@lucide/astro` (oficial de Lucide, licencia ISC). Se usan como componentes (`<ChartLine />`), sin JavaScript en el navegador. Color `--texto-2`; en hover, cian.
- **Fotos e ilustraciones:** si se usan fotos de personas, aplicar duotono noche + cian. Nunca fotos genéricas de banco de imágenes sin tratar.
- **Espaciado:** escala de 4 px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Secciones con 96–128 px de aire vertical en escritorio.

---

## 6. Interactividad y efectos

Cada efecto debe **comunicar algo** (datos, proceso, resultado), no solo adornar. Todos respetan `prefers-reduced-motion` y funcionan con teclado.

### 6.1 Componentes interactivos de la página

| Componente | Dónde | Qué hace | Qué comunica |
| --- | --- | --- | --- |
| **Red de datos viva** | Fondo del hero | Nodos y líneas en `<canvas>` que se conectan suavemente y reaccionan al cursor | Datos conectándose |
| **Mini tablero en vivo** | Hero, lado derecho | Tarjeta con 3 indicadores que cuentan hacia arriba y una gráfica que se dibuja; etiqueta visible «Datos de ejemplo» | Lo que el cliente recibirá |
| **Terminal que escribe** | Sección «Cómo trabajamos» | Simula `analizar ventas.csv` → `reporte listo ✓` letra por letra, en JetBrains Mono | Automatización real, rigor técnico |
| **Antes / después** | Sección de servicios | Control deslizante: hoja de Excel caótica ↔ tablero limpio | La transformación |
| **Tubería de proceso** | «Cómo trabajamos» | Diagrama: Datos → Limpieza → Análisis → Automatización → Decisión; un pulso de luz recorre la línea al hacer scroll | Método claro y confiable |
| **Calculadora de ahorro** | Antes del llamado final | El visitante ingresa horas semanales en tareas manuales y valor de su hora; ve horas y dinero al año que podría liberar | Valor concreto, en sus propios números |
| **Tarjetas con luz** | Servicios y casos | Un foco de luz sigue el cursor dentro de la tarjeta; inclinación 3D leve (máx. 4°) | Calidad, atención al detalle |
| **Botón principal** | Todo el sitio | Borde con el degradado Amanecer neón (`conic-gradient`), quieto en reposo; gira lentamente solo al pasar el mouse o enfocarlo con teclado (WCAG 2.2.2); nunca gira con `prefers-reduced-motion`. Glow en hover | Dónde hacer clic |
| **Cambio de tema** | Encabezado | Alterna oscuro/claro con transición suave, recordado en `localStorage` | Control para el visitante |

La calculadora **solo multiplica los valores que ingresa el visitante**: no muestra porcentajes de ahorro inventados.

**Implementados en el inicio (2026-10-19)** con el motor de scroll-craft (`src/vendor/scrollcraft/`); la partitura completa está en `docs/scroll.md`:
tubería con pulso de datos (momento cumbre, solo CSS sobre `--sc-p`), tarjetas con luz (servicios), aparición en secuencia
(problema, servicios, pasos), cortina sobre la cita, calculadora y cambio de tema.
**Implementados en el hero (2026-10-21, plan «Amanecer»):** red de datos viva (`<canvas>`, máx. 60/25 nodos a ≤ 30 fps) y
mini tablero (`MiniTablero.astro`, con su tabla de datos para lectores de pantalla). **Pospuestos:** terminal que escribe y antes/después
(pasos 4 y 6 del plan «Amanecer»).

### 6.2 Movimiento

- Duraciones: 150 ms (hover), 300 ms (aparición), 600–900 ms (dibujar gráficas). Curva: `cubic-bezier(.2,.8,.2,1)`.
- Aparición al hacer scroll: desplazamiento de 16 px + opacidad, una sola vez por elemento.
- Animaciones de fondo: lentas (ciclos ≥ 8 s) y pausadas cuando no están en pantalla (`IntersectionObserver`).
- Con `prefers-reduced-motion: reduce`: sin animaciones de fondo, sin contadores, sin inclinación 3D; todo aparece en su estado final.
- Nada parpadea más de 3 veces por segundo.

### 6.3 Presupuesto de rendimiento

- JavaScript de efectos: ≤ 30 KB comprimido en total. Sin librerías pesadas de 3D.
- `<canvas>` del hero: máximo 60 nodos en escritorio, 25 en móvil, a ≤ 30 fps.
- Los efectos se cargan como islas (`client:visible` o `client:idle`); el contenido es legible sin JavaScript.

---

## 7. Cómo se ve «confiable» siendo futurista

1. **Neón nunca en textos largos.** Párrafos siempre en `--texto` o `--texto-2`.
2. **Jerarquía clara:** un titular, una idea por sección, un botón principal por pantalla.
3. **Datos honestos:** toda cifra de ejemplo lleva la etiqueta «Datos de ejemplo»; las reales, su fuente.
4. **Señales de confianza visibles:** certificaciones, política de datos enlazada en el formulario, NIT y contacto en el pie.
5. **Consistencia:** mismos radios, sombras y espaciados en todo el sitio, siempre desde los tokens.
6. **Sobriedad en lo legal y en precios:** esas secciones usan el estilo más calmado (sin glow, sin degradados).

---

## 8. Tokens para el código

Archivo `src/styles/tokens.css`, importado una sola vez en `BaseLayout`. Si el proyecto usa Tailwind v4, el bloque `@theme` expone los tokens como clases (`bg-fondo`, `text-cian`, etc.).

```css
:root {
  /* Fondos */
  --fondo: #070B1F;
  --superficie: #0F1533;
  --elevada: #182052;
  --borde: #2B3577;
  --borde-fuerte: #5A6BC8;
  /* Texto */
  --texto: #EEF4FF;
  --texto-2: #A7B3DA;
  --texto-tenue: #7F8BB8;
  /* Neón */
  --cian: #00E5FF;
  --magenta: #FF3DDC;
  --violeta: #A78BFA;
  --lima: #B8FF3D;
  --ambar: #FFC94D;
  --coral: #FF6B8B;
  /* Texto sobre botones de neón (marca.md §2.1) */
  --texto-sobre-neon: #070B1F;
  /* Fondo de las tarjetas «cristal» (marca.md §5): --superficie al 65 % */
  --cristal: rgba(15,21,51,.65);
  /* Degradados y glow */
  --grad-amanecer: linear-gradient(135deg, #00E5FF 0%, #A78BFA 50%, #FF3DDC 100%);
  --grad-horizonte: linear-gradient(90deg, #00E5FF 0%, #B8FF3D 100%);
  --grad-aurora: radial-gradient(ellipse at top, rgba(167,139,250,.25), transparent 60%), radial-gradient(ellipse at bottom right, rgba(255,61,220,.15), transparent 50%);
  --glow-cian: 0 0 0 1px rgba(0,229,255,.45), 0 0 24px rgba(0,229,255,.35), 0 0 64px rgba(0,229,255,.12);
  --glow-magenta: 0 0 0 1px rgba(255,61,220,.45), 0 0 24px rgba(255,61,220,.30), 0 0 64px rgba(255,61,220,.10);
  /* Escena «Amanecer» del hero (marca.md §5): cielo de noche y montañas. Decorativos, nunca bajo texto largo */
  --cielo-alto: #070B1F;
  --cielo-medio: #0B1030;
  --cielo-bajo: #1B1546;
  --cielo-horizonte: #3B1A55;
  --monte-lejos: #141A45;
  --monte-cerca: #0B1030;
  /* Sol de la escena, de arriba abajo: ámbar → coral → magenta → violeta neón. Igual en los dos temas */
  --sol-1: #FFC94D;
  --sol-2: #FF6B8B;
  --sol-3: #FF3DDC;
  --sol-4: #A78BFA;
  /* Forma */
  --radio-tarjeta: 12px;
  --radio-input: 8px;
  --curva: cubic-bezier(.2,.8,.2,1);
  color-scheme: dark;
}

:root[data-theme="light"] {
  --fondo: #F6F8FF;
  --superficie: #FFFFFF;
  --elevada: #EEF1FF;
  --borde: #D5DAF0;
  --borde-fuerte: #7880AE;
  --texto: #0B1030;
  --texto-2: #465079;
  --texto-tenue: #5A6488;
  --cian: #00788A;
  --magenta: #B5148F;
  --violeta: #6233D6;
  --lima: #3F7A00;
  --ambar: #9A5B00;
  --coral: #C8204A;
  --texto-sobre-neon: #FFFFFF;
  --cristal: rgba(255,255,255,.7);
  /* Degradados con los neones oscurecidos del tema claro (todos ≥ 4,5:1 sobre --fondo) */
  --grad-amanecer: linear-gradient(135deg, #00788A 0%, #6233D6 50%, #B5148F 100%);
  --grad-horizonte: linear-gradient(90deg, #00788A 0%, #3F7A00 100%);
  --grad-aurora: radial-gradient(ellipse at top, rgba(98,51,214,.10), transparent 60%), radial-gradient(ellipse at bottom right, rgba(181,20,143,.06), transparent 50%);
  --glow-cian: 0 0 0 1px rgba(0,120,138,.35), 0 8px 24px rgba(0,120,138,.15);
  --glow-magenta: 0 0 0 1px rgba(181,20,143,.35), 0 8px 24px rgba(181,20,143,.15);
  /* Escena «Amanecer» de día: cielo claro arriba (bajo el titular) y tonos de alba solo cerca del horizonte */
  --cielo-alto: #F6F8FF;
  --cielo-medio: #F0EEFF;
  --cielo-bajo: #F7E4F4;
  --cielo-horizonte: #FFE2CF;
  --monte-lejos: #DDD9F5;
  --monte-cerca: #C9C6EE;
  color-scheme: light;
}

/* Foco visible y coherente con la marca */
:focus-visible {
  outline: 2px solid var(--cian);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```css
/* Tailwind v4: en el CSS principal, después de @import "tailwindcss"; */
@theme {
  --color-fondo: var(--fondo);
  --color-superficie: var(--superficie);
  --color-elevada: var(--elevada);
  --color-borde: var(--borde);
  --color-borde-fuerte: var(--borde-fuerte);
  --color-texto: var(--texto);
  --color-texto-2: var(--texto-2);
  --color-texto-tenue: var(--texto-tenue);
  --color-cian: var(--cian);
  --color-magenta: var(--magenta);
  --color-violeta: var(--violeta);
  --color-lima: var(--lima);
  --color-ambar: var(--ambar);
  --color-coral: var(--coral);
  --color-sobre-neon: var(--texto-sobre-neon);
  --color-cristal: var(--cristal);
  --font-titulo: "Space Grotesk", system-ui, sans-serif;
  --font-texto: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

> Todos los colores de texto del tema claro pasan AA también sobre `--elevada` (`#EEF1FF`), con un mínimo de 4,6:1. Igual, verifica cada página con axe al implementarla.

---

## 9. Lo que NO se hace

- Efectos *glitch*, texto que tiembla o parpadea: restan confianza.
- Texto neón sobre fondo neón, o degradado sobre degradado.
- Imágenes con mucho detalle detrás de texto.
- Más de dos colores de neón en un mismo componente (las únicas excepciones son el logo, el borde del botón principal y la escena «Amanecer» del hero con su mini tablero, aprobada el 2026-10-21, y la escena de cierre del inicio, 2026-10-28).
- Glow en todos los elementos de una sección.
- Animaciones infinitas rápidas o que no se puedan detener.
- Colores fuera de esta paleta. Si hace falta uno nuevo, se propone, se verifica el contraste y se agrega aquí.
- Imitar la estética de marcas, películas o videojuegos conocidos: la identidad es propia.

---

## 10. Checklist de diseño por componente

- [ ] Usa solo tokens (ningún hex suelto en el componente)
- [ ] Contraste AA verificado en tema oscuro y claro
- [ ] Foco visible con el estilo de marca
- [ ] Funciona con `prefers-reduced-motion`
- [ ] Respeta la regla 80/20 y el máximo de un glow fuerte por pantalla
- [ ] Se ve bien a 375, 768 y 1280 px
