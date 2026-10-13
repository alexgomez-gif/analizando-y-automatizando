# Contenido del sitio

Fuente única de los textos de cada página. El código toma los textos de aquí; no se redactan dentro de los componentes.

**Reglas rápidas** (ver CLAUDE.md, sección 6):
- Español de Colombia, trato de **tú** en todo el sitio.
- La marca habla en **plural**: "analizamos", "te ayudamos", nunca "yo".
- Hablar de resultados del cliente, no de herramientas.
- Una sola acción principal por página.
- Nada de precios, testimonios, clientes ni cifras inventadas. Si falta un dato, se deja `[PENDIENTE: ...]`.

**Límites para SEO:**
- `title`: máximo 60 caracteres, único por página.
- `meta description`: entre 120 y 155 caracteres, única por página.

---

## Inicio · `/`

- **title:** [PENDIENTE]
- **meta description:** [PENDIENTE]
- **H1:** [PENDIENTE: propuesta de valor en una frase]
- **Subtítulo:** [PENDIENTE]
- **Acción principal:** Agendar diagnóstico gratuito de 30 minutos
- **Texto del botón:** [PENDIENTE]

### Secciones
1. **Problema que resolvemos:** [PENDIENTE: 3 dolores del cliente, en sus palabras]
2. **Servicios (resumen):** [PENDIENTE: una línea por servicio, enfocada en el resultado]
3. **Cómo trabajamos:** [PENDIENTE: pasos del proceso, empezando por el diagnóstico]
4. **Casos o demos:** [PENDIENTE: solo casos reales o demos con datos públicos/simulados]
5. **Preguntas frecuentes (resumen):** [PENDIENTE]
6. **Llamado final:** [PENDIENTE]

---

## Servicios · `/servicios`

- **title:** [PENDIENTE]
- **meta description:** [PENDIENTE]
- **H1:** [PENDIENTE]
- **Introducción:** [PENDIENTE]
- **Acción principal:** Agendar diagnóstico

### Plantilla para cada servicio

Copiar este bloque en cada servicio de abajo.

- **URL:** `/servicios/...`
- **title:** [PENDIENTE]
- **meta description:** [PENDIENTE]
- **H1:** [PENDIENTE]
- **Para quién es:** [PENDIENTE]
- **Problema que resuelve:** [PENDIENTE]
- **Qué recibe el cliente (entregables):** [PENDIENTE]
- **Cómo funciona (pasos):** [PENDIENTE]
- **Tiempo estimado:** [PENDIENTE]
- **Precio o forma de cotizar:** [PENDIENTE: no publicar precios sin definirlos]
- **Preguntas frecuentes del servicio:** [PENDIENTE]
- **Acción principal:** [PENDIENTE]

### 1. Diagnóstico de datos · `/servicios/diagnostico-de-datos`
[PENDIENTE: llenar con la plantilla]

### 2. Tableros · `/servicios/tableros`
[PENDIENTE: llenar con la plantilla]

### 3. Limpieza y consolidación de datos · `/servicios/limpieza-y-consolidacion-de-datos`
[PENDIENTE: llenar con la plantilla]

### 4. Automatización de reportes y procesos · `/servicios/automatizacion-de-reportes`
[PENDIENTE: llenar con la plantilla]

### 5. Análisis predictivo · `/servicios/analisis-predictivo`
[PENDIENTE: llenar con la plantilla. Aclarar cuándo sí aporta valor y cuándo no.]

---

## Casos de estudio · `/casos`

- **title:** [PENDIENTE]
- **meta description:** [PENDIENTE]
- **H1:** [PENDIENTE]
- **Acción principal:** Agendar diagnóstico

Cada caso es un archivo en `src/content/casos/`. Usa datos públicos (datos.gov.co) o simulados, y lo dice de forma visible.

---

## Demos · `/demos`

- **title:** [PENDIENTE]
- **meta description:** [PENDIENTE]
- **H1:** [PENDIENTE]
- **Acción principal:** [PENDIENTE]
- **Aviso de privacidad de la demo:** los archivos se procesan en el navegador; el sitio no los recibe ni los guarda.

---

## Cotizador · `/cotizador`

[PENDIENTE: confirmar si habrá cotizador y con qué reglas de precio]

---

## Blog · `/blog`

- **title:** [PENDIENTE]
- **meta description:** [PENDIENTE]
- **H1:** [PENDIENTE]

Cada artículo es un archivo en `src/content/blog/`.

---

## Sobre nosotros · `/sobre-nosotros`

[PENDIENTE: decidir si se incluye esta página. Se escribe en primera persona del plural.]

---

## Preguntas frecuentes · `/preguntas-frecuentes`

- **title:** [PENDIENTE]
- **meta description:** [PENDIENTE]
- **H1:** [PENDIENTE]
- **Acción principal:** Agendar diagnóstico

| Pregunta | Respuesta |
|---|---|
| [PENDIENTE] | [PENDIENTE] |

---

## Agendar diagnóstico · `/agendar`

- **title:** [PENDIENTE]
- **meta description:** [PENDIENTE]
- **H1:** [PENDIENTE]
- **Qué pasa en los 30 minutos:** [PENDIENTE]
- **Qué debe preparar el cliente:** [PENDIENTE]
- **Mensaje de confirmación del formulario:** [PENDIENTE]

---

## Páginas legales

Solo estructura. Los textos definitivos los redacta o revisa un profesional.

- **Política de tratamiento de datos** · `/politica-de-tratamiento-de-datos` · [REVISIÓN LEGAL PENDIENTE]
- **Aviso de privacidad** · `/aviso-de-privacidad` · [REVISIÓN LEGAL PENDIENTE]
- **Términos y condiciones** · `/terminos-y-condiciones` · [REVISIÓN LEGAL PENDIENTE]
- **Política de cookies** · `/politica-de-cookies` · [REVISIÓN LEGAL PENDIENTE: solo si la analítica usa cookies]

---

## Pie de página

- **Nombre o razón social:** [PENDIENTE]
- **NIT:** [PENDIENTE]
- **Correo de contacto:** [PENDIENTE]
- **Ciudad:** [PENDIENTE]
- **Redes sociales:** [PENDIENTE]
