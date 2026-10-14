// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL base del sitio: Astro la usa para las URL canónicas, el sitemap y Open Graph.
  site: 'https://analizandoyautomatizando.com',

  vite: {
    plugins: [tailwindcss()]
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
