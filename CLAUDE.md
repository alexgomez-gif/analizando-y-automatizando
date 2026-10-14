# CLAUDE.md — Analizando y Automatizando

Este archivo es la memoria del proyecto. Léelo completo al inicio de cada sesión y síguelo siempre.
Si una instrucción del usuario contradice este archivo, pregunta antes de actuar.

## 1. Qué es este proyecto

Sitio web comercial que vende servicios de análisis de datos y automatización a negocios en Colombia.
Su trabajo es convertir visitas en diagnósticos agendados y diagnósticos en clientes.

- **Marca:** Analizando y Automatizando (forma corta: A&A)
- **Lema:** «Analizamos lo que tienes. Automatizamos lo que repites»
- **Dominio:** `analizandoyautomatizando.com` (comprado el 2026-10-14) · URL del sitio: `https://analizandoyautomatizando.com`
- **Nicho principal:** emprendimientos emergentes en Colombia
- **Propuesta de valor:** Ayudamos a emprendimientos emergentes a dejar de perder horas en tareas repetitivas, mediante automatización y análisis a la medida, sin jerga técnica.
- **Acción principal del sitio:** agendar el diagnóstico gratuito (conversación de 30 minutos + informe en 3 días hábiles + reunión de resultados)

### Servicios
1. Diagnóstico de datos (puerta de entrada)
2. Tableros / dashboards
3. Limpieza y consolidación de datos
4. Automatización de reportes y procesos
5. Análisis predictivo (solo cuando aporte valor real)

Los textos de cada página viven en `docs/contenido.md`.

### Identidad visual
La marca completa (concepto «Neón al amanecer», colores, tipografía, logo, efectos e interactividad) está en el archivo importado abajo. Síguelo en todo componente, sin excepciones:

@docs/marca.md
**No inventes textos comerciales, precios, testimonios ni cifras de resultados.** Si faltan, deja un marcador `[PENDIENTE: ...]` y avísame.

## 2. Stack técnico

- **Framework:** Astro + TypeScript (modo estricto)
- **Estilos:** Tailwind CSS. Los colores y tipografías se definen como tokens en un solo lugar; nunca colores sueltos en componentes.
- **Contenido:** colecciones de contenido de Astro en `src/content/` (blog y casos de estudio en Markdown/MDX)
- **Gráficos de demos:** Apache ECharts (o Chart.js), cargados solo como islas interactivas
- **Formularios:** función serverless de Cloudflare + correo transaccional + registro en el CRM (Google Sheets o HubSpot)
- **Anti-spam:** Cloudflare Turnstile + campo honeypot
- **Agenda:** Cal.com incrustado
- **Analítica:** Cloudflare Web Analytics o Plausible (sin cookies invasivas)
- **Hosting:** Cloudflare (despliegue automático desde GitHub). **No usar Vercel Hobby**: no permite uso comercial.
- **Demos en Python:** carpeta `demos/` con su propio entorno virtual (`.venv`)

No agregues frameworks, librerías ni servicios nuevos sin preguntarme primero y explicar por qué.

## 3. Comandos

```bash
npm install          # instalar dependencias
npm run dev          # servidor local (http://localhost:4321)
npm run build        # compilación de producción — debe pasar sin errores ni advertencias
npm run preview      # ver la compilación localmente
npm run check        # astro check (tipos)
```

Python (demos):
```bash
cd demos && python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

## 4. Estructura de carpetas

```text
├── CLAUDE.md
├── docs/            # negocio, contenido, marca, decisiones, guías de configuración
├── src/
│   ├── pages/       # una ruta por archivo, URLs en español: /servicios/automatizacion-de-reportes
│   ├── components/  # componentes reutilizables (PascalCase.astro)
│   ├── layouts/     # BaseLayout y variantes
│   ├── content/     # blog/ y casos/
│   ├── lib/         # utilidades TypeScript
│   └── styles/
├── functions/       # funciones serverless (formulario, etc.)
├── public/          # favicon, imágenes estáticas, robots.txt
└── demos/           # notebooks y scripts de Python
```

## 5. Forma de trabajar

1. **Primero plan, después código.** Para cualquier tarea de más de un archivo, propón un plan corto y espera mi aprobación.
2. **Pasos pequeños.** Un cambio a la vez; detente después de cada sección o componente para que lo revise.
3. **Explica lo que haces.** Estoy aprendiendo: al crear o modificar archivos, explica brevemente qué hace cada uno y por qué.
4. **Reutiliza antes de crear.** Revisa `src/components/` antes de hacer un componente nuevo. Los botones siempre usan `Button`, las tarjetas `Card`, etc.
5. **Verifica siempre** antes de decir que algo está listo:
   - `npm run build` sin errores ni advertencias
   - `npm run check` sin errores de tipos
   - revisión en 375 px, 768 px y 1280 px
   - navegación completa solo con teclado
6. **Si algo falla**, explica la causa antes de intentar otra solución. No apliques parches a ciegas.
7. **Git:** trabaja en ramas (`feature/...`, `fix/...`). Mensajes de commit en español, en presente e imperativo: `Agrega sección de preguntas frecuentes`. No hagas `push` ni fusiones a `main` sin que yo lo pida.
8. **Al cerrar una sesión**, propón qué anotar en la sección "Decisiones" de este archivo.

## 6. Idioma y tono de los textos

- Español de Colombia (`lang="es-CO"`). Moneda en COP con formato `$1.500.000`.
- Trato: **tú** — en todo el sitio, sin excepciones (también en formularios, errores y correos).
- Voz de la marca: **primera persona del plural** ("analizamos", "te ayudamos", "nuestro equipo"), nunca "yo".
- Hablar de resultados del cliente, no de herramientas: "tus reportes listos cada lunes" antes que "scripts de Python".
- Frases cortas, sin jerga técnica en páginas comerciales. La parte técnica va en bloques aparte de los casos de estudio.
- Cada página tiene **una sola acción principal**.

## 7. Accesibilidad (obligatoria — WCAG 2.2 nivel AA)

La accesibilidad no es opcional ni un paso final: se cumple en cada componente.

- HTML semántico: `header`, `nav`, `main`, `footer`, un solo `h1` por página, jerarquía de títulos sin saltos.
- Todo operable con teclado; foco visible siempre (nunca `outline: none` sin reemplazo).
- Enlace "Saltar al contenido" al inicio de cada página.
- Contraste mínimo 4,5:1 en texto normal y 3:1 en texto grande y elementos de interfaz.
- Objetivos táctiles de al menos 44 × 44 px.
- Imágenes con `alt` descriptivo (o `alt=""` si son decorativas).
- Cada gráfico tiene título, descripción y una tabla de datos alternativa accesible.
- Formularios: `label` visible en cada campo, errores claros asociados con `aria-describedby`, sin límites de tiempo.
- Menús y acordeones con atributos ARIA correctos (`aria-expanded`, `aria-controls`).
- Animaciones sutiles y desactivadas con `prefers-reduced-motion`.
- Probar con axe y con lector de pantalla (NVDA u Orca) antes de cerrar cada sprint.

## 8. Rendimiento y SEO

- Meta: Lighthouse ≥ 90 en las cuatro categorías, en móvil.
- Páginas estáticas por defecto. JavaScript solo en islas (`client:visible` o `client:idle`), nunca `client:load` sin justificar.
- Imágenes con el componente de imagen de Astro (AVIF/WebP, tamaños responsivos, `loading="lazy"` fuera de la primera pantalla).
- Solo los pesos de fuente que se usan, con `font-display: swap`.
- Cada página: `title` y `meta description` únicos, imagen Open Graph, URL canónica.
- Datos estructurados schema.org: `ProfessionalService` en inicio, `Service` en cada servicio, `FAQPage` en preguntas frecuentes, `Article` en el blog.
- Sitemap generado automáticamente y `robots.txt` correcto.
- Medir como eventos: envío de formulario, clic en agendar, uso del cotizador, uso de demos.

## 9. Seguridad y privacidad

- **Nunca** escribas claves, tokens ni contraseñas en el código. Van en `.env` (local) y en variables de entorno de Cloudflare (producción).
- `.env`, `.venv/`, `node_modules/` y `dist/` siempre en `.gitignore`. Mantén un `.env.example` con los nombres de las variables, sin valores.
- Valida los datos del formulario en el navegador **y** en el servidor. Limita envíos por IP.
- Cabeceras de seguridad: CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`.
- Las demos que procesan archivos lo hacen **en el navegador**; el sitio no recibe ni guarda datos de los visitantes.
- Nunca uses datos reales de clientes en el repositorio. Para casos y demos: datos públicos (datos.gov.co) o simulados, indicándolo con transparencia.

## 10. Requisitos legales (Colombia — Ley 1581 de 2012)

- Todo formulario que pida datos personales incluye una casilla de autorización **sin marcar por defecto**, con enlace a la Política de tratamiento de datos.
- El sitio debe tener: Política de tratamiento de datos, Aviso de privacidad, Términos y condiciones, y (si hay cookies de analítica) Política de cookies.
- El pie de página muestra nombre o razón social, NIT y correo de contacto.
- No redactes textos legales definitivos: crea la estructura y marca `[REVISIÓN LEGAL PENDIENTE]`.

## 11. Lo que NO debes hacer

- Instalar dependencias o cambiar el stack sin preguntar.
- Inventar precios, testimonios, clientes, logos de empresas o cifras de resultados.
- Borrar archivos o reescribir componentes grandes sin avisar antes.
- Usar imágenes, fuentes o íconos con licencia dudosa.
- Hacer `git push --force`, fusionar a `main` o desplegar sin instrucción explícita.
- Dar por terminada una tarea sin haber corrido la verificación de la sección 5.

## 12. Estado del proyecto

Fase actual: **[Fase 4 — Construcción]** (la Fase 2 sigue abierta por textos pendientes) — actualizar al avanzar.

**Plan de base visual (aprobado el 2026-10-13): completo** en la rama `feature/base-visual`.
1. ✅ Tokens y estilos base · 2. ✅ Fuentes en el propio dominio · 3. ✅ `BaseLayout` · 4. ✅ `Button`, `Header`, `Footer` · 5. ✅ Hero del inicio

**Cambio de tema oscuro/claro: completo** en la rama `feature/cambio-de-tema` (auditoría de contraste: 0 fallas en 2 temas × 3 anchos).

**Próxima sesión:** crear la rama `feature/secciones-inicio` desde `feature/decisiones-inicio` (aún sin fusionar a `main`) y seguir el plan de secciones estáticas del inicio (aprobado el 2026-10-14):
1. Componentes base `Seccion` y `Card` (tarjeta «cristal»; token nuevo `--cristal` oscuro/claro, anotarlo en marca.md)
2. Secciones Problema (3 tarjetas) y Servicios (5 tarjetas con enlace; cian = análisis, magenta = automatización, violeta = predictivo)
3. Cómo trabajamos: tubería de 5 etapas (estática) + 4 pasos + enlace a `/como-trabajamos`
4. Quiénes somos, Preguntas frecuentes (`<details>`/`<summary>`) y Llamado final
5. Verificación: contraste 2 temas × 3 anchos, teclado, jerarquía de títulos, build y check
Fuera de este plan: calculadora (plan propio, 48 semanas), efectos de marca.md, sección de demos (oculta hasta la Fase 6).

**Pendientes técnicos conocidos:**
- Imagen Open Graph (1200 × 630) por crear.
- Páginas enlazadas en menú y pie aún no existen.

- [ ] Fase 0 · Negocio y oferta
- [x] Fase 1 · Entorno
- [ ] Fase 2 · Marca y contenido
- [ ] Fase 3 · Stack técnico
- [ ] Fase 4 · Construcción
- [ ] Fase 5 · Funciones de negocio
- [ ] Fase 6 · Portafolio y demos
- [ ] Fase 7 · SEO y accesibilidad
- [ ] Fase 8 · Legal y formalización
- [ ] Fase 9 · Despliegue
- [ ] Fase 10 · Lanzamiento
- [ ] Fase 11 · Operar y escalar

## 13. Decisiones

Registro de decisiones tomadas en las sesiones (fecha · decisión · motivo). La más reciente arriba.

- 2026-10-14 · La conversación inicial del diagnóstico es por llamada · decisión del dueño del proyecto. Al agendar habrá que pedir el teléfono: dato personal (Ley 1581), con autorización sin marcar.
- 2026-10-14 · Textos del inicio aprobados; tiempos de entrega confirmados · decisión del dueño del proyecto.
- 2026-10-14 · Calculadora de ahorro con año laboral de 48 semanas · descuenta vacaciones y festivos; se indica en la nota visible.
- 2026-10-14 · Sección de demos del inicio oculta hasta que existan las demos (Fase 6) · un enlace a una página vacía resta confianza.
- 2026-10-14 · «Cómo trabajamos» muestra la tubería de 5 etapas (método) y los 4 pasos (camino del cliente).
- 2026-10-14 · Sin mención de certificaciones en el sitio · decisión del dueño del proyecto.
- 2026-10-14 · No se publican precios ni rangos · el precio se da en la propuesta, después del diagnóstico.
- 2026-10-14 · Borde del botón principal con los 3 neones de Amanecer, quieto en reposo y girando solo con hover/foco · excepción a la regla de 2 neones, como el logo; girar siempre violaría WCAG 2.2.2 (movimiento que no se puede pausar).
- 2026-10-14 · Botón de tema al final del menú, con texto de acción («Cambiar a tema claro/oscuro») en vez de `aria-pressed` · el orden de foco coincide con el visual; con `aria-pressed` el ícono contradecía el texto.
- 2026-10-14 · Script en línea (`is:inline`) en el `<head>` para aplicar el tema guardado antes del primer cuadro · única excepción a «JS solo en islas»: evita el destello oscuro. **Al configurar la CSP (Fase 9), autorizarlo con su hash.**
- 2026-10-14 · Visitante nuevo ve el tema oscuro, sin seguir la preferencia del sistema · es el predeterminado de marca.md; la elección del visitante se guarda en `localStorage` (clave `tema`).
- 2026-10-14 · Foco sin `border-radius` propio · el contorno sigue la forma del elemento; con 4px los botones redondos se veían cuadrados al enfocarlos.
- 2026-10-14 · Dominio `analizandoyautomatizando.com` · comprado por el dueño del proyecto; es la URL base para canónicas, sitemap y Open Graph.
- 2026-10-13 · Las fuentes son variables (un archivo por familia): se precarga la familia entera, no por peso · el filtro por peso de `<Font preload>` descartaba Space Grotesk.
- 2026-10-13 · Paleta por defecto de Tailwind eliminada (`--color-*: initial`) · solo existen los colores de marca; imposible usar colores sueltos.
- 2026-10-13 · Conversación inicial y diagnóstico completo (informe + reunión) son gratis · el diagnóstico es la puerta de entrada; tiempos de entrega aún por confirmar.
- 2026-10-13 · Promesas de la oferta: el diagnóstico entrega la lista de tareas automatizables aunque no haya contrato; propuesta con alcance, tiempo y precio antes de empezar; se construye con las herramientas que el cliente ya usa; hay acompañamiento tras la entrega · confirmadas por el dueño del proyecto.
- 2026-10-13 · Propuesta de valor centrada en recuperar horas de tareas repetitivas · es el dolor más concreto del cliente; conecta con el lema y con la calculadora de ahorro.
- 2026-10-13 · Nicho: emprendimientos emergentes en Colombia · definido por el dueño del proyecto.
- 2026-10-13 · Favicons de Astro reemplazados por los del logo (`public/logo/`) · identidad propia desde la primera página.
- 2026-10-13 · La marca habla en primera persona del plural en todo el sitio · coherente con el lema («Analizamos…»).
- 2026-10-13 · Íconos con `@lucide/astro` (oficial, licencia ISC) · se renderizan como SVG al compilar, sin JavaScript en el navegador; compatible con Astro 7.
- 2026-10-13 · Fuentes alojadas en el propio dominio con la configuración `fonts` de Astro · sin dependencias nuevas y sin enviar la IP del visitante a Google.
- 2026-10-13 · Trato de tú en todo el sitio · cercano, coherente con la personalidad de la marca.
- 2026-10-13 · Lema «Analizamos lo que tienes. Automatizamos lo que repites» · repite el ritmo del nombre (Analizando / Automatizando) y nombra los dos servicios.
- 2026-10-13 · Logo v1 (monograma A&A de una sola línea) documentado en `docs/marca.md` · archivos en `public/logo/`.
- 2026-10-12 · Nombre «Analizando y Automatizando» y estética cyberpunk optimista («Neón al amanecer») en `docs/marca.md` · marca futurista pero confiable.
- 2026-10-11 · Plantillas de textos y marca en docs/ con URLs propuestas · fuente única de contenido; URLs por confirmar.
- 2026-10-11 · Astro 7.3 + Tailwind 4.3 (plugin de Vite) · versiones actuales; Tailwind 4 define los tokens en CSS (src/styles/global.css).
- 2026-10-11 · Node 22 con nvm y archivo .nvmrc · Astro 7 exige Node ≥ 22.12; nvm no requiere sudo ni cambia el Node del sistema.
- 2026-10-11 · Stack Astro + Tailwind en Cloudflare · rápido, buen SEO, plan gratuito con uso comercial.
