// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL base del sitio: Astro la usa para las URL canónicas, el sitemap y Open Graph.
  site: 'https://analizandoyautomatizando.com',

  // Sitemap automático (CLAUDE.md §8): genera sitemap-index.xml al compilar; robots.txt lo anuncia.
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  // Política de seguridad de contenido (CLAUDE.md §9). Astro calcula al compilar el hash de cada
  // script y estilo propio (incluido el script del tema en el <head>) y lo pone en un <meta> por página.
  // Lo externo se autoriza aquí: Cal.com en un iframe (/agendar) y Cloudflare Web Analytics.
  // frame-ancestors no funciona en <meta>: va como cabecera en public/_headers.
  // Shiki (resaltado de código por defecto) usa estilos en línea que la CSP bloquea; Prism viene
  // incluido en Astro y es compatible. Solo aplica cuando haya Markdown con código (blog, casos).
  markdown: {
    syntaxHighlight: 'prism'
  },

  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "frame-src https://cal.com https://app.cal.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ],
      scriptDirective: {
        resources: ["'self'", "https://static.cloudflareinsights.com"]
      }
    }
  },

  // Fuentes de docs/marca.md (sección 3). Astro las descarga al compilar y las
  // sirve desde nuestro dominio: el navegador del visitante nunca contacta a Google.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--fuente-titulo',
      weights: [500, 700],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['system-ui', 'sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--fuente-texto',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['system-ui', 'sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--fuente-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['ui-monospace', 'monospace']
    }
  ]
});
